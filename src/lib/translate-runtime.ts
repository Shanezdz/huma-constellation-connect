// Client-side translation runtime: walks text nodes in <main>/<footer>/<nav>,
// batch-sends them to the server fn, and swaps textContent in place.
// Caches results in localStorage per (lang, original hash).

import { translateBatch } from "./translate.functions";

type Lang = "en" | "fr" | "ar";

const CACHE_PREFIX = "huma-i18n-v1:";

// Track original text per node so we can restore when switching back to EN
const originals = new WeakMap<Text, string>();
// Keep references to all collected text nodes for current page
let trackedNodes: Text[] = [];

function hash(str: string): string {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h) ^ str.charCodeAt(i);
  return (h >>> 0).toString(36);
}

function getCache(lang: Lang): Record<string, string> {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + lang);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function setCache(lang: Lang, cache: Record<string, string>) {
  try {
    localStorage.setItem(CACHE_PREFIX + lang, JSON.stringify(cache));
  } catch {
    // quota — ignore
  }
}

const SKIP_TAGS = new Set([
  "SCRIPT",
  "STYLE",
  "NOSCRIPT",
  "CODE",
  "PRE",
  "SVG",
  "PATH",
  "CIRCLE",
  "ELLIPSE",
  "TEXTAREA",
  "INPUT",
]);

function collectTextNodes(root: HTMLElement): Text[] {
  const nodes: Text[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (SKIP_TAGS.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
      if (parent.closest("[data-no-translate]")) return NodeFilter.FILTER_REJECT;
      const text = node.textContent ?? "";
      if (!text.trim()) return NodeFilter.FILTER_REJECT;
      // Skip pure numbers / single symbols
      if (/^[\s\d.,:%+\-—–/·•|]+$/.test(text)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  let n: Node | null;
  while ((n = walker.nextNode())) nodes.push(n as Text);
  return nodes;
}

export function restoreOriginals() {
  for (const node of trackedNodes) {
    const orig = originals.get(node);
    if (orig !== undefined && node.textContent !== orig) node.textContent = orig;
  }
}

export async function applyLanguage(lang: Lang) {
  // Always reset to English first
  restoreOriginals();

  if (lang === "en") return;

  // Collect fresh from the live DOM (covers nav, main, footer)
  const root = document.body;
  trackedNodes = collectTextNodes(root);
  // Remember original
  for (const node of trackedNodes) {
    if (!originals.has(node)) originals.set(node, node.textContent ?? "");
  }

  const cache = getCache(lang);
  const uniqueMap = new Map<string, string>(); // original -> translation
  const needed: string[] = [];

  for (const node of trackedNodes) {
    const original = originals.get(node) ?? "";
    const key = hash(original);
    if (cache[key]) {
      uniqueMap.set(original, cache[key]);
    } else if (!uniqueMap.has(original)) {
      uniqueMap.set(original, ""); // placeholder
      needed.push(original);
    }
  }

  // Batch in chunks of ~80 strings to keep prompts reasonable
  const CHUNK = 80;
  for (let i = 0; i < needed.length; i += CHUNK) {
    const slice = needed.slice(i, i + CHUNK);
    try {
      const res = await translateBatch({ data: { texts: slice, target: lang } });
      slice.forEach((orig, idx) => {
        const t = res.translations[idx] || orig;
        uniqueMap.set(orig, t);
        cache[hash(orig)] = t;
      });
      setCache(lang, cache);
    } catch (e) {
      console.error("[i18n] batch failed", e);
      // leave originals on failure
      slice.forEach((orig) => uniqueMap.set(orig, orig));
    }
  }

  // Apply
  for (const node of trackedNodes) {
    const original = originals.get(node) ?? "";
    const translated = uniqueMap.get(original);
    if (translated && translated !== node.textContent) {
      node.textContent = translated;
    }
  }
}

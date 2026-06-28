import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { applyLanguage } from "@/lib/translate-runtime";

const LANGS = [
  { code: "en", label: "English", short: "EN", dir: "ltr" },
  { code: "fr", label: "Français", short: "FR", dir: "ltr" },
  { code: "ar", label: "العربية", short: "AR", dir: "rtl" },
] as const;

type LangCode = (typeof LANGS)[number]["code"];

function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<LangCode>("en");
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("huma-lang")) as LangCode | null;
    if (saved && LANGS.some((l) => l.code === saved)) setLang(saved);
  }, []);

  // Apply language to document + translate DOM whenever lang OR route changes
  useEffect(() => {
    const entry = LANGS.find((l) => l.code === lang);
    if (!entry) return;
    document.documentElement.lang = entry.code;
    document.documentElement.dir = entry.dir;
    localStorage.setItem("huma-lang", entry.code);

    let cancelled = false;
    setLoading(true);
    // Wait a frame so the new route DOM is mounted
    const t = setTimeout(() => {
      applyLanguage(lang).finally(() => {
        if (!cancelled) setLoading(false);
      });
    }, 50);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [lang, pathname]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  return (
    <div ref={ref} className="relative" data-no-translate>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Change language"
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-ivory/15 px-3 py-2 text-[10px] uppercase tracking-[0.25em] text-ivory/80 transition-all duration-300 hover:border-ivory/40 hover:text-ivory"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          aria-hidden="true"
          className={loading ? "animate-spin" : ""}
        >
          <circle cx="12" cy="12" r="9" />
          <ellipse cx="12" cy="12" rx="4" ry="9" />
          <path d="M3 12h18" />
        </svg>
        <span>{current.short}</span>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-3 min-w-[160px] overflow-hidden rounded-2xl border border-ivory/10 bg-space-black/95 py-2 backdrop-blur-xl"
        >
          {LANGS.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                role="option"
                aria-selected={l.code === lang}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-4 py-2 text-left text-[11px] tracking-[0.2em] transition-colors ${
                  l.code === lang ? "text-ivory" : "text-ivory/50 hover:text-ivory"
                }`}
              >
                <span>{l.label}</span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-gold-dust/70">{l.short}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export const NAV_LINKS = [
  { to: "/constellation", label: "The Globe" },
  { to: "/offer", label: "Offer" },
  { to: "/echo", label: "Echo" },
  { to: "/stories", label: "Stories" },
  { to: "/pulse", label: "Pulse" },
  { to: "/future", label: "Future" },
] as const;

export function Nav() {
  return (
    <nav className="fixed top-0 z-40 flex w-full items-center justify-between px-6 py-6 md:px-12">
      <Link to="/" className="font-display text-sm font-light tracking-[0.4em] text-ivory">
        HUMA
      </Link>
      <div className="hidden gap-10 text-[10px] uppercase tracking-[0.25em] text-ivory/60 md:flex">
        {NAV_LINKS.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="transition-colors hover:text-ivory"
            activeProps={{ className: "text-ivory" }}
          >
            {l.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <LanguageSwitcher />
        <Link
          to="/offer"
          className="rounded-full border border-ivory/15 px-5 py-2 text-[10px] uppercase tracking-[0.25em] text-ivory transition-all duration-500 hover:bg-ivory hover:text-space-black"
        >
          Connect
        </Link>
      </div>
    </nav>
  );
}

export function ParticleField() {
  const stars = useMemo(() => {
    const seed = (n: number) => Math.abs(Math.sin(n * 9301 + 49297) * 233280) % 1;
    return Array.from({ length: 80 }, (_, i) => ({
      top: seed(i) * 100,
      left: seed(i + 1) * 100,
      size: seed(i + 2) * 1.5 + 0.3,
      delay: seed(i + 3) * 5,
      hue:
        i % 7 === 0
          ? "bg-gold-dust"
          : i % 5 === 0
            ? "bg-celestial"
            : i % 11 === 0
              ? "bg-aurora"
              : "bg-ivory",
    }));
  }, []);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s, i) => (
        <span
          key={i}
          className={`absolute rounded-full ${s.hue} animate-pulse-soft`}
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            boxShadow: "0 0 8px currentColor",
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  );
}

export function ManifestoFooter() {
  return (
    <footer className="relative border-t border-ivory/10 px-6 pb-12 pt-32 md:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="mx-auto max-w-2xl text-balance text-center font-display text-2xl font-light leading-relaxed text-ivory/90 md:text-3xl">
          HUMA is a poetic operating system for humanity — the refusal of cynicism, the
          visualization of our collective strength.
        </p>

        <div className="mt-20 flex flex-col items-start justify-between gap-12 md:flex-row">
          <div className="space-y-4">
            <Link to="/" className="block font-display text-2xl tracking-[0.4em] text-ivory">
              HUMA
            </Link>
            <p className="max-w-[260px] text-[10px] uppercase leading-loose tracking-[0.2em] text-ivory/30">
              A digital architecture for rebuilding human connection at a planetary scale.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-12 md:gap-20">
            <div className="space-y-4">
              <span className="text-[9px] uppercase tracking-[0.3em] text-gold-dust">Network</span>
              <ul className="space-y-2 text-xs font-light text-ivory/50">
                <li><Link to="/constellation" className="hover:text-ivory">The Collective</Link></li>
                <li><Link to="/offer" className="hover:text-ivory">Ethical Protocol</Link></li>
                <li><Link to="/pulse" className="hover:text-ivory">Open Data</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <span className="text-[9px] uppercase tracking-[0.3em] text-gold-dust">System</span>
              <ul className="space-y-2 text-xs font-light text-ivory/50">
                <li><Link to="/pulse" className="hover:text-ivory">Humanity Pulse</Link></li>
                <li><Link to="/echo" className="hover:text-ivory">Ripple Effect</Link></li>
                <li><Link to="/future" className="hover:text-ivory">Horizon</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-ivory/5 pt-8 text-[9px] uppercase tracking-[0.3em] text-ivory/25 md:flex-row">
          <span>© 2026 HUMA — Planetary Scale</span>
          <div className="flex gap-6">
            <Link to="/legal" className="hover:text-ivory">Mentions légales</Link>
            <Link to="/privacy" className="hover:text-ivory">Confidentialité</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-space-black text-ivory">
      <div className="grain-overlay pointer-events-none fixed inset-0 z-50" />
      <Nav />
      <main className="pt-24">{children}</main>
      <ManifestoFooter />
    </div>
  );
}

import { createServerFn } from "@tanstack/react-start";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { generateText } from "ai";

type Input = { texts: string[]; target: "fr" | "ar" };

const LANG_LABEL: Record<Input["target"], string> = {
  fr: "French",
  ar: "Arabic (Modern Standard, RTL)",
};

export const translateBatch = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => {
    const d = data as Input;
    if (!d || !Array.isArray(d.texts)) throw new Error("Invalid input");
    if (d.target !== "fr" && d.target !== "ar") throw new Error("Invalid target");
    // Cap to prevent abuse
    if (d.texts.length > 400) throw new Error("Too many texts");
    return { texts: d.texts.map((s) => String(s)), target: d.target };
  })
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const gateway = createOpenAICompatible({
      name: "lovable",
      baseURL: "https://ai.gateway.lovable.dev/v1",
      headers: {
        "Lovable-API-Key": key,
        "X-Lovable-AIG-SDK": "vercel-ai-sdk",
      },
    });

    // Build a numbered prompt to preserve order and structure.
    const numbered = data.texts
      .map((t, i) => `${i + 1}. ${t.replace(/\s+/g, " ").trim()}`)
      .join("\n");

    const { text } = await generateText({
      model: gateway("google/gemini-3-flash-preview"),
      messages: [
        {
          role: "system",
          content:
            `You are a literary translator for HUMA, a poetic platform about human solidarity. ` +
            `Translate each numbered line from English to ${LANG_LABEL[data.target]}. ` +
            `Preserve the poetic, contemplative tone. Keep proper nouns (HUMA, place names) as-is. ` +
            `Return ONLY the translated lines, each prefixed by its number and a period, one per line. ` +
            `Do not add commentary, quotes, or extra blank lines.`,
        },
        { role: "user", content: numbered },
      ],
    });

    // Parse "N. translation" back into an ordered array aligned with input.
    const out: string[] = new Array(data.texts.length).fill("");
    const lines = text.split(/\r?\n/);
    for (const line of lines) {
      const m = line.match(/^\s*(\d+)\.\s?(.*)$/);
      if (!m) continue;
      const idx = parseInt(m[1], 10) - 1;
      if (idx >= 0 && idx < out.length) out[idx] = m[2].trim();
    }
    // Fallback: if any slot empty, keep original
    for (let i = 0; i < out.length; i++) {
      if (!out[i]) out[i] = data.texts[i];
    }
    return { translations: out };
  });

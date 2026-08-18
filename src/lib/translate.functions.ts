import { createServerFn } from "@tanstack/react-start";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { generateText } from "ai";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";

const InputSchema = z.object({
  texts: z.array(z.string().max(500)).max(400),
  target: z.enum(["fr", "ar"]),
}).refine(
  (data) => {
    const totalChars = data.texts.reduce((sum, t) => sum + t.length, 0);
    return totalChars <= 20_000;
  },
  { message: "Total character limit exceeded" }
);

type Input = z.infer<typeof InputSchema>;

const LANG_LABEL: Record<Input["target"], string> = {
  fr: "French",
  ar: "Arabic (Modern Standard, RTL)",
};

export const translateBatch = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => {
    const result = InputSchema.safeParse(data);
    if (!result.success) {
      throw new Error(result.error.errors[0]?.message || "Invalid input");
    }
    return result.data;
  })
  .handler(async ({ data }) => {
    // Same-origin guard: this endpoint exists only to serve our own UI.
    const origin = getRequestHeader("origin") ?? "";
    const referer = getRequestHeader("referer") ?? "";
    const host = getRequestHeader("host") ?? "";
    const source = origin || referer;
    if (!source) throw new Error("Forbidden origin");
    try {
      const u = new URL(source);
      if (host && u.host !== host) throw new Error("Forbidden origin");
    } catch (e) {
      if ((e as Error).message === "Forbidden origin") throw e;
      throw new Error("Forbidden origin");
    }

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
      system:
        `You are a literary translator for HUMA, a poetic platform about human solidarity. ` +
        `Translate each numbered line from English to ${LANG_LABEL[data.target]}. ` +
        `Preserve the poetic, contemplative tone. Keep proper nouns (HUMA, place names) as-is. ` +
        `Return ONLY the translated lines, each prefixed by its number and a period, one per line. ` +
        `Do not add commentary, quotes, or extra blank lines.`,
      messages: [{ role: "user", content: numbered }],
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

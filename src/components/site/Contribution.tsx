import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

export type ContributionMode = "offer" | "need" | "connect";

export const CONTRIBUTION_MODES: {
  id: ContributionMode;
  label: string;
  headline: string;
  intro: string;
  placeholder: string;
  categories: { label: string; hint: string }[];
}[] = [
  {
    id: "offer",
    label: "I can offer",
    headline: "What can you make available?",
    intro:
      "Whatever you carry — a skill, an hour, a quiet presence — becomes a node in the map. Name it precisely: vague help dissolves.",
    placeholder: "I can offer...",
    categories: [
      { label: "Mentorship", hint: "Guidance, career listening, critique" },
      { label: "Knowledge", hint: "Lessons, workshops, field manuals" },
      { label: "Care", hint: "Support, wellbeing, day-to-day accompaniment" },
      { label: "Time", hint: "Presence, listening, companionship" },
      { label: "Expertise", hint: "Legal, medical, technical, administrative" },
      { label: "Material", hint: "Tools, space, equipment, transport" },
    ],
  },
  {
    id: "need",
    label: "I need",
    headline: "What are you looking for?",
    intro:
      "Asking is not the opposite of giving — it is what makes giving possible. Describe the need plainly; the map does not judge it.",
    placeholder: "I need...",
    categories: [
      { label: "Guidance", hint: "Someone who has done this before" },
      { label: "Learning", hint: "A skill, a language, a certification" },
      { label: "Care", hint: "Support through a hard passage, wellbeing" },
      { label: "Presence", hint: "Company, listening, a regular call" },
      { label: "Expertise", hint: "A professional opinion or review" },
      { label: "Practical support", hint: "Tools, space, logistics, access" },
    ],
  },
];

const URGENCY = ["No rush", "Within a month", "This week", "Urgent"];
const RHYTHM = ["One-off", "Occasional", "Weekly", "Ongoing"];

export function ContributionComposer({ initialMode = "offer" }: { initialMode?: ContributionMode }) {
  const [mode, setMode] = useState<ContributionMode>(
    initialMode === "connect" ? "offer" : initialMode,
  );
  const [category, setCategory] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialMode && initialMode !== "connect") setMode(initialMode);
  }, [initialMode]);

  const config = CONTRIBUTION_MODES.find((m) => m.id === mode) ?? CONTRIBUTION_MODES[0];
  const scale = mode === "offer" ? RHYTHM : URGENCY;
  const scaleLabel = mode === "offer" ? "Rhythm" : "Timeframe";

  return (
    <div className="mx-auto max-w-2xl">
      {/* Symmetrical mode switch */}
      <div
        role="tablist"
        aria-label="Contribution type"
        className="mx-auto flex w-full max-w-md rounded-full border border-ivory/10 p-1"
      >
        {CONTRIBUTION_MODES.map((m) => (
          <button
            key={m.id}
            role="tab"
            type="button"
            aria-selected={mode === m.id}
            onClick={() => {
              setMode(m.id);
              setCategory(null);
              setSubmitted(false);
            }}
            className={`flex-1 rounded-full px-4 py-3 text-[10px] uppercase tracking-[0.25em] transition-all duration-500 ${
              mode === m.id
                ? "bg-ivory text-space-black"
                : "text-ivory/50 hover:text-ivory"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h2 className="font-display text-3xl font-light text-ivory md:text-4xl">
          {config.headline}
        </h2>
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-ivory/50">
          {config.intro}
        </p>
      </div>

      <form
        className="mt-14 space-y-10"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <input
          type="text"
          aria-label={config.placeholder}
          placeholder={config.placeholder}
          className="w-full border-b border-ivory/15 bg-transparent py-4 text-center text-xl font-light text-ivory placeholder:text-ivory/15 focus:border-gold-dust focus:outline-none md:text-2xl"
        />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {config.categories.map((c) => (
            <button
              key={c.label}
              type="button"
              onClick={() => setCategory(category === c.label ? null : c.label)}
              aria-pressed={category === c.label}
              className={`rounded-2xl border px-4 py-4 text-left transition-all ${
                category === c.label
                  ? "border-gold-dust/60 bg-gold-dust/10"
                  : "border-ivory/10 hover:border-ivory/30"
              }`}
            >
              <span className="block text-[10px] uppercase tracking-[0.25em] text-ivory">
                {c.label}
              </span>
              <span className="mt-2 block text-[11px] leading-snug text-ivory/40">{c.hint}</span>
            </button>
          ))}
        </div>

        <div>
          <span className="block text-center text-[9px] uppercase tracking-[0.3em] text-gold-dust">
            {scaleLabel}
          </span>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {scale.map((s) => (
              <button
                key={s}
                type="button"
                className="rounded-full border border-ivory/10 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-ivory/60 transition-colors hover:border-gold-dust/60 hover:text-ivory"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <input
          type="text"
          aria-label="Territory"
          placeholder="Territory — city, region or remote"
          className="w-full border-b border-ivory/15 bg-transparent py-3 text-center text-sm font-light text-ivory placeholder:text-ivory/15 focus:border-gold-dust focus:outline-none"
        />

        <div className="text-center">
          <button
            type="submit"
            className="rounded-full bg-ivory px-10 py-4 font-display text-[11px] uppercase tracking-[0.3em] text-space-black transition-transform hover:scale-[1.03]"
          >
            {mode === "offer" ? "Pulse my offer" : "Pulse my need"}
          </button>
          <p className="mx-auto mt-5 max-w-md text-[11px] leading-relaxed text-ivory/35">
            Prototype interface — declarations are not yet stored or transmitted. The connection
            layer that will bring offers and needs together is described below.
          </p>
          {submitted && (
            <p role="status" className="mt-4 text-[10px] uppercase tracking-[0.3em] text-gold-dust">
              Received in the prototype — nothing was saved.
            </p>
          )}
        </div>
      </form>

      {/* Connect layer */}
      <div className="mt-24 rounded-2xl border border-ivory/10 bg-space-deep/50 p-8 md:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-celestial/30 px-3 py-1 text-[9px] uppercase tracking-[0.25em] text-celestial">
            Connect — in preparation
          </span>
        </div>
        <h3 className="mt-6 font-display text-2xl font-light text-ivory">
          The third movement: bringing the two halves together
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-ivory/55">
          Offers and needs are recorded in the same structure — a gesture, a category, a rhythm, a
          territory. That symmetry is what will later allow HUMA to place an offer beside a need and
          let a human decide. There is no automated matching engine today, and no ranking of people.
        </p>
        <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { k: "Proximity", v: "Same territory or same language first." },
            { k: "Compatibility", v: "Category and rhythm must actually meet." },
            { k: "Consent", v: "No connection happens without both sides agreeing." },
          ].map((i) => (
            <li key={i.k}>
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold-dust">{i.k}</span>
              <p className="mt-3 text-xs leading-relaxed text-ivory/50">{i.v}</p>
            </li>
          ))}
        </ul>
        <Link
          to="/about"
          className="mt-8 inline-block text-[10px] uppercase tracking-[0.3em] text-ivory/40 transition-colors hover:text-gold-dust"
        >
          How the protocol works →
        </Link>
      </div>
    </div>
  );
}

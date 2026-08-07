import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { StatusBadge } from "./DataStatus";

export type ContributionMode = "offer" | "need" | "connect";

export const CONTRIBUTION_MODES: {
  id: Exclude<ContributionMode, "connect">;
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
const PRESENCE = ["Remote", "In person", "Either"];
const LANGUAGES = ["English", "Français", "العربية", "Español", "Português", "Other"];
const CONTACT = [
  { id: "map-only", label: "Map only", hint: "Visible as a node; nobody can reach you." },
  { id: "mediated", label: "Mediated", hint: "A human intermediary would propose a connection." },
  { id: "direct", label: "Direct", hint: "You would accept a direct request, once matching exists." },
];

/** Draft shape — mirrors the future persisted record. Nothing is stored today. */
export interface ContributionDraft {
  mode: "offer" | "need";
  summary: string;
  category: string | null;
  availability: string | null;
  territory: string;
  presence: string | null;
  languages: string[];
  contact: string | null;
  consent: boolean;
}

const EMPTY: Omit<ContributionDraft, "mode"> = {
  summary: "",
  category: null,
  availability: null,
  territory: "",
  presence: null,
  languages: [],
  contact: null,
  consent: false,
};

const STEPS = ["The gesture", "Rhythm & place", "Reach", "Review"] as const;

export function ContributionComposer({ initialMode = "offer" }: { initialMode?: ContributionMode }) {
  const [mode, setMode] = useState<"offer" | "need">(
    initialMode === "need" ? "need" : "offer",
  );
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialMode === "need" || initialMode === "offer") setMode(initialMode);
  }, [initialMode]);

  const config = CONTRIBUTION_MODES.find((m) => m.id === mode) ?? CONTRIBUTION_MODES[0]!;
  const scale = mode === "offer" ? RHYTHM : URGENCY;
  const scaleLabel = mode === "offer" ? "Rhythm" : "Timeframe";

  const set = <K extends keyof typeof EMPTY>(k: K, v: (typeof EMPTY)[K]) =>
    setDraft((d) => ({ ...d, [k]: v }));

  const reset = (next: "offer" | "need") => {
    setMode(next);
    setStep(0);
    setDraft(EMPTY);
    setSubmitted(false);
  };

  const canContinue =
    step === 0
      ? draft.summary.trim().length > 2 && !!draft.category
      : step === 1
        ? !!draft.availability && draft.territory.trim().length > 1
        : step === 2
          ? draft.languages.length > 0 && !!draft.contact
          : draft.consent;

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-ivory/10 bg-space-deep/50 p-10 text-center">
        <StatusBadge status="prototype" />
        <h2 className="mt-6 font-display text-3xl font-light text-ivory">
          Your {mode === "offer" ? "offer" : "need"} was composed — and not stored.
        </h2>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-ivory/50">
          There is no database behind this prototype. Nothing left your browser, nothing was
          transmitted, and no one was notified. What you just wrote exists only on this screen.
        </p>
        <div className="mt-8 text-left">
          <DraftSummary draft={{ ...draft, mode }} />
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => reset(mode)}
            className="rounded-full bg-ivory px-8 py-3 font-display text-[10px] uppercase tracking-[0.3em] text-space-black transition-transform hover:scale-[1.03]"
          >
            Compose another
          </button>
          <Link
            to="/methodology"
            className="rounded-full border border-ivory/20 px-8 py-3 font-display text-[10px] uppercase tracking-[0.3em] text-ivory/70 transition-colors hover:border-gold-dust hover:text-gold-dust"
          >
            Why nothing is stored
          </Link>
        </div>
      </div>
    );
  }

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
            onClick={() => reset(m.id)}
            className={`flex-1 rounded-full px-4 py-3 text-[10px] uppercase tracking-[0.25em] transition-all duration-500 ${
              mode === m.id ? "bg-ivory text-space-black" : "text-ivory/50 hover:text-ivory"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Progression */}
      <div className="mt-10">
        <div className="flex items-center gap-2">
          {STEPS.map((s, i) => (
            <span
              key={s}
              className={`h-px flex-1 transition-colors duration-700 ${
                i <= step ? "bg-gold-dust" : "bg-ivory/10"
              }`}
            />
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between text-[9px] uppercase tracking-[0.3em]">
          <span className="text-gold-dust">{STEPS[step]}</span>
          <span className="text-ivory/30">
            {step + 1} / {STEPS.length}
          </span>
        </div>
      </div>

      <form
        className="mt-12"
        onSubmit={(e) => {
          e.preventDefault();
          if (!canContinue) return;
          if (step < STEPS.length - 1) setStep(step + 1);
          else setSubmitted(true);
        }}
      >
        {step === 0 && (
          <div className="space-y-10">
            <div className="text-center">
              <h2 className="font-display text-3xl font-light text-ivory md:text-4xl">
                {config.headline}
              </h2>
              <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-ivory/50">
                {config.intro}
              </p>
            </div>
            <input
              type="text"
              value={draft.summary}
              onChange={(e) => set("summary", e.target.value)}
              aria-label={config.placeholder}
              placeholder={config.placeholder}
              maxLength={140}
              className="w-full border-b border-ivory/15 bg-transparent py-4 text-center text-xl font-light text-ivory placeholder:text-ivory/15 focus:border-gold-dust focus:outline-none md:text-2xl"
            />
            <Field label="Category">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {config.categories.map((c) => (
                  <button
                    key={c.label}
                    type="button"
                    onClick={() => set("category", draft.category === c.label ? null : c.label)}
                    aria-pressed={draft.category === c.label}
                    className={`rounded-2xl border px-4 py-4 text-left transition-all ${
                      draft.category === c.label
                        ? "border-gold-dust/60 bg-gold-dust/10"
                        : "border-ivory/10 hover:border-ivory/30"
                    }`}
                  >
                    <span className="block text-[10px] uppercase tracking-[0.25em] text-ivory">
                      {c.label}
                    </span>
                    <span className="mt-2 block text-[11px] leading-snug text-ivory/40">
                      {c.hint}
                    </span>
                  </button>
                ))}
              </div>
            </Field>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-12">
            <Field label={scaleLabel}>
              <Chips
                options={scale}
                value={draft.availability}
                onSelect={(v) => set("availability", v)}
              />
            </Field>
            <Field label="Territory">
              <input
                type="text"
                value={draft.territory}
                onChange={(e) => set("territory", e.target.value)}
                aria-label="Territory"
                placeholder="City, region — or “Remote”"
                className="w-full border-b border-ivory/15 bg-transparent py-3 text-center text-sm font-light text-ivory placeholder:text-ivory/15 focus:border-gold-dust focus:outline-none"
              />
            </Field>
            <Field label="Presence">
              <Chips
                options={PRESENCE}
                value={draft.presence}
                onSelect={(v) => set("presence", v)}
              />
            </Field>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-12">
            <Field label="Languages">
              <div className="flex flex-wrap justify-center gap-2">
                {LANGUAGES.map((l) => {
                  const on = draft.languages.includes(l);
                  return (
                    <button
                      key={l}
                      type="button"
                      aria-pressed={on}
                      onClick={() =>
                        set(
                          "languages",
                          on ? draft.languages.filter((x) => x !== l) : [...draft.languages, l],
                        )
                      }
                      className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.2em] transition-colors ${
                        on
                          ? "border-gold-dust/60 bg-gold-dust/10 text-ivory"
                          : "border-ivory/10 text-ivory/55 hover:border-ivory/30 hover:text-ivory"
                      }`}
                    >
                      {l}
                    </button>
                  );
                })}
              </div>
            </Field>
            <Field label="How you would want to be reached">
              <div className="grid gap-3">
                {CONTACT.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    aria-pressed={draft.contact === c.id}
                    onClick={() => set("contact", c.id)}
                    className={`rounded-2xl border px-5 py-4 text-left transition-all ${
                      draft.contact === c.id
                        ? "border-gold-dust/60 bg-gold-dust/10"
                        : "border-ivory/10 hover:border-ivory/30"
                    }`}
                  >
                    <span className="block text-[10px] uppercase tracking-[0.25em] text-ivory">
                      {c.label}
                    </span>
                    <span className="mt-2 block text-[11px] leading-snug text-ivory/40">
                      {c.hint}
                    </span>
                  </button>
                ))}
              </div>
              <p className="mt-4 text-center text-[11px] leading-relaxed text-ivory/35">
                No email, phone number or account is requested. The connection layer does not exist
                yet — this only records the preference you would set.
              </p>
            </Field>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-10">
            <div className="text-center">
              <h2 className="font-display text-3xl font-light text-ivory">
                Read it back before you pulse it
              </h2>
            </div>
            <DraftSummary draft={{ ...draft, mode }} />
            <label className="flex cursor-pointer items-start gap-4 rounded-2xl border border-ivory/10 bg-space-deep/40 p-5">
              <input
                type="checkbox"
                checked={draft.consent}
                onChange={(e) => set("consent", e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-gold-dust,#c9a961)]"
              />
              <span className="text-[11px] leading-relaxed text-ivory/55">
                I understand this is a prototype: my declaration is not saved, not transmitted and
                not matched with anyone. If HUMA later opens a real register, I would need to give
                consent again.{" "}
                <Link to="/privacy" className="text-gold-dust underline-offset-4 hover:underline">
                  Privacy
                </Link>
              </span>
            </label>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-12 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="rounded-full border border-ivory/15 px-6 py-3 text-[10px] uppercase tracking-[0.3em] text-ivory/50 transition-colors hover:text-ivory disabled:opacity-25"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={!canContinue}
            className="rounded-full bg-ivory px-8 py-3 font-display text-[10px] uppercase tracking-[0.3em] text-space-black transition-transform hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-25"
          >
            {step < STEPS.length - 1
              ? "Continue"
              : mode === "offer"
                ? "Pulse my offer"
                : "Pulse my need"}
          </button>
        </div>

        <p className="mt-6 text-center text-[11px] leading-relaxed text-ivory/30">
          Prototype interface — declarations are not stored or transmitted. The connection layer
          that will bring offers and needs together is described below.
        </p>
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
          territory, a language, a reach preference. That symmetry is what will later allow HUMA to
          place an offer beside a need and let a human decide. There is no automated matching
          engine today, and no ranking of people.
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <span className="block text-center text-[9px] uppercase tracking-[0.3em] text-gold-dust">
        {label}
      </span>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function Chips({
  options,
  value,
  onSelect,
}: {
  options: string[];
  value: string | null;
  onSelect: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {options.map((s) => (
        <button
          key={s}
          type="button"
          aria-pressed={value === s}
          onClick={() => onSelect(s)}
          className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.2em] transition-colors ${
            value === s
              ? "border-gold-dust/60 bg-gold-dust/10 text-ivory"
              : "border-ivory/10 text-ivory/60 hover:border-gold-dust/60 hover:text-ivory"
          }`}
        >
          {s}
        </button>
      ))}
    </div>
  );
}

function DraftSummary({ draft }: { draft: ContributionDraft }) {
  const rows: { k: string; v: string }[] = [
    { k: draft.mode === "offer" ? "Offer" : "Need", v: draft.summary || "—" },
    { k: "Category", v: draft.category ?? "—" },
    { k: draft.mode === "offer" ? "Rhythm" : "Timeframe", v: draft.availability ?? "—" },
    { k: "Territory", v: draft.territory || "—" },
    { k: "Presence", v: draft.presence ?? "—" },
    { k: "Languages", v: draft.languages.join(" · ") || "—" },
    {
      k: "Reach",
      v: CONTACT.find((c) => c.id === draft.contact)?.label ?? "—",
    },
  ];
  return (
    <dl className="divide-y divide-ivory/5 overflow-hidden rounded-2xl border border-ivory/10">
      {rows.map((r) => (
        <div key={r.k} className="grid grid-cols-[minmax(0,9rem)_minmax(0,1fr)] gap-4 px-5 py-4">
          <dt className="text-[9px] uppercase tracking-[0.3em] text-ivory/35">{r.k}</dt>
          <dd className="min-w-0 text-sm font-light text-ivory/85">{r.v}</dd>
        </div>
      ))}
    </dl>
  );
}

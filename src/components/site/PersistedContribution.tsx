import { FormEvent, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { authenticatedFetch, getSession } from "@/lib/huma-auth";

const OFFER_CATEGORIES = ["Mentorship", "Knowledge", "Care", "Time", "Expertise", "Material"];
const NEED_CATEGORIES = ["Guidance", "Learning", "Care", "Presence", "Expertise", "Practical support"];
const LANGUAGES = ["English", "Français", "العربية", "Español", "Português"];
const AVAILABILITY = ["One-off", "Occasional", "Weekly", "Ongoing"];
const TIMEFRAME = ["No rush", "Within a month", "This week", "Urgent"];

type Mode = "offer" | "need";

export function PersistedContribution({ initialMode = "offer" }: { initialMode?: Mode }) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [territory, setTerritory] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [availability, setAvailability] = useState("");
  const [remotePossible, setRemotePossible] = useState(true);
  const [visibility, setVisibility] = useState<"private" | "constellation">("private");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const session = getSession();
  const categories = mode === "offer" ? OFFER_CATEGORIES : NEED_CATEGORIES;
  const timing = mode === "offer" ? AVAILABILITY : TIMEFRAME;
  const title = useMemo(() => summary.trim().slice(0, 80), [summary]);

  function reset(next: Mode) {
    setMode(next);
    setSummary("");
    setCategory("");
    setTerritory("");
    setLanguages([]);
    setAvailability("");
    setRemotePossible(true);
    setVisibility("private");
    setSaved(false);
    setError(null);
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!session?.user?.id) {
      setError("Enter HUMA before leaving a gesture.");
      return;
    }
    if (!summary.trim() || !category || languages.length === 0) {
      setError("Name the gesture, choose a category and at least one language.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await authenticatedFetch("contributions", {
        method: "POST",
        body: JSON.stringify({
          user_id: session.user.id,
          kind: mode,
          category,
          title,
          description: summary.trim(),
          territory: territory.trim() || null,
          languages,
          remote_possible: remotePossible,
          availability: availability || null,
          visibility,
          is_active: true,
        }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.message || data?.hint || "The gesture could not be saved.");
      }
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "The gesture could not be saved.");
    } finally {
      setLoading(false);
    }
  }

  if (!session) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-ivory/10 bg-space-deep/40 p-8 text-center md:p-12">
        <p className="text-[9px] uppercase tracking-[0.4em] text-gold-dust">Before the gesture</p>
        <h2 className="mt-6 font-display text-3xl font-light text-ivory">Enter HUMA quietly.</h2>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-ivory/45">
          A private account protects what you offer, what you need and whether it ever becomes visible in the constellation.
        </p>
        <Link to="/enter" className="mt-8 inline-block rounded-full bg-ivory px-8 py-4 text-[10px] uppercase tracking-[0.3em] text-space-black">
          Enter HUMA
        </Link>
      </div>
    );
  }

  if (saved) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-gold-dust/20 bg-space-deep/40 p-10 text-center">
        <p className="text-[9px] uppercase tracking-[0.4em] text-gold-dust">Gesture received</p>
        <h2 className="mt-6 font-display text-3xl font-light text-ivory">
          {visibility === "constellation" ? "A new light can enter the constellation." : "Your gesture remains private."}
        </h2>
        <p className="mt-5 text-sm leading-relaxed text-ivory/45">
          {visibility === "constellation"
            ? "Only the gesture and its context may be shown. Your email and private identity stay hidden."
            : "Nothing from this gesture is exposed publicly unless you change its visibility later."}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={() => reset(mode)} className="rounded-full bg-ivory px-7 py-3 text-[10px] uppercase tracking-[0.28em] text-space-black">Leave another</button>
          <Link to="/constellation" className="rounded-full border border-ivory/15 px-7 py-3 text-[10px] uppercase tracking-[0.28em] text-ivory/70">See the constellation</Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-2xl">
      <div className="mx-auto flex max-w-md rounded-full border border-ivory/10 p-1">
        {(["offer", "need"] as Mode[]).map((item) => (
          <button key={item} type="button" onClick={() => reset(item)} className={`flex-1 rounded-full px-5 py-3 text-[10px] uppercase tracking-[0.25em] transition-all ${mode === item ? "bg-ivory text-space-black" : "text-ivory/45 hover:text-ivory"}`}>
            {item === "offer" ? "I can offer" : "I need"}
          </button>
        ))}
      </div>

      <div className="mt-14 text-center">
        <p className="text-[9px] uppercase tracking-[0.4em] text-gold-dust">Leave a gesture</p>
        <h1 className="mt-5 font-display text-4xl font-light text-ivory md:text-5xl">
          {mode === "offer" ? "What can you make available?" : "What are you looking for?"}
        </h1>
      </div>

      <div className="mt-12 space-y-10">
        <label className="block">
          <span className="text-[9px] uppercase tracking-[0.3em] text-ivory/35">The gesture</span>
          <textarea required maxLength={500} value={summary} onChange={(e) => setSummary(e.target.value)} placeholder={mode === "offer" ? "I can offer…" : "I need…"} className="mt-4 min-h-28 w-full resize-none border-b border-ivory/15 bg-transparent py-4 text-xl font-light text-ivory outline-none placeholder:text-ivory/15 focus:border-gold-dust" />
        </label>

        <div>
          <span className="text-[9px] uppercase tracking-[0.3em] text-ivory/35">Category</span>
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.18em] ${category === item ? "border-gold-dust bg-gold-dust/10 text-ivory" : "border-ivory/10 text-ivory/45"}`}>{item}</button>)}
          </div>
        </div>

        <label className="block">
          <span className="text-[9px] uppercase tracking-[0.3em] text-ivory/35">Territory</span>
          <input value={territory} onChange={(e) => setTerritory(e.target.value)} placeholder="Algiers, Oran, remote…" className="mt-3 w-full border-b border-ivory/15 bg-transparent py-3 text-sm text-ivory outline-none placeholder:text-ivory/15 focus:border-gold-dust" />
        </label>

        <div>
          <span className="text-[9px] uppercase tracking-[0.3em] text-ivory/35">Languages</span>
          <div className="mt-4 flex flex-wrap gap-2">
            {LANGUAGES.map((item) => {
              const on = languages.includes(item);
              return <button key={item} type="button" onClick={() => setLanguages(on ? languages.filter((x) => x !== item) : [...languages, item])} className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.18em] ${on ? "border-gold-dust bg-gold-dust/10 text-ivory" : "border-ivory/10 text-ivory/45"}`}>{item}</button>;
            })}
          </div>
        </div>

        <div>
          <span className="text-[9px] uppercase tracking-[0.3em] text-ivory/35">{mode === "offer" ? "Rhythm" : "Timeframe"}</span>
          <div className="mt-4 flex flex-wrap gap-2">
            {timing.map((item) => <button key={item} type="button" onClick={() => setAvailability(item)} className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.18em] ${availability === item ? "border-gold-dust bg-gold-dust/10 text-ivory" : "border-ivory/10 text-ivory/45"}`}>{item}</button>)}
          </div>
        </div>

        <label className="flex items-center justify-between rounded-2xl border border-ivory/10 p-5">
          <span><span className="block text-[10px] uppercase tracking-[0.25em] text-ivory">Remote possible</span><span className="mt-2 block text-[11px] text-ivory/35">Can this gesture travel without physical proximity?</span></span>
          <input type="checkbox" checked={remotePossible} onChange={(e) => setRemotePossible(e.target.checked)} className="h-4 w-4 accent-[var(--color-gold-dust)]" />
        </label>

        <div className="rounded-3xl border border-ivory/10 p-6">
          <p className="text-[9px] uppercase tracking-[0.3em] text-gold-dust">Visibility</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={() => setVisibility("private")} className={`rounded-2xl border p-5 text-left ${visibility === "private" ? "border-gold-dust/60 bg-gold-dust/10" : "border-ivory/10"}`}><span className="text-[10px] uppercase tracking-[0.25em] text-ivory">Private</span><p className="mt-3 text-xs leading-relaxed text-ivory/40">Stored for you. Not shown on the public constellation.</p></button>
            <button type="button" onClick={() => setVisibility("constellation")} className={`rounded-2xl border p-5 text-left ${visibility === "constellation" ? "border-gold-dust/60 bg-gold-dust/10" : "border-ivory/10"}`}><span className="text-[10px] uppercase tracking-[0.25em] text-ivory">Constellation</span><p className="mt-3 text-xs leading-relaxed text-ivory/40">The gesture may appear publicly. Your email remains hidden.</p></button>
          </div>
        </div>

        {error && <p role="alert" className="text-center text-sm text-red-300">{error}</p>}

        <button disabled={loading} type="submit" className="w-full rounded-full bg-ivory px-8 py-4 text-[10px] uppercase tracking-[0.3em] text-space-black disabled:opacity-50">
          {loading ? "Sending the pulse…" : "Pulse this gesture"}
        </button>
        <p className="text-center text-[10px] leading-relaxed text-ivory/30">Private by default. HUMA never publishes your email or account identity in the constellation.</p>
      </div>
    </form>
  );
}

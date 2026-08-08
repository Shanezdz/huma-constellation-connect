import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ParticleField } from "./SiteChrome";
import { publicFetch } from "@/lib/huma-auth";

type Entry = {
  id: string;
  kind: "offer" | "need";
  category: string;
  title: string;
  description: string;
  territory: string | null;
  languages: string[] | null;
  remote_possible: boolean | null;
  availability: string | null;
  created_at: string;
};

export function LiveConstellation() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "offer" | "need">("all");

  useEffect(() => {
    let cancelled = false;
    publicFetch("constellation_entries?select=*&order=created_at.desc&limit=60")
      .then(async (res) => {
        if (!res.ok) throw new Error("The constellation could not be read.");
        const data = (await res.json()) as Entry[];
        if (!cancelled) setEntries(data);
      })
      .catch((err) => !cancelled && setError(err instanceof Error ? err.message : "The constellation could not be read."))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const shown = entries.filter((e) => filter === "all" || e.kind === filter);

  return (
    <section className="relative min-h-screen overflow-hidden px-6 pb-28 pt-20 md:px-12 md:pt-28">
      <ParticleField />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[9px] uppercase tracking-[0.45em] text-gold-dust">01 · See</p>
          <h1 className="mt-7 font-display text-5xl font-light text-ivory md:text-7xl">The Constellation</h1>
          <p className="mx-auto mt-7 max-w-2xl text-sm leading-relaxed text-ivory/45 md:text-base">
            A living field of gestures people have chosen to make visible. HUMA shows the gesture, never the email behind it.
          </p>
          <div className="mx-auto mt-8 inline-flex rounded-full border border-ivory/10 p-1">
            {(["all", "offer", "need"] as const).map((item) => (
              <button key={item} onClick={() => setFilter(item)} className={`rounded-full px-5 py-2 text-[9px] uppercase tracking-[0.25em] ${filter === item ? "bg-ivory text-space-black" : "text-ivory/40"}`}>
                {item}
              </button>
            ))}
          </div>
        </div>

        {loading && <p className="mt-20 text-center text-[10px] uppercase tracking-[0.35em] text-ivory/30">Listening for the constellation…</p>}
        {error && <p className="mt-20 text-center text-sm text-red-300">{error}</p>}

        {!loading && !error && shown.length === 0 && (
          <div className="mx-auto mt-20 max-w-xl rounded-3xl border border-ivory/10 bg-space-deep/40 p-10 text-center">
            <p className="font-display text-2xl font-light text-ivory">No visible gestures yet.</p>
            <p className="mt-4 text-sm leading-relaxed text-ivory/40">The constellation begins when someone chooses to let a gesture become visible.</p>
            <Link to="/offer" className="mt-7 inline-block rounded-full bg-ivory px-7 py-3 text-[10px] uppercase tracking-[0.28em] text-space-black">Leave the first light</Link>
          </div>
        )}

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((entry) => (
            <article key={entry.id} className="group relative overflow-hidden rounded-3xl border border-ivory/10 bg-space-deep/50 p-6 transition-colors hover:border-gold-dust/30">
              <div className={`absolute right-5 top-5 h-2 w-2 rounded-full ${entry.kind === "offer" ? "bg-aurora" : "bg-celestial"}`} />
              <p className="text-[9px] uppercase tracking-[0.3em] text-gold-dust">{entry.kind} · {entry.category}</p>
              <h2 className="mt-5 font-display text-2xl font-light leading-snug text-ivory">{entry.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-ivory/45">{entry.description}</p>
              <div className="mt-7 space-y-2 border-t border-ivory/5 pt-5 text-[10px] uppercase tracking-[0.2em] text-ivory/30">
                {entry.territory && <p>{entry.territory}</p>}
                {entry.languages?.length ? <p>{entry.languages.join(" · ")}</p> : null}
                {entry.availability && <p>{entry.availability}</p>}
                {entry.remote_possible && <p>Remote possible</p>}
              </div>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-14 max-w-2xl text-center text-[10px] leading-relaxed text-ivory/25">
          Public entries come from HUMA’s safe constellation view. Account identifiers and email addresses are not included in this public reading.
        </p>
      </div>
    </section>
  );
}

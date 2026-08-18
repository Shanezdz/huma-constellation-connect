import { useState } from "react";
import { Link, useRouteLoaderData } from "@tanstack/react-router";
import { ParticleField } from "./SiteChrome";
import { authenticatedFetch, getSession } from "@/lib/huma-auth";

type Entry = {
  id: string;
  recipient_id: string;
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
  const routeData = useRouteLoaderData("/constellation") as { entries: Entry[] } | undefined;
  const entries = routeData?.entries || [];
  const [filter, setFilter] = useState<"all" | "offer" | "need">("all");
  const [connecting, setConnecting] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function requestConnection(entry: Entry) {
    const session = getSession();
    if (!session) {
      window.location.href = "/enter";
      return;
    }
    if (session.user.id === entry.recipient_id) {
      setNotice("This light is already yours.");
      return;
    }
    const message = window.prompt("A few words are enough. Why would you like to connect?", "I feel there may be something useful to exchange.");
    if (message === null) return;
    setConnecting(entry.id);
    setNotice(null);
    try {
      const response = await authenticatedFetch("connection_requests", {
        method: "POST",
        body: JSON.stringify({
          contribution_id: entry.id,
          requester_id: session.user.id,
          recipient_id: entry.recipient_id,
          message: message.trim().slice(0, 500) || null,
        }),
      });
      if (!response.ok) {
        const detail = await response.text();
        if (response.status === 409 || detail.includes("duplicate")) throw new Error("You have already sent a request for this gesture.");
        throw new Error("The request could not cross the constellation.");
      }
      setNotice("Your signal was sent. Nothing is shared unless the other person accepts.");
    } catch (e) {
      setNotice(e instanceof Error ? e.message : "The signal was interrupted.");
    } finally {
      setConnecting(null);
    }
  }

  const shown = entries.filter((e) => filter === "all" || e.kind === filter);

  return (
    <section className="relative min-h-screen overflow-hidden px-6 pb-28 pt-20 md:px-12 md:pt-28">
      <ParticleField />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[9px] uppercase tracking-[0.45em] text-gold-dust">01 · See</p>
          <h1 className="mt-7 font-display text-5xl font-light text-ivory md:text-7xl">The Constellation</h1>
          <p className="mx-auto mt-7 max-w-2xl text-sm leading-relaxed text-ivory/45 md:text-base">A living field of gestures people have chosen to make visible. HUMA shows the gesture, never the email behind it.</p>
          <div className="mx-auto mt-8 inline-flex rounded-full border border-ivory/10 p-1">
            {(["all", "offer", "need"] as const).map((item) => (
              <button key={item} onClick={() => setFilter(item)} className={`rounded-full px-5 py-2 text-[9px] uppercase tracking-[0.25em] ${filter === item ? "bg-ivory text-space-black" : "text-ivory/40"}`}>{item}</button>
            ))}
          </div>
          {notice && <p className="mx-auto mt-7 max-w-xl text-sm leading-relaxed text-gold-dust/80">{notice}</p>}
        </div>

        {shown.length === 0 && (
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
              <button type="button" disabled={connecting === entry.id} onClick={() => void requestConnection(entry)} className="mt-6 rounded-full border border-ivory/10 px-5 py-2.5 text-[9px] uppercase tracking-[0.24em] text-ivory/50 transition-colors hover:border-gold-dust/50 hover:text-gold-dust disabled:opacity-30">
                {connecting === entry.id ? "Sending signal…" : "Send a signal"}
              </button>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-14 max-w-2xl text-center text-[10px] leading-relaxed text-ivory/25">Public entries expose a technical recipient reference only to enable consent-based connection requests. Emails and profile identity remain absent from the public constellation.</p>
      </div>
    </section>
  );
}

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/site/SiteChrome";
import { authenticatedFetch, getSession, signOut } from "@/lib/huma-auth";

type Gesture = {
  id: string;
  kind: "offer" | "need";
  category: string;
  title: string;
  description: string;
  territory: string | null;
  languages: string[];
  remote_possible: boolean;
  availability: string | null;
  visibility: "private" | "constellation";
  is_active: boolean;
  created_at: string;
};

export const Route = createFileRoute("/my-huma")({
  component: MyHuma,
  head: () => ({ meta: [{ title: "My HUMA — Your quiet place" }] }),
});

function MyHuma() {
  const navigate = useNavigate();
  const [gestures, setGestures] = useState<Gesture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const session = typeof window !== "undefined" ? getSession() : null;

  async function load() {
    setLoading(true);
    setError(null);
    try {
      if (!getSession()) {
        await navigate({ to: "/enter" });
        return;
      }
      const response = await authenticatedFetch(
        "contributions?select=id,kind,category,title,description,territory,languages,remote_possible,availability,visibility,is_active,created_at&order=created_at.desc",
      );
      if (!response.ok) throw new Error("Your gestures could not be reached.");
      setGestures(await response.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : "The connection was interrupted.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void load(); }, []);

  async function patch(id: string, values: Partial<Pick<Gesture, "visibility" | "is_active">>) {
    setError(null);
    const response = await authenticatedFetch(`contributions?id=eq.${id}`, {
      method: "PATCH",
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      setError("This gesture could not be changed.");
      return;
    }
    await load();
  }

  async function remove(id: string) {
    if (!window.confirm("Remove this gesture permanently from HUMA?")) return;
    const response = await authenticatedFetch(`contributions?id=eq.${id}`, { method: "DELETE" });
    if (!response.ok) {
      setError("This gesture could not be removed.");
      return;
    }
    await load();
  }

  return (
    <SiteLayout>
      <section className="px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-8 border-b border-ivory/10 pb-12 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-[0.45em] text-gold-dust">Your quiet place</p>
              <h1 className="mt-5 font-display text-5xl font-light text-ivory md:text-7xl">My HUMA</h1>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-ivory/45">
                What you have offered, what you have asked for, and what you have chosen to let the constellation see.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/offer" className="rounded-full bg-ivory px-6 py-3 text-[9px] uppercase tracking-[0.28em] text-space-black">Leave a gesture</Link>
              <button type="button" onClick={() => { signOut(); void navigate({ to: "/" }); }} className="rounded-full border border-ivory/15 px-6 py-3 text-[9px] uppercase tracking-[0.28em] text-ivory/50 hover:text-ivory">Leave quietly</button>
            </div>
          </div>

          {session?.user?.email && <p className="mt-6 text-[10px] tracking-[0.18em] text-ivory/25">Signed in privately as {session.user.email}</p>}
          {error && <p className="mt-8 text-sm text-red-300">{error}</p>}
          {loading ? (
            <p className="py-24 text-center text-[10px] uppercase tracking-[0.35em] text-ivory/30">Gathering your gestures…</p>
          ) : gestures.length === 0 ? (
            <div className="py-28 text-center">
              <p className="font-display text-3xl font-light text-ivory">Nothing has been left here yet.</p>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ivory/40">A first gesture can be an offer or a need. HUMA gives both the same dignity.</p>
            </div>
          ) : (
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {gestures.map((g) => (
                <article key={g.id} className={`rounded-3xl border p-6 ${g.is_active ? "border-ivory/10 bg-space-deep/40" : "border-ivory/5 bg-space-deep/20 opacity-55"}`}>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[9px] uppercase tracking-[0.32em] text-gold-dust">{g.kind} · {g.category}</span>
                    <span className="text-[9px] uppercase tracking-[0.24em] text-ivory/30">{g.visibility}</span>
                  </div>
                  <h2 className="mt-5 font-display text-2xl font-light text-ivory">{g.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ivory/45">{g.description}</p>
                  <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-ivory/30">
                    {g.territory && <span>{g.territory}</span>}
                    {g.languages?.length > 0 && <span>{g.languages.join(" · ")}</span>}
                    {g.availability && <span>{g.availability}</span>}
                    {g.remote_possible && <span>Remote possible</span>}
                  </div>
                  <div className="mt-7 flex flex-wrap gap-2 border-t border-ivory/5 pt-5">
                    <button type="button" onClick={() => void patch(g.id, { visibility: g.visibility === "private" ? "constellation" : "private" })} className="rounded-full border border-ivory/10 px-4 py-2 text-[9px] uppercase tracking-[0.2em] text-ivory/55 hover:border-gold-dust/50 hover:text-gold-dust">
                      {g.visibility === "private" ? "Let constellation see" : "Make private"}
                    </button>
                    <button type="button" onClick={() => void patch(g.id, { is_active: !g.is_active })} className="rounded-full border border-ivory/10 px-4 py-2 text-[9px] uppercase tracking-[0.2em] text-ivory/55 hover:text-ivory">
                      {g.is_active ? "Let it rest" : "Wake it"}
                    </button>
                    <button type="button" onClick={() => void remove(g.id)} className="rounded-full px-4 py-2 text-[9px] uppercase tracking-[0.2em] text-ivory/25 hover:text-red-300">Remove</button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

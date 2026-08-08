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

type Profile = {
  display_name: string | null;
  contact_method: string | null;
  contact_value: string | null;
};

export const Route = createFileRoute("/my-huma")({
  component: MyHuma,
  head: () => ({ meta: [{ title: "My HUMA — Your quiet place" }] }),
});

function MyHuma() {
  const navigate = useNavigate();
  const [gestures, setGestures] = useState<Gesture[]>([]);
  const [profile, setProfile] = useState<Profile>({ display_name: "", contact_method: "", contact_value: "" });
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const session = typeof window !== "undefined" ? getSession() : null;

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const current = getSession();
      if (!current) {
        await navigate({ to: "/enter" });
        return;
      }
      const [gesturesResponse, profileResponse] = await Promise.all([
        authenticatedFetch("contributions?select=id,kind,category,title,description,territory,languages,remote_possible,availability,visibility,is_active,created_at&order=created_at.desc"),
        authenticatedFetch(`profiles?id=eq.${current.user.id}&select=display_name,contact_method,contact_value`),
      ]);
      if (!gesturesResponse.ok) throw new Error("Your gestures could not be reached.");
      setGestures(await gesturesResponse.json());
      if (profileResponse.ok) {
        const rows = (await profileResponse.json()) as Profile[];
        if (rows[0]) setProfile({
          display_name: rows[0].display_name ?? "",
          contact_method: rows[0].contact_method ?? "",
          contact_value: rows[0].contact_value ?? "",
        });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "The connection was interrupted.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void load(); }, []);

  async function saveProfile() {
    const current = getSession();
    if (!current) return;
    setSavingProfile(true);
    setProfileSaved(false);
    setError(null);
    const response = await authenticatedFetch(`profiles?id=eq.${current.user.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        display_name: profile.display_name?.trim() || null,
        contact_method: profile.contact_method?.trim() || null,
        contact_value: profile.contact_value?.trim() || null,
      }),
    });
    if (!response.ok) setError("Your private contact settings could not be saved.");
    else setProfileSaved(true);
    setSavingProfile(false);
  }

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
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-ivory/45">What you have offered, what you have asked for, and what you have chosen to let the constellation see.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/connections" className="rounded-full border border-gold-dust/30 px-6 py-3 text-[9px] uppercase tracking-[0.28em] text-gold-dust hover:bg-gold-dust/10">Signals</Link>
              <Link to="/offer" className="rounded-full bg-ivory px-6 py-3 text-[9px] uppercase tracking-[0.28em] text-space-black">Leave a gesture</Link>
              <button type="button" onClick={() => { signOut(); void navigate({ to: "/" }); }} className="rounded-full border border-ivory/15 px-6 py-3 text-[9px] uppercase tracking-[0.28em] text-ivory/50 hover:text-ivory">Leave quietly</button>
            </div>
          </div>

          {session?.user?.email && <p className="mt-6 text-[10px] tracking-[0.18em] text-ivory/25">Signed in privately as {session.user.email}</p>}
          {error && <p className="mt-8 text-sm text-red-300">{error}</p>}

          <div className="mt-10 rounded-3xl border border-ivory/10 bg-space-deep/35 p-6 md:p-8">
            <div className="max-w-2xl">
              <p className="text-[9px] uppercase tracking-[0.35em] text-gold-dust">If a connection opens</p>
              <h2 className="mt-4 font-display text-3xl font-light text-ivory">Choose what may be revealed.</h2>
              <p className="mt-4 text-sm leading-relaxed text-ivory/40">These details remain private. HUMA can reveal them to one accepted connection only after both people explicitly agree.</p>
            </div>
            <div className="mt-7 grid gap-5 md:grid-cols-3">
              <label>
                <span className="text-[9px] uppercase tracking-[0.28em] text-ivory/35">Name or alias</span>
                <input value={profile.display_name ?? ""} onChange={(e) => setProfile((p) => ({ ...p, display_name: e.target.value }))} placeholder="How you wish to be known" className="mt-3 w-full border-b border-ivory/15 bg-transparent py-3 text-sm text-ivory outline-none placeholder:text-ivory/15 focus:border-gold-dust" />
              </label>
              <label>
                <span className="text-[9px] uppercase tracking-[0.28em] text-ivory/35">Contact method</span>
                <input value={profile.contact_method ?? ""} onChange={(e) => setProfile((p) => ({ ...p, contact_method: e.target.value }))} placeholder="Email, Signal, LinkedIn…" className="mt-3 w-full border-b border-ivory/15 bg-transparent py-3 text-sm text-ivory outline-none placeholder:text-ivory/15 focus:border-gold-dust" />
              </label>
              <label>
                <span className="text-[9px] uppercase tracking-[0.28em] text-ivory/35">Contact detail</span>
                <input value={profile.contact_value ?? ""} onChange={(e) => setProfile((p) => ({ ...p, contact_value: e.target.value }))} placeholder="Address, handle or link" className="mt-3 w-full border-b border-ivory/15 bg-transparent py-3 text-sm text-ivory outline-none placeholder:text-ivory/15 focus:border-gold-dust" />
              </label>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button type="button" onClick={() => void saveProfile()} disabled={savingProfile} className="rounded-full border border-ivory/15 px-6 py-3 text-[9px] uppercase tracking-[0.26em] text-ivory hover:border-gold-dust/50 hover:text-gold-dust disabled:opacity-40">{savingProfile ? "Saving…" : "Save private contact"}</button>
              {profileSaved && <span className="text-[10px] text-aurora">Saved privately.</span>}
            </div>
          </div>

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
                    <button type="button" onClick={() => void patch(g.id, { visibility: g.visibility === "private" ? "constellation" : "private" })} className="rounded-full border border-ivory/10 px-4 py-2 text-[9px] uppercase tracking-[0.2em] text-ivory/55 hover:border-gold-dust/50 hover:text-gold-dust">{g.visibility === "private" ? "Let constellation see" : "Make private"}</button>
                    <button type="button" onClick={() => void patch(g.id, { is_active: !g.is_active })} className="rounded-full border border-ivory/10 px-4 py-2 text-[9px] uppercase tracking-[0.2em] text-ivory/55 hover:text-ivory">{g.is_active ? "Let it rest" : "Wake it"}</button>
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

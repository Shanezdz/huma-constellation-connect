import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/site/SiteChrome";
import { authenticatedFetch, getSession } from "@/lib/huma-auth";

type Request = {
  id: string;
  contribution_id: string;
  requester_id: string;
  recipient_id: string;
  message: string | null;
  status: "pending" | "accepted" | "declined" | "cancelled";
  created_at: string;
};

export const Route = createFileRoute("/connections")({
  component: Connections,
  head: () => ({ meta: [{ title: "Signals — HUMA" }] }),
});

function Connections() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const me = typeof window !== "undefined" ? getSession()?.user.id : undefined;

  async function load() {
    if (!getSession()) { await navigate({ to: "/enter" }); return; }
    setLoading(true);
    try {
      const response = await authenticatedFetch("connection_requests?select=*&order=created_at.desc");
      if (!response.ok) throw new Error("Signals could not be reached.");
      setRequests(await response.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : "The connection was interrupted.");
    } finally { setLoading(false); }
  }

  useEffect(() => { void load(); }, []);

  async function answer(id: string, status: "accepted" | "declined") {
    const response = await authenticatedFetch(`connection_requests?id=eq.${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    if (!response.ok) { setError("Your answer could not be recorded."); return; }
    await load();
  }

  async function cancel(id: string) {
    const response = await authenticatedFetch(`connection_requests?id=eq.${id}`, { method: "DELETE" });
    if (!response.ok) { setError("The signal could not be withdrawn."); return; }
    await load();
  }

  return (
    <SiteLayout>
      <section className="px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="text-[9px] uppercase tracking-[0.45em] text-gold-dust">Consent before contact</p>
          <h1 className="mt-6 font-display text-5xl font-light text-ivory md:text-7xl">Signals</h1>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ivory/45">A signal is only an invitation. HUMA does not reveal contact details here. The person receiving a signal decides whether the connection may continue.</p>
          <div className="mt-7"><Link to="/my-huma" className="text-[9px] uppercase tracking-[0.25em] text-ivory/35 hover:text-ivory">← My HUMA</Link></div>

          {error && <p className="mt-8 text-sm text-red-300">{error}</p>}
          {loading ? <p className="py-24 text-center text-[10px] uppercase tracking-[0.35em] text-ivory/30">Listening for signals…</p> : requests.length === 0 ? (
            <div className="py-28 text-center"><p className="font-display text-3xl font-light text-ivory">No signals have crossed your path yet.</p></div>
          ) : (
            <div className="mt-12 space-y-4">
              {requests.map((r) => {
                const incoming = r.recipient_id === me;
                return (
                  <article key={r.id} className="rounded-3xl border border-ivory/10 bg-space-deep/40 p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="text-[9px] uppercase tracking-[0.3em] text-gold-dust">{incoming ? "Received signal" : "Signal sent"}</span>
                      <span className="text-[9px] uppercase tracking-[0.25em] text-ivory/30">{r.status}</span>
                    </div>
                    <p className="mt-5 font-display text-xl font-light leading-relaxed text-ivory">{r.message || "A quiet invitation to connect."}</p>
                    {r.status === "pending" && incoming && (
                      <div className="mt-6 flex gap-2">
                        <button type="button" onClick={() => void answer(r.id, "accepted")} className="rounded-full bg-ivory px-5 py-2.5 text-[9px] uppercase tracking-[0.24em] text-space-black">Accept</button>
                        <button type="button" onClick={() => void answer(r.id, "declined")} className="rounded-full border border-ivory/10 px-5 py-2.5 text-[9px] uppercase tracking-[0.24em] text-ivory/45 hover:text-ivory">Decline</button>
                      </div>
                    )}
                    {r.status === "pending" && !incoming && <button type="button" onClick={() => void cancel(r.id)} className="mt-6 text-[9px] uppercase tracking-[0.24em] text-ivory/25 hover:text-ivory">Withdraw signal</button>}
                    {r.status === "accepted" && <p className="mt-6 text-xs leading-relaxed text-aurora">Connection accepted. Contact exchange remains intentionally closed until HUMA adds a protected mutual reveal step.</p>}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

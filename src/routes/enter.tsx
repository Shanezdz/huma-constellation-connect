import { createFileRoute, Link } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { SiteLayout } from "@/components/site/SiteChrome";
import { requestPasswordReset, signIn, signUp } from "@/lib/huma-auth";

export const Route = createFileRoute("/enter")({ component: EnterHuma, head: () => ({ meta: [{ title: "Enter HUMA" }, { name: "description", content: "Create a quiet identity in HUMA and enter the solidarity constellation." }] }) });

function EnterHuma() {
  const [mode, setMode] = useState<"signup" | "signin" | "forgot">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault(); setLoading(true); setMessage(null); setError(null);
    try {
      if (mode === "forgot") {
        await requestPasswordReset(email.trim());
        setMessage("If this address belongs to a HUMA account, a private recovery link has been sent. Check your inbox and spam folder.");
      } else if (mode === "signup") {
        const result = await signUp(email.trim(), password);
        if (result?.session || result?.access_token) { await signIn(email.trim(), password); setMessage("You are inside HUMA. Your identity remains private by default."); }
        else setMessage("Your place has been created. Check your email to confirm it, then return to enter HUMA.");
      } else {
        await signIn(email.trim(), password); setMessage("Welcome back. The constellation remembers your place.");
      }
    } catch (err) { setError(err instanceof Error ? err.message : "Something interrupted the connection."); }
    finally { setLoading(false); }
  }

  return <SiteLayout><section className="relative min-h-[78vh] overflow-hidden px-6 py-20 md:px-12 md:py-28"><div className="pointer-events-none absolute left-1/2 top-1/3 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full border border-ivory/[0.05]" /><div className="relative mx-auto max-w-xl text-center"><p className="text-[9px] uppercase tracking-[0.45em] text-gold-dust">Enter the constellation</p><h1 className="mt-7 font-display text-4xl font-light leading-tight text-ivory md:text-6xl">A quiet identity.<br />Nothing more than needed.</h1><p className="mx-auto mt-7 max-w-md text-sm leading-relaxed text-ivory/50">HUMA asks only for what is necessary to protect your gestures, your needs and your consent. Your profile is private by default.</p>
  {mode !== "forgot" && <div className="mx-auto mt-12 flex max-w-sm rounded-full border border-ivory/10 p-1"><button type="button" onClick={() => { setMode("signup"); setMessage(null); setError(null); }} className={`flex-1 rounded-full px-5 py-3 text-[10px] uppercase tracking-[0.25em] ${mode === "signup" ? "bg-ivory text-space-black" : "text-ivory/45"}`}>Create a place</button><button type="button" onClick={() => { setMode("signin"); setMessage(null); setError(null); }} className={`flex-1 rounded-full px-5 py-3 text-[10px] uppercase tracking-[0.25em] ${mode === "signin" ? "bg-ivory text-space-black" : "text-ivory/45"}`}>Return</button></div>}
  {mode === "forgot" && <div className="mt-12"><p className="text-[9px] uppercase tracking-[0.35em] text-gold-dust">Recover your place</p><h2 className="mt-4 font-display text-3xl font-light text-ivory">A new key, without losing what you left here.</h2></div>}
  <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-md space-y-7 text-left"><label className="block"><span className="text-[9px] uppercase tracking-[0.3em] text-ivory/35">Email</span><input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-3 w-full border-b border-ivory/15 bg-transparent py-3 text-base text-ivory outline-none focus:border-gold-dust" placeholder="you@example.org" /></label>{mode !== "forgot" && <label className="block"><span className="text-[9px] uppercase tracking-[0.3em] text-ivory/35">Passphrase</span><input type="password" required minLength={8} autoComplete={mode === "signup" ? "new-password" : "current-password"} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-3 w-full border-b border-ivory/15 bg-transparent py-3 text-base text-ivory outline-none focus:border-gold-dust" placeholder="At least 8 characters" /></label>}<button type="submit" disabled={loading} className="w-full rounded-full bg-ivory px-8 py-4 text-[10px] uppercase tracking-[0.3em] text-space-black disabled:opacity-50">{loading ? "Connecting…" : mode === "forgot" ? "Send recovery link" : mode === "signup" ? "Create my place" : "Enter HUMA"}</button></form>
  {mode === "signin" && <button type="button" onClick={() => { setMode("forgot"); setMessage(null); setError(null); }} className="mt-6 text-[10px] tracking-[0.18em] text-ivory/40 underline decoration-ivory/15 underline-offset-4 hover:text-ivory">Forgot your passphrase?</button>}
  {mode === "forgot" && <button type="button" onClick={() => { setMode("signin"); setMessage(null); setError(null); }} className="mt-6 text-[10px] tracking-[0.18em] text-ivory/40 underline decoration-ivory/15 underline-offset-4 hover:text-ivory">Return to sign in</button>}
  {message && <p role="status" className="mx-auto mt-7 max-w-md text-sm leading-relaxed text-aurora">{message}</p>}{error && <p role="alert" className="mx-auto mt-7 max-w-md text-sm leading-relaxed text-red-300">{error}</p>}<p className="mx-auto mt-10 max-w-md text-[11px] leading-relaxed text-ivory/30">No public profile is created automatically. Your email is never shown in the constellation. Participation becomes visible only when you explicitly choose to publish a gesture.</p><div className="mt-10 flex flex-wrap justify-center gap-5 text-[9px] uppercase tracking-[0.28em] text-ivory/30"><Link to="/privacy">Privacy</Link><Link to="/methodology">How HUMA handles data</Link></div></div></section></SiteLayout>;
}

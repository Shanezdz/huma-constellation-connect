import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, ParticleField } from "@/components/site/SiteChrome";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "HUMA — A poetic map of what still connects us" },
      {
        name: "description",
        content:
          "HUMA is a poetic digital constellation of human solidarity — a living map of what people can offer, what they need, and what quietly connects us across borders.",
      },
      { property: "og:title", content: "HUMA — A poetic map of what still connects us" },
      {
        property: "og:description",
        content: "Mapping the invisible architecture of human solidarity.",
      },
      { property: "og:url", content: "https://huma-constellation-connect.vercel.app/" },
      {
        property: "og:image",
        content: "https://huma-constellation-connect.vercel.app/og/og-home.jpg",
      },
      {
        name: "twitter:image",
        content: "https://huma-constellation-connect.vercel.app/og/og-home.jpg",
      },
    ],
    links: [{ rel: "canonical", href: "https://huma-constellation-connect.vercel.app/" }],
  }),
});

const acts = [
  {
    n: "01",
    verb: "SEE",
    title: "The Constellation",
    body: "A speculative field of human gestures, needs, knowledge and care. Not a census. A way of seeing what is usually invisible.",
    to: "/constellation",
  },
  {
    n: "02",
    verb: "GIVE / ASK",
    title: "What passes between us",
    body: "Offer a skill, an hour, a translation, a presence. Ask for what you need. HUMA treats both gestures with the same dignity.",
    to: "/offer",
  },
  {
    n: "03",
    verb: "ECHO",
    title: "What one gesture becomes",
    body: "A small act can travel further than the person who began it. HUMA explores propagation as a human, not merely technical, phenomenon.",
    to: "/echo",
  },
  {
    n: "04",
    verb: "REMEMBER",
    title: "Stories of Humanity",
    body: "Illustrative narratives of transmission, care and reciprocity. Each story is clearly labelled so imagination never masquerades as evidence.",
    to: "/stories",
  },
  {
    n: "05",
    verb: "FEEL",
    title: "The Human Pulse",
    body: "A poetic reading of collective capacity. Prototype signals are shown as speculative, never as live global measurement.",
    to: "/pulse",
  },
  {
    n: "06",
    verb: "IMAGINE",
    title: "Future Humanity",
    body: "Possible futures in which knowledge, care and solidarity circulate as commons rather than remain isolated assets.",
    to: "/future",
  },
] as const;

function Index() {
  return (
    <SiteLayout>
      <section className="relative -mt-24 flex min-h-screen items-center overflow-hidden px-6 md:px-12">
        <div className="earth-glow absolute inset-0 -z-10" />
        <ParticleField />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70vw] max-h-[760px] w-[70vw] max-w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ivory/[0.05]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[52vw] max-h-[560px] w-[52vw] max-w-[560px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-dashed border-ivory/[0.05]" />

        <div className="relative z-10 mx-auto w-full max-w-6xl pt-24 text-center">
          <p className="text-[10px] uppercase tracking-[0.45em] text-gold-dust/80">A poetic digital constellation</p>
          <h1 className="mt-8 font-display text-[24vw] font-light leading-[0.78] tracking-[-0.07em] text-ivory sm:text-[17vw] md:text-[10rem]">
            HUMA
          </h1>
          <p className="mx-auto mt-10 max-w-3xl text-balance font-display text-2xl font-light leading-snug text-ivory/90 md:text-5xl">
            Mapping the invisible architecture of human solidarity.
          </p>
          <p className="mx-auto mt-7 max-w-2xl text-sm leading-relaxed text-ivory/50 md:text-base">
            HUMA does not create solidarity. It tries to make visible what already connects us:
            knowledge, time, care, needs, transmission and the quiet consequences of one human gesture.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/constellation"
              className="rounded-full bg-ivory px-8 py-4 text-[10px] uppercase tracking-[0.32em] text-space-black transition-transform hover:scale-[1.03]"
            >
              Enter the constellation
            </Link>
            <Link
              to="/offer"
              className="rounded-full border border-ivory/20 px-8 py-4 text-[10px] uppercase tracking-[0.32em] text-ivory/80 transition-colors hover:border-gold-dust hover:text-gold-dust"
            >
              Leave a gesture
            </Link>
          </div>
          <p className="mt-10 text-[9px] uppercase tracking-[0.34em] text-ivory/25">
            Prototype experience · speculative data clearly identified
          </p>
        </div>
      </section>

      <section className="border-y border-ivory/5 px-6 py-28 md:px-12 md:py-40">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold-dust">The invisible</p>
            <h2 className="mt-6 font-display text-4xl font-light leading-tight text-ivory md:text-6xl">
              What if solidarity could be perceived before it had to become a statistic?
            </h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-ivory/55 md:pb-2 md:text-lg">
            <p>
              We map roads, capital, weather and attention. Yet much of what keeps societies alive remains uncharted:
              who can teach, who can listen, who can translate, who needs help, who has an hour to give.
            </p>
            <p>
              HUMA treats those quiet capacities as a constellation. The interface is poetic on the surface;
              civic intelligence sits underneath.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-28 md:px-12 md:py-40">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold-dust">Six acts</p>
              <h2 className="mt-5 font-display text-4xl font-light text-ivory md:text-6xl">A journey through connection</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ivory/40">
              Not six product features. Six movements: see, give, echo, remember, feel, imagine.
            </p>
          </div>

          <div className="divide-y divide-ivory/10 border-y border-ivory/10">
            {acts.map((act) => (
              <Link
                key={act.n}
                to={act.to}
                className="group grid gap-5 py-9 transition-colors hover:bg-ivory/[0.025] md:grid-cols-[90px_160px_1fr_24px] md:items-center md:px-4"
              >
                <span className="text-[10px] tracking-[0.4em] text-ivory/25">{act.n}</span>
                <span className="text-[10px] uppercase tracking-[0.32em] text-gold-dust">{act.verb}</span>
                <div>
                  <h3 className="font-display text-2xl font-light text-ivory md:text-3xl">{act.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ivory/45">{act.body}</p>
                </div>
                <span className="text-xl text-ivory/25 transition-transform group-hover:translate-x-1 group-hover:text-ivory">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-ivory/5 px-6 py-32 text-center md:px-12 md:py-44">
        <ParticleField />
        <div className="relative z-10 mx-auto max-w-4xl">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold-dust">A simple proposition</p>
          <p className="mt-8 font-display text-3xl font-light leading-snug text-ivory md:text-6xl">
            Offer what you can. Ask for what you need. Let the map reveal what quietly connects us.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/offer"
              className="rounded-full bg-ivory px-8 py-4 text-[10px] uppercase tracking-[0.32em] text-space-black"
            >
              I can offer
            </Link>
            <Link
              to="/offer"
              search={{ mode: "need" }}
              className="rounded-full border border-ivory/20 px-8 py-4 text-[10px] uppercase tracking-[0.32em] text-ivory"
            >
              I need
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

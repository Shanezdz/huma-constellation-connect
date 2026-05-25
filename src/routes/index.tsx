import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import earthImg from "@/assets/earth-constellation.jpg";
import storyHands from "@/assets/story-hands.jpg";
import storyLandscape from "@/assets/story-landscape.jpg";
import storyCircle from "@/assets/story-circle.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const SUBTITLES = [
  "Mapping the invisible architecture of human solidarity.",
  "Every act of care changes the map.",
  "Humanity is still alive.",
  "Invisible gestures hold the world together.",
  "A living constellation of human connection.",
];

const STORIES = [
  {
    place: "Kyoto, Japan",
    accent: "text-gold-dust",
    title: "The Master & The Apprentice",
    body: "A retired calligrapher is teaching digital typography to four hundred students across Brazil through the HUMA protocol.",
    img: storyHands,
  },
  {
    place: "Nairobi, Kenya",
    accent: "text-celestial",
    title: "The Water Weaver",
    body: "One local solution for atmospheric water harvesting, shared with community leaders in twelve arid regions worldwide.",
    img: storyLandscape,
  },
  {
    place: "Reykjavík, Iceland",
    accent: "text-aurora",
    title: "The Listening Project",
    body: "Anonymous psychological support networks bridging generations of isolated individuals through the winter months.",
    img: storyCircle,
  },
];

const PULSE_METRICS = [
  { value: "842,019", label: "Active solidarity flows", tone: "text-celestial" },
  { value: "156", label: "Nations linked", tone: "text-aurora" },
  { value: "12.4M", label: "Hours gifted", tone: "text-gold-dust" },
  { value: "4.2s", label: "Mean echo interval", tone: "text-ivory" },
];

const FUTURES = [
  {
    n: "I",
    title: "Cities of cooperation",
    body: "Urban systems designed around mutual aid rather than extraction — neighborhoods that breathe as collectives.",
  },
  {
    n: "II",
    title: "Decentralized learning",
    body: "Knowledge transmitted across borders without gatekeepers. A planetary library held by everyone, owned by no one.",
  },
  {
    n: "III",
    title: "Ecological solidarity",
    body: "Care for land, water, and air woven into the same map as care for one another. One continuous gesture.",
  },
];

function useRotatingSubtitle() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % SUBTITLES.length), 4200);
    return () => clearInterval(id);
  }, []);
  return SUBTITLES[i];
}

function ParticleField() {
  // Deterministic, decorative particles — no hydration mismatch
  const stars = useMemo(() => {
    const seed = (n: number) => Math.abs(Math.sin(n * 9301 + 49297) * 233280) % 1;
    return Array.from({ length: 80 }, (_, i) => ({
      top: seed(i) * 100,
      left: seed(i + 1) * 100,
      size: seed(i + 2) * 1.5 + 0.3,
      delay: seed(i + 3) * 5,
      hue: i % 7 === 0 ? "bg-gold-dust" : i % 5 === 0 ? "bg-celestial" : i % 11 === 0 ? "bg-aurora" : "bg-ivory",
    }));
  }, []);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s, i) => (
        <span
          key={i}
          className={`absolute rounded-full ${s.hue} animate-pulse-soft`}
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            boxShadow: "0 0 8px currentColor",
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  );
}

function Nav() {
  return (
    <nav className="fixed top-0 z-40 flex w-full items-center justify-between px-6 py-6 md:px-12">
      <div className="font-display text-sm font-light tracking-[0.4em] text-ivory">HUMA</div>
      <div className="hidden gap-10 text-[10px] uppercase tracking-[0.25em] text-ivory/60 md:flex">
        <a href="#constellation" className="transition-colors hover:text-ivory">The Globe</a>
        <a href="#offer" className="transition-colors hover:text-ivory">Offer</a>
        <a href="#echo" className="transition-colors hover:text-ivory">Echo</a>
        <a href="#stories" className="transition-colors hover:text-ivory">Stories</a>
        <a href="#pulse" className="transition-colors hover:text-ivory">Pulse</a>
        <a href="#future" className="transition-colors hover:text-ivory">Future</a>
      </div>
      <button className="rounded-full border border-ivory/15 px-5 py-2 text-[10px] uppercase tracking-[0.25em] text-ivory transition-all duration-500 hover:bg-ivory hover:text-space-black">
        Connect
      </button>
    </nav>
  );
}

function Hero() {
  const subtitle = useRotatingSubtitle();
  return (
    <section className="relative flex h-screen flex-col items-center justify-center overflow-hidden">
      <div className="earth-glow absolute inset-0 -z-10" />
      <ParticleField />

      {/* Earth orbit rings */}
      <div className="pointer-events-none absolute flex items-center justify-center">
        <div className="absolute h-[820px] w-[820px] rounded-full border border-ivory/[0.04]" />
        <div className="absolute h-[680px] w-[680px] rounded-full border border-ivory/[0.06]" />
        <div className="absolute h-[540px] w-[540px] animate-spin-slow rounded-full border border-dashed border-ivory/[0.05]" />
      </div>

      <h1 className="relative z-10 font-display text-[18vw] font-light leading-none tracking-tighter text-ivory md:text-[10rem]">
        HUMA
      </h1>

      <div className="relative z-10 mt-10 flex flex-col items-center gap-5 px-6 text-center">
        <p
          key={subtitle}
          className="max-w-md text-balance text-sm font-light leading-relaxed text-ivory/60 transition-opacity duration-700 md:text-base"
        >
          {subtitle}
        </p>
        <div className="h-px w-12 bg-gold-dust/50" />
        <p className="text-[10px] uppercase tracking-[0.4em] text-gold-dust/70">
          A living constellation of connection
        </p>
      </div>

      <div className="absolute bottom-10 z-10 text-[9px] uppercase tracking-[0.4em] text-ivory/30">
        Scroll to explore the collective pulse
      </div>
    </section>
  );
}

function GlobalConstellation() {
  return (
    <section id="constellation" className="relative px-6 py-32 md:px-12 md:py-44">
      <div className="mx-auto max-w-6xl">
        <div className="mb-20 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-5">
            <span className="text-[10px] uppercase tracking-[0.4em] text-gold-dust">
              Section 01 — Constellation
            </span>
            <h2 className="font-display text-4xl font-light text-ivory md:text-5xl">
              Global Constellation
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ivory/50">
            Visualize the real-time flow of mentorship, aid, and knowledge as it moves across one
            hundred and ninety-four territories. Every node is a person; every line is a gesture.
          </p>
        </div>

        <div className="relative aspect-video overflow-hidden rounded-2xl border border-ivory/10 bg-space-deep">
          <img
            src={earthImg}
            alt="Earth at night with luminous nodes representing human solidarity connections"
            loading="lazy"
            width={1920}
            height={1080}
            className="h-full w-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-space-black via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 flex flex-wrap gap-3">
            <div className="flex items-center gap-3 rounded-full border border-ivory/10 bg-black/40 px-4 py-2 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-aurora shadow-[0_0_10px_currentColor]" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-ivory">
                14,202 active initiatives
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-ivory/10 bg-black/40 px-4 py-2 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-celestial shadow-[0_0_10px_currentColor]" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-ivory">
                Live data feed
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OfferHumanity() {
  return (
    <section id="offer" className="relative px-6 py-32 md:px-12 md:py-44">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-[10px] uppercase tracking-[0.4em] text-gold-dust">
          Section 02 — Offer
        </span>
        <h2 className="mt-5 font-display text-3xl font-light text-ivory md:text-4xl">
          How will you contribute?
        </h2>
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-ivory/50">
          HUMA is a repository of intent. Whatever you carry — a skill, an hour, a quiet presence —
          becomes a node in the global map.
        </p>

        <form
          className="mt-16 space-y-10"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="group relative">
            <input
              type="text"
              placeholder="I can offer..."
              className="w-full border-b border-ivory/15 bg-transparent py-4 text-center text-xl font-light text-ivory placeholder:text-ivory/15 focus:border-gold-dust focus:outline-none md:text-2xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {["Mentorship", "Knowledge", "Translation", "Time"].map((label) => (
              <button
                key={label}
                type="button"
                className="rounded-full border border-ivory/10 px-4 py-3 text-[10px] uppercase tracking-[0.25em] text-ivory/70 transition-all hover:border-gold-dust/60 hover:text-ivory"
              >
                {label}
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="mt-6 rounded-full bg-ivory px-10 py-4 font-display text-[11px] uppercase tracking-[0.3em] text-space-black transition-transform hover:scale-[1.03]"
          >
            Pulse my contribution
          </button>
        </form>
      </div>
    </section>
  );
}

function HumanEcho() {
  return (
    <section id="echo" className="relative overflow-hidden border-y border-ivory/5 bg-space-deep px-6 py-32 md:px-12 md:py-44">
      <div className="mx-auto max-w-5xl text-center">
        <span className="text-[10px] uppercase tracking-[0.4em] text-gold-dust">
          Section 03 — Echo
        </span>
        <h2 className="mt-5 font-display text-3xl font-light text-ivory md:text-5xl">
          One gesture, propagating outward
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-ivory/50">
          A single act of care does not end with the person it touches. It travels — through
          memory, through gratitude, through the slow architecture of trust.
        </p>

        <div className="relative mx-auto mt-20 flex h-[320px] w-full max-w-3xl items-center justify-center md:h-[420px]">
          {[1, 2, 3, 4].map((ring) => (
            <div
              key={ring}
              className="absolute rounded-full border border-gold-dust/20 animate-pulse-soft"
              style={{
                width: `${ring * 22}%`,
                height: `${ring * 22}%`,
                animationDelay: `${ring * 0.6}s`,
              }}
            />
          ))}
          <div className="absolute h-3 w-3 rounded-full bg-gold-dust shadow-[0_0_30px_var(--color-gold-dust)]" />
          {[
            { top: "20%", left: "30%" },
            { top: "30%", right: "25%" },
            { bottom: "25%", left: "35%" },
            { bottom: "20%", right: "30%" },
          ].map((pos, i) => (
            <div
              key={i}
              className="absolute h-1.5 w-1.5 animate-pulse rounded-full bg-ivory shadow-[0_0_12px_white]"
              style={pos as React.CSSProperties}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Stories() {
  return (
    <section id="stories" className="relative px-6 py-32 md:px-12 md:py-44">
      <div className="mx-auto max-w-6xl">
        <div className="mb-20 text-center">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold-dust">
            Section 04 — Archives
          </span>
          <h2 className="mt-5 font-display text-4xl font-light text-ivory md:text-5xl">
            Stories of Humanity
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-ivory/50">
            Anonymous acts of kindness. Intergenerational transmission. Local solidarity. Read the
            invisible threads.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {STORIES.map((s, i) => (
            <article
              key={s.title}
              className={`group cursor-pointer ${i === 1 ? "md:mt-16" : ""}`}
            >
              <div className="mb-6 aspect-[3/4] overflow-hidden border border-ivory/10 bg-space-deep">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  width={800}
                  height={1066}
                  className="h-full w-full object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>
              <span className={`text-[9px] uppercase tracking-[0.3em] ${s.accent}`}>
                {s.place}
              </span>
              <h3 className="mt-3 font-display text-xl font-light text-ivory transition-transform duration-500 group-hover:translate-x-2">
                {s.title}
              </h3>
              <p className="mt-4 text-xs leading-relaxed text-ivory/50">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function EarthPulse() {
  return (
    <section id="pulse" className="relative overflow-hidden border-y border-ivory/5 bg-space-deep px-6 py-32 md:px-12 md:py-44">
      <div className="mx-auto max-w-6xl">
        <div className="mb-20 text-center">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold-dust">
            Section 05 — Pulse
          </span>
          <h2 className="mt-5 font-display text-4xl font-light text-ivory md:text-5xl">
            Earth Pulse
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-ivory/50">
            A real-time reading of the collective frequency — humanity, in this exact moment.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-y-16 text-center md:grid-cols-4">
          {PULSE_METRICS.map((m) => (
            <div key={m.label} className="space-y-3">
              <div className={`font-display text-4xl font-light md:text-5xl ${m.tone}`}>
                {m.value}
              </div>
              <div className="text-[9px] uppercase tracking-[0.3em] text-ivory/40">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FutureHumanity() {
  return (
    <section id="future" className="relative px-6 py-32 md:px-12 md:py-44">
      <div className="mx-auto max-w-6xl">
        <div className="mb-20 max-w-2xl">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold-dust">
            Section 06 — Horizon
          </span>
          <h2 className="mt-5 font-display text-4xl font-light text-ivory md:text-5xl">
            Future Humanity
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-ivory/50">
            A speculative, hopeful sketch of what comes next when cooperation becomes
            infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-ivory/5 md:grid-cols-3">
          {FUTURES.map((f) => (
            <div key={f.n} className="bg-space-black p-10">
              <div className="font-display text-xs tracking-[0.4em] text-gold-dust">{f.n}</div>
              <h3 className="mt-8 font-display text-2xl font-light text-ivory">{f.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-ivory/50">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ManifestoFooter() {
  return (
    <footer className="relative border-t border-ivory/10 px-6 pb-12 pt-32 md:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="mx-auto max-w-2xl text-balance text-center font-display text-2xl font-light leading-relaxed text-ivory/90 md:text-3xl">
          HUMA is a poetic operating system for humanity — the refusal of cynicism, the
          visualization of our collective strength.
        </p>

        <div className="mt-20 flex flex-col items-start justify-between gap-12 md:flex-row">
          <div className="space-y-4">
            <div className="font-display text-2xl tracking-[0.4em] text-ivory">HUMA</div>
            <p className="max-w-[260px] text-[10px] uppercase leading-loose tracking-[0.2em] text-ivory/30">
              A digital architecture for rebuilding human connection at a planetary scale.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-12 md:gap-20">
            <div className="space-y-4">
              <span className="text-[9px] uppercase tracking-[0.3em] text-gold-dust">Network</span>
              <ul className="space-y-2 text-xs font-light text-ivory/50">
                <li><a href="#" className="hover:text-ivory">The Collective</a></li>
                <li><a href="#" className="hover:text-ivory">Ethical Protocol</a></li>
                <li><a href="#" className="hover:text-ivory">Open Data</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <span className="text-[9px] uppercase tracking-[0.3em] text-gold-dust">System</span>
              <ul className="space-y-2 text-xs font-light text-ivory/50">
                <li><a href="#pulse" className="hover:text-ivory">Humanity Pulse</a></li>
                <li><a href="#echo" className="hover:text-ivory">Ripple Effect</a></li>
                <li><a href="#" className="hover:text-ivory">Whitepaper</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-ivory/5 pt-8 text-[9px] uppercase tracking-[0.3em] text-ivory/25 md:flex-row">
          <span>© 2026 HUMA — Planetary Scale</span>
          <span>Invisible gestures hold the world together.</span>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="relative min-h-screen bg-space-black text-ivory">
      <div className="grain-overlay pointer-events-none fixed inset-0 z-50" />
      <Nav />
      <main>
        <Hero />
        <GlobalConstellation />
        <OfferHumanity />
        <HumanEcho />
        <Stories />
        <EarthPulse />
        <FutureHumanity />
      </main>
      <ManifestoFooter />
    </div>
  );
}

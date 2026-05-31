import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

import earthImg from "@/assets/earth-constellation.jpg";
import storyHands from "@/assets/story-hands.jpg";
import storyLandscape from "@/assets/story-landscape.jpg";
import storyCircle from "@/assets/story-circle.jpg";
import { ParticleField } from "./SiteChrome";

const SUBTITLES = [
  "Mapping the invisible architecture of human solidarity.",
  "Every act of care changes the map.",
  "Humanity is still alive.",
  "Invisible gestures hold the world together.",
  "A living constellation of human connection.",
];

export const STORIES = [
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

export const PULSE_METRICS = [
  { value: "842,019", label: "Active solidarity flows", tone: "text-celestial" },
  { value: "156", label: "Nations linked", tone: "text-aurora" },
  { value: "12.4M", label: "Hours gifted", tone: "text-gold-dust" },
  { value: "4.2s", label: "Mean echo interval", tone: "text-ivory" },
];

export const FUTURES = [
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

export function Hero() {
  const subtitle = useRotatingSubtitle();
  return (
    <section className="relative -mt-24 flex h-screen flex-col items-center justify-center overflow-hidden">
      <div className="earth-glow absolute inset-0 -z-10" />
      <ParticleField />

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

export function SectionHeader({
  number,
  kicker,
  title,
  description,
  align = "left",
}: {
  number: string;
  kicker: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  const alignCls = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`mb-20 max-w-2xl ${alignCls}`}>
      <span className="text-[10px] uppercase tracking-[0.4em] text-gold-dust">
        Section {number} — {kicker}
      </span>
      <h1 className="mt-5 font-display text-4xl font-light text-ivory md:text-5xl">{title}</h1>
      {description && (
        <p className="mt-6 text-sm leading-relaxed text-ivory/50">{description}</p>
      )}
    </div>
  );
}

export function GlobalConstellation() {
  return (
    <section className="relative px-6 py-20 md:px-12 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="01"
          kicker="Constellation"
          title="Global Constellation"
          description="Visualize the real-time flow of mentorship, aid, and knowledge as it moves across one hundred and ninety-four territories. Every node is a person; every line is a gesture."
        />

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

export function OfferHumanity() {
  return (
    <section className="relative px-6 py-20 md:px-12 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-[10px] uppercase tracking-[0.4em] text-gold-dust">
          Section 02 — Offer
        </span>
        <h1 className="mt-5 font-display text-3xl font-light text-ivory md:text-4xl">
          How will you contribute?
        </h1>
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-ivory/50">
          HUMA is a repository of intent. Whatever you carry — a skill, an hour, a quiet presence —
          becomes a node in the global map.
        </p>

        <form className="mt-16 space-y-10" onSubmit={(e) => e.preventDefault()}>
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

export function HumanEcho() {
  return (
    <section className="relative overflow-hidden border-y border-ivory/5 bg-space-deep px-6 py-20 md:px-12 md:py-32">
      <div className="mx-auto max-w-5xl text-center">
        <span className="text-[10px] uppercase tracking-[0.4em] text-gold-dust">
          Section 03 — Echo
        </span>
        <h1 className="mt-5 font-display text-3xl font-light text-ivory md:text-5xl">
          One gesture, propagating outward
        </h1>
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

export function Stories() {
  return (
    <section className="relative px-6 py-20 md:px-12 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="04"
          kicker="Archives"
          title="Stories of Humanity"
          description="Anonymous acts of kindness. Intergenerational transmission. Local solidarity. Read the invisible threads."
          align="center"
        />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {STORIES.map((s, i) => (
            <article key={s.title} className={`group cursor-pointer ${i === 1 ? "md:mt-16" : ""}`}>
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
              <span className={`text-[9px] uppercase tracking-[0.3em] ${s.accent}`}>{s.place}</span>
              <h2 className="mt-3 font-display text-xl font-light text-ivory transition-transform duration-500 group-hover:translate-x-2">
                {s.title}
              </h2>
              <p className="mt-4 text-xs leading-relaxed text-ivory/50">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EarthPulse() {
  return (
    <section className="relative overflow-hidden border-y border-ivory/5 bg-space-deep px-6 py-20 md:px-12 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="05"
          kicker="Pulse"
          title="Earth Pulse"
          description="A real-time reading of the collective frequency — humanity, in this exact moment."
          align="center"
        />

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

export function FutureHumanity() {
  return (
    <section className="relative px-6 py-20 md:px-12 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="06"
          kicker="Horizon"
          title="Future Humanity"
          description="A speculative, hopeful sketch of what comes next when cooperation becomes infrastructure."
        />

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-ivory/5 md:grid-cols-3">
          {FUTURES.map((f) => (
            <div key={f.n} className="bg-space-black p-10">
              <div className="font-display text-xs tracking-[0.4em] text-gold-dust">{f.n}</div>
              <h2 className="mt-8 font-display text-2xl font-light text-ivory">{f.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-ivory/50">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionIndex() {
  return (
    <section className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="00"
          kicker="Map"
          title="Six chapters, one constellation"
          description="HUMA unfolds across six interconnected territories. Begin anywhere — the map remembers your path."
          align="center"
        />
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-ivory/5 md:grid-cols-3">
          {[
            { to: "/constellation", n: "01", title: "Global Constellation", body: "A live cartography of solidarity flows across 194 territories." },
            { to: "/offer", n: "02", title: "Offer Humanity", body: "Pulse what you carry into the planetary network." },
            { to: "/echo", n: "03", title: "Human Echo", body: "How a single gesture propagates outward across generations." },
            { to: "/stories", n: "04", title: "Stories of Humanity", body: "Archive of anonymous acts, quiet revolutions, invisible threads." },
            { to: "/pulse", n: "05", title: "Earth Pulse", body: "A real-time reading of the collective frequency." },
            { to: "/future", n: "06", title: "Future Humanity", body: "A hopeful sketch of cooperation as infrastructure." },
          ].map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="group block bg-space-black p-10 transition-colors hover:bg-space-deep"
            >
              <div className="font-display text-xs tracking-[0.4em] text-gold-dust">{c.n}</div>
              <h2 className="mt-8 font-display text-2xl font-light text-ivory transition-transform duration-500 group-hover:translate-x-2">
                {c.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ivory/50">{c.body}</p>
              <span className="mt-8 inline-block text-[10px] uppercase tracking-[0.3em] text-ivory/40 transition-colors group-hover:text-gold-dust">
                Enter →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

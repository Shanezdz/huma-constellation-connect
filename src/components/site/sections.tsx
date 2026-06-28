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
    chapters: [
      "Hiroshi Tanaka spent fifty-two years perfecting the gesture of a single brushstroke. When his hands began to tremble, he assumed his teaching life was over. A São Paulo design student wrote to him about the spacing of Japanese letterforms in a poster she could not finish.",
      "He answered in three pages of handwritten notes, scanned by his granddaughter and translated by a stranger in Porto. The reply moved through screens for a week before reaching her. She made the poster. She sent it back.",
      "Two years later, Hiroshi mentors a quiet cohort of four hundred — type designers, sign painters, tattoo artists, schoolchildren — across nineteen Brazilian cities. He teaches in voice notes recorded at dawn. They send him photographs of streets he will never walk.",
    ],
    quote: "I lost my hands. I did not lose what my hands knew.",
    impact: [
      { v: "400", l: "Students across 19 cities" },
      { v: "52", l: "Years of practice transmitted" },
      { v: "0 ¥", l: "Cost to either side" },
    ],
  },
  {
    place: "Nairobi, Kenya",
    accent: "text-celestial",
    title: "The Water Weaver",
    body: "One local solution for atmospheric water harvesting, shared with community leaders in twelve arid regions worldwide.",
    img: storyLandscape,
    chapters: [
      "Akinyi Otieno is an agricultural engineer who, with three neighbours and a stack of welded mesh, built a fog-harvesting array on a hill above her village. It produced sixty liters of drinkable water on its first morning.",
      "She filmed the assembly on a borrowed phone and uploaded a twenty-three minute tutorial. No music, no editing, no English subtitles — only her voice in Dholuo, naming each angle and weld.",
      "Twelve communities — in Atacama, Sahel, Rajasthan, central Mexico — have since built their own variation. None of them have met her. Each array is slightly different. Each one carries her geometry.",
    ],
    quote: "The mesh is mine. The water belongs to whoever needs it.",
    impact: [
      { v: "12", l: "Arid regions replicating" },
      { v: "60 L", l: "Per array, per dawn" },
      { v: "23 min", l: "Open-source tutorial" },
    ],
  },
  {
    place: "Reykjavík, Iceland",
    accent: "text-aurora",
    title: "The Listening Project",
    body: "Anonymous psychological support networks bridging generations of isolated individuals through the winter months.",
    img: storyCircle,
    chapters: [
      "In the long Icelandic winter, a small collective of off-duty nurses, fishermen and grandmothers began answering an unlisted phone line for anyone who could not bear the dark alone. No diagnoses. No advice. Only listening.",
      "Within two seasons the network grew to one hundred and eighty voices across the country, then jumped — through a single emigrated daughter — to Murmansk, Tromsø, Nuuk, and finally to a winter shelter in Ushuaia at the other end of the planet.",
      "The protocol is one page long. Pick up before the third ring. Do not ask the caller's name. Stay until they hang up. Never call them back. Tell no one what was said.",
    ],
    quote: "The cure for the long night was not light. It was someone breathing on the other end.",
    impact: [
      { v: "180", l: "Volunteer listeners" },
      { v: "6", l: "Sub-arctic cities linked" },
      { v: "1 pg", l: "Entire protocol" },
    ],
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

const OFFER_CATEGORIES = [
  {
    n: "I",
    title: "Mentorship",
    body: "Guide a younger maker, a displaced student, a self-taught learner. One conversation a month can redirect a life.",
    examples: ["Career listening", "Code reviews", "Artistic critique", "Founder counsel"],
  },
  {
    n: "II",
    title: "Knowledge",
    body: "Translate what you know into a transferable gesture — a lesson, a workshop, a written piece, a recorded voice.",
    examples: ["Open lectures", "Field manuals", "Language tutoring", "Research notes"],
  },
  {
    n: "III",
    title: "Translation",
    body: "Bridge a sentence across a border. Subtitles, documents, oral interpretation — language is infrastructure.",
    examples: ["Document review", "Live interpretation", "Subtitling", "Cultural mediation"],
  },
  {
    n: "IV",
    title: "Time",
    body: "The rarest offering. An hour of presence, of listening, of patient company. The atomic unit of solidarity.",
    examples: ["Companionship calls", "Local presence", "Quiet listening", "Skill-shadowing"],
  },
];

const OFFER_PRINCIPLES = [
  { k: "Reciprocity", v: "Every offer is also an opening to receive. The map remembers what you give and what you accept." },
  { k: "Specificity", v: "Vague help dissolves. Name the gesture: an hour, a skill, a place, a frequency." },
  { k: "Continuity", v: "A small recurring contribution outweighs a single grand one. The constellation is fed by rhythm." },
  { k: "Anonymity", v: "Visibility is optional. The map values the gesture, not the signature." },
];

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

      <div className="mx-auto mt-32 max-w-6xl">
        <div className="mb-16 text-center">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold-dust">
            Four territories of offering
          </span>
          <h2 className="mt-5 font-display text-3xl font-light text-ivory md:text-4xl">
            Choose the gesture that already lives in you
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-ivory/5 md:grid-cols-2">
          {OFFER_CATEGORIES.map((c) => (
            <div key={c.n} className="bg-space-black p-10">
              <div className="font-display text-xs tracking-[0.4em] text-gold-dust">{c.n}</div>
              <h3 className="mt-6 font-display text-2xl font-light text-ivory">{c.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-ivory/55">{c.body}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {c.examples.map((e) => (
                  <span
                    key={e}
                    className="rounded-full border border-ivory/10 px-3 py-1 text-[9px] uppercase tracking-[0.25em] text-ivory/50"
                  >
                    {e}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-32 max-w-4xl">
        <div className="mb-14 text-center">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold-dust">
            Principles of the offering
          </span>
          <h2 className="mt-5 font-display text-3xl font-light text-ivory">
            A quiet ethics, not a transaction
          </h2>
        </div>
        <dl className="divide-y divide-ivory/10 border-y border-ivory/10">
          {OFFER_PRINCIPLES.map((p) => (
            <div key={p.k} className="grid grid-cols-1 gap-4 py-8 md:grid-cols-[200px_1fr] md:gap-12">
              <dt className="text-[10px] uppercase tracking-[0.3em] text-gold-dust">{p.k}</dt>
              <dd className="text-sm leading-relaxed text-ivory/60">{p.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

const ECHO_STAGES = [
  { n: "01", title: "The gesture", body: "A single act of attention — five minutes of listening, a translated sentence, a door held open." },
  { n: "02", title: "The trace", body: "Memory imprints. The person who received the gesture carries a quieter pulse forward into the next encounter." },
  { n: "03", title: "The relay", body: "Within hours or years, the trace is offered again — same shape, new constellation. The original sender is invisible." },
  { n: "04", title: "The field", body: "A culture of low-frequency reciprocity emerges. Solidarity stops being a value and becomes a climate." },
];

const ECHO_QUOTES = [
  { q: "I was helped once, twenty-three years ago, by a stranger at a train station. I have been answering that gesture ever since.", a: "— Anonymous, Marseille" },
  { q: "The teacher who taught me to read died before I could thank her. So I taught my neighbours' children. That is the only thanks that travels.", a: "— Anonymous, Dakar" },
  { q: "Solidarity is not a feeling. It is a frequency you tune the rest of your life to.", a: "— HUMA field note" },
];

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

      <div className="mx-auto mt-32 max-w-6xl">
        <div className="mb-16 text-center">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold-dust">The propagation</span>
          <h2 className="mt-5 font-display text-3xl font-light text-ivory md:text-4xl">
            Four stages of the echo
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-ivory/5 md:grid-cols-4">
          {ECHO_STAGES.map((s) => (
            <div key={s.n} className="bg-space-black p-8">
              <div className="font-display text-xs tracking-[0.4em] text-gold-dust">{s.n}</div>
              <h3 className="mt-6 font-display text-xl font-light text-ivory">{s.title}</h3>
              <p className="mt-4 text-xs leading-relaxed text-ivory/55">{s.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-32 max-w-5xl">
        <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-3">
          {[
            { v: "× 7.4", l: "Average relays per gesture", t: "text-celestial" },
            { v: "23 yrs", l: "Longest documented arc", t: "text-gold-dust" },
            { v: "61%", l: "Echoes crossing a border", t: "text-aurora" },
          ].map((m) => (
            <div key={m.l}>
              <div className={`font-display text-4xl font-light md:text-5xl ${m.t}`}>{m.v}</div>
              <div className="mt-3 text-[9px] uppercase tracking-[0.3em] text-ivory/40">{m.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-32 max-w-4xl">
        <div className="mb-14 text-center">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold-dust">
            Voices from the field
          </span>
        </div>
        <div className="space-y-12">
          {ECHO_QUOTES.map((e, i) => (
            <figure key={i} className="border-l border-gold-dust/40 pl-8">
              <blockquote className="font-display text-xl font-light leading-relaxed text-ivory md:text-2xl">
                “{e.q}”
              </blockquote>
              <figcaption className="mt-4 text-[10px] uppercase tracking-[0.3em] text-ivory/50">
                {e.a}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}


const STORY_FRAGMENTS = [
  { place: "Lisbon, Portugal", accent: "text-celestial", title: "The Night Pharmacy", body: "A retired chemist keeps her shutter half-open after midnight for those who cannot afford a daytime visit. No sign, no schedule — only word of mouth and trust." },
  { place: "Medellín, Colombia", accent: "text-aurora", title: "Library on a Cable Car", body: "Volunteers ride the gondolas up the hillside neighbourhoods every Saturday with crates of books. The line to borrow is now longer than the line to ride." },
  { place: "Tbilisi, Georgia", accent: "text-gold-dust", title: "Grandmothers' Wi-Fi", body: "An intergenerational pact: elders teach traditional polyphonic singing, teenagers teach them how to video-call grandchildren abroad. Both sides claim the better deal." },
  { place: "Hanoi, Vietnam", accent: "text-celestial", title: "The Shared Kitchen", body: "Three families, one stove, six evenings a week. What began as a fuel-saving arrangement became the slowest, kindest dinner table in the district." },
  { place: "Oaxaca, Mexico", accent: "text-aurora", title: "Roof Repair Brigade", body: "Whenever a storm passes, neighbours meet at dawn with ladders and clay tiles. No one keeps count — the count is the village still standing." },
  { place: "Beirut, Lebanon", accent: "text-gold-dust", title: "Letters to the Power Cut", body: "During blackouts, a writers' collective hand-delivers handwritten letters across the city by bicycle. Reading by candle has become a ritual of presence." },
];

const STORY_THEMES = [
  { k: "Transmission", v: "Knowledge moved across generations without institutions." },
  { k: "Proximity", v: "Solidarity that happens within walking distance of the giver." },
  { k: "Quiet repair", v: "Gestures that fix what was broken without naming it." },
  { k: "Improvised infrastructure", v: "Citizens building what systems forgot to build." },
];

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

        {/* Themes of the archive */}
        <div className="mt-32">
          <div className="mb-12 text-center">
            <span className="text-[10px] uppercase tracking-[0.4em] text-gold-dust">
              Themes of the archive
            </span>
            <h2 className="mt-5 font-display text-3xl font-light text-ivory">
              The recurring shapes of solidarity
            </h2>
          </div>
          <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-ivory/5 md:grid-cols-2">
            {STORY_THEMES.map((t) => (
              <div key={t.k} className="bg-space-black p-8">
                <dt className="text-[10px] uppercase tracking-[0.3em] text-gold-dust">{t.k}</dt>
                <dd className="mt-4 text-sm leading-relaxed text-ivory/60">{t.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Additional fragments */}
        <div className="mt-32">
          <div className="mb-12 text-center">
            <span className="text-[10px] uppercase tracking-[0.4em] text-gold-dust">
              From the field
            </span>
            <h2 className="mt-5 font-display text-3xl font-light text-ivory">
              Six fragments, six geographies
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-ivory/5 md:grid-cols-2 lg:grid-cols-3">
            {STORY_FRAGMENTS.map((s) => (
              <article key={s.title} className="bg-space-black p-8">
                <span className={`text-[9px] uppercase tracking-[0.3em] ${s.accent}`}>{s.place}</span>
                <h3 className="mt-4 font-display text-lg font-light text-ivory">{s.title}</h3>
                <p className="mt-4 text-xs leading-relaxed text-ivory/55">{s.body}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Submit prompt */}
        <div className="mt-32 rounded-2xl border border-ivory/10 bg-space-deep p-12 text-center md:p-16">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold-dust">
            Add to the archive
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-light text-ivory md:text-4xl">
            Every quiet gesture deserves a witness
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-ivory/55">
            If you have seen, received, or carried a story of solidarity, the archive is open.
            Anonymity is honored. Specificity is welcomed.
          </p>
          <Link
            to="/offer"
            className="mt-10 inline-block rounded-full border border-ivory/20 px-10 py-4 font-display text-[11px] uppercase tracking-[0.3em] text-ivory transition-all hover:border-gold-dust hover:text-gold-dust"
          >
            Share a story →
          </Link>
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

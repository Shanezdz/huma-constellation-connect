import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteChrome";
import { StatusBadge } from "@/components/site/DataStatus";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "What is HUMA? — A civic infrastructure for human solidarity" },
      {
        name: "description",
        content:
          "HUMA is a civic infrastructure for mapping and activating human solidarity: what it maps, how it works, what it does not claim to measure, and its trust principles.",
      },
      { property: "og:title", content: "What is HUMA?" },
      {
        property: "og:description",
        content: "A civic infrastructure for mapping and activating human solidarity.",
      },
      { property: "og:url", content: "https://huma-constellation-connect.lovable.app/about" },
      {
        property: "og:image",
        content: "https://huma-constellation-connect.lovable.app/og/og-home.jpg",
      },
      {
        name: "twitter:image",
        content: "https://huma-constellation-connect.lovable.app/og/og-home.jpg",
      },
    ],
    links: [{ rel: "canonical", href: "https://huma-constellation-connect.lovable.app/about" }],
  }),
});

const HOW_IT_WORKS = [
  {
    n: "01",
    title: "Declare",
    body: "A person, a collective or an institution declares what it can offer — or what it needs. Time, knowledge, translation, mentorship, presence, material support.",
  },
  {
    n: "02",
    title: "Situate",
    body: "Each declaration is placed on the map with a territory and a category. No identity is required; specificity is what makes a gesture usable.",
  },
  {
    n: "03",
    title: "Connect",
    body: "Offers and needs are brought into proximity so that a human decision can happen. HUMA suggests; people choose. There is no automated allocation.",
  },
  {
    n: "04",
    title: "Trace",
    body: "The map records that a connection occurred, not what was said inside it. Aggregate patterns become the public reading of collective solidarity.",
  },
];

const NOT_CLAIMS = [
  "HUMA does not measure the real-world impact of an act of solidarity.",
  "HUMA does not score, rank or rate people, communities or countries.",
  "HUMA does not currently publish audited statistics on global mutual aid.",
  "HUMA does not replace emergency services, medical care or legal advice.",
  "HUMA does not sell, trade or monetise declarations or personal data.",
];

const TRUST = [
  {
    k: "Provenance first",
    v: "Every figure and every story carries a visible status. Prototype and illustrative content is labelled as such, always.",
  },
  {
    k: "Anonymity as dignity",
    v: "Contribution never requires a public identity. A gesture does not need a name to be real.",
  },
  {
    k: "Minimal data",
    v: "Only what is strictly needed to make a connection possible is collected.",
  },
  {
    k: "Open by design",
    v: "The mapping protocol is intended as a public good, adoptable by any city, collective or institution.",
  },
];

function AboutPage() {
  return (
    <SiteLayout>
      <article className="mx-auto max-w-5xl px-6 py-24 md:px-12">
        <header className="max-w-3xl">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold-dust">What is HUMA?</p>
          <h1 className="mt-6 font-display text-4xl font-light leading-tight text-ivory md:text-6xl">
            A civic infrastructure for mapping and activating human solidarity.
          </h1>
          <p className="mt-8 text-base leading-relaxed text-ivory/60 md:text-lg">
            Humanity already contains an immense invisible infrastructure of knowledge, time and
            mutual aid. It has no map, no address book and no shared language. HUMA gives it one.
          </p>
          <div className="mt-8">
            <StatusBadge status="prototype" />
            <p className="mt-3 max-w-xl text-xs leading-relaxed text-ivory/40">
              HUMA is at prototype stage. The interface, categories and public figures shown across
              the platform are demonstrative and are labelled accordingly.
            </p>
          </div>
        </header>

        <Block kicker="The problem" title="Solidarity exists, but it is unmapped">
          <p>
            Every day, millions of people teach, translate, repair, mentor, host and listen for
            free. This effort is real economic and social infrastructure — yet it is invisible to
            the institutions that plan around it. It is fragmented across informal networks, closed
            groups and personal relationships. Someone with a skill and someone with a need can live
            three streets apart and never find each other.
          </p>
          <p>
            The consequence is not a lack of generosity. It is a lack of legibility. What cannot be
            seen cannot be coordinated, supported or scaled.
          </p>
        </Block>

        <Block kicker="What HUMA maps" title="Capacity, need, and the link between them">
          <ul className="space-y-3">
            {[
              "Offered capacity: skills, hours, knowledge, translation, mentorship, presence.",
              "Expressed need: what a person, collective or territory is looking for.",
              "Connections: the moment an offer and a need meet.",
              "Territories: the geography of where capacity concentrates and where it is missing.",
            ].map((i) => (
              <li key={i} className="flex gap-4">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold-dust" />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </Block>

        <section className="mt-24 border-t border-ivory/10 pt-12">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold-dust">How it works</p>
          <h2 className="mt-5 font-display text-3xl font-light text-ivory">
            Four steps, no gatekeeper
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-ivory/5 md:grid-cols-2">
            {HOW_IT_WORKS.map((s) => (
              <div key={s.n} className="bg-space-black p-8 md:p-10">
                <div className="font-display text-xs tracking-[0.4em] text-gold-dust">{s.n}</div>
                <h3 className="mt-6 font-display text-2xl font-light text-ivory">{s.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ivory/55">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 border-t border-ivory/10 pt-12">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold-dust">
            What HUMA does not claim
          </p>
          <h2 className="mt-5 font-display text-3xl font-light text-ivory">
            The limits, stated plainly
          </h2>
          <ul className="mt-10 divide-y divide-ivory/10 border-y border-ivory/10">
            {NOT_CLAIMS.map((c) => (
              <li key={c} className="py-5 text-sm leading-relaxed text-ivory/60">
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-ivory/40">
            Where a number appears without a verifiable source, it is labelled as prototype or
            illustrative.{" "}
            <Link to="/methodology" className="text-gold-dust underline-offset-4 hover:underline">
              Read the methodology note
            </Link>
            .
          </p>
        </section>

        <section className="mt-24 border-t border-ivory/10 pt-12">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold-dust">Trust principles</p>
          <h2 className="mt-5 font-display text-3xl font-light text-ivory">
            Credibility before scale
          </h2>
          <dl className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-ivory/5 md:grid-cols-2">
            {TRUST.map((t) => (
              <div key={t.k} className="bg-space-black p-8">
                <dt className="text-[10px] uppercase tracking-[0.3em] text-gold-dust">{t.k}</dt>
                <dd className="mt-4 text-sm leading-relaxed text-ivory/60">{t.v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-24 border-t border-ivory/10 pt-12">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold-dust">Who it is for</p>
          <h2 className="mt-5 font-display text-3xl font-light text-ivory">
            Citizens and institutions, on the same map
          </h2>
          <div className="mt-8 flex flex-wrap gap-2">
            {[
              "Citizens",
              "NGOs",
              "Foundations",
              "Universities",
              "Local authorities",
              "Cooperatives",
              "Public institutions",
            ].map((a) => (
              <span
                key={a}
                className="rounded-full border border-ivory/10 px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-ivory/50"
              >
                {a}
              </span>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-ivory/60">
            An individual uses HUMA to offer an hour or find help. An institution uses the same map
            to see where capacity already exists in a territory before designing a programme around
            it. Both read the same public constellation.
          </p>
          <Link
            to="/organisations"
            className="mt-8 inline-block text-[10px] uppercase tracking-[0.3em] text-ivory/40 transition-colors hover:text-gold-dust"
          >
            For organisations →
          </Link>
        </section>


        <section className="mt-24 rounded-2xl border border-ivory/10 bg-space-deep p-10 text-center md:p-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold-dust">The vision</p>
          <blockquote className="mx-auto mt-6 max-w-3xl font-display text-2xl font-light leading-relaxed text-ivory md:text-3xl">
            “A poetic operating system for humanity — where what people are willing to give for one
            another finally becomes visible, and therefore usable.”
          </blockquote>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/offer"
              className="rounded-full bg-ivory px-8 py-4 font-display text-[11px] uppercase tracking-[0.3em] text-space-black transition-transform hover:scale-[1.03]"
            >
              Offer something
            </Link>
            <Link
              to="/offer"
              search={{ mode: "need" }}
              className="rounded-full border border-ivory/20 px-8 py-4 font-display text-[11px] uppercase tracking-[0.3em] text-ivory transition-colors hover:border-gold-dust hover:text-gold-dust"
            >
              Ask for something
            </Link>
          </div>
        </section>
      </article>
    </SiteLayout>
  );
}

function Block({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-24 border-t border-ivory/10 pt-12">
      <p className="text-[10px] uppercase tracking-[0.4em] text-gold-dust">{kicker}</p>
      <h2 className="mt-5 font-display text-3xl font-light text-ivory">{title}</h2>
      <div className="mt-8 max-w-3xl space-y-5 text-sm leading-relaxed text-ivory/60">
        {children}
      </div>
    </section>
  );
}

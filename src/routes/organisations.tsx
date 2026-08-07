import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteChrome";

export const Route = createFileRoute("/organisations")({
  component: OrganisationsPage,
  head: () => ({
    meta: [
      { title: "For organisations — HUMA" },
      {
        name: "description",
        content:
          "How NGOs, foundations, universities, local authorities and public programmes could read and use the HUMA constellation of offers and needs.",
      },
      { property: "og:title", content: "For organisations — HUMA" },
      {
        property: "og:description",
        content:
          "Map available capacity, read territorial needs, mobilise skills and document solidarity dynamics.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        property: "og:url",
        content: "https://huma-constellation-connect.lovable.app/organisations",
      },
      {
        property: "og:image",
        content: "https://huma-constellation-connect.lovable.app/og/og-home.jpg",
      },
      {
        name: "twitter:image",
        content: "https://huma-constellation-connect.lovable.app/og/og-home.jpg",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://huma-constellation-connect.lovable.app/organisations",
      },
    ],
  }),
});

const USES = [
  {
    n: "I",
    title: "Map available capacity",
    body: "See what a territory already holds — skills, hours, tools, spaces — before designing a programme on top of it. Capacity is usually present and unrecorded.",
  },
  {
    n: "II",
    title: "Read territorial needs",
    body: "Needs are declared in the same structure as offers. That symmetry makes it possible to read where demand concentrates without surveying anyone twice.",
  },
  {
    n: "III",
    title: "Mobilise skills",
    body: "Call for a precise gesture — a language, an expertise, a weekly hour — instead of a generic appeal for volunteers.",
  },
  {
    n: "IV",
    title: "Document solidarity dynamics",
    body: "Keep a legible trace of what circulated, in aggregate and without identities, for reporting, research or public accountability.",
  },
];

function OrganisationsPage() {
  return (
    <SiteLayout>
      <article className="mx-auto max-w-5xl px-6 py-20 md:px-12 md:py-28">
        <header>
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold-dust">
            Institutional use
          </p>
          <h1 className="mt-5 font-display text-4xl font-light text-ivory md:text-5xl">
            For organisations
          </h1>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-ivory/60">
            HUMA is not a service provider and does not deliver aid. It is a reading layer: a public
            map of what people declare they can give and what they are looking for. An institution
            reads the same constellation an individual does — at a different scale.
          </p>
        </header>

        <section className="mt-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold-dust">Four uses</p>
          <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-ivory/5 md:grid-cols-2">
            {USES.map((u) => (
              <div key={u.n} className="bg-space-black p-10">
                <div className="font-display text-xs tracking-[0.4em] text-gold-dust">{u.n}</div>
                <h2 className="mt-6 font-display text-2xl font-light text-ivory">{u.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-ivory/55">{u.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 border-t border-ivory/10 pt-12">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold-dust">Who this is for</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              "NGOs",
              "Foundations",
              "Universities",
              "Local authorities",
              "Associations",
              "Public programmes",
            ].map((a) => (
              <span
                key={a}
                className="rounded-full border border-ivory/10 px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-ivory/50"
              >
                {a}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-20 border-t border-ivory/10 pt-12">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold-dust">Honest limits</p>
          <ul className="mt-6 max-w-3xl space-y-4 text-sm leading-relaxed text-ivory/55">
            <li>
              HUMA is a prototype. No register of real offers or needs is open, and no institution
              is currently using it.
            </li>
            <li>
              Every figure and node shown across the site is labelled illustrative or prototype. None
              of it describes measured activity.
            </li>
            <li>
              No partnership, funding relationship or endorsement exists or is implied anywhere on
              this site.
            </li>
          </ul>
        </section>

        <section className="mt-20 rounded-2xl border border-ivory/10 bg-space-deep p-10 text-center md:p-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-celestial/30 px-3 py-1 text-[9px] uppercase tracking-[0.25em] text-celestial">
            <span className="h-1 w-1 rounded-full bg-current" />
            Partnership contact — coming soon
          </span>
          <h2 className="mx-auto mt-6 max-w-2xl font-display text-2xl font-light leading-relaxed text-ivory md:text-3xl">
            No partnership channel is open yet.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-ivory/50">
            Rather than publish an address that nobody monitors, HUMA states plainly that the
            institutional channel is still being prepared. It will appear here when it exists.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/methodology"
              className="rounded-full border border-ivory/20 px-8 py-4 font-display text-[11px] uppercase tracking-[0.3em] text-ivory transition-colors hover:border-gold-dust hover:text-gold-dust"
            >
              Methodology &amp; data
            </Link>
            <Link
              to="/about"
              className="rounded-full border border-ivory/20 px-8 py-4 font-display text-[11px] uppercase tracking-[0.3em] text-ivory transition-colors hover:border-gold-dust hover:text-gold-dust"
            >
              What is HUMA?
            </Link>
          </div>
        </section>
      </article>
    </SiteLayout>
  );
}

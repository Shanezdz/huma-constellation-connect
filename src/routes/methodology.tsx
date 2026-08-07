import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteChrome";
import { StatusBadge } from "@/components/site/DataStatus";

export const Route = createFileRoute("/methodology")({
  component: MethodologyPage,
  head: () => ({
    meta: [
      { title: "Methodology & data provenance — HUMA" },
      {
        name: "description",
        content:
          "How HUMA labels its figures and stories: prototype data, illustrative data, demonstration content, and the status system applied to every narrative.",
      },
      { property: "og:title", content: "Methodology & data provenance — HUMA" },
      {
        property: "og:description",
        content: "What our numbers mean, what they do not mean, and how each story is labelled.",
      },
      {
        property: "og:url",
        content: "https://huma-constellation-connect.lovable.app/methodology",
      },
    ],
    links: [
      { rel: "canonical", href: "https://huma-constellation-connect.lovable.app/methodology" },
    ],
  }),
});

const DATA_STATUSES = [
  {
    status: "prototype" as const,
    body: "Generated for the prototype interface. Not derived from any collection, survey or partner dataset. Shown to demonstrate the behaviour of the map.",
  },
  {
    status: "illustrative" as const,
    body: "Figures chosen to illustrate an order of magnitude or a shape of activity. They are not measurements and must not be cited as statistics.",
  },
  {
    status: "demonstration" as const,
    body: "Interface content whose only purpose is to show how a screen behaves once real declarations exist.",
  },
];

const STORY_STATUSES = [
  {
    status: "verified-story" as const,
    body: "A story whose facts were confirmed with the people or organisation involved, with their consent to publish. No story currently on HUMA carries this status.",
  },
  {
    status: "community-story" as const,
    body: "Submitted by a member of the network, published as received, not independently verified.",
  },
  {
    status: "anonymous-testimony" as const,
    body: "A first-person account published without identifying details, at the author's request. Not independently verified.",
  },
  {
    status: "illustrative-scenario" as const,
    body: "Written to convey what the network makes possible. Composite or fictional. This is the default status for any story that is not documented as real and verified.",
  },
];

function MethodologyPage() {
  return (
    <SiteLayout>
      <article className="mx-auto max-w-3xl px-6 py-24 md:px-12">
        <header className="mb-16">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold-dust">Transparency</p>
          <h1 className="mt-4 font-display text-4xl font-light text-ivory md:text-5xl">
            Methodology &amp; data provenance
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-ivory/55">
            HUMA is currently a prototype. None of the counters, regional tables, pulse readings or
            echo metrics shown on this platform are measurements of real global activity. This page
            explains exactly what each label means, so that nothing on HUMA can be mistaken for a
            verified statistic.
          </p>
        </header>

        <Section title="Why we label everything">
          <p>
            A platform about solidarity has one thing to protect above all: trust. Presenting
            invented figures as real data would make every honest number that follows unreadable. So
            every figure carries a status, and the default status is the most conservative one.
          </p>
        </Section>

        <Section title="Data statuses">
          <div className="space-y-6">
            {DATA_STATUSES.map((d) => (
              <div key={d.status} className="rounded-xl border border-ivory/10 p-5">
                <StatusBadge status={d.status} />
                <p className="mt-3 text-sm leading-relaxed text-ivory/60">{d.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Story statuses">
          <p>
            Narratives carry their own label. We never claim a verification that has not taken
            place. When a story is not documented as real and verified, it is published as an{" "}
            <em>Illustrative scenario</em>.
          </p>
          <div className="mt-6 space-y-6">
            {STORY_STATUSES.map((d) => (
              <div key={d.status} className="rounded-xl border border-ivory/10 p-5">
                <StatusBadge status={d.status} />
                <p className="mt-3 text-sm leading-relaxed text-ivory/60">{d.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="What would change this">
          <p>
            Once real declarations are collected through the offer and need forms, the platform will
            publish counters derived from those records only, with the collection period and the
            counting rule stated next to each figure. Any prototype figure will be removed rather
            than silently replaced.
          </p>
        </Section>

        <Section title="Corrections">
          <p>
            If you believe a figure or a story on HUMA is misleading, write to{" "}
            shanezdz.kechroud@gmail.com. Corrections are made publicly and without argument.
          </p>
        </Section>

        <div className="mt-16 flex flex-wrap gap-4 text-[10px] uppercase tracking-[0.3em] text-ivory/40">
          <Link to="/about" className="hover:text-gold-dust">
            What is HUMA? →
          </Link>
          <Link to="/privacy" className="hover:text-gold-dust">
            Privacy →
          </Link>
        </div>
      </article>
    </SiteLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12 border-t border-ivory/10 pt-8">
      <h2 className="font-display text-xl font-light text-ivory">{title}</h2>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-ivory/60">{children}</div>
    </section>
  );
}

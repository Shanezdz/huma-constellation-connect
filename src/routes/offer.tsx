import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteChrome";
import { PersistedContribution } from "@/components/site/PersistedContribution";

export const Route = createFileRoute("/offer")({
  validateSearch: (search: Record<string, unknown>): { mode?: "offer" | "need" } => {
    const m = search["mode"];
    return m === "need" || m === "offer" ? { mode: m } : {};
  },
  component: OfferPage,
  head: () => ({
    meta: [
      { title: "Offer or ask — HUMA" },
      {
        name: "description",
        content:
          "Leave a gesture in HUMA: offer what you can, ask for what you need, and choose whether it remains private or enters the constellation.",
      },
      { property: "og:title", content: "Offer or ask — HUMA" },
      {
        property: "og:description",
        content: "Offer what you can. Ask for what you need. Let the map reveal what quietly connects us.",
      },
      { property: "og:url", content: "https://huma-constellation-connect.vercel.app/offer" },
      {
        property: "og:image",
        content: "https://huma-constellation-connect.vercel.app/og/og-offer.jpg",
      },
      {
        name: "twitter:image",
        content: "https://huma-constellation-connect.vercel.app/og/og-offer.jpg",
      },
    ],
    links: [{ rel: "canonical", href: "https://huma-constellation-connect.vercel.app/offer" }],
  }),
});

function OfferPage() {
  const { mode } = Route.useSearch();
  return (
    <SiteLayout>
      <section className="px-6 py-20 md:px-12 md:py-28">
        <PersistedContribution initialMode={mode ?? "offer"} />
      </section>
    </SiteLayout>
  );
}

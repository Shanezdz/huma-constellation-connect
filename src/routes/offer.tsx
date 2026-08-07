import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteChrome";
import { OfferHumanity } from "@/components/site/sections";
import type { ContributionMode } from "@/components/site/Contribution";

export const Route = createFileRoute("/offer")({
  validateSearch: (search: Record<string, unknown>): { mode?: ContributionMode } => {
    const m = search["mode"];
    return m === "need" || m === "offer" || m === "connect" ? { mode: m } : {};
  },
  component: OfferPage,

  head: () => ({
    meta: [
      { title: "Offer or ask — HUMA" },
      {
        name: "description",
        content:
          "Declare what you can offer — a skill, an hour, a quiet presence — or what you need. Both become nodes on the HUMA map.",
      },
      { property: "og:title", content: "Offer or ask — HUMA" },

      {
        property: "og:description",
        content: "Add your gesture to the global constellation of human solidarity.",
      },
      { property: "og:url", content: "https://huma-constellation-connect.lovable.app/offer" },
      {
        property: "og:image",
        content: "https://huma-constellation-connect.lovable.app/og/og-offer.jpg",
      },
      {
        name: "twitter:image",
        content: "https://huma-constellation-connect.lovable.app/og/og-offer.jpg",
      },
    ],
    links: [
      { rel: "canonical", href: "https://huma-constellation-connect.lovable.app/offer" },
    ],
  }),
});

function OfferPage() {
  const { mode } = Route.useSearch();
  return (
    <SiteLayout>
      <OfferHumanity mode={mode ?? "offer"} />
    </SiteLayout>
  );
}

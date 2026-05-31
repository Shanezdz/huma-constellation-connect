import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteChrome";
import { OfferHumanity } from "@/components/site/sections";

export const Route = createFileRoute("/offer")({
  component: () => (
    <SiteLayout>
      <OfferHumanity />
    </SiteLayout>
  ),
  head: () => ({
    meta: [
      { title: "Offer your contribution — HUMA" },
      {
        name: "description",
        content:
          "Pulse what you carry — a skill, an hour, a quiet presence — into the planetary HUMA network.",
      },
      { property: "og:title", content: "Offer your contribution — HUMA" },
      {
        property: "og:description",
        content: "Add your gesture to the global constellation of human solidarity.",
      },
      { property: "og:url", content: "https://huma-constellation-connect.lovable.app/offer" },
    ],
    links: [
      { rel: "canonical", href: "https://huma-constellation-connect.lovable.app/offer" },
    ],
  }),
});

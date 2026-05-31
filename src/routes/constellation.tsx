import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteChrome";
import { GlobalConstellation } from "@/components/site/sections";

export const Route = createFileRoute("/constellation")({
  component: () => (
    <SiteLayout>
      <GlobalConstellation />
    </SiteLayout>
  ),
  head: () => ({
    meta: [
      { title: "Global Constellation — HUMA" },
      {
        name: "description",
        content:
          "A live cartography of mentorship, aid, and knowledge moving across 194 territories. Every node is a person; every line is a gesture.",
      },
      { property: "og:title", content: "Global Constellation — HUMA" },
      {
        property: "og:description",
        content: "Real-time flows of human solidarity, visualized as a planetary constellation.",
      },
      {
        property: "og:url",
        content: "https://huma-constellation-connect.lovable.app/constellation",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://huma-constellation-connect.lovable.app/constellation",
      },
    ],
  }),
});

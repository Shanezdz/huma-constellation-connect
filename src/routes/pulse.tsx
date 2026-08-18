import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteChrome";
import { EarthPulse } from "@/components/site/sections";

export const Route = createFileRoute("/pulse")({
  component: () => (
    <SiteLayout>
      <EarthPulse />
    </SiteLayout>
  ),
  head: () => ({
    meta: [
      { title: "Earth Pulse — HUMA" },
      {
        name: "description",
        content:
          "A real-time reading of the collective frequency — humanity, in this exact moment, expressed in active flows, nations linked, and hours gifted.",
      },
      { property: "og:title", content: "Earth Pulse — HUMA" },
      {
        property: "og:description",
        content: "The collective frequency of human solidarity, live.",
      },
      { property: "og:url", content: "https://huma-constellation-connect.vercel.app/pulse" },
      {
        property: "og:image",
        content: "https://huma-constellation-connect.vercel.app/og/og-pulse.jpg",
      },
      {
        name: "twitter:image",
        content: "https://huma-constellation-connect.vercel.app/og/og-pulse.jpg",
      },
    ],
    links: [{ rel: "canonical", href: "https://huma-constellation-connect.vercel.app/pulse" }],
  }),
});

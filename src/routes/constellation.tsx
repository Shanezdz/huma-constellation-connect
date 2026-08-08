import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteChrome";
import { LiveConstellation } from "@/components/site/LiveConstellation";

export const Route = createFileRoute("/constellation")({
  component: () => (
    <SiteLayout>
      <LiveConstellation />
    </SiteLayout>
  ),
  head: () => ({
    meta: [
      { title: "The Constellation — HUMA" },
      {
        name: "description",
        content:
          "A living field of offers and needs that people have explicitly chosen to make visible in HUMA.",
      },
      { property: "og:title", content: "The Constellation — HUMA" },
      {
        property: "og:description",
        content: "A poetic map of gestures people have chosen to make visible.",
      },
      {
        property: "og:url",
        content: "https://huma-constellation-connect.vercel.app/constellation",
      },
      {
        property: "og:image",
        content: "https://huma-constellation-connect.vercel.app/og/og-constellation.jpg",
      },
      {
        name: "twitter:image",
        content: "https://huma-constellation-connect.vercel.app/og/og-constellation.jpg",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://huma-constellation-connect.vercel.app/constellation",
      },
    ],
  }),
});

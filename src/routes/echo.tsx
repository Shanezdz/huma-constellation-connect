import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteChrome";
import { HumanEcho } from "@/components/site/sections";

export const Route = createFileRoute("/echo")({
  component: () => (
    <SiteLayout>
      <HumanEcho />
    </SiteLayout>
  ),
  head: () => ({
    meta: [
      { title: "Human Echo — HUMA" },
      {
        name: "description",
        content:
          "How a single act of care propagates outward through memory, gratitude, and the slow architecture of trust.",
      },
      { property: "og:title", content: "Human Echo — HUMA" },
      {
        property: "og:description",
        content: "One gesture, propagating outward across generations.",
      },
      { property: "og:url", content: "https://huma-constellation-connect.lovable.app/echo" },
      {
        property: "og:image",
        content: "https://huma-constellation-connect.lovable.app/og/og-echo.jpg",
      },
      {
        name: "twitter:image",
        content: "https://huma-constellation-connect.lovable.app/og/og-echo.jpg",
      },
    ],
    links: [{ rel: "canonical", href: "https://huma-constellation-connect.lovable.app/echo" }],
  }),
});

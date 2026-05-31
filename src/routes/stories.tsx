import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteChrome";
import { Stories } from "@/components/site/sections";

export const Route = createFileRoute("/stories")({
  component: () => (
    <SiteLayout>
      <Stories />
    </SiteLayout>
  ),
  head: () => ({
    meta: [
      { title: "Stories of Humanity — HUMA" },
      {
        name: "description",
        content:
          "An archive of anonymous acts of kindness, intergenerational transmission, and local solidarity from across the world.",
      },
      { property: "og:title", content: "Stories of Humanity — HUMA" },
      {
        property: "og:description",
        content: "Read the invisible threads holding the world together.",
      },
      { property: "og:url", content: "https://huma-constellation-connect.lovable.app/stories" },
      {
        property: "og:image",
        content: "https://huma-constellation-connect.lovable.app/og/og-stories.jpg",
      },
      {
        name: "twitter:image",
        content: "https://huma-constellation-connect.lovable.app/og/og-stories.jpg",
      },
    ],
    links: [
      { rel: "canonical", href: "https://huma-constellation-connect.lovable.app/stories" },
    ],
  }),
});

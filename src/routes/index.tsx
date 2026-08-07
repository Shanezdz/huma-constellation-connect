import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteChrome";
import { Hero, SectionIndex, ValueProposition } from "@/components/site/sections";


export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "HUMA — Mapping the invisible architecture of human solidarity" },
      {
        name: "description",
        content:
          "HUMA is a living constellation of human solidarity — a poetic operating system that maps care, mentorship, and collaboration across the world.",
      },
      { property: "og:title", content: "HUMA — A living constellation of human solidarity" },
      {
        property: "og:description",
        content: "Mapping the invisible architecture of human solidarity.",
      },
      { property: "og:url", content: "https://huma-constellation-connect.lovable.app/" },
      {
        property: "og:image",
        content: "https://huma-constellation-connect.lovable.app/og/og-home.jpg",
      },
      {
        name: "twitter:image",
        content: "https://huma-constellation-connect.lovable.app/og/og-home.jpg",
      },
    ],
    links: [{ rel: "canonical", href: "https://huma-constellation-connect.lovable.app/" }],
  }),
});

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <ValueProposition />
      <SectionIndex />

    </SiteLayout>
  );
}

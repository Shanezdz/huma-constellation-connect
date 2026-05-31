import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteChrome";
import { Hero, SectionIndex } from "@/components/site/sections";

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
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/84f6d042-7d50-4030-b5d9-a2076253bd5a/id-preview-1ce4494c--8dab1ca6-5b82-4c36-a5e5-4107b90614de.lovable.app-1779739208580.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/84f6d042-7d50-4030-b5d9-a2076253bd5a/id-preview-1ce4494c--8dab1ca6-5b82-4c36-a5e5-4107b90614de.lovable.app-1779739208580.png",
      },
    ],
    links: [{ rel: "canonical", href: "https://huma-constellation-connect.lovable.app/" }],
  }),
});

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <SectionIndex />
    </SiteLayout>
  );
}

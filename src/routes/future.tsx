import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteChrome";
import { FutureHumanity } from "@/components/site/sections";

export const Route = createFileRoute("/future")({
  component: () => (
    <SiteLayout>
      <FutureHumanity />
    </SiteLayout>
  ),
  head: () => ({
    meta: [
      { title: "Future Humanity — HUMA" },
      {
        name: "description",
        content:
          "A speculative, hopeful sketch of what comes next when cooperation becomes infrastructure: cities of mutual aid, decentralized learning, ecological solidarity.",
      },
      { property: "og:title", content: "Future Humanity — HUMA" },
      {
        property: "og:description",
        content: "When cooperation becomes infrastructure.",
      },
      { property: "og:url", content: "https://huma-constellation-connect.lovable.app/future" },
    ],
    links: [
      { rel: "canonical", href: "https://huma-constellation-connect.lovable.app/future" },
    ],
  }),
});

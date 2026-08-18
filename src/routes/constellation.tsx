import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteChrome";
import { LiveConstellation } from "@/components/site/LiveConstellation";

type Entry = {
  id: string;
  recipient_id: string;
  kind: "offer" | "need";
  category: string;
  title: string;
  description: string;
  territory: string | null;
  languages: string[] | null;
  remote_possible: boolean | null;
  availability: string | null;
  created_at: string;
};

async function fetchConstellationData(): Promise<Entry[]> {
  const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "";
  const SUPABASE_KEY = process.env.VITE_SUPABASE_KEY || "";
  
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return [];
  }

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/contributions?select=id,recipient_id,kind,category,title,description,territory,languages,remote_possible,availability,created_at&visibility=eq.constellation&is_active=eq.true&order=created_at.desc&limit=60`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    
    if (!response.ok) {
      return [];
    }
    
    return await response.json();
  } catch {
    return [];
  }
}

export const Route = createFileRoute("/constellation")({
  loader: async () => {
    try {
      const entries = await fetchConstellationData();
      return { entries };
    } catch {
      return { entries: [] };
    }
  },
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

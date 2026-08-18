import "@fontsource/sora/300.css";
import "@fontsource/sora/400.css";
import "@fontsource/sora/600.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-space-black px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display font-light text-ivory">404</h1>
        <p className="mt-4 text-xs uppercase tracking-[0.3em] text-ivory/50">
          This star is not on the map
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-ivory/20 px-6 py-2 text-[10px] uppercase tracking-widest text-ivory transition-colors hover:bg-ivory hover:text-space-black"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-space-black px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-display text-ivory">This page didn't load</h1>
        <p className="mt-2 text-sm text-ivory/50">Something went wrong on our end.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-ivory px-6 py-2 text-[10px] uppercase tracking-widest text-space-black"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "HUMA — A living constellation of human solidarity" },
      {
        name: "description",
        content:
          "HUMA is a visionary digital ecosystem that visualizes, connects, and amplifies global human solidarity.",
      },
      { property: "og:site_name", content: "HUMA" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        "http-equiv": "Content-Security-Policy",
        content: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.supabase.co https://ai.gateway.lovable.dev; frame-src 'none'; object-src 'none'",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "HUMA",
          url: "https://huma-constellation-connect.vercel.app",
          logo: "https://huma-constellation-connect.vercel.app/favicon.png",
          description:
            "HUMA is a poetic digital ecosystem that visualizes, connects, and amplifies global human solidarity.",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}

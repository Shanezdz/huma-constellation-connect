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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
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

import { createMiddleware } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";

export type SessionContext = {
  session: {
    access_token: string;
    user: { id: string; email?: string };
  } | null;
};

export const sessionMiddleware = createMiddleware().server(
  async ({ next }) => {
    const token = getCookie({ name: "huma-session" });
    const userStr = getCookie({ name: "huma-user" });

    let session: SessionContext["session"] = null;

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        session = { access_token: token, user };
      } catch {
        // Invalid cookie data
      }
    }

    return next({
      context: { session } as SessionContext,
    });
  },
);

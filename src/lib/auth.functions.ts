import { createServerFn } from "@tanstack/react-start";
import { setCookie, getCookie, deleteCookie } from "@tanstack/react-start/server";
import { z } from "zod";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "";
const SUPABASE_KEY = process.env.VITE_SUPABASE_KEY || "";

const SESSION_COOKIE = "huma-session";
const REFRESH_COOKIE = "huma-refresh";
const USER_COOKIE = "huma-user";

type HumaSession = {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  token_type?: string;
  user: { id: string; email?: string };
};

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const ResetPasswordSchema = z.object({
  password: z.string().min(6),
});

function setSessionCookies(session: HumaSession) {
  const maxAge = session.expires_in || 3600;
  
  setCookie({
    name: SESSION_COOKIE,
    value: session.access_token,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge,
  });

  if (session.refresh_token) {
    setCookie({
      name: REFRESH_COOKIE,
      value: session.refresh_token,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  }

  setCookie({
    name: USER_COOKIE,
    value: JSON.stringify(session.user),
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge,
  });
}

function clearSessionCookies() {
  deleteCookie({ name: SESSION_COOKIE, path: "/" });
  deleteCookie({ name: REFRESH_COOKIE, path: "/" });
  deleteCookie({ name: USER_COOKIE, path: "/" });
}

async function supabaseAuth(path: string, body: Record<string, unknown>) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/${path}`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error("Authentication failed");
  }
  return data as HumaSession;
}

export const signIn = createServerFn({ method: "POST" })
  .validator(SignInSchema)
  .handler(async ({ data }) => {
    const session = await supabaseAuth("token?grant_type=password", {
      email: data.email,
      password: data.password,
    });
    setSessionCookies(session);
    return { success: true, user: session.user };
  });

export const signUp = createServerFn({ method: "POST" })
  .validator(SignUpSchema)
  .handler(async ({ data }) => {
    const result = await supabaseAuth("signup", {
      email: data.email,
      password: data.password,
    });
    return { success: true, user: result.user };
  });

export const signOut = createServerFn({ method: "POST" })
  .handler(async () => {
    clearSessionCookies();
    return { success: true };
  });

export const getSession = createServerFn({ method: "GET" })
  .handler(async () => {
    const token = getCookie({ name: SESSION_COOKIE });
    const userStr = getCookie({ name: USER_COOKIE });
    
    if (!token || !userStr) {
      return null;
    }

    try {
      const user = JSON.parse(userStr);
      return { access_token: token, user };
    } catch {
      clearSessionCookies();
      return null;
    }
  });

export const refreshSession = createServerFn({ method: "POST" })
  .handler(async () => {
    const refreshToken = getCookie({ name: REFRESH_COOKIE });
    
    if (!refreshToken) {
      clearSessionCookies();
      throw new Error("No refresh token");
    }

    try {
      const session = await supabaseAuth("token?grant_type=refresh_token", {
        refresh_token: refreshToken,
      });
      setSessionCookies(session);
      return { success: true, user: session.user };
    } catch {
      clearSessionCookies();
      throw new Error("Session expired");
    }
  });

export const requestPasswordReset = createServerFn({ method: "POST" })
  .validator(z.object({ email: z.string().email() }))
  .handler(async ({ data }) => {
    const origin = process.env.VITE_APP_URL || "https://huma-constellation-connect.vercel.app";
    
    await supabaseAuth("recover", {
      email: data.email,
      redirect_to: `${origin}/reset-password`,
    });
    
    return { success: true };
  });

export const updatePassword = createServerFn({ method: "POST" })
  .validator(ResetPasswordSchema)
  .handler(async ({ data }) => {
    const token = getCookie({ name: SESSION_COOKIE });
    
    if (!token) {
      throw new Error("Not authenticated");
    }

    const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      method: "PUT",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: data.password }),
    });

    if (!response.ok) {
      throw new Error("Password update failed");
    }

    return { success: true };
  });

export const establishRecoverySessionFromUrl = createServerFn({ method: "GET" })
  .handler(async ({ request }) => {
    const url = new URL(request.url);
    const hashParams = new URLSearchParams(url.hash.substring(1));
    const accessToken = hashParams.get("access_token");
    const refreshToken = hashParams.get("refresh_token");
    const type = hashParams.get("type");

    if (type !== "recovery" || !accessToken) {
      return null;
    }

    try {
      const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
        method: "GET",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        return null;
      }

      const user = await response.json();
      const session: HumaSession = {
        access_token: accessToken,
        refresh_token: refreshToken || undefined,
        user: { id: user.id, email: user.email },
      };

      setSessionCookies(session);
      return { success: true, user: session.user };
    } catch {
      return null;
    }
  });

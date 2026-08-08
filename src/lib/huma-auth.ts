const SUPABASE_URL = "https://kppcwvtmabenontexzkw.supabase.co";
const SUPABASE_KEY = "sb_publishable_jsMEZK901PHvxVjcplSWgQ_3SCl9pRe";

export type HumaSession = {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  user: {
    id: string;
    email?: string;
  };
};

const SESSION_KEY = "huma-session";

async function authRequest(path: string, body: Record<string, unknown>) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/${path}`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.msg || data?.message || data?.error_description || "Authentication failed");
  }
  return data;
}

export async function signUp(email: string, password: string) {
  return authRequest("signup", { email, password });
}

export async function signIn(email: string, password: string): Promise<HumaSession> {
  const data = await authRequest("token?grant_type=password", { email, password });
  if (typeof window !== "undefined") localStorage.setItem(SESSION_KEY, JSON.stringify(data));
  return data as HumaSession;
}

export function getSession(): HumaSession | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as HumaSession;
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function signOut() {
  if (typeof window !== "undefined") localStorage.removeItem(SESSION_KEY);
}

export async function authenticatedFetch(path: string, init: RequestInit = {}) {
  const session = getSession();
  if (!session?.access_token) throw new Error("You need to enter HUMA first.");
  return fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(init.headers || {}),
    },
  });
}

export async function publicFetch(path: string, init: RequestInit = {}) {
  return fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
}

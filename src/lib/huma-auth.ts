const SUPABASE_URL = "https://kppcwvtmabenontexzkw.supabase.co";
const SUPABASE_KEY = "sb_publishable_jsMEZK901PHvxVjcplSWgQ_3SCl9pRe";

export type HumaSession = {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  token_type?: string;
  user: {
    id: string;
    email?: string;
  };
};

const SESSION_KEY = "huma-session";

function saveSession(session: HumaSession) {
  if (typeof window !== "undefined") localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

function clearSession() {
  if (typeof window !== "undefined") localStorage.removeItem(SESSION_KEY);
}

async function authRequest(path: string, body: Record<string, unknown>) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/${path}`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
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
  return saveSession(data as HumaSession);
}

export function getSession(): HumaSession | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as HumaSession;
  } catch {
    clearSession();
    return null;
  }
}

export async function refreshSession(): Promise<HumaSession> {
  const current = getSession();
  if (!current?.refresh_token) {
    clearSession();
    throw new Error("Your HUMA session has ended. Please sign in again.");
  }

  try {
    const data = await authRequest("token?grant_type=refresh_token", {
      refresh_token: current.refresh_token,
    });
    return saveSession(data as HumaSession);
  } catch (error) {
    clearSession();
    throw error instanceof Error
      ? error
      : new Error("Your HUMA session has ended. Please sign in again.");
  }
}

export function signOut() {
  clearSession();
}

async function restFetch(path: string, token: string, init: RequestInit = {}) {
  return fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(init.headers || {}),
    },
  });
}

export async function authenticatedFetch(path: string, init: RequestInit = {}) {
  let session = getSession();
  if (!session?.access_token) throw new Error("You need to enter HUMA first.");

  let response = await restFetch(path, session.access_token, init);

  if (response.status === 401 && session.refresh_token) {
    session = await refreshSession();
    response = await restFetch(path, session.access_token, init);
  }

  return response;
}

export async function publicFetch(path: string, init: RequestInit = {}) {
  return fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SUPABASE_KEY,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY as string;

export type HumaSession = {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  token_type?: string;
  user: { id: string; email?: string };
};

const SESSION_KEY = "huma-session";
const HUMA_ORIGIN = "https://huma-constellation-connect.vercel.app";

function saveSession(session: HumaSession) {
  if (typeof window !== "undefined") localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}
function clearSession() { if (typeof window !== "undefined") localStorage.removeItem(SESSION_KEY); }

async function authRequest(path: string, body: Record<string, unknown>) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/${path}`, { method: "POST", headers: { apikey: SUPABASE_KEY, "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data?.msg || data?.message || data?.error_description || "Authentication failed");
  return data;
}

export async function signUp(email: string, password: string) { return authRequest("signup", { email, password }); }
export async function signIn(email: string, password: string): Promise<HumaSession> { return saveSession((await authRequest("token?grant_type=password", { email, password })) as HumaSession); }

export async function requestPasswordReset(email: string) {
  return authRequest("recover", { email, redirect_to: `${HUMA_ORIGIN}/reset-password` });
}

export async function establishRecoverySessionFromUrl(): Promise<HumaSession | null> {
  if (typeof window === "undefined") return null;
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const accessToken = hash.get("access_token");
  const refreshToken = hash.get("refresh_token");
  const type = hash.get("type");
  if (!accessToken || type !== "recovery") return null;
  const userResponse = await fetch(`${SUPABASE_URL}/auth/v1/user`, { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${accessToken}` } });
  if (!userResponse.ok) throw new Error("This recovery link is invalid or has expired.");
  const user = await userResponse.json();
  const session = saveSession({ access_token: accessToken, refresh_token: refreshToken ?? undefined, user: { id: user.id, email: user.email } });
  window.history.replaceState({}, document.title, window.location.pathname);
  return session;
}

export async function updatePassword(password: string) {
  const session = getSession();
  if (!session?.access_token) throw new Error("Open the password recovery link from your email first.");
  const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, { method: "PUT", headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${session.access_token}`, "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data?.msg || data?.message || "Your password could not be changed.");
  return data;
}

export function getSession(): HumaSession | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(SESSION_KEY); if (!raw) return null;
  try { return JSON.parse(raw) as HumaSession; } catch { clearSession(); return null; }
}
export async function refreshSession(): Promise<HumaSession> {
  const current = getSession(); if (!current?.refresh_token) { clearSession(); throw new Error("Your HUMA session has ended. Please sign in again."); }
  try { return saveSession((await authRequest("token?grant_type=refresh_token", { refresh_token: current.refresh_token })) as HumaSession); }
  catch (error) { clearSession(); throw error instanceof Error ? error : new Error("Your HUMA session has ended. Please sign in again."); }
}
export function signOut() { clearSession(); }
async function restFetch(path: string, token: string, init: RequestInit = {}) { return fetch(`${SUPABASE_URL}/rest/v1/${path}`, { ...init, headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${token}`, "Content-Type": "application/json", Prefer: "return=representation", ...(init.headers || {}) } }); }
export async function authenticatedFetch(path: string, init: RequestInit = {}) { let session = getSession(); if (!session?.access_token) throw new Error("You need to enter HUMA first."); let response = await restFetch(path, session.access_token, init); if (response.status === 401 && session.refresh_token) { session = await refreshSession(); response = await restFetch(path, session.access_token, init); } return response; }
export async function publicFetch(path: string, init: RequestInit = {}) {
  const session = getSession();
  const token = session?.access_token || SUPABASE_KEY;
  let response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${token}`, "Content-Type": "application/json", ...(init.headers || {}) },
  });
  if (response.status === 401 && session?.refresh_token) {
    try {
      const renewed = await refreshSession();
      response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
        ...init,
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${renewed.access_token}`, "Content-Type": "application/json", ...(init.headers || {}) },
      });
    } catch {
      response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
        ...init,
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", ...(init.headers || {}) },
      });
    }
  }
  return response;
}

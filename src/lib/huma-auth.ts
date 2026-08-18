import {
  signIn as signInFn,
  signUp as signUpFn,
  signOut as signOutFn,
  getSession as getSessionFn,
  refreshSession as refreshSessionFn,
  requestPasswordReset as requestPasswordResetFn,
  updatePassword as updatePasswordFn,
  establishRecoverySessionFromUrl as establishRecoverySessionFromUrlFn,
} from "./auth.functions";
import { checkRateLimit, recordAttempt, resetAttempts } from "./rate-limiter";

export type HumaSession = {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  token_type?: string;
  user: { id: string; email?: string };
};

export async function signIn(email: string, password: string) {
  const rateLimitKey = `signin:${email}`;
  const { allowed, retryAfter } = checkRateLimit(rateLimitKey);
  
  if (!allowed) {
    throw new Error(`Too many attempts. Please try again in ${retryAfter} seconds.`);
  }
  
  recordAttempt(rateLimitKey);
  
  try {
    const result = await signInFn({ data: { email, password } });
    resetAttempts(rateLimitKey);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function signUp(email: string, password: string) {
  const rateLimitKey = `signup:${email}`;
  const { allowed, retryAfter } = checkRateLimit(rateLimitKey);
  
  if (!allowed) {
    throw new Error(`Too many attempts. Please try again in ${retryAfter} seconds.`);
  }
  
  recordAttempt(rateLimitKey);
  
  try {
    const result = await signUpFn({ data: { email, password } });
    resetAttempts(rateLimitKey);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function signOut() {
  return signOutFn({ data: undefined });
}

export async function getSession() {
  return getSessionFn({ data: undefined });
}

export async function refreshSession() {
  return refreshSessionFn({ data: undefined });
}

export async function requestPasswordReset(email: string) {
  const rateLimitKey = `reset:${email}`;
  const { allowed, retryAfter } = checkRateLimit(rateLimitKey);
  
  if (!allowed) {
    throw new Error(`Too many attempts. Please try again in ${retryAfter} seconds.`);
  }
  
  recordAttempt(rateLimitKey);
  
  try {
    const result = await requestPasswordResetFn({ data: { email } });
    resetAttempts(rateLimitKey);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updatePassword(password: string) {
  return updatePasswordFn({ data: { password } });
}

export async function establishRecoverySessionFromUrl() {
  return establishRecoverySessionFromUrlFn({ data: undefined });
}

export async function authenticatedFetch(path: string, init: RequestInit = {}) {
  const session = await getSession();
  if (!session?.access_token) {
    throw new Error("You need to enter HUMA first.");
  }

  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
  const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY as string;

  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });

  if (response.status === 401) {
    try {
      await refreshSession();
      const newSession = await getSession();
      return fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
        ...init,
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${newSession?.access_token}`,
          "Content-Type": "application/json",
          ...(init.headers || {}),
        },
      });
    } catch {
      throw new Error("Session expired. Please sign in again.");
    }
  }

  return response;
}

export async function publicFetch(path: string, init: RequestInit = {}) {
  const session = await getSession();
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
  const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY as string;
  const token = session?.access_token || SUPABASE_KEY;

  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300, stale-while-revalidate=600",
      ...(init.headers || {}),
    },
  });

  if (response.status === 401 && session?.access_token) {
    try {
      await refreshSession();
      const renewed = await getSession();
      return fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
        ...init,
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${renewed?.access_token}`,
          "Content-Type": "application/json",
          ...(init.headers || {}),
        },
      });
    } catch {
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
  }

  return response;
}

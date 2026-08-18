const attempts = new Map<string, number[]>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 5 * 60 * 1000; // 5 minutes

export function checkRateLimit(key: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const timestamps = attempts.get(key) || [];
  
  // Clean up old attempts
  const recentTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW);
  attempts.set(key, recentTimestamps);
  
  if (recentTimestamps.length >= MAX_ATTEMPTS) {
    const oldestAttempt = recentTimestamps[0];
    const retryAfter = oldestAttempt + LOCKOUT_DURATION - now;
    
    if (retryAfter > 0) {
      return { allowed: false, retryAfter: Math.ceil(retryAfter / 1000) };
    }
  }
  
  return { allowed: true };
}

export function recordAttempt(key: string): void {
  const now = Date.now();
  const timestamps = attempts.get(key) || [];
  timestamps.push(now);
  attempts.set(key, timestamps);
}

export function resetAttempts(key: string): void {
  attempts.delete(key);
}

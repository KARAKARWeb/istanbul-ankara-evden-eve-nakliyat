interface RateLimitEntry {
  attempts: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

const MAX_ATTEMPTS = 100; // Test için artırıldı
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 dakika
const CLEANUP_INTERVAL = 60 * 60 * 1000; // 1 saat

// Periyodik temizleme
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (entry.resetAt < now) {
      rateLimitMap.delete(ip);
    }
  }
}, CLEANUP_INTERVAL);

export function checkRateLimit(ip: string): {
  allowed: boolean;
  remainingAttempts: number;
  resetAt?: number;
} {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  
  if (!entry || entry.resetAt < now) {
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS };
  }
  
  if (entry.attempts >= MAX_ATTEMPTS) {
    return {
      allowed: false,
      remainingAttempts: 0,
      resetAt: entry.resetAt,
    };
  }
  
  return {
    allowed: true,
    remainingAttempts: MAX_ATTEMPTS - entry.attempts,
  };
}

export function recordFailedAttempt(ip: string): void {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, {
      attempts: 1,
      resetAt: now + LOCKOUT_DURATION,
    });
  } else {
    entry.attempts += 1;
  }
}

export function resetRateLimit(ip: string): void {
  rateLimitMap.delete(ip);
}

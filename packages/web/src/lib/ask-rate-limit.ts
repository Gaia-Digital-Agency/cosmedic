// In-memory rate limiter for POST /api/ask — 10 requests per IP per 60 seconds.
// Mirrors the pattern used by enquiry-rate-limit.ts; no Redis required.

const store = new Map<string, { count: number; resetAt: number }>()

const LIMIT = 10
const WINDOW_MS = 60_000

export function checkAskRateLimit(ip: string): { ok: true } | { ok: false; retryAfter: number } {
  const now = Date.now()
  const entry = store.get(ip)

  if (!entry || now >= entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return { ok: true }
  }

  if (entry.count >= LIMIT) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) }
  }

  entry.count++
  return { ok: true }
}

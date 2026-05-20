/**
 * In-memory IP rate limiter for /api/enquiry.
 *
 * Window: 60 seconds.
 * Quota: 2 submissions per IP per window. Higher = 429.
 *
 * Reset is automatic on each successful slot read; entries are pruned when
 * their window ends. Single-process — sufficient for one pm2 instance.
 */

type Slot = { count: number; resetAt: number }

const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 2

const slots = new Map<string, Slot>()

export function checkRateLimit(ip: string): { ok: true } | { ok: false; retryAfterSeconds: number } {
  const now = Date.now()
  const slot = slots.get(ip)
  if (!slot || slot.resetAt <= now) {
    slots.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return { ok: true }
  }
  if (slot.count < MAX_PER_WINDOW) {
    slot.count++
    return { ok: true }
  }
  return { ok: false, retryAfterSeconds: Math.max(1, Math.ceil((slot.resetAt - now) / 1000)) }
}

// Janitor — runs occasionally to drop expired entries so the Map doesn't
// grow unbounded under high traffic.
setInterval(() => {
  const now = Date.now()
  for (const [ip, slot] of slots) {
    if (slot.resetAt <= now) slots.delete(ip)
  }
}, 60_000).unref?.()

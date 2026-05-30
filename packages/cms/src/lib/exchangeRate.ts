import type { BasePayload } from 'payload'

const API_URL = 'https://open.er-api.com/v6/latest/AUD'
const THRESHOLD = 0.05 // ±5%
const RATE_MIN = 5_000
const RATE_MAX = 30_000

export async function fetchLiveAudToIdr(): Promise<number> {
  const res = await fetch(API_URL, { signal: AbortSignal.timeout(10_000) })
  if (!res.ok) throw new Error(`Exchange rate API ${res.status}`)
  const data = (await res.json()) as { rates?: Record<string, number> }
  const rate = data.rates?.IDR
  if (!rate || !Number.isFinite(rate) || rate < RATE_MIN || rate > RATE_MAX) {
    throw new Error(`Implausible IDR rate: ${rate}`)
  }
  return Math.round(rate)
}

function utcStamp(): string {
  return new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC'
}

export type RateCheckResult = {
  liveRate: number
  currentRate: number
  updated: boolean
  reason: string
}

export async function maybeUpdateRate(payload: BasePayload): Promise<RateCheckResult> {
  const settings = await payload.findGlobal({ slug: 'settings' }) as any
  const currentRate: number = settings.audToIdrRate ?? 12800

  if (settings.rateLockedManually) {
    return { liveRate: currentRate, currentRate, updated: false, reason: 'locked by admin' }
  }

  const liveRate = await fetchLiveAudToIdr()
  const delta = Math.abs(liveRate - currentRate) / currentRate

  const rateSource = `open.er-api.com · ${utcStamp()}`
  const rateLastFetchedAt = new Date().toISOString()

  if (delta > THRESHOLD) {
    await payload.updateGlobal({
      slug: 'settings',
      data: { audToIdrRate: liveRate, rateLastFetchedAt, rateSource },
    } as any)
    return { liveRate, currentRate, updated: true, reason: `delta ${(delta * 100).toFixed(1)}% > 5%` }
  }

  await payload.updateGlobal({
    slug: 'settings',
    data: { rateLastFetchedAt, rateSource },
  } as any)
  return { liveRate, currentRate, updated: false, reason: `delta ${(delta * 100).toFixed(1)}% ≤ 5% — no change` }
}

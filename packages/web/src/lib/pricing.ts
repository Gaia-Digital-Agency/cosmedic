/**
 * Pricing helpers — IDR is the source of truth.
 *
 * Rate + rounding are pulled from the live `Settings` global
 * (`audToIdrRate`, `roundIdrTo`) so the clinic edits ONE value to re-peg
 * every AUD display across the site. Fallback constants apply only when
 * the CMS cache is cold (first request before loadCmsCache resolves).
 */

import { getCmsCacheSync } from './cms'

export const DEFAULT_AUD_TO_IDR = 12800
export const DEFAULT_ROUND_IDR_TO = 50000

function readRate(): { rate: number; roundTo: number } {
  const s = getCmsCacheSync().settings
  return {
    rate: s?.audToIdrRate || DEFAULT_AUD_TO_IDR,
    roundTo: s?.roundIdrTo || DEFAULT_ROUND_IDR_TO,
  }
}

export function formatIDR(idr: number, roundTo: number = DEFAULT_ROUND_IDR_TO): string {
  const rounded = Math.round(idr / roundTo) * roundTo
  return 'Rp ' + rounded.toLocaleString('de-DE')
}

export function formatAUD(aud: number): string {
  return 'AUD ' + Math.round(aud).toLocaleString('en-AU')
}

export type PriceParts = {
  idr: string
  aud: string | null
  suffix: string
}

export function priceParts(
  idr: number | null | undefined,
  opts?: { suffix?: string },
): PriceParts | null {
  if (idr == null || !Number.isFinite(idr) || idr <= 0) return null
  const { rate, roundTo } = readRate()
  const suffix = opts?.suffix ?? ''
  return {
    idr: formatIDR(idr, roundTo) + suffix,
    aud: formatAUD(idr / rate) + suffix,
    suffix,
  }
}

/**
 * Pricing helpers — IDR is the source of truth.
 *
 * Rate + rounding are pulled from the live `Settings` global
 * (`audToIdrRate`, `roundIdrTo`) so the clinic edits ONE value to re-peg
 * every AUD display across the site. Fallback constants apply only when
 * the CMS cache is cold (first request before loadCmsCache resolves).
 *
 * Denomination sanity rules (baked in at render-time):
 *   IDR amounts  — expected range 10 000 – 2 000 000 000
 *   AUD amounts  — expected range 1 – 200 000
 * Values outside these ranges are suspicious (e.g. an AUD amount entered
 * into an IDR field by mistake). Use `validateIdrField` as a Payload field
 * validator to surface the warning at CMS save-time.
 */

import { getCmsCacheSync } from './cms'

export const DEFAULT_AUD_TO_IDR = 12800
export const DEFAULT_ROUND_IDR_TO = 50000

/** Sanity bounds for IDR amounts. */
export const IDR_MIN = 10_000        // below this = suspiciously low (could be AUD)
export const IDR_MAX = 2_000_000_000 // above this = suspiciously high

/** Sanity bounds for derived AUD amounts. */
export const AUD_MIN = 1
export const AUD_MAX = 200_000

/**
 * Console-warn if `idr` is outside the expected IDR denomination range.
 * Called from priceParts() and PricingTeaser at render-time.
 */
export function sanityCheckIdr(idr: number, label = 'price'): void {
  if (idr < IDR_MIN) {
    console.warn(
      `[cosmedic/pricing] sanity: "${label}" IDR ${idr.toLocaleString()} < ${IDR_MIN.toLocaleString()} — ` +
      `looks like AUD? Equivalent IDR at rate ${DEFAULT_AUD_TO_IDR}: ` +
      `${Math.round(idr * DEFAULT_AUD_TO_IDR).toLocaleString()}`,
    )
  }
  if (idr > IDR_MAX) {
    console.warn(
      `[cosmedic/pricing] sanity: "${label}" IDR ${idr.toLocaleString()} > ${IDR_MAX.toLocaleString()} — suspiciously high`,
    )
  }
}

/**
 * Payload field `validate` helper — returns an error string when the IDR
 * value fails the sanity check, or `true` to pass.
 * Usage: { name: 'priceIdr2026', type: 'number', validate: validateIdrField }
 */
export function validateIdrField(val: number | null | undefined): string | true {
  if (val == null || val === 0) return true
  if (val < IDR_MIN) {
    return `IDR ${val.toLocaleString()} looks suspiciously low (< ${IDR_MIN.toLocaleString()}). Did you enter an AUD value by mistake? IDR prices are typically ≥ 100,000.`
  }
  if (val > IDR_MAX) {
    return `IDR ${val.toLocaleString()} looks suspiciously high (> ${IDR_MAX.toLocaleString()}).`
  }
  return true
}

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
  opts?: { suffix?: string; label?: string },
): PriceParts | null {
  if (idr == null || !Number.isFinite(idr) || idr <= 0) return null
  sanityCheckIdr(idr, opts?.label)
  const { rate, roundTo } = readRate()
  const suffix = opts?.suffix ?? ''
  return {
    idr: formatIDR(idr, roundTo) + suffix,
    aud: formatAUD(idr / rate) + suffix,
    suffix,
  }
}

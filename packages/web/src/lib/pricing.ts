/**
 * Pricing helpers — ports `design/shared.jsx` priceParts / formatIDR / formatAUD.
 *
 * Settings.audToIdrRate + Settings.roundIdrTo will replace these constants in
 * Phase 6 (sourced from the Settings global). For now they match the design
 * defaults (May 2026 rate per brand-guidelines.pdf §IV).
 */

export const AUD_TO_IDR = 10500
export const ROUND_IDR_TO = 50000

export function formatIDR(idr: number): string {
  const rounded = Math.round(idr / ROUND_IDR_TO) * ROUND_IDR_TO
  return 'Rp ' + rounded.toLocaleString('de-DE')
}

export function formatAUD(aud: number): string {
  return 'AUD ' + aud.toLocaleString('en-AU')
}

export type PriceParts = {
  idr: string
  aud: string | null
  suffix: string
}

export function priceParts(audStr: string | null | undefined): PriceParts | null {
  if (!audStr || typeof audStr !== 'string') return null
  const m = audStr.match(/AUD\s*([\d,]+)(.*)$/i)
  if (!m) {
    return { idr: audStr, aud: null, suffix: '' }
  }
  const num = parseInt(m[1].replace(/,/g, ''), 10)
  const suffix = m[2] || ''
  return {
    idr: formatIDR(num * AUD_TO_IDR) + suffix,
    aud: formatAUD(num) + suffix,
    suffix,
  }
}

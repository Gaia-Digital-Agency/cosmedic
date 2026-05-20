/**
 * Parser for docs/pricelist.xlsx.
 *
 * Returns typed records for each sheet so the seed orchestrator can iterate
 * and upsert PriceListItems / InjectableProducts / MachineTreatments /
 * HairRemovalAreas / InclusionItems / ExclusionItems / JourneySteps.
 *
 * Heuristics encoded here:
 *  - Sections within the surgical sheet are identified by rows where col-1
 *    is non-empty but cols 2-7 are all empty (e.g. "Face & Neck", "Breast").
 *  - "Top 3" markers in col 0 set featuredRank (1/2/3).
 *  - Names ending or containing "*" mark includesImplant.
 *  - Range prices (e.g. "IDR 1,386,000 – IDR1,584,000") parse to range low/high.
 *  - Trailing parenthetical (e.g. "(Local Anesthesia)") is captured into notes.
 */

import xlsx from 'xlsx'
import path from 'path'
import { fileURLToPath } from 'url'
import slugifyLib from 'slugify'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const PRICELIST_PATH = path.resolve(__dirname, '../../../../docs/pricelist.xlsx')

// Promote string keys to predictable slugs.
export function slugify(s: string): string {
  return slugifyLib(s, { lower: true, strict: true, trim: true }).replace(/-+/g, '-')
}

// Strip currency markers, commas, dashes, and whitespace.
function cleanNumber(raw: string | number | null | undefined): number | null {
  if (raw == null || raw === '') return null
  if (typeof raw === 'number') return raw
  const m = String(raw).replace(/[^\d.]/g, '')
  if (!m) return null
  const n = Number(m)
  return Number.isFinite(n) ? n : null
}

function parsePriceRange(raw: string): { low: number | null; high: number | null } | null {
  const m = String(raw).match(/([\d.,]+)\s*[–-]\s*[A-Z]*\s*([\d.,]+)/i)
  if (!m) return null
  const low = cleanNumber(m[1])
  const high = cleanNumber(m[2])
  if (low == null || high == null) return null
  return { low, high }
}

export type SurgicalRow = {
  slug: string
  featuredRank: number | null
  category: string
  name: string
  notes: string | null
  includesImplant: boolean
  priceIdr2025: number | null
  priceAud2025: number | null
  priceIdr2026: number | null
  priceAud2026: number | null
}

export function parseSurgicalSheet(sheetName: string): SurgicalRow[] {
  const wb = xlsx.readFile(PRICELIST_PATH)
  const sheet = wb.Sheets[sheetName]
  if (!sheet) return []
  const rows = xlsx.utils.sheet_to_json<(string | number)[]>(sheet, { header: 1, blankrows: false, defval: '' })

  const out: SurgicalRow[] = []
  let currentCategory = ''

  for (let i = 3; i < rows.length; i++) {
    const r = rows[i]
    const rank = r[0]
    const nameRaw = String(r[1] ?? '').trim()
    const notesRaw = String(r[2] ?? '').trim()
    const idr2025 = cleanNumber(r[3])
    const aud2025 = cleanNumber(r[4])
    const idr2026 = cleanNumber(r[5])
    const aud2026 = cleanNumber(r[6])

    if (!nameRaw) continue

    const isSectionHeader = idr2025 == null && idr2026 == null && aud2025 == null && aud2026 == null
    if (isSectionHeader) {
      currentCategory = nameRaw
      continue
    }

    const includesImplant = /\*/.test(nameRaw)
    const cleanName = nameRaw.replace(/\*/g, '').trim()
    const parenMatch = cleanName.match(/\(([^)]+)\)$/)
    const baseName = cleanName.replace(/\s*\([^)]+\)\s*$/, '').trim()
    const notes = parenMatch ? parenMatch[1].trim() : notesRaw || null
    const featuredRank = typeof rank === 'number' ? rank : null

    out.push({
      slug: 'surgical-' + slugify(baseName),
      featuredRank,
      category: currentCategory,
      name: baseName,
      notes,
      includesImplant,
      priceIdr2025: idr2025,
      priceAud2025: aud2025,
      priceIdr2026: idr2026,
      priceAud2026: aud2026,
    })
  }

  return out
}

export type InjectionRow = {
  slug: string
  section: string
  name: string
  unit: string
  priceIdr: number | null
  priceIdrRangeLow: number | null
  priceIdrRangeHigh: number | null
  notes: string | null
}

export function parseInjectionSheet(sheetName = 'Injection'): InjectionRow[] {
  const wb = xlsx.readFile(PRICELIST_PATH)
  const sheet = wb.Sheets[sheetName]
  if (!sheet) return []
  const rows = xlsx.utils.sheet_to_json<(string | number)[]>(sheet, { header: 1, blankrows: false, defval: '' })

  const out: InjectionRow[] = []
  let section = ''

  for (let i = 1; i < rows.length; i++) {
    const r = rows[i]
    const c0 = String(r[0] ?? '').trim()
    const c1 = String(r[1] ?? '').trim()
    const c2 = String(r[2] ?? '').trim()
    if (!c0) continue
    if (!c1 && !c2) {
      section = c0
      continue
    }
    const priceRange = parsePriceRange(c2)
    out.push({
      slug: slugify(c0) + '-' + slugify(c1).slice(0, 24),
      section,
      name: c0,
      unit: c1 || section,
      priceIdr: priceRange ? null : cleanNumber(c2),
      priceIdrRangeLow: priceRange?.low ?? null,
      priceIdrRangeHigh: priceRange?.high ?? null,
      notes: null,
    })
  }
  return out
}

export type MachineRow = {
  slug: string
  machineName: string
  area: string
  standardIdr: number | null
  kitasKtpIdr: number | null
  packageIdr: number | null
  notes: string | null
}

export function parseMachineSheet(): MachineRow[] {
  const wb = xlsx.readFile(PRICELIST_PATH)
  const sheet = wb.Sheets['Machine']
  if (!sheet) return []
  const rows = xlsx.utils.sheet_to_json<(string | number)[]>(sheet, { header: 1, blankrows: false, defval: '' })

  const out: MachineRow[] = []
  let machine = ''
  for (let i = 2; i < rows.length; i++) {
    const r = rows[i]
    const c0 = String(r[0] ?? '').trim()
    const c1 = String(r[1] ?? '').trim()
    if (!c0 && !c1) continue
    if (c0.startsWith('*Note')) continue
    if (c0) machine = c0
    if (!c1) continue
    const idr = cleanNumber(r[2])
    const kitas = cleanNumber(r[3])
    const pkg = cleanNumber(r[4])
    if (idr == null && kitas == null && pkg == null) continue
    out.push({
      slug: slugify(machine + ' ' + c1),
      machineName: machine,
      area: c1,
      standardIdr: idr,
      kitasKtpIdr: kitas,
      packageIdr: pkg,
      notes: null,
    })
  }
  return out
}

export type BtlRow = {
  slug: string
  area: string
  bodyZone: 'face' | 'upper-body' | 'lower-body' | 'package' | 'other'
  priceIdr: number | null
}

export function parseBtlSheet(): BtlRow[] {
  const wb = xlsx.readFile(PRICELIST_PATH)
  const sheet = wb.Sheets['BTL']
  if (!sheet) return []
  const rows = xlsx.utils.sheet_to_json<(string | number)[]>(sheet, { header: 1, blankrows: false, defval: '' })

  const out: BtlRow[] = []
  let zone: BtlRow['bodyZone'] = 'other'
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i]
    const c0 = String(r[0] ?? '').trim()
    const c1 = r[1]
    if (!c0) continue
    if (c1 === '' || c1 == null) {
      const lower = c0.toLowerCase()
      if (lower.includes('face')) zone = 'face'
      else if (lower.includes('upper body')) zone = 'upper-body'
      else if (lower.includes('lower body')) zone = 'lower-body'
      else if (lower.includes('package')) zone = 'package'
      else zone = 'other'
      continue
    }
    const idr = cleanNumber(c1)
    if (idr == null) continue
    out.push({
      slug: slugify(zone + '-' + c0),
      area: c0,
      bodyZone: zone,
      priceIdr: idr,
    })
  }
  return out
}

export type FurtherInfo = {
  includes: string[]
  excludes: string[]
  journey: Array<{ dayLabel: string; lines: string[] }>
}

export function parseFurtherInformation(): FurtherInfo {
  const wb = xlsx.readFile(PRICELIST_PATH)
  const sheet = wb.Sheets['Further Information']
  if (!sheet) return { includes: [], excludes: [], journey: [] }
  const rows = xlsx.utils.sheet_to_json<(string | number)[]>(sheet, { header: 1, blankrows: false, defval: '' })

  const out: FurtherInfo = { includes: [], excludes: [], journey: [] }
  let mode: 'include' | 'exclude' | 'journey' | null = null
  let currentDay: { dayLabel: string; lines: string[] } | null = null

  for (let i = 0; i < rows.length; i++) {
    const r = rows[i]
    const c0 = String(r[0] ?? '').trim()
    const c1 = String(r[1] ?? '').trim()
    if (c0 === 'Include') {
      mode = 'include'
      if (c1) out.includes.push(c1.replace(/^\d+\.\s*/, ''))
      continue
    }
    if (c0 === 'Exclude') {
      mode = 'exclude'
      if (c1) out.excludes.push(c1.replace(/^\d+\.\s*/, ''))
      continue
    }
    if (/^Day\s+\d+/i.test(c0)) {
      if (currentDay) out.journey.push(currentDay)
      currentDay = { dayLabel: c0, lines: [c1.replace(/^\d+\.\s*/, '')].filter(Boolean) }
      mode = 'journey'
      continue
    }
    if (mode === 'include' && c1 && !c0) out.includes.push(c1.replace(/^\d+\.\s*/, ''))
    else if (mode === 'exclude' && c1 && !c0) out.excludes.push(c1.replace(/^\d+\.\s*/, ''))
    else if (mode === 'journey' && currentDay && c1 && !c0) currentDay.lines.push(c1.replace(/^\d+\.\s*/, ''))
  }
  if (currentDay) out.journey.push(currentDay)
  return out
}

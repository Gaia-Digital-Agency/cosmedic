/**
 * Phase R8.D — Awards + PressMentions wipe-and-reseed.
 *
 * The /press route currently renders hardcoded ACCREDITATIONS (8 rows) and
 * PRESS (6 rows) arrays. After the R8.D.press route rewire, the page will
 * read from the Awards + PressMentions collections instead.
 *
 * The existing 5 dev-fixture awards + 3 dev-fixture press_mentions in the DB
 * don't match the rendered copy, so this seed replaces them entirely with
 * the verbatim hardcoded arrays from packages/web/src/routes/press/PressPage.tsx
 * L10–60. User-approved replacement (the dev rows were invisible on the live
 * site — wiping them causes no frontend data loss).
 *
 * Idempotent. Run via:
 *   NODE_ENV=production pnpm --filter @cosmedic/cms exec tsx \
 *     src/seed/seed-r8d-press-data.ts
 */

import { config as loadEnv } from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
loadEnv({ path: path.resolve(dirname, '../../.env') })

const { getPayload } = await import('payload')
const config = (await import('../payload.config')).default
const { upsert } = await import('./seed-helpers')

/* ─── Accreditations → Awards ──────────────────────────────────────────── */

type AwardRow = {
  slug: string
  name: string
  issuer: string
  summary: string
  sortOrder: number
}

const ACCREDITATIONS: AwardRow[] = [
  {
    slug: 'achsi',
    name: 'ACHSI',
    issuer: 'Australian Council on Healthcare Standards International',
    summary: 'First Indonesian hospital · 2014, renewed 2024',
    sortOrder: 10,
  },
  {
    slug: 'iso-9001',
    name: 'ISO 9001:2015',
    issuer: 'International Organization for Standardization',
    summary: 'Quality management certification',
    sortOrder: 20,
  },
  {
    slug: 'healthcare-asia',
    name: 'Healthcare Asia',
    issuer: 'Medical Tourism Hospital of the Year 2026',
    summary: 'Indonesia category',
    sortOrder: 30,
  },
  {
    slug: 'isaps',
    name: 'ISAPS',
    issuer: 'International Society of Aesthetic Plastic Surgery',
    summary: 'Member institution',
    sortOrder: 40,
  },
  {
    slug: 'ipras',
    name: 'IPRAS',
    issuer: 'International Confederation for Plastic Reconstructive & Aesthetic Surgery',
    summary: 'Affiliated faculty',
    sortOrder: 50,
  },
  {
    slug: 'jci-pathway',
    name: 'JCI Pathway',
    issuer: 'Joint Commission International',
    summary: 'Pre-accreditation, ongoing',
    sortOrder: 60,
  },
  {
    slug: 'tga',
    name: 'TGA',
    issuer: 'Therapeutic Goods Administration (AU)',
    summary: 'Sponsored device protocols',
    sortOrder: 70,
  },
  {
    slug: 'fda',
    name: 'FDA',
    issuer: 'U.S. Food and Drug Administration',
    summary: 'Implant & device sourcing',
    sortOrder: 80,
  },
]

const NEW_AWARD_SLUGS = new Set(ACCREDITATIONS.map((a) => a.slug))

/* ─── Press → PressMentions ────────────────────────────────────────────── */

type PressRow = {
  slug: string
  publication: string
  headline: string
  publishedDate: string // ISO date YYYY-MM-DD
  displayDate: string // What the route used to render verbatim (e.g. "March 2026")
  sortOrder: number
}

const PRESS: PressRow[] = [
  {
    slug: 'vogue-au-2026-03',
    publication: 'Vogue Australia',
    headline: 'The new wave of considered cosmetic medicine.',
    publishedDate: '2026-03-01',
    displayDate: 'March 2026',
    sortOrder: 10,
  },
  {
    slug: 't-magazine-2026-01',
    publication: 'T Magazine',
    headline: 'A retreat with the rigour of a hospital.',
    publishedDate: '2026-01-01',
    displayDate: 'January 2026',
    sortOrder: 20,
  },
  {
    slug: 'harpers-bazaar-asia-2025-11',
    publication: "Harper's Bazaar Asia",
    headline: "Bali's quiet revolution in aesthetic surgery.",
    publishedDate: '2025-11-01',
    displayDate: 'November 2025',
    sortOrder: 30,
  },
  {
    slug: 'robb-report-2025-10',
    publication: 'Robb Report',
    headline: 'Why discerning patients are flying to Nusa Dua.',
    publishedDate: '2025-10-01',
    displayDate: 'October 2025',
    sortOrder: 40,
  },
  {
    slug: 'afr-2025-08',
    publication: 'The Australian Financial Review',
    headline: 'The medical-tourism centre Australians actually trust.',
    publishedDate: '2025-08-01',
    displayDate: 'August 2025',
    sortOrder: 50,
  },
  {
    slug: 'tatler-asia-2025-05',
    publication: 'Tatler Asia',
    headline: "Inside BIMC CosMedic — Bali's most accredited centre.",
    publishedDate: '2025-05-01',
    displayDate: 'May 2025',
    sortOrder: 60,
  },
]

const NEW_PRESS_SLUGS = new Set(PRESS.map((p) => p.slug))

/* ─── Runner ───────────────────────────────────────────────────────────── */

async function main(): Promise<void> {
  const payload = await getPayload({ config })
  payload.logger.info('[seed-r8d-press] starting')

  // 1. Awards — upsert 8 canonical rows, then delete any not in the set.
  for (const a of ACCREDITATIONS) {
    await upsert(payload, 'awards', 'slug', a.slug, {
      slug: a.slug,
      name: a.name,
      issuer: a.issuer,
      summary: a.summary,
      sortOrder: a.sortOrder,
    })
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const existingAwards = (await (payload as any).find({
    collection: 'awards',
    limit: 500,
    depth: 0,
  })) as { docs: Array<{ id: number; slug: string }> }
  for (const row of existingAwards.docs) {
    if (!NEW_AWARD_SLUGS.has(row.slug)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (payload as any).delete({ collection: 'awards', id: row.id })
      payload.logger.info(`[seed-r8d-press] deleted dev-fixture award "${row.slug}"`)
    }
  }
  payload.logger.info(`[seed-r8d-press] awards upserted: ${ACCREDITATIONS.length}`)

  // 2. PressMentions — same pattern.
  for (const p of PRESS) {
    await upsert(payload, 'press-mentions', 'slug', p.slug, {
      slug: p.slug,
      publication: p.publication,
      headline: p.headline,
      publishedDate: p.publishedDate,
      // `summary` intentionally NOT set — the press-row date column on /press
      // is derived from publishedDate via toLocaleDateString('en-AU', {month, year}),
      // not from summary. Leave summary blank so editors can use it for what
      // the field name suggests (a brief blurb).
      sortOrder: p.sortOrder,
    })
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const existingPress = (await (payload as any).find({
    collection: 'press-mentions',
    limit: 500,
    depth: 0,
  })) as { docs: Array<{ id: number; slug: string }> }
  for (const row of existingPress.docs) {
    if (!NEW_PRESS_SLUGS.has(row.slug)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (payload as any).delete({ collection: 'press-mentions', id: row.id })
      payload.logger.info(`[seed-r8d-press] deleted dev-fixture press-mention "${row.slug}"`)
    }
  }
  payload.logger.info(`[seed-r8d-press] press-mentions upserted: ${PRESS.length}`)

  payload.logger.info('[seed-r8d-press] done')
  process.exit(0)
}

main().catch((err) => {
  console.error('[seed-r8d-press] failed:', err)
  process.exit(1)
})

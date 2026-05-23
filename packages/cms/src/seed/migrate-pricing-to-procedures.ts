/**
 * Phase C9b — one-time migration from MachineTreatments + InjectableProducts +
 * HairRemovalAreas into Procedures (the single source of truth for ALL
 * pricing rows after C9a).
 *
 * Idempotent: every emitted Procedure has a deterministic slug
 * ("machine-…" / "injection-…" / "btl-…") and the migration upserts —
 * existing rows with the same slug are updated, not duplicated.
 *
 * Multi-tier machine rows: when a MachineTreatment has prices for more
 * than one audience tier (standard / kitas_ktp / package), one Procedure
 * row is emitted per populated tier. The audienceTier select field
 * distinguishes them on /pricing tables (Phase C9c renderer groups by
 * mainCategory + subCategory + name, showing tiers as columns).
 *
 * Run via:
 *   NODE_ENV=production pnpm --filter @cosmedic/cms exec \
 *     tsx src/seed/migrate-pricing-to-procedures.ts
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

type Payload = Awaited<ReturnType<typeof getPayload>>

const log = (...args: unknown[]) => console.log('[c9b]', ...args)

async function upsertProcedure(payload: Payload, slug: string, data: Record<string, unknown>) {
  const found = await payload.find({
    collection: 'procedures',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  })
  const existing = found.docs[0]
  if (existing) {
    await payload.update({
      collection: 'procedures',
      id: existing.id,
      data,
    })
    return { id: existing.id, action: 'updated' as const }
  }
  const created = await payload.create({
    collection: 'procedures',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: { slug, ...data } as any,
  })
  return { id: created.id, action: 'created' as const }
}

async function migrateMachineTreatments(payload: Payload) {
  const res = await payload.find({ collection: 'machine-treatments', limit: 200, depth: 0 })
  log(`MachineTreatments: ${res.docs.length} source rows`)
  let emitted = 0
  for (const m of res.docs) {
    const tiers: Array<{ tier: 'standard' | 'kitas_ktp' | 'package'; price: number }> = []
    if (m.pricing?.standardIdr) tiers.push({ tier: 'standard', price: m.pricing.standardIdr })
    if (m.pricing?.kitasKtpIdr) tiers.push({ tier: 'kitas_ktp', price: m.pricing.kitasKtpIdr })
    if (m.pricing?.packageIdr) tiers.push({ tier: 'package', price: m.pricing.packageIdr })
    if (tiers.length === 0) tiers.push({ tier: 'standard', price: 0 })

    for (const { tier, price } of tiers) {
      const slug = tiers.length > 1 ? `machine-${m.slug}-${tier}` : `machine-${m.slug}`
      const r = await upsertProcedure(payload, slug, {
        name: `${m.machineName} — ${m.area}`,
        catalogueGroup: 'machine',
        mainCategory: m.machineName,
        subCategory: m.area,
        unit: m.area,
        audienceTier: tier,
        pricing: { priceIdr2026: price, displayYear: '2026' },
        sortOrder: m.sortOrder ?? 0,
      })
      emitted += 1
      log(`  ${r.action} ${slug}`)
    }
  }
  return emitted
}

async function migrateInjectableProducts(payload: Payload) {
  const res = await payload.find({ collection: 'injectable-products', limit: 200, depth: 0 })
  log(`InjectableProducts: ${res.docs.length} source rows`)
  let emitted = 0
  for (const i of res.docs) {
    const slug = `injection-${i.slug}`
    const r = await upsertProcedure(payload, slug, {
      name: i.name,
      catalogueGroup: 'injection',
      mainCategory: i.category, // 'filler', 'botulinum-toxin', etc.
      brand: i.brand ?? undefined,
      productLine: i.productLine ?? undefined,
      manufacturer: i.manufacturer ?? undefined,
      fdaApproved: Boolean(i.fdaApproved),
      unit: i.unit ?? undefined,
      audienceTier: 'standard',
      pricing: {
        priceIdr2026: i.priceIdr ?? undefined,
        priceAud2026: i.priceAud ?? undefined,
        priceNotes: i.notes ?? undefined,
        displayYear: '2026',
      },
      sortOrder: i.sortOrder ?? 0,
    })
    emitted += 1
    log(`  ${r.action} ${slug}`)
  }
  return emitted
}

async function migrateHairRemovalAreas(payload: Payload) {
  const res = await payload.find({ collection: 'hair-removal-areas', limit: 200, depth: 0 })
  log(`HairRemovalAreas: ${res.docs.length} source rows`)
  let emitted = 0
  for (const h of res.docs) {
    const slug = `btl-${h.slug}`
    const r = await upsertProcedure(payload, slug, {
      name: h.area,
      catalogueGroup: 'btl',
      bodyZone: h.bodyZone,
      audienceTier: 'standard',
      pricing: {
        priceIdr2026: h.priceIdr ?? undefined,
        priceNotes: h.notes ?? undefined,
        displayYear: '2026',
      },
      sortOrder: h.sortOrder ?? 0,
    })
    emitted += 1
    log(`  ${r.action} ${slug}`)
  }
  return emitted
}

async function main() {
  const payload = await getPayload({ config })
  log('starting C9b migration')

  const mEmitted = await migrateMachineTreatments(payload)
  const iEmitted = await migrateInjectableProducts(payload)
  const hEmitted = await migrateHairRemovalAreas(payload)

  const totals = await payload.find({ collection: 'procedures', limit: 0, depth: 0 })
  log(`done — machine: ${mEmitted}, injection: ${iEmitted}, btl: ${hEmitted}`)
  log(`Procedures total now: ${totals.totalDocs}`)

  // Per-group totals
  for (const cg of ['surgical', 'machine', 'injection', 'btl']) {
    const r = await payload.find({
      collection: 'procedures',
      where: { catalogueGroup: { equals: cg } },
      limit: 0,
      depth: 0,
    })
    log(`  ${cg}: ${r.totalDocs}`)
  }

  process.exit(0)
}

main().catch((e) => {
  console.error('[c9b] FAILED', e)
  process.exit(1)
})

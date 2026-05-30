/**
 * Phase F — One-time backfill: translate all EN content → ID locale via Vertex AI.
 *
 * Idempotent: pass --force to re-translate records that already have ID values.
 * Without --force, records with any non-empty ID field are skipped.
 *
 * Run:
 *   NODE_ENV=production pnpm --filter @cosmedic/cms exec tsx scripts/backfill-translations.ts
 *   NODE_ENV=production pnpm --filter @cosmedic/cms exec tsx scripts/backfill-translations.ts --force
 */

import { getPayload } from 'payload'
import config from '../src/payload.config'
import { translateDoc, T, R, A, SEO_SPECS } from '../src/hooks/autoTranslate'

const FORCE = process.argv.includes('--force')

// ─── Field specs (must match makeCollectionTranslateHook calls in each collection) ───

const COLLECTION_SPECS: Record<string, Parameters<typeof translateDoc>[2]> = {
  disciplines: [
    T('title'), T('subtitle'), R('body'),
    T('chapterTitle.a'), T('chapterTitle.b'),
    T('tagline'), T('lede'), R('overview'),
    A('faqs', [T('q'), T('a')]),
    ...SEO_SPECS,
  ],
  'sub-categories': [
    T('title'), T('chapterTitle.a'), T('chapterTitle.b'),
    T('tagline'), T('lede'), R('intro'), R('overview'),
    A('sections', [T('t'), R('body')]),
    A('faqs', [T('q'), T('a')]),
    ...SEO_SPECS,
  ],
  procedures: [
    T('name'), T('shortName'), R('description'),
    A('sections', [T('t'), R('body')]),
    A('faqs', [T('q'), T('a')]),
    T('pricing.priceNotes'), T('detail.duration'), T('detail.recovery'),
    A('detail.included', [T('value')]),
    ...SEO_SPECS,
  ],
  surgeons: [
    T('spec'), T('train'), T('proc'), R('bio'),
    A('specAreas', [T('value')]),
    ...SEO_SPECS,
  ],
  stories: [T('quote'), R('body'), ...SEO_SPECS],
  'before-after-cases': [
    T('caseLabel'), T('beforeAlt'), T('afterAlt'),
    R('description'), T('recoveryDuration'),
    ...SEO_SPECS,
  ],
  'recovery-stays': [T('name'), T('body'), A('amenities', [T('value')]), ...SEO_SPECS],
  'press-mentions': [T('headline'), T('summary')],
  awards: [T('name'), T('issuer'), T('summary')],
  'journey-steps': [T('title'), R('body'), A('bullets', [T('text')])],
  'blog-posts': [T('title'), T('lede'), R('body'), ...SEO_SPECS],
}

const GLOBAL_SPECS: Record<string, Parameters<typeof translateDoc>[2]> = {
  'home-hero': [
    T('eyebrow'), T('title.a'), T('title.b'), T('lede'),
    T('primaryCtaLabel'), T('secondaryCtaLabel'),
    T('quickEnquiry.eyebrow'), T('quickEnquiry.heading'), T('quickEnquiry.intro'),
    T('quickEnquiry.nameLabel'), T('quickEnquiry.namePlaceholder'),
    T('quickEnquiry.emailLabel'), T('quickEnquiry.emailPlaceholder'),
    T('quickEnquiry.interestLabel'), T('quickEnquiry.interestOptionalLabel'),
    T('quickEnquiry.submitLabel'), T('quickEnquiry.submittingLabel'),
    T('quickEnquiry.successMessage'), T('quickEnquiry.errorMessage'),
    T('quickEnquiry.finePrint'),
  ],
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function hasIdValue(doc: Record<string, unknown>, specs: Parameters<typeof translateDoc>[2]): boolean {
  for (const spec of specs) {
    const val = (doc as any)[spec.path.split('.')[0]]
    if (val !== null && val !== undefined && val !== '') return true
  }
  return false
}

const noop = { error: (o: unknown, m: string) => console.error('[translate]', m, o) }

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const payload = await getPayload({ config })
  let totalTranslated = 0
  let totalSkipped = 0
  let totalErrors = 0

  // ── Collections ──────────────────────────────────────────────────────────────
  for (const [slug, specs] of Object.entries(COLLECTION_SPECS)) {
    console.log(`\n── ${slug} ──`)

    // Fetch all EN records
    const { docs, totalDocs } = await payload.find({
      collection: slug as any,
      locale: 'en' as any,
      limit: 1000,
      depth: 2,
      pagination: false,
    })
    console.log(`  ${totalDocs} records`)

    for (const doc of docs) {
      const id = (doc as any).id
      const label = (doc as any).name || (doc as any).title || (doc as any).slug || id

      // Check if ID locale already has content (fetch a lightweight version)
      if (!FORCE) {
        const idDoc = await payload.findByID({
          collection: slug as any,
          id,
          locale: 'id' as any,
          depth: 0,
        }).catch(() => null)
        if (idDoc && hasIdValue(idDoc as Record<string, unknown>, specs)) {
          process.stdout.write('.')
          totalSkipped++
          continue
        }
      }

      try {
        const translated = await translateDoc(doc as Record<string, unknown>, null, specs, noop)
        if (Object.keys(translated).length > 0) {
          await payload.update({
            collection: slug as any,
            id,
            locale: 'id' as any,
            data: translated as any,
          })
          console.log(`  ✓ ${label}`)
          totalTranslated++
        } else {
          process.stdout.write('·')
          totalSkipped++
        }
      } catch (err) {
        console.error(`  ✗ ${label}:`, (err as Error).message)
        totalErrors++
      }
    }
    console.log()
  }

  // ── Globals ───────────────────────────────────────────────────────────────────
  console.log('\n── globals ──')
  for (const [gslug, specs] of Object.entries(GLOBAL_SPECS)) {
    const enDoc = await payload.findGlobal({ slug: gslug as any, locale: 'en' as any, depth: 0 }).catch(() => null)
    if (!enDoc) { console.log(`  skip ${gslug} (not found)`); continue }

    if (!FORCE) {
      const idDoc = await payload.findGlobal({ slug: gslug as any, locale: 'id' as any, depth: 0 }).catch(() => null)
      if (idDoc && hasIdValue(idDoc as Record<string, unknown>, specs)) {
        console.log(`  skip ${gslug} (already has ID content)`)
        totalSkipped++
        continue
      }
    }

    try {
      const translated = await translateDoc(enDoc as Record<string, unknown>, null, specs, noop)
      if (Object.keys(translated).length > 0) {
        await payload.updateGlobal({ slug: gslug as any, locale: 'id' as any, data: translated as any })
        console.log(`  ✓ ${gslug}`)
        totalTranslated++
      } else {
        console.log(`  · ${gslug} (nothing to translate)`)
        totalSkipped++
      }
    } catch (err) {
      console.error(`  ✗ ${gslug}:`, (err as Error).message)
      totalErrors++
    }
  }

  console.log(`\n✅ Done. translated=${totalTranslated} skipped=${totalSkipped} errors=${totalErrors}`)
  process.exit(totalErrors > 0 ? 1 : 0)
}

main().catch((err) => { console.error(err); process.exit(1) })

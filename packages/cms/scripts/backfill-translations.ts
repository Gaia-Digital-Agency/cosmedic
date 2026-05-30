/**
 * backfill-translations.ts
 *
 * One-shot EN→ID translation backfill via Vertex AI (gemini-2.5-flash).
 *
 * Logic per field:
 *   - Fetch EN locale value and ID locale value for every translatable field.
 *   - Because Payload returns EN fallback when the ID field is empty,
 *     EN === ID means "not yet translated" → translate it.
 *     EN !== ID means "already has a real translation" → leave it alone.
 *   - This makes the script safe to re-run at any time (idempotent).
 *
 * Run (from /var/www/cosmedic):
 *   NODE_ENV=production node_modules/.bin/tsx --env-file=packages/cms/.env \
 *     packages/cms/scripts/backfill-translations.ts
 *
 * Flags:
 *   --dry-run            Preview what would be translated without writing.
 *   --collection=slug    Process one collection only (e.g. --collection=disciplines).
 *   --force              Re-translate even fields that already differ EN vs ID.
 */

import { getPayload } from 'payload'
import config from '../src/payload.config'
import { callVertex, translateRichText } from '../src/hooks/autoTranslate'

// ─── CLI flags ────────────────────────────────────────────────────────────────

const DRY_RUN   = process.argv.includes('--dry-run')
const FORCE     = process.argv.includes('--force')
const ONLY_COLL = process.argv.find(a => a.startsWith('--collection='))?.split('=')[1]

// ─── Field spec types ─────────────────────────────────────────────────────────

type TextSpec  = { type: 'text';     path: string }
type RichSpec  = { type: 'richText'; path: string }
type ArraySpec = { type: 'array';    path: string; fields: FieldSpec[] }
type FieldSpec = TextSpec | RichSpec | ArraySpec

const T = (path: string): TextSpec  => ({ type: 'text',     path })
const R = (path: string): RichSpec  => ({ type: 'richText', path })
const A = (path: string, fields: FieldSpec[]): ArraySpec => ({ type: 'array', path, fields })
const SEO: FieldSpec[] = [T('seo.title'), T('seo.description')]

// ─── Field specs — must mirror each collection's makeCollectionTranslateHook ─

const COLLECTION_SPECS: Record<string, FieldSpec[]> = {
  'disciplines': [
    T('title'), T('subtitle'), R('body'),
    T('chapterTitle.a'), T('chapterTitle.b'),
    T('tagline'), T('lede'), R('overview'),
    A('faqs', [T('q'), T('a')]),
    ...SEO,
  ],
  'sub-categories': [
    T('title'), T('chapterTitle.a'), T('chapterTitle.b'),
    T('tagline'), T('lede'), R('intro'), R('overview'),
    A('sections', [T('t'), R('body')]),
    A('faqs',     [T('q'), T('a')]),
    ...SEO,
  ],
  'procedures': [
    T('name'), T('shortName'), R('description'),
    A('sections',       [T('t'), R('body')]),
    A('faqs',           [T('q'), T('a')]),
    T('pricing.priceNotes'),
    T('detail.duration'), T('detail.recovery'),
    A('detail.included', [T('value')]),
    ...SEO,
  ],
  'surgeons': [
    T('spec'), T('train'), T('proc'), R('bio'),
    A('specAreas', [T('value')]),
    ...SEO,
  ],
  'journey-steps': [
    T('title'), R('body'),
    A('bullets', [T('text')]),
  ],
  'recovery-stays': [
    T('name'), T('body'),
    A('amenities', [T('value')]),
    ...SEO,
  ],
  'before-after-cases': [
    T('caseLabel'), T('beforeAlt'), T('afterAlt'),
    R('description'), T('recoveryDuration'),
    ...SEO,
  ],
  'stories':       [T('quote'), R('body'), ...SEO],
  'press-mentions':[T('headline'), T('summary')],
  'awards':        [T('name'), T('issuer'), T('summary')],
  'blog-posts':    [T('title'), T('lede'), R('body'), ...SEO],
}

const GLOBAL_SPECS: Record<string, FieldSpec[]> = {
  'home-hero': [
    T('eyebrow'), T('title.a'), T('title.b'), T('lede'),
    T('primaryCtaLabel'), T('secondaryCtaLabel'),
    T('quickEnquiry.eyebrow'), T('quickEnquiry.heading'), T('quickEnquiry.intro'),
    T('quickEnquiry.nameLabel'),     T('quickEnquiry.namePlaceholder'),
    T('quickEnquiry.emailLabel'),    T('quickEnquiry.emailPlaceholder'),
    T('quickEnquiry.interestLabel'), T('quickEnquiry.interestOptionalLabel'),
    T('quickEnquiry.interestPlaceholder'), T('quickEnquiry.revealInterestLabel'),
    T('quickEnquiry.submitLabel'),   T('quickEnquiry.submittingLabel'),
    T('quickEnquiry.successLabel'),  T('quickEnquiry.successFine'),
    T('quickEnquiry.errorFine'),     T('quickEnquiry.fineprint'),
  ],
}

// ─── Path helpers ─────────────────────────────────────────────────────────────

function getPath(obj: unknown, path: string): unknown {
  if (!obj || typeof obj !== 'object') return undefined
  const [head, ...rest] = path.split('.')
  const val = (obj as Record<string, unknown>)[head!]
  return rest.length ? getPath(val, rest.join('.')) : val
}

function setPath(obj: Record<string, unknown>, path: string, val: unknown): void {
  const parts = path.split('.')
  let cur: Record<string, unknown> = obj
  for (let i = 0; i < parts.length - 1; i++) {
    const k = parts[i]!
    if (!cur[k] || typeof cur[k] !== 'object') cur[k] = {}
    cur = cur[k] as Record<string, unknown>
  }
  cur[parts[parts.length - 1]!] = val
}

// ─── "Needs translation" check ────────────────────────────────────────────────
//
// Payload returns EN fallback values when an ID field is empty, so we cannot
// simply check for null. Instead: if EN value === ID value the field has not
// been translated yet. If they differ, leave it alone (already translated).
// --force overrides this and re-translates regardless.

function needsTranslation(enVal: unknown, idVal: unknown): boolean {
  if (FORCE) return true
  // Stringify comparison handles strings, arrays, richText objects equally.
  return JSON.stringify(enVal) === JSON.stringify(idVal)
}

// ─── Rate-limit helper ────────────────────────────────────────────────────────

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)) }

// ─── Core per-doc backfill ────────────────────────────────────────────────────

async function backfillDoc(
  enDoc: Record<string, unknown>,
  idDoc: Record<string, unknown>,
  specs: FieldSpec[],
  tag: string,
): Promise<{ data: Record<string, unknown>; nTranslated: number; nSkipped: number }> {
  const data: Record<string, unknown> = {}
  let nTranslated = 0
  let nSkipped = 0

  for (const spec of specs) {
    const enVal = getPath(enDoc, spec.path)
    const idVal = getPath(idDoc, spec.path)

    // ── text field ────────────────────────────────────────────────────────────
    if (spec.type === 'text') {
      if (!enVal || typeof enVal !== 'string' || !enVal.trim()) continue
      if (!needsTranslation(enVal, idVal)) { nSkipped++; continue }
      if (DRY_RUN) {
        console.log(`  [dry] ${tag} ${spec.path}: "${enVal.slice(0, 60)}"`)
        nTranslated++; continue
      }
      try {
        await sleep(150)
        const out = await callVertex(enVal)
        setPath(data, spec.path, out)
        nTranslated++
      } catch (err) {
        console.error(`  ✗ ${tag} ${spec.path}: ${(err as Error).message}`)
      }

    // ── richText field ────────────────────────────────────────────────────────
    } else if (spec.type === 'richText') {
      if (!enVal || typeof enVal !== 'object') continue
      if (!needsTranslation(enVal, idVal)) { nSkipped++; continue }
      if (DRY_RUN) {
        console.log(`  [dry] ${tag} ${spec.path}: <richText>`)
        nTranslated++; continue
      }
      try {
        await sleep(150)
        const out = await translateRichText(enVal)
        setPath(data, spec.path, out)
        nTranslated++
      } catch (err) {
        console.error(`  ✗ ${tag} ${spec.path}: ${(err as Error).message}`)
      }

    // ── array field ───────────────────────────────────────────────────────────
    } else if (spec.type === 'array') {
      const enArr = enVal as unknown[]
      const idArr = idVal as unknown[]
      if (!Array.isArray(enArr) || enArr.length === 0) continue

      const outArr: unknown[] = []
      let arrayChanged = false

      for (let i = 0; i < enArr.length; i++) {
        const enItem = (enArr[i] ?? {}) as Record<string, unknown>
        const idItem = (Array.isArray(idArr) ? (idArr[i] ?? {}) : {}) as Record<string, unknown>

        const { data: itemData, nTranslated: t, nSkipped: s } = await backfillDoc(
          enItem, idItem, spec.fields, `${tag}[${spec.path}:${i}]`,
        )
        outArr.push({ ...enItem, ...itemData })
        if (t > 0) arrayChanged = true
        nTranslated += t
        nSkipped    += s
      }

      if (arrayChanged) setPath(data, spec.path, outArr)
    }
  }

  return { data, nTranslated, nSkipped }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\nCosmedic EN→ID backfill${DRY_RUN ? ' [DRY RUN — no writes]' : ''}${FORCE ? ' [FORCE — overwrite existing]' : ''}`)
  if (ONLY_COLL) console.log(`Collection filter: ${ONLY_COLL}`)
  console.log()

  const payload = await getPayload({ config })

  let grandRecords = 0
  let grandTranslated = 0
  let grandSkipped = 0

  // ── Collections ──────────────────────────────────────────────────────────────
  for (const [slug, specs] of Object.entries(COLLECTION_SPECS)) {
    if (ONLY_COLL && slug !== ONLY_COLL) continue

    console.log(`\n── ${slug} ──`)

    // Fetch all EN records (depth:0 — we only need raw field values)
    const { docs: enDocs } = await payload.find({
      collection: slug as any,
      locale: 'en' as any,
      limit: 2000,
      depth: 0,
      pagination: false,
    } as any)

    // Fetch all ID records into a map for O(1) lookup
    const { docs: idDocs } = await payload.find({
      collection: slug as any,
      locale: 'id' as any,
      limit: 2000,
      depth: 0,
      pagination: false,
    } as any)
    const idMap = new Map(idDocs.map((d: any) => [d.id, d]))

    console.log(`  ${enDocs.length} records`)

    let collTranslated = 0
    let collSkipped    = 0

    for (const enDoc of enDocs as any[]) {
      const id    = enDoc.id
      const label = (enDoc.name || enDoc.title || enDoc.slug || id).toString().slice(0, 40)
      const idDoc = (idMap.get(id) ?? {}) as Record<string, unknown>

      const tag = `${slug}#${id}`
      const { data, nTranslated, nSkipped } = await backfillDoc(
        enDoc as Record<string, unknown>,
        idDoc,
        specs,
        tag,
      )

      if (nTranslated === 0) {
        process.stdout.write('·')  // already done
        collSkipped++
        grandRecords++
        continue
      }

      // Strip array-item `id` UUIDs so Payload doesn't try to INSERT with a
      // colliding PK when writing locale-specific array rows.
      const sanitised = JSON.parse(JSON.stringify(data), (k: string, v: unknown) =>
        k === 'id' && typeof v === 'string' && /^[0-9a-f-]{20,}$/i.test(v) ? undefined : v,
      )

      if (!DRY_RUN) {
        try {
          await payload.update({
            collection: slug as any,
            id,
            locale: 'id' as any,
            data: sanitised as any,
          })
          console.log(`\n  ✓ ${label} (${nTranslated} fields, ${nSkipped} already done)`)
          collTranslated++
        } catch (err) {
          console.error(`\n  ✗ ${label}: ${(err as Error).message}`)
        }
      } else {
        console.log(`  [dry] would write ${nTranslated} fields for ${label}`)
        collTranslated++
      }

      grandRecords++
    }

    grandTranslated += collTranslated
    grandSkipped    += collSkipped
    console.log(`\n  → ${slug}: ${collTranslated} records translated, ${collSkipped} already complete`)
  }

  // ── Globals ───────────────────────────────────────────────────────────────────
  console.log('\n── globals ──')
  for (const [gslug, specs] of Object.entries(GLOBAL_SPECS)) {
    if (ONLY_COLL && gslug !== ONLY_COLL) continue

    let enDoc: Record<string, unknown> = {}
    let idDoc: Record<string, unknown> = {}
    try { enDoc = (await payload.findGlobal({ slug: gslug as any, locale: 'en' as any, depth: 0 })) as any }
    catch (e) { console.error(`  skip ${gslug}: ${(e as Error).message}`); continue }
    try { idDoc = (await payload.findGlobal({ slug: gslug as any, locale: 'id' as any, depth: 0 })) as any }
    catch { /* no ID row yet */ }

    const { data, nTranslated, nSkipped } = await backfillDoc(enDoc, idDoc, specs, `global:${gslug}`)
    console.log(`  ${gslug}: ${nTranslated} fields to translate, ${nSkipped} already done`)

    if (!DRY_RUN && nTranslated > 0 && Object.keys(data).length > 0) {
      const sanitised = JSON.parse(JSON.stringify(data), (k: string, v: unknown) =>
        k === 'id' && typeof v === 'string' && /^[0-9a-f-]{20,}$/i.test(v) ? undefined : v,
      )
      try {
        await payload.updateGlobal({ slug: gslug as any, locale: 'id' as any, data: sanitised as any })
        console.log(`  ✓ global ${gslug} saved`)
        grandTranslated++
      } catch (err) {
        console.error(`  ✗ global ${gslug}: ${(err as Error).message}`)
      }
    }
    grandRecords++
  }

  console.log(`\n${'═'.repeat(56)}`)
  console.log(`Done.  records=${grandRecords}  translated=${grandTranslated}  skipped=${grandSkipped}`)
  if (DRY_RUN) console.log('(dry run — nothing written)')
  console.log()
  process.exit(0)
}

main().catch((err) => { console.error(err); process.exit(1) })

/**
 * One-time migration: Pages collection → 14 Page Globals.
 *
 * For each existing row in the `pages` collection, find the corresponding
 * Payload Global by slug mapping and copy its fields in. Idempotent: if a
 * Global is already populated (editor has touched it), skip — do NOT
 * overwrite. Safe to re-run.
 *
 * Usage:  pnpm --filter @cosmedic/cms tsx src/seed/migrate-pages-to-globals.ts
 *
 * Globals NOT corresponding to an existing Pages row (treatments, surgeons,
 * results, recovery-stays, video-consult, blog) are left untouched here — they
 * get fresh content from the updated runtime seed in Step 9 of the refactor plan.
 */

import 'dotenv/config'
import { getPayload, type Payload } from 'payload'
import config from '../payload.config'

const PAGE_SLUG_TO_GLOBAL_SLUG: Record<string, string> = {
  home: 'home-page',
  press: 'press-page',
  privacy: 'privacy-page',
  treatments: 'treatments-page',
  surgeons: 'surgeons-page',
  results: 'results-page',
  gallery: 'gallery-page',
  pricing: 'pricing-page',
  journey: 'journey-page',
  stories: 'stories-page',
  'recovery-stays': 'recovery-stays-page',
  contact: 'contact-page',
  'video-consult': 'video-consult-page',
  blog: 'blog-page',
}

const FIELDS_TO_COPY = [
  'title',
  'slug',
  'route',
  'chapterTitle',
  'tagline',
  'lede',
  'heroImage',
  'sections',
  'publishStatus',
  'seo',
] as const

type AnyDoc = Record<string, unknown>

function isAlreadyPopulated(globalDoc: AnyDoc | undefined | null): boolean {
  if (!globalDoc) return false
  const title = globalDoc.title
  const slug = globalDoc.slug
  return Boolean((typeof title === 'string' && title.trim().length > 0) || (typeof slug === 'string' && slug.trim().length > 0))
}

function projectFields(src: AnyDoc): AnyDoc {
  const out: AnyDoc = {}
  for (const key of FIELDS_TO_COPY) {
    if (key in src) out[key] = src[key]
  }
  return out
}

async function migrate(payload: Payload): Promise<{ migrated: number; skipped: number; errors: number }> {
  payload.logger.info('[migrate-pages] starting')

  const result = await payload.find({ collection: 'pages', limit: 500, depth: 0 })
  const pages = (result.docs ?? []) as unknown as AnyDoc[]
  payload.logger.info(`[migrate-pages] found ${pages.length} Pages rows`)

  let migrated = 0
  let skipped = 0
  let errors = 0

  for (const page of pages) {
    const pageSlug = String(page.slug ?? '')
    const globalSlug = PAGE_SLUG_TO_GLOBAL_SLUG[pageSlug]

    if (!globalSlug) {
      payload.logger.warn(`[migrate-pages] no global mapping for page slug="${pageSlug}" — skipping`)
      skipped++
      continue
    }

    try {
      const existingGlobal = (await (payload as unknown as { findGlobal: (args: { slug: string; depth?: number }) => Promise<AnyDoc> }).findGlobal({
        slug: globalSlug,
        depth: 0,
      })) as AnyDoc

      if (isAlreadyPopulated(existingGlobal)) {
        payload.logger.info(`[migrate-pages] ${globalSlug} already populated — skipping`)
        skipped++
        continue
      }

      const projected = projectFields(page)
      await (payload as unknown as { updateGlobal: (args: { slug: string; data: AnyDoc }) => Promise<unknown> }).updateGlobal({
        slug: globalSlug,
        data: projected,
      })

      payload.logger.info(`[migrate-pages] ${globalSlug} ← pages.${pageSlug}  (${Object.keys(projected).length} fields)`)
      migrated++
    } catch (err) {
      payload.logger.error({ err }, `[migrate-pages] ${globalSlug} ← pages.${pageSlug} FAILED`)
      errors++
    }
  }

  payload.logger.info(`[migrate-pages] done — migrated=${migrated} skipped=${skipped} errors=${errors}`)
  return { migrated, skipped, errors }
}

async function main(): Promise<void> {
  const payload = await getPayload({ config })
  try {
    await migrate(payload)
  } catch (err) {
    payload.logger.error({ err }, '[migrate-pages] fatal')
    process.exitCode = 1
  } finally {
    const db = payload.db as { destroy?: () => Promise<void> }
    if (typeof db.destroy === 'function') {
      await db.destroy()
    }
    process.exit(process.exitCode ?? 0)
  }
}

main()

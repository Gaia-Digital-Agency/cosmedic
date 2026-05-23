/**
 * Phase 10 media seed.
 *
 * Walks `packages/web/public/assets/{surgeons,results,treatments,lifestyle}/`,
 * idempotently uploads every file into Payload Media (keyed by filename), and
 * repoints relation fields on Surgeons / BeforeAfterCases / Disciplines /
 * RecoveryStays / Pages to the resulting Media IDs.
 *
 * Idempotent — re-running detects existing Media by filename and skips upload,
 * but still re-applies the field relations (cheap, useful after a CMS rebuild).
 *
 * Run via the orchestrator (`runtime.ts`) or standalone:
 *   pnpm --filter @cosmedic/cms seed
 */

import { readFileSync } from 'node:fs'
import { readdir, stat } from 'node:fs/promises'
import { basename, dirname, extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Payload } from 'payload'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ASSETS_ROOT = resolve(__dirname, '../../../web/public/assets')

type MediaCategory = 'surgeons' | 'results' | 'treatments' | 'lifestyle'

const CATEGORIES: MediaCategory[] = ['surgeons', 'results', 'treatments', 'lifestyle']

// Lifestyle slug → which collection.field it maps to.
// Page slugs come from runtime.ts's seedPages() — these names must match the
// `slug` values written there.
const LIFESTYLE_TO_PAGE: Record<string, string> = {
  hero: 'home',
  reception: 'contact',
  clinic: 'press',
  'clinic-alt': 'press',
  texture: 'gallery',
  'texture-alt': 'pricing',
  light: 'video-consult',
  bali: 'journey',
  'bali-alt': 'stories',
  bali2: 'stories',
}

// Stories don't have a collection-level heroImage; portraits are on individual
// Stories records (one per testimonial). The order matches STORY_PORTRAITS in
// packages/web/src/content/seed.ts (story1..story8).
const STORY_PORTRAIT_PREFIX = 'story'

type MediaDoc = { id: number; filename?: string; alt?: string }

function assertNumericId(id: unknown, label: string): number {
  if (typeof id !== 'number') {
    throw new Error(`[media-seed] expected numeric id for ${label}, got ${typeof id}`)
  }
  return id
}
// Postgres always returns numeric IDs on this project; narrow accordingly.
type MediaId = number

async function findExistingMedia(payload: Payload, filename: string): Promise<MediaDoc | null> {
  const res = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
    depth: 0,
  })
  return (res.docs[0] as unknown as MediaDoc) ?? null
}

async function uploadOne(payload: Payload, absPath: string, alt: string): Promise<MediaDoc> {
  const filename = basename(absPath)
  const existing = await findExistingMedia(payload, filename)
  if (existing) {
    payload.logger.info(`[media-seed] keep existing ${filename} (id=${existing.id})`)
    return existing
  }
  const buf = readFileSync(absPath)
  const stats = await stat(absPath)
  const created = await payload.create({
    collection: 'media',
    data: { alt, isPlaceholder: true },
    file: {
      data: buf,
      mimetype: mimeFor(absPath),
      name: filename,
      size: stats.size,
    },
  })
  payload.logger.info(`[media-seed] uploaded ${filename} (id=${created.id})`)
  return created as unknown as MediaDoc
}

function mimeFor(p: string): string {
  const ext = extname(p).toLowerCase()
  return (
    {
      '.webp': 'image/webp',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.avif': 'image/avif',
      '.svg': 'image/svg+xml',
    }[ext] ?? 'application/octet-stream'
  )
}

function fileSlug(filename: string): string {
  return basename(filename, extname(filename))
}

async function walk(dir: string): Promise<string[]> {
  try {
    const entries = await readdir(dir, { withFileTypes: true })
    return entries.filter((e) => e.isFile()).map((e) => join(dir, e.name))
  } catch {
    return []
  }
}

async function applyToCollection<T extends Record<string, MediaId>>(
  payload: Payload,
  collection: 'surgeons' | 'before-after-cases' | 'disciplines' | 'recovery-stays',
  whereSlug: string,
  patch: T,
): Promise<boolean> {
  // patch values are typed as MediaId (number) — see assertNumericId below.
  const found = await payload.find({
    collection,
    where: { slug: { equals: whereSlug } },
    limit: 1,
    depth: 0,
  })
  const doc = found.docs[0]
  if (!doc) {
    payload.logger.warn(`[media-seed] ${collection} slug="${whereSlug}" not found — skipping`)
    return false
  }
  await payload.update({ collection, id: doc.id, data: patch as unknown as Record<string, unknown> })
  return true
}

export async function runMediaSeed(payload: Payload): Promise<{
  uploaded: number
  linked: number
  skipped: number
}> {
  payload.logger.info(`[media-seed] root=${ASSETS_ROOT}`)
  const results = { uploaded: 0, linked: 0, skipped: 0 }
  const idByPath: Record<string, MediaId> = {}

  for (const cat of CATEGORIES) {
    const dir = join(ASSETS_ROOT, cat)
    const files = await walk(dir)
    if (files.length === 0) {
      payload.logger.warn(`[media-seed] empty/missing ${dir}`)
      continue
    }
    payload.logger.info(`[media-seed] ${cat}: ${files.length} file(s)`)
    for (const absPath of files) {
      const slug = fileSlug(absPath)
      const alt = altFor(cat, slug)
      const before = await findExistingMedia(payload, basename(absPath))
      const m = await uploadOne(payload, absPath, alt)
      if (before) results.skipped += 1
      else results.uploaded += 1
      idByPath[`${cat}/${slug}`] = assertNumericId(m.id, basename(absPath))
    }
  }

  // ── Wire Media IDs into collection records ─────────────────────────────
  for (const key of Object.keys(idByPath)) {
    const [cat, slug] = key.split('/') as [MediaCategory, string]
    const mediaId = idByPath[key]
    if (cat === 'surgeons') {
      if (await applyToCollection(payload, 'surgeons', slug, { portrait: mediaId })) results.linked += 1
    } else if (cat === 'results') {
      if (await applyToCollection(payload, 'before-after-cases', slug, { composite: mediaId })) results.linked += 1
    } else if (cat === 'treatments') {
      if (await applyToCollection(payload, 'disciplines', slug, { heroImage: mediaId })) results.linked += 1
    } else if (cat === 'lifestyle') {
      const pageSlug = LIFESTYLE_TO_PAGE[slug]
      if (pageSlug) {
        // After Phase C3, page hero images live on per-route Page Globals
        // (e.g. home-page, journey-page, contact-page). The lifestyle linker
        // is stubbed pending a Globals-aware rewrite — see Phase 10 imagery
        // brief. For now, log and skip rather than throw.
        payload.logger.info(`[seed-media] lifestyle slug=${slug} → ${pageSlug} Global heroImage (skipped — needs Globals-aware updater)`)
      } else if (/^villa\d+$/.test(slug)) {
        const idx = Number(slug.replace('villa', '')) - 1
        const stays = await payload.find({ collection: 'recovery-stays', limit: 50, depth: 0 })
        const target = stays.docs[idx]
        if (target) {
          await payload.update({
            collection: 'recovery-stays',
            id: assertNumericId(target.id, `recovery-stays[${idx}]`),
            data: { heroImage: mediaId },
          })
          results.linked += 1
        } else {
          payload.logger.warn(`[media-seed] recovery-stays[${idx}] not found for ${slug}`)
        }
      } else if (slug.startsWith(STORY_PORTRAIT_PREFIX)) {
        const idx = Number(slug.replace(STORY_PORTRAIT_PREFIX, '')) - 1
        const stories = await payload.find({ collection: 'stories', limit: 50, depth: 0 })
        const target = stories.docs[idx]
        if (target) {
          await payload.update({
            collection: 'stories',
            id: assertNumericId(target.id, `stories[${idx}]`),
            data: { portrait: mediaId } as Record<string, unknown>,
          })
          results.linked += 1
        } else {
          payload.logger.warn(`[media-seed] stories[${idx}] not found for ${slug}`)
        }
      } else {
        payload.logger.info(`[media-seed] lifestyle/${slug} uploaded with no auto-link target`)
      }
    }
  }

  payload.logger.info(
    `[media-seed] done — uploaded=${results.uploaded} skipped=${results.skipped} linked=${results.linked}`,
  )
  return results
}

function altFor(cat: MediaCategory, slug: string): string {
  if (cat === 'surgeons') return `Portrait of Dr ${slug.charAt(0).toUpperCase() + slug.slice(1)}`
  if (cat === 'results') return `Before-and-after composite — ${slug.replace(/-/g, ' ')}`
  if (cat === 'treatments') return `${slug.charAt(0).toUpperCase() + slug.slice(1)} discipline imagery`
  return `BIMC CosMedic editorial — ${slug.replace(/-/g, ' ')}`
}

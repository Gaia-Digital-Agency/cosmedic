/**
 * seed-upgrade-media.ts
 *
 * Uploads the proper full-resolution PNG lifestyle images from
 * web/public/assets/lifestyle/ to the Media collection (non-placeholder),
 * then re-wires the hero globals + home-place + recovery stays + story portraits
 * that are currently pointing to tiny seed-placeholder WebP thumbnails.
 *
 * SAFE: only overwrites fields that currently point to a media record with
 * is_placeholder=true. User-uploaded images (is_placeholder=false) are never
 * touched.
 *
 * Run:
 *   cd /var/www/cosmedic/packages/cms
 *   NODE_ENV=production node_modules/.bin/tsx --env-file=.env src/seed/seed-upgrade-media.ts
 */

import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import { getPayload } from 'payload'
import config from '../payload.config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const LIFESTYLE = path.resolve(__dirname, '../../../web/public/assets/lifestyle')
const RESULTS   = path.resolve(__dirname, '../../../web/public/assets/results')

/* ─── Helpers ──────────────────────────────────────────────────────────── */

type PayloadClient = Awaited<ReturnType<typeof getPayload>>

async function uploadProper(
  payload: PayloadClient,
  filePath: string,
  alt: string,
): Promise<number> {
  const filename = path.basename(filePath)
  // Find existing by exact filename (including extension)
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
  })
  if (existing.docs.length > 0) {
    const doc = existing.docs[0] as { id: number; isPlaceholder?: boolean; filename: string }
    // If already uploaded as non-placeholder, skip
    if (!doc.isPlaceholder) {
      console.log(`  [skip] ${filename} already in media as non-placeholder (id=${doc.id})`)
      return doc.id
    }
    // Placeholder exists with this filename → upload under a unique name won't help,
    // just return the existing id and we'll mark it non-placeholder below
    console.log(`  [exists-placeholder] ${filename} id=${doc.id}, will mark non-placeholder`)
    await payload.update({
      collection: 'media',
      id: doc.id,
      data: { isPlaceholder: false, alt } as Record<string, unknown>,
    })
    return doc.id
  }

  const stats = fs.statSync(filePath)
  const ext   = path.extname(filePath).toLowerCase()
  const mimeMap: Record<string, string> = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
  }
  const mimetype = mimeMap[ext] || 'image/png'

  const doc = await payload.create({
    collection: 'media',
    data: { alt, isPlaceholder: false } as Record<string, unknown>,
    file: {
      data: fs.readFileSync(filePath),
      mimetype,
      name: filename,
      size: stats.size,
    },
  })
  console.log(`  [upload] ${filename} → id=${doc.id}`)
  return doc.id as number
}

async function reWireGlobalIfPlaceholder(
  payload: PayloadClient,
  slug: string,
  field: string,
  newMediaId: number,
): Promise<void> {
  const current = await payload.findGlobal({ slug: slug as 'settings' })
  const val = (current as unknown as Record<string, unknown>)[field]

  let mediaId: number | null = null
  if (val == null || val === 0) {
    // null — wire it
    mediaId = null
  } else if (typeof val === 'object' && val !== null) {
    mediaId = (val as { id: number }).id
  } else {
    mediaId = val as number
  }

  if (mediaId == null) {
    // Was null — just wire it
    await payload.updateGlobal({ slug: slug as 'settings', data: { [field]: newMediaId } })
    console.log(`  [wire] ${slug}.${field} → id=${newMediaId} (was null)`)
    return
  }

  // Check if current media is placeholder
  const media = await payload.findByID({ collection: 'media', id: mediaId })
  const isPlaceholder = (media as unknown as Record<string, unknown>).isPlaceholder
  if (isPlaceholder) {
    await payload.updateGlobal({ slug: slug as 'settings', data: { [field]: newMediaId } })
    console.log(`  [rewire] ${slug}.${field}: placeholder id=${mediaId} → proper id=${newMediaId}`)
  } else {
    console.log(`  [skip] ${slug}.${field} already has non-placeholder media (id=${mediaId})`)
  }
}

async function reWireCollectionIfPlaceholder(
  payload: PayloadClient,
  collection: string,
  docId: number,
  field: string,
  newMediaId: number,
): Promise<void> {
  const current = await payload.findByID({ collection: collection as 'media', id: docId })
  const val = (current as unknown as Record<string, unknown>)[field]

  let mediaId: number | null = null
  if (val == null || val === 0) {
    mediaId = null
  } else if (typeof val === 'object' && val !== null) {
    mediaId = (val as { id: number }).id
  } else {
    mediaId = val as number
  }

  if (mediaId == null) {
    await payload.update({ collection: collection as 'media', id: docId, data: { [field]: newMediaId } })
    console.log(`  [wire] ${collection}#${docId}.${field} → id=${newMediaId} (was null)`)
    return
  }

  const media = await payload.findByID({ collection: 'media', id: mediaId })
  const isPlaceholder = (media as unknown as Record<string, unknown>).isPlaceholder
  if (isPlaceholder) {
    await payload.update({ collection: collection as 'media', id: docId, data: { [field]: newMediaId } })
    console.log(`  [rewire] ${collection}#${docId}.${field}: placeholder id=${mediaId} → proper id=${newMediaId}`)
  } else {
    console.log(`  [skip] ${collection}#${docId}.${field} already has non-placeholder media (id=${mediaId})`)
  }
}

/* ─── Main ─────────────────────────────────────────────────────────────── */

async function main(): Promise<void> {
  console.log('seed-upgrade-media: starting…')
  const payload = await getPayload({ config })

  // ── 1. Upload proper lifestyle PNG files ──────────────────────────────
  console.log('\n[1] upload proper lifestyle images')
  const ids: Record<string, number> = {}

  const uploads: Array<{ file: string; key: string; alt: string }> = [
    { file: 'clinic.png',      key: 'clinic',      alt: 'BIMC CosMedic — treatments' },
    { file: 'bali2.png',       key: 'bali2',       alt: 'BIMC CosMedic — Bali landscape' },
    { file: 'reception.png',   key: 'reception',   alt: 'BIMC CosMedic — reception' },
    { file: 'texture.png',     key: 'texture',     alt: 'BIMC CosMedic — texture' },
    { file: 'texture-alt.png', key: 'textureAlt',  alt: 'BIMC CosMedic — texture alt' },
    { file: 'bali.png',        key: 'bali',        alt: 'BIMC CosMedic — Bali' },
    { file: 'villa1.png',      key: 'villa1',      alt: 'BIMC CosMedic — villa 1' },
    { file: 'villa2.png',      key: 'villa2',      alt: 'BIMC CosMedic — villa 2' },
    { file: 'villa3.png',      key: 'villa3',      alt: 'BIMC CosMedic — villa 3' },
    { file: 'villa4.png',      key: 'villa4',      alt: 'BIMC CosMedic — villa 4' },
    { file: 'villa5.png',      key: 'villa5',      alt: 'BIMC CosMedic — villa 5' },
    { file: 'villa6.png',      key: 'villa6',      alt: 'BIMC CosMedic — villa 6' },
    { file: 'story1.png',      key: 'story1',      alt: 'Patient portrait 1' },
    { file: 'story2.png',      key: 'story2',      alt: 'Patient portrait 2' },
    { file: 'story3.png',      key: 'story3',      alt: 'Patient portrait 3' },
    { file: 'story4.png',      key: 'story4',      alt: 'Patient portrait 4' },
    { file: 'story5.png',      key: 'story5',      alt: 'Patient portrait 5' },
    { file: 'story6.png',      key: 'story6',      alt: 'Patient portrait 6' },
    { file: 'story7.png',      key: 'story7',      alt: 'Patient portrait 7' },
    { file: 'story8.png',      key: 'story8',      alt: 'Patient portrait 8' },
  ]

  for (const u of uploads) {
    const fp = path.join(LIFESTYLE, u.file)
    if (!fs.existsSync(fp)) {
      console.log(`  [missing] ${u.file} not found, skipping`)
      continue
    }
    ids[u.key] = await uploadProper(payload, fp, u.alt)
  }

  // ── 2. Re-wire page hero globals ──────────────────────────────────────
  console.log('\n[2] re-wire page hero globals')
  if (ids.clinic)      await reWireGlobalIfPlaceholder(payload, 'treatments-hero', 'heroImage', ids.clinic)
  if (ids.bali2)       await reWireGlobalIfPlaceholder(payload, 'journey-hero',    'heroImage', ids.bali2)
  if (ids.reception)   await reWireGlobalIfPlaceholder(payload, 'contact-hero',    'heroImage', ids.reception)
  if (ids.texture)     await reWireGlobalIfPlaceholder(payload, 'results-hero',    'heroImage', ids.texture)
  if (ids.textureAlt)  await reWireGlobalIfPlaceholder(payload, 'pricing-hero',    'heroImage', ids.textureAlt)

  // ── 3. Re-wire home-place image ───────────────────────────────────────
  console.log('\n[3] home-place image')
  if (ids.bali) await reWireGlobalIfPlaceholder(payload, 'home-place', 'image', ids.bali)

  // ── 4. Re-wire recovery stays ─────────────────────────────────────────
  console.log('\n[4] recovery stay hero images')
  const villaMap: Array<{ slug: string; key: string }> = [
    { slug: 'villa-sereno',    key: 'villa1' },
    { slug: 'apurva-kempinski', key: 'villa2' },
    { slug: 'villa-tirta',     key: 'villa3' },
    { slug: 'villa-kelapa',    key: 'villa4' },
    { slug: 'villa-damai',     key: 'villa5' },
    { slug: 'villa-sembilan',  key: 'villa6' },
  ]
  const stays = await payload.find({ collection: 'recovery-stays', limit: 100 })
  for (const entry of villaMap) {
    const doc = stays.docs.find((d) => d.slug === entry.slug)
    const mediaId = ids[entry.key]
    if (doc && mediaId) {
      await reWireCollectionIfPlaceholder(payload, 'recovery-stays', doc.id as number, 'heroImage', mediaId)
    }
  }

  // ── 5. Re-wire story portraits ────────────────────────────────────────
  console.log('\n[5] story portraits')
  const storyMap: Array<{ slug: string; key: string }> = [
    { slug: 'sarah-k',   key: 'story1' },
    { slug: 'margaux-d', key: 'story2' },
    { slug: 'james-w',   key: 'story3' },
    { slug: 'rachel-t',  key: 'story4' },
    { slug: 'chen-y',    key: 'story5' },
    { slug: 'daniel-r',  key: 'story6' },
    { slug: 'aisha-m',   key: 'story7' },
    { slug: 'hiroko-s',  key: 'story8' },
  ]
  const stories = await payload.find({ collection: 'stories', limit: 100 })
  for (const entry of storyMap) {
    const doc = stories.docs.find((d) => d.slug === entry.slug)
    const mediaId = ids[entry.key]
    if (doc && mediaId) {
      await reWireCollectionIfPlaceholder(payload, 'stories', doc.id as number, 'portrait', mediaId)
    }
  }

  console.log('\nseed-upgrade-media: done ✓')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

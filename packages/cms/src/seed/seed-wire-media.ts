/**
 * seed-wire-media.ts
 *
 * Wires existing placeholder media records to CMS fields that are currently
 * NULL. Also uploads logo.png / logo-light.png if not yet in the media
 * collection. Only fills empty fields — never overwrites existing values.
 *
 * Run:
 *   NODE_ENV=production pnpm --filter @cosmedic/cms exec tsx src/seed/seed-wire-media.ts
 */

import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import { getPayload } from 'payload'
import config from '../payload.config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const WEB_ASSETS = path.resolve(__dirname, '../../../web/public/assets')

/* ─── Helpers ──────────────────────────────────────────────────────────── */

async function uploadIfMissing(
  payload: Awaited<ReturnType<typeof getPayload>>,
  filePath: string,
  alt: string,
  category: string,
): Promise<number> {
  const filename = path.basename(filePath)
  // Check if already uploaded (by filename prefix before extension)
  const base = filename.replace(/\.[^.]+$/, '')
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { contains: base } },
    limit: 1,
  })
  if (existing.docs.length > 0) {
    console.log(`  [skip] ${filename} already in media (id=${existing.docs[0].id})`)
    return existing.docs[0].id as number
  }

  const stats = fs.statSync(filePath)
  const ext = path.extname(filePath).toLowerCase()
  const mimeMap: Record<string, string> = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
  }
  const mimetype = mimeMap[ext] || 'image/png'

  const doc = await payload.create({
    collection: 'media',
    data: { alt, category, isPlaceholder: true },
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

async function setGlobalImageIfEmpty(
  payload: Awaited<ReturnType<typeof getPayload>>,
  slug: string,
  field: string,
  mediaId: number,
): Promise<void> {
  const current = await payload.findGlobal({ slug: slug as 'settings' })
  const currentVal = (current as Record<string, unknown>)[field]
  if (currentVal != null && currentVal !== 0) {
    const id = typeof currentVal === 'object' ? (currentVal as { id: number }).id : currentVal
    console.log(`  [skip] ${slug}.${field} already set (id=${id})`)
    return
  }
  await payload.updateGlobal({ slug: slug as 'settings', data: { [field]: mediaId } })
  console.log(`  [wire] ${slug}.${field} → media id=${mediaId}`)
}

async function setCollectionImageIfEmpty(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: string,
  docId: number,
  field: string,
  mediaId: number,
): Promise<void> {
  const current = await payload.findByID({ collection: collection as 'media', id: docId })
  const currentVal = (current as Record<string, unknown>)[field]
  if (currentVal != null && currentVal !== 0) {
    const id = typeof currentVal === 'object' ? (currentVal as { id: number }).id : currentVal
    console.log(`  [skip] ${collection}#${docId}.${field} already set (id=${id})`)
    return
  }
  await payload.update({ collection: collection as 'media', id: docId, data: { [field]: mediaId } })
  console.log(`  [wire] ${collection}#${docId}.${field} → media id=${mediaId}`)
}

/* ─── Main ─────────────────────────────────────────────────────────────── */

async function main(): Promise<void> {
  console.log('seed-wire-media: starting…')
  const payload = await getPayload({ config })

  // ── 1. Upload logos if missing ────────────────────────────────────────
  console.log('\n[1] logos')
  const logoDarkId = await uploadIfMissing(
    payload,
    path.join(WEB_ASSETS, 'logo.png'),
    'BIMC CosMedic — logo (dark, for light backgrounds)',
    'uncategorised',
  )
  const logoLightId = await uploadIfMissing(
    payload,
    path.join(WEB_ASSETS, 'logo-light.png'),
    'BIMC CosMedic — logo (light, for dark backgrounds)',
    'uncategorised',
  )

  // ── 2. Wire logos to Header / Footer ─────────────────────────────────
  console.log('\n[2] header / footer logos')
  await setGlobalImageIfEmpty(payload, 'header', 'logoDark', logoDarkId)
  await setGlobalImageIfEmpty(payload, 'header', 'logoLight', logoLightId)
  await setGlobalImageIfEmpty(payload, 'footer', 'logoLight', logoLightId)

  // ── 3. Wire hero globals — use existing placeholder media IDs ─────────
  // Media IDs from the seed (all isPlaceholder=true):
  //   26=bali.webp  27=bali2.webp  28=clinic-alt.webp  29=clinic.webp
  //   30=hero.webp  31=light.webp  32=reception.webp   41=texture-alt.webp
  //   42=texture.webp
  console.log('\n[3] hero globals')
  await setGlobalImageIfEmpty(payload, 'treatments-hero',  'heroImage', 29)  // clinic.webp
  await setGlobalImageIfEmpty(payload, 'journey-hero',     'heroImage', 27)  // bali2.webp
  await setGlobalImageIfEmpty(payload, 'contact-hero',     'heroImage', 32)  // reception.webp
  await setGlobalImageIfEmpty(payload, 'results-hero',     'heroImage', 42)  // texture.webp
  await setGlobalImageIfEmpty(payload, 'pricing-hero',     'heroImage', 41)  // texture-alt.webp

  // ── 4. HomePlace image ────────────────────────────────────────────────
  console.log('\n[4] home place image')
  await setGlobalImageIfEmpty(payload, 'home-place', 'image', 26)  // bali.webp

  // ── 5. Before-&-After composites ─────────────────────────────────────
  // Media IDs: 9=facelift-male.webp  10=lip-lift-female.webp
  //            11=lip-lift-male.webp  12=necklift-female.webp
  console.log('\n[5] B&A composites')
  const baCases = await payload.find({
    collection: 'before-after-cases',
    limit: 100,
  })
  for (const c of baCases.docs) {
    const slug = c.slug as string
    let mediaId: number | null = null
    if (slug.includes('necklift'))            mediaId = 12
    else if (slug.includes('facelift-male'))  mediaId = 9
    else if (slug === 'case-003-lip-lift')    mediaId = 11  // male
    else if (slug.includes('lip-lift'))       mediaId = 10  // female fallback
    if (mediaId) {
      await setCollectionImageIfEmpty(payload, 'before-after-cases', c.id as number, 'composite', mediaId)
    } else {
      console.log(`  [skip] no mapping for B&A slug: ${slug}`)
    }
  }

  // ── 6. Recovery stay hero images ──────────────────────────────────────
  // Media IDs: 43=villa1  44=villa2  45=villa3  46=villa4  47=villa5  48=villa6
  // Only wire records that have no image (villa-damai is currently null)
  console.log('\n[6] recovery stay images')
  const villaOrder = [
    { slug: 'villa-sembilan', id: 48 },
    { slug: 'villa-damai',    id: 47 },
    { slug: 'villa-kelapa',   id: 46 },
    { slug: 'villa-tirta',    id: 45 },
    { slug: 'apurva-kempinski', id: 44 },
    { slug: 'villa-sereno',   id: 43 },
  ]
  const stays = await payload.find({ collection: 'recovery-stays', limit: 100 })
  for (const entry of villaOrder) {
    const doc = stays.docs.find((d) => d.slug === entry.slug)
    if (doc) {
      await setCollectionImageIfEmpty(payload, 'recovery-stays', doc.id as number, 'heroImage', entry.id)
    }
  }

  // ── 7. Story portraits ────────────────────────────────────────────────
  // Media IDs 33-40 = story1.webp through story8.webp
  // Assign in sortOrder to placeholder Unsplash portrait images
  console.log('\n[7] story portraits')
  const storyOrder = [
    { slug: 'sarah-k',    id: 33 },
    { slug: 'margaux-d',  id: 34 },
    { slug: 'james-w',    id: 35 },
    { slug: 'rachel-t',   id: 36 },
    { slug: 'chen-y',     id: 37 },
    { slug: 'daniel-r',   id: 38 },
    { slug: 'aisha-m',    id: 39 },
    { slug: 'hiroko-s',   id: 40 },
  ]
  const stories = await payload.find({ collection: 'stories', limit: 100 })
  for (const entry of storyOrder) {
    const doc = stories.docs.find((d) => d.slug === entry.slug)
    if (doc) {
      await setCollectionImageIfEmpty(payload, 'stories', doc.id as number, 'portrait', entry.id)
    }
  }

  console.log('\nseed-wire-media: done ✓')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

/**
 * One-off seeder: populate the 6 new Page Globals (treatments-page,
 * surgeons-page, results-page, recovery-stays-page, video-consult-page,
 * blog-page) that had no source row in the old Pages collection.
 *
 * Re-runnable: writes via updateGlobal, idempotent at the field level.
 */

import 'dotenv/config'
import { getPayload, type Payload } from 'payload'
import config from '../payload.config'

const NEW_PAGE_GLOBALS: Array<{ slug: string; data: Record<string, unknown> }> = [
  {
    slug: 'treatments-page',
    data: {
      slug: 'treatments', route: '/treatments', title: 'Treatments Index',
      chapterTitle: { a: 'Six', b: 'disciplines.' },
      tagline: 'Chapter II — Treatments',
      lede: 'Plastic surgery and aesthetic medicine, organised by discipline.',
      publishStatus: 'published',
    },
  },
  {
    slug: 'surgeons-page',
    data: {
      slug: 'surgeons', route: '/surgeons', title: 'Surgeons Index',
      chapterTitle: { a: 'Considered', b: 'hands.' },
      tagline: 'Chapter — Surgeons',
      lede: 'Eight ISAPS- and BPRS-credentialed practitioners across plastic surgery and aesthetic medicine.',
      publishStatus: 'published',
    },
  },
  {
    slug: 'results-page',
    data: {
      slug: 'results', route: '/results', title: 'Results',
      chapterTitle: { a: 'Considered', b: 'outcomes.' },
      tagline: 'Chapter IV — Results',
      lede: 'A selection of before-and-after cases from BIMC CosMedic, captioned with procedure and recovery timeline.',
      publishStatus: 'published',
    },
  },
  {
    slug: 'recovery-stays-page',
    data: {
      slug: 'recovery-stays', route: '/recovery-stays', title: 'Recovery Stays',
      chapterTitle: { a: 'Recover', b: 'in Bali.' },
      tagline: 'Chapter — Recovery Stays',
      lede: 'Private villas and partner properties for pre- and post-operative stays, vetted for accessibility, quiet, and proximity to BIMC Nusa Dua.',
      publishStatus: 'published',
    },
  },
  {
    slug: 'video-consult-page',
    data: {
      slug: 'video-consult', route: '/video-consult', title: 'Video Consult',
      chapterTitle: { a: 'Meet before', b: 'you travel.' },
      tagline: 'Chapter — Video Consult',
      lede: 'A 30-minute encrypted video consultation with your surgeon, before you book flights.',
      publishStatus: 'published',
    },
  },
  {
    slug: 'blog-page',
    data: {
      slug: 'blog', route: '/blog', title: 'Blog Index',
      chapterTitle: { a: 'Notes &', b: 'briefings.' },
      tagline: 'Editorial',
      lede: 'Clinical notes, patient briefings, and considered reading on the work we do.',
      publishStatus: 'published',
    },
  },
]

async function main(): Promise<void> {
  const payload = await getPayload({ config })
  try {
    for (const g of NEW_PAGE_GLOBALS) {
      await (payload as unknown as { updateGlobal: (args: { slug: string; data: Record<string, unknown> }) => Promise<unknown> }).updateGlobal({
        slug: g.slug,
        data: g.data,
      })
      payload.logger.info(`[seed-new-globals] ${g.slug} ← seeded`)
    }
    payload.logger.info(`[seed-new-globals] done — ${NEW_PAGE_GLOBALS.length} globals`)
  } catch (err) {
    payload.logger.error({ err }, '[seed-new-globals] failed')
    process.exitCode = 1
  } finally {
    const db = payload.db as { destroy?: () => Promise<void> }
    if (typeof db.destroy === 'function') await db.destroy()
    process.exit(process.exitCode ?? 0)
  }
}

main()

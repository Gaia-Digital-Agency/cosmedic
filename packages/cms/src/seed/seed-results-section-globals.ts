/**
 * Phase R5 — seed the 5 new d. Results Bucket section globals + the 8
 * patient-story rows + the per-page gallery/stories hero additions.
 *
 * Every string below is a VERBATIM copy of what the live /results +
 * /gallery + /stories routes currently render. Do NOT paraphrase, "fix",
 * or normalize whitespace — Rule 3 (visual invariance) + the standing
 * "no frontend data loss" feedback rule require byte-identical output
 * after the route rewire reads from these globals.
 *
 * Source files:
 *   - packages/web/src/routes/results/ResultsPage.tsx
 *   - packages/web/src/routes/gallery/GalleryPage.tsx
 *   - packages/web/src/routes/stories/StoriesPage.tsx
 *
 * Re-runnable: writes via updateGlobal / upserts via find→create/update,
 * idempotent.
 *
 * Run:
 *   NODE_ENV=production pnpm --filter @cosmedic/cms exec tsx \
 *     src/seed/seed-results-section-globals.ts
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

const RESULTS_GLOBALS: Array<{ slug: string; data: Record<string, unknown> }> = [
  {
    slug: 'results-hero',
    data: {
      chapter: 'Chapter IV — Results & Stories',
      titleA: 'Quietly',
      titleB: 'transformative.',
      lede:
        'A small selection of consented results paired with the stories behind them. Our complete library — over two hundred cases — is shared during private consultation.',
      imageHue: 1,
      imageLabel: 'RESULTS & STORIES',
      breadcrumbLabel: 'Results & Stories',
    },
  },
  {
    slug: 'results-featured-cases-view',
    data: {
      eyebrow: 'Featured cases',
      headingPre: 'Four signature cases,',
      headingItalic: 'shared with permission.',
      lede:
        'Each case represents a typical outcome, photographed at consistent angles and lighting, three to six months post-procedure.',
      filterBarLabel: 'Featured cases',
      countFormat: '{n} cases · facial',
    },
  },
  {
    slug: 'results-stories-view',
    data: {
      eyebrow: 'Stories',
      headingPre: 'Stories,',
      headingItalic: 'not slogans.',
      lede:
        "Eight stories from the last two years of patients, shared with their permission. Editorial restraint over marketing copy — these are the patients we're proudest to have served.",
    },
  },
  {
    slug: 'library-cta',
    data: {
      eyebrow: 'Private gallery',
      headingPre: 'Want to see ',
      headingItalic: 'more?',
      body:
        'Our complete library — over two hundred consented cases across every discipline — is shared during private consultation. We will match what we show you to the work you are considering.',
      buttonLabel: 'Request the full library',
      buttonHref: '/contact',
    },
  },
  {
    slug: 'share-cta',
    data: {
      eyebrow: 'Sharing your story',
      headingPre: 'Have a ',
      headingItalic: 'story',
      headingPost: ' to share?',
      body:
        "We never solicit testimonials — every story we publish is shared at the patient's instigation, in their own words, with their consent. If you'd like to share, we would be honoured to read it.",
      buttonLabel: 'Write to us',
      buttonHref: '/contact',
    },
  },
  {
    // R5 — gallery-page expansion (hero hue / label / breadcrumb + filter chrome)
    slug: 'gallery-page',
    data: {
      title: 'Gallery',
      slug: 'gallery',
      route: '/gallery',
      chapterTitle: { a: 'Quietly', b: 'transformative.' },
      tagline: 'Chapter IV — Selected Results',
      lede:
        'Four signature results from our facial repertoire, presented with patient permission. Our complete library — over two hundred consented cases — is shared during private consultation.',
      imageHue: 1,
      imageLabel: 'GALLERY',
      breadcrumbLabel: 'Gallery',
      filterBarLabel: 'Featured cases',
      countFormat: '{n} cases · facial',
    },
  },
  {
    // R5 — stories-page expansion (hero hue / label / breadcrumb)
    slug: 'stories-page',
    data: {
      title: 'Stories',
      slug: 'stories',
      route: '/stories',
      chapterTitle: { a: 'In their', b: 'own words.' },
      tagline: 'Chapter VI — Stories',
      lede:
        "Eight stories from the last two years of patients, shared with their permission. Editorial restraint over marketing copy — these are the patients we're proudest to have served.",
      imageHue: 5,
      imageLabel: 'STORIES',
      breadcrumbLabel: 'Stories',
    },
  },
  {
    // R5 — results-page label only (no field changes); ensure required fields present.
    slug: 'results-page',
    data: {
      title: 'Results & Stories',
      slug: 'results',
      route: '/results',
      chapterTitle: { a: 'Quietly', b: 'transformative.' },
      tagline: 'Chapter IV — Results & Stories',
      lede:
        'A small selection of consented results paired with the stories behind them. Our complete library — over two hundred cases — is shared during private consultation.',
    },
  },
]

type StoryRow = {
  slug: string
  patientLabel: string
  country: string
  procedureLabel: string
  hue: number
  quote: string
  year?: number
  sortOrder: number
}

const STORIES_ROWS: StoryRow[] = [
  {
    slug: 'sarah-k',
    patientLabel: 'Sarah K.',
    country: 'Sydney, Australia',
    procedureLabel: 'Rhinoplasty · 2025',
    hue: 1,
    quote:
      'I came expecting a procedure. I left having had something closer to a retreat — handled, cared for, and quietly returned to myself. The villa, the daily nursing, the slow afternoons — all of it felt like the opposite of medical tourism. It felt like being looked after.',
    year: 2025,
    sortOrder: 0,
  },
  {
    slug: 'margaux-d',
    patientLabel: 'Margaux D.',
    country: 'Paris, France',
    procedureLabel: 'Mid-face · 2024',
    hue: 3,
    quote:
      "dr. Suka talked me out of two of the three things I'd asked for. The result is the most natural I've ever looked. I'm grateful — and a little stunned that anyone would turn down work in a market like this. They are different here.",
    year: 2024,
    sortOrder: 1,
  },
  {
    slug: 'james-w',
    patientLabel: 'James W.',
    country: 'Melbourne, Australia',
    procedureLabel: 'Hair restoration · 2025',
    hue: 5,
    quote:
      "The villa, the nursing, the follow-ups — it felt less like medical tourism and more like being looked after by family. My concierge still texts me on the anniversary of my surgery. That's the part you don't see in the brochure.",
    year: 2025,
    sortOrder: 2,
  },
  {
    slug: 'rachel-t',
    patientLabel: 'Rachel T.',
    country: 'Auckland, New Zealand',
    procedureLabel: 'Abdominoplasty · 2024',
    hue: 2,
    quote:
      'I had a complication on day three. The nurse was at my villa within twenty minutes; my surgeon was there within the hour. Nothing was hidden, nothing was rushed. They handled it with the kind of calm I associate with the very best hospitals at home.',
    year: 2024,
    sortOrder: 3,
  },
  {
    slug: 'chen-y',
    patientLabel: 'Chen Y.',
    country: 'Singapore',
    procedureLabel: 'Eyelid surgery · 2024',
    hue: 0,
    quote:
      'I am a slow decision-maker. My initial consultation was in March; my procedure was in November. They never rushed me, never tried to upsell, never made me feel anything other than welcome. By the time I arrived, I had no anxiety left at all.',
    year: 2024,
    sortOrder: 4,
  },
  {
    slug: 'daniel-r',
    patientLabel: 'Daniel R.',
    country: 'Los Angeles, USA',
    procedureLabel: 'Facelift · 2025',
    hue: 4,
    quote:
      'The Bali part of it was almost incidental in the end — I came for the surgeon, not the location. But by week two of recovery, watching the ocean from the villa, I understood why everyone insists on saying it. Recovery here is not the same as recovery at home.',
    year: 2025,
    sortOrder: 5,
  },
  {
    slug: 'aisha-m',
    patientLabel: 'Aisha M.',
    country: 'London, UK',
    procedureLabel: 'Liposculpture · 2025',
    hue: 1,
    quote:
      'My partner was nervous about flying somewhere for surgery. The concierge spoke to him directly, sent him photos of the villa, walked him through the safety record of the hospital. By the time we landed, he was the calm one. They thought of everything.',
    year: 2025,
    sortOrder: 6,
  },
  {
    slug: 'hiroko-s',
    patientLabel: 'Hiroko S.',
    country: 'Tokyo, Japan',
    procedureLabel: 'Smile design · 2024',
    hue: 3,
    quote:
      "I had veneers fitted in three visits over fourteen days. The on-site ceramicist refined the shade twice — once between try-in and final placement, once after I'd lived with the smile for a day. It is the most considered piece of dental work I've ever had.",
    year: 2024,
    sortOrder: 7,
  },
]

async function main(): Promise<void> {
  const payload = await getPayload({ config })
  try {
    for (const g of RESULTS_GLOBALS) {
      await (payload as unknown as {
        updateGlobal: (args: { slug: string; data: Record<string, unknown> }) => Promise<unknown>
      }).updateGlobal({
        slug: g.slug,
        data: g.data,
      })
      payload.logger.info(`[seed-results] global ${g.slug} ← seeded`)
    }

    // Upsert the 8 patient-story rows (idempotent on slug).
    for (const row of STORIES_ROWS) {
      const existing = await payload.find({
        collection: 'stories',
        where: { slug: { equals: row.slug } },
        limit: 1,
      })
      if (existing.docs.length > 0) {
        const doc = existing.docs[0] as { id: number }
        await payload.update({
          collection: 'stories',
          id: doc.id,
          data: row,
        })
        payload.logger.info(`[seed-results] story ${row.slug} ← updated`)
      } else {
        await payload.create({
          collection: 'stories',
          data: row,
        })
        payload.logger.info(`[seed-results] story ${row.slug} ← created`)
      }
    }

    payload.logger.info(
      `[seed-results] done — ${RESULTS_GLOBALS.length} globals + ${STORIES_ROWS.length} story rows`,
    )
  } catch (err) {
    payload.logger.error({ err }, '[seed-results] failed')
    process.exitCode = 1
  } finally {
    const db = payload.db as { destroy?: () => Promise<void> }
    if (typeof db.destroy === 'function') await db.destroy()
    process.exit(process.exitCode ?? 0)
  }
}

main()

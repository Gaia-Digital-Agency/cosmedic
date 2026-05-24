/**
 * Phase R3 — seed the 5 new b. Treatments Bucket section globals.
 *
 * Every string below is a VERBATIM copy of what the live /treatments,
 * /treatments/<discipline>, and /treatments/<sub-cat> routes currently
 * render (TreatmentsIndex.tsx + DisciplineDetail.tsx + SubCategoryDetail.tsx).
 * Do NOT paraphrase, "fix", or normalize whitespace — Rule 3 (visual
 * invariance) + the standing "no frontend data loss" feedback rule require
 * byte-identical output after the route rewires read from these globals.
 *
 * Source files:
 *   - packages/web/src/routes/treatments/TreatmentsIndex.tsx        (hero L19-27, index section L32-39 + L58-60, stats L10-15)
 *   - packages/web/src/routes/detail/DisciplineDetail.tsx           (TOC L40-61, overview h2 L68, choose-a-focus L92-101, sc card labels L157, procedures L196-199, faqs h2 L247, related L261-269)
 *   - packages/web/src/routes/detail/SubCategoryDetail.tsx          (chapter separator L26, TOC L40-58, take-a-step L70-137, overview h2 L144, treatments L167-171, faqs h2 L187)
 *
 * Re-runnable: writes via updateGlobal, idempotent.
 *
 * Run:
 *   NODE_ENV=production pnpm --filter @cosmedic/cms exec tsx \
 *     src/seed/seed-treatments-section-globals.ts
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

const TREATMENTS_GLOBALS: Array<{ slug: string; data: Record<string, unknown> }> = [
  {
    slug: 'treatments-hero',
    data: {
      chapter: 'Chapter II — The Repertoire',
      titleA: 'Six disciplines,',
      titleB: 'one sanctuary.',
      lede:
        'A complete repertoire of cosmetic medicine practiced under one roof — surgical, non-surgical, restorative, and the careful coordination that holds it all together.',
      imageHue: 1,
      imageLabel: 'THE REPERTOIRE',
      breadcrumbLabel: 'Treatments',
    },
  },
  {
    slug: 'treatments-index-section',
    data: {
      eyebrow: 'An Index',
      heading: 'Browse by discipline.',
      lede:
        'Each discipline is led by a specialist surgeon and supported by the full clinical, recovery, and concierge team. Treatments may be combined across disciplines on a single visit.',
      readMoreLabel: 'Read more',
      readMoreArrow: '→',
    },
  },
  {
    slug: 'treatments-stats',
    data: {
      stats: [
        { number: '28', label: 'Years in Bali' },
        { number: '2,400+', label: 'Procedures yearly' },
        { number: '8', label: 'Specialists on faculty' },
        { number: '96%', label: 'Patient satisfaction' },
      ],
    },
  },
  {
    slug: 'discipline-detail-template',
    data: {
      toc: {
        onThisPageLabel: 'On this page',
        overviewLabel: 'Overview',
        subCategoriesLabel: 'Sub-categories',
        proceduresLabel: 'Procedures',
        faqsLabel: 'FAQs',
      },
      overview: { heading: 'Overview' },
      chooseAFocus: {
        heading: 'Choose a focus',
        bodyTemplate:
          'This discipline is organised into {count} areas. Each page lists every treatment we offer with its starting price.',
        availableLabel: 'Read more →',
        comingLabel: 'Coming v1.4',
      },
      procedures: {
        heading: 'Procedures',
        intro:
          'The full list, with our typical price-from. We will give you a precise quote during consultation.',
      },
      faqs: { heading: 'Frequently asked' },
      related: {
        eyebrow: 'Related',
        headingItalic: 'Often considered',
        headingRoman: 'alongside.',
        ledeTemplate:
          'Many of our patients combine treatments across disciplines. These pair particularly well with {discipline}.',
      },
    },
  },
  {
    slug: 'sub-category-detail-template',
    data: {
      chapterSeparator: ' · ',
      toc: {
        onThisPageLabel: 'On this page',
        overviewLabel: 'Overview',
        treatmentsLabel: 'Treatments',
        faqsLabel: 'FAQs',
      },
      takeAStep: {
        eyebrow: 'Take a step',
        videoConsultLabel: 'Book a video consult →',
        estimateLabel: 'Get a written estimate →',
        whatsappLabel: 'WhatsApp the concierge →',
        replyLine: 'Replies within 24 hours. No obligation.',
      },
      overview: { heading: 'Overview' },
      treatments: {
        heading: 'Treatments',
        intro:
          'The full list, with our typical price-from. Tap any treatment to expand details. Final quote is tailored after consultation.',
      },
      faqs: { heading: 'Frequently asked' },
    },
  },
]

async function main(): Promise<void> {
  const payload = await getPayload({ config })
  try {
    for (const g of TREATMENTS_GLOBALS) {
      await (payload as unknown as {
        updateGlobal: (args: { slug: string; data: Record<string, unknown> }) => Promise<unknown>
      }).updateGlobal({
        slug: g.slug,
        data: g.data,
      })
      payload.logger.info(`[seed-treatments] ${g.slug} ← seeded`)
    }
    payload.logger.info(`[seed-treatments] done — ${TREATMENTS_GLOBALS.length} globals`)
  } catch (err) {
    payload.logger.error({ err }, '[seed-treatments] failed')
    process.exitCode = 1
  } finally {
    const db = payload.db as { destroy?: () => Promise<void> }
    if (typeof db.destroy === 'function') await db.destroy()
    process.exit(process.exitCode ?? 0)
  }
}

main()

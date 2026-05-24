/**
 * Phase R4 — seed the 5 new c. Doctors Bucket section globals.
 *
 * Every string below is a VERBATIM copy of what the live /surgeons +
 * /surgeons/<slug> routes currently render. Do NOT paraphrase, "fix",
 * or normalize whitespace — Rule 3 (visual invariance) + the standing
 * "no frontend data loss" feedback rule require byte-identical output
 * after the route rewire reads from these globals.
 *
 * Source files:
 *   - packages/web/src/routes/surgeons/SurgeonsIndex.tsx  (L57-78, L83, L100, L112, L116, L120, L125, L134-142, L156-164)
 *   - packages/web/src/routes/detail/SurgeonDetail.tsx    (L42-247)
 *
 * Re-runnable: writes via updateGlobal, idempotent. The two mirror fields
 * on `surgeon-detail-template` (heroCtaTreatmentsLabelTemplate,
 * trainingRowPracticeMid) are intentionally left blank — Payload field-
 * level `afterRead` hooks compute their values at read time.
 *
 * Run:
 *   NODE_ENV=production pnpm --filter @cosmedic/cms exec tsx \
 *     src/seed/seed-doctors-section-globals.ts
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

const DOCTORS_GLOBALS: Array<{ slug: string; data: Record<string, unknown> }> = [
  {
    slug: 'surgeons-hero',
    data: {
      chapter: 'Chapter III — The Practitioners',
      titleA: 'Hands you',
      titleB: 'can trust.',
      lede: 'Eight specialists across plastic surgery and aesthetic medicine — ISAPS members, fellowship-trained in Korea, Japan, and Singapore, and rooted in Bali.',
      imageHue: 2,
      imageLabel: 'THE PRACTITIONERS',
      breadcrumbLabel: 'Surgeons',
    },
  },
  {
    slug: 'surgeons-lead-view',
    data: {
      sectionEyebrow: 'Lead Plastic Surgeon',
      blockEyebrow: 'Lead Surgeon',
      statLabelTrained: 'Trained',
      statLabelSpecialty: 'Specialty',
      statLabelDistinction: 'Distinction',
      ctaLabel: 'Read the full profile',
    },
  },
  {
    slug: 'surgeons-plastic-view',
    data: {
      eyebrow: 'Plastic Surgery',
      headingA: '',
      headingItalic: 'Reconstructive',
      headingB: ' & aesthetic.',
      lede: 'Our plastic surgery team holds combined fellowships from Korea, Japan, Singapore, and Indonesia — and ISAPS, FICS, and craniomaxillofacial subspecialty credentials.',
    },
  },
  {
    slug: 'surgeons-aesthetic-view',
    data: {
      eyebrow: 'Aesthetic Medicine',
      headingA: '',
      headingItalic: 'Quiet',
      headingB: ' non-surgical.',
      lede: 'Anti-aging, dermatology, venereology and aesthetics — for the considered, everyday refinements between bigger decisions.',
    },
  },
  {
    slug: 'surgeon-detail-template',
    data: {
      // Hero
      heroLeadLabel: 'Lead Surgeon',
      heroSpecialistLabel: 'Specialist',
      heroCtaConsultLabel: 'Request a consultation',
      // heroCtaTreatmentsLabelTemplate — left blank; afterRead hook resolves
      heroCtaTreatmentsLabelFallback: 'Treatments',
      // Breadcrumb
      breadcrumbHomeLabel: 'BIMC CosMedic',
      breadcrumbSurgeonsLabel: 'Surgeons',
      // Stats row
      statLabelYears: 'Years in practice',
      statLabelDistinction: 'Distinction',
      statLabelSpecialty: 'Specialty',
      // Biography sidebar
      biographyEyebrow: 'Biography',
      sidebarLabelSpecialism: 'Specialism',
      sidebarLabelCredentials: 'Credentials',
      sidebarLabelLanguages: 'Languages',
      sidebarLabelAvailability: 'Availability',
      languagesFallback: 'English · Bahasa Indonesia',
      availabilityFallback: 'Mon & Thu in person · weekday mornings by video',
      // Biography body — template with {title} + {common} placeholders.
      secondaryBioParagraph:
        'Patients often describe {title} {common} as quiet, deeply patient, and frank — comfortable with saying "no" when "yes" would be the easier answer. We hold this very highly.',
      // Specialty areas — template with {title}, {common}, and {italic}…{/italic}.
      specialtyEyebrow: 'Specialty areas',
      specialtyHeadingTemplate: 'What {title} {common} {italic}does best.{/italic}',
      // Training & credentials
      trainingEyebrow: 'Training & credentials',
      trainingRowLabels: [
        { value: 'Medical Degree' },
        { value: 'Specialty Training' },
        { value: 'Suffix' },
        { value: 'Practice' },
        { value: 'Memberships' },
      ],
      trainingRowRights: [
        { value: 'MBBS / MD' },        // row 0 — "Medical Degree"
        { value: 'Board credential' }, // row 2 — "Suffix"
        { value: 'Active' },           // row 3 — "Practice"
        { value: 'Active member' },    // row 4 — "Memberships"
      ],
      // trainingRowPracticeMid — left blank; afterRead hook composes from Settings
      // Faculty
      facultyEyebrow: 'The faculty',
      facultyHeading: {
        pre: 'Meet the ',
        italic: 'other practitioners.',
        post: '',
      },
    },
  },
]

async function main(): Promise<void> {
  const payload = await getPayload({ config })
  try {
    for (const g of DOCTORS_GLOBALS) {
      await (payload as unknown as {
        updateGlobal: (args: { slug: string; data: Record<string, unknown> }) => Promise<unknown>
      }).updateGlobal({
        slug: g.slug,
        data: g.data,
      })
      payload.logger.info(`[seed-doctors] ${g.slug} ← seeded`)
    }
    payload.logger.info(`[seed-doctors] done — ${DOCTORS_GLOBALS.length} globals`)
  } catch (err) {
    payload.logger.error({ err }, '[seed-doctors] failed')
    process.exitCode = 1
  } finally {
    const db = payload.db as { destroy?: () => Promise<void> }
    if (typeof db.destroy === 'function') await db.destroy()
    process.exit(process.exitCode ?? 0)
  }
}

main()

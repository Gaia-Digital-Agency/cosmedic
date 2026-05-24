/**
 * Phase R7 — Bucket "f. Journey" seed migration.
 *
 * Idempotent. Run via:
 *   NODE_ENV=production pnpm --filter @cosmedic/cms exec tsx \
 *     src/seed/seed-r7-journey.ts
 *
 * What this does:
 *   1. Upsert `journey-hero` global with the verbatim ChapterOpener content
 *      currently hardcoded at packages/web/src/routes/journey/JourneyPage.tsx.
 *   2. Upsert `journey-stats` global with the 3 stat tiles at the foot of
 *      /journey (24h / 45min / 12mo).
 *   3. Replace the 6 legacy "Day 1 / Day 2 / Day 4…" rows in `journey-steps`
 *      with the 7 patient-journey rows (Enquiry → Homecoming) that the
 *      /journey route renders. User-approved replacement (see PR description) —
 *      the legacy rows were dead data (no page placed the `journeyStepList`
 *      block that consumes them).
 *   4. Upsert `recovery-stays-page` global with hero + topStats +
 *      portfolioSection + inclusionsSection + 8 inclusion rows — verbatim
 *      from RecoveryStaysPage.tsx hardcoded content.
 *   5. Replace the 6 legacy `recovery-stays` rows with the 6 villa rows from
 *      the hardcoded VILLAS array (existing rows had wrong locations + no
 *      prices). User-approved.
 *
 * Visual invariance gate: after running, `/journey` and `/recovery-stays`
 * must render byte-identical HTML to the pre-rewire snapshot.
 */

import { config as loadEnv } from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
loadEnv({ path: path.resolve(dirname, '../../.env') })

const { getPayload } = await import('payload')
const config = (await import('../payload.config')).default
const { upsert, upsertGlobal } = await import('./seed-helpers')
const { paragraphsToLexical } = await import('./lexical')

/* ─── Journey hero ─────────────────────────────────────────────────────── */

const JOURNEY_HERO = {
  chapter: 'Chapter V — Your Journey',
  title: { a: 'From enquiry,', b: 'to homecoming.' },
  lede:
    'Seven steps, designed to feel less like medical tourism and more like being looked after by family. We hold your hand from first email to twelfth-month follow-up.',
  imageHue: 4,
  imageLabel: 'THE JOURNEY',
  breadcrumbLabel: 'Your Journey',
}

/* ─── Journey stats ────────────────────────────────────────────────────── */

const JOURNEY_STATS = {
  stats: [
    { number: '24h', label: 'Reply to first enquiry', italic: false },
    { number: '45min', label: 'Initial consultation', italic: false },
    { number: '12mo', label: 'Follow-up programme', italic: false },
  ],
}

/* ─── Journey steps (7 patient-journey rows) ───────────────────────────── */

type StepRow = {
  slug: string
  order: number
  number: string
  title: string
  bodyParagraphs: string[]
  bullets: Array<{ letter: string; text: string }>
  imageHue: number
}

const JOURNEY_STEPS: StepRow[] = [
  {
    slug: 'enquiry',
    order: 1,
    number: '01',
    title: 'Enquiry',
    bodyParagraphs: [
      'From the moment you write to us, your concierge takes on your case. Within twenty-four hours, you will hear back — by email, WhatsApp, or whichever channel you prefer — with a private link to schedule your first consultation. There is no form to fill, no commitment to make. We treat first contact the way we treat first appointments: quietly, and with care.',
    ],
    bullets: [
      { letter: 'A', text: 'Concierge assigned within 24h' },
      { letter: 'B', text: 'Private booking link' },
      { letter: 'C', text: 'All major languages' },
      { letter: 'D', text: 'Held in confidence' },
    ],
    imageHue: 0,
  },
  {
    slug: 'consult',
    order: 2,
    number: '02',
    title: 'Consult',
    bodyParagraphs: [
      'A private video consultation, typically forty-five minutes, with the surgeon best suited to your concerns. We will discuss your hopes, your medical history, and your timeline; we will look at photographs you send in advance; and we will tell you, with great honesty, what we recommend — and what we do not. Most enquiries do not lead to surgery, and that is exactly as it should be.',
    ],
    bullets: [
      { letter: 'A', text: '45-minute video consult' },
      { letter: 'B', text: 'Specialist surgeon, not a coordinator' },
      { letter: 'C', text: 'Treatment plan within 48 hours' },
      { letter: 'D', text: 'No obligation' },
    ],
    imageHue: 1,
  },
  {
    slug: 'plan',
    order: 3,
    number: '03',
    title: 'Plan',
    bodyParagraphs: [
      'Within forty-eight hours of your consultation, we send a written treatment plan: the procedure, the surgeon, the dates, the recovery, the costs, and the small things — meals, transport, follow-up. We will refine it together until it feels right. Most plans are finalised after one or two iterations.',
    ],
    bullets: [
      { letter: 'A', text: 'Written plan within 48h' },
      { letter: 'B', text: 'All-inclusive pricing' },
      { letter: 'C', text: 'Procedure + recovery + stay' },
      { letter: 'D', text: 'Refined together' },
    ],
    imageHue: 2,
  },
  {
    slug: 'arrive',
    order: 4,
    number: '04',
    title: 'Arrive',
    bodyParagraphs: [
      'We meet every patient personally at Ngurah Rai International Airport. Your concierge greets you by name; our driver takes you directly to your villa or hotel; we will not let you sort out a SIM card or a coffee before we have you settled. Pre-operative scans, if needed, happen the next morning at the hospital — and only the next morning.',
    ],
    bullets: [
      { letter: 'A', text: 'Met at airport gate' },
      { letter: 'B', text: 'Black-car transfer' },
      { letter: 'C', text: 'Villa welcome & provisioning' },
      { letter: 'D', text: 'Pre-op scan day after arrival' },
    ],
    imageHue: 3,
  },
  {
    slug: 'procedure',
    order: 5,
    number: '05',
    title: 'Procedure',
    bodyParagraphs: [
      "Procedures are performed at BIMC Hospital Nusa Dua — Indonesia's first ACHSI-accredited international hospital, and our home since 1998. You will meet your anaesthetist the morning of your procedure, your surgeon will see you immediately before and immediately after, and your concierge stays with you from admission to discharge.",
    ],
    bullets: [
      { letter: 'A', text: 'ACHSI-accredited theatres' },
      { letter: 'B', text: 'Australian-standard anaesthesia' },
      { letter: 'C', text: 'Concierge with you throughout' },
      { letter: 'D', text: 'Discharge to villa, not hospital' },
    ],
    imageHue: 4,
  },
  {
    slug: 'recover',
    order: 6,
    number: '06',
    title: 'Recover',
    bodyParagraphs: [
      'You recover in a private villa, never in a hospital ward. A registered nurse visits every morning for the first seven days; your surgeon sees you twice in the first week; your concierge handles meals, transport, paperwork, and any small kindness you might need. Most patients describe this part of the journey as the most surprising — that recovery, here, feels less medical and more like rest.',
    ],
    bullets: [
      { letter: 'A', text: 'Private villa, not hospital' },
      { letter: 'B', text: 'Daily nursing visits' },
      { letter: 'C', text: 'Surgeon reviews x2 in week one' },
      { letter: 'D', text: 'Family welcome, no extra cost' },
    ],
    imageHue: 5,
  },
  {
    slug: 'homecoming',
    order: 7,
    number: '07',
    title: 'Homecoming',
    bodyParagraphs: [
      "We see you off the same way we welcomed you — driven to the airport, bags handled, a quiet farewell. The next twelve months are organised: video reviews at one week, one month, three months, six months, and twelve months. Many of our patients keep their concierge's WhatsApp on speed dial for years afterwards. We rather like that.",
    ],
    bullets: [
      { letter: 'A', text: 'Black-car to airport' },
      { letter: 'B', text: '5 video follow-ups in year one' },
      { letter: 'C', text: 'Unlimited WhatsApp messaging' },
      { letter: 'D', text: 'Onward referrals if needed' },
    ],
    imageHue: 0,
  },
]

const NEW_STEP_SLUGS = new Set(JOURNEY_STEPS.map((s) => s.slug))

/* ─── Recovery-stays page ──────────────────────────────────────────────── */

const RECOVERY_PAGE = {
  title: 'Recovery Stays',
  slug: 'recovery-stays',
  route: '/recovery-stays',
  hero: {
    chapter: 'Chapter VII — Recovery Stays',
    title: { a: 'A villa, a', b: 'quiet recovery.' },
    lede:
      'A small, hand-selected portfolio of villas and resort suites in Nusa Dua, Ubud, Sanur, and Jimbaran. Every stay includes provisioning, drivers, and the option of daily nursing.',
    imageHue: 4,
    imageLabel: 'RECOVERY STAYS',
    breadcrumbLabel: 'Recovery Stays',
  },
  topStats: [
    { number: '6', label: 'Curated villas', italic: false },
    { number: '4', label: 'Locations across Bali', italic: false },
    { number: '5–21', label: 'Nights, typical stay', italic: true },
    { number: 'All', label: 'Provisioned by us', italic: true },
  ],
  portfolioSection: {
    eyebrow: 'The portfolio',
    headingPre: '',
    headingItalic: 'Six',
    headingPost: ' places to recover.',
    lede:
      'We work directly with each property — every villa is inspected by our concierge team quarterly, and we provision them ourselves so they are ready for you the moment you arrive.',
  },
  inclusionsSection: {
    eyebrow: "What's included",
    headingPre: 'Every stay, ',
    headingItalic: 'considered.',
    headingPost: '',
    lede:
      'All villa stays include the small kindnesses that make recovery feel less clinical. Add-ons are available; few are necessary.',
  },
  inclusions: [
    { letter: 'A', title: 'Welcome provisioning', body: 'Fresh linens, groceries for two days, your favourite tea waiting.' },
    { letter: 'B', title: 'Daily housekeeping', body: 'Twice-daily turndown, laundry on request.' },
    { letter: 'C', title: 'Driver on call', body: '24-hour driver service, included for you and your party.' },
    { letter: 'D', title: 'Twenty-four-hour security', body: 'Every villa is staffed continuously.' },
    { letter: 'E', title: 'Full kitchen', body: 'We will stock it with what you ask us to stock it with.' },
    { letter: 'F', title: 'Wifi & telecoms', body: 'Local SIM with data, ready in your room.' },
    { letter: 'G', title: 'Daily nursing visits', body: 'By arrangement — included in surgical packages.' },
    { letter: 'H', title: 'Aftercare provisioning', body: 'Pharmacy, dressings, and post-op food restocked daily.' },
  ],
  publishStatus: 'published',
}

/* ─── Recovery-stays villas (6 rows) ───────────────────────────────────── */

type VillaRow = {
  slug: string
  name: string
  location: string
  bedrooms: string
  poolType: string
  priceFromIdrPerNight: number
  body: string
  imageHue: number
  driveTime: string
  sortOrder: number
}

const VILLAS: VillaRow[] = [
  {
    slug: 'villa-sembilan',
    name: 'Villa Sembilan',
    location: 'Nusa Dua',
    bedrooms: '2 BR',
    poolType: 'Private',
    priceFromIdrPerNight: 2_940_000,
    body:
      'A quiet two-bedroom villa within the ITDC compound — five minutes from the BIMC hospital and a short walk to the beach. Our most-chosen villa for solo and couple recovery.',
    imageHue: 0,
    driveTime: '5 min',
    sortOrder: 1,
  },
  {
    slug: 'villa-damai',
    name: 'Villa Damai',
    location: 'Ubud',
    bedrooms: '3 BR',
    poolType: 'Private',
    priceFromIdrPerNight: 4_410_000,
    body:
      'A three-bedroom villa in the rice paddies above Ubud, for patients who prefer cooler air and slower mornings. Forty-five-minute drive to the hospital; daily nursing visits arranged.',
    imageHue: 1,
    driveTime: '45 min',
    sortOrder: 2,
  },
  {
    slug: 'villa-kelapa',
    name: 'Villa Kelapa',
    location: 'Jimbaran',
    bedrooms: '2 BR',
    poolType: 'Private',
    priceFromIdrPerNight: 3_360_000,
    body:
      'A beachfront villa in Jimbaran with sunset views and direct sand access. Suited to non-surgical and short-recovery patients who want to swim earlier.',
    imageHue: 2,
    driveTime: '15 min',
    sortOrder: 3,
  },
  {
    slug: 'villa-tirta',
    name: 'Villa Tirta',
    location: 'Nusa Dua',
    bedrooms: '4 BR',
    poolType: 'Private',
    priceFromIdrPerNight: 6_090_000,
    body:
      'A four-bedroom villa for families travelling together, or for patients who want extra space. Six-minute drive to the hospital.',
    imageHue: 3,
    driveTime: '5 min',
    sortOrder: 4,
  },
  {
    slug: 'apurva-kempinski',
    name: 'The Apurva Suite',
    location: 'Nusa Dua',
    bedrooms: '1 BR',
    poolType: 'Resort',
    priceFromIdrPerNight: 5_460_000,
    body:
      'A one-bedroom suite at The Apurva Kempinski for patients who prefer hotel service over villa living. Full nursing visits arranged in-room.',
    imageHue: 4,
    driveTime: '5 min',
    sortOrder: 5,
  },
  {
    slug: 'villa-sereno',
    name: 'Villa Sereno',
    location: 'Sanur',
    bedrooms: '3 BR',
    poolType: 'Private',
    priceFromIdrPerNight: 3_990_000,
    body:
      'A traditional Balinese-style three-bedroom villa in the quiet of Sanur — twenty-five minutes from the hospital, well-suited to longer recoveries.',
    imageHue: 5,
    driveTime: '25 min',
    sortOrder: 6,
  },
]

const NEW_VILLA_SLUGS = new Set(VILLAS.map((v) => v.slug))

/* ─── Runner ───────────────────────────────────────────────────────────── */

async function main(): Promise<void> {
  const payload = await getPayload({ config })

  payload.logger.info('[seed-r7] starting')

  // 1. journey-hero
  await upsertGlobal(payload, 'journey-hero', JOURNEY_HERO)
  payload.logger.info('[seed-r7] journey-hero upserted')

  // 2. journey-stats
  await upsertGlobal(payload, 'journey-stats', JOURNEY_STATS)
  payload.logger.info('[seed-r7] journey-stats upserted')

  // 3. journey-steps — upsert 7 patient steps; delete legacy day-* rows.
  for (const step of JOURNEY_STEPS) {
    await upsert(payload, 'journey-steps', 'slug', step.slug, {
      slug: step.slug,
      order: step.order,
      number: step.number,
      title: step.title,
      body: paragraphsToLexical(step.bodyParagraphs),
      bullets: step.bullets,
      imageHue: step.imageHue,
      sortOrder: step.order,
    })
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const existingSteps = (await (payload as any).find({
    collection: 'journey-steps',
    limit: 500,
    depth: 0,
  })) as { docs: Array<{ id: number; slug: string }> }
  for (const row of existingSteps.docs) {
    if (!NEW_STEP_SLUGS.has(row.slug)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (payload as any).delete({ collection: 'journey-steps', id: row.id })
      payload.logger.info(`[seed-r7] deleted legacy journey-step "${row.slug}"`)
    }
  }

  // 4. recovery-stays-page (full editorial)
  await upsertGlobal(payload, 'recovery-stays-page', RECOVERY_PAGE)
  payload.logger.info('[seed-r7] recovery-stays-page upserted')

  // 5. recovery-stays villas — upsert 6 rows; delete any extras not in the set.
  for (const v of VILLAS) {
    await upsert(payload, 'recovery-stays', 'slug', v.slug, {
      slug: v.slug,
      name: v.name,
      location: v.location,
      bedrooms: v.bedrooms,
      poolType: v.poolType,
      priceFromIdrPerNight: v.priceFromIdrPerNight,
      body: v.body,
      imageHue: v.imageHue,
      driveTime: v.driveTime,
      sortOrder: v.sortOrder,
    })
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const existingVillas = (await (payload as any).find({
    collection: 'recovery-stays',
    limit: 500,
    depth: 0,
  })) as { docs: Array<{ id: number; slug: string }> }
  for (const row of existingVillas.docs) {
    if (!NEW_VILLA_SLUGS.has(row.slug)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (payload as any).delete({ collection: 'recovery-stays', id: row.id })
      payload.logger.info(`[seed-r7] deleted legacy recovery-stay "${row.slug}"`)
    }
  }

  payload.logger.info('[seed-r7] done')
  process.exit(0)
}

main().catch((err) => {
  console.error('[seed-r7] failed:', err)
  process.exit(1)
})

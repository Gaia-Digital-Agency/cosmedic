/**
 * Phase R2 — seed the 10 new a. Homepage Bucket section globals.
 *
 * Every string below is a VERBATIM copy of what the live / renders today.
 * Do NOT paraphrase, "fix", or normalize whitespace — Rule 3 (visual
 * invariance) + the "no frontend data loss" feedback rule require
 * byte-identical output after the route rewire reads from these globals.
 *
 * Source files:
 *   - packages/web/src/routes/home/Hero.tsx
 *   - packages/web/src/routes/home/Intro.tsx
 *   - packages/web/src/routes/home/Treatments.tsx
 *   - packages/web/src/routes/home/PricingTeaser.tsx
 *   - packages/web/src/routes/home/Surgeons.tsx
 *   - packages/web/src/routes/home/Gallery.tsx
 *   - packages/web/src/routes/home/Journey.tsx
 *   - packages/web/src/routes/home/Stories.tsx
 *   - packages/web/src/routes/home/LeadMagnet.tsx
 *   - packages/web/src/routes/home/Place.tsx
 *
 * Re-runnable: writes via updateGlobal; idempotent.
 *
 * Run:
 *   NODE_ENV=production pnpm --filter @cosmedic/cms exec tsx \
 *     src/seed/seed-home-section-globals.ts
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

const HOME_GLOBALS: Array<{ slug: string; data: Record<string, unknown> }> = [
  {
    slug: 'home-hero',
    data: {
      eyebrow: 'A sanctuary in Nusa Dua · Est. 1998',
      titleA: 'Plastic surgery',
      titleB: 'in Bali, by ISAPS surgeons.',
      breadcrumbLabel: 'Home',
      primaryCtaLabel: 'Plan Your Treatment',
      secondaryCtaLabel: 'View Pricing',
      secondaryCtaHref: '/pricing',
      quickEnquiry: {
        eyebrow: 'Begin · No commitment',
        heading: 'Get a private price estimate within 24 hours.',
        intro:
          "Two fields to start. We'll reply with a tailored estimate and procedure guide — no marketing.",
        nameLabel: 'Your name',
        namePlaceholder: 'First name',
        emailLabel: 'Email',
        emailPlaceholder: 'you@email.com',
        interestLabel: 'Area of interest',
        interestOptionalLabel: '(optional)',
        interestPlaceholder: 'e.g. rhinoplasty, mommy makeover…',
        revealInterestLabel: '+ Add a treatment area (optional)',
        submitLabel: 'Begin enquiry',
        submittingLabel: 'Sending…',
        successLabel: 'Sent — thank you',
        successFine: 'Thank you — your concierge will reply within one business day.',
        errorFine: 'Something went wrong. Please try the full form on /contact.',
        fineprint: 'Held in confidence. Reviewed by a credentialed surgeon.',
      },
    },
  },
  {
    slug: 'home-intro',
    data: {
      eyebrow: 'Our Approach',
      pullQuoteBefore: 'Aesthetic medicine, considered with the same ',
      pullQuoteAccent: 'care ',
      pullQuoteAfter: 'as the island that surrounds it.',
      col1:
        "For almost three decades, BIMC CosMedic has practiced cosmetic surgery the way Bali has practiced hospitality — quietly, with patience, and with deep respect for the person in the chair. We don't promise transformation. We promise consideration: of your face, your body, your time, and the life you intend to return to.",
      col2:
        "Our centre sits within Indonesia's most accredited international hospital. Eight ISAPS- and FICS-credentialed specialists — fellowship-trained in Korea, Japan, Singapore and across Indonesia — work alongside a concierge team that handles everything from your arrival at Ngurah Rai to your final follow-up by video.",
    },
  },
  {
    slug: 'home-lead-magnet',
    data: {
      coverEyebrow: 'A guide · 24 pages · PDF',
      coverLine1: 'The Bali',
      coverLine2: 'Recovery',
      coverLine3: 'Guide.',
      coverFoot1: 'BIMC CosMedic',
      coverFoot2: 'MMXXVI',
      bodyEyebrow: 'Free Guide',
      headingPart1: 'What to expect from',
      headingAccent: 'recovery in Bali.',
      lede:
        'A 24-page editorial guide written by our concierge team — covering recovery timelines for the ten most-requested procedures, what to pack, what villas suit which surgeries, and the pace of a typical fortnight in Nusa Dua.',
      formPlaceholder: 'Your email address',
      submitLabel: 'Send Guide →',
      successHeading: '✓ Sent',
      successBody: 'Check your inbox — the guide is on its way.',
      fineprint: 'One email. No marketing list. Unsubscribe anytime.',
    },
  },
  {
    slug: 'home-place',
    data: {
      eyebrow: 'Recovery in Bali',
      headingPart1: 'Recover',
      headingAccent: 'in paradise.',
      body:
        'Nusa Dua sits on the southernmost reach of Bali — quiet beaches, soft afternoons, and the kind of warm, careful hospitality that has made the island synonymous with rest. We work with a small portfolio of villas and resorts, hand-selected for privacy and post-operative comfort.',
      rows: [
        { letter: 'A.', text: 'Private recovery villas in Nusa Dua & Ubud' },
        { letter: 'B.', text: 'Daily nursing visits, dietitian on call' },
        { letter: 'C.', text: 'Drivers, security, and concierge — included' },
        { letter: 'D.', text: 'A short walk to the BIMC hospital' },
      ],
      ctaLabel: 'View recovery stays',
      ctaHref: '/recovery-stays',
    },
  },
  {
    slug: 'home-treatments-view',
    data: {
      eyebrow: 'Treatments',
      headingPart1: 'Six disciplines,',
      headingPart2: 'one sanctuary.',
      lede:
        'A complete repertoire under one roof, sequenced into a single journey. Treatments may be combined; recovery is always private.',
    },
  },
  {
    slug: 'home-pricing-view',
    data: {
      eyebrow: 'Pricing · Starting From',
      headingPart1: 'Transparent',
      headingPart2: 'pricing.',
      lede:
        'Indicative starting prices in IDR (with AUD equivalent). Final quotes are tailored after consultation. Travel, accommodation and concierge can be packaged.',
      footnote:
        'Prices indicative for international patients. AUD shown at 1 AUD ≈ Rp 12,500 (May 2026). Recovery stays, transfers and 12-month telehealth follow-up included on most surgical packages.',
      viewAllLabel: 'View full pricing',
      viewAllHref: '/pricing',
    },
  },
  {
    slug: 'home-surgeons-view',
    data: {
      eyebrow: 'Meet the Surgeons',
      leadSurgeonEyebrow: 'Lead Surgeon',
      leadBody:
        'ISAPS-member plastic surgeon with seven years of practice in Bali, fellowship-trained in maxillofacial surgery in Japan, specializing in facial aesthetics, body contouring and breast surgery. Cited by patients for a conservative, natural-result approach.',
      leadStat1Label: 'Trained',
      leadStat1Value: 'Indonesia · Japan',
      leadStat2Label: 'Specialty',
      leadStat2Value: 'Facial Aesthetics',
      leadStat3Label: 'Society',
      leadStat3Value: 'ISAPS Member',
      leadCtaLabel: 'Read the full profile',
      associatesEyebrow: 'Associate Surgeons & Aestheticians',
      teamCaption: 'The Cosmedic Team',
    },
  },
  {
    slug: 'home-gallery-view',
    data: {
      eyebrow: 'Before & After Results',
      headingItalic: 'Quietly',
      headingPart2: 'transformative.',
      lede: 'Three signature results from our facial repertoire.',
      ctaLabel: 'View the full gallery',
      ctaHref: '/results#results',
    },
  },
  {
    slug: 'home-journey-view',
    data: {
      eyebrow: 'Your Journey',
      headingPart1: 'From enquiry to',
      headingAccent: 'homecoming.',
      ctaLabel: 'Read the full journey',
      ctaHref: '/journey',
    },
  },
  {
    slug: 'home-stories-view',
    data: {
      eyebrow: 'Verified Patient Stories',
      headingItalic: 'Stories,',
      headingPart2: 'not slogans.',
      // NOTE: visible live default includes an inline link to /results#stories.
      // The CMS field is plain text; the link is preserved via the route fallback
      // when this field is empty. Seeding empty preserves byte-identical output.
      // Set this in admin to override (plain text, no HTML).
      ctaLabel: 'Read more stories',
      ctaHref: '/results#stories',
    },
  },
]

async function main(): Promise<void> {
  const payload = await getPayload({ config })
  try {
    for (const g of HOME_GLOBALS) {
      await (payload as unknown as {
        updateGlobal: (args: { slug: string; data: Record<string, unknown> }) => Promise<unknown>
      }).updateGlobal({
        slug: g.slug,
        data: g.data,
      })
      payload.logger.info(`[seed-home] global ${g.slug} ← seeded`)
    }

    payload.logger.info(`[seed-home] done — ${HOME_GLOBALS.length} home globals`)
  } catch (err) {
    payload.logger.error({ err }, '[seed-home] failed')
    process.exitCode = 1
  } finally {
    const db = payload.db as { destroy?: () => Promise<void> }
    if (typeof db.destroy === 'function') await db.destroy()
    process.exit(process.exitCode ?? 0)
  }
}

main()

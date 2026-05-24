/**
 * Phase R1 — seed the 3 new Contact-bucket Globals AND patch Settings with
 * the values the hardcoded packages/web/src/routes/contact/ContactPage.tsx
 * was rendering before the rewire. Idempotent: writes via updateGlobal,
 * safe to re-run.
 *
 * Values copied verbatim from ContactPage.tsx as of commit c4fafe5 so the
 * post-R1 /contact render is byte-identical to the pre-R1 render (Rule:
 * no loose data on the frontend UI should be lost during the plumbing
 * change).
 *
 * User-confirmed Settings values (2026-05-24):
 *   - contactPhone     = "+62 361 3000 911"        (was orphan +62-361-761-263)
 *   - contactEmail     = "concierge@bimccosmedic.com" (was orphan cosmedic@bimcbali.com)
 *   - pressEmail       = "press@bimccosmedic.com"  (new field, new value)
 *   - whatsappNumber   = "+62 811 3888 911"        (was +6281339001911 — different live wa.me target)
 *   - address          = 4-line split (BIMC Hospital Nusa Dua / Kawasan ITDC Blok D / Nusa Dua 80363 / Bali, Indonesia)
 *   - hours            = Mon–Sat 09:00–19:00 / Sun by appointment
 *
 * NOTE: changing whatsappNumber alters the wa.me link target on the
 * floating bubble + footer Connect link sitewide. Explicitly confirmed by
 * user 2026-05-24 — the previously displayed /contact number wins because
 * "loose data on frontend UI it should remain" overrides bubble continuity.
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

async function main(): Promise<void> {
  const payload = await getPayload({ config })
  try {
    // 1. contact-hero — verbatim from ContactPage.tsx hero
    /* eslint-disable @typescript-eslint/no-explicit-any */
    await (payload as any).updateGlobal({
      slug: 'contact-hero',
      data: {
        chapter: 'Chapter VIII — Plan Your Journey',
        titleA: 'Begin, when',
        titleB: 'you are ready.',
        lede: 'Write to us in your own time, in your own words. A concierge will reply within twenty-four hours, in English or Bahasa Indonesia. There is no obligation — and no pressure — to proceed.',
        imageHue: 3,
        imageLabel: 'PLAN YOUR JOURNEY',
        breadcrumbLabel: 'Plan Your Journey',
      },
    })
    payload.logger.info('[seed-r1] contact-hero ← seeded')

    // 2. contact-enquiry-section — verbatim from the "Enquiry" section copy
    await (payload as any).updateGlobal({
      slug: 'contact-enquiry-section',
      data: {
        eyebrow: 'The Enquiry',
        headingPre: 'Tell us a little',
        headingItalic: 'about you.',
        intro: 'Every field is optional. Tell us only what you are comfortable telling us today — we will follow up with the rest.',
        directLines: {
          sectionLabel: 'Direct lines',
          conciergeLabel: 'Concierge',
          whatsappLabel: 'WhatsApp',
          emailLabel: 'Email',
          pressLabel: 'Press',
        },
        trustLine: 'Held in confidence. Reviewed by a credentialed surgeon. We reply within 24 hours.',
      },
    })
    payload.logger.info('[seed-r1] contact-enquiry-section ← seeded')

    // 3. contact-visit-section — verbatim from the "Visit" section copy
    await (payload as any).updateGlobal({
      slug: 'contact-visit-section',
      data: {
        eyebrow: 'Visit',
        headingPre: 'Find us in',
        headingItalic: 'Nusa Dua.',
        body: 'Within the BIMC Hospital Nusa Dua, on the southernmost reach of Bali. Twelve minutes from Ngurah Rai International Airport.',
        mapImageLabel: 'NUSA DUA · BALI',
        mapImageHue: 4,
        openInMapsLabel: 'Open in Maps',
        getDirectionsLabel: 'Get directions',
        clinicHoursLabel: 'Hours · Clinic',
        conciergeHoursLabel: 'Hours · Concierge',
        conciergeHoursValue: 'Twenty-four hours\nReplies within ten minutes',
      },
    })
    payload.logger.info('[seed-r1] contact-visit-section ← seeded')

    // 4. Patch Settings — overwrite orphan values with the strings the
    // hardcoded /contact page was rendering, so the rewire is visually
    // byte-identical. See file header for the per-field rationale.
    const currentSettings = await (payload as any).findGlobal({ slug: 'settings' })
    await (payload as any).updateGlobal({
      slug: 'settings',
      data: {
        ...currentSettings,
        contactPhone: '+62 361 3000 911',
        contactEmail: 'concierge@bimccosmedic.com',
        pressEmail: 'press@bimccosmedic.com',
        whatsappNumber: '+62 811 3888 911',
        addressLine1: 'BIMC Hospital Nusa Dua',
        addressLine2: 'Kawasan ITDC Blok D',
        city: 'Nusa Dua',
        postalCode: '80363',
        country: 'Bali, Indonesia',
        hoursMonFri: 'Mon – Sat · 09:00 – 19:00',
        hoursSatSun: 'Sun · By appointment',
      },
    })
    /* eslint-enable @typescript-eslint/no-explicit-any */
    payload.logger.info('[seed-r1] settings ← patched (phone/email/whatsapp/address/hours)')

    payload.logger.info('[seed-r1] done')
  } catch (err) {
    payload.logger.error({ err }, '[seed-r1] failed')
    process.exitCode = 1
  } finally {
    const db = payload.db as { destroy?: () => Promise<void> }
    if (typeof db.destroy === 'function') await db.destroy()
    process.exit(process.exitCode ?? 0)
  }
}

main()

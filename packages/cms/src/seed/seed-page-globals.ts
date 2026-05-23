/**
 * Seed the 14 Payload Globals that replaced the old Pages collection
 * (2026-05-22 admin restructure). Each holds editorial hero + sections
 * for one static route. Admin nav mirrors the site IA one-to-one.
 */

import type { Payload } from 'payload'
import { upsertGlobal } from './seed-helpers'

const PAGE_GLOBALS: Array<{ globalSlug: string; data: Record<string, unknown> }> = [
  {
    globalSlug: 'home-page',
    data: {
      slug: 'home', route: '/', title: 'Home',
      chapterTitle: { a: 'Considered work', b: 'in considered hands.' },
      tagline: 'BIMC CosMedic · Nusa Dua, Bali',
      lede: 'Plastic surgery and aesthetic medicine for international medical tourists, performed by ISAPS-credentialed surgeons in Indonesia\'s first ACHSI-accredited hospital.',
    },
  },
  {
    globalSlug: 'journey-page',
    data: {
      slug: 'journey', route: '/journey', title: 'Your Journey',
      chapterTitle: { a: 'Your journey,', b: 'considered.' },
      tagline: 'Chapter III — Your Journey',
      lede: 'From first enquiry to the morning you fly home — what to expect, when, and why we sequence it this way.',
    },
  },
  {
    globalSlug: 'contact-page',
    data: {
      slug: 'contact', route: '/contact', title: 'Contact',
      chapterTitle: { a: 'Speak with', b: 'our concierge.' },
      tagline: 'Chapter VII — Contact',
      lede: 'Send an enquiry, schedule a video consult, or visit us in Nusa Dua. We reply within one business day.',
    },
  },
  {
    globalSlug: 'gallery-page',
    data: {
      slug: 'gallery', route: '/gallery', title: 'Gallery',
      chapterTitle: { a: 'Considered', b: 'before-and-after.' },
      tagline: 'Chapter IV — Gallery',
      lede: 'A small, curated set of before-and-after composites. Further imagery is available privately during consultation.',
    },
  },
  {
    globalSlug: 'stories-page',
    data: {
      slug: 'stories', route: '/stories', title: 'Stories',
      chapterTitle: { a: 'Patient', b: 'stories.' },
      tagline: 'Chapter V — Stories',
      lede: 'In the words of patients who have travelled here. Names changed where requested.',
    },
  },
  {
    globalSlug: 'pricing-page',
    data: {
      slug: 'pricing', route: '/pricing', title: 'Pricing',
      chapterTitle: { a: 'Transparent', b: 'pricing.' },
      tagline: 'Chapter VI — Pricing',
      lede: 'The full clinic catalogue — surgical, non-surgical, machine, injection, and BTL services. Every line item editable in the CMS, sourced from our 2025/2026 price list.',
    },
  },
  {
    globalSlug: 'press-page',
    data: {
      slug: 'press', route: '/press', title: 'Press',
      chapterTitle: { a: 'Press &', b: 'recognition.' },
      tagline: 'Chapter VIII — Press',
      lede: 'Editorial mentions, accreditations, and awards.',
    },
  },
  {
    globalSlug: 'privacy-page',
    data: {
      slug: 'privacy', route: '/privacy', title: 'Privacy',
      chapterTitle: { a: 'Privacy', b: 'policy.' },
      tagline: 'Privacy & Data',
      lede: 'How we handle your information. Aligned with Indonesian PDP Law (UU PDP 2022) and the GDPR for visitors from the EU.',
    },
  },
  {
    globalSlug: 'treatments-page',
    data: {
      slug: 'treatments', route: '/treatments', title: 'Treatments Index',
      chapterTitle: { a: 'Six', b: 'disciplines.' },
      tagline: 'Chapter II — Treatments',
      lede: 'Plastic surgery and aesthetic medicine, organised by discipline.',
    },
  },
  {
    globalSlug: 'surgeons-page',
    data: {
      slug: 'surgeons', route: '/surgeons', title: 'Surgeons Index',
      chapterTitle: { a: 'Considered', b: 'hands.' },
      tagline: 'Chapter — Surgeons',
      lede: 'Eight ISAPS- and BPRS-credentialed practitioners across plastic surgery and aesthetic medicine.',
    },
  },
  {
    globalSlug: 'results-page',
    data: {
      slug: 'results', route: '/results', title: 'Results',
      chapterTitle: { a: 'Considered', b: 'outcomes.' },
      tagline: 'Chapter IV — Results',
      lede: 'A selection of before-and-after cases from BIMC CosMedic, captioned with procedure and recovery timeline.',
    },
  },
  {
    globalSlug: 'recovery-stays-page',
    data: {
      slug: 'recovery-stays', route: '/recovery-stays', title: 'Recovery Stays',
      chapterTitle: { a: 'Recover', b: 'in Bali.' },
      tagline: 'Chapter — Recovery Stays',
      lede: 'Private villas and partner properties for pre- and post-operative stays, vetted for accessibility, quiet, and proximity to BIMC Nusa Dua.',
    },
  },
  {
    globalSlug: 'video-consult-page',
    data: {
      slug: 'video-consult', route: '/video-consult', title: 'Video Consult',
      chapterTitle: { a: 'Meet before', b: 'you travel.' },
      tagline: 'Chapter — Video Consult',
      lede: 'A 30-minute encrypted video consultation with your surgeon, before you book flights.',
    },
  },
  {
    globalSlug: 'blog-page',
    data: {
      slug: 'blog', route: '/blog', title: 'Blog Index',
      chapterTitle: { a: 'Notes &', b: 'briefings.' },
      tagline: 'Editorial',
      lede: 'Clinical notes, patient briefings, and considered reading on the work we do.',
    },
  },
]

export async function seedPageGlobals(payload: Payload): Promise<void> {
  for (const pg of PAGE_GLOBALS) {
    await upsertGlobal(payload, pg.globalSlug, { ...pg.data, publishStatus: 'published' })
  }
  payload.logger.info(`[seed] page globals=${PAGE_GLOBALS.length}`)
}

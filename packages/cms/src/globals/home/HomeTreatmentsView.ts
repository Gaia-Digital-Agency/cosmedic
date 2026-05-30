import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'

export const HomeTreatmentsView: GlobalConfig = {
  slug: 'home-treatments-view',
  label: 'Sections',
  admin: {
    group: 'Homepage',
    hidden: true,
    description:
      'Section headings and intro paragraphs for the four content sections on /: Treatments, Pricing, Gallery, and Stories.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    // ── Treatments ────────────────────────────────────────────────────────────
    {
      name: 'treatments',
      label: 'Treatments',
      type: 'group',
      admin: { description: 'Treatments section on /.' },
      fields: [
        { name: 'lede', label: 'Intro paragraph', type: 'textarea', localized: true,
          defaultValue: 'A complete repertoire under one roof, sequenced into a single journey. Treatments may be combined; recovery is always private.' },
        { name: 'eyebrow', label: 'Label above heading', type: 'text', localized: true, defaultValue: 'Treatments' },
        { name: 'heading', label: 'Heading', type: 'group', fields: [
          { name: 'a', type: 'text', localized: true, defaultValue: 'Six disciplines,' },
          { name: 'b', type: 'text', localized: true, defaultValue: 'one sanctuary.' },
        ] },
      ],
    },
    // ── Pricing ───────────────────────────────────────────────────────────────
    {
      name: 'pricing',
      label: 'Pricing',
      type: 'group',
      admin: { description: 'Pricing teaser section on /.' },
      fields: [
        { name: 'lede', label: 'Intro paragraph', type: 'textarea', localized: true,
          defaultValue: 'Indicative starting prices in IDR (with AUD equivalent). Final quotes are tailored after consultation. Travel, accommodation and concierge can be packaged.' },
        { name: 'eyebrow', label: 'Label above heading', type: 'text', localized: true, defaultValue: 'Pricing · Starting From' },
        { name: 'heading', label: 'Heading', type: 'group', fields: [
          { name: 'a', type: 'text', localized: true, defaultValue: 'Transparent' },
          { name: 'b', type: 'text', localized: true, defaultValue: 'pricing.' },
        ] },
        { name: 'footnote', type: 'textarea', localized: true,
          defaultValue: 'Prices indicative for international patients. AUD shown at 1 AUD ≈ Rp 12,500 (May 2026). Recovery stays, transfers and 12-month telehealth follow-up included on most surgical packages.' },
        { name: 'viewAllLabel', type: 'text', localized: true, defaultValue: 'View full pricing' },
      ],
    },
    // ── Gallery ───────────────────────────────────────────────────────────────
    {
      name: 'gallery',
      label: 'Gallery',
      type: 'group',
      admin: { description: 'Before & After gallery teaser section on /.' },
      fields: [
        { name: 'lede', label: 'Intro paragraph', type: 'textarea', localized: true,
          defaultValue: 'Three signature results from our facial repertoire.' },
        { name: 'eyebrow', label: 'Label above heading', type: 'text', localized: true, defaultValue: 'Before & After Results' },
        { name: 'heading', label: 'Heading', type: 'group', fields: [
          { name: 'a', type: 'text', localized: true, defaultValue: 'Quietly' },
          { name: 'b', type: 'text', localized: true, defaultValue: 'transformative.' },
        ] },
        { name: 'ctaLabel', type: 'text', localized: true, defaultValue: 'View the full gallery' },
      ],
    },
    // ── Stories ───────────────────────────────────────────────────────────────
    {
      name: 'stories',
      label: 'Stories',
      type: 'group',
      admin: { description: 'Patient stories teaser section on /.' },
      fields: [
        { name: 'lede', label: 'Intro paragraph', type: 'textarea', localized: true,
          defaultValue: 'Verified reviews from international patients. Video testimonials and Google reviews on our full stories page.' },
        { name: 'eyebrow', label: 'Label above heading', type: 'text', localized: true, defaultValue: 'Verified Patient Stories' },
        { name: 'heading', label: 'Heading', type: 'group', fields: [
          { name: 'a', type: 'text', localized: true, defaultValue: 'Stories,' },
          { name: 'b', type: 'text', localized: true, defaultValue: 'not slogans.' },
        ] },
        { name: 'ctaLabel', type: 'text', localized: true, defaultValue: 'Read more stories' },
      ],
    },
  ],
}

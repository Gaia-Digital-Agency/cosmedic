import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'

export const HomeIntro: GlobalConfig = {
  slug: 'home-intro',
  label: 'Editorial',
  admin: {
    group: 'Homepage',
    description:
      'Editorial content for the Intro pull-quote, Journey teaser, and Trust Strip stat tiles on /.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    {
      name: 'intro',
      type: 'group',
      admin: { description: '"Our Approach" pull-quote and two-column paragraphs.' },
      fields: [
        { name: 'eyebrow', label: 'Label above heading', type: 'text', localized: true, defaultValue: 'Our Approach' },
        { name: 'pullQuoteBefore', type: 'text', localized: true, defaultValue: 'Aesthetic medicine, considered with the same ' },
        { name: 'pullQuoteAccent', type: 'text', localized: true, defaultValue: 'care ' },
        { name: 'pullQuoteAfter', type: 'text', localized: true, defaultValue: 'as the island that surrounds it.' },
        { name: 'col1', type: 'textarea', localized: true,
          defaultValue: "For almost three decades, BIMC CosMedic has practiced cosmetic surgery the way Bali has practiced hospitality." },
        { name: 'col2', type: 'textarea', localized: true,
          defaultValue: "Our centre sits within Indonesia's most accredited international hospital. Eight ISAPS- and FICS-credentialed specialists work alongside a concierge team." },
      ],
    },
    {
      name: 'journey',
      type: 'group',
      admin: { description: 'Journey teaser section on /.' },
      fields: [
        { name: 'eyebrow', label: 'Label above heading', type: 'text', localized: true, defaultValue: 'Your Journey' },
        { name: 'heading', type: 'group', fields: [
          { name: 'a', type: 'text', localized: true, defaultValue: 'From enquiry to' },
          { name: 'b', type: 'text', localized: true, defaultValue: 'homecoming.' },
        ] },
        { name: 'ctaLabel', type: 'text', localized: true, defaultValue: 'Read the full journey' },
      ],
    },
    {
      name: 'trustStrip',
      type: 'array',
      admin: { description: 'The 4 stat tiles directly under the homepage hero.' },
      fields: [
        { name: 'number', type: 'text', required: true, admin: { description: 'e.g. "28", "2,400+".' } },
        { name: 'label', type: 'text', required: true, localized: true, admin: { description: 'Caption beneath the number.' } },
        { name: 'sourceNote', type: 'text', admin: { description: 'Provenance note. Not rendered on site.' } },
      ],
    },
  ],
}

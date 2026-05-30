import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'

export const HomePlace: GlobalConfig = {
  slug: 'home-place',
  label: 'Place',
  admin: {
    group: 'Homepage',
    description:
      '"Recover in paradise" / Place section on /. Eyebrow, two-line heading, body paragraph, the 4 lettered rows (A./B./C./D.), and the bottom CTA.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    { name: 'eyebrow', label: 'Label above heading', type: 'text', localized: true, defaultValue: 'Recovery in Bali',
      admin: { description: 'Section eyebrow.', hidden: true } },
    {
      name: 'heading', type: 'group',
      admin: { description: 'Two-part heading. Part A renders roman; part B renders italic.' },
      fields: [
        { name: 'a', type: 'text', localized: true, defaultValue: 'Recover',
          admin: { description: 'Roman part. e.g. "Recover".' } },
        { name: 'b', type: 'text', localized: true, defaultValue: 'in paradise.',
          admin: { description: 'Italic accent. e.g. "in paradise.".' } },
      ],
    },
    { name: 'body', type: 'textarea', localized: true,
      defaultValue:
        'Nusa Dua sits on the southernmost reach of Bali — quiet beaches, soft afternoons, and the kind of warm, careful hospitality that has made the island synonymous with rest. We work with a small portfolio of villas and resorts, hand-selected for privacy and post-operative comfort.',
      admin: { description: 'Body paragraph beneath the heading.' } },
    {
      name: 'rows',
      type: 'array',
      admin: { description: '4 lettered rows below the body. Letter = "A.", text = the descriptor.' },
      fields: [
        { name: 'letter', type: 'text', required: true,
          admin: { description: 'Mono letter (e.g. "A.").' } },
        { name: 'text', type: 'text', required: true, localized: true,
          admin: { description: 'Descriptor text.' } },
      ],
    },
    { name: 'ctaLabel', type: 'text', localized: true, defaultValue: 'View recovery stays',
      admin: { description: 'Bottom CTA label.' } },
    { name: 'ctaHref', type: 'text', defaultValue: '/recovery-stays',
      admin: { description: 'Where the bottom CTA links.', hidden: true } },
    { name: 'image', type: 'upload', relationTo: 'media',
      admin: { description: 'Lead image for the "Recover in paradise" section (left column). 1200×1500 portrait orientation works best. Falls back to a placeholder when empty.' } },
  ],
}

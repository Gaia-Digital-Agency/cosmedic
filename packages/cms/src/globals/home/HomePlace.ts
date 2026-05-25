import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { apiWarningField } from '../../lib/api-warning'

export const HomePlace: GlobalConfig = {
  slug: 'home-place',
  label: 'h. Place',
  admin: {
    group: 'a. Homepage',
    description:
      '"Recover in paradise" / Place section on /. Eyebrow, two-line heading, body paragraph, the 4 lettered rows (A./B./C./D.), and the bottom CTA.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    { name: 'eyebrow', type: 'text', defaultValue: 'Recovery in Bali',
      admin: { description: 'Section eyebrow.' } },
    { name: 'headingPart1', type: 'text', defaultValue: 'Recover',
      admin: { description: 'First line of the heading (roman).' } },
    { name: 'headingAccent', type: 'text', defaultValue: 'in paradise.',
      admin: { description: 'Second line of the heading (italic accent).' } },
    { name: 'body', type: 'textarea',
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
        { name: 'text', type: 'text', required: true,
          admin: { description: 'Descriptor text.' } },
      ],
    },
    { name: 'ctaLabel', type: 'text', defaultValue: 'View recovery stays',
      admin: { description: 'Bottom CTA label.' } },
    { name: 'ctaHref', type: 'text', defaultValue: '/recovery-stays',
      admin: { description: 'Where the bottom CTA links.' } },
  ],
}

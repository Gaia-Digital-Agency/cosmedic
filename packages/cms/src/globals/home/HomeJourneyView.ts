import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { apiWarningField } from '../../lib/api-warning'

export const HomeJourneyView: GlobalConfig = {
  slug: 'home-journey-view',
  label: 'Journey View',
  admin: {
    group: 'Homepage',
    description:
      'Section chrome for the Journey teaser on / (5-step preview). The 5 steps themselves are NOT edited here — source: **f. Journey → Journey Steps** (order, number, title, body). This item controls only the eyebrow, heading, and CTA.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    { name: 'eyebrow', label: 'Label above heading', type: 'text', defaultValue: 'Your Journey',
      admin: { description: 'Section eyebrow.' } },
    {
      name: 'heading', type: 'group',
      admin: { description: 'Two-part heading. Part A renders roman; part B renders italic.' },
      fields: [
        { name: 'a', type: 'text', defaultValue: 'From enquiry to',
          admin: { description: 'Roman part. e.g. "From enquiry to".' } },
        { name: 'b', type: 'text', defaultValue: 'homecoming.',
          admin: { description: 'Italic accent. e.g. "homecoming.".' } },
      ],
    },
    { name: 'ctaLabel', type: 'text', defaultValue: 'Read the full journey',
      admin: { description: 'Bottom CTA label.' } },
    { name: 'ctaHref', type: 'text', defaultValue: '/journey',
      admin: { description: 'Where the bottom CTA links.' } },
  ],
}

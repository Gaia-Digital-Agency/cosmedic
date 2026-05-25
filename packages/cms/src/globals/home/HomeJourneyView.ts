import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { apiWarningField } from '../../lib/api-warning'

export const HomeJourneyView: GlobalConfig = {
  slug: 'home-journey-view',
  label: 'q. Journey-View',
  admin: {
    group: 'a. Homepage',
    description:
      'Section chrome for the Journey teaser on / (5-step preview). The 5 steps themselves are NOT edited here — source: **f. Journey → Journey Steps** (order, number, title, body). This item controls only the eyebrow, heading, and CTA.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    { name: 'eyebrow', type: 'text', defaultValue: 'Your Journey',
      admin: { description: 'Section eyebrow.' } },
    { name: 'headingPart1', type: 'text', defaultValue: 'From enquiry to',
      admin: { description: 'First part of the heading (roman).' } },
    { name: 'headingAccent', type: 'text', defaultValue: 'homecoming.',
      admin: { description: 'Italic accent part of the heading.' } },
    { name: 'ctaLabel', type: 'text', defaultValue: 'Read the full journey',
      admin: { description: 'Bottom CTA label.' } },
    { name: 'ctaHref', type: 'text', defaultValue: '/journey',
      admin: { description: 'Where the bottom CTA links.' } },
  ],
}

import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { apiWarningField } from '../../lib/api-warning'

export const HomeGalleryView: GlobalConfig = {
  slug: 'home-gallery-view',
  label: 'Gallery View',
  admin: {
    group: 'Homepage',
    description:
      'Section chrome for the Before & After teaser on /. The before/after cards themselves are NOT edited here — source: **d. Results → g. Before-After-Cases** (rows where isFeatured=true). This item controls only the eyebrow, heading, lede, and view-all CTA.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    { name: 'eyebrow', label: 'Label above heading', type: 'text', defaultValue: 'Before & After Results',
      admin: { description: 'Section eyebrow.' } },
    { name: 'headingItalic', type: 'text', defaultValue: 'Quietly',
      admin: { description: 'First word of the heading (italic).' } },
    { name: 'headingPart2', type: 'text', defaultValue: 'transformative.',
      admin: { description: 'Remainder of the heading (roman).' } },
    { name: 'lede', label: 'Intro paragraph', type: 'textarea',
      defaultValue: 'Three signature results from our facial repertoire.',
      admin: { description: 'Intro paragraph for this section.' } },
    { name: 'ctaLabel', type: 'text', defaultValue: 'View the full gallery',
      admin: { description: 'Bottom CTA label.' } },
    { name: 'ctaHref', type: 'text', defaultValue: '/results#results',
      admin: { description: 'Where the bottom CTA links.' } },
  ],
}

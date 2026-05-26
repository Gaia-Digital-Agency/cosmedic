import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { apiWarningField } from '../../lib/api-warning'

export const TreatmentsIndexSection: GlobalConfig = {
  slug: 'treatments-index-section',
  label: 'c. Index',
  admin: {
    group: 'Treatments',
    description:
      '"An Index" section on /treatments — section eyebrow, heading, lede, and the "Read more →" link template that appears under every discipline card. The discipline cards themselves are sourced from b. Treatments → e. Disciplines.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    { name: 'eyebrow', label: 'Label above heading', type: 'text', defaultValue: 'An Index',
      admin: { description: 'Small-caps eyebrow above the section title.' } },
    { name: 'heading', type: 'text', defaultValue: 'Browse by discipline.',
      admin: { description: 'Section heading (h2).' } },
    { name: 'lede', label: 'Intro paragraph', type: 'textarea',
      defaultValue:
        'Each discipline is led by a specialist surgeon and supported by the full clinical, recovery, and concierge team. Treatments may be combined across disciplines on a single visit.',
      admin: { description: 'Lede paragraph below the heading.' } },
    { name: 'readMoreLabel', type: 'text', defaultValue: 'Read more',
      admin: { description: 'Hover-CTA text that appears under each discipline card. Rendered as "<label> →".' } },
    { name: 'readMoreArrow', type: 'text', defaultValue: '→',
      admin: { description: 'Glyph appended after the read-more label.' } },
  ],
}

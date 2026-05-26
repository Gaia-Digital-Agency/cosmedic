import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { apiWarningField } from '../../lib/api-warning'

export const HomeTreatmentsView: GlobalConfig = {
  slug: 'home-treatments-view',
  label: 'm. Treatments-View',
  admin: {
    group: 'Homepage',
    description:
      'Section chrome for the Treatments preview on / (the 6 discipline cards row). The cards themselves are NOT edited here — source: **b. Treatments → e. Disciplines** (rank, title, image, body). This item controls only the eyebrow, heading and lede.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    { name: 'eyebrow', type: 'text', defaultValue: 'Treatments',
      admin: { description: 'Section eyebrow above the heading.' } },
    { name: 'headingPart1', type: 'text', defaultValue: 'Six disciplines,',
      admin: { description: 'First line of the heading (roman).' } },
    { name: 'headingPart2', type: 'text', defaultValue: 'one sanctuary.',
      admin: { description: 'Second line of the heading (italic).' } },
    { name: 'lede', type: 'textarea',
      defaultValue:
        'A complete repertoire under one roof, sequenced into a single journey. Treatments may be combined; recovery is always private.',
      admin: { description: 'Section lede beneath the heading.' } },
  ],
}

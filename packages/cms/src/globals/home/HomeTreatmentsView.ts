import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'

export const HomeTreatmentsView: GlobalConfig = {
  slug: 'home-treatments-view',
  label: 'Treatments View',
  admin: {
    hidden: true,
    group: 'Homepage',
    description:
      'Section chrome for the Treatments preview on / (the 6 discipline cards row). The cards themselves are NOT edited here — source: **b. Treatments → e. Disciplines** (rank, title, image, body). This item controls only the eyebrow, heading and lede.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    { name: 'lede', label: 'Intro paragraph', type: 'textarea', localized: true,
      defaultValue:
        'A complete repertoire under one roof, sequenced into a single journey. Treatments may be combined; recovery is always private.',
      admin: { description: 'Intro paragraph (D8 — lede before eyebrow for section views).' } },
    { name: 'eyebrow', label: 'Label above heading', type: 'text', localized: true, defaultValue: 'Treatments',
      admin: { description: 'Section eyebrow above the heading.' } },
    {
      name: 'heading', type: 'group',
      admin: { description: 'Two-part section heading. Part A renders roman; part B renders italic.' },
      fields: [
        { name: 'a', type: 'text', localized: true, defaultValue: 'Six disciplines,',
          admin: { description: 'First part (roman). e.g. "Six disciplines,".' } },
        { name: 'b', type: 'text', localized: true, defaultValue: 'one sanctuary.',
          admin: { description: 'Second part (italic). e.g. "one sanctuary.".' } },
      ],
    },
  ],
}

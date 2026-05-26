import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { apiWarningField } from '../../lib/api-warning'

export const TreatmentsStats: GlobalConfig = {
  slug: 'treatments-stats',
  label: 'Stats',
  admin: {
    group: 'Treatments',
    description:
      'StatsRow at the bottom of /treatments — 4 numbered tiles (number + label). Single source of truth for the /treatments stats strip.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    {
      name: 'stats',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      admin: { description: 'Stat tiles rendered left-to-right. Each row gets a large number and a label below it.' },
      defaultValue: [
        { number: '28', label: 'Years in Bali' },
        { number: '2,400+', label: 'Procedures yearly' },
        { number: '8', label: 'Specialists on faculty' },
        { number: '96%', label: 'Patient satisfaction' },
      ],
      fields: [
        { name: 'number', type: 'text', required: true,
          admin: { description: 'Display number, e.g. "28", "2,400+", "96%".' } },
        { name: 'label', type: 'text', required: true,
          admin: { description: 'Caption beneath the number, e.g. "Years in Bali".' } },
      ],
    },
  ],
}

import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'

export const JourneyStats: GlobalConfig = {
  slug: 'journey-stats',
  label: 'Stats',
  admin: {
    group: 'Journey',
    description:
      'The 3-tile stats row at the bottom of /journey (e.g. "24h Reply to first enquiry · 45min Initial consultation · 12mo Follow-up programme"). Edit rows here; order = display order.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    {
      name: 'stats',
      type: 'array',
      minRows: 1,
      admin: { description: 'Each row renders as one stat block (big number + small caption).' },
      fields: [
        {
          name: 'number',
          type: 'text',
          required: true,
          admin: { description: 'Big serif number, e.g. "24h", "45min", "12mo".' },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
          admin: { description: 'Caption under the number, e.g. "Reply to first enquiry".' },
        },
        {
          name: 'italic',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description:
              'Render the number in italic (matches the /recovery-stays "5–21" + "All" cells). Leave off for /journey defaults.',
          },
        },
      ],
    },
  ],
}

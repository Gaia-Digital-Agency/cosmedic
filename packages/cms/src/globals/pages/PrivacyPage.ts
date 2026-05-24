import type { GlobalConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { pageFields } from './_pageFields'

export const PrivacyPage: GlobalConfig = {
  slug: 'privacy-page',
  label: 'h. Privacy',
  admin: {
    group: 'h. About',
    description:
      'Editorial content for /privacy: hero, the three metadata lines (last updated / version / reading time), and the optional intro paragraph. The 10 numbered legal sections are edited in i. Privacy-Sections.',
  },
  access: { read: publishedOrAuthed, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    ...pageFields(),
    {
      name: 'lastUpdatedDate',
      type: 'text',
      defaultValue: 'Last updated · 12 May 2026',
      admin: {
        description:
          'Left-most metadata line, e.g. "Last updated · 12 May 2026". Edit when the policy is revised.',
      },
    },
    {
      name: 'versionLine',
      type: 'text',
      defaultValue: 'Version 4.2 · Annual review cycle',
      admin: { description: 'Middle metadata line, e.g. "Version 4.2 · Annual review cycle".' },
    },
    {
      name: 'readingTimeLine',
      type: 'text',
      defaultValue: 'Read in 6 minutes',
      admin: { description: 'Right-most metadata line, e.g. "Read in 6 minutes".' },
    },
    {
      name: 'introParagraph',
      type: 'textarea',
      admin: {
        description:
          'Optional intro paragraph rendered above the numbered legal sections. Leave blank if not needed.',
      },
    },
  ],
}

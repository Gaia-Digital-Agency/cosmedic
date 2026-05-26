import type { GlobalConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { pageFields } from './_pageFields'

export const TreatmentsPage: GlobalConfig = {
  slug: 'treatments-page',
  label: 'Main',
  admin: {
    group: 'Treatments',
    description:
      'Page meta + SEO + CmsExtraBlocks slot for /treatments. The editorial hero / stats / index chrome lives in the dedicated b. Hero, c. Index, and d. Stats globals; discipline cards render from e. Disciplines.',
  },
  access: { read: publishedOrAuthed, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: pageFields(),
}

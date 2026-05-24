import type { GlobalConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { pageFields } from './_pageFields'

export const TreatmentsPage: GlobalConfig = {
  slug: 'treatments-page',
  admin: {
    group: 'b. Treatments',
    description: 'Editorial content for /treatments (index of disciplines). Discipline cards are rendered from the Disciplines collection.',
  },
  access: { read: publishedOrAuthed, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: pageFields(),
}

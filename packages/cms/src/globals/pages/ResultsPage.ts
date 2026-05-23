import type { GlobalConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { pageFields } from './_pageFields'

export const ResultsPage: GlobalConfig = {
  slug: 'results-page',
  admin: {
    group: '4 Results',
    description: 'Editorial content for /results: hero + body. The case grid is rendered from BeforeAfterCases collection.',
  },
  access: { read: publishedOrAuthed, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: pageFields(),
}

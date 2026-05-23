import type { GlobalConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { pageFields } from './_pageFields'

export const GalleryPage: GlobalConfig = {
  slug: 'gallery-page',
  admin: {
    group: 'Results',
    description: 'Editorial content for /gallery: hero + body. The curated B&A grid is rendered from BeforeAfterCases (featured).',
  },
  access: { read: publishedOrAuthed, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: pageFields(),
}

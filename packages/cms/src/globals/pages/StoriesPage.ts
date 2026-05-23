import type { GlobalConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { pageFields } from './_pageFields'

export const StoriesPage: GlobalConfig = {
  slug: 'stories-page',
  admin: {
    group: 'Journey',
    description: 'Editorial content for /stories: hero + body. Patient narratives are rendered from the Stories collection.',
  },
  access: { read: publishedOrAuthed, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: pageFields(),
}

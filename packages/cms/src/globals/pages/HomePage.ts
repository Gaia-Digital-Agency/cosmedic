import type { GlobalConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { pageFields } from './_pageFields'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  admin: {
    group: 'Homepage',
    description: 'Editorial content for / (home): hero chapter title, tagline, lede, hero image, and composable body sections.',
  },
  access: { read: publishedOrAuthed, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: pageFields(),
}

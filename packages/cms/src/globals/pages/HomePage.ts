import type { GlobalConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { pageFields } from './_pageFields'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Main',
  admin: {
    hidden: true,
    group: 'Homepage',
    description:
      'Page-level shell for / (home): title, slug, route, publishStatus, generic sections array, and the SEO group. All section editorial lives in the dedicated Homepage globals (Hero, Intro, Lead Magnet, Place + the 6 view sections).',
  },
  access: { read: publishedOrAuthed, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    ...pageFields({ hideHero: true }),
  ],
}

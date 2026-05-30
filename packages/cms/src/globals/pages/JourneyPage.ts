import type { GlobalConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { pageFields } from './_pageFields'

export const JourneyPage: GlobalConfig = {
  slug: 'journey-page',
  label: 'Main',
  admin: {
    group: 'Journey',
    hidden: true,
    description:
      'Page meta + SEO + optional CmsExtraBlocks slot for /journey. The hero, the 7 patient-journey steps, and the bottom 3 stat tiles live in b. Hero / c. Steps / d. Stats — edit them there.',
  },
  access: { read: publishedOrAuthed, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: pageFields({ hideHero: true }),
}

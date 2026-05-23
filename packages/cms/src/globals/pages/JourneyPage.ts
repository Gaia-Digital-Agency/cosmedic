import type { GlobalConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { pageFields } from './_pageFields'

export const JourneyPage: GlobalConfig = {
  slug: 'journey-page',
  admin: {
    group: 'Journey',
    description: 'Editorial content for /journey: hero + body. The 6-step process is rendered from JourneySteps.',
  },
  access: { read: publishedOrAuthed, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: pageFields(),
}

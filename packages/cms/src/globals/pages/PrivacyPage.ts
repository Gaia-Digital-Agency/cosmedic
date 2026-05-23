import type { GlobalConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { pageFields } from './_pageFields'

export const PrivacyPage: GlobalConfig = {
  slug: 'privacy-page',
  admin: {
    group: '1 Homepage',
    description: 'Editorial content for /privacy: hero + privacy policy body sections (Indonesian PDP Law + GDPR alignment).',
  },
  access: { read: publishedOrAuthed, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: pageFields(),
}

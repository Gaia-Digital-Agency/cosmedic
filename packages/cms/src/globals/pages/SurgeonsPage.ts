import type { GlobalConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { pageFields } from './_pageFields'

export const SurgeonsPage: GlobalConfig = {
  slug: 'surgeons-page',
  admin: {
    group: 'Doctors',
    description: 'Editorial content for /surgeons (index of doctors). Doctor cards are rendered from the Surgeons collection.',
  },
  access: { read: publishedOrAuthed, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: pageFields(),
}

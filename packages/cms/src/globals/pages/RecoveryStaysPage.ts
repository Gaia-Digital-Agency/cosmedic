import type { GlobalConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { pageFields } from './_pageFields'

export const RecoveryStaysPage: GlobalConfig = {
  slug: 'recovery-stays-page',
  dbName: 'rec_stays_pg',
  admin: {
    group: 'f. Journey',
    description: 'Editorial content for /recovery-stays: hero + body. Villa cards are rendered from the RecoveryStays collection.',
  },
  access: { read: publishedOrAuthed, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: pageFields(),
}

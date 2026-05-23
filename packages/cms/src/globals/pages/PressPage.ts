import type { GlobalConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { pageFields } from './_pageFields'

export const PressPage: GlobalConfig = {
  slug: 'press-page',
  admin: {
    group: '1 Homepage',
    description: 'Editorial content for /press: hero + body sections. Press mentions and awards are listed via the PressMentions / Awards collections.',
  },
  access: { read: publishedOrAuthed, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: pageFields(),
}

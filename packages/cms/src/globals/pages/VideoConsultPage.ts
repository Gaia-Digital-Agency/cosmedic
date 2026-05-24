import type { GlobalConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { pageFields } from './_pageFields'

export const VideoConsultPage: GlobalConfig = {
  slug: 'video-consult-page',
  dbName: 'vid_consult_pg',
  label: 'h. Video-Consult',
  admin: {
    group: 'g. Contact',
    description: 'Editorial content for /video-consult: hero + body. Pre-travel encrypted video consultation landing page.',
  },
  access: { read: publishedOrAuthed, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: pageFields(),
}

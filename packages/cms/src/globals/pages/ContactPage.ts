import type { GlobalConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { pageFields } from './_pageFields'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'a. Main',
  admin: {
    group: 'g. Contact',
    description: 'Page meta + SEO + extra block sections for /contact. The hero is edited in b. Hero, the enquiry section in c. Enquiry-Section, and the visit section in d. Visit-Section. Use the sections block-array here only for additional editor-defined content blocks.',
  },
  access: { read: publishedOrAuthed, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: pageFields(),
}

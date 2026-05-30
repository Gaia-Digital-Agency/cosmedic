import type { GlobalConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { pageFields } from './_pageFields'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Main',
  admin: {
    group: 'Contact',
    hidden: true,
    description: 'Page meta + SEO + extra block sections for /contact. The hero is edited in Hero, the enquiry section in Enquiry Section, and the visit section in Visit Section. Use the sections block-array here only for additional editor-defined content blocks.',
  },
  access: { read: publishedOrAuthed, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: pageFields({ hideHero: true }),
}

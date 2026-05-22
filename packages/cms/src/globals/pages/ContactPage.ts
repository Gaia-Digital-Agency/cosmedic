import type { GlobalConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { pageFields } from './_pageFields'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  admin: {
    group: 'Contact',
    description: 'Editorial content for /contact: hero + body. Clinic info (address/hours/phone) lives on the Settings global; enquiry form behaviour on FormDefaults.',
  },
  access: { read: publishedOrAuthed, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: pageFields(),
}

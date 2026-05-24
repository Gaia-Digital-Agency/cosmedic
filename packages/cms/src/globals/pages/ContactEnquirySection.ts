import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { apiWarningField } from '../../lib/api-warning'

export const ContactEnquirySection: GlobalConfig = {
  slug: 'contact-enquiry-section',
  label: 'c. Enquiry-Section',
  admin: {
    group: 'g. Contact',
    description: 'Left column of the /contact "Enquiry" section: section eyebrow, two-line heading, intro paragraph, Direct-Lines block labels, and trust line. The phone / WhatsApp / email / press values rendered under "Direct lines" are NOT edited here — source: a. Homepage → Settings → contactPhone, whatsappNumber, contactEmail, pressEmail. Edit them once in Settings and they update on /contact, in the footer, and on the floating WhatsApp button.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    { name: 'eyebrow', type: 'text', defaultValue: 'The Enquiry',
      admin: { description: 'Small-caps eyebrow above the heading.' } },
    { name: 'headingPre', type: 'text', defaultValue: 'Tell us a little',
      admin: { description: 'First part of the section heading (roman).' } },
    { name: 'headingItalic', type: 'text', defaultValue: 'about you.',
      admin: { description: 'Second part of the heading rendered in italic serif.' } },
    { name: 'intro', type: 'textarea',
      defaultValue: 'Every field is optional. Tell us only what you are comfortable telling us today — we will follow up with the rest.',
      admin: { description: 'Intro paragraph under the heading.' } },
    {
      name: 'directLines',
      type: 'group',
      admin: { description: 'Labels for the "Direct lines" block. The actual phone / WhatsApp / email / press VALUES come from Settings — only the labels are edited here.' },
      fields: [
        { name: 'sectionLabel', type: 'text', defaultValue: 'Direct lines',
          admin: { description: 'Mono caption above the four contact rows.' } },
        { name: 'conciergeLabel', type: 'text', defaultValue: 'Concierge',
          admin: { description: 'Label on the concierge phone row.' } },
        { name: 'whatsappLabel', type: 'text', defaultValue: 'WhatsApp',
          admin: { description: 'Label on the WhatsApp row.' } },
        { name: 'emailLabel', type: 'text', defaultValue: 'Email',
          admin: { description: 'Label on the general email row.' } },
        { name: 'pressLabel', type: 'text', defaultValue: 'Press',
          admin: { description: 'Label on the press email row.' } },
      ],
    },
    { name: 'trustLine', type: 'textarea',
      defaultValue: 'Held in confidence. Reviewed by a credentialed surgeon. We reply within 24 hours.',
      admin: { description: 'Italic line shown next to the "Send enquiry" button at the bottom of the form.' } },
  ],
}

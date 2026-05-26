import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { apiWarningField } from '../../lib/api-warning'

export const HomeLeadMagnet: GlobalConfig = {
  slug: 'home-lead-magnet',
  label: 'Lead Magnet',
  admin: {
    group: 'Homepage',
    description:
      'Lead-magnet section on / (The Bali Recovery Guide). Editable cover-card strings, body eyebrow / heading / lede, the email-capture form labels, and the success + fineprint copy. Form posts to /api/enquiry with sourceCta=lead-magnet-newsletter.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    { name: 'coverEyebrow', type: 'text', defaultValue: 'A guide · 24 pages · PDF',
      admin: { description: 'Eyebrow at the top of the cover card.' } },
    { name: 'coverLine1', type: 'text', defaultValue: 'The Bali',
      admin: { description: 'Cover-card title line 1 (roman).' } },
    { name: 'coverLine2', type: 'text', defaultValue: 'Recovery',
      admin: { description: 'Cover-card title line 2 (italic).' } },
    { name: 'coverLine3', type: 'text', defaultValue: 'Guide.',
      admin: { description: 'Cover-card title line 3 (roman).' } },
    { name: 'coverFoot1', type: 'text', defaultValue: 'BIMC CosMedic',
      admin: { description: 'Bottom-left of the cover card.' } },
    { name: 'coverFoot2', type: 'text', defaultValue: 'MMXXVI',
      admin: { description: 'Bottom-right of the cover card.' } },
    { name: 'bodyEyebrow', type: 'text', defaultValue: 'Free Guide',
      admin: { description: 'Eyebrow on the right-side body column.' } },
    { name: 'headingPart1', type: 'text', defaultValue: 'What to expect from',
      admin: { description: 'First part of the body heading (roman).' } },
    { name: 'headingAccent', type: 'text', defaultValue: 'recovery in Bali.',
      admin: { description: 'Italic accent part of the body heading.' } },
    { name: 'lede', label: 'Intro paragraph', type: 'textarea',
      defaultValue:
        'A 24-page editorial guide written by our concierge team — covering recovery timelines for the ten most-requested procedures, what to pack, what villas suit which surgeries, and the pace of a typical fortnight in Nusa Dua.',
      admin: { description: 'Body lede beneath the heading.' } },
    { name: 'formPlaceholder', type: 'text', defaultValue: 'Your email address',
      admin: { description: 'Email input placeholder.' } },
    { name: 'submitLabel', type: 'text', defaultValue: 'Send Guide →',
      admin: { description: 'Submit-button label.' } },
    { name: 'successHeading', type: 'text', defaultValue: '✓ Sent',
      admin: { description: 'Heading shown in the success state.' } },
    { name: 'successBody', type: 'text', defaultValue: 'Check your inbox — the guide is on its way.',
      admin: { description: 'Body shown in the success state.' } },
    { name: 'fineprint', type: 'text', defaultValue: 'One email. No marketing list. Unsubscribe anytime.',
      admin: { description: 'Fineprint below the form.' } },
  ],
}

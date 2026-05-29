import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'

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
    { name: 'coverImage', type: 'upload', relationTo: 'media',
      admin: { description: 'Optional cover image (e.g. PDF cover photo). When set, replaces the CSS text card entirely. Leave blank to keep the default styled cover.' } },
    { name: 'coverEyebrow', type: 'text', defaultValue: 'A guide · 24 pages · PDF',
      admin: { description: 'Eyebrow at the top of the cover card.', hidden: true } },
    { name: 'coverTitle', label: 'Cover title', type: 'textarea',
      defaultValue: 'The Bali\nRecovery\nGuide.',
      admin: { description: 'Cover card title — one line per row. Line 1 = roman, line 2 = italic, line 3 = roman.' } },
    { name: 'coverFooter', label: 'Cover footer', type: 'text',
      defaultValue: 'BIMC CosMedic · MMXXVI',
      admin: { description: 'Footer line on the cover card. Separate two items with · if needed.' } },
    { name: 'bodyEyebrow', type: 'text', defaultValue: 'Free Guide',
      admin: { description: 'Eyebrow on the right-side body column.', hidden: true } },
    {
      name: 'heading', type: 'group',
      admin: { description: 'Two-part body heading. Part A renders roman; part B renders italic.' },
      fields: [
        { name: 'a', type: 'text', defaultValue: 'What to expect from',
          admin: { description: 'Roman part. e.g. "What to expect from".' } },
        { name: 'b', type: 'text', defaultValue: 'recovery in Bali.',
          admin: { description: 'Italic accent. e.g. "recovery in Bali.".' } },
      ],
    },
    { name: 'lede', label: 'Intro paragraph', type: 'textarea',
      defaultValue:
        'A 24-page editorial guide written by our concierge team — covering recovery timelines for the ten most-requested procedures, what to pack, what villas suit which surgeries, and the pace of a typical fortnight in Nusa Dua.',
      admin: { description: 'Body paragraph beneath the heading.' } },
    { name: 'formPlaceholder', type: 'text', defaultValue: 'Your email address',
      admin: { description: 'Email input placeholder.' } },
    { name: 'submitLabel', type: 'text', defaultValue: 'Send Guide →',
      admin: { description: 'Submit-button label.' } },
    { name: 'successHeading', type: 'text', defaultValue: '✓ Sent',
      admin: { description: 'Heading shown in the success state.', hidden: true } },
    { name: 'successBody', type: 'text', defaultValue: 'Check your inbox — the guide is on its way.',
      admin: { description: 'Body shown in the success state.', hidden: true } },
    { name: 'fineprint', type: 'text', defaultValue: 'One email. No marketing list. Unsubscribe anytime.',
      admin: { description: 'Fineprint below the form.', hidden: true } },
  ],
}

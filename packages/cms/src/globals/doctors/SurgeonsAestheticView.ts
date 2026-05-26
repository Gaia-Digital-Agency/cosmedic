import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { apiWarningField } from '../../lib/api-warning'

export const SurgeonsAestheticView: GlobalConfig = {
  slug: 'surgeons-aesthetic-view',
  label: 'f. Aesthetic-Medicine-View',
  admin: {
    group: 'Doctors',
    description:
      'Section chrome for the Aesthetic Medicine grid on /surgeons. The cards are NOT edited here — they come from **c. Surgeons** filtered to group=aesthetic-medicine. This item controls only the eyebrow / heading / lede.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    { name: 'eyebrow', label: 'Label above heading', type: 'text', required: true,
      admin: { description: 'Section eyebrow, e.g. "Aesthetic Medicine".' } },
    { name: 'headingA', type: 'text',
      admin: { description: 'Roman prefix before the italic word in the heading.' } },
    { name: 'headingItalic', type: 'text', required: true,
      admin: { description: 'The italic word(s) inside the heading. e.g. "Quiet".' } },
    { name: 'headingB', type: 'text', required: true,
      admin: { description: 'Roman suffix after the italic word. e.g. " non-surgical.".' } },
    { name: 'lede', label: 'Intro paragraph', type: 'textarea', required: true,
      admin: { description: 'Single-paragraph section lede.' } },
  ],
}

import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { apiWarningField } from '../../lib/api-warning'

export const SurgeonsAestheticView: GlobalConfig = {
  slug: 'surgeons-aesthetic-view',
  label: 'Aesthetic Medicine View',
  admin: {
    group: 'Experts',
    description:
      'Section chrome for the Aesthetic Medicine grid on /surgeons. The cards are NOT edited here — they come from **c. Surgeons** filtered to group=aesthetic-medicine. This item controls only the eyebrow / heading / lede.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    { name: 'lede', label: 'Intro paragraph', type: 'textarea', required: true,
      admin: { description: 'Section intro paragraph (D8 — lede before eyebrow).' } },
    { name: 'eyebrow', label: 'Label above heading', type: 'text', required: true,
      admin: { description: 'Section eyebrow, e.g. "Aesthetic Medicine".' } },
    {
      name: 'heading', type: 'group',
      admin: { description: 'Roman portion of the section heading. headingA + headingB merged per D1.' },
      fields: [
        { name: 'a', type: 'text',
          admin: { description: 'Roman prefix before the italic word. Usually blank for aesthetic section.' } },
        { name: 'b', type: 'text', required: true,
          admin: { description: 'Roman suffix after the italic word. e.g. " non-surgical.".' } },
      ],
    },
    { name: 'headingItalic', type: 'text', required: true,
      admin: { description: 'The italic word(s) inserted into the heading. e.g. "Quiet".' } },
  ],
}

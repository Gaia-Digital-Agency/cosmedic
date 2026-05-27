import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'

export const SurgeonsPlasticView: GlobalConfig = {
  slug: 'surgeons-plastic-view',
  label: 'Plastic Surgery View',
  admin: {
    group: 'Experts',
    description:
      'Section chrome for the Plastic Surgery grid on /surgeons (the non-lead plastic-surgery doctors). The cards are NOT edited here — they come from **c. Surgeons** filtered to group=plastic-surgery, excluding the lead. This item controls only the eyebrow / heading / lede.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    { name: 'lede', label: 'Intro paragraph', type: 'textarea', required: true,
      admin: { description: 'Section intro paragraph (D8 — lede before eyebrow).' } },
    { name: 'eyebrow', label: 'Label above heading', type: 'text', required: true,
      admin: { description: 'Section eyebrow, e.g. "Plastic Surgery".' } },
    {
      name: 'heading', type: 'group',
      admin: { description: 'Roman portion of the section heading (the non-italic parts combined). headingA + headingB merged into one field per D1.' },
      fields: [
        { name: 'a', type: 'text',
          admin: { description: 'Roman prefix before the italic word. Leave blank if heading starts with the italic word.' } },
        { name: 'b', type: 'text', required: true,
          admin: { description: 'Roman suffix after the italic word. e.g. " & aesthetic.".' } },
      ],
    },
    { name: 'headingItalic', type: 'text', required: true,
      admin: { description: 'The italic word(s) inserted into the heading. e.g. "Reconstructive".' } },
  ],
}

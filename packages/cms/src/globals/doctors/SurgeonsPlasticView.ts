import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { apiWarningField } from '../../lib/api-warning'

export const SurgeonsPlasticView: GlobalConfig = {
  slug: 'surgeons-plastic-view',
  label: 'e. Plastic-Surgery-View',
  admin: {
    group: 'Doctors',
    description:
      'Section chrome for the Plastic Surgery grid on /surgeons (the non-lead plastic-surgery doctors). The cards are NOT edited here — they come from **c. Surgeons** filtered to group=plastic-surgery, excluding the lead. This item controls only the eyebrow / heading / lede.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    { name: 'eyebrow', label: 'Label above heading', type: 'text', required: true,
      admin: { description: 'Section eyebrow, e.g. "Plastic Surgery".' } },
    { name: 'headingA', type: 'text',
      admin: { description: 'Roman prefix before the italic word in the heading. Leave blank if the heading starts with the italic word.' } },
    { name: 'headingItalic', type: 'text', required: true,
      admin: { description: 'The italic word(s) inside the heading. e.g. "Reconstructive".' } },
    { name: 'headingB', type: 'text', required: true,
      admin: { description: 'Roman suffix after the italic word. e.g. " & aesthetic.".' } },
    { name: 'lede', label: 'Intro paragraph', type: 'textarea', required: true,
      admin: { description: 'Single-paragraph section lede.' } },
  ],
}

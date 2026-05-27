import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { apiWarningField } from '../../lib/api-warning'

export const SurgeonsLeadView: GlobalConfig = {
  slug: 'surgeons-lead-view',
  label: 'Lead View',
  admin: {
    group: 'Experts',
    description:
      'Section chrome for the Lead Plastic Surgeon panel on /surgeons. The surgeon shown is NOT edited here — that comes from **c. Surgeons** (the first record by sortOrder). This item controls only the eyebrow / block eyebrow / stat labels / CTA label.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    { name: 'sectionEyebrow', type: 'text', required: true,
      admin: { description: 'Eyebrow above the section, e.g. "Lead Plastic Surgeon".' } },
    { name: 'blockEyebrow', type: 'text', required: true,
      admin: { description: 'Eyebrow above the surgeon name inside the block, e.g. "Lead Surgeon".' } },
    { name: 'statLabelTrained', type: 'text', required: true, defaultValue: 'Trained',
      admin: { description: 'Label above the first stat (training summary).' } },
    { name: 'statLabelSpecialty', type: 'text', required: true, defaultValue: 'Specialty',
      admin: { description: 'Label above the second stat (primary specialty).' } },
    { name: 'statLabelDistinction', type: 'text', required: true, defaultValue: 'Distinction',
      admin: { description: 'Label above the third stat (membership / distinction).' } },
    { name: 'ctaLabel', type: 'text', required: true, defaultValue: 'Read the full profile',
      admin: { description: 'Button text linking to the lead surgeon\'s detail page.' } },
  ],
}

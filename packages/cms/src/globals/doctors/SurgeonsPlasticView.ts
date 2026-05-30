import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'

export const SurgeonsPlasticView: GlobalConfig = {
  slug: 'surgeons-plastic-view',
  label: 'Sections',
  admin: {
    group: 'Experts',
    description:
      'Section chrome for all three editorial sections on /experts: Lead Surgeon panel, Plastic Surgery grid, and Aesthetic Medicine grid.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    // ── Lead Surgeon section ──────────────────────────────────────────────
    {
      name: 'lead',
      label: 'Lead Surgeon',
      type: 'group',
      admin: { description: 'Lead Surgeon panel on /experts.' },
      fields: [
        { name: 'sectionEyebrow', type: 'text', required: true, localized: true,
          admin: { description: 'Eyebrow above the section, e.g. "Lead Plastic Surgeon".' } },
        { name: 'blockEyebrow', type: 'text', required: true, localized: true,
          admin: { description: 'Eyebrow above the surgeon name inside the block, e.g. "Lead Surgeon".' } },
        { name: 'statLabelTrained', type: 'text', required: true, localized: true, defaultValue: 'Trained' },
        { name: 'statLabelSpecialty', type: 'text', required: true, localized: true, defaultValue: 'Specialty' },
        { name: 'statLabelDistinction', type: 'text', required: true, localized: true, defaultValue: 'Distinction' },
        { name: 'ctaLabel', type: 'text', required: true, localized: true, defaultValue: 'Read the full profile' },
      ],
    },
    // ── Plastic Surgery section ───────────────────────────────────────────
    {
      name: 'plasticSurgery',
      label: 'Plastic Surgery',
      type: 'group',
      admin: { description: 'Plastic Surgery section on /experts.' },
      fields: [
        { name: 'lede', label: 'Intro paragraph', type: 'textarea', required: true, localized: true,
          admin: { description: 'Section intro paragraph.' } },
        { name: 'eyebrow', label: 'Label above heading', type: 'text', required: true, localized: true,
          admin: { description: 'Section eyebrow, e.g. "Plastic Surgery".' } },
        {
          name: 'heading', label: 'Heading', type: 'group',
          admin: { description: 'Section heading (roman prefix + italic word + roman suffix).' },
          fields: [
            { name: 'a', type: 'text', localized: true,
              admin: { description: 'Roman prefix before the italic word.' } },
            { name: 'b', type: 'text', required: true, localized: true,
              admin: { description: 'Roman suffix after the italic word.' } },
          ],
        },
        { name: 'headingItalic', type: 'text', required: true, localized: true,
          admin: { description: 'The italic word(s) in the heading.' } },
      ],
    },
    // ── Aesthetic Medicine section ────────────────────────────────────────
    {
      name: 'aestheticMedicine',
      label: 'Aesthetic Medicine',
      type: 'group',
      admin: { description: 'Aesthetic Medicine section on /experts.' },
      fields: [
        { name: 'lede', label: 'Intro paragraph', type: 'textarea', required: true, localized: true,
          admin: { description: 'Section intro paragraph.' } },
        { name: 'eyebrow', label: 'Label above heading', type: 'text', required: true, localized: true,
          admin: { description: 'Section eyebrow, e.g. "Aesthetic Medicine".' } },
        {
          name: 'heading', label: 'Heading', type: 'group',
          admin: { description: 'Section heading (roman prefix + italic word + roman suffix).' },
          fields: [
            { name: 'a', type: 'text', localized: true,
              admin: { description: 'Roman prefix before the italic word.' } },
            { name: 'b', type: 'text', required: true, localized: true,
              admin: { description: 'Roman suffix after the italic word.' } },
          ],
        },
        { name: 'headingItalic', type: 'text', required: true, localized: true,
          admin: { description: 'The italic word(s) in the heading.' } },
      ],
    },
  ],
}

import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'

export const SurgeonsPlasticView: GlobalConfig = {
  slug: 'surgeons-plastic-view',
  label: 'Surgery & Aesthetics',
  admin: {
    group: 'Experts',
    description:
      'Section chrome for both surgeon grids on /experts — Plastic Surgery section and Aesthetic Medicine section. Cards come from **Surgeons** collection filtered by group. Edit the heading and intro paragraph for each section here.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    // ── Plastic Surgery section ───────────────────────────────────────────
    {
      name: 'plasticSurgery',
      type: 'group',
      admin: { description: 'Plastic Surgery section on /experts.' },
      fields: [
        { name: 'lede', label: 'Intro paragraph', type: 'textarea', required: true, localized: true,
          admin: { description: 'Section intro paragraph.' } },
        { name: 'eyebrow', label: 'Label above heading', type: 'text', required: true, localized: true,
          admin: { description: 'Section eyebrow, e.g. "Plastic Surgery".' } },
        {
          name: 'heading', type: 'group',
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
      type: 'group',
      admin: { description: 'Aesthetic Medicine section on /experts.' },
      fields: [
        { name: 'lede', label: 'Intro paragraph', type: 'textarea', required: true, localized: true,
          admin: { description: 'Section intro paragraph.' } },
        { name: 'eyebrow', label: 'Label above heading', type: 'text', required: true, localized: true,
          admin: { description: 'Section eyebrow, e.g. "Aesthetic Medicine".' } },
        {
          name: 'heading', type: 'group',
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

import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'

export const SurgeonsHero: GlobalConfig = {
  slug: 'surgeons-hero',
  label: 'Hero',
  admin: {
    group: 'Experts',
    description:
      'Hero (ChapterOpener) for the /surgeons index page. Single source of truth — used nowhere else.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    { name: 'breadcrumbLabel', type: 'text', defaultValue: 'Surgeons',
      admin: { description: 'Last segment in the breadcrumb trail. e.g. "Surgeons".', hidden: true } },
    { name: 'titleA', label: 'Title — Line A', type: 'text', required: true, localized: true,
      admin: { description: 'First line (roman). e.g. "Hands you".' } },
    { name: 'titleB', label: 'Title — Line B', type: 'text', required: true, localized: true,
      admin: { description: 'Second line (italic). e.g. "can trust.".' } },
    { name: 'lede', label: 'Intro paragraph', type: 'textarea', required: true, localized: true,
      admin: { description: 'Intro paragraph below the headline. Keep ~2 sentences.' } },
    { name: 'heroImage', type: 'upload', relationTo: 'media',
      admin: { description: 'Right-side image in the ChapterOpener. ~1200×1500 portrait crop preferred.' } },
    { name: 'imageHue', type: 'number', min: 0, max: 5, defaultValue: 2,
      admin: { description: 'Brand-palette colour token.', hidden: true } },
    { name: 'imageLabel', type: 'text', localized: true,
      admin: { description: 'Caption shown on the image card (uppercase mono), e.g. "THE PRACTITIONERS".' } },
    { name: 'chapter', type: 'text', required: true, localized: true,
      admin: { description: 'Eyebrow above the title, e.g. "Chapter III — The Practitioners".', hidden: true } },
    // ── Sections ─────────────────────────────────────────────────────────────
    {
      name: 'sections', label: 'Sections', type: 'group',
      admin: { description: 'Section chrome for all three /experts grids.' },
      fields: [
        { name: 'lead', label: 'Lead Surgeon', type: 'group', fields: [
          { name: 'sectionEyebrow', type: 'text', localized: true },
          { name: 'blockEyebrow', type: 'text', localized: true },
          { name: 'statLabelTrained', type: 'text', localized: true, defaultValue: 'Trained' },
          { name: 'statLabelSpecialty', type: 'text', localized: true, defaultValue: 'Specialty' },
          { name: 'statLabelDistinction', type: 'text', localized: true, defaultValue: 'Distinction' },
          { name: 'ctaLabel', type: 'text', localized: true, defaultValue: 'Read the full profile' },
        ] },
        { name: 'plasticSurgery', label: 'Plastic Surgery', type: 'group', fields: [
          { name: 'lede', label: 'Intro paragraph', type: 'textarea', localized: true },
          { name: 'eyebrow', type: 'text', localized: true },
          { name: 'headingA', type: 'text', localized: true },
          { name: 'headingB', type: 'text', localized: true },
          { name: 'headingItalic', type: 'text', localized: true },
        ] },
        { name: 'aestheticMedicine', label: 'Aesthetic Medicine', type: 'group', fields: [
          { name: 'lede', label: 'Intro paragraph', type: 'textarea', localized: true },
          { name: 'eyebrow', type: 'text', localized: true },
          { name: 'headingA', type: 'text', localized: true },
          { name: 'headingB', type: 'text', localized: true },
          { name: 'headingItalic', type: 'text', localized: true },
        ] },
      ],
    },
  ],
}

import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'

export const PricingCatalogueView: GlobalConfig = {
  slug: 'pricing-catalogue-view',
  label: 'Catalogue View',
  admin: {
    hidden: true,
    group: 'Treatments',
    description:
      'Chrome for the full clinic catalogue table on /pricing. The rows themselves are NOT edited here — they are sourced from b. Treatments → g. Procedures (filtered by catalogueGroup). This item controls only the section eyebrow / heading / intro template and the sheet, hair-zone, and injectable-category labels.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    { name: 'sectionEyebrow', type: 'text', defaultValue: 'Clinic catalogue · CMS-managed',
      admin: { description: 'Small-caps eyebrow above the section H2.' } },
    { name: 'headingRoman', type: 'text', defaultValue: 'The full',
      admin: { description: 'Roman text part of the section H2.' } },
    { name: 'headingItalic', type: 'text', defaultValue: 'clinic catalogue.',
      admin: { description: 'Italic accent text part of the section H2.' } },
    { name: 'introTemplate', type: 'textarea',
      defaultValue:
        'Every line item below is edited in Cosmedic CMS by the clinic team and sourced from our 2025/2026 price list. Surgical, machine, injection, and BTL hair-removal services — {n}+ items in total.',
      admin: {
        description:
          'Intro paragraph. Use the literal token "{n}" to inject the total catalogue row count.',
      } },
    {
      name: 'sheetLabels',
      type: 'group',
      admin: { description: 'Titles + subtitles for each of the 4 sheet sections.' },
      fields: [
        { name: 'surgicalTitle', type: 'text', defaultValue: 'Surgical Procedures' },
        { name: 'surgicalSubtitle', type: 'text', defaultValue: '2025 & 2026 pricing · IDR + AUD' },
        { name: 'machineTitle', type: 'text', defaultValue: 'Machine Treatments' },
        { name: 'machineSubtitle', type: 'text', defaultValue: 'Erbium · AFT · Q-switched · Pixel' },
        { name: 'injectionTitle', type: 'text', defaultValue: 'Injectable Catalogue' },
        { name: 'injectionSubtitle', type: 'text', defaultValue: 'Named brand pricing per ml / unit' },
        { name: 'btlTitle', type: 'text', defaultValue: 'BTL Hair Removal' },
        { name: 'btlSubtitle', type: 'text', defaultValue: 'Per area · per session' },
      ],
    },
    {
      name: 'hairZoneLabels',
      type: 'group',
      admin: { description: 'Section headings under the BTL sheet (one per bodyZone value on a Procedure).' },
      fields: [
        { name: 'face', type: 'text', defaultValue: 'Face' },
        { name: 'upperBody', type: 'text', defaultValue: 'Upper Body' },
        { name: 'lowerBody', type: 'text', defaultValue: 'Lower Body' },
        { name: 'packageZone', type: 'text', defaultValue: 'Packages' },
        { name: 'other', type: 'text', defaultValue: 'Other BTL' },
      ],
    },
    {
      name: 'injectableCategoryLabels',
      type: 'group',
      admin: { description: 'Section headings under the Injectable sheet (one per mainCategory value on a Procedure).' },
      fields: [
        { name: 'botulinumToxin', type: 'text', defaultValue: 'Botulinum Toxin' },
        { name: 'filler', type: 'text', defaultValue: 'Dermal Fillers' },
        { name: 'skinBooster', type: 'text', defaultValue: 'Skin Boosters' },
        { name: 'collagenStimulator', type: 'text', defaultValue: 'Collagen Stimulators' },
        { name: 'bioRemodeling', type: 'text', defaultValue: 'Bio-Remodeling' },
        { name: 'threadLift', type: 'text', defaultValue: 'Thread Lift' },
        { name: 'mesotherapy', type: 'text', defaultValue: 'Mesotherapy' },
        { name: 'hgh', type: 'text', defaultValue: 'HGH' },
        { name: 'other', type: 'text', defaultValue: 'Other' },
      ],
    },
  ],
}

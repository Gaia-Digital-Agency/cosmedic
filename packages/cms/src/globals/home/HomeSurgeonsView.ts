import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'

export const HomeSurgeonsView: GlobalConfig = {
  slug: 'home-surgeons-view',
  label: 'Surgeons',
  admin: {
    group: 'Homepage',
    description:
      'Full-width Surgeons banner on /. Controls the eyebrow, two-line heading (split on comma), body text, CTA label, and the group photo.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    // ── Team Heading ─────────────────────────────────────────────────────────
    {
      name: 'team', label: 'Team Heading', type: 'group',
      admin: { description: 'The main heading line on the Surgeons banner.' },
      fields: [
        { name: 'caption', label: 'Heading', type: 'text', localized: true, defaultValue: 'One team, one standard.',
          admin: { description: 'Two-line banner heading. Split on comma: before = roman, after = italic.' } },
      ],
    },
    // ── Body & CTA ───────────────────────────────────────────────────────────
    {
      name: 'lead', label: 'Body & CTA', type: 'group',
      admin: { description: 'Body paragraph and button below the heading.' },
      fields: [
        { name: 'body', label: 'Body text', type: 'textarea', localized: true,
          defaultValue: 'Our plastic and aesthetic doctors work side by side under one ACHSI-accredited roof.',
          admin: { description: 'Short body paragraph below the heading.' } },
        { name: 'ctaLabel', label: 'CTA label', type: 'text', localized: true, defaultValue: 'Meet all the doctors',
          admin: { description: 'Button label linking to /surgeons.' } },
      ],
    },
    // ── Photo ────────────────────────────────────────────────────────────────
    {
      name: 'group', label: 'Photo', type: 'group',
      admin: { description: 'Group photo of the surgical team.' },
      fields: [
        { name: 'photo', label: 'Group photo', type: 'upload', relationTo: 'media',
          admin: { description: 'Wide group photo of the surgical team.' } },
        { name: 'photoAlt', label: 'Photo alt text', type: 'text', localized: true,
          admin: { description: 'Accessibility alt text for the group photo.' } },
      ],
    },
    // Legacy fields (not rendered) ────────────────────────────────────────────
    { name: 'eyebrow', type: 'text', defaultValue: '8 Specialists', admin: { hidden: true } },
    // Legacy fields — no longer rendered in the banner. Hidden from editors.
    { name: 'leadSurgeonEyebrow', type: 'text', defaultValue: 'Lead Surgeon', admin: { hidden: true } },
    { name: 'leadStat1Label', type: 'text', defaultValue: 'Trained', admin: { hidden: true } },
    { name: 'leadStat1Value', type: 'text', defaultValue: 'Indonesia · Japan', admin: { hidden: true } },
    { name: 'leadStat2Label', type: 'text', defaultValue: 'Specialty', admin: { hidden: true } },
    { name: 'leadStat2Value', type: 'text', defaultValue: 'Facial Aesthetics', admin: { hidden: true } },
    { name: 'leadStat3Label', type: 'text', defaultValue: 'Society', admin: { hidden: true } },
    { name: 'leadStat3Value', type: 'text', defaultValue: 'ISAPS Member', admin: { hidden: true } },
    { name: 'associatesEyebrow', type: 'text', defaultValue: 'Associate Surgeons & Aestheticians', admin: { hidden: true } },
  ],
}

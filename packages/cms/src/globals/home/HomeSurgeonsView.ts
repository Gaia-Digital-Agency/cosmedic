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
    { name: 'eyebrow', label: 'Eyebrow', type: 'text', defaultValue: '8 Specialists',
      admin: { description: 'Small-caps line above the heading, e.g. "8 Specialists".' } },
    { name: 'teamCaption', label: 'Heading', type: 'text', defaultValue: 'One team, one standard.',
      admin: { description: 'Two-line banner heading. Use a comma to split: the text before the comma is line 1 (roman), after the comma is line 2 (italic). e.g. "One team, one standard."' } },
    { name: 'leadBody', label: 'Body text', type: 'textarea',
      defaultValue: 'Our plastic and aesthetic doctors work side by side under one ACHSI-accredited roof.',
      admin: { description: 'Short body paragraph below the heading.' } },
    { name: 'leadCtaLabel', label: 'CTA label', type: 'text', defaultValue: 'Meet all the doctors',
      admin: { description: 'Button label linking to /surgeons.' } },
    { name: 'groupPhoto', label: 'Group photo', type: 'upload', relationTo: 'media',
      admin: { description: 'Wide group photo of the surgical team. Falls back to /assets/surgeons/team-placeholder.webp.' } },
    { name: 'groupPhotoAlt', label: 'Photo alt text', type: 'text',
      admin: { description: 'Accessibility alt text for the group photo.' } },
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

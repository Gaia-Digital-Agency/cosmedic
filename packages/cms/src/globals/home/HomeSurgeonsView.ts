import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'

export const HomeSurgeonsView: GlobalConfig = {
  slug: 'home-surgeons-view',
  label: 'Surgeons View',
  admin: {
    group: 'Homepage',
    description:
      'Section chrome for the Surgeons strip on /. The lead-surgeon portrait + name + credentials are NOT edited here — source: **Doctors → Surgeons** (the row flagged lead=true). This item controls only the section eyebrow, the lead-surgeon-block eyebrow + body + 3 stat tiles + CTA label, and the bottom team-photo row (associates eyebrow / caption / group photo / alt).',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    { name: 'eyebrow', label: 'Label above heading', type: 'text', defaultValue: 'Meet the Surgeons',
      admin: { description: 'Top section eyebrow.' } },
    { name: 'leadSurgeonEyebrow', type: 'text', defaultValue: 'Lead Surgeon',
      admin: { description: 'Eyebrow above the lead surgeon name.' } },
    { name: 'leadBody', type: 'textarea',
      defaultValue:
        'ISAPS-member plastic surgeon with seven years of practice in Bali, fellowship-trained in maxillofacial surgery in Japan, specializing in facial aesthetics, body contouring and breast surgery. Cited by patients for a conservative, natural-result approach.',
      admin: { description: 'Body paragraph beneath the lead surgeon credentials.' } },
    { name: 'leadStat1Label', type: 'text', defaultValue: 'Trained',
      admin: { description: 'Stat tile 1 — label.' } },
    { name: 'leadStat1Value', type: 'text', defaultValue: 'Indonesia · Japan',
      admin: { description: 'Stat tile 1 — value.' } },
    { name: 'leadStat2Label', type: 'text', defaultValue: 'Specialty',
      admin: { description: 'Stat tile 2 — label.' } },
    { name: 'leadStat2Value', type: 'text', defaultValue: 'Facial Aesthetics',
      admin: { description: 'Stat tile 2 — value.' } },
    { name: 'leadStat3Label', type: 'text', defaultValue: 'Society',
      admin: { description: 'Stat tile 3 — label.' } },
    { name: 'leadStat3Value', type: 'text', defaultValue: 'ISAPS Member',
      admin: { description: 'Stat tile 3 — value.' } },
    { name: 'leadCtaLabel', type: 'text', defaultValue: 'Read the full profile',
      admin: { description: 'CTA label that links to /surgeons/<lead-slug>.' } },
    { name: 'associatesEyebrow', type: 'text', defaultValue: 'Associate Surgeons & Aestheticians',
      admin: { description: 'Eyebrow on the team-photo row (left side).' } },
    { name: 'teamCaption', type: 'text', defaultValue: 'The Cosmedic Team',
      admin: { description: 'Caption on the team-photo row (right side).' } },
    { name: 'groupPhoto', type: 'upload', relationTo: 'media',
      admin: { description: 'Single team group photo. Falls back to /assets/surgeons/team-placeholder.webp.' } },
    { name: 'groupPhotoAlt', type: 'text',
      admin: { description: 'Alt text for the team photo (accessibility). Falls back to the associatesEyebrow value when blank.' } },
  ],
}

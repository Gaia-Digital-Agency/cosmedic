import type { GlobalConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { pageFields } from './_pageFields'

export const SurgeonsPage: GlobalConfig = {
  slug: 'surgeons-page',
  label: 'Main',
  admin: {
    group: 'Doctors',
    description:
      'Page meta + SEO + extra editorial blocks slot for /surgeons. The hero (chapter / title / lede / hero image) is edited on **b. Hero** (same Bucket). The doctor cards come from **c. Surgeons** (Collection). The 3 section chrome items (Lead / Plastic Surgery / Aesthetic Medicine) are edited on **d / e / f -View** in the same Bucket.',
  },
  access: { read: publishedOrAuthed, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: pageFields({ hideHero: true }),
}

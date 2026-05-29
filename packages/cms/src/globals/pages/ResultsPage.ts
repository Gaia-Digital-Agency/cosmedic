import type { GlobalConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { pageFields } from './_pageFields'

export const ResultsPage: GlobalConfig = {
  slug: 'results-page',
  label: 'Main',
  admin: {
    hidden: true,
    group: 'Results',
    description:
      'Page meta + SEO + the optional CmsExtraBlocks slot for /results. The hero is edited in **b. Hero**; the two on-page sections are edited in **i. Featured-Cases-View** + **j. Stories-View**; the two CTAs are edited in **c. Library-Cta** + **d. Share-Cta**. The cards/rows come from g. Before-After-Cases and h. Patient-Stories.',
  },
  access: { read: publishedOrAuthed, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: pageFields({ hideHero: true }),
}

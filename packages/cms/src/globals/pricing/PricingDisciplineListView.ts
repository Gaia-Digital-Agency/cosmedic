import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'

export const PricingDisciplineListView: GlobalConfig = {
  slug: 'pricing-discipline-list-view',
  label: 'Discipline List View',
  admin: {
    group: 'Treatments',
    description:
      'Chrome for the discipline-grouped price list on /pricing. The rows themselves are NOT edited here — they are sourced from b. Treatments → e. Disciplines + f. Sub-Categories + g. Procedures. This item controls only the "On request" / "Included" / arrow labels.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    { name: 'sectionEyebrow', type: 'text',
      admin: { description: 'Optional eyebrow above the first discipline H2.' } },
    { name: 'onRequestLabel', type: 'text', defaultValue: 'On request',
      admin: { description: 'Right-hand label shown when a treatment row has no fixed price.' } },
    { name: 'includedLabel', type: 'text', defaultValue: 'Included',
      admin: { description: 'Right-hand label shown when a treatment is included or complimentary.' } },
    { name: 'arrowChar', type: 'text', defaultValue: '→',
      admin: { description: 'Glyph rendered at the end of each row as the "go to sub-category" cue.' } },
  ],
}

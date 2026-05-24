import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { apiWarningField } from '../../lib/api-warning'

export const ResultsStoriesView: GlobalConfig = {
  slug: 'results-stories-view',
  label: 'j. Stories-View',
  admin: {
    group: 'd. Results',
    description:
      'Section chrome for the "Stories, not slogans." view on /results. The patient-quote rows are NOT edited here — source: **h. Patient-Stories** (same Bucket). This item controls only the eyebrow, heading, and lede.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    { name: 'eyebrow', type: 'text', defaultValue: 'Stories',
      admin: { description: 'Section eyebrow above the heading.' } },
    { name: 'headingPre', type: 'text', defaultValue: 'Stories,',
      admin: { description: 'First line of the heading (roman).' } },
    { name: 'headingItalic', type: 'text', defaultValue: 'not slogans.',
      admin: { description: 'Italic continuation of the heading.' } },
    { name: 'lede', type: 'textarea',
      defaultValue:
        "Eight stories from the last two years of patients, shared with their permission. Editorial restraint over marketing copy — these are the patients we're proudest to have served.",
      admin: { description: 'Section lede paragraph under the heading.' } },
  ],
}

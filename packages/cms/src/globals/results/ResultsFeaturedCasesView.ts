import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { apiWarningField } from '../../lib/api-warning'

export const ResultsFeaturedCasesView: GlobalConfig = {
  slug: 'results-featured-cases-view',
  label: 'i. Featured-Cases-View',
  admin: {
    group: 'd. Results',
    description:
      'Section chrome for the "Four signature cases" view on /results. The before/after cards are NOT edited here — source: **g. Before-After-Cases** (same Bucket). This item controls only the eyebrow, heading, lede, filter-bar label, and count format.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    { name: 'eyebrow', type: 'text', defaultValue: 'Featured cases',
      admin: { description: 'Filter-bar / section eyebrow (left side of the filter bar above the grid).' } },
    { name: 'headingPre', type: 'text', defaultValue: 'Four signature cases,',
      admin: { description: 'First line of the heading (roman). Renders before the italic line.' } },
    { name: 'headingItalic', type: 'text', defaultValue: 'shared with permission.',
      admin: { description: 'Second line of the heading (italic).' } },
    { name: 'lede', type: 'textarea',
      defaultValue:
        'Each case represents a typical outcome, photographed at consistent angles and lighting, three to six months post-procedure.',
      admin: { description: 'Section lede paragraph under the heading.' } },
    { name: 'filterBarLabel', type: 'text', defaultValue: 'Featured cases',
      admin: { description: 'Left-side filter-bar label above the grid.' } },
    { name: 'countFormat', type: 'text', defaultValue: '{n} cases · facial',
      admin: { description: 'Right-side count label. Use {n} as a placeholder for the number of cases.' } },
  ],
}

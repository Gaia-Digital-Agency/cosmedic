import type { CollectionConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidationHooks } from '../lib/revalidate'
import { seoGroup, sortOrderField, publishStatusField } from '../lib/seo'
import { apiWarningField } from '../lib/api-warning'

export const Stories: CollectionConfig = {
  slug: 'stories',
  labels: { singular: 'Patient-Story', plural: 'h. Patient-Stories' },
  admin: {
    useAsTitle: 'patientLabel',
    defaultColumns: ['patientLabel', 'procedure', 'country', 'isFeatured'],
    group: 'd. Results',
    description: 'Patient testimonials. Renders on /stories (full set), /results (Stories-View section), and the homepage Stories section. Use anonymous labels (e.g. "Sarah, 42, Sydney") — no full names. Sidebar label is "h. Patient-Stories" to disambiguate from the /stories page Global (f. Stories) in the same Bucket; the underlying Payload slug remains `stories`.',
  },
  access: {
    read: readPublic,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  hooks: revalidationHooks(),
  fields: [
    apiWarningField,
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'patientLabel', type: 'text', required: true,
      admin: { description: 'Display name shown on /stories + /results, e.g. "Sarah K." or "Margaux D.". Use first name + last initial only — anonymous-friendly.' } },
    { name: 'country', type: 'text',
      admin: { description: 'City + country, e.g. "Sydney, Australia". Shown below the patient name on each story row.' } },
    { name: 'procedure', type: 'relationship', relationTo: 'procedures',
      admin: { description: 'Optional link to a Procedure record. Used for cross-linking; the displayed text on /stories comes from "procedureLabel" below.' } },
    { name: 'procedureLabel', type: 'text',
      admin: { description: 'Free-text procedure + year line shown under the city on each story row, e.g. "Rhinoplasty · 2025". Edit here — this is what the site renders.' } },
    { name: 'hue', type: 'number', min: 0, max: 5, defaultValue: 0,
      admin: { description: 'Brand-palette colour token (0-5) used as the placeholder gradient when the portrait fails to load on /stories + /results.' } },
    { name: 'portrait', type: 'upload', relationTo: 'media' },
    { name: 'quote', type: 'text', admin: { description: 'Pullquote (~1 sentence)' } },
    { name: 'body', type: 'richText', admin: { description: 'Full testimonial' } },
    { name: 'videoUrl', type: 'text', admin: { description: 'Optional video testimonial URL' } },
    { name: 'year', type: 'number' },
    { name: 'surgeon', type: 'relationship', relationTo: 'surgeons' },
    { name: 'isFeatured', type: 'checkbox', defaultValue: false },
    publishStatusField,
    seoGroup,
    sortOrderField,
  ],
}

import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { apiWarningField } from '../../lib/api-warning'

export const ContactVisitSection: GlobalConfig = {
  slug: 'contact-visit-section',
  label: 'd. Visit-Section',
  admin: {
    group: 'Contact',
    description: 'Lower section on /contact: section eyebrow, two-line heading, body paragraph, map image, "Open in Maps" / "Get directions" button labels, and Hours block. The address block, opening hours, and "Get directions" URL VALUES are NOT edited here — source: a. Homepage → Settings → addressLine1, addressLine2, city, postalCode, country, hoursMonFri, hoursSatSun, googleMapsUrl. Edit them once in Settings and they update on /contact and in the footer.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    { name: 'eyebrow', label: 'Label above heading', type: 'text', defaultValue: 'Visit',
      admin: { description: 'Small-caps eyebrow above the heading.' } },
    { name: 'headingPre', type: 'text', defaultValue: 'Find us in',
      admin: { description: 'First part of the section heading (roman).' } },
    { name: 'headingItalic', type: 'text', defaultValue: 'Nusa Dua.',
      admin: { description: 'Second part of the heading rendered in italic serif.' } },
    { name: 'body', type: 'textarea',
      defaultValue: 'Within the BIMC Hospital Nusa Dua, on the southernmost reach of Bali. Twelve minutes from Ngurah Rai International Airport.',
      admin: { description: 'Body paragraph above the address block.' } },
    { name: 'mapImage', type: 'upload', relationTo: 'media',
      admin: { description: 'Photo / map shown on the right side of the Visit section. Recommended ~1600×1200, 4:3 aspect.' } },
    { name: 'mapImageLabel', type: 'text', defaultValue: 'NUSA DUA · BALI',
      admin: { description: 'Caption label shown over the painted-SVG fallback if no map image is uploaded.' } },
    { name: 'mapImageHue', type: 'number', defaultValue: 4,
      admin: { description: 'Painted-SVG fallback hue when no map image is uploaded (0–6, brand palette).' } },
    { name: 'openInMapsLabel', type: 'text', defaultValue: 'Open in Maps',
      admin: { description: 'Text on the first ghost-style CTA below the address. Link target: Settings → googleMapsUrl.' } },
    { name: 'getDirectionsLabel', type: 'text', defaultValue: 'Get directions',
      admin: { description: 'Text on the second ghost-style CTA. Link target: Settings → googleMapsUrl.' } },
    { name: 'clinicHoursLabel', type: 'text', defaultValue: 'Hours · Clinic',
      admin: { description: 'Mono caption above the clinic-hours row. Hours values come from Settings → hoursMonFri + hoursSatSun.' } },
    { name: 'conciergeHoursLabel', type: 'text', defaultValue: 'Hours · Concierge',
      admin: { description: 'Mono caption above the concierge-hours row.' } },
    { name: 'conciergeHoursValue', type: 'textarea',
      defaultValue: 'Twenty-four hours\nReplies within ten minutes',
      admin: { description: 'Concierge-hours value (use a blank line to break onto a new line — no Markdown).' } },
  ],
}

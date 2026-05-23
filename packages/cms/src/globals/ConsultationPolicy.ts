import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidateGlobalAfterChange } from '../lib/revalidate'
import { apiWarningField } from '../lib/api-warning'

export const ConsultationPolicy: GlobalConfig = {
  slug: 'consultation-policy',
  admin: {
    group: 'Pricing',
    description: 'Consultation fee + waiver callout displayed at the bottom of /pricing (and selectable for /contact + procedure-detail pages). Sourced from pricelist.xlsx "Further Info" sheet.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    { name: 'feeIdr', type: 'number', defaultValue: 150000,
      admin: { description: 'Consultation fee in IDR. Shown as the bold number in the /pricing consultation-policy callout.' } },
    { name: 'feeAud', type: 'number',
      admin: { description: 'Optional AUD equivalent. When set, shown in italics next to the IDR amount.' } },
    { name: 'waiverConditionText', type: 'textarea',
      defaultValue: 'Consultation fee is waived if treatment is performed the same day.',
      admin: { description: 'Plain-text waiver explanation rendered after the fee amount.' } },
    {
      name: 'displayOn',
      type: 'select',
      hasMany: true,
      defaultValue: ['contact', 'procedure-detail', 'pricing'],
      admin: { description: 'Pick which routes should display this consultation policy block. Currently rendered on /pricing only; the other options are reserved for future placements.' },
      options: [
        { label: 'Contact page', value: 'contact' },
        { label: 'Procedure detail', value: 'procedure-detail' },
        { label: 'Pricing page', value: 'pricing' },
        { label: 'Hero', value: 'hero' },
      ],
    },
  ],
}

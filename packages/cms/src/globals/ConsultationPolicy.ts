import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidateGlobalAfterChange } from '../lib/revalidate'

export const ConsultationPolicy: GlobalConfig = {
  slug: 'consultation-policy',
  admin: { group: 'Brand', description: 'Consultation fee + waiver text from pricelist Further Info.' },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    { name: 'feeIdr', type: 'number', defaultValue: 150000 },
    { name: 'feeAud', type: 'number' },
    { name: 'waiverConditionText', type: 'textarea',
      defaultValue: 'Consultation fee is waived if treatment is performed the same day.' },
    {
      name: 'displayOn',
      type: 'select',
      hasMany: true,
      defaultValue: ['contact', 'procedure-detail', 'pricing'],
      options: [
        { label: 'Contact page', value: 'contact' },
        { label: 'Procedure detail', value: 'procedure-detail' },
        { label: 'Pricing page', value: 'pricing' },
        { label: 'Hero', value: 'hero' },
      ],
    },
  ],
}

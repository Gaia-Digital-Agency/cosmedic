import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'

export const Settings: GlobalConfig = {
  slug: 'settings',
  admin: {
    group: 'Site Settings',
    description: 'Site-wide configuration — name, currency rate, contact, hours, social, defaults.',
  },
  access: { read: readPublic, update: isAuthenticated },
  fields: [
    { name: 'siteName', type: 'text', defaultValue: 'BIMC CosMedic' },
    { name: 'siteTagline', type: 'text' },
    { name: 'defaultOgImage', type: 'upload', relationTo: 'media' },
    { name: 'defaultMetaDescription', type: 'textarea' },
    { name: 'audToIdrRate', type: 'number', defaultValue: 10500,
      admin: { description: 'AUD → IDR conversion rate. Per brand.pdf May 2026 = 10,500.' } },
    { name: 'roundIdrTo', type: 'number', defaultValue: 50000,
      admin: { description: 'Round computed IDR to nearest N. Default 50,000.' } },
    { name: 'contactEmail', type: 'text', defaultValue: 'cosmedic@bimcbali.com' },
    { name: 'contactPhone', type: 'text' },
    { name: 'whatsappNumber', type: 'text', defaultValue: '+62-XXX-XXXX-XXXX',
      admin: { description: 'In E.164. Used for the floating chrome WhatsApp affordance.' } },
    { name: 'addressLine1', type: 'text', defaultValue: 'Kawasan BTDC Blok D' },
    { name: 'addressLine2', type: 'text', defaultValue: 'Nusa Dua' },
    { name: 'city', type: 'text', defaultValue: 'Bali' },
    { name: 'postalCode', type: 'text', defaultValue: '80363' },
    { name: 'country', type: 'text', defaultValue: 'Indonesia' },
    { name: 'hoursMonFri', type: 'text', defaultValue: 'Mon–Fri · 09:00–17:00' },
    { name: 'hoursSatSun', type: 'text', defaultValue: 'Sat · By appointment' },
    { name: 'googleMapsUrl', type: 'text' },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        { name: 'platform', type: 'select', required: true, options: [
          { label: 'Instagram', value: 'instagram' },
          { label: 'Facebook', value: 'facebook' },
          { label: 'WhatsApp', value: 'whatsapp' },
          { label: 'TikTok', value: 'tiktok' },
          { label: 'YouTube', value: 'youtube' },
          { label: 'LinkedIn', value: 'linkedin' },
          { label: 'X / Twitter', value: 'x' },
        ] },
        { name: 'url', type: 'text', required: true },
      ],
    },
    { name: 'defaultLocale', type: 'select', defaultValue: 'en',
      options: [{ label: 'English', value: 'en' }, { label: 'Bahasa Indonesia', value: 'id' }] },
    { name: 'currencyDisplayMode', type: 'select', defaultValue: 'idr-with-aud',
      options: [
        { label: 'IDR only', value: 'idr-only' },
        { label: 'IDR primary + AUD italic', value: 'idr-with-aud' },
      ] },
  ],
}

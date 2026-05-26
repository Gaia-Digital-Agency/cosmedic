/**
 * Seed all Payload Globals — settings, branding, forms, header/footer nav.
 */

import type { Payload } from 'payload'
import { upsertGlobal } from './seed-helpers'
import { plainTextToLexical, paragraphsToLexical } from './lexical'
import {
  TREATMENT_LIST,
  SURGEON_LIST,
  WHATSAPP_HREF,
} from '../../../web/src/content/seed'

export async function seedGlobals(payload: Payload): Promise<void> {
  await upsertGlobal(payload, 'settings', {
    siteName: 'BIMC CosMedic',
    siteTagline: 'Plastic Surgery & Aesthetic Medicine in Nusa Dua, Bali',
    defaultMetaDescription: 'BIMC CosMedic — discreet, accredited plastic surgery and aesthetic medicine in Nusa Dua, Bali. Concierge care for international medical tourists from AU, US and EU.',
    audToIdrRate: 10500,
    roundIdrTo: 50000,
    contactEmail: 'cosmedic@bimcbali.com',
    contactPhone: '+62-361-761-263',
    whatsappNumber: '+6281339001911',
    addressLine1: 'BIMC Hospital Nusa Dua, Kawasan ITDC Blok D',
    addressLine2: '',
    city: 'Nusa Dua, Bali',
    postalCode: '80363',
    country: 'Indonesia',
    hoursMonFri: 'Mon–Fri · 09:00–17:00',
    hoursSatSun: 'Sat · By appointment',
    socialLinks: [
      { platform: 'instagram', url: 'https://www.instagram.com/bimchospital/' },
      { platform: 'whatsapp', url: WHATSAPP_HREF },
    ],
    defaultLocale: 'en',
  })

  await upsertGlobal(payload, 'brand-stats', {
    stats: [
      { number: '28', label: 'Years In Practice', sourceNote: 'Per brand.pdf §IV' },
      { number: '8', label: 'ISAPS-FICS Surgeons', sourceNote: 'Per brand.pdf §IV' },
      { number: '3,400+', label: 'Procedures Performed', sourceNote: 'Per brand.pdf §IV' },
      { number: '#1', label: 'Hospital 2026', sourceNote: 'Per brand.pdf §IV' },
    ],
  })

  await upsertGlobal(payload, 'endorsement-mark', {
    endorsementLine: 'Managed by BIMC Hospital · Nusa Dua · Bali',
    clearspaceUnit: '1X (height of medical cross)',
    minScreenWidthPx: 96,
    minPrintMmWidth: 24,
  })

  await upsertGlobal(payload, 'consultation-policy', {
    feeIdr: 150000,
    waiverConditionText: 'Consultation fee is waived if your treatment is performed the same day.',
    displayOn: ['contact', 'procedure-detail', 'pricing'],
  })

  await upsertGlobal(payload, 'form-defaults', {
    labels: {
      name: 'Your name', email: 'Email address', phone: 'Phone',
      country: 'Country', treatment: 'Treatment of interest', message: 'Tell us a little more',
    },
    placeholders: {
      name: 'First and last name', email: 'name@example.com', phone: '+61 4XX XXX XXX',
      country: 'Australia', treatment: 'e.g. Rhinoplasty', message: 'Anything we should know about your timeline, goals, or medical history.',
    },
    submitLabel: 'Send enquiry',
    successMessage: 'Thank you — your concierge will reply within one business day.',
    errorMessage: 'Something went wrong. Please email cosmedic@bimcbali.com if it persists.',
    rateLimitMessage: 'You submitted a form recently. Please wait a moment before sending another.',
  })

  await upsertGlobal(payload, 'seo-defaults', {
    titlePattern: '{page} — BIMC CosMedic',
    robotsTxt: 'User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\nDisallow: /preview\nSitemap: https://cosmedic.gaiada.online/sitemap.xml',
    sitemapBaseUrl: 'https://cosmedic.gaiada.online',
  })

  await upsertGlobal(payload, 'floating-chrome', {
    ctaPill: { label: 'Plan your treatment', href: '/contact', enabled: true },
    chat: { enabled: true, provider: 'whatsapp', openOnLoad: false },
  })

  await upsertGlobal(payload, 'email-templates', {
    templates: [
      {
        id: 'enquiry-autoresponder',
        subject: 'Thank you for your enquiry — BIMC CosMedic',
        bodyMjml: 'Dear {{name}},\n\nThank you for your enquiry with BIMC CosMedic. Our concierge team will reply to you within one business day with a tailored response to your interest in {{procedure}}.\n\nWarm regards,\nBIMC CosMedic',
        locale: 'en',
      },
      {
        id: 'enquiry-clinic-notify',
        subject: 'New enquiry — {{name}} — {{procedure}}',
        bodyMjml: 'New enquiry received:\n\nName: {{name}}\nEmail: {{email}}\nPhone: {{phone}}\nCountry: {{country}}\nProcedure of interest: {{procedure}}\nPreferred date: {{preferredDate}}\n\nMessage:\n{{message}}\n\nSource: {{sourcePage}}',
        locale: 'en',
      },
    ],
  })

  // Header + Footer drawn from header.tsx / footer.tsx labels.
  await upsertGlobal(payload, 'header', {
    navItems: [
      {
        label: 'Treatments', href: '/treatments', activePattern: '^/treatment',
        megaMenu: [
          { heading: 'Surgical', items: [
            { label: 'Face', href: '/treatment-surgical-face' },
            { label: 'Body', href: '/treatment-surgical-body' },
            { label: 'Breast', href: '/treatment-surgical-breast' },
          ] },
          { heading: 'Reconstructive', items: [
            { label: 'Breast Reconstruction', href: '/treatment-reconstructive-breast' },
            { label: 'Trauma & Scar', href: '/treatment-reconstructive-trauma' },
            { label: 'Craniofacial', href: '/treatment-reconstructive-craniofacial' },
          ] },
          { heading: 'Non-surgical', items: [
            { label: 'Injectables', href: '/treatment-non-surgical-injectables' },
            { label: 'Laser & Resurfacing', href: '/treatment-non-surgical-laser' },
            { label: 'Skin Health', href: '/treatment-non-surgical-skin' },
          ] },
          { heading: 'Hair · Dental · Weight Loss', items: [
            { label: 'FUE Surgical', href: '/treatment-hair-fue' },
            { label: 'Follicle Therapy', href: '/treatment-hair-therapy' },
            { label: 'Veneers', href: '/treatment-dental-veneers' },
            { label: 'Alignment', href: '/treatment-dental-alignment' },
            { label: 'Whitening', href: '/treatment-dental-whitening' },
            { label: 'Medical', href: '/treatment-weight-loss-medical' },
            { label: 'Endoscopic', href: '/treatment-weight-loss-endoscopic' },
            { label: 'Bariatric', href: '/treatment-weight-loss-surgical' },
          ] },
        ],
      },
      {
        label: 'Surgeons', href: '/surgeons', activePattern: '^/surgeon',
        megaMenu: [
          { heading: 'Plastic Surgery', items: SURGEON_LIST.filter((s: { group: string }) => s.group === 'Plastic Surgery').map((s: { common: string; slug: string }) => ({ label: 'dr. ' + s.common, href: '/surgeon-' + s.slug })) },
          { heading: 'Aesthetic Medicine', items: SURGEON_LIST.filter((s: { group: string }) => s.group === 'Aesthetic Medicine').map((s: { common: string; slug: string }) => ({ label: 'dr. ' + s.common, href: '/surgeon-' + s.slug })) },
        ],
      },
      { label: 'Your Journey', href: '/journey', activePattern: '^/journey' },
      { label: 'Gallery', href: '/gallery', activePattern: '^/gallery' },
      { label: 'Stories', href: '/stories', activePattern: '^/stories' },
      { label: 'Contact', href: '/contact', activePattern: '^/contact' },
    ],
    localeSwitcher: { enabled: true, labelEn: 'EN', labelId: 'ID' },
  })

  await upsertGlobal(payload, 'footer', {
    linkColumns: [
      { heading: 'Treatments', items: TREATMENT_LIST.map((t: { t: string; slug: string }) => ({ label: t.t, href: '/treatment-' + t.slug })) },
      { heading: 'Surgeons', items: SURGEON_LIST.map((s: { common: string; slug: string }) => ({ label: 'dr. ' + s.common, href: '/surgeon-' + s.slug })) },
      { heading: 'Information', items: [
        { label: 'Your Journey', href: '/journey' },
        { label: 'Gallery', href: '/gallery' },
        { label: 'Stories', href: '/stories' },
        { label: 'Press', href: '/press' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Recovery Stays', href: '/recovery-stays' },
        { label: 'Contact', href: '/contact' },
        { label: 'Privacy', href: '/privacy' },
      ] },
    ],
    enquirySummary: plainTextToLexical('Speak with our concierge. We respond within one business day.'),
    addressBlock: paragraphsToLexical([
      'BIMC Hospital Nusa Dua',
      'Kawasan ITDC Blok D — Nusa Dua, Bali 80363 — Indonesia',
      'cosmedic@bimcbali.com · +6281339001911',
    ]),
    copyrightTemplate: '© {year} BIMC CosMedic. Managed by BIMC Hospital, Nusa Dua.',
  })
}

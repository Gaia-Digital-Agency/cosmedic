import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'

export const PricingInsurance: GlobalConfig = {
  slug: 'pricing-insurance',
  label: 'Pricing Terms',
  admin: {
    group: 'Procedures',
    hidden: true,
    description:
      'Bottom section of /pricing: Insurance (left column), Payment terms (right column), and Consultation fee/waiver.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    // ── Insurance (left column) ───────────────────────────────────────────
    {
      name: 'insurance',
      label: 'Insurance',
      type: 'group',
      admin: { description: 'Left column — insurance copy.' },
      fields: [
        { name: 'eyebrow', label: 'Label above heading', type: 'text', localized: true, defaultValue: 'Insurance',
          admin: { description: 'Small-caps eyebrow above the H2.' } },
        { name: 'headingRoman', type: 'text', localized: true, defaultValue: 'Working',
          admin: { description: 'Roman text part of the H2.' } },
        { name: 'headingItalic', type: 'text', localized: true, defaultValue: 'with insurers.',
          admin: { description: 'Italic accent text part of the H2.' } },
        { name: 'body', type: 'textarea', localized: true,
          defaultValue:
            "Cosmetic surgery is rarely covered by health insurance. Reconstructive procedures may be — and where they are, we are happy to support your claim with full documentation, surgeon's reports, and itemised invoicing.\n\nTravel insurance is recommended for every patient, and we work with two specialist medical-travel insurers — details supplied during consultation.",
          admin: { description: 'Body copy. Separate paragraphs with a blank line.' } },
      ],
    },
    // ── Payment (right column) ────────────────────────────────────────────
    {
      name: 'payment',
      label: 'Payment',
      type: 'group',
      admin: { description: 'Right column — payment terms.' },
      fields: [
        { name: 'eyebrow', label: 'Label above heading', type: 'text', localized: true, defaultValue: 'Payment',
          admin: { description: 'Small-caps eyebrow above the H2.' } },
        { name: 'headingRoman', type: 'text', localized: true, defaultValue: 'Quiet,',
          admin: { description: 'Roman text part of the H2.' } },
        { name: 'headingItalic', type: 'text', localized: true, defaultValue: 'considered terms.',
          admin: { description: 'Italic accent text part of the H2.' } },
        { name: 'termsText', type: 'textarea', localized: true,
          defaultValue:
            'Deposit | 20% on confirmation\nBalance | On admission, by transfer\nCurrencies | IDR, AUD, USD, EUR\nCards | Accepted, 1.8% surcharge\nRefunds | Full, until 14 days before\nFinance | Available via partner lender',
          admin: { description: 'One row per line. Format: "Label | Value".' } },
      ],
    },
    // ── Consultation ──────────────────────────────────────────────────────
    {
      name: 'consultation',
      label: 'Consultation',
      type: 'group',
      admin: { description: 'Consultation fee callout at the bottom of /pricing.' },
      fields: [
        { name: 'feeIdr', type: 'number', defaultValue: 150000,
          admin: { description: 'Consultation fee in IDR. AUD equivalent computed from Settings.audToIdrRate.' } },
        { name: 'waiverConditionText', type: 'textarea', localized: true,
          defaultValue: 'Consultation fee is waived if treatment is performed the same day.',
          admin: { description: 'Waiver explanation rendered after the fee amount.' } },
      ],
    },
  ],
}

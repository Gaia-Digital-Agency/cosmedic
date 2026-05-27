import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'

export const HomeHero: GlobalConfig = {
  slug: 'home-hero',
  label: 'Hero',
  admin: {
    group: 'Homepage',
    description:
      'Hero at the top of / — eyebrow, two-line title, lede, hero image, plus chrome strings for the right-side quick-enquiry card and the two primary CTAs beneath the headline.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    { name: 'breadcrumbLabel', type: 'text', defaultValue: 'Home',
      admin: { description: 'Last segment in the breadcrumb trail (reserved — / does not currently render a breadcrumb).' } },
    { name: 'eyebrow', label: 'Label above heading', type: 'text', defaultValue: 'A sanctuary in Nusa Dua · Est. 1998',
      admin: { description: 'Small-caps eyebrow above the hero title.' } },
    {
      name: 'title', type: 'group',
      admin: { description: 'Two-line hero headline. Line A renders roman on the first line; line B renders italic on the second.' },
      fields: [
        { name: 'a', type: 'text', defaultValue: 'Plastic surgery',
          admin: { description: 'First line (roman). e.g. "Plastic surgery".' } },
        { name: 'b', type: 'text', defaultValue: 'in Bali, by ISAPS surgeons.',
          admin: { description: 'Second line (italic accent). e.g. "in Bali, by ISAPS surgeons.".' } },
      ],
    },
    { name: 'lede', label: 'Intro paragraph', type: 'textarea',
      defaultValue:
        "Performed inside Indonesia's first ACHSI-accredited international hospital, with private villa recovery and twelve months of telehealth follow-up included. Procedures from Rp 18,900,000 (≈ AUD 1,800).",
      admin: { description: 'Intro paragraph beneath the title.' } },
    { name: 'primaryCtaLabel', type: 'text', defaultValue: 'Plan Your Treatment',
      admin: { description: 'Filled-pill CTA beneath the headline.' } },
    { name: 'secondaryCtaLabel', type: 'text', defaultValue: 'View Pricing',
      admin: { description: 'Ghost CTA beneath the headline.' } },
    { name: 'secondaryCtaHref', type: 'text', defaultValue: '/pricing',
      admin: { description: 'Where the ghost CTA links.' } },
    {
      name: 'quickEnquiry',
      type: 'group',
      admin: { description: 'Chrome strings on the right-side quick-enquiry card. Field labels + placeholders + the four submit-button states.' },
      fields: [
        { name: 'eyebrow', label: 'Label above heading', type: 'text', defaultValue: 'Begin · No commitment' },
        { name: 'heading', type: 'text', defaultValue: 'Get a private price estimate within 24 hours.' },
        { name: 'intro', type: 'textarea',
          defaultValue: "Two fields to start. We'll reply with a tailored estimate and procedure guide — no marketing." },
        { name: 'nameLabel', type: 'text', defaultValue: 'Your name' },
        { name: 'namePlaceholder', type: 'text', defaultValue: 'First name' },
        { name: 'emailLabel', type: 'text', defaultValue: 'Email' },
        { name: 'emailPlaceholder', type: 'text', defaultValue: 'you@email.com' },
        { name: 'interestLabel', type: 'text', defaultValue: 'Area of interest' },
        { name: 'interestOptionalLabel', type: 'text', defaultValue: '(optional)' },
        { name: 'interestPlaceholder', type: 'text', defaultValue: 'e.g. rhinoplasty, mommy makeover…' },
        { name: 'revealInterestLabel', type: 'text', defaultValue: '+ Add a treatment area (optional)' },
        { name: 'submitLabel', type: 'text', defaultValue: 'Begin enquiry' },
        { name: 'submittingLabel', type: 'text', defaultValue: 'Sending…' },
        { name: 'successLabel', type: 'text', defaultValue: 'Sent — thank you' },
        { name: 'successFine', type: 'text',
          defaultValue: 'Thank you — your concierge will reply within one business day.' },
        { name: 'errorFine', type: 'text',
          defaultValue: 'Something went wrong. Please try the full form on /contact.' },
        { name: 'fineprint', type: 'text',
          defaultValue: 'Held in confidence. Reviewed by a credentialed surgeon.' },
      ],
    },
    { name: 'heroImage', type: 'upload', relationTo: 'media',
      admin: { description: 'Hero background image. If unset, the vignette + dark background carry the section.' } },
  ],
}

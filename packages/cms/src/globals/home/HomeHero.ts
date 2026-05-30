import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { makeGlobalTranslateHook, T, A } from '../../hooks/autoTranslate'

export const HomeHero: GlobalConfig = {
  slug: 'home-hero',
  label: 'Hero',
  admin: {
    group: 'Homepage',
    description:
      'Hero at the top of / — eyebrow, two-line title, lede, hero image, plus chrome strings for the right-side quick-enquiry card and the two primary CTAs beneath the headline.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: {
    ...revalidateGlobalAfterChange(),
    afterChange: [makeGlobalTranslateHook([
      T('eyebrow'), T('title.a'), T('title.b'), T('lede'),
      T('primaryCtaLabel'), T('secondaryCtaLabel'),
      T('quickEnquiry.eyebrow'), T('quickEnquiry.heading'), T('quickEnquiry.intro'),
      T('quickEnquiry.nameLabel'), T('quickEnquiry.namePlaceholder'),
      T('quickEnquiry.emailLabel'), T('quickEnquiry.emailPlaceholder'),
      T('quickEnquiry.interestLabel'), T('quickEnquiry.interestOptionalLabel'),
      T('quickEnquiry.interestPlaceholder'), T('quickEnquiry.revealInterestLabel'),
      T('quickEnquiry.submitLabel'), T('quickEnquiry.submittingLabel'),
      T('quickEnquiry.successLabel'), T('quickEnquiry.successFine'),
      T('quickEnquiry.errorFine'), T('quickEnquiry.fineprint'),
    ])],
  },
  fields: [
    { name: 'breadcrumbLabel', type: 'text', localized: true, defaultValue: 'Home',
      admin: { description: 'Last segment in the breadcrumb trail (reserved — / does not currently render a breadcrumb).', hidden: true } },
    { name: 'eyebrow', label: 'Label above heading', type: 'text', localized: true, defaultValue: 'A sanctuary in Nusa Dua · Est. 1998',
      admin: { description: 'Small-caps eyebrow above the hero title.', hidden: true } },
    {
      name: 'title', type: 'group',
      admin: { description: 'Two-line hero headline. Line A renders roman on the first line; line B renders italic on the second.' },
      fields: [
        { name: 'a', type: 'text', localized: true, defaultValue: 'Plastic surgery',
          admin: { description: 'First line (roman). e.g. "Plastic surgery".' } },
        { name: 'b', type: 'text', localized: true, defaultValue: 'in Bali, by ISAPS surgeons.',
          admin: { description: 'Second line (italic accent). e.g. "in Bali, by ISAPS surgeons.".' } },
      ],
    },
    { name: 'lede', label: 'Intro paragraph', type: 'textarea', localized: true,
      defaultValue:
        "Performed inside Indonesia's first ACHSI-accredited international hospital, with private villa recovery and twelve months of telehealth follow-up included. Procedures from Rp 18,900,000 (≈ AUD 1,800).",
      admin: { description: 'Intro paragraph beneath the title.', hidden: true } },
    { name: 'primaryCtaLabel', type: 'text', localized: true, defaultValue: 'Plan Your Treatment',
      admin: { description: 'Filled-pill CTA beneath the headline.' } },
    { name: 'secondaryCtaLabel', type: 'text', localized: true, defaultValue: 'View Pricing',
      admin: { description: 'Ghost CTA beneath the headline.' } },
    { name: 'secondaryCtaHref', type: 'text', defaultValue: '/pricing',
      admin: { description: 'Where the ghost CTA links.', hidden: true } },
    {
      name: 'quickEnquiry',
      type: 'group',
      admin: { description: 'Chrome strings on the right-side quick-enquiry card. Field labels + placeholders + the four submit-button states.', hidden: true },
      fields: [
        { name: 'eyebrow', label: 'Label above heading', type: 'text', localized: true, defaultValue: 'Begin · No commitment' },
        { name: 'heading', type: 'text', localized: true, defaultValue: 'Get a private price estimate within 24 hours.' },
        { name: 'intro', type: 'textarea', localized: true,
          defaultValue: "Two fields to start. We'll reply with a tailored estimate and procedure guide — no marketing." },
        { name: 'nameLabel', type: 'text', localized: true, defaultValue: 'Your name' },
        { name: 'namePlaceholder', type: 'text', localized: true, defaultValue: 'First name' },
        { name: 'emailLabel', type: 'text', localized: true, defaultValue: 'Email' },
        { name: 'emailPlaceholder', type: 'text', localized: true, defaultValue: 'you@email.com' },
        { name: 'interestLabel', type: 'text', localized: true, defaultValue: 'Area of interest' },
        { name: 'interestOptionalLabel', type: 'text', localized: true, defaultValue: '(optional)' },
        { name: 'interestPlaceholder', type: 'text', localized: true, defaultValue: 'e.g. rhinoplasty, mommy makeover…' },
        { name: 'revealInterestLabel', type: 'text', localized: true, defaultValue: '+ Add a treatment area (optional)' },
        { name: 'submitLabel', type: 'text', localized: true, defaultValue: 'Begin enquiry' },
        { name: 'submittingLabel', type: 'text', localized: true, defaultValue: 'Sending…' },
        { name: 'successLabel', type: 'text', localized: true, defaultValue: 'Sent — thank you' },
        { name: 'successFine', type: 'text', localized: true,
          defaultValue: 'Thank you — your concierge will reply within one business day.' },
        { name: 'errorFine', type: 'text', localized: true,
          defaultValue: 'Something went wrong. Please try the full form on /contact.' },
        { name: 'fineprint', type: 'text', localized: true,
          defaultValue: 'Held in confidence. Reviewed by a credentialed surgeon.' },
      ],
    },
    { name: 'heroImage', type: 'upload', relationTo: 'media',
      admin: { description: 'Hero background image. If unset, the vignette + dark background carry the section.' } },
  ],
}

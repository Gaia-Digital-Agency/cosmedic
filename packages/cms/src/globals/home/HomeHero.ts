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
      admin: { description: 'Intro paragraph beneath the title.' } },
    { name: 'primaryCtaLabel', type: 'text', localized: true, defaultValue: 'Plan Your Treatment',
      admin: { description: 'Filled-pill CTA beneath the headline.' } },
    { name: 'secondaryCtaLabel', type: 'text', localized: true, defaultValue: 'View Pricing',
      admin: { description: 'Ghost CTA beneath the headline.' } },
    { name: 'secondaryCtaHref', type: 'text', defaultValue: '/pricing',
      admin: { description: 'Where the ghost CTA links.', hidden: true } },
    {
      name: 'quickEnquiry',
      label: 'Quick Enquiry',
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

    // ── Treatments section ───────────────────────────────────────────────────
    { name: 'treatments', label: 'Treatments', type: 'group',
      admin: { description: 'Treatments section on /.' },
      fields: [
        { name: 'eyebrow', label: 'Label above heading', type: 'text', localized: true, defaultValue: 'Treatments' },
        { name: 'heading', type: 'group', fields: [
          { name: 'a', type: 'text', localized: true, defaultValue: 'Six disciplines,' },
          { name: 'b', type: 'text', localized: true, defaultValue: 'one sanctuary.' },
        ] },
        { name: 'lede', label: 'Intro paragraph', type: 'textarea', localized: true,
          defaultValue: 'A complete repertoire under one roof, sequenced into a single journey. Treatments may be combined; recovery is always private.' },
      ],
    },

    // ── Pricing section ──────────────────────────────────────────────────────
    { name: 'pricing', label: 'Pricing', type: 'group',
      admin: { description: 'Pricing teaser section on /.' },
      fields: [
        { name: 'eyebrow', label: 'Label above heading', type: 'text', localized: true, defaultValue: 'Pricing · Starting From' },
        { name: 'heading', type: 'group', fields: [
          { name: 'a', type: 'text', localized: true, defaultValue: 'Transparent' },
          { name: 'b', type: 'text', localized: true, defaultValue: 'pricing.' },
        ] },
        { name: 'lede', label: 'Intro paragraph', type: 'textarea', localized: true,
          defaultValue: 'Indicative starting prices in IDR (with AUD equivalent). Final quotes are tailored after consultation. Travel, accommodation and concierge can be packaged.' },
        { name: 'footnote', label: 'Footnote', type: 'textarea', localized: true,
          defaultValue: 'Prices indicative for international patients. AUD shown at 1 AUD ≈ Rp 12,500 (May 2026). Recovery stays, transfers and 12-month telehealth follow-up included on most surgical packages.' },
        { name: 'viewAllLabel', label: 'CTA Button', type: 'text', localized: true, defaultValue: 'View full pricing' },
      ],
    },

    // ── Team Card section ────────────────────────────────────────────────────
    { name: 'surgeons', label: 'Team Card', type: 'group',
      admin: { description: 'Full-width Surgeons banner on /.' },
      fields: [
        { name: 'eyebrow', label: 'Eyebrow', type: 'text', defaultValue: '8 Specialists',
          admin: { description: 'Small-caps label above the banner heading.' } },
        { name: 'team', label: 'Team Heading', type: 'group', fields: [
          { name: 'caption', label: 'Title', type: 'text', localized: true, defaultValue: 'One team, one standard.' },
        ] },
        { name: 'lead', label: 'Body & CTA', type: 'group', fields: [
          { name: 'body', label: 'Intro paragraph', type: 'textarea', localized: true,
            defaultValue: 'Our plastic and aesthetic doctors work side by side under one ACHSI-accredited roof.' },
          { name: 'ctaLabel', label: 'CTA Button', type: 'text', localized: true, defaultValue: 'Meet all the doctors' },
        ] },
        { name: 'group', label: 'Photo', type: 'group', fields: [
          { name: 'photo', label: 'Image', type: 'upload', relationTo: 'media' },
          { name: 'photoAlt', label: 'Photo alt text', type: 'text', localized: true },
        ] },
      ],
    },

    // ── Gallery section ──────────────────────────────────────────────────────
    { name: 'gallery', label: 'Gallery', type: 'group',
      admin: { description: 'Before & After gallery teaser section on /.' },
      fields: [
        { name: 'eyebrow', label: 'Label above heading', type: 'text', localized: true, defaultValue: 'Before & After Results' },
        { name: 'heading', type: 'group', fields: [
          { name: 'a', type: 'text', localized: true, defaultValue: 'Quietly' },
          { name: 'b', type: 'text', localized: true, defaultValue: 'transformative.' },
        ] },
        { name: 'lede', label: 'Intro paragraph', type: 'textarea', localized: true,
          defaultValue: 'Three signature results from our facial repertoire.' },
        { name: 'ctaLabel', label: 'CTA Button', type: 'text', localized: true, defaultValue: 'View the full gallery' },
      ],
    },

    // ── Lead Magnet section ──────────────────────────────────────────────────
    { name: 'leadMagnet', label: 'Lead Magnet', type: 'group',
      admin: { description: 'Lead-magnet section on /.' },
      fields: [
        { name: 'coverEyebrow', label: 'Cover Eyebrow', type: 'text', defaultValue: 'A guide · 24 pages · PDF',
          admin: { description: 'Small-caps label at the top of the cover card.' } },
        { name: 'cover', label: 'Cover', type: 'group', fields: [
          { name: 'image', label: 'Image', type: 'upload', relationTo: 'media' },
          { name: 'title', label: 'Cover TitleA', type: 'textarea', localized: true,
            defaultValue: 'The Bali\nRecovery\nGuide.' },
          { name: 'footer', label: 'Cover TitleB', type: 'text', localized: true,
            defaultValue: 'BIMC CosMedic · MMXXVI' },
        ] },
        { name: 'bodyEyebrow', label: 'Body Eyebrow', type: 'text', defaultValue: 'Free Guide',
          admin: { description: 'Small-caps label above the body heading.' } },
        { name: 'heading', type: 'group', fields: [
          { name: 'a', label: 'Two Line — TitleA', type: 'text', localized: true, defaultValue: 'What to expect from' },
          { name: 'b', label: 'Two Line — TitleB', type: 'text', localized: true, defaultValue: 'recovery in Bali.' },
        ] },
        { name: 'lede', label: 'Intro paragraph', type: 'textarea', localized: true,
          defaultValue: 'A 24-page editorial guide written by our concierge team — covering recovery timelines for the ten most-requested procedures, what to pack, what villas suit which surgeries, and the pace of a typical fortnight in Nusa Dua.' },
        { name: 'formPlaceholder', label: 'Form Placeholder', type: 'text', localized: true, defaultValue: 'Your email address' },
        { name: 'submitLabel', label: 'Submit Button', type: 'text', localized: true, defaultValue: 'Send Guide →' },
        { name: 'successHeading', label: 'Success Heading', type: 'text', localized: true, defaultValue: '✓ Sent' },
        { name: 'successBody', label: 'Success Body', type: 'text', localized: true,
          defaultValue: 'Check your inbox — the guide is on its way.' },
        { name: 'fineprint', label: 'Fineprint', type: 'text', localized: true,
          defaultValue: 'One email. No marketing list. Unsubscribe anytime.' },
      ],
    },

    // ── Stories section ──────────────────────────────────────────────────────
    { name: 'stories', label: 'Stories', type: 'group',
      admin: { description: 'Patient stories teaser section on /.' },
      fields: [
        { name: 'eyebrow', label: 'Label above heading', type: 'text', localized: true, defaultValue: 'Verified Patient Stories' },
        { name: 'heading', type: 'group', fields: [
          { name: 'a', type: 'text', localized: true, defaultValue: 'Stories,' },
          { name: 'b', type: 'text', localized: true, defaultValue: 'not slogans.' },
        ] },
        { name: 'lede', label: 'Intro paragraph', type: 'textarea', localized: true,
          defaultValue: 'Verified reviews from international patients. Video testimonials and Google reviews on our full stories page.' },
        { name: 'ctaLabel', label: 'CTA Button', type: 'text', localized: true, defaultValue: 'Read more stories' },
      ],
    },

    // ── Place section ────────────────────────────────────────────────────────
    { name: 'place', label: 'Place', type: 'group',
      admin: { description: '"Recover in paradise" section on /.' },
      fields: [
        { name: 'heading', type: 'group', fields: [
          { name: 'a', label: 'Two Line — TitleA', type: 'text', localized: true, defaultValue: 'Recover' },
          { name: 'b', label: 'Two Line — TitleB', type: 'text', localized: true, defaultValue: 'in paradise.' },
        ] },
        { name: 'body', label: 'Intro paragraph', type: 'textarea', localized: true,
          defaultValue: 'Nusa Dua sits on the southernmost reach of Bali — quiet beaches, soft afternoons, and the kind of warm, careful hospitality that has made the island synonymous with rest. We work with a small portfolio of villas and resorts, hand-selected for privacy and post-operative comfort.' },
        { name: 'rows', label: 'Rows', type: 'array',
          admin: { description: '4 lettered rows below the body.' },
          fields: [
            { name: 'letter', type: 'text', required: true },
            { name: 'text', type: 'text', required: true, localized: true },
          ],
        },
        { name: 'ctaLabel', label: 'CTA Button', type: 'text', localized: true, defaultValue: 'View recovery stays' },
        { name: 'image', label: 'Image', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}

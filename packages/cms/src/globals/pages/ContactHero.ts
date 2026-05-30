import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'

export const ContactHero: GlobalConfig = {
  slug: 'contact-hero',
  label: 'Contact',
  admin: {
    group: 'Contact',
    description: 'All content for /contact — Hero, Enquiry form, Visit section, Hours. Mirrors the web page top to bottom.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    // ── Breadcrumb ────────────────────────────────────────────────────────────
    { name: 'breadcrumbLabel', label: 'Breadcrumb — Page Label', type: 'text', defaultValue: 'Plan Your Journey',
      admin: { description: 'Second item in the breadcrumb trail (Home → this label).' } },

    // ── Hero Image ────────────────────────────────────────────────────────────
    { name: 'titleA', label: 'Title — Line A', type: 'text', localized: true, defaultValue: 'Begin, when',
      admin: { description: 'First line of the hero title.' } },
    { name: 'titleB', label: 'Title — Line B', type: 'text', localized: true, defaultValue: 'you are ready.',
      admin: { description: 'Second line of the hero title (italic).' } },
    { name: 'lede', label: 'Intro paragraph', type: 'textarea', localized: true,
      defaultValue: 'Write to us in your own time, in your own words. A concierge will reply within twenty-four hours, in English or Bahasa Indonesia. There is no obligation — and no pressure — to proceed.',
      admin: { description: 'Intro paragraph beneath the title.' } },
    { name: 'heroImage', type: 'upload', relationTo: 'media',
      admin: { description: 'Hero image (right side of title block). ~1600×1200 JPEG/WebP.' } },
    { name: 'imageLabel', type: 'text', localized: true, defaultValue: 'PLAN YOUR JOURNEY',
      admin: { description: 'Caption label on the painted-SVG fallback when no image is uploaded.' } },
    { name: 'imageHue', type: 'number', defaultValue: 3,
      admin: { description: 'Fallback SVG hue (0–6).', hidden: true } },
    { name: 'chapter', type: 'text', localized: true, defaultValue: 'Chapter VIII — Plan Your Journey',
      admin: { description: 'Chapter eyebrow above the hero title.', hidden: true } },

    // ── Enquiry ───────────────────────────────────────────────────────────────
    {
      name: 'enquiry', label: 'Enquiry', type: 'group',
      admin: { description: 'Enquiry section on /contact — heading, intro, direct lines, form labels, trust line, submit states.' },
      fields: [
        { name: 'eyebrow', label: 'Eyebrow', type: 'text', localized: true, defaultValue: 'The Enquiry' },
        { name: 'headingPre', label: 'Title A (roman)', type: 'text', localized: true, defaultValue: 'Tell us a little' },
        { name: 'headingItalic', label: 'Title B (italic)', type: 'text', localized: true, defaultValue: 'about you.' },
        { name: 'intro', label: 'Paragraph', type: 'textarea', localized: true,
          defaultValue: 'Every field is optional. Tell us only what you are comfortable telling us today — we will follow up with the rest.' },
        {
          name: 'directLines', label: 'Direct Lines', type: 'group',
          admin: { description: 'Labels only — values come from Settings.' },
          fields: [
            { name: 'sectionLabel', type: 'text', localized: true, defaultValue: 'Direct lines' },
            { name: 'conciergeLabel', type: 'text', localized: true, defaultValue: 'Concierge' },
            { name: 'whatsappLabel', type: 'text', localized: true, defaultValue: 'WhatsApp' },
            { name: 'emailLabel', type: 'text', localized: true, defaultValue: 'Email' },
            { name: 'pressLabel', type: 'text', localized: true, defaultValue: 'Press' },
          ],
        },
        {
          name: 'formLabels', label: 'Form Labels', type: 'group',
          fields: [
            { name: 'nameLabel', type: 'text', localized: true, defaultValue: 'Your name' },
            { name: 'namePlaceholder', type: 'text', localized: true, defaultValue: 'First name' },
            { name: 'emailLabel', type: 'text', localized: true, defaultValue: 'Email' },
            { name: 'emailPlaceholder', type: 'text', localized: true, defaultValue: 'you@example.com' },
            { name: 'treatmentLabel', type: 'text', localized: true, defaultValue: 'Area of interest' },
            { name: 'treatmentPlaceholder', type: 'text', localized: true, defaultValue: 'Select a treatment…' },
            { name: 'addDetailsLabel', type: 'text', localized: true, defaultValue: '+ Add a few more details (optional)' },
            { name: 'countryLabel', type: 'text', localized: true, defaultValue: 'Country & city' },
            { name: 'countryPlaceholder', type: 'text', localized: true, defaultValue: 'Sydney, Australia' },
            { name: 'dateLabel', type: 'text', localized: true, defaultValue: 'Approximate dates' },
            { name: 'datePlaceholder', type: 'text', localized: true, defaultValue: 'Month / year' },
            { name: 'messageLabel', type: 'text', localized: true, defaultValue: 'Tell us a little' },
            { name: 'messagePlaceholder', type: 'textarea', localized: true,
              defaultValue: "What you'd like to discuss, in your own words. Or simply say hello." },
          ],
        },
        { name: 'trustLine', label: 'Trust line', type: 'textarea', localized: true,
          defaultValue: 'Held in confidence. Reviewed by a credentialed surgeon. We reply within 24 hours.' },
        {
          name: 'submitLabels', label: 'Submit Button States', type: 'group',
          fields: [
            { name: 'send', type: 'text', localized: true, defaultValue: 'Send enquiry' },
            { name: 'sending', type: 'text', localized: true, defaultValue: 'Sending…' },
            { name: 'sent', type: 'text', localized: true, defaultValue: 'Sent — thank you' },
            { name: 'successMessage', type: 'textarea', localized: true,
              defaultValue: 'Thank you — your concierge will reply within one business day.' },
          ],
        },
        {
          name: 'intentCopy', label: 'Intent Copy', type: 'array',
          admin: { description: 'Hero overrides when visitor arrives via ?intent=estimate or ?intent=video-consult.' },
          defaultValue: [
            { slug: 'estimate', eyebrow: 'Written estimate', title: 'Get a written estimate.', lede: 'Tell us a little, and a coordinator will reply within 24 hours with a tailored, itemised estimate — no marketing, no follow-on calls.' },
            { slug: 'video-consult', eyebrow: 'Video consult', title: 'Book a video consult.', lede: "A free 20-minute video call with a coordinator. No surgeon time required at this stage — we'll triage and brief the right surgeon afterwards." },
          ],
          fields: [
            { name: 'slug', type: 'text', localized: true, required: true },
            { name: 'eyebrow', label: 'Label above heading', type: 'text', localized: true },
            { name: 'title', type: 'text', localized: true },
            { name: 'lede', label: 'Intro paragraph', type: 'textarea', localized: true },
          ],
        },
      ],
    },

    // ── Visit Us ──────────────────────────────────────────────────────────────
    {
      name: 'visitSection', label: 'Visit Us', type: 'group',
      admin: { description: '"Find us in Nusa Dua" section. Address/hours values come from Settings.' },
      fields: [
        { name: 'headingPre', label: 'Title A (roman)', type: 'text', localized: true, defaultValue: 'Find us in' },
        { name: 'headingItalic', label: 'Title B (italic)', type: 'text', localized: true, defaultValue: 'Nusa Dua.' },
        { name: 'body', label: 'Paragraph', type: 'textarea', localized: true,
          defaultValue: 'Within the BIMC Hospital Nusa Dua, on the southernmost reach of Bali. Twelve minutes from Ngurah Rai International Airport.' },
        { name: 'mapImage', label: 'Image', type: 'upload', relationTo: 'media',
          admin: { description: 'Photo shown on the right side of the Visit section. ~1600×1200, 4:3.' } },
        // ── Hours ─────────────────────────────────────────────────────────────
        { name: 'clinicHoursLabel', label: 'Eyebrow — Clinic Hours', type: 'text', localized: true, defaultValue: 'Hours · Clinic' },
        { name: 'conciergeHoursLabel', label: 'Eyebrow — Concierge', type: 'text', localized: true, defaultValue: 'Hours · Concierge' },
        { name: 'conciergeHoursValue', label: 'Concierge Hours Value', type: 'textarea', localized: true,
          defaultValue: 'Twenty-four hours\nReplies within ten minutes' },
        { name: 'openInMapsLabel', label: 'CTA — Open in Maps', type: 'text', localized: true, defaultValue: 'Open in Maps' },
        { name: 'getDirectionsLabel', label: 'CTA — Get Directions', type: 'text', localized: true, defaultValue: 'Get directions' },
        { name: 'eyebrow', label: 'Eyebrow', type: 'text', localized: true, defaultValue: 'Visit',
          admin: { description: 'Small-caps label above the Visit section heading.', hidden: true } },
        { name: 'mapImageLabel', type: 'text', defaultValue: 'NUSA DUA · BALI',
          admin: { description: 'SVG fallback label when no map image is uploaded.', hidden: true } },
        { name: 'mapImageHue', type: 'number', defaultValue: 4,
          admin: { description: 'SVG fallback hue.', hidden: true } },
      ],
    },
  ],
}

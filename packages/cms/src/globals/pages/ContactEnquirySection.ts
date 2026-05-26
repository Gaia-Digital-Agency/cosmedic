import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { apiWarningField } from '../../lib/api-warning'

export const ContactEnquirySection: GlobalConfig = {
  slug: 'contact-enquiry-section',
  label: 'c. Enquiry-Section',
  admin: {
    group: 'Contact',
    description: 'Left column of the /contact "Enquiry" section: section eyebrow, two-line heading, intro paragraph, Direct-Lines block labels, and trust line. The phone / WhatsApp / email / press values rendered under "Direct lines" are NOT edited here — source: a. Homepage → Settings → contactPhone, whatsappNumber, contactEmail, pressEmail. Edit them once in Settings and they update on /contact, in the footer, and on the floating WhatsApp button.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    { name: 'eyebrow', label: 'Label above heading', type: 'text', localized: true, defaultValue: 'The Enquiry',
      admin: { description: 'Small-caps eyebrow above the heading.' } },
    { name: 'headingPre', type: 'text', localized: true, defaultValue: 'Tell us a little',
      admin: { description: 'First part of the section heading (roman).' } },
    { name: 'headingItalic', type: 'text', localized: true, defaultValue: 'about you.',
      admin: { description: 'Second part of the heading rendered in italic serif.' } },
    { name: 'intro', type: 'textarea', localized: true,
      defaultValue: 'Every field is optional. Tell us only what you are comfortable telling us today — we will follow up with the rest.',
      admin: { description: 'Intro paragraph under the heading.' } },
    {
      name: 'directLines',
      type: 'group',
      admin: { description: 'Labels for the "Direct lines" block. The actual phone / WhatsApp / email / press VALUES come from Settings — only the labels are edited here.' },
      fields: [
        { name: 'sectionLabel', type: 'text', localized: true, defaultValue: 'Direct lines',
          admin: { description: 'Mono caption above the four contact rows.' } },
        { name: 'conciergeLabel', type: 'text', localized: true, defaultValue: 'Concierge',
          admin: { description: 'Label on the concierge phone row.' } },
        { name: 'whatsappLabel', type: 'text', localized: true, defaultValue: 'WhatsApp',
          admin: { description: 'Label on the WhatsApp row.' } },
        { name: 'emailLabel', type: 'text', localized: true, defaultValue: 'Email',
          admin: { description: 'Label on the general email row.' } },
        { name: 'pressLabel', type: 'text', localized: true, defaultValue: 'Press',
          admin: { description: 'Label on the press email row.' } },
      ],
    },
    { name: 'trustLine', type: 'textarea', localized: true,
      defaultValue: 'Held in confidence. Reviewed by a credentialed surgeon. We reply within 24 hours.',
      admin: { description: 'Italic line shown next to the "Send enquiry" button at the bottom of the form.' } },
    // 25.27 — intent copy, form labels, submit states, success message
    {
      name: 'intentCopy',
      type: 'array',
      admin: { description: 'Two intent types shown in the hero when a visitor arrives via ?intent=estimate or ?intent=video-consult. Slug must match the URL param value exactly.' },
      defaultValue: [
        { slug: 'estimate', eyebrow: 'Written estimate', title: 'Get a written estimate.', lede: 'Tell us a little, and a coordinator will reply within 24 hours with a tailored, itemised estimate — no marketing, no follow-on calls.' },
        { slug: 'video-consult', eyebrow: 'Video consult', title: 'Book a video consult.', lede: "A free 20-minute video call with a coordinator. No surgeon time required at this stage — we'll triage and brief the right surgeon afterwards." },
      ],
      fields: [
        { name: 'slug', type: 'text', localized: true, required: true, admin: { description: 'URL param value: estimate or video-consult.' } },
        { name: 'eyebrow', label: 'Label above heading', type: 'text', localized: true, admin: { description: 'Hero eyebrow when this intent is active.' } },
        { name: 'title', type: 'text', localized: true, admin: { description: 'Hero heading (replaces page default title).' } },
        { name: 'lede', label: 'Intro paragraph', type: 'textarea', localized: true, admin: { description: 'Hero lede when this intent is active.' } },
      ],
    },
    {
      name: 'formLabels',
      type: 'group',
      admin: { description: 'Field labels and input placeholders visible inside the contact form.' },
      fields: [
        { name: 'nameLabel', type: 'text', localized: true, defaultValue: 'Your name', admin: { description: 'Label on the name field.' } },
        { name: 'namePlaceholder', type: 'text', localized: true, defaultValue: 'First name', admin: { description: 'Placeholder inside the name input.' } },
        { name: 'emailLabel', type: 'text', localized: true, defaultValue: 'Email', admin: { description: 'Label on the email field.' } },
        { name: 'emailPlaceholder', type: 'text', localized: true, defaultValue: 'you@example.com', admin: { description: 'Placeholder inside the email input.' } },
        { name: 'treatmentLabel', type: 'text', localized: true, defaultValue: 'Area of interest', admin: { description: 'Label on the treatment selector.' } },
        { name: 'treatmentPlaceholder', type: 'text', localized: true, defaultValue: 'Select a treatment…', admin: { description: 'Default text shown in the treatment selector before a choice is made.' } },
        { name: 'addDetailsLabel', type: 'text', localized: true, defaultValue: '+ Add a few more details (optional)', admin: { description: 'Toggle button that reveals the optional fields.' } },
        { name: 'countryLabel', type: 'text', localized: true, defaultValue: 'Country & city', admin: { description: 'Label on the optional country/city field.' } },
        { name: 'countryPlaceholder', type: 'text', localized: true, defaultValue: 'Sydney, Australia', admin: { description: 'Placeholder inside the country/city input.' } },
        { name: 'dateLabel', type: 'text', localized: true, defaultValue: 'Approximate dates', admin: { description: 'Label on the optional travel-date field.' } },
        { name: 'datePlaceholder', type: 'text', localized: true, defaultValue: 'Month / year', admin: { description: 'Placeholder inside the date input.' } },
        { name: 'messageLabel', type: 'text', localized: true, defaultValue: 'Tell us a little', admin: { description: 'Label on the optional message textarea.' } },
        { name: 'messagePlaceholder', type: 'textarea', localized: true, defaultValue: "What you'd like to discuss, in your own words. Or simply say hello.", admin: { description: 'Placeholder inside the message textarea.' } },
      ],
    },
    {
      name: 'submitLabels',
      type: 'group',
      admin: { description: 'Submit button states and response messages.' },
      fields: [
        { name: 'send', type: 'text', localized: true, defaultValue: 'Send enquiry', admin: { description: 'Button label in idle state.' } },
        { name: 'sending', type: 'text', localized: true, defaultValue: 'Sending…', admin: { description: 'Button label while the request is in-flight.' } },
        { name: 'sent', type: 'text', localized: true, defaultValue: 'Sent — thank you', admin: { description: 'Button label on success.' } },
        { name: 'successMessage', type: 'textarea', localized: true, defaultValue: 'Thank you — your concierge will reply within one business day.', admin: { description: 'Success confirmation shown below the form.' } },
      ],
    },
  ],
}

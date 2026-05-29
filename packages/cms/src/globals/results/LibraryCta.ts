import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'

export const LibraryCta: GlobalConfig = {
  slug: 'library-cta',
  label: 'CTAs',
  admin: {
    group: 'Results',
    description:
      'Both result-page CTAs in one place. "Library CTA" appears on /results + /gallery. "Share CTA" appears on /results + /stories.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    // ── Library CTA ───────────────────────────────────────────────────────────
    { name: 'eyebrow', label: 'Library — label above heading', type: 'text', defaultValue: 'Private gallery',
      admin: { description: 'Small-caps eyebrow above the Library CTA heading.' } },
    { name: 'headingPre', label: 'Library — heading (roman)', type: 'text', defaultValue: 'Want to see ',
      admin: { description: 'First part of Library CTA heading (roman).' } },
    { name: 'headingItalic', label: 'Library — heading (italic)', type: 'text', defaultValue: 'more?',
      admin: { description: 'Italic word(s) inside Library CTA heading.' } },
    { name: 'body', label: 'Library — body', type: 'textarea',
      defaultValue: 'Our complete library — over two hundred consented cases across every discipline — is shared during private consultation. We will match what we show you to the work you are considering.',
      admin: { description: 'Body paragraph for Library CTA.' } },
    { name: 'buttonLabel', label: 'Library — button label', type: 'text', defaultValue: 'Request the full library',
      admin: { description: 'Library CTA button label.' } },
    { name: 'buttonHref', label: 'Library — button href', type: 'text', defaultValue: '/contact',
      admin: { description: 'Library CTA button href.' } },
    // ── Share CTA ─────────────────────────────────────────────────────────────
    {
      name: 'share',
      type: 'group',
      label: 'Share Story CTA',
      admin: { description: '"Have a story to share?" — shown on /results + /stories.' },
      fields: [
        { name: 'eyebrow', label: 'Label above heading', type: 'text', defaultValue: 'Sharing your story',
          admin: { description: 'Small-caps eyebrow.' } },
        { name: 'headingPre', label: 'Heading (roman)', type: 'text', defaultValue: 'Have a ',
          admin: { description: 'Roman part before italic.' } },
        { name: 'headingItalic', label: 'Heading (italic)', type: 'text', defaultValue: 'story',
          admin: { description: 'Italic word inside heading.' } },
        { name: 'headingPost', label: 'Heading (roman tail)', type: 'text', defaultValue: ' to share?',
          admin: { description: 'Roman tail after italic.' } },
        { name: 'body', label: 'Body', type: 'textarea',
          defaultValue: "We never solicit testimonials — every story we publish is shared at the patient's instigation, in their own words, with their consent. If you'd like to share, we would be honoured to read it.",
          admin: { description: 'Body paragraph.' } },
        { name: 'buttonLabel', label: 'Button label', type: 'text', defaultValue: 'Write to us',
          admin: { description: 'Share CTA button label.' } },
        { name: 'buttonHref', label: 'Button href', type: 'text', defaultValue: '/contact',
          admin: { description: 'Share CTA button href.' } },
      ],
    },
  ],
}

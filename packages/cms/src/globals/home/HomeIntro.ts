import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'

export const HomeIntro: GlobalConfig = {
  slug: 'home-intro',
  label: 'Intro',
  admin: {
    hidden: true,
    group: 'Homepage',
    description:
      'Intro / "Our Approach" section on /. One eyebrow, an italic-accent pull quote (split into three parts so the italic word is editable independently), and the two-column body paragraphs below.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    { name: 'eyebrow', label: 'Label above heading', type: 'text', localized: true, defaultValue: 'Our Approach',
      admin: { description: 'Section eyebrow above the pull quote.' } },
    { name: 'pullQuoteBefore', type: 'text', localized: true, defaultValue: 'Aesthetic medicine, considered with the same ',
      admin: { description: 'Plain text before the italic accent word. Include trailing space if you want a space before the italic.' } },
    { name: 'pullQuoteAccent', type: 'text', localized: true, defaultValue: 'care ',
      admin: { description: 'The italic accent word (e.g. "care").' } },
    { name: 'pullQuoteAfter', type: 'text', localized: true, defaultValue: 'as the island that surrounds it.',
      admin: { description: 'Plain text after the italic accent word.' } },
    { name: 'col1', type: 'textarea', localized: true,
      defaultValue:
        "For almost three decades, BIMC CosMedic has practiced cosmetic surgery the way Bali has practiced hospitality — quietly, with patience, and with deep respect for the person in the chair. We don't promise transformation. We promise consideration: of your face, your body, your time, and the life you intend to return to.",
      admin: { description: 'Left column body paragraph.' } },
    { name: 'col2', type: 'textarea', localized: true,
      defaultValue:
        "Our centre sits within Indonesia's most accredited international hospital. Eight ISAPS- and FICS-credentialed specialists — fellowship-trained in Korea, Japan, Singapore and across Indonesia — work alongside a concierge team that handles everything from your arrival at Ngurah Rai to your final follow-up by video.",
      admin: { description: 'Right column body paragraph.' } },
  ],
}

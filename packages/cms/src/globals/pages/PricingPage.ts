import type { GlobalConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { pageFields } from './_pageFields'

/**
 * Phase R6 — Bucket "e. Pricing" detail. The hero (chapter/title/lede/heroImage)
 * lives on `pricing-hero`; the editorial overview lives on `pricing-overview`;
 * the centred footnote lives on `pricing-footnote`; the two-column insurance +
 * payment section lives on `pricing-insurance` and `pricing-payment`. This
 * page-Global retains only the generic pageFields() — title, slug, route,
 * publishStatus, composable `sections` block array, and SEO group.
 *
 * The legacy nested groups (overviewBlock / footnoteBlock / insurancePaymentBlock)
 * are intentionally dropped from the field schema after their values have been
 * copied into the new section globals (Rule 4 — no unilateral deletes; data
 * is preserved in the new globals before removal).
 */
export const PricingPage: GlobalConfig = {
  slug: 'pricing-page',
  label: 'Pricing: Page',
  admin: {
    hidden: true,
    group: 'Treatments',
    description:
      'Page-level metadata for /pricing — title, slug, route, SEO, publishStatus, and a CmsExtraBlocks slot. Hero / Overview / Footnote / Insurance / Payment are edited via the dedicated Pricing globals in this bucket.',
  },
  access: { read: publishedOrAuthed, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [...pageFields({ hideHero: true })],
}

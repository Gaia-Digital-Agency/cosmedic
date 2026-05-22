import type { GlobalConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { pageFields } from './_pageFields'

export const PricingPage: GlobalConfig = {
  slug: 'pricing-page',
  admin: {
    group: 'Pricing',
    description: 'Editorial content for /pricing: hero text only. The clinic catalogue table is rendered line-by-line from PriceListItems.',
  },
  access: { read: publishedOrAuthed, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: pageFields(),
}

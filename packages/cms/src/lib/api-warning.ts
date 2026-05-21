import type { Field } from 'payload'

/**
 * Shared UI field that renders the developer-only API warning banner
 * at the top of any collection or global edit form. Slot it as the first
 * entry in the `fields` array.
 *
 * Usage:
 *   fields: [
 *     apiWarningField,
 *     // ...rest
 *   ]
 */
export const apiWarningField: Field = {
  name: 'apiWarning',
  type: 'ui',
  admin: {
    components: {
      Field: '@/components/ApiWarningBanner',
    },
  },
}

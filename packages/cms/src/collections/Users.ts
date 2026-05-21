import type { CollectionConfig } from 'payload'
import { apiWarningField } from '../lib/api-warning'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    apiWarningField,
    // Email added by default
    // Add more fields as needed
  ],
}

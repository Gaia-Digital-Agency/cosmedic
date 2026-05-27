import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    // Email added by default
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Profile photo shown in the CMS admin sidebar.' },
    },
  ],
}

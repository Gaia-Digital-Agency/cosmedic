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
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'admin',
      options: [
        { label: 'Admin — sees all fields', value: 'admin' },
        { label: 'Editor — sees simplified fields', value: 'editor' },
      ],
      admin: {
        description: 'Controls which CMS fields are visible to this user.',
        position: 'sidebar',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Profile photo shown in the CMS admin sidebar.' },
    },
  ],
}

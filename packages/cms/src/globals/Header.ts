import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'

export const Header: GlobalConfig = {
  slug: 'header',
  admin: { group: 'Site Settings', description: 'Site header — logo, nav items, mega-menus, locale switcher.' },
  access: { read: readPublic, update: isAuthenticated },
  fields: [
    { name: 'logoLight', type: 'upload', relationTo: 'media', admin: { description: 'Used on cream/light background' } },
    { name: 'logoDark', type: 'upload', relationTo: 'media', admin: { description: 'Used on dark sections' } },
    {
      name: 'navItems',
      type: 'array',
      admin: { description: 'Top-level nav items, in order' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        { name: 'activePattern', type: 'text', admin: { description: 'Regex or prefix to mark active' } },
        {
          name: 'megaMenu',
          type: 'array',
          admin: { description: 'Optional mega-menu columns under this nav item' },
          fields: [
            { name: 'heading', type: 'text', required: true },
            { name: 'items', type: 'array', required: true, fields: [
              { name: 'label', type: 'text', required: true },
              { name: 'href', type: 'text', required: true },
            ] },
          ],
        },
      ],
    },
    {
      name: 'localeSwitcher',
      type: 'group',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        { name: 'labelEn', type: 'text', defaultValue: 'EN' },
        { name: 'labelId', type: 'text', defaultValue: 'ID' },
      ],
    },
  ],
}

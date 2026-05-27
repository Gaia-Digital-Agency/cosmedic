import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidateGlobalAfterChange } from '../lib/revalidate'
import { apiWarningField } from '../lib/api-warning'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  admin: {
    group: 'Homepage',
    description: 'Top navigation bar on every page: logo, primary nav items (Treatments, Doctors, Results, Pricing, Your Journey, Contact), mega-menu columns, EN|ID switcher.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    {
      name: 'navItems',
      type: 'array',
      admin: { description: 'Top-level primary nav items rendered left-to-right after the logo. Each item can have an optional mega-menu dropdown.' },
      fields: [
        { name: 'label', type: 'text', required: true,
          admin: { description: 'Display text shown in the nav bar.' } },
        { name: 'href', type: 'text', required: true,
          admin: { description: 'Where the nav item links to, e.g. "/treatments".' } },
        { name: 'activePattern', type: 'text',
          admin: { description: 'Regex/prefix used to highlight this nav item as active when the user is on a matching route.' } },
        {
          name: 'megaMenu',
          type: 'array',
          admin: { description: 'Columns shown in the mega-menu dropdown on hover. Each column = one heading + a list of sub-links.' },
          fields: [
            { name: 'heading', type: 'text', required: true,
              admin: { description: 'Column heading shown at the top of the mega-menu column.' } },
            { name: 'items', type: 'array', required: true,
              admin: { description: 'Sub-links listed under the column heading.' },
              fields: [
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
      admin: { description: 'Top-right EN | ID switcher (between primary nav and the "Plan Your Treatment" CTA). Currently visible-but-disabled until Phase 9 ID locale ships.' },
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true,
          admin: { description: 'Toggle the switcher off entirely to hide it from every page.' } },
        { name: 'labelEn', type: 'text', defaultValue: 'EN',
          admin: { description: 'Text shown on the English pill (default "EN").' } },
        { name: 'labelId', type: 'text', defaultValue: 'ID',
          admin: { description: 'Text shown on the Indonesian pill (default "ID").' } },
      ],
    },
    { name: 'logoLight', type: 'upload', relationTo: 'media',
      admin: { description: 'Top-left logo on every page (default state: light/cream background). Recommended ~56px tall PNG with transparent background.' } },
    { name: 'logoDark', type: 'upload', relationTo: 'media',
      admin: { description: 'Top-left logo when header scrolls past the hero into dark sections. Auto-swaps with Logo Light via CSS.' } },
  ],
}

import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'

export const EndorsementMark: GlobalConfig = {
  slug: 'endorsement-mark',
  admin: { group: 'Brand', description: '"Managed by BIMC Hospital" lockup. Sourced from brand.pdf §I.' },
  access: { read: readPublic, update: isAuthenticated },
  fields: [
    { name: 'endorsementLine', type: 'text', defaultValue: 'Managed by BIMC Hospital · Nusa Dua · Bali' },
    { name: 'primaryLockup', type: 'upload', relationTo: 'media',
      admin: { description: 'Ink on light-beige variant' } },
    { name: 'inverseLockup', type: 'upload', relationTo: 'media',
      admin: { description: 'White on dark variant' } },
    { name: 'clearspaceUnit', type: 'text', defaultValue: '1X (height of medical cross)' },
    { name: 'minScreenWidthPx', type: 'number', defaultValue: 96 },
    { name: 'minPrintMmWidth', type: 'number', defaultValue: 24 },
  ],
}

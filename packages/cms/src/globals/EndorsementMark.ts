import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidateGlobalAfterChange } from '../lib/revalidate'
import { apiWarningField } from '../lib/api-warning'

export const EndorsementMark: GlobalConfig = {
  slug: 'endorsement-mark',
  admin: {
    group: 'Homepage',
    description: '"Managed by BIMC Hospital" co-brand mark rendered next to the logo in BOTH the header and the footer on every page. Sourced from brand.pdf §I.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    { name: 'endorsementLine', type: 'text', defaultValue: 'Managed by BIMC Hospital · Nusa Dua · Bali',
      admin: { description: 'Tiny mono-font caption next to the logo on every page (both header and footer). Falls back to this text when no image lockup is uploaded.' } },
    { name: 'primaryLockup', type: 'upload', relationTo: 'media',
      admin: { description: 'Image lockup rendered next to the HEADER logo (ink-on-light variant). When set, replaces the endorsement-line text in the header.' } },
    { name: 'inverseLockup', type: 'upload', relationTo: 'media',
      admin: { description: 'Image lockup rendered next to the FOOTER logo (white-on-dark variant). When set, replaces the endorsement-line text in the footer.' } },
    { name: 'clearspaceUnit', type: 'text', defaultValue: '1X (height of medical cross)',
      admin: { description: 'Brand-guideline clearspace rule (documentation only — not rendered).' } },
    { name: 'minScreenWidthPx', type: 'number', defaultValue: 96,
      admin: { description: 'Minimum on-screen display width per brand guidelines (documentation only).' } },
    { name: 'minPrintMmWidth', type: 'number', defaultValue: 24,
      admin: { description: 'Minimum print display width per brand guidelines (documentation only).' } },
  ],
}

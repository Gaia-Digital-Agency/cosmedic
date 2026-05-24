/**
 * Phase Q — q7 footer redesign data migration.
 *
 * Replaces Footer.linkColumns with the change2a.pdf target:
 *   [About (7), Connect (4)]
 *
 * The Treatments column is excluded — it renders auto from cms.disciplines
 * (q8). Footer.tsx filters any linkColumns entry with heading 'treatments'
 * so the editor cannot create a duplicate.
 *
 * Run via:
 *   NODE_ENV=production pnpm --filter @cosmedic/cms exec \
 *     tsx src/seed/q7-footer-linkcolumns.ts
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

async function main() {
  const payload = await getPayload({ config })

  const settings = (await payload.findGlobal({ slug: 'settings' })) as { whatsappNumber?: string }
  const wa = settings.whatsappNumber || ''
  const waHref = wa
    ? wa.startsWith('http') ? wa : `https://wa.me/${wa.replace(/[^0-9]/g, '')}`
    : '#'

  const linkColumns = [
    {
      heading: 'About',
      items: [
        { label: 'Doctors', href: '/surgeons' },
        { label: 'Your Journey', href: '/journey' },
        { label: 'Results', href: '/results' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Press', href: '/press' },
        { label: 'Blog', href: '/blog' },
        { label: 'Privacy & Terms', href: '/privacy' },
      ],
    },
    {
      heading: 'Connect',
      items: [
        { label: 'Contact', href: '/contact' },
        { label: 'WhatsApp', href: waHref },
        { label: 'Instagram', href: '#' },
        { label: 'Facebook', href: '#' },
      ],
    },
  ]

  await payload.updateGlobal({ slug: 'footer', data: { linkColumns } })
  console.log('[q7] Footer.linkColumns updated:')
  for (const col of linkColumns) {
    console.log(`  ${col.heading} (${col.items.length})`)
    for (const it of col.items) console.log(`    - ${it.label} -> ${it.href}`)
  }
  process.exit(0)
}

main().catch((err) => {
  console.error('[q7] failed:', err)
  process.exit(1)
})

/**
 * Item 11.b — seed Footer global with all atoms verbatim from current
 * hardcoded Footer.tsx fallback values + seed Settings.socialLinks for
 * Instagram + Facebook (currently href="#" placeholders).
 *
 * Per [feedback_no_frontend_data_loss.md] step 1: copy-paste from source
 * verbatim, do not paraphrase. Strings below are exact bytes from the
 * current Footer.tsx render at md5 b156659f3c1143d0aed53262f96cbc00.
 *
 * Idempotent: re-running overwrites the same atoms with the same values.
 *
 * Run: NODE_ENV=production pnpm --filter @cosmedic/cms exec tsx src/seed/seed-footer-atoms.ts
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

async function main() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const payload = await getPayload({ config: config as any })

  payload.logger.info('[11b-seed] starting footer atoms seed')

  // 1) Footer global — populate all new fields with bytes from the
  //    pre-change Footer.tsx baseline.
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      brandTagline: 'Managed by BIMC Hospital',
      treatmentsHeading: 'Treatments',
      newsletter: {
        label: 'Receive our quarterly journal',
        placeholder: 'Your email address',
        buttonLabel: '→',
      },
      linkColumns: [
        {
          heading: 'About',
          items: [
            { label: 'Doctors', href: '/surgeons', social: 'none' },
            { label: 'Your Journey', href: '/journey', social: 'none' },
            { label: 'Results', href: '/results', social: 'none' },
            { label: 'Pricing', href: '/pricing', social: 'none' },
            { label: 'Press', href: '/press', social: 'none' },
            { label: 'Blog', href: '/blog', social: 'none' },
            { label: 'Privacy & Terms', href: '/privacy', social: 'none' },
          ],
        },
        {
          heading: 'Connect',
          items: [
            { label: 'Contact', href: '/contact', social: 'none' },
            // WhatsApp href is auto-derived from Settings.whatsappNumber at
            // render time; the social flag tells Footer.tsx to do that.
            // Manual href is required by the schema (won't be displayed).
            { label: 'WhatsApp', href: '#', social: 'whatsapp' },
            // Instagram + Facebook resolved from Settings.socialLinks at
            // render time. Manual href left as '#' for backwards-compat;
            // social flag wins.
            { label: 'Instagram', href: '#', social: 'instagram' },
            { label: 'Facebook', href: '#', social: 'facebook' },
          ],
        },
      ],
      footerBottomLines: [
        { text: '© {year} BIMC CosMedic Centre' },
        { text: 'PT Trisaka Reksa Waluya' },
        { text: 'Designed in Bali' },
      ],
    },
  })
  payload.logger.info('[11b-seed] footer global updated')

  // 2) Settings.socialLinks — seed Instagram + Facebook with the current
  //    placeholder '#' href so the existing Footer.tsx behaviour stays
  //    byte-identical. Clinic edits real URLs in admin later.
  const settings = await payload.findGlobal({ slug: 'settings' })
  const existing = Array.isArray(settings.socialLinks) ? settings.socialLinks : []
  const hasInstagram = existing.some((s) => s.platform === 'instagram')
  const hasFacebook = existing.some((s) => s.platform === 'facebook')

  if (!hasInstagram || !hasFacebook) {
    const toAdd = [
      ...(hasInstagram ? [] : [{ platform: 'instagram', url: '#' }]),
      ...(hasFacebook ? [] : [{ platform: 'facebook', url: '#' }]),
    ]
    await payload.updateGlobal({
      slug: 'settings',
      data: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        socialLinks: [...existing, ...toAdd] as any,
      },
    })
    payload.logger.info(`[11b-seed] settings.socialLinks: added ${toAdd.map((t) => t.platform).join(', ') || 'nothing'}`)
  } else {
    payload.logger.info('[11b-seed] settings.socialLinks: both platforms already present')
  }

  payload.logger.info('[11b-seed] done')
  process.exit(0)
}

main().catch((err) => {
  console.error('[11b-seed] FAILED:', err)
  process.exit(1)
})

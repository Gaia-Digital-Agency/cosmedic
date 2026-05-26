/**
 * CR25May 25.10 — N0 mobile UX visual-quality pass.
 *
 * Captures every public route × 5 mobile-and-tablet widths against
 * production, saves screenshots to test-results/n0-baseline/{width}/{slug}.png,
 * and emits per-capture metrics (scroll height, overflow flag, touch-target
 * count, font sizes used) to test-results/n0-baseline/metrics.json so the
 * subsequent pass can grep for findings without re-loading every page.
 */
import { test, expect } from '@playwright/test'
import fs from 'node:fs'
import path from 'node:path'

const BASE = 'https://cosmedic.gaiada.online'
const WIDTHS = [320, 375, 414, 640, 768] as const
// Save outside test-results because playwright wipes that dir per-run
const OUT_ROOT = path.resolve('qa-reports/n0-baseline')

const ROUTES = [
  // home + 13 static
  { slug: 'home', path: '/' },
  { slug: 'treatments', path: '/treatments' },
  { slug: 'surgeons', path: '/surgeons' },
  { slug: 'results', path: '/results' },
  { slug: 'gallery', path: '/gallery' },
  { slug: 'stories', path: '/stories' },
  { slug: 'journey', path: '/journey' },
  { slug: 'pricing', path: '/pricing' },
  { slug: 'recovery-stays', path: '/recovery-stays' },
  { slug: 'press', path: '/press' },
  { slug: 'contact', path: '/contact' },
  { slug: 'video-consult', path: '/video-consult' },
  { slug: 'blog', path: '/blog' },
  { slug: 'privacy', path: '/privacy' },

  // 6 disciplines (weight-loss renamed from recovery in 25.14)
  ...['weight-loss', 'dental', 'hair', 'non-surgical', 'reconstructive', 'surgical'].map(
    (s) => ({ slug: `discipline-${s}`, path: `/treatments/${s}` }),
  ),

  // 17 subcategories — nested paths after 25.15 (discipline/slug)
  // weight-loss: bariatric (was surgical), endoscopic, glp-1 (was weight-loss-medical 25.14)
  { slug: 'subcat-weight-loss-bariatric',    path: '/treatments/weight-loss/bariatric' },
  { slug: 'subcat-weight-loss-endoscopic',   path: '/treatments/weight-loss/endoscopic' },
  { slug: 'subcat-weight-loss-glp1',         path: '/treatments/weight-loss/glp-1' },
  { slug: 'subcat-dental-alignment',         path: '/treatments/dental/alignment' },
  { slug: 'subcat-dental-veneers',           path: '/treatments/dental/veneers' },
  { slug: 'subcat-dental-whitening',         path: '/treatments/dental/whitening' },
  { slug: 'subcat-hair-fue',                 path: '/treatments/hair/fue' },
  { slug: 'subcat-hair-therapy',             path: '/treatments/hair/therapy' },
  { slug: 'subcat-nonsurgical-injectables',  path: '/treatments/non-surgical/injectables' },
  { slug: 'subcat-nonsurgical-laser',        path: '/treatments/non-surgical/laser' },
  { slug: 'subcat-nonsurgical-skin',         path: '/treatments/non-surgical/skin' },
  { slug: 'subcat-recon-breast',             path: '/treatments/reconstructive/breast' },
  { slug: 'subcat-recon-craniofacial',       path: '/treatments/reconstructive/craniofacial' },
  { slug: 'subcat-recon-trauma',             path: '/treatments/reconstructive/trauma' },
  { slug: 'subcat-surgical-body',            path: '/treatments/surgical/body' },
  { slug: 'subcat-surgical-breast',          path: '/treatments/surgical/breast' },
  { slug: 'subcat-surgical-face',            path: '/treatments/surgical/face' },

  // 8 surgeons
  ...['astri', 'indra', 'risma', 'rosa', 'sissy', 'suka', 'theresia', 'wara'].map(
    (s) => ({ slug: `surgeon-${s}`, path: `/surgeons/${s}` }),
  ),

  // 7 blog posts
  ...[
    'achsi-what-it-means', 'before-you-fly', 'crani-bali',
    'dental-veneers-honesty', 'fillers-restraint', 'the-quiet-rhinoplasty', 'the-villa-protocol',
  ].map((s) => ({ slug: `blog-${s}`, path: `/blog/${s}` })),
] as const

interface Metric {
  slug: string
  path: string
  width: number
  status: number
  scrollHeight: number
  scrollWidth: number
  overflowX: boolean
  smallTouchTargets: number
  longestUnbrokenWord: number
  minBodyFontPx: number
  altMissing: number
}

fs.mkdirSync(path.join(OUT_ROOT, 'metrics'), { recursive: true })

test.describe('N0 mobile UX capture', () => {
  test.describe.configure({ mode: 'parallel' })
  for (const { slug, path: routePath } of ROUTES) {
    for (const width of WIDTHS) {
      test(`${slug} @ ${width}`, async ({ browser }) => {
        const context = await browser.newContext({
          viewport: { width, height: 900 },
          deviceScaleFactor: 1,
          isMobile: width <= 414,
          hasTouch: width <= 768,
        })
        const page = await context.newPage()
        const resp = await page.goto(BASE + routePath, { waitUntil: 'domcontentloaded', timeout: 60_000 })
        const status = resp?.status() ?? 0
        await page.addStyleTag({
          content: '*, *::before, *::after { animation: none !important; transition: none !important; }',
        })
        await page.waitForLoadState('networkidle', { timeout: 30_000 }).catch(() => {})

        const m = await page.evaluate(() => {
          const docEl = document.documentElement
          const scrollHeight = docEl.scrollHeight
          const scrollWidth = docEl.scrollWidth
          const overflowX = scrollWidth > window.innerWidth + 1
          let smallTouchTargets = 0
          for (const el of Array.from(document.querySelectorAll('a, button, [role="button"]'))) {
            const r = (el as HTMLElement).getBoundingClientRect()
            if (r.width > 0 && r.height > 0 && (r.width < 44 || r.height < 44)) smallTouchTargets++
          }
          // longest single token (word) length — proxies for overflow risk
          const text = document.body.innerText || ''
          let longestUnbrokenWord = 0
          for (const w of text.split(/\s+/)) if (w.length > longestUnbrokenWord) longestUnbrokenWord = w.length
          // min font-size used on visible text nodes (approximate via paragraphs / spans)
          let minBodyFontPx = 999
          for (const el of Array.from(document.querySelectorAll('p, span, li, a, button, h1, h2, h3, h4, h5, h6'))) {
            const txt = (el as HTMLElement).innerText?.trim() ?? ''
            if (!txt) continue
            const fs = parseFloat(getComputedStyle(el as HTMLElement).fontSize) || 0
            if (fs > 0 && fs < minBodyFontPx) minBodyFontPx = fs
          }
          // missing alt
          let altMissing = 0
          for (const img of Array.from(document.querySelectorAll('img'))) {
            if (!(img as HTMLImageElement).getAttribute('alt')) altMissing++
          }
          return { scrollHeight, scrollWidth, overflowX, smallTouchTargets, longestUnbrokenWord, minBodyFontPx, altMissing }
        })

        const widthDir = path.join(OUT_ROOT, String(width))
        fs.mkdirSync(widthDir, { recursive: true })
        const outFile = path.join(widthDir, `${slug}.png`)
        await page.screenshot({ path: outFile, fullPage: true, animations: 'disabled', timeout: 60_000 })

        const metricFile = path.join(OUT_ROOT, 'metrics', `${slug}-${width}.json`)
        fs.writeFileSync(metricFile, JSON.stringify({ slug, path: routePath, width, status, ...m }, null, 2))

        await context.close()
        expect(status, `${routePath} returned non-200`).toBeGreaterThanOrEqual(200)
        expect(status, `${routePath} returned 5xx`).toBeLessThan(500)
      })
    }
  }
})

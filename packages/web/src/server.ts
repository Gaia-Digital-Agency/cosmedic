import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { loadCmsCache } from './lib/cms'
import { enquirySchema, type EnquiryResponse } from './lib/enquiry-schema'
import { checkRateLimit } from './lib/enquiry-rate-limit'
import { checkAskRateLimit } from './lib/ask-rate-limit'
import { validateMessage, callVertex } from './lib/vertex'
import geoip from 'geoip-lite'
import { seoFor, renderSeoTags, renderAnalytics } from './lib/seo'
import { resolveRoute, stripLocalePrefix } from './router'
import type { Locale } from './i18n'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root = path.resolve(__dirname, '..')

const isProduction = process.env.NODE_ENV === 'production'
const port = Number(process.env.PORT) || 3007

const TOPIC_KEYWORDS: [string, string[]][] = [
  ['face',           ['face', 'facial', 'facelift', 'rhinoplasty', 'nose job', 'eyelid', 'blepharoplasty', 'otoplasty', 'ear reshap', 'jawline', 'jaw', 'chin', 'cheek', 'brow lift', 'forehead lift']],
  ['breast',         ['breast', 'augmentation', 'implant', 'mastopexy', 'nipple', 'areola', 'tram flap', 'diep', 'breast lift', 'breast reduction', 'breast recon']],
  ['body',           ['body', 'liposuction', 'lipo', 'tummy tuck', 'abdominoplasty', 'labia', 'arm lift', 'thigh lift', 'brachioplasty', 'mommy makeover']],
  ['reconstructive', ['reconstruct', 'scar revision', 'keloid', 'burn', 'cleft', 'craniofacial', 'trauma', 'orbital', 'microtia', 'skin graft', 'flap']],
  ['injectables',    ['botox', 'botulinum', 'filler', 'injectable', 'toxin', 'hyaluronic', 'dysport', 'juvederm', 'sculptra', 'radiesse', 'anti-wrinkle']],
  ['laser',          ['laser', 'resurfacing', 'picosecond', 'pico', 'fraxel', 'ipl', 'co2 laser', 'ablative', 'non-ablative', 'tattoo removal']],
  ['skin',           ['skin', 'chemical peel', 'hydrafacial', 'microneedling', 'prp', 'polynucleotide', 'mesotherapy', 'acne', 'pigment', 'melasma', 'rosacea']],
  ['hair',           ['hair', 'fue', 'dhi', 'hair transplant', 'alopecia', 'scalp', 'beard restoration', 'eyebrow restoration', 'follicle', 'thinning hair', 'hair loss']],
  ['dental',         ['dental', 'veneer', 'teeth', 'whitening', 'alignment', 'invisalign', 'clearcorrect', 'smile', 'porcelain', 'composite bonding', 'retainer', 'orthodontic']],
  ['weight-loss',    ['weight', 'bariatric', 'gastric bypass', 'gastric sleeve', 'bypass', 'sleeve gastrectomy', 'obesity', 'ozempic', 'semaglutide', 'tirzepatide', 'mounjaro', 'wegovy', 'glp-1', 'glp1', 'balloon', 'intragastric', 'endoscopic sleeve']],
]

function extractTopics(text: string): string[] {
  const lower = text.toLowerCase()
  return TOPIC_KEYWORDS
    .filter(([, keywords]) => keywords.some((kw) => lower.includes(kw)))
    .map(([topic]) => topic)
}

// Production-only singletons — initialised once at startup, reused per request.
let _prodTemplate: string | null = null
let _prodRender: ((url: string, cms?: unknown, locale?: string) => { html: string; status: number }) | null = null
let _preloadHints = ''

/** Extract locale preference from Cookie header (set by the EN|ID switcher in Phase D). */
function getCookieLocale(req: express.Request): Locale | null {
  const cookie = req.headers.cookie || ''
  const match = cookie.split(';').map((s) => s.trim()).find((s) => s.startsWith('locale_pref='))
  const val = match?.split('=')[1]
  return val === 'id' ? 'id' : null
}

async function createServer() {
  const app = express()

  // In production: cache template + render function + extract modulepreload hints
  // at startup so each request never touches disk or re-imports the module.
  // Also pre-warm the CMS cache so the very first user request is served fast.
  if (isProduction) {
    _prodTemplate = await fs.readFile(path.resolve(root, 'dist/client/index.html'), 'utf-8')
    const serverEntry = await import(path.resolve(root, 'dist/server/entry-server.js'))
    _prodRender = serverEntry.render

    const jsMatch = _prodTemplate.match(/src="(\/assets\/index-[^"]+\.js)"/)
    if (jsMatch) {
      _preloadHints = `<link rel="modulepreload" crossorigin href="${jsMatch[1]}">\n`
    }

    console.log('[cosmedic-web] pre-warming CMS cache...')
    await loadCmsCache().catch((err) =>
      console.warn('[cosmedic-web] pre-warm failed (will retry on first request):', err),
    )
    console.log('[cosmedic-web] CMS cache ready')
  }

  let vite: import('vite').ViteDevServer | undefined

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite')
    vite = await createViteServer({
      root,
      server: { middlewareMode: true },
      appType: 'custom',
    })
    app.use(vite.middlewares)
  } else {
    const compression = await import('compression').catch(() => null)
    if (compression) app.use(compression.default())
    app.use(
      '/assets',
      express.static(path.resolve(root, 'dist/client/assets'), {
        immutable: true,
        maxAge: '1y',
      }),
    )
    // Brand assets (favicon, lockup variants) live at dist/client root —
    // copied from public/ by Vite at build time. Serve them at the URL root
    // so /cosmedic-favicon.png and /favicon.ico resolve from both / and
    // /admin/login (admin meta references these as absolute root paths).
    app.use(
      express.static(path.resolve(root, 'dist/client'), {
        index: false,
        maxAge: '7d',
        extensions: false,
      }),
    )
  }

  // CMS revalidate hook target. Payload afterChange posts here on every save.
  app.post('/api/revalidate', express.json(), async (_req, res) => {
    try {
      await loadCmsCache(true)
      res.json({ ok: true })
    } catch (err) {
      res.status(500).json({ ok: false, error: String(err) })
    }
  })

  // Public enquiry endpoint. Validates with Zod, applies honeypot + IP
  // rate-limiting, then POSTs to Payload's /api/enquiries to create a record.
  // The Payload afterChange hook on Enquiries (cms/src/collections/Enquiries)
  // emails the clinic via nodemailer. We never expose internal errors to the
  // public; any unhandled failure responds with { ok: false, error: 'internal' }.
  app.post('/api/enquiry', express.json({ limit: '64kb' }), async (req, res) => {
    const respond = (status: number, body: EnquiryResponse): void => {
      res.status(status).json(body)
    }

    const parsed = enquirySchema.safeParse(req.body)
    if (!parsed.success) {
      const issues = parsed.error.issues.map((i) => ({
        path: i.path.join('.'),
        message: i.message,
      }))
      return respond(400, { ok: false, error: 'validation', issues })
    }
    const data = parsed.data

    const ip =
      (req.headers['x-forwarded-for'] as string | undefined)?.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      'unknown'

    const limit = checkRateLimit(ip)
    if (!limit.ok) {
      res.setHeader('Retry-After', String(limit.retryAfterSeconds))
      return respond(429, { ok: false, error: 'rate-limit', retryAfterSeconds: limit.retryAfterSeconds })
    }

    // Honeypot — pretend success but mark spam so the clinic can audit.
    const isSpam = Boolean(data.honeypot && data.honeypot.trim().length > 0)

    try {
      const payloadUrl = process.env.PAYLOAD_URL || 'http://127.0.0.1:4007'
      const upstream = await fetch(`${payloadUrl}/api/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone || undefined,
          country: data.country || undefined,
          treatmentInterestText: data.treatmentInterestText || data.treatmentInterestSlug || undefined,
          preferredDate: data.preferredDate || undefined,
          message: data.message || undefined,
          sourcePage: data.sourcePage || undefined,
          sourceCta: data.sourceCta || undefined,
          status: isSpam ? 'spam' : 'new',
          submittedAt: new Date().toISOString(),
          ip,
          userAgent: (req.headers['user-agent'] as string | undefined)?.slice(0, 500),
          honeypot: data.honeypot || undefined,
        }),
      })
      if (!upstream.ok) {
        console.warn(`[enquiry] payload responded ${upstream.status}`)
        return respond(500, { ok: false, error: 'internal' })
      }
      return respond(200, { ok: true })
    } catch (err) {
      console.warn('[enquiry] failed:', err)
      return respond(500, { ok: false, error: 'internal' })
    }
  })

  // ─── Ask The Doctor — AI chat endpoint ──────────────────────────────
  app.post('/api/ask', express.json({ limit: '8kb' }), async (req, res) => {
    const ip =
      (req.headers['x-forwarded-for'] as string | undefined)?.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      'unknown'

    const rl = checkAskRateLimit(ip)
    if (!rl.ok) {
      return res
        .status(429)
        .set('Retry-After', String(rl.retryAfter))
        .json({ error: 'Too many requests. Please try again shortly.' })
    }

    const message = String(req.body?.message || '').trim()
    const validation = validateMessage(message)
    if (!validation.ok) {
      return res.status(400).json({ error: validation.error })
    }

    try {
      const answer = await callVertex(message)
      // Fire-and-forget: log question to Analytics collection in CMS.
      const geo = geoip.lookup(ip)
      const payloadUrl = process.env.PAYLOAD_URL || 'http://127.0.0.1:4007'
      const topics = extractTopics(message)
      const wordCount = message.trim().split(/\s+/).filter(Boolean).length
      fetch(`${payloadUrl}/api/analytics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: message,
          topics: topics.length > 0 ? topics : undefined,
          wordCount,
          askedAt: new Date().toISOString(),
          ip,
          country: geo?.country || undefined,
          city: geo?.city || (geo?.timezone ? geo.timezone.split('/').pop()?.replace(/_/g, ' ') : undefined),
          timezone: geo?.timezone || undefined,
          userAgent: (req.headers['user-agent'] as string | undefined)?.slice(0, 500),
        }),
      }).catch((err) => console.warn('[ask] analytics log failed:', err))
      return res.json({ answer })
    } catch (err) {
      console.warn('[ask] vertex error:', err)
      return res.status(500).json({ error: 'Something went wrong. Please try again.' })
    }
  })

  // ─── SEO infra (Phase 13) ────────────────────────────────────────────
  // robots.txt — sourced from SeoDefaults.robotsTxt in the CMS, falling
  // back to a sensible default. Clinic can edit via Globals → SEO Defaults.
  app.get('/robots.txt', async (_req, res) => {
    const cms = await loadCmsCache()
    const cmsRobots = cms.seoDefaults?.robotsTxt
    res.type('text/plain').send(
      (cmsRobots && cmsRobots.trim()) ||
        `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /admin\n\nSitemap: https://cosmedic.gaiada.online/sitemap.xml\n`,
    )
  })

  // sitemap.xml — every known route. Static base list + per-CMS-collection
  // slugs (surgeons, disciplines, sub-categories, blog posts) so freshly-
  // added content is discoverable without a redeploy. Base URL pulled from
  // SeoDefaults.sitemapBaseUrl with a fallback.
  app.get('/sitemap.xml', async (_req, res) => {
    const cms = await loadCmsCache()
    const base = (cms.seoDefaults?.sitemapBaseUrl || '').trim() || 'https://cosmedic.gaiada.online'
    const staticRoutes = [
      '/',
      '/procedures',
      '/experts',
      '/journey',
      '/gallery',
      '/results',
      '/stories',
      '/press',
      '/pricing',
      '/recovery-stays',
      '/contact',
      '/video-consult',
      '/blog',
      '/privacy',
    ]
    const dynamic: string[] = []
    for (const d of cms.disciplines || []) {
      dynamic.push(`/procedures/${d.slug}`)
    }
    for (const sc of cms.subCategories || []) {
      const parent = sc.parent
      const parentSlug =
        parent && typeof parent === 'object' ? parent.slug : undefined
      if (!parentSlug) continue
      dynamic.push(`/procedures/${parentSlug}/${sc.slug}`)
    }
    for (const s of cms.surgeons || []) {
      dynamic.push(`/experts/${s.slug}`)
    }
    for (const bp of cms.blogPosts || []) {
      dynamic.push(`/blog/${bp.slug}`)
    }
    const all = [...staticRoutes, ...dynamic]
    const now = new Date().toISOString()
    // C7: emit both /{path} and /id/{path} for every route; each carries hreflang alternates.
    const urlEntries = all.flatMap((p) => {
      const enLoc = `${base}${p}`
      const idLoc = `${base}/id${p}`
      const alternates = [
        `    <xhtml:link rel="alternate" hreflang="en" href="${enLoc}"/>`,
        `    <xhtml:link rel="alternate" hreflang="id" href="${idLoc}"/>`,
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${enLoc}"/>`,
      ].join('\n')
      return [
        `  <url>\n    <loc>${enLoc}</loc>\n    <lastmod>${now}</lastmod>\n${alternates}\n  </url>`,
        `  <url>\n    <loc>${idLoc}</loc>\n    <lastmod>${now}</lastmod>\n${alternates}\n  </url>`,
      ]
    }).join('\n')
    res.type('application/xml').send(
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urlEntries}\n</urlset>\n`,
    )
  })

  app.use('*', async (req, res, next) => {
    try {
      const pathname = (req.originalUrl || '/').split('?')[0]

      // C1/C8: determine locale.
      // Order: URL /id prefix (wins) → cookie locale_pref → 'en'.
      const { locale: urlLocale, canonicalPath } = stripLocalePrefix(pathname)
      const locale: Locale = urlLocale === 'id'
        ? 'id'
        : (getCookieLocale(req) ?? 'en')

      // C9: 301-redirect legacy slug URLs before paying the SSR cost.
      // For /id/* requests, prefix the redirect target with /id.
      const preroute = resolveRoute(canonicalPath)
      if (preroute.kind === 'redirect') {
        const to = locale === 'id' ? `/id${preroute.to}` : preroute.to
        res.redirect(preroute.status, to)
        return
      }

      // Load the locale-correct CMS cache.
      // Falls back to EN values automatically via Payload fallback:true
      // until Phase F populates the ID locale content.
      const cms = await loadCmsCache(false, locale)

      let template: string
      let render: (url: string, cms?: unknown, locale?: string) => { html: string; status: number }

      if (!isProduction && vite) {
        template = await fs.readFile(path.resolve(root, 'index.html'), 'utf-8')
        template = await vite.transformIndexHtml(req.originalUrl, template)
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render
      } else {
        // Use startup-cached template and render — no disk I/O per request.
        template = _prodTemplate!
        render = _prodRender!
      }

      const { html: appHtml, status } = render(canonicalPath, cms, locale)
      const seo = seoFor(canonicalPath, cms, locale)
      const seoHtml = renderSeoTags(seo)
      const analyticsHtml = renderAnalytics()
      // C3: inject html lang attribute; replace <!--html-lang--> marker.
      const html = template
        .replace('<!--html-lang-->', locale)
        .replace('<!--ssr-outlet-->', appHtml)
        .replace('<!--seo-outlet-->', _preloadHints + seoHtml)
        .replace('<!--analytics-outlet-->', analyticsHtml)
      res
        .status(status)
        .set({ 'Content-Type': 'text/html' })
        .end(html)
    } catch (e) {
      if (!isProduction && vite) vite.ssrFixStacktrace(e as Error)
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`[cosmedic-web] ready on http://127.0.0.1:${port}`)
  })
}

createServer()

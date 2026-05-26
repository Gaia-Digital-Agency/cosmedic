import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { loadCmsCache } from './lib/cms'
import { enquirySchema, type EnquiryResponse } from './lib/enquiry-schema'
import { checkRateLimit } from './lib/enquiry-rate-limit'
import { checkAskRateLimit } from './lib/ask-rate-limit'
import { validateMessage, callVertex } from './lib/vertex'
import { seoFor, renderSeoTags, renderAnalytics } from './lib/seo'
import { resolveRoute } from './router'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root = path.resolve(__dirname, '..')

const isProduction = process.env.NODE_ENV === 'production'
const port = Number(process.env.PORT) || 3007

async function createServer() {
  const app = express()

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
      '/treatments',
      '/surgeons',
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
      dynamic.push(`/treatments/${d.slug}`)
    }
    for (const sc of cms.subCategories || []) {
      const parent = sc.parent
      const parentSlug =
        parent && typeof parent === 'object' ? parent.slug : undefined
      if (!parentSlug) continue
      dynamic.push(`/treatments/${parentSlug}/${sc.slug}`)
    }
    for (const s of cms.surgeons || []) {
      dynamic.push(`/surgeons/${s.slug}`)
    }
    for (const bp of cms.blogPosts || []) {
      dynamic.push(`/blog/${bp.slug}`)
    }
    const all = [...staticRoutes, ...dynamic]
    const now = new Date().toISOString()
    const urlEntries = all
      .map(
        (path) =>
          `  <url>\n    <loc>${base}${path}</loc>\n    <lastmod>${now}</lastmod>\n  </url>`,
      )
      .join('\n')
    res.type('application/xml').send(
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`,
    )
  })

  app.use('*', async (req, res, next) => {
    try {
      const pathname = (req.originalUrl || '/').split('?')[0]

      // 301-redirect legacy slug URLs before paying the SSR cost.
      const preroute = resolveRoute(pathname)
      if (preroute.kind === 'redirect') {
        res.redirect(preroute.status, preroute.to)
        return
      }

      // Refresh CMS cache (TTL'd in lib/cms; effectively no-op when warm).
      const cms = await loadCmsCache()

      let template: string
      let render: (url: string, cms?: unknown) => { html: string; status: number }

      if (!isProduction && vite) {
        template = await fs.readFile(path.resolve(root, 'index.html'), 'utf-8')
        template = await vite.transformIndexHtml(req.originalUrl, template)
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render
      } else {
        template = await fs.readFile(path.resolve(root, 'dist/client/index.html'), 'utf-8')
        const serverEntry = await import(path.resolve(root, 'dist/server/entry-server.js'))
        render = serverEntry.render
      }

      const { html: appHtml, status } = render(pathname, cms)
      const seo = seoFor(pathname, cms)
      const seoHtml = renderSeoTags(seo)
      const analyticsHtml = renderAnalytics()
      const html = template
        .replace('<!--ssr-outlet-->', appHtml)
        .replace('<!--seo-outlet-->', seoHtml)
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

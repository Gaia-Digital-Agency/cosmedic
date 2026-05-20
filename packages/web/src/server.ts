import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { loadCmsCache } from './lib/cms'

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
  }

  // CMS revalidate hook target. Payload afterChange will POST here (wired in Phase 7).
  app.post('/api/revalidate', express.json(), async (_req, res) => {
    try {
      await loadCmsCache(true)
      res.json({ ok: true })
    } catch (err) {
      res.status(500).json({ ok: false, error: String(err) })
    }
  })

  app.use('*', async (req, res, next) => {
    try {
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

      const pathname = (req.originalUrl || '/').split('?')[0]
      const { html: appHtml, status } = render(pathname, cms)
      const html = template.replace('<!--ssr-outlet-->', appHtml)
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

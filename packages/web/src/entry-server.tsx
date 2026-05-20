import React from 'react'
import { renderToString } from 'react-dom/server'
import { App } from './App'
import { resolveRoute } from './router'
import { setCmsCacheSync, type CmsCache } from './lib/cms'

export function render(url: string, cms?: CmsCache): { html: string; status: number } {
  // Hydrate the SSR-bundle's cms module cache so Proxy-backed content shims
  // (src/content/*.ts) resolve to live CMS data on this render pass. The
  // SSR bundle's cms.ts is a separate module instance from the server.ts
  // bundle's cms.ts, so we forward the cache explicitly.
  if (cms) setCmsCacheSync(cms)
  const route = resolveRoute(url)
  const appHtml = renderToString(<App route={route} cms={cms} />)
  // Embed the cache as JSON so client hydration matches without a refetch.
  const cmsJson = JSON.stringify(cms ?? null).replace(/</g, '\\u003c')
  const html =
    appHtml +
    `<script>window.__COSMEDIC_CMS__=${cmsJson};</script>`
  return { html, status: route.kind === 'notfound' ? 404 : 200 }
}

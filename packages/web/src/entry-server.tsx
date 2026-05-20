import React from 'react'
import { renderToString } from 'react-dom/server'
import { App } from './App'
import { resolveRoute } from './router'
import type { CmsCache } from './lib/cms'

export function render(url: string, cms?: CmsCache): { html: string; status: number } {
  const route = resolveRoute(url)
  const appHtml = renderToString(<App route={route} cms={cms} />)
  // Embed the cache as JSON so client hydration matches without a refetch.
  const cmsJson = JSON.stringify(cms ?? null).replace(/</g, '\\u003c')
  const html =
    appHtml +
    `<script>window.__COSMEDIC_CMS__=${cmsJson};</script>`
  return { html, status: route.kind === 'notfound' ? 404 : 200 }
}

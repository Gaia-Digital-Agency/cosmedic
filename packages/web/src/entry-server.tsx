import { renderToString } from 'react-dom/server'
import { App } from './App'
import { resolveRoute } from './router'
import { setCmsCacheSync, type CmsCache } from './lib/cms'
import type { Locale } from './i18n'

export function render(url: string, cms?: CmsCache, locale: Locale = 'en'): { html: string; status: number } {
  // Set the locale-specific cache so proxy-backed content shims (src/content/*.ts)
  // and getCmsCacheSync() calls within this synchronous render pass resolve to the
  // correct locale. renderToString is sync — no interleaving with other requests.
  if (cms) setCmsCacheSync(cms, locale)
  const route = resolveRoute(url)
  const appHtml = renderToString(<App route={route} cms={cms} />)
  // Embed cache + locale for client hydration so the first paint matches SSR.
  const cmsJson = JSON.stringify(cms ?? null).replace(/</g, '\\u003c')
  const html =
    appHtml +
    `<script>window.__COSMEDIC_CMS__=${cmsJson};window.__COSMEDIC_LOCALE__=${JSON.stringify(locale)};</script>`
  return { html, status: route.kind === 'notfound' ? 404 : 200 }
}

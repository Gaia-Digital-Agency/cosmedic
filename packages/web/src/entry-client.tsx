import { hydrateRoot } from 'react-dom/client'
import { App } from './App'
import { resolveRoute, stripLocalePrefix } from './router'
import { setCmsCacheSync, type CmsCache } from './lib/cms'
import type { Locale } from './i18n'

declare global {
  interface Window {
    __COSMEDIC_CMS__?: CmsCache
    __COSMEDIC_LOCALE__?: string
  }
}

// Restore the SSR cache into the right locale slot so the first client render matches.
if (typeof window !== 'undefined' && window.__COSMEDIC_CMS__) {
  const loc = (window.__COSMEDIC_LOCALE__ || 'en') as Locale
  setCmsCacheSync(window.__COSMEDIC_CMS__, loc)
}

hydrateRoot(
  document.getElementById('root')!,
  <App route={resolveRoute(stripLocalePrefix(window.location.pathname).canonicalPath)} cms={window.__COSMEDIC_CMS__} />,
)

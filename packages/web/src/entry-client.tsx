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
// Also always populate 'en' slot: lazy proxies (TREATMENT_LIST, SURGEON_LIST etc.) call
// getCmsCacheSync() with no arg which defaults to 'en'. Without this, the header nav
// dropdowns render empty on ID pages causing hydration mismatch and missing sections.
if (typeof window !== 'undefined' && window.__COSMEDIC_CMS__) {
  const loc = (window.__COSMEDIC_LOCALE__ || 'en') as Locale
  setCmsCacheSync(window.__COSMEDIC_CMS__, loc)
  if (loc !== 'en') setCmsCacheSync(window.__COSMEDIC_CMS__, 'en')
}

hydrateRoot(
  document.getElementById('root')!,
  <App route={resolveRoute(stripLocalePrefix(window.location.pathname).canonicalPath)} cms={window.__COSMEDIC_CMS__} />,
)

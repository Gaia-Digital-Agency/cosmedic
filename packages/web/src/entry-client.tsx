import { hydrateRoot } from 'react-dom/client'
import { App } from './App'
import { resolveRoute } from './router'
import { setCmsCacheSync, type CmsCache } from './lib/cms'

declare global {
  interface Window {
    __COSMEDIC_CMS__?: CmsCache
  }
}

// Restore the SSR cache so the first client render matches.
if (typeof window !== 'undefined' && window.__COSMEDIC_CMS__) {
  setCmsCacheSync(window.__COSMEDIC_CMS__)
}

hydrateRoot(
  document.getElementById('root')!,
  <App route={resolveRoute(window.location.pathname)} cms={window.__COSMEDIC_CMS__} />,
)

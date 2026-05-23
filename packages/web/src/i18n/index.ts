/**
 * Tiny i18n helper. Static UI strings only — editorial content lives in
 * Payload collections.
 *
 * Phase 9 quick-win scaffold. The full Phase 9 work (Payload localization
 * config, localized:true field flags on every editorial field, /id/* SSR
 * routing, ML-drafted Indonesian editorial copy) is deferred — see
 * docs/all_todo.md.
 *
 * Usage:
 *   import { t, useLocale } from '@/i18n'
 *   const locale = useLocale()
 *   t('cta.planYourTreatment', locale)
 */

import enJson from './en.json'
import idJson from './id.json'

export type Locale = 'en' | 'id'

const dicts: Record<Locale, Record<string, unknown>> = {
  en: enJson as Record<string, unknown>,
  id: idJson as Record<string, unknown>,
}

/** Look up a dotted key in the locale dict; fall back to EN if missing. */
export function t(key: string, locale: Locale = 'en'): string {
  const find = (dict: Record<string, unknown>): string | undefined => {
    const parts = key.split('.')
    let cur: unknown = dict
    for (const p of parts) {
      if (cur && typeof cur === 'object' && p in (cur as Record<string, unknown>)) {
        cur = (cur as Record<string, unknown>)[p]
      } else {
        return undefined
      }
    }
    return typeof cur === 'string' ? cur : undefined
  }
  return find(dicts[locale]) ?? find(dicts.en) ?? key
}

/**
 * Derive locale from the current pathname.
 * `/id/...` → 'id'; everything else → 'en'.
 * Used by SSR + client; safe to call without window.
 */
export function localeFromPath(pathname: string): Locale {
  return pathname.startsWith('/id/') || pathname === '/id' ? 'id' : 'en'
}

/**
 * Swap the locale prefix on a pathname. Used by the EN|ID switcher in
 * <Header> so clicking it preserves the user's current route while
 * flipping the locale.
 */
export function withLocale(pathname: string, locale: Locale): string {
  const stripped = pathname.replace(/^\/id(\/|$)/, '/').replace(/\/+$/, '') || '/'
  return locale === 'id' ? (stripped === '/' ? '/id' : `/id${stripped}`) : stripped
}

/** Hook-friendly wrapper for components that already know the locale. */
export function useLocale(currentPath?: string): Locale {
  if (typeof window !== 'undefined') return localeFromPath(window.location.pathname)
  return localeFromPath(currentPath || '/')
}

/**
 * Lexical → text + media URL helpers consumed by render components.
 *
 * `PUBLIC_PAYLOAD_URL` is the browser-facing origin (empty string =
 * root-relative; nginx routes `/api/media/...` to :4007). The
 * server-internal origin lives in `cms.fetch.ts`.
 */

import type { CmsMedia, Lexical, LexicalNode } from './cms.types'

/**
 * Browser-visible Payload origin. Empty string means "root-relative" —
 * the browser hits `/api/media/...` which nginx now serves directly from
 * disk at /var/www/cosmedic/packages/cms/media/ (no CMS process involved).
 * The server-internal PAYLOAD_URL (in cms.fetch.ts) is used only for SSR-time
 * fetches. Don't bake the internal 127.0.0.1:4007 into HTML; it isn't
 * reachable from outside the box.
 */
export const PUBLIC_PAYLOAD_URL = process.env.PUBLIC_PAYLOAD_URL || ''

/**
 * Cache-bust suffix appended to all CMS media URLs.
 * Increment when nginx config or file-serving method changes to force
 * browsers to fetch a fresh copy (avoids immutable-cached 404s from
 * prior CMS restart windows).
 */
const MEDIA_VER = 'v=1'

export function lexicalToText(value: Lexical): string {
  if (!value || !value.root || !value.root.children) return ''
  const walk = (nodes: LexicalNode[]): string =>
    nodes.map((n) => {
      if (n.text != null) return String(n.text)
      if (n.children) return walk(n.children)
      return ''
    }).join('')
  return value.root.children
    .map((c) => {
      if (c.children) return walk(c.children)
      return ''
    })
    .filter(Boolean)
    .join('\n\n')
}

export function lexicalToParagraphs(value: Lexical): string[] {
  if (!value || !value.root || !value.root.children) return []
  const walk = (nodes: LexicalNode[]): string =>
    nodes.map((n) => {
      if (n.text != null) return String(n.text)
      if (n.children) return walk(n.children)
      return ''
    }).join('')
  return value.root.children
    .map((c) => (c.children ? walk(c.children) : ''))
    .map((s) => s.trim())
    .filter(Boolean)
}

/** Append cache-bust param to a CMS-relative media URL. External http(s)
 *  URLs (user CDN / Cloudinary) are returned as-is. */
function withVer(url: string): string {
  if (url.startsWith('http')) return url
  return `${url}${url.includes('?') ? '&' : '?'}${MEDIA_VER}`
}

export function mediaUrl(m: number | CmsMedia | undefined | null, fallback?: string): string | undefined {
  if (!m) return fallback
  if (typeof m === 'number') return fallback
  // Suppress seed placeholders on the public site. Editors flip the
  // `isPlaceholder` flag off in the CMS once they upload a real photo.
  // Record remains editable; only public rendering is hidden.
  if ((m as { isPlaceholder?: boolean }).isPlaceholder === true) return fallback
  if (m.url) {
    const base = m.url.startsWith('http') ? m.url : `${PUBLIC_PAYLOAD_URL}${m.url}`
    return withVer(base)
  }
  return fallback
}

export function mediaAlt(m: number | CmsMedia | undefined | null, fallback = ''): string {
  if (!m || typeof m === 'number') return fallback
  return m.alt || fallback
}

/**
 * Build a srcset string from CmsMedia.sizes for use in <source srcset>.
 * Skips sizes that don't have a URL (Payload omits sizes smaller than
 * the original). Returns undefined if the media has no sizes hydrated
 * (e.g. when the value is just a number ref or sizes weren't included
 * in the depth=1 fetch).
 */
export function mediaSrcSet(m: number | CmsMedia | undefined | null): string | undefined {
  if (!m || typeof m === 'number' || !m.sizes) return undefined
  if ((m as { isPlaceholder?: boolean }).isPlaceholder === true) return undefined
  const parts: string[] = []
  for (const size of Object.values(m.sizes)) {
    if (!size || !size.url || !size.width) continue
    const base = size.url.startsWith('http') ? size.url : `${PUBLIC_PAYLOAD_URL}${size.url}`
    parts.push(`${withVer(base)} ${size.width}w`)
  }
  if (m.url && m.width) {
    const base = m.url.startsWith('http') ? m.url : `${PUBLIC_PAYLOAD_URL}${m.url}`
    parts.push(`${withVer(base)} ${m.width}w`)
  }
  return parts.length > 0 ? parts.join(', ') : undefined
}

/** Convenience: returns the original-format mimeType, used as <source type> hint. */
export function mediaMime(m: number | CmsMedia | undefined | null): string | undefined {
  if (!m || typeof m === 'number') return undefined
  return m.mimeType
}

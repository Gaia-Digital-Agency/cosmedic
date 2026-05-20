/**
 * afterChange / afterDelete hook factory that POSTs to the web's
 * /api/revalidate endpoint to bust the in-memory CMS cache.
 *
 * Attach to any collection whose data the web reads. The web responds with
 * { ok: true } after re-fetching the full cache (~1s).
 *
 * Quiet fail mode: if the web is unreachable (deploy in progress, etc.),
 * log a warning and continue — never block the editor save.
 */

const WEB_URL = process.env.WEB_URL || 'http://127.0.0.1:3007'

export async function revalidateWeb(reason: string, payload?: { logger?: { warn: (...a: unknown[]) => void; info: (...a: unknown[]) => void } }): Promise<void> {
  try {
    const res = await fetch(`${WEB_URL}/api/revalidate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason }),
    })
    if (!res.ok) {
      payload?.logger?.warn(`[revalidate] web responded ${res.status} for ${reason}`)
    } else {
      payload?.logger?.info(`[revalidate] web cache busted (${reason})`)
    }
  } catch (err) {
    payload?.logger?.warn(`[revalidate] failed to reach web (${reason}): ${(err as Error).message}`)
  }
}

type HookContext = {
  collection?: { slug?: string }
  global?: { slug?: string }
  req?: { payload?: { logger?: { warn: (...a: unknown[]) => void; info: (...a: unknown[]) => void } } }
}

export function revalidateAfterChange(_args: unknown, context?: HookContext): void {
  const slug = context?.collection?.slug || context?.global?.slug || 'unknown'
  // Fire-and-forget — don't await; editor returns immediately.
  void revalidateWeb(`change:${slug}`, context?.req?.payload)
}

export function revalidateAfterDelete(_args: unknown, context?: HookContext): void {
  const slug = context?.collection?.slug || 'unknown'
  void revalidateWeb(`delete:${slug}`, context?.req?.payload)
}

/**
 * Convenience: returns the hook config object to spread into a collection's
 * `hooks: revalidationHooks()`. Loosely typed to avoid Payload's deep generics
 * which differ per collection.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function revalidationHooks(): { afterChange: any[]; afterDelete: any[] } {
  return {
    afterChange: [
      ({ doc, req, collection }: any) => {
        void revalidateWeb(`change:${collection?.slug || 'unknown'}`, req?.payload)
        return doc
      },
    ],
    afterDelete: [
      ({ doc, req, collection }: any) => {
        void revalidateWeb(`delete:${collection?.slug || 'unknown'}`, req?.payload)
        return doc
      },
    ],
  }
}

/**
 * For globals, which only emit afterChange.
 */
export function revalidateGlobalAfterChange(): { afterChange: any[] } {
  return {
    afterChange: [
      ({ doc, req, global }: any) => {
        void revalidateWeb(`global:${global?.slug || 'unknown'}`, req?.payload)
        return doc
      },
    ],
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * Standalone CLI runner for just the media seed.
 *
 * Avoids the cross-package import chain (web/src/content/seed.ts uses
 * an `@/lib` alias that only resolves under the web package's tsconfig,
 * which tsx cannot honour when invoked from the cms package). The full
 * `pnpm seed` command stays for content; this script handles imagery.
 *
 * Usage: pnpm --filter @cosmedic/cms seed:media
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { runMediaSeed } from './media'

async function main(): Promise<void> {
  const payload = await getPayload({ config })
  try {
    const result = await runMediaSeed(payload)
    payload.logger.info({ result }, '[seed:media] success')
  } catch (err) {
    payload.logger.error({ err }, '[seed:media] failed')
    process.exitCode = 1
  } finally {
    if (typeof (payload.db as { destroy?: () => Promise<void> }).destroy === 'function') {
      await (payload.db as { destroy: () => Promise<void> }).destroy()
    }
    process.exit(process.exitCode ?? 0)
  }
}

main()

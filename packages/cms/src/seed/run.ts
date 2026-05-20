/**
 * CLI runner for the Phase 6 content seed.
 * Usage:  pnpm --filter @cosmedic/cms seed
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { runContentSeed } from './runtime'

async function main(): Promise<void> {
  const payload = await getPayload({ config })
  try {
    await runContentSeed(payload)
    payload.logger.info('[seed] success — exiting')
  } catch (err) {
    payload.logger.error({ err }, '[seed] failed')
    process.exitCode = 1
  } finally {
    if (typeof (payload.db as { destroy?: () => Promise<void> }).destroy === 'function') {
      await (payload.db as { destroy: () => Promise<void> }).destroy()
    }
    process.exit(process.exitCode ?? 0)
  }
}

main()

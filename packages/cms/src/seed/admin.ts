import type { Payload } from 'payload'

/**
 * Idempotent bootstrap of the first admin user.
 *
 * Reads PAYLOAD_SEED_ADMIN_EMAIL + PAYLOAD_SEED_ADMIN_PASSWORD from the
 * environment. If either is missing, the seed is skipped (production
 * environments that don't want this bootstrap simply omit the env vars).
 *
 * Per docs/cms_ops.md: this is a convenience-only credential. Phase 12
 * rotates it and creates per-editor accounts with role-based access.
 */
export async function seedSuperAdmin(payload: Payload): Promise<void> {
  const email = process.env.PAYLOAD_SEED_ADMIN_EMAIL
  const password = process.env.PAYLOAD_SEED_ADMIN_PASSWORD

  if (!email || !password) {
    return
  }

  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
    depth: 0,
  })

  if (existing.docs.length > 0) {
    return
  }

  await payload.create({
    collection: 'users',
    data: { email, password },
  })

  payload.logger.info(`[seed] super-admin user created: ${email}`)
}

/**
 * Idempotent upsert helpers shared by every seed module.
 */

import type { Payload } from 'payload'

export type AnyDoc = Record<string, unknown> & { id: string | number }

// Loose typing — Payload's collection-name unions are exhaustive but our seed
// touches all of them via a generic dispatcher. The narrow type is regained
// via the collection slug at runtime.
/* eslint-disable @typescript-eslint/no-explicit-any */
export async function upsert(
  payload: Payload,
  collection: string,
  whereField: string,
  whereValue: string,
  data: Record<string, unknown>,
): Promise<AnyDoc> {
  const existing = await (payload as any).find({
    collection,
    where: { [whereField]: { equals: whereValue } },
    limit: 1,
    depth: 0,
  })
  if (existing.docs.length > 0) {
    const doc = existing.docs[0] as AnyDoc
    const updated = await (payload as any).update({
      collection,
      id: doc.id,
      data,
      depth: 0,
    })
    return updated as AnyDoc
  }
  const created = await (payload as any).create({
    collection,
    data,
    depth: 0,
  })
  return created as AnyDoc
}

export async function upsertGlobal(payload: Payload, slug: string, data: Record<string, unknown>): Promise<void> {
  await (payload as any).updateGlobal({ slug, data })
}
/* eslint-enable @typescript-eslint/no-explicit-any */

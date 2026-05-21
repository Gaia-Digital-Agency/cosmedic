import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// NOTE: payload migrate:create regenerated this with ~40 extra ALTER/CREATE
// statements for columns + indexes that already exist in the live DB
// (the JSON snapshot in src/migrations is stale relative to the actual
// schema — drift from earlier dev pushes before strict migrations were on).
// Trimmed to just the new `is_placeholder` column + its index. A separate
// snapshot-resync pass can reconcile the rest later.

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "is_placeholder" boolean DEFAULT false;
    CREATE INDEX IF NOT EXISTS "media_is_placeholder_idx" ON "media" USING btree ("is_placeholder");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "media_is_placeholder_idx";
    ALTER TABLE "media" DROP COLUMN IF EXISTS "is_placeholder";
  `)
}

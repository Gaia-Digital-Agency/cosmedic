import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// q19 — Remove InclusionItems + ExclusionItems collections from CMS + DB.
// Both relations on Procedures (included → inclusion-items, excluded →
// exclusion-items) were unused (0 of 233 procedures populated either);
// the standalone collections (5 + 7 rows) had zero readers on the site
// (cmsCache.inclusions / .exclusions were fetched but never consumed).
// Site renders inclusion bullets from the free-text Procedures.detail.included[]
// array, which stays untouched. Removed from payload.config.ts + collection
// files + seed orchestrator + web cache/types/consumer first; DB drop here.

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "procedures_rels"
      DROP COLUMN IF EXISTS "inclusion_items_id",
      DROP COLUMN IF EXISTS "exclusion_items_id";
    ALTER TABLE "payload_locked_documents_rels"
      DROP COLUMN IF EXISTS "inclusion_items_id",
      DROP COLUMN IF EXISTS "exclusion_items_id";
    DROP TABLE IF EXISTS "inclusion_items" CASCADE;
    DROP TABLE IF EXISTS "exclusion_items" CASCADE;
    DROP TYPE IF EXISTS "enum_inclusion_items_scope";
    DROP TYPE IF EXISTS "enum_exclusion_items_scope";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Down recreates structure only — original 5 + 7 rows are NOT restored.
  await db.execute(sql`
    CREATE TYPE "enum_inclusion_items_scope" AS ENUM ('surgical-procedure');
    CREATE TYPE "enum_exclusion_items_scope" AS ENUM ('surgical-procedure');

    CREATE TABLE IF NOT EXISTS "inclusion_items" (
      "id" serial PRIMARY KEY,
      "text" character varying NOT NULL,
      "scope" "enum_inclusion_items_scope" DEFAULT 'surgical-procedure',
      "sort_order" numeric DEFAULT 0,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    CREATE INDEX IF NOT EXISTS "inclusion_items_created_at_idx" ON "inclusion_items" ("created_at");
    CREATE INDEX IF NOT EXISTS "inclusion_items_updated_at_idx" ON "inclusion_items" ("updated_at");

    CREATE TABLE IF NOT EXISTS "exclusion_items" (
      "id" serial PRIMARY KEY,
      "text" character varying NOT NULL,
      "scope" "enum_exclusion_items_scope" DEFAULT 'surgical-procedure',
      "sort_order" numeric DEFAULT 0,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    CREATE INDEX IF NOT EXISTS "exclusion_items_created_at_idx" ON "exclusion_items" ("created_at");
    CREATE INDEX IF NOT EXISTS "exclusion_items_updated_at_idx" ON "exclusion_items" ("updated_at");

    ALTER TABLE "procedures_rels"
      ADD COLUMN IF NOT EXISTS "inclusion_items_id" integer
        REFERENCES "inclusion_items"("id") ON DELETE CASCADE,
      ADD COLUMN IF NOT EXISTS "exclusion_items_id" integer
        REFERENCES "exclusion_items"("id") ON DELETE CASCADE;
    CREATE INDEX IF NOT EXISTS "procedures_rels_inclusion_items_id_idx" ON "procedures_rels" ("inclusion_items_id");
    CREATE INDEX IF NOT EXISTS "procedures_rels_exclusion_items_id_idx" ON "procedures_rels" ("exclusion_items_id");

    ALTER TABLE "payload_locked_documents_rels"
      ADD COLUMN IF NOT EXISTS "inclusion_items_id" integer
        REFERENCES "inclusion_items"("id") ON DELETE CASCADE,
      ADD COLUMN IF NOT EXISTS "exclusion_items_id" integer
        REFERENCES "exclusion_items"("id") ON DELETE CASCADE;
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_inclusion_items_id_idx" ON "payload_locked_documents_rels" ("inclusion_items_id");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_exclusion_items_id_idx" ON "payload_locked_documents_rels" ("exclusion_items_id");
  `)
}

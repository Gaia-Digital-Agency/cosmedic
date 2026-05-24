import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// q5 — Remove PricingTiers collection from CMS + DB.
// PricingTiers (3 rows: Consult only / Single procedure / Combined plan) was
// dead data: built into DisciplineContent.pricing by adaptDisciplineContent
// but no route consumer reads that field. Removed from payload.config.ts +
// seed orchestrator + web cache/adapters first; DB drop applied via psql
// per CLAUDE.md gotcha and registered here.

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "pricing_tiers_inclusions" CASCADE;
    DROP TABLE IF EXISTS "pricing_tiers" CASCADE;
    ALTER TABLE "payload_locked_documents_rels"
      DROP COLUMN IF EXISTS "pricing_tiers_id";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Down recreates structure only — original 3 rows are NOT restored.
  // (Editor can re-seed via Payload admin if collection is ever re-added.)
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pricing_tiers" (
      "id" serial PRIMARY KEY,
      "slug" character varying NOT NULL UNIQUE,
      "name" character varying NOT NULL,
      "descriptor" jsonb,
      "price_from_aud" numeric,
      "price_from_idr" numeric,
      "is_featured" boolean DEFAULT false,
      "sort_order" numeric,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    CREATE INDEX IF NOT EXISTS "pricing_tiers_slug_idx" ON "pricing_tiers" ("slug");
    CREATE INDEX IF NOT EXISTS "pricing_tiers_updated_at_idx" ON "pricing_tiers" ("updated_at");

    CREATE TABLE IF NOT EXISTS "pricing_tiers_inclusions" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "pricing_tiers"("id") ON DELETE CASCADE,
      "id" character varying PRIMARY KEY,
      "value" character varying NOT NULL
    );
    CREATE INDEX IF NOT EXISTS "pricing_tiers_inclusions_order_idx" ON "pricing_tiers_inclusions" ("_order");
    CREATE INDEX IF NOT EXISTS "pricing_tiers_inclusions_parent_id_idx" ON "pricing_tiers_inclusions" ("_parent_id");

    ALTER TABLE "payload_locked_documents_rels"
      ADD COLUMN IF NOT EXISTS "pricing_tiers_id" integer
        REFERENCES "pricing_tiers"("id") ON DELETE CASCADE;
  `)
}

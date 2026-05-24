import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Phase R7 — Bucket "f. Journey" detail.
//
// Adds (purely additive — no destructive changes to existing data):
//   • New singleton globals: journey-hero (table journey_hero) and
//     journey-stats (table journey_stats + array table journey_stats_stats).
//   • New columns on the existing rec_stays_pg global for hero group,
//     portfolio section, inclusions section.
//   • New array tables for rec_stays_pg.top_stats, .inclusions.
//   • New columns on journey_steps: number, image_id (+fk), image_hue.
//   • New array table journey_steps_bullets for per-step bullets.
//   • New columns on recovery_stays: bedrooms, pool_type, image_hue, body
//     (textarea), drive_time, nursing_note.
//
// The legacy chapter_title / tagline / lede / hero_image / pageFields blocks
// columns on rec_stays_pg remain in place — they back the CmsExtraBlocks slot.
// /journey + /recovery-stays still render byte-identical after this migration;
// seed-r7-journey.ts then populates the new tables/columns + replaces legacy
// journey-step + recovery-stay rows with the patient-journey + villa content.

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- journey-hero global ------------------------------------------------
    CREATE TABLE IF NOT EXISTS "journey_hero" (
      "id" SERIAL PRIMARY KEY,
      "chapter" varchar,
      "title_a" varchar,
      "title_b" varchar,
      "lede" varchar,
      "hero_image_id" integer,
      "image_hue" numeric,
      "image_label" varchar,
      "breadcrumb_label" varchar,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );
    CREATE INDEX IF NOT EXISTS "journey_hero_hero_image_idx" ON "journey_hero" ("hero_image_id");
    DO $$ BEGIN
      ALTER TABLE "journey_hero"
        ADD CONSTRAINT "journey_hero_hero_image_id_media_id_fk"
        FOREIGN KEY ("hero_image_id") REFERENCES "media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    -- journey-stats global -----------------------------------------------
    CREATE TABLE IF NOT EXISTS "journey_stats" (
      "id" SERIAL PRIMARY KEY,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );
    CREATE TABLE IF NOT EXISTS "journey_stats_stats" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY,
      "number" varchar NOT NULL,
      "label" varchar NOT NULL,
      "italic" boolean DEFAULT false
    );
    CREATE INDEX IF NOT EXISTS "journey_stats_stats_order_idx" ON "journey_stats_stats" ("_order");
    CREATE INDEX IF NOT EXISTS "journey_stats_stats_parent_id_idx" ON "journey_stats_stats" ("_parent_id");
    DO $$ BEGIN
      ALTER TABLE "journey_stats_stats"
        ADD CONSTRAINT "journey_stats_stats_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "journey_stats"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    -- rec_stays_pg new columns (existing legacy columns left intact) ----
    ALTER TABLE "rec_stays_pg" ADD COLUMN IF NOT EXISTS "hero_chapter" varchar;
    ALTER TABLE "rec_stays_pg" ADD COLUMN IF NOT EXISTS "hero_title_a" varchar;
    ALTER TABLE "rec_stays_pg" ADD COLUMN IF NOT EXISTS "hero_title_b" varchar;
    ALTER TABLE "rec_stays_pg" ADD COLUMN IF NOT EXISTS "hero_lede" varchar;
    ALTER TABLE "rec_stays_pg" ADD COLUMN IF NOT EXISTS "hero_hero_image_id" integer;
    ALTER TABLE "rec_stays_pg" ADD COLUMN IF NOT EXISTS "hero_image_hue" numeric;
    ALTER TABLE "rec_stays_pg" ADD COLUMN IF NOT EXISTS "hero_image_label" varchar;
    ALTER TABLE "rec_stays_pg" ADD COLUMN IF NOT EXISTS "hero_breadcrumb_label" varchar;
    ALTER TABLE "rec_stays_pg" ADD COLUMN IF NOT EXISTS "portfolio_section_eyebrow" varchar;
    ALTER TABLE "rec_stays_pg" ADD COLUMN IF NOT EXISTS "portfolio_section_heading_pre" varchar;
    ALTER TABLE "rec_stays_pg" ADD COLUMN IF NOT EXISTS "portfolio_section_heading_italic" varchar;
    ALTER TABLE "rec_stays_pg" ADD COLUMN IF NOT EXISTS "portfolio_section_heading_post" varchar;
    ALTER TABLE "rec_stays_pg" ADD COLUMN IF NOT EXISTS "portfolio_section_lede" varchar;
    ALTER TABLE "rec_stays_pg" ADD COLUMN IF NOT EXISTS "inclusions_section_eyebrow" varchar;
    ALTER TABLE "rec_stays_pg" ADD COLUMN IF NOT EXISTS "inclusions_section_heading_pre" varchar;
    ALTER TABLE "rec_stays_pg" ADD COLUMN IF NOT EXISTS "inclusions_section_heading_italic" varchar;
    ALTER TABLE "rec_stays_pg" ADD COLUMN IF NOT EXISTS "inclusions_section_heading_post" varchar;
    ALTER TABLE "rec_stays_pg" ADD COLUMN IF NOT EXISTS "inclusions_section_lede" varchar;

    CREATE INDEX IF NOT EXISTS "rec_stays_pg_hero_hero_image_idx" ON "rec_stays_pg" ("hero_hero_image_id");
    DO $$ BEGIN
      ALTER TABLE "rec_stays_pg"
        ADD CONSTRAINT "rec_stays_pg_hero_hero_image_id_media_id_fk"
        FOREIGN KEY ("hero_hero_image_id") REFERENCES "media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    -- rec_stays_pg top_stats array ---------------------------------------
    CREATE TABLE IF NOT EXISTS "rec_stays_pg_top_stats" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY,
      "number" varchar NOT NULL,
      "label" varchar NOT NULL,
      "italic" boolean DEFAULT false
    );
    CREATE INDEX IF NOT EXISTS "rec_stays_pg_top_stats_order_idx" ON "rec_stays_pg_top_stats" ("_order");
    CREATE INDEX IF NOT EXISTS "rec_stays_pg_top_stats_parent_id_idx" ON "rec_stays_pg_top_stats" ("_parent_id");
    DO $$ BEGIN
      ALTER TABLE "rec_stays_pg_top_stats"
        ADD CONSTRAINT "rec_stays_pg_top_stats_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "rec_stays_pg"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    -- rec_stays_pg inclusions array --------------------------------------
    CREATE TABLE IF NOT EXISTS "rec_stays_pg_inclusions" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY,
      "letter" varchar NOT NULL,
      "title" varchar NOT NULL,
      "body" varchar NOT NULL
    );
    CREATE INDEX IF NOT EXISTS "rec_stays_pg_inclusions_order_idx" ON "rec_stays_pg_inclusions" ("_order");
    CREATE INDEX IF NOT EXISTS "rec_stays_pg_inclusions_parent_id_idx" ON "rec_stays_pg_inclusions" ("_parent_id");
    DO $$ BEGIN
      ALTER TABLE "rec_stays_pg_inclusions"
        ADD CONSTRAINT "rec_stays_pg_inclusions_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "rec_stays_pg"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    -- journey_steps additions --------------------------------------------
    ALTER TABLE "journey_steps" ADD COLUMN IF NOT EXISTS "number" varchar;
    ALTER TABLE "journey_steps" ADD COLUMN IF NOT EXISTS "image_id" integer;
    ALTER TABLE "journey_steps" ADD COLUMN IF NOT EXISTS "image_hue" numeric;

    CREATE INDEX IF NOT EXISTS "journey_steps_image_idx" ON "journey_steps" ("image_id");
    DO $$ BEGIN
      ALTER TABLE "journey_steps"
        ADD CONSTRAINT "journey_steps_image_id_media_id_fk"
        FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    -- journey_steps_bullets array ----------------------------------------
    CREATE TABLE IF NOT EXISTS "journey_steps_bullets" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY,
      "letter" varchar NOT NULL,
      "text" varchar NOT NULL
    );
    CREATE INDEX IF NOT EXISTS "journey_steps_bullets_order_idx" ON "journey_steps_bullets" ("_order");
    CREATE INDEX IF NOT EXISTS "journey_steps_bullets_parent_id_idx" ON "journey_steps_bullets" ("_parent_id");
    DO $$ BEGIN
      ALTER TABLE "journey_steps_bullets"
        ADD CONSTRAINT "journey_steps_bullets_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "journey_steps"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    -- recovery_stays additions -------------------------------------------
    ALTER TABLE "recovery_stays" ADD COLUMN IF NOT EXISTS "bedrooms" varchar;
    ALTER TABLE "recovery_stays" ADD COLUMN IF NOT EXISTS "pool_type" varchar;
    ALTER TABLE "recovery_stays" ADD COLUMN IF NOT EXISTS "image_hue" numeric;
    ALTER TABLE "recovery_stays" ADD COLUMN IF NOT EXISTS "body" varchar;
    ALTER TABLE "recovery_stays" ADD COLUMN IF NOT EXISTS "drive_time" varchar;
    ALTER TABLE "recovery_stays" ADD COLUMN IF NOT EXISTS "nursing_note" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    -- Drop arrays first (FK constraints to parents)
    DROP TABLE IF EXISTS "journey_steps_bullets" CASCADE;
    DROP TABLE IF EXISTS "rec_stays_pg_inclusions" CASCADE;
    DROP TABLE IF EXISTS "rec_stays_pg_top_stats" CASCADE;
    DROP TABLE IF EXISTS "journey_stats_stats" CASCADE;
    DROP TABLE IF EXISTS "journey_stats" CASCADE;
    DROP TABLE IF EXISTS "journey_hero" CASCADE;

    ALTER TABLE "recovery_stays" DROP COLUMN IF EXISTS "nursing_note";
    ALTER TABLE "recovery_stays" DROP COLUMN IF EXISTS "drive_time";
    ALTER TABLE "recovery_stays" DROP COLUMN IF EXISTS "body";
    ALTER TABLE "recovery_stays" DROP COLUMN IF EXISTS "image_hue";
    ALTER TABLE "recovery_stays" DROP COLUMN IF EXISTS "pool_type";
    ALTER TABLE "recovery_stays" DROP COLUMN IF EXISTS "bedrooms";

    ALTER TABLE "journey_steps" DROP CONSTRAINT IF EXISTS "journey_steps_image_id_media_id_fk";
    DROP INDEX IF EXISTS "journey_steps_image_idx";
    ALTER TABLE "journey_steps" DROP COLUMN IF EXISTS "image_hue";
    ALTER TABLE "journey_steps" DROP COLUMN IF EXISTS "image_id";
    ALTER TABLE "journey_steps" DROP COLUMN IF EXISTS "number";

    ALTER TABLE "rec_stays_pg" DROP CONSTRAINT IF EXISTS "rec_stays_pg_hero_hero_image_id_media_id_fk";
    DROP INDEX IF EXISTS "rec_stays_pg_hero_hero_image_idx";
    ALTER TABLE "rec_stays_pg" DROP COLUMN IF EXISTS "inclusions_section_lede";
    ALTER TABLE "rec_stays_pg" DROP COLUMN IF EXISTS "inclusions_section_heading_post";
    ALTER TABLE "rec_stays_pg" DROP COLUMN IF EXISTS "inclusions_section_heading_italic";
    ALTER TABLE "rec_stays_pg" DROP COLUMN IF EXISTS "inclusions_section_heading_pre";
    ALTER TABLE "rec_stays_pg" DROP COLUMN IF EXISTS "inclusions_section_eyebrow";
    ALTER TABLE "rec_stays_pg" DROP COLUMN IF EXISTS "portfolio_section_lede";
    ALTER TABLE "rec_stays_pg" DROP COLUMN IF EXISTS "portfolio_section_heading_post";
    ALTER TABLE "rec_stays_pg" DROP COLUMN IF EXISTS "portfolio_section_heading_italic";
    ALTER TABLE "rec_stays_pg" DROP COLUMN IF EXISTS "portfolio_section_heading_pre";
    ALTER TABLE "rec_stays_pg" DROP COLUMN IF EXISTS "portfolio_section_eyebrow";
    ALTER TABLE "rec_stays_pg" DROP COLUMN IF EXISTS "hero_breadcrumb_label";
    ALTER TABLE "rec_stays_pg" DROP COLUMN IF EXISTS "hero_image_label";
    ALTER TABLE "rec_stays_pg" DROP COLUMN IF EXISTS "hero_image_hue";
    ALTER TABLE "rec_stays_pg" DROP COLUMN IF EXISTS "hero_hero_image_id";
    ALTER TABLE "rec_stays_pg" DROP COLUMN IF EXISTS "hero_lede";
    ALTER TABLE "rec_stays_pg" DROP COLUMN IF EXISTS "hero_title_b";
    ALTER TABLE "rec_stays_pg" DROP COLUMN IF EXISTS "hero_title_a";
    ALTER TABLE "rec_stays_pg" DROP COLUMN IF EXISTS "hero_chapter";
  `)
}

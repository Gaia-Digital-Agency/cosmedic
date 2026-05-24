import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Phase R3 — Bucket "b. Treatments" detail.
//
// Adds (purely additive — no destructive changes to existing data):
//   • New singleton globals:
//       treatments-hero               (table treatments_hero)
//       treatments-index-section      (table treatments_index_section)
//       treatments-stats              (table treatments_stats + array
//                                      treatments_stats_stats)
//       discipline-detail-template    (table discipline_detail_template)
//       sub-category-detail-template  (table sub_category_detail_template)
//
// Every other Bucket atom (per-discipline / per-sub-category / per-procedure
// hero, body, faqs, sections) already lives on the existing Disciplines /
// SubCategories / Procedures collection tables and is unchanged here.

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- treatments-hero global ---------------------------------------------
    CREATE TABLE IF NOT EXISTS "treatments_hero" (
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
    CREATE INDEX IF NOT EXISTS "treatments_hero_hero_image_idx" ON "treatments_hero" ("hero_image_id");
    DO $$ BEGIN
      ALTER TABLE "treatments_hero"
        ADD CONSTRAINT "treatments_hero_hero_image_id_media_id_fk"
        FOREIGN KEY ("hero_image_id") REFERENCES "media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    -- treatments-index-section global ------------------------------------
    CREATE TABLE IF NOT EXISTS "treatments_index_section" (
      "id" SERIAL PRIMARY KEY,
      "eyebrow" varchar,
      "heading" varchar,
      "lede" varchar,
      "read_more_label" varchar,
      "read_more_arrow" varchar,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    -- treatments-stats global + array ------------------------------------
    CREATE TABLE IF NOT EXISTS "treatments_stats" (
      "id" SERIAL PRIMARY KEY,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );
    CREATE TABLE IF NOT EXISTS "treatments_stats_stats" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY,
      "number" varchar NOT NULL,
      "label" varchar NOT NULL
    );
    CREATE INDEX IF NOT EXISTS "treatments_stats_stats_order_idx" ON "treatments_stats_stats" ("_order");
    CREATE INDEX IF NOT EXISTS "treatments_stats_stats_parent_id_idx" ON "treatments_stats_stats" ("_parent_id");
    DO $$ BEGIN
      ALTER TABLE "treatments_stats_stats"
        ADD CONSTRAINT "treatments_stats_stats_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "treatments_stats"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    -- discipline-detail-template global ----------------------------------
    CREATE TABLE IF NOT EXISTS "discipline_detail_template" (
      "id" SERIAL PRIMARY KEY,
      "toc_on_this_page_label" varchar,
      "toc_overview_label" varchar,
      "toc_sub_categories_label" varchar,
      "toc_procedures_label" varchar,
      "toc_faqs_label" varchar,
      "overview_heading" varchar,
      "choose_a_focus_heading" varchar,
      "choose_a_focus_body_template" varchar,
      "choose_a_focus_available_label" varchar,
      "choose_a_focus_coming_label" varchar,
      "procedures_heading" varchar,
      "procedures_intro" varchar,
      "faqs_heading" varchar,
      "related_eyebrow" varchar,
      "related_heading_italic" varchar,
      "related_heading_roman" varchar,
      "related_lede_template" varchar,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    -- sub-category-detail-template global --------------------------------
    CREATE TABLE IF NOT EXISTS "sub_category_detail_template" (
      "id" SERIAL PRIMARY KEY,
      "chapter_separator" varchar,
      "toc_on_this_page_label" varchar,
      "toc_overview_label" varchar,
      "toc_treatments_label" varchar,
      "toc_faqs_label" varchar,
      "take_a_step_eyebrow" varchar,
      "take_a_step_video_consult_label" varchar,
      "take_a_step_estimate_label" varchar,
      "take_a_step_whatsapp_label" varchar,
      "take_a_step_reply_line" varchar,
      "overview_heading" varchar,
      "treatments_heading" varchar,
      "treatments_intro" varchar,
      "faqs_heading" varchar,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "treatments_stats_stats" CASCADE;
    DROP TABLE IF EXISTS "treatments_stats" CASCADE;
    DROP TABLE IF EXISTS "treatments_index_section" CASCADE;
    DROP TABLE IF EXISTS "treatments_hero" CASCADE;
    DROP TABLE IF EXISTS "discipline_detail_template" CASCADE;
    DROP TABLE IF EXISTS "sub_category_detail_template" CASCADE;
  `)
}

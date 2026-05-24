import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Phase R4 — Bucket "c. Doctors" detail.
//
// Adds (purely additive — no destructive changes to existing data):
//   • surgeons-hero          → table surgeons_hero (singleton)
//   • surgeons-lead-view     → table surgeons_lead_view (singleton)
//   • surgeons-plastic-view  → table surgeons_plastic_view (singleton)
//   • surgeons-aesthetic-view→ table surgeons_aesthetic_view (singleton)
//   • surgeon-detail-template→ table surgeon_detail_template (singleton)
//     + array tables for the two training-row arrays
//
// /surgeons + /surgeons/<slug> still render byte-identical after this
// migration; seed-doctors-section-globals.ts then populates the 5 globals
// with the verbatim hardcoded copy from the routes, and SurgeonsIndex /
// SurgeonDetail are rewired to read from the cache.

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- surgeons-hero global -------------------------------------------------
    CREATE TABLE IF NOT EXISTS "surgeons_hero" (
      "id" SERIAL PRIMARY KEY,
      "chapter" varchar,
      "title_a" varchar,
      "title_b" varchar,
      "lede" varchar,
      "hero_image_id" integer,
      "image_hue" numeric DEFAULT 2,
      "image_label" varchar,
      "breadcrumb_label" varchar DEFAULT 'Surgeons',
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );
    CREATE INDEX IF NOT EXISTS "surgeons_hero_hero_image_idx" ON "surgeons_hero" ("hero_image_id");
    DO $$ BEGIN
      ALTER TABLE "surgeons_hero"
        ADD CONSTRAINT "surgeons_hero_hero_image_id_media_id_fk"
        FOREIGN KEY ("hero_image_id") REFERENCES "media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    -- surgeons-lead-view global --------------------------------------------
    CREATE TABLE IF NOT EXISTS "surgeons_lead_view" (
      "id" SERIAL PRIMARY KEY,
      "section_eyebrow" varchar,
      "block_eyebrow" varchar,
      "stat_label_trained" varchar DEFAULT 'Trained',
      "stat_label_specialty" varchar DEFAULT 'Specialty',
      "stat_label_distinction" varchar DEFAULT 'Distinction',
      "cta_label" varchar DEFAULT 'Read the full profile',
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    -- surgeons-plastic-view global -----------------------------------------
    CREATE TABLE IF NOT EXISTS "surgeons_plastic_view" (
      "id" SERIAL PRIMARY KEY,
      "eyebrow" varchar,
      "heading_a" varchar,
      "heading_italic" varchar,
      "heading_b" varchar,
      "lede" varchar,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    -- surgeons-aesthetic-view global ---------------------------------------
    CREATE TABLE IF NOT EXISTS "surgeons_aesthetic_view" (
      "id" SERIAL PRIMARY KEY,
      "eyebrow" varchar,
      "heading_a" varchar,
      "heading_italic" varchar,
      "heading_b" varchar,
      "lede" varchar,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    -- surgeon-detail-template global ---------------------------------------
    CREATE TABLE IF NOT EXISTS "surgeon_detail_template" (
      "id" SERIAL PRIMARY KEY,
      -- Hero
      "hero_lead_label" varchar DEFAULT 'Lead Surgeon',
      "hero_specialist_label" varchar DEFAULT 'Specialist',
      "hero_cta_consult_label" varchar DEFAULT 'Request a consultation',
      "hero_cta_treatments_label_template" varchar,
      "hero_cta_treatments_label_fallback" varchar DEFAULT 'Treatments',
      -- Breadcrumb
      "breadcrumb_home_label" varchar DEFAULT 'BIMC CosMedic',
      "breadcrumb_surgeons_label" varchar DEFAULT 'Surgeons',
      -- Stats row
      "stat_label_years" varchar DEFAULT 'Years in practice',
      "stat_label_distinction" varchar DEFAULT 'Distinction',
      "stat_label_specialty" varchar DEFAULT 'Specialty',
      -- Biography sidebar
      "biography_eyebrow" varchar DEFAULT 'Biography',
      "sidebar_label_specialism" varchar DEFAULT 'Specialism',
      "sidebar_label_credentials" varchar DEFAULT 'Credentials',
      "sidebar_label_languages" varchar DEFAULT 'Languages',
      "sidebar_label_availability" varchar DEFAULT 'Availability',
      "languages_fallback" varchar DEFAULT 'English · Bahasa Indonesia',
      "availability_fallback" varchar DEFAULT 'Mon & Thu in person · weekday mornings by video',
      -- Biography body
      "secondary_bio_paragraph" varchar,
      -- Specialty areas
      "specialty_eyebrow" varchar DEFAULT 'Specialty areas',
      "specialty_heading_template" varchar,
      -- Training & credentials
      "training_eyebrow" varchar DEFAULT 'Training & credentials',
      "training_row_practice_mid" varchar,
      -- Faculty
      "faculty_eyebrow" varchar DEFAULT 'The faculty',
      "faculty_heading_pre" varchar DEFAULT 'Meet the ',
      "faculty_heading_italic" varchar DEFAULT 'other practitioners.',
      "faculty_heading_post" varchar DEFAULT '',
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    -- surgeon_detail_template.training_row_labels array --------------------
    CREATE TABLE IF NOT EXISTS "surgeon_detail_template_training_row_labels" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY,
      "value" varchar NOT NULL
    );
    CREATE INDEX IF NOT EXISTS "surgeon_dtl_tpl_trnng_row_lbls_order_idx"
      ON "surgeon_detail_template_training_row_labels" ("_order");
    CREATE INDEX IF NOT EXISTS "surgeon_dtl_tpl_trnng_row_lbls_parent_id_idx"
      ON "surgeon_detail_template_training_row_labels" ("_parent_id");
    DO $$ BEGIN
      ALTER TABLE "surgeon_detail_template_training_row_labels"
        ADD CONSTRAINT "surgeon_dtl_tpl_trnng_row_lbls_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "surgeon_detail_template"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    -- surgeon_detail_template.training_row_rights array --------------------
    CREATE TABLE IF NOT EXISTS "surgeon_detail_template_training_row_rights" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY,
      "value" varchar NOT NULL
    );
    CREATE INDEX IF NOT EXISTS "surgeon_dtl_tpl_trnng_row_rghts_order_idx"
      ON "surgeon_detail_template_training_row_rights" ("_order");
    CREATE INDEX IF NOT EXISTS "surgeon_dtl_tpl_trnng_row_rghts_parent_id_idx"
      ON "surgeon_detail_template_training_row_rights" ("_parent_id");
    DO $$ BEGIN
      ALTER TABLE "surgeon_detail_template_training_row_rights"
        ADD CONSTRAINT "surgeon_dtl_tpl_trnng_row_rghts_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "surgeon_detail_template"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    -- Arrays first (FK to parents)
    DROP TABLE IF EXISTS "surgeon_detail_template_training_row_rights" CASCADE;
    DROP TABLE IF EXISTS "surgeon_detail_template_training_row_labels" CASCADE;
    DROP TABLE IF EXISTS "surgeon_detail_template" CASCADE;
    DROP TABLE IF EXISTS "surgeons_aesthetic_view" CASCADE;
    DROP TABLE IF EXISTS "surgeons_plastic_view" CASCADE;
    DROP TABLE IF EXISTS "surgeons_lead_view" CASCADE;
    DROP TABLE IF EXISTS "surgeons_hero" CASCADE;
  `)
}

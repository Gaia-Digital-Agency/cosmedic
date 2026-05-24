import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Phase R6 — Bucket "e. Pricing" detail.
//
// Adds 7 new singleton-global tables (purely additive — no destructive
// changes to existing data):
//
//   • pricing-hero                 → table pricing_hero
//   • pricing-overview             → table pricing_overview
//   • pricing-footnote             → table pricing_footnote
//   • pricing-insurance            → table pricing_insurance
//   • pricing-payment              → table pricing_payment
//   • pricing-discipline-list-view → table pricing_discipline_list_view
//   • pricing-catalogue-view       → table pricing_catalogue_view
//
// /pricing still renders byte-identical after this migration (and after
// seed-pricing-section-globals.ts seeds the new globals with verbatim
// hardcoded copy from PricingPage.tsx + ClinicCatalogueTable.tsx).
//
// Note: the legacy nested groups on pricing_page (overview_block,
// footnote_block, insurance_payment_block) are NOT dropped in this
// migration — they remain as a one-commit-rollback backup until the
// editor verifies the new globals and the user signs off.

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- pricing-hero global -------------------------------------------------
    CREATE TABLE IF NOT EXISTS "pricing_hero" (
      "id" SERIAL PRIMARY KEY,
      "chapter" varchar DEFAULT 'Chapter X — Pricing',
      "title_a" varchar DEFAULT 'Every treatment,',
      "title_b" varchar DEFAULT 'every price.',
      "lede" varchar,
      "hero_image_id" integer,
      "image_hue" numeric DEFAULT 2,
      "image_label" varchar DEFAULT 'PRICING',
      "breadcrumb_label" varchar DEFAULT 'Pricing',
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );
    CREATE INDEX IF NOT EXISTS "pricing_hero_hero_image_idx" ON "pricing_hero" ("hero_image_id");
    DO $$ BEGIN
      ALTER TABLE "pricing_hero"
        ADD CONSTRAINT "pricing_hero_hero_image_id_media_id_fk"
        FOREIGN KEY ("hero_image_id") REFERENCES "media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    -- pricing-overview global ---------------------------------------------
    CREATE TABLE IF NOT EXISTS "pricing_overview" (
      "id" SERIAL PRIMARY KEY,
      "eyebrow" varchar,
      "heading_part1" varchar,
      "heading_part2" varchar,
      "body" varchar,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    -- pricing-footnote global ---------------------------------------------
    CREATE TABLE IF NOT EXISTS "pricing_footnote" (
      "id" SERIAL PRIMARY KEY,
      "text" varchar,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    -- pricing-insurance global --------------------------------------------
    CREATE TABLE IF NOT EXISTS "pricing_insurance" (
      "id" SERIAL PRIMARY KEY,
      "eyebrow" varchar DEFAULT 'Insurance',
      "heading_roman" varchar DEFAULT 'Working',
      "heading_italic" varchar DEFAULT 'with insurers.',
      "body" varchar,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    -- pricing-payment global ----------------------------------------------
    CREATE TABLE IF NOT EXISTS "pricing_payment" (
      "id" SERIAL PRIMARY KEY,
      "eyebrow" varchar DEFAULT 'Payment',
      "heading_roman" varchar DEFAULT 'Quiet,',
      "heading_italic" varchar DEFAULT 'considered terms.',
      "terms_text" varchar,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    -- pricing-discipline-list-view global ---------------------------------
    CREATE TABLE IF NOT EXISTS "pricing_discipline_list_view" (
      "id" SERIAL PRIMARY KEY,
      "section_eyebrow" varchar,
      "on_request_label" varchar DEFAULT 'On request',
      "included_label" varchar DEFAULT 'Included',
      "arrow_char" varchar DEFAULT '→',
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    -- pricing-catalogue-view global ---------------------------------------
    CREATE TABLE IF NOT EXISTS "pricing_catalogue_view" (
      "id" SERIAL PRIMARY KEY,
      "section_eyebrow" varchar DEFAULT 'Clinic catalogue · CMS-managed',
      "heading_roman" varchar DEFAULT 'The full',
      "heading_italic" varchar DEFAULT 'clinic catalogue.',
      "intro_template" varchar,
      -- sheetLabels group
      "sheet_labels_surgical_title" varchar DEFAULT 'Surgical Procedures',
      "sheet_labels_surgical_subtitle" varchar DEFAULT '2025 & 2026 pricing · IDR + AUD',
      "sheet_labels_machine_title" varchar DEFAULT 'Machine Treatments',
      "sheet_labels_machine_subtitle" varchar DEFAULT 'Erbium · AFT · Q-switched · Pixel',
      "sheet_labels_injection_title" varchar DEFAULT 'Injectable Catalogue',
      "sheet_labels_injection_subtitle" varchar DEFAULT 'Named brand pricing per ml / unit',
      "sheet_labels_btl_title" varchar DEFAULT 'BTL Hair Removal',
      "sheet_labels_btl_subtitle" varchar DEFAULT 'Per area · per session',
      -- hairZoneLabels group
      "hair_zone_labels_face" varchar DEFAULT 'Face',
      "hair_zone_labels_upper_body" varchar DEFAULT 'Upper Body',
      "hair_zone_labels_lower_body" varchar DEFAULT 'Lower Body',
      "hair_zone_labels_package_zone" varchar DEFAULT 'Packages',
      "hair_zone_labels_other" varchar DEFAULT 'Other BTL',
      -- injectableCategoryLabels group
      "injectable_category_labels_botulinum_toxin" varchar DEFAULT 'Botulinum Toxin',
      "injectable_category_labels_filler" varchar DEFAULT 'Dermal Fillers',
      "injectable_category_labels_skin_booster" varchar DEFAULT 'Skin Boosters',
      "injectable_category_labels_collagen_stimulator" varchar DEFAULT 'Collagen Stimulators',
      "injectable_category_labels_bio_remodeling" varchar DEFAULT 'Bio-Remodeling',
      "injectable_category_labels_thread_lift" varchar DEFAULT 'Thread Lift',
      "injectable_category_labels_mesotherapy" varchar DEFAULT 'Mesotherapy',
      "injectable_category_labels_hgh" varchar DEFAULT 'HGH',
      "injectable_category_labels_other" varchar DEFAULT 'Other',
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    -- Ownership: Payload runtime connects as the cosmedic role -----------
    DO $$ BEGIN
      EXECUTE 'ALTER TABLE "pricing_hero" OWNER TO cosmedic';
      EXECUTE 'ALTER TABLE "pricing_overview" OWNER TO cosmedic';
      EXECUTE 'ALTER TABLE "pricing_footnote" OWNER TO cosmedic';
      EXECUTE 'ALTER TABLE "pricing_insurance" OWNER TO cosmedic';
      EXECUTE 'ALTER TABLE "pricing_payment" OWNER TO cosmedic';
      EXECUTE 'ALTER TABLE "pricing_discipline_list_view" OWNER TO cosmedic';
      EXECUTE 'ALTER TABLE "pricing_catalogue_view" OWNER TO cosmedic';
      EXECUTE 'ALTER SEQUENCE "pricing_hero_id_seq" OWNER TO cosmedic';
      EXECUTE 'ALTER SEQUENCE "pricing_overview_id_seq" OWNER TO cosmedic';
      EXECUTE 'ALTER SEQUENCE "pricing_footnote_id_seq" OWNER TO cosmedic';
      EXECUTE 'ALTER SEQUENCE "pricing_insurance_id_seq" OWNER TO cosmedic';
      EXECUTE 'ALTER SEQUENCE "pricing_payment_id_seq" OWNER TO cosmedic';
      EXECUTE 'ALTER SEQUENCE "pricing_discipline_list_view_id_seq" OWNER TO cosmedic';
      EXECUTE 'ALTER SEQUENCE "pricing_catalogue_view_id_seq" OWNER TO cosmedic';
    EXCEPTION WHEN OTHERS THEN NULL; END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "pricing_catalogue_view" CASCADE;
    DROP TABLE IF EXISTS "pricing_discipline_list_view" CASCADE;
    DROP TABLE IF EXISTS "pricing_payment" CASCADE;
    DROP TABLE IF EXISTS "pricing_insurance" CASCADE;
    DROP TABLE IF EXISTS "pricing_footnote" CASCADE;
    DROP TABLE IF EXISTS "pricing_overview" CASCADE;
    DROP TABLE IF EXISTS "pricing_hero" CASCADE;
  `)
}

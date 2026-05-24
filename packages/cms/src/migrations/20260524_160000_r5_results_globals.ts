import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Phase R5 — Bucket "d. Results" detail.
//
// Adds (purely additive — no destructive changes to existing data):
//   • results-hero                 → table results_hero (singleton)
//   • results-featured-cases-view  → table results_featured_cases_view (singleton)
//   • results-stories-view         → table results_stories_view (singleton)
//   • library-cta                  → table library_cta (singleton; shared by /results + /gallery)
//   • share-cta                    → table share_cta (singleton; shared by /results + /stories)
//
// Plus extends existing page-globals (no destructive changes):
//   • gallery_page: + image_hue, image_label, breadcrumb_label, filter_bar_label, count_format
//   • stories_page: + image_hue, image_label, breadcrumb_label
//
// /results + /gallery + /stories still render byte-identical after this
// migration (the seed step then populates the new globals + new gallery /
// stories fields with the verbatim hardcoded copy from the routes).

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- results-hero global -------------------------------------------------
    CREATE TABLE IF NOT EXISTS "results_hero" (
      "id" SERIAL PRIMARY KEY,
      "chapter" varchar DEFAULT 'Chapter IV — Results & Stories',
      "title_a" varchar DEFAULT 'Quietly',
      "title_b" varchar DEFAULT 'transformative.',
      "lede" varchar,
      "hero_image_id" integer,
      "image_hue" numeric DEFAULT 1,
      "image_label" varchar DEFAULT 'RESULTS & STORIES',
      "breadcrumb_label" varchar DEFAULT 'Results & Stories',
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );
    CREATE INDEX IF NOT EXISTS "results_hero_hero_image_idx" ON "results_hero" ("hero_image_id");
    DO $$ BEGIN
      ALTER TABLE "results_hero"
        ADD CONSTRAINT "results_hero_hero_image_id_media_id_fk"
        FOREIGN KEY ("hero_image_id") REFERENCES "media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    -- results-featured-cases-view global ----------------------------------
    CREATE TABLE IF NOT EXISTS "results_featured_cases_view" (
      "id" SERIAL PRIMARY KEY,
      "eyebrow" varchar DEFAULT 'Featured cases',
      "heading_pre" varchar DEFAULT 'Four signature cases,',
      "heading_italic" varchar DEFAULT 'shared with permission.',
      "lede" varchar,
      "filter_bar_label" varchar DEFAULT 'Featured cases',
      "count_format" varchar DEFAULT '{n} cases · facial',
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    -- results-stories-view global -----------------------------------------
    CREATE TABLE IF NOT EXISTS "results_stories_view" (
      "id" SERIAL PRIMARY KEY,
      "eyebrow" varchar DEFAULT 'Stories',
      "heading_pre" varchar DEFAULT 'Stories,',
      "heading_italic" varchar DEFAULT 'not slogans.',
      "lede" varchar,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    -- library-cta global (shared by /results + /gallery) ------------------
    CREATE TABLE IF NOT EXISTS "library_cta" (
      "id" SERIAL PRIMARY KEY,
      "eyebrow" varchar DEFAULT 'Private gallery',
      "heading_pre" varchar DEFAULT 'Want to see ',
      "heading_italic" varchar DEFAULT 'more?',
      "body" varchar,
      "button_label" varchar DEFAULT 'Request the full library',
      "button_href" varchar DEFAULT '/contact',
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    -- share-cta global (shared by /results + /stories) --------------------
    CREATE TABLE IF NOT EXISTS "share_cta" (
      "id" SERIAL PRIMARY KEY,
      "eyebrow" varchar DEFAULT 'Sharing your story',
      "heading_pre" varchar DEFAULT 'Have a ',
      "heading_italic" varchar DEFAULT 'story',
      "heading_post" varchar DEFAULT ' to share?',
      "body" varchar,
      "button_label" varchar DEFAULT 'Write to us',
      "button_href" varchar DEFAULT '/contact',
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    -- Extend gallery_page with new hero + filter chrome columns ----------
    ALTER TABLE "gallery_page" ADD COLUMN IF NOT EXISTS "image_hue" numeric DEFAULT 1;
    ALTER TABLE "gallery_page" ADD COLUMN IF NOT EXISTS "image_label" varchar DEFAULT 'GALLERY';
    ALTER TABLE "gallery_page" ADD COLUMN IF NOT EXISTS "breadcrumb_label" varchar DEFAULT 'Gallery';
    ALTER TABLE "gallery_page" ADD COLUMN IF NOT EXISTS "filter_bar_label" varchar DEFAULT 'Featured cases';
    ALTER TABLE "gallery_page" ADD COLUMN IF NOT EXISTS "count_format" varchar DEFAULT '{n} cases · facial';

    -- Extend stories_page with new hero chrome columns -------------------
    ALTER TABLE "stories_page" ADD COLUMN IF NOT EXISTS "image_hue" numeric DEFAULT 5;
    ALTER TABLE "stories_page" ADD COLUMN IF NOT EXISTS "image_label" varchar DEFAULT 'STORIES';
    ALTER TABLE "stories_page" ADD COLUMN IF NOT EXISTS "breadcrumb_label" varchar DEFAULT 'Stories';

    -- Extend stories collection with the two missing display atoms -------
    ALTER TABLE "stories" ADD COLUMN IF NOT EXISTS "procedure_label" varchar;
    ALTER TABLE "stories" ADD COLUMN IF NOT EXISTS "hue" numeric DEFAULT 0;

    -- Ownership: Payload runtime connects as the cosmedic role -----------
    DO $$ BEGIN
      EXECUTE 'ALTER TABLE "results_hero" OWNER TO cosmedic';
      EXECUTE 'ALTER TABLE "results_featured_cases_view" OWNER TO cosmedic';
      EXECUTE 'ALTER TABLE "results_stories_view" OWNER TO cosmedic';
      EXECUTE 'ALTER TABLE "library_cta" OWNER TO cosmedic';
      EXECUTE 'ALTER TABLE "share_cta" OWNER TO cosmedic';
      EXECUTE 'ALTER SEQUENCE "results_hero_id_seq" OWNER TO cosmedic';
      EXECUTE 'ALTER SEQUENCE "results_featured_cases_view_id_seq" OWNER TO cosmedic';
      EXECUTE 'ALTER SEQUENCE "results_stories_view_id_seq" OWNER TO cosmedic';
      EXECUTE 'ALTER SEQUENCE "library_cta_id_seq" OWNER TO cosmedic';
      EXECUTE 'ALTER SEQUENCE "share_cta_id_seq" OWNER TO cosmedic';
    EXCEPTION WHEN OTHERS THEN NULL; END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "stories" DROP COLUMN IF EXISTS "hue";
    ALTER TABLE "stories" DROP COLUMN IF EXISTS "procedure_label";
    ALTER TABLE "stories_page" DROP COLUMN IF EXISTS "breadcrumb_label";
    ALTER TABLE "stories_page" DROP COLUMN IF EXISTS "image_label";
    ALTER TABLE "stories_page" DROP COLUMN IF EXISTS "image_hue";
    ALTER TABLE "gallery_page" DROP COLUMN IF EXISTS "count_format";
    ALTER TABLE "gallery_page" DROP COLUMN IF EXISTS "filter_bar_label";
    ALTER TABLE "gallery_page" DROP COLUMN IF EXISTS "breadcrumb_label";
    ALTER TABLE "gallery_page" DROP COLUMN IF EXISTS "image_label";
    ALTER TABLE "gallery_page" DROP COLUMN IF EXISTS "image_hue";
    DROP TABLE IF EXISTS "share_cta" CASCADE;
    DROP TABLE IF EXISTS "library_cta" CASCADE;
    DROP TABLE IF EXISTS "results_stories_view" CASCADE;
    DROP TABLE IF EXISTS "results_featured_cases_view" CASCADE;
    DROP TABLE IF EXISTS "results_hero" CASCADE;
  `)
}

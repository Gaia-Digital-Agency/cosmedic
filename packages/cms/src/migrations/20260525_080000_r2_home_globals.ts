import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Phase R2 — Bucket "a. Homepage" detail.
//
// Adds (purely additive — no destructive changes to existing data):
//   • home-hero             → table home_hero  (singleton; b. Hero)
//   • home-intro            → table home_intro (singleton; e. Intro)
//   • home-lead-magnet      → table home_lead_magnet (singleton; g. Lead-Magnet)
//   • home-place            → table home_place + home_place_rows (h. Place)
//   • home-treatments-view  → table home_treatments_view (m.)
//   • home-pricing-view     → table home_pricing_view (n.)
//   • home-surgeons-view    → table home_surgeons_view (o.)
//   • home-gallery-view     → table home_gallery_view (p.)
//   • home-journey-view     → table home_journey_view (q.)
//   • home-stories-view     → table home_stories_view (r.)
//
// Footer is NOT touched in this phase — the d. Footer split (management /
// legal-entity / designer lines) was scoped out.
//
// / renders byte-identical after this migration:
//   - every home/* component reads from the new globals via the cache, but
//     each falls back to its prior hardcoded literal when the global is
//     empty (cold cache safe).

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- home-hero global ----------------------------------------------------
    CREATE TABLE IF NOT EXISTS "home_hero" (
      "id" SERIAL PRIMARY KEY,
      "eyebrow" varchar DEFAULT 'A sanctuary in Nusa Dua · Est. 1998',
      "title_a" varchar DEFAULT 'Plastic surgery',
      "title_b" varchar DEFAULT 'in Bali, by ISAPS surgeons.',
      "lede" varchar,
      "hero_image_id" integer,
      "breadcrumb_label" varchar DEFAULT 'Home',
      "primary_cta_label" varchar DEFAULT 'Plan Your Treatment',
      "secondary_cta_label" varchar DEFAULT 'View Pricing',
      "secondary_cta_href" varchar DEFAULT '/pricing',
      "quick_enquiry_eyebrow" varchar DEFAULT 'Begin · No commitment',
      "quick_enquiry_heading" varchar DEFAULT 'Get a private price estimate within 24 hours.',
      "quick_enquiry_intro" varchar,
      "quick_enquiry_name_label" varchar DEFAULT 'Your name',
      "quick_enquiry_name_placeholder" varchar DEFAULT 'First name',
      "quick_enquiry_email_label" varchar DEFAULT 'Email',
      "quick_enquiry_email_placeholder" varchar DEFAULT 'you@email.com',
      "quick_enquiry_interest_label" varchar DEFAULT 'Area of interest',
      "quick_enquiry_interest_optional_label" varchar DEFAULT '(optional)',
      "quick_enquiry_interest_placeholder" varchar DEFAULT 'e.g. rhinoplasty, mommy makeover…',
      "quick_enquiry_reveal_interest_label" varchar DEFAULT '+ Add a treatment area (optional)',
      "quick_enquiry_submit_label" varchar DEFAULT 'Begin enquiry',
      "quick_enquiry_submitting_label" varchar DEFAULT 'Sending…',
      "quick_enquiry_success_label" varchar DEFAULT 'Sent — thank you',
      "quick_enquiry_success_fine" varchar,
      "quick_enquiry_error_fine" varchar,
      "quick_enquiry_fineprint" varchar DEFAULT 'Held in confidence. Reviewed by a credentialed surgeon.',
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );
    CREATE INDEX IF NOT EXISTS "home_hero_hero_image_idx" ON "home_hero" ("hero_image_id");
    DO $$ BEGIN
      ALTER TABLE "home_hero"
        ADD CONSTRAINT "home_hero_hero_image_id_media_id_fk"
        FOREIGN KEY ("hero_image_id") REFERENCES "media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    -- home-intro global ---------------------------------------------------
    CREATE TABLE IF NOT EXISTS "home_intro" (
      "id" SERIAL PRIMARY KEY,
      "eyebrow" varchar DEFAULT 'Our Approach',
      "pull_quote_before" varchar,
      "pull_quote_accent" varchar DEFAULT 'care ',
      "pull_quote_after" varchar,
      "col1" varchar,
      "col2" varchar,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    -- home-lead-magnet global ---------------------------------------------
    CREATE TABLE IF NOT EXISTS "home_lead_magnet" (
      "id" SERIAL PRIMARY KEY,
      "cover_eyebrow" varchar DEFAULT 'A guide · 24 pages · PDF',
      "cover_line1" varchar DEFAULT 'The Bali',
      "cover_line2" varchar DEFAULT 'Recovery',
      "cover_line3" varchar DEFAULT 'Guide.',
      "cover_foot1" varchar DEFAULT 'BIMC CosMedic',
      "cover_foot2" varchar DEFAULT 'MMXXVI',
      "body_eyebrow" varchar DEFAULT 'Free Guide',
      "heading_part1" varchar DEFAULT 'What to expect from',
      "heading_accent" varchar DEFAULT 'recovery in Bali.',
      "lede" varchar,
      "form_placeholder" varchar DEFAULT 'Your email address',
      "submit_label" varchar DEFAULT 'Send Guide →',
      "success_heading" varchar DEFAULT '✓ Sent',
      "success_body" varchar DEFAULT 'Check your inbox — the guide is on its way.',
      "fineprint" varchar DEFAULT 'One email. No marketing list. Unsubscribe anytime.',
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    -- home-place global + rows array --------------------------------------
    CREATE TABLE IF NOT EXISTS "home_place" (
      "id" SERIAL PRIMARY KEY,
      "eyebrow" varchar DEFAULT 'Recovery in Bali',
      "heading_part1" varchar DEFAULT 'Recover',
      "heading_accent" varchar DEFAULT 'in paradise.',
      "body" varchar,
      "cta_label" varchar DEFAULT 'View recovery stays',
      "cta_href" varchar DEFAULT '/recovery-stays',
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );
    CREATE TABLE IF NOT EXISTS "home_place_rows" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY,
      "letter" varchar NOT NULL,
      "text" varchar NOT NULL
    );
    CREATE INDEX IF NOT EXISTS "home_place_rows_order_idx" ON "home_place_rows" ("_order");
    CREATE INDEX IF NOT EXISTS "home_place_rows_parent_id_idx" ON "home_place_rows" ("_parent_id");
    DO $$ BEGIN
      ALTER TABLE "home_place_rows"
        ADD CONSTRAINT "home_place_rows_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "home_place"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    -- home-treatments-view global -----------------------------------------
    CREATE TABLE IF NOT EXISTS "home_treatments_view" (
      "id" SERIAL PRIMARY KEY,
      "eyebrow" varchar DEFAULT 'Treatments',
      "heading_part1" varchar DEFAULT 'Six disciplines,',
      "heading_part2" varchar DEFAULT 'one sanctuary.',
      "lede" varchar,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    -- home-pricing-view global --------------------------------------------
    CREATE TABLE IF NOT EXISTS "home_pricing_view" (
      "id" SERIAL PRIMARY KEY,
      "eyebrow" varchar DEFAULT 'Pricing · Starting From',
      "heading_part1" varchar DEFAULT 'Transparent',
      "heading_part2" varchar DEFAULT 'pricing.',
      "lede" varchar,
      "footnote" varchar,
      "view_all_label" varchar DEFAULT 'View full pricing',
      "view_all_href" varchar DEFAULT '/pricing',
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    -- home-surgeons-view global -------------------------------------------
    CREATE TABLE IF NOT EXISTS "home_surgeons_view" (
      "id" SERIAL PRIMARY KEY,
      "eyebrow" varchar DEFAULT 'Meet the Surgeons',
      "lead_surgeon_eyebrow" varchar DEFAULT 'Lead Surgeon',
      "lead_body" varchar,
      "lead_stat1_label" varchar DEFAULT 'Trained',
      "lead_stat1_value" varchar DEFAULT 'Indonesia · Japan',
      "lead_stat2_label" varchar DEFAULT 'Specialty',
      "lead_stat2_value" varchar DEFAULT 'Facial Aesthetics',
      "lead_stat3_label" varchar DEFAULT 'Society',
      "lead_stat3_value" varchar DEFAULT 'ISAPS Member',
      "lead_cta_label" varchar DEFAULT 'Read the full profile',
      "associates_eyebrow" varchar DEFAULT 'Associate Surgeons & Aestheticians',
      "team_caption" varchar DEFAULT 'The Cosmedic Team',
      "group_photo_id" integer,
      "group_photo_alt" varchar,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );
    CREATE INDEX IF NOT EXISTS "home_surgeons_view_group_photo_idx" ON "home_surgeons_view" ("group_photo_id");
    DO $$ BEGIN
      ALTER TABLE "home_surgeons_view"
        ADD CONSTRAINT "home_surgeons_view_group_photo_id_media_id_fk"
        FOREIGN KEY ("group_photo_id") REFERENCES "media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    -- home-gallery-view global --------------------------------------------
    CREATE TABLE IF NOT EXISTS "home_gallery_view" (
      "id" SERIAL PRIMARY KEY,
      "eyebrow" varchar DEFAULT 'Before & After Results',
      "heading_italic" varchar DEFAULT 'Quietly',
      "heading_part2" varchar DEFAULT 'transformative.',
      "lede" varchar DEFAULT 'Three signature results from our facial repertoire.',
      "cta_label" varchar DEFAULT 'View the full gallery',
      "cta_href" varchar DEFAULT '/results#results',
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    -- home-journey-view global --------------------------------------------
    CREATE TABLE IF NOT EXISTS "home_journey_view" (
      "id" SERIAL PRIMARY KEY,
      "eyebrow" varchar DEFAULT 'Your Journey',
      "heading_part1" varchar DEFAULT 'From enquiry to',
      "heading_accent" varchar DEFAULT 'homecoming.',
      "cta_label" varchar DEFAULT 'Read the full journey',
      "cta_href" varchar DEFAULT '/journey',
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    -- home-stories-view global --------------------------------------------
    CREATE TABLE IF NOT EXISTS "home_stories_view" (
      "id" SERIAL PRIMARY KEY,
      "eyebrow" varchar DEFAULT 'Verified Patient Stories',
      "heading_italic" varchar DEFAULT 'Stories,',
      "heading_part2" varchar DEFAULT 'not slogans.',
      "lede" varchar,
      "cta_label" varchar DEFAULT 'Read more stories',
      "cta_href" varchar DEFAULT '/results#stories',
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    -- Ownership: Payload runtime connects as the cosmedic role -----------
    DO $$ BEGIN
      EXECUTE 'ALTER TABLE "home_hero" OWNER TO cosmedic';
      EXECUTE 'ALTER TABLE "home_intro" OWNER TO cosmedic';
      EXECUTE 'ALTER TABLE "home_lead_magnet" OWNER TO cosmedic';
      EXECUTE 'ALTER TABLE "home_place" OWNER TO cosmedic';
      EXECUTE 'ALTER TABLE "home_place_rows" OWNER TO cosmedic';
      EXECUTE 'ALTER TABLE "home_treatments_view" OWNER TO cosmedic';
      EXECUTE 'ALTER TABLE "home_pricing_view" OWNER TO cosmedic';
      EXECUTE 'ALTER TABLE "home_surgeons_view" OWNER TO cosmedic';
      EXECUTE 'ALTER TABLE "home_gallery_view" OWNER TO cosmedic';
      EXECUTE 'ALTER TABLE "home_journey_view" OWNER TO cosmedic';
      EXECUTE 'ALTER TABLE "home_stories_view" OWNER TO cosmedic';
      EXECUTE 'ALTER SEQUENCE "home_hero_id_seq" OWNER TO cosmedic';
      EXECUTE 'ALTER SEQUENCE "home_intro_id_seq" OWNER TO cosmedic';
      EXECUTE 'ALTER SEQUENCE "home_lead_magnet_id_seq" OWNER TO cosmedic';
      EXECUTE 'ALTER SEQUENCE "home_place_id_seq" OWNER TO cosmedic';
      EXECUTE 'ALTER SEQUENCE "home_treatments_view_id_seq" OWNER TO cosmedic';
      EXECUTE 'ALTER SEQUENCE "home_pricing_view_id_seq" OWNER TO cosmedic';
      EXECUTE 'ALTER SEQUENCE "home_surgeons_view_id_seq" OWNER TO cosmedic';
      EXECUTE 'ALTER SEQUENCE "home_gallery_view_id_seq" OWNER TO cosmedic';
      EXECUTE 'ALTER SEQUENCE "home_journey_view_id_seq" OWNER TO cosmedic';
      EXECUTE 'ALTER SEQUENCE "home_stories_view_id_seq" OWNER TO cosmedic';
    EXCEPTION WHEN OTHERS THEN NULL; END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "home_stories_view" CASCADE;
    DROP TABLE IF EXISTS "home_journey_view" CASCADE;
    DROP TABLE IF EXISTS "home_gallery_view" CASCADE;
    DROP TABLE IF EXISTS "home_surgeons_view" CASCADE;
    DROP TABLE IF EXISTS "home_pricing_view" CASCADE;
    DROP TABLE IF EXISTS "home_treatments_view" CASCADE;
    DROP TABLE IF EXISTS "home_place_rows" CASCADE;
    DROP TABLE IF EXISTS "home_place" CASCADE;
    DROP TABLE IF EXISTS "home_lead_magnet" CASCADE;
    DROP TABLE IF EXISTS "home_intro" CASCADE;
    DROP TABLE IF EXISTS "home_hero" CASCADE;
  `)
}

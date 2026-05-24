import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Phase R1 — Bucket "g. Contact" detail.
// Adds 3 new singleton globals (contact-hero, contact-enquiry-section,
// contact-visit-section) and one new column on settings (press_email).
// No data on existing tables is touched. /contact still renders byte-identical
// after this migration; the seed script populates the new tables + patches
// Settings rows to preserve loose data on the frontend.

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "press_email" varchar;

    CREATE TABLE IF NOT EXISTS "contact_hero" (
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
    CREATE INDEX IF NOT EXISTS "contact_hero_hero_image_idx" ON "contact_hero" ("hero_image_id");
    DO $$ BEGIN
      ALTER TABLE "contact_hero"
        ADD CONSTRAINT "contact_hero_hero_image_id_media_id_fk"
        FOREIGN KEY ("hero_image_id") REFERENCES "media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE TABLE IF NOT EXISTS "contact_enquiry_section" (
      "id" SERIAL PRIMARY KEY,
      "eyebrow" varchar,
      "heading_pre" varchar,
      "heading_italic" varchar,
      "intro" varchar,
      "direct_lines_section_label" varchar,
      "direct_lines_concierge_label" varchar,
      "direct_lines_whatsapp_label" varchar,
      "direct_lines_email_label" varchar,
      "direct_lines_press_label" varchar,
      "trust_line" varchar,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    CREATE TABLE IF NOT EXISTS "contact_visit_section" (
      "id" SERIAL PRIMARY KEY,
      "eyebrow" varchar,
      "heading_pre" varchar,
      "heading_italic" varchar,
      "body" varchar,
      "map_image_id" integer,
      "map_image_label" varchar,
      "map_image_hue" numeric,
      "open_in_maps_label" varchar,
      "get_directions_label" varchar,
      "clinic_hours_label" varchar,
      "concierge_hours_label" varchar,
      "concierge_hours_value" varchar,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );
    CREATE INDEX IF NOT EXISTS "contact_visit_section_map_image_idx" ON "contact_visit_section" ("map_image_id");
    DO $$ BEGIN
      ALTER TABLE "contact_visit_section"
        ADD CONSTRAINT "contact_visit_section_map_image_id_media_id_fk"
        FOREIGN KEY ("map_image_id") REFERENCES "media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "contact_visit_section" CASCADE;
    DROP TABLE IF EXISTS "contact_enquiry_section" CASCADE;
    DROP TABLE IF EXISTS "contact_hero" CASCADE;
    ALTER TABLE "settings" DROP COLUMN IF EXISTS "press_email";
  `)
}

import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "contact_hero" DROP CONSTRAINT "contact_hero_visit_section_map_image_id_media_id_fk";
  
  DROP INDEX "contact_hero_visit_section_visit_section_map_image_idx";
  ALTER TABLE "surgeons_plastic_view_locales" ADD COLUMN "plastic_surgery_lede" varchar NOT NULL;
  ALTER TABLE "surgeons_plastic_view_locales" ADD COLUMN "plastic_surgery_eyebrow" varchar NOT NULL;
  ALTER TABLE "surgeons_plastic_view_locales" ADD COLUMN "plastic_surgery_heading_a" varchar;
  ALTER TABLE "surgeons_plastic_view_locales" ADD COLUMN "plastic_surgery_heading_b" varchar NOT NULL;
  ALTER TABLE "surgeons_plastic_view_locales" ADD COLUMN "plastic_surgery_heading_italic" varchar NOT NULL;
  ALTER TABLE "surgeons_plastic_view_locales" ADD COLUMN "aesthetic_medicine_lede" varchar NOT NULL;
  ALTER TABLE "surgeons_plastic_view_locales" ADD COLUMN "aesthetic_medicine_eyebrow" varchar NOT NULL;
  ALTER TABLE "surgeons_plastic_view_locales" ADD COLUMN "aesthetic_medicine_heading_a" varchar;
  ALTER TABLE "surgeons_plastic_view_locales" ADD COLUMN "aesthetic_medicine_heading_b" varchar NOT NULL;
  ALTER TABLE "surgeons_plastic_view_locales" ADD COLUMN "aesthetic_medicine_heading_italic" varchar NOT NULL;
  ALTER TABLE "surgeons_plastic_view_locales" DROP COLUMN "lede";
  ALTER TABLE "surgeons_plastic_view_locales" DROP COLUMN "eyebrow";
  ALTER TABLE "surgeons_plastic_view_locales" DROP COLUMN "heading_a";
  ALTER TABLE "surgeons_plastic_view_locales" DROP COLUMN "heading_b";
  ALTER TABLE "surgeons_plastic_view_locales" DROP COLUMN "heading_italic";
  ALTER TABLE "contact_hero" DROP COLUMN "visit_section_map_image_id";
  ALTER TABLE "contact_hero" DROP COLUMN "visit_section_map_image_hue";
  ALTER TABLE "contact_hero_locales" DROP COLUMN "visit_section_eyebrow";
  ALTER TABLE "contact_hero_locales" DROP COLUMN "visit_section_heading_pre";
  ALTER TABLE "contact_hero_locales" DROP COLUMN "visit_section_heading_italic";
  ALTER TABLE "contact_hero_locales" DROP COLUMN "visit_section_body";
  ALTER TABLE "contact_hero_locales" DROP COLUMN "visit_section_map_image_label";
  ALTER TABLE "contact_hero_locales" DROP COLUMN "visit_section_open_in_maps_label";
  ALTER TABLE "contact_hero_locales" DROP COLUMN "visit_section_get_directions_label";
  ALTER TABLE "contact_hero_locales" DROP COLUMN "visit_section_clinic_hours_label";
  ALTER TABLE "contact_hero_locales" DROP COLUMN "visit_section_concierge_hours_label";
  ALTER TABLE "contact_hero_locales" DROP COLUMN "visit_section_concierge_hours_value";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "surgeons_plastic_view_locales" ADD COLUMN "lede" varchar NOT NULL;
  ALTER TABLE "surgeons_plastic_view_locales" ADD COLUMN "eyebrow" varchar NOT NULL;
  ALTER TABLE "surgeons_plastic_view_locales" ADD COLUMN "heading_a" varchar;
  ALTER TABLE "surgeons_plastic_view_locales" ADD COLUMN "heading_b" varchar NOT NULL;
  ALTER TABLE "surgeons_plastic_view_locales" ADD COLUMN "heading_italic" varchar NOT NULL;
  ALTER TABLE "contact_hero" ADD COLUMN "visit_section_map_image_id" integer;
  ALTER TABLE "contact_hero" ADD COLUMN "visit_section_map_image_hue" numeric DEFAULT 4;
  ALTER TABLE "contact_hero_locales" ADD COLUMN "visit_section_eyebrow" varchar DEFAULT 'Visit';
  ALTER TABLE "contact_hero_locales" ADD COLUMN "visit_section_heading_pre" varchar DEFAULT 'Find us in';
  ALTER TABLE "contact_hero_locales" ADD COLUMN "visit_section_heading_italic" varchar DEFAULT 'Nusa Dua.';
  ALTER TABLE "contact_hero_locales" ADD COLUMN "visit_section_body" varchar DEFAULT 'Within the BIMC Hospital Nusa Dua, on the southernmost reach of Bali. Twelve minutes from Ngurah Rai International Airport.';
  ALTER TABLE "contact_hero_locales" ADD COLUMN "visit_section_map_image_label" varchar DEFAULT 'NUSA DUA · BALI';
  ALTER TABLE "contact_hero_locales" ADD COLUMN "visit_section_open_in_maps_label" varchar DEFAULT 'Open in Maps';
  ALTER TABLE "contact_hero_locales" ADD COLUMN "visit_section_get_directions_label" varchar DEFAULT 'Get directions';
  ALTER TABLE "contact_hero_locales" ADD COLUMN "visit_section_clinic_hours_label" varchar DEFAULT 'Hours · Clinic';
  ALTER TABLE "contact_hero_locales" ADD COLUMN "visit_section_concierge_hours_label" varchar DEFAULT 'Hours · Concierge';
  ALTER TABLE "contact_hero_locales" ADD COLUMN "visit_section_concierge_hours_value" varchar DEFAULT 'Twenty-four hours
  Replies within ten minutes';
  ALTER TABLE "contact_hero" ADD CONSTRAINT "contact_hero_visit_section_map_image_id_media_id_fk" FOREIGN KEY ("visit_section_map_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "contact_hero_visit_section_visit_section_map_image_idx" ON "contact_hero" USING btree ("visit_section_map_image_id");
  ALTER TABLE "surgeons_plastic_view_locales" DROP COLUMN "plastic_surgery_lede";
  ALTER TABLE "surgeons_plastic_view_locales" DROP COLUMN "plastic_surgery_eyebrow";
  ALTER TABLE "surgeons_plastic_view_locales" DROP COLUMN "plastic_surgery_heading_a";
  ALTER TABLE "surgeons_plastic_view_locales" DROP COLUMN "plastic_surgery_heading_b";
  ALTER TABLE "surgeons_plastic_view_locales" DROP COLUMN "plastic_surgery_heading_italic";
  ALTER TABLE "surgeons_plastic_view_locales" DROP COLUMN "aesthetic_medicine_lede";
  ALTER TABLE "surgeons_plastic_view_locales" DROP COLUMN "aesthetic_medicine_eyebrow";
  ALTER TABLE "surgeons_plastic_view_locales" DROP COLUMN "aesthetic_medicine_heading_a";
  ALTER TABLE "surgeons_plastic_view_locales" DROP COLUMN "aesthetic_medicine_heading_b";
  ALTER TABLE "surgeons_plastic_view_locales" DROP COLUMN "aesthetic_medicine_heading_italic";`)
}

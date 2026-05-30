import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "home_intro_trust_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"source_note" varchar
  );
  
  CREATE TABLE "home_intro_trust_strip_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "home_treatments_view_locales" ADD COLUMN "treatments_lede" varchar DEFAULT 'A complete repertoire under one roof, sequenced into a single journey. Treatments may be combined; recovery is always private.';
  ALTER TABLE "home_treatments_view_locales" ADD COLUMN "treatments_eyebrow" varchar DEFAULT 'Treatments';
  ALTER TABLE "home_treatments_view_locales" ADD COLUMN "treatments_heading_a" varchar DEFAULT 'Six disciplines,';
  ALTER TABLE "home_treatments_view_locales" ADD COLUMN "treatments_heading_b" varchar DEFAULT 'one sanctuary.';
  ALTER TABLE "home_treatments_view_locales" ADD COLUMN "pricing_lede" varchar DEFAULT 'Indicative starting prices in IDR (with AUD equivalent). Final quotes are tailored after consultation. Travel, accommodation and concierge can be packaged.';
  ALTER TABLE "home_treatments_view_locales" ADD COLUMN "pricing_eyebrow" varchar DEFAULT 'Pricing · Starting From';
  ALTER TABLE "home_treatments_view_locales" ADD COLUMN "pricing_heading_a" varchar DEFAULT 'Transparent';
  ALTER TABLE "home_treatments_view_locales" ADD COLUMN "pricing_heading_b" varchar DEFAULT 'pricing.';
  ALTER TABLE "home_treatments_view_locales" ADD COLUMN "pricing_footnote" varchar DEFAULT 'Prices indicative for international patients. AUD shown at 1 AUD ≈ Rp 12,500 (May 2026). Recovery stays, transfers and 12-month telehealth follow-up included on most surgical packages.';
  ALTER TABLE "home_treatments_view_locales" ADD COLUMN "pricing_view_all_label" varchar DEFAULT 'View full pricing';
  ALTER TABLE "home_treatments_view_locales" ADD COLUMN "gallery_lede" varchar DEFAULT 'Three signature results from our facial repertoire.';
  ALTER TABLE "home_treatments_view_locales" ADD COLUMN "gallery_eyebrow" varchar DEFAULT 'Before & After Results';
  ALTER TABLE "home_treatments_view_locales" ADD COLUMN "gallery_heading_a" varchar DEFAULT 'Quietly';
  ALTER TABLE "home_treatments_view_locales" ADD COLUMN "gallery_heading_b" varchar DEFAULT 'transformative.';
  ALTER TABLE "home_treatments_view_locales" ADD COLUMN "gallery_cta_label" varchar DEFAULT 'View the full gallery';
  ALTER TABLE "home_treatments_view_locales" ADD COLUMN "stories_lede" varchar DEFAULT 'Verified reviews from international patients. Video testimonials and Google reviews on our full stories page.';
  ALTER TABLE "home_treatments_view_locales" ADD COLUMN "stories_eyebrow" varchar DEFAULT 'Verified Patient Stories';
  ALTER TABLE "home_treatments_view_locales" ADD COLUMN "stories_heading_a" varchar DEFAULT 'Stories,';
  ALTER TABLE "home_treatments_view_locales" ADD COLUMN "stories_heading_b" varchar DEFAULT 'not slogans.';
  ALTER TABLE "home_treatments_view_locales" ADD COLUMN "stories_cta_label" varchar DEFAULT 'Read more stories';
  ALTER TABLE "home_intro_locales" ADD COLUMN "intro_eyebrow" varchar DEFAULT 'Our Approach';
  ALTER TABLE "home_intro_locales" ADD COLUMN "intro_pull_quote_before" varchar DEFAULT 'Aesthetic medicine, considered with the same ';
  ALTER TABLE "home_intro_locales" ADD COLUMN "intro_pull_quote_accent" varchar DEFAULT 'care ';
  ALTER TABLE "home_intro_locales" ADD COLUMN "intro_pull_quote_after" varchar DEFAULT 'as the island that surrounds it.';
  ALTER TABLE "home_intro_locales" ADD COLUMN "intro_col1" varchar DEFAULT 'For almost three decades, BIMC CosMedic has practiced cosmetic surgery the way Bali has practiced hospitality.';
  ALTER TABLE "home_intro_locales" ADD COLUMN "intro_col2" varchar DEFAULT 'Our centre sits within Indonesia''s most accredited international hospital. Eight ISAPS- and FICS-credentialed specialists work alongside a concierge team.';
  ALTER TABLE "home_intro_locales" ADD COLUMN "journey_eyebrow" varchar DEFAULT 'Your Journey';
  ALTER TABLE "home_intro_locales" ADD COLUMN "journey_heading_a" varchar DEFAULT 'From enquiry to';
  ALTER TABLE "home_intro_locales" ADD COLUMN "journey_heading_b" varchar DEFAULT 'homecoming.';
  ALTER TABLE "home_intro_locales" ADD COLUMN "journey_cta_label" varchar DEFAULT 'Read the full journey';
  ALTER TABLE "pricing_insurance_locales" ADD COLUMN "insurance_eyebrow" varchar DEFAULT 'Insurance';
  ALTER TABLE "pricing_insurance_locales" ADD COLUMN "insurance_heading_roman" varchar DEFAULT 'Working';
  ALTER TABLE "pricing_insurance_locales" ADD COLUMN "insurance_heading_italic" varchar DEFAULT 'with insurers.';
  ALTER TABLE "pricing_insurance_locales" ADD COLUMN "insurance_body" varchar DEFAULT 'Cosmetic surgery is rarely covered by health insurance. Reconstructive procedures may be — and where they are, we are happy to support your claim with full documentation, surgeon''s reports, and itemised invoicing.
  
  Travel insurance is recommended for every patient, and we work with two specialist medical-travel insurers — details supplied during consultation.';
  ALTER TABLE "pricing_insurance_locales" ADD COLUMN "payment_eyebrow" varchar DEFAULT 'Payment';
  ALTER TABLE "pricing_insurance_locales" ADD COLUMN "payment_heading_roman" varchar DEFAULT 'Quiet,';
  ALTER TABLE "pricing_insurance_locales" ADD COLUMN "payment_heading_italic" varchar DEFAULT 'considered terms.';
  ALTER TABLE "pricing_insurance_locales" ADD COLUMN "payment_terms_text" varchar DEFAULT 'Deposit | 20% on confirmation
  Balance | On admission, by transfer
  Currencies | IDR, AUD, USD, EUR
  Cards | Accepted, 1.8% surcharge
  Refunds | Full, until 14 days before
  Finance | Available via partner lender';
  ALTER TABLE "home_intro_trust_strip" ADD CONSTRAINT "home_intro_trust_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_intro"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_intro_trust_strip_locales" ADD CONSTRAINT "home_intro_trust_strip_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_intro_trust_strip"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_intro_trust_strip_order_idx" ON "home_intro_trust_strip" USING btree ("_order");
  CREATE INDEX "home_intro_trust_strip_parent_id_idx" ON "home_intro_trust_strip" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_intro_trust_strip_locales_locale_parent_id_unique" ON "home_intro_trust_strip_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "home_treatments_view_locales" DROP COLUMN "lede";
  ALTER TABLE "home_treatments_view_locales" DROP COLUMN "eyebrow";
  ALTER TABLE "home_treatments_view_locales" DROP COLUMN "heading_a";
  ALTER TABLE "home_treatments_view_locales" DROP COLUMN "heading_b";
  ALTER TABLE "home_intro_locales" DROP COLUMN "eyebrow";
  ALTER TABLE "home_intro_locales" DROP COLUMN "pull_quote_before";
  ALTER TABLE "home_intro_locales" DROP COLUMN "pull_quote_accent";
  ALTER TABLE "home_intro_locales" DROP COLUMN "pull_quote_after";
  ALTER TABLE "home_intro_locales" DROP COLUMN "col1";
  ALTER TABLE "home_intro_locales" DROP COLUMN "col2";
  ALTER TABLE "pricing_insurance_locales" DROP COLUMN "eyebrow";
  ALTER TABLE "pricing_insurance_locales" DROP COLUMN "heading_roman";
  ALTER TABLE "pricing_insurance_locales" DROP COLUMN "heading_italic";
  ALTER TABLE "pricing_insurance_locales" DROP COLUMN "body";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "home_intro_trust_strip" CASCADE;
  DROP TABLE "home_intro_trust_strip_locales" CASCADE;
  ALTER TABLE "home_treatments_view_locales" ADD COLUMN "lede" varchar DEFAULT 'A complete repertoire under one roof, sequenced into a single journey. Treatments may be combined; recovery is always private.';
  ALTER TABLE "home_treatments_view_locales" ADD COLUMN "eyebrow" varchar DEFAULT 'Treatments';
  ALTER TABLE "home_treatments_view_locales" ADD COLUMN "heading_a" varchar DEFAULT 'Six disciplines,';
  ALTER TABLE "home_treatments_view_locales" ADD COLUMN "heading_b" varchar DEFAULT 'one sanctuary.';
  ALTER TABLE "home_intro_locales" ADD COLUMN "eyebrow" varchar DEFAULT 'Our Approach';
  ALTER TABLE "home_intro_locales" ADD COLUMN "pull_quote_before" varchar DEFAULT 'Aesthetic medicine, considered with the same ';
  ALTER TABLE "home_intro_locales" ADD COLUMN "pull_quote_accent" varchar DEFAULT 'care ';
  ALTER TABLE "home_intro_locales" ADD COLUMN "pull_quote_after" varchar DEFAULT 'as the island that surrounds it.';
  ALTER TABLE "home_intro_locales" ADD COLUMN "col1" varchar DEFAULT 'For almost three decades, BIMC CosMedic has practiced cosmetic surgery the way Bali has practiced hospitality — quietly, with patience, and with deep respect for the person in the chair. We don''t promise transformation. We promise consideration: of your face, your body, your time, and the life you intend to return to.';
  ALTER TABLE "home_intro_locales" ADD COLUMN "col2" varchar DEFAULT 'Our centre sits within Indonesia''s most accredited international hospital. Eight ISAPS- and FICS-credentialed specialists — fellowship-trained in Korea, Japan, Singapore and across Indonesia — work alongside a concierge team that handles everything from your arrival at Ngurah Rai to your final follow-up by video.';
  ALTER TABLE "pricing_insurance_locales" ADD COLUMN "eyebrow" varchar DEFAULT 'Insurance';
  ALTER TABLE "pricing_insurance_locales" ADD COLUMN "heading_roman" varchar DEFAULT 'Working';
  ALTER TABLE "pricing_insurance_locales" ADD COLUMN "heading_italic" varchar DEFAULT 'with insurers.';
  ALTER TABLE "pricing_insurance_locales" ADD COLUMN "body" varchar DEFAULT 'Cosmetic surgery is rarely covered by health insurance. Reconstructive procedures may be — and where they are, we are happy to support your claim with full documentation, surgeon''s reports, and itemised invoicing.
  
  Travel insurance is recommended for every patient, and we work with two specialist medical-travel insurers — details supplied during consultation.';
  ALTER TABLE "home_treatments_view_locales" DROP COLUMN "treatments_lede";
  ALTER TABLE "home_treatments_view_locales" DROP COLUMN "treatments_eyebrow";
  ALTER TABLE "home_treatments_view_locales" DROP COLUMN "treatments_heading_a";
  ALTER TABLE "home_treatments_view_locales" DROP COLUMN "treatments_heading_b";
  ALTER TABLE "home_treatments_view_locales" DROP COLUMN "pricing_lede";
  ALTER TABLE "home_treatments_view_locales" DROP COLUMN "pricing_eyebrow";
  ALTER TABLE "home_treatments_view_locales" DROP COLUMN "pricing_heading_a";
  ALTER TABLE "home_treatments_view_locales" DROP COLUMN "pricing_heading_b";
  ALTER TABLE "home_treatments_view_locales" DROP COLUMN "pricing_footnote";
  ALTER TABLE "home_treatments_view_locales" DROP COLUMN "pricing_view_all_label";
  ALTER TABLE "home_treatments_view_locales" DROP COLUMN "gallery_lede";
  ALTER TABLE "home_treatments_view_locales" DROP COLUMN "gallery_eyebrow";
  ALTER TABLE "home_treatments_view_locales" DROP COLUMN "gallery_heading_a";
  ALTER TABLE "home_treatments_view_locales" DROP COLUMN "gallery_heading_b";
  ALTER TABLE "home_treatments_view_locales" DROP COLUMN "gallery_cta_label";
  ALTER TABLE "home_treatments_view_locales" DROP COLUMN "stories_lede";
  ALTER TABLE "home_treatments_view_locales" DROP COLUMN "stories_eyebrow";
  ALTER TABLE "home_treatments_view_locales" DROP COLUMN "stories_heading_a";
  ALTER TABLE "home_treatments_view_locales" DROP COLUMN "stories_heading_b";
  ALTER TABLE "home_treatments_view_locales" DROP COLUMN "stories_cta_label";
  ALTER TABLE "home_intro_locales" DROP COLUMN "intro_eyebrow";
  ALTER TABLE "home_intro_locales" DROP COLUMN "intro_pull_quote_before";
  ALTER TABLE "home_intro_locales" DROP COLUMN "intro_pull_quote_accent";
  ALTER TABLE "home_intro_locales" DROP COLUMN "intro_pull_quote_after";
  ALTER TABLE "home_intro_locales" DROP COLUMN "intro_col1";
  ALTER TABLE "home_intro_locales" DROP COLUMN "intro_col2";
  ALTER TABLE "home_intro_locales" DROP COLUMN "journey_eyebrow";
  ALTER TABLE "home_intro_locales" DROP COLUMN "journey_heading_a";
  ALTER TABLE "home_intro_locales" DROP COLUMN "journey_heading_b";
  ALTER TABLE "home_intro_locales" DROP COLUMN "journey_cta_label";
  ALTER TABLE "pricing_insurance_locales" DROP COLUMN "insurance_eyebrow";
  ALTER TABLE "pricing_insurance_locales" DROP COLUMN "insurance_heading_roman";
  ALTER TABLE "pricing_insurance_locales" DROP COLUMN "insurance_heading_italic";
  ALTER TABLE "pricing_insurance_locales" DROP COLUMN "insurance_body";
  ALTER TABLE "pricing_insurance_locales" DROP COLUMN "payment_eyebrow";
  ALTER TABLE "pricing_insurance_locales" DROP COLUMN "payment_heading_roman";
  ALTER TABLE "pricing_insurance_locales" DROP COLUMN "payment_heading_italic";
  ALTER TABLE "pricing_insurance_locales" DROP COLUMN "payment_terms_text";`)
}

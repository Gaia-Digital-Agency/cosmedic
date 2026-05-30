import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'id');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_procedures_catalogue_group" AS ENUM('surgical', 'machine', 'injection', 'btl');
  CREATE TYPE "public"."enum_procedures_audience_tier" AS ENUM('standard', 'tourist', 'kitas_ktp', 'package');
  CREATE TYPE "public"."enum_procedures_body_zone" AS ENUM('face', 'upper-body', 'lower-body', 'package', 'other');
  CREATE TYPE "public"."enum_analytics_topics" AS ENUM('face', 'breast', 'body', 'reconstructive', 'injectables', 'laser', 'skin', 'hair', 'dental', 'weight-loss');
  CREATE TYPE "public"."enum_footer_link_columns_items_social" AS ENUM('none', 'instagram', 'facebook', 'whatsapp', 'tiktok', 'youtube', 'linkedin', 'x');
  CREATE TABLE "disciplines_faqs_locales" (
  	"q" varchar NOT NULL,
  	"a" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "disciplines_locales" (
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"body" jsonb,
  	"chapter_title_a" varchar,
  	"chapter_title_b" varchar,
  	"tagline" varchar,
  	"lede" varchar,
  	"overview" jsonb,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "sub_categories_sections_locales" (
  	"t" varchar NOT NULL,
  	"body" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sub_categories_faqs_locales" (
  	"q" varchar NOT NULL,
  	"a" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sub_categories_locales" (
  	"title" varchar NOT NULL,
  	"chapter_title_a" varchar,
  	"chapter_title_b" varchar,
  	"tagline" varchar,
  	"lede" varchar,
  	"intro" jsonb,
  	"overview" jsonb,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "procedures_sections_locales" (
  	"t" varchar NOT NULL,
  	"body" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "procedures_faqs_locales" (
  	"q" varchar NOT NULL,
  	"a" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "procedures_detail_included_locales" (
  	"value" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "procedures_locales" (
  	"name" varchar NOT NULL,
  	"short_name" varchar,
  	"description" jsonb,
  	"pricing_price_notes" varchar,
  	"detail_duration" varchar,
  	"detail_recovery" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "surgeons_spec_areas_locales" (
  	"value" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "surgeons_locales" (
  	"spec" varchar,
  	"train" varchar,
  	"proc" varchar,
  	"bio" jsonb,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "before_after_cases_locales" (
  	"case_label" varchar NOT NULL,
  	"before_alt" varchar,
  	"after_alt" varchar,
  	"description" jsonb,
  	"recovery_duration" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "stories_locales" (
  	"quote" varchar,
  	"body" jsonb,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "journey_steps_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"letter" varchar NOT NULL
  );
  
  CREATE TABLE "journey_steps_bullets_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "journey_steps_locales" (
  	"title" varchar NOT NULL,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "recovery_stays_amenities_locales" (
  	"value" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "recovery_stays_locales" (
  	"name" varchar NOT NULL,
  	"body" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "analytics_topics" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_analytics_topics",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "analytics" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"word_count" numeric,
  	"asked_at" timestamp(3) with time zone,
  	"ip" varchar,
  	"country" varchar,
  	"city" varchar,
  	"timezone" varchar,
  	"user_agent" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "blog_posts_locales" (
  	"title" varchar NOT NULL,
  	"lede" varchar,
  	"body" jsonb,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "press_mentions_locales" (
  	"headline" varchar,
  	"summary" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "awards_locales" (
  	"name" varchar NOT NULL,
  	"issuer" varchar,
  	"summary" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "privacy_sections_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "privacy_sections_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "privacy_sections" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "home_page_locales" (
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "home_hero" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"secondary_cta_href" varchar DEFAULT '/pricing',
  	"hero_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_hero_locales" (
  	"breadcrumb_label" varchar DEFAULT 'Home',
  	"eyebrow" varchar DEFAULT 'A sanctuary in Nusa Dua · Est. 1998',
  	"title_a" varchar DEFAULT 'Plastic surgery',
  	"title_b" varchar DEFAULT 'in Bali, by ISAPS surgeons.',
  	"lede" varchar DEFAULT 'Performed inside Indonesia''s first ACHSI-accredited international hospital, with private villa recovery and twelve months of telehealth follow-up included. Procedures from Rp 18,900,000 (≈ AUD 1,800).',
  	"primary_cta_label" varchar DEFAULT 'Plan Your Treatment',
  	"secondary_cta_label" varchar DEFAULT 'View Pricing',
  	"quick_enquiry_eyebrow" varchar DEFAULT 'Begin · No commitment',
  	"quick_enquiry_heading" varchar DEFAULT 'Get a private price estimate within 24 hours.',
  	"quick_enquiry_intro" varchar DEFAULT 'Two fields to start. We''ll reply with a tailored estimate and procedure guide — no marketing.',
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
  	"quick_enquiry_success_fine" varchar DEFAULT 'Thank you — your concierge will reply within one business day.',
  	"quick_enquiry_error_fine" varchar DEFAULT 'Something went wrong. Please try the full form on /contact.',
  	"quick_enquiry_fineprint" varchar DEFAULT 'Held in confidence. Reviewed by a credentialed surgeon.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "header_nav_items_mega_menu_items_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header_nav_items_mega_menu_locales" (
  	"heading" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header_nav_items_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_link_columns_items_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_link_columns_locales" (
  	"heading" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_footer_bottom_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "footer_locales" (
  	"brand_tagline" varchar DEFAULT 'Managed by BIMC Hospital',
  	"treatments_heading" varchar DEFAULT 'Treatments',
  	"newsletter_label" varchar DEFAULT 'Receive our quarterly journal',
  	"newsletter_placeholder" varchar DEFAULT 'Your email address',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "home_intro" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_intro_locales" (
  	"eyebrow" varchar DEFAULT 'Our Approach',
  	"pull_quote_before" varchar DEFAULT 'Aesthetic medicine, considered with the same ',
  	"pull_quote_accent" varchar DEFAULT 'care ',
  	"pull_quote_after" varchar DEFAULT 'as the island that surrounds it.',
  	"col1" varchar DEFAULT 'For almost three decades, BIMC CosMedic has practiced cosmetic surgery the way Bali has practiced hospitality — quietly, with patience, and with deep respect for the person in the chair. We don''t promise transformation. We promise consideration: of your face, your body, your time, and the life you intend to return to.',
  	"col2" varchar DEFAULT 'Our centre sits within Indonesia''s most accredited international hospital. Eight ISAPS- and FICS-credentialed specialists — fellowship-trained in Korea, Japan, Singapore and across Indonesia — work alongside a concierge team that handles everything from your arrival at Ngurah Rai to your final follow-up by video.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "brand_stats_stats_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_lead_magnet" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cover_image_id" integer,
  	"cover_eyebrow" varchar DEFAULT 'A guide · 24 pages · PDF',
  	"body_eyebrow" varchar DEFAULT 'Free Guide',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_lead_magnet_locales" (
  	"cover_title" varchar DEFAULT 'The Bali
  Recovery
  Guide.',
  	"cover_footer" varchar DEFAULT 'BIMC CosMedic · MMXXVI',
  	"heading_a" varchar DEFAULT 'What to expect from',
  	"heading_b" varchar DEFAULT 'recovery in Bali.',
  	"lede" varchar DEFAULT 'A 24-page editorial guide written by our concierge team — covering recovery timelines for the ten most-requested procedures, what to pack, what villas suit which surgeries, and the pace of a typical fortnight in Nusa Dua.',
  	"form_placeholder" varchar DEFAULT 'Your email address',
  	"submit_label" varchar DEFAULT 'Send Guide →',
  	"success_heading" varchar DEFAULT '✓ Sent',
  	"success_body" varchar DEFAULT 'Check your inbox — the guide is on its way.',
  	"fineprint" varchar DEFAULT 'One email. No marketing list. Unsubscribe anytime.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "home_place_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"letter" varchar NOT NULL
  );
  
  CREATE TABLE "home_place_rows_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_place" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_href" varchar DEFAULT '/recovery-stays',
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_place_locales" (
  	"eyebrow" varchar DEFAULT 'Recovery in Bali',
  	"heading_a" varchar DEFAULT 'Recover',
  	"heading_b" varchar DEFAULT 'in paradise.',
  	"body" varchar DEFAULT 'Nusa Dua sits on the southernmost reach of Bali — quiet beaches, soft afternoons, and the kind of warm, careful hospitality that has made the island synonymous with rest. We work with a small portfolio of villas and resorts, hand-selected for privacy and post-operative comfort.',
  	"cta_label" varchar DEFAULT 'View recovery stays',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "floating_chrome_locales" (
  	"cta_pill_label" varchar DEFAULT 'Plan your treatment',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "endorsement_mark_locales" (
  	"endorsement_line" varchar DEFAULT 'Managed by BIMC Hospital · Nusa Dua · Bali',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "settings_locales" (
  	"site_tagline" varchar,
  	"default_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "home_treatments_view" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_treatments_view_locales" (
  	"lede" varchar DEFAULT 'A complete repertoire under one roof, sequenced into a single journey. Treatments may be combined; recovery is always private.',
  	"eyebrow" varchar DEFAULT 'Treatments',
  	"heading_a" varchar DEFAULT 'Six disciplines,',
  	"heading_b" varchar DEFAULT 'one sanctuary.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "home_pricing_view" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"view_all_href" varchar DEFAULT '/pricing',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_pricing_view_locales" (
  	"lede" varchar DEFAULT 'Indicative starting prices in IDR (with AUD equivalent). Final quotes are tailored after consultation. Travel, accommodation and concierge can be packaged.',
  	"eyebrow" varchar DEFAULT 'Pricing · Starting From',
  	"heading_a" varchar DEFAULT 'Transparent',
  	"heading_b" varchar DEFAULT 'pricing.',
  	"footnote" varchar DEFAULT 'Prices indicative for international patients. AUD shown at 1 AUD ≈ Rp 12,500 (May 2026). Recovery stays, transfers and 12-month telehealth follow-up included on most surgical packages.',
  	"view_all_label" varchar DEFAULT 'View full pricing',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "home_surgeons_view" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT '8 Specialists',
  	"group_photo_id" integer,
  	"lead_surgeon_eyebrow" varchar DEFAULT 'Lead Surgeon',
  	"lead_stat1_label" varchar DEFAULT 'Trained',
  	"lead_stat1_value" varchar DEFAULT 'Indonesia · Japan',
  	"lead_stat2_label" varchar DEFAULT 'Specialty',
  	"lead_stat2_value" varchar DEFAULT 'Facial Aesthetics',
  	"lead_stat3_label" varchar DEFAULT 'Society',
  	"lead_stat3_value" varchar DEFAULT 'ISAPS Member',
  	"associates_eyebrow" varchar DEFAULT 'Associate Surgeons & Aestheticians',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_surgeons_view_locales" (
  	"team_caption" varchar DEFAULT 'One team, one standard.',
  	"lead_body" varchar DEFAULT 'Our plastic and aesthetic doctors work side by side under one ACHSI-accredited roof.',
  	"lead_cta_label" varchar DEFAULT 'Meet all the doctors',
  	"group_photo_alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "home_gallery_view" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"lede" varchar DEFAULT 'Three signature results from our facial repertoire.',
  	"eyebrow" varchar DEFAULT 'Before & After Results',
  	"heading_a" varchar DEFAULT 'Quietly',
  	"heading_b" varchar DEFAULT 'transformative.',
  	"cta_label" varchar DEFAULT 'View the full gallery',
  	"cta_href" varchar DEFAULT '/results#results',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_journey_view" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_href" varchar DEFAULT '/journey',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_journey_view_locales" (
  	"eyebrow" varchar DEFAULT 'Your Journey',
  	"heading_a" varchar DEFAULT 'From enquiry to',
  	"heading_b" varchar DEFAULT 'homecoming.',
  	"cta_label" varchar DEFAULT 'Read the full journey',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "home_stories_view" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_href" varchar DEFAULT '/results#stories',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_stories_view_locales" (
  	"lede" varchar DEFAULT 'Verified reviews from international patients. Video testimonials and Google reviews on our full stories page.',
  	"eyebrow" varchar DEFAULT 'Verified Patient Stories',
  	"heading_a" varchar DEFAULT 'Stories,',
  	"heading_b" varchar DEFAULT 'not slogans.',
  	"cta_label" varchar DEFAULT 'Read more stories',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "treatments_page_locales" (
  	"chapter_title_a" varchar,
  	"chapter_title_b" varchar,
  	"tagline" varchar,
  	"lede" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "treatments_hero" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"image_hue" numeric DEFAULT 1,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "treatments_hero_locales" (
  	"chapter" varchar DEFAULT 'Chapter II — The Repertoire',
  	"title_a" varchar DEFAULT 'Six disciplines,',
  	"title_b" varchar DEFAULT 'one sanctuary.',
  	"lede" varchar DEFAULT 'A complete repertoire of cosmetic medicine practiced under one roof — surgical, non-surgical, restorative, and the careful coordination that holds it all together.',
  	"image_label" varchar DEFAULT 'THE REPERTOIRE',
  	"breadcrumb_label" varchar DEFAULT 'Treatments',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "treatments_index_section" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"read_more_arrow" varchar DEFAULT '→',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "treatments_index_section_locales" (
  	"eyebrow" varchar DEFAULT 'An Index',
  	"heading" varchar DEFAULT 'Browse by discipline.',
  	"lede" varchar DEFAULT 'Each discipline is led by a specialist surgeon and supported by the full clinical, recovery, and concierge team. Treatments may be combined across disciplines on a single visit.',
  	"read_more_label" varchar DEFAULT 'Read more',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "treatments_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL
  );
  
  CREATE TABLE "treatments_stats_stats_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "treatments_stats" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "discipline_detail_template" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "discipline_detail_template_locales" (
  	"toc_on_this_page_label" varchar DEFAULT 'On this page',
  	"toc_overview_label" varchar DEFAULT 'Overview',
  	"toc_sub_categories_label" varchar DEFAULT 'Sub-categories',
  	"toc_procedures_label" varchar DEFAULT 'Procedures',
  	"toc_faqs_label" varchar DEFAULT 'FAQs',
  	"overview_heading" varchar DEFAULT 'Overview',
  	"choose_a_focus_heading" varchar DEFAULT 'Choose a focus',
  	"choose_a_focus_body_template" varchar DEFAULT 'This discipline is organised into {count} areas. Each page lists every treatment we offer with its starting price.',
  	"choose_a_focus_available_label" varchar DEFAULT 'Read more →',
  	"choose_a_focus_coming_label" varchar DEFAULT 'Coming v1.4',
  	"procedures_heading" varchar DEFAULT 'Procedures',
  	"procedures_intro" varchar DEFAULT 'The full list, with our typical price-from. We will give you a precise quote during consultation.',
  	"faqs_heading" varchar DEFAULT 'Frequently asked',
  	"related_eyebrow" varchar DEFAULT 'Related',
  	"related_heading_italic" varchar DEFAULT 'Often considered',
  	"related_heading_roman" varchar DEFAULT 'alongside.',
  	"related_lede_template" varchar DEFAULT 'Many of our patients combine treatments across disciplines. These pair particularly well with {discipline}.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "sub_category_detail_template" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"chapter_separator" varchar DEFAULT ' · ',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "sub_category_detail_template_locales" (
  	"toc_on_this_page_label" varchar DEFAULT 'On this page',
  	"toc_overview_label" varchar DEFAULT 'Overview',
  	"toc_treatments_label" varchar DEFAULT 'Treatments',
  	"toc_faqs_label" varchar DEFAULT 'FAQs',
  	"take_a_step_eyebrow" varchar DEFAULT 'Take a step',
  	"take_a_step_video_consult_label" varchar DEFAULT 'Book a video consult →',
  	"take_a_step_estimate_label" varchar DEFAULT 'Get a written estimate →',
  	"take_a_step_whatsapp_label" varchar DEFAULT 'WhatsApp the concierge →',
  	"take_a_step_reply_line" varchar DEFAULT 'Replies within 24 hours. No obligation.',
  	"overview_heading" varchar DEFAULT 'Overview',
  	"treatments_heading" varchar DEFAULT 'Treatments',
  	"treatments_intro" varchar DEFAULT 'The full list, with our typical price-from. Tap any treatment to expand details. Final quote is tailored after consultation.',
  	"faqs_heading" varchar DEFAULT 'Frequently asked',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "surgeons_page_locales" (
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "surgeons_hero" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"breadcrumb_label" varchar DEFAULT 'Surgeons',
  	"hero_image_id" integer,
  	"image_hue" numeric DEFAULT 2,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "surgeons_hero_locales" (
  	"title_a" varchar NOT NULL,
  	"title_b" varchar NOT NULL,
  	"lede" varchar NOT NULL,
  	"image_label" varchar,
  	"chapter" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "surgeons_lead_view" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "surgeons_lead_view_locales" (
  	"section_eyebrow" varchar NOT NULL,
  	"block_eyebrow" varchar NOT NULL,
  	"stat_label_trained" varchar DEFAULT 'Trained' NOT NULL,
  	"stat_label_specialty" varchar DEFAULT 'Specialty' NOT NULL,
  	"stat_label_distinction" varchar DEFAULT 'Distinction' NOT NULL,
  	"cta_label" varchar DEFAULT 'Read the full profile' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "surgeons_plastic_view" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "surgeons_plastic_view_locales" (
  	"lede" varchar NOT NULL,
  	"eyebrow" varchar NOT NULL,
  	"heading_a" varchar,
  	"heading_b" varchar NOT NULL,
  	"heading_italic" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "surgeons_aesthetic_view" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "surgeons_aesthetic_view_locales" (
  	"lede" varchar NOT NULL,
  	"eyebrow" varchar NOT NULL,
  	"heading_a" varchar,
  	"heading_b" varchar NOT NULL,
  	"heading_italic" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "surgeon_detail_template_training_row_labels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "surgeon_detail_template_training_row_labels_locales" (
  	"value" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "surgeon_detail_template_training_row_rights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "surgeon_detail_template_training_row_rights_locales" (
  	"value" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "surgeon_detail_template" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"breadcrumb_home_label" varchar DEFAULT 'BIMC CosMedic' NOT NULL,
  	"breadcrumb_surgeons_label" varchar DEFAULT 'Surgeons' NOT NULL,
  	"hero_cta_treatments_label_template" varchar,
  	"training_row_practice_mid" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "surgeon_detail_template_locales" (
  	"hero_lead_label" varchar DEFAULT 'Lead Surgeon' NOT NULL,
  	"hero_specialist_label" varchar DEFAULT 'Specialist' NOT NULL,
  	"hero_cta_consult_label" varchar DEFAULT 'Request a consultation' NOT NULL,
  	"hero_cta_treatments_label_fallback" varchar DEFAULT 'Treatments' NOT NULL,
  	"stat_label_years" varchar DEFAULT 'Years in practice' NOT NULL,
  	"stat_label_distinction" varchar DEFAULT 'Distinction' NOT NULL,
  	"stat_label_specialty" varchar DEFAULT 'Specialty' NOT NULL,
  	"sidebar_label_specialism" varchar DEFAULT 'Specialism' NOT NULL,
  	"sidebar_label_credentials" varchar DEFAULT 'Credentials' NOT NULL,
  	"sidebar_label_languages" varchar DEFAULT 'Languages' NOT NULL,
  	"sidebar_label_availability" varchar DEFAULT 'Availability' NOT NULL,
  	"languages_fallback" varchar DEFAULT 'English · Bahasa Indonesia' NOT NULL,
  	"availability_fallback" varchar DEFAULT 'Mon & Thu in person · weekday mornings by video' NOT NULL,
  	"faculty_eyebrow" varchar DEFAULT 'The faculty' NOT NULL,
  	"faculty_heading_pre" varchar DEFAULT 'Meet the ' NOT NULL,
  	"faculty_heading_italic" varchar DEFAULT 'other practitioners.' NOT NULL,
  	"faculty_heading_post" varchar DEFAULT '',
  	"specialty_eyebrow" varchar DEFAULT 'Specialty areas' NOT NULL,
  	"specialty_heading_template" varchar NOT NULL,
  	"training_eyebrow" varchar DEFAULT 'Training & credentials' NOT NULL,
  	"biography_eyebrow" varchar DEFAULT 'Biography' NOT NULL,
  	"secondary_bio_paragraph" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "results_page_locales" (
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "results_hero" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"breadcrumb_label" varchar DEFAULT 'Results & Stories',
  	"hero_image_id" integer,
  	"image_hue" numeric DEFAULT 1,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "results_hero_locales" (
  	"title_a" varchar DEFAULT 'Quietly',
  	"title_b" varchar DEFAULT 'transformative.',
  	"lede" varchar DEFAULT 'A small selection of consented results paired with the stories behind them. Our complete library — over two hundred cases — is shared during private consultation.',
  	"image_label" varchar DEFAULT 'RESULTS & STORIES',
  	"chapter" varchar DEFAULT 'Chapter IV — Results & Stories',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "library_cta" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"button_href" varchar DEFAULT '/contact',
  	"share_button_href" varchar DEFAULT '/contact',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "library_cta_locales" (
  	"eyebrow" varchar DEFAULT 'Private gallery',
  	"heading_pre" varchar DEFAULT 'Want to see ',
  	"heading_italic" varchar DEFAULT 'more?',
  	"body" varchar DEFAULT 'Our complete library — over two hundred consented cases across every discipline — is shared during private consultation. We will match what we show you to the work you are considering.',
  	"button_label" varchar DEFAULT 'Request the full library',
  	"share_eyebrow" varchar DEFAULT 'Sharing your story',
  	"share_heading_pre" varchar DEFAULT 'Have a ',
  	"share_heading_italic" varchar DEFAULT 'story',
  	"share_heading_post" varchar DEFAULT ' to share?',
  	"share_body" varchar DEFAULT 'We never solicit testimonials — every story we publish is shared at the patient''s instigation, in their own words, with their consent. If you''d like to share, we would be honoured to read it.',
  	"share_button_label" varchar DEFAULT 'Write to us',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "share_cta" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Sharing your story',
  	"heading_pre" varchar DEFAULT 'Have a ',
  	"heading_italic" varchar DEFAULT 'story',
  	"heading_post" varchar DEFAULT ' to share?',
  	"body" varchar DEFAULT 'We never solicit testimonials — every story we publish is shared at the patient''s instigation, in their own words, with their consent. If you''d like to share, we would be honoured to read it.',
  	"button_label" varchar DEFAULT 'Write to us',
  	"button_href" varchar DEFAULT '/contact',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "gallery_page_locales" (
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"image_label" varchar DEFAULT 'GALLERY',
  	"breadcrumb_label" varchar DEFAULT 'Gallery',
  	"filter_bar_label" varchar DEFAULT 'Featured cases',
  	"count_format" varchar DEFAULT '{n} cases · facial',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "stories_page_locales" (
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"image_label" varchar DEFAULT 'STORIES',
  	"breadcrumb_label" varchar DEFAULT 'Stories',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "results_featured_cases_view" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "results_featured_cases_view_locales" (
  	"eyebrow" varchar DEFAULT 'Featured cases',
  	"heading_pre" varchar DEFAULT 'Four signature cases,',
  	"heading_italic" varchar DEFAULT 'shared with permission.',
  	"lede" varchar DEFAULT 'Each case represents a typical outcome, photographed at consistent angles and lighting, three to six months post-procedure.',
  	"filter_bar_label" varchar DEFAULT 'Featured cases',
  	"count_format" varchar DEFAULT '{n} cases · facial',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "results_stories_view" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "results_stories_view_locales" (
  	"eyebrow" varchar DEFAULT 'Stories',
  	"heading_pre" varchar DEFAULT 'Stories,',
  	"heading_italic" varchar DEFAULT 'not slogans.',
  	"lede" varchar DEFAULT 'Eight stories from the last two years of patients, shared with their permission. Editorial restraint over marketing copy — these are the patients we''re proudest to have served.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pricing_page_locales" (
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pricing_hero" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"image_hue" numeric DEFAULT 2,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "pricing_hero_locales" (
  	"chapter" varchar DEFAULT 'Chapter X — Pricing',
  	"title_a" varchar DEFAULT 'Every treatment,',
  	"title_b" varchar DEFAULT 'every price.',
  	"lede" varchar DEFAULT 'The complete pricing index, organised by discipline. Prices are starting figures in IDR with an Australian-dollar equivalent. Every plan is quoted precisely after a private consultation; what we quote is what you pay.',
  	"image_label" varchar DEFAULT 'PRICING',
  	"breadcrumb_label" varchar DEFAULT 'Pricing',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pricing_overview" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "pricing_overview_locales" (
  	"eyebrow" varchar,
  	"heading_a" varchar,
  	"heading_b" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pricing_footnote" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "pricing_footnote_locales" (
  	"text" varchar DEFAULT 'Prices indicative for international patients. AUD shown at 1 AUD ≈ Rp 10,500 (May 2026). Final quotes are tailored after consultation. Recovery stays, transfers, and twelve months of telehealth follow-up included on most surgical packages.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pricing_insurance" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "pricing_insurance_locales" (
  	"eyebrow" varchar DEFAULT 'Insurance',
  	"heading_roman" varchar DEFAULT 'Working',
  	"heading_italic" varchar DEFAULT 'with insurers.',
  	"body" varchar DEFAULT 'Cosmetic surgery is rarely covered by health insurance. Reconstructive procedures may be — and where they are, we are happy to support your claim with full documentation, surgeon''s reports, and itemised invoicing.
  
  Travel insurance is recommended for every patient, and we work with two specialist medical-travel insurers — details supplied during consultation.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pricing_payment" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "pricing_payment_locales" (
  	"eyebrow" varchar DEFAULT 'Payment',
  	"heading_roman" varchar DEFAULT 'Quiet,',
  	"heading_italic" varchar DEFAULT 'considered terms.',
  	"terms_text" varchar DEFAULT 'Deposit | 20% on confirmation
  Balance | On admission, by transfer
  Currencies | IDR, AUD, USD, EUR
  Cards | Accepted, 1.8% surcharge
  Refunds | Full, until 14 days before
  Finance | Available via partner lender',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "consultation_policy_locales" (
  	"waiver_condition_text" varchar DEFAULT 'Consultation fee is waived if treatment is performed the same day.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pricing_discipline_list_view" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"arrow_char" varchar DEFAULT '→',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "pricing_discipline_list_view_locales" (
  	"section_eyebrow" varchar,
  	"on_request_label" varchar DEFAULT 'On request',
  	"included_label" varchar DEFAULT 'Included',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pricing_catalogue_view" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "pricing_catalogue_view_locales" (
  	"section_eyebrow" varchar DEFAULT 'Clinic catalogue · CMS-managed',
  	"heading_roman" varchar DEFAULT 'The full',
  	"heading_italic" varchar DEFAULT 'clinic catalogue.',
  	"intro_template" varchar DEFAULT 'Every line item below is edited in Cosmedic CMS by the clinic team and sourced from our 2025/2026 price list. Surgical, machine, injection, and BTL hair-removal services — {n}+ items in total.',
  	"sheet_labels_surgical_title" varchar DEFAULT 'Surgical Procedures',
  	"sheet_labels_surgical_subtitle" varchar DEFAULT '2025 & 2026 pricing · IDR + AUD',
  	"sheet_labels_machine_title" varchar DEFAULT 'Machine Treatments',
  	"sheet_labels_machine_subtitle" varchar DEFAULT 'Erbium · AFT · Q-switched · Pixel',
  	"sheet_labels_injection_title" varchar DEFAULT 'Injectable Catalogue',
  	"sheet_labels_injection_subtitle" varchar DEFAULT 'Named brand pricing per ml / unit',
  	"sheet_labels_btl_title" varchar DEFAULT 'BTL Hair Removal',
  	"sheet_labels_btl_subtitle" varchar DEFAULT 'Per area · per session',
  	"hair_zone_labels_face" varchar DEFAULT 'Face',
  	"hair_zone_labels_upper_body" varchar DEFAULT 'Upper Body',
  	"hair_zone_labels_lower_body" varchar DEFAULT 'Lower Body',
  	"hair_zone_labels_package_zone" varchar DEFAULT 'Packages',
  	"hair_zone_labels_other" varchar DEFAULT 'Other BTL',
  	"injectable_category_labels_botulinum_toxin" varchar DEFAULT 'Botulinum Toxin',
  	"injectable_category_labels_filler" varchar DEFAULT 'Dermal Fillers',
  	"injectable_category_labels_skin_booster" varchar DEFAULT 'Skin Boosters',
  	"injectable_category_labels_collagen_stimulator" varchar DEFAULT 'Collagen Stimulators',
  	"injectable_category_labels_bio_remodeling" varchar DEFAULT 'Bio-Remodeling',
  	"injectable_category_labels_thread_lift" varchar DEFAULT 'Thread Lift',
  	"injectable_category_labels_mesotherapy" varchar DEFAULT 'Mesotherapy',
  	"injectable_category_labels_hgh" varchar DEFAULT 'HGH',
  	"injectable_category_labels_other" varchar DEFAULT 'Other',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "journey_page_locales" (
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "journey_hero" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"image_hue" numeric DEFAULT 4,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "journey_hero_locales" (
  	"breadcrumb_label" varchar DEFAULT 'Your Journey',
  	"title_a" varchar,
  	"title_b" varchar,
  	"lede" varchar,
  	"image_label" varchar DEFAULT 'THE JOURNEY',
  	"chapter" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "journey_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"italic" boolean DEFAULT false
  );
  
  CREATE TABLE "journey_stats_stats_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "journey_stats" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "rec_stays_pg_top_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"italic" boolean DEFAULT false
  );
  
  CREATE TABLE "rec_stays_pg_top_stats_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "rec_stays_pg_inclusions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"letter" varchar NOT NULL
  );
  
  CREATE TABLE "rec_stays_pg_inclusions_locales" (
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "rec_stays_pg_locales" (
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"hero_chapter" varchar,
  	"hero_title_a" varchar,
  	"hero_title_b" varchar,
  	"hero_lede" varchar,
  	"hero_image_label" varchar DEFAULT 'RECOVERY STAYS',
  	"hero_breadcrumb_label" varchar DEFAULT 'Recovery Stays',
  	"portfolio_section_eyebrow" varchar DEFAULT 'The portfolio',
  	"portfolio_section_heading_italic" varchar DEFAULT 'Six',
  	"portfolio_section_heading_post" varchar DEFAULT ' places to recover.',
  	"portfolio_section_lede" varchar,
  	"inclusions_section_eyebrow" varchar DEFAULT 'What''s included',
  	"inclusions_section_heading_pre" varchar DEFAULT 'Every stay, ',
  	"inclusions_section_heading_italic" varchar DEFAULT 'considered.',
  	"inclusions_section_lede" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contact_page_locales" (
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contact_hero" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"breadcrumb_label" varchar DEFAULT 'Plan Your Journey',
  	"hero_image_id" integer,
  	"image_hue" numeric DEFAULT 3,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_hero_locales" (
  	"title_a" varchar DEFAULT 'Begin, when',
  	"title_b" varchar DEFAULT 'you are ready.',
  	"lede" varchar DEFAULT 'Write to us in your own time, in your own words. A concierge will reply within twenty-four hours, in English or Bahasa Indonesia. There is no obligation — and no pressure — to proceed.',
  	"image_label" varchar DEFAULT 'PLAN YOUR JOURNEY',
  	"chapter" varchar DEFAULT 'Chapter VIII — Plan Your Journey',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contact_enquiry_section_intent_copy" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "contact_enquiry_section_intent_copy_locales" (
  	"slug" varchar NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"lede" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_enquiry_section" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_enquiry_section_locales" (
  	"eyebrow" varchar DEFAULT 'The Enquiry',
  	"heading_pre" varchar DEFAULT 'Tell us a little',
  	"heading_italic" varchar DEFAULT 'about you.',
  	"intro" varchar DEFAULT 'Every field is optional. Tell us only what you are comfortable telling us today — we will follow up with the rest.',
  	"direct_lines_section_label" varchar DEFAULT 'Direct lines',
  	"direct_lines_concierge_label" varchar DEFAULT 'Concierge',
  	"direct_lines_whatsapp_label" varchar DEFAULT 'WhatsApp',
  	"direct_lines_email_label" varchar DEFAULT 'Email',
  	"direct_lines_press_label" varchar DEFAULT 'Press',
  	"trust_line" varchar DEFAULT 'Held in confidence. Reviewed by a credentialed surgeon. We reply within 24 hours.',
  	"form_labels_name_label" varchar DEFAULT 'Your name',
  	"form_labels_name_placeholder" varchar DEFAULT 'First name',
  	"form_labels_email_label" varchar DEFAULT 'Email',
  	"form_labels_email_placeholder" varchar DEFAULT 'you@example.com',
  	"form_labels_treatment_label" varchar DEFAULT 'Area of interest',
  	"form_labels_treatment_placeholder" varchar DEFAULT 'Select a treatment…',
  	"form_labels_add_details_label" varchar DEFAULT '+ Add a few more details (optional)',
  	"form_labels_country_label" varchar DEFAULT 'Country & city',
  	"form_labels_country_placeholder" varchar DEFAULT 'Sydney, Australia',
  	"form_labels_date_label" varchar DEFAULT 'Approximate dates',
  	"form_labels_date_placeholder" varchar DEFAULT 'Month / year',
  	"form_labels_message_label" varchar DEFAULT 'Tell us a little',
  	"form_labels_message_placeholder" varchar DEFAULT 'What you''d like to discuss, in your own words. Or simply say hello.',
  	"submit_labels_send" varchar DEFAULT 'Send enquiry',
  	"submit_labels_sending" varchar DEFAULT 'Sending…',
  	"submit_labels_sent" varchar DEFAULT 'Sent — thank you',
  	"submit_labels_success_message" varchar DEFAULT 'Thank you — your concierge will reply within one business day.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contact_visit_section" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"map_image_id" integer,
  	"map_image_label" varchar DEFAULT 'NUSA DUA · BALI',
  	"map_image_hue" numeric DEFAULT 4,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_visit_section_locales" (
  	"eyebrow" varchar DEFAULT 'Visit',
  	"heading_pre" varchar DEFAULT 'Find us in',
  	"heading_italic" varchar DEFAULT 'Nusa Dua.',
  	"body" varchar DEFAULT 'Within the BIMC Hospital Nusa Dua, on the southernmost reach of Bali. Twelve minutes from Ngurah Rai International Airport.',
  	"open_in_maps_label" varchar DEFAULT 'Open in Maps',
  	"get_directions_label" varchar DEFAULT 'Get directions',
  	"clinic_hours_label" varchar DEFAULT 'Hours · Clinic',
  	"concierge_hours_label" varchar DEFAULT 'Hours · Concierge',
  	"concierge_hours_value" varchar DEFAULT 'Twenty-four hours
  Replies within ten minutes',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "form_defaults_locales" (
  	"labels_name" varchar DEFAULT 'Your name',
  	"labels_email" varchar DEFAULT 'Email address',
  	"labels_phone" varchar DEFAULT 'Phone',
  	"labels_country" varchar DEFAULT 'Country',
  	"labels_treatment" varchar DEFAULT 'Treatment of interest',
  	"labels_message" varchar DEFAULT 'Tell us a little more',
  	"placeholders_name" varchar,
  	"placeholders_email" varchar,
  	"placeholders_phone" varchar,
  	"placeholders_country" varchar,
  	"placeholders_treatment" varchar,
  	"placeholders_message" varchar,
  	"submit_label" varchar DEFAULT 'Send enquiry',
  	"success_message" varchar DEFAULT 'Thank you — your concierge will reply within one business day.',
  	"error_message" varchar DEFAULT 'Something went wrong. Please email cosmedic@bimcbali.com if it persists.',
  	"rate_limit_message" varchar DEFAULT 'You submitted a form recently. Please wait a moment before sending another.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "vid_consult_pg_locales" (
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "blog_page_locales" (
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "press_page_locales" (
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "privacy_page_locales" (
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"last_updated_date" varchar DEFAULT 'Last updated · 12 May 2026',
  	"version_line" varchar DEFAULT 'Version 4.2 · Annual review cycle',
  	"reading_time_line" varchar DEFAULT 'Read in 6 minutes',
  	"intro_paragraph" varchar,
  	"image_label" varchar DEFAULT 'PRIVACY',
  	"toc_heading" varchar DEFAULT 'Contents',
  	"dpo_eyebrow" varchar DEFAULT 'Data Protection Officer',
  	"dpo_heading_a" varchar DEFAULT 'Questions?',
  	"dpo_heading_b" varchar DEFAULT 'Write to us.',
  	"dpo_lede" varchar DEFAULT 'We answer within five working days. For urgent medical questions, please use the main contact form — it reaches the on-call concierge in minutes.',
  	"dpo_email_label" varchar DEFAULT 'Email',
  	"dpo_email" varchar DEFAULT 'privacy@bimcbali.com',
  	"dpo_post_label" varchar DEFAULT 'Post',
  	"dpo_address_line1" varchar DEFAULT 'Data Protection Officer',
  	"dpo_address_line2" varchar DEFAULT 'BIMC CosMedic, Jl. Bypass Ngurah Rai 100X',
  	"dpo_address_line3" varchar DEFAULT 'Kuta, Bali 80361, Indonesia',
  	"dpo_general_contact_label" varchar DEFAULT 'General contact',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "blog_post_template" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"byline_written_by_label" varchar DEFAULT 'Written by',
  	"byline_published_label" varchar DEFAULT 'Published',
  	"byline_length_label" varchar DEFAULT 'Length',
  	"byline_filed_under_label" varchar DEFAULT 'Filed under',
  	"about_the_author_eyebrow_label" varchar DEFAULT 'About the author',
  	"about_the_author_read_full_profile_cta" varchar DEFAULT 'Read full profile',
  	"about_the_author_book_consultation_cta" varchar DEFAULT 'Book a consultation',
  	"more_from_the_journal_eyebrow" varchar DEFAULT 'More from the journal',
  	"more_from_the_journal_heading_pre" varchar DEFAULT 'Read ',
  	"more_from_the_journal_heading_italic" varchar DEFAULT 'on.',
  	"more_from_the_journal_back_to_journal_cta" varchar DEFAULT 'Back to the journal',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "not_found_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "not_found_page_locales" (
  	"eyebrow" varchar DEFAULT 'Error · 404',
  	"heading_a" varchar DEFAULT 'Page',
  	"heading_b" varchar DEFAULT 'not found.',
  	"lede" varchar DEFAULT 'The page you were looking for has moved or never existed. Return to the homepage, or contact our concierge if you were sent this link by mistake.',
  	"primary_btn_label" varchar DEFAULT 'Return to homepage',
  	"primary_btn_href" varchar DEFAULT '/',
  	"secondary_btn_label" varchar DEFAULT 'Speak with a concierge',
  	"secondary_btn_href" varchar DEFAULT '/contact',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "price_list_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "injectable_products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "machine_treatments" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "hair_removal_areas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_tiers_inclusions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_tiers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "inclusion_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "exclusion_items" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "price_list_items" CASCADE;
  DROP TABLE "injectable_products" CASCADE;
  DROP TABLE "machine_treatments" CASCADE;
  DROP TABLE "hair_removal_areas" CASCADE;
  DROP TABLE "pricing_tiers_inclusions" CASCADE;
  DROP TABLE "pricing_tiers" CASCADE;
  DROP TABLE "inclusion_items" CASCADE;
  DROP TABLE "exclusion_items" CASCADE;
  ALTER TABLE "procedures_rels" DROP CONSTRAINT "procedures_rels_inclusion_items_fk";
  
  ALTER TABLE "procedures_rels" DROP CONSTRAINT "procedures_rels_exclusion_items_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_price_list_items_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_injectable_products_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_machine_treatments_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_hair_removal_areas_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pricing_tiers_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_inclusion_items_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_exclusion_items_fk";
  
  ALTER TABLE "home_page" DROP CONSTRAINT "home_page_hero_image_id_media_id_fk";
  
  ALTER TABLE "press_page" DROP CONSTRAINT "press_page_hero_image_id_media_id_fk";
  
  ALTER TABLE "privacy_page" DROP CONSTRAINT "privacy_page_hero_image_id_media_id_fk";
  
  ALTER TABLE "surgeons_page" DROP CONSTRAINT "surgeons_page_hero_image_id_media_id_fk";
  
  ALTER TABLE "results_page" DROP CONSTRAINT "results_page_hero_image_id_media_id_fk";
  
  ALTER TABLE "gallery_page" DROP CONSTRAINT "gallery_page_hero_image_id_media_id_fk";
  
  ALTER TABLE "pricing_page" DROP CONSTRAINT "pricing_page_hero_image_id_media_id_fk";
  
  ALTER TABLE "journey_page" DROP CONSTRAINT "journey_page_hero_image_id_media_id_fk";
  
  ALTER TABLE "stories_page" DROP CONSTRAINT "stories_page_hero_image_id_media_id_fk";
  
  ALTER TABLE "rec_stays_pg" DROP CONSTRAINT "rec_stays_pg_hero_image_id_media_id_fk";
  
  ALTER TABLE "contact_page" DROP CONSTRAINT "contact_page_hero_image_id_media_id_fk";
  
  ALTER TABLE "vid_consult_pg" DROP CONSTRAINT "vid_consult_pg_hero_image_id_media_id_fk";
  
  ALTER TABLE "blog_page" DROP CONSTRAINT "blog_page_hero_image_id_media_id_fk";
  
  DROP INDEX "procedures_rels_inclusion_items_id_idx";
  DROP INDEX "procedures_rels_exclusion_items_id_idx";
  DROP INDEX "payload_locked_documents_rels_price_list_items_id_idx";
  DROP INDEX "payload_locked_documents_rels_injectable_products_id_idx";
  DROP INDEX "payload_locked_documents_rels_machine_treatments_id_idx";
  DROP INDEX "payload_locked_documents_rels_hair_removal_areas_id_idx";
  DROP INDEX "payload_locked_documents_rels_pricing_tiers_id_idx";
  DROP INDEX "payload_locked_documents_rels_inclusion_items_id_idx";
  DROP INDEX "payload_locked_documents_rels_exclusion_items_id_idx";
  DROP INDEX "home_page_hero_image_idx";
  DROP INDEX "press_page_hero_image_idx";
  DROP INDEX "privacy_page_hero_image_idx";
  DROP INDEX "surgeons_page_hero_image_idx";
  DROP INDEX "results_page_hero_image_idx";
  DROP INDEX "gallery_page_hero_image_idx";
  DROP INDEX "pricing_page_hero_image_idx";
  DROP INDEX "journey_page_hero_image_idx";
  DROP INDEX "stories_page_hero_image_idx";
  DROP INDEX "rec_stays_pg_hero_image_idx";
  DROP INDEX "contact_page_hero_image_idx";
  DROP INDEX "vid_consult_pg_hero_image_idx";
  DROP INDEX "blog_page_hero_image_idx";
  DROP INDEX "sub_categories_slug_idx";
  ALTER TABLE "procedures" ALTER COLUMN "parent_discipline_id" DROP NOT NULL;
  ALTER TABLE "enquiries" ALTER COLUMN "preferred_date" SET DATA TYPE varchar;
  ALTER TABLE "settings" ALTER COLUMN "aud_to_idr_rate" SET DEFAULT 12800;
  ALTER TABLE "settings" ALTER COLUMN "address_line1" SET DEFAULT 'BIMC Hospital Nusa Dua';
  ALTER TABLE "settings" ALTER COLUMN "address_line2" SET DEFAULT 'Kawasan ITDC Blok D';
  ALTER TABLE "settings" ALTER COLUMN "city" SET DEFAULT 'Nusa Dua';
  ALTER TABLE "settings" ALTER COLUMN "country" SET DEFAULT 'Bali, Indonesia';
  ALTER TABLE "footer" ALTER COLUMN "copyright_template" SET DEFAULT '© {year} BIMC CosMedic Centre';
  ALTER TABLE "users" ADD COLUMN "role" "enum_users_role" DEFAULT 'admin' NOT NULL;
  ALTER TABLE "users" ADD COLUMN "avatar_id" integer;
  ALTER TABLE "procedures" ADD COLUMN "catalogue_group" "enum_procedures_catalogue_group";
  ALTER TABLE "procedures" ADD COLUMN "main_category" varchar;
  ALTER TABLE "procedures" ADD COLUMN "sub_category" varchar;
  ALTER TABLE "procedures" ADD COLUMN "unit" varchar;
  ALTER TABLE "procedures" ADD COLUMN "audience_tier" "enum_procedures_audience_tier" DEFAULT 'standard';
  ALTER TABLE "procedures" ADD COLUMN "brand" varchar;
  ALTER TABLE "procedures" ADD COLUMN "product_line" varchar;
  ALTER TABLE "procedures" ADD COLUMN "manufacturer" varchar;
  ALTER TABLE "procedures" ADD COLUMN "fda_approved" boolean DEFAULT false;
  ALTER TABLE "procedures" ADD COLUMN "body_zone" "enum_procedures_body_zone";
  ALTER TABLE "before_after_cases" ADD COLUMN "patient_age" numeric;
  ALTER TABLE "stories" ADD COLUMN "procedure_label" varchar;
  ALTER TABLE "stories" ADD COLUMN "hue" numeric DEFAULT 0;
  ALTER TABLE "recovery_stays" ADD COLUMN "bedrooms" varchar;
  ALTER TABLE "recovery_stays" ADD COLUMN "pool_type" varchar DEFAULT 'Private';
  ALTER TABLE "recovery_stays" ADD COLUMN "image_hue" numeric DEFAULT 0;
  ALTER TABLE "recovery_stays" ADD COLUMN "drive_time" varchar;
  ALTER TABLE "recovery_stays" ADD COLUMN "nursing_note" varchar DEFAULT 'Available daily';
  ALTER TABLE "journey_steps" ADD COLUMN "number" varchar;
  ALTER TABLE "journey_steps" ADD COLUMN "image_id" integer;
  ALTER TABLE "journey_steps" ADD COLUMN "image_hue" numeric DEFAULT 0;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "analytics_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "privacy_sections_id" integer;
  ALTER TABLE "settings" ADD COLUMN "rate_locked_manually" boolean DEFAULT false;
  ALTER TABLE "settings" ADD COLUMN "rate_last_fetched_at" varchar;
  ALTER TABLE "settings" ADD COLUMN "rate_source" varchar;
  ALTER TABLE "settings" ADD COLUMN "clinic_enquiry_email" varchar;
  ALTER TABLE "settings" ADD COLUMN "press_email" varchar DEFAULT 'press@bimccosmedic.com';
  ALTER TABLE "footer_link_columns_items" ADD COLUMN "social" "enum_footer_link_columns_items_social";
  ALTER TABLE "footer" ADD COLUMN "newsletter_button_label" varchar DEFAULT '→';
  ALTER TABLE "press_page" ADD COLUMN "accreditations_section_eyebrow" varchar DEFAULT 'Accreditations';
  ALTER TABLE "press_page" ADD COLUMN "accreditations_section_heading" varchar DEFAULT 'The credentials we hold.';
  ALTER TABLE "press_page" ADD COLUMN "accreditations_section_lede" varchar DEFAULT 'We have spent twenty-eight years building these credentials, one at a time, because they are the only thing that actually matters in our line of work.';
  ALTER TABLE "press_page" ADD COLUMN "press_section_eyebrow" varchar DEFAULT 'In the press';
  ALTER TABLE "press_page" ADD COLUMN "press_section_heading_pre" varchar DEFAULT 'Quietly, in ';
  ALTER TABLE "press_page" ADD COLUMN "press_section_heading_italic" varchar DEFAULT 'good company.';
  ALTER TABLE "press_page" ADD COLUMN "press_section_lede" varchar DEFAULT 'A small selection from the editorial coverage of the past eighteen months. We do not pitch — but we are happy to talk to journalists who reach us directly.';
  ALTER TABLE "press_page" ADD COLUMN "press_enquiries_cta_label" varchar DEFAULT 'Press enquiries';
  ALTER TABLE "gallery_page" ADD COLUMN "image_hue" numeric DEFAULT 1;
  ALTER TABLE "stories_page" ADD COLUMN "image_hue" numeric DEFAULT 5;
  ALTER TABLE "rec_stays_pg" ADD COLUMN "hero_hero_image_id" integer;
  ALTER TABLE "rec_stays_pg" ADD COLUMN "hero_image_hue" numeric DEFAULT 4;
  ALTER TABLE "rec_stays_pg" ADD COLUMN "portfolio_section_heading_pre" varchar DEFAULT '';
  ALTER TABLE "rec_stays_pg" ADD COLUMN "inclusions_section_heading_post" varchar DEFAULT '';
  ALTER TABLE "blog_page" ADD COLUMN "this_issue_eyebrow" varchar DEFAULT 'This issue';
  ALTER TABLE "blog_page" ADD COLUMN "read_the_essay_cta_label" varchar DEFAULT 'Read the essay →';
  ALTER TABLE "blog_page" ADD COLUMN "archive_section_eyebrow" varchar DEFAULT 'The archive';
  ALTER TABLE "blog_page" ADD COLUMN "archive_section_heading_pre" varchar DEFAULT 'Recent ';
  ALTER TABLE "blog_page" ADD COLUMN "archive_section_heading_italic" varchar DEFAULT 'writing.';
  ALTER TABLE "blog_page" ADD COLUMN "archive_section_lede" varchar DEFAULT 'Filter by discipline, or read down. New essays go out with the quarterly journal — subscribe at the foot of any page.';
  ALTER TABLE "blog_page" ADD COLUMN "archive_section_filter_all_label" varchar DEFAULT 'All';
  ALTER TABLE "blog_page" ADD COLUMN "archive_section_empty_state_copy" varchar DEFAULT 'No posts in this category yet.';
  ALTER TABLE "disciplines_faqs_locales" ADD CONSTRAINT "disciplines_faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."disciplines_faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "disciplines_locales" ADD CONSTRAINT "disciplines_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."disciplines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sub_categories_sections_locales" ADD CONSTRAINT "sub_categories_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sub_categories_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sub_categories_faqs_locales" ADD CONSTRAINT "sub_categories_faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sub_categories_faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sub_categories_locales" ADD CONSTRAINT "sub_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sub_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "procedures_sections_locales" ADD CONSTRAINT "procedures_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."procedures_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "procedures_faqs_locales" ADD CONSTRAINT "procedures_faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."procedures_faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "procedures_detail_included_locales" ADD CONSTRAINT "procedures_detail_included_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."procedures_detail_included"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "procedures_locales" ADD CONSTRAINT "procedures_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."procedures"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "surgeons_spec_areas_locales" ADD CONSTRAINT "surgeons_spec_areas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."surgeons_spec_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "surgeons_locales" ADD CONSTRAINT "surgeons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."surgeons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "before_after_cases_locales" ADD CONSTRAINT "before_after_cases_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."before_after_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_locales" ADD CONSTRAINT "stories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journey_steps_bullets" ADD CONSTRAINT "journey_steps_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journey_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journey_steps_bullets_locales" ADD CONSTRAINT "journey_steps_bullets_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journey_steps_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journey_steps_locales" ADD CONSTRAINT "journey_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journey_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "recovery_stays_amenities_locales" ADD CONSTRAINT "recovery_stays_amenities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recovery_stays_amenities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "recovery_stays_locales" ADD CONSTRAINT "recovery_stays_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recovery_stays"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "analytics_topics" ADD CONSTRAINT "analytics_topics_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."analytics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_posts_locales" ADD CONSTRAINT "blog_posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_mentions_locales" ADD CONSTRAINT "press_mentions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."press_mentions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "awards_locales" ADD CONSTRAINT "awards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."awards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_sections_paragraphs" ADD CONSTRAINT "privacy_sections_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_sections_list_items" ADD CONSTRAINT "privacy_sections_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_locales" ADD CONSTRAINT "home_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_hero" ADD CONSTRAINT "home_hero_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_hero_locales" ADD CONSTRAINT "home_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_mega_menu_items_locales" ADD CONSTRAINT "header_nav_items_mega_menu_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items_mega_menu_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_mega_menu_locales" ADD CONSTRAINT "header_nav_items_mega_menu_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items_mega_menu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_locales" ADD CONSTRAINT "header_nav_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_link_columns_items_locales" ADD CONSTRAINT "footer_link_columns_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_link_columns_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_link_columns_locales" ADD CONSTRAINT "footer_link_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_link_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_footer_bottom_lines" ADD CONSTRAINT "footer_footer_bottom_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_intro_locales" ADD CONSTRAINT "home_intro_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_intro"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "brand_stats_stats_locales" ADD CONSTRAINT "brand_stats_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."brand_stats_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_lead_magnet" ADD CONSTRAINT "home_lead_magnet_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_lead_magnet_locales" ADD CONSTRAINT "home_lead_magnet_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_lead_magnet"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_place_rows" ADD CONSTRAINT "home_place_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_place"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_place_rows_locales" ADD CONSTRAINT "home_place_rows_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_place_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_place" ADD CONSTRAINT "home_place_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_place_locales" ADD CONSTRAINT "home_place_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_place"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "floating_chrome_locales" ADD CONSTRAINT "floating_chrome_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."floating_chrome"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "endorsement_mark_locales" ADD CONSTRAINT "endorsement_mark_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."endorsement_mark"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_locales" ADD CONSTRAINT "settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_treatments_view_locales" ADD CONSTRAINT "home_treatments_view_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_treatments_view"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_pricing_view_locales" ADD CONSTRAINT "home_pricing_view_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_pricing_view"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_surgeons_view" ADD CONSTRAINT "home_surgeons_view_group_photo_id_media_id_fk" FOREIGN KEY ("group_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_surgeons_view_locales" ADD CONSTRAINT "home_surgeons_view_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_surgeons_view"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_journey_view_locales" ADD CONSTRAINT "home_journey_view_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_journey_view"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_stories_view_locales" ADD CONSTRAINT "home_stories_view_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_stories_view"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "treatments_page_locales" ADD CONSTRAINT "treatments_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."treatments_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "treatments_hero" ADD CONSTRAINT "treatments_hero_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "treatments_hero_locales" ADD CONSTRAINT "treatments_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."treatments_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "treatments_index_section_locales" ADD CONSTRAINT "treatments_index_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."treatments_index_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "treatments_stats_stats" ADD CONSTRAINT "treatments_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."treatments_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "treatments_stats_stats_locales" ADD CONSTRAINT "treatments_stats_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."treatments_stats_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "discipline_detail_template_locales" ADD CONSTRAINT "discipline_detail_template_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."discipline_detail_template"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sub_category_detail_template_locales" ADD CONSTRAINT "sub_category_detail_template_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sub_category_detail_template"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "surgeons_page_locales" ADD CONSTRAINT "surgeons_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."surgeons_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "surgeons_hero" ADD CONSTRAINT "surgeons_hero_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "surgeons_hero_locales" ADD CONSTRAINT "surgeons_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."surgeons_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "surgeons_lead_view_locales" ADD CONSTRAINT "surgeons_lead_view_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."surgeons_lead_view"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "surgeons_plastic_view_locales" ADD CONSTRAINT "surgeons_plastic_view_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."surgeons_plastic_view"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "surgeons_aesthetic_view_locales" ADD CONSTRAINT "surgeons_aesthetic_view_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."surgeons_aesthetic_view"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "surgeon_detail_template_training_row_labels" ADD CONSTRAINT "surgeon_detail_template_training_row_labels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."surgeon_detail_template"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "surgeon_detail_template_training_row_labels_locales" ADD CONSTRAINT "surgeon_detail_template_training_row_labels_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."surgeon_detail_template_training_row_labels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "surgeon_detail_template_training_row_rights" ADD CONSTRAINT "surgeon_detail_template_training_row_rights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."surgeon_detail_template"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "surgeon_detail_template_training_row_rights_locales" ADD CONSTRAINT "surgeon_detail_template_training_row_rights_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."surgeon_detail_template_training_row_rights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "surgeon_detail_template_locales" ADD CONSTRAINT "surgeon_detail_template_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."surgeon_detail_template"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "results_page_locales" ADD CONSTRAINT "results_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."results_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "results_hero" ADD CONSTRAINT "results_hero_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "results_hero_locales" ADD CONSTRAINT "results_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."results_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "library_cta_locales" ADD CONSTRAINT "library_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."library_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_page_locales" ADD CONSTRAINT "gallery_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_page_locales" ADD CONSTRAINT "stories_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "results_featured_cases_view_locales" ADD CONSTRAINT "results_featured_cases_view_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."results_featured_cases_view"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "results_stories_view_locales" ADD CONSTRAINT "results_stories_view_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."results_stories_view"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_page_locales" ADD CONSTRAINT "pricing_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_hero" ADD CONSTRAINT "pricing_hero_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pricing_hero_locales" ADD CONSTRAINT "pricing_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_overview_locales" ADD CONSTRAINT "pricing_overview_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_footnote_locales" ADD CONSTRAINT "pricing_footnote_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_footnote"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_insurance_locales" ADD CONSTRAINT "pricing_insurance_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_insurance"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_payment_locales" ADD CONSTRAINT "pricing_payment_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_payment"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "consultation_policy_locales" ADD CONSTRAINT "consultation_policy_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."consultation_policy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_discipline_list_view_locales" ADD CONSTRAINT "pricing_discipline_list_view_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_discipline_list_view"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_catalogue_view_locales" ADD CONSTRAINT "pricing_catalogue_view_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_catalogue_view"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journey_page_locales" ADD CONSTRAINT "journey_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journey_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journey_hero" ADD CONSTRAINT "journey_hero_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "journey_hero_locales" ADD CONSTRAINT "journey_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journey_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journey_stats_stats" ADD CONSTRAINT "journey_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journey_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journey_stats_stats_locales" ADD CONSTRAINT "journey_stats_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journey_stats_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rec_stays_pg_top_stats" ADD CONSTRAINT "rec_stays_pg_top_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rec_stays_pg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rec_stays_pg_top_stats_locales" ADD CONSTRAINT "rec_stays_pg_top_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rec_stays_pg_top_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rec_stays_pg_inclusions" ADD CONSTRAINT "rec_stays_pg_inclusions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rec_stays_pg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rec_stays_pg_inclusions_locales" ADD CONSTRAINT "rec_stays_pg_inclusions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rec_stays_pg_inclusions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rec_stays_pg_locales" ADD CONSTRAINT "rec_stays_pg_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rec_stays_pg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_locales" ADD CONSTRAINT "contact_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_hero" ADD CONSTRAINT "contact_hero_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_hero_locales" ADD CONSTRAINT "contact_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_enquiry_section_intent_copy" ADD CONSTRAINT "contact_enquiry_section_intent_copy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_enquiry_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_enquiry_section_intent_copy_locales" ADD CONSTRAINT "contact_enquiry_section_intent_copy_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_enquiry_section_intent_copy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_enquiry_section_locales" ADD CONSTRAINT "contact_enquiry_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_enquiry_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_visit_section" ADD CONSTRAINT "contact_visit_section_map_image_id_media_id_fk" FOREIGN KEY ("map_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_visit_section_locales" ADD CONSTRAINT "contact_visit_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_visit_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_defaults_locales" ADD CONSTRAINT "form_defaults_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_defaults"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vid_consult_pg_locales" ADD CONSTRAINT "vid_consult_pg_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vid_consult_pg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_page_locales" ADD CONSTRAINT "blog_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_page_locales" ADD CONSTRAINT "press_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."press_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_page_locales" ADD CONSTRAINT "privacy_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "not_found_page_locales" ADD CONSTRAINT "not_found_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."not_found_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "disciplines_faqs_locales_locale_parent_id_unique" ON "disciplines_faqs_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "disciplines_locales_locale_parent_id_unique" ON "disciplines_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "sub_categories_sections_locales_locale_parent_id_unique" ON "sub_categories_sections_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "sub_categories_faqs_locales_locale_parent_id_unique" ON "sub_categories_faqs_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "sub_categories_locales_locale_parent_id_unique" ON "sub_categories_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "procedures_sections_locales_locale_parent_id_unique" ON "procedures_sections_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "procedures_faqs_locales_locale_parent_id_unique" ON "procedures_faqs_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "procedures_detail_included_locales_locale_parent_id_unique" ON "procedures_detail_included_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "procedures_locales_locale_parent_id_unique" ON "procedures_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "surgeons_spec_areas_locales_locale_parent_id_unique" ON "surgeons_spec_areas_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "surgeons_locales_locale_parent_id_unique" ON "surgeons_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "before_after_cases_locales_locale_parent_id_unique" ON "before_after_cases_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "stories_locales_locale_parent_id_unique" ON "stories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "journey_steps_bullets_order_idx" ON "journey_steps_bullets" USING btree ("_order");
  CREATE INDEX "journey_steps_bullets_parent_id_idx" ON "journey_steps_bullets" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "journey_steps_bullets_locales_locale_parent_id_unique" ON "journey_steps_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "journey_steps_locales_locale_parent_id_unique" ON "journey_steps_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "recovery_stays_amenities_locales_locale_parent_id_unique" ON "recovery_stays_amenities_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "recovery_stays_locales_locale_parent_id_unique" ON "recovery_stays_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "analytics_topics_order_idx" ON "analytics_topics" USING btree ("order");
  CREATE INDEX "analytics_topics_parent_idx" ON "analytics_topics" USING btree ("parent_id");
  CREATE INDEX "analytics_updated_at_idx" ON "analytics" USING btree ("updated_at");
  CREATE INDEX "analytics_created_at_idx" ON "analytics" USING btree ("created_at");
  CREATE UNIQUE INDEX "blog_posts_locales_locale_parent_id_unique" ON "blog_posts_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "press_mentions_locales_locale_parent_id_unique" ON "press_mentions_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "awards_locales_locale_parent_id_unique" ON "awards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "privacy_sections_paragraphs_order_idx" ON "privacy_sections_paragraphs" USING btree ("_order");
  CREATE INDEX "privacy_sections_paragraphs_parent_id_idx" ON "privacy_sections_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "privacy_sections_list_items_order_idx" ON "privacy_sections_list_items" USING btree ("_order");
  CREATE INDEX "privacy_sections_list_items_parent_id_idx" ON "privacy_sections_list_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "privacy_sections_slug_idx" ON "privacy_sections" USING btree ("slug");
  CREATE INDEX "privacy_sections_updated_at_idx" ON "privacy_sections" USING btree ("updated_at");
  CREATE INDEX "privacy_sections_created_at_idx" ON "privacy_sections" USING btree ("created_at");
  CREATE UNIQUE INDEX "home_page_locales_locale_parent_id_unique" ON "home_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_hero_hero_image_idx" ON "home_hero" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "home_hero_locales_locale_parent_id_unique" ON "home_hero_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "header_nav_items_mega_menu_items_locales_locale_parent_id_un" ON "header_nav_items_mega_menu_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "header_nav_items_mega_menu_locales_locale_parent_id_unique" ON "header_nav_items_mega_menu_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "header_nav_items_locales_locale_parent_id_unique" ON "header_nav_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "footer_link_columns_items_locales_locale_parent_id_unique" ON "footer_link_columns_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "footer_link_columns_locales_locale_parent_id_unique" ON "footer_link_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_footer_bottom_lines_order_idx" ON "footer_footer_bottom_lines" USING btree ("_order");
  CREATE INDEX "footer_footer_bottom_lines_parent_id_idx" ON "footer_footer_bottom_lines" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "home_intro_locales_locale_parent_id_unique" ON "home_intro_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "brand_stats_stats_locales_locale_parent_id_unique" ON "brand_stats_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_lead_magnet_cover_image_idx" ON "home_lead_magnet" USING btree ("cover_image_id");
  CREATE UNIQUE INDEX "home_lead_magnet_locales_locale_parent_id_unique" ON "home_lead_magnet_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_place_rows_order_idx" ON "home_place_rows" USING btree ("_order");
  CREATE INDEX "home_place_rows_parent_id_idx" ON "home_place_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_place_rows_locales_locale_parent_id_unique" ON "home_place_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_place_image_idx" ON "home_place" USING btree ("image_id");
  CREATE UNIQUE INDEX "home_place_locales_locale_parent_id_unique" ON "home_place_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "floating_chrome_locales_locale_parent_id_unique" ON "floating_chrome_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "endorsement_mark_locales_locale_parent_id_unique" ON "endorsement_mark_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "settings_locales_locale_parent_id_unique" ON "settings_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "home_treatments_view_locales_locale_parent_id_unique" ON "home_treatments_view_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "home_pricing_view_locales_locale_parent_id_unique" ON "home_pricing_view_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_surgeons_view_group_photo_idx" ON "home_surgeons_view" USING btree ("group_photo_id");
  CREATE UNIQUE INDEX "home_surgeons_view_locales_locale_parent_id_unique" ON "home_surgeons_view_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "home_journey_view_locales_locale_parent_id_unique" ON "home_journey_view_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "home_stories_view_locales_locale_parent_id_unique" ON "home_stories_view_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "treatments_page_locales_locale_parent_id_unique" ON "treatments_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "treatments_hero_hero_image_idx" ON "treatments_hero" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "treatments_hero_locales_locale_parent_id_unique" ON "treatments_hero_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "treatments_index_section_locales_locale_parent_id_unique" ON "treatments_index_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "treatments_stats_stats_order_idx" ON "treatments_stats_stats" USING btree ("_order");
  CREATE INDEX "treatments_stats_stats_parent_id_idx" ON "treatments_stats_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "treatments_stats_stats_locales_locale_parent_id_unique" ON "treatments_stats_stats_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "discipline_detail_template_locales_locale_parent_id_unique" ON "discipline_detail_template_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "sub_category_detail_template_locales_locale_parent_id_unique" ON "sub_category_detail_template_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "surgeons_page_locales_locale_parent_id_unique" ON "surgeons_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "surgeons_hero_hero_image_idx" ON "surgeons_hero" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "surgeons_hero_locales_locale_parent_id_unique" ON "surgeons_hero_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "surgeons_lead_view_locales_locale_parent_id_unique" ON "surgeons_lead_view_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "surgeons_plastic_view_locales_locale_parent_id_unique" ON "surgeons_plastic_view_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "surgeons_aesthetic_view_locales_locale_parent_id_unique" ON "surgeons_aesthetic_view_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "surgeon_detail_template_training_row_labels_order_idx" ON "surgeon_detail_template_training_row_labels" USING btree ("_order");
  CREATE INDEX "surgeon_detail_template_training_row_labels_parent_id_idx" ON "surgeon_detail_template_training_row_labels" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "surgeon_detail_template_training_row_labels_locales_locale_p" ON "surgeon_detail_template_training_row_labels_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "surgeon_detail_template_training_row_rights_order_idx" ON "surgeon_detail_template_training_row_rights" USING btree ("_order");
  CREATE INDEX "surgeon_detail_template_training_row_rights_parent_id_idx" ON "surgeon_detail_template_training_row_rights" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "surgeon_detail_template_training_row_rights_locales_locale_p" ON "surgeon_detail_template_training_row_rights_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "surgeon_detail_template_locales_locale_parent_id_unique" ON "surgeon_detail_template_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "results_page_locales_locale_parent_id_unique" ON "results_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "results_hero_hero_image_idx" ON "results_hero" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "results_hero_locales_locale_parent_id_unique" ON "results_hero_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "library_cta_locales_locale_parent_id_unique" ON "library_cta_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "gallery_page_locales_locale_parent_id_unique" ON "gallery_page_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "stories_page_locales_locale_parent_id_unique" ON "stories_page_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "results_featured_cases_view_locales_locale_parent_id_unique" ON "results_featured_cases_view_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "results_stories_view_locales_locale_parent_id_unique" ON "results_stories_view_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pricing_page_locales_locale_parent_id_unique" ON "pricing_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pricing_hero_hero_image_idx" ON "pricing_hero" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "pricing_hero_locales_locale_parent_id_unique" ON "pricing_hero_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pricing_overview_locales_locale_parent_id_unique" ON "pricing_overview_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pricing_footnote_locales_locale_parent_id_unique" ON "pricing_footnote_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pricing_insurance_locales_locale_parent_id_unique" ON "pricing_insurance_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pricing_payment_locales_locale_parent_id_unique" ON "pricing_payment_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "consultation_policy_locales_locale_parent_id_unique" ON "consultation_policy_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pricing_discipline_list_view_locales_locale_parent_id_unique" ON "pricing_discipline_list_view_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pricing_catalogue_view_locales_locale_parent_id_unique" ON "pricing_catalogue_view_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "journey_page_locales_locale_parent_id_unique" ON "journey_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "journey_hero_hero_image_idx" ON "journey_hero" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "journey_hero_locales_locale_parent_id_unique" ON "journey_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "journey_stats_stats_order_idx" ON "journey_stats_stats" USING btree ("_order");
  CREATE INDEX "journey_stats_stats_parent_id_idx" ON "journey_stats_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "journey_stats_stats_locales_locale_parent_id_unique" ON "journey_stats_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "rec_stays_pg_top_stats_order_idx" ON "rec_stays_pg_top_stats" USING btree ("_order");
  CREATE INDEX "rec_stays_pg_top_stats_parent_id_idx" ON "rec_stays_pg_top_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "rec_stays_pg_top_stats_locales_locale_parent_id_unique" ON "rec_stays_pg_top_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "rec_stays_pg_inclusions_order_idx" ON "rec_stays_pg_inclusions" USING btree ("_order");
  CREATE INDEX "rec_stays_pg_inclusions_parent_id_idx" ON "rec_stays_pg_inclusions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "rec_stays_pg_inclusions_locales_locale_parent_id_unique" ON "rec_stays_pg_inclusions_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "rec_stays_pg_locales_locale_parent_id_unique" ON "rec_stays_pg_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "contact_page_locales_locale_parent_id_unique" ON "contact_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_hero_hero_image_idx" ON "contact_hero" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "contact_hero_locales_locale_parent_id_unique" ON "contact_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_enquiry_section_intent_copy_order_idx" ON "contact_enquiry_section_intent_copy" USING btree ("_order");
  CREATE INDEX "contact_enquiry_section_intent_copy_parent_id_idx" ON "contact_enquiry_section_intent_copy" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contact_enquiry_section_intent_copy_locales_locale_parent_id" ON "contact_enquiry_section_intent_copy_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "contact_enquiry_section_locales_locale_parent_id_unique" ON "contact_enquiry_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_visit_section_map_image_idx" ON "contact_visit_section" USING btree ("map_image_id");
  CREATE UNIQUE INDEX "contact_visit_section_locales_locale_parent_id_unique" ON "contact_visit_section_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "form_defaults_locales_locale_parent_id_unique" ON "form_defaults_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "vid_consult_pg_locales_locale_parent_id_unique" ON "vid_consult_pg_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "blog_page_locales_locale_parent_id_unique" ON "blog_page_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "press_page_locales_locale_parent_id_unique" ON "press_page_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "privacy_page_locales_locale_parent_id_unique" ON "privacy_page_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "not_found_page_locales_locale_parent_id_unique" ON "not_found_page_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "users" ADD CONSTRAINT "users_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "journey_steps" ADD CONSTRAINT "journey_steps_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_analytics_fk" FOREIGN KEY ("analytics_id") REFERENCES "public"."analytics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_privacy_sections_fk" FOREIGN KEY ("privacy_sections_id") REFERENCES "public"."privacy_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rec_stays_pg" ADD CONSTRAINT "rec_stays_pg_hero_hero_image_id_media_id_fk" FOREIGN KEY ("hero_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_avatar_idx" ON "users" USING btree ("avatar_id");
  CREATE INDEX "journey_steps_image_idx" ON "journey_steps" USING btree ("image_id");
  CREATE INDEX "payload_locked_documents_rels_analytics_id_idx" ON "payload_locked_documents_rels" USING btree ("analytics_id");
  CREATE INDEX "payload_locked_documents_rels_privacy_sections_id_idx" ON "payload_locked_documents_rels" USING btree ("privacy_sections_id");
  CREATE INDEX "rec_stays_pg_hero_hero_hero_image_idx" ON "rec_stays_pg" USING btree ("hero_hero_image_id");
  CREATE INDEX "sub_categories_slug_idx" ON "sub_categories" USING btree ("slug");
  ALTER TABLE "surgeons_spec_areas" DROP COLUMN "value";
  ALTER TABLE "surgeons" DROP COLUMN "title";
  ALTER TABLE "surgeons" DROP COLUMN "spec";
  ALTER TABLE "surgeons" DROP COLUMN "train";
  ALTER TABLE "surgeons" DROP COLUMN "proc";
  ALTER TABLE "surgeons" DROP COLUMN "bio";
  ALTER TABLE "surgeons" DROP COLUMN "seo_title";
  ALTER TABLE "surgeons" DROP COLUMN "seo_description";
  ALTER TABLE "disciplines_faqs" DROP COLUMN "q";
  ALTER TABLE "disciplines_faqs" DROP COLUMN "a";
  ALTER TABLE "disciplines" DROP COLUMN "title";
  ALTER TABLE "disciplines" DROP COLUMN "subtitle";
  ALTER TABLE "disciplines" DROP COLUMN "body";
  ALTER TABLE "disciplines" DROP COLUMN "chapter_title_a";
  ALTER TABLE "disciplines" DROP COLUMN "chapter_title_b";
  ALTER TABLE "disciplines" DROP COLUMN "tagline";
  ALTER TABLE "disciplines" DROP COLUMN "lede";
  ALTER TABLE "disciplines" DROP COLUMN "overview";
  ALTER TABLE "disciplines" DROP COLUMN "seo_title";
  ALTER TABLE "disciplines" DROP COLUMN "seo_description";
  ALTER TABLE "sub_categories_sections" DROP COLUMN "t";
  ALTER TABLE "sub_categories_sections" DROP COLUMN "body";
  ALTER TABLE "sub_categories_faqs" DROP COLUMN "q";
  ALTER TABLE "sub_categories_faqs" DROP COLUMN "a";
  ALTER TABLE "sub_categories" DROP COLUMN "title";
  ALTER TABLE "sub_categories" DROP COLUMN "chapter_title_a";
  ALTER TABLE "sub_categories" DROP COLUMN "chapter_title_b";
  ALTER TABLE "sub_categories" DROP COLUMN "tagline";
  ALTER TABLE "sub_categories" DROP COLUMN "lede";
  ALTER TABLE "sub_categories" DROP COLUMN "intro";
  ALTER TABLE "sub_categories" DROP COLUMN "overview";
  ALTER TABLE "sub_categories" DROP COLUMN "seo_title";
  ALTER TABLE "sub_categories" DROP COLUMN "seo_description";
  ALTER TABLE "procedures_sections" DROP COLUMN "t";
  ALTER TABLE "procedures_sections" DROP COLUMN "body";
  ALTER TABLE "procedures_faqs" DROP COLUMN "q";
  ALTER TABLE "procedures_faqs" DROP COLUMN "a";
  ALTER TABLE "procedures_detail_included" DROP COLUMN "value";
  ALTER TABLE "procedures" DROP COLUMN "name";
  ALTER TABLE "procedures" DROP COLUMN "short_name";
  ALTER TABLE "procedures" DROP COLUMN "description";
  ALTER TABLE "procedures" DROP COLUMN "pricing_price_aud2025";
  ALTER TABLE "procedures" DROP COLUMN "pricing_price_aud2026";
  ALTER TABLE "procedures" DROP COLUMN "pricing_price_notes";
  ALTER TABLE "procedures" DROP COLUMN "detail_duration";
  ALTER TABLE "procedures" DROP COLUMN "detail_recovery";
  ALTER TABLE "procedures" DROP COLUMN "seo_title";
  ALTER TABLE "procedures" DROP COLUMN "seo_description";
  ALTER TABLE "procedures_rels" DROP COLUMN "inclusion_items_id";
  ALTER TABLE "procedures_rels" DROP COLUMN "exclusion_items_id";
  ALTER TABLE "before_after_cases" DROP COLUMN "case_label";
  ALTER TABLE "before_after_cases" DROP COLUMN "before_alt";
  ALTER TABLE "before_after_cases" DROP COLUMN "after_alt";
  ALTER TABLE "before_after_cases" DROP COLUMN "description";
  ALTER TABLE "before_after_cases" DROP COLUMN "seo_title";
  ALTER TABLE "before_after_cases" DROP COLUMN "seo_description";
  ALTER TABLE "stories" DROP COLUMN "quote";
  ALTER TABLE "stories" DROP COLUMN "body";
  ALTER TABLE "stories" DROP COLUMN "seo_title";
  ALTER TABLE "stories" DROP COLUMN "seo_description";
  ALTER TABLE "press_mentions" DROP COLUMN "headline";
  ALTER TABLE "press_mentions" DROP COLUMN "summary";
  ALTER TABLE "awards" DROP COLUMN "name";
  ALTER TABLE "awards" DROP COLUMN "issuer";
  ALTER TABLE "awards" DROP COLUMN "summary";
  ALTER TABLE "recovery_stays_amenities" DROP COLUMN "value";
  ALTER TABLE "recovery_stays" DROP COLUMN "name";
  ALTER TABLE "recovery_stays" DROP COLUMN "seo_title";
  ALTER TABLE "recovery_stays" DROP COLUMN "seo_description";
  ALTER TABLE "blog_posts" DROP COLUMN "title";
  ALTER TABLE "blog_posts" DROP COLUMN "lede";
  ALTER TABLE "blog_posts" DROP COLUMN "body";
  ALTER TABLE "blog_posts" DROP COLUMN "seo_title";
  ALTER TABLE "blog_posts" DROP COLUMN "seo_description";
  ALTER TABLE "journey_steps" DROP COLUMN "title";
  ALTER TABLE "journey_steps" DROP COLUMN "body";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "price_list_items_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "injectable_products_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "machine_treatments_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "hair_removal_areas_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pricing_tiers_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "inclusion_items_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "exclusion_items_id";
  ALTER TABLE "settings" DROP COLUMN "site_tagline";
  ALTER TABLE "settings" DROP COLUMN "default_meta_description";
  ALTER TABLE "settings" DROP COLUMN "currency_display_mode";
  ALTER TABLE "header_nav_items_mega_menu_items" DROP COLUMN "label";
  ALTER TABLE "header_nav_items_mega_menu" DROP COLUMN "heading";
  ALTER TABLE "header_nav_items" DROP COLUMN "label";
  ALTER TABLE "footer_link_columns_items" DROP COLUMN "label";
  ALTER TABLE "footer_link_columns" DROP COLUMN "heading";
  ALTER TABLE "floating_chrome" DROP COLUMN "cta_pill_label";
  ALTER TABLE "brand_stats_stats" DROP COLUMN "label";
  ALTER TABLE "endorsement_mark" DROP COLUMN "endorsement_line";
  ALTER TABLE "consultation_policy" DROP COLUMN "fee_aud";
  ALTER TABLE "consultation_policy" DROP COLUMN "waiver_condition_text";
  ALTER TABLE "form_defaults" DROP COLUMN "labels_name";
  ALTER TABLE "form_defaults" DROP COLUMN "labels_email";
  ALTER TABLE "form_defaults" DROP COLUMN "labels_phone";
  ALTER TABLE "form_defaults" DROP COLUMN "labels_country";
  ALTER TABLE "form_defaults" DROP COLUMN "labels_treatment";
  ALTER TABLE "form_defaults" DROP COLUMN "labels_message";
  ALTER TABLE "form_defaults" DROP COLUMN "placeholders_name";
  ALTER TABLE "form_defaults" DROP COLUMN "placeholders_email";
  ALTER TABLE "form_defaults" DROP COLUMN "placeholders_phone";
  ALTER TABLE "form_defaults" DROP COLUMN "placeholders_country";
  ALTER TABLE "form_defaults" DROP COLUMN "placeholders_treatment";
  ALTER TABLE "form_defaults" DROP COLUMN "placeholders_message";
  ALTER TABLE "form_defaults" DROP COLUMN "submit_label";
  ALTER TABLE "form_defaults" DROP COLUMN "success_message";
  ALTER TABLE "form_defaults" DROP COLUMN "error_message";
  ALTER TABLE "form_defaults" DROP COLUMN "rate_limit_message";
  ALTER TABLE "home_page" DROP COLUMN "chapter_title_a";
  ALTER TABLE "home_page" DROP COLUMN "chapter_title_b";
  ALTER TABLE "home_page" DROP COLUMN "tagline";
  ALTER TABLE "home_page" DROP COLUMN "lede";
  ALTER TABLE "home_page" DROP COLUMN "hero_image_id";
  ALTER TABLE "home_page" DROP COLUMN "seo_title";
  ALTER TABLE "home_page" DROP COLUMN "seo_description";
  ALTER TABLE "home_page" DROP COLUMN "intro_block_eyebrow";
  ALTER TABLE "home_page" DROP COLUMN "intro_block_pull_quote_before";
  ALTER TABLE "home_page" DROP COLUMN "intro_block_pull_quote_accent";
  ALTER TABLE "home_page" DROP COLUMN "intro_block_pull_quote_after";
  ALTER TABLE "home_page" DROP COLUMN "intro_block_col1";
  ALTER TABLE "home_page" DROP COLUMN "intro_block_col2";
  ALTER TABLE "home_page" DROP COLUMN "treatments_block_eyebrow";
  ALTER TABLE "home_page" DROP COLUMN "treatments_block_heading_part1";
  ALTER TABLE "home_page" DROP COLUMN "treatments_block_heading_part2";
  ALTER TABLE "home_page" DROP COLUMN "treatments_block_lede";
  ALTER TABLE "home_page" DROP COLUMN "pricing_teaser_block_eyebrow";
  ALTER TABLE "home_page" DROP COLUMN "pricing_teaser_block_heading_part1";
  ALTER TABLE "home_page" DROP COLUMN "pricing_teaser_block_heading_part2";
  ALTER TABLE "home_page" DROP COLUMN "pricing_teaser_block_lede";
  ALTER TABLE "home_page" DROP COLUMN "pricing_teaser_block_footnote";
  ALTER TABLE "home_page" DROP COLUMN "pricing_teaser_block_view_all_label";
  ALTER TABLE "home_page" DROP COLUMN "pricing_teaser_block_view_all_href";
  ALTER TABLE "home_page" DROP COLUMN "surgeons_block_eyebrow";
  ALTER TABLE "home_page" DROP COLUMN "surgeons_block_lead_surgeon_eyebrow";
  ALTER TABLE "home_page" DROP COLUMN "surgeons_block_lead_body";
  ALTER TABLE "home_page" DROP COLUMN "surgeons_block_lead_stat1_label";
  ALTER TABLE "home_page" DROP COLUMN "surgeons_block_lead_stat1_value";
  ALTER TABLE "home_page" DROP COLUMN "surgeons_block_lead_stat2_label";
  ALTER TABLE "home_page" DROP COLUMN "surgeons_block_lead_stat2_value";
  ALTER TABLE "home_page" DROP COLUMN "surgeons_block_lead_stat3_label";
  ALTER TABLE "home_page" DROP COLUMN "surgeons_block_lead_stat3_value";
  ALTER TABLE "home_page" DROP COLUMN "surgeons_block_lead_cta_label";
  ALTER TABLE "home_page" DROP COLUMN "surgeons_block_associates_eyebrow";
  ALTER TABLE "home_page" DROP COLUMN "gallery_block_eyebrow";
  ALTER TABLE "home_page" DROP COLUMN "gallery_block_heading_part1";
  ALTER TABLE "home_page" DROP COLUMN "gallery_block_heading_part2";
  ALTER TABLE "home_page" DROP COLUMN "gallery_block_lede";
  ALTER TABLE "home_page" DROP COLUMN "gallery_block_cta_label";
  ALTER TABLE "home_page" DROP COLUMN "gallery_block_cta_href";
  ALTER TABLE "home_page" DROP COLUMN "lead_magnet_block_cover_eyebrow";
  ALTER TABLE "home_page" DROP COLUMN "lead_magnet_block_cover_line1";
  ALTER TABLE "home_page" DROP COLUMN "lead_magnet_block_cover_line2";
  ALTER TABLE "home_page" DROP COLUMN "lead_magnet_block_cover_line3";
  ALTER TABLE "home_page" DROP COLUMN "lead_magnet_block_cover_foot1";
  ALTER TABLE "home_page" DROP COLUMN "lead_magnet_block_cover_foot2";
  ALTER TABLE "home_page" DROP COLUMN "lead_magnet_block_body_eyebrow";
  ALTER TABLE "home_page" DROP COLUMN "lead_magnet_block_heading_part1";
  ALTER TABLE "home_page" DROP COLUMN "lead_magnet_block_heading_accent";
  ALTER TABLE "home_page" DROP COLUMN "lead_magnet_block_lede";
  ALTER TABLE "home_page" DROP COLUMN "lead_magnet_block_form_placeholder";
  ALTER TABLE "home_page" DROP COLUMN "lead_magnet_block_submit_label";
  ALTER TABLE "home_page" DROP COLUMN "lead_magnet_block_success_heading";
  ALTER TABLE "home_page" DROP COLUMN "lead_magnet_block_success_body";
  ALTER TABLE "home_page" DROP COLUMN "lead_magnet_block_fineprint";
  ALTER TABLE "home_page" DROP COLUMN "journey_block_eyebrow";
  ALTER TABLE "home_page" DROP COLUMN "journey_block_heading_part1";
  ALTER TABLE "home_page" DROP COLUMN "journey_block_heading_accent";
  ALTER TABLE "home_page" DROP COLUMN "journey_block_cta_label";
  ALTER TABLE "home_page" DROP COLUMN "journey_block_cta_href";
  ALTER TABLE "home_page" DROP COLUMN "stories_block_eyebrow";
  ALTER TABLE "home_page" DROP COLUMN "stories_block_heading_accent";
  ALTER TABLE "home_page" DROP COLUMN "stories_block_heading_part2";
  ALTER TABLE "home_page" DROP COLUMN "stories_block_lede";
  ALTER TABLE "home_page" DROP COLUMN "stories_block_cta_label";
  ALTER TABLE "home_page" DROP COLUMN "stories_block_cta_href";
  ALTER TABLE "home_page" DROP COLUMN "place_block_eyebrow";
  ALTER TABLE "home_page" DROP COLUMN "place_block_heading_part1";
  ALTER TABLE "home_page" DROP COLUMN "place_block_heading_accent";
  ALTER TABLE "home_page" DROP COLUMN "place_block_body";
  ALTER TABLE "home_page" DROP COLUMN "place_block_rows_text";
  ALTER TABLE "home_page" DROP COLUMN "place_block_cta_label";
  ALTER TABLE "home_page" DROP COLUMN "place_block_cta_href";
  ALTER TABLE "press_page" DROP COLUMN "chapter_title_a";
  ALTER TABLE "press_page" DROP COLUMN "chapter_title_b";
  ALTER TABLE "press_page" DROP COLUMN "tagline";
  ALTER TABLE "press_page" DROP COLUMN "lede";
  ALTER TABLE "press_page" DROP COLUMN "hero_image_id";
  ALTER TABLE "press_page" DROP COLUMN "seo_title";
  ALTER TABLE "press_page" DROP COLUMN "seo_description";
  ALTER TABLE "privacy_page" DROP COLUMN "chapter_title_a";
  ALTER TABLE "privacy_page" DROP COLUMN "chapter_title_b";
  ALTER TABLE "privacy_page" DROP COLUMN "tagline";
  ALTER TABLE "privacy_page" DROP COLUMN "lede";
  ALTER TABLE "privacy_page" DROP COLUMN "hero_image_id";
  ALTER TABLE "privacy_page" DROP COLUMN "seo_title";
  ALTER TABLE "privacy_page" DROP COLUMN "seo_description";
  ALTER TABLE "treatments_page" DROP COLUMN "chapter_title_a";
  ALTER TABLE "treatments_page" DROP COLUMN "chapter_title_b";
  ALTER TABLE "treatments_page" DROP COLUMN "tagline";
  ALTER TABLE "treatments_page" DROP COLUMN "lede";
  ALTER TABLE "treatments_page" DROP COLUMN "seo_title";
  ALTER TABLE "treatments_page" DROP COLUMN "seo_description";
  ALTER TABLE "surgeons_page" DROP COLUMN "chapter_title_a";
  ALTER TABLE "surgeons_page" DROP COLUMN "chapter_title_b";
  ALTER TABLE "surgeons_page" DROP COLUMN "tagline";
  ALTER TABLE "surgeons_page" DROP COLUMN "lede";
  ALTER TABLE "surgeons_page" DROP COLUMN "hero_image_id";
  ALTER TABLE "surgeons_page" DROP COLUMN "seo_title";
  ALTER TABLE "surgeons_page" DROP COLUMN "seo_description";
  ALTER TABLE "results_page" DROP COLUMN "chapter_title_a";
  ALTER TABLE "results_page" DROP COLUMN "chapter_title_b";
  ALTER TABLE "results_page" DROP COLUMN "tagline";
  ALTER TABLE "results_page" DROP COLUMN "lede";
  ALTER TABLE "results_page" DROP COLUMN "hero_image_id";
  ALTER TABLE "results_page" DROP COLUMN "seo_title";
  ALTER TABLE "results_page" DROP COLUMN "seo_description";
  ALTER TABLE "gallery_page" DROP COLUMN "chapter_title_a";
  ALTER TABLE "gallery_page" DROP COLUMN "chapter_title_b";
  ALTER TABLE "gallery_page" DROP COLUMN "tagline";
  ALTER TABLE "gallery_page" DROP COLUMN "lede";
  ALTER TABLE "gallery_page" DROP COLUMN "hero_image_id";
  ALTER TABLE "gallery_page" DROP COLUMN "seo_title";
  ALTER TABLE "gallery_page" DROP COLUMN "seo_description";
  ALTER TABLE "pricing_page" DROP COLUMN "chapter_title_a";
  ALTER TABLE "pricing_page" DROP COLUMN "chapter_title_b";
  ALTER TABLE "pricing_page" DROP COLUMN "tagline";
  ALTER TABLE "pricing_page" DROP COLUMN "lede";
  ALTER TABLE "pricing_page" DROP COLUMN "hero_image_id";
  ALTER TABLE "pricing_page" DROP COLUMN "seo_title";
  ALTER TABLE "pricing_page" DROP COLUMN "seo_description";
  ALTER TABLE "journey_page" DROP COLUMN "chapter_title_a";
  ALTER TABLE "journey_page" DROP COLUMN "chapter_title_b";
  ALTER TABLE "journey_page" DROP COLUMN "tagline";
  ALTER TABLE "journey_page" DROP COLUMN "lede";
  ALTER TABLE "journey_page" DROP COLUMN "hero_image_id";
  ALTER TABLE "journey_page" DROP COLUMN "seo_title";
  ALTER TABLE "journey_page" DROP COLUMN "seo_description";
  ALTER TABLE "stories_page" DROP COLUMN "chapter_title_a";
  ALTER TABLE "stories_page" DROP COLUMN "chapter_title_b";
  ALTER TABLE "stories_page" DROP COLUMN "tagline";
  ALTER TABLE "stories_page" DROP COLUMN "lede";
  ALTER TABLE "stories_page" DROP COLUMN "hero_image_id";
  ALTER TABLE "stories_page" DROP COLUMN "seo_title";
  ALTER TABLE "stories_page" DROP COLUMN "seo_description";
  ALTER TABLE "rec_stays_pg" DROP COLUMN "chapter_title_a";
  ALTER TABLE "rec_stays_pg" DROP COLUMN "chapter_title_b";
  ALTER TABLE "rec_stays_pg" DROP COLUMN "tagline";
  ALTER TABLE "rec_stays_pg" DROP COLUMN "lede";
  ALTER TABLE "rec_stays_pg" DROP COLUMN "hero_image_id";
  ALTER TABLE "rec_stays_pg" DROP COLUMN "seo_title";
  ALTER TABLE "rec_stays_pg" DROP COLUMN "seo_description";
  ALTER TABLE "contact_page" DROP COLUMN "chapter_title_a";
  ALTER TABLE "contact_page" DROP COLUMN "chapter_title_b";
  ALTER TABLE "contact_page" DROP COLUMN "tagline";
  ALTER TABLE "contact_page" DROP COLUMN "lede";
  ALTER TABLE "contact_page" DROP COLUMN "hero_image_id";
  ALTER TABLE "contact_page" DROP COLUMN "seo_title";
  ALTER TABLE "contact_page" DROP COLUMN "seo_description";
  ALTER TABLE "vid_consult_pg" DROP COLUMN "chapter_title_a";
  ALTER TABLE "vid_consult_pg" DROP COLUMN "chapter_title_b";
  ALTER TABLE "vid_consult_pg" DROP COLUMN "tagline";
  ALTER TABLE "vid_consult_pg" DROP COLUMN "lede";
  ALTER TABLE "vid_consult_pg" DROP COLUMN "hero_image_id";
  ALTER TABLE "vid_consult_pg" DROP COLUMN "seo_title";
  ALTER TABLE "vid_consult_pg" DROP COLUMN "seo_description";
  ALTER TABLE "blog_page" DROP COLUMN "chapter_title_a";
  ALTER TABLE "blog_page" DROP COLUMN "chapter_title_b";
  ALTER TABLE "blog_page" DROP COLUMN "tagline";
  ALTER TABLE "blog_page" DROP COLUMN "lede";
  ALTER TABLE "blog_page" DROP COLUMN "hero_image_id";
  ALTER TABLE "blog_page" DROP COLUMN "seo_title";
  ALTER TABLE "blog_page" DROP COLUMN "seo_description";
  DROP TYPE "public"."enum_price_list_items_sheet";
  DROP TYPE "public"."enum_price_list_items_audience_tier";
  DROP TYPE "public"."enum_injectable_products_category";
  DROP TYPE "public"."enum_hair_removal_areas_body_zone";
  DROP TYPE "public"."enum_inclusion_items_scope";
  DROP TYPE "public"."enum_exclusion_items_scope";
  DROP TYPE "public"."enum_settings_currency_display_mode";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_price_list_items_sheet" AS ENUM('surgical', 'non-surgical', 'machine', 'injection', 'btl');
  CREATE TYPE "public"."enum_price_list_items_audience_tier" AS ENUM('standard', 'tourist', 'kitas_ktp', 'package');
  CREATE TYPE "public"."enum_injectable_products_category" AS ENUM('filler', 'botulinum-toxin', 'skin-booster', 'collagen-stimulator', 'bio-remodeling', 'hgh', 'thread-lift', 'mesotherapy');
  CREATE TYPE "public"."enum_hair_removal_areas_body_zone" AS ENUM('face', 'upper-body', 'lower-body', 'package', 'other');
  CREATE TYPE "public"."enum_inclusion_items_scope" AS ENUM('surgical-procedure', 'consultation', 'general');
  CREATE TYPE "public"."enum_exclusion_items_scope" AS ENUM('surgical-procedure', 'consultation', 'general');
  CREATE TYPE "public"."enum_settings_currency_display_mode" AS ENUM('idr-only', 'idr-with-aud');
  CREATE TABLE "price_list_items" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"sheet" "enum_price_list_items_sheet" NOT NULL,
  	"category" varchar,
  	"sub_category" varchar,
  	"name" varchar NOT NULL,
  	"unit" varchar,
  	"audience_tier" "enum_price_list_items_audience_tier" DEFAULT 'standard',
  	"notes" varchar,
  	"price_idr2025" numeric,
  	"price_aud2025" numeric,
  	"price_idr2026" numeric,
  	"price_aud2026" numeric,
  	"price_idr_range_low" numeric,
  	"price_idr_range_high" numeric,
  	"featured_rank" numeric,
  	"includes_implant" boolean DEFAULT false,
  	"linked_procedure_id" integer,
  	"linked_injectable_product_id" integer,
  	"linked_machine_treatment_id" integer,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "injectable_products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"brand" varchar,
  	"product_line" varchar,
  	"category" "enum_injectable_products_category" NOT NULL,
  	"unit" varchar,
  	"price_idr" numeric,
  	"price_aud" numeric,
  	"notes" varchar,
  	"manufacturer" varchar,
  	"fda_approved" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "machine_treatments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"machine_name" varchar NOT NULL,
  	"area" varchar NOT NULL,
  	"pricing_standard_idr" numeric,
  	"pricing_kitas_ktp_idr" numeric,
  	"pricing_package_idr" numeric,
  	"notes" varchar,
  	"linked_procedure_id" integer,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "hair_removal_areas" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"area" varchar NOT NULL,
  	"body_zone" "enum_hair_removal_areas_body_zone" NOT NULL,
  	"price_idr" numeric,
  	"notes" varchar,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pricing_tiers_inclusions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "pricing_tiers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"descriptor" jsonb,
  	"price_from_aud" numeric,
  	"price_from_idr" numeric,
  	"is_featured" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "inclusion_items" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"scope" "enum_inclusion_items_scope" DEFAULT 'surgical-procedure',
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "exclusion_items" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"scope" "enum_exclusion_items_scope" DEFAULT 'surgical-procedure',
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "disciplines_faqs_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "disciplines_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sub_categories_sections_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sub_categories_faqs_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sub_categories_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "procedures_sections_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "procedures_faqs_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "procedures_detail_included_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "procedures_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeons_spec_areas_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "before_after_cases_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "stories_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "journey_steps_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "journey_steps_bullets_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "journey_steps_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recovery_stays_amenities_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recovery_stays_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "analytics_topics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "analytics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_posts_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "press_mentions_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "awards_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_sections_paragraphs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_sections_list_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_nav_items_mega_menu_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_nav_items_mega_menu_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_nav_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_link_columns_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_link_columns_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_footer_bottom_lines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_intro" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_intro_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "brand_stats_stats_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_lead_magnet" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_lead_magnet_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_place_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_place_rows_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_place" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_place_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "floating_chrome_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "endorsement_mark_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "settings_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_treatments_view" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_treatments_view_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_pricing_view" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_pricing_view_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_surgeons_view" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_surgeons_view_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_gallery_view" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_journey_view" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_journey_view_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_stories_view" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_stories_view_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "treatments_page_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "treatments_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "treatments_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "treatments_index_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "treatments_index_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "treatments_stats_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "treatments_stats_stats_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "treatments_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "discipline_detail_template" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "discipline_detail_template_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sub_category_detail_template" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sub_category_detail_template_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeons_page_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeons_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeons_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeons_lead_view" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeons_lead_view_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeons_plastic_view" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeons_plastic_view_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeons_aesthetic_view" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeons_aesthetic_view_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeon_detail_template_training_row_labels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeon_detail_template_training_row_labels_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeon_detail_template_training_row_rights" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeon_detail_template_training_row_rights_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeon_detail_template" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeon_detail_template_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "results_page_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "results_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "results_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "library_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "library_cta_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "share_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_page_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "stories_page_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "results_featured_cases_view" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "results_featured_cases_view_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "results_stories_view" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "results_stories_view_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_page_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_overview" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_overview_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_footnote" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_footnote_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_insurance" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_insurance_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_payment" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_payment_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "consultation_policy_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_discipline_list_view" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_discipline_list_view_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_catalogue_view" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_catalogue_view_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "journey_page_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "journey_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "journey_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "journey_stats_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "journey_stats_stats_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "journey_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rec_stays_pg_top_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rec_stays_pg_top_stats_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rec_stays_pg_inclusions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rec_stays_pg_inclusions_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rec_stays_pg_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_enquiry_section_intent_copy" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_enquiry_section_intent_copy_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_enquiry_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_enquiry_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_visit_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_visit_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "form_defaults_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "vid_consult_pg_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_page_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "press_page_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_page_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_post_template" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "not_found_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "not_found_page_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "disciplines_faqs_locales" CASCADE;
  DROP TABLE "disciplines_locales" CASCADE;
  DROP TABLE "sub_categories_sections_locales" CASCADE;
  DROP TABLE "sub_categories_faqs_locales" CASCADE;
  DROP TABLE "sub_categories_locales" CASCADE;
  DROP TABLE "procedures_sections_locales" CASCADE;
  DROP TABLE "procedures_faqs_locales" CASCADE;
  DROP TABLE "procedures_detail_included_locales" CASCADE;
  DROP TABLE "procedures_locales" CASCADE;
  DROP TABLE "surgeons_spec_areas_locales" CASCADE;
  DROP TABLE "surgeons_locales" CASCADE;
  DROP TABLE "before_after_cases_locales" CASCADE;
  DROP TABLE "stories_locales" CASCADE;
  DROP TABLE "journey_steps_bullets" CASCADE;
  DROP TABLE "journey_steps_bullets_locales" CASCADE;
  DROP TABLE "journey_steps_locales" CASCADE;
  DROP TABLE "recovery_stays_amenities_locales" CASCADE;
  DROP TABLE "recovery_stays_locales" CASCADE;
  DROP TABLE "analytics_topics" CASCADE;
  DROP TABLE "analytics" CASCADE;
  DROP TABLE "blog_posts_locales" CASCADE;
  DROP TABLE "press_mentions_locales" CASCADE;
  DROP TABLE "awards_locales" CASCADE;
  DROP TABLE "privacy_sections_paragraphs" CASCADE;
  DROP TABLE "privacy_sections_list_items" CASCADE;
  DROP TABLE "privacy_sections" CASCADE;
  DROP TABLE "home_page_locales" CASCADE;
  DROP TABLE "home_hero" CASCADE;
  DROP TABLE "home_hero_locales" CASCADE;
  DROP TABLE "header_nav_items_mega_menu_items_locales" CASCADE;
  DROP TABLE "header_nav_items_mega_menu_locales" CASCADE;
  DROP TABLE "header_nav_items_locales" CASCADE;
  DROP TABLE "footer_link_columns_items_locales" CASCADE;
  DROP TABLE "footer_link_columns_locales" CASCADE;
  DROP TABLE "footer_footer_bottom_lines" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  DROP TABLE "home_intro" CASCADE;
  DROP TABLE "home_intro_locales" CASCADE;
  DROP TABLE "brand_stats_stats_locales" CASCADE;
  DROP TABLE "home_lead_magnet" CASCADE;
  DROP TABLE "home_lead_magnet_locales" CASCADE;
  DROP TABLE "home_place_rows" CASCADE;
  DROP TABLE "home_place_rows_locales" CASCADE;
  DROP TABLE "home_place" CASCADE;
  DROP TABLE "home_place_locales" CASCADE;
  DROP TABLE "floating_chrome_locales" CASCADE;
  DROP TABLE "endorsement_mark_locales" CASCADE;
  DROP TABLE "settings_locales" CASCADE;
  DROP TABLE "home_treatments_view" CASCADE;
  DROP TABLE "home_treatments_view_locales" CASCADE;
  DROP TABLE "home_pricing_view" CASCADE;
  DROP TABLE "home_pricing_view_locales" CASCADE;
  DROP TABLE "home_surgeons_view" CASCADE;
  DROP TABLE "home_surgeons_view_locales" CASCADE;
  DROP TABLE "home_gallery_view" CASCADE;
  DROP TABLE "home_journey_view" CASCADE;
  DROP TABLE "home_journey_view_locales" CASCADE;
  DROP TABLE "home_stories_view" CASCADE;
  DROP TABLE "home_stories_view_locales" CASCADE;
  DROP TABLE "treatments_page_locales" CASCADE;
  DROP TABLE "treatments_hero" CASCADE;
  DROP TABLE "treatments_hero_locales" CASCADE;
  DROP TABLE "treatments_index_section" CASCADE;
  DROP TABLE "treatments_index_section_locales" CASCADE;
  DROP TABLE "treatments_stats_stats" CASCADE;
  DROP TABLE "treatments_stats_stats_locales" CASCADE;
  DROP TABLE "treatments_stats" CASCADE;
  DROP TABLE "discipline_detail_template" CASCADE;
  DROP TABLE "discipline_detail_template_locales" CASCADE;
  DROP TABLE "sub_category_detail_template" CASCADE;
  DROP TABLE "sub_category_detail_template_locales" CASCADE;
  DROP TABLE "surgeons_page_locales" CASCADE;
  DROP TABLE "surgeons_hero" CASCADE;
  DROP TABLE "surgeons_hero_locales" CASCADE;
  DROP TABLE "surgeons_lead_view" CASCADE;
  DROP TABLE "surgeons_lead_view_locales" CASCADE;
  DROP TABLE "surgeons_plastic_view" CASCADE;
  DROP TABLE "surgeons_plastic_view_locales" CASCADE;
  DROP TABLE "surgeons_aesthetic_view" CASCADE;
  DROP TABLE "surgeons_aesthetic_view_locales" CASCADE;
  DROP TABLE "surgeon_detail_template_training_row_labels" CASCADE;
  DROP TABLE "surgeon_detail_template_training_row_labels_locales" CASCADE;
  DROP TABLE "surgeon_detail_template_training_row_rights" CASCADE;
  DROP TABLE "surgeon_detail_template_training_row_rights_locales" CASCADE;
  DROP TABLE "surgeon_detail_template" CASCADE;
  DROP TABLE "surgeon_detail_template_locales" CASCADE;
  DROP TABLE "results_page_locales" CASCADE;
  DROP TABLE "results_hero" CASCADE;
  DROP TABLE "results_hero_locales" CASCADE;
  DROP TABLE "library_cta" CASCADE;
  DROP TABLE "library_cta_locales" CASCADE;
  DROP TABLE "share_cta" CASCADE;
  DROP TABLE "gallery_page_locales" CASCADE;
  DROP TABLE "stories_page_locales" CASCADE;
  DROP TABLE "results_featured_cases_view" CASCADE;
  DROP TABLE "results_featured_cases_view_locales" CASCADE;
  DROP TABLE "results_stories_view" CASCADE;
  DROP TABLE "results_stories_view_locales" CASCADE;
  DROP TABLE "pricing_page_locales" CASCADE;
  DROP TABLE "pricing_hero" CASCADE;
  DROP TABLE "pricing_hero_locales" CASCADE;
  DROP TABLE "pricing_overview" CASCADE;
  DROP TABLE "pricing_overview_locales" CASCADE;
  DROP TABLE "pricing_footnote" CASCADE;
  DROP TABLE "pricing_footnote_locales" CASCADE;
  DROP TABLE "pricing_insurance" CASCADE;
  DROP TABLE "pricing_insurance_locales" CASCADE;
  DROP TABLE "pricing_payment" CASCADE;
  DROP TABLE "pricing_payment_locales" CASCADE;
  DROP TABLE "consultation_policy_locales" CASCADE;
  DROP TABLE "pricing_discipline_list_view" CASCADE;
  DROP TABLE "pricing_discipline_list_view_locales" CASCADE;
  DROP TABLE "pricing_catalogue_view" CASCADE;
  DROP TABLE "pricing_catalogue_view_locales" CASCADE;
  DROP TABLE "journey_page_locales" CASCADE;
  DROP TABLE "journey_hero" CASCADE;
  DROP TABLE "journey_hero_locales" CASCADE;
  DROP TABLE "journey_stats_stats" CASCADE;
  DROP TABLE "journey_stats_stats_locales" CASCADE;
  DROP TABLE "journey_stats" CASCADE;
  DROP TABLE "rec_stays_pg_top_stats" CASCADE;
  DROP TABLE "rec_stays_pg_top_stats_locales" CASCADE;
  DROP TABLE "rec_stays_pg_inclusions" CASCADE;
  DROP TABLE "rec_stays_pg_inclusions_locales" CASCADE;
  DROP TABLE "rec_stays_pg_locales" CASCADE;
  DROP TABLE "contact_page_locales" CASCADE;
  DROP TABLE "contact_hero" CASCADE;
  DROP TABLE "contact_hero_locales" CASCADE;
  DROP TABLE "contact_enquiry_section_intent_copy" CASCADE;
  DROP TABLE "contact_enquiry_section_intent_copy_locales" CASCADE;
  DROP TABLE "contact_enquiry_section" CASCADE;
  DROP TABLE "contact_enquiry_section_locales" CASCADE;
  DROP TABLE "contact_visit_section" CASCADE;
  DROP TABLE "contact_visit_section_locales" CASCADE;
  DROP TABLE "form_defaults_locales" CASCADE;
  DROP TABLE "vid_consult_pg_locales" CASCADE;
  DROP TABLE "blog_page_locales" CASCADE;
  DROP TABLE "press_page_locales" CASCADE;
  DROP TABLE "privacy_page_locales" CASCADE;
  DROP TABLE "blog_post_template" CASCADE;
  DROP TABLE "not_found_page" CASCADE;
  DROP TABLE "not_found_page_locales" CASCADE;
  ALTER TABLE "users" DROP CONSTRAINT "users_avatar_id_media_id_fk";
  
  ALTER TABLE "journey_steps" DROP CONSTRAINT "journey_steps_image_id_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_analytics_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_privacy_sections_fk";
  
  ALTER TABLE "rec_stays_pg" DROP CONSTRAINT "rec_stays_pg_hero_hero_image_id_media_id_fk";
  
  DROP INDEX "users_avatar_idx";
  DROP INDEX "journey_steps_image_idx";
  DROP INDEX "payload_locked_documents_rels_analytics_id_idx";
  DROP INDEX "payload_locked_documents_rels_privacy_sections_id_idx";
  DROP INDEX "rec_stays_pg_hero_hero_hero_image_idx";
  DROP INDEX "sub_categories_slug_idx";
  ALTER TABLE "procedures" ALTER COLUMN "parent_discipline_id" SET NOT NULL;
  ALTER TABLE "enquiries" ALTER COLUMN "preferred_date" SET DATA TYPE timestamp(3) with time zone;
  ALTER TABLE "footer" ALTER COLUMN "copyright_template" SET DEFAULT '© {year} BIMC CosMedic. All rights reserved.';
  ALTER TABLE "settings" ALTER COLUMN "aud_to_idr_rate" SET DEFAULT 10500;
  ALTER TABLE "settings" ALTER COLUMN "address_line1" SET DEFAULT 'Kawasan BTDC Blok D';
  ALTER TABLE "settings" ALTER COLUMN "address_line2" SET DEFAULT 'Nusa Dua';
  ALTER TABLE "settings" ALTER COLUMN "city" SET DEFAULT 'Bali';
  ALTER TABLE "settings" ALTER COLUMN "country" SET DEFAULT 'Indonesia';
  ALTER TABLE "disciplines_faqs" ADD COLUMN "q" varchar NOT NULL;
  ALTER TABLE "disciplines_faqs" ADD COLUMN "a" varchar NOT NULL;
  ALTER TABLE "disciplines" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "disciplines" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "disciplines" ADD COLUMN "body" jsonb;
  ALTER TABLE "disciplines" ADD COLUMN "chapter_title_a" varchar;
  ALTER TABLE "disciplines" ADD COLUMN "chapter_title_b" varchar;
  ALTER TABLE "disciplines" ADD COLUMN "tagline" varchar;
  ALTER TABLE "disciplines" ADD COLUMN "lede" varchar;
  ALTER TABLE "disciplines" ADD COLUMN "overview" jsonb;
  ALTER TABLE "disciplines" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "disciplines" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "sub_categories_sections" ADD COLUMN "t" varchar NOT NULL;
  ALTER TABLE "sub_categories_sections" ADD COLUMN "body" jsonb NOT NULL;
  ALTER TABLE "sub_categories_faqs" ADD COLUMN "q" varchar NOT NULL;
  ALTER TABLE "sub_categories_faqs" ADD COLUMN "a" varchar NOT NULL;
  ALTER TABLE "sub_categories" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "sub_categories" ADD COLUMN "chapter_title_a" varchar;
  ALTER TABLE "sub_categories" ADD COLUMN "chapter_title_b" varchar;
  ALTER TABLE "sub_categories" ADD COLUMN "tagline" varchar;
  ALTER TABLE "sub_categories" ADD COLUMN "lede" varchar;
  ALTER TABLE "sub_categories" ADD COLUMN "intro" jsonb;
  ALTER TABLE "sub_categories" ADD COLUMN "overview" jsonb;
  ALTER TABLE "sub_categories" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "sub_categories" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "procedures_sections" ADD COLUMN "t" varchar NOT NULL;
  ALTER TABLE "procedures_sections" ADD COLUMN "body" jsonb NOT NULL;
  ALTER TABLE "procedures_faqs" ADD COLUMN "q" varchar NOT NULL;
  ALTER TABLE "procedures_faqs" ADD COLUMN "a" varchar NOT NULL;
  ALTER TABLE "procedures_detail_included" ADD COLUMN "value" varchar NOT NULL;
  ALTER TABLE "procedures" ADD COLUMN "name" varchar NOT NULL;
  ALTER TABLE "procedures" ADD COLUMN "short_name" varchar;
  ALTER TABLE "procedures" ADD COLUMN "description" jsonb;
  ALTER TABLE "procedures" ADD COLUMN "pricing_price_aud2025" numeric;
  ALTER TABLE "procedures" ADD COLUMN "pricing_price_aud2026" numeric;
  ALTER TABLE "procedures" ADD COLUMN "pricing_price_notes" varchar;
  ALTER TABLE "procedures" ADD COLUMN "detail_duration" varchar;
  ALTER TABLE "procedures" ADD COLUMN "detail_recovery" varchar;
  ALTER TABLE "procedures" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "procedures" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "procedures_rels" ADD COLUMN "inclusion_items_id" integer;
  ALTER TABLE "procedures_rels" ADD COLUMN "exclusion_items_id" integer;
  ALTER TABLE "surgeons_spec_areas" ADD COLUMN "value" varchar NOT NULL;
  ALTER TABLE "surgeons" ADD COLUMN "title" varchar DEFAULT 'dr.';
  ALTER TABLE "surgeons" ADD COLUMN "spec" varchar;
  ALTER TABLE "surgeons" ADD COLUMN "train" varchar;
  ALTER TABLE "surgeons" ADD COLUMN "proc" varchar;
  ALTER TABLE "surgeons" ADD COLUMN "bio" jsonb;
  ALTER TABLE "surgeons" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "surgeons" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "before_after_cases" ADD COLUMN "case_label" varchar NOT NULL;
  ALTER TABLE "before_after_cases" ADD COLUMN "before_alt" varchar;
  ALTER TABLE "before_after_cases" ADD COLUMN "after_alt" varchar;
  ALTER TABLE "before_after_cases" ADD COLUMN "description" jsonb;
  ALTER TABLE "before_after_cases" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "before_after_cases" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "stories" ADD COLUMN "quote" varchar;
  ALTER TABLE "stories" ADD COLUMN "body" jsonb;
  ALTER TABLE "stories" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "stories" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "journey_steps" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "journey_steps" ADD COLUMN "body" jsonb;
  ALTER TABLE "recovery_stays_amenities" ADD COLUMN "value" varchar NOT NULL;
  ALTER TABLE "recovery_stays" ADD COLUMN "name" varchar NOT NULL;
  ALTER TABLE "recovery_stays" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "recovery_stays" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "blog_posts" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "blog_posts" ADD COLUMN "lede" varchar;
  ALTER TABLE "blog_posts" ADD COLUMN "body" jsonb;
  ALTER TABLE "blog_posts" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "blog_posts" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "press_mentions" ADD COLUMN "headline" varchar;
  ALTER TABLE "press_mentions" ADD COLUMN "summary" varchar;
  ALTER TABLE "awards" ADD COLUMN "name" varchar NOT NULL;
  ALTER TABLE "awards" ADD COLUMN "issuer" varchar;
  ALTER TABLE "awards" ADD COLUMN "summary" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "price_list_items_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "injectable_products_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "machine_treatments_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "hair_removal_areas_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pricing_tiers_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "inclusion_items_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "exclusion_items_id" integer;
  ALTER TABLE "home_page" ADD COLUMN "chapter_title_a" varchar;
  ALTER TABLE "home_page" ADD COLUMN "chapter_title_b" varchar;
  ALTER TABLE "home_page" ADD COLUMN "tagline" varchar;
  ALTER TABLE "home_page" ADD COLUMN "lede" varchar;
  ALTER TABLE "home_page" ADD COLUMN "hero_image_id" integer;
  ALTER TABLE "home_page" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "home_page" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "home_page" ADD COLUMN "intro_block_eyebrow" varchar;
  ALTER TABLE "home_page" ADD COLUMN "intro_block_pull_quote_before" varchar;
  ALTER TABLE "home_page" ADD COLUMN "intro_block_pull_quote_accent" varchar;
  ALTER TABLE "home_page" ADD COLUMN "intro_block_pull_quote_after" varchar;
  ALTER TABLE "home_page" ADD COLUMN "intro_block_col1" varchar;
  ALTER TABLE "home_page" ADD COLUMN "intro_block_col2" varchar;
  ALTER TABLE "home_page" ADD COLUMN "treatments_block_eyebrow" varchar;
  ALTER TABLE "home_page" ADD COLUMN "treatments_block_heading_part1" varchar;
  ALTER TABLE "home_page" ADD COLUMN "treatments_block_heading_part2" varchar;
  ALTER TABLE "home_page" ADD COLUMN "treatments_block_lede" varchar;
  ALTER TABLE "home_page" ADD COLUMN "pricing_teaser_block_eyebrow" varchar;
  ALTER TABLE "home_page" ADD COLUMN "pricing_teaser_block_heading_part1" varchar;
  ALTER TABLE "home_page" ADD COLUMN "pricing_teaser_block_heading_part2" varchar;
  ALTER TABLE "home_page" ADD COLUMN "pricing_teaser_block_lede" varchar;
  ALTER TABLE "home_page" ADD COLUMN "pricing_teaser_block_footnote" varchar;
  ALTER TABLE "home_page" ADD COLUMN "pricing_teaser_block_view_all_label" varchar;
  ALTER TABLE "home_page" ADD COLUMN "pricing_teaser_block_view_all_href" varchar;
  ALTER TABLE "home_page" ADD COLUMN "surgeons_block_eyebrow" varchar;
  ALTER TABLE "home_page" ADD COLUMN "surgeons_block_lead_surgeon_eyebrow" varchar;
  ALTER TABLE "home_page" ADD COLUMN "surgeons_block_lead_body" varchar;
  ALTER TABLE "home_page" ADD COLUMN "surgeons_block_lead_stat1_label" varchar;
  ALTER TABLE "home_page" ADD COLUMN "surgeons_block_lead_stat1_value" varchar;
  ALTER TABLE "home_page" ADD COLUMN "surgeons_block_lead_stat2_label" varchar;
  ALTER TABLE "home_page" ADD COLUMN "surgeons_block_lead_stat2_value" varchar;
  ALTER TABLE "home_page" ADD COLUMN "surgeons_block_lead_stat3_label" varchar;
  ALTER TABLE "home_page" ADD COLUMN "surgeons_block_lead_stat3_value" varchar;
  ALTER TABLE "home_page" ADD COLUMN "surgeons_block_lead_cta_label" varchar;
  ALTER TABLE "home_page" ADD COLUMN "surgeons_block_associates_eyebrow" varchar;
  ALTER TABLE "home_page" ADD COLUMN "gallery_block_eyebrow" varchar;
  ALTER TABLE "home_page" ADD COLUMN "gallery_block_heading_part1" varchar;
  ALTER TABLE "home_page" ADD COLUMN "gallery_block_heading_part2" varchar;
  ALTER TABLE "home_page" ADD COLUMN "gallery_block_lede" varchar;
  ALTER TABLE "home_page" ADD COLUMN "gallery_block_cta_label" varchar;
  ALTER TABLE "home_page" ADD COLUMN "gallery_block_cta_href" varchar;
  ALTER TABLE "home_page" ADD COLUMN "lead_magnet_block_cover_eyebrow" varchar;
  ALTER TABLE "home_page" ADD COLUMN "lead_magnet_block_cover_line1" varchar;
  ALTER TABLE "home_page" ADD COLUMN "lead_magnet_block_cover_line2" varchar;
  ALTER TABLE "home_page" ADD COLUMN "lead_magnet_block_cover_line3" varchar;
  ALTER TABLE "home_page" ADD COLUMN "lead_magnet_block_cover_foot1" varchar;
  ALTER TABLE "home_page" ADD COLUMN "lead_magnet_block_cover_foot2" varchar;
  ALTER TABLE "home_page" ADD COLUMN "lead_magnet_block_body_eyebrow" varchar;
  ALTER TABLE "home_page" ADD COLUMN "lead_magnet_block_heading_part1" varchar;
  ALTER TABLE "home_page" ADD COLUMN "lead_magnet_block_heading_accent" varchar;
  ALTER TABLE "home_page" ADD COLUMN "lead_magnet_block_lede" varchar;
  ALTER TABLE "home_page" ADD COLUMN "lead_magnet_block_form_placeholder" varchar;
  ALTER TABLE "home_page" ADD COLUMN "lead_magnet_block_submit_label" varchar;
  ALTER TABLE "home_page" ADD COLUMN "lead_magnet_block_success_heading" varchar;
  ALTER TABLE "home_page" ADD COLUMN "lead_magnet_block_success_body" varchar;
  ALTER TABLE "home_page" ADD COLUMN "lead_magnet_block_fineprint" varchar;
  ALTER TABLE "home_page" ADD COLUMN "journey_block_eyebrow" varchar;
  ALTER TABLE "home_page" ADD COLUMN "journey_block_heading_part1" varchar;
  ALTER TABLE "home_page" ADD COLUMN "journey_block_heading_accent" varchar;
  ALTER TABLE "home_page" ADD COLUMN "journey_block_cta_label" varchar;
  ALTER TABLE "home_page" ADD COLUMN "journey_block_cta_href" varchar;
  ALTER TABLE "home_page" ADD COLUMN "stories_block_eyebrow" varchar;
  ALTER TABLE "home_page" ADD COLUMN "stories_block_heading_accent" varchar;
  ALTER TABLE "home_page" ADD COLUMN "stories_block_heading_part2" varchar;
  ALTER TABLE "home_page" ADD COLUMN "stories_block_lede" varchar;
  ALTER TABLE "home_page" ADD COLUMN "stories_block_cta_label" varchar;
  ALTER TABLE "home_page" ADD COLUMN "stories_block_cta_href" varchar;
  ALTER TABLE "home_page" ADD COLUMN "place_block_eyebrow" varchar;
  ALTER TABLE "home_page" ADD COLUMN "place_block_heading_part1" varchar;
  ALTER TABLE "home_page" ADD COLUMN "place_block_heading_accent" varchar;
  ALTER TABLE "home_page" ADD COLUMN "place_block_body" varchar;
  ALTER TABLE "home_page" ADD COLUMN "place_block_rows_text" varchar;
  ALTER TABLE "home_page" ADD COLUMN "place_block_cta_label" varchar;
  ALTER TABLE "home_page" ADD COLUMN "place_block_cta_href" varchar;
  ALTER TABLE "header_nav_items_mega_menu_items" ADD COLUMN "label" varchar NOT NULL;
  ALTER TABLE "header_nav_items_mega_menu" ADD COLUMN "heading" varchar NOT NULL;
  ALTER TABLE "header_nav_items" ADD COLUMN "label" varchar NOT NULL;
  ALTER TABLE "footer_link_columns_items" ADD COLUMN "label" varchar NOT NULL;
  ALTER TABLE "footer_link_columns" ADD COLUMN "heading" varchar NOT NULL;
  ALTER TABLE "brand_stats_stats" ADD COLUMN "label" varchar NOT NULL;
  ALTER TABLE "floating_chrome" ADD COLUMN "cta_pill_label" varchar DEFAULT 'Plan your treatment';
  ALTER TABLE "endorsement_mark" ADD COLUMN "endorsement_line" varchar DEFAULT 'Managed by BIMC Hospital · Nusa Dua · Bali';
  ALTER TABLE "settings" ADD COLUMN "site_tagline" varchar;
  ALTER TABLE "settings" ADD COLUMN "default_meta_description" varchar;
  ALTER TABLE "settings" ADD COLUMN "currency_display_mode" "enum_settings_currency_display_mode" DEFAULT 'idr-with-aud';
  ALTER TABLE "treatments_page" ADD COLUMN "chapter_title_a" varchar;
  ALTER TABLE "treatments_page" ADD COLUMN "chapter_title_b" varchar;
  ALTER TABLE "treatments_page" ADD COLUMN "tagline" varchar;
  ALTER TABLE "treatments_page" ADD COLUMN "lede" varchar;
  ALTER TABLE "treatments_page" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "treatments_page" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "surgeons_page" ADD COLUMN "chapter_title_a" varchar;
  ALTER TABLE "surgeons_page" ADD COLUMN "chapter_title_b" varchar;
  ALTER TABLE "surgeons_page" ADD COLUMN "tagline" varchar;
  ALTER TABLE "surgeons_page" ADD COLUMN "lede" varchar;
  ALTER TABLE "surgeons_page" ADD COLUMN "hero_image_id" integer;
  ALTER TABLE "surgeons_page" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "surgeons_page" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "results_page" ADD COLUMN "chapter_title_a" varchar;
  ALTER TABLE "results_page" ADD COLUMN "chapter_title_b" varchar;
  ALTER TABLE "results_page" ADD COLUMN "tagline" varchar;
  ALTER TABLE "results_page" ADD COLUMN "lede" varchar;
  ALTER TABLE "results_page" ADD COLUMN "hero_image_id" integer;
  ALTER TABLE "results_page" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "results_page" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "gallery_page" ADD COLUMN "chapter_title_a" varchar;
  ALTER TABLE "gallery_page" ADD COLUMN "chapter_title_b" varchar;
  ALTER TABLE "gallery_page" ADD COLUMN "tagline" varchar;
  ALTER TABLE "gallery_page" ADD COLUMN "lede" varchar;
  ALTER TABLE "gallery_page" ADD COLUMN "hero_image_id" integer;
  ALTER TABLE "gallery_page" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "gallery_page" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "stories_page" ADD COLUMN "chapter_title_a" varchar;
  ALTER TABLE "stories_page" ADD COLUMN "chapter_title_b" varchar;
  ALTER TABLE "stories_page" ADD COLUMN "tagline" varchar;
  ALTER TABLE "stories_page" ADD COLUMN "lede" varchar;
  ALTER TABLE "stories_page" ADD COLUMN "hero_image_id" integer;
  ALTER TABLE "stories_page" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "stories_page" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "pricing_page" ADD COLUMN "chapter_title_a" varchar;
  ALTER TABLE "pricing_page" ADD COLUMN "chapter_title_b" varchar;
  ALTER TABLE "pricing_page" ADD COLUMN "tagline" varchar;
  ALTER TABLE "pricing_page" ADD COLUMN "lede" varchar;
  ALTER TABLE "pricing_page" ADD COLUMN "hero_image_id" integer;
  ALTER TABLE "pricing_page" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "pricing_page" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "consultation_policy" ADD COLUMN "fee_aud" numeric;
  ALTER TABLE "consultation_policy" ADD COLUMN "waiver_condition_text" varchar DEFAULT 'Consultation fee is waived if treatment is performed the same day.';
  ALTER TABLE "journey_page" ADD COLUMN "chapter_title_a" varchar;
  ALTER TABLE "journey_page" ADD COLUMN "chapter_title_b" varchar;
  ALTER TABLE "journey_page" ADD COLUMN "tagline" varchar;
  ALTER TABLE "journey_page" ADD COLUMN "lede" varchar;
  ALTER TABLE "journey_page" ADD COLUMN "hero_image_id" integer;
  ALTER TABLE "journey_page" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "journey_page" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "rec_stays_pg" ADD COLUMN "chapter_title_a" varchar;
  ALTER TABLE "rec_stays_pg" ADD COLUMN "chapter_title_b" varchar;
  ALTER TABLE "rec_stays_pg" ADD COLUMN "tagline" varchar;
  ALTER TABLE "rec_stays_pg" ADD COLUMN "lede" varchar;
  ALTER TABLE "rec_stays_pg" ADD COLUMN "hero_image_id" integer;
  ALTER TABLE "rec_stays_pg" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "rec_stays_pg" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "contact_page" ADD COLUMN "chapter_title_a" varchar;
  ALTER TABLE "contact_page" ADD COLUMN "chapter_title_b" varchar;
  ALTER TABLE "contact_page" ADD COLUMN "tagline" varchar;
  ALTER TABLE "contact_page" ADD COLUMN "lede" varchar;
  ALTER TABLE "contact_page" ADD COLUMN "hero_image_id" integer;
  ALTER TABLE "contact_page" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "contact_page" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "form_defaults" ADD COLUMN "labels_name" varchar DEFAULT 'Your name';
  ALTER TABLE "form_defaults" ADD COLUMN "labels_email" varchar DEFAULT 'Email address';
  ALTER TABLE "form_defaults" ADD COLUMN "labels_phone" varchar DEFAULT 'Phone';
  ALTER TABLE "form_defaults" ADD COLUMN "labels_country" varchar DEFAULT 'Country';
  ALTER TABLE "form_defaults" ADD COLUMN "labels_treatment" varchar DEFAULT 'Treatment of interest';
  ALTER TABLE "form_defaults" ADD COLUMN "labels_message" varchar DEFAULT 'Tell us a little more';
  ALTER TABLE "form_defaults" ADD COLUMN "placeholders_name" varchar;
  ALTER TABLE "form_defaults" ADD COLUMN "placeholders_email" varchar;
  ALTER TABLE "form_defaults" ADD COLUMN "placeholders_phone" varchar;
  ALTER TABLE "form_defaults" ADD COLUMN "placeholders_country" varchar;
  ALTER TABLE "form_defaults" ADD COLUMN "placeholders_treatment" varchar;
  ALTER TABLE "form_defaults" ADD COLUMN "placeholders_message" varchar;
  ALTER TABLE "form_defaults" ADD COLUMN "submit_label" varchar DEFAULT 'Send enquiry';
  ALTER TABLE "form_defaults" ADD COLUMN "success_message" varchar DEFAULT 'Thank you — your concierge will reply within one business day.';
  ALTER TABLE "form_defaults" ADD COLUMN "error_message" varchar DEFAULT 'Something went wrong. Please email cosmedic@bimcbali.com if it persists.';
  ALTER TABLE "form_defaults" ADD COLUMN "rate_limit_message" varchar DEFAULT 'You submitted a form recently. Please wait a moment before sending another.';
  ALTER TABLE "vid_consult_pg" ADD COLUMN "chapter_title_a" varchar;
  ALTER TABLE "vid_consult_pg" ADD COLUMN "chapter_title_b" varchar;
  ALTER TABLE "vid_consult_pg" ADD COLUMN "tagline" varchar;
  ALTER TABLE "vid_consult_pg" ADD COLUMN "lede" varchar;
  ALTER TABLE "vid_consult_pg" ADD COLUMN "hero_image_id" integer;
  ALTER TABLE "vid_consult_pg" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "vid_consult_pg" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "blog_page" ADD COLUMN "chapter_title_a" varchar;
  ALTER TABLE "blog_page" ADD COLUMN "chapter_title_b" varchar;
  ALTER TABLE "blog_page" ADD COLUMN "tagline" varchar;
  ALTER TABLE "blog_page" ADD COLUMN "lede" varchar;
  ALTER TABLE "blog_page" ADD COLUMN "hero_image_id" integer;
  ALTER TABLE "blog_page" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "blog_page" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "press_page" ADD COLUMN "chapter_title_a" varchar;
  ALTER TABLE "press_page" ADD COLUMN "chapter_title_b" varchar;
  ALTER TABLE "press_page" ADD COLUMN "tagline" varchar;
  ALTER TABLE "press_page" ADD COLUMN "lede" varchar;
  ALTER TABLE "press_page" ADD COLUMN "hero_image_id" integer;
  ALTER TABLE "press_page" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "press_page" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "privacy_page" ADD COLUMN "chapter_title_a" varchar;
  ALTER TABLE "privacy_page" ADD COLUMN "chapter_title_b" varchar;
  ALTER TABLE "privacy_page" ADD COLUMN "tagline" varchar;
  ALTER TABLE "privacy_page" ADD COLUMN "lede" varchar;
  ALTER TABLE "privacy_page" ADD COLUMN "hero_image_id" integer;
  ALTER TABLE "privacy_page" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "privacy_page" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "price_list_items" ADD CONSTRAINT "price_list_items_linked_procedure_id_procedures_id_fk" FOREIGN KEY ("linked_procedure_id") REFERENCES "public"."procedures"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "price_list_items" ADD CONSTRAINT "price_list_items_linked_injectable_product_id_injectable_products_id_fk" FOREIGN KEY ("linked_injectable_product_id") REFERENCES "public"."injectable_products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "price_list_items" ADD CONSTRAINT "price_list_items_linked_machine_treatment_id_machine_treatments_id_fk" FOREIGN KEY ("linked_machine_treatment_id") REFERENCES "public"."machine_treatments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "machine_treatments" ADD CONSTRAINT "machine_treatments_linked_procedure_id_procedures_id_fk" FOREIGN KEY ("linked_procedure_id") REFERENCES "public"."procedures"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pricing_tiers_inclusions" ADD CONSTRAINT "pricing_tiers_inclusions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_tiers"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "price_list_items_slug_idx" ON "price_list_items" USING btree ("slug");
  CREATE INDEX "price_list_items_linked_procedure_idx" ON "price_list_items" USING btree ("linked_procedure_id");
  CREATE INDEX "price_list_items_linked_injectable_product_idx" ON "price_list_items" USING btree ("linked_injectable_product_id");
  CREATE INDEX "price_list_items_linked_machine_treatment_idx" ON "price_list_items" USING btree ("linked_machine_treatment_id");
  CREATE INDEX "price_list_items_updated_at_idx" ON "price_list_items" USING btree ("updated_at");
  CREATE INDEX "price_list_items_created_at_idx" ON "price_list_items" USING btree ("created_at");
  CREATE UNIQUE INDEX "injectable_products_slug_idx" ON "injectable_products" USING btree ("slug");
  CREATE INDEX "injectable_products_updated_at_idx" ON "injectable_products" USING btree ("updated_at");
  CREATE INDEX "injectable_products_created_at_idx" ON "injectable_products" USING btree ("created_at");
  CREATE UNIQUE INDEX "machine_treatments_slug_idx" ON "machine_treatments" USING btree ("slug");
  CREATE INDEX "machine_treatments_linked_procedure_idx" ON "machine_treatments" USING btree ("linked_procedure_id");
  CREATE INDEX "machine_treatments_updated_at_idx" ON "machine_treatments" USING btree ("updated_at");
  CREATE INDEX "machine_treatments_created_at_idx" ON "machine_treatments" USING btree ("created_at");
  CREATE UNIQUE INDEX "hair_removal_areas_slug_idx" ON "hair_removal_areas" USING btree ("slug");
  CREATE INDEX "hair_removal_areas_updated_at_idx" ON "hair_removal_areas" USING btree ("updated_at");
  CREATE INDEX "hair_removal_areas_created_at_idx" ON "hair_removal_areas" USING btree ("created_at");
  CREATE INDEX "pricing_tiers_inclusions_order_idx" ON "pricing_tiers_inclusions" USING btree ("_order");
  CREATE INDEX "pricing_tiers_inclusions_parent_id_idx" ON "pricing_tiers_inclusions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pricing_tiers_slug_idx" ON "pricing_tiers" USING btree ("slug");
  CREATE INDEX "pricing_tiers_updated_at_idx" ON "pricing_tiers" USING btree ("updated_at");
  CREATE INDEX "pricing_tiers_created_at_idx" ON "pricing_tiers" USING btree ("created_at");
  CREATE INDEX "inclusion_items_updated_at_idx" ON "inclusion_items" USING btree ("updated_at");
  CREATE INDEX "inclusion_items_created_at_idx" ON "inclusion_items" USING btree ("created_at");
  CREATE INDEX "exclusion_items_updated_at_idx" ON "exclusion_items" USING btree ("updated_at");
  CREATE INDEX "exclusion_items_created_at_idx" ON "exclusion_items" USING btree ("created_at");
  ALTER TABLE "procedures_rels" ADD CONSTRAINT "procedures_rels_inclusion_items_fk" FOREIGN KEY ("inclusion_items_id") REFERENCES "public"."inclusion_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "procedures_rels" ADD CONSTRAINT "procedures_rels_exclusion_items_fk" FOREIGN KEY ("exclusion_items_id") REFERENCES "public"."exclusion_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_price_list_items_fk" FOREIGN KEY ("price_list_items_id") REFERENCES "public"."price_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_injectable_products_fk" FOREIGN KEY ("injectable_products_id") REFERENCES "public"."injectable_products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_machine_treatments_fk" FOREIGN KEY ("machine_treatments_id") REFERENCES "public"."machine_treatments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_hair_removal_areas_fk" FOREIGN KEY ("hair_removal_areas_id") REFERENCES "public"."hair_removal_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pricing_tiers_fk" FOREIGN KEY ("pricing_tiers_id") REFERENCES "public"."pricing_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_inclusion_items_fk" FOREIGN KEY ("inclusion_items_id") REFERENCES "public"."inclusion_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_exclusion_items_fk" FOREIGN KEY ("exclusion_items_id") REFERENCES "public"."exclusion_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "surgeons_page" ADD CONSTRAINT "surgeons_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "results_page" ADD CONSTRAINT "results_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_page" ADD CONSTRAINT "gallery_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories_page" ADD CONSTRAINT "stories_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pricing_page" ADD CONSTRAINT "pricing_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "journey_page" ADD CONSTRAINT "journey_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "rec_stays_pg" ADD CONSTRAINT "rec_stays_pg_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vid_consult_pg" ADD CONSTRAINT "vid_consult_pg_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_page" ADD CONSTRAINT "blog_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "press_page" ADD CONSTRAINT "press_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "privacy_page" ADD CONSTRAINT "privacy_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "procedures_rels_inclusion_items_id_idx" ON "procedures_rels" USING btree ("inclusion_items_id");
  CREATE INDEX "procedures_rels_exclusion_items_id_idx" ON "procedures_rels" USING btree ("exclusion_items_id");
  CREATE INDEX "payload_locked_documents_rels_price_list_items_id_idx" ON "payload_locked_documents_rels" USING btree ("price_list_items_id");
  CREATE INDEX "payload_locked_documents_rels_injectable_products_id_idx" ON "payload_locked_documents_rels" USING btree ("injectable_products_id");
  CREATE INDEX "payload_locked_documents_rels_machine_treatments_id_idx" ON "payload_locked_documents_rels" USING btree ("machine_treatments_id");
  CREATE INDEX "payload_locked_documents_rels_hair_removal_areas_id_idx" ON "payload_locked_documents_rels" USING btree ("hair_removal_areas_id");
  CREATE INDEX "payload_locked_documents_rels_pricing_tiers_id_idx" ON "payload_locked_documents_rels" USING btree ("pricing_tiers_id");
  CREATE INDEX "payload_locked_documents_rels_inclusion_items_id_idx" ON "payload_locked_documents_rels" USING btree ("inclusion_items_id");
  CREATE INDEX "payload_locked_documents_rels_exclusion_items_id_idx" ON "payload_locked_documents_rels" USING btree ("exclusion_items_id");
  CREATE INDEX "home_page_hero_image_idx" ON "home_page" USING btree ("hero_image_id");
  CREATE INDEX "surgeons_page_hero_image_idx" ON "surgeons_page" USING btree ("hero_image_id");
  CREATE INDEX "results_page_hero_image_idx" ON "results_page" USING btree ("hero_image_id");
  CREATE INDEX "gallery_page_hero_image_idx" ON "gallery_page" USING btree ("hero_image_id");
  CREATE INDEX "stories_page_hero_image_idx" ON "stories_page" USING btree ("hero_image_id");
  CREATE INDEX "pricing_page_hero_image_idx" ON "pricing_page" USING btree ("hero_image_id");
  CREATE INDEX "journey_page_hero_image_idx" ON "journey_page" USING btree ("hero_image_id");
  CREATE INDEX "rec_stays_pg_hero_image_idx" ON "rec_stays_pg" USING btree ("hero_image_id");
  CREATE INDEX "contact_page_hero_image_idx" ON "contact_page" USING btree ("hero_image_id");
  CREATE INDEX "vid_consult_pg_hero_image_idx" ON "vid_consult_pg" USING btree ("hero_image_id");
  CREATE INDEX "blog_page_hero_image_idx" ON "blog_page" USING btree ("hero_image_id");
  CREATE INDEX "press_page_hero_image_idx" ON "press_page" USING btree ("hero_image_id");
  CREATE INDEX "privacy_page_hero_image_idx" ON "privacy_page" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "sub_categories_slug_idx" ON "sub_categories" USING btree ("slug");
  ALTER TABLE "users" DROP COLUMN "role";
  ALTER TABLE "users" DROP COLUMN "avatar_id";
  ALTER TABLE "procedures" DROP COLUMN "catalogue_group";
  ALTER TABLE "procedures" DROP COLUMN "main_category";
  ALTER TABLE "procedures" DROP COLUMN "sub_category";
  ALTER TABLE "procedures" DROP COLUMN "unit";
  ALTER TABLE "procedures" DROP COLUMN "audience_tier";
  ALTER TABLE "procedures" DROP COLUMN "brand";
  ALTER TABLE "procedures" DROP COLUMN "product_line";
  ALTER TABLE "procedures" DROP COLUMN "manufacturer";
  ALTER TABLE "procedures" DROP COLUMN "fda_approved";
  ALTER TABLE "procedures" DROP COLUMN "body_zone";
  ALTER TABLE "before_after_cases" DROP COLUMN "patient_age";
  ALTER TABLE "stories" DROP COLUMN "procedure_label";
  ALTER TABLE "stories" DROP COLUMN "hue";
  ALTER TABLE "journey_steps" DROP COLUMN "number";
  ALTER TABLE "journey_steps" DROP COLUMN "image_id";
  ALTER TABLE "journey_steps" DROP COLUMN "image_hue";
  ALTER TABLE "recovery_stays" DROP COLUMN "bedrooms";
  ALTER TABLE "recovery_stays" DROP COLUMN "pool_type";
  ALTER TABLE "recovery_stays" DROP COLUMN "image_hue";
  ALTER TABLE "recovery_stays" DROP COLUMN "drive_time";
  ALTER TABLE "recovery_stays" DROP COLUMN "nursing_note";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "analytics_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "privacy_sections_id";
  ALTER TABLE "footer_link_columns_items" DROP COLUMN "social";
  ALTER TABLE "footer" DROP COLUMN "newsletter_button_label";
  ALTER TABLE "settings" DROP COLUMN "rate_locked_manually";
  ALTER TABLE "settings" DROP COLUMN "rate_last_fetched_at";
  ALTER TABLE "settings" DROP COLUMN "rate_source";
  ALTER TABLE "settings" DROP COLUMN "clinic_enquiry_email";
  ALTER TABLE "settings" DROP COLUMN "press_email";
  ALTER TABLE "gallery_page" DROP COLUMN "image_hue";
  ALTER TABLE "stories_page" DROP COLUMN "image_hue";
  ALTER TABLE "rec_stays_pg" DROP COLUMN "hero_hero_image_id";
  ALTER TABLE "rec_stays_pg" DROP COLUMN "hero_image_hue";
  ALTER TABLE "rec_stays_pg" DROP COLUMN "portfolio_section_heading_pre";
  ALTER TABLE "rec_stays_pg" DROP COLUMN "inclusions_section_heading_post";
  ALTER TABLE "blog_page" DROP COLUMN "this_issue_eyebrow";
  ALTER TABLE "blog_page" DROP COLUMN "read_the_essay_cta_label";
  ALTER TABLE "blog_page" DROP COLUMN "archive_section_eyebrow";
  ALTER TABLE "blog_page" DROP COLUMN "archive_section_heading_pre";
  ALTER TABLE "blog_page" DROP COLUMN "archive_section_heading_italic";
  ALTER TABLE "blog_page" DROP COLUMN "archive_section_lede";
  ALTER TABLE "blog_page" DROP COLUMN "archive_section_filter_all_label";
  ALTER TABLE "blog_page" DROP COLUMN "archive_section_empty_state_copy";
  ALTER TABLE "press_page" DROP COLUMN "accreditations_section_eyebrow";
  ALTER TABLE "press_page" DROP COLUMN "accreditations_section_heading";
  ALTER TABLE "press_page" DROP COLUMN "accreditations_section_lede";
  ALTER TABLE "press_page" DROP COLUMN "press_section_eyebrow";
  ALTER TABLE "press_page" DROP COLUMN "press_section_heading_pre";
  ALTER TABLE "press_page" DROP COLUMN "press_section_heading_italic";
  ALTER TABLE "press_page" DROP COLUMN "press_section_lede";
  ALTER TABLE "press_page" DROP COLUMN "press_enquiries_cta_label";
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_procedures_catalogue_group";
  DROP TYPE "public"."enum_procedures_audience_tier";
  DROP TYPE "public"."enum_procedures_body_zone";
  DROP TYPE "public"."enum_analytics_topics";
  DROP TYPE "public"."enum_footer_link_columns_items_social";`)
}

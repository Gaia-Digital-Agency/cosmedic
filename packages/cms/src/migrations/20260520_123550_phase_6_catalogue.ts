import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_surgeons_availability_schedule_day" AS ENUM('mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun');
  CREATE TYPE "public"."enum_surgeons_languages_code" AS ENUM('en', 'id', 'ja', 'fr', 'de');
  CREATE TYPE "public"."enum_surgeons_group" AS ENUM('plastic-surgery', 'aesthetic-medicine');
  CREATE TYPE "public"."enum_procedures_pricing_display_year" AS ENUM('2025', '2026');
  CREATE TYPE "public"."enum_price_list_items_sheet" AS ENUM('surgical', 'non-surgical', 'machine', 'injection', 'btl');
  CREATE TYPE "public"."enum_price_list_items_audience_tier" AS ENUM('standard', 'tourist', 'kitas_ktp', 'package');
  CREATE TYPE "public"."enum_injectable_products_category" AS ENUM('filler', 'botulinum-toxin', 'skin-booster', 'collagen-stimulator', 'bio-remodeling', 'hgh', 'thread-lift', 'mesotherapy');
  CREATE TYPE "public"."enum_hair_removal_areas_body_zone" AS ENUM('face', 'upper-body', 'lower-body', 'package', 'other');
  CREATE TYPE "public"."enum_stories_publish_status" AS ENUM('draft', 'published', 'scheduled');
  CREATE TYPE "public"."enum_blog_posts_publish_status" AS ENUM('draft', 'published', 'scheduled');
  CREATE TYPE "public"."enum_journey_steps_category" AS ENUM('consult', 'medical', 'surgical', 'recovery', 'follow-up');
  CREATE TYPE "public"."enum_inclusion_items_scope" AS ENUM('surgical-procedure', 'consultation', 'general');
  CREATE TYPE "public"."enum_exclusion_items_scope" AS ENUM('surgical-procedure', 'consultation', 'general');
  CREATE TYPE "public"."enum_pages_blocks_image_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_procedure_list_layout" AS ENUM('grid', 'list', 'featured');
  CREATE TYPE "public"."enum_pages_blocks_surgeon_list_filter_group" AS ENUM('all', 'plastic-surgery', 'aesthetic-medicine');
  CREATE TYPE "public"."enum_pages_blocks_surgeon_list_layout" AS ENUM('strip', 'grid');
  CREATE TYPE "public"."enum_pages_blocks_journey_step_list_filter_category" AS ENUM('all', 'consult', 'medical', 'surgical', 'recovery', 'follow-up');
  CREATE TYPE "public"."enum_pages_blocks_notes_kind" AS ENUM('info', 'warning', 'tip', 'disclaimer');
  CREATE TYPE "public"."enum_pages_publish_status" AS ENUM('draft', 'published', 'scheduled');
  CREATE TYPE "public"."enum_enquiries_status" AS ENUM('new', 'contacted', 'scheduled', 'converted', 'closed', 'spam');
  CREATE TYPE "public"."enum_settings_social_links_platform" AS ENUM('instagram', 'facebook', 'whatsapp', 'tiktok', 'youtube', 'linkedin', 'x');
  CREATE TYPE "public"."enum_settings_default_locale" AS ENUM('en', 'id');
  CREATE TYPE "public"."enum_settings_currency_display_mode" AS ENUM('idr-only', 'idr-with-aud');
  CREATE TYPE "public"."enum_floating_chrome_chat_provider" AS ENUM('whatsapp', 'custom');
  CREATE TYPE "public"."enum_consultation_policy_display_on" AS ENUM('contact', 'procedure-detail', 'pricing', 'hero');
  CREATE TYPE "public"."enum_email_templates_templates_locale" AS ENUM('en', 'id');
  CREATE TABLE "surgeons_spec_areas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "surgeons_availability_schedule" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"day" "enum_surgeons_availability_schedule_day" NOT NULL,
  	"window_start" varchar,
  	"window_end" varchar,
  	"by_appointment" boolean DEFAULT true
  );
  
  CREATE TABLE "surgeons_languages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" "enum_surgeons_languages_code"
  );
  
  CREATE TABLE "surgeons" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"common_name" varchar,
  	"title" varchar DEFAULT 'dr.',
  	"suffix" varchar,
  	"spec" varchar,
  	"train" varchar,
  	"proc" varchar,
  	"cred_line" varchar,
  	"years_in_practice" numeric,
  	"hue" numeric DEFAULT 0,
  	"group" "enum_surgeons_group" DEFAULT 'plastic-surgery' NOT NULL,
  	"lead" boolean DEFAULT false,
  	"bio" jsonb,
  	"portrait_id" integer,
  	"portrait_position" varchar DEFAULT 'center 30%',
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_noindex" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "surgeons_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"procedures_id" integer
  );
  
  CREATE TABLE "disciplines_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar NOT NULL,
  	"a" varchar NOT NULL
  );
  
  CREATE TABLE "disciplines" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"display_count" varchar,
  	"hue" numeric DEFAULT 0,
  	"body" jsonb,
  	"chapter_title_a" varchar,
  	"chapter_title_b" varchar,
  	"tagline" varchar,
  	"lede" varchar,
  	"overview" jsonb,
  	"hero_image_id" integer,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_noindex" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "disciplines_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"surgeons_id" integer
  );
  
  CREATE TABLE "sub_categories_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"t" varchar NOT NULL,
  	"body" jsonb NOT NULL
  );
  
  CREATE TABLE "sub_categories_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar NOT NULL,
  	"a" varchar NOT NULL
  );
  
  CREATE TABLE "sub_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"parent_id" integer NOT NULL,
  	"title" varchar NOT NULL,
  	"chapter_title_a" varchar,
  	"chapter_title_b" varchar,
  	"tagline" varchar,
  	"lede" varchar,
  	"intro" jsonb,
  	"overview" jsonb,
  	"lead_surgeon_id" integer,
  	"hero_image_id" integer,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_noindex" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "procedures_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"t" varchar NOT NULL,
  	"body" jsonb NOT NULL
  );
  
  CREATE TABLE "procedures_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar NOT NULL,
  	"a" varchar NOT NULL
  );
  
  CREATE TABLE "procedures_detail_included" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "procedures" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"short_name" varchar,
  	"parent_discipline_id" integer NOT NULL,
  	"parent_sub_category_id" integer,
  	"description" jsonb,
  	"hero_image_id" integer,
  	"pricing_price_idr2025" numeric,
  	"pricing_price_aud2025" numeric,
  	"pricing_price_idr2026" numeric,
  	"pricing_price_aud2026" numeric,
  	"pricing_price_idr_range_low" numeric,
  	"pricing_price_idr_range_high" numeric,
  	"pricing_price_notes" varchar,
  	"pricing_display_year" "enum_procedures_pricing_display_year" DEFAULT '2026',
  	"featured_rank" numeric,
  	"includes_implant" boolean DEFAULT false,
  	"detail_duration" varchar,
  	"detail_recovery" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_noindex" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "procedures_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"surgeons_id" integer,
  	"inclusion_items_id" integer,
  	"exclusion_items_id" integer,
  	"journey_steps_id" integer,
  	"before_after_cases_id" integer,
  	"procedures_id" integer
  );
  
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
  
  CREATE TABLE "before_after_cases_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "before_after_cases" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"case_label" varchar NOT NULL,
  	"procedure_id" integer,
  	"composite_id" integer,
  	"before_alt" varchar,
  	"after_alt" varchar,
  	"surgeon_id" integer,
  	"description" jsonb,
  	"year" numeric,
  	"is_featured" boolean DEFAULT false,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_noindex" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "stories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"patient_label" varchar NOT NULL,
  	"country" varchar,
  	"procedure_id" integer,
  	"portrait_id" integer,
  	"quote" varchar,
  	"body" jsonb,
  	"video_url" varchar,
  	"year" numeric,
  	"surgeon_id" integer,
  	"is_featured" boolean DEFAULT false,
  	"publish_status" "enum_stories_publish_status" DEFAULT 'published' NOT NULL,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_noindex" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "press_mentions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"publication" varchar NOT NULL,
  	"logo_id" integer,
  	"headline" varchar,
  	"url" varchar,
  	"published_date" timestamp(3) with time zone,
  	"summary" varchar,
  	"is_featured" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "awards" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"year" numeric,
  	"issuer" varchar,
  	"logo_id" integer,
  	"summary" varchar,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "recovery_stays_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "recovery_stays_amenities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "recovery_stays" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"location" varchar,
  	"hero_image_id" integer,
  	"descriptor" jsonb,
  	"price_from_aud_per_night" numeric,
  	"price_from_idr_per_night" numeric,
  	"partner_url" varchar,
  	"geo_lat" numeric,
  	"geo_lng" numeric,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_noindex" boolean DEFAULT false,
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
  
  CREATE TABLE "blog_posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"lede" varchar,
  	"body" jsonb,
  	"hero_image_id" integer,
  	"author_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"reading_time_minutes" numeric,
  	"publish_status" "enum_blog_posts_publish_status" DEFAULT 'published' NOT NULL,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_noindex" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "blog_posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"blog_tags_id" integer
  );
  
  CREATE TABLE "blog_tags" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "authors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar,
  	"bio" jsonb,
  	"portrait_id" integer,
  	"surgeon_profile_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "journey_steps" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"day_label" varchar,
  	"title" varchar NOT NULL,
  	"body" jsonb,
  	"icon_id" integer,
  	"category" "enum_journey_steps_category" DEFAULT 'consult',
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
  
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar
  );
  
  CREATE TABLE "pages_blocks_image_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"columns" "enum_pages_blocks_image_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"lede" varchar,
  	"primary_label" varchar,
  	"primary_href" varchar,
  	"secondary_label" varchar,
  	"secondary_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"source_note" varchar
  );
  
  CREATE TABLE "pages_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar NOT NULL,
  	"a" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_procedure_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_discipline_id" integer,
  	"filter_sub_category_id" integer,
  	"layout" "enum_pages_blocks_procedure_list_layout" DEFAULT 'grid',
  	"limit" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_surgeon_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_group" "enum_pages_blocks_surgeon_list_filter_group",
  	"layout" "enum_pages_blocks_surgeon_list_layout" DEFAULT 'strip',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_ba_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_procedure_id" integer,
  	"limit" numeric DEFAULT 6,
  	"featured_only" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonial_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"count" numeric DEFAULT 3,
  	"featured_only" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_recovery_stay_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"limit" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_press_mention_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"limit" numeric DEFAULT 8,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"lede" varchar,
  	"source_cta" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_journey_step_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_category" "enum_pages_blocks_journey_step_list_filter_category",
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_external_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"iframe_url" varchar,
  	"html" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_pages_blocks_notes_kind" DEFAULT 'info',
  	"heading" varchar,
  	"body" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"route" varchar NOT NULL,
  	"chapter_title_a" varchar,
  	"chapter_title_b" varchar,
  	"tagline" varchar,
  	"lede" varchar,
  	"hero_image_id" integer,
  	"publish_status" "enum_pages_publish_status" DEFAULT 'published' NOT NULL,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_noindex" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "enquiries_internal_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"at" timestamp(3) with time zone,
  	"by_id" integer,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "enquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"country" varchar,
  	"treatment_interest_id" integer,
  	"treatment_interest_text" varchar,
  	"preferred_date" timestamp(3) with time zone,
  	"message" varchar,
  	"source_page" varchar,
  	"source_cta" varchar,
  	"status" "enum_enquiries_status" DEFAULT 'new',
  	"assigned_to_id" integer,
  	"submitted_at" timestamp(3) with time zone,
  	"ip" varchar,
  	"user_agent" varchar,
  	"honeypot" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "settings_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_settings_social_links_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'BIMC CosMedic',
  	"site_tagline" varchar,
  	"default_og_image_id" integer,
  	"default_meta_description" varchar,
  	"aud_to_idr_rate" numeric DEFAULT 10500,
  	"round_idr_to" numeric DEFAULT 50000,
  	"contact_email" varchar DEFAULT 'cosmedic@bimcbali.com',
  	"contact_phone" varchar,
  	"whatsapp_number" varchar DEFAULT '+62-XXX-XXXX-XXXX',
  	"address_line1" varchar DEFAULT 'Kawasan BTDC Blok D',
  	"address_line2" varchar DEFAULT 'Nusa Dua',
  	"city" varchar DEFAULT 'Bali',
  	"postal_code" varchar DEFAULT '80363',
  	"country" varchar DEFAULT 'Indonesia',
  	"hours_mon_fri" varchar DEFAULT 'Mon–Fri · 09:00–17:00',
  	"hours_sat_sun" varchar DEFAULT 'Sat · By appointment',
  	"google_maps_url" varchar,
  	"default_locale" "enum_settings_default_locale" DEFAULT 'en',
  	"currency_display_mode" "enum_settings_currency_display_mode" DEFAULT 'idr-with-aud',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_nav_items_mega_menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "header_nav_items_mega_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"active_pattern" varchar
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_light_id" integer,
  	"logo_dark_id" integer,
  	"locale_switcher_enabled" boolean DEFAULT true,
  	"locale_switcher_label_en" varchar DEFAULT 'EN',
  	"locale_switcher_label_id" varchar DEFAULT 'ID',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_link_columns_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "footer_link_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_light_id" integer,
  	"enquiry_summary" jsonb,
  	"address_block" jsonb,
  	"copyright_template" varchar DEFAULT '© {year} BIMC CosMedic. All rights reserved.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "floating_chrome" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_pill_label" varchar DEFAULT 'Plan your treatment',
  	"cta_pill_href" varchar DEFAULT '/contact',
  	"cta_pill_enabled" boolean DEFAULT true,
  	"chat_enabled" boolean DEFAULT true,
  	"chat_provider" "enum_floating_chrome_chat_provider" DEFAULT 'whatsapp',
  	"chat_embed_script" varchar,
  	"chat_open_on_load" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "brand_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"source_note" varchar
  );
  
  CREATE TABLE "brand_stats" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "endorsement_mark" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"endorsement_line" varchar DEFAULT 'Managed by BIMC Hospital · Nusa Dua · Bali',
  	"primary_lockup_id" integer,
  	"inverse_lockup_id" integer,
  	"clearspace_unit" varchar DEFAULT '1X (height of medical cross)',
  	"min_screen_width_px" numeric DEFAULT 96,
  	"min_print_mm_width" numeric DEFAULT 24,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "consultation_policy_display_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_consultation_policy_display_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "consultation_policy" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"fee_idr" numeric DEFAULT 150000,
  	"fee_aud" numeric,
  	"waiver_condition_text" varchar DEFAULT 'Consultation fee is waived if treatment is performed the same day.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "form_defaults" (
  	"id" serial PRIMARY KEY NOT NULL,
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
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "email_templates_templates" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subject" varchar NOT NULL,
  	"body_mjml" varchar NOT NULL,
  	"locale" "enum_email_templates_templates_locale" DEFAULT 'en'
  );
  
  CREATE TABLE "email_templates" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "seo_defaults" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title_pattern" varchar DEFAULT '{page} — BIMC CosMedic',
  	"robots_txt" varchar DEFAULT 'User-agent: *
  Allow: /
  Disallow: /admin
  Disallow: /api/
  Disallow: /preview
  Sitemap: https://cosmedic.gaiada.online/sitemap.xml',
  	"sitemap_base_url" varchar DEFAULT 'https://cosmedic.gaiada.online',
  	"organization_schema" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "surgeons_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "disciplines_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "sub_categories_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "procedures_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "price_list_items_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "injectable_products_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "machine_treatments_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "hair_removal_areas_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "before_after_cases_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "stories_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "press_mentions_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "awards_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "recovery_stays_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pricing_tiers_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "blog_posts_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "blog_tags_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "authors_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "journey_steps_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "inclusion_items_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "exclusion_items_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "enquiries_id" integer;
  ALTER TABLE "surgeons_spec_areas" ADD CONSTRAINT "surgeons_spec_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."surgeons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "surgeons_availability_schedule" ADD CONSTRAINT "surgeons_availability_schedule_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."surgeons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "surgeons_languages" ADD CONSTRAINT "surgeons_languages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."surgeons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "surgeons" ADD CONSTRAINT "surgeons_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "surgeons" ADD CONSTRAINT "surgeons_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "surgeons_rels" ADD CONSTRAINT "surgeons_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."surgeons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "surgeons_rels" ADD CONSTRAINT "surgeons_rels_procedures_fk" FOREIGN KEY ("procedures_id") REFERENCES "public"."procedures"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "disciplines_faqs" ADD CONSTRAINT "disciplines_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."disciplines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "disciplines" ADD CONSTRAINT "disciplines_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "disciplines" ADD CONSTRAINT "disciplines_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "disciplines_rels" ADD CONSTRAINT "disciplines_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."disciplines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "disciplines_rels" ADD CONSTRAINT "disciplines_rels_surgeons_fk" FOREIGN KEY ("surgeons_id") REFERENCES "public"."surgeons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sub_categories_sections" ADD CONSTRAINT "sub_categories_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sub_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sub_categories_faqs" ADD CONSTRAINT "sub_categories_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sub_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sub_categories" ADD CONSTRAINT "sub_categories_parent_id_disciplines_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."disciplines"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sub_categories" ADD CONSTRAINT "sub_categories_lead_surgeon_id_surgeons_id_fk" FOREIGN KEY ("lead_surgeon_id") REFERENCES "public"."surgeons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sub_categories" ADD CONSTRAINT "sub_categories_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sub_categories" ADD CONSTRAINT "sub_categories_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "procedures_sections" ADD CONSTRAINT "procedures_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."procedures"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "procedures_faqs" ADD CONSTRAINT "procedures_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."procedures"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "procedures_detail_included" ADD CONSTRAINT "procedures_detail_included_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."procedures"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "procedures" ADD CONSTRAINT "procedures_parent_discipline_id_disciplines_id_fk" FOREIGN KEY ("parent_discipline_id") REFERENCES "public"."disciplines"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "procedures" ADD CONSTRAINT "procedures_parent_sub_category_id_sub_categories_id_fk" FOREIGN KEY ("parent_sub_category_id") REFERENCES "public"."sub_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "procedures" ADD CONSTRAINT "procedures_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "procedures" ADD CONSTRAINT "procedures_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "procedures_rels" ADD CONSTRAINT "procedures_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."procedures"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "procedures_rels" ADD CONSTRAINT "procedures_rels_surgeons_fk" FOREIGN KEY ("surgeons_id") REFERENCES "public"."surgeons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "procedures_rels" ADD CONSTRAINT "procedures_rels_inclusion_items_fk" FOREIGN KEY ("inclusion_items_id") REFERENCES "public"."inclusion_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "procedures_rels" ADD CONSTRAINT "procedures_rels_exclusion_items_fk" FOREIGN KEY ("exclusion_items_id") REFERENCES "public"."exclusion_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "procedures_rels" ADD CONSTRAINT "procedures_rels_journey_steps_fk" FOREIGN KEY ("journey_steps_id") REFERENCES "public"."journey_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "procedures_rels" ADD CONSTRAINT "procedures_rels_before_after_cases_fk" FOREIGN KEY ("before_after_cases_id") REFERENCES "public"."before_after_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "procedures_rels" ADD CONSTRAINT "procedures_rels_procedures_fk" FOREIGN KEY ("procedures_id") REFERENCES "public"."procedures"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "price_list_items" ADD CONSTRAINT "price_list_items_linked_procedure_id_procedures_id_fk" FOREIGN KEY ("linked_procedure_id") REFERENCES "public"."procedures"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "price_list_items" ADD CONSTRAINT "price_list_items_linked_injectable_product_id_injectable_products_id_fk" FOREIGN KEY ("linked_injectable_product_id") REFERENCES "public"."injectable_products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "price_list_items" ADD CONSTRAINT "price_list_items_linked_machine_treatment_id_machine_treatments_id_fk" FOREIGN KEY ("linked_machine_treatment_id") REFERENCES "public"."machine_treatments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "machine_treatments" ADD CONSTRAINT "machine_treatments_linked_procedure_id_procedures_id_fk" FOREIGN KEY ("linked_procedure_id") REFERENCES "public"."procedures"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "before_after_cases_tags" ADD CONSTRAINT "before_after_cases_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."before_after_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "before_after_cases" ADD CONSTRAINT "before_after_cases_procedure_id_procedures_id_fk" FOREIGN KEY ("procedure_id") REFERENCES "public"."procedures"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "before_after_cases" ADD CONSTRAINT "before_after_cases_composite_id_media_id_fk" FOREIGN KEY ("composite_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "before_after_cases" ADD CONSTRAINT "before_after_cases_surgeon_id_surgeons_id_fk" FOREIGN KEY ("surgeon_id") REFERENCES "public"."surgeons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "before_after_cases" ADD CONSTRAINT "before_after_cases_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories" ADD CONSTRAINT "stories_procedure_id_procedures_id_fk" FOREIGN KEY ("procedure_id") REFERENCES "public"."procedures"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories" ADD CONSTRAINT "stories_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories" ADD CONSTRAINT "stories_surgeon_id_surgeons_id_fk" FOREIGN KEY ("surgeon_id") REFERENCES "public"."surgeons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories" ADD CONSTRAINT "stories_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "press_mentions" ADD CONSTRAINT "press_mentions_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "awards" ADD CONSTRAINT "awards_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "recovery_stays_gallery" ADD CONSTRAINT "recovery_stays_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "recovery_stays_gallery" ADD CONSTRAINT "recovery_stays_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recovery_stays"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "recovery_stays_amenities" ADD CONSTRAINT "recovery_stays_amenities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recovery_stays"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "recovery_stays" ADD CONSTRAINT "recovery_stays_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "recovery_stays" ADD CONSTRAINT "recovery_stays_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pricing_tiers_inclusions" ADD CONSTRAINT "pricing_tiers_inclusions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_posts_rels" ADD CONSTRAINT "blog_posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_posts_rels" ADD CONSTRAINT "blog_posts_rels_blog_tags_fk" FOREIGN KEY ("blog_tags_id") REFERENCES "public"."blog_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "authors" ADD CONSTRAINT "authors_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "authors" ADD CONSTRAINT "authors_surgeon_profile_id_surgeons_id_fk" FOREIGN KEY ("surgeon_profile_id") REFERENCES "public"."surgeons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "journey_steps" ADD CONSTRAINT "journey_steps_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_grid_images" ADD CONSTRAINT "pages_blocks_image_grid_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_grid_images" ADD CONSTRAINT "pages_blocks_image_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_grid" ADD CONSTRAINT "pages_blocks_image_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_band" ADD CONSTRAINT "pages_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_items" ADD CONSTRAINT "pages_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_accordion_items" ADD CONSTRAINT "pages_blocks_faq_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_accordion" ADD CONSTRAINT "pages_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_procedure_list" ADD CONSTRAINT "pages_blocks_procedure_list_filter_discipline_id_disciplines_id_fk" FOREIGN KEY ("filter_discipline_id") REFERENCES "public"."disciplines"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_procedure_list" ADD CONSTRAINT "pages_blocks_procedure_list_filter_sub_category_id_sub_categories_id_fk" FOREIGN KEY ("filter_sub_category_id") REFERENCES "public"."sub_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_procedure_list" ADD CONSTRAINT "pages_blocks_procedure_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_surgeon_list" ADD CONSTRAINT "pages_blocks_surgeon_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ba_grid" ADD CONSTRAINT "pages_blocks_ba_grid_filter_procedure_id_procedures_id_fk" FOREIGN KEY ("filter_procedure_id") REFERENCES "public"."procedures"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_ba_grid" ADD CONSTRAINT "pages_blocks_ba_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonial_list" ADD CONSTRAINT "pages_blocks_testimonial_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_recovery_stay_list" ADD CONSTRAINT "pages_blocks_recovery_stay_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_press_mention_list" ADD CONSTRAINT "pages_blocks_press_mention_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form" ADD CONSTRAINT "pages_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_journey_step_list" ADD CONSTRAINT "pages_blocks_journey_step_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_external_embed" ADD CONSTRAINT "pages_blocks_external_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_notes" ADD CONSTRAINT "pages_blocks_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "enquiries_internal_notes" ADD CONSTRAINT "enquiries_internal_notes_by_id_users_id_fk" FOREIGN KEY ("by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "enquiries_internal_notes" ADD CONSTRAINT "enquiries_internal_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."enquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "enquiries" ADD CONSTRAINT "enquiries_treatment_interest_id_procedures_id_fk" FOREIGN KEY ("treatment_interest_id") REFERENCES "public"."procedures"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "enquiries" ADD CONSTRAINT "enquiries_assigned_to_id_users_id_fk" FOREIGN KEY ("assigned_to_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "settings_social_links" ADD CONSTRAINT "settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings" ADD CONSTRAINT "settings_default_og_image_id_media_id_fk" FOREIGN KEY ("default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_nav_items_mega_menu_items" ADD CONSTRAINT "header_nav_items_mega_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items_mega_menu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_mega_menu" ADD CONSTRAINT "header_nav_items_mega_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_light_id_media_id_fk" FOREIGN KEY ("logo_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_dark_id_media_id_fk" FOREIGN KEY ("logo_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_link_columns_items" ADD CONSTRAINT "footer_link_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_link_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_link_columns" ADD CONSTRAINT "footer_link_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_light_id_media_id_fk" FOREIGN KEY ("logo_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "brand_stats_stats" ADD CONSTRAINT "brand_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."brand_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "endorsement_mark" ADD CONSTRAINT "endorsement_mark_primary_lockup_id_media_id_fk" FOREIGN KEY ("primary_lockup_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "endorsement_mark" ADD CONSTRAINT "endorsement_mark_inverse_lockup_id_media_id_fk" FOREIGN KEY ("inverse_lockup_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "consultation_policy_display_on" ADD CONSTRAINT "consultation_policy_display_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."consultation_policy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "email_templates_templates" ADD CONSTRAINT "email_templates_templates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."email_templates"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "surgeons_spec_areas_order_idx" ON "surgeons_spec_areas" USING btree ("_order");
  CREATE INDEX "surgeons_spec_areas_parent_id_idx" ON "surgeons_spec_areas" USING btree ("_parent_id");
  CREATE INDEX "surgeons_availability_schedule_order_idx" ON "surgeons_availability_schedule" USING btree ("_order");
  CREATE INDEX "surgeons_availability_schedule_parent_id_idx" ON "surgeons_availability_schedule" USING btree ("_parent_id");
  CREATE INDEX "surgeons_languages_order_idx" ON "surgeons_languages" USING btree ("_order");
  CREATE INDEX "surgeons_languages_parent_id_idx" ON "surgeons_languages" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "surgeons_slug_idx" ON "surgeons" USING btree ("slug");
  CREATE INDEX "surgeons_portrait_idx" ON "surgeons" USING btree ("portrait_id");
  CREATE INDEX "surgeons_seo_seo_og_image_idx" ON "surgeons" USING btree ("seo_og_image_id");
  CREATE INDEX "surgeons_updated_at_idx" ON "surgeons" USING btree ("updated_at");
  CREATE INDEX "surgeons_created_at_idx" ON "surgeons" USING btree ("created_at");
  CREATE INDEX "surgeons_rels_order_idx" ON "surgeons_rels" USING btree ("order");
  CREATE INDEX "surgeons_rels_parent_idx" ON "surgeons_rels" USING btree ("parent_id");
  CREATE INDEX "surgeons_rels_path_idx" ON "surgeons_rels" USING btree ("path");
  CREATE INDEX "surgeons_rels_procedures_id_idx" ON "surgeons_rels" USING btree ("procedures_id");
  CREATE INDEX "disciplines_faqs_order_idx" ON "disciplines_faqs" USING btree ("_order");
  CREATE INDEX "disciplines_faqs_parent_id_idx" ON "disciplines_faqs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "disciplines_slug_idx" ON "disciplines" USING btree ("slug");
  CREATE INDEX "disciplines_hero_image_idx" ON "disciplines" USING btree ("hero_image_id");
  CREATE INDEX "disciplines_seo_seo_og_image_idx" ON "disciplines" USING btree ("seo_og_image_id");
  CREATE INDEX "disciplines_updated_at_idx" ON "disciplines" USING btree ("updated_at");
  CREATE INDEX "disciplines_created_at_idx" ON "disciplines" USING btree ("created_at");
  CREATE INDEX "disciplines_rels_order_idx" ON "disciplines_rels" USING btree ("order");
  CREATE INDEX "disciplines_rels_parent_idx" ON "disciplines_rels" USING btree ("parent_id");
  CREATE INDEX "disciplines_rels_path_idx" ON "disciplines_rels" USING btree ("path");
  CREATE INDEX "disciplines_rels_surgeons_id_idx" ON "disciplines_rels" USING btree ("surgeons_id");
  CREATE INDEX "sub_categories_sections_order_idx" ON "sub_categories_sections" USING btree ("_order");
  CREATE INDEX "sub_categories_sections_parent_id_idx" ON "sub_categories_sections" USING btree ("_parent_id");
  CREATE INDEX "sub_categories_faqs_order_idx" ON "sub_categories_faqs" USING btree ("_order");
  CREATE INDEX "sub_categories_faqs_parent_id_idx" ON "sub_categories_faqs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "sub_categories_slug_idx" ON "sub_categories" USING btree ("slug");
  CREATE INDEX "sub_categories_parent_idx" ON "sub_categories" USING btree ("parent_id");
  CREATE INDEX "sub_categories_lead_surgeon_idx" ON "sub_categories" USING btree ("lead_surgeon_id");
  CREATE INDEX "sub_categories_hero_image_idx" ON "sub_categories" USING btree ("hero_image_id");
  CREATE INDEX "sub_categories_seo_seo_og_image_idx" ON "sub_categories" USING btree ("seo_og_image_id");
  CREATE INDEX "sub_categories_updated_at_idx" ON "sub_categories" USING btree ("updated_at");
  CREATE INDEX "sub_categories_created_at_idx" ON "sub_categories" USING btree ("created_at");
  CREATE INDEX "procedures_sections_order_idx" ON "procedures_sections" USING btree ("_order");
  CREATE INDEX "procedures_sections_parent_id_idx" ON "procedures_sections" USING btree ("_parent_id");
  CREATE INDEX "procedures_faqs_order_idx" ON "procedures_faqs" USING btree ("_order");
  CREATE INDEX "procedures_faqs_parent_id_idx" ON "procedures_faqs" USING btree ("_parent_id");
  CREATE INDEX "procedures_detail_included_order_idx" ON "procedures_detail_included" USING btree ("_order");
  CREATE INDEX "procedures_detail_included_parent_id_idx" ON "procedures_detail_included" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "procedures_slug_idx" ON "procedures" USING btree ("slug");
  CREATE INDEX "procedures_parent_discipline_idx" ON "procedures" USING btree ("parent_discipline_id");
  CREATE INDEX "procedures_parent_sub_category_idx" ON "procedures" USING btree ("parent_sub_category_id");
  CREATE INDEX "procedures_hero_image_idx" ON "procedures" USING btree ("hero_image_id");
  CREATE INDEX "procedures_seo_seo_og_image_idx" ON "procedures" USING btree ("seo_og_image_id");
  CREATE INDEX "procedures_updated_at_idx" ON "procedures" USING btree ("updated_at");
  CREATE INDEX "procedures_created_at_idx" ON "procedures" USING btree ("created_at");
  CREATE INDEX "procedures_rels_order_idx" ON "procedures_rels" USING btree ("order");
  CREATE INDEX "procedures_rels_parent_idx" ON "procedures_rels" USING btree ("parent_id");
  CREATE INDEX "procedures_rels_path_idx" ON "procedures_rels" USING btree ("path");
  CREATE INDEX "procedures_rels_surgeons_id_idx" ON "procedures_rels" USING btree ("surgeons_id");
  CREATE INDEX "procedures_rels_inclusion_items_id_idx" ON "procedures_rels" USING btree ("inclusion_items_id");
  CREATE INDEX "procedures_rels_exclusion_items_id_idx" ON "procedures_rels" USING btree ("exclusion_items_id");
  CREATE INDEX "procedures_rels_journey_steps_id_idx" ON "procedures_rels" USING btree ("journey_steps_id");
  CREATE INDEX "procedures_rels_before_after_cases_id_idx" ON "procedures_rels" USING btree ("before_after_cases_id");
  CREATE INDEX "procedures_rels_procedures_id_idx" ON "procedures_rels" USING btree ("procedures_id");
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
  CREATE INDEX "before_after_cases_tags_order_idx" ON "before_after_cases_tags" USING btree ("_order");
  CREATE INDEX "before_after_cases_tags_parent_id_idx" ON "before_after_cases_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "before_after_cases_slug_idx" ON "before_after_cases" USING btree ("slug");
  CREATE INDEX "before_after_cases_procedure_idx" ON "before_after_cases" USING btree ("procedure_id");
  CREATE INDEX "before_after_cases_composite_idx" ON "before_after_cases" USING btree ("composite_id");
  CREATE INDEX "before_after_cases_surgeon_idx" ON "before_after_cases" USING btree ("surgeon_id");
  CREATE INDEX "before_after_cases_seo_seo_og_image_idx" ON "before_after_cases" USING btree ("seo_og_image_id");
  CREATE INDEX "before_after_cases_updated_at_idx" ON "before_after_cases" USING btree ("updated_at");
  CREATE INDEX "before_after_cases_created_at_idx" ON "before_after_cases" USING btree ("created_at");
  CREATE UNIQUE INDEX "stories_slug_idx" ON "stories" USING btree ("slug");
  CREATE INDEX "stories_procedure_idx" ON "stories" USING btree ("procedure_id");
  CREATE INDEX "stories_portrait_idx" ON "stories" USING btree ("portrait_id");
  CREATE INDEX "stories_surgeon_idx" ON "stories" USING btree ("surgeon_id");
  CREATE INDEX "stories_seo_seo_og_image_idx" ON "stories" USING btree ("seo_og_image_id");
  CREATE INDEX "stories_updated_at_idx" ON "stories" USING btree ("updated_at");
  CREATE INDEX "stories_created_at_idx" ON "stories" USING btree ("created_at");
  CREATE UNIQUE INDEX "press_mentions_slug_idx" ON "press_mentions" USING btree ("slug");
  CREATE INDEX "press_mentions_logo_idx" ON "press_mentions" USING btree ("logo_id");
  CREATE INDEX "press_mentions_updated_at_idx" ON "press_mentions" USING btree ("updated_at");
  CREATE INDEX "press_mentions_created_at_idx" ON "press_mentions" USING btree ("created_at");
  CREATE UNIQUE INDEX "awards_slug_idx" ON "awards" USING btree ("slug");
  CREATE INDEX "awards_logo_idx" ON "awards" USING btree ("logo_id");
  CREATE INDEX "awards_updated_at_idx" ON "awards" USING btree ("updated_at");
  CREATE INDEX "awards_created_at_idx" ON "awards" USING btree ("created_at");
  CREATE INDEX "recovery_stays_gallery_order_idx" ON "recovery_stays_gallery" USING btree ("_order");
  CREATE INDEX "recovery_stays_gallery_parent_id_idx" ON "recovery_stays_gallery" USING btree ("_parent_id");
  CREATE INDEX "recovery_stays_gallery_image_idx" ON "recovery_stays_gallery" USING btree ("image_id");
  CREATE INDEX "recovery_stays_amenities_order_idx" ON "recovery_stays_amenities" USING btree ("_order");
  CREATE INDEX "recovery_stays_amenities_parent_id_idx" ON "recovery_stays_amenities" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "recovery_stays_slug_idx" ON "recovery_stays" USING btree ("slug");
  CREATE INDEX "recovery_stays_hero_image_idx" ON "recovery_stays" USING btree ("hero_image_id");
  CREATE INDEX "recovery_stays_seo_seo_og_image_idx" ON "recovery_stays" USING btree ("seo_og_image_id");
  CREATE INDEX "recovery_stays_updated_at_idx" ON "recovery_stays" USING btree ("updated_at");
  CREATE INDEX "recovery_stays_created_at_idx" ON "recovery_stays" USING btree ("created_at");
  CREATE INDEX "pricing_tiers_inclusions_order_idx" ON "pricing_tiers_inclusions" USING btree ("_order");
  CREATE INDEX "pricing_tiers_inclusions_parent_id_idx" ON "pricing_tiers_inclusions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pricing_tiers_slug_idx" ON "pricing_tiers" USING btree ("slug");
  CREATE INDEX "pricing_tiers_updated_at_idx" ON "pricing_tiers" USING btree ("updated_at");
  CREATE INDEX "pricing_tiers_created_at_idx" ON "pricing_tiers" USING btree ("created_at");
  CREATE UNIQUE INDEX "blog_posts_slug_idx" ON "blog_posts" USING btree ("slug");
  CREATE INDEX "blog_posts_hero_image_idx" ON "blog_posts" USING btree ("hero_image_id");
  CREATE INDEX "blog_posts_author_idx" ON "blog_posts" USING btree ("author_id");
  CREATE INDEX "blog_posts_seo_seo_og_image_idx" ON "blog_posts" USING btree ("seo_og_image_id");
  CREATE INDEX "blog_posts_updated_at_idx" ON "blog_posts" USING btree ("updated_at");
  CREATE INDEX "blog_posts_created_at_idx" ON "blog_posts" USING btree ("created_at");
  CREATE INDEX "blog_posts_rels_order_idx" ON "blog_posts_rels" USING btree ("order");
  CREATE INDEX "blog_posts_rels_parent_idx" ON "blog_posts_rels" USING btree ("parent_id");
  CREATE INDEX "blog_posts_rels_path_idx" ON "blog_posts_rels" USING btree ("path");
  CREATE INDEX "blog_posts_rels_blog_tags_id_idx" ON "blog_posts_rels" USING btree ("blog_tags_id");
  CREATE UNIQUE INDEX "blog_tags_slug_idx" ON "blog_tags" USING btree ("slug");
  CREATE INDEX "blog_tags_updated_at_idx" ON "blog_tags" USING btree ("updated_at");
  CREATE INDEX "blog_tags_created_at_idx" ON "blog_tags" USING btree ("created_at");
  CREATE UNIQUE INDEX "authors_slug_idx" ON "authors" USING btree ("slug");
  CREATE INDEX "authors_portrait_idx" ON "authors" USING btree ("portrait_id");
  CREATE INDEX "authors_surgeon_profile_idx" ON "authors" USING btree ("surgeon_profile_id");
  CREATE INDEX "authors_updated_at_idx" ON "authors" USING btree ("updated_at");
  CREATE INDEX "authors_created_at_idx" ON "authors" USING btree ("created_at");
  CREATE UNIQUE INDEX "journey_steps_slug_idx" ON "journey_steps" USING btree ("slug");
  CREATE INDEX "journey_steps_icon_idx" ON "journey_steps" USING btree ("icon_id");
  CREATE INDEX "journey_steps_updated_at_idx" ON "journey_steps" USING btree ("updated_at");
  CREATE INDEX "journey_steps_created_at_idx" ON "journey_steps" USING btree ("created_at");
  CREATE INDEX "inclusion_items_updated_at_idx" ON "inclusion_items" USING btree ("updated_at");
  CREATE INDEX "inclusion_items_created_at_idx" ON "inclusion_items" USING btree ("created_at");
  CREATE INDEX "exclusion_items_updated_at_idx" ON "exclusion_items" USING btree ("updated_at");
  CREATE INDEX "exclusion_items_created_at_idx" ON "exclusion_items" USING btree ("created_at");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_grid_images_order_idx" ON "pages_blocks_image_grid_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_grid_images_parent_id_idx" ON "pages_blocks_image_grid_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_grid_images_image_idx" ON "pages_blocks_image_grid_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_image_grid_order_idx" ON "pages_blocks_image_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_grid_parent_id_idx" ON "pages_blocks_image_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_grid_path_idx" ON "pages_blocks_image_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_band_order_idx" ON "pages_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_band_parent_id_idx" ON "pages_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_band_path_idx" ON "pages_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "pages_blocks_stats_items_order_idx" ON "pages_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_items_parent_id_idx" ON "pages_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_accordion_items_order_idx" ON "pages_blocks_faq_accordion_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_accordion_items_parent_id_idx" ON "pages_blocks_faq_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_accordion_order_idx" ON "pages_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_accordion_parent_id_idx" ON "pages_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_accordion_path_idx" ON "pages_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "pages_blocks_procedure_list_order_idx" ON "pages_blocks_procedure_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_procedure_list_parent_id_idx" ON "pages_blocks_procedure_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_procedure_list_path_idx" ON "pages_blocks_procedure_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_procedure_list_filter_discipline_idx" ON "pages_blocks_procedure_list" USING btree ("filter_discipline_id");
  CREATE INDEX "pages_blocks_procedure_list_filter_sub_category_idx" ON "pages_blocks_procedure_list" USING btree ("filter_sub_category_id");
  CREATE INDEX "pages_blocks_surgeon_list_order_idx" ON "pages_blocks_surgeon_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_surgeon_list_parent_id_idx" ON "pages_blocks_surgeon_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_surgeon_list_path_idx" ON "pages_blocks_surgeon_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_ba_grid_order_idx" ON "pages_blocks_ba_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_ba_grid_parent_id_idx" ON "pages_blocks_ba_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ba_grid_path_idx" ON "pages_blocks_ba_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_ba_grid_filter_procedure_idx" ON "pages_blocks_ba_grid" USING btree ("filter_procedure_id");
  CREATE INDEX "pages_blocks_testimonial_list_order_idx" ON "pages_blocks_testimonial_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonial_list_parent_id_idx" ON "pages_blocks_testimonial_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonial_list_path_idx" ON "pages_blocks_testimonial_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_recovery_stay_list_order_idx" ON "pages_blocks_recovery_stay_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_recovery_stay_list_parent_id_idx" ON "pages_blocks_recovery_stay_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_recovery_stay_list_path_idx" ON "pages_blocks_recovery_stay_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_press_mention_list_order_idx" ON "pages_blocks_press_mention_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_press_mention_list_parent_id_idx" ON "pages_blocks_press_mention_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_press_mention_list_path_idx" ON "pages_blocks_press_mention_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_form_order_idx" ON "pages_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_parent_id_idx" ON "pages_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_path_idx" ON "pages_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "pages_blocks_journey_step_list_order_idx" ON "pages_blocks_journey_step_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_journey_step_list_parent_id_idx" ON "pages_blocks_journey_step_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_journey_step_list_path_idx" ON "pages_blocks_journey_step_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_external_embed_order_idx" ON "pages_blocks_external_embed" USING btree ("_order");
  CREATE INDEX "pages_blocks_external_embed_parent_id_idx" ON "pages_blocks_external_embed" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_external_embed_path_idx" ON "pages_blocks_external_embed" USING btree ("_path");
  CREATE INDEX "pages_blocks_notes_order_idx" ON "pages_blocks_notes" USING btree ("_order");
  CREATE INDEX "pages_blocks_notes_parent_id_idx" ON "pages_blocks_notes" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_notes_path_idx" ON "pages_blocks_notes" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE UNIQUE INDEX "pages_route_idx" ON "pages" USING btree ("route");
  CREATE INDEX "pages_hero_image_idx" ON "pages" USING btree ("hero_image_id");
  CREATE INDEX "pages_seo_seo_og_image_idx" ON "pages" USING btree ("seo_og_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "enquiries_internal_notes_order_idx" ON "enquiries_internal_notes" USING btree ("_order");
  CREATE INDEX "enquiries_internal_notes_parent_id_idx" ON "enquiries_internal_notes" USING btree ("_parent_id");
  CREATE INDEX "enquiries_internal_notes_by_idx" ON "enquiries_internal_notes" USING btree ("by_id");
  CREATE INDEX "enquiries_treatment_interest_idx" ON "enquiries" USING btree ("treatment_interest_id");
  CREATE INDEX "enquiries_assigned_to_idx" ON "enquiries" USING btree ("assigned_to_id");
  CREATE INDEX "enquiries_updated_at_idx" ON "enquiries" USING btree ("updated_at");
  CREATE INDEX "enquiries_created_at_idx" ON "enquiries" USING btree ("created_at");
  CREATE INDEX "settings_social_links_order_idx" ON "settings_social_links" USING btree ("_order");
  CREATE INDEX "settings_social_links_parent_id_idx" ON "settings_social_links" USING btree ("_parent_id");
  CREATE INDEX "settings_default_og_image_idx" ON "settings" USING btree ("default_og_image_id");
  CREATE INDEX "header_nav_items_mega_menu_items_order_idx" ON "header_nav_items_mega_menu_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_mega_menu_items_parent_id_idx" ON "header_nav_items_mega_menu_items" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_mega_menu_order_idx" ON "header_nav_items_mega_menu" USING btree ("_order");
  CREATE INDEX "header_nav_items_mega_menu_parent_id_idx" ON "header_nav_items_mega_menu" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "header_logo_light_idx" ON "header" USING btree ("logo_light_id");
  CREATE INDEX "header_logo_dark_idx" ON "header" USING btree ("logo_dark_id");
  CREATE INDEX "footer_link_columns_items_order_idx" ON "footer_link_columns_items" USING btree ("_order");
  CREATE INDEX "footer_link_columns_items_parent_id_idx" ON "footer_link_columns_items" USING btree ("_parent_id");
  CREATE INDEX "footer_link_columns_order_idx" ON "footer_link_columns" USING btree ("_order");
  CREATE INDEX "footer_link_columns_parent_id_idx" ON "footer_link_columns" USING btree ("_parent_id");
  CREATE INDEX "footer_logo_light_idx" ON "footer" USING btree ("logo_light_id");
  CREATE INDEX "brand_stats_stats_order_idx" ON "brand_stats_stats" USING btree ("_order");
  CREATE INDEX "brand_stats_stats_parent_id_idx" ON "brand_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "endorsement_mark_primary_lockup_idx" ON "endorsement_mark" USING btree ("primary_lockup_id");
  CREATE INDEX "endorsement_mark_inverse_lockup_idx" ON "endorsement_mark" USING btree ("inverse_lockup_id");
  CREATE INDEX "consultation_policy_display_on_order_idx" ON "consultation_policy_display_on" USING btree ("order");
  CREATE INDEX "consultation_policy_display_on_parent_idx" ON "consultation_policy_display_on" USING btree ("parent_id");
  CREATE INDEX "email_templates_templates_order_idx" ON "email_templates_templates" USING btree ("_order");
  CREATE INDEX "email_templates_templates_parent_id_idx" ON "email_templates_templates" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_surgeons_fk" FOREIGN KEY ("surgeons_id") REFERENCES "public"."surgeons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_disciplines_fk" FOREIGN KEY ("disciplines_id") REFERENCES "public"."disciplines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sub_categories_fk" FOREIGN KEY ("sub_categories_id") REFERENCES "public"."sub_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_procedures_fk" FOREIGN KEY ("procedures_id") REFERENCES "public"."procedures"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_price_list_items_fk" FOREIGN KEY ("price_list_items_id") REFERENCES "public"."price_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_injectable_products_fk" FOREIGN KEY ("injectable_products_id") REFERENCES "public"."injectable_products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_machine_treatments_fk" FOREIGN KEY ("machine_treatments_id") REFERENCES "public"."machine_treatments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_hair_removal_areas_fk" FOREIGN KEY ("hair_removal_areas_id") REFERENCES "public"."hair_removal_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_before_after_cases_fk" FOREIGN KEY ("before_after_cases_id") REFERENCES "public"."before_after_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_stories_fk" FOREIGN KEY ("stories_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_press_mentions_fk" FOREIGN KEY ("press_mentions_id") REFERENCES "public"."press_mentions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_awards_fk" FOREIGN KEY ("awards_id") REFERENCES "public"."awards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_recovery_stays_fk" FOREIGN KEY ("recovery_stays_id") REFERENCES "public"."recovery_stays"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pricing_tiers_fk" FOREIGN KEY ("pricing_tiers_id") REFERENCES "public"."pricing_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_tags_fk" FOREIGN KEY ("blog_tags_id") REFERENCES "public"."blog_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_journey_steps_fk" FOREIGN KEY ("journey_steps_id") REFERENCES "public"."journey_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_inclusion_items_fk" FOREIGN KEY ("inclusion_items_id") REFERENCES "public"."inclusion_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_exclusion_items_fk" FOREIGN KEY ("exclusion_items_id") REFERENCES "public"."exclusion_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_enquiries_fk" FOREIGN KEY ("enquiries_id") REFERENCES "public"."enquiries"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_surgeons_id_idx" ON "payload_locked_documents_rels" USING btree ("surgeons_id");
  CREATE INDEX "payload_locked_documents_rels_disciplines_id_idx" ON "payload_locked_documents_rels" USING btree ("disciplines_id");
  CREATE INDEX "payload_locked_documents_rels_sub_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("sub_categories_id");
  CREATE INDEX "payload_locked_documents_rels_procedures_id_idx" ON "payload_locked_documents_rels" USING btree ("procedures_id");
  CREATE INDEX "payload_locked_documents_rels_price_list_items_id_idx" ON "payload_locked_documents_rels" USING btree ("price_list_items_id");
  CREATE INDEX "payload_locked_documents_rels_injectable_products_id_idx" ON "payload_locked_documents_rels" USING btree ("injectable_products_id");
  CREATE INDEX "payload_locked_documents_rels_machine_treatments_id_idx" ON "payload_locked_documents_rels" USING btree ("machine_treatments_id");
  CREATE INDEX "payload_locked_documents_rels_hair_removal_areas_id_idx" ON "payload_locked_documents_rels" USING btree ("hair_removal_areas_id");
  CREATE INDEX "payload_locked_documents_rels_before_after_cases_id_idx" ON "payload_locked_documents_rels" USING btree ("before_after_cases_id");
  CREATE INDEX "payload_locked_documents_rels_stories_id_idx" ON "payload_locked_documents_rels" USING btree ("stories_id");
  CREATE INDEX "payload_locked_documents_rels_press_mentions_id_idx" ON "payload_locked_documents_rels" USING btree ("press_mentions_id");
  CREATE INDEX "payload_locked_documents_rels_awards_id_idx" ON "payload_locked_documents_rels" USING btree ("awards_id");
  CREATE INDEX "payload_locked_documents_rels_recovery_stays_id_idx" ON "payload_locked_documents_rels" USING btree ("recovery_stays_id");
  CREATE INDEX "payload_locked_documents_rels_pricing_tiers_id_idx" ON "payload_locked_documents_rels" USING btree ("pricing_tiers_id");
  CREATE INDEX "payload_locked_documents_rels_blog_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_posts_id");
  CREATE INDEX "payload_locked_documents_rels_blog_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_tags_id");
  CREATE INDEX "payload_locked_documents_rels_authors_id_idx" ON "payload_locked_documents_rels" USING btree ("authors_id");
  CREATE INDEX "payload_locked_documents_rels_journey_steps_id_idx" ON "payload_locked_documents_rels" USING btree ("journey_steps_id");
  CREATE INDEX "payload_locked_documents_rels_inclusion_items_id_idx" ON "payload_locked_documents_rels" USING btree ("inclusion_items_id");
  CREATE INDEX "payload_locked_documents_rels_exclusion_items_id_idx" ON "payload_locked_documents_rels" USING btree ("exclusion_items_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_enquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("enquiries_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "surgeons_spec_areas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeons_availability_schedule" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeons_languages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeons_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "disciplines_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "disciplines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "disciplines_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sub_categories_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sub_categories_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sub_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "procedures_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "procedures_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "procedures_detail_included" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "procedures" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "procedures_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "price_list_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "injectable_products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "machine_treatments" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "hair_removal_areas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "before_after_cases_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "before_after_cases" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "stories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "press_mentions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "awards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recovery_stays_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recovery_stays_amenities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recovery_stays" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_tiers_inclusions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_tiers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_posts_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "authors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "journey_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "inclusion_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "exclusion_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_image_grid_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_image_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cta_band" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_accordion_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_accordion" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_procedure_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_surgeon_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_ba_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_testimonial_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_recovery_stay_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_press_mention_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_journey_step_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_external_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_notes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "enquiries_internal_notes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "enquiries" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "settings_social_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "settings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_nav_items_mega_menu_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_nav_items_mega_menu" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_nav_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_link_columns_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_link_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "floating_chrome" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "brand_stats_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "brand_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "endorsement_mark" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "consultation_policy_display_on" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "consultation_policy" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "form_defaults" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "email_templates_templates" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "email_templates" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "seo_defaults" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "surgeons_spec_areas" CASCADE;
  DROP TABLE "surgeons_availability_schedule" CASCADE;
  DROP TABLE "surgeons_languages" CASCADE;
  DROP TABLE "surgeons" CASCADE;
  DROP TABLE "surgeons_rels" CASCADE;
  DROP TABLE "disciplines_faqs" CASCADE;
  DROP TABLE "disciplines" CASCADE;
  DROP TABLE "disciplines_rels" CASCADE;
  DROP TABLE "sub_categories_sections" CASCADE;
  DROP TABLE "sub_categories_faqs" CASCADE;
  DROP TABLE "sub_categories" CASCADE;
  DROP TABLE "procedures_sections" CASCADE;
  DROP TABLE "procedures_faqs" CASCADE;
  DROP TABLE "procedures_detail_included" CASCADE;
  DROP TABLE "procedures" CASCADE;
  DROP TABLE "procedures_rels" CASCADE;
  DROP TABLE "price_list_items" CASCADE;
  DROP TABLE "injectable_products" CASCADE;
  DROP TABLE "machine_treatments" CASCADE;
  DROP TABLE "hair_removal_areas" CASCADE;
  DROP TABLE "before_after_cases_tags" CASCADE;
  DROP TABLE "before_after_cases" CASCADE;
  DROP TABLE "stories" CASCADE;
  DROP TABLE "press_mentions" CASCADE;
  DROP TABLE "awards" CASCADE;
  DROP TABLE "recovery_stays_gallery" CASCADE;
  DROP TABLE "recovery_stays_amenities" CASCADE;
  DROP TABLE "recovery_stays" CASCADE;
  DROP TABLE "pricing_tiers_inclusions" CASCADE;
  DROP TABLE "pricing_tiers" CASCADE;
  DROP TABLE "blog_posts" CASCADE;
  DROP TABLE "blog_posts_rels" CASCADE;
  DROP TABLE "blog_tags" CASCADE;
  DROP TABLE "authors" CASCADE;
  DROP TABLE "journey_steps" CASCADE;
  DROP TABLE "inclusion_items" CASCADE;
  DROP TABLE "exclusion_items" CASCADE;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_image_grid_images" CASCADE;
  DROP TABLE "pages_blocks_image_grid" CASCADE;
  DROP TABLE "pages_blocks_cta_band" CASCADE;
  DROP TABLE "pages_blocks_stats_items" CASCADE;
  DROP TABLE "pages_blocks_stats" CASCADE;
  DROP TABLE "pages_blocks_faq_accordion_items" CASCADE;
  DROP TABLE "pages_blocks_faq_accordion" CASCADE;
  DROP TABLE "pages_blocks_procedure_list" CASCADE;
  DROP TABLE "pages_blocks_surgeon_list" CASCADE;
  DROP TABLE "pages_blocks_ba_grid" CASCADE;
  DROP TABLE "pages_blocks_testimonial_list" CASCADE;
  DROP TABLE "pages_blocks_recovery_stay_list" CASCADE;
  DROP TABLE "pages_blocks_press_mention_list" CASCADE;
  DROP TABLE "pages_blocks_contact_form" CASCADE;
  DROP TABLE "pages_blocks_journey_step_list" CASCADE;
  DROP TABLE "pages_blocks_external_embed" CASCADE;
  DROP TABLE "pages_blocks_notes" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "enquiries_internal_notes" CASCADE;
  DROP TABLE "enquiries" CASCADE;
  DROP TABLE "settings_social_links" CASCADE;
  DROP TABLE "settings" CASCADE;
  DROP TABLE "header_nav_items_mega_menu_items" CASCADE;
  DROP TABLE "header_nav_items_mega_menu" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "footer_link_columns_items" CASCADE;
  DROP TABLE "footer_link_columns" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "floating_chrome" CASCADE;
  DROP TABLE "brand_stats_stats" CASCADE;
  DROP TABLE "brand_stats" CASCADE;
  DROP TABLE "endorsement_mark" CASCADE;
  DROP TABLE "consultation_policy_display_on" CASCADE;
  DROP TABLE "consultation_policy" CASCADE;
  DROP TABLE "form_defaults" CASCADE;
  DROP TABLE "email_templates_templates" CASCADE;
  DROP TABLE "email_templates" CASCADE;
  DROP TABLE "seo_defaults" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_surgeons_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_disciplines_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_sub_categories_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_procedures_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_price_list_items_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_injectable_products_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_machine_treatments_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_hair_removal_areas_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_before_after_cases_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_stories_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_press_mentions_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_awards_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_recovery_stays_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pricing_tiers_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_blog_posts_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_blog_tags_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_authors_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_journey_steps_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_inclusion_items_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_exclusion_items_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pages_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_enquiries_fk";
  
  DROP INDEX "payload_locked_documents_rels_surgeons_id_idx";
  DROP INDEX "payload_locked_documents_rels_disciplines_id_idx";
  DROP INDEX "payload_locked_documents_rels_sub_categories_id_idx";
  DROP INDEX "payload_locked_documents_rels_procedures_id_idx";
  DROP INDEX "payload_locked_documents_rels_price_list_items_id_idx";
  DROP INDEX "payload_locked_documents_rels_injectable_products_id_idx";
  DROP INDEX "payload_locked_documents_rels_machine_treatments_id_idx";
  DROP INDEX "payload_locked_documents_rels_hair_removal_areas_id_idx";
  DROP INDEX "payload_locked_documents_rels_before_after_cases_id_idx";
  DROP INDEX "payload_locked_documents_rels_stories_id_idx";
  DROP INDEX "payload_locked_documents_rels_press_mentions_id_idx";
  DROP INDEX "payload_locked_documents_rels_awards_id_idx";
  DROP INDEX "payload_locked_documents_rels_recovery_stays_id_idx";
  DROP INDEX "payload_locked_documents_rels_pricing_tiers_id_idx";
  DROP INDEX "payload_locked_documents_rels_blog_posts_id_idx";
  DROP INDEX "payload_locked_documents_rels_blog_tags_id_idx";
  DROP INDEX "payload_locked_documents_rels_authors_id_idx";
  DROP INDEX "payload_locked_documents_rels_journey_steps_id_idx";
  DROP INDEX "payload_locked_documents_rels_inclusion_items_id_idx";
  DROP INDEX "payload_locked_documents_rels_exclusion_items_id_idx";
  DROP INDEX "payload_locked_documents_rels_pages_id_idx";
  DROP INDEX "payload_locked_documents_rels_enquiries_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "surgeons_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "disciplines_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "sub_categories_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "procedures_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "price_list_items_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "injectable_products_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "machine_treatments_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "hair_removal_areas_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "before_after_cases_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "stories_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "press_mentions_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "awards_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "recovery_stays_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pricing_tiers_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "blog_posts_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "blog_tags_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "authors_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "journey_steps_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "inclusion_items_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "exclusion_items_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pages_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "enquiries_id";
  DROP TYPE "public"."enum_surgeons_availability_schedule_day";
  DROP TYPE "public"."enum_surgeons_languages_code";
  DROP TYPE "public"."enum_surgeons_group";
  DROP TYPE "public"."enum_procedures_pricing_display_year";
  DROP TYPE "public"."enum_price_list_items_sheet";
  DROP TYPE "public"."enum_price_list_items_audience_tier";
  DROP TYPE "public"."enum_injectable_products_category";
  DROP TYPE "public"."enum_hair_removal_areas_body_zone";
  DROP TYPE "public"."enum_stories_publish_status";
  DROP TYPE "public"."enum_blog_posts_publish_status";
  DROP TYPE "public"."enum_journey_steps_category";
  DROP TYPE "public"."enum_inclusion_items_scope";
  DROP TYPE "public"."enum_exclusion_items_scope";
  DROP TYPE "public"."enum_pages_blocks_image_grid_columns";
  DROP TYPE "public"."enum_pages_blocks_procedure_list_layout";
  DROP TYPE "public"."enum_pages_blocks_surgeon_list_filter_group";
  DROP TYPE "public"."enum_pages_blocks_surgeon_list_layout";
  DROP TYPE "public"."enum_pages_blocks_journey_step_list_filter_category";
  DROP TYPE "public"."enum_pages_blocks_notes_kind";
  DROP TYPE "public"."enum_pages_publish_status";
  DROP TYPE "public"."enum_enquiries_status";
  DROP TYPE "public"."enum_settings_social_links_platform";
  DROP TYPE "public"."enum_settings_default_locale";
  DROP TYPE "public"."enum_settings_currency_display_mode";
  DROP TYPE "public"."enum_floating_chrome_chat_provider";
  DROP TYPE "public"."enum_consultation_policy_display_on";
  DROP TYPE "public"."enum_email_templates_templates_locale";`)
}

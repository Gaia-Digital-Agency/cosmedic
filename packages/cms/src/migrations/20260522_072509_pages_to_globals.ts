import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_media_category" AS ENUM('homepage', 'treatments', 'doctors', 'results', 'pricing', 'journey', 'contact', 'blog', 'uncategorised');
  CREATE TYPE "public"."enum_payload_folders_folder_type" AS ENUM('media');
  CREATE TYPE "public"."enum_home_page_blocks_image_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_home_page_blocks_procedure_list_layout" AS ENUM('grid', 'list', 'featured');
  CREATE TYPE "public"."enum_home_page_blocks_surgeon_list_filter_group" AS ENUM('all', 'plastic-surgery', 'aesthetic-medicine');
  CREATE TYPE "public"."enum_home_page_blocks_surgeon_list_layout" AS ENUM('strip', 'grid');
  CREATE TYPE "public"."enum_home_page_blocks_journey_step_list_filter_category" AS ENUM('all', 'consult', 'medical', 'surgical', 'recovery', 'follow-up');
  CREATE TYPE "public"."enum_home_page_blocks_notes_kind" AS ENUM('info', 'warning', 'tip', 'disclaimer');
  CREATE TYPE "public"."enum_home_page_publish_status" AS ENUM('draft', 'published', 'scheduled');
  CREATE TYPE "public"."enum_press_page_blocks_image_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_press_page_blocks_procedure_list_layout" AS ENUM('grid', 'list', 'featured');
  CREATE TYPE "public"."enum_press_page_blocks_surgeon_list_filter_group" AS ENUM('all', 'plastic-surgery', 'aesthetic-medicine');
  CREATE TYPE "public"."enum_press_page_blocks_surgeon_list_layout" AS ENUM('strip', 'grid');
  CREATE TYPE "public"."enum_press_page_blocks_journey_step_list_filter_category" AS ENUM('all', 'consult', 'medical', 'surgical', 'recovery', 'follow-up');
  CREATE TYPE "public"."enum_press_page_blocks_notes_kind" AS ENUM('info', 'warning', 'tip', 'disclaimer');
  CREATE TYPE "public"."enum_press_page_publish_status" AS ENUM('draft', 'published', 'scheduled');
  CREATE TYPE "public"."enum_privacy_page_blocks_image_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_privacy_page_blocks_procedure_list_layout" AS ENUM('grid', 'list', 'featured');
  CREATE TYPE "public"."enum_privacy_page_blocks_surgeon_list_filter_group" AS ENUM('all', 'plastic-surgery', 'aesthetic-medicine');
  CREATE TYPE "public"."enum_privacy_page_blocks_surgeon_list_layout" AS ENUM('strip', 'grid');
  CREATE TYPE "public"."enum_privacy_page_blocks_journey_step_list_filter_category" AS ENUM('all', 'consult', 'medical', 'surgical', 'recovery', 'follow-up');
  CREATE TYPE "public"."enum_privacy_page_blocks_notes_kind" AS ENUM('info', 'warning', 'tip', 'disclaimer');
  CREATE TYPE "public"."enum_privacy_page_publish_status" AS ENUM('draft', 'published', 'scheduled');
  CREATE TYPE "public"."enum_treatments_page_blocks_image_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_treatments_page_blocks_procedure_list_layout" AS ENUM('grid', 'list', 'featured');
  CREATE TYPE "public"."enum_treatments_page_blocks_surgeon_list_filter_group" AS ENUM('all', 'plastic-surgery', 'aesthetic-medicine');
  CREATE TYPE "public"."enum_treatments_page_blocks_surgeon_list_layout" AS ENUM('strip', 'grid');
  CREATE TYPE "public"."enum_treatments_page_blocks_journey_step_list_filter_category" AS ENUM('all', 'consult', 'medical', 'surgical', 'recovery', 'follow-up');
  CREATE TYPE "public"."enum_treatments_page_blocks_notes_kind" AS ENUM('info', 'warning', 'tip', 'disclaimer');
  CREATE TYPE "public"."enum_treatments_page_publish_status" AS ENUM('draft', 'published', 'scheduled');
  CREATE TYPE "public"."enum_surgeons_page_blocks_image_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_surgeons_page_blocks_procedure_list_layout" AS ENUM('grid', 'list', 'featured');
  CREATE TYPE "public"."enum_surgeons_page_blocks_surgeon_list_filter_group" AS ENUM('all', 'plastic-surgery', 'aesthetic-medicine');
  CREATE TYPE "public"."enum_surgeons_page_blocks_surgeon_list_layout" AS ENUM('strip', 'grid');
  CREATE TYPE "public"."enum_surgeons_page_blocks_journey_step_list_filter_category" AS ENUM('all', 'consult', 'medical', 'surgical', 'recovery', 'follow-up');
  CREATE TYPE "public"."enum_surgeons_page_blocks_notes_kind" AS ENUM('info', 'warning', 'tip', 'disclaimer');
  CREATE TYPE "public"."enum_surgeons_page_publish_status" AS ENUM('draft', 'published', 'scheduled');
  CREATE TYPE "public"."enum_results_page_blocks_image_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_results_page_blocks_procedure_list_layout" AS ENUM('grid', 'list', 'featured');
  CREATE TYPE "public"."enum_results_page_blocks_surgeon_list_filter_group" AS ENUM('all', 'plastic-surgery', 'aesthetic-medicine');
  CREATE TYPE "public"."enum_results_page_blocks_surgeon_list_layout" AS ENUM('strip', 'grid');
  CREATE TYPE "public"."enum_results_page_blocks_journey_step_list_filter_category" AS ENUM('all', 'consult', 'medical', 'surgical', 'recovery', 'follow-up');
  CREATE TYPE "public"."enum_results_page_blocks_notes_kind" AS ENUM('info', 'warning', 'tip', 'disclaimer');
  CREATE TYPE "public"."enum_results_page_publish_status" AS ENUM('draft', 'published', 'scheduled');
  CREATE TYPE "public"."enum_gallery_page_blocks_image_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_gallery_page_blocks_procedure_list_layout" AS ENUM('grid', 'list', 'featured');
  CREATE TYPE "public"."enum_gallery_page_blocks_surgeon_list_filter_group" AS ENUM('all', 'plastic-surgery', 'aesthetic-medicine');
  CREATE TYPE "public"."enum_gallery_page_blocks_surgeon_list_layout" AS ENUM('strip', 'grid');
  CREATE TYPE "public"."enum_gallery_page_blocks_journey_step_list_filter_category" AS ENUM('all', 'consult', 'medical', 'surgical', 'recovery', 'follow-up');
  CREATE TYPE "public"."enum_gallery_page_blocks_notes_kind" AS ENUM('info', 'warning', 'tip', 'disclaimer');
  CREATE TYPE "public"."enum_gallery_page_publish_status" AS ENUM('draft', 'published', 'scheduled');
  CREATE TYPE "public"."enum_pricing_page_blocks_image_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pricing_page_blocks_procedure_list_layout" AS ENUM('grid', 'list', 'featured');
  CREATE TYPE "public"."enum_pricing_page_blocks_surgeon_list_filter_group" AS ENUM('all', 'plastic-surgery', 'aesthetic-medicine');
  CREATE TYPE "public"."enum_pricing_page_blocks_surgeon_list_layout" AS ENUM('strip', 'grid');
  CREATE TYPE "public"."enum_pricing_page_blocks_journey_step_list_filter_category" AS ENUM('all', 'consult', 'medical', 'surgical', 'recovery', 'follow-up');
  CREATE TYPE "public"."enum_pricing_page_blocks_notes_kind" AS ENUM('info', 'warning', 'tip', 'disclaimer');
  CREATE TYPE "public"."enum_pricing_page_publish_status" AS ENUM('draft', 'published', 'scheduled');
  CREATE TYPE "public"."enum_journey_page_blocks_image_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_journey_page_blocks_procedure_list_layout" AS ENUM('grid', 'list', 'featured');
  CREATE TYPE "public"."enum_journey_page_blocks_surgeon_list_filter_group" AS ENUM('all', 'plastic-surgery', 'aesthetic-medicine');
  CREATE TYPE "public"."enum_journey_page_blocks_surgeon_list_layout" AS ENUM('strip', 'grid');
  CREATE TYPE "public"."enum_journey_page_blocks_journey_step_list_filter_category" AS ENUM('all', 'consult', 'medical', 'surgical', 'recovery', 'follow-up');
  CREATE TYPE "public"."enum_journey_page_blocks_notes_kind" AS ENUM('info', 'warning', 'tip', 'disclaimer');
  CREATE TYPE "public"."enum_journey_page_publish_status" AS ENUM('draft', 'published', 'scheduled');
  CREATE TYPE "public"."enum_stories_page_blocks_image_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_stories_page_blocks_procedure_list_layout" AS ENUM('grid', 'list', 'featured');
  CREATE TYPE "public"."enum_stories_page_blocks_surgeon_list_filter_group" AS ENUM('all', 'plastic-surgery', 'aesthetic-medicine');
  CREATE TYPE "public"."enum_stories_page_blocks_surgeon_list_layout" AS ENUM('strip', 'grid');
  CREATE TYPE "public"."enum_stories_page_blocks_journey_step_list_filter_category" AS ENUM('all', 'consult', 'medical', 'surgical', 'recovery', 'follow-up');
  CREATE TYPE "public"."enum_stories_page_blocks_notes_kind" AS ENUM('info', 'warning', 'tip', 'disclaimer');
  CREATE TYPE "public"."enum_stories_page_publish_status" AS ENUM('draft', 'published', 'scheduled');
  CREATE TYPE "public"."enum_rec_stays_pg_blocks_image_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_rec_stays_pg_blocks_procedure_list_layout" AS ENUM('grid', 'list', 'featured');
  CREATE TYPE "public"."enum_rec_stays_pg_blocks_surgeon_list_filter_group" AS ENUM('all', 'plastic-surgery', 'aesthetic-medicine');
  CREATE TYPE "public"."enum_rec_stays_pg_blocks_surgeon_list_layout" AS ENUM('strip', 'grid');
  CREATE TYPE "public"."enum_rec_stays_pg_blocks_journey_step_list_filter_category" AS ENUM('all', 'consult', 'medical', 'surgical', 'recovery', 'follow-up');
  CREATE TYPE "public"."enum_rec_stays_pg_blocks_notes_kind" AS ENUM('info', 'warning', 'tip', 'disclaimer');
  CREATE TYPE "public"."enum_rec_stays_pg_publish_status" AS ENUM('draft', 'published', 'scheduled');
  CREATE TYPE "public"."enum_contact_page_blocks_image_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_contact_page_blocks_procedure_list_layout" AS ENUM('grid', 'list', 'featured');
  CREATE TYPE "public"."enum_contact_page_blocks_surgeon_list_filter_group" AS ENUM('all', 'plastic-surgery', 'aesthetic-medicine');
  CREATE TYPE "public"."enum_contact_page_blocks_surgeon_list_layout" AS ENUM('strip', 'grid');
  CREATE TYPE "public"."enum_contact_page_blocks_journey_step_list_filter_category" AS ENUM('all', 'consult', 'medical', 'surgical', 'recovery', 'follow-up');
  CREATE TYPE "public"."enum_contact_page_blocks_notes_kind" AS ENUM('info', 'warning', 'tip', 'disclaimer');
  CREATE TYPE "public"."enum_contact_page_publish_status" AS ENUM('draft', 'published', 'scheduled');
  CREATE TYPE "public"."enum_vid_consult_pg_blocks_image_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_vid_consult_pg_blocks_procedure_list_layout" AS ENUM('grid', 'list', 'featured');
  CREATE TYPE "public"."enum_vid_consult_pg_blocks_surgeon_list_filter_group" AS ENUM('all', 'plastic-surgery', 'aesthetic-medicine');
  CREATE TYPE "public"."enum_vid_consult_pg_blocks_surgeon_list_layout" AS ENUM('strip', 'grid');
  CREATE TYPE "public"."enum_vid_consult_pg_blocks_journey_step_list_filter_category" AS ENUM('all', 'consult', 'medical', 'surgical', 'recovery', 'follow-up');
  CREATE TYPE "public"."enum_vid_consult_pg_blocks_notes_kind" AS ENUM('info', 'warning', 'tip', 'disclaimer');
  CREATE TYPE "public"."enum_vid_consult_pg_publish_status" AS ENUM('draft', 'published', 'scheduled');
  CREATE TYPE "public"."enum_blog_page_blocks_image_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_blog_page_blocks_procedure_list_layout" AS ENUM('grid', 'list', 'featured');
  CREATE TYPE "public"."enum_blog_page_blocks_surgeon_list_filter_group" AS ENUM('all', 'plastic-surgery', 'aesthetic-medicine');
  CREATE TYPE "public"."enum_blog_page_blocks_surgeon_list_layout" AS ENUM('strip', 'grid');
  CREATE TYPE "public"."enum_blog_page_blocks_journey_step_list_filter_category" AS ENUM('all', 'consult', 'medical', 'surgical', 'recovery', 'follow-up');
  CREATE TYPE "public"."enum_blog_page_blocks_notes_kind" AS ENUM('info', 'warning', 'tip', 'disclaimer');
  CREATE TYPE "public"."enum_blog_page_publish_status" AS ENUM('draft', 'published', 'scheduled');
  CREATE TABLE "payload_folders_folder_type" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_payload_folders_folder_type",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload_folders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"folder_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "home_page_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_image_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar
  );
  
  CREATE TABLE "home_page_blocks_image_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"columns" "enum_home_page_blocks_image_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_cta_band" (
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
  
  CREATE TABLE "home_page_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"source_note" varchar
  );
  
  CREATE TABLE "home_page_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_faq_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar NOT NULL,
  	"a" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_procedure_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_discipline_id" integer,
  	"filter_sub_category_id" integer,
  	"layout" "enum_home_page_blocks_procedure_list_layout" DEFAULT 'grid',
  	"limit" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_surgeon_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_group" "enum_home_page_blocks_surgeon_list_filter_group",
  	"layout" "enum_home_page_blocks_surgeon_list_layout" DEFAULT 'strip',
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_ba_grid" (
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
  
  CREATE TABLE "home_page_blocks_testimonial_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"count" numeric DEFAULT 3,
  	"featured_only" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_recovery_stay_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"limit" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_press_mention_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"limit" numeric DEFAULT 8,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"lede" varchar,
  	"source_cta" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_journey_step_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_category" "enum_home_page_blocks_journey_step_list_filter_category",
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_external_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"iframe_url" varchar,
  	"html" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_home_page_blocks_notes_kind" DEFAULT 'info',
  	"heading" varchar,
  	"body" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"route" varchar NOT NULL,
  	"chapter_title_a" varchar,
  	"chapter_title_b" varchar,
  	"tagline" varchar,
  	"lede" varchar,
  	"hero_image_id" integer,
  	"publish_status" "enum_home_page_publish_status" DEFAULT 'published' NOT NULL,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_noindex" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "press_page_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "press_page_blocks_image_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar
  );
  
  CREATE TABLE "press_page_blocks_image_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"columns" "enum_press_page_blocks_image_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "press_page_blocks_cta_band" (
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
  
  CREATE TABLE "press_page_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"source_note" varchar
  );
  
  CREATE TABLE "press_page_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "press_page_blocks_faq_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar NOT NULL,
  	"a" varchar NOT NULL
  );
  
  CREATE TABLE "press_page_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "press_page_blocks_procedure_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_discipline_id" integer,
  	"filter_sub_category_id" integer,
  	"layout" "enum_press_page_blocks_procedure_list_layout" DEFAULT 'grid',
  	"limit" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE "press_page_blocks_surgeon_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_group" "enum_press_page_blocks_surgeon_list_filter_group",
  	"layout" "enum_press_page_blocks_surgeon_list_layout" DEFAULT 'strip',
  	"block_name" varchar
  );
  
  CREATE TABLE "press_page_blocks_ba_grid" (
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
  
  CREATE TABLE "press_page_blocks_testimonial_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"count" numeric DEFAULT 3,
  	"featured_only" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "press_page_blocks_recovery_stay_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"limit" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE "press_page_blocks_press_mention_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"limit" numeric DEFAULT 8,
  	"block_name" varchar
  );
  
  CREATE TABLE "press_page_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"lede" varchar,
  	"source_cta" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "press_page_blocks_journey_step_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_category" "enum_press_page_blocks_journey_step_list_filter_category",
  	"block_name" varchar
  );
  
  CREATE TABLE "press_page_blocks_external_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"iframe_url" varchar,
  	"html" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "press_page_blocks_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_press_page_blocks_notes_kind" DEFAULT 'info',
  	"heading" varchar,
  	"body" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "press_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"route" varchar NOT NULL,
  	"chapter_title_a" varchar,
  	"chapter_title_b" varchar,
  	"tagline" varchar,
  	"lede" varchar,
  	"hero_image_id" integer,
  	"publish_status" "enum_press_page_publish_status" DEFAULT 'published' NOT NULL,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_noindex" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "privacy_page_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "privacy_page_blocks_image_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar
  );
  
  CREATE TABLE "privacy_page_blocks_image_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"columns" "enum_privacy_page_blocks_image_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "privacy_page_blocks_cta_band" (
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
  
  CREATE TABLE "privacy_page_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"source_note" varchar
  );
  
  CREATE TABLE "privacy_page_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "privacy_page_blocks_faq_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar NOT NULL,
  	"a" varchar NOT NULL
  );
  
  CREATE TABLE "privacy_page_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "privacy_page_blocks_procedure_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_discipline_id" integer,
  	"filter_sub_category_id" integer,
  	"layout" "enum_privacy_page_blocks_procedure_list_layout" DEFAULT 'grid',
  	"limit" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE "privacy_page_blocks_surgeon_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_group" "enum_privacy_page_blocks_surgeon_list_filter_group",
  	"layout" "enum_privacy_page_blocks_surgeon_list_layout" DEFAULT 'strip',
  	"block_name" varchar
  );
  
  CREATE TABLE "privacy_page_blocks_ba_grid" (
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
  
  CREATE TABLE "privacy_page_blocks_testimonial_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"count" numeric DEFAULT 3,
  	"featured_only" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "privacy_page_blocks_recovery_stay_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"limit" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE "privacy_page_blocks_press_mention_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"limit" numeric DEFAULT 8,
  	"block_name" varchar
  );
  
  CREATE TABLE "privacy_page_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"lede" varchar,
  	"source_cta" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "privacy_page_blocks_journey_step_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_category" "enum_privacy_page_blocks_journey_step_list_filter_category",
  	"block_name" varchar
  );
  
  CREATE TABLE "privacy_page_blocks_external_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"iframe_url" varchar,
  	"html" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "privacy_page_blocks_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_privacy_page_blocks_notes_kind" DEFAULT 'info',
  	"heading" varchar,
  	"body" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "privacy_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"route" varchar NOT NULL,
  	"chapter_title_a" varchar,
  	"chapter_title_b" varchar,
  	"tagline" varchar,
  	"lede" varchar,
  	"hero_image_id" integer,
  	"publish_status" "enum_privacy_page_publish_status" DEFAULT 'published' NOT NULL,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_noindex" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "treatments_page_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "treatments_page_blocks_image_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar
  );
  
  CREATE TABLE "treatments_page_blocks_image_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"columns" "enum_treatments_page_blocks_image_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "treatments_page_blocks_cta_band" (
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
  
  CREATE TABLE "treatments_page_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"source_note" varchar
  );
  
  CREATE TABLE "treatments_page_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "treatments_page_blocks_faq_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar NOT NULL,
  	"a" varchar NOT NULL
  );
  
  CREATE TABLE "treatments_page_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "treatments_page_blocks_procedure_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_discipline_id" integer,
  	"filter_sub_category_id" integer,
  	"layout" "enum_treatments_page_blocks_procedure_list_layout" DEFAULT 'grid',
  	"limit" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE "treatments_page_blocks_surgeon_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_group" "enum_treatments_page_blocks_surgeon_list_filter_group",
  	"layout" "enum_treatments_page_blocks_surgeon_list_layout" DEFAULT 'strip',
  	"block_name" varchar
  );
  
  CREATE TABLE "treatments_page_blocks_ba_grid" (
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
  
  CREATE TABLE "treatments_page_blocks_testimonial_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"count" numeric DEFAULT 3,
  	"featured_only" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "treatments_page_blocks_recovery_stay_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"limit" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE "treatments_page_blocks_press_mention_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"limit" numeric DEFAULT 8,
  	"block_name" varchar
  );
  
  CREATE TABLE "treatments_page_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"lede" varchar,
  	"source_cta" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "treatments_page_blocks_journey_step_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_category" "enum_treatments_page_blocks_journey_step_list_filter_category",
  	"block_name" varchar
  );
  
  CREATE TABLE "treatments_page_blocks_external_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"iframe_url" varchar,
  	"html" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "treatments_page_blocks_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_treatments_page_blocks_notes_kind" DEFAULT 'info',
  	"heading" varchar,
  	"body" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "treatments_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"route" varchar NOT NULL,
  	"chapter_title_a" varchar,
  	"chapter_title_b" varchar,
  	"tagline" varchar,
  	"lede" varchar,
  	"hero_image_id" integer,
  	"publish_status" "enum_treatments_page_publish_status" DEFAULT 'published' NOT NULL,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_noindex" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "surgeons_page_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "surgeons_page_blocks_image_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar
  );
  
  CREATE TABLE "surgeons_page_blocks_image_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"columns" "enum_surgeons_page_blocks_image_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "surgeons_page_blocks_cta_band" (
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
  
  CREATE TABLE "surgeons_page_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"source_note" varchar
  );
  
  CREATE TABLE "surgeons_page_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "surgeons_page_blocks_faq_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar NOT NULL,
  	"a" varchar NOT NULL
  );
  
  CREATE TABLE "surgeons_page_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "surgeons_page_blocks_procedure_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_discipline_id" integer,
  	"filter_sub_category_id" integer,
  	"layout" "enum_surgeons_page_blocks_procedure_list_layout" DEFAULT 'grid',
  	"limit" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE "surgeons_page_blocks_surgeon_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_group" "enum_surgeons_page_blocks_surgeon_list_filter_group",
  	"layout" "enum_surgeons_page_blocks_surgeon_list_layout" DEFAULT 'strip',
  	"block_name" varchar
  );
  
  CREATE TABLE "surgeons_page_blocks_ba_grid" (
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
  
  CREATE TABLE "surgeons_page_blocks_testimonial_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"count" numeric DEFAULT 3,
  	"featured_only" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "surgeons_page_blocks_recovery_stay_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"limit" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE "surgeons_page_blocks_press_mention_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"limit" numeric DEFAULT 8,
  	"block_name" varchar
  );
  
  CREATE TABLE "surgeons_page_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"lede" varchar,
  	"source_cta" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "surgeons_page_blocks_journey_step_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_category" "enum_surgeons_page_blocks_journey_step_list_filter_category",
  	"block_name" varchar
  );
  
  CREATE TABLE "surgeons_page_blocks_external_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"iframe_url" varchar,
  	"html" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "surgeons_page_blocks_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_surgeons_page_blocks_notes_kind" DEFAULT 'info',
  	"heading" varchar,
  	"body" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "surgeons_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"route" varchar NOT NULL,
  	"chapter_title_a" varchar,
  	"chapter_title_b" varchar,
  	"tagline" varchar,
  	"lede" varchar,
  	"hero_image_id" integer,
  	"publish_status" "enum_surgeons_page_publish_status" DEFAULT 'published' NOT NULL,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_noindex" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "results_page_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "results_page_blocks_image_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar
  );
  
  CREATE TABLE "results_page_blocks_image_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"columns" "enum_results_page_blocks_image_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "results_page_blocks_cta_band" (
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
  
  CREATE TABLE "results_page_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"source_note" varchar
  );
  
  CREATE TABLE "results_page_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "results_page_blocks_faq_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar NOT NULL,
  	"a" varchar NOT NULL
  );
  
  CREATE TABLE "results_page_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "results_page_blocks_procedure_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_discipline_id" integer,
  	"filter_sub_category_id" integer,
  	"layout" "enum_results_page_blocks_procedure_list_layout" DEFAULT 'grid',
  	"limit" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE "results_page_blocks_surgeon_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_group" "enum_results_page_blocks_surgeon_list_filter_group",
  	"layout" "enum_results_page_blocks_surgeon_list_layout" DEFAULT 'strip',
  	"block_name" varchar
  );
  
  CREATE TABLE "results_page_blocks_ba_grid" (
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
  
  CREATE TABLE "results_page_blocks_testimonial_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"count" numeric DEFAULT 3,
  	"featured_only" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "results_page_blocks_recovery_stay_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"limit" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE "results_page_blocks_press_mention_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"limit" numeric DEFAULT 8,
  	"block_name" varchar
  );
  
  CREATE TABLE "results_page_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"lede" varchar,
  	"source_cta" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "results_page_blocks_journey_step_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_category" "enum_results_page_blocks_journey_step_list_filter_category",
  	"block_name" varchar
  );
  
  CREATE TABLE "results_page_blocks_external_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"iframe_url" varchar,
  	"html" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "results_page_blocks_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_results_page_blocks_notes_kind" DEFAULT 'info',
  	"heading" varchar,
  	"body" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "results_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"route" varchar NOT NULL,
  	"chapter_title_a" varchar,
  	"chapter_title_b" varchar,
  	"tagline" varchar,
  	"lede" varchar,
  	"hero_image_id" integer,
  	"publish_status" "enum_results_page_publish_status" DEFAULT 'published' NOT NULL,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_noindex" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "gallery_page_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "gallery_page_blocks_image_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar
  );
  
  CREATE TABLE "gallery_page_blocks_image_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"columns" "enum_gallery_page_blocks_image_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "gallery_page_blocks_cta_band" (
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
  
  CREATE TABLE "gallery_page_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"source_note" varchar
  );
  
  CREATE TABLE "gallery_page_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "gallery_page_blocks_faq_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar NOT NULL,
  	"a" varchar NOT NULL
  );
  
  CREATE TABLE "gallery_page_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "gallery_page_blocks_procedure_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_discipline_id" integer,
  	"filter_sub_category_id" integer,
  	"layout" "enum_gallery_page_blocks_procedure_list_layout" DEFAULT 'grid',
  	"limit" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE "gallery_page_blocks_surgeon_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_group" "enum_gallery_page_blocks_surgeon_list_filter_group",
  	"layout" "enum_gallery_page_blocks_surgeon_list_layout" DEFAULT 'strip',
  	"block_name" varchar
  );
  
  CREATE TABLE "gallery_page_blocks_ba_grid" (
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
  
  CREATE TABLE "gallery_page_blocks_testimonial_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"count" numeric DEFAULT 3,
  	"featured_only" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "gallery_page_blocks_recovery_stay_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"limit" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE "gallery_page_blocks_press_mention_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"limit" numeric DEFAULT 8,
  	"block_name" varchar
  );
  
  CREATE TABLE "gallery_page_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"lede" varchar,
  	"source_cta" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "gallery_page_blocks_journey_step_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_category" "enum_gallery_page_blocks_journey_step_list_filter_category",
  	"block_name" varchar
  );
  
  CREATE TABLE "gallery_page_blocks_external_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"iframe_url" varchar,
  	"html" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "gallery_page_blocks_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_gallery_page_blocks_notes_kind" DEFAULT 'info',
  	"heading" varchar,
  	"body" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "gallery_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"route" varchar NOT NULL,
  	"chapter_title_a" varchar,
  	"chapter_title_b" varchar,
  	"tagline" varchar,
  	"lede" varchar,
  	"hero_image_id" integer,
  	"publish_status" "enum_gallery_page_publish_status" DEFAULT 'published' NOT NULL,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_noindex" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "pricing_page_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pricing_page_blocks_image_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar
  );
  
  CREATE TABLE "pricing_page_blocks_image_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"columns" "enum_pricing_page_blocks_image_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "pricing_page_blocks_cta_band" (
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
  
  CREATE TABLE "pricing_page_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"source_note" varchar
  );
  
  CREATE TABLE "pricing_page_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pricing_page_blocks_faq_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar NOT NULL,
  	"a" varchar NOT NULL
  );
  
  CREATE TABLE "pricing_page_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pricing_page_blocks_procedure_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_discipline_id" integer,
  	"filter_sub_category_id" integer,
  	"layout" "enum_pricing_page_blocks_procedure_list_layout" DEFAULT 'grid',
  	"limit" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE "pricing_page_blocks_surgeon_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_group" "enum_pricing_page_blocks_surgeon_list_filter_group",
  	"layout" "enum_pricing_page_blocks_surgeon_list_layout" DEFAULT 'strip',
  	"block_name" varchar
  );
  
  CREATE TABLE "pricing_page_blocks_ba_grid" (
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
  
  CREATE TABLE "pricing_page_blocks_testimonial_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"count" numeric DEFAULT 3,
  	"featured_only" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pricing_page_blocks_recovery_stay_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"limit" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE "pricing_page_blocks_press_mention_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"limit" numeric DEFAULT 8,
  	"block_name" varchar
  );
  
  CREATE TABLE "pricing_page_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"lede" varchar,
  	"source_cta" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pricing_page_blocks_journey_step_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_category" "enum_pricing_page_blocks_journey_step_list_filter_category",
  	"block_name" varchar
  );
  
  CREATE TABLE "pricing_page_blocks_external_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"iframe_url" varchar,
  	"html" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pricing_page_blocks_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_pricing_page_blocks_notes_kind" DEFAULT 'info',
  	"heading" varchar,
  	"body" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pricing_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"route" varchar NOT NULL,
  	"chapter_title_a" varchar,
  	"chapter_title_b" varchar,
  	"tagline" varchar,
  	"lede" varchar,
  	"hero_image_id" integer,
  	"publish_status" "enum_pricing_page_publish_status" DEFAULT 'published' NOT NULL,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_noindex" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "journey_page_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "journey_page_blocks_image_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar
  );
  
  CREATE TABLE "journey_page_blocks_image_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"columns" "enum_journey_page_blocks_image_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "journey_page_blocks_cta_band" (
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
  
  CREATE TABLE "journey_page_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"source_note" varchar
  );
  
  CREATE TABLE "journey_page_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "journey_page_blocks_faq_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar NOT NULL,
  	"a" varchar NOT NULL
  );
  
  CREATE TABLE "journey_page_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "journey_page_blocks_procedure_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_discipline_id" integer,
  	"filter_sub_category_id" integer,
  	"layout" "enum_journey_page_blocks_procedure_list_layout" DEFAULT 'grid',
  	"limit" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE "journey_page_blocks_surgeon_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_group" "enum_journey_page_blocks_surgeon_list_filter_group",
  	"layout" "enum_journey_page_blocks_surgeon_list_layout" DEFAULT 'strip',
  	"block_name" varchar
  );
  
  CREATE TABLE "journey_page_blocks_ba_grid" (
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
  
  CREATE TABLE "journey_page_blocks_testimonial_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"count" numeric DEFAULT 3,
  	"featured_only" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "journey_page_blocks_recovery_stay_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"limit" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE "journey_page_blocks_press_mention_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"limit" numeric DEFAULT 8,
  	"block_name" varchar
  );
  
  CREATE TABLE "journey_page_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"lede" varchar,
  	"source_cta" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "journey_page_blocks_journey_step_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_category" "enum_journey_page_blocks_journey_step_list_filter_category",
  	"block_name" varchar
  );
  
  CREATE TABLE "journey_page_blocks_external_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"iframe_url" varchar,
  	"html" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "journey_page_blocks_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_journey_page_blocks_notes_kind" DEFAULT 'info',
  	"heading" varchar,
  	"body" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "journey_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"route" varchar NOT NULL,
  	"chapter_title_a" varchar,
  	"chapter_title_b" varchar,
  	"tagline" varchar,
  	"lede" varchar,
  	"hero_image_id" integer,
  	"publish_status" "enum_journey_page_publish_status" DEFAULT 'published' NOT NULL,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_noindex" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "stories_page_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "stories_page_blocks_image_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar
  );
  
  CREATE TABLE "stories_page_blocks_image_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"columns" "enum_stories_page_blocks_image_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "stories_page_blocks_cta_band" (
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
  
  CREATE TABLE "stories_page_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"source_note" varchar
  );
  
  CREATE TABLE "stories_page_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "stories_page_blocks_faq_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar NOT NULL,
  	"a" varchar NOT NULL
  );
  
  CREATE TABLE "stories_page_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "stories_page_blocks_procedure_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_discipline_id" integer,
  	"filter_sub_category_id" integer,
  	"layout" "enum_stories_page_blocks_procedure_list_layout" DEFAULT 'grid',
  	"limit" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE "stories_page_blocks_surgeon_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_group" "enum_stories_page_blocks_surgeon_list_filter_group",
  	"layout" "enum_stories_page_blocks_surgeon_list_layout" DEFAULT 'strip',
  	"block_name" varchar
  );
  
  CREATE TABLE "stories_page_blocks_ba_grid" (
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
  
  CREATE TABLE "stories_page_blocks_testimonial_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"count" numeric DEFAULT 3,
  	"featured_only" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "stories_page_blocks_recovery_stay_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"limit" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE "stories_page_blocks_press_mention_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"limit" numeric DEFAULT 8,
  	"block_name" varchar
  );
  
  CREATE TABLE "stories_page_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"lede" varchar,
  	"source_cta" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "stories_page_blocks_journey_step_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_category" "enum_stories_page_blocks_journey_step_list_filter_category",
  	"block_name" varchar
  );
  
  CREATE TABLE "stories_page_blocks_external_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"iframe_url" varchar,
  	"html" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "stories_page_blocks_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_stories_page_blocks_notes_kind" DEFAULT 'info',
  	"heading" varchar,
  	"body" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "stories_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"route" varchar NOT NULL,
  	"chapter_title_a" varchar,
  	"chapter_title_b" varchar,
  	"tagline" varchar,
  	"lede" varchar,
  	"hero_image_id" integer,
  	"publish_status" "enum_stories_page_publish_status" DEFAULT 'published' NOT NULL,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_noindex" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "rec_stays_pg_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "rec_stays_pg_blocks_image_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar
  );
  
  CREATE TABLE "rec_stays_pg_blocks_image_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"columns" "enum_rec_stays_pg_blocks_image_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "rec_stays_pg_blocks_cta_band" (
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
  
  CREATE TABLE "rec_stays_pg_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"source_note" varchar
  );
  
  CREATE TABLE "rec_stays_pg_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "rec_stays_pg_blocks_faq_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar NOT NULL,
  	"a" varchar NOT NULL
  );
  
  CREATE TABLE "rec_stays_pg_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "rec_stays_pg_blocks_procedure_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_discipline_id" integer,
  	"filter_sub_category_id" integer,
  	"layout" "enum_rec_stays_pg_blocks_procedure_list_layout" DEFAULT 'grid',
  	"limit" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE "rec_stays_pg_blocks_surgeon_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_group" "enum_rec_stays_pg_blocks_surgeon_list_filter_group",
  	"layout" "enum_rec_stays_pg_blocks_surgeon_list_layout" DEFAULT 'strip',
  	"block_name" varchar
  );
  
  CREATE TABLE "rec_stays_pg_blocks_ba_grid" (
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
  
  CREATE TABLE "rec_stays_pg_blocks_testimonial_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"count" numeric DEFAULT 3,
  	"featured_only" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "rec_stays_pg_blocks_recovery_stay_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"limit" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE "rec_stays_pg_blocks_press_mention_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"limit" numeric DEFAULT 8,
  	"block_name" varchar
  );
  
  CREATE TABLE "rec_stays_pg_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"lede" varchar,
  	"source_cta" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "rec_stays_pg_blocks_journey_step_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_category" "enum_rec_stays_pg_blocks_journey_step_list_filter_category",
  	"block_name" varchar
  );
  
  CREATE TABLE "rec_stays_pg_blocks_external_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"iframe_url" varchar,
  	"html" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "rec_stays_pg_blocks_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_rec_stays_pg_blocks_notes_kind" DEFAULT 'info',
  	"heading" varchar,
  	"body" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "rec_stays_pg" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"route" varchar NOT NULL,
  	"chapter_title_a" varchar,
  	"chapter_title_b" varchar,
  	"tagline" varchar,
  	"lede" varchar,
  	"hero_image_id" integer,
  	"publish_status" "enum_rec_stays_pg_publish_status" DEFAULT 'published' NOT NULL,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_noindex" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_page_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_page_blocks_image_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar
  );
  
  CREATE TABLE "contact_page_blocks_image_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"columns" "enum_contact_page_blocks_image_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_page_blocks_cta_band" (
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
  
  CREATE TABLE "contact_page_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"source_note" varchar
  );
  
  CREATE TABLE "contact_page_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_page_blocks_faq_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar NOT NULL,
  	"a" varchar NOT NULL
  );
  
  CREATE TABLE "contact_page_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_page_blocks_procedure_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_discipline_id" integer,
  	"filter_sub_category_id" integer,
  	"layout" "enum_contact_page_blocks_procedure_list_layout" DEFAULT 'grid',
  	"limit" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_page_blocks_surgeon_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_group" "enum_contact_page_blocks_surgeon_list_filter_group",
  	"layout" "enum_contact_page_blocks_surgeon_list_layout" DEFAULT 'strip',
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_page_blocks_ba_grid" (
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
  
  CREATE TABLE "contact_page_blocks_testimonial_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"count" numeric DEFAULT 3,
  	"featured_only" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_page_blocks_recovery_stay_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"limit" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_page_blocks_press_mention_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"limit" numeric DEFAULT 8,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_page_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"lede" varchar,
  	"source_cta" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_page_blocks_journey_step_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_category" "enum_contact_page_blocks_journey_step_list_filter_category",
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_page_blocks_external_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"iframe_url" varchar,
  	"html" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_page_blocks_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_contact_page_blocks_notes_kind" DEFAULT 'info',
  	"heading" varchar,
  	"body" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"route" varchar NOT NULL,
  	"chapter_title_a" varchar,
  	"chapter_title_b" varchar,
  	"tagline" varchar,
  	"lede" varchar,
  	"hero_image_id" integer,
  	"publish_status" "enum_contact_page_publish_status" DEFAULT 'published' NOT NULL,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_noindex" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "vid_consult_pg_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "vid_consult_pg_blocks_image_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar
  );
  
  CREATE TABLE "vid_consult_pg_blocks_image_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"columns" "enum_vid_consult_pg_blocks_image_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "vid_consult_pg_blocks_cta_band" (
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
  
  CREATE TABLE "vid_consult_pg_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"source_note" varchar
  );
  
  CREATE TABLE "vid_consult_pg_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "vid_consult_pg_blocks_faq_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar NOT NULL,
  	"a" varchar NOT NULL
  );
  
  CREATE TABLE "vid_consult_pg_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "vid_consult_pg_blocks_procedure_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_discipline_id" integer,
  	"filter_sub_category_id" integer,
  	"layout" "enum_vid_consult_pg_blocks_procedure_list_layout" DEFAULT 'grid',
  	"limit" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE "vid_consult_pg_blocks_surgeon_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_group" "enum_vid_consult_pg_blocks_surgeon_list_filter_group",
  	"layout" "enum_vid_consult_pg_blocks_surgeon_list_layout" DEFAULT 'strip',
  	"block_name" varchar
  );
  
  CREATE TABLE "vid_consult_pg_blocks_ba_grid" (
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
  
  CREATE TABLE "vid_consult_pg_blocks_testimonial_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"count" numeric DEFAULT 3,
  	"featured_only" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "vid_consult_pg_blocks_recovery_stay_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"limit" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE "vid_consult_pg_blocks_press_mention_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"limit" numeric DEFAULT 8,
  	"block_name" varchar
  );
  
  CREATE TABLE "vid_consult_pg_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"lede" varchar,
  	"source_cta" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "vid_consult_pg_blocks_journey_step_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_category" "enum_vid_consult_pg_blocks_journey_step_list_filter_category",
  	"block_name" varchar
  );
  
  CREATE TABLE "vid_consult_pg_blocks_external_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"iframe_url" varchar,
  	"html" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "vid_consult_pg_blocks_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_vid_consult_pg_blocks_notes_kind" DEFAULT 'info',
  	"heading" varchar,
  	"body" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "vid_consult_pg" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"route" varchar NOT NULL,
  	"chapter_title_a" varchar,
  	"chapter_title_b" varchar,
  	"tagline" varchar,
  	"lede" varchar,
  	"hero_image_id" integer,
  	"publish_status" "enum_vid_consult_pg_publish_status" DEFAULT 'published' NOT NULL,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_noindex" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "blog_page_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "blog_page_blocks_image_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar
  );
  
  CREATE TABLE "blog_page_blocks_image_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"columns" "enum_blog_page_blocks_image_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "blog_page_blocks_cta_band" (
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
  
  CREATE TABLE "blog_page_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"source_note" varchar
  );
  
  CREATE TABLE "blog_page_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "blog_page_blocks_faq_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar NOT NULL,
  	"a" varchar NOT NULL
  );
  
  CREATE TABLE "blog_page_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "blog_page_blocks_procedure_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_discipline_id" integer,
  	"filter_sub_category_id" integer,
  	"layout" "enum_blog_page_blocks_procedure_list_layout" DEFAULT 'grid',
  	"limit" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE "blog_page_blocks_surgeon_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_group" "enum_blog_page_blocks_surgeon_list_filter_group",
  	"layout" "enum_blog_page_blocks_surgeon_list_layout" DEFAULT 'strip',
  	"block_name" varchar
  );
  
  CREATE TABLE "blog_page_blocks_ba_grid" (
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
  
  CREATE TABLE "blog_page_blocks_testimonial_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"count" numeric DEFAULT 3,
  	"featured_only" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "blog_page_blocks_recovery_stay_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"limit" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE "blog_page_blocks_press_mention_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"limit" numeric DEFAULT 8,
  	"block_name" varchar
  );
  
  CREATE TABLE "blog_page_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"lede" varchar,
  	"source_cta" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "blog_page_blocks_journey_step_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"filter_category" "enum_blog_page_blocks_journey_step_list_filter_category",
  	"block_name" varchar
  );
  
  CREATE TABLE "blog_page_blocks_external_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"iframe_url" varchar,
  	"html" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "blog_page_blocks_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_blog_page_blocks_notes_kind" DEFAULT 'info',
  	"heading" varchar,
  	"body" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "blog_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"route" varchar NOT NULL,
  	"chapter_title_a" varchar,
  	"chapter_title_b" varchar,
  	"tagline" varchar,
  	"lede" varchar,
  	"hero_image_id" integer,
  	"publish_status" "enum_blog_page_publish_status" DEFAULT 'published' NOT NULL,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_noindex" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "media" ADD COLUMN "category" "enum_media_category" DEFAULT 'uncategorised';
  ALTER TABLE "media" ADD COLUMN "folder_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "payload_folders_id" integer;
  ALTER TABLE "payload_folders_folder_type" ADD CONSTRAINT "payload_folders_folder_type_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders" ADD CONSTRAINT "payload_folders_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_blocks_rich_text" ADD CONSTRAINT "home_page_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_image_grid_images" ADD CONSTRAINT "home_page_blocks_image_grid_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_blocks_image_grid_images" ADD CONSTRAINT "home_page_blocks_image_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_image_grid" ADD CONSTRAINT "home_page_blocks_image_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_cta_band" ADD CONSTRAINT "home_page_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_stats_items" ADD CONSTRAINT "home_page_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_stats" ADD CONSTRAINT "home_page_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_faq_accordion_items" ADD CONSTRAINT "home_page_blocks_faq_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_faq_accordion" ADD CONSTRAINT "home_page_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_procedure_list" ADD CONSTRAINT "home_page_blocks_procedure_list_filter_discipline_id_disciplines_id_fk" FOREIGN KEY ("filter_discipline_id") REFERENCES "public"."disciplines"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_blocks_procedure_list" ADD CONSTRAINT "home_page_blocks_procedure_list_filter_sub_category_id_sub_categories_id_fk" FOREIGN KEY ("filter_sub_category_id") REFERENCES "public"."sub_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_blocks_procedure_list" ADD CONSTRAINT "home_page_blocks_procedure_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_surgeon_list" ADD CONSTRAINT "home_page_blocks_surgeon_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_ba_grid" ADD CONSTRAINT "home_page_blocks_ba_grid_filter_procedure_id_procedures_id_fk" FOREIGN KEY ("filter_procedure_id") REFERENCES "public"."procedures"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_blocks_ba_grid" ADD CONSTRAINT "home_page_blocks_ba_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_testimonial_list" ADD CONSTRAINT "home_page_blocks_testimonial_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_recovery_stay_list" ADD CONSTRAINT "home_page_blocks_recovery_stay_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_press_mention_list" ADD CONSTRAINT "home_page_blocks_press_mention_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_contact_form" ADD CONSTRAINT "home_page_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_journey_step_list" ADD CONSTRAINT "home_page_blocks_journey_step_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_external_embed" ADD CONSTRAINT "home_page_blocks_external_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_notes" ADD CONSTRAINT "home_page_blocks_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "press_page_blocks_rich_text" ADD CONSTRAINT "press_page_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."press_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_page_blocks_image_grid_images" ADD CONSTRAINT "press_page_blocks_image_grid_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "press_page_blocks_image_grid_images" ADD CONSTRAINT "press_page_blocks_image_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."press_page_blocks_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_page_blocks_image_grid" ADD CONSTRAINT "press_page_blocks_image_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."press_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_page_blocks_cta_band" ADD CONSTRAINT "press_page_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."press_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_page_blocks_stats_items" ADD CONSTRAINT "press_page_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."press_page_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_page_blocks_stats" ADD CONSTRAINT "press_page_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."press_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_page_blocks_faq_accordion_items" ADD CONSTRAINT "press_page_blocks_faq_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."press_page_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_page_blocks_faq_accordion" ADD CONSTRAINT "press_page_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."press_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_page_blocks_procedure_list" ADD CONSTRAINT "press_page_blocks_procedure_list_filter_discipline_id_disciplines_id_fk" FOREIGN KEY ("filter_discipline_id") REFERENCES "public"."disciplines"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "press_page_blocks_procedure_list" ADD CONSTRAINT "press_page_blocks_procedure_list_filter_sub_category_id_sub_categories_id_fk" FOREIGN KEY ("filter_sub_category_id") REFERENCES "public"."sub_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "press_page_blocks_procedure_list" ADD CONSTRAINT "press_page_blocks_procedure_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."press_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_page_blocks_surgeon_list" ADD CONSTRAINT "press_page_blocks_surgeon_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."press_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_page_blocks_ba_grid" ADD CONSTRAINT "press_page_blocks_ba_grid_filter_procedure_id_procedures_id_fk" FOREIGN KEY ("filter_procedure_id") REFERENCES "public"."procedures"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "press_page_blocks_ba_grid" ADD CONSTRAINT "press_page_blocks_ba_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."press_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_page_blocks_testimonial_list" ADD CONSTRAINT "press_page_blocks_testimonial_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."press_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_page_blocks_recovery_stay_list" ADD CONSTRAINT "press_page_blocks_recovery_stay_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."press_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_page_blocks_press_mention_list" ADD CONSTRAINT "press_page_blocks_press_mention_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."press_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_page_blocks_contact_form" ADD CONSTRAINT "press_page_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."press_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_page_blocks_journey_step_list" ADD CONSTRAINT "press_page_blocks_journey_step_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."press_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_page_blocks_external_embed" ADD CONSTRAINT "press_page_blocks_external_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."press_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_page_blocks_notes" ADD CONSTRAINT "press_page_blocks_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."press_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_page" ADD CONSTRAINT "press_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "press_page" ADD CONSTRAINT "press_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "privacy_page_blocks_rich_text" ADD CONSTRAINT "privacy_page_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_page_blocks_image_grid_images" ADD CONSTRAINT "privacy_page_blocks_image_grid_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "privacy_page_blocks_image_grid_images" ADD CONSTRAINT "privacy_page_blocks_image_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_page_blocks_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_page_blocks_image_grid" ADD CONSTRAINT "privacy_page_blocks_image_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_page_blocks_cta_band" ADD CONSTRAINT "privacy_page_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_page_blocks_stats_items" ADD CONSTRAINT "privacy_page_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_page_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_page_blocks_stats" ADD CONSTRAINT "privacy_page_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_page_blocks_faq_accordion_items" ADD CONSTRAINT "privacy_page_blocks_faq_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_page_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_page_blocks_faq_accordion" ADD CONSTRAINT "privacy_page_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_page_blocks_procedure_list" ADD CONSTRAINT "privacy_page_blocks_procedure_list_filter_discipline_id_disciplines_id_fk" FOREIGN KEY ("filter_discipline_id") REFERENCES "public"."disciplines"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "privacy_page_blocks_procedure_list" ADD CONSTRAINT "privacy_page_blocks_procedure_list_filter_sub_category_id_sub_categories_id_fk" FOREIGN KEY ("filter_sub_category_id") REFERENCES "public"."sub_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "privacy_page_blocks_procedure_list" ADD CONSTRAINT "privacy_page_blocks_procedure_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_page_blocks_surgeon_list" ADD CONSTRAINT "privacy_page_blocks_surgeon_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_page_blocks_ba_grid" ADD CONSTRAINT "privacy_page_blocks_ba_grid_filter_procedure_id_procedures_id_fk" FOREIGN KEY ("filter_procedure_id") REFERENCES "public"."procedures"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "privacy_page_blocks_ba_grid" ADD CONSTRAINT "privacy_page_blocks_ba_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_page_blocks_testimonial_list" ADD CONSTRAINT "privacy_page_blocks_testimonial_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_page_blocks_recovery_stay_list" ADD CONSTRAINT "privacy_page_blocks_recovery_stay_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_page_blocks_press_mention_list" ADD CONSTRAINT "privacy_page_blocks_press_mention_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_page_blocks_contact_form" ADD CONSTRAINT "privacy_page_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_page_blocks_journey_step_list" ADD CONSTRAINT "privacy_page_blocks_journey_step_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_page_blocks_external_embed" ADD CONSTRAINT "privacy_page_blocks_external_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_page_blocks_notes" ADD CONSTRAINT "privacy_page_blocks_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_page" ADD CONSTRAINT "privacy_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "privacy_page" ADD CONSTRAINT "privacy_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "treatments_page_blocks_rich_text" ADD CONSTRAINT "treatments_page_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."treatments_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "treatments_page_blocks_image_grid_images" ADD CONSTRAINT "treatments_page_blocks_image_grid_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "treatments_page_blocks_image_grid_images" ADD CONSTRAINT "treatments_page_blocks_image_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."treatments_page_blocks_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "treatments_page_blocks_image_grid" ADD CONSTRAINT "treatments_page_blocks_image_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."treatments_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "treatments_page_blocks_cta_band" ADD CONSTRAINT "treatments_page_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."treatments_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "treatments_page_blocks_stats_items" ADD CONSTRAINT "treatments_page_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."treatments_page_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "treatments_page_blocks_stats" ADD CONSTRAINT "treatments_page_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."treatments_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "treatments_page_blocks_faq_accordion_items" ADD CONSTRAINT "treatments_page_blocks_faq_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."treatments_page_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "treatments_page_blocks_faq_accordion" ADD CONSTRAINT "treatments_page_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."treatments_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "treatments_page_blocks_procedure_list" ADD CONSTRAINT "treatments_page_blocks_procedure_list_filter_discipline_id_disciplines_id_fk" FOREIGN KEY ("filter_discipline_id") REFERENCES "public"."disciplines"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "treatments_page_blocks_procedure_list" ADD CONSTRAINT "treatments_page_blocks_procedure_list_filter_sub_category_id_sub_categories_id_fk" FOREIGN KEY ("filter_sub_category_id") REFERENCES "public"."sub_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "treatments_page_blocks_procedure_list" ADD CONSTRAINT "treatments_page_blocks_procedure_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."treatments_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "treatments_page_blocks_surgeon_list" ADD CONSTRAINT "treatments_page_blocks_surgeon_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."treatments_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "treatments_page_blocks_ba_grid" ADD CONSTRAINT "treatments_page_blocks_ba_grid_filter_procedure_id_procedures_id_fk" FOREIGN KEY ("filter_procedure_id") REFERENCES "public"."procedures"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "treatments_page_blocks_ba_grid" ADD CONSTRAINT "treatments_page_blocks_ba_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."treatments_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "treatments_page_blocks_testimonial_list" ADD CONSTRAINT "treatments_page_blocks_testimonial_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."treatments_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "treatments_page_blocks_recovery_stay_list" ADD CONSTRAINT "treatments_page_blocks_recovery_stay_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."treatments_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "treatments_page_blocks_press_mention_list" ADD CONSTRAINT "treatments_page_blocks_press_mention_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."treatments_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "treatments_page_blocks_contact_form" ADD CONSTRAINT "treatments_page_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."treatments_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "treatments_page_blocks_journey_step_list" ADD CONSTRAINT "treatments_page_blocks_journey_step_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."treatments_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "treatments_page_blocks_external_embed" ADD CONSTRAINT "treatments_page_blocks_external_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."treatments_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "treatments_page_blocks_notes" ADD CONSTRAINT "treatments_page_blocks_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."treatments_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "treatments_page" ADD CONSTRAINT "treatments_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "treatments_page" ADD CONSTRAINT "treatments_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "surgeons_page_blocks_rich_text" ADD CONSTRAINT "surgeons_page_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."surgeons_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "surgeons_page_blocks_image_grid_images" ADD CONSTRAINT "surgeons_page_blocks_image_grid_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "surgeons_page_blocks_image_grid_images" ADD CONSTRAINT "surgeons_page_blocks_image_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."surgeons_page_blocks_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "surgeons_page_blocks_image_grid" ADD CONSTRAINT "surgeons_page_blocks_image_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."surgeons_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "surgeons_page_blocks_cta_band" ADD CONSTRAINT "surgeons_page_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."surgeons_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "surgeons_page_blocks_stats_items" ADD CONSTRAINT "surgeons_page_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."surgeons_page_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "surgeons_page_blocks_stats" ADD CONSTRAINT "surgeons_page_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."surgeons_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "surgeons_page_blocks_faq_accordion_items" ADD CONSTRAINT "surgeons_page_blocks_faq_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."surgeons_page_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "surgeons_page_blocks_faq_accordion" ADD CONSTRAINT "surgeons_page_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."surgeons_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "surgeons_page_blocks_procedure_list" ADD CONSTRAINT "surgeons_page_blocks_procedure_list_filter_discipline_id_disciplines_id_fk" FOREIGN KEY ("filter_discipline_id") REFERENCES "public"."disciplines"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "surgeons_page_blocks_procedure_list" ADD CONSTRAINT "surgeons_page_blocks_procedure_list_filter_sub_category_id_sub_categories_id_fk" FOREIGN KEY ("filter_sub_category_id") REFERENCES "public"."sub_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "surgeons_page_blocks_procedure_list" ADD CONSTRAINT "surgeons_page_blocks_procedure_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."surgeons_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "surgeons_page_blocks_surgeon_list" ADD CONSTRAINT "surgeons_page_blocks_surgeon_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."surgeons_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "surgeons_page_blocks_ba_grid" ADD CONSTRAINT "surgeons_page_blocks_ba_grid_filter_procedure_id_procedures_id_fk" FOREIGN KEY ("filter_procedure_id") REFERENCES "public"."procedures"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "surgeons_page_blocks_ba_grid" ADD CONSTRAINT "surgeons_page_blocks_ba_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."surgeons_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "surgeons_page_blocks_testimonial_list" ADD CONSTRAINT "surgeons_page_blocks_testimonial_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."surgeons_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "surgeons_page_blocks_recovery_stay_list" ADD CONSTRAINT "surgeons_page_blocks_recovery_stay_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."surgeons_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "surgeons_page_blocks_press_mention_list" ADD CONSTRAINT "surgeons_page_blocks_press_mention_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."surgeons_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "surgeons_page_blocks_contact_form" ADD CONSTRAINT "surgeons_page_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."surgeons_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "surgeons_page_blocks_journey_step_list" ADD CONSTRAINT "surgeons_page_blocks_journey_step_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."surgeons_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "surgeons_page_blocks_external_embed" ADD CONSTRAINT "surgeons_page_blocks_external_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."surgeons_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "surgeons_page_blocks_notes" ADD CONSTRAINT "surgeons_page_blocks_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."surgeons_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "surgeons_page" ADD CONSTRAINT "surgeons_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "surgeons_page" ADD CONSTRAINT "surgeons_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "results_page_blocks_rich_text" ADD CONSTRAINT "results_page_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."results_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "results_page_blocks_image_grid_images" ADD CONSTRAINT "results_page_blocks_image_grid_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "results_page_blocks_image_grid_images" ADD CONSTRAINT "results_page_blocks_image_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."results_page_blocks_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "results_page_blocks_image_grid" ADD CONSTRAINT "results_page_blocks_image_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."results_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "results_page_blocks_cta_band" ADD CONSTRAINT "results_page_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."results_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "results_page_blocks_stats_items" ADD CONSTRAINT "results_page_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."results_page_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "results_page_blocks_stats" ADD CONSTRAINT "results_page_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."results_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "results_page_blocks_faq_accordion_items" ADD CONSTRAINT "results_page_blocks_faq_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."results_page_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "results_page_blocks_faq_accordion" ADD CONSTRAINT "results_page_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."results_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "results_page_blocks_procedure_list" ADD CONSTRAINT "results_page_blocks_procedure_list_filter_discipline_id_disciplines_id_fk" FOREIGN KEY ("filter_discipline_id") REFERENCES "public"."disciplines"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "results_page_blocks_procedure_list" ADD CONSTRAINT "results_page_blocks_procedure_list_filter_sub_category_id_sub_categories_id_fk" FOREIGN KEY ("filter_sub_category_id") REFERENCES "public"."sub_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "results_page_blocks_procedure_list" ADD CONSTRAINT "results_page_blocks_procedure_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."results_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "results_page_blocks_surgeon_list" ADD CONSTRAINT "results_page_blocks_surgeon_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."results_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "results_page_blocks_ba_grid" ADD CONSTRAINT "results_page_blocks_ba_grid_filter_procedure_id_procedures_id_fk" FOREIGN KEY ("filter_procedure_id") REFERENCES "public"."procedures"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "results_page_blocks_ba_grid" ADD CONSTRAINT "results_page_blocks_ba_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."results_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "results_page_blocks_testimonial_list" ADD CONSTRAINT "results_page_blocks_testimonial_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."results_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "results_page_blocks_recovery_stay_list" ADD CONSTRAINT "results_page_blocks_recovery_stay_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."results_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "results_page_blocks_press_mention_list" ADD CONSTRAINT "results_page_blocks_press_mention_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."results_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "results_page_blocks_contact_form" ADD CONSTRAINT "results_page_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."results_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "results_page_blocks_journey_step_list" ADD CONSTRAINT "results_page_blocks_journey_step_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."results_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "results_page_blocks_external_embed" ADD CONSTRAINT "results_page_blocks_external_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."results_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "results_page_blocks_notes" ADD CONSTRAINT "results_page_blocks_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."results_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "results_page" ADD CONSTRAINT "results_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "results_page" ADD CONSTRAINT "results_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_page_blocks_rich_text" ADD CONSTRAINT "gallery_page_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_page_blocks_image_grid_images" ADD CONSTRAINT "gallery_page_blocks_image_grid_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_page_blocks_image_grid_images" ADD CONSTRAINT "gallery_page_blocks_image_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery_page_blocks_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_page_blocks_image_grid" ADD CONSTRAINT "gallery_page_blocks_image_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_page_blocks_cta_band" ADD CONSTRAINT "gallery_page_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_page_blocks_stats_items" ADD CONSTRAINT "gallery_page_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery_page_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_page_blocks_stats" ADD CONSTRAINT "gallery_page_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_page_blocks_faq_accordion_items" ADD CONSTRAINT "gallery_page_blocks_faq_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery_page_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_page_blocks_faq_accordion" ADD CONSTRAINT "gallery_page_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_page_blocks_procedure_list" ADD CONSTRAINT "gallery_page_blocks_procedure_list_filter_discipline_id_disciplines_id_fk" FOREIGN KEY ("filter_discipline_id") REFERENCES "public"."disciplines"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_page_blocks_procedure_list" ADD CONSTRAINT "gallery_page_blocks_procedure_list_filter_sub_category_id_sub_categories_id_fk" FOREIGN KEY ("filter_sub_category_id") REFERENCES "public"."sub_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_page_blocks_procedure_list" ADD CONSTRAINT "gallery_page_blocks_procedure_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_page_blocks_surgeon_list" ADD CONSTRAINT "gallery_page_blocks_surgeon_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_page_blocks_ba_grid" ADD CONSTRAINT "gallery_page_blocks_ba_grid_filter_procedure_id_procedures_id_fk" FOREIGN KEY ("filter_procedure_id") REFERENCES "public"."procedures"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_page_blocks_ba_grid" ADD CONSTRAINT "gallery_page_blocks_ba_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_page_blocks_testimonial_list" ADD CONSTRAINT "gallery_page_blocks_testimonial_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_page_blocks_recovery_stay_list" ADD CONSTRAINT "gallery_page_blocks_recovery_stay_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_page_blocks_press_mention_list" ADD CONSTRAINT "gallery_page_blocks_press_mention_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_page_blocks_contact_form" ADD CONSTRAINT "gallery_page_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_page_blocks_journey_step_list" ADD CONSTRAINT "gallery_page_blocks_journey_step_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_page_blocks_external_embed" ADD CONSTRAINT "gallery_page_blocks_external_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_page_blocks_notes" ADD CONSTRAINT "gallery_page_blocks_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_page" ADD CONSTRAINT "gallery_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_page" ADD CONSTRAINT "gallery_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pricing_page_blocks_rich_text" ADD CONSTRAINT "pricing_page_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_page_blocks_image_grid_images" ADD CONSTRAINT "pricing_page_blocks_image_grid_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pricing_page_blocks_image_grid_images" ADD CONSTRAINT "pricing_page_blocks_image_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_page_blocks_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_page_blocks_image_grid" ADD CONSTRAINT "pricing_page_blocks_image_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_page_blocks_cta_band" ADD CONSTRAINT "pricing_page_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_page_blocks_stats_items" ADD CONSTRAINT "pricing_page_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_page_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_page_blocks_stats" ADD CONSTRAINT "pricing_page_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_page_blocks_faq_accordion_items" ADD CONSTRAINT "pricing_page_blocks_faq_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_page_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_page_blocks_faq_accordion" ADD CONSTRAINT "pricing_page_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_page_blocks_procedure_list" ADD CONSTRAINT "pricing_page_blocks_procedure_list_filter_discipline_id_disciplines_id_fk" FOREIGN KEY ("filter_discipline_id") REFERENCES "public"."disciplines"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pricing_page_blocks_procedure_list" ADD CONSTRAINT "pricing_page_blocks_procedure_list_filter_sub_category_id_sub_categories_id_fk" FOREIGN KEY ("filter_sub_category_id") REFERENCES "public"."sub_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pricing_page_blocks_procedure_list" ADD CONSTRAINT "pricing_page_blocks_procedure_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_page_blocks_surgeon_list" ADD CONSTRAINT "pricing_page_blocks_surgeon_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_page_blocks_ba_grid" ADD CONSTRAINT "pricing_page_blocks_ba_grid_filter_procedure_id_procedures_id_fk" FOREIGN KEY ("filter_procedure_id") REFERENCES "public"."procedures"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pricing_page_blocks_ba_grid" ADD CONSTRAINT "pricing_page_blocks_ba_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_page_blocks_testimonial_list" ADD CONSTRAINT "pricing_page_blocks_testimonial_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_page_blocks_recovery_stay_list" ADD CONSTRAINT "pricing_page_blocks_recovery_stay_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_page_blocks_press_mention_list" ADD CONSTRAINT "pricing_page_blocks_press_mention_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_page_blocks_contact_form" ADD CONSTRAINT "pricing_page_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_page_blocks_journey_step_list" ADD CONSTRAINT "pricing_page_blocks_journey_step_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_page_blocks_external_embed" ADD CONSTRAINT "pricing_page_blocks_external_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_page_blocks_notes" ADD CONSTRAINT "pricing_page_blocks_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_page" ADD CONSTRAINT "pricing_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pricing_page" ADD CONSTRAINT "pricing_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "journey_page_blocks_rich_text" ADD CONSTRAINT "journey_page_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journey_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journey_page_blocks_image_grid_images" ADD CONSTRAINT "journey_page_blocks_image_grid_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "journey_page_blocks_image_grid_images" ADD CONSTRAINT "journey_page_blocks_image_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journey_page_blocks_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journey_page_blocks_image_grid" ADD CONSTRAINT "journey_page_blocks_image_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journey_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journey_page_blocks_cta_band" ADD CONSTRAINT "journey_page_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journey_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journey_page_blocks_stats_items" ADD CONSTRAINT "journey_page_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journey_page_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journey_page_blocks_stats" ADD CONSTRAINT "journey_page_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journey_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journey_page_blocks_faq_accordion_items" ADD CONSTRAINT "journey_page_blocks_faq_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journey_page_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journey_page_blocks_faq_accordion" ADD CONSTRAINT "journey_page_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journey_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journey_page_blocks_procedure_list" ADD CONSTRAINT "journey_page_blocks_procedure_list_filter_discipline_id_disciplines_id_fk" FOREIGN KEY ("filter_discipline_id") REFERENCES "public"."disciplines"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "journey_page_blocks_procedure_list" ADD CONSTRAINT "journey_page_blocks_procedure_list_filter_sub_category_id_sub_categories_id_fk" FOREIGN KEY ("filter_sub_category_id") REFERENCES "public"."sub_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "journey_page_blocks_procedure_list" ADD CONSTRAINT "journey_page_blocks_procedure_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journey_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journey_page_blocks_surgeon_list" ADD CONSTRAINT "journey_page_blocks_surgeon_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journey_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journey_page_blocks_ba_grid" ADD CONSTRAINT "journey_page_blocks_ba_grid_filter_procedure_id_procedures_id_fk" FOREIGN KEY ("filter_procedure_id") REFERENCES "public"."procedures"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "journey_page_blocks_ba_grid" ADD CONSTRAINT "journey_page_blocks_ba_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journey_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journey_page_blocks_testimonial_list" ADD CONSTRAINT "journey_page_blocks_testimonial_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journey_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journey_page_blocks_recovery_stay_list" ADD CONSTRAINT "journey_page_blocks_recovery_stay_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journey_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journey_page_blocks_press_mention_list" ADD CONSTRAINT "journey_page_blocks_press_mention_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journey_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journey_page_blocks_contact_form" ADD CONSTRAINT "journey_page_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journey_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journey_page_blocks_journey_step_list" ADD CONSTRAINT "journey_page_blocks_journey_step_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journey_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journey_page_blocks_external_embed" ADD CONSTRAINT "journey_page_blocks_external_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journey_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journey_page_blocks_notes" ADD CONSTRAINT "journey_page_blocks_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journey_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journey_page" ADD CONSTRAINT "journey_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "journey_page" ADD CONSTRAINT "journey_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories_page_blocks_rich_text" ADD CONSTRAINT "stories_page_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_page_blocks_image_grid_images" ADD CONSTRAINT "stories_page_blocks_image_grid_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories_page_blocks_image_grid_images" ADD CONSTRAINT "stories_page_blocks_image_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories_page_blocks_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_page_blocks_image_grid" ADD CONSTRAINT "stories_page_blocks_image_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_page_blocks_cta_band" ADD CONSTRAINT "stories_page_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_page_blocks_stats_items" ADD CONSTRAINT "stories_page_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories_page_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_page_blocks_stats" ADD CONSTRAINT "stories_page_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_page_blocks_faq_accordion_items" ADD CONSTRAINT "stories_page_blocks_faq_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories_page_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_page_blocks_faq_accordion" ADD CONSTRAINT "stories_page_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_page_blocks_procedure_list" ADD CONSTRAINT "stories_page_blocks_procedure_list_filter_discipline_id_disciplines_id_fk" FOREIGN KEY ("filter_discipline_id") REFERENCES "public"."disciplines"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories_page_blocks_procedure_list" ADD CONSTRAINT "stories_page_blocks_procedure_list_filter_sub_category_id_sub_categories_id_fk" FOREIGN KEY ("filter_sub_category_id") REFERENCES "public"."sub_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories_page_blocks_procedure_list" ADD CONSTRAINT "stories_page_blocks_procedure_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_page_blocks_surgeon_list" ADD CONSTRAINT "stories_page_blocks_surgeon_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_page_blocks_ba_grid" ADD CONSTRAINT "stories_page_blocks_ba_grid_filter_procedure_id_procedures_id_fk" FOREIGN KEY ("filter_procedure_id") REFERENCES "public"."procedures"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories_page_blocks_ba_grid" ADD CONSTRAINT "stories_page_blocks_ba_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_page_blocks_testimonial_list" ADD CONSTRAINT "stories_page_blocks_testimonial_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_page_blocks_recovery_stay_list" ADD CONSTRAINT "stories_page_blocks_recovery_stay_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_page_blocks_press_mention_list" ADD CONSTRAINT "stories_page_blocks_press_mention_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_page_blocks_contact_form" ADD CONSTRAINT "stories_page_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_page_blocks_journey_step_list" ADD CONSTRAINT "stories_page_blocks_journey_step_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_page_blocks_external_embed" ADD CONSTRAINT "stories_page_blocks_external_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_page_blocks_notes" ADD CONSTRAINT "stories_page_blocks_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_page" ADD CONSTRAINT "stories_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories_page" ADD CONSTRAINT "stories_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "rec_stays_pg_blocks_rich_text" ADD CONSTRAINT "rec_stays_pg_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rec_stays_pg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rec_stays_pg_blocks_image_grid_images" ADD CONSTRAINT "rec_stays_pg_blocks_image_grid_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "rec_stays_pg_blocks_image_grid_images" ADD CONSTRAINT "rec_stays_pg_blocks_image_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rec_stays_pg_blocks_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rec_stays_pg_blocks_image_grid" ADD CONSTRAINT "rec_stays_pg_blocks_image_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rec_stays_pg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rec_stays_pg_blocks_cta_band" ADD CONSTRAINT "rec_stays_pg_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rec_stays_pg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rec_stays_pg_blocks_stats_items" ADD CONSTRAINT "rec_stays_pg_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rec_stays_pg_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rec_stays_pg_blocks_stats" ADD CONSTRAINT "rec_stays_pg_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rec_stays_pg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rec_stays_pg_blocks_faq_accordion_items" ADD CONSTRAINT "rec_stays_pg_blocks_faq_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rec_stays_pg_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rec_stays_pg_blocks_faq_accordion" ADD CONSTRAINT "rec_stays_pg_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rec_stays_pg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rec_stays_pg_blocks_procedure_list" ADD CONSTRAINT "rec_stays_pg_blocks_procedure_list_filter_discipline_id_disciplines_id_fk" FOREIGN KEY ("filter_discipline_id") REFERENCES "public"."disciplines"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "rec_stays_pg_blocks_procedure_list" ADD CONSTRAINT "rec_stays_pg_blocks_procedure_list_filter_sub_category_id_sub_categories_id_fk" FOREIGN KEY ("filter_sub_category_id") REFERENCES "public"."sub_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "rec_stays_pg_blocks_procedure_list" ADD CONSTRAINT "rec_stays_pg_blocks_procedure_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rec_stays_pg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rec_stays_pg_blocks_surgeon_list" ADD CONSTRAINT "rec_stays_pg_blocks_surgeon_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rec_stays_pg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rec_stays_pg_blocks_ba_grid" ADD CONSTRAINT "rec_stays_pg_blocks_ba_grid_filter_procedure_id_procedures_id_fk" FOREIGN KEY ("filter_procedure_id") REFERENCES "public"."procedures"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "rec_stays_pg_blocks_ba_grid" ADD CONSTRAINT "rec_stays_pg_blocks_ba_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rec_stays_pg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rec_stays_pg_blocks_testimonial_list" ADD CONSTRAINT "rec_stays_pg_blocks_testimonial_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rec_stays_pg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rec_stays_pg_blocks_recovery_stay_list" ADD CONSTRAINT "rec_stays_pg_blocks_recovery_stay_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rec_stays_pg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rec_stays_pg_blocks_press_mention_list" ADD CONSTRAINT "rec_stays_pg_blocks_press_mention_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rec_stays_pg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rec_stays_pg_blocks_contact_form" ADD CONSTRAINT "rec_stays_pg_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rec_stays_pg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rec_stays_pg_blocks_journey_step_list" ADD CONSTRAINT "rec_stays_pg_blocks_journey_step_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rec_stays_pg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rec_stays_pg_blocks_external_embed" ADD CONSTRAINT "rec_stays_pg_blocks_external_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rec_stays_pg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rec_stays_pg_blocks_notes" ADD CONSTRAINT "rec_stays_pg_blocks_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rec_stays_pg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rec_stays_pg" ADD CONSTRAINT "rec_stays_pg_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "rec_stays_pg" ADD CONSTRAINT "rec_stays_pg_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_rich_text" ADD CONSTRAINT "contact_page_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_image_grid_images" ADD CONSTRAINT "contact_page_blocks_image_grid_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_image_grid_images" ADD CONSTRAINT "contact_page_blocks_image_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_blocks_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_image_grid" ADD CONSTRAINT "contact_page_blocks_image_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_cta_band" ADD CONSTRAINT "contact_page_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_stats_items" ADD CONSTRAINT "contact_page_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_stats" ADD CONSTRAINT "contact_page_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_faq_accordion_items" ADD CONSTRAINT "contact_page_blocks_faq_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_faq_accordion" ADD CONSTRAINT "contact_page_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_procedure_list" ADD CONSTRAINT "contact_page_blocks_procedure_list_filter_discipline_id_disciplines_id_fk" FOREIGN KEY ("filter_discipline_id") REFERENCES "public"."disciplines"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_procedure_list" ADD CONSTRAINT "contact_page_blocks_procedure_list_filter_sub_category_id_sub_categories_id_fk" FOREIGN KEY ("filter_sub_category_id") REFERENCES "public"."sub_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_procedure_list" ADD CONSTRAINT "contact_page_blocks_procedure_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_surgeon_list" ADD CONSTRAINT "contact_page_blocks_surgeon_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_ba_grid" ADD CONSTRAINT "contact_page_blocks_ba_grid_filter_procedure_id_procedures_id_fk" FOREIGN KEY ("filter_procedure_id") REFERENCES "public"."procedures"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_ba_grid" ADD CONSTRAINT "contact_page_blocks_ba_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_testimonial_list" ADD CONSTRAINT "contact_page_blocks_testimonial_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_recovery_stay_list" ADD CONSTRAINT "contact_page_blocks_recovery_stay_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_press_mention_list" ADD CONSTRAINT "contact_page_blocks_press_mention_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_contact_form" ADD CONSTRAINT "contact_page_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_journey_step_list" ADD CONSTRAINT "contact_page_blocks_journey_step_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_external_embed" ADD CONSTRAINT "contact_page_blocks_external_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_notes" ADD CONSTRAINT "contact_page_blocks_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vid_consult_pg_blocks_rich_text" ADD CONSTRAINT "vid_consult_pg_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vid_consult_pg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vid_consult_pg_blocks_image_grid_images" ADD CONSTRAINT "vid_consult_pg_blocks_image_grid_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vid_consult_pg_blocks_image_grid_images" ADD CONSTRAINT "vid_consult_pg_blocks_image_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vid_consult_pg_blocks_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vid_consult_pg_blocks_image_grid" ADD CONSTRAINT "vid_consult_pg_blocks_image_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vid_consult_pg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vid_consult_pg_blocks_cta_band" ADD CONSTRAINT "vid_consult_pg_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vid_consult_pg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vid_consult_pg_blocks_stats_items" ADD CONSTRAINT "vid_consult_pg_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vid_consult_pg_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vid_consult_pg_blocks_stats" ADD CONSTRAINT "vid_consult_pg_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vid_consult_pg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vid_consult_pg_blocks_faq_accordion_items" ADD CONSTRAINT "vid_consult_pg_blocks_faq_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vid_consult_pg_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vid_consult_pg_blocks_faq_accordion" ADD CONSTRAINT "vid_consult_pg_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vid_consult_pg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vid_consult_pg_blocks_procedure_list" ADD CONSTRAINT "vid_consult_pg_blocks_procedure_list_filter_discipline_id_disciplines_id_fk" FOREIGN KEY ("filter_discipline_id") REFERENCES "public"."disciplines"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vid_consult_pg_blocks_procedure_list" ADD CONSTRAINT "vid_consult_pg_blocks_procedure_list_filter_sub_category_id_sub_categories_id_fk" FOREIGN KEY ("filter_sub_category_id") REFERENCES "public"."sub_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vid_consult_pg_blocks_procedure_list" ADD CONSTRAINT "vid_consult_pg_blocks_procedure_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vid_consult_pg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vid_consult_pg_blocks_surgeon_list" ADD CONSTRAINT "vid_consult_pg_blocks_surgeon_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vid_consult_pg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vid_consult_pg_blocks_ba_grid" ADD CONSTRAINT "vid_consult_pg_blocks_ba_grid_filter_procedure_id_procedures_id_fk" FOREIGN KEY ("filter_procedure_id") REFERENCES "public"."procedures"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vid_consult_pg_blocks_ba_grid" ADD CONSTRAINT "vid_consult_pg_blocks_ba_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vid_consult_pg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vid_consult_pg_blocks_testimonial_list" ADD CONSTRAINT "vid_consult_pg_blocks_testimonial_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vid_consult_pg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vid_consult_pg_blocks_recovery_stay_list" ADD CONSTRAINT "vid_consult_pg_blocks_recovery_stay_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vid_consult_pg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vid_consult_pg_blocks_press_mention_list" ADD CONSTRAINT "vid_consult_pg_blocks_press_mention_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vid_consult_pg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vid_consult_pg_blocks_contact_form" ADD CONSTRAINT "vid_consult_pg_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vid_consult_pg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vid_consult_pg_blocks_journey_step_list" ADD CONSTRAINT "vid_consult_pg_blocks_journey_step_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vid_consult_pg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vid_consult_pg_blocks_external_embed" ADD CONSTRAINT "vid_consult_pg_blocks_external_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vid_consult_pg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vid_consult_pg_blocks_notes" ADD CONSTRAINT "vid_consult_pg_blocks_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vid_consult_pg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vid_consult_pg" ADD CONSTRAINT "vid_consult_pg_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vid_consult_pg" ADD CONSTRAINT "vid_consult_pg_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_page_blocks_rich_text" ADD CONSTRAINT "blog_page_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_page_blocks_image_grid_images" ADD CONSTRAINT "blog_page_blocks_image_grid_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_page_blocks_image_grid_images" ADD CONSTRAINT "blog_page_blocks_image_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page_blocks_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_page_blocks_image_grid" ADD CONSTRAINT "blog_page_blocks_image_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_page_blocks_cta_band" ADD CONSTRAINT "blog_page_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_page_blocks_stats_items" ADD CONSTRAINT "blog_page_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_page_blocks_stats" ADD CONSTRAINT "blog_page_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_page_blocks_faq_accordion_items" ADD CONSTRAINT "blog_page_blocks_faq_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_page_blocks_faq_accordion" ADD CONSTRAINT "blog_page_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_page_blocks_procedure_list" ADD CONSTRAINT "blog_page_blocks_procedure_list_filter_discipline_id_disciplines_id_fk" FOREIGN KEY ("filter_discipline_id") REFERENCES "public"."disciplines"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_page_blocks_procedure_list" ADD CONSTRAINT "blog_page_blocks_procedure_list_filter_sub_category_id_sub_categories_id_fk" FOREIGN KEY ("filter_sub_category_id") REFERENCES "public"."sub_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_page_blocks_procedure_list" ADD CONSTRAINT "blog_page_blocks_procedure_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_page_blocks_surgeon_list" ADD CONSTRAINT "blog_page_blocks_surgeon_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_page_blocks_ba_grid" ADD CONSTRAINT "blog_page_blocks_ba_grid_filter_procedure_id_procedures_id_fk" FOREIGN KEY ("filter_procedure_id") REFERENCES "public"."procedures"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_page_blocks_ba_grid" ADD CONSTRAINT "blog_page_blocks_ba_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_page_blocks_testimonial_list" ADD CONSTRAINT "blog_page_blocks_testimonial_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_page_blocks_recovery_stay_list" ADD CONSTRAINT "blog_page_blocks_recovery_stay_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_page_blocks_press_mention_list" ADD CONSTRAINT "blog_page_blocks_press_mention_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_page_blocks_contact_form" ADD CONSTRAINT "blog_page_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_page_blocks_journey_step_list" ADD CONSTRAINT "blog_page_blocks_journey_step_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_page_blocks_external_embed" ADD CONSTRAINT "blog_page_blocks_external_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_page_blocks_notes" ADD CONSTRAINT "blog_page_blocks_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_page" ADD CONSTRAINT "blog_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_page" ADD CONSTRAINT "blog_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "payload_folders_folder_type_order_idx" ON "payload_folders_folder_type" USING btree ("order");
  CREATE INDEX "payload_folders_folder_type_parent_idx" ON "payload_folders_folder_type" USING btree ("parent_id");
  CREATE INDEX "payload_folders_name_idx" ON "payload_folders" USING btree ("name");
  CREATE INDEX "payload_folders_folder_idx" ON "payload_folders" USING btree ("folder_id");
  CREATE INDEX "payload_folders_updated_at_idx" ON "payload_folders" USING btree ("updated_at");
  CREATE INDEX "payload_folders_created_at_idx" ON "payload_folders" USING btree ("created_at");
  CREATE INDEX "home_page_blocks_rich_text_order_idx" ON "home_page_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "home_page_blocks_rich_text_parent_id_idx" ON "home_page_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_rich_text_path_idx" ON "home_page_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "home_page_blocks_image_grid_images_order_idx" ON "home_page_blocks_image_grid_images" USING btree ("_order");
  CREATE INDEX "home_page_blocks_image_grid_images_parent_id_idx" ON "home_page_blocks_image_grid_images" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_image_grid_images_image_idx" ON "home_page_blocks_image_grid_images" USING btree ("image_id");
  CREATE INDEX "home_page_blocks_image_grid_order_idx" ON "home_page_blocks_image_grid" USING btree ("_order");
  CREATE INDEX "home_page_blocks_image_grid_parent_id_idx" ON "home_page_blocks_image_grid" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_image_grid_path_idx" ON "home_page_blocks_image_grid" USING btree ("_path");
  CREATE INDEX "home_page_blocks_cta_band_order_idx" ON "home_page_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "home_page_blocks_cta_band_parent_id_idx" ON "home_page_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_cta_band_path_idx" ON "home_page_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "home_page_blocks_stats_items_order_idx" ON "home_page_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "home_page_blocks_stats_items_parent_id_idx" ON "home_page_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_stats_order_idx" ON "home_page_blocks_stats" USING btree ("_order");
  CREATE INDEX "home_page_blocks_stats_parent_id_idx" ON "home_page_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_stats_path_idx" ON "home_page_blocks_stats" USING btree ("_path");
  CREATE INDEX "home_page_blocks_faq_accordion_items_order_idx" ON "home_page_blocks_faq_accordion_items" USING btree ("_order");
  CREATE INDEX "home_page_blocks_faq_accordion_items_parent_id_idx" ON "home_page_blocks_faq_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_faq_accordion_order_idx" ON "home_page_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "home_page_blocks_faq_accordion_parent_id_idx" ON "home_page_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_faq_accordion_path_idx" ON "home_page_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "home_page_blocks_procedure_list_order_idx" ON "home_page_blocks_procedure_list" USING btree ("_order");
  CREATE INDEX "home_page_blocks_procedure_list_parent_id_idx" ON "home_page_blocks_procedure_list" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_procedure_list_path_idx" ON "home_page_blocks_procedure_list" USING btree ("_path");
  CREATE INDEX "home_page_blocks_procedure_list_filter_discipline_idx" ON "home_page_blocks_procedure_list" USING btree ("filter_discipline_id");
  CREATE INDEX "home_page_blocks_procedure_list_filter_sub_category_idx" ON "home_page_blocks_procedure_list" USING btree ("filter_sub_category_id");
  CREATE INDEX "home_page_blocks_surgeon_list_order_idx" ON "home_page_blocks_surgeon_list" USING btree ("_order");
  CREATE INDEX "home_page_blocks_surgeon_list_parent_id_idx" ON "home_page_blocks_surgeon_list" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_surgeon_list_path_idx" ON "home_page_blocks_surgeon_list" USING btree ("_path");
  CREATE INDEX "home_page_blocks_ba_grid_order_idx" ON "home_page_blocks_ba_grid" USING btree ("_order");
  CREATE INDEX "home_page_blocks_ba_grid_parent_id_idx" ON "home_page_blocks_ba_grid" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_ba_grid_path_idx" ON "home_page_blocks_ba_grid" USING btree ("_path");
  CREATE INDEX "home_page_blocks_ba_grid_filter_procedure_idx" ON "home_page_blocks_ba_grid" USING btree ("filter_procedure_id");
  CREATE INDEX "home_page_blocks_testimonial_list_order_idx" ON "home_page_blocks_testimonial_list" USING btree ("_order");
  CREATE INDEX "home_page_blocks_testimonial_list_parent_id_idx" ON "home_page_blocks_testimonial_list" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_testimonial_list_path_idx" ON "home_page_blocks_testimonial_list" USING btree ("_path");
  CREATE INDEX "home_page_blocks_recovery_stay_list_order_idx" ON "home_page_blocks_recovery_stay_list" USING btree ("_order");
  CREATE INDEX "home_page_blocks_recovery_stay_list_parent_id_idx" ON "home_page_blocks_recovery_stay_list" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_recovery_stay_list_path_idx" ON "home_page_blocks_recovery_stay_list" USING btree ("_path");
  CREATE INDEX "home_page_blocks_press_mention_list_order_idx" ON "home_page_blocks_press_mention_list" USING btree ("_order");
  CREATE INDEX "home_page_blocks_press_mention_list_parent_id_idx" ON "home_page_blocks_press_mention_list" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_press_mention_list_path_idx" ON "home_page_blocks_press_mention_list" USING btree ("_path");
  CREATE INDEX "home_page_blocks_contact_form_order_idx" ON "home_page_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "home_page_blocks_contact_form_parent_id_idx" ON "home_page_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_contact_form_path_idx" ON "home_page_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "home_page_blocks_journey_step_list_order_idx" ON "home_page_blocks_journey_step_list" USING btree ("_order");
  CREATE INDEX "home_page_blocks_journey_step_list_parent_id_idx" ON "home_page_blocks_journey_step_list" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_journey_step_list_path_idx" ON "home_page_blocks_journey_step_list" USING btree ("_path");
  CREATE INDEX "home_page_blocks_external_embed_order_idx" ON "home_page_blocks_external_embed" USING btree ("_order");
  CREATE INDEX "home_page_blocks_external_embed_parent_id_idx" ON "home_page_blocks_external_embed" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_external_embed_path_idx" ON "home_page_blocks_external_embed" USING btree ("_path");
  CREATE INDEX "home_page_blocks_notes_order_idx" ON "home_page_blocks_notes" USING btree ("_order");
  CREATE INDEX "home_page_blocks_notes_parent_id_idx" ON "home_page_blocks_notes" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_notes_path_idx" ON "home_page_blocks_notes" USING btree ("_path");
  CREATE INDEX "home_page_hero_image_idx" ON "home_page" USING btree ("hero_image_id");
  CREATE INDEX "home_page_seo_seo_og_image_idx" ON "home_page" USING btree ("seo_og_image_id");
  CREATE INDEX "press_page_blocks_rich_text_order_idx" ON "press_page_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "press_page_blocks_rich_text_parent_id_idx" ON "press_page_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "press_page_blocks_rich_text_path_idx" ON "press_page_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "press_page_blocks_image_grid_images_order_idx" ON "press_page_blocks_image_grid_images" USING btree ("_order");
  CREATE INDEX "press_page_blocks_image_grid_images_parent_id_idx" ON "press_page_blocks_image_grid_images" USING btree ("_parent_id");
  CREATE INDEX "press_page_blocks_image_grid_images_image_idx" ON "press_page_blocks_image_grid_images" USING btree ("image_id");
  CREATE INDEX "press_page_blocks_image_grid_order_idx" ON "press_page_blocks_image_grid" USING btree ("_order");
  CREATE INDEX "press_page_blocks_image_grid_parent_id_idx" ON "press_page_blocks_image_grid" USING btree ("_parent_id");
  CREATE INDEX "press_page_blocks_image_grid_path_idx" ON "press_page_blocks_image_grid" USING btree ("_path");
  CREATE INDEX "press_page_blocks_cta_band_order_idx" ON "press_page_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "press_page_blocks_cta_band_parent_id_idx" ON "press_page_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "press_page_blocks_cta_band_path_idx" ON "press_page_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "press_page_blocks_stats_items_order_idx" ON "press_page_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "press_page_blocks_stats_items_parent_id_idx" ON "press_page_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "press_page_blocks_stats_order_idx" ON "press_page_blocks_stats" USING btree ("_order");
  CREATE INDEX "press_page_blocks_stats_parent_id_idx" ON "press_page_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "press_page_blocks_stats_path_idx" ON "press_page_blocks_stats" USING btree ("_path");
  CREATE INDEX "press_page_blocks_faq_accordion_items_order_idx" ON "press_page_blocks_faq_accordion_items" USING btree ("_order");
  CREATE INDEX "press_page_blocks_faq_accordion_items_parent_id_idx" ON "press_page_blocks_faq_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "press_page_blocks_faq_accordion_order_idx" ON "press_page_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "press_page_blocks_faq_accordion_parent_id_idx" ON "press_page_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "press_page_blocks_faq_accordion_path_idx" ON "press_page_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "press_page_blocks_procedure_list_order_idx" ON "press_page_blocks_procedure_list" USING btree ("_order");
  CREATE INDEX "press_page_blocks_procedure_list_parent_id_idx" ON "press_page_blocks_procedure_list" USING btree ("_parent_id");
  CREATE INDEX "press_page_blocks_procedure_list_path_idx" ON "press_page_blocks_procedure_list" USING btree ("_path");
  CREATE INDEX "press_page_blocks_procedure_list_filter_discipline_idx" ON "press_page_blocks_procedure_list" USING btree ("filter_discipline_id");
  CREATE INDEX "press_page_blocks_procedure_list_filter_sub_category_idx" ON "press_page_blocks_procedure_list" USING btree ("filter_sub_category_id");
  CREATE INDEX "press_page_blocks_surgeon_list_order_idx" ON "press_page_blocks_surgeon_list" USING btree ("_order");
  CREATE INDEX "press_page_blocks_surgeon_list_parent_id_idx" ON "press_page_blocks_surgeon_list" USING btree ("_parent_id");
  CREATE INDEX "press_page_blocks_surgeon_list_path_idx" ON "press_page_blocks_surgeon_list" USING btree ("_path");
  CREATE INDEX "press_page_blocks_ba_grid_order_idx" ON "press_page_blocks_ba_grid" USING btree ("_order");
  CREATE INDEX "press_page_blocks_ba_grid_parent_id_idx" ON "press_page_blocks_ba_grid" USING btree ("_parent_id");
  CREATE INDEX "press_page_blocks_ba_grid_path_idx" ON "press_page_blocks_ba_grid" USING btree ("_path");
  CREATE INDEX "press_page_blocks_ba_grid_filter_procedure_idx" ON "press_page_blocks_ba_grid" USING btree ("filter_procedure_id");
  CREATE INDEX "press_page_blocks_testimonial_list_order_idx" ON "press_page_blocks_testimonial_list" USING btree ("_order");
  CREATE INDEX "press_page_blocks_testimonial_list_parent_id_idx" ON "press_page_blocks_testimonial_list" USING btree ("_parent_id");
  CREATE INDEX "press_page_blocks_testimonial_list_path_idx" ON "press_page_blocks_testimonial_list" USING btree ("_path");
  CREATE INDEX "press_page_blocks_recovery_stay_list_order_idx" ON "press_page_blocks_recovery_stay_list" USING btree ("_order");
  CREATE INDEX "press_page_blocks_recovery_stay_list_parent_id_idx" ON "press_page_blocks_recovery_stay_list" USING btree ("_parent_id");
  CREATE INDEX "press_page_blocks_recovery_stay_list_path_idx" ON "press_page_blocks_recovery_stay_list" USING btree ("_path");
  CREATE INDEX "press_page_blocks_press_mention_list_order_idx" ON "press_page_blocks_press_mention_list" USING btree ("_order");
  CREATE INDEX "press_page_blocks_press_mention_list_parent_id_idx" ON "press_page_blocks_press_mention_list" USING btree ("_parent_id");
  CREATE INDEX "press_page_blocks_press_mention_list_path_idx" ON "press_page_blocks_press_mention_list" USING btree ("_path");
  CREATE INDEX "press_page_blocks_contact_form_order_idx" ON "press_page_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "press_page_blocks_contact_form_parent_id_idx" ON "press_page_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "press_page_blocks_contact_form_path_idx" ON "press_page_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "press_page_blocks_journey_step_list_order_idx" ON "press_page_blocks_journey_step_list" USING btree ("_order");
  CREATE INDEX "press_page_blocks_journey_step_list_parent_id_idx" ON "press_page_blocks_journey_step_list" USING btree ("_parent_id");
  CREATE INDEX "press_page_blocks_journey_step_list_path_idx" ON "press_page_blocks_journey_step_list" USING btree ("_path");
  CREATE INDEX "press_page_blocks_external_embed_order_idx" ON "press_page_blocks_external_embed" USING btree ("_order");
  CREATE INDEX "press_page_blocks_external_embed_parent_id_idx" ON "press_page_blocks_external_embed" USING btree ("_parent_id");
  CREATE INDEX "press_page_blocks_external_embed_path_idx" ON "press_page_blocks_external_embed" USING btree ("_path");
  CREATE INDEX "press_page_blocks_notes_order_idx" ON "press_page_blocks_notes" USING btree ("_order");
  CREATE INDEX "press_page_blocks_notes_parent_id_idx" ON "press_page_blocks_notes" USING btree ("_parent_id");
  CREATE INDEX "press_page_blocks_notes_path_idx" ON "press_page_blocks_notes" USING btree ("_path");
  CREATE INDEX "press_page_hero_image_idx" ON "press_page" USING btree ("hero_image_id");
  CREATE INDEX "press_page_seo_seo_og_image_idx" ON "press_page" USING btree ("seo_og_image_id");
  CREATE INDEX "privacy_page_blocks_rich_text_order_idx" ON "privacy_page_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "privacy_page_blocks_rich_text_parent_id_idx" ON "privacy_page_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "privacy_page_blocks_rich_text_path_idx" ON "privacy_page_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "privacy_page_blocks_image_grid_images_order_idx" ON "privacy_page_blocks_image_grid_images" USING btree ("_order");
  CREATE INDEX "privacy_page_blocks_image_grid_images_parent_id_idx" ON "privacy_page_blocks_image_grid_images" USING btree ("_parent_id");
  CREATE INDEX "privacy_page_blocks_image_grid_images_image_idx" ON "privacy_page_blocks_image_grid_images" USING btree ("image_id");
  CREATE INDEX "privacy_page_blocks_image_grid_order_idx" ON "privacy_page_blocks_image_grid" USING btree ("_order");
  CREATE INDEX "privacy_page_blocks_image_grid_parent_id_idx" ON "privacy_page_blocks_image_grid" USING btree ("_parent_id");
  CREATE INDEX "privacy_page_blocks_image_grid_path_idx" ON "privacy_page_blocks_image_grid" USING btree ("_path");
  CREATE INDEX "privacy_page_blocks_cta_band_order_idx" ON "privacy_page_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "privacy_page_blocks_cta_band_parent_id_idx" ON "privacy_page_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "privacy_page_blocks_cta_band_path_idx" ON "privacy_page_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "privacy_page_blocks_stats_items_order_idx" ON "privacy_page_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "privacy_page_blocks_stats_items_parent_id_idx" ON "privacy_page_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "privacy_page_blocks_stats_order_idx" ON "privacy_page_blocks_stats" USING btree ("_order");
  CREATE INDEX "privacy_page_blocks_stats_parent_id_idx" ON "privacy_page_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "privacy_page_blocks_stats_path_idx" ON "privacy_page_blocks_stats" USING btree ("_path");
  CREATE INDEX "privacy_page_blocks_faq_accordion_items_order_idx" ON "privacy_page_blocks_faq_accordion_items" USING btree ("_order");
  CREATE INDEX "privacy_page_blocks_faq_accordion_items_parent_id_idx" ON "privacy_page_blocks_faq_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "privacy_page_blocks_faq_accordion_order_idx" ON "privacy_page_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "privacy_page_blocks_faq_accordion_parent_id_idx" ON "privacy_page_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "privacy_page_blocks_faq_accordion_path_idx" ON "privacy_page_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "privacy_page_blocks_procedure_list_order_idx" ON "privacy_page_blocks_procedure_list" USING btree ("_order");
  CREATE INDEX "privacy_page_blocks_procedure_list_parent_id_idx" ON "privacy_page_blocks_procedure_list" USING btree ("_parent_id");
  CREATE INDEX "privacy_page_blocks_procedure_list_path_idx" ON "privacy_page_blocks_procedure_list" USING btree ("_path");
  CREATE INDEX "privacy_page_blocks_procedure_list_filter_discipline_idx" ON "privacy_page_blocks_procedure_list" USING btree ("filter_discipline_id");
  CREATE INDEX "privacy_page_blocks_procedure_list_filter_sub_category_idx" ON "privacy_page_blocks_procedure_list" USING btree ("filter_sub_category_id");
  CREATE INDEX "privacy_page_blocks_surgeon_list_order_idx" ON "privacy_page_blocks_surgeon_list" USING btree ("_order");
  CREATE INDEX "privacy_page_blocks_surgeon_list_parent_id_idx" ON "privacy_page_blocks_surgeon_list" USING btree ("_parent_id");
  CREATE INDEX "privacy_page_blocks_surgeon_list_path_idx" ON "privacy_page_blocks_surgeon_list" USING btree ("_path");
  CREATE INDEX "privacy_page_blocks_ba_grid_order_idx" ON "privacy_page_blocks_ba_grid" USING btree ("_order");
  CREATE INDEX "privacy_page_blocks_ba_grid_parent_id_idx" ON "privacy_page_blocks_ba_grid" USING btree ("_parent_id");
  CREATE INDEX "privacy_page_blocks_ba_grid_path_idx" ON "privacy_page_blocks_ba_grid" USING btree ("_path");
  CREATE INDEX "privacy_page_blocks_ba_grid_filter_procedure_idx" ON "privacy_page_blocks_ba_grid" USING btree ("filter_procedure_id");
  CREATE INDEX "privacy_page_blocks_testimonial_list_order_idx" ON "privacy_page_blocks_testimonial_list" USING btree ("_order");
  CREATE INDEX "privacy_page_blocks_testimonial_list_parent_id_idx" ON "privacy_page_blocks_testimonial_list" USING btree ("_parent_id");
  CREATE INDEX "privacy_page_blocks_testimonial_list_path_idx" ON "privacy_page_blocks_testimonial_list" USING btree ("_path");
  CREATE INDEX "privacy_page_blocks_recovery_stay_list_order_idx" ON "privacy_page_blocks_recovery_stay_list" USING btree ("_order");
  CREATE INDEX "privacy_page_blocks_recovery_stay_list_parent_id_idx" ON "privacy_page_blocks_recovery_stay_list" USING btree ("_parent_id");
  CREATE INDEX "privacy_page_blocks_recovery_stay_list_path_idx" ON "privacy_page_blocks_recovery_stay_list" USING btree ("_path");
  CREATE INDEX "privacy_page_blocks_press_mention_list_order_idx" ON "privacy_page_blocks_press_mention_list" USING btree ("_order");
  CREATE INDEX "privacy_page_blocks_press_mention_list_parent_id_idx" ON "privacy_page_blocks_press_mention_list" USING btree ("_parent_id");
  CREATE INDEX "privacy_page_blocks_press_mention_list_path_idx" ON "privacy_page_blocks_press_mention_list" USING btree ("_path");
  CREATE INDEX "privacy_page_blocks_contact_form_order_idx" ON "privacy_page_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "privacy_page_blocks_contact_form_parent_id_idx" ON "privacy_page_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "privacy_page_blocks_contact_form_path_idx" ON "privacy_page_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "privacy_page_blocks_journey_step_list_order_idx" ON "privacy_page_blocks_journey_step_list" USING btree ("_order");
  CREATE INDEX "privacy_page_blocks_journey_step_list_parent_id_idx" ON "privacy_page_blocks_journey_step_list" USING btree ("_parent_id");
  CREATE INDEX "privacy_page_blocks_journey_step_list_path_idx" ON "privacy_page_blocks_journey_step_list" USING btree ("_path");
  CREATE INDEX "privacy_page_blocks_external_embed_order_idx" ON "privacy_page_blocks_external_embed" USING btree ("_order");
  CREATE INDEX "privacy_page_blocks_external_embed_parent_id_idx" ON "privacy_page_blocks_external_embed" USING btree ("_parent_id");
  CREATE INDEX "privacy_page_blocks_external_embed_path_idx" ON "privacy_page_blocks_external_embed" USING btree ("_path");
  CREATE INDEX "privacy_page_blocks_notes_order_idx" ON "privacy_page_blocks_notes" USING btree ("_order");
  CREATE INDEX "privacy_page_blocks_notes_parent_id_idx" ON "privacy_page_blocks_notes" USING btree ("_parent_id");
  CREATE INDEX "privacy_page_blocks_notes_path_idx" ON "privacy_page_blocks_notes" USING btree ("_path");
  CREATE INDEX "privacy_page_hero_image_idx" ON "privacy_page" USING btree ("hero_image_id");
  CREATE INDEX "privacy_page_seo_seo_og_image_idx" ON "privacy_page" USING btree ("seo_og_image_id");
  CREATE INDEX "treatments_page_blocks_rich_text_order_idx" ON "treatments_page_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "treatments_page_blocks_rich_text_parent_id_idx" ON "treatments_page_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "treatments_page_blocks_rich_text_path_idx" ON "treatments_page_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "treatments_page_blocks_image_grid_images_order_idx" ON "treatments_page_blocks_image_grid_images" USING btree ("_order");
  CREATE INDEX "treatments_page_blocks_image_grid_images_parent_id_idx" ON "treatments_page_blocks_image_grid_images" USING btree ("_parent_id");
  CREATE INDEX "treatments_page_blocks_image_grid_images_image_idx" ON "treatments_page_blocks_image_grid_images" USING btree ("image_id");
  CREATE INDEX "treatments_page_blocks_image_grid_order_idx" ON "treatments_page_blocks_image_grid" USING btree ("_order");
  CREATE INDEX "treatments_page_blocks_image_grid_parent_id_idx" ON "treatments_page_blocks_image_grid" USING btree ("_parent_id");
  CREATE INDEX "treatments_page_blocks_image_grid_path_idx" ON "treatments_page_blocks_image_grid" USING btree ("_path");
  CREATE INDEX "treatments_page_blocks_cta_band_order_idx" ON "treatments_page_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "treatments_page_blocks_cta_band_parent_id_idx" ON "treatments_page_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "treatments_page_blocks_cta_band_path_idx" ON "treatments_page_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "treatments_page_blocks_stats_items_order_idx" ON "treatments_page_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "treatments_page_blocks_stats_items_parent_id_idx" ON "treatments_page_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "treatments_page_blocks_stats_order_idx" ON "treatments_page_blocks_stats" USING btree ("_order");
  CREATE INDEX "treatments_page_blocks_stats_parent_id_idx" ON "treatments_page_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "treatments_page_blocks_stats_path_idx" ON "treatments_page_blocks_stats" USING btree ("_path");
  CREATE INDEX "treatments_page_blocks_faq_accordion_items_order_idx" ON "treatments_page_blocks_faq_accordion_items" USING btree ("_order");
  CREATE INDEX "treatments_page_blocks_faq_accordion_items_parent_id_idx" ON "treatments_page_blocks_faq_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "treatments_page_blocks_faq_accordion_order_idx" ON "treatments_page_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "treatments_page_blocks_faq_accordion_parent_id_idx" ON "treatments_page_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "treatments_page_blocks_faq_accordion_path_idx" ON "treatments_page_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "treatments_page_blocks_procedure_list_order_idx" ON "treatments_page_blocks_procedure_list" USING btree ("_order");
  CREATE INDEX "treatments_page_blocks_procedure_list_parent_id_idx" ON "treatments_page_blocks_procedure_list" USING btree ("_parent_id");
  CREATE INDEX "treatments_page_blocks_procedure_list_path_idx" ON "treatments_page_blocks_procedure_list" USING btree ("_path");
  CREATE INDEX "treatments_page_blocks_procedure_list_filter_discipline_idx" ON "treatments_page_blocks_procedure_list" USING btree ("filter_discipline_id");
  CREATE INDEX "treatments_page_blocks_procedure_list_filter_sub_categor_idx" ON "treatments_page_blocks_procedure_list" USING btree ("filter_sub_category_id");
  CREATE INDEX "treatments_page_blocks_surgeon_list_order_idx" ON "treatments_page_blocks_surgeon_list" USING btree ("_order");
  CREATE INDEX "treatments_page_blocks_surgeon_list_parent_id_idx" ON "treatments_page_blocks_surgeon_list" USING btree ("_parent_id");
  CREATE INDEX "treatments_page_blocks_surgeon_list_path_idx" ON "treatments_page_blocks_surgeon_list" USING btree ("_path");
  CREATE INDEX "treatments_page_blocks_ba_grid_order_idx" ON "treatments_page_blocks_ba_grid" USING btree ("_order");
  CREATE INDEX "treatments_page_blocks_ba_grid_parent_id_idx" ON "treatments_page_blocks_ba_grid" USING btree ("_parent_id");
  CREATE INDEX "treatments_page_blocks_ba_grid_path_idx" ON "treatments_page_blocks_ba_grid" USING btree ("_path");
  CREATE INDEX "treatments_page_blocks_ba_grid_filter_procedure_idx" ON "treatments_page_blocks_ba_grid" USING btree ("filter_procedure_id");
  CREATE INDEX "treatments_page_blocks_testimonial_list_order_idx" ON "treatments_page_blocks_testimonial_list" USING btree ("_order");
  CREATE INDEX "treatments_page_blocks_testimonial_list_parent_id_idx" ON "treatments_page_blocks_testimonial_list" USING btree ("_parent_id");
  CREATE INDEX "treatments_page_blocks_testimonial_list_path_idx" ON "treatments_page_blocks_testimonial_list" USING btree ("_path");
  CREATE INDEX "treatments_page_blocks_recovery_stay_list_order_idx" ON "treatments_page_blocks_recovery_stay_list" USING btree ("_order");
  CREATE INDEX "treatments_page_blocks_recovery_stay_list_parent_id_idx" ON "treatments_page_blocks_recovery_stay_list" USING btree ("_parent_id");
  CREATE INDEX "treatments_page_blocks_recovery_stay_list_path_idx" ON "treatments_page_blocks_recovery_stay_list" USING btree ("_path");
  CREATE INDEX "treatments_page_blocks_press_mention_list_order_idx" ON "treatments_page_blocks_press_mention_list" USING btree ("_order");
  CREATE INDEX "treatments_page_blocks_press_mention_list_parent_id_idx" ON "treatments_page_blocks_press_mention_list" USING btree ("_parent_id");
  CREATE INDEX "treatments_page_blocks_press_mention_list_path_idx" ON "treatments_page_blocks_press_mention_list" USING btree ("_path");
  CREATE INDEX "treatments_page_blocks_contact_form_order_idx" ON "treatments_page_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "treatments_page_blocks_contact_form_parent_id_idx" ON "treatments_page_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "treatments_page_blocks_contact_form_path_idx" ON "treatments_page_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "treatments_page_blocks_journey_step_list_order_idx" ON "treatments_page_blocks_journey_step_list" USING btree ("_order");
  CREATE INDEX "treatments_page_blocks_journey_step_list_parent_id_idx" ON "treatments_page_blocks_journey_step_list" USING btree ("_parent_id");
  CREATE INDEX "treatments_page_blocks_journey_step_list_path_idx" ON "treatments_page_blocks_journey_step_list" USING btree ("_path");
  CREATE INDEX "treatments_page_blocks_external_embed_order_idx" ON "treatments_page_blocks_external_embed" USING btree ("_order");
  CREATE INDEX "treatments_page_blocks_external_embed_parent_id_idx" ON "treatments_page_blocks_external_embed" USING btree ("_parent_id");
  CREATE INDEX "treatments_page_blocks_external_embed_path_idx" ON "treatments_page_blocks_external_embed" USING btree ("_path");
  CREATE INDEX "treatments_page_blocks_notes_order_idx" ON "treatments_page_blocks_notes" USING btree ("_order");
  CREATE INDEX "treatments_page_blocks_notes_parent_id_idx" ON "treatments_page_blocks_notes" USING btree ("_parent_id");
  CREATE INDEX "treatments_page_blocks_notes_path_idx" ON "treatments_page_blocks_notes" USING btree ("_path");
  CREATE INDEX "treatments_page_hero_image_idx" ON "treatments_page" USING btree ("hero_image_id");
  CREATE INDEX "treatments_page_seo_seo_og_image_idx" ON "treatments_page" USING btree ("seo_og_image_id");
  CREATE INDEX "surgeons_page_blocks_rich_text_order_idx" ON "surgeons_page_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "surgeons_page_blocks_rich_text_parent_id_idx" ON "surgeons_page_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "surgeons_page_blocks_rich_text_path_idx" ON "surgeons_page_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "surgeons_page_blocks_image_grid_images_order_idx" ON "surgeons_page_blocks_image_grid_images" USING btree ("_order");
  CREATE INDEX "surgeons_page_blocks_image_grid_images_parent_id_idx" ON "surgeons_page_blocks_image_grid_images" USING btree ("_parent_id");
  CREATE INDEX "surgeons_page_blocks_image_grid_images_image_idx" ON "surgeons_page_blocks_image_grid_images" USING btree ("image_id");
  CREATE INDEX "surgeons_page_blocks_image_grid_order_idx" ON "surgeons_page_blocks_image_grid" USING btree ("_order");
  CREATE INDEX "surgeons_page_blocks_image_grid_parent_id_idx" ON "surgeons_page_blocks_image_grid" USING btree ("_parent_id");
  CREATE INDEX "surgeons_page_blocks_image_grid_path_idx" ON "surgeons_page_blocks_image_grid" USING btree ("_path");
  CREATE INDEX "surgeons_page_blocks_cta_band_order_idx" ON "surgeons_page_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "surgeons_page_blocks_cta_band_parent_id_idx" ON "surgeons_page_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "surgeons_page_blocks_cta_band_path_idx" ON "surgeons_page_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "surgeons_page_blocks_stats_items_order_idx" ON "surgeons_page_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "surgeons_page_blocks_stats_items_parent_id_idx" ON "surgeons_page_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "surgeons_page_blocks_stats_order_idx" ON "surgeons_page_blocks_stats" USING btree ("_order");
  CREATE INDEX "surgeons_page_blocks_stats_parent_id_idx" ON "surgeons_page_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "surgeons_page_blocks_stats_path_idx" ON "surgeons_page_blocks_stats" USING btree ("_path");
  CREATE INDEX "surgeons_page_blocks_faq_accordion_items_order_idx" ON "surgeons_page_blocks_faq_accordion_items" USING btree ("_order");
  CREATE INDEX "surgeons_page_blocks_faq_accordion_items_parent_id_idx" ON "surgeons_page_blocks_faq_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "surgeons_page_blocks_faq_accordion_order_idx" ON "surgeons_page_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "surgeons_page_blocks_faq_accordion_parent_id_idx" ON "surgeons_page_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "surgeons_page_blocks_faq_accordion_path_idx" ON "surgeons_page_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "surgeons_page_blocks_procedure_list_order_idx" ON "surgeons_page_blocks_procedure_list" USING btree ("_order");
  CREATE INDEX "surgeons_page_blocks_procedure_list_parent_id_idx" ON "surgeons_page_blocks_procedure_list" USING btree ("_parent_id");
  CREATE INDEX "surgeons_page_blocks_procedure_list_path_idx" ON "surgeons_page_blocks_procedure_list" USING btree ("_path");
  CREATE INDEX "surgeons_page_blocks_procedure_list_filter_discipline_idx" ON "surgeons_page_blocks_procedure_list" USING btree ("filter_discipline_id");
  CREATE INDEX "surgeons_page_blocks_procedure_list_filter_sub_category_idx" ON "surgeons_page_blocks_procedure_list" USING btree ("filter_sub_category_id");
  CREATE INDEX "surgeons_page_blocks_surgeon_list_order_idx" ON "surgeons_page_blocks_surgeon_list" USING btree ("_order");
  CREATE INDEX "surgeons_page_blocks_surgeon_list_parent_id_idx" ON "surgeons_page_blocks_surgeon_list" USING btree ("_parent_id");
  CREATE INDEX "surgeons_page_blocks_surgeon_list_path_idx" ON "surgeons_page_blocks_surgeon_list" USING btree ("_path");
  CREATE INDEX "surgeons_page_blocks_ba_grid_order_idx" ON "surgeons_page_blocks_ba_grid" USING btree ("_order");
  CREATE INDEX "surgeons_page_blocks_ba_grid_parent_id_idx" ON "surgeons_page_blocks_ba_grid" USING btree ("_parent_id");
  CREATE INDEX "surgeons_page_blocks_ba_grid_path_idx" ON "surgeons_page_blocks_ba_grid" USING btree ("_path");
  CREATE INDEX "surgeons_page_blocks_ba_grid_filter_procedure_idx" ON "surgeons_page_blocks_ba_grid" USING btree ("filter_procedure_id");
  CREATE INDEX "surgeons_page_blocks_testimonial_list_order_idx" ON "surgeons_page_blocks_testimonial_list" USING btree ("_order");
  CREATE INDEX "surgeons_page_blocks_testimonial_list_parent_id_idx" ON "surgeons_page_blocks_testimonial_list" USING btree ("_parent_id");
  CREATE INDEX "surgeons_page_blocks_testimonial_list_path_idx" ON "surgeons_page_blocks_testimonial_list" USING btree ("_path");
  CREATE INDEX "surgeons_page_blocks_recovery_stay_list_order_idx" ON "surgeons_page_blocks_recovery_stay_list" USING btree ("_order");
  CREATE INDEX "surgeons_page_blocks_recovery_stay_list_parent_id_idx" ON "surgeons_page_blocks_recovery_stay_list" USING btree ("_parent_id");
  CREATE INDEX "surgeons_page_blocks_recovery_stay_list_path_idx" ON "surgeons_page_blocks_recovery_stay_list" USING btree ("_path");
  CREATE INDEX "surgeons_page_blocks_press_mention_list_order_idx" ON "surgeons_page_blocks_press_mention_list" USING btree ("_order");
  CREATE INDEX "surgeons_page_blocks_press_mention_list_parent_id_idx" ON "surgeons_page_blocks_press_mention_list" USING btree ("_parent_id");
  CREATE INDEX "surgeons_page_blocks_press_mention_list_path_idx" ON "surgeons_page_blocks_press_mention_list" USING btree ("_path");
  CREATE INDEX "surgeons_page_blocks_contact_form_order_idx" ON "surgeons_page_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "surgeons_page_blocks_contact_form_parent_id_idx" ON "surgeons_page_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "surgeons_page_blocks_contact_form_path_idx" ON "surgeons_page_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "surgeons_page_blocks_journey_step_list_order_idx" ON "surgeons_page_blocks_journey_step_list" USING btree ("_order");
  CREATE INDEX "surgeons_page_blocks_journey_step_list_parent_id_idx" ON "surgeons_page_blocks_journey_step_list" USING btree ("_parent_id");
  CREATE INDEX "surgeons_page_blocks_journey_step_list_path_idx" ON "surgeons_page_blocks_journey_step_list" USING btree ("_path");
  CREATE INDEX "surgeons_page_blocks_external_embed_order_idx" ON "surgeons_page_blocks_external_embed" USING btree ("_order");
  CREATE INDEX "surgeons_page_blocks_external_embed_parent_id_idx" ON "surgeons_page_blocks_external_embed" USING btree ("_parent_id");
  CREATE INDEX "surgeons_page_blocks_external_embed_path_idx" ON "surgeons_page_blocks_external_embed" USING btree ("_path");
  CREATE INDEX "surgeons_page_blocks_notes_order_idx" ON "surgeons_page_blocks_notes" USING btree ("_order");
  CREATE INDEX "surgeons_page_blocks_notes_parent_id_idx" ON "surgeons_page_blocks_notes" USING btree ("_parent_id");
  CREATE INDEX "surgeons_page_blocks_notes_path_idx" ON "surgeons_page_blocks_notes" USING btree ("_path");
  CREATE INDEX "surgeons_page_hero_image_idx" ON "surgeons_page" USING btree ("hero_image_id");
  CREATE INDEX "surgeons_page_seo_seo_og_image_idx" ON "surgeons_page" USING btree ("seo_og_image_id");
  CREATE INDEX "results_page_blocks_rich_text_order_idx" ON "results_page_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "results_page_blocks_rich_text_parent_id_idx" ON "results_page_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "results_page_blocks_rich_text_path_idx" ON "results_page_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "results_page_blocks_image_grid_images_order_idx" ON "results_page_blocks_image_grid_images" USING btree ("_order");
  CREATE INDEX "results_page_blocks_image_grid_images_parent_id_idx" ON "results_page_blocks_image_grid_images" USING btree ("_parent_id");
  CREATE INDEX "results_page_blocks_image_grid_images_image_idx" ON "results_page_blocks_image_grid_images" USING btree ("image_id");
  CREATE INDEX "results_page_blocks_image_grid_order_idx" ON "results_page_blocks_image_grid" USING btree ("_order");
  CREATE INDEX "results_page_blocks_image_grid_parent_id_idx" ON "results_page_blocks_image_grid" USING btree ("_parent_id");
  CREATE INDEX "results_page_blocks_image_grid_path_idx" ON "results_page_blocks_image_grid" USING btree ("_path");
  CREATE INDEX "results_page_blocks_cta_band_order_idx" ON "results_page_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "results_page_blocks_cta_band_parent_id_idx" ON "results_page_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "results_page_blocks_cta_band_path_idx" ON "results_page_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "results_page_blocks_stats_items_order_idx" ON "results_page_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "results_page_blocks_stats_items_parent_id_idx" ON "results_page_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "results_page_blocks_stats_order_idx" ON "results_page_blocks_stats" USING btree ("_order");
  CREATE INDEX "results_page_blocks_stats_parent_id_idx" ON "results_page_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "results_page_blocks_stats_path_idx" ON "results_page_blocks_stats" USING btree ("_path");
  CREATE INDEX "results_page_blocks_faq_accordion_items_order_idx" ON "results_page_blocks_faq_accordion_items" USING btree ("_order");
  CREATE INDEX "results_page_blocks_faq_accordion_items_parent_id_idx" ON "results_page_blocks_faq_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "results_page_blocks_faq_accordion_order_idx" ON "results_page_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "results_page_blocks_faq_accordion_parent_id_idx" ON "results_page_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "results_page_blocks_faq_accordion_path_idx" ON "results_page_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "results_page_blocks_procedure_list_order_idx" ON "results_page_blocks_procedure_list" USING btree ("_order");
  CREATE INDEX "results_page_blocks_procedure_list_parent_id_idx" ON "results_page_blocks_procedure_list" USING btree ("_parent_id");
  CREATE INDEX "results_page_blocks_procedure_list_path_idx" ON "results_page_blocks_procedure_list" USING btree ("_path");
  CREATE INDEX "results_page_blocks_procedure_list_filter_discipline_idx" ON "results_page_blocks_procedure_list" USING btree ("filter_discipline_id");
  CREATE INDEX "results_page_blocks_procedure_list_filter_sub_category_idx" ON "results_page_blocks_procedure_list" USING btree ("filter_sub_category_id");
  CREATE INDEX "results_page_blocks_surgeon_list_order_idx" ON "results_page_blocks_surgeon_list" USING btree ("_order");
  CREATE INDEX "results_page_blocks_surgeon_list_parent_id_idx" ON "results_page_blocks_surgeon_list" USING btree ("_parent_id");
  CREATE INDEX "results_page_blocks_surgeon_list_path_idx" ON "results_page_blocks_surgeon_list" USING btree ("_path");
  CREATE INDEX "results_page_blocks_ba_grid_order_idx" ON "results_page_blocks_ba_grid" USING btree ("_order");
  CREATE INDEX "results_page_blocks_ba_grid_parent_id_idx" ON "results_page_blocks_ba_grid" USING btree ("_parent_id");
  CREATE INDEX "results_page_blocks_ba_grid_path_idx" ON "results_page_blocks_ba_grid" USING btree ("_path");
  CREATE INDEX "results_page_blocks_ba_grid_filter_procedure_idx" ON "results_page_blocks_ba_grid" USING btree ("filter_procedure_id");
  CREATE INDEX "results_page_blocks_testimonial_list_order_idx" ON "results_page_blocks_testimonial_list" USING btree ("_order");
  CREATE INDEX "results_page_blocks_testimonial_list_parent_id_idx" ON "results_page_blocks_testimonial_list" USING btree ("_parent_id");
  CREATE INDEX "results_page_blocks_testimonial_list_path_idx" ON "results_page_blocks_testimonial_list" USING btree ("_path");
  CREATE INDEX "results_page_blocks_recovery_stay_list_order_idx" ON "results_page_blocks_recovery_stay_list" USING btree ("_order");
  CREATE INDEX "results_page_blocks_recovery_stay_list_parent_id_idx" ON "results_page_blocks_recovery_stay_list" USING btree ("_parent_id");
  CREATE INDEX "results_page_blocks_recovery_stay_list_path_idx" ON "results_page_blocks_recovery_stay_list" USING btree ("_path");
  CREATE INDEX "results_page_blocks_press_mention_list_order_idx" ON "results_page_blocks_press_mention_list" USING btree ("_order");
  CREATE INDEX "results_page_blocks_press_mention_list_parent_id_idx" ON "results_page_blocks_press_mention_list" USING btree ("_parent_id");
  CREATE INDEX "results_page_blocks_press_mention_list_path_idx" ON "results_page_blocks_press_mention_list" USING btree ("_path");
  CREATE INDEX "results_page_blocks_contact_form_order_idx" ON "results_page_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "results_page_blocks_contact_form_parent_id_idx" ON "results_page_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "results_page_blocks_contact_form_path_idx" ON "results_page_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "results_page_blocks_journey_step_list_order_idx" ON "results_page_blocks_journey_step_list" USING btree ("_order");
  CREATE INDEX "results_page_blocks_journey_step_list_parent_id_idx" ON "results_page_blocks_journey_step_list" USING btree ("_parent_id");
  CREATE INDEX "results_page_blocks_journey_step_list_path_idx" ON "results_page_blocks_journey_step_list" USING btree ("_path");
  CREATE INDEX "results_page_blocks_external_embed_order_idx" ON "results_page_blocks_external_embed" USING btree ("_order");
  CREATE INDEX "results_page_blocks_external_embed_parent_id_idx" ON "results_page_blocks_external_embed" USING btree ("_parent_id");
  CREATE INDEX "results_page_blocks_external_embed_path_idx" ON "results_page_blocks_external_embed" USING btree ("_path");
  CREATE INDEX "results_page_blocks_notes_order_idx" ON "results_page_blocks_notes" USING btree ("_order");
  CREATE INDEX "results_page_blocks_notes_parent_id_idx" ON "results_page_blocks_notes" USING btree ("_parent_id");
  CREATE INDEX "results_page_blocks_notes_path_idx" ON "results_page_blocks_notes" USING btree ("_path");
  CREATE INDEX "results_page_hero_image_idx" ON "results_page" USING btree ("hero_image_id");
  CREATE INDEX "results_page_seo_seo_og_image_idx" ON "results_page" USING btree ("seo_og_image_id");
  CREATE INDEX "gallery_page_blocks_rich_text_order_idx" ON "gallery_page_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "gallery_page_blocks_rich_text_parent_id_idx" ON "gallery_page_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "gallery_page_blocks_rich_text_path_idx" ON "gallery_page_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "gallery_page_blocks_image_grid_images_order_idx" ON "gallery_page_blocks_image_grid_images" USING btree ("_order");
  CREATE INDEX "gallery_page_blocks_image_grid_images_parent_id_idx" ON "gallery_page_blocks_image_grid_images" USING btree ("_parent_id");
  CREATE INDEX "gallery_page_blocks_image_grid_images_image_idx" ON "gallery_page_blocks_image_grid_images" USING btree ("image_id");
  CREATE INDEX "gallery_page_blocks_image_grid_order_idx" ON "gallery_page_blocks_image_grid" USING btree ("_order");
  CREATE INDEX "gallery_page_blocks_image_grid_parent_id_idx" ON "gallery_page_blocks_image_grid" USING btree ("_parent_id");
  CREATE INDEX "gallery_page_blocks_image_grid_path_idx" ON "gallery_page_blocks_image_grid" USING btree ("_path");
  CREATE INDEX "gallery_page_blocks_cta_band_order_idx" ON "gallery_page_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "gallery_page_blocks_cta_band_parent_id_idx" ON "gallery_page_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "gallery_page_blocks_cta_band_path_idx" ON "gallery_page_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "gallery_page_blocks_stats_items_order_idx" ON "gallery_page_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "gallery_page_blocks_stats_items_parent_id_idx" ON "gallery_page_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "gallery_page_blocks_stats_order_idx" ON "gallery_page_blocks_stats" USING btree ("_order");
  CREATE INDEX "gallery_page_blocks_stats_parent_id_idx" ON "gallery_page_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "gallery_page_blocks_stats_path_idx" ON "gallery_page_blocks_stats" USING btree ("_path");
  CREATE INDEX "gallery_page_blocks_faq_accordion_items_order_idx" ON "gallery_page_blocks_faq_accordion_items" USING btree ("_order");
  CREATE INDEX "gallery_page_blocks_faq_accordion_items_parent_id_idx" ON "gallery_page_blocks_faq_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "gallery_page_blocks_faq_accordion_order_idx" ON "gallery_page_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "gallery_page_blocks_faq_accordion_parent_id_idx" ON "gallery_page_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "gallery_page_blocks_faq_accordion_path_idx" ON "gallery_page_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "gallery_page_blocks_procedure_list_order_idx" ON "gallery_page_blocks_procedure_list" USING btree ("_order");
  CREATE INDEX "gallery_page_blocks_procedure_list_parent_id_idx" ON "gallery_page_blocks_procedure_list" USING btree ("_parent_id");
  CREATE INDEX "gallery_page_blocks_procedure_list_path_idx" ON "gallery_page_blocks_procedure_list" USING btree ("_path");
  CREATE INDEX "gallery_page_blocks_procedure_list_filter_discipline_idx" ON "gallery_page_blocks_procedure_list" USING btree ("filter_discipline_id");
  CREATE INDEX "gallery_page_blocks_procedure_list_filter_sub_category_idx" ON "gallery_page_blocks_procedure_list" USING btree ("filter_sub_category_id");
  CREATE INDEX "gallery_page_blocks_surgeon_list_order_idx" ON "gallery_page_blocks_surgeon_list" USING btree ("_order");
  CREATE INDEX "gallery_page_blocks_surgeon_list_parent_id_idx" ON "gallery_page_blocks_surgeon_list" USING btree ("_parent_id");
  CREATE INDEX "gallery_page_blocks_surgeon_list_path_idx" ON "gallery_page_blocks_surgeon_list" USING btree ("_path");
  CREATE INDEX "gallery_page_blocks_ba_grid_order_idx" ON "gallery_page_blocks_ba_grid" USING btree ("_order");
  CREATE INDEX "gallery_page_blocks_ba_grid_parent_id_idx" ON "gallery_page_blocks_ba_grid" USING btree ("_parent_id");
  CREATE INDEX "gallery_page_blocks_ba_grid_path_idx" ON "gallery_page_blocks_ba_grid" USING btree ("_path");
  CREATE INDEX "gallery_page_blocks_ba_grid_filter_procedure_idx" ON "gallery_page_blocks_ba_grid" USING btree ("filter_procedure_id");
  CREATE INDEX "gallery_page_blocks_testimonial_list_order_idx" ON "gallery_page_blocks_testimonial_list" USING btree ("_order");
  CREATE INDEX "gallery_page_blocks_testimonial_list_parent_id_idx" ON "gallery_page_blocks_testimonial_list" USING btree ("_parent_id");
  CREATE INDEX "gallery_page_blocks_testimonial_list_path_idx" ON "gallery_page_blocks_testimonial_list" USING btree ("_path");
  CREATE INDEX "gallery_page_blocks_recovery_stay_list_order_idx" ON "gallery_page_blocks_recovery_stay_list" USING btree ("_order");
  CREATE INDEX "gallery_page_blocks_recovery_stay_list_parent_id_idx" ON "gallery_page_blocks_recovery_stay_list" USING btree ("_parent_id");
  CREATE INDEX "gallery_page_blocks_recovery_stay_list_path_idx" ON "gallery_page_blocks_recovery_stay_list" USING btree ("_path");
  CREATE INDEX "gallery_page_blocks_press_mention_list_order_idx" ON "gallery_page_blocks_press_mention_list" USING btree ("_order");
  CREATE INDEX "gallery_page_blocks_press_mention_list_parent_id_idx" ON "gallery_page_blocks_press_mention_list" USING btree ("_parent_id");
  CREATE INDEX "gallery_page_blocks_press_mention_list_path_idx" ON "gallery_page_blocks_press_mention_list" USING btree ("_path");
  CREATE INDEX "gallery_page_blocks_contact_form_order_idx" ON "gallery_page_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "gallery_page_blocks_contact_form_parent_id_idx" ON "gallery_page_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "gallery_page_blocks_contact_form_path_idx" ON "gallery_page_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "gallery_page_blocks_journey_step_list_order_idx" ON "gallery_page_blocks_journey_step_list" USING btree ("_order");
  CREATE INDEX "gallery_page_blocks_journey_step_list_parent_id_idx" ON "gallery_page_blocks_journey_step_list" USING btree ("_parent_id");
  CREATE INDEX "gallery_page_blocks_journey_step_list_path_idx" ON "gallery_page_blocks_journey_step_list" USING btree ("_path");
  CREATE INDEX "gallery_page_blocks_external_embed_order_idx" ON "gallery_page_blocks_external_embed" USING btree ("_order");
  CREATE INDEX "gallery_page_blocks_external_embed_parent_id_idx" ON "gallery_page_blocks_external_embed" USING btree ("_parent_id");
  CREATE INDEX "gallery_page_blocks_external_embed_path_idx" ON "gallery_page_blocks_external_embed" USING btree ("_path");
  CREATE INDEX "gallery_page_blocks_notes_order_idx" ON "gallery_page_blocks_notes" USING btree ("_order");
  CREATE INDEX "gallery_page_blocks_notes_parent_id_idx" ON "gallery_page_blocks_notes" USING btree ("_parent_id");
  CREATE INDEX "gallery_page_blocks_notes_path_idx" ON "gallery_page_blocks_notes" USING btree ("_path");
  CREATE INDEX "gallery_page_hero_image_idx" ON "gallery_page" USING btree ("hero_image_id");
  CREATE INDEX "gallery_page_seo_seo_og_image_idx" ON "gallery_page" USING btree ("seo_og_image_id");
  CREATE INDEX "pricing_page_blocks_rich_text_order_idx" ON "pricing_page_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pricing_page_blocks_rich_text_parent_id_idx" ON "pricing_page_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pricing_page_blocks_rich_text_path_idx" ON "pricing_page_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "pricing_page_blocks_image_grid_images_order_idx" ON "pricing_page_blocks_image_grid_images" USING btree ("_order");
  CREATE INDEX "pricing_page_blocks_image_grid_images_parent_id_idx" ON "pricing_page_blocks_image_grid_images" USING btree ("_parent_id");
  CREATE INDEX "pricing_page_blocks_image_grid_images_image_idx" ON "pricing_page_blocks_image_grid_images" USING btree ("image_id");
  CREATE INDEX "pricing_page_blocks_image_grid_order_idx" ON "pricing_page_blocks_image_grid" USING btree ("_order");
  CREATE INDEX "pricing_page_blocks_image_grid_parent_id_idx" ON "pricing_page_blocks_image_grid" USING btree ("_parent_id");
  CREATE INDEX "pricing_page_blocks_image_grid_path_idx" ON "pricing_page_blocks_image_grid" USING btree ("_path");
  CREATE INDEX "pricing_page_blocks_cta_band_order_idx" ON "pricing_page_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "pricing_page_blocks_cta_band_parent_id_idx" ON "pricing_page_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "pricing_page_blocks_cta_band_path_idx" ON "pricing_page_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "pricing_page_blocks_stats_items_order_idx" ON "pricing_page_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "pricing_page_blocks_stats_items_parent_id_idx" ON "pricing_page_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "pricing_page_blocks_stats_order_idx" ON "pricing_page_blocks_stats" USING btree ("_order");
  CREATE INDEX "pricing_page_blocks_stats_parent_id_idx" ON "pricing_page_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "pricing_page_blocks_stats_path_idx" ON "pricing_page_blocks_stats" USING btree ("_path");
  CREATE INDEX "pricing_page_blocks_faq_accordion_items_order_idx" ON "pricing_page_blocks_faq_accordion_items" USING btree ("_order");
  CREATE INDEX "pricing_page_blocks_faq_accordion_items_parent_id_idx" ON "pricing_page_blocks_faq_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "pricing_page_blocks_faq_accordion_order_idx" ON "pricing_page_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "pricing_page_blocks_faq_accordion_parent_id_idx" ON "pricing_page_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "pricing_page_blocks_faq_accordion_path_idx" ON "pricing_page_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "pricing_page_blocks_procedure_list_order_idx" ON "pricing_page_blocks_procedure_list" USING btree ("_order");
  CREATE INDEX "pricing_page_blocks_procedure_list_parent_id_idx" ON "pricing_page_blocks_procedure_list" USING btree ("_parent_id");
  CREATE INDEX "pricing_page_blocks_procedure_list_path_idx" ON "pricing_page_blocks_procedure_list" USING btree ("_path");
  CREATE INDEX "pricing_page_blocks_procedure_list_filter_discipline_idx" ON "pricing_page_blocks_procedure_list" USING btree ("filter_discipline_id");
  CREATE INDEX "pricing_page_blocks_procedure_list_filter_sub_category_idx" ON "pricing_page_blocks_procedure_list" USING btree ("filter_sub_category_id");
  CREATE INDEX "pricing_page_blocks_surgeon_list_order_idx" ON "pricing_page_blocks_surgeon_list" USING btree ("_order");
  CREATE INDEX "pricing_page_blocks_surgeon_list_parent_id_idx" ON "pricing_page_blocks_surgeon_list" USING btree ("_parent_id");
  CREATE INDEX "pricing_page_blocks_surgeon_list_path_idx" ON "pricing_page_blocks_surgeon_list" USING btree ("_path");
  CREATE INDEX "pricing_page_blocks_ba_grid_order_idx" ON "pricing_page_blocks_ba_grid" USING btree ("_order");
  CREATE INDEX "pricing_page_blocks_ba_grid_parent_id_idx" ON "pricing_page_blocks_ba_grid" USING btree ("_parent_id");
  CREATE INDEX "pricing_page_blocks_ba_grid_path_idx" ON "pricing_page_blocks_ba_grid" USING btree ("_path");
  CREATE INDEX "pricing_page_blocks_ba_grid_filter_procedure_idx" ON "pricing_page_blocks_ba_grid" USING btree ("filter_procedure_id");
  CREATE INDEX "pricing_page_blocks_testimonial_list_order_idx" ON "pricing_page_blocks_testimonial_list" USING btree ("_order");
  CREATE INDEX "pricing_page_blocks_testimonial_list_parent_id_idx" ON "pricing_page_blocks_testimonial_list" USING btree ("_parent_id");
  CREATE INDEX "pricing_page_blocks_testimonial_list_path_idx" ON "pricing_page_blocks_testimonial_list" USING btree ("_path");
  CREATE INDEX "pricing_page_blocks_recovery_stay_list_order_idx" ON "pricing_page_blocks_recovery_stay_list" USING btree ("_order");
  CREATE INDEX "pricing_page_blocks_recovery_stay_list_parent_id_idx" ON "pricing_page_blocks_recovery_stay_list" USING btree ("_parent_id");
  CREATE INDEX "pricing_page_blocks_recovery_stay_list_path_idx" ON "pricing_page_blocks_recovery_stay_list" USING btree ("_path");
  CREATE INDEX "pricing_page_blocks_press_mention_list_order_idx" ON "pricing_page_blocks_press_mention_list" USING btree ("_order");
  CREATE INDEX "pricing_page_blocks_press_mention_list_parent_id_idx" ON "pricing_page_blocks_press_mention_list" USING btree ("_parent_id");
  CREATE INDEX "pricing_page_blocks_press_mention_list_path_idx" ON "pricing_page_blocks_press_mention_list" USING btree ("_path");
  CREATE INDEX "pricing_page_blocks_contact_form_order_idx" ON "pricing_page_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "pricing_page_blocks_contact_form_parent_id_idx" ON "pricing_page_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "pricing_page_blocks_contact_form_path_idx" ON "pricing_page_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "pricing_page_blocks_journey_step_list_order_idx" ON "pricing_page_blocks_journey_step_list" USING btree ("_order");
  CREATE INDEX "pricing_page_blocks_journey_step_list_parent_id_idx" ON "pricing_page_blocks_journey_step_list" USING btree ("_parent_id");
  CREATE INDEX "pricing_page_blocks_journey_step_list_path_idx" ON "pricing_page_blocks_journey_step_list" USING btree ("_path");
  CREATE INDEX "pricing_page_blocks_external_embed_order_idx" ON "pricing_page_blocks_external_embed" USING btree ("_order");
  CREATE INDEX "pricing_page_blocks_external_embed_parent_id_idx" ON "pricing_page_blocks_external_embed" USING btree ("_parent_id");
  CREATE INDEX "pricing_page_blocks_external_embed_path_idx" ON "pricing_page_blocks_external_embed" USING btree ("_path");
  CREATE INDEX "pricing_page_blocks_notes_order_idx" ON "pricing_page_blocks_notes" USING btree ("_order");
  CREATE INDEX "pricing_page_blocks_notes_parent_id_idx" ON "pricing_page_blocks_notes" USING btree ("_parent_id");
  CREATE INDEX "pricing_page_blocks_notes_path_idx" ON "pricing_page_blocks_notes" USING btree ("_path");
  CREATE INDEX "pricing_page_hero_image_idx" ON "pricing_page" USING btree ("hero_image_id");
  CREATE INDEX "pricing_page_seo_seo_og_image_idx" ON "pricing_page" USING btree ("seo_og_image_id");
  CREATE INDEX "journey_page_blocks_rich_text_order_idx" ON "journey_page_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "journey_page_blocks_rich_text_parent_id_idx" ON "journey_page_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "journey_page_blocks_rich_text_path_idx" ON "journey_page_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "journey_page_blocks_image_grid_images_order_idx" ON "journey_page_blocks_image_grid_images" USING btree ("_order");
  CREATE INDEX "journey_page_blocks_image_grid_images_parent_id_idx" ON "journey_page_blocks_image_grid_images" USING btree ("_parent_id");
  CREATE INDEX "journey_page_blocks_image_grid_images_image_idx" ON "journey_page_blocks_image_grid_images" USING btree ("image_id");
  CREATE INDEX "journey_page_blocks_image_grid_order_idx" ON "journey_page_blocks_image_grid" USING btree ("_order");
  CREATE INDEX "journey_page_blocks_image_grid_parent_id_idx" ON "journey_page_blocks_image_grid" USING btree ("_parent_id");
  CREATE INDEX "journey_page_blocks_image_grid_path_idx" ON "journey_page_blocks_image_grid" USING btree ("_path");
  CREATE INDEX "journey_page_blocks_cta_band_order_idx" ON "journey_page_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "journey_page_blocks_cta_band_parent_id_idx" ON "journey_page_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "journey_page_blocks_cta_band_path_idx" ON "journey_page_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "journey_page_blocks_stats_items_order_idx" ON "journey_page_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "journey_page_blocks_stats_items_parent_id_idx" ON "journey_page_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "journey_page_blocks_stats_order_idx" ON "journey_page_blocks_stats" USING btree ("_order");
  CREATE INDEX "journey_page_blocks_stats_parent_id_idx" ON "journey_page_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "journey_page_blocks_stats_path_idx" ON "journey_page_blocks_stats" USING btree ("_path");
  CREATE INDEX "journey_page_blocks_faq_accordion_items_order_idx" ON "journey_page_blocks_faq_accordion_items" USING btree ("_order");
  CREATE INDEX "journey_page_blocks_faq_accordion_items_parent_id_idx" ON "journey_page_blocks_faq_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "journey_page_blocks_faq_accordion_order_idx" ON "journey_page_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "journey_page_blocks_faq_accordion_parent_id_idx" ON "journey_page_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "journey_page_blocks_faq_accordion_path_idx" ON "journey_page_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "journey_page_blocks_procedure_list_order_idx" ON "journey_page_blocks_procedure_list" USING btree ("_order");
  CREATE INDEX "journey_page_blocks_procedure_list_parent_id_idx" ON "journey_page_blocks_procedure_list" USING btree ("_parent_id");
  CREATE INDEX "journey_page_blocks_procedure_list_path_idx" ON "journey_page_blocks_procedure_list" USING btree ("_path");
  CREATE INDEX "journey_page_blocks_procedure_list_filter_discipline_idx" ON "journey_page_blocks_procedure_list" USING btree ("filter_discipline_id");
  CREATE INDEX "journey_page_blocks_procedure_list_filter_sub_category_idx" ON "journey_page_blocks_procedure_list" USING btree ("filter_sub_category_id");
  CREATE INDEX "journey_page_blocks_surgeon_list_order_idx" ON "journey_page_blocks_surgeon_list" USING btree ("_order");
  CREATE INDEX "journey_page_blocks_surgeon_list_parent_id_idx" ON "journey_page_blocks_surgeon_list" USING btree ("_parent_id");
  CREATE INDEX "journey_page_blocks_surgeon_list_path_idx" ON "journey_page_blocks_surgeon_list" USING btree ("_path");
  CREATE INDEX "journey_page_blocks_ba_grid_order_idx" ON "journey_page_blocks_ba_grid" USING btree ("_order");
  CREATE INDEX "journey_page_blocks_ba_grid_parent_id_idx" ON "journey_page_blocks_ba_grid" USING btree ("_parent_id");
  CREATE INDEX "journey_page_blocks_ba_grid_path_idx" ON "journey_page_blocks_ba_grid" USING btree ("_path");
  CREATE INDEX "journey_page_blocks_ba_grid_filter_procedure_idx" ON "journey_page_blocks_ba_grid" USING btree ("filter_procedure_id");
  CREATE INDEX "journey_page_blocks_testimonial_list_order_idx" ON "journey_page_blocks_testimonial_list" USING btree ("_order");
  CREATE INDEX "journey_page_blocks_testimonial_list_parent_id_idx" ON "journey_page_blocks_testimonial_list" USING btree ("_parent_id");
  CREATE INDEX "journey_page_blocks_testimonial_list_path_idx" ON "journey_page_blocks_testimonial_list" USING btree ("_path");
  CREATE INDEX "journey_page_blocks_recovery_stay_list_order_idx" ON "journey_page_blocks_recovery_stay_list" USING btree ("_order");
  CREATE INDEX "journey_page_blocks_recovery_stay_list_parent_id_idx" ON "journey_page_blocks_recovery_stay_list" USING btree ("_parent_id");
  CREATE INDEX "journey_page_blocks_recovery_stay_list_path_idx" ON "journey_page_blocks_recovery_stay_list" USING btree ("_path");
  CREATE INDEX "journey_page_blocks_press_mention_list_order_idx" ON "journey_page_blocks_press_mention_list" USING btree ("_order");
  CREATE INDEX "journey_page_blocks_press_mention_list_parent_id_idx" ON "journey_page_blocks_press_mention_list" USING btree ("_parent_id");
  CREATE INDEX "journey_page_blocks_press_mention_list_path_idx" ON "journey_page_blocks_press_mention_list" USING btree ("_path");
  CREATE INDEX "journey_page_blocks_contact_form_order_idx" ON "journey_page_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "journey_page_blocks_contact_form_parent_id_idx" ON "journey_page_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "journey_page_blocks_contact_form_path_idx" ON "journey_page_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "journey_page_blocks_journey_step_list_order_idx" ON "journey_page_blocks_journey_step_list" USING btree ("_order");
  CREATE INDEX "journey_page_blocks_journey_step_list_parent_id_idx" ON "journey_page_blocks_journey_step_list" USING btree ("_parent_id");
  CREATE INDEX "journey_page_blocks_journey_step_list_path_idx" ON "journey_page_blocks_journey_step_list" USING btree ("_path");
  CREATE INDEX "journey_page_blocks_external_embed_order_idx" ON "journey_page_blocks_external_embed" USING btree ("_order");
  CREATE INDEX "journey_page_blocks_external_embed_parent_id_idx" ON "journey_page_blocks_external_embed" USING btree ("_parent_id");
  CREATE INDEX "journey_page_blocks_external_embed_path_idx" ON "journey_page_blocks_external_embed" USING btree ("_path");
  CREATE INDEX "journey_page_blocks_notes_order_idx" ON "journey_page_blocks_notes" USING btree ("_order");
  CREATE INDEX "journey_page_blocks_notes_parent_id_idx" ON "journey_page_blocks_notes" USING btree ("_parent_id");
  CREATE INDEX "journey_page_blocks_notes_path_idx" ON "journey_page_blocks_notes" USING btree ("_path");
  CREATE INDEX "journey_page_hero_image_idx" ON "journey_page" USING btree ("hero_image_id");
  CREATE INDEX "journey_page_seo_seo_og_image_idx" ON "journey_page" USING btree ("seo_og_image_id");
  CREATE INDEX "stories_page_blocks_rich_text_order_idx" ON "stories_page_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "stories_page_blocks_rich_text_parent_id_idx" ON "stories_page_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "stories_page_blocks_rich_text_path_idx" ON "stories_page_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "stories_page_blocks_image_grid_images_order_idx" ON "stories_page_blocks_image_grid_images" USING btree ("_order");
  CREATE INDEX "stories_page_blocks_image_grid_images_parent_id_idx" ON "stories_page_blocks_image_grid_images" USING btree ("_parent_id");
  CREATE INDEX "stories_page_blocks_image_grid_images_image_idx" ON "stories_page_blocks_image_grid_images" USING btree ("image_id");
  CREATE INDEX "stories_page_blocks_image_grid_order_idx" ON "stories_page_blocks_image_grid" USING btree ("_order");
  CREATE INDEX "stories_page_blocks_image_grid_parent_id_idx" ON "stories_page_blocks_image_grid" USING btree ("_parent_id");
  CREATE INDEX "stories_page_blocks_image_grid_path_idx" ON "stories_page_blocks_image_grid" USING btree ("_path");
  CREATE INDEX "stories_page_blocks_cta_band_order_idx" ON "stories_page_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "stories_page_blocks_cta_band_parent_id_idx" ON "stories_page_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "stories_page_blocks_cta_band_path_idx" ON "stories_page_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "stories_page_blocks_stats_items_order_idx" ON "stories_page_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "stories_page_blocks_stats_items_parent_id_idx" ON "stories_page_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "stories_page_blocks_stats_order_idx" ON "stories_page_blocks_stats" USING btree ("_order");
  CREATE INDEX "stories_page_blocks_stats_parent_id_idx" ON "stories_page_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "stories_page_blocks_stats_path_idx" ON "stories_page_blocks_stats" USING btree ("_path");
  CREATE INDEX "stories_page_blocks_faq_accordion_items_order_idx" ON "stories_page_blocks_faq_accordion_items" USING btree ("_order");
  CREATE INDEX "stories_page_blocks_faq_accordion_items_parent_id_idx" ON "stories_page_blocks_faq_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "stories_page_blocks_faq_accordion_order_idx" ON "stories_page_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "stories_page_blocks_faq_accordion_parent_id_idx" ON "stories_page_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "stories_page_blocks_faq_accordion_path_idx" ON "stories_page_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "stories_page_blocks_procedure_list_order_idx" ON "stories_page_blocks_procedure_list" USING btree ("_order");
  CREATE INDEX "stories_page_blocks_procedure_list_parent_id_idx" ON "stories_page_blocks_procedure_list" USING btree ("_parent_id");
  CREATE INDEX "stories_page_blocks_procedure_list_path_idx" ON "stories_page_blocks_procedure_list" USING btree ("_path");
  CREATE INDEX "stories_page_blocks_procedure_list_filter_discipline_idx" ON "stories_page_blocks_procedure_list" USING btree ("filter_discipline_id");
  CREATE INDEX "stories_page_blocks_procedure_list_filter_sub_category_idx" ON "stories_page_blocks_procedure_list" USING btree ("filter_sub_category_id");
  CREATE INDEX "stories_page_blocks_surgeon_list_order_idx" ON "stories_page_blocks_surgeon_list" USING btree ("_order");
  CREATE INDEX "stories_page_blocks_surgeon_list_parent_id_idx" ON "stories_page_blocks_surgeon_list" USING btree ("_parent_id");
  CREATE INDEX "stories_page_blocks_surgeon_list_path_idx" ON "stories_page_blocks_surgeon_list" USING btree ("_path");
  CREATE INDEX "stories_page_blocks_ba_grid_order_idx" ON "stories_page_blocks_ba_grid" USING btree ("_order");
  CREATE INDEX "stories_page_blocks_ba_grid_parent_id_idx" ON "stories_page_blocks_ba_grid" USING btree ("_parent_id");
  CREATE INDEX "stories_page_blocks_ba_grid_path_idx" ON "stories_page_blocks_ba_grid" USING btree ("_path");
  CREATE INDEX "stories_page_blocks_ba_grid_filter_procedure_idx" ON "stories_page_blocks_ba_grid" USING btree ("filter_procedure_id");
  CREATE INDEX "stories_page_blocks_testimonial_list_order_idx" ON "stories_page_blocks_testimonial_list" USING btree ("_order");
  CREATE INDEX "stories_page_blocks_testimonial_list_parent_id_idx" ON "stories_page_blocks_testimonial_list" USING btree ("_parent_id");
  CREATE INDEX "stories_page_blocks_testimonial_list_path_idx" ON "stories_page_blocks_testimonial_list" USING btree ("_path");
  CREATE INDEX "stories_page_blocks_recovery_stay_list_order_idx" ON "stories_page_blocks_recovery_stay_list" USING btree ("_order");
  CREATE INDEX "stories_page_blocks_recovery_stay_list_parent_id_idx" ON "stories_page_blocks_recovery_stay_list" USING btree ("_parent_id");
  CREATE INDEX "stories_page_blocks_recovery_stay_list_path_idx" ON "stories_page_blocks_recovery_stay_list" USING btree ("_path");
  CREATE INDEX "stories_page_blocks_press_mention_list_order_idx" ON "stories_page_blocks_press_mention_list" USING btree ("_order");
  CREATE INDEX "stories_page_blocks_press_mention_list_parent_id_idx" ON "stories_page_blocks_press_mention_list" USING btree ("_parent_id");
  CREATE INDEX "stories_page_blocks_press_mention_list_path_idx" ON "stories_page_blocks_press_mention_list" USING btree ("_path");
  CREATE INDEX "stories_page_blocks_contact_form_order_idx" ON "stories_page_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "stories_page_blocks_contact_form_parent_id_idx" ON "stories_page_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "stories_page_blocks_contact_form_path_idx" ON "stories_page_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "stories_page_blocks_journey_step_list_order_idx" ON "stories_page_blocks_journey_step_list" USING btree ("_order");
  CREATE INDEX "stories_page_blocks_journey_step_list_parent_id_idx" ON "stories_page_blocks_journey_step_list" USING btree ("_parent_id");
  CREATE INDEX "stories_page_blocks_journey_step_list_path_idx" ON "stories_page_blocks_journey_step_list" USING btree ("_path");
  CREATE INDEX "stories_page_blocks_external_embed_order_idx" ON "stories_page_blocks_external_embed" USING btree ("_order");
  CREATE INDEX "stories_page_blocks_external_embed_parent_id_idx" ON "stories_page_blocks_external_embed" USING btree ("_parent_id");
  CREATE INDEX "stories_page_blocks_external_embed_path_idx" ON "stories_page_blocks_external_embed" USING btree ("_path");
  CREATE INDEX "stories_page_blocks_notes_order_idx" ON "stories_page_blocks_notes" USING btree ("_order");
  CREATE INDEX "stories_page_blocks_notes_parent_id_idx" ON "stories_page_blocks_notes" USING btree ("_parent_id");
  CREATE INDEX "stories_page_blocks_notes_path_idx" ON "stories_page_blocks_notes" USING btree ("_path");
  CREATE INDEX "stories_page_hero_image_idx" ON "stories_page" USING btree ("hero_image_id");
  CREATE INDEX "stories_page_seo_seo_og_image_idx" ON "stories_page" USING btree ("seo_og_image_id");
  CREATE INDEX "rec_stays_pg_blocks_rich_text_order_idx" ON "rec_stays_pg_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "rec_stays_pg_blocks_rich_text_parent_id_idx" ON "rec_stays_pg_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "rec_stays_pg_blocks_rich_text_path_idx" ON "rec_stays_pg_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "rec_stays_pg_blocks_image_grid_images_order_idx" ON "rec_stays_pg_blocks_image_grid_images" USING btree ("_order");
  CREATE INDEX "rec_stays_pg_blocks_image_grid_images_parent_id_idx" ON "rec_stays_pg_blocks_image_grid_images" USING btree ("_parent_id");
  CREATE INDEX "rec_stays_pg_blocks_image_grid_images_image_idx" ON "rec_stays_pg_blocks_image_grid_images" USING btree ("image_id");
  CREATE INDEX "rec_stays_pg_blocks_image_grid_order_idx" ON "rec_stays_pg_blocks_image_grid" USING btree ("_order");
  CREATE INDEX "rec_stays_pg_blocks_image_grid_parent_id_idx" ON "rec_stays_pg_blocks_image_grid" USING btree ("_parent_id");
  CREATE INDEX "rec_stays_pg_blocks_image_grid_path_idx" ON "rec_stays_pg_blocks_image_grid" USING btree ("_path");
  CREATE INDEX "rec_stays_pg_blocks_cta_band_order_idx" ON "rec_stays_pg_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "rec_stays_pg_blocks_cta_band_parent_id_idx" ON "rec_stays_pg_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "rec_stays_pg_blocks_cta_band_path_idx" ON "rec_stays_pg_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "rec_stays_pg_blocks_stats_items_order_idx" ON "rec_stays_pg_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "rec_stays_pg_blocks_stats_items_parent_id_idx" ON "rec_stays_pg_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "rec_stays_pg_blocks_stats_order_idx" ON "rec_stays_pg_blocks_stats" USING btree ("_order");
  CREATE INDEX "rec_stays_pg_blocks_stats_parent_id_idx" ON "rec_stays_pg_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "rec_stays_pg_blocks_stats_path_idx" ON "rec_stays_pg_blocks_stats" USING btree ("_path");
  CREATE INDEX "rec_stays_pg_blocks_faq_accordion_items_order_idx" ON "rec_stays_pg_blocks_faq_accordion_items" USING btree ("_order");
  CREATE INDEX "rec_stays_pg_blocks_faq_accordion_items_parent_id_idx" ON "rec_stays_pg_blocks_faq_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "rec_stays_pg_blocks_faq_accordion_order_idx" ON "rec_stays_pg_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "rec_stays_pg_blocks_faq_accordion_parent_id_idx" ON "rec_stays_pg_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "rec_stays_pg_blocks_faq_accordion_path_idx" ON "rec_stays_pg_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "rec_stays_pg_blocks_procedure_list_order_idx" ON "rec_stays_pg_blocks_procedure_list" USING btree ("_order");
  CREATE INDEX "rec_stays_pg_blocks_procedure_list_parent_id_idx" ON "rec_stays_pg_blocks_procedure_list" USING btree ("_parent_id");
  CREATE INDEX "rec_stays_pg_blocks_procedure_list_path_idx" ON "rec_stays_pg_blocks_procedure_list" USING btree ("_path");
  CREATE INDEX "rec_stays_pg_blocks_procedure_list_filter_discipline_idx" ON "rec_stays_pg_blocks_procedure_list" USING btree ("filter_discipline_id");
  CREATE INDEX "rec_stays_pg_blocks_procedure_list_filter_sub_category_idx" ON "rec_stays_pg_blocks_procedure_list" USING btree ("filter_sub_category_id");
  CREATE INDEX "rec_stays_pg_blocks_surgeon_list_order_idx" ON "rec_stays_pg_blocks_surgeon_list" USING btree ("_order");
  CREATE INDEX "rec_stays_pg_blocks_surgeon_list_parent_id_idx" ON "rec_stays_pg_blocks_surgeon_list" USING btree ("_parent_id");
  CREATE INDEX "rec_stays_pg_blocks_surgeon_list_path_idx" ON "rec_stays_pg_blocks_surgeon_list" USING btree ("_path");
  CREATE INDEX "rec_stays_pg_blocks_ba_grid_order_idx" ON "rec_stays_pg_blocks_ba_grid" USING btree ("_order");
  CREATE INDEX "rec_stays_pg_blocks_ba_grid_parent_id_idx" ON "rec_stays_pg_blocks_ba_grid" USING btree ("_parent_id");
  CREATE INDEX "rec_stays_pg_blocks_ba_grid_path_idx" ON "rec_stays_pg_blocks_ba_grid" USING btree ("_path");
  CREATE INDEX "rec_stays_pg_blocks_ba_grid_filter_procedure_idx" ON "rec_stays_pg_blocks_ba_grid" USING btree ("filter_procedure_id");
  CREATE INDEX "rec_stays_pg_blocks_testimonial_list_order_idx" ON "rec_stays_pg_blocks_testimonial_list" USING btree ("_order");
  CREATE INDEX "rec_stays_pg_blocks_testimonial_list_parent_id_idx" ON "rec_stays_pg_blocks_testimonial_list" USING btree ("_parent_id");
  CREATE INDEX "rec_stays_pg_blocks_testimonial_list_path_idx" ON "rec_stays_pg_blocks_testimonial_list" USING btree ("_path");
  CREATE INDEX "rec_stays_pg_blocks_recovery_stay_list_order_idx" ON "rec_stays_pg_blocks_recovery_stay_list" USING btree ("_order");
  CREATE INDEX "rec_stays_pg_blocks_recovery_stay_list_parent_id_idx" ON "rec_stays_pg_blocks_recovery_stay_list" USING btree ("_parent_id");
  CREATE INDEX "rec_stays_pg_blocks_recovery_stay_list_path_idx" ON "rec_stays_pg_blocks_recovery_stay_list" USING btree ("_path");
  CREATE INDEX "rec_stays_pg_blocks_press_mention_list_order_idx" ON "rec_stays_pg_blocks_press_mention_list" USING btree ("_order");
  CREATE INDEX "rec_stays_pg_blocks_press_mention_list_parent_id_idx" ON "rec_stays_pg_blocks_press_mention_list" USING btree ("_parent_id");
  CREATE INDEX "rec_stays_pg_blocks_press_mention_list_path_idx" ON "rec_stays_pg_blocks_press_mention_list" USING btree ("_path");
  CREATE INDEX "rec_stays_pg_blocks_contact_form_order_idx" ON "rec_stays_pg_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "rec_stays_pg_blocks_contact_form_parent_id_idx" ON "rec_stays_pg_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "rec_stays_pg_blocks_contact_form_path_idx" ON "rec_stays_pg_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "rec_stays_pg_blocks_journey_step_list_order_idx" ON "rec_stays_pg_blocks_journey_step_list" USING btree ("_order");
  CREATE INDEX "rec_stays_pg_blocks_journey_step_list_parent_id_idx" ON "rec_stays_pg_blocks_journey_step_list" USING btree ("_parent_id");
  CREATE INDEX "rec_stays_pg_blocks_journey_step_list_path_idx" ON "rec_stays_pg_blocks_journey_step_list" USING btree ("_path");
  CREATE INDEX "rec_stays_pg_blocks_external_embed_order_idx" ON "rec_stays_pg_blocks_external_embed" USING btree ("_order");
  CREATE INDEX "rec_stays_pg_blocks_external_embed_parent_id_idx" ON "rec_stays_pg_blocks_external_embed" USING btree ("_parent_id");
  CREATE INDEX "rec_stays_pg_blocks_external_embed_path_idx" ON "rec_stays_pg_blocks_external_embed" USING btree ("_path");
  CREATE INDEX "rec_stays_pg_blocks_notes_order_idx" ON "rec_stays_pg_blocks_notes" USING btree ("_order");
  CREATE INDEX "rec_stays_pg_blocks_notes_parent_id_idx" ON "rec_stays_pg_blocks_notes" USING btree ("_parent_id");
  CREATE INDEX "rec_stays_pg_blocks_notes_path_idx" ON "rec_stays_pg_blocks_notes" USING btree ("_path");
  CREATE INDEX "rec_stays_pg_hero_image_idx" ON "rec_stays_pg" USING btree ("hero_image_id");
  CREATE INDEX "rec_stays_pg_seo_seo_og_image_idx" ON "rec_stays_pg" USING btree ("seo_og_image_id");
  CREATE INDEX "contact_page_blocks_rich_text_order_idx" ON "contact_page_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_rich_text_parent_id_idx" ON "contact_page_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_rich_text_path_idx" ON "contact_page_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "contact_page_blocks_image_grid_images_order_idx" ON "contact_page_blocks_image_grid_images" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_image_grid_images_parent_id_idx" ON "contact_page_blocks_image_grid_images" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_image_grid_images_image_idx" ON "contact_page_blocks_image_grid_images" USING btree ("image_id");
  CREATE INDEX "contact_page_blocks_image_grid_order_idx" ON "contact_page_blocks_image_grid" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_image_grid_parent_id_idx" ON "contact_page_blocks_image_grid" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_image_grid_path_idx" ON "contact_page_blocks_image_grid" USING btree ("_path");
  CREATE INDEX "contact_page_blocks_cta_band_order_idx" ON "contact_page_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_cta_band_parent_id_idx" ON "contact_page_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_cta_band_path_idx" ON "contact_page_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "contact_page_blocks_stats_items_order_idx" ON "contact_page_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_stats_items_parent_id_idx" ON "contact_page_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_stats_order_idx" ON "contact_page_blocks_stats" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_stats_parent_id_idx" ON "contact_page_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_stats_path_idx" ON "contact_page_blocks_stats" USING btree ("_path");
  CREATE INDEX "contact_page_blocks_faq_accordion_items_order_idx" ON "contact_page_blocks_faq_accordion_items" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_faq_accordion_items_parent_id_idx" ON "contact_page_blocks_faq_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_faq_accordion_order_idx" ON "contact_page_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_faq_accordion_parent_id_idx" ON "contact_page_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_faq_accordion_path_idx" ON "contact_page_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "contact_page_blocks_procedure_list_order_idx" ON "contact_page_blocks_procedure_list" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_procedure_list_parent_id_idx" ON "contact_page_blocks_procedure_list" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_procedure_list_path_idx" ON "contact_page_blocks_procedure_list" USING btree ("_path");
  CREATE INDEX "contact_page_blocks_procedure_list_filter_discipline_idx" ON "contact_page_blocks_procedure_list" USING btree ("filter_discipline_id");
  CREATE INDEX "contact_page_blocks_procedure_list_filter_sub_category_idx" ON "contact_page_blocks_procedure_list" USING btree ("filter_sub_category_id");
  CREATE INDEX "contact_page_blocks_surgeon_list_order_idx" ON "contact_page_blocks_surgeon_list" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_surgeon_list_parent_id_idx" ON "contact_page_blocks_surgeon_list" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_surgeon_list_path_idx" ON "contact_page_blocks_surgeon_list" USING btree ("_path");
  CREATE INDEX "contact_page_blocks_ba_grid_order_idx" ON "contact_page_blocks_ba_grid" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_ba_grid_parent_id_idx" ON "contact_page_blocks_ba_grid" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_ba_grid_path_idx" ON "contact_page_blocks_ba_grid" USING btree ("_path");
  CREATE INDEX "contact_page_blocks_ba_grid_filter_procedure_idx" ON "contact_page_blocks_ba_grid" USING btree ("filter_procedure_id");
  CREATE INDEX "contact_page_blocks_testimonial_list_order_idx" ON "contact_page_blocks_testimonial_list" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_testimonial_list_parent_id_idx" ON "contact_page_blocks_testimonial_list" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_testimonial_list_path_idx" ON "contact_page_blocks_testimonial_list" USING btree ("_path");
  CREATE INDEX "contact_page_blocks_recovery_stay_list_order_idx" ON "contact_page_blocks_recovery_stay_list" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_recovery_stay_list_parent_id_idx" ON "contact_page_blocks_recovery_stay_list" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_recovery_stay_list_path_idx" ON "contact_page_blocks_recovery_stay_list" USING btree ("_path");
  CREATE INDEX "contact_page_blocks_press_mention_list_order_idx" ON "contact_page_blocks_press_mention_list" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_press_mention_list_parent_id_idx" ON "contact_page_blocks_press_mention_list" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_press_mention_list_path_idx" ON "contact_page_blocks_press_mention_list" USING btree ("_path");
  CREATE INDEX "contact_page_blocks_contact_form_order_idx" ON "contact_page_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_contact_form_parent_id_idx" ON "contact_page_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_contact_form_path_idx" ON "contact_page_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "contact_page_blocks_journey_step_list_order_idx" ON "contact_page_blocks_journey_step_list" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_journey_step_list_parent_id_idx" ON "contact_page_blocks_journey_step_list" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_journey_step_list_path_idx" ON "contact_page_blocks_journey_step_list" USING btree ("_path");
  CREATE INDEX "contact_page_blocks_external_embed_order_idx" ON "contact_page_blocks_external_embed" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_external_embed_parent_id_idx" ON "contact_page_blocks_external_embed" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_external_embed_path_idx" ON "contact_page_blocks_external_embed" USING btree ("_path");
  CREATE INDEX "contact_page_blocks_notes_order_idx" ON "contact_page_blocks_notes" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_notes_parent_id_idx" ON "contact_page_blocks_notes" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_notes_path_idx" ON "contact_page_blocks_notes" USING btree ("_path");
  CREATE INDEX "contact_page_hero_image_idx" ON "contact_page" USING btree ("hero_image_id");
  CREATE INDEX "contact_page_seo_seo_og_image_idx" ON "contact_page" USING btree ("seo_og_image_id");
  CREATE INDEX "vid_consult_pg_blocks_rich_text_order_idx" ON "vid_consult_pg_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "vid_consult_pg_blocks_rich_text_parent_id_idx" ON "vid_consult_pg_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "vid_consult_pg_blocks_rich_text_path_idx" ON "vid_consult_pg_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "vid_consult_pg_blocks_image_grid_images_order_idx" ON "vid_consult_pg_blocks_image_grid_images" USING btree ("_order");
  CREATE INDEX "vid_consult_pg_blocks_image_grid_images_parent_id_idx" ON "vid_consult_pg_blocks_image_grid_images" USING btree ("_parent_id");
  CREATE INDEX "vid_consult_pg_blocks_image_grid_images_image_idx" ON "vid_consult_pg_blocks_image_grid_images" USING btree ("image_id");
  CREATE INDEX "vid_consult_pg_blocks_image_grid_order_idx" ON "vid_consult_pg_blocks_image_grid" USING btree ("_order");
  CREATE INDEX "vid_consult_pg_blocks_image_grid_parent_id_idx" ON "vid_consult_pg_blocks_image_grid" USING btree ("_parent_id");
  CREATE INDEX "vid_consult_pg_blocks_image_grid_path_idx" ON "vid_consult_pg_blocks_image_grid" USING btree ("_path");
  CREATE INDEX "vid_consult_pg_blocks_cta_band_order_idx" ON "vid_consult_pg_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "vid_consult_pg_blocks_cta_band_parent_id_idx" ON "vid_consult_pg_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "vid_consult_pg_blocks_cta_band_path_idx" ON "vid_consult_pg_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "vid_consult_pg_blocks_stats_items_order_idx" ON "vid_consult_pg_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "vid_consult_pg_blocks_stats_items_parent_id_idx" ON "vid_consult_pg_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "vid_consult_pg_blocks_stats_order_idx" ON "vid_consult_pg_blocks_stats" USING btree ("_order");
  CREATE INDEX "vid_consult_pg_blocks_stats_parent_id_idx" ON "vid_consult_pg_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "vid_consult_pg_blocks_stats_path_idx" ON "vid_consult_pg_blocks_stats" USING btree ("_path");
  CREATE INDEX "vid_consult_pg_blocks_faq_accordion_items_order_idx" ON "vid_consult_pg_blocks_faq_accordion_items" USING btree ("_order");
  CREATE INDEX "vid_consult_pg_blocks_faq_accordion_items_parent_id_idx" ON "vid_consult_pg_blocks_faq_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "vid_consult_pg_blocks_faq_accordion_order_idx" ON "vid_consult_pg_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "vid_consult_pg_blocks_faq_accordion_parent_id_idx" ON "vid_consult_pg_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "vid_consult_pg_blocks_faq_accordion_path_idx" ON "vid_consult_pg_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "vid_consult_pg_blocks_procedure_list_order_idx" ON "vid_consult_pg_blocks_procedure_list" USING btree ("_order");
  CREATE INDEX "vid_consult_pg_blocks_procedure_list_parent_id_idx" ON "vid_consult_pg_blocks_procedure_list" USING btree ("_parent_id");
  CREATE INDEX "vid_consult_pg_blocks_procedure_list_path_idx" ON "vid_consult_pg_blocks_procedure_list" USING btree ("_path");
  CREATE INDEX "vid_consult_pg_blocks_procedure_list_filter_discipline_idx" ON "vid_consult_pg_blocks_procedure_list" USING btree ("filter_discipline_id");
  CREATE INDEX "vid_consult_pg_blocks_procedure_list_filter_sub_category_idx" ON "vid_consult_pg_blocks_procedure_list" USING btree ("filter_sub_category_id");
  CREATE INDEX "vid_consult_pg_blocks_surgeon_list_order_idx" ON "vid_consult_pg_blocks_surgeon_list" USING btree ("_order");
  CREATE INDEX "vid_consult_pg_blocks_surgeon_list_parent_id_idx" ON "vid_consult_pg_blocks_surgeon_list" USING btree ("_parent_id");
  CREATE INDEX "vid_consult_pg_blocks_surgeon_list_path_idx" ON "vid_consult_pg_blocks_surgeon_list" USING btree ("_path");
  CREATE INDEX "vid_consult_pg_blocks_ba_grid_order_idx" ON "vid_consult_pg_blocks_ba_grid" USING btree ("_order");
  CREATE INDEX "vid_consult_pg_blocks_ba_grid_parent_id_idx" ON "vid_consult_pg_blocks_ba_grid" USING btree ("_parent_id");
  CREATE INDEX "vid_consult_pg_blocks_ba_grid_path_idx" ON "vid_consult_pg_blocks_ba_grid" USING btree ("_path");
  CREATE INDEX "vid_consult_pg_blocks_ba_grid_filter_procedure_idx" ON "vid_consult_pg_blocks_ba_grid" USING btree ("filter_procedure_id");
  CREATE INDEX "vid_consult_pg_blocks_testimonial_list_order_idx" ON "vid_consult_pg_blocks_testimonial_list" USING btree ("_order");
  CREATE INDEX "vid_consult_pg_blocks_testimonial_list_parent_id_idx" ON "vid_consult_pg_blocks_testimonial_list" USING btree ("_parent_id");
  CREATE INDEX "vid_consult_pg_blocks_testimonial_list_path_idx" ON "vid_consult_pg_blocks_testimonial_list" USING btree ("_path");
  CREATE INDEX "vid_consult_pg_blocks_recovery_stay_list_order_idx" ON "vid_consult_pg_blocks_recovery_stay_list" USING btree ("_order");
  CREATE INDEX "vid_consult_pg_blocks_recovery_stay_list_parent_id_idx" ON "vid_consult_pg_blocks_recovery_stay_list" USING btree ("_parent_id");
  CREATE INDEX "vid_consult_pg_blocks_recovery_stay_list_path_idx" ON "vid_consult_pg_blocks_recovery_stay_list" USING btree ("_path");
  CREATE INDEX "vid_consult_pg_blocks_press_mention_list_order_idx" ON "vid_consult_pg_blocks_press_mention_list" USING btree ("_order");
  CREATE INDEX "vid_consult_pg_blocks_press_mention_list_parent_id_idx" ON "vid_consult_pg_blocks_press_mention_list" USING btree ("_parent_id");
  CREATE INDEX "vid_consult_pg_blocks_press_mention_list_path_idx" ON "vid_consult_pg_blocks_press_mention_list" USING btree ("_path");
  CREATE INDEX "vid_consult_pg_blocks_contact_form_order_idx" ON "vid_consult_pg_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "vid_consult_pg_blocks_contact_form_parent_id_idx" ON "vid_consult_pg_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "vid_consult_pg_blocks_contact_form_path_idx" ON "vid_consult_pg_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "vid_consult_pg_blocks_journey_step_list_order_idx" ON "vid_consult_pg_blocks_journey_step_list" USING btree ("_order");
  CREATE INDEX "vid_consult_pg_blocks_journey_step_list_parent_id_idx" ON "vid_consult_pg_blocks_journey_step_list" USING btree ("_parent_id");
  CREATE INDEX "vid_consult_pg_blocks_journey_step_list_path_idx" ON "vid_consult_pg_blocks_journey_step_list" USING btree ("_path");
  CREATE INDEX "vid_consult_pg_blocks_external_embed_order_idx" ON "vid_consult_pg_blocks_external_embed" USING btree ("_order");
  CREATE INDEX "vid_consult_pg_blocks_external_embed_parent_id_idx" ON "vid_consult_pg_blocks_external_embed" USING btree ("_parent_id");
  CREATE INDEX "vid_consult_pg_blocks_external_embed_path_idx" ON "vid_consult_pg_blocks_external_embed" USING btree ("_path");
  CREATE INDEX "vid_consult_pg_blocks_notes_order_idx" ON "vid_consult_pg_blocks_notes" USING btree ("_order");
  CREATE INDEX "vid_consult_pg_blocks_notes_parent_id_idx" ON "vid_consult_pg_blocks_notes" USING btree ("_parent_id");
  CREATE INDEX "vid_consult_pg_blocks_notes_path_idx" ON "vid_consult_pg_blocks_notes" USING btree ("_path");
  CREATE INDEX "vid_consult_pg_hero_image_idx" ON "vid_consult_pg" USING btree ("hero_image_id");
  CREATE INDEX "vid_consult_pg_seo_seo_og_image_idx" ON "vid_consult_pg" USING btree ("seo_og_image_id");
  CREATE INDEX "blog_page_blocks_rich_text_order_idx" ON "blog_page_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "blog_page_blocks_rich_text_parent_id_idx" ON "blog_page_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "blog_page_blocks_rich_text_path_idx" ON "blog_page_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "blog_page_blocks_image_grid_images_order_idx" ON "blog_page_blocks_image_grid_images" USING btree ("_order");
  CREATE INDEX "blog_page_blocks_image_grid_images_parent_id_idx" ON "blog_page_blocks_image_grid_images" USING btree ("_parent_id");
  CREATE INDEX "blog_page_blocks_image_grid_images_image_idx" ON "blog_page_blocks_image_grid_images" USING btree ("image_id");
  CREATE INDEX "blog_page_blocks_image_grid_order_idx" ON "blog_page_blocks_image_grid" USING btree ("_order");
  CREATE INDEX "blog_page_blocks_image_grid_parent_id_idx" ON "blog_page_blocks_image_grid" USING btree ("_parent_id");
  CREATE INDEX "blog_page_blocks_image_grid_path_idx" ON "blog_page_blocks_image_grid" USING btree ("_path");
  CREATE INDEX "blog_page_blocks_cta_band_order_idx" ON "blog_page_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "blog_page_blocks_cta_band_parent_id_idx" ON "blog_page_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "blog_page_blocks_cta_band_path_idx" ON "blog_page_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "blog_page_blocks_stats_items_order_idx" ON "blog_page_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "blog_page_blocks_stats_items_parent_id_idx" ON "blog_page_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "blog_page_blocks_stats_order_idx" ON "blog_page_blocks_stats" USING btree ("_order");
  CREATE INDEX "blog_page_blocks_stats_parent_id_idx" ON "blog_page_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "blog_page_blocks_stats_path_idx" ON "blog_page_blocks_stats" USING btree ("_path");
  CREATE INDEX "blog_page_blocks_faq_accordion_items_order_idx" ON "blog_page_blocks_faq_accordion_items" USING btree ("_order");
  CREATE INDEX "blog_page_blocks_faq_accordion_items_parent_id_idx" ON "blog_page_blocks_faq_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "blog_page_blocks_faq_accordion_order_idx" ON "blog_page_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "blog_page_blocks_faq_accordion_parent_id_idx" ON "blog_page_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "blog_page_blocks_faq_accordion_path_idx" ON "blog_page_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "blog_page_blocks_procedure_list_order_idx" ON "blog_page_blocks_procedure_list" USING btree ("_order");
  CREATE INDEX "blog_page_blocks_procedure_list_parent_id_idx" ON "blog_page_blocks_procedure_list" USING btree ("_parent_id");
  CREATE INDEX "blog_page_blocks_procedure_list_path_idx" ON "blog_page_blocks_procedure_list" USING btree ("_path");
  CREATE INDEX "blog_page_blocks_procedure_list_filter_discipline_idx" ON "blog_page_blocks_procedure_list" USING btree ("filter_discipline_id");
  CREATE INDEX "blog_page_blocks_procedure_list_filter_sub_category_idx" ON "blog_page_blocks_procedure_list" USING btree ("filter_sub_category_id");
  CREATE INDEX "blog_page_blocks_surgeon_list_order_idx" ON "blog_page_blocks_surgeon_list" USING btree ("_order");
  CREATE INDEX "blog_page_blocks_surgeon_list_parent_id_idx" ON "blog_page_blocks_surgeon_list" USING btree ("_parent_id");
  CREATE INDEX "blog_page_blocks_surgeon_list_path_idx" ON "blog_page_blocks_surgeon_list" USING btree ("_path");
  CREATE INDEX "blog_page_blocks_ba_grid_order_idx" ON "blog_page_blocks_ba_grid" USING btree ("_order");
  CREATE INDEX "blog_page_blocks_ba_grid_parent_id_idx" ON "blog_page_blocks_ba_grid" USING btree ("_parent_id");
  CREATE INDEX "blog_page_blocks_ba_grid_path_idx" ON "blog_page_blocks_ba_grid" USING btree ("_path");
  CREATE INDEX "blog_page_blocks_ba_grid_filter_procedure_idx" ON "blog_page_blocks_ba_grid" USING btree ("filter_procedure_id");
  CREATE INDEX "blog_page_blocks_testimonial_list_order_idx" ON "blog_page_blocks_testimonial_list" USING btree ("_order");
  CREATE INDEX "blog_page_blocks_testimonial_list_parent_id_idx" ON "blog_page_blocks_testimonial_list" USING btree ("_parent_id");
  CREATE INDEX "blog_page_blocks_testimonial_list_path_idx" ON "blog_page_blocks_testimonial_list" USING btree ("_path");
  CREATE INDEX "blog_page_blocks_recovery_stay_list_order_idx" ON "blog_page_blocks_recovery_stay_list" USING btree ("_order");
  CREATE INDEX "blog_page_blocks_recovery_stay_list_parent_id_idx" ON "blog_page_blocks_recovery_stay_list" USING btree ("_parent_id");
  CREATE INDEX "blog_page_blocks_recovery_stay_list_path_idx" ON "blog_page_blocks_recovery_stay_list" USING btree ("_path");
  CREATE INDEX "blog_page_blocks_press_mention_list_order_idx" ON "blog_page_blocks_press_mention_list" USING btree ("_order");
  CREATE INDEX "blog_page_blocks_press_mention_list_parent_id_idx" ON "blog_page_blocks_press_mention_list" USING btree ("_parent_id");
  CREATE INDEX "blog_page_blocks_press_mention_list_path_idx" ON "blog_page_blocks_press_mention_list" USING btree ("_path");
  CREATE INDEX "blog_page_blocks_contact_form_order_idx" ON "blog_page_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "blog_page_blocks_contact_form_parent_id_idx" ON "blog_page_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "blog_page_blocks_contact_form_path_idx" ON "blog_page_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "blog_page_blocks_journey_step_list_order_idx" ON "blog_page_blocks_journey_step_list" USING btree ("_order");
  CREATE INDEX "blog_page_blocks_journey_step_list_parent_id_idx" ON "blog_page_blocks_journey_step_list" USING btree ("_parent_id");
  CREATE INDEX "blog_page_blocks_journey_step_list_path_idx" ON "blog_page_blocks_journey_step_list" USING btree ("_path");
  CREATE INDEX "blog_page_blocks_external_embed_order_idx" ON "blog_page_blocks_external_embed" USING btree ("_order");
  CREATE INDEX "blog_page_blocks_external_embed_parent_id_idx" ON "blog_page_blocks_external_embed" USING btree ("_parent_id");
  CREATE INDEX "blog_page_blocks_external_embed_path_idx" ON "blog_page_blocks_external_embed" USING btree ("_path");
  CREATE INDEX "blog_page_blocks_notes_order_idx" ON "blog_page_blocks_notes" USING btree ("_order");
  CREATE INDEX "blog_page_blocks_notes_parent_id_idx" ON "blog_page_blocks_notes" USING btree ("_parent_id");
  CREATE INDEX "blog_page_blocks_notes_path_idx" ON "blog_page_blocks_notes" USING btree ("_path");
  CREATE INDEX "blog_page_hero_image_idx" ON "blog_page" USING btree ("hero_image_id");
  CREATE INDEX "blog_page_seo_seo_og_image_idx" ON "blog_page" USING btree ("seo_og_image_id");
  ALTER TABLE "media" ADD CONSTRAINT "media_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_folders_fk" FOREIGN KEY ("payload_folders_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "media_category_idx" ON "media" USING btree ("category");
  CREATE INDEX "media_folder_idx" ON "media" USING btree ("folder_id");
  CREATE INDEX "payload_locked_documents_rels_payload_folders_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_folders_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_folders_folder_type" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_folders" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_image_grid_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_image_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_cta_band" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_faq_accordion_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_faq_accordion" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_procedure_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_surgeon_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_ba_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_testimonial_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_recovery_stay_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_press_mention_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_contact_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_journey_step_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_external_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_notes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "press_page_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "press_page_blocks_image_grid_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "press_page_blocks_image_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "press_page_blocks_cta_band" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "press_page_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "press_page_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "press_page_blocks_faq_accordion_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "press_page_blocks_faq_accordion" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "press_page_blocks_procedure_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "press_page_blocks_surgeon_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "press_page_blocks_ba_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "press_page_blocks_testimonial_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "press_page_blocks_recovery_stay_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "press_page_blocks_press_mention_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "press_page_blocks_contact_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "press_page_blocks_journey_step_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "press_page_blocks_external_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "press_page_blocks_notes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "press_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_page_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_page_blocks_image_grid_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_page_blocks_image_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_page_blocks_cta_band" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_page_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_page_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_page_blocks_faq_accordion_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_page_blocks_faq_accordion" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_page_blocks_procedure_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_page_blocks_surgeon_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_page_blocks_ba_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_page_blocks_testimonial_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_page_blocks_recovery_stay_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_page_blocks_press_mention_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_page_blocks_contact_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_page_blocks_journey_step_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_page_blocks_external_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_page_blocks_notes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "treatments_page_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "treatments_page_blocks_image_grid_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "treatments_page_blocks_image_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "treatments_page_blocks_cta_band" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "treatments_page_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "treatments_page_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "treatments_page_blocks_faq_accordion_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "treatments_page_blocks_faq_accordion" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "treatments_page_blocks_procedure_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "treatments_page_blocks_surgeon_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "treatments_page_blocks_ba_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "treatments_page_blocks_testimonial_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "treatments_page_blocks_recovery_stay_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "treatments_page_blocks_press_mention_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "treatments_page_blocks_contact_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "treatments_page_blocks_journey_step_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "treatments_page_blocks_external_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "treatments_page_blocks_notes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "treatments_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeons_page_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeons_page_blocks_image_grid_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeons_page_blocks_image_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeons_page_blocks_cta_band" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeons_page_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeons_page_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeons_page_blocks_faq_accordion_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeons_page_blocks_faq_accordion" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeons_page_blocks_procedure_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeons_page_blocks_surgeon_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeons_page_blocks_ba_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeons_page_blocks_testimonial_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeons_page_blocks_recovery_stay_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeons_page_blocks_press_mention_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeons_page_blocks_contact_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeons_page_blocks_journey_step_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeons_page_blocks_external_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeons_page_blocks_notes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "surgeons_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "results_page_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "results_page_blocks_image_grid_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "results_page_blocks_image_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "results_page_blocks_cta_band" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "results_page_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "results_page_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "results_page_blocks_faq_accordion_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "results_page_blocks_faq_accordion" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "results_page_blocks_procedure_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "results_page_blocks_surgeon_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "results_page_blocks_ba_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "results_page_blocks_testimonial_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "results_page_blocks_recovery_stay_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "results_page_blocks_press_mention_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "results_page_blocks_contact_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "results_page_blocks_journey_step_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "results_page_blocks_external_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "results_page_blocks_notes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "results_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_page_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_page_blocks_image_grid_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_page_blocks_image_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_page_blocks_cta_band" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_page_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_page_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_page_blocks_faq_accordion_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_page_blocks_faq_accordion" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_page_blocks_procedure_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_page_blocks_surgeon_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_page_blocks_ba_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_page_blocks_testimonial_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_page_blocks_recovery_stay_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_page_blocks_press_mention_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_page_blocks_contact_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_page_blocks_journey_step_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_page_blocks_external_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_page_blocks_notes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_page_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_page_blocks_image_grid_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_page_blocks_image_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_page_blocks_cta_band" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_page_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_page_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_page_blocks_faq_accordion_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_page_blocks_faq_accordion" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_page_blocks_procedure_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_page_blocks_surgeon_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_page_blocks_ba_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_page_blocks_testimonial_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_page_blocks_recovery_stay_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_page_blocks_press_mention_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_page_blocks_contact_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_page_blocks_journey_step_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_page_blocks_external_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_page_blocks_notes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "journey_page_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "journey_page_blocks_image_grid_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "journey_page_blocks_image_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "journey_page_blocks_cta_band" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "journey_page_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "journey_page_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "journey_page_blocks_faq_accordion_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "journey_page_blocks_faq_accordion" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "journey_page_blocks_procedure_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "journey_page_blocks_surgeon_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "journey_page_blocks_ba_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "journey_page_blocks_testimonial_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "journey_page_blocks_recovery_stay_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "journey_page_blocks_press_mention_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "journey_page_blocks_contact_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "journey_page_blocks_journey_step_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "journey_page_blocks_external_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "journey_page_blocks_notes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "journey_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "stories_page_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "stories_page_blocks_image_grid_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "stories_page_blocks_image_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "stories_page_blocks_cta_band" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "stories_page_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "stories_page_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "stories_page_blocks_faq_accordion_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "stories_page_blocks_faq_accordion" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "stories_page_blocks_procedure_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "stories_page_blocks_surgeon_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "stories_page_blocks_ba_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "stories_page_blocks_testimonial_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "stories_page_blocks_recovery_stay_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "stories_page_blocks_press_mention_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "stories_page_blocks_contact_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "stories_page_blocks_journey_step_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "stories_page_blocks_external_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "stories_page_blocks_notes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "stories_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rec_stays_pg_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rec_stays_pg_blocks_image_grid_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rec_stays_pg_blocks_image_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rec_stays_pg_blocks_cta_band" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rec_stays_pg_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rec_stays_pg_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rec_stays_pg_blocks_faq_accordion_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rec_stays_pg_blocks_faq_accordion" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rec_stays_pg_blocks_procedure_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rec_stays_pg_blocks_surgeon_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rec_stays_pg_blocks_ba_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rec_stays_pg_blocks_testimonial_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rec_stays_pg_blocks_recovery_stay_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rec_stays_pg_blocks_press_mention_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rec_stays_pg_blocks_contact_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rec_stays_pg_blocks_journey_step_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rec_stays_pg_blocks_external_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rec_stays_pg_blocks_notes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rec_stays_pg" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page_blocks_image_grid_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page_blocks_image_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page_blocks_cta_band" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page_blocks_faq_accordion_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page_blocks_faq_accordion" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page_blocks_procedure_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page_blocks_surgeon_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page_blocks_ba_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page_blocks_testimonial_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page_blocks_recovery_stay_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page_blocks_press_mention_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page_blocks_contact_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page_blocks_journey_step_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page_blocks_external_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page_blocks_notes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "vid_consult_pg_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "vid_consult_pg_blocks_image_grid_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "vid_consult_pg_blocks_image_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "vid_consult_pg_blocks_cta_band" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "vid_consult_pg_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "vid_consult_pg_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "vid_consult_pg_blocks_faq_accordion_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "vid_consult_pg_blocks_faq_accordion" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "vid_consult_pg_blocks_procedure_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "vid_consult_pg_blocks_surgeon_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "vid_consult_pg_blocks_ba_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "vid_consult_pg_blocks_testimonial_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "vid_consult_pg_blocks_recovery_stay_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "vid_consult_pg_blocks_press_mention_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "vid_consult_pg_blocks_contact_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "vid_consult_pg_blocks_journey_step_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "vid_consult_pg_blocks_external_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "vid_consult_pg_blocks_notes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "vid_consult_pg" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_page_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_page_blocks_image_grid_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_page_blocks_image_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_page_blocks_cta_band" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_page_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_page_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_page_blocks_faq_accordion_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_page_blocks_faq_accordion" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_page_blocks_procedure_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_page_blocks_surgeon_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_page_blocks_ba_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_page_blocks_testimonial_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_page_blocks_recovery_stay_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_page_blocks_press_mention_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_page_blocks_contact_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_page_blocks_journey_step_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_page_blocks_external_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_page_blocks_notes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_page" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "payload_folders_folder_type" CASCADE;
  DROP TABLE "payload_folders" CASCADE;
  DROP TABLE "home_page_blocks_rich_text" CASCADE;
  DROP TABLE "home_page_blocks_image_grid_images" CASCADE;
  DROP TABLE "home_page_blocks_image_grid" CASCADE;
  DROP TABLE "home_page_blocks_cta_band" CASCADE;
  DROP TABLE "home_page_blocks_stats_items" CASCADE;
  DROP TABLE "home_page_blocks_stats" CASCADE;
  DROP TABLE "home_page_blocks_faq_accordion_items" CASCADE;
  DROP TABLE "home_page_blocks_faq_accordion" CASCADE;
  DROP TABLE "home_page_blocks_procedure_list" CASCADE;
  DROP TABLE "home_page_blocks_surgeon_list" CASCADE;
  DROP TABLE "home_page_blocks_ba_grid" CASCADE;
  DROP TABLE "home_page_blocks_testimonial_list" CASCADE;
  DROP TABLE "home_page_blocks_recovery_stay_list" CASCADE;
  DROP TABLE "home_page_blocks_press_mention_list" CASCADE;
  DROP TABLE "home_page_blocks_contact_form" CASCADE;
  DROP TABLE "home_page_blocks_journey_step_list" CASCADE;
  DROP TABLE "home_page_blocks_external_embed" CASCADE;
  DROP TABLE "home_page_blocks_notes" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "press_page_blocks_rich_text" CASCADE;
  DROP TABLE "press_page_blocks_image_grid_images" CASCADE;
  DROP TABLE "press_page_blocks_image_grid" CASCADE;
  DROP TABLE "press_page_blocks_cta_band" CASCADE;
  DROP TABLE "press_page_blocks_stats_items" CASCADE;
  DROP TABLE "press_page_blocks_stats" CASCADE;
  DROP TABLE "press_page_blocks_faq_accordion_items" CASCADE;
  DROP TABLE "press_page_blocks_faq_accordion" CASCADE;
  DROP TABLE "press_page_blocks_procedure_list" CASCADE;
  DROP TABLE "press_page_blocks_surgeon_list" CASCADE;
  DROP TABLE "press_page_blocks_ba_grid" CASCADE;
  DROP TABLE "press_page_blocks_testimonial_list" CASCADE;
  DROP TABLE "press_page_blocks_recovery_stay_list" CASCADE;
  DROP TABLE "press_page_blocks_press_mention_list" CASCADE;
  DROP TABLE "press_page_blocks_contact_form" CASCADE;
  DROP TABLE "press_page_blocks_journey_step_list" CASCADE;
  DROP TABLE "press_page_blocks_external_embed" CASCADE;
  DROP TABLE "press_page_blocks_notes" CASCADE;
  DROP TABLE "press_page" CASCADE;
  DROP TABLE "privacy_page_blocks_rich_text" CASCADE;
  DROP TABLE "privacy_page_blocks_image_grid_images" CASCADE;
  DROP TABLE "privacy_page_blocks_image_grid" CASCADE;
  DROP TABLE "privacy_page_blocks_cta_band" CASCADE;
  DROP TABLE "privacy_page_blocks_stats_items" CASCADE;
  DROP TABLE "privacy_page_blocks_stats" CASCADE;
  DROP TABLE "privacy_page_blocks_faq_accordion_items" CASCADE;
  DROP TABLE "privacy_page_blocks_faq_accordion" CASCADE;
  DROP TABLE "privacy_page_blocks_procedure_list" CASCADE;
  DROP TABLE "privacy_page_blocks_surgeon_list" CASCADE;
  DROP TABLE "privacy_page_blocks_ba_grid" CASCADE;
  DROP TABLE "privacy_page_blocks_testimonial_list" CASCADE;
  DROP TABLE "privacy_page_blocks_recovery_stay_list" CASCADE;
  DROP TABLE "privacy_page_blocks_press_mention_list" CASCADE;
  DROP TABLE "privacy_page_blocks_contact_form" CASCADE;
  DROP TABLE "privacy_page_blocks_journey_step_list" CASCADE;
  DROP TABLE "privacy_page_blocks_external_embed" CASCADE;
  DROP TABLE "privacy_page_blocks_notes" CASCADE;
  DROP TABLE "privacy_page" CASCADE;
  DROP TABLE "treatments_page_blocks_rich_text" CASCADE;
  DROP TABLE "treatments_page_blocks_image_grid_images" CASCADE;
  DROP TABLE "treatments_page_blocks_image_grid" CASCADE;
  DROP TABLE "treatments_page_blocks_cta_band" CASCADE;
  DROP TABLE "treatments_page_blocks_stats_items" CASCADE;
  DROP TABLE "treatments_page_blocks_stats" CASCADE;
  DROP TABLE "treatments_page_blocks_faq_accordion_items" CASCADE;
  DROP TABLE "treatments_page_blocks_faq_accordion" CASCADE;
  DROP TABLE "treatments_page_blocks_procedure_list" CASCADE;
  DROP TABLE "treatments_page_blocks_surgeon_list" CASCADE;
  DROP TABLE "treatments_page_blocks_ba_grid" CASCADE;
  DROP TABLE "treatments_page_blocks_testimonial_list" CASCADE;
  DROP TABLE "treatments_page_blocks_recovery_stay_list" CASCADE;
  DROP TABLE "treatments_page_blocks_press_mention_list" CASCADE;
  DROP TABLE "treatments_page_blocks_contact_form" CASCADE;
  DROP TABLE "treatments_page_blocks_journey_step_list" CASCADE;
  DROP TABLE "treatments_page_blocks_external_embed" CASCADE;
  DROP TABLE "treatments_page_blocks_notes" CASCADE;
  DROP TABLE "treatments_page" CASCADE;
  DROP TABLE "surgeons_page_blocks_rich_text" CASCADE;
  DROP TABLE "surgeons_page_blocks_image_grid_images" CASCADE;
  DROP TABLE "surgeons_page_blocks_image_grid" CASCADE;
  DROP TABLE "surgeons_page_blocks_cta_band" CASCADE;
  DROP TABLE "surgeons_page_blocks_stats_items" CASCADE;
  DROP TABLE "surgeons_page_blocks_stats" CASCADE;
  DROP TABLE "surgeons_page_blocks_faq_accordion_items" CASCADE;
  DROP TABLE "surgeons_page_blocks_faq_accordion" CASCADE;
  DROP TABLE "surgeons_page_blocks_procedure_list" CASCADE;
  DROP TABLE "surgeons_page_blocks_surgeon_list" CASCADE;
  DROP TABLE "surgeons_page_blocks_ba_grid" CASCADE;
  DROP TABLE "surgeons_page_blocks_testimonial_list" CASCADE;
  DROP TABLE "surgeons_page_blocks_recovery_stay_list" CASCADE;
  DROP TABLE "surgeons_page_blocks_press_mention_list" CASCADE;
  DROP TABLE "surgeons_page_blocks_contact_form" CASCADE;
  DROP TABLE "surgeons_page_blocks_journey_step_list" CASCADE;
  DROP TABLE "surgeons_page_blocks_external_embed" CASCADE;
  DROP TABLE "surgeons_page_blocks_notes" CASCADE;
  DROP TABLE "surgeons_page" CASCADE;
  DROP TABLE "results_page_blocks_rich_text" CASCADE;
  DROP TABLE "results_page_blocks_image_grid_images" CASCADE;
  DROP TABLE "results_page_blocks_image_grid" CASCADE;
  DROP TABLE "results_page_blocks_cta_band" CASCADE;
  DROP TABLE "results_page_blocks_stats_items" CASCADE;
  DROP TABLE "results_page_blocks_stats" CASCADE;
  DROP TABLE "results_page_blocks_faq_accordion_items" CASCADE;
  DROP TABLE "results_page_blocks_faq_accordion" CASCADE;
  DROP TABLE "results_page_blocks_procedure_list" CASCADE;
  DROP TABLE "results_page_blocks_surgeon_list" CASCADE;
  DROP TABLE "results_page_blocks_ba_grid" CASCADE;
  DROP TABLE "results_page_blocks_testimonial_list" CASCADE;
  DROP TABLE "results_page_blocks_recovery_stay_list" CASCADE;
  DROP TABLE "results_page_blocks_press_mention_list" CASCADE;
  DROP TABLE "results_page_blocks_contact_form" CASCADE;
  DROP TABLE "results_page_blocks_journey_step_list" CASCADE;
  DROP TABLE "results_page_blocks_external_embed" CASCADE;
  DROP TABLE "results_page_blocks_notes" CASCADE;
  DROP TABLE "results_page" CASCADE;
  DROP TABLE "gallery_page_blocks_rich_text" CASCADE;
  DROP TABLE "gallery_page_blocks_image_grid_images" CASCADE;
  DROP TABLE "gallery_page_blocks_image_grid" CASCADE;
  DROP TABLE "gallery_page_blocks_cta_band" CASCADE;
  DROP TABLE "gallery_page_blocks_stats_items" CASCADE;
  DROP TABLE "gallery_page_blocks_stats" CASCADE;
  DROP TABLE "gallery_page_blocks_faq_accordion_items" CASCADE;
  DROP TABLE "gallery_page_blocks_faq_accordion" CASCADE;
  DROP TABLE "gallery_page_blocks_procedure_list" CASCADE;
  DROP TABLE "gallery_page_blocks_surgeon_list" CASCADE;
  DROP TABLE "gallery_page_blocks_ba_grid" CASCADE;
  DROP TABLE "gallery_page_blocks_testimonial_list" CASCADE;
  DROP TABLE "gallery_page_blocks_recovery_stay_list" CASCADE;
  DROP TABLE "gallery_page_blocks_press_mention_list" CASCADE;
  DROP TABLE "gallery_page_blocks_contact_form" CASCADE;
  DROP TABLE "gallery_page_blocks_journey_step_list" CASCADE;
  DROP TABLE "gallery_page_blocks_external_embed" CASCADE;
  DROP TABLE "gallery_page_blocks_notes" CASCADE;
  DROP TABLE "gallery_page" CASCADE;
  DROP TABLE "pricing_page_blocks_rich_text" CASCADE;
  DROP TABLE "pricing_page_blocks_image_grid_images" CASCADE;
  DROP TABLE "pricing_page_blocks_image_grid" CASCADE;
  DROP TABLE "pricing_page_blocks_cta_band" CASCADE;
  DROP TABLE "pricing_page_blocks_stats_items" CASCADE;
  DROP TABLE "pricing_page_blocks_stats" CASCADE;
  DROP TABLE "pricing_page_blocks_faq_accordion_items" CASCADE;
  DROP TABLE "pricing_page_blocks_faq_accordion" CASCADE;
  DROP TABLE "pricing_page_blocks_procedure_list" CASCADE;
  DROP TABLE "pricing_page_blocks_surgeon_list" CASCADE;
  DROP TABLE "pricing_page_blocks_ba_grid" CASCADE;
  DROP TABLE "pricing_page_blocks_testimonial_list" CASCADE;
  DROP TABLE "pricing_page_blocks_recovery_stay_list" CASCADE;
  DROP TABLE "pricing_page_blocks_press_mention_list" CASCADE;
  DROP TABLE "pricing_page_blocks_contact_form" CASCADE;
  DROP TABLE "pricing_page_blocks_journey_step_list" CASCADE;
  DROP TABLE "pricing_page_blocks_external_embed" CASCADE;
  DROP TABLE "pricing_page_blocks_notes" CASCADE;
  DROP TABLE "pricing_page" CASCADE;
  DROP TABLE "journey_page_blocks_rich_text" CASCADE;
  DROP TABLE "journey_page_blocks_image_grid_images" CASCADE;
  DROP TABLE "journey_page_blocks_image_grid" CASCADE;
  DROP TABLE "journey_page_blocks_cta_band" CASCADE;
  DROP TABLE "journey_page_blocks_stats_items" CASCADE;
  DROP TABLE "journey_page_blocks_stats" CASCADE;
  DROP TABLE "journey_page_blocks_faq_accordion_items" CASCADE;
  DROP TABLE "journey_page_blocks_faq_accordion" CASCADE;
  DROP TABLE "journey_page_blocks_procedure_list" CASCADE;
  DROP TABLE "journey_page_blocks_surgeon_list" CASCADE;
  DROP TABLE "journey_page_blocks_ba_grid" CASCADE;
  DROP TABLE "journey_page_blocks_testimonial_list" CASCADE;
  DROP TABLE "journey_page_blocks_recovery_stay_list" CASCADE;
  DROP TABLE "journey_page_blocks_press_mention_list" CASCADE;
  DROP TABLE "journey_page_blocks_contact_form" CASCADE;
  DROP TABLE "journey_page_blocks_journey_step_list" CASCADE;
  DROP TABLE "journey_page_blocks_external_embed" CASCADE;
  DROP TABLE "journey_page_blocks_notes" CASCADE;
  DROP TABLE "journey_page" CASCADE;
  DROP TABLE "stories_page_blocks_rich_text" CASCADE;
  DROP TABLE "stories_page_blocks_image_grid_images" CASCADE;
  DROP TABLE "stories_page_blocks_image_grid" CASCADE;
  DROP TABLE "stories_page_blocks_cta_band" CASCADE;
  DROP TABLE "stories_page_blocks_stats_items" CASCADE;
  DROP TABLE "stories_page_blocks_stats" CASCADE;
  DROP TABLE "stories_page_blocks_faq_accordion_items" CASCADE;
  DROP TABLE "stories_page_blocks_faq_accordion" CASCADE;
  DROP TABLE "stories_page_blocks_procedure_list" CASCADE;
  DROP TABLE "stories_page_blocks_surgeon_list" CASCADE;
  DROP TABLE "stories_page_blocks_ba_grid" CASCADE;
  DROP TABLE "stories_page_blocks_testimonial_list" CASCADE;
  DROP TABLE "stories_page_blocks_recovery_stay_list" CASCADE;
  DROP TABLE "stories_page_blocks_press_mention_list" CASCADE;
  DROP TABLE "stories_page_blocks_contact_form" CASCADE;
  DROP TABLE "stories_page_blocks_journey_step_list" CASCADE;
  DROP TABLE "stories_page_blocks_external_embed" CASCADE;
  DROP TABLE "stories_page_blocks_notes" CASCADE;
  DROP TABLE "stories_page" CASCADE;
  DROP TABLE "rec_stays_pg_blocks_rich_text" CASCADE;
  DROP TABLE "rec_stays_pg_blocks_image_grid_images" CASCADE;
  DROP TABLE "rec_stays_pg_blocks_image_grid" CASCADE;
  DROP TABLE "rec_stays_pg_blocks_cta_band" CASCADE;
  DROP TABLE "rec_stays_pg_blocks_stats_items" CASCADE;
  DROP TABLE "rec_stays_pg_blocks_stats" CASCADE;
  DROP TABLE "rec_stays_pg_blocks_faq_accordion_items" CASCADE;
  DROP TABLE "rec_stays_pg_blocks_faq_accordion" CASCADE;
  DROP TABLE "rec_stays_pg_blocks_procedure_list" CASCADE;
  DROP TABLE "rec_stays_pg_blocks_surgeon_list" CASCADE;
  DROP TABLE "rec_stays_pg_blocks_ba_grid" CASCADE;
  DROP TABLE "rec_stays_pg_blocks_testimonial_list" CASCADE;
  DROP TABLE "rec_stays_pg_blocks_recovery_stay_list" CASCADE;
  DROP TABLE "rec_stays_pg_blocks_press_mention_list" CASCADE;
  DROP TABLE "rec_stays_pg_blocks_contact_form" CASCADE;
  DROP TABLE "rec_stays_pg_blocks_journey_step_list" CASCADE;
  DROP TABLE "rec_stays_pg_blocks_external_embed" CASCADE;
  DROP TABLE "rec_stays_pg_blocks_notes" CASCADE;
  DROP TABLE "rec_stays_pg" CASCADE;
  DROP TABLE "contact_page_blocks_rich_text" CASCADE;
  DROP TABLE "contact_page_blocks_image_grid_images" CASCADE;
  DROP TABLE "contact_page_blocks_image_grid" CASCADE;
  DROP TABLE "contact_page_blocks_cta_band" CASCADE;
  DROP TABLE "contact_page_blocks_stats_items" CASCADE;
  DROP TABLE "contact_page_blocks_stats" CASCADE;
  DROP TABLE "contact_page_blocks_faq_accordion_items" CASCADE;
  DROP TABLE "contact_page_blocks_faq_accordion" CASCADE;
  DROP TABLE "contact_page_blocks_procedure_list" CASCADE;
  DROP TABLE "contact_page_blocks_surgeon_list" CASCADE;
  DROP TABLE "contact_page_blocks_ba_grid" CASCADE;
  DROP TABLE "contact_page_blocks_testimonial_list" CASCADE;
  DROP TABLE "contact_page_blocks_recovery_stay_list" CASCADE;
  DROP TABLE "contact_page_blocks_press_mention_list" CASCADE;
  DROP TABLE "contact_page_blocks_contact_form" CASCADE;
  DROP TABLE "contact_page_blocks_journey_step_list" CASCADE;
  DROP TABLE "contact_page_blocks_external_embed" CASCADE;
  DROP TABLE "contact_page_blocks_notes" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "vid_consult_pg_blocks_rich_text" CASCADE;
  DROP TABLE "vid_consult_pg_blocks_image_grid_images" CASCADE;
  DROP TABLE "vid_consult_pg_blocks_image_grid" CASCADE;
  DROP TABLE "vid_consult_pg_blocks_cta_band" CASCADE;
  DROP TABLE "vid_consult_pg_blocks_stats_items" CASCADE;
  DROP TABLE "vid_consult_pg_blocks_stats" CASCADE;
  DROP TABLE "vid_consult_pg_blocks_faq_accordion_items" CASCADE;
  DROP TABLE "vid_consult_pg_blocks_faq_accordion" CASCADE;
  DROP TABLE "vid_consult_pg_blocks_procedure_list" CASCADE;
  DROP TABLE "vid_consult_pg_blocks_surgeon_list" CASCADE;
  DROP TABLE "vid_consult_pg_blocks_ba_grid" CASCADE;
  DROP TABLE "vid_consult_pg_blocks_testimonial_list" CASCADE;
  DROP TABLE "vid_consult_pg_blocks_recovery_stay_list" CASCADE;
  DROP TABLE "vid_consult_pg_blocks_press_mention_list" CASCADE;
  DROP TABLE "vid_consult_pg_blocks_contact_form" CASCADE;
  DROP TABLE "vid_consult_pg_blocks_journey_step_list" CASCADE;
  DROP TABLE "vid_consult_pg_blocks_external_embed" CASCADE;
  DROP TABLE "vid_consult_pg_blocks_notes" CASCADE;
  DROP TABLE "vid_consult_pg" CASCADE;
  DROP TABLE "blog_page_blocks_rich_text" CASCADE;
  DROP TABLE "blog_page_blocks_image_grid_images" CASCADE;
  DROP TABLE "blog_page_blocks_image_grid" CASCADE;
  DROP TABLE "blog_page_blocks_cta_band" CASCADE;
  DROP TABLE "blog_page_blocks_stats_items" CASCADE;
  DROP TABLE "blog_page_blocks_stats" CASCADE;
  DROP TABLE "blog_page_blocks_faq_accordion_items" CASCADE;
  DROP TABLE "blog_page_blocks_faq_accordion" CASCADE;
  DROP TABLE "blog_page_blocks_procedure_list" CASCADE;
  DROP TABLE "blog_page_blocks_surgeon_list" CASCADE;
  DROP TABLE "blog_page_blocks_ba_grid" CASCADE;
  DROP TABLE "blog_page_blocks_testimonial_list" CASCADE;
  DROP TABLE "blog_page_blocks_recovery_stay_list" CASCADE;
  DROP TABLE "blog_page_blocks_press_mention_list" CASCADE;
  DROP TABLE "blog_page_blocks_contact_form" CASCADE;
  DROP TABLE "blog_page_blocks_journey_step_list" CASCADE;
  DROP TABLE "blog_page_blocks_external_embed" CASCADE;
  DROP TABLE "blog_page_blocks_notes" CASCADE;
  DROP TABLE "blog_page" CASCADE;
  ALTER TABLE "media" DROP CONSTRAINT "media_folder_id_payload_folders_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_payload_folders_fk";
  
  DROP INDEX "media_category_idx";
  DROP INDEX "media_folder_idx";
  DROP INDEX "payload_locked_documents_rels_payload_folders_id_idx";
  ALTER TABLE "media" DROP COLUMN "category";
  ALTER TABLE "media" DROP COLUMN "folder_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "payload_folders_id";
  DROP TYPE "public"."enum_media_category";
  DROP TYPE "public"."enum_payload_folders_folder_type";
  DROP TYPE "public"."enum_home_page_blocks_image_grid_columns";
  DROP TYPE "public"."enum_home_page_blocks_procedure_list_layout";
  DROP TYPE "public"."enum_home_page_blocks_surgeon_list_filter_group";
  DROP TYPE "public"."enum_home_page_blocks_surgeon_list_layout";
  DROP TYPE "public"."enum_home_page_blocks_journey_step_list_filter_category";
  DROP TYPE "public"."enum_home_page_blocks_notes_kind";
  DROP TYPE "public"."enum_home_page_publish_status";
  DROP TYPE "public"."enum_press_page_blocks_image_grid_columns";
  DROP TYPE "public"."enum_press_page_blocks_procedure_list_layout";
  DROP TYPE "public"."enum_press_page_blocks_surgeon_list_filter_group";
  DROP TYPE "public"."enum_press_page_blocks_surgeon_list_layout";
  DROP TYPE "public"."enum_press_page_blocks_journey_step_list_filter_category";
  DROP TYPE "public"."enum_press_page_blocks_notes_kind";
  DROP TYPE "public"."enum_press_page_publish_status";
  DROP TYPE "public"."enum_privacy_page_blocks_image_grid_columns";
  DROP TYPE "public"."enum_privacy_page_blocks_procedure_list_layout";
  DROP TYPE "public"."enum_privacy_page_blocks_surgeon_list_filter_group";
  DROP TYPE "public"."enum_privacy_page_blocks_surgeon_list_layout";
  DROP TYPE "public"."enum_privacy_page_blocks_journey_step_list_filter_category";
  DROP TYPE "public"."enum_privacy_page_blocks_notes_kind";
  DROP TYPE "public"."enum_privacy_page_publish_status";
  DROP TYPE "public"."enum_treatments_page_blocks_image_grid_columns";
  DROP TYPE "public"."enum_treatments_page_blocks_procedure_list_layout";
  DROP TYPE "public"."enum_treatments_page_blocks_surgeon_list_filter_group";
  DROP TYPE "public"."enum_treatments_page_blocks_surgeon_list_layout";
  DROP TYPE "public"."enum_treatments_page_blocks_journey_step_list_filter_category";
  DROP TYPE "public"."enum_treatments_page_blocks_notes_kind";
  DROP TYPE "public"."enum_treatments_page_publish_status";
  DROP TYPE "public"."enum_surgeons_page_blocks_image_grid_columns";
  DROP TYPE "public"."enum_surgeons_page_blocks_procedure_list_layout";
  DROP TYPE "public"."enum_surgeons_page_blocks_surgeon_list_filter_group";
  DROP TYPE "public"."enum_surgeons_page_blocks_surgeon_list_layout";
  DROP TYPE "public"."enum_surgeons_page_blocks_journey_step_list_filter_category";
  DROP TYPE "public"."enum_surgeons_page_blocks_notes_kind";
  DROP TYPE "public"."enum_surgeons_page_publish_status";
  DROP TYPE "public"."enum_results_page_blocks_image_grid_columns";
  DROP TYPE "public"."enum_results_page_blocks_procedure_list_layout";
  DROP TYPE "public"."enum_results_page_blocks_surgeon_list_filter_group";
  DROP TYPE "public"."enum_results_page_blocks_surgeon_list_layout";
  DROP TYPE "public"."enum_results_page_blocks_journey_step_list_filter_category";
  DROP TYPE "public"."enum_results_page_blocks_notes_kind";
  DROP TYPE "public"."enum_results_page_publish_status";
  DROP TYPE "public"."enum_gallery_page_blocks_image_grid_columns";
  DROP TYPE "public"."enum_gallery_page_blocks_procedure_list_layout";
  DROP TYPE "public"."enum_gallery_page_blocks_surgeon_list_filter_group";
  DROP TYPE "public"."enum_gallery_page_blocks_surgeon_list_layout";
  DROP TYPE "public"."enum_gallery_page_blocks_journey_step_list_filter_category";
  DROP TYPE "public"."enum_gallery_page_blocks_notes_kind";
  DROP TYPE "public"."enum_gallery_page_publish_status";
  DROP TYPE "public"."enum_pricing_page_blocks_image_grid_columns";
  DROP TYPE "public"."enum_pricing_page_blocks_procedure_list_layout";
  DROP TYPE "public"."enum_pricing_page_blocks_surgeon_list_filter_group";
  DROP TYPE "public"."enum_pricing_page_blocks_surgeon_list_layout";
  DROP TYPE "public"."enum_pricing_page_blocks_journey_step_list_filter_category";
  DROP TYPE "public"."enum_pricing_page_blocks_notes_kind";
  DROP TYPE "public"."enum_pricing_page_publish_status";
  DROP TYPE "public"."enum_journey_page_blocks_image_grid_columns";
  DROP TYPE "public"."enum_journey_page_blocks_procedure_list_layout";
  DROP TYPE "public"."enum_journey_page_blocks_surgeon_list_filter_group";
  DROP TYPE "public"."enum_journey_page_blocks_surgeon_list_layout";
  DROP TYPE "public"."enum_journey_page_blocks_journey_step_list_filter_category";
  DROP TYPE "public"."enum_journey_page_blocks_notes_kind";
  DROP TYPE "public"."enum_journey_page_publish_status";
  DROP TYPE "public"."enum_stories_page_blocks_image_grid_columns";
  DROP TYPE "public"."enum_stories_page_blocks_procedure_list_layout";
  DROP TYPE "public"."enum_stories_page_blocks_surgeon_list_filter_group";
  DROP TYPE "public"."enum_stories_page_blocks_surgeon_list_layout";
  DROP TYPE "public"."enum_stories_page_blocks_journey_step_list_filter_category";
  DROP TYPE "public"."enum_stories_page_blocks_notes_kind";
  DROP TYPE "public"."enum_stories_page_publish_status";
  DROP TYPE "public"."enum_rec_stays_pg_blocks_image_grid_columns";
  DROP TYPE "public"."enum_rec_stays_pg_blocks_procedure_list_layout";
  DROP TYPE "public"."enum_rec_stays_pg_blocks_surgeon_list_filter_group";
  DROP TYPE "public"."enum_rec_stays_pg_blocks_surgeon_list_layout";
  DROP TYPE "public"."enum_rec_stays_pg_blocks_journey_step_list_filter_category";
  DROP TYPE "public"."enum_rec_stays_pg_blocks_notes_kind";
  DROP TYPE "public"."enum_rec_stays_pg_publish_status";
  DROP TYPE "public"."enum_contact_page_blocks_image_grid_columns";
  DROP TYPE "public"."enum_contact_page_blocks_procedure_list_layout";
  DROP TYPE "public"."enum_contact_page_blocks_surgeon_list_filter_group";
  DROP TYPE "public"."enum_contact_page_blocks_surgeon_list_layout";
  DROP TYPE "public"."enum_contact_page_blocks_journey_step_list_filter_category";
  DROP TYPE "public"."enum_contact_page_blocks_notes_kind";
  DROP TYPE "public"."enum_contact_page_publish_status";
  DROP TYPE "public"."enum_vid_consult_pg_blocks_image_grid_columns";
  DROP TYPE "public"."enum_vid_consult_pg_blocks_procedure_list_layout";
  DROP TYPE "public"."enum_vid_consult_pg_blocks_surgeon_list_filter_group";
  DROP TYPE "public"."enum_vid_consult_pg_blocks_surgeon_list_layout";
  DROP TYPE "public"."enum_vid_consult_pg_blocks_journey_step_list_filter_category";
  DROP TYPE "public"."enum_vid_consult_pg_blocks_notes_kind";
  DROP TYPE "public"."enum_vid_consult_pg_publish_status";
  DROP TYPE "public"."enum_blog_page_blocks_image_grid_columns";
  DROP TYPE "public"."enum_blog_page_blocks_procedure_list_layout";
  DROP TYPE "public"."enum_blog_page_blocks_surgeon_list_filter_group";
  DROP TYPE "public"."enum_blog_page_blocks_surgeon_list_layout";
  DROP TYPE "public"."enum_blog_page_blocks_journey_step_list_filter_category";
  DROP TYPE "public"."enum_blog_page_blocks_notes_kind";
  DROP TYPE "public"."enum_blog_page_publish_status";`)
}

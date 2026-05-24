import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// R8.C — extend 3 existing About-bucket page globals with chrome-string
// fields so every visible atom on /blog, /press, /privacy becomes CMS-editable.
//
//   blog_page    + 8 cols: this-issue eyebrow, read-the-essay CTA, archive
//                  section (eyebrow, split heading, lede, filter-all label,
//                  empty-state copy)
//   press_page   + 8 cols: accreditations section (eyebrow, heading, lede)
//                  + press section (eyebrow, split heading, lede)
//                  + press-enquiries CTA label
//   privacy_page + 4 cols: last-updated date, version line, reading-time
//                  line, intro paragraph
//
// All DEFAULTs match the strings currently hardcoded in the routes, so
// existing rows render unchanged before any route rewire happens (visual
// invariance gate).

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- blog_page
    ALTER TABLE "blog_page" ADD COLUMN IF NOT EXISTS "this_issue_eyebrow" character varying DEFAULT 'This issue';
    ALTER TABLE "blog_page" ADD COLUMN IF NOT EXISTS "read_the_essay_cta_label" character varying DEFAULT 'Read the essay →';
    ALTER TABLE "blog_page" ADD COLUMN IF NOT EXISTS "archive_section_eyebrow" character varying DEFAULT 'The archive';
    ALTER TABLE "blog_page" ADD COLUMN IF NOT EXISTS "archive_section_heading_pre" character varying DEFAULT 'Recent ';
    ALTER TABLE "blog_page" ADD COLUMN IF NOT EXISTS "archive_section_heading_italic" character varying DEFAULT 'writing.';
    ALTER TABLE "blog_page" ADD COLUMN IF NOT EXISTS "archive_section_lede" character varying DEFAULT 'Filter by discipline, or read down. New essays go out with the quarterly journal — subscribe at the foot of any page.';
    ALTER TABLE "blog_page" ADD COLUMN IF NOT EXISTS "archive_section_filter_all_label" character varying DEFAULT 'All';
    ALTER TABLE "blog_page" ADD COLUMN IF NOT EXISTS "archive_section_empty_state_copy" character varying DEFAULT 'No posts in this category yet.';

    -- press_page
    ALTER TABLE "press_page" ADD COLUMN IF NOT EXISTS "accreditations_section_eyebrow" character varying DEFAULT 'Accreditations';
    ALTER TABLE "press_page" ADD COLUMN IF NOT EXISTS "accreditations_section_heading" character varying DEFAULT 'The credentials we hold.';
    ALTER TABLE "press_page" ADD COLUMN IF NOT EXISTS "accreditations_section_lede" character varying DEFAULT 'We have spent twenty-eight years building these credentials, one at a time, because they are the only thing that actually matters in our line of work.';
    ALTER TABLE "press_page" ADD COLUMN IF NOT EXISTS "press_section_eyebrow" character varying DEFAULT 'In the press';
    ALTER TABLE "press_page" ADD COLUMN IF NOT EXISTS "press_section_heading_pre" character varying DEFAULT 'Quietly, in ';
    ALTER TABLE "press_page" ADD COLUMN IF NOT EXISTS "press_section_heading_italic" character varying DEFAULT 'good company.';
    ALTER TABLE "press_page" ADD COLUMN IF NOT EXISTS "press_section_lede" character varying DEFAULT 'A small selection from the editorial coverage of the past eighteen months. We do not pitch — but we are happy to talk to journalists who reach us directly.';
    ALTER TABLE "press_page" ADD COLUMN IF NOT EXISTS "press_enquiries_cta_label" character varying DEFAULT 'Press enquiries';

    -- privacy_page
    ALTER TABLE "privacy_page" ADD COLUMN IF NOT EXISTS "last_updated_date" character varying DEFAULT '12 May 2026';
    ALTER TABLE "privacy_page" ADD COLUMN IF NOT EXISTS "version_line" character varying DEFAULT 'Version 4.2 · Annual review cycle';
    ALTER TABLE "privacy_page" ADD COLUMN IF NOT EXISTS "reading_time_line" character varying DEFAULT 'Read in 6 minutes';
    ALTER TABLE "privacy_page" ADD COLUMN IF NOT EXISTS "intro_paragraph" character varying;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "blog_page" DROP COLUMN IF EXISTS "this_issue_eyebrow";
    ALTER TABLE "blog_page" DROP COLUMN IF EXISTS "read_the_essay_cta_label";
    ALTER TABLE "blog_page" DROP COLUMN IF EXISTS "archive_section_eyebrow";
    ALTER TABLE "blog_page" DROP COLUMN IF EXISTS "archive_section_heading_pre";
    ALTER TABLE "blog_page" DROP COLUMN IF EXISTS "archive_section_heading_italic";
    ALTER TABLE "blog_page" DROP COLUMN IF EXISTS "archive_section_lede";
    ALTER TABLE "blog_page" DROP COLUMN IF EXISTS "archive_section_filter_all_label";
    ALTER TABLE "blog_page" DROP COLUMN IF EXISTS "archive_section_empty_state_copy";

    ALTER TABLE "press_page" DROP COLUMN IF EXISTS "accreditations_section_eyebrow";
    ALTER TABLE "press_page" DROP COLUMN IF EXISTS "accreditations_section_heading";
    ALTER TABLE "press_page" DROP COLUMN IF EXISTS "accreditations_section_lede";
    ALTER TABLE "press_page" DROP COLUMN IF EXISTS "press_section_eyebrow";
    ALTER TABLE "press_page" DROP COLUMN IF EXISTS "press_section_heading_pre";
    ALTER TABLE "press_page" DROP COLUMN IF EXISTS "press_section_heading_italic";
    ALTER TABLE "press_page" DROP COLUMN IF EXISTS "press_section_lede";
    ALTER TABLE "press_page" DROP COLUMN IF EXISTS "press_enquiries_cta_label";

    ALTER TABLE "privacy_page" DROP COLUMN IF EXISTS "last_updated_date";
    ALTER TABLE "privacy_page" DROP COLUMN IF EXISTS "version_line";
    ALTER TABLE "privacy_page" DROP COLUMN IF EXISTS "reading_time_line";
    ALTER TABLE "privacy_page" DROP COLUMN IF EXISTS "intro_paragraph";
  `)
}

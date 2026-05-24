import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// R8.B — new BlogPostTemplate Global backing the chrome strings shared across
// every /blog/<slug> page (byline labels, About-the-author section, More-from
// -the-journal section).
//
// Singleton — one table, no array tables, no FK in payload_locked_documents_rels
// (globals are locked by slug, not row id). Pattern mirrors journey_hero.
//
// Per CLAUDE.md gotcha: payload migrate runner hangs on generated migrations,
// so this is hand-written direct-SQL.

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "blog_post_template" (
      "id" serial PRIMARY KEY NOT NULL,
      "byline_written_by_label" character varying DEFAULT 'Written by',
      "byline_published_label" character varying DEFAULT 'Published',
      "byline_length_label" character varying DEFAULT 'Length',
      "byline_filed_under_label" character varying DEFAULT 'Filed under',
      "about_the_author_eyebrow_label" character varying DEFAULT 'About the author',
      "about_the_author_read_full_profile_cta" character varying DEFAULT 'Read full profile',
      "about_the_author_book_consultation_cta" character varying DEFAULT 'Book a consultation',
      "more_from_the_journal_eyebrow" character varying DEFAULT 'More from the journal',
      "more_from_the_journal_heading_pre" character varying DEFAULT 'Read ',
      "more_from_the_journal_heading_italic" character varying DEFAULT 'on.',
      "more_from_the_journal_back_to_journal_cta" character varying DEFAULT 'Back to the journal',
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "blog_post_template";
  `)
}

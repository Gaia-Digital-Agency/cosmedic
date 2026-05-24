import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// R8.A — new PrivacySections collection backing the 10 hardcoded legal
// sections on /privacy. Schema mirrors existing collection-with-array
// patterns (cf. recovery_stays + recovery_stays_amenities / _gallery).
//
// Tables created:
//   privacy_sections                    main row (slug + title + sort_order)
//   privacy_sections_paragraphs         array (one <p> per row)
//   privacy_sections_list_items         array (one <li> per row)
//
// Plus the standard Payload bookkeeping: a privacy_sections_id FK column on
// payload_locked_documents_rels so admin-edit locking works the same as
// every other collection.
//
// Per CLAUDE.md gotcha: payload migrate runner hangs on generated migrations,
// so this is hand-written direct-SQL like q4 / q5 / q14 / q19.

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Main table
    CREATE TABLE IF NOT EXISTS "privacy_sections" (
      "id" serial PRIMARY KEY NOT NULL,
      "slug" character varying NOT NULL,
      "title" character varying NOT NULL,
      "sort_order" numeric DEFAULT 0,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE UNIQUE INDEX IF NOT EXISTS "privacy_sections_slug_idx" ON "privacy_sections" USING btree ("slug");
    CREATE INDEX IF NOT EXISTS "privacy_sections_updated_at_idx" ON "privacy_sections" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "privacy_sections_created_at_idx" ON "privacy_sections" USING btree ("created_at");

    -- Array: paragraphs
    CREATE TABLE IF NOT EXISTS "privacy_sections_paragraphs" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" character varying PRIMARY KEY NOT NULL,
      "text" character varying NOT NULL
    );

    DO $$ BEGIN
      ALTER TABLE "privacy_sections_paragraphs"
        ADD CONSTRAINT "privacy_sections_paragraphs_parent_id_fk"
        FOREIGN KEY ("_parent_id")
        REFERENCES "privacy_sections"("id")
        ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE INDEX IF NOT EXISTS "privacy_sections_paragraphs_order_idx" ON "privacy_sections_paragraphs" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "privacy_sections_paragraphs_parent_id_idx" ON "privacy_sections_paragraphs" USING btree ("_parent_id");

    -- Array: list items
    CREATE TABLE IF NOT EXISTS "privacy_sections_list_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" character varying PRIMARY KEY NOT NULL,
      "text" character varying NOT NULL
    );

    DO $$ BEGIN
      ALTER TABLE "privacy_sections_list_items"
        ADD CONSTRAINT "privacy_sections_list_items_parent_id_fk"
        FOREIGN KEY ("_parent_id")
        REFERENCES "privacy_sections"("id")
        ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE INDEX IF NOT EXISTS "privacy_sections_list_items_order_idx" ON "privacy_sections_list_items" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "privacy_sections_list_items_parent_id_idx" ON "privacy_sections_list_items" USING btree ("_parent_id");

    -- Wire the new collection into payload_locked_documents_rels so the admin
    -- knows how to lock a privacy-section row while another editor is on it.
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "privacy_sections_id" integer;

    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels"
        ADD CONSTRAINT "payload_locked_documents_rels_privacy_sections_fk"
        FOREIGN KEY ("privacy_sections_id")
        REFERENCES "privacy_sections"("id")
        ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_privacy_sections_id_idx"
      ON "payload_locked_documents_rels" USING btree ("privacy_sections_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "payload_locked_documents_rels_privacy_sections_id_idx";
    ALTER TABLE "payload_locked_documents_rels"
      DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_privacy_sections_fk";
    ALTER TABLE "payload_locked_documents_rels"
      DROP COLUMN IF EXISTS "privacy_sections_id";

    DROP TABLE IF EXISTS "privacy_sections_list_items";
    DROP TABLE IF EXISTS "privacy_sections_paragraphs";
    DROP TABLE IF EXISTS "privacy_sections";
  `)
}

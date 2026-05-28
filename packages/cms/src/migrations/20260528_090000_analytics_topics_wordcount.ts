import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Adds word_count (integer) and analytics_topics (hasMany select) to the
// analytics collection so the Ask The Doctor log shows treatment categories
// and question length in the admin list view.

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE analytics ADD COLUMN IF NOT EXISTS "word_count" integer;

    CREATE TABLE IF NOT EXISTS "analytics_topics" (
      "_order"     integer           NOT NULL,
      "_parent_id" integer           NOT NULL,
      "id"         character varying NOT NULL DEFAULT gen_random_uuid()::text,
      "value"      character varying NOT NULL,
      PRIMARY KEY ("id")
    );
    CREATE INDEX IF NOT EXISTS "analytics_topics_order_idx"     ON "analytics_topics" ("_order");
    CREATE INDEX IF NOT EXISTS "analytics_topics_parent_id_idx" ON "analytics_topics" ("_parent_id");
    ALTER TABLE "analytics_topics"
      ADD CONSTRAINT "analytics_topics_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "analytics"("id") ON DELETE CASCADE;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "analytics_topics";
    ALTER TABLE analytics DROP COLUMN IF EXISTS "word_count";
  `)
}

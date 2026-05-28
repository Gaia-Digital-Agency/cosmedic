import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Fixes analytics_topics.id NOT NULL violation.
//
// Root cause: node-postgres uses the extended query protocol (prepared
// statements). PostgreSQL does not allow the DEFAULT keyword in VALUES
// clauses inside prepared statements — the value arrives at the server
// as null, hitting the NOT NULL constraint on the id column.
//
// Fix: a BEFORE INSERT trigger that generates a UUID when id is null,
// so the NOT NULL constraint is always satisfied regardless of how the
// ORM sends the insert.

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE OR REPLACE FUNCTION analytics_topics_generate_id()
    RETURNS TRIGGER AS $$
    BEGIN
      IF NEW.id IS NULL OR NEW.id = '' THEN
        NEW.id := gen_random_uuid()::text;
      END IF;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    DROP TRIGGER IF EXISTS analytics_topics_id_gen ON analytics_topics;

    CREATE TRIGGER analytics_topics_id_gen
    BEFORE INSERT ON analytics_topics
    FOR EACH ROW EXECUTE FUNCTION analytics_topics_generate_id();
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TRIGGER IF EXISTS analytics_topics_id_gen ON analytics_topics;
    DROP FUNCTION IF EXISTS analytics_topics_generate_id();
  `)
}

import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// q4 — replace home 6-card associates grid with single team group photo.
// Adds 3 columns to home_page.surgeons_block:
//   - team_caption           (text — replaces "{N} practitioners" label)
//   - group_photo_id         (FK → media.id, ON DELETE SET NULL)
//   - group_photo_alt        (text — alt text override)
// Per CLAUDE.md gotcha: payload migrate hangs on large generated migrations,
// so this is hand-written direct-SQL like 20260521_042540_add_media_isPlaceholder.

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "home_page" ADD COLUMN IF NOT EXISTS "surgeons_block_team_caption" character varying;
    ALTER TABLE "home_page" ADD COLUMN IF NOT EXISTS "surgeons_block_group_photo_alt" character varying;
    ALTER TABLE "home_page" ADD COLUMN IF NOT EXISTS "surgeons_block_group_photo_id" integer;

    DO $$ BEGIN
      ALTER TABLE "home_page"
        ADD CONSTRAINT "home_page_surgeons_block_group_photo_id_media_id_fk"
        FOREIGN KEY ("surgeons_block_group_photo_id")
        REFERENCES "media"("id")
        ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE INDEX IF NOT EXISTS "home_page_surgeons_block_group_photo_idx"
      ON "home_page" USING btree ("surgeons_block_group_photo_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "home_page_surgeons_block_group_photo_idx";
    ALTER TABLE "home_page" DROP CONSTRAINT IF EXISTS "home_page_surgeons_block_group_photo_id_media_id_fk";
    ALTER TABLE "home_page" DROP COLUMN IF EXISTS "surgeons_block_group_photo_id";
    ALTER TABLE "home_page" DROP COLUMN IF EXISTS "surgeons_block_group_photo_alt";
    ALTER TABLE "home_page" DROP COLUMN IF EXISTS "surgeons_block_team_caption";
  `)
}

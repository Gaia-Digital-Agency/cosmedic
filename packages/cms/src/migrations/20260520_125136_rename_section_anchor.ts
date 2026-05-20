import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "sub_categories_sections" ADD COLUMN "anchor_id" varchar NOT NULL;
  ALTER TABLE "procedures_sections" ADD COLUMN "anchor_id" varchar NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "sub_categories_sections" DROP COLUMN "anchor_id";
  ALTER TABLE "procedures_sections" DROP COLUMN "anchor_id";`)
}

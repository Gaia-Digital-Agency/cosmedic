import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// q14 — Before/After cards: patient age + recovery duration.
// Adds 2 columns to before_after_cases:
//   - patient_age          (numeric, nullable)
//   - recovery_duration    (text, nullable — free-form e.g. "4 months")
// Per CLAUDE.md gotcha: payload migrate hangs on large generated migrations,
// so applied directly via psql and registered in payload_migrations.

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "before_after_cases" ADD COLUMN IF NOT EXISTS "patient_age" numeric;
    ALTER TABLE "before_after_cases" ADD COLUMN IF NOT EXISTS "recovery_duration" character varying;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "before_after_cases" DROP COLUMN IF EXISTS "recovery_duration";
    ALTER TABLE "before_after_cases" DROP COLUMN IF EXISTS "patient_age";
  `)
}

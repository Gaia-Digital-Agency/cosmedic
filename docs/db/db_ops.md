# BIMC CosMedic — Database Operations

> Postgres operational reference: provisioning, migrations, backup, restore, performance, monitoring. Companion to `docs/db_schema.md` (the WHAT — fields per collection) and [CMS_structure.md](CMS_structure.md) (the locked CMS bucket source of truth). This doc is the HOW — how the DB is provisioned, evolved, and operated.

> **Updated 2026-05-23 — operational gotchas surfaced during DO SECOND + relevant to Phase C9 migrations:**
>
> | Gotcha | Workaround |
> |---|---|
> | `payload migrate` hangs silently on large migrations (~4000+ LOC) — JS runtime burns CPU but never submits DDL to Postgres | Extract the migration's UP SQL via `awk 'NR>=5 && NR<=N { … }' migration.ts > /tmp/up.sql`, then `sudo -u postgres psql -d cosmedic --single-transaction -v ON_ERROR_STOP=1 -f /tmp/up.sql`. Mark applied: `INSERT INTO payload_migrations (name, batch, created_at, updated_at) VALUES ('<name>', <next>, NOW(), NOW())`. Used for `20260522_072509_pages_to_globals` (4832 LOC, 266 objects). |
> | Direct psql DDL leaves new objects owned by `postgres`; Payload connects as `cosmedic` and gets `permission denied for table X` | After applying schema directly, run ownership fix: `psql -tAc "SELECT 'ALTER TABLE \"' \|\| tablename \|\| '\" OWNER TO cosmedic;' FROM pg_tables WHERE schemaname='public'" \| psql -d cosmedic`. Repeat for sequences (`pg_sequences`) + types (`pg_type WHERE typtype='e' AND typnamespace='public'`). Set default privileges: `ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO cosmedic`. |
> | `tsx` migration scripts that call `getPayload()` trigger `pushDevSchema` unless `NODE_ENV=production` — Drizzle push then attempts `ALTER TABLE ... DROP CONSTRAINT` and fails on the non-`postgres` connection | Always: `NODE_ENV=production pnpm --filter @cosmedic/cms exec tsx <script>`. Forgetting this is the #1 cause of "migration looked OK but admin is broken". |
> | Postgres 63-char identifier limit truncates `enum_<global>_blocks_<block>_<field>` names mid-string and fails CREATE TYPE | Add `dbName: 'short_name'` override on the GlobalConfig. Live examples: `recovery-stays-page` → `rec_stays_pg`; `video-consult-page` → `vid_consult_pg`. Plan ahead for Phase C9 schema additions on Procedures. |
> | `git stash -u` will sweep untracked top-level directories (e.g. `changes/`, `database_backup/`) into the stash | Recover via `git checkout stash@{0}^3 -- <path>`. `/changes/`, `/database_backup/`, `/.claude/worktrees/` already in `.gitignore`. |

---

## 1. Inventory

| Item | Value |
|---|---|
| Engine | PostgreSQL 15+ (system-installed on `gda-s01`) |
| Listener | `127.0.0.1:5432` (localhost only — never exposed) |
| Database | `cosmedic` |
| Role | `cosmedic` (login, owner of db, no superuser) |
| Schema | `public` (Payload default; we don't carve namespaces) |
| ORM | Drizzle (via Payload v3's `@payloadcms/db-postgres` adapter) |
| Migration tool | Drizzle migrations (managed by Payload) |
| Connection driver | `pg` (Node, via Payload) |

## 2. Provisioning (Phase 1 — first time only)

Run **once** on `gda-s01` as root/sudo:

```bash
# Generate a strong password
PW=$(openssl rand -base64 24 | tr -d '/+=' | head -c 32)
echo "Stash this password in packages/cms/.env: $PW"

# Create role + database
sudo -u postgres psql <<SQL
CREATE ROLE cosmedic WITH LOGIN PASSWORD '$PW' NOSUPERUSER NOCREATEDB NOCREATEROLE;
CREATE DATABASE cosmedic OWNER cosmedic ENCODING 'UTF8' LC_COLLATE 'en_US.UTF-8' LC_CTYPE 'en_US.UTF-8' TEMPLATE template0;
SQL

# Grant schema privileges (Postgres 15+ requires explicit GRANT on public schema)
sudo -u postgres psql -d cosmedic <<SQL
GRANT ALL ON SCHEMA public TO cosmedic;
ALTER SCHEMA public OWNER TO cosmedic;
SQL

# Verify
sudo -u postgres psql -d cosmedic -c "\du+ cosmedic"
sudo -u postgres psql -d cosmedic -c "\dn+"
```

The `cosmedic` role:
- Has no superuser / createdb / createrole privileges (least privilege).
- Owns its own database, can read/write all tables in `public`.
- Cannot touch any other sibling site's database — guaranteed by Postgres role permissions.

## 3. Connection config

In `packages/cms/.env` (gitignored):

```bash
DATABASE_URI=postgres://cosmedic:<password>@127.0.0.1:5432/cosmedic
```

In `packages/cms/src/payload.config.ts`:

```ts
import { postgresAdapter } from '@payloadcms/db-postgres'

export default buildConfig({
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
      max: 10,                    // max connections (default 10; raise to 20 only if Phase 11 shows pool starvation)
      idleTimeoutMillis: 30_000,  // close idle clients after 30s
      connectionTimeoutMillis: 5_000,
    },
    // Use the default schema (public). Don't enable `schemaName` — sibling-site isolation
    // is guaranteed by role/db, not schema.
    push: false,                  // disable Drizzle's auto-push in production
  }),
  // ...rest of config
})
```

**Why `push: false` in production**: Payload v3 + Drizzle can auto-push schema changes on startup. Convenient in dev; dangerous in prod because a malformed config can destructively alter tables. We use explicit migrations (next section).

In **dev** (when iterating on collections during Phase 6), it's fine to keep `push: true` so schema follows code automatically. Flip to `false` before Phase 12 (launch).

## 4. Migrations

Payload v3 + Drizzle migrations are the source of truth for prod schema changes.

### Workflow

```bash
# After editing a Payload collection (e.g. added a field to Surgeons):
pnpm --filter @cosmedic/cms exec payload migrate:create add_surgeons_languages_field

# Generated file lands at: packages/cms/src/migrations/YYYYMMDD_HHMMSS_add_surgeons_languages_field.ts
# Review the SQL it generates — Drizzle is conservative but always read the diff.

# Apply locally / on server:
pnpm --filter @cosmedic/cms exec payload migrate

# Roll back (last migration only):
pnpm --filter @cosmedic/cms exec payload migrate:down
```

### Rules

- **Never** edit a migration file after it's been applied to any environment.
- Migration files are committed to git (under `packages/cms/src/migrations/`).
- Run `migrate` as part of the deploy pipeline **before** restarting pm2.
- If a migration fails partway, restore from the latest backup (next section) and rerun. Postgres DDL is transactional per migration — if a statement errors, the whole migration rolls back.

## 5. Backup + restore

### Automated daily backup (Phase 14 cron)

```cron
# /etc/cron.d/cosmedic-backup
30 02 * * * azlan /var/www/cosmedic/scripts/backup-db.sh >> /var/log/cosmedic-backup.log 2>&1
```

`scripts/backup-db.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail
BACKUP_DIR=/var/backups/cosmedic
mkdir -p "$BACKUP_DIR"
STAMP=$(date +%Y%m%d_%H%M%S)
OUT="$BACKUP_DIR/cosmedic_${STAMP}.dump"

# Format: custom (compressed, supports parallel restore, drops + recreates objects)
pg_dump --host=127.0.0.1 --username=cosmedic --format=custom --no-owner --no-privileges --file="$OUT" cosmedic

# Verify the dump is parseable
pg_restore --list "$OUT" >/dev/null

# Retention: 14 daily + 8 weekly + 6 monthly
find "$BACKUP_DIR" -name "cosmedic_*.dump" -mtime +14 -delete  # keep last 14 days
# (Weekly + monthly handled by separate cron — see Phase 14 plan)

# Optional: rsync to off-server location (GCS / S3)
# gsutil rsync "$BACKUP_DIR" gs://gaiada-backups/cosmedic/
```

Required `~/.pgpass` for unattended runs:

```
127.0.0.1:5432:cosmedic:cosmedic:<password>
```

Permissions: `chmod 600 ~/.pgpass`.

### Restore (full database)

**Pre-restore**: stop pm2 processes to prevent writes during restore.

```bash
pm2 stop cosmedic-cms cosmedic-web

# Drop + recreate the empty database (DESTRUCTIVE — only run if you're restoring from a backup you trust)
sudo -u postgres psql <<SQL
DROP DATABASE IF EXISTS cosmedic;
CREATE DATABASE cosmedic OWNER cosmedic ENCODING 'UTF8' TEMPLATE template0;
SQL
sudo -u postgres psql -d cosmedic -c "GRANT ALL ON SCHEMA public TO cosmedic;"

# Restore from the latest backup (parallel jobs speed it up)
pg_restore --host=127.0.0.1 --username=cosmedic --dbname=cosmedic --no-owner --no-privileges --jobs=4 /var/backups/cosmedic/cosmedic_20260520_023000.dump

# Restart
pm2 start cosmedic-cms cosmedic-web
```

### Restore (single collection / row)

For surgical recovery (e.g. an editor accidentally deleted a surgeon), do **not** full-restore. Instead:

```bash
# Spin up a sandbox database from the backup
sudo -u postgres createdb cosmedic_sandbox OWNER cosmedic
pg_restore -h 127.0.0.1 -U cosmedic -d cosmedic_sandbox -j 4 /var/backups/cosmedic/cosmedic_<stamp>.dump

# Inspect the row you want
psql -h 127.0.0.1 -U cosmedic -d cosmedic_sandbox -c "SELECT id, slug, name FROM surgeons WHERE slug='suka';"

# Copy it back via pg_dump on a single row, OR re-create via Payload Local API (cleaner — preserves relations + hooks)
# Then drop the sandbox:
sudo -u postgres dropdb cosmedic_sandbox
```

### Quarterly restore drill

Once a quarter, restore the latest dump to `cosmedic_drill` and run a smoke test:

```bash
sudo -u postgres createdb cosmedic_drill OWNER cosmedic
pg_restore -h 127.0.0.1 -U cosmedic -d cosmedic_drill -j 4 /var/backups/cosmedic/<latest>.dump
psql -h 127.0.0.1 -U cosmedic -d cosmedic_drill -c "
  SELECT 'surgeons' tbl, count(*) FROM surgeons
  UNION ALL SELECT 'procedures', count(*) FROM procedures
  UNION ALL SELECT 'enquiries', count(*) FROM enquiries
  UNION ALL SELECT 'media', count(*) FROM media;
"
sudo -u postgres dropdb cosmedic_drill
```

If the counts roughly match production, the backup is healthy.

## 6. Performance + indexes

Payload + Drizzle auto-creates indexes for:
- Every collection's `id` (primary key).
- Foreign-key columns of `relationship` fields.
- `_locale` discriminator on localized tables.

Indexes you should **add manually** via migration:

| Index | Why |
|---|---|
| `surgeons (slug)` UNIQUE | Slug-based URL lookups (already created by Payload since slug is `unique: true`) |
| `procedures (slug)` UNIQUE | Same as above |
| `procedures (parent_subcategory_id, parent_discipline_id)` | Discipline + sub-category page queries |
| `price_list_items (sheet, category)` | `/pricing` table filtering |
| `enquiries (status, submitted_at)` | Admin enquiry triage queries |
| `enquiries (email)` (non-unique) | Cross-referencing returning enquirers |
| `media (mime_type)` | Faster admin filter by file type |
| `before_after_cases (procedure_id, is_featured)` | Procedure detail page B&A lookups + homepage teaser |

Add these as a follow-up migration once the schema lands (don't add upfront — Drizzle won't know about them).

### Slow-query log

Enable in `postgresql.conf` (system-managed; coordinate with sibling sites — this is server-wide):

```ini
log_min_duration_statement = 250  # log queries slower than 250ms
log_statement = 'none'            # don't log every statement, only slow ones
```

Watch the log in Phase 11 QA — anything > 1s is a hot spot to index.

## 7. Schema introspection

Once Payload has materialized the schema:

```bash
# List tables (one per collection + version tables + locale tables)
psql -h 127.0.0.1 -U cosmedic -d cosmedic -c "\dt"

# Describe a specific table
psql -h 127.0.0.1 -U cosmedic -d cosmedic -c "\d+ surgeons"

# Count rows across all collections
psql -h 127.0.0.1 -U cosmedic -d cosmedic -c "
SELECT relname AS table, n_live_tup AS rows
FROM pg_stat_user_tables
ORDER BY n_live_tup DESC;
"
```

Payload creates extra tables you'll see:
- `<collection>` — main collection rows.
- `<collection>_locales` — localized field values per locale.
- `<collection>_v` — versioned drafts (if drafts enabled for that collection).
- `<collection>_v_locales` — versioned + localized.
- `<collection>_rels` — join table for many-to-many relationships.
- `payload_migrations` — Drizzle migration ledger.
- `payload_preferences` — admin UI preferences per user.

Don't query these tables directly from web — always go through Payload's API (it handles draft/published, locale fallbacks, and relationship resolution).

## 8. Multi-environment

For now: **single environment** (gda-s01 prod). No staging.

If a staging environment is added later:
- Create a second db on the same Postgres instance: `cosmedic_staging` + role `cosmedic_staging`.
- Point staging Payload at `cosmedic_staging` via env.
- **Never** share the role between envs — each env owns its db only.
- Nightly job to clone prod → staging (anonymize email/phone on Enquiries before).

## 9. Multisite isolation

| Layer | Guarantee |
|---|---|
| Postgres | Separate role + db. `cosmedic` role cannot read `christos`, `templategen`, etc. |
| Connection | Each site's `.env` has its own DATABASE_URI. |
| pm2 | `cosmedic-cms` runs as `azlan` user (same as siblings); isolation is at DB level. |
| Listener | Postgres listens only on `127.0.0.1` — no cross-server access. |
| Migrations | `payload migrate` only touches the database the config points at. |

**Things that could break isolation if you're not careful:**
- Running `payload migrate` from the wrong package directory (would target the wrong db if the config is identical — but configs use distinct env vars, so this is hard to do accidentally).
- A typo in `DATABASE_URI` pointing at another site's db. **Never** copy `.env` between site directories.

## 10. Disaster scenarios

| Scenario | Recovery |
|---|---|
| Single row deleted (e.g. wrong surgeon removed) | Spin up sandbox restore (§5), re-create via Payload Local API or Admin |
| Whole collection corrupted | Drop just that table, restore from dump using `pg_restore --table=<table>` |
| Database unrecoverable | Full restore from latest dump (§5). Lose anything since last 02:30 backup. |
| Postgres process dead | `sudo systemctl restart postgresql` — should auto-recover from WAL |
| Disk full | `sudo journalctl -u postgresql --since "10 min ago"` to confirm. Free space, then restart Postgres. Investigate WAL bloat. |
| Slow queries on `/pricing` | Check pg_stat_statements for offenders. Add index per §6. |

## 11. Things this doc explicitly does NOT cover

- HA / replication: out of scope (single-instance Postgres on the server).
- Read replicas: not needed at projected traffic.
- Logical replication for live mirroring: future consideration only.
- Sharding: definitely not.
- Postgres major-version upgrades: server-wide ops, coordinate with sibling sites; not site-specific.

## 12. Commands quick-reference

```bash
# Connect as the cosmedic role
psql -h 127.0.0.1 -U cosmedic -d cosmedic

# Count rows across all tables
psql -h 127.0.0.1 -U cosmedic -d cosmedic -c "SELECT relname, n_live_tup FROM pg_stat_user_tables ORDER BY n_live_tup DESC;"

# Show running queries
psql -h 127.0.0.1 -U cosmedic -d cosmedic -c "SELECT pid, state, query_start, substring(query, 1, 80) FROM pg_stat_activity WHERE datname='cosmedic' AND state != 'idle';"

# Kill a runaway query (use PID from above)
psql -h 127.0.0.1 -U cosmedic -d cosmedic -c "SELECT pg_terminate_backend(<pid>);"

# Vacuum + analyze (Payload doesn't autovacuum its versions tables aggressively)
psql -h 127.0.0.1 -U cosmedic -d cosmedic -c "VACUUM ANALYZE;"

# Backup (manual, one-shot)
pg_dump -h 127.0.0.1 -U cosmedic -F c -f /tmp/cosmedic_$(date +%F).dump cosmedic

# Disk usage of this db
psql -h 127.0.0.1 -U cosmedic -d cosmedic -c "SELECT pg_size_pretty(pg_database_size('cosmedic'));"
```

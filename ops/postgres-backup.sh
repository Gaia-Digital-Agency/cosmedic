#!/usr/bin/env bash
# Weekly Postgres backup for the cosmedic db.
# Designed to run from cron on Sunday at 03:00 (low-traffic hour).
#
# Cron install (one-time):
#   crontab -e
#   # add this line (mind the absolute path):
#   0 3 * * 0 /var/www/cosmedic/ops/postgres-backup.sh >> /var/log/cosmedic-backup.log 2>&1
#
# Retention: 12 weekly snapshots kept (~3 months). Older files are pruned.
# Dumps are gzip-compressed; restore with:
#   gunzip -c <file>.sql.gz | psql -h 127.0.0.1 -U cosmedic -d cosmedic

set -euo pipefail

BACKUP_DIR="${COSMEDIC_BACKUP_DIR:-/var/backups/cosmedic}"
ENV_FILE="${COSMEDIC_ENV_FILE:-/var/www/cosmedic/packages/cms/.env}"
DB_NAME="${COSMEDIC_DB_NAME:-cosmedic}"
DB_USER="${COSMEDIC_DB_USER:-cosmedic}"
DB_HOST="${COSMEDIC_DB_HOST:-127.0.0.1}"
DB_PORT="${COSMEDIC_DB_PORT:-5432}"
RETENTION_WEEKS="${COSMEDIC_BACKUP_RETENTION:-12}"

# Pull DB password from the cms .env (DATABASE_URI=postgres://user:pass@host/db).
if [[ -f "$ENV_FILE" ]]; then
  DB_PASS=$(grep -E '^DATABASE_URI=' "$ENV_FILE" | sed -E 's|^DATABASE_URI=postgres://[^:]+:([^@]+)@.*|\1|')
fi
DB_PASS="${DB_PASS:-}"

if [[ -z "$DB_PASS" ]]; then
  echo "[postgres-backup] $(date -Iseconds) FATAL: no DB password found in $ENV_FILE" >&2
  exit 1
fi

mkdir -p "$BACKUP_DIR"
STAMP=$(date +%Y%m%d-%H%M%S)
OUT="$BACKUP_DIR/cosmedic-$STAMP.sql.gz"

echo "[postgres-backup] $(date -Iseconds) starting dump -> $OUT"
PGPASSWORD="$DB_PASS" pg_dump \
  -h "$DB_HOST" -p "$DB_PORT" \
  -U "$DB_USER" \
  --no-owner --no-privileges \
  "$DB_NAME" \
  | gzip -9 > "$OUT"

SIZE=$(du -h "$OUT" | awk '{print $1}')
echo "[postgres-backup] $(date -Iseconds) done $SIZE"

# Prune snapshots older than RETENTION_WEEKS weeks.
find "$BACKUP_DIR" -name 'cosmedic-*.sql.gz' -mtime "+$((RETENTION_WEEKS * 7))" -print -delete \
  2>/dev/null \
  | sed 's/^/[postgres-backup] pruned: /' || true

# Quick smoke: verify gzip not corrupt + size > 1 KB.
if ! gzip -t "$OUT" 2>/dev/null; then
  echo "[postgres-backup] $(date -Iseconds) FATAL: dump corrupt — $OUT" >&2
  exit 2
fi
if [[ $(stat -c %s "$OUT") -lt 1024 ]]; then
  echo "[postgres-backup] $(date -Iseconds) FATAL: dump suspiciously small — $OUT" >&2
  exit 3
fi

echo "[postgres-backup] $(date -Iseconds) OK"

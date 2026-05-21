# BIMC CosMedic — Operations Runbook

> Day-2 ops for the cosmedic.gaiada.online stack. Pair with [architecture_info.md](./architecture_info.md) (topology) and [db_ops.md](./db_ops.md) (Postgres). When in doubt, defer to the multisite-safety rules at the top of [CLAUDE.md](../CLAUDE.md).

## Topology recap

| Component | Port / location | pm2 name |
|---|---|---|
| Public site (Vite SSR + Express) | `127.0.0.1:3007` | `cosmedic-web` |
| Payload CMS (Next.js host) | `127.0.0.1:4007` | `cosmedic-cms` |
| Postgres | `127.0.0.1:5432` db `cosmedic` role `cosmedic` | — |
| nginx | `/etc/nginx/sites-enabled/subdomains.gaiada.online` | system |
| Let's Encrypt cert | `/etc/letsencrypt/live/cosmedic.gaiada.online/` | certbot.timer |

Sibling sites on the same host: `christos`, `templatebase`, `templategen`, `flowstep`, `gtec`, `whatsnewasia`. **Never `pm2 restart all`. Never reload nginx without `nginx -t` first.**

## Deploy (push pulled, code already on server)

```bash
cd /var/www/cosmedic
git pull
pnpm install              # only if package.json/pnpm-lock.yaml changed
pnpm --filter @cosmedic/cms build
pnpm --filter @cosmedic/web build
pm2 restart cosmedic-cms cosmedic-web --update-env
pm2 save
```

Verify after:
```bash
curl -sI https://cosmedic.gaiada.online/        | head -3   # 200 Express
curl -sI https://cosmedic.gaiada.online/admin   | head -3   # 200 Next.js/Payload
curl -s -X POST https://cosmedic.gaiada.online/api/revalidate -d '{}'   # {"ok":true}
```

If a deploy needs a Payload migration (schema change), run `pnpm --filter @cosmedic/cms migrate --force-accept-warning` between build and restart.

## Restart only

```bash
pm2 restart cosmedic-cms          # CMS only (Next.js)
pm2 restart cosmedic-web          # Public site only (Express)
pm2 restart cosmedic-cms cosmedic-web   # both
```

## Logs

```bash
pm2 logs cosmedic-cms --lines 100        # live tail
pm2 logs cosmedic-web --lines 100
pm2 logs cosmedic-cms --lines 100 --nostream --err   # error log only
```

Persistent logs at `~/.pm2/logs/cosmedic-{cms,web}-{out,error}.log`.

nginx access + error:
```bash
sudo tail -f /var/log/nginx/access.log | grep cosmedic
sudo tail -f /var/log/nginx/error.log
```

## nginx changes

Always:
```bash
sudo nginx -t                          # syntax + conflict check
sudo systemctl reload nginx            # graceful reload (NEVER restart)
```

The cosmedic block lives inside `/etc/nginx/sites-enabled/subdomains.gaiada.online` (a shared file with every other `*.gaiada.online` site). A read-only snapshot of just the cosmedic block is in repo at `ops/nginx/cosmedic.gaiada.online.conf` for provenance — edit the live file, not the snapshot, then resync the snapshot.

Pre-Phase-8 + Phase-10 backups of the shared file live at `/etc/nginx/backups/subdomains.gaiada.online.bak-*`.

## TLS / cert renewal

```bash
sudo certbot renew --dry-run             # rehearse
sudo certbot renew                       # run for real (certbot.timer does this weekly)
sudo systemctl status certbot.timer
```

Cert paths:
- `/etc/letsencrypt/live/cosmedic.gaiada.online/fullchain.pem`
- `/etc/letsencrypt/live/cosmedic.gaiada.online/privkey.pem`

## Postgres

Connect:
```bash
PGPASSWORD=$(grep DATABASE_URI packages/cms/.env | sed 's/.*:\/\/cosmedic://;s/@.*//') \
  psql -h 127.0.0.1 -U cosmedic -d cosmedic
```

Backup (manual):
```bash
PGPASSWORD=… pg_dump -h 127.0.0.1 -U cosmedic cosmedic \
  | gzip > /var/backups/cosmedic/db-$(date +%Y%m%d-%H%M).sql.gz
```

A nightly backup cron is on the Phase 14 todo. Until that lands, take a manual dump before any risky DB op.

## CMS operations

Seed (idempotent — safe to re-run):
```bash
pnpm --filter @cosmedic/cms seed                # content seed (collections + globals)
pnpm --filter @cosmedic/cms seed:media          # imagery upload + link
```

Generate types after schema changes:
```bash
pnpm --filter @cosmedic/cms generate:types
pnpm --filter @cosmedic/cms generate:importmap  # admin components
```

Migrations:
```bash
pnpm --filter @cosmedic/cms migrate:create  -- "name-of-change"
pnpm --filter @cosmedic/cms migrate --force-accept-warning
```

## Enquiry pipeline

1. Public form POSTs to `https://cosmedic.gaiada.online/api/enquiry` (Express)
2. Zod validation + IP rate-limit (2/min) + honeypot
3. Creates an `Enquiries` record via Payload REST
4. Payload `afterChange` on `create` calls `sendEnquiryEmails`
5. Loads `email-templates` global → sends clinic-notify + autoresponder via `nodemailerAdapter` (`packages/cms/src/lib/email-adapter.ts`)
6. SMTP env-driven (`SMTP_HOST/PORT/USER/PASS/SECURE`); when unset, JSON transport logs full message to stdout — useful for dev, **does not deliver in prod**.

Verify form end-to-end:
```bash
curl -s -X POST https://cosmedic.gaiada.online/api/enquiry \
  -H 'content-type: application/json' \
  -d '{"name":"Test","email":"test@example.com","areaOfInterest":"surgical","message":"smoke test"}'
# {"ok":true}
pm2 logs cosmedic-cms --lines 30 --nostream | grep enquiry-emails
# expect: clinic notify sent + autoresponder sent
```

To wire real SMTP, set in `packages/cms/.env`:
```
SMTP_HOST=…
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=…
SMTP_PASS=…
MAIL_CLINIC_TO=cosmedic@bimcbali.com
MAIL_FROM_NAME="Cosmedic CMS"
MAIL_FROM_ADDRESS=no-reply@cosmedic.gaiada.online
```
Then `pm2 restart cosmedic-cms --update-env`.

## Admin polish

The login page shows a pre-launch helper card with bootstrap credentials. Hide it before clinic handover by setting `PAYLOAD_SHOW_SIGNIN_HELPER=false` in `packages/cms/.env` and restarting cms. Then rotate the bootstrap super-admin password via admin UI (top-right avatar → Account → change password).

## Incident playbook

### Site returning 502
```bash
pm2 status                                    # is web/cms online?
pm2 logs cosmedic-web --lines 30 --nostream   # tail recent errors
pm2 logs cosmedic-cms --lines 30 --nostream
curl -sI http://127.0.0.1:3007/   # direct port — bypass nginx
curl -sI http://127.0.0.1:4007/admin
```

If a process is stuck (online but not responding):
```bash
pm2 restart cosmedic-web --update-env
# or cosmedic-cms
```

If a process is stopped:
```bash
pm2 start ecosystem.config.cjs --only cosmedic-web   # cms similarly
```

If nginx is bad after an edit:
```bash
sudo nginx -t                                  # find the error
# revert from /etc/nginx/backups/ if needed
sudo systemctl reload nginx                    # only after -t passes
```

### Sibling site impact

If any other `*.gaiada.online` site is affected by a cosmedic change:
1. Revert the cosmedic change (nginx file from backup, or pm2 stop cosmedic-* + git revert)
2. `sudo nginx -t && sudo systemctl reload nginx`
3. Verify each sibling: `for h in christos templatebase templategen flowstep gtec whatsnewasia; do echo -n "$h: "; curl -s -o /dev/null -w "%{http_code}\n" "https://$h.gaiada.online/"; done`

### Image upload failing

```bash
# Free disk on the uploads dir
df -h /var/www/cosmedic/packages/cms/media
# Permissions
ls -la /var/www/cosmedic/packages/cms/media | head
# Media route alive
curl -s 'http://127.0.0.1:4007/api/media?limit=1' | head -c 200
# Sharp can encode (memory check)
free -h
```

### Database connection refused
```bash
sudo systemctl status postgresql
PGPASSWORD=… psql -h 127.0.0.1 -U cosmedic -d cosmedic -c '\dt'
```

## Rollback

Git-tracked code:
```bash
git log --oneline -10                # find the last-known-good commit
git revert <bad-sha>                 # creates a new commit reversing the bad one
git push origin main
# then redeploy per "Deploy" section
```

Never `git reset --hard` on a deployed branch.

For a Payload schema change that broke prod, restore from the most recent Postgres dump (see Postgres section) **and** revert the migration in `packages/cms/src/migrations/`.

## Health endpoints

| Probe | Expected |
|---|---|
| `GET /` | 200, `x-powered-by: Express`, ~1.2 MB HTML |
| `GET /admin` | 200, `x-powered-by: Next.js, Payload` |
| `GET /api/users/me` | 200 (with cookie) or 401 |
| `POST /api/revalidate` `{}` | `{"ok":true}` |
| `POST /api/enquiry` invalid | 400 with Zod issues |
| `GET /api/media/file/<filename>` | 200 image/webp |
| Cert expiry | `> 14 days` (auto-renew at 30) |

## What lives where

| Concern | Location |
|---|---|
| Public site code | `packages/web/src/` |
| CMS code | `packages/cms/src/` |
| Collections | `packages/cms/src/collections/` (23 files) |
| Globals | `packages/cms/src/globals/` (10 files) |
| Payload migrations | `packages/cms/src/migrations/` |
| Seed scripts | `packages/cms/src/seed/` (`run.ts` = content, `run-media.ts` = images) |
| Brand assets | `packages/cms/public/` + `packages/web/public/` |
| Treatment / surgeon / B&A imagery | `packages/web/public/assets/{surgeons,results,treatments,lifestyle}/` |
| Uploaded media files | `packages/cms/media/` (auto-managed, not in git) |
| nginx snapshot | `ops/nginx/cosmedic.gaiada.online.conf` |
| Live nginx | `/etc/nginx/sites-enabled/subdomains.gaiada.online` |
| Phase plan | `docs/plan.md` |
| Phase tracker | `docs/todo.md` |
| Imagery brief (Phase 10) | `docs/phase-10-imagery-gaps.md` |
| Brand spec | `docs/brand-guidelines.pdf` |

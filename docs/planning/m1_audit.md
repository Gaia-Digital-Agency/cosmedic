# M1 — Mobile responsive audit (2026-05-23)

Scope: 52 routes × 5 breakpoints (320 / 375 / 414 / 640 / 768) = 260 page loads.
Tool: `/tmp/cosmedic-audit/audit.mjs` (puppeteer-core + snap chromium).
Acceptance: `documentElement.scrollWidth - innerWidth ≤ 0` at every width.

## Headline
- **260 page loads → 153 overflow events across 44 routes.**
- **8 routes clean at every breakpoint**: `/`, `/results`, `/gallery`, `/stories`, `/journey`, `/blog`, `/privacy`, `/treatment-the-quiet-rhinoplasty` (the one blog with a body).
- Worst single overflow: `/video-consult` @320 = **+521px**.
- 6 blog routes 404 — content-data mismatch (CMS has 7 posts, code has 1 body). Not a responsive issue; flagged separately.

## Issue clusters (group → likely fix)

### A. Detail-page TOC + body grid (31 routes, ~70% of issues)
Every discipline / sub-category / surgeon detail page renders a 2-column `aside.detail-toc` + `div.detail-body` layout that doesn't collapse below 640px. Repeating offenders: `aside.detail-toc width=517–541` and `div.detail-body width=517–541` at viewports of 320–414.

Routes affected:
- **6 disciplines**: `/treatment-recovery` `/treatment-dental` `/treatment-hair` `/treatment-non-surgical` `/treatment-reconstructive` `/treatment-surgical`
- **17 sub-categories**: all `/treatment-weight-loss-*`, `/treatment-dental-*`, `/treatment-hair-*`, `/treatment-non-surgical-*`, `/treatment-reconstructive-*`, `/treatment-surgical-*`
- **8 surgeons**: `/surgeon-{theresia,risma,rosa,sissy,wara,indra,astri,suka}`

Surgeon pages overflow even at 640 (+70–134) and 2 routes still overflow at 768 (`/surgeon-risma` +30, `/surgeon-wara` +21).

One CSS change in the detail-page templates (stack the TOC above the body, or hide it, below ~960px) should clear ~120 issues.

### B. Index / content pages with unique layouts (7 routes)
| route | 320 | 375 | 414 | 640 | 768 |
|---|---|---|---|---|---|
| `/video-consult` | +521 | +466 | +427 | +201 | +97 |
| `/press` | +405 | +350 | +311 | +85 | — |
| `/pricing` | +256 | +201 | +162 | — | — |
| `/treatments` | +196 | +141 | +102 | — | — |
| `/surgeons` | +73 | +18 | — | — | — |
| `/recovery-stays` | +76 | +21 | — | — | — |
| `/contact` | +13 | — | — | — | — |

Per-page fixes — different layout shapes. `/video-consult` + `/press` are the most extreme.

### C. Blog-routing mismatch (6 routes, not responsive)
CMS `/api/blog-posts` returns 7 slugs but `packages/web/src/content/blog-data.ts` only carries 1 body (`the-quiet-rhinoplasty`). Router falls through to `notfound` for the other 6. Out of M-scope — flag for separate ticket.

## What's clean
- **Home `/`** — clean at every width.
- **`/results`, `/gallery`, `/stories`, `/journey`, `/blog` (index), `/privacy`** — clean at every width.
- **Header at 320–375** — no document-level overflow on home or any of the 8 clean routes. The CLAUDE.md "burger-missing bug" symptom does not surface in the audit; needs visual re-check during M2.

## Artefacts
- `/tmp/cosmedic-audit/audit.mjs` — script
- `/tmp/cosmedic-audit/routes.json` — 52 routes enumerated from CMS
- `/tmp/cosmedic-audit/results.json` — per-record JSON (route × width × overflow × offenders)
- `/tmp/cosmedic-audit/run.log` — human-readable log

Re-run: `cd /tmp/cosmedic-audit && node audit.mjs > run.log 2>&1`.

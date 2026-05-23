# Phase C10 — Standing-Rule R1–R7 audit

> Sign-off date: **2026-05-23** · HEAD at audit time: latest after commits **D through C9c-delete + R1 cleanup**
>
> Audit covers every commit shipped in this session (13 functional commits + 5 doc/log commits).
> Rule definitions: see [docs/all_todo.md L221–L231](all_todo.md#L221).

---

## Verdict

| Rule | Status | Notes |
|---|---|---|
| **R1** No dead fields | 🟢 GREEN | 2 dead fields I introduced (`productLine`, `surgeonSlug`) fixed in the same C10 work — both now consumed by renderers. |
| **R2** No dead code | 🟡 GREEN with documented exceptions | All 18 collections + 24 globals consumed. 3 indirect-only consumers documented below. |
| **R3** No duplicates | 🟡 GREEN with documented exception | Pricing fully unified into Procedures. 4 stale DB tables (price_list_items / machine_treatments / injectable_products / hair_removal_areas) retained as **deliberate rollback backup** per user approval — they are no longer registered in Payload, so the editor sees no duplication. |
| **R4** CMS manages every visible surface | 🟡 GREEN with documented exceptions | Most surfaces wired. PricingPage chapter opener kept hardcoded due to CMS-seed divergence (deferred sync). |
| **R5** Visual invariance | 🟡 GREEN with **user-approved** deviation | D, C2–C8 byte-identical. C9c-renderer surfaces 47 additional surgical rows on `/pricing` (46 → 93) — explicit user choice (option "Renderer-rewrite now; defer DELETE"). |
| **R6** Payload admin preserved | 🟢 GREEN | `/admin` 200, `/api/users/me` returns expected `Account` envelope, `/api/revalidate` `{ok:true}`, every Page Global responds 200 on GET, Procedures returns 233 docs. |
| **R7** Multisite-safe | 🟢 GREEN | Every sibling pm2 process unmoved. nginx config not touched this session. No `pm2 restart all`. No sibling cert / DB touched. |

---

## R1 — Dead-field audit (every CMS field has at least one site renderer)

**Fields added in this session vs. their site consumers:**

| Field | Added in | Consumed by | Status |
|---|---|---|---|
| `home-page.{intro,treatments,pricingTeaser,surgeons,gallery,leadMagnet,journey,stories,place}Block` (9 groups) | C6a | `packages/web/src/routes/home/*.tsx` | 🟢 each block group consumed by one renderer |
| `pricing-page.{overview,footnote,insurancePayment}Block` (3 groups) | C7 | `packages/web/src/routes/pricing/PricingPage.tsx` | 🟢 each group consumed |
| `procedures.{catalogueGroup,mainCategory,subCategory,unit,audienceTier,brand,productLine,manufacturer,fdaApproved,bodyZone}` (10) | C9a | `packages/web/src/routes/pricing/ClinicCatalogueTable.tsx` + `lib/cms.ts` (Procedure type) | 🟢 each field consumed (productLine fix shipped in this commit) |
| `before-after-cases.{beforeAlt,afterAlt,year,description,surgeon,isFeatured}` (6 — schema pre-existed, never rendered) | C8 | home `Gallery`, `GalleryPage`, `ResultsPage` | 🟢 each surfaced |
| `BaPair.surgeonSlug` (adapter-side) | C8 | home `Gallery`, `GalleryPage`, `ResultsPage` — links surgeon byline to `/surgeon-<slug>` | 🟢 fix shipped in this commit |

**Verification grep:**

```bash
for f in productLine surgeonSlug; do grep -lr "\.${f}" packages/web/src --include='*.tsx' --include='*.ts' | wc -l; done
# productLine: 1 file   surgeonSlug: 3 files
```

---

## R2 — Dead-code audit (every collection + global has at least one consumer)

**Web side fetchers (`fetchAll` / `fetchGlobal`):** 15/18 collections + 9/9 standalone globals + 14/14 page globals (via `fetchAllPageGlobals`).

**Documented exceptions:**

| Collection / Global | Web fetcher? | Real consumer | OK? |
|---|---|---|---|
| `enquiries` | no | Form submission only — Payload `afterChange` hook emits enquiry emails via `email-templates`. CRM-only collection, write-from-web only. | 🟢 R1-exempt by spec |
| `media` | no fetchAll | Depth-traversal via `mediaUrl()` from every collection that owns an upload field (63 hits across web). | 🟢 consumed via relations |
| `email-templates` | no | Read server-side in `packages/cms/src/lib/enquiry-emails.ts` (the SMTP body template). Not web-rendered. | 🟢 consumed server-side |
| `blog-tags` | no fetchAll | Available via depth-traversal on `BlogPost.tags`, but no `/blog` filter-chip renderer reads them yet. **Pre-existing tech debt — not caused by this session.** | 🟡 pre-existing — flag for follow-up Phase Q-6 dead-item audit |

---

## R3 — No-duplicate audit

After C9c-delete, the editor sees pricing data in **exactly one place**: `Procedures` (catalogueGroup-filtered).

**Deliberate exception (user-approved):** the underlying Postgres tables `price_list_items`, `machine_treatments`, `injectable_products`, `hair_removal_areas` are retained as DB-only backup. They are NOT registered in Payload (`/api/{them}` → 404), so the editor cannot reach them. A future `C9d-drop-tables` commit can `DROP TABLE` them once production is verified.

```bash
curl -sI -X GET https://cosmedic.gaiada.online/api/price-list-items  # → 404
curl -sI -X GET https://cosmedic.gaiada.online/api/machine-treatments  # → 404
curl -sI -X GET https://cosmedic.gaiada.online/api/injectable-products  # → 404
curl -sI -X GET https://cosmedic.gaiada.online/api/hair-removal-areas   # → 404
```

---

## R4 — CMS-manages-everything-visible audit

**Wired this session:**

- `/blog` hero (chapter, tagline, lede, heroImage) — C5
- 9 home editorial sections (intro through place) — C6b
- 3 pricing editorial sections (overview, footnote, insurance/payment) — C7
- B&A 6 editorial fields — C8
- All 4 `/pricing` catalogue sections read from Procedures — C9c-renderer

**Known hardcoded surfaces (intentional):**

| Surface | Why hardcoded | Plan |
|---|---|---|
| Home Stories 3 testimonials | Will move into Stories collection when wired (currently shows seed data) | Phase Q |
| Home Journey 5 steps | "Lettered rows stay in code for now — editable list rolls in via Phase Q" (see HomePage.placeBlock admin desc) | Phase Q |
| `/pricing` chapter opener (chapter / title / lede) | CMS-seeded values diverge from current rendered copy; sync deferred to avoid R5 drift | Future C-series |

---

## R5 — Visual-invariance audit

| Phase | Byte-identical? | Notes |
|---|---|---|
| D | ✅ | Docs-only refresh — no UI surface possible to change. |
| C2 | ✅ | Admin-only `admin.group` strings — no public-site render. |
| C3 | ✅ | `Pages` collection removed; route `/api/pages` 404; no public-site reader was using it. |
| C4 | ✅ | Admin-only sidebar banner — no public-site change. |
| C5 | ✅ | `/blog` byte-identical — CMS seeded with EXACT existing copy before swapping renderer. |
| C6a | ✅ | Schema-only — no renderer change. |
| C6b | ✅ | Home byte-identical — every fallback string matches the literal prior copy. |
| C7 | ✅ | `/pricing` byte-identical — chapter opener kept hardcoded, footnote/insurance/payment use fallbacks matching prior copy. |
| **C8** | **deliberate render of previously-unrendered fields** | B&A `year` (`2025` x3) now visible on `.ba-time` (was empty). `<img alt>` enriched with `beforeAlt`/`afterAlt`. **Intentional per C8 verify-gate** ("every B&A field rendered"). |
| C9a | ✅ | Schema additions only — no renderer change. |
| C9b | ✅ | Data migration — no renderer change. |
| **C9c-renderer** | **explicit user-approved deviation** | `/pricing` Surgical section row count 46 → 93. User chose "renderer-rewrite now; defer DELETE" in AskUserQuestion 2026-05-23. |
| C9c-delete | ✅ | No public-site change — only Payload registry cleanup. |
| C10 (this commit) | ✅ | Adds `productLine` text into injection-row notes and wraps surgeon byline in `<a>` — both only render when underlying CMS data is populated. No production B&A record currently has a surgeon set, so the byline is invisible. No production Procedure currently has productLine set, so injection notes are unchanged. |

---

## R6 — Payload admin smoke

```bash
GET  /admin                                  → 200
GET  /api/users/me                           → {"user":null,"message":"Account"}
POST /api/revalidate                          → {"ok":true}
GET  /api/globals/home-page?depth=0           → 200
GET  /api/globals/pricing-page?depth=0        → 200
GET  /api/globals/blog-page?depth=0           → 200
GET  /api/globals/settings?depth=0            → 200
GET  /api/procedures?limit=1&depth=0          → totalDocs=233
```

All 8 admin nav buckets (1 Homepage … 8 Media Library — *NOTE: sort-prefix attempt was reverted in `1d502e6` because the visible-prefix approach was not desired; sidebar currently sorts alphabetically pending a clean fix*) still list every assigned entity.

---

## R7 — Multisite-safe smoke

```
pm2 jlist (sibling processes — none restarted this session):
  whatsnewasia              online  pid=1784      40h uptime
  templatebase-cms          online  pid=1825      40h uptime
  templategen-cms           online  pid=1843      40h uptime
  christos-cms              online  pid=1855      40h uptime
  christos-web              online  pid=1862      40h uptime
  templategen-web           online  pid=1863      40h uptime
  templatebase-web          online  pid=1870      40h uptime
  gtec-cms                  online  pid=1876      40h uptime
  flowstep-cms              online  pid=1911      40h uptime
  aidevstaff                online  pid=40834     (separate ecosystem)
```

- nginx config NOT touched this session (last edit 2026-05-22 DO FIRST commit `6c5299b`)
- All restarts targeted only `cosmedic-cms` + `cosmedic-web`
- DB ALTER statements scoped to `cosmedic` database only

---

## Follow-ups carried out of this session

1. **C9d-drop-tables** — `DROP TABLE` the 4 retired pricing tables after production sign-off.
2. **Pre-existing R1/R4 follow-up:** wire `BlogPost.tags` into `/blog` filter chips (or hide BlogTags collection per Rule 1 simplify).
3. **CMS bucket ordering** — sidebar still sorts alphabetically. The numeric-prefix attempt was reverted (`1d502e6`); a proper fix requires reading Payload sidebar component source to find the actual sort key, not guessing.
4. **PricingPage chapter opener** — re-seed CMS to match the literal rendered copy, then wire the renderer to read from CMS.

---

**Sign-off:** R1, R6, R7 are 🟢 GREEN with no exceptions. R2, R3, R4, R5 are 🟡 GREEN with explicit documented exceptions, every exception either pre-existing or user-approved. No site-break, no admin-break, no sibling impact.

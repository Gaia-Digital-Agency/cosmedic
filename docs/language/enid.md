# EN ⇄ ID Internationalization — Plan & To-Do (`enid.md`)
**Item:** 25.11 (Phase 9 i18n) · **Created:** 2026-05-29 · **Status:** PLANNING — not started
**Target:** full Indonesian mirror at `/id/*` (matches reference site `13krdhfuma.gaiada.com/id/`)

---

## Context — why
The reference site ships a complete Bahasa Indonesia mirror at `/id/*`. Production currently has only English. The CMS, routing, and content are all single-locale. This is the largest remaining open item from the May-25 change request. The EN|ID switcher chrome is already in the header but **functionally disabled** until this lands.

## Current state (verified 2026-05-29)
| Layer | State | Evidence |
|-------|-------|----------|
| UI chrome strings | ✅ done | `web/src/i18n/en.json` + `id.json`, 49 keys each |
| Payload localization | ❌ not configured | no `localization:` in `payload.config.ts` |
| `/id/*` SSR routing | ❌ none | no locale handling in `router.ts` / `server.ts` |
| Locale switcher | ⚠️ chrome present, disabled | `Header.tsx` comment: "functionally disabled until Phase 9" |
| CMS adapters | ❌ single-locale | `cms.fetch.ts` fetches without `?locale=` |

---

## Phased plan

### Phase A — Payload localization foundation  · ~1 day · 🔴 migration
Enable per-locale field values so editors can hold EN + ID copy on one record.
- [ ] A1. Add `localization: { locales: ['en','id'], defaultLocale: 'en', fallback: true }` to `payload.config.ts`
- [ ] A2. Mark localizable fields `localized: true` (title, tagline, lede, overview, body, faqs, sections, hero copy, labels) across collections + globals
- [ ] A3. **DB backup** (`ops/postgres-backup.sh`) before migrating
- [ ] A4. Generate + run Payload migration (localized fields move to `_locales` tables / locale columns)
- [ ] A5. Smoke-test admin: each localized field shows an EN|ID locale selector; existing EN data intact under `en`

### Phase B — Per-locale CMS fetch (web)  · ~0.5–1 day
- [ ] B1. `cms.fetch.ts` / `cms.cache.ts`: fetch each collection + global twice (`?locale=en`, `?locale=id`) or on demand
- [ ] B2. Cache keyed by locale; `getCmsCacheSync(locale)`
- [ ] B3. Adapters (`cms-adapters.ts`) pass locale through; fallback to EN when an ID value is empty

### Phase C — `/id/*` SSR routing + SEO  · ~1–2 days
- [ ] C1. `router.ts`: detect leading `/id` segment → `locale='id'`, strip prefix, resolve the same route table
- [ ] C2. `server.ts`: pass locale into render + SEO; pick locale-correct CMS cache
- [ ] C3. `hreflang` alternate tags (en ↔ id) on every page; correct `canonical`
- [ ] C4. `sitemap.xml`: emit both `/x` and `/id/x` for every route
- [ ] C5. 301/redirect rules unaffected; `/id` + legacy slug redirects coexist
- [ ] C6. `<html lang>` reflects active locale

### Phase D — Locale switcher wiring  · ~0.5 day
- [ ] D1. `Header.tsx`: enable EN|ID toggle (remove "disabled" chrome)
- [ ] D2. Toggle navigates to the `/id` equivalent of the current URL (and back)
- [ ] D3. Persist choice (cookie) + honor `Settings.defaultLocale`
- [ ] D4. Active-state styling on the current locale

### Phase E — UI string completeness  · ~0.5 day
- [ ] E1. Audit `en.json`/`id.json` against every rendered chrome string (49 today — confirm coverage)
- [ ] E2. Fill any English-only hardcoded UI strings found during C/D
- [ ] E3. Number/price/date formatting per locale (IDR primary both locales; AUD note)

### Phase F — Content translation (the long pole)  · 3–5 days MT+review · 2–3 wks pro
Translate all editorial content into Bahasa Indonesia (entered as the `id` locale value per field).
- [ ] F1. Export EN source strings (disciplines, sub-cats, procedures, surgeon bios, blog, hero/section copy, journey, pricing labels, contact) — ~500–1,000 strings
- [ ] F2. First-pass translation (machine) → import into `id` locale
- [ ] F3. Human review/polish by a Bahasa Indonesia speaker (clinical tone, brand voice)
- [ ] F4. Translate SEO meta (title/description) per locale

### Phase G — Verification  · ~0.5–1 day
- [ ] G1. Every route × {en, id} returns 200, correct copy, correct `lang`/`hreflang`
- [ ] G2. Switcher round-trips on every page type
- [ ] G3. Fallback works (empty ID field → EN, no blanks)
- [ ] G4. Lighthouse green retained on `/id/*`
- [ ] G5. Sitemap + hreflang validated

---

## Effort estimate
| Track | Effort |
|-------|--------|
| Engineering (A–E, G) | **~4–6 working days** |
| Content translation (F) | MT + light review **3–5 days** · professional **2–3 weeks** |
| **MVP** (engineering + machine-translated, lightly reviewed) | **~2 weeks** |
| **Production-quality** (professionally translated + QA) | **~3–4 weeks** |

## Risks & dependencies
- 🔴 **Payload localization migration** touches every content table — back up first, test on the existing data.
- 🟠 **Translation volume** is the schedule driver and is largely non-engineering — needs a Bahasa Indonesia translator/reviewer. Lining one up early compresses the timeline most.
- 🟡 Fallback strategy must be set (`fallback: true`) so partially-translated content never renders blank.
- 🟡 SEO: hreflang + canonical must be correct or it risks duplicate-content penalties.

## Recommended sequencing
1. Ship **A–E + G engineering behind the still-disabled switcher** (site works in `/id` with EN fallback content).
2. Roll out **F content** progressively (high-traffic pages first: home, procedures index, 6 disciplines, contact).
3. Enable the switcher (D1) once core pages are translated.

## Out of scope (for this item)
- Additional locales beyond EN/ID.
- Translating `docs/` or CMS admin UI labels (admin stays EN).

---

# PREP RESULTS (done 2026-05-29 — no migration, no build)

## Prep #1 — Localizable-field inventory (mark `localized: true` in Phase A)
Apply to these fields when enabling Payload localization. Everything else (slugs, IDs, prices, dates, image FKs, sort orders, booleans, enums) stays **non-localized**.

| Item | Fields to mark `localized: true` |
|------|----------------------------------|
| Disciplines | title, subtitle, tagline, lede, body, overview, faqs(q,a) |
| Sub Categories | title, tagline, lede, intro, overview, sections(t,body), faqs(q,a), chapterTitle(a,b) |
| Procedures | name, shortName, description, detail(duration,recovery,included), faqs(q,a), pricing.priceNotes |
| Surgeons | spec, train, proc, bio, specAreas (NOT name/credLine) |
| Blog Posts | title, lede, body |
| Stories | quote, body (NOT patientLabel/country) |
| Before/After Cases | caseLabel, beforeAlt, afterAlt, description, recoveryDuration |
| Recovery Stays | name, body, amenities |
| Press Mentions | headline, summary (NOT publication/url) |
| Awards | name, issuer, summary |
| Journey Steps | title, body, bullets |
| Globals (heroes) | titleA/B or title.a/.b, lede, chapter, imageLabel, breadcrumbLabel |
| HomeHero | title.a/.b, lede, primaryCtaLabel, secondaryCtaLabel, quickEnquiry.* |
| HomePlace / LeadMagnet / Surgeons view | all text fields (heading, body, ctaLabel, coverTitle, coverFooter, teamCaption, leadBody) |
| Contact globals | headingPre/Italic, body, hours labels/values, map label |
| Pricing globals | heading, body, footnote, insurance, payment copy |
| Settings | siteTagline, defaultMetaDescription (NOT email/phone/rate/address) |
| Footer / Header | brandTagline, newsletter labels, linkColumns labels, nav labels |

## Prep #3 — UI-string audit + hardcoded-English sweep
- ✅ **i18n JSON layer** (`en.json`/`id.json`, 49 keys) covers global chrome (nav, CTA, form, footer, pricing labels). ID side **exists** → needs native review, not first draft.
- ⚠️ **Big finding:** most page/section chrome does **NOT** come from the i18n JSON — it comes from **CMS globals with English hardcoded fallbacks** in code (e.g. `g?.x || 'Begin enquiry'`, `|| 'Find us in'`, chapter eyebrows, hero lines). Dozens found across `routes/` + `components/`.
  - **Implication:** these will render English in `/id` **unless the CMS global holds an ID value** (Phase A + F). They are NOT fixed by the i18n JSON. → Translation must populate the CMS `id` locale for all those globals (covered by worksheet §D).
- **Action:** no separate "translate the code fallbacks" task needed — fixing them = entering ID content in the CMS (Phase F). The fallbacks stay as the EN safety net.

## Prep #4 — hreflang / canonical / sitemap spec (for Phase C)
Implement exactly this in `server.ts` / `lib/seo.ts` / sitemap:
1. **`<html lang>`** = active locale (`en` | `id`).
2. **Canonical**: self-referential per locale — EN page → `https://cosmedic.gaiada.online{path}`; ID page → `…/id{path}`.
3. **hreflang alternates** on every page (3 tags):
   - `<link rel="alternate" hreflang="en" href="…{path}">`
   - `<link rel="alternate" hreflang="id" href="…/id{path}">`
   - `<link rel="alternate" hreflang="x-default" href="…{path}">` (EN default)
4. **Sitemap**: for every existing route emit BOTH `/{path}` and `/id/{path}`; each `<url>` carries `<xhtml:link rel="alternate" hreflang>` entries for en + id.
5. **OG `og:locale`** = `en_US` / `id_ID`; add `og:locale:alternate`.
6. Locale detection order: URL `/id` prefix → cookie → `Settings.defaultLocale` → `en`. URL always wins.

---

# WHAT'S AFTER PREP 1–4

Prep is **planning/groundwork only** — nothing live changed. The actual feature build is still ahead, in this order:

1. **Phase A — Payload localization migration** ← *next real action; needs your go-ahead + DB backup.* Apply the Prep #1 field list, run migration, verify EN data intact.
2. **Phase B — per-locale CMS fetch** (web reads `?locale=id`, EN fallback).
3. **Phase C — `/id/*` SSR routing + SEO** (implement the Prep #4 spec).
4. **Phase D — enable the EN|ID switcher.**
5. **Phase F — content translation** (use `enid_strings.md` + in-CMS bulk) — runs in parallel, started now if a translator is assigned.
6. **Phase G — verify** every route × {en, id}.

**Critical-path note:** A→B→C→D is ~4–6 engineering days and can ship behind the still-disabled switcher with EN fallback. F (translation, the long pole) should start in parallel **now** using the worksheet. Switcher flips on (D) once core pages are translated.

---

# ARCHITECTURE DECISION — Option A (auto-translate-on-save) · 2026-05-29

**Chosen over the manual dual-edit plan.** Keeps real `/id` URLs + SEO, but an LLM auto-fills the Indonesian value whenever English changes, so ID never silently drifts and editors don't dual-edit.

### Decisions (locked)
1. **Provider:** LLM (Claude/OpenAI) — for brand/clinical tone + glossary control. API key in CMS `.env`.
2. **Review model:** **Auto-publish** — hook writes the ID value live immediately (no review gate).
3. **Scope:** **All** localized fields (the full Prep-#1 list).

### How it works
- Payload `afterChange` hook on every localized collection/global.
- On save with locale = `en` (or any source change), the hook calls the LLM to translate the changed localized fields → writes them into the `id` locale value of the same record.
- Auto-published; `fallback: true` still covers the gap during the async translate.
- A glossary/system-prompt enforces brand voice + keeps medical/credential terms (ISAPS, ACHSI, dr. names, procedure names) consistent/untranslated.

### Revised build order (supersedes the A–G list above where noted)
| Step | Phase | Note |
|------|-------|------|
| 1 | **A — Payload localization** | config `localization:{en,id},fallback:true` + mark Prep-#1 fields + **DB backup** + migration |
| 2 | **A2 — Auto-translate hook (NEW)** | `afterChange` → LLM → fill `id` fields, auto-publish; API key in `.env`; glossary/term-protect list |
| 3 | B — Per-locale CMS fetch | web reads `?locale=id`, EN fallback |
| 4 | C — `/id/*` routing + SEO | implement Prep-#4 hreflang/canonical/sitemap spec |
| 5 | D — Enable EN\|ID switcher | flip disabled toggle + wire navigation |
| 6 | **F — One-time backfill (was: manual translation)** | run the hook across all existing records → bulk LLM translate to ID; spot-check |
| 7 | G — Verify | every route × {en,id}; fallback; Lighthouse; hreflang/sitemap |

### Impact of Option A on the estimate
- Phase F changes from **weeks of manual translation** to a **script run + spot-check (~1 day)**.
- Adds Phase A2 (~0.5–1 day: hook + provider + glossary).
- **New total ≈ 5–7 engineering days, no external translator required.** (Human ID review optional, post-launch.)

### Extra decisions still needed before build
- Which LLM + API key (Claude vs OpenAI) — confirm key source.
- Term-protect / glossary list (brand, surgeon names, credentials, procedure names that stay as-is or have fixed ID terms).
- Rate/cost guard for the one-time backfill (~134 rich-text records + ~90 short strings).

### Status
- **Prep #1–4: ✅ DONE.**
- **Build phases A–G: ⬜ not started.** Next action = **Phase A** (needs go-ahead + DB backup).

### Phase A2 — hook trigger spec (locked)
The LLM fires **only on real EN content changes**, field-by-field:
- Acts only when: save is on **`en` locale** AND a **localized field actually changed** (prev vs incoming) AND the change did **not** originate from the hook (loop guard via request-context flag).
- Translates **only the changed fields**, not the whole record.
- Non-localized edits (price, image, toggle, sort-order) → **no LLM call**.
- Editing the `id` value directly → **no call** (no loop).
- One-time **backfill (Phase F)** is a separate explicit script, not the live hook.
- Loop prevention is mandatory (same bug-class as the earlier MutationObserver loop — designed out from the start).

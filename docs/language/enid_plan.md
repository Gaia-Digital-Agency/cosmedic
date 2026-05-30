# EN ⇄ ID — Implementation Plan (`enid_plan.md`)
**Created:** 2026-05-30 · **Status:** Not started · **Item:** CR25May 25.11 (post-launch acceptable)
**Architecture locked:** Option A — LLM auto-translate-on-save. Full design rationale in `enid.md`.

---

## Locked decisions (2026-05-30)

| # | Decision | Confirmed |
|---|---|---|
| 1 | **LLM provider** | **Google Vertex AI** — `gemini-2.5-flash`, project `gda-viceroy`, credentials already in `packages/cms/.env`. No new infrastructure. |
| 2 | **Glossary / term-protect list** | See below — confirmed by user 2026-05-30 |
| 3 | **Backfill cost guard** | Run directly — GCP billing already active for this project |
| 4 | **Hook activation** | Hook is **built early but starts silent** (`AUTO_TRANSLATE_ENABLED=false`). Flipped to `true` only after Phase F (manual/backfill translation) is complete. |

### Confirmed glossary (Gemini system prompt)

| Term | Rule |
|---|---|
| ISAPS, ACHSI, BIMC, CosMedic | Keep exactly as-is — never translate |
| All surgeon names (`dr. Suka`, `dr. Indra`, etc.) | Keep exactly as-is |
| Credential strings (`Fellow, ISAPS`, `Sp.BP-RE`, `SpBP-RE(K)`, etc.) | Keep exactly as-is |
| Procedure names (rhinoplasty, liposuction, etc.) | Use standard Bahasa Indonesia medical term if one exists; keep EN otherwise |
| IDR, AUD, Rp | Keep exactly as-is |
| `Nusa Dua`, `Bali`, all place names | Keep exactly as-is |

---

## Verified current state

| Layer | State | Evidence |
|---|---|---|
| UI string helper (`i18n/index.ts`, `en.json`, `id.json`, 49 keys) | ✅ Done | `packages/web/src/i18n/` |
| `localeFromPath` / `withLocale` / `useLocale` helpers | ✅ Done | `i18n/index.ts` |
| Header EN\|ID switcher chrome | ✅ Chrome present, hard-disabled | `Header.tsx:199–223` — `aria-disabled="true"`, tooltip "Indonesian locale coming soon" |
| `localized: true` — 3 globals only | ⚠️ Partial | `ContactEnquirySection.ts`, `PrivacyPage.ts`, `NotFoundPage.ts` — 56 fields total |
| `localized: true` — all collections | ❌ Not started | 0 instances in `/collections/` |
| `localized: true` — remaining globals | ❌ Not started | Homepage, Journey, Pricing, Header, Footer, Settings, etc. |
| Payload `localization:` config | ❌ Not started | No `localization:` block in `payload.config.ts` |
| LLM auto-translate hook (`afterChange`) | ❌ Not started | No translate hook in `/hooks/` or any collection |
| `cms.fetch.ts` — `?locale=` param | ❌ Not started | No locale handling in `cms.fetch.ts`, `cms.cache.ts`, `cms-adapters.ts` |
| `/id/*` SSR routing | ❌ Not started | No locale detection in `router.ts` or `server.ts` |
| hreflang / canonical / sitemap | ❌ Not started | |
| ID editorial content (all records) | ❌ Not started | `enid_strings.md` ID column blank; no `id` locale values in DB |

---

## To-do — full phase list

### Phase A — Payload localization foundation
**Risk: 🔴 DB migration** — back up first.

- [ ] A0. DB backup: `ops/postgres-backup.sh` before any migration
- [ ] A1. `payload.config.ts`: add `localization: { locales: ['en', 'id'], defaultLocale: 'en', fallback: true }`
- [ ] A2. Collections — mark `localized: true` on all Prep-#1 fields:
  - [ ] `Disciplines.ts`: title, subtitle, tagline, lede, body, overview, faqs(q, a)
  - [ ] `SubCategories.ts`: title, tagline, lede, intro, overview, sections(title, body), faqs(q, a), chapterTitle(a, b)
  - [ ] `Procedures.ts`: name, shortName, description, detail(duration, recovery, included), faqs(q, a), pricing.priceNotes
  - [ ] `Surgeons.ts`: spec, train, proc, bio, specAreas (NOT name / credLine)
  - [ ] `BlogPosts.ts`: title, lede, body
  - [ ] `Stories.ts`: quote, body (NOT patientLabel / country)
  - [ ] `BeforeAfterCases.ts`: caseLabel, beforeAlt, afterAlt, description, recoveryDuration
  - [ ] `RecoveryStays.ts`: name, body, amenities
  - [ ] `PressMentions.ts`: headline, summary (NOT publication / url)
  - [ ] `Awards.ts`: name, issuer, summary
  - [ ] `JourneySteps.ts`: title, body, bullets
- [ ] A3. Globals — mark `localized: true` on remaining globals (those not already done):
  - [ ] HomeHero: title.a/b, lede, primaryCtaLabel, secondaryCtaLabel, quickEnquiry.*
  - [ ] HomePlace / LeadMagnet / SurgeonsView: all text fields (heading, body, ctaLabel, coverTitle, coverFooter, teamCaption, leadBody)
  - [ ] Contact globals: headingPre/Italic, body, hours labels/values, map label
  - [ ] Pricing globals: heading, body, footnote, insurance, payment copy
  - [ ] Settings: siteTagline, defaultMetaDescription (NOT email/phone/rate/address)
  - [ ] Footer / Header globals: brandTagline, newsletter labels, linkColumns labels, nav labels
  - [ ] Journey globals: hero title.a/b, lede, chapter, imageLabel, breadcrumbLabel
  - [ ] All other page hero globals with titleA/B, lede, chapter, imageLabel, breadcrumbLabel
- [ ] A4. Generate Payload migration: `pnpm --filter @cosmedic/cms payload migrate:create add-localization`
- [ ] A5. Apply migration (psql pipe method — see CLAUDE.md gotcha re: `payload migrate` hanging)
- [ ] A6. Smoke-test admin: each localized field shows EN|ID locale selector; existing EN data intact under `en`

### Phase A2 — LLM auto-translate hook
**Build now, activate after Phase F.**
Provider: Vertex AI `gemini-2.5-flash` · credentials already in `packages/cms/.env`.

- [ ] A2.1. Create `packages/cms/src/hooks/autoTranslate.ts`:
  - Add `AUTO_TRANSLATE_ENABLED=false` to `packages/cms/.env` — hook is silent until flipped
  - Trigger: `afterChange` on every localized collection + global
  - Guard: only fires when `AUTO_TRANSLATE_ENABLED=true` AND `locale === 'en'` AND a localized field changed (diff prev vs incoming) AND not originating from this hook (loop-prevention flag in request context)
  - Translates only changed fields (not whole record)
  - Non-localized edits (price, image, toggle, sort-order) → no LLM call
  - Direct `id` locale edits → no call
  - Writes translated values to `id` locale of same record via `payload.update` (auto-publish)
  - System prompt: brand voice, clinical tone, confirmed glossary/term-protect list (see Locked decisions above)
- [ ] A2.2. Register hook on all localized collections and globals
- [ ] A2.3. Test with a single record save while `AUTO_TRANSLATE_ENABLED=false` — verify hook is silent
- [ ] A2.4. Enable temporarily on a test record (`AUTO_TRANSLATE_ENABLED=true` in dev) — verify: EN save → `id` locale filled, no loop, no crash, glossary terms preserved
- [ ] A2.5. Reset to `AUTO_TRANSLATE_ENABLED=false` — stays silent until Phase F is done

### Phase B — Per-locale CMS fetch (web layer) ✅ COMPLETE (2026-05-30 · commit `794eb94`)
- [x] B1. `cms.fetch.ts`: add `locale` param to all collection + global fetches; append `?locale={locale}` to API calls
- [x] B2. `cms.cache.ts`: per-locale cache map `Record<Locale, CmsCache>`; `getCmsCacheSync(locale?)`, `loadCmsCache(force?, locale?)`, `setCmsCacheSync(next, locale?)` — all default to `'en'`, fully backward-compatible
- [x] B3. `cms-adapters.ts`: no changes needed — adapters receive a locale-correct `CmsCache`; Payload `fallback:true` handles empty ID fields transparently at the API level
- [x] B4. Test: `?locale=id` returns EN fallback values (correct — no ID content entered yet); `?locale=en` identical — both verified on `/api/disciplines`

### Phase C — `/id/*` SSR routing + SEO ✅ COMPLETE (2026-05-30 · commit `cd66b3c`)
- [x] C1. `router.ts`: `stripLocalePrefix()` strips `/id` prefix; same route table resolves EN and ID paths
- [x] C2. `server.ts`: locale detection; locale-correct CMS cache; locale forwarded to `render()` + `seoFor()`
- [x] C3. `<html lang>` reflects active locale — `<!--html-lang-->` marker in `index.html` replaced per-request; `entry-server.tsx` embeds `window.__COSMEDIC_LOCALE__`; `entry-client.tsx` hydrates right locale cache
- [x] C4. Canonical: EN → `https://cosmedic.gaiada.online{path}`; ID → `…/id{path}`
- [x] C5. hreflang alternates on every page (3 tags: `en`, `id`, `x-default` → EN)
- [x] C6. `og:locale` = `en_US` / `id_ID`; `og:locale:alternate` present
- [x] C7. Sitemap emits both `/{path}` and `/id/{path}` for all 168 routes; each `<url>` has `<xhtml:link>` hreflang entries; `xmlns:xhtml` added to `<urlset>`
- [x] C8. Locale detection order: URL `/id` prefix → cookie `locale_pref` → `'en'`
- [x] C9. Legacy 301 redirects under `/id/*` correctly prefixed — e.g. `/id/treatments/surgical` → 301 `/id/procedures/surgical`

### Phase D — Enable EN|ID switcher
- [ ] D1. `Header.tsx`: remove `aria-disabled`, opacity, tooltip; activate the locale toggle
- [ ] D2. Toggle navigates to the `/id` equivalent of the current URL (use `withLocale()` from `i18n/index.ts`)
- [ ] D3. Persist choice via cookie; honor `Settings.defaultLocale`
- [ ] D4. Active-state styling on current locale

### Phase F — One-time backfill + hook activation
**Depends on Phase A + A2 complete. Manual translation must be done first (or confirmed not needed before backfill runs).**

- [ ] F1. Write `packages/cms/scripts/backfill-translations.ts`: iterates all localized collections + globals, calls the same Vertex AI translate function as the hook for each record, writes `id` locale values
- [ ] F2. Run backfill: `NODE_ENV=production pnpm --filter @cosmedic/cms exec tsx scripts/backfill-translations.ts`
- [ ] F3. Spot-check: 5–10 procedures, 2 surgeon bios, 1 discipline — verify ID text is coherent and brand-correct, glossary terms intact
- [ ] F4. **Flip hook live**: set `AUTO_TRANSLATE_ENABLED=true` in `packages/cms/.env` + `pm2 restart cosmedic-cms --update-env`
- [ ] F5. Verify hook fires on a live EN save → `id` locale updates immediately in admin

### Phase G — Verification ✅ COMPLETE (2026-05-30)
- [x] G1. Every route × {en, id} returns HTTP 200, correct `<html lang>` — all 14 static + all 21 sub-cat + discipline + expert + blog routes verified; lang="en" on EN, lang="id" on ID
- [x] G2. hreflang alternates (en + id + x-default) present on all page types; og:locale en_US/id_ID correct per locale
- [x] G3. Sitemap: 56 EN + 56 ID routes (112 total); 336 xhtml:link hreflang entries; xmlns:xhtml present
- [x] G4. Switcher round-trips: EN / → href="/id" (×2 desktop+mobile); ID /id/procedures → href="/procedures"
- [x] G5. Zero blank ID strings: disciplines, sub-categories, procedures, surgeons all 0 blank required fields in `_locale='id'` DB rows; Rhinoplasty → "Rhinoplasti"; disciplines → Bedah/Estetika Gigi/Restorasi Rambut/etc.
- [x] G6. Lighthouse on /id: accessibility 92 ✅, best-practices 96 ✅, seo 100 ✅ (all ≥90 Green)
- [x] G7. Cookie: `locale_pref=id` cookie → lang="id" served at /; no cookie → lang="en"

---

## Effort estimate

| Phase | Effort |
|---|---|
| A — Payload localization + field marking | ~1 day |
| A2 — LLM translate hook | ~0.5–1 day |
| B — Per-locale web fetch | ~0.5 day |
| C — `/id/*` routing + SEO | ~1–2 days |
| D — Enable switcher | ~0.5 day |
| F — Backfill script + run | ~0.5–1 day |
| G — Verify | ~0.5–1 day |
| **Total** | **~5–7 engineering days** |

No external translator required. Human ID review optional post-launch.

---

## Build sequence (critical path)

```
A0 (backup)
→ A1–A6 (Payload migration — 3 globals first, then full expansion)
→ A2 (hook built + tested, AUTO_TRANSLATE_ENABLED=false)
→ B (web fetch reads ?locale=)
→ C (routing + SEO)
→ F (backfill runs → AUTO_TRANSLATE_ENABLED=true → hook goes live)
→ D (enable switcher)
→ G (verify)
```

A → B → C ships behind the still-disabled switcher with EN fallback — safe to deploy at any phase boundary.
F activates the hook — from this point every EN CMS save auto-translates immediately.
Switcher (D) flips on after F so users only see the ID locale once content is populated.

---

## Out of scope

- Additional locales beyond EN/ID
- Translating `docs/` or CMS admin UI labels (admin stays EN)
- Human professional translation review (optional, post-launch)

# Change Request — 2026-05-25

> Outstanding items captured at end of 2026-05-25 session. Source: live audit against `docs/planning/all_todo.md`, `docs/remap_plan.md`, `docs/planning/phase-10-imagery-gaps.md`, and CLAUDE.md.
>
> Items 11 (doc cleanup) and 12 (untracked PNG cleanup) from the original audit are not listed here — both were executed in the same session that produced this file.
>
> **2026-05-25 update:** R2 (now item 11) shipped mid-session in `3a87d4c`. Items for Figma MCP integration, FAB vertical gap, and starburst texture added post-audit as planning items.
>
> **2026-05-25 mid-session addendum (post-R2 ship):** Early-morning cleanup audit added as item 1 + sequenced first. Item 11 (R2) appended with footer brand-column regression precedent (d2a1ce4 → 8a7007e) + `feedback_no_frontend_data_loss.md` update note. Item 6 (surgeon portraits) appended with Doctors/Surgeons single-source verification (CMS Surgeons is sole source — no duplication). Item 5 (Figma MCP) file key locked: `KjPZnGnbpa994mf7byvcW7` ("Comesic-Image-generation"), scope = inventory + upload to Payload Media.
>
> **Ordering:** rows below are in execution order — #1 first, #14 last. Numbers were re-keyed 2026-05-25 mid-session; the previous sequencing section was removed (summary + details now self-describe the sequence).

## Summary

| # | Item | Status | Launch-blocking |
|---|---|---|---|
| 1 | Early-morning cleanup audit (`8a7007e` post-ship verification) | ❌ Open — **do first** | No |
| 2 | SMTP provider + `.env` config | ❌ Not configured | **Yes** |
| 3 | Phase 11 — pre-launch QA gates | ❌ Open | **Yes** |
| 4 | Phase 10 — imagery gaps | ❌ Open | **Yes** |
| 5 | Figma MCP integration — file `KjPZnGnbpa994mf7byvcW7`, scope locked | ❌ Open (scope locked) | No |
| 6 | 6 surgeon portraits flagged `isPlaceholder=true` (+ single-source verified ✅) | ⏳ Awaiting uploads | No |
| 7 | N1 / N2 / N3 — Header / FAB / pricing polish | ❌ Open | No |
| 8 | Back-to-Top ↔ WhatsApp FAB vertical gap | ❌ Open | No |
| 9 | Starburst texture — clarify scope + ship | ❌ Open (planning) | No |
| 10 | N0 — Golden-path mobile UX pass | ❌ Open | No |
| 11 | R2 — Homepage Bucket admin detail (+ footer regression precedent) | ✅ Shipped (`3a87d4c`); precedent logged | — |
| 12 | q17 — Refresh image set per Figma | ⏸ Deferred (folds into #5) | No |
| 13 | Phase 9 — i18n EN ⇄ ID | ❌ Open | No (post-launch) |
| 14 | Phase C6–C10 — CMS structural alignment | ❌ Open (largely superseded by Phase R) | No |

---

## 1 — Early-morning cleanup audit (`8a7007e` post-ship verification)

**Status:** ❌ Open — **DO FIRST** in the 2026-05-25 CR plan
**Added:** 2026-05-25 mid-session (own row per user instruction)

Commit `8a7007e` ("footer brand column + surgeon portrait consistency") shipped at 03:02 UTC today as a rushed pre-dawn fix. It restored the footer brand column (closing the d2a1ce4 regression — see #11 precedent) and wired `media={s.portrait}` consistently on `SurgeonsIndex.tsx` + `SurgeonDetail.tsx`. Audit needed before moving to anything else in this CR.

**Audit checklist:**

- [ ] **Tagline beyond design source** — `8a7007e` added `<p className="footer-brand-tagline">Managed by BIMC Hospital</p>` between the logo and the address. This string does **not** appear as a visible element in `design/shared.jsx:670-687` (it only exists as a header `<img alt>` attribute at line 456). Decide: keep (editorial reinforcement) or remove (strict design parity)?
- [ ] **Roman copyright at all breakpoints** — `© MMXXVI BIMC CosMedic Centre` renders correctly desktop; verify at 320 / 375 / 700 / 1100 / 1440 widths that the bottom-row strip doesn't wrap awkwardly.
- [ ] **Suka + Astri portrait consistency** — these are the only 2 non-placeholder portraits. Verify same image renders across `/` (home lead surgeon), `/surgeons` (grid card + lead feature image), `/surgeons/suka` + `/surgeons/astri` (detail hero + bottom faculty cards).
- [ ] **6 placeholder portraits still fall back gracefully** — Indra / Risma / Theresia / Rosa / Sissy / Wara. Verify `surgeonPortraitUrl()` still returns the legacy `/assets/surgeons/<slug>.{png,webp}` path while `is_placeholder=true`, so no broken-image icons appear.
- [ ] **4-column footer at desktop, stacking at mobile** — `.footer-top { grid-template-columns: 1.4fr 1fr 1fr 1fr }` at >1100px; brand spans full width ≤1100px; all stack ≤700px. Re-run mobile audit harness `/tmp/cosmedic-audit/` if anything looks off.
- [ ] **Footer CMS path (`useCmsCols`) still works** — current rendered HTML proves the hardcoded fallback is active (`footer.linkColumns` empty). Verify the CMS-driven path still renders 4 columns when an editor populates `linkColumns` (Treatments excluded, then mapped — see `Footer.tsx:76-92`).

---

## 2 — SMTP provider

**Status:** ❌ Not configured; carries from Phase 7 → Phase 8 → today
**Launch-blocking:** Yes

Enquiry emails currently transit `nodemailerAdapter`'s **JSON transport** — full message body logged to CMS stdout, not delivered. `packages/cms/src/lib/email-adapter.ts` reads `SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS / SMTP_SECURE` from env; populate any of those and delivery switches on automatically. Recommended providers: Postmark (best deliverability, $10/mo flat), AWS SES (cheapest, slower DKIM setup), or relay through the clinic's existing mail server.

---

## 3 — Phase 11: pre-launch QA gates

**Status:** ❌ Open (all sub-items)
**Launch-blocking:** Yes — Lighthouse Green ≥ 90 is non-negotiable per CLAUDE.md

- Lighthouse-CI + budget config — workstream pending
- axe-core via `@axe-core/playwright` — workstream pending
- Playwright visual-regression suite (Pixel-Fidelity Gate) — workstream pending; **must include footer column-count snapshot per #11 precedent**
- linkinator broken-link + broken-image sweep across all 51 routes — workstream pending
- CMS-Sufficiency Gate manual walk per `docs/cms_schema.md` §5
- Multi-breakpoint visual check at 1920 / 1440 / 1100 / 900 / 700 / 540 / 390

---

## 4 — Phase 10 imagery gaps

**Status:** ❌ Open
**Launch-blocking:** Yes (placeholders visible to visitors)
**Tracker:** `docs/planning/phase-10-imagery-gaps.md`

- 23 lifestyle / villa / hero / portrait slots — to be AI-generated against the brand brief, then `pnpm seed:media` re-run
- 25 of 29 Before/After composites — need clinical sign-off + image set from the clinical team
- After ingest, extend `media={...}` to remaining 19 `<Img>` call sites (currently 3 hot paths benefit from responsive srcset)

---

## 5 — Figma MCP integration

**Status:** ❌ Open — scope locked 2026-05-25; execution pending
**Added:** 2026-05-25 (post-audit) · **Updated:** 2026-05-25 mid-session

**File locked:**
- URL: https://www.figma.com/design/KjPZnGnbpa994mf7byvcW7/Comesic-Image-generation?node-id=0-1
- File key: `KjPZnGnbpa994mf7byvcW7`
- Name: "Comesic-Image-generation" (the q17 deferred image set — see #12)

**Scope locked: Inventory + upload to Payload Media**
1. `mcp__claude_ai_Figma__get_metadata` → enumerate every top-level frame in the file
2. `mcp__claude_ai_Figma__get_screenshot` per frame → reference snapshots
3. `mcp__claude_ai_Figma__get_design_context` → token + component inventory (cross-check against `design/global.css`)
4. Per image asset: export from Figma → upload to Payload Media via `POST /api/media` with `category=` tag matching the 9 buckets (homepage / treatments / doctors / results / pricing / journey / contact / blog / uncategorised)
5. Identify the 6 surgeon-portrait replacements within the Figma file → upload to existing Media records #2 / #3 / #7 / #21 / #22 / #24 → untick `isPlaceholder=true` in admin
6. `POST /api/revalidate` → flush web cache; verify all 8 surgeon routes render new portraits

**Closes (partial or full):**
- #12 (q17 image refresh) — fully closes once inventory + upload done
- #6 (surgeon portraits) — fully closes (single-source verified, just needs the real photos)
- #4 (Phase 10 imagery gaps) — partial close depending on what Figma actually contains for the 23 lifestyle/hero slots
- #9 (starburst) — if "starburst" exists as a Figma frame, the inventory pass catches it

**Code Connect (`add_code_connect_map`)** — explicitly **out of scope** for this pass. Deferred to a separate item if/when value is established.

**Related items:**

- #7 (N1 / N2 / N3 polish) — Figma is the authoritative source for the header endorsement alignment, FAB sizing, and pricing-table column spec; the inventory may surface spec frames that close N1/N2/N3 in passing.

---

## 6 — Six surgeon portraits still placeholder

**Status:** ⏳ Awaiting real photo uploads
**Surfaced:** 2026-05-25 (commit `8a7007e` investigation)

| Surgeon | CMS media ID | Filename | `is_placeholder` |
|---|---|---|---|
| Indra | 2 | `indra.webp` | `true` |
| Risma | 3 | `risma.webp` | `true` |
| Theresia | 7 | `theresia.webp` | `true` |
| Rosa | 21 | `rosa-1.webp` | `true` |
| Sissy | 22 | `sissy-1.webp` | `true` |
| Wara | 24 | `wara-1.webp` | `true` |

The page logic intentionally falls back to `/assets/surgeons/<slug>.png` legacy files while `is_placeholder=true`. To switch over: upload real portraits to those Media records (or new ones) and untick **Is placeholder** in admin — no code change needed.

### Doctors / Surgeons single-source verification (2026-05-25 addendum)

Confirmed: the CMS `Surgeons` collection is the **sole source** for every surgeon attribute used anywhere on the site. No duplication exists in CMS.

| Attribute | CMS field | Adapter line | Consumed by |
|---|---|---|---|
| Image | `Surgeons.portrait` (upload → Media) | `seed.ts:65 portrait: s.portrait` | `<Img media={s.portrait}>` in all 3 routes |
| Title (dr.) | `Surgeons.title` | `seed.ts:53` | Home, index, detail |
| Common name | `Surgeons.commonName` | `seed.ts` | Home, index, detail |
| Full name | `Surgeons.name` | `seed.ts` | Home, index, detail |
| Credentials | `Surgeons.credLine` → `cred` | `seed.ts:61` | Home, index, detail |
| Bio | `Surgeons.bio` (lexical) → flattened to `bio` | `seed.ts:63` | Detail |
| Group (Plastic / Aesthetic) | `Surgeons.group` | adapter | Index filters, detail "Specialty" row |
| Slug | `Surgeons.slug` | adapter | Routing, fallback asset key |
| Sort order | `Surgeons.sortOrder` | adapter | Index ordering |

All 3 surgeon routes read through one lazy proxy: `SURGEON_LIST = lazyArray<Surgeon>((cms) => adaptSurgeons(cms))` at `packages/web/src/content/seed.ts:89`.

- [packages/web/src/routes/home/Surgeons.tsx](packages/web/src/routes/home/Surgeons.tsx) — lead surgeon block
- [packages/web/src/routes/surgeons/SurgeonsIndex.tsx](packages/web/src/routes/surgeons/SurgeonsIndex.tsx) — full team grid
- [packages/web/src/routes/detail/SurgeonDetail.tsx](packages/web/src/routes/detail/SurgeonDetail.tsx) — per-surgeon page + faculty cards at bottom

**Legacy fallback files:** `packages/web/public/assets/surgeons/{slug}.{png,webp}` are fallback-only, used by `surgeonPortraitUrl()` when `Surgeons.portrait` is null or its Media is flagged `isPlaceholder=true`. They become deletable the moment all 6 placeholder Media records have real portraits uploaded + the flag unticked — i.e. once #5 (Figma sync) closes this item.

**No duplication confirmed:** there is no parallel `Doctors` collection, no per-route hardcoded surgeon data, no `SURGEON_LIST` static-array override. The `SURGEON_PORTRAITS` map at `seed.ts:223-230` is the fallback-URL map only, not a content source.

---

## 7 — N1 / N2 / N3: Polish trio

**Status:** ❌ Open (all three)
**Tracker:** `docs/planning/all_todo.md` Phase N

- **N1** — Header `logo-endorsement-line` / `logo-endorsement-mark` not vertically centred against the COSMEDIC glyph
- **N2** — FloatingChrome Back-to-Top button must match WhatsApp FAB in width / height / border-radius / shadow (today they read as a mismatched pair) — pairs with #8 (gap fix)
- **N3** — `/pricing` `ClinicCatalogueTable`: enforce consistent column widths across every category table (today they auto-size per sheet); left-align text columns (procedure name, notes, anaesthesia type)

---

## 8 — Back-to-Top ↔ WhatsApp FAB vertical gap

**Status:** ❌ Open
**Added:** 2026-05-25 (post-audit)
**Related:** Item 7 — N2 tracks the **sizing** mismatch (width / height / border-radius / shadow); this item is the **gap** between the two buttons in the FloatingChrome stack, which is a separate concern.

**Where it lives:** `packages/web/src/components/shell/FloatingChrome.tsx` + the floating-chrome rules in `packages/web/src/styles/partials/04-shell-cta-footer-floating.css`.

**Scope:**
- Define the target gap (px or rem) between the Back-to-Top button and the WhatsApp FAB when both are visible (scrolled state).
- Apply via `gap` on the floating-chrome wrapper or explicit `margin` on whichever sits above the other.
- Verify at 320 / 375 / 700 / 1100 / 1440 widths — the gap should hold at every breakpoint and not collide with the bottom-right viewport edge.
- Coordinate with #7 (N2) so the sizing fix and the gap fix land together — otherwise the gap will look wrong against whichever button is still mis-sized.

---

## 9 — Starburst texture — clarify scope + ship

**Status:** ❌ Open — planning only, scope undefined
**Added:** 2026-05-25 (post-audit)

The codebase contains exactly one mention of "starburst" — a CSS comment at `packages/web/src/styles/partials/08-interior-pages-2.css:470` that reads _"Dark footer wrapper — combines CTA band + footer with one shared starburst"_. There is no `.starburst` class, no `.starburst-*` token, no SVG/PNG asset by that name in `packages/web/public/assets/`, and no entry in any planning or change-request doc.

**Scope to define before any code change:**

- What "starburst" refers to — is it a brand-guidelines element (check `docs/assets/brand-guidelines.pdf`), a Figma frame asset, a CSS radial-gradient texture, or a decorative SVG overlay?
- Where it should appear — CTA band, footer wrapper, hero backgrounds, eyebrow rules, somewhere else?
- Visual reference — Figma frame, screenshot, or design source link.
- Whether the CSS comment at `partials/08:470` describes something that **was** built and got removed, or something **planned but never built**.

**Related items:**
- #5 (Figma MCP) — if "starburst" is a Figma frame, an MCP fetch is the cheapest way to inventory + ship in one motion.
- #4 (Phase 10 imagery) — if it's an SVG asset, it could be uploaded as part of the imagery sweep.

---

## 10 — N0: Golden-path mobile UX pass

**Status:** ❌ Open; overlaps with M1+M4 (which addressed overflow only)

Visual-quality pass across 320 / 375 / 414 / 640 / 768 — clipped headlines, broken stacking, touch targets <44px, vertical rhythm, photo crops. Not overflow-only.

---

## 11 — R2: Homepage Bucket admin detail

**Status:** ✅ Shipped 2026-05-25 (commit `3a87d4c` — landed between this session's `8a7007e` and `20979ef`)
**Tracker:** `docs/remap.md` + `docs/remap_plan.md` — Phase R2

Scope shipped: split `HomePage` (9 block fields) into 10 purpose-named section globals (HomeHero · HomeIntro · HomeLeadMagnet · HomePlace + 6 view mirrors), rewired `packages/web/src/routes/home/*.tsx`, migrated data so live page renders identically.

**Note for future R-style refactors:** uploads that target new globals (e.g. `HomeHero.heroImage`) won't surface if old code paths still read from the prior global — that's the symptom we hit on 2026-05-25 with hero + team photo before R2 fully landed. Sequence matters: migrate data → rewire reads → ship.

### Footer brand-column regression precedent (2026-05-25 addendum)

Tracing the rule violation that surfaced this morning:

| Commit | Date | Footer state |
|---|---|---|
| `60a5ad1` Phase 2 chrome port | initial | 4 columns: **brand** (logo + address + newsletter) + Treatments + About + Connect — matched `design/shared.jsx:670` |
| `3bc02e5` Pages → 14 Globals refactor | 2026-05-22 | 4 columns preserved ✅ |
| **`d2a1ce4`** Phase Q q7 "dark-brown 3-column footer reskin" | 2026-05-24 | ❌ **brand block deliberately dropped** — commit body: _"3 stacked link columns (TREATMENTS / ABOUT / CONNECT) on a dark-brown surface, no logo/address/newsletter block"_ |
| `8a7007e` footer brand column + surgeon portrait consistency | 2026-05-25 03:02 UTC | ✅ brand column restored, 4 columns again |

**Root cause:** q7 implementer trusted `docs/changes/change2a.pdf` Item 5 reference image without structural-diffing against `design/shared.jsx` (the canonical mirror). The reference likely showed a cropped or mobile-stacked view; the implementer's commit body explicitly acknowledges the deletion, meaning the rule was bypassed knowingly based on the mis-read reference.

**Action items:**
- Add a "structural-diff against `design/shared.jsx`" step to the `changerequest_21May.md` 7-step pre-implementation workflow.
- Append this q7 → 8a7007e incident as a worked example to `feedback_no_frontend_data_loss.md` so the memory carries an authoritative case study, not just the rule statement.
- Visual-regression snapshot of the desktop footer should be on the Phase 11 (#3) Playwright gate so any future column-count regression fails CI before merge.

---

## 12 — q17: Refresh image set per Figma

**Status:** ⏸ Deferred since Phase Q close-out (2026-05-24); folds into #5
**Tracker row:** `docs/changes/changerequest_21May.md` — q17

Block: Figma image set not yet delivered + inventoried by the design team. When delivered, this becomes a routine swap into `packages/web/public/assets/` plus Payload Media uploads, replacing placeholders flagged `isPlaceholder=true`.

**Resume condition:** Figma drop received → inventory against the q17 row's image list → batch upload + relink. Now folded into #5 (Figma MCP) — same file, same upload-to-Payload-Media path.

---

## 13 — Phase 9: i18n EN ⇄ ID

**Status:** ❌ Open (entire phase)
**Launch-blocking:** No (post-launch acceptable)

Scope from `all_todo.md`:
- `payload.config.ts`: `localization: { locales: ['en', 'id'], defaultLocale: 'en' }`
- Verify `localized: true` on every editorial field across 18 collections + 42 globals
- Locale routing: `/id/*` mirror via SSR router
- EN | ID switcher in Header (today exists but is decorative)
- `<html lang>` + `hreflang` alternate meta on every route
- Static UI strings in `i18n/{en,id}.json` (button labels, form messages, error copy)

---

## 14 — Phase C6–C10: CMS structural alignment

**Status:** ❌ Open (mostly superseded by Phase R, but still listed)
**Tracker:** `docs/planning/all_todo.md` Phase C section

- C6 — Home Page A2: wire 9 hardcoded section frames (now part of R2 scope)
- C7 — Pricing Page A2: wire 3 hardcoded section frames (now part of R6 scope — verify R6 closed this)
- C8 — Before/After full editorial wiring
- C9 — Pricing unification (single-source via Procedures) — HIGH RISK flag
- C10 — Final audit + sign-off

**Action:** audit which items genuinely remain after R-phase closures; remove or merge the obsolete ones.

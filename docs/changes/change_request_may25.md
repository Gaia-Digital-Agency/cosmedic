# Change Request — 2026-05-25

> Outstanding items captured at end of 2026-05-25 session. Source: live audit against `docs/planning/all_todo.md`, `docs/remap_plan.md`, `docs/planning/phase-10-imagery-gaps.md`, and CLAUDE.md.
>
> **2026-05-25 mid-session reorg (Option B variant):** Item 2 promoted to **R2 + footer regression precedent + atom-coverage closure** (was item 11) — the safeguard work is launch-critical for design integrity, sits at #2. All other items shift down by one slot from #3 onward, except merges: former #5 (Figma MCP) + #6 (surgeon portraits) collapse into a single new #6. Net row count: 13 → 12. Launch-blocking items now sit in slots #1–#6 contiguous.
>
> **Ordering:** rows below are in execution order — #1 first, #12 last. Numbers are stable IDs for this session; future-session reorgs may re-key.

## Summary

| # | Item | Status | Launch-blocking |
|---|---|---|---|
| 1 | Early-morning cleanup audit (`8a7007e` post-ship verification) | ❌ Open — **do first** | No |
| 2 | R2 + footer regression precedent + 9-atom CMS coverage (item 11.b) | ⏳ In flight — DDL applied, seed + wire pending | — |
| 3 | SMTP provider + `.env` config | ❌ Not configured | **Yes** |
| 4 | Phase 11 — pre-launch QA gates | ❌ Open | **Yes** |
| 5 | Phase 10 — imagery gaps | ❌ Open | **Yes** |
| 6 | Figma MCP + 6 surgeon portraits — file `KjPZnGnbpa994mf7byvcW7` (merged from former #5 + #6) | ❌ Open (access blocked — file not shared with MCP user) | **Yes** |
| 7 | N1 / N2 / N3 — Header / FAB / pricing polish | ❌ Open | No |
| 8 | Back-to-Top ↔ WhatsApp FAB vertical gap | ❌ Open | No |
| 9 | Starburst texture — clarify scope + ship | ❌ Open (planning) | No |
| 10 | N0 — Golden-path mobile UX pass | ❌ Open | No |
| 11 | Phase 9 — i18n EN ⇄ ID | ❌ Open | No (post-launch) |
| 12 | Phase C6–C10 — CMS structural alignment | ❌ Open (largely superseded by Phase R) | No |
| 13 | Pricing bucket check — per-procedure pricing not grouped in Pricing Bucket? (Rp/AUD conversion may be the exception) | ❌ Open — needs audit | No |
| 14 | Slugs sweep (web + CMS) — single-word or minimal `x-y`, never lengthy; must match on-site URL | ❌ Open | No |
| 15 | URL structure — `/treatments/surgical/face` (face under surgical) — verify + clarify if required | ❌ Open | No |
| 16 | CMS slug bug — first parent category is gone in admin slug | ❌ Open | No |
| 17 | Site-wide price-conversion plumbing — auto-link to global pricing rate (AUD↔IDR) so currency flip is one-source | ❌ Open | No |
| 18 | Restructure Payload Bucket + Items naming (user to explain scope later) | ❌ Open — awaiting brief | No |

**Launch-blocking 6** (top of list, contiguous): #1 · #2 · #3 · #4 · #5 · #6.

**Items 13–18 added 2026-05-25 mid-session.** Scoped after the launch-blocking 6 close.

---

## 1 — Early-morning cleanup audit (`8a7007e` post-ship verification)

**Status:** ❌ Open — **DO FIRST** in the 2026-05-25 CR plan
**Added:** 2026-05-25 mid-session (own row per user instruction)

Commit `8a7007e` ("footer brand column + surgeon portrait consistency") shipped at 03:02 UTC today as a rushed pre-dawn fix. It restored the footer brand column (closing the d2a1ce4 regression — see #2 precedent) and wired `media={s.portrait}` consistently on `SurgeonsIndex.tsx` + `SurgeonDetail.tsx`. Audit needed before moving to anything else in this CR.

**Audit checklist:**

- [ ] **Tagline beyond design source** — `8a7007e` added `<p className="footer-brand-tagline">Managed by BIMC Hospital</p>` between the logo and the address. This string does **not** appear as a visible element in `design/shared.jsx:670-687` (it only exists as a header `<img alt>` attribute at line 456). Decide: keep (editorial reinforcement) or remove (strict design parity)?
- [ ] **Roman copyright at all breakpoints** — `© MMXXVI BIMC CosMedic Centre` renders correctly desktop; verify at 320 / 375 / 700 / 1100 / 1440 widths that the bottom-row strip doesn't wrap awkwardly.
- [ ] **Suka + Astri portrait consistency** — these are the only 2 non-placeholder portraits. Verify same image renders across `/` (home lead surgeon), `/surgeons` (grid card + lead feature image), `/surgeons/suka` + `/surgeons/astri` (detail hero + bottom faculty cards).
- [ ] **6 placeholder portraits still fall back gracefully** — Indra / Risma / Theresia / Rosa / Sissy / Wara. Verify `surgeonPortraitUrl()` still returns the legacy `/assets/surgeons/<slug>.{png,webp}` path while `is_placeholder=true`, so no broken-image icons appear.
- [ ] **4-column footer at desktop, stacking at mobile** — `.footer-top { grid-template-columns: 1.4fr 1fr 1fr 1fr }` at >1100px; brand spans full width ≤1100px; all stack ≤700px. Re-run mobile audit harness `/tmp/cosmedic-audit/` if anything looks off.
- [ ] **Footer CMS path (`useCmsCols`) still works** — current rendered HTML proves the hardcoded fallback is active (`footer.linkColumns` empty). Verify the CMS-driven path still renders 4 columns when an editor populates `linkColumns` (Treatments excluded, then mapped — see `Footer.tsx:76-92`). NOTE: this fallback path is being removed under #2 (item 11.b) — fallback becomes dead code once Footer.linkColumns is seeded.

---

## 2 — R2: Homepage Bucket admin detail + footer regression precedent + 9-atom CMS coverage

**Status:**
- **R2 itself:** ✅ Shipped 2026-05-25 (commit `3a87d4c`)
- **Footer regression precedent + memory + workflow safeguards:** ✅ Closed 2026-05-25 mid-session (commit `9e5a062`)
- **9-atom CMS coverage (item 11.b):** ⏳ **In flight** — DDL applied, schema in Footer.ts, seed script written; seed + Footer.tsx wire + byte-diff + fallback removal still pending
- **Visual-regression footer snapshot:** ⏳ Carry over to #4 (Phase 11 Playwright gate)

**Tracker:** `docs/remap.md` + `docs/remap_plan.md` — Phase R2

### R2 ship summary

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

**Recurrence safeguards (closed 2026-05-25 mid-session, commit `9e5a062`):**
- ✅ **Workflow gate added** — `changerequest_21May.md` per-q workflow now has **Step 0: Structural-diff gate** (any layout-touching item must structural-diff against `design/shared.jsx` first; design mirror wins over PDF reference if they disagree). Skipping Step 0 is what caused d2a1ce4.
- ✅ **Memory updated** — `feedback_no_frontend_data_loss.md` now carries the q7 → 8a7007e footer regression as a worked example, plus step 4 "Reskin / redesign tasks also count" extending the rule from "CMS refactors" to "any layout edit."
- ⏳ **Visual-regression snapshot** — desktop footer column-count assertion sits in Phase 11 (#4) Playwright gate scope.

### Item 11.b — 9-atom CMS coverage (in flight)

Audit established 9 hardcoded atoms in current Footer.tsx that were vulnerable to silent loss in a future reskin:

| Atom | New CMS source |
|---|---|
| Brand tagline "Managed by BIMC Hospital" | `Footer.brandTagline` |
| Newsletter label / placeholder / button arrow | `Footer.newsletter.{label,placeholder,buttonLabel}` |
| Treatments column heading | `Footer.treatmentsHeading` |
| About / Connect column headings + items (fallback) | `Footer.linkColumns[]` (existing, now seeded) |
| Instagram + Facebook hrefs (`#` placeholders) | `Settings.socialLinks[]` (existing, now seeded) via new `linkColumns[].items[].social` enum |
| "PT Trisaka Reksa Waluya" + "Designed in Bali" + copyright | `Footer.footerBottomLines[]` array |

**Pipeline:**
1. ✅ Baseline footer HTML captured (md5 `b156659f3c1143d0aed53262f96cbc00`, 87 lines, `/tmp/cosmedic-11b/footer-baseline.html`)
2. ✅ Footer.ts schema updated (4 new field groups, 1 new enum on linkColumns items)
3. ✅ DDL migration applied via psql (5 footer columns + 1 enum + 1 social col + 1 new array table + payload_migrations row)
4. ✅ Seed script written (`packages/cms/src/seed/seed-footer-atoms.ts`) — copies hardcoded values byte-verbatim per [feedback_no_frontend_data_loss.md] step 1
5. ⏳ Rebuild CMS + run seed
6. ⏳ Wire Footer.tsx to consume new fields + Settings.socialLinks resolution for social hrefs
7. ⏳ Restart web, curl-diff against baseline — byte-identical is the gate
8. ⏳ Delete hardcoded fallback path in Footer.tsx (only after byte-diff passes)
9. ⏳ Commit + push

---

## 3 — SMTP provider

**Status:** ❌ Not configured; carries from Phase 7 → Phase 8 → today
**Launch-blocking:** Yes

Enquiry emails currently transit `nodemailerAdapter`'s **JSON transport** — full message body logged to CMS stdout, not delivered. `packages/cms/src/lib/email-adapter.ts` reads `SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS / SMTP_SECURE` from env; populate any of those and delivery switches on automatically. Recommended providers: Postmark (best deliverability, $10/mo flat), AWS SES (cheapest, slower DKIM setup), or relay through the clinic's existing mail server.

**Needed from user (table form):**

| # | Item | Source | Status |
|---|---|---|---|
| 1 | Provider | You decide (Postmark / SES / BIMC relay / other) | ❌ |
| 2 | `SMTP_HOST` | Provider dashboard | ❌ |
| 3 | `SMTP_PORT` | Provider dashboard (587 TLS / 465 SSL) | ❌ |
| 4 | `SMTP_USER` | Provider dashboard | ❌ |
| 5 | `SMTP_PASS` | Provider dashboard | ❌ |
| 6 | `SMTP_SECURE` | Implied from port | I set |
| 7 | `MAIL_FROM` | Default `BIMC CosMedic <no-reply@cosmedic.gaiada.online>` + SPF/DKIM/DMARC at gaiada.online DNS | I draft, you DNS |
| 8 | `MAIL_CLINIC_TO` | Confirm `cosmedic@bimcbali.com` or change | ⏳ confirm |

---

## 4 — Phase 11: pre-launch QA gates

**Status:** ❌ Open (all sub-items)
**Launch-blocking:** Yes — Lighthouse Green ≥ 90 is non-negotiable per CLAUDE.md

- Lighthouse-CI + budget config — workstream pending
- axe-core via `@axe-core/playwright` — workstream pending
- Playwright visual-regression suite (Pixel-Fidelity Gate) — workstream pending; **must include footer column-count snapshot per #2 precedent**
- linkinator broken-link + broken-image sweep across all 51 routes — workstream pending
- CMS-Sufficiency Gate manual walk per `docs/cms_schema.md` §5
- Multi-breakpoint visual check at 1920 / 1440 / 1100 / 900 / 700 / 540 / 390

---

## 5 — Phase 10 imagery gaps

**Status:** ❌ Open
**Launch-blocking:** Yes (placeholders visible to visitors)
**Tracker:** `docs/planning/phase-10-imagery-gaps.md`

- 23 lifestyle / villa / hero / portrait slots — to be AI-generated against the brand brief, then `pnpm seed:media` re-run
- 25 of 29 Before/After composites — need clinical sign-off + image set from the clinical team
- After ingest, extend `media={...}` to remaining 19 `<Img>` call sites (currently 3 hot paths benefit from responsive srcset)

---

## 6 — Figma MCP integration + 6 surgeon portraits (merged)

**Status:** ❌ Open — scope locked 2026-05-25; **access blocked** (file not shared with MCP user)
**Added:** 2026-05-25 (post-audit) · **Merged with former #6 surgeon-portraits row:** 2026-05-25 mid-session
**Launch-blocking:** Yes (the 6 placeholder portraits ride this pipeline)

**File locked:**
- URL: https://www.figma.com/design/KjPZnGnbpa994mf7byvcW7/Comesic-Image-generation?node-id=0-1
- File key: `KjPZnGnbpa994mf7byvcW7`
- Name: "Comesic-Image-generation"

**Scope locked: Inventory + upload to Payload Media**
1. `mcp__claude_ai_Figma__get_metadata` → enumerate every top-level frame in the file
2. `mcp__claude_ai_Figma__get_screenshot` per frame → reference snapshots
3. `mcp__claude_ai_Figma__get_design_context` → token + component inventory (cross-check against `design/global.css`)
4. Per image asset: export from Figma → upload to Payload Media via `POST /api/media` with `category=` tag matching the 9 buckets (homepage / treatments / doctors / results / pricing / journey / contact / blog / uncategorised)
5. Identify the 6 surgeon-portrait replacements within the Figma file → upload to existing Media records #2 / #3 / #7 / #21 / #22 / #24 → untick `isPlaceholder=true` in admin
6. `POST /api/revalidate` → flush web cache; verify all 8 surgeon routes render new portraits

**Access blocker (2026-05-25):** First MCP call (`get_metadata` on file `KjPZnGnbpa994mf7byvcW7`) returned access denied (Figma Debug UUID `dd290885-3c02-43fb-9e28-4c48daa44bed`). The file isn't shared with the Figma account behind the MCP integration. **Unblock action (yours):** share the Figma file with view-access to the MCP-connected Figma user. Once that lands, the 6-step pipeline above executes.

**6 surgeon portraits awaiting upload (merged from former item #6):**

| Surgeon | CMS media ID | Filename | `is_placeholder` |
|---|---|---|---|
| Indra | 2 | `indra.webp` | `true` |
| Risma | 3 | `risma.webp` | `true` |
| Theresia | 7 | `theresia.webp` | `true` |
| Rosa | 21 | `rosa-1.webp` | `true` |
| Sissy | 22 | `sissy-1.webp` | `true` |
| Wara | 24 | `wara-1.webp` | `true` |

Page logic falls back to `/assets/surgeons/<slug>.png` legacy files while `is_placeholder=true`. To switch over: upload real portraits + untick the flag in admin — no code change needed. Pipeline step 5 above does this in bulk.

### Doctors / Surgeons single-source verification (2026-05-25)

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

**Legacy fallback files:** `packages/web/public/assets/surgeons/{slug}.{png,webp}` are fallback-only, used by `surgeonPortraitUrl()` when `Surgeons.portrait` is null or its Media is flagged `isPlaceholder=true`. They become deletable the moment all 6 placeholder Media records have real portraits uploaded + flag unticked.

**Closes (partial or full):**
- #5 (Phase 10 imagery gaps) — partial close depending on what Figma actually contains for the 23 lifestyle/hero slots
- #9 (starburst) — if "starburst" exists as a Figma frame, the inventory pass catches it

**Code Connect (`add_code_connect_map`)** — explicitly **out of scope** for this pass. Deferred to a separate item if/when value is established.

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
- #6 (Figma MCP) — if "starburst" is a Figma frame, the inventory pass catches it in one motion.
- #5 (Phase 10 imagery) — if it's an SVG asset, it could be uploaded as part of the imagery sweep.

---

## 10 — N0: Golden-path mobile UX pass

**Status:** ❌ Open; overlaps with M1+M4 (which addressed overflow only)

Visual-quality pass across 320 / 375 / 414 / 640 / 768 — clipped headlines, broken stacking, touch targets <44px, vertical rhythm, photo crops. Not overflow-only.

---

## 11 — Phase 9: i18n EN ⇄ ID

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

## 12 — Phase C6–C10: CMS structural alignment

**Status:** ❌ Open (mostly superseded by Phase R, but still listed)
**Tracker:** `docs/planning/all_todo.md` Phase C section

- C6 — Home Page A2: wire 9 hardcoded section frames (now part of R2 scope)
- C7 — Pricing Page A2: wire 3 hardcoded section frames (now part of R6 scope — verify R6 closed this)
- C8 — Before/After full editorial wiring
- C9 — Pricing unification (single-source via Procedures) — HIGH RISK flag
- C10 — Final audit + sign-off

**Action:** audit which items genuinely remain after R-phase closures; remove or merge the obsolete ones.

---

## 13 — Pricing Bucket check: per-procedure pricing grouping

**Status:** ❌ Open — needs audit
**Added:** 2026-05-25 mid-session

Question from user: in CMS, the per-procedure pricing is no longer grouped in the Pricing Bucket — the Rp/AUD conversion rate may be the only thing left there. Audit:
- Walk through every collection currently in Bucket **e. Pricing** (per `cms_info.md`).
- For each, confirm whether the per-procedure prices live in `Procedures` collection (under Treatments) vs. `PriceListItems` collection (under Pricing) vs. somewhere else.
- Identify what's actually left in the Pricing Bucket if the per-procedure prices moved (likely just the IDR/AUD conversion rate + footnote + insurance globals).
- Decide whether the Pricing Bucket structure still makes sense or should be consolidated.

---

## 14 — Slug sweep across web + CMS

**Status:** ❌ Open
**Added:** 2026-05-25 mid-session

Slug-quality audit:
- Every URL slug on the live site + every collection-item slug in CMS.
- Target: single-word OR minimal `x-y` (two-word hyphen-joined) — never lengthy multi-word slugs.
- Must match exactly what's rendered on the live site (CMS slug == URL slug).
- Output: table of `(collection, current_slug, proposed_slug, reason)` for review before any rewrite.

---

## 15 — URL structure: face under surgical

**Status:** ❌ Open — verify + clarify if needed
**Added:** 2026-05-25 mid-session

User expectation: `https://cosmedic.gaiada.online/treatments/surgical/face` (3-level path — discipline / sub-category) since "face" sits under "surgical".

Currently SSR router likely renders this as `/treatments/surgical-face` (2-level path with combined slug). Verify which is live, then confirm with user whether 3-level nested route is the target.

Related to #14 (slug sweep) — the nested-vs-flat URL decision determines the slug shape.

---

## 16 — CMS slug bug: first parent category disappears

**Status:** ❌ Open
**Added:** 2026-05-25 mid-session

User reports: in CMS admin, the first parent category is missing from the slug field display. Audit:
- Confirm which collection (likely `SubCategories` or `Procedures`).
- Identify whether the slug field auto-fills from parent + name and is dropping the parent portion.
- Decide fix: slug-field formula change vs. admin display field change vs. seed correction.

Related to #14 + #15.

---

## 17 — Site-wide price-conversion plumbing

**Status:** ❌ Open
**Added:** 2026-05-25 mid-session

User intent: currency flip (IDR ↔ AUD) anywhere on the site should auto-resolve via the global `Settings.audToIdrRate` so the clinic edits **one value** in CMS to re-peg all displayed AUD.

Confirm:
- Today `Settings.audToIdrRate` already exists (default 10500) and `Settings.currencyDisplayMode` toggles `idr-only` vs `idr-with-aud`.
- `Settings.roundIdrTo` rounds derived IDR to 50,000 by default.
- Verify EVERY price-rendering component on the site reads from these settings, not from per-procedure hardcoded AUD values.
- The user's mention of "in Footer" may refer to a currency-toggle widget that doesn't exist yet — confirm scope: is this a new footer toggle, or just a verification of existing plumbing?

---

## 18 — Restructure Payload Bucket + Items naming

**Status:** ❌ Open — **awaiting user brief**
**Added:** 2026-05-25 mid-session

User flagged this as a "big one" but scope to be explained later. Holding for the spec / brief from user before planning.

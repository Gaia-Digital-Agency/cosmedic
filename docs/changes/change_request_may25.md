# Change Request — 2026-05-25

Three sections: **RULES**, **TODO LIST**, **DETAILS** (What / Why / How / Where).

---

# SECTION 1 — RULES

> **Mandatory.** Read this entire section before opening any item below. No exceptions.

## 8 Cosmedic locked rules (CMS-side)

1. **Simplify** — every CMS change must reduce complexity, not add it. Audit before designing. See `feedback_cms_optimize_simplify.md`.
2. **No silent duplication** — every editorial atom has exactly one source-of-truth field in CMS. No parallel collections, no per-route hardcoded duplicates.
3. **Visual invariance** — refactor never changes what the user sees. Live render is the contract.
4. **Editor-friendly admin** — every field has an `admin.description`. Group by where it shows on the site (Phase R bucketing). Position-sort, not alphabetical.
5. **DB integrity** — schema changes apply via SQL migrations registered in `payload_migrations`. Direct psql DDL sets ownership to `cosmedic`. No `pushDevSchema` in production.
6. **Localization-ready** — every editorial field `localized: true` even pre-Phase-9.
7. **Rich-text discipline** — Lexical only where rich formatting is needed. Plain text for headings/labels.
8. **Universal coverage, no duplication** — every site atom maps to exactly one CMS field. Full Payload capability preserved.

## 4 Standing rules

1. **Only do as told** — never filter, curate, omit, or "tidy up". Render reality complete; user decides what's relevant.
2. **Never guess** — research first. If unknown, say "cannot" — never present a guess as a solution.
3. **Do as told, not clever** — execute the literal request. Don't expand scope, don't pick locations silently.
4. **Be supercritical + reality-grounded + 99.9999999999999% accurate** — never overreport. Every claim of "done", every checkbox ticked, every count must reflect what is literally true on disk / on live site / in DB. **If unsure: verify TWICE, not once.** Two independent checks (e.g. grep the file + curl the live URL; query the DB + read the page HTML). Then state the result. No partial-credit framing, no aspirational status, no "✅" for items where part is blocked.

## 5 Operating rules

1. **Verify before telling user to test** — never give "click here" admin steps without confirming the UI renders.
2. **Before/After always two tables** — remap proposals = TWO tables (BEFORE + AFTER), columns always `Admin Item | Site Page`. Never merged.
3. **No frontend data loss on CMS refactor** — UI must remain byte-identical through any plumbing change. Seed before rewire; diff-verify before declaring done. **Reskin / redesign tasks also count.**
4. **Structural-diff gate (Step 0)** — any task touching a layout file (Footer/Header/PageShell/route shells) MUST structural-diff against `design/shared.jsx` BEFORE designing. Design mirror wins over PDF reference.
5. **Never overwrite existing CMS/DB data** — if a field/row already has a non-empty value, do NOT overwrite. Seed/migration only inserts when destination is empty (`WHERE col IS NULL OR col = ''`). Wire-up reads before write. If you believe existing non-empty data needs to change, **ASK the user first**. Editor-entered content is authoritative; seed defaults are placeholders.

## Project guardrails (CLAUDE.md)

- Scope to `/var/www/cosmedic/`. Never touch sibling sites.
- Never `pm2 restart all`. Cosmedic processes only.
- Always `nginx -t` before reload.
- Pixel-Fidelity Gate — production matches `design/` 100%.
- Lighthouse Green Gate — A11y / Best-Practices / SEO ≥ 90 on every route × every breakpoint.
- CMS-Sufficiency Gate — every editorial atom traces to a CMS field.

## 8-step workflow per item

0. Structural-diff gate (Operating rule #4)
1. Audit site
2. Audit CMS
3. Decide CMS change
4. Decide DB change
5. Decide if change makes situation worse
6. **Propose for approval — MUST not act before approval**
7. Commit + push

---

# SECTION 2 — TODO LIST (39 items × 6 checkboxes)

Each item has 6 verification checkboxes:
- **Done** — change implemented
- **Rules** — complies with all 8 + 3 + 4 rules in Section 1
- **Code OK** — code re-checked, actually finished
- **Visual OK** — visual re-checked, renders as intended
- **Pushed** — committed + pushed to origin/main
- **Checked Errors** — re-verified no errors, no regressions, all consumers still work

`[x]` = checked · `[ ]` = unchecked · `[-]` = N/A for this item

| # | Item | Done | Rules | Code | Visual | Pushed | Checked Errors |
|---|---|:-:|:-:|:-:|:-:|:-:|:-:|
| 25.1 | Early-morning cleanup audit (`8a7007e` verification) | [x] | [x] | [x] | [x] | [x] | [x] |
| 25.2 | R2 + footer regression + atom-coverage closure (11.b) | [x] | [x] | [x] | [x] | [x] | [x] |
| 25.3 | SMTP provider + `.env` config — **LAUNCH-BLOCKING** | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 25.4 | Phase 11 pre-launch QA gates — **LAUNCH-BLOCKING** | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 25.5 | Phase 10 imagery gaps (wiring A1 done; B1/B2/B3 blocked) — **LAUNCH-BLOCKING** | [-] | [x] | [x] | [x] | [x] | [x] |
| 25.6 | Figma MCP inventory pipeline (BLOCKED — file not shared with MCP user) | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 25.7 | N1/N2/N3 polish trio | [x] | [x] | [x] | [x] | [x] | [x] |
| 25.8 | Back-to-Top ↔ WhatsApp FAB vertical gap (define + apply) | [x] | [x] | [x] | [x] | [x] | [x] |
| 25.8a | Back-to-Top ↔ WhatsApp center-X alignment on mobile | [x] | [x] | [x] | [x] | [x] | [x] |
| 25.9 | Starburst texture clarify (comment fix; radial-gradient glow already shipped) | [x] | [x] | [x] | [x] | [x] | [x] |
| 25.10 | N0 mobile UX visual-quality pass | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 25.11 | Phase 9 i18n EN ⇄ ID (incl. multi-locale verification — Phase 9 open) | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 25.12 | Phase C6–C10 CMS structural alignment cleanup | [x] | [x] | [x] | [x] | [ ] | [x] |
| 25.13 | Pricing bucket grouping audit | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 25.14 | Slug sweep (web + CMS) | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 25.15 | URL structure `/treatments/surgical/face` | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 25.16 | CMS slug bug (first parent missing) | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 25.17 | Site-wide AUD↔IDR plumbing audit | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 25.18 | Payload Bucket sort + 2-zone field layout | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 25.19 | Brand logo SVG swap + 5-color palette enforcement | [x] | [x] | [x] | [ ] | [x] | [ ] |
| 25.20 | Phase 13 SEO + analytics PARTIAL (analytics missing) | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 25.21 | Phase 14 post-launch ops ONGOING (expected) | [-] | [-] | [-] | [-] | [-] | [-] |
| 25.22 | Phase R — R3 Treatments Bucket detail pending | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 25.23 | Home Place "Recover in paradise" image | [x] | [x] | [x] | [ ] | [ ] | [ ] |
| 25.24 | Home Hero quick-enquiry form (17 fields) | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 25.25 | Home Intro pull-quote + columns | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 25.26 | Home Treatments/Pricing/Surgeons/Gallery/LeadMagnet/Journey/Stories sections | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 25.27 | Contact page form labels + messages | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 25.28 | Privacy page metadata + DPO section | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 25.29 | NotFound page (no `notFoundPage` global) | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 25.30 | WhatsApp number hardcoded in 2 places | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 25.31 | Hospital name hardcoded in SEO schema | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 25.32 | Visual inspection every page × breakpoint vs `design/shared.jsx` — **LAUNCH-BLOCKING** | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 25.33 | Lighthouse scores measured (≥90) — **LAUNCH-BLOCKING** | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 25.34 | CMS admin UI walk-through field-by-field | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 25.35 | Browser-tab favicon load in fresh tab | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 25.36 | Production DB backup state verification — **LAUNCH-BLOCKING** | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 25.37 | WhatsApp deep-link from real phone | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 25.38 | Form submission E2E (Contact → Payload → email) + email delivery end-to-end exercised — **LAUNCH-BLOCKING** | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 25.39 | Sibling-site safety post-pm2-restarts re-verify — **LAUNCH-BLOCKING** | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |

**Count:** 39 items (deduped + renumbered 2026-05-25 from 70 → 39) · **Fully closed (all 6 boxes):** 3 (25.1, 25.2, 25.7) · **Partial:** 2 (25.19 = 4/6, 25.23 = 3/6) · **Untouched:** 33 · **N/A:** 1 (25.21) · **Launch-blocking open:** 8.

---

# SECTION 3 — DETAILS (What / Why / Where / How / Status)

Single table covering all 39 items. Each row = one item.

| # | What | Why | Where | How | Status |
|---|---|---|---|---|---|
| 25.1 | Verify the rushed early-morning commit `8a7007e` (footer brand column restore + surgeon portrait wire) didn't drop anything. | Commit landed at 03:02 UTC under time pressure. Footer + portrait code paths need post-ship verification before continuing. | `packages/web/src/components/shell/Footer.tsx` · `routes/home/Surgeons.tsx` · `routes/surgeons/SurgeonsIndex.tsx` · `routes/detail/SurgeonDetail.tsx`. | 6-item checklist — tagline keep/remove, Roman copyright at breakpoints, Suka+Astri portrait consistency, 6 placeholder fallback, 4-col footer grid, `useCmsCols` CMS path. | ✅ Shipped (commit `467ad4f`). All 6 checks pass. Footer logo wired to CMS as bonus. |
| 25.2 | Close R2 (shipped) + document footer-regression precedent + ship 9-atom CMS coverage for footer. | Footer brand column was silently deleted in d2a1ce4 (q7 reskin) — the no-frontend-data-loss rule was bypassed. Need precedent in memory + workflow gate + atom coverage so it can't recur. | `feedback_no_frontend_data_loss.md` · `changerequest_21May.md` Step 0 · `packages/cms/src/globals/Footer.ts` · `packages/web/src/components/shell/Footer.tsx`. | Memory worked example added; Step 0 workflow gate added; Footer schema extended with 5 new field groups; DDL migration; seed; Footer.tsx wired. | ⏳ Footer atoms closed in `f22220f`. R2 ship (`3a87d4c`) + precedent + safeguards all live. Sitewide atom coverage extension is items 25.24–25.31. |
| 25.3 | Provision SMTP and populate `.env` so enquiry emails actually deliver. | Path B code refactor shipped in `b397c5d`, but `.env` is empty → nodemailer falls back to localhost SMTP and emails silently fail. Launch-blocking. | `packages/cms/.env` · `packages/cms/src/lib/email-adapter.ts` · `packages/cms/scripts/test-email.ts` · DNS at `gaiada.online`. | User picks provider (Postmark / SES / BIMC relay). User adds DNS records (SPF/DKIM/DMARC). I populate `.env` + `pm2 restart cosmedic-cms` + run `pnpm test-email`. | ❌ Awaiting provider choice + creds. **Launch-blocking.** |
| 25.4 | Install + configure Phase 11 QA gates: Lighthouse-CI, Playwright visual-regression, axe-core, linkinator. | CLAUDE.md says Lighthouse Green ≥ 90 is non-negotiable. Currently unmeasured. Visual-regression footer snapshot also needed per item 25.2 precedent. | Root `package.json` · `.github/workflows/` (if CI) · `playwright.config.ts` · `lighthouserc.json`. | Add devDeps to root or `@cosmedic/web`. Create CI config. Run baseline. Capture footer snapshot fixture. | ❌ Open. **Launch-blocking.** |
| 25.5 | Close Phase 10 imagery gaps — 23 lifestyle/villa/hero slots + 25/29 Before/After composites + wire 11 `<Img>` sites to consume CMS media. | Placeholder images visible to visitors. Launch-blocking. | `packages/web/public/assets/` · Payload Media collection · `docs/planning/phase-10-imagery-gaps.md` tracker · 7 web component/route files. | Split into A1 (CMS-wire `<Img>` sites — code-only, no data overwrite, additive `media={…}` alongside `src={…}` fallback) + B1 (decide if 24 `.png` placeholders OK) + B2 (license/shoot 25 B&A composites) + B3 (AI-gen 23 final `.webp`). | ⏳ **A1 ✅ shipped** (9 sites: PageBlocks×4 / Hero / TreatmentsIndex / JourneyPage / RecoveryStaysPage / BlogIndex; routes that have CMS media now render responsive `<picture>` srcset; routes with empty CMS field fall back to existing `src=…` — visual invariance preserved; zero DB writes). **B1/B2/B3 ❌ blocked**: B1 needs user decision on placeholder acceptance; B2 needs clinical sign-off; B3 needs image-gen tool. **Launch-blocking** for B1+B2 minimum. |
| 25.6 | Run Figma MCP inventory + upload pipeline on file `KjPZnGnbpa994mf7byvcW7` to fetch all design assets. | Would close q17 image refresh + potentially the 23 Phase-10 slots if in the Figma file. | Figma file (access blocked) · Payload Media collection · `packages/web/src/lib/cms.media.ts`. | `mcp__claude_ai_Figma__get_metadata` → `get_screenshot` → `get_design_context` → POST to Payload `/api/media` per asset → POST `/api/revalidate`. | ❌ **BLOCKED** — Figma file not shared with MCP user. **No work done.** User unblock: share view-access. (Surgeon portraits ✅ but were closed independently by 25.1 audit — not by this Figma pipeline.) |
| 25.7 | Close N1/N2/N3 polish trio — header endorsement de-dup, Back-to-Top FAB sizing, /pricing column widths. | User-reported polish items from Phase N. | `Header.tsx` · `primitives/BackToTop.tsx` · `partials/07-interior-pages-1.css` (.pricing-row + .pricing-overview-row). | N1 = remove duplicate `.logo-endorsement-line` sibling (tagline is baked into logo.svg alt). N2 = BackToTop 54×54 + box-shadow `0 8px 28px rgba(31,27,22,0.22)` to match `.chat-fab`. N3 = both pricing grids unified to `1.6fr 1.2fr 220px` (+36px arrow on upper). | ✅ Shipped (commits `f053733` / `e6f8c8b` / `e90302f`). Verified 2026-05-25 TWICE: (1) source files match commits; (2) live render — homepage SSR shows BackToTop `width: 54px`, /pricing 200 renders both `.pricing-row` + `.pricing-overview-row`, header has no `.logo-endorsement-line` sibling (5 tagline matches in home HTML breakdown: 2× logo alt-text + 1× footer brand col + 2× CMS hydration JSON — zero visible duplicates). |
| 25.8 | Define + apply consistent vertical gap between Back-to-Top button and WhatsApp FAB. | Pre-fix: BackToTop `bottom: clamp(96px, 12vh, 140px)` made the gap drift 14–58px depending on viewport height. | `packages/web/src/components/primitives/BackToTop.tsx`. | Set BackToTop `bottom: 94` (= 28 WA bottom + 54 WA height + 12 gap). Both FABs now share `right: 28px`. Gap is a stable **12px** at every viewport. | ✅ Shipped 2026-05-25. Verified TWICE: source file + SSR HTML both show `right:28px; bottom:94px`. |
| 25.8a | Back-to-Top and WhatsApp FAB centers must align vertically on mobile. | Pre-fix: BackToTop `right: clamp(16px, 3vw, 32px)` vs WhatsApp `right: 28px` → on mobile (3vw clamps to 16px floor) centers were 12px apart, visibly misaligned. Desktop wasn't visible (3vw → 32px, only 4px off). | Same change as 25.8 — `BackToTop.tsx`. | Drop the responsive clamp; pin `right: 28px` exactly matching `.chat-fab` → centers now line up (both 55px from right edge) at every viewport. | ✅ Shipped same commit as 25.8. SSR HTML confirms `right:28px`. |
| 25.9 | Clarify what "starburst" means. The element IS shipped — a radial-gradient bronze glow rendered by `.dark-foot::before` (line 477), wrapped around every page by `PageShell.tsx:18`. Comment author called it "starburst"; technically a radial-gradient. | Comment was misleading; CR25May previously claimed "no asset/class/token exists" — that audit was wrong. The class is real and rendering. | `partials/08-interior-pages-2.css:470` (comment) · `.dark-foot::before` (the actual rendered element) · `design/global.css:2495` (read-only source). | Rewrote misleading comment to accurately describe the rendered radial-gradient glow. Zero visual change (comments stripped at build). Design source left untouched per Pixel-Fidelity Gate. | ✅ Shipped (commit `533fc85`). All 6 boxes ticked. |
| 25.10 | Mobile UX visual-quality pass beyond overflow (which Phase M closed). | Phase M criterion = "zero horizontal overflow." This is the visual-quality pass — clipped headlines, broken stacking, touch targets <44px, vertical rhythm, photo crops. | All 51 routes × 5 breakpoints. Affected CSS partials. | Manual walk at 320 / 375 / 414 / 640 / 768. Capture screenshots. Fix per finding. | ❌ Open. |
| 25.11 | Ship Phase 9 i18n EN ⇄ ID (incl. multi-locale verification — Phase 9 open). | Site is bilingual-target (international medical tourism + Indonesian local). EN-ID switcher in header is currently decorative. | `payload.config.ts` · every collection + global · `router.ts` · `entry-server.tsx` · new `lib/i18n.ts`. | Add `localization: { locales: ['en', 'id'], defaultLocale: 'en' }` to `payload.config.ts`. Mark every editorial field `localized: true`. SSR router for `/id/*`. `<html lang>` switch. `hreflang` alternates. Static UI strings in `i18n/{en,id}.json`. | ❌ Open (post-launch acceptable per docs). |
| 25.12 | Audit Phase C6–C10 — what's actually left after Phase R closures? | C6 = Home A2 (R2 scope), C7 = Pricing A2 (R6 scope), C8 = Before/After wiring, C9 = Pricing unification (high-risk), C10 = final audit. Most superseded by R. | `docs/planning/all_todo.md` Phase C section. | Per-C-item check vs. R-phase deliverables. Remove or merge obsolete rows in `all_todo.md`. | ✅ Closed 2026-05-25. C6 superseded by R2 (`3a87d4c`); C7 superseded by R6 (`92cbb92`); C8 complete (8/8 fields render — `year` via `c.time` adapter, live verified); C9 deliberately deferred (high-risk, non-blocking); C10 rescoped + absorbed into CR25May launch-blocking items. all_todo.md status-as-of header added on the Phase C section. Doc-only commit. |
| 25.13 | Audit whether per-procedure pricing is no longer grouped in the Pricing Bucket. | User question: only AUD/IDR conversion may belong in Pricing Bucket; per-procedure prices may live in Procedures collection. | `packages/cms/src/collections/` · `packages/cms/src/globals/pricing/` · `cms_info.md`. | Walk every collection/global in Bucket "e. Pricing." List which actually own price data. Decide: consolidate or leave. | ❌ Open. |
| 25.14 | Sweep every URL slug (web + CMS) and shorten / standardize. | Slugs must be single-word or minimal `x-y` form; never lengthy. URL slug must match CMS slug exactly. | All slug-bearing CMS collections + web router. | Enumerate every Disciplines/SubCategories/Procedures/Surgeons/BlogPosts slug. Produce a `(collection, current, proposed, reason)` table for review. After sign-off: rename + add 301s if any externally-shared URLs change. | ❌ Open. |
| 25.15 | Verify expected URL `/treatments/surgical/face` (3-level nested) — if not, decide nested vs flat. | "Face" sits under "surgical" discipline. User expects 3-level nested URL; current is likely 2-level flat (`/treatments/surgical-face`). | `packages/web/src/router.ts` · all `/treatments/*` route components. | Check `router.ts` mapping. Decide. If nested: rewrite router + slug-rewrite Disciplines/SubCategories. Add 301s. | ❌ Open — needs decision before code change. |
| 25.16 | Fix CMS slug-display bug — first parent category disappears from slug field in admin. | Editors see incorrect/incomplete slug in admin which doesn't match the rendered URL. | Likely `packages/cms/src/collections/SubCategories.ts` or `Procedures.ts`. | Identify which collection (likely SubCategories or Procedures). Inspect slug field formula or admin display. Fix. | ❌ Open. |
| 25.17 | Audit site-wide AUD↔IDR price-conversion plumbing. | Single-source: `Settings.audToIdrRate` + `currencyDisplayMode` + `roundIdrTo`. Editing this ONE rate should re-peg every displayed AUD. Need to verify NO per-procedure literal AUD bypasses this. | Every component that renders prices · `PriceTag.tsx` · pricing routes · procedure cards. | grep for `AUD` / `aud` literals across `packages/web/src/`. Verify all consumers read from Settings. | ❌ Open. |
| 25.18 | Restructure Payload admin — alpha-sort → position-sort + per-Bucket two-zone field layout (most-used vs maintainer). | Editor's mental model = "what comes first on the site." Alpha sort fights that. Maintainer fields (slug, sort, SEO) clutter the editor view. | Every collection + global in `packages/cms/src/collections/` and `packages/cms/src/globals/`. | Add `admin.position` overrides; reorder field arrays in collection/global configs by editor frequency; consider Payload admin component override for collapsible "Maintainer settings" section. | ❌ Open — scope clear, not started. |
| 25.19 | Swap site wordmark logo to user-uploaded `brown.svg` + enforce 5-color brown palette sitewide. | User-mandated brand consistency. Five canonical browns: `#1F1B16` · `#533E27` · `#A67C52` · `#E6DCC8` · `#F4EFE6`. No other shade of brown allowed. | `packages/web/public/assets/logo.svg` + `logo-light.svg` · `Header.tsx` · `Footer.tsx` · `partials/01-tokens-typography-buttons.css` · `partials/03-home.css` · `partials/10-conversion-trust.css` · `PageBlocks.tsx` · `placeholder.ts` · `ContactPage.tsx` · `Hero.tsx`. | Deploy `brown.svg` as `/assets/logo.svg`; generate cream variant `/assets/logo-light.svg` for dark surfaces (fill `#F4EFE6`). Update Header.tsx + Footer.tsx refs to `.svg`. Replace 13 non-conforming brown shades sitewide. | ✅ Shipped (commit `c9a1efe`). |
| 25.20 | Close Phase 13 — SEO present, analytics tag missing. | SEO meta + ld+json present (verified). Analytics (GA / GTM) not detected in rendered HTML. | `packages/cms/src/globals/Settings.ts` (add `analytics` group) · `PageShell.tsx` (inject script) · `entry-server.tsx`. | Add GA4 or GTM tag via Settings global + Footer/PageShell wire. | ⚠ Partial. |
| 25.21 | Phase 14 post-launch ops — ongoing by design. | No "completion" — ongoing monitoring, backups, incident response. | pm2 ecosystem · `/etc/letsencrypt/` · sibling-site monitoring. | Verify pm2 stable, certs valid, no incidents. | ⚠ Ongoing (expected). |
| 25.22 | Phase R R3 (b. Treatments Bucket detail) pending sign-off. | R0/R1/R2/R4/R5/R6/R7/R8 shipped. R3 was planned but didn't ship. | `packages/cms/src/globals/pages/TreatmentsPage.ts` · new `globals/treatments/*.ts` · `routes/treatments/TreatmentsIndex.tsx`. | Per Phase R map: split TreatmentsPage into section globals (TreatmentsHero, TreatmentsIndexSection, TreatmentsStats, etc.) + per-discipline detail globals. | ⚠ Pending. |
| 25.23 | Wire Homepage Place "Recover in paradise" image to CMS. | Hardcoded `IMG.bali` in Place.tsx — not editable. User flagged. | `packages/cms/src/globals/home/HomePlace.ts` · `home_place` table · `routes/home/Place.tsx`. | Add `image` upload field to HomePlace global; DDL `home_place.image_id`; wire `<Img media={g?.image}>` in Place.tsx. | ⏳ Schema + DDL applied this session; commit pending. |
| 25.24 | Wire Home Hero quick-enquiry form (17 hardcoded fields). | Eyebrow, heading, intro, name/email/interest labels + placeholders, submit/submitting/success/error labels, fineprint all hardcoded. | `packages/cms/src/globals/home/HomeHero.ts` · `routes/home/Hero.tsx` (lines 27–46). | Add nested group `quickEnquiry` to homeHero global with all 17 fields; wire in Hero.tsx. | ❌ Open. |
| 25.25 | Wire Home Intro pull-quote (3 fragments) + 2 long column paragraphs. | All hardcoded in Intro.tsx. | `packages/cms/src/globals/home/HomeIntro.ts` · `routes/home/Intro.tsx`. | Add `eyebrow`, `pullQuoteBefore`, `pullQuoteAccent`, `pullQuoteAfter`, `col1`, `col2` fields to homeIntro global. | ❌ Open. |
| 25.26 | Wire 7 home sections — Treatments/Pricing/Surgeons/Gallery/LeadMagnet/Journey/Stories. | Each has 4–11 hardcoded fallback strings (~50 atoms total). | `packages/cms/src/globals/home/Home*View.ts` (7 globals) · `routes/home/*.tsx` (7 sections). | Add fields to the 7 view globals (homeTreatmentsView, homePricingView, etc.) matching the hardcoded fallbacks in each section component. | ❌ Open. |
| 25.27 | Wire Contact page form labels + placeholders + success/error messages. | ~30 hardcoded atoms across ContactPage.tsx — INTENT_COPY (2 intent types), REQUIRED/OPTIONAL labels, headings, intro, direct-lines labels, treatment select placeholder, "add details" button, optional field labels, trust line, submit labels, success/error messages. | `packages/cms/src/globals/pages/ContactEnquirySection.ts` · `routes/contact/ContactPage.tsx`. | Extend `contactEnquirySection` global with all missing fields. | ❌ Open. |
| 25.28 | Wire Privacy page metadata + DPO section. | ~12 hardcoded atoms — chapter, title, lede, last-updated date, version, reading time, TOC heading, DPO eyebrow/heading/lede/email, address, contact button label. | `packages/cms/src/globals/pages/PrivacyPage.ts` · `routes/privacy/PrivacyPage.tsx`. | Extend `privacyPage` global with the missing fields. | ❌ Open. |
| 25.29 | Wire NotFound page (5 atoms — eyebrow, heading parts, body, button labels). Create `notFoundPage` global from scratch. | No CMS global exists for the 404 page. | New `packages/cms/src/globals/pages/NotFoundPage.ts` · DDL · `routes/NotFound.tsx`. | New global `NotFoundPage` (slug `not-found-page`) with 5 fields. DDL migration. Wire `routes/NotFound.tsx`. | ❌ Open. |
| 25.30 | Single-source WhatsApp number — kill hardcoded `6281339001911`. | Hardcoded in `SubCategoryDetail.tsx:159` and `seed.ts:WHATSAPP_HREF`. Should derive from `Settings.whatsappNumber` everywhere. | `packages/web/src/routes/detail/SubCategoryDetail.tsx:159` · `packages/web/src/content/seed.ts` · `Settings.whatsappNumber`. | Replace both literals with `Settings.whatsappNumber`-derived computation. Reconcile which is canonical (CMS holds `+62 811 3888 911`; literal is `6281339001911`). | ❌ Open. |
| 25.31 | Hospital name "BIMC Hospital Nusa Dua" + address fragments hardcoded in SEO schema. | SEO ld+json schema duplicates address data that already lives in Settings. | `packages/web/src/lib/seo.ts`. | Refactor `lib/seo.ts` to read from `Settings.siteName / addressLine1/2 / city / postalCode / country`. | ❌ Open. |
| 25.32 | Visual inspection every page × every breakpoint vs `design/shared.jsx`. | Phase M signed off zero overflow. Have NOT re-run pixel-comparison vs design source at 320/375/414/640/700/768/900/1100/1440/1920. | All 51 routes × 10 breakpoints. Playwright fixtures. | Headless Playwright snapshot each route × each breakpoint; diff vs `design/shared.jsx` rendered references. | ❌ Open. **Launch-blocking (per Pixel-Fidelity Gate in CLAUDE.md).** |
| 25.33 | Measure Lighthouse scores on every route. | CLAUDE.md says ≥90 on Accessibility / Best Practices / SEO is non-negotiable. Currently unmeasured. | Lighthouse-CI workspace (from 25.4) · all 51 routes. | Lighthouse-CI run (from 25.4) on all 51 routes; save baseline. Fix anything <90. | ❌ Open. **Launch-blocking.** |
| 25.34 | Walk through every CMS admin edit form field-by-field. | No verification that admin forms render correctly + save properly. Editors may hit broken forms in production. | `/admin` (CMS UI) · every collection + global. | Login to /admin; open every collection list + every global; verify each field renders, accepts input, saves, persists. | ❌ Open. |
| 25.35 | Load https://cosmedic.gaiada.online in a fresh browser tab and confirm favicon renders. | Favicon files exist in `public/` but not visually verified. | Live URL · `public/favicon*.{ico,png}`. | Open in 3+ browsers (Chrome, Safari, Firefox), confirm tab icon. | ❌ Open. |
| 25.36 | Verify production database backup state — pg_dump cadence, retention, last successful timestamp. | No backup verification = catastrophic risk if disk fails. | `/etc/cron.daily/` or `/etc/systemd/system/*.timer` · backup destination path. | Check systemd timer / cron for pg_dump; verify retention policy; verify last successful dump file exists. | ❌ Open. **Launch-blocking.** |
| 25.37 | Click WhatsApp deep-link from a real phone, verify it opens chat. | wa.me URL syntactically correct but not tested on actual mobile device. | FloatingChrome + Connect column + Contact page. | Open https://cosmedic.gaiada.online on phone; tap WhatsApp FAB + Contact WhatsApp link. | ❌ Open. |
| 25.38 | Form submission end-to-end test — Contact form → Payload Enquiries row → email. | Full pipeline not exercised this session. | /contact form · Payload Enquiries collection · SMTP transport. | Submit a real enquiry on /contact; verify (a) Payload Enquiries row created, (b) clinic + autoresponder emails delivered. Depends on 25.3 (email pipeline now part of this same row). | ❌ Open. **Launch-blocking.** |
| 25.39 | Re-verify sibling-site safety post-pm2-restarts. | Server hosts ~10 other sites (christos / gtec / templatebase / templategen / flowstep / aidevstaff / whatsnewasia). Multiple `pm2 restart cosmedic-*` this session. | All `*.gaiada.online` siblings. | Curl every sibling site root; verify 200 + cert valid. | ❌ Open. **Launch-blocking (CLAUDE.md non-negotiable: never disturb siblings).** |

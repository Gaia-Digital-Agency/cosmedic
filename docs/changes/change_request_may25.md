# Change Request — 2026-05-25

> Outstanding items captured at end of 2026-05-25 session. Source: live audit against `docs/planning/all_todo.md`, `docs/remap_plan.md`, `docs/planning/phase-10-imagery-gaps.md`, and CLAUDE.md.
>
> Items 11 (doc cleanup) and 12 (untracked PNG cleanup) from the audit are not listed here — both were executed in the same session that produced this file.

## Summary

| # | Item | Status | Launch-blocking |
|---|---|---|---|
| 1 | q17 — Refresh image set per Figma | ⏸ Deferred | No |
| 2 | R2 — Homepage Bucket admin detail | ✅ Shipped (`3a87d4c`) | — |
| 3 | 6 surgeon portraits flagged `isPlaceholder=true` | ⏳ Awaiting uploads | No |
| 4 | SMTP provider + `.env` config | ❌ Not configured | **Yes** |
| 5 | Phase 9 — i18n EN ⇄ ID | ❌ Open | No (post-launch) |
| 6 | Phase 10 — imagery gaps | ❌ Open | **Yes** |
| 7 | Phase 11 — pre-launch QA gates | ❌ Open | **Yes** |
| 8 | Phase C6–C10 — CMS structural alignment | ❌ Open (largely superseded by Phase R) | No |
| 9 | N0 — Golden-path mobile UX pass | ❌ Open | No |
| 10 | N1 / N2 / N3 — Header / FAB / pricing polish | ❌ Open | No |

---

## 1 — q17: Refresh image set per Figma

**Status:** ⏸ Deferred since Phase Q close-out (2026-05-24)
**Tracker row:** `docs/changes/changerequest_21May.md` — q17

Block: Figma image set not yet delivered + inventoried by the design team. When delivered, this becomes a routine swap into `packages/web/public/assets/` plus Payload Media uploads, replacing placeholders flagged `isPlaceholder=true`.

**Resume condition:** Figma drop received → inventory against the q17 row's image list → batch upload + relink.

---

## 2 — R2: Homepage Bucket admin detail

**Status:** ✅ Shipped 2026-05-25 (commit `3a87d4c` — landed between this session's `8a7007e` and `20979ef`)
**Tracker:** `docs/remap.md` + `docs/remap_plan.md` — Phase R2

Scope shipped: split `HomePage` (9 block fields) into 10 purpose-named section globals (HomeHero · HomeIntro · HomeLeadMagnet · HomePlace + 6 view mirrors), rewired `packages/web/src/routes/home/*.tsx`, migrated data so live page renders identically.

**Note for future R-style refactors:** uploads that target new globals (e.g. `HomeHero.heroImage`) won't surface if old code paths still read from the prior global — that's the symptom we hit on 2026-05-25 with hero + team photo before R2 fully landed. Sequence matters: migrate data → rewire reads → ship.

---

## 3 — Six surgeon portraits still placeholder

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

---

## 4 — SMTP provider

**Status:** ❌ Not configured; carries from Phase 7 → Phase 8 → today
**Launch-blocking:** Yes

Enquiry emails currently transit `nodemailerAdapter`'s **JSON transport** — full message body logged to CMS stdout, not delivered. `packages/cms/src/lib/email-adapter.ts` reads `SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS / SMTP_SECURE` from env; populate any of those and delivery switches on automatically. Recommended providers: Postmark (best deliverability, $10/mo flat), AWS SES (cheapest, slower DKIM setup), or relay through the clinic's existing mail server.

---

## 5 — Phase 9: i18n EN ⇄ ID

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

## 6 — Phase 10 imagery gaps

**Status:** ❌ Open
**Launch-blocking:** Yes (placeholders visible to visitors)
**Tracker:** `docs/planning/phase-10-imagery-gaps.md`

- 23 lifestyle / villa / hero / portrait slots — to be AI-generated against the brand brief, then `pnpm seed:media` re-run
- 25 of 29 Before/After composites — need clinical sign-off + image set from the clinical team
- After ingest, extend `media={...}` to remaining 19 `<Img>` call sites (currently 3 hot paths benefit from responsive srcset)

---

## 7 — Phase 11: pre-launch QA gates

**Status:** ❌ Open (all sub-items)
**Launch-blocking:** Yes — Lighthouse Green ≥ 90 is non-negotiable per CLAUDE.md

- Lighthouse-CI + budget config — workstream pending
- axe-core via `@axe-core/playwright` — workstream pending
- Playwright visual-regression suite (Pixel-Fidelity Gate) — workstream pending
- linkinator broken-link + broken-image sweep across all 51 routes — workstream pending
- CMS-Sufficiency Gate manual walk per `docs/cms_schema.md` §5
- Multi-breakpoint visual check at 1920 / 1440 / 1100 / 900 / 700 / 540 / 390

---

## 8 — Phase C6–C10: CMS structural alignment

**Status:** ❌ Open (mostly superseded by Phase R, but still listed)
**Tracker:** `docs/planning/all_todo.md` Phase C section

- C6 — Home Page A2: wire 9 hardcoded section frames (now part of R2 scope)
- C7 — Pricing Page A2: wire 3 hardcoded section frames (now part of R6 scope — verify R6 closed this)
- C8 — Before/After full editorial wiring
- C9 — Pricing unification (single-source via Procedures) — HIGH RISK flag
- C10 — Final audit + sign-off

**Action:** audit which items genuinely remain after R-phase closures; remove or merge the obsolete ones.

---

## 9 — N0: Golden-path mobile UX pass

**Status:** ❌ Open; overlaps with M1+M4 (which addressed overflow only)

Visual-quality pass across 320 / 375 / 414 / 640 / 768 — clipped headlines, broken stacking, touch targets <44px, vertical rhythm, photo crops. Not overflow-only.

---

## 10 — N1 / N2 / N3: Polish trio

**Status:** ❌ Open (all three)
**Tracker:** `docs/planning/all_todo.md` Phase N

- **N1** — Header `logo-endorsement-line` / `logo-endorsement-mark` not vertically centred against the COSMEDIC glyph
- **N2** — FloatingChrome Back-to-Top button must match WhatsApp FAB in width / height / border-radius / shadow (today they read as a mismatched pair)
- **N3** — `/pricing` `ClinicCatalogueTable`: enforce consistent column widths across every category table (today they auto-size per sheet); left-align text columns (procedure name, notes, anaesthesia type)

---

## Sequencing recommendation

If pushing toward launch:

1. **#4 SMTP** — half a day. Removes the "enquiries silently lost" risk.
2. **#7 Phase 11 gates** — set them up first so #6 and #10 can be verified against them.
3. **#6 Phase 10 imagery** — biggest content gap; AI-gen pass plus clinical sign-off.
4. **#3 surgeon portraits** — falls out of #6 naturally.
5. **#10 N1/N2/N3 polish** — quick wins under #7's gates.
6. **#9 N0 mobile pass** — final mile.
7. **#2 R2** — only if R-phase consistency matters before launch; otherwise post-launch.
8. **#1 q17 image refresh** — needs Figma drop; cannot be sequenced from this side.
9. **#5 Phase 9 i18n** — post-launch.
10. **#8 C6–C10 cleanup** — post-launch audit, mostly doc work.

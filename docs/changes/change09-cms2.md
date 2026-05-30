# change09 — CMS Simplification Pass 2
**Status:** PLANNING · **Date:** 2026-05-29 · **Working from:** `docs/cms/cms_map_simple.md`
**Goal:** Fewer sidebar items, fewer visible fields. No front-end change. No data loss.

---

## Risk legend
- 🟢 `admin.hidden` only — safe, reversible, no migration
- 🟡 Global merge — remove one global, add its fields to another; requires seed update
- 🔴 Field merge — rename/combine fields in schema; requires DB migration + frontend update

---

## Change A — Merge Main + Hero → Hero (all pages)
**Risk:** 🟡 Global merge

Every page pair currently has:
- `X Page` global: slug, route, title, sections, publishStatus, seo.*
- `X Hero` global: chapter, title.a/b, lede, heroImage, breadcrumbLabel

**Plan:** Delete `X Page` global. Move its fields (title, publishStatus, seo.*) into `X Hero`. Rename combined item to just `Hero`.

**Affected globals (one merge each):**
| Remove | Absorb into |
|---|---|
| Home Page | Home Hero |
| Treatments Page | Treatments Hero |
| Surgeons Page | Surgeons Hero |
| Results Page | Results Hero |
| Gallery Page | Results Hero (Gallery section) |
| Stories Page | Results Hero (Stories section) |
| Pricing Page | Pricing Hero |
| Journey Page | Journey Hero |
| Contact Page | Contact Hero |
| Video Consult Page | Contact Hero (Video section) |
| Blog Page | (see Change F — collapse into Blog Posts) |
| Privacy Page | (see Change F — collapse into Privacy Sections) |

**Saves:** ~12 sidebar items removed.

---

## Change B — titleA + titleB → title (single field)
**Risk:** 🔴 Field merge — DB migration required

Two naming conventions exist in code:
- Flat fields: `titleA`, `titleB` — in `TreatmentsHero.ts`, `PricingHero.ts`
- Group sub-fields: `title.a`, `title.b` — in all other Hero globals

Both represent a two-line hero heading split for typographic design (e.g. roman + italic).

**Plan:** Replace both with a single `title` textarea. Rendering code splits on newline `\n` — first line = roman, second = italic. One migration to concatenate existing values.

**Affected fields:** All Hero globals (8 items post-Change A).

**Also apply to heading.a / heading.b:** The homepage "X View" sections use `heading.a` / `heading.b` the same way. Merge those too.

---

## Change C — Hide: Journey Stats, Journey Steps, Recovery Stays chrome
**Risk:** 🟢 `admin.hidden` only

The following are UI chrome or data unlikely to be edited by an average editor:

| Bucket | Item | Action |
|---|---|---|
| Journey | Journey Stats | Hide entire item |
| Journey | Journey Steps | Hide entire item |
| Journey | Recovery Stays Page — `portfolioSection.headingPre` | Hide field |
| Journey | Recovery Stays Page — `inclusionsSection.headingPre` | Hide field |
| Journey | Recovery Stays Page — `inclusions.title` | Hide field |
| Journey | Recovery Stays Page — `inclusions.body` | Hide field |

**Server doc action:** Move hidden items/fields from `cms_map_simple.md` into `cms_optional.md`.
> Note: current `cms_optional.md` is a conflict list (fields rendered on-site but hidden from editors). Will add a new section: **"Hidden by simplification — accessible to admin role only."**

---

## Change D — Collapse Journey Hero + Journey Page
Covered by Change A (Journey Page merges into Journey Hero). After Change A + C, Journey bucket becomes:

| Item | Visible |
|---|---|
| Journey Hero | title, heroImage |
| Recovery Stays Page | hero.title, hero.heroImage |
| Recovery Stays | name, location, body, heroImage, price, amenities, partnerUrl |

3 items (down from 6).

---

## Change E — Collapse paired page+collection items
**Risk:** 🟡 (some 🔴 if embedding collections)

### E1 — Recovery Stays Page + Recovery Stays
Keep both but rename clearly and place adjacent. Cannot truly merge global + collection in Payload UI natively.
- Rename: `Recovery Stays Page` → `Recovery Stays — Page`
- Rename: `Recovery Stays` (collection) → `Recovery Stays — Villas`
- Visible together as a group in Journey bucket.

### E2 — Contact Page + Contact Hero (+ Video Consult)
After Change A, Contact Hero absorbs Contact Page fields. Video Consult Page merges into Contact Hero as a tabbed section or second global `Contact Hero — Video`.
- **Result:** 2 items instead of 3.

---

## Change F — Collapse About items
**Risk:** 🟡–🔴

### F1 — Blog Page + Blog Posts + Blog Tags → "Blog"
- Blog Page global: merge into a CMS config tab on Blog Posts collection (admin description only — no data)
- Blog Tags: hide from sidebar (`admin.hidden`); tags are edited inline on Blog Posts
- **Result:** 1 item visible (`Blog Posts`) instead of 3

### F2 — Privacy Page + Privacy Sections → "Privacy"
- Privacy Sections is a collection of legal paragraphs. **Option A:** embed as a `blocks` array inside the Privacy Page global (🔴 migration). **Option B:** hide Privacy Page global sidebar entry; editors access content only through Privacy Sections collection (🟢).
- **Recommended:** Option B (no migration). Privacy Page → hidden. Privacy Sections → renamed "Privacy".
- **Result:** 1 item instead of 2.

---

## Change G — Analyse and reduce Homepage (18 → ~8 items)
**Risk:** 🟢–🟡

Current 20 items. After Change A (Home Page merges into Home Hero):

| Keep visible | Rationale |
|---|---|
| Home Hero | Primary editorial content |
| Settings | Clinic identity — phone, email, address, hours |
| Header | Logo swap |
| Footer | Brand tagline, address block |
| Home Lead Magnet | Form copy changes seasonally |
| Home Place | Image + body change |
| Press Mentions (collection) | Editors add/remove mentions |
| Awards (collection) | Editors add/remove awards |

| Hide | Rationale |
|---|---|
| Home Intro | Pull-quote fragments — brand-authored, rarely changed |
| Home Treatments View | UI chrome — heading only, rarely changed |
| Home Surgeons View | UI chrome — group photo + caption |
| Home Gallery View | UI chrome |
| Home Stories View | UI chrome |
| Home Pricing View | UI chrome |
| Home Journey View | UI chrome |
| Brand Stats | Rarely changed; can unlock for admin |
| Floating Chrome | CTA pill label — rarely changed |

**Result:** 20 → 8 visible items. Saves 12 items (all 🟢 `admin.hidden`).

---

## Change H — Reduce Treatments (18 → ~8 items)
**Risk:** 🟢

| Keep visible | |
|---|---|
| Treatments Hero | Post Change A |
| Treatments Index | heading |
| Disciplines (collection) | Editorial — titles, body, images, FAQs |
| Sub Categories (collection) | Editorial — titles, overview, images, FAQs |
| Procedures (collection) | Editorial — names, prices, details |
| Pricing Hero | Post Change A |
| Pricing Overview | body text |
| Consultation Policy | feeIdr — changes annually |

| Hide | Rationale |
|---|---|
| Treatments Stats | UI chrome |
| Pricing Footnote | Rarely changed small print |
| Pricing Insurance | Rarely changed |
| Pricing Payment | Rarely changed |
| Pricing Catalogue View | Pure UI chrome |

**Result:** 18 → 8 visible items. 5 hidden (all 🟢).

---

## Change I — Reduce Experts/Doctors (7 → 2 items)
**Risk:** 🟢

| Keep | |
|---|---|
| Surgeons Hero | Post Change A (page + hero merged) |
| Surgeons (collection) | Editorial — bio, portrait, specAreas |

| Hide | Rationale |
|---|---|
| Surgeons Lead View | UI chrome label only |
| Surgeons Plastic View | UI chrome — heading only |
| Surgeons Aesthetic View | UI chrome — heading only |

**Result:** 7 → 2 visible items. All 🟢.

---

## Change J — Reduce Results (10 → 5 items)
**Risk:** 🟢

| Keep | |
|---|---|
| Results Hero | Post Change A |
| Library CTA | Editors update the "View full gallery" CTA |
| Share CTA | Editors update the "Share your story" CTA |
| Before/After Cases (collection) | Editorial |
| Patient Stories (collection) | Editorial |

| Hide | Rationale |
|---|---|
| Gallery Page | title only — absorbed into Results Hero |
| Stories Page | title only — absorbed into Results Hero |
| Featured Cases View | UI chrome |
| Stories View | UI chrome |

**Result:** 10 → 5 visible items. All 🟢.

---

## Summary — Item count before / after

| Bucket | Before | After | Saved |
|---|:---:|:---:|:---:|
| Homepage | 20 | 8 | −12 |
| Treatments | 18 | 8 | −10 |
| Experts | 7 | 2 | −5 |
| Results | 10 | 5 | −5 |
| Journey | 6 | 3 | −3 |
| Contact | 9 | 4 | −5 |
| About | 9 | 4 | −5 |
| Media Library | 1 | 0 | −1 (hide) |
| Users | 1 | 1 | — |
| **Total** | **81** | **35** | **−46** |

---

## Execution order (by risk, lowest first)

| # | Change | Risk | Prerequisites |
|---|---|---|---|
| 09.1 | G, H, I, J — hide UI chrome items across all buckets | 🟢 | None |
| 09.2 | C — hide Journey Stats, Steps, Recovery chrome fields | 🟢 | None |
| 09.3 | F2 — Privacy Page hide; Privacy Sections rename | 🟢 | None |
| 09.4 | F1 — Blog Tags hide; Blog Page hide | 🟢 | None |
| 09.5 | A — Main + Hero merge (global-by-global) | 🟡 | 09.1 done |
| 09.6 | E1 — Recovery Stays rename pairs | 🟡 | 09.5 done |
| 09.7 | B — titleA/titleB → title (field merge + migration) | 🔴 | 09.5 done |

---

## Todo

- [ ] 09.1 Apply `admin.hidden: true` to all UI chrome globals (Changes G, H, I, J)
- [ ] 09.2 Apply `admin.hidden` to Journey Stats, Journey Steps, Recovery chrome fields (Change C)
- [ ] 09.3 Hide Privacy Page sidebar; rename Privacy Sections → "Privacy" (Change F2)
- [ ] 09.4 Hide Blog Tags + Blog Page from sidebar (Change F1)
- [ ] 09.5 Merge each `X Page` global into `X Hero` — one at a time (Change A)
- [ ] 09.6 Rename Recovery Stays pairs for clarity (Change E1)
- [ ] 09.7 Migrate titleA/titleB → title field (Change B) — confirm with user before executing
- [ ] Update `cms_map_simple.md` → `cms_visible.md` after each step
- [ ] Move hidden items into `cms_optional.md` new section after each step
- [ ] Smoke-test: `curl` 52 routes + check PM2 logs after each step

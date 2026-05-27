# CMS Custom Change — How to Mirror a CMS Admin to the Site

> A reusable playbook for restructuring a Payload (or any block-based) CMS so its admin sidebar mirrors the site's information architecture one-to-one. Distilled from the BIMC CosMedic restructure on 2026-05-22 / 23. Apply this on future projects when the CMS feels "by data type" instead of "by what's on the page."

---

## Core principle

**The site is the source of truth. The CMS admin mirrors the site, not the other way around.**

When an editor opens the CMS to fix something on a page, they should find every editable thing for that page in one bucket — without having to know which Payload data type (Collection vs Global) holds it, and without cross-bucket navigation.

This is the inverse of the developer mindset (group by schema type). Developers default to "all Pages here, all Globals there, all Surgeons together." Editors think "I want to edit the homepage / the pricing page / the contact page." Build the admin for the editor, not the developer.

**The site will change.** Pages get added, sections get re-ordered, sub-sites get merged, copy moves between hero and body. When that happens, the CMS bucket structure follows. It's never "the CMS schema is locked, change the site to fit it" — always "the site changed, re-run the mapping below and adjust admin.group + bucket contents to match." The CMS structure is a derived artefact, not a source of truth.

---

## The 7-step process

### Step 1 — Map the site IA

List every top-level site section the user navigates to. Typically these become the admin buckets. Common ones:

```
HOMEPAGE · TREATMENTS · DOCTORS · RESULTS · PRICING · JOURNEY · CONTACT · MEDIA
```

Constraints:
- Buckets should be 7–10. Fewer is too coarse; more is clutter.
- Buckets should match the top-level nav of the site, not a sub-navigation.
- If two site sections share editorial intent (e.g. patient stories + blog posts are both "narrative content"), the user may want them in the same bucket. Ask, don't decide.

### Step 2 — Map every page-section to a CMS item

For each route in the site, identify its visible sections top → bottom (Hero, then each section in render order). For each section, identify the CMS source:
- a Global field (e.g. `Pricing Page.hero` ⇒ Hero section)
- a Collection record set (e.g. `Price List Items` ⇒ Catalogue table)
- a Global block (e.g. `Home Page.sections[]` ⇒ extra editorial content)
- **hardcoded** — section has no CMS source today (these are the "Rule 2 gap" — see Step 6)

Document this mapping per bucket in a structure diagram:

```
PRICING                          (mirror /pricing top→bottom)
  COLLECTIONS
    Catalogue              →  Price List Items
  GLOBALS
    Hero                   →  Pricing Page
    Callout                →  Consultation Policy
  Hardcoded (no CMS source)
    Overview
    Footnote
    Insurance + Payment
```

### Step 3 — Pick one of three cross-bucket policies

When a CMS item is owned by one bucket but rendered on another bucket's page (e.g. `Surgeons` lives in DOCTORS but appears on / as a strip), you have to choose how to display the relationship in the admin docs:

| Option | What it does | Pick when |
|---|---|---|
| **A — Owner-only** | List the item only in its owner bucket. Other buckets that render it have no entry. | Editors mostly stick to one bucket per edit session. |
| **B — Owner + "used on" labels** | Owner bucket lists every page the item appears on. Other buckets show nothing. | Editors want to know reach without cluttering other buckets. |
| **C — Owner + reference pointers** | Owner bucket holds the editable record. Other buckets show a pointer row ("edit under X"). | Editors are likely to open the page-bucket first and need a wayfinding hint. |

Default: **A** unless cross-bucket reach is high and editors complain.

### Step 4 — Avoid in-bucket duplication

If a single CMS item powers multiple page sections inside one bucket, list it ONCE with a note about the multiple sections — not multiple rows pointing at the same record.

Bad (4 rows, same Surgeons collection):
```
DOCTORS
  COLLECTIONS
    Lead Plastic Surgeon   →  Surgeons
    Plastic Surgery        →  Surgeons
    Aesthetic Medicine     →  Surgeons
    Doctor detail pages    →  Surgeons
```

Good (1 row, sections noted):
```
DOCTORS
  COLLECTIONS
    Surgeons             (renders 4 sections on /surgeons + 5 sections on /surgeon-<slug>)
```

### Step 5 — Add a layman explainer for Collections vs Globals

Payload (and most block CMSes) has two top-level data types editors don't know:
- **Collection** = many rows of the same shape
- **Global** = singleton

Editors hear "Collection" and "Global" and freeze. Put a small explainer at the top of the admin sidebar via `admin.components.beforeNavLinks`:

```
Collections  →  many of the same thing
                (e.g. 8 Doctors, 149 Pricing rows)
Globals      →  one-of-a-kind
                (e.g. Header, Home page hero)
```

One block. Renders above every admin page. Cost: ~30 LOC custom component.

### Step 6 — Wire hardcoded sections to CMS (Rule 2 gap)

Any page section flagged "hardcoded" in Step 2 is an **editor's wall** — they see something on the live site that they can't change in the CMS. Two ways to wire:

| Approach | What it does | Cost |
|---|---|---|
| **A1 — Page Global `sections[]` blocks** | Use the existing block system (Rich Text, Image Grid, CTA Band, etc.) on the corresponding Page Global. Editor adds blocks to replace the hardcoded copy. | Smallest. Less precise. |
| **A2 — Dedicated fields per section** | Add named fields (`introBlock`, `leadMagnet`, etc.) to the Page Global. Editor sees a field labelled exactly like the site section. | Medium. More precise. |

Default: **A1** for one-off sections. **A2** when the section has a fixed shape (e.g. always heading + image + 3 bullets) that editors can't break.

After wiring, update the route component to read from the new CMS source instead of the hardcoded text. **Rule 3 (visual invariance) gate:** seed the CMS with the exact existing copy first, then switch — render output must be byte-identical pre vs post.

### Step 7 — Pick the order WITHIN each bucket

Mirror site flow. Hero first, then every section in render order. Don't sort alphabetically (Payload's default). Two ways:

| Approach | Cost |
|---|---|
| **By data type** | Show `Collections` sub-list, then `Globals` sub-list. Within each, list in site-flow order with a section label per item. **Default — matches Payload sidebar's two-section default.** |
| **By pure site flow** | Mix Collections and Globals in one list, ordered top→bottom. Tag each row inline as Global or Collection. Cleaner mental model but breaks Payload's natural data-type grouping. |

Default: the first one. It matches Payload's default sidebar layout while still being site-mirror-ordered within each sub-list.

---

## Working rules for the planning conversation

These are the human-process rules to follow when restructuring the CMS with a stakeholder. They surfaced from real friction in the 2026-05-23 session.

1. **Don't make structural decisions yourself.** Propose options with trade-offs. The stakeholder picks.
2. **Don't filter or omit items.** When asked to show the structure, show every item that exists — including ungrouped admin items (Users), orphan collections, and currently-hardcoded sections. Editorial discretion is the stakeholder's, not yours.
3. **Don't change the shape of a previously-shown diagram.** If you displayed Collections / Globals as two sections last time, keep that shape every time you show it again. Changing the format silently between renders is the #1 source of friction.
4. **Lock items as the stakeholder confirms them.** Once a bucket is locked, do not modify it without explicit re-approval. Even global rule changes (like "switch to Option A") should be re-confirmed against locked items.
5. **Distinguish "what's on the site" from "what's in code" from "what's in docs."** Three different sources of truth. Keep them distinct in conversation.
6. **Sub-decisions are decisions.** If you pick option A1 vs A2 without asking, you've made a structural choice. Ask.

---

## Output artefacts

After running this playbook, the repo should produce:

1. **One restructure commit** — `admin.group` strings reset across every collection + global to match the site IA buckets.
2. **One migration commit** (if the project moves Pages-as-collection to per-page Globals) — new Payload Global per route + a data migration script.
3. **One wiring commit** — hardcoded section components updated to read from CMS sources, Rule 3 byte-identical render verified.
4. **One admin component commit** — sidebar explainer (Collections vs Globals).
5. **One docs commit** — `cms_schema.md` updated to reflect the new bucket structure with section labels per item.

---

## Verification gates (Rule 7 — verify before user tests)

Before telling the editor / stakeholder "look at the admin":

- [ ] `/admin` sidebar matches the locked structure diagram (screenshot it).
- [ ] Every CMS item is in exactly one bucket — no duplicates.
- [ ] Every page section on the live site has a CMS source — no orphan editorials. (`grep -r "<section" packages/web/src/routes` and trace each to a CMS field.)
- [ ] All routes render 200 and look byte-identical to pre-restructure. (curl + visual diff of homepage.)
- [ ] The admin sidebar explainer renders above the nav.
- [ ] Editor can edit every visible section in the admin (Rule 2).

---

## Related (within BIMC CosMedic)

- [cms_schema.md](cms_schema.md) — current bucket structure with section labels.
- [all_todo.md](all_todo.md) — outstanding work to fully apply this playbook.
- [CLAUDE.md](../CLAUDE.md) — project guide with the 2026-05-22 restructure notes.

## Provenance

Distilled 2026-05-23 from the multi-turn restructure of the BIMC CosMedic CMS. The friction points that produced the working rules above are recorded in the session transcript and `feedback_only_do_as_told.md` in agent memory.

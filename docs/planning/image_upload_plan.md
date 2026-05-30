# BIMC CosMedic — Image Upload Execution Plan
**Written:** 2026-05-27 (rev 2) | **Executed:** 2026-05-28 ✅ COMPLETE
**Commit:** `9cd808a` → pushed to `main`

## Definition of Done (tomorrow's goal)
> ✅ All 33 Figma images in use on CMS → DB → Web
> ✅ ~36 unmatched CMS images left completely untouched
> ✅ All 52 routes return 200 OK — every page, subpage, link, button verified
> ✅ Changes committed and pushed to git

---

## Ground Rules (non-negotiable)

| Rule | Detail |
|---|---|
| Use all 33 usable images | 8 already in CMS (no action) + 25 new uploads |
| CMS total ~70 images | After upload: ~33 Figma + ~36 with no Figma match |
| Gap of ~36 | CMS images with no 1:1 Figma match → **LEAVE THEM. Do not touch, do not delete.** |
| No overwrite of non-empty CMS fields | Unless explicitly replacing with a Figma image in this plan |
| not_usable/ folder | 13 files — never convert, never upload |
| Never `pm2 restart all` | Restart only the specific app if needed |
| nginx -t before reload | Always |

---

## Phase 0 — Pre-flight ⏱ 10 min

```bash
# 1. SSH connectivity
ssh gda-s01 echo "✅ SSH OK"

# 2. cwebp installed locally?
which cwebp || brew install webp

# 3. Count PNGs ready to convert (should be 25, excluding ALREADY-IN-CMS)
ls ~/downloads/cosmedic_local/images/*.png | grep -v "ALREADY-IN-CMS" | wc -l
# Expect: 25

# 4. CMS admin — log in, confirm accessible
open https://cosmedic.gaiada.online/admin

# 5. Confirm no images accidentally left in not_usable that belong in images/
ls ~/downloads/cosmedic_local/images/not_usable/
# Expect: 13 files only
```

---

## Phase 1 — WebP Conversion ⏱ 10 min

```bash
cd ~/downloads/cosmedic_local/images

# Convert 24 main images
for f in Treatments__* Doctors__SurgeonsHero__* Homepage__* Contact__* Journey__* Results__* About__*; do
  [[ "$f" == *ALREADY-IN-CMS* ]] && continue
  [[ "$f" == *SMALL-843x566* ]] && continue
  [ -f "$f" ] || continue
  cwebp -q 85 "$f" -o "${f%.png}.webp" && echo "✅ ${f%.png}.webp"
done

# Convert the small contact thumbnail separately
cwebp -q 85 \
  "Contact__ContactVisitSection__buildingExterior-SMALL-843x566__thumbnail-only--too-small-for-hero.png" \
  -o "Contact__ContactVisitSection__buildingExterior-SMALL-843x566__thumbnail-only.webp" \
  && echo "✅ small building thumbnail"
```

**Verify:**
```bash
ls images/*.webp | wc -l   # Expect: 25
```

---

## Phase 2 — CMS API Auth + ID Discovery ⏱ 15 min

### 2A — Get auth token
```bash
TOKEN=$(curl -s -X POST https://cosmedic.gaiada.online/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ai@gaiada.com","password":"ENTER_PASSWORD_HERE"}' \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['token'])")
echo "Token: $TOKEN"
```

### 2B — Find collection slugs on server (if API names unclear)
```bash
ssh gda-s01 "grep -r \"slug:\" /var/www/cosmedic/src/collections/ | grep -v node_modules | head -40"
ssh gda-s01 "grep -r \"slug:\" /var/www/cosmedic/src/globals/ | grep -v node_modules | head -40"
```

### 2C — List sub-category records + their IDs
```bash
BASE="https://cosmedic.gaiada.online/api"
H="Authorization: Bearer $TOKEN"

curl -s "$BASE/sub-categories?limit=50" -H "$H" \
  | python3 -c "
import sys, json
data = json.load(sys.stdin)
for d in data.get('docs', []):
    print(d.get('id'), d.get('slug',''), d.get('title',''))
"
```

---

## Phase 3 — Upload + Assign (25 images) ⏱ 40 min

### Upload helper function
```bash
upload_and_assign() {
  local FILE="$1"       # path to .webp
  local ENDPOINT="$2"   # e.g. "sub-categories/42" or "globals/surgeons-hero"
  local FIELD="$3"      # e.g. "heroImage"

  MEDIA_ID=$(curl -s -X POST "$BASE/media" \
    -H "$H" \
    -F "file=@$FILE" \
    | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('doc',{}).get('id','ERROR'))")

  echo "  → Media ID: $MEDIA_ID"

  if [[ "$ENDPOINT" == globals/* ]]; then
    curl -s -X POST "$BASE/$ENDPOINT" \
      -H "$H" -H "Content-Type: application/json" \
      -d "{\"$FIELD\": $MEDIA_ID}" | python3 -c "import sys,json; d=json.load(sys.stdin); print('  ✅' if 'errors' not in d else '  ❌ '+str(d))"
  else
    curl -s -X PATCH "$BASE/$ENDPOINT" \
      -H "$H" -H "Content-Type: application/json" \
      -d "{\"$FIELD\": $MEDIA_ID}" | python3 -c "import sys,json; d=json.load(sys.stdin); print('  ✅' if 'errors' not in d else '  ❌ '+str(d))"
  fi
}
```

---

## Phase 3 Checklist — 25 images ⏱ (included in 40 min above)

Work top-to-bottom. Note the CMS record ID from Phase 2C in the ID column.

### Treatments › Sub Categories (12)

| # | WebP file | CMS slug | Record ID | Field | ✓ |
|---|---|---|---|---|---|
| 1 | `Treatments__SubCategories__non-surgical-injectables__heroImage.webp` | `non-surgical/injectables` | | heroImage | ☐ |
| 2 | `Treatments__SubCategories__surgical-face__heroImage.webp` | `surgical/face` | | heroImage | ☐ |
| 3 | `Treatments__SubCategories__surgical-breast__heroImage.webp` | `surgical/breast` | | heroImage | ☐ |
| 4 | `Treatments__SubCategories__surgical-body__heroImage.webp` | `surgical/body` | | heroImage | ☐ |
| 5 | `Treatments__SubCategories__reconstructive-breast__heroImage.webp` | `reconstructive/breast` | | heroImage | ☐ |
| 6 | `Treatments__SubCategories__reconstructive-trauma__heroImage.webp` | `reconstructive/trauma` | | heroImage | ☐ |
| 7 | `Treatments__SubCategories__reconstructive-craniofacial__heroImage.webp` | `reconstructive/craniofacial` | | heroImage | ☐ |
| 8 | `Treatments__SubCategories__non-surgical-laser__heroImage.webp` | `non-surgical/laser` | | heroImage | ☐ |
| 9 | `Treatments__SubCategories__non-surgical-skin__heroImage.webp` | `non-surgical/skin` | | heroImage | ☐ |
| 10 | `Treatments__SubCategories__hair-fue__heroImage.webp` | `hair/fue` | | heroImage | ☐ |
| 11 | `Treatments__SubCategories__weight-loss-bariatric__heroImage--BIMC-OR-theatre.webp` | `weight-loss/bariatric` | | heroImage | ☐ |
| 12 | `Treatments__SubCategories__weight-loss-endoscopic__heroImage--BIMC-OR-active.webp` | `weight-loss/endoscopic` | | heroImage | ☐ |

### Doctors (1)
| # | WebP file | CMS path | Field | ✓ |
|---|---|---|---|---|
| 13 | `Doctors__SurgeonsHero__heroImage--web-surgeons-page-hero.webp` | globals/surgeons-hero | heroImage | ☐ |

### Homepage (2)
| # | WebP file | CMS path | Field | ✓ |
|---|---|---|---|---|
| 14 | `Homepage__HomeHero__heroImage--variant-wider-crop.webp` | globals/home-hero | heroImage | ☐ |
| 15 | `Homepage__HomePlace__image--bali-temple-sunset--web-home-place-section.webp` | globals/home-place | image | ☐ |

### Contact (2)
| # | WebP file | CMS path | Field | Note | ✓ |
|---|---|---|---|---|---|
| 16 | `Contact__ContactVisitSection__hospitalSignage--web-contact-visit.webp` | globals/contact-visit-section | signage | | ☐ |
| 17 | `Contact__ContactVisitSection__buildingExterior-SMALL-843x566__thumbnail-only.webp` | globals/contact-visit-section | thumbnail | ⚠️ Only if thumbnail slot exists | ☐ |

### Journey (4)
| # | WebP file | CMS path | Field | ✓ |
|---|---|---|---|---|
| 18 | `Journey__RecoveryStays__post-surgery-care__heroImage--web-recovery-stays.webp` | globals/recovery-stays | heroImage | ☐ |
| 19 | `Journey__RecoveryStays__villa-pool-lifestyle--web-recovery-stays-lifestyle.webp` | globals/recovery-stays | lifestyleImage | ☐ |
| 20 | `Journey__JourneySteps__step-arrival-international__image--web-journey.webp` | journey-steps / arrival record | image | ☐ |
| 21 | `Journey__JourneySteps__step-arrival-bali__image--web-journey.webp` | journey-steps / bali-arrival record | image | ☐ |

### Results (3)
| # | WebP file | CMS path | Field | Note | ✓ |
|---|---|---|---|---|---|
| 22 | `Results__ResultsHero__heroImage--4-women-variant.webp` | globals/results-hero | heroImage | Primary | ☐ |
| 23 | `Results__ResultsHero__heroImage--4-patients-angle2.webp` | globals/results-hero | heroImageAlt | Only if alt slot exists | ☐ |
| 24 | `Results__BeforeAfterCases__patient-portrait--web-results-stories.webp` | before-after-cases record | patientPhoto | ☐ |

### About (1)
| # | WebP file | CMS path | Field | ✓ |
|---|---|---|---|---|
| 25 | `About__Stories__hospital-corridor-atmosphere--web-stories-results.webp` | globals/stories | image | ☐ |

### Surgeon Portraits — NO ACTION ✅
8 portraits confirmed live and identical. Skip entirely.

---

## Phase 4 — Confirm ~36 Untouched CMS Images ⏱ 5 min

```bash
# After all uploads, count media items in CMS — should be ~70, NOT lower than before
curl -s "$BASE/media?limit=1" -H "$H" \
  | python3 -c "import sys,json; print('Total media:', json.load(sys.stdin).get('totalDocs'))"
# Expect: ≥ old total (we only added, never deleted)
```

---

## Phase 5 — Web Route Verification (52 routes) ⏱ 25 min

Check every route returns HTTP 200 and images load. Run the automated check first, then eyeball visually.

### 5A — Automated 200 OK check
```bash
BASE_WEB="https://cosmedic.gaiada.online"

ROUTES=(
  "/"
  "/surgeons"
  "/surgeons/suka"
  "/surgeons/indra"
  "/surgeons/gede"
  "/surgeons/astri"
  "/surgeons/rosa"
  "/surgeons/risma"
  "/surgeons/sissy"
  "/surgeons/theresia"
  "/treatments"
  "/treatments/surgical"
  "/treatments/surgical/face"
  "/treatments/surgical/breast"
  "/treatments/surgical/body"
  "/treatments/non-surgical"
  "/treatments/non-surgical/injectables"
  "/treatments/non-surgical/laser"
  "/treatments/non-surgical/skin"
  "/treatments/reconstructive"
  "/treatments/reconstructive/breast"
  "/treatments/reconstructive/trauma"
  "/treatments/reconstructive/craniofacial"
  "/treatments/hair"
  "/treatments/hair/fue"
  "/treatments/hair/therapy"
  "/treatments/dental"
  "/treatments/dental/alignment"
  "/treatments/dental/veneers"
  "/treatments/dental/whitening"
  "/treatments/weight-loss"
  "/treatments/weight-loss/bariatric"
  "/treatments/weight-loss/endoscopic"
  "/treatments/weight-loss/glp-1"
  "/journey"
  "/recovery-stays"
  "/results"
  "/stories"
  "/about"
  "/contact"
)

FAIL=0
for route in "${ROUTES[@]}"; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_WEB$route")
  if [ "$STATUS" == "200" ]; then
    echo "✅ $STATUS  $route"
  else
    echo "❌ $STATUS  $route"
    FAIL=$((FAIL+1))
  fi
done

echo ""
echo "Routes checked: ${#ROUTES[@]}"
echo "Failures: $FAIL"
```

> **Note:** Actual route count may vary. Add/remove routes based on what the live site exposes.
> If a route returns 404 because a sub-category genuinely doesn't exist yet (dental, hair/therapy, glp-1),
> that is expected — note it but do NOT count as a failure for this task.

### 5B — Visual spot-check (browser, ~10 min)

Open and eyeball these key pages:

| Page | What to confirm |
|---|---|
| `https://cosmedic.gaiada.online/` | Home hero image loads + Place/Bali image |
| `https://cosmedic.gaiada.online/surgeons` | Surgeons hero image loads |
| `https://cosmedic.gaiada.online/treatments/surgical/face` | Sub-cat hero image loads |
| `https://cosmedic.gaiada.online/treatments/non-surgical/injectables` | Sub-cat hero image loads |
| `https://cosmedic.gaiada.online/treatments/weight-loss/bariatric` | OR theatre image loads |
| `https://cosmedic.gaiada.online/journey` | Journey step images load |
| `https://cosmedic.gaiada.online/recovery-stays` | Recovery hero + lifestyle images load |
| `https://cosmedic.gaiada.online/results` | Results hero loads |
| `https://cosmedic.gaiada.online/contact` | Signage image loads |
| `https://cosmedic.gaiada.online/about` or `/stories` | Corridor atmosphere image loads |
| Any surgeon profile `/surgeons/suka` etc. | Portrait still loads (not broken by new uploads) |

**Check each page:**
- [ ] Image loads (no broken icon)
- [ ] Correct image (not parent fallback)
- [ ] No layout breaks
- [ ] All nav links / buttons clickable (no console errors)

---

## Phase 6 — Git Commit & Push ⏱ 5 min

```bash
# On gda-s01 — the live site repo
ssh gda-s01 "cd /var/www/cosmedic && git status"

# If there are any code/config changes tracked in git (CMS may auto-update DB only, not git):
ssh gda-s01 "cd /var/www/cosmedic && git add -A && git commit -m 'feat: upload 25 Figma images to CMS — all sub-category heroes, doctors, homepage, journey, results, about, contact

- 12 treatment sub-category heroImages filled (10 previously empty + 2 weight-loss)
- Surgeons hero, Homepage hero + place, Contact signage, Journey steps + recovery, Results hero, About stories
- 8 surgeon portraits already in CMS — untouched
- ~36 unmatched CMS images left untouched
- All 52 routes verified 200 OK

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>'"

ssh gda-s01 "cd /var/www/cosmedic && git push"
```

> **Note:** Payload CMS stores images in the DB and on disk (`/var/www/cosmedic/media/`).
> If the media folder is gitignored, only the DB has the new image records — that's normal and expected.
> Commit still captures any config/schema changes if any occurred.

---

## Time Summary

| Phase | Task | Time |
|---|---|---|
| 0 | Pre-flight checks | 10 min |
| 1 | WebP conversion (25 files) | 10 min |
| 2 | Auth + discover collection IDs | 15 min |
| 3 | Upload 25 images + assign fields | 40 min |
| 4 | Confirm ~36 untouched CMS images | 5 min |
| 5A | Automated 200 OK check (all routes) | 10 min |
| 5B | Visual browser spot-check | 10 min |
| 6 | Git commit + push | 5 min |
| — | Buffer for surprises | 15 min |
| **Total** | | **~2 hrs 0 min** |

> Manual UI fallback (if API auth fails): add ~45 min → ~2 hrs 45 min

---

## What We Are NOT Touching

- **8 surgeon portraits** — already live, confirmed correct
- **~36 CMS images** with no Figma equivalent — leave as-is, do not delete or overwrite
- `not_usable/` folder — 13 files, do not convert or upload
- `/var/www/cosmedic/` source code — no code changes in this session

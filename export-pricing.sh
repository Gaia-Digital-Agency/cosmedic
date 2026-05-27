#!/usr/bin/env bash
# export-pricing.sh
# Exports all pricing rows to /var/www/cosmedic/pricing-export.csv
#
# Run: bash export-pricing.sh

set -euo pipefail

OUT="/var/www/cosmedic/pricing-export.csv"
DB="postgres://cosmedic:sahY4xUy0lzP74vncmtoXwrb5qFgs@127.0.0.1:5432/cosmedic"

# Write header
echo 'id (no edit),slug (no edit),name (no edit),main_category (no edit),audience_tier (no edit),unit (no edit),price_idr_2026' > "$OUT"

run_copy() {
  local sql="$1"
  PGPASSWORD=sahY4xUy0lzP74vncmtoXwrb5qFgs \
    psql -h 127.0.0.1 -U cosmedic -d cosmedic \
    -c "COPY ($sql) TO STDOUT WITH CSV"
}

# 1. surgical-items
SQL="SELECT id, slug, name,
            COALESCE(main_category,''),
            audience_tier::text,
            COALESCE(unit,''),
            COALESCE(pricing_price_idr2026::text,'')
     FROM surgical_items
     ORDER BY main_category, sort_order"
COUNT=$(run_copy "$SQL" | tee -a "$OUT" | wc -l)
echo "  surgical-items        $COUNT rows"

# 2. machine-items
SQL="SELECT id, slug, name,
            COALESCE(main_category,''),
            audience_tier::text,
            COALESCE(unit,''),
            COALESCE(pricing_price_idr2026::text,'')
     FROM machine_items
     ORDER BY main_category, sort_order, audience_tier"
COUNT=$(run_copy "$SQL" | tee -a "$OUT" | wc -l)
echo "  machine-items         $COUNT rows"

# 3. injection-items
SQL="SELECT id, slug, name,
            COALESCE(main_category,''),
            audience_tier::text,
            COALESCE(unit,''),
            COALESCE(pricing_price_idr2026::text,'')
     FROM injection_items
     ORDER BY main_category, sort_order"
COUNT=$(run_copy "$SQL" | tee -a "$OUT" | wc -l)
echo "  injection-items       $COUNT rows"

# 4. btl-items
SQL="SELECT id, slug, name,
            COALESCE(main_category, body_zone::text, ''),
            audience_tier::text,
            COALESCE(unit,''),
            COALESCE(pricing_price_idr2026::text,'')
     FROM btl_items
     ORDER BY body_zone, sort_order"
COUNT=$(run_copy "$SQL" | tee -a "$OUT" | wc -l)
echo "  btl-items             $COUNT rows"

# 5. procedures
SQL="SELECT id, slug, name,
            COALESCE(main_category,''),
            audience_tier::text,
            COALESCE(unit,''),
            COALESCE(pricing_price_idr2026::text,'')
     FROM procedures
     ORDER BY main_category, sort_order"
COUNT=$(run_copy "$SQL" | tee -a "$OUT" | wc -l)
echo "  procedures            $COUNT rows"

TOTAL=$(tail -n +2 "$OUT" | wc -l)
echo ""
echo "✅  $TOTAL rows → $OUT"

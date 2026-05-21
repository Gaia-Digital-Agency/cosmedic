#!/usr/bin/env bash
# Quick smoke check for the cosmedic stack.
# Run: bash ops/smoke.sh
set -u
host="${1:-https://cosmedic.gaiada.online}"
fail=0

check() {
  local desc="$1" url="$2" expected="$3"
  local code
  code=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  if [[ "$code" == "$expected" ]]; then
    printf "  \033[32mok\033[0m   %-45s %s\n" "$desc" "$code"
  else
    printf "  \033[31mfail\033[0m %-45s %s (expected %s)\n" "$desc" "$code" "$expected"
    fail=$((fail+1))
  fi
}

post_ok() {
  local desc="$1" url="$2"
  local body
  body=$(curl -s -X POST -H 'content-type: application/json' -d '{}' "$url")
  if [[ "$body" == *'"ok":true'* ]]; then
    printf "  \033[32mok\033[0m   %-45s %s\n" "$desc" "$body"
  else
    printf "  \033[31mfail\033[0m %-45s %s\n" "$desc" "$body"
    fail=$((fail+1))
  fi
}

echo "smoke against $host"
check "homepage 200"                "$host/"                                200
check "admin login 200"             "$host/admin/login"                     200
check "/treatments 200"             "$host/treatments"                       200
check "/pricing 200"                "$host/pricing"                          200
check "/surgeon-suka 200"           "$host/surgeon-suka"                     200
check "/treatment-surgical 200"     "$host/treatment-surgical"               200
check "favicon ico 200"             "$host/favicon.ico"                     200
check "media variant 200"           "$host/api/media/file/suka-480x480.webp" 200
check "media original 200"          "$host/api/media/file/suka.webp"        200
post_ok "/api/revalidate ok"         "$host/api/revalidate"

echo
echo "sibling sites (should all be 200):"
for h in christos templatebase templategen flowstep gtec whatsnewasia; do
  check "$h.gaiada.online" "https://$h.gaiada.online/" 200
done

echo
if [[ $fail -eq 0 ]]; then
  printf "\033[32mall green\033[0m\n"
  exit 0
else
  printf "\033[31m%d check(s) failed\033[0m\n" "$fail"
  exit 1
fi

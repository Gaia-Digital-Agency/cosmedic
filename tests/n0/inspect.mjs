#!/usr/bin/env node
/**
 * CR25May 25.10 — PASS 2.
 * Reads test-results/n0-baseline/metrics/*.json and emits findings.md
 * Triage rules:
 *   - F1 overflow:     overflowX === true   → horizontal scroll regression
 *   - F2 small target: smallTouchTargets > 0 on width <= 414 → tap fail risk
 *   - F3 small font:   minBodyFontPx < 12   → readability fail
 *   - F4 long token:   longestUnbrokenWord > 22 → wraps off-edge risk
 *   - F5 alt missing:  altMissing > 0       → a11y / SEO fail
 *   - F6 non-200:      status !== 200
 */
import fs from 'node:fs'
import path from 'node:path'

const DIR = path.resolve('qa-reports/n0-baseline/metrics')
if (!fs.existsSync(DIR)) {
  console.error(`No metrics directory at ${DIR}. Run capture.spec.ts first.`)
  process.exit(1)
}

const all = fs.readdirSync(DIR)
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')))

const findings = {
  F1_overflow: all.filter((m) => m.overflowX),
  F2_smallTouch: all.filter((m) => m.width <= 414 && m.smallTouchTargets > 0),
  F3_smallFont: all.filter((m) => m.minBodyFontPx > 0 && m.minBodyFontPx < 12),
  F4_longToken: all.filter((m) => m.longestUnbrokenWord > 22),
  F5_altMissing: all.filter((m) => m.altMissing > 0),
  F6_nonOk: all.filter((m) => m.status !== 200),
}

const md = []
md.push('# CR25May 25.10 — N0 mobile UX findings')
md.push('')
md.push(`Captures: ${all.length} (expected 260 = 52 routes × 5 widths)`)
md.push('')
md.push('| Finding | Count | Status |')
md.push('|---|---:|---|')
for (const [k, v] of Object.entries(findings)) {
  md.push(`| ${k} | ${v.length} | ${v.length === 0 ? '✅ clean' : '❌ open'} |`)
}
md.push('')

for (const [k, v] of Object.entries(findings)) {
  if (!v.length) continue
  md.push(`## ${k} (${v.length})`)
  md.push('')
  md.push('| Slug | Path | Width | Detail |')
  md.push('|---|---|---:|---|')
  // group by slug+path, list widths affected
  const byRoute = new Map()
  for (const m of v) {
    const key = `${m.slug}|${m.path}`
    if (!byRoute.has(key)) byRoute.set(key, [])
    byRoute.get(key).push(m)
  }
  for (const [key, ms] of byRoute) {
    const [slug, p] = key.split('|')
    const widths = ms.map((m) => m.width).sort((a, b) => a - b).join(', ')
    let detail = ''
    if (k === 'F1_overflow') detail = `scrollWidth max ${Math.max(...ms.map((m) => m.scrollWidth))}px`
    else if (k === 'F2_smallTouch') detail = `${Math.max(...ms.map((m) => m.smallTouchTargets))} small targets`
    else if (k === 'F3_smallFont') detail = `min ${Math.min(...ms.map((m) => m.minBodyFontPx))}px`
    else if (k === 'F4_longToken') detail = `longest ${Math.max(...ms.map((m) => m.longestUnbrokenWord))} chars`
    else if (k === 'F5_altMissing') detail = `${Math.max(...ms.map((m) => m.altMissing))} imgs without alt`
    else if (k === 'F6_nonOk') detail = `status ${[...new Set(ms.map((m) => m.status))].join('/')}`
    md.push(`| ${slug} | ${p} | ${widths} | ${detail} |`)
  }
  md.push('')
}

const out = path.resolve('qa-reports/n0-baseline/findings.md')
fs.writeFileSync(out, md.join('\n'))
console.log(`Wrote ${out}`)
console.log('')
for (const [k, v] of Object.entries(findings)) {
  console.log(`${k}: ${v.length}`)
}

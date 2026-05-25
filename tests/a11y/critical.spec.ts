import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const CRITICAL_ROUTES = [
  { path: '/', name: 'home' },
  { path: '/contact', name: 'contact' },
  { path: '/pricing', name: 'pricing' },
  { path: '/surgeons', name: 'surgeons' },
  { path: '/treatments', name: 'treatments' },
] as const

const REPORT_DIR = 'qa-reports/a11y'

for (const { path, name } of CRITICAL_ROUTES) {
  test(`a11y (axe) — ${name} (${path})`, async ({ page }, info) => {
    await page.goto(path)
    await page.waitForLoadState('domcontentloaded')
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .disableRules(['color-contrast']) // baseline run: skip the slowest rule
      .analyze()
    mkdirSync(REPORT_DIR, { recursive: true })
    const summary = {
      route: path,
      timestamp: new Date().toISOString(),
      project: info.project.name,
      violationCount: results.violations.length,
      violations: results.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodeCount: v.nodes.length,
        help: v.help,
      })),
    }
    writeFileSync(join(REPORT_DIR, `${name}-${info.project.name}.json`), JSON.stringify(summary, null, 2))
    // Soft expect: baseline run records violations but doesn't gate
    expect.soft(results.violations.length, `${path} a11y violations`).toBeLessThan(50)
  })
}

import { test, expect } from '@playwright/test'

const PAGES = ['/', '/surgeons', '/contact'] as const

for (const path of PAGES) {
  test(`viewport snapshot ${path}`, async ({ page }) => {
    await page.goto(path)
    await page.waitForLoadState('domcontentloaded')
    // Disable animations
    await page.addStyleTag({
      content: '*, *::before, *::after { animation: none !important; transition: none !important; }',
    })
    // Above-the-fold only — fullPage is too slow against production
    await expect(page).toHaveScreenshot(`page${path === '/' ? '-home' : path.replace(/\//g, '-')}-viewport.png`)
  })
}

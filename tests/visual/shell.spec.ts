import { test, expect } from '@playwright/test'

test.describe('shell visual snapshots — closes 25.2 footer-regression precedent', () => {
  test('header', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const header = page.locator('header').first()
    await expect(header).toHaveScreenshot('header.png')
  })

  test('footer', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const footer = page.locator('footer').first()
    await footer.scrollIntoViewIfNeeded()
    await expect(footer).toHaveScreenshot('footer.png')
  })

  test('floating chrome (back-to-top + WhatsApp fab)', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.evaluate(() => window.scrollTo(0, 800))
    await page.waitForTimeout(500)
    const chrome = page.locator('.floating-chrome').first()
    if (await chrome.count() > 0) {
      await expect(chrome).toHaveScreenshot('floating-chrome.png')
    } else {
      test.skip(true, 'floating-chrome not rendered on this viewport')
    }
  })
})

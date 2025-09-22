import { test, expect } from '@playwright/test';

test('home links render', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'xymyx-analysis' })).toBeVisible();
  await expect(page.getByRole('link', { name: /XYMYX Annotator/i })).toBeVisible();
});

test('xymyx annotator shows board', async ({ page }) => {
  await page.goto('/xymyx-annotator');
  await expect(page.getByRole('grid', { name: /xymyx-board/i })).toBeVisible();
});

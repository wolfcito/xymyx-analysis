import { test, expect } from '@playwright/test';

test('home links render', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'xymyx-analysis' })).toBeVisible();
  await expect(page.getByRole('link', { name: /Chess Annotator/i })).toBeVisible();
});

test('chess annotator shows board', async ({ page }) => {
  await page.goto('/chess-annotator');
  await expect(page.getByRole('grid', { name: /chess-board/i })).toBeVisible();
});


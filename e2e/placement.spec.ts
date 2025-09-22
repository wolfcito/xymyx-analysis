import { test, expect } from '@playwright/test';

test('setup: click-to-place from piece tray', async ({ page }) => {
  // Open home
  await page.goto('/');

  // Board should be visible
  await expect(page.getByRole('grid', { name: /xymyx-board/i })).toBeVisible();

  // Click the first piece in the tray (assumes Setup mode by default)
  const tray = page.locator('[aria-label="piece-tray"]');
  await expect(tray).toBeVisible();
  await tray.locator('.grid > div').first().click();

  // Click an empty square (e4 in initial position)
  const targetSquare = page.locator('[data-square="e4"]');
  await targetSquare.click();

  // Expect an image (piece) to be placed in that square
  await expect(targetSquare.locator('img')).toBeVisible();
});

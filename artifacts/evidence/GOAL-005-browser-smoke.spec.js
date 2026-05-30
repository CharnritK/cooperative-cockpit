const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');

test('GOAL-005 static MVP pages remain reachable and handoff gated', async ({ page }) => {
  const consoleErrors = [];
  const remoteRequests = [];

  page.on('console', (message) => {
    if (message.type() === 'error') {
      consoleErrors.push(message.text());
    }
  });

  page.on('request', (request) => {
    const url = request.url();
    if (/^https?:/i.test(url)) {
      remoteRequests.push(url);
    }
  });

  const appUrl = pathToFileURL(path.resolve('apps/static-mvp/index.html')).href;
  await page.goto(appUrl);

  for (const pageName of ['home', 'workbench', 'spec-builder', 'review-runs', 'preview', 'decisions', 'trace', 'rules']) {
    await page.locator(`[data-page="${pageName}"]`).click();
    await expect(page.locator(`.nav-item[data-page="${pageName}"]`)).toHaveClass(/active/);
    await expect(page.locator('#main-content')).not.toBeEmpty();
  }

  await page.locator('[data-page="workbench"]').click();
  await page.locator('[data-node-id="node-4"]').click();
  await expect(page.locator('#right-inspector')).toContainText('Advisory Review');
  await page.getByRole('button', { name: /Add selected/i }).click();
  await expect(page.locator('.context-items')).toContainText('Review Agent');

  await page.locator('[data-page="review-runs"]').click();
  await page.getByRole('button', { name: /Start review checks/i }).click();
  await expect(page.locator('.review-result-card')).toHaveCount(6);

  await expect(page.locator('button[data-action="handoff"]')).toBeDisabled();
  expect(consoleErrors).toEqual([]);
  expect(remoteRequests).toEqual([]);
});

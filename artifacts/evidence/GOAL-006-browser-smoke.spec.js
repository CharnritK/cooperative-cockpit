const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');

test('GOAL-006 UI maps existing pages to locked object model', async ({ page }) => {
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

  await page.goto(pathToFileURL(path.resolve('apps/static-mvp/index.html')).href);

  await expect(page.locator('#main-content')).toContainText('Project Overview');
  await expect(page.locator('#main-content')).toContainText('Project object');
  await expect(page.locator('#main-content')).toContainText('Artifact Reference');
  await expect(page.locator('#main-content')).toContainText('Work Packet');
  await expect(page.locator('#main-content')).toContainText('Selected Context');

  await page.locator('[data-page="workbench"]').click();
  await expect(page.locator('#main-content')).toContainText('Cockpit object map');
  await expect(page.locator('#main-content')).toContainText('Locked object palette');
  await expect(page.locator('#main-content')).toContainText('Selected Context');
  await expect(page.locator('#main-content')).not.toContainText('OpenClaw Node Families');

  await page.locator('[data-page="review-runs"]').click();
  await expect(page.locator('#main-content')).toContainText('Review Run object');
  await expect(page.locator('#main-content')).toContainText('Finding objects');
  await page.getByRole('button', { name: /Inspect findings/i }).click();
  await expect(page.locator('.review-result-card')).toHaveCount(3);
  await expect(page.locator('.review-result-card').first()).toContainText('Finding');

  await page.locator('[data-page="trace"]').click();
  await expect(page.locator('#main-content')).toContainText('Evidence item detail');
  await expect(page.locator('#main-content')).toContainText('Artifact Reference');
  await expect(page.locator('#main-content')).toContainText('Source object');
  await expect(page.locator('#main-content')).toContainText('Target object');

  for (const pageName of ['home', 'workbench', 'spec-builder', 'review-runs', 'preview', 'decisions', 'trace', 'rules']) {
    await page.locator(`[data-page="${pageName}"]`).click();
    await expect(page.locator(`.nav-item[data-page="${pageName}"]`)).toHaveClass(/active/);
    await expect(page.locator('#main-content')).not.toBeEmpty();
  }

  await expect(page.locator('button[data-action="handoff"]')).toBeDisabled();
  expect(consoleErrors).toEqual([]);
  expect(remoteRequests).toEqual([]);
});

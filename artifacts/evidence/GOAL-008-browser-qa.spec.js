const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');

test('GOAL-008 static MVP QA closeout covers pages, network, labels, and object-model surfaces', async ({ page }) => {
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

  const expectedPages = ['home', 'workbench', 'spec-builder', 'review-runs', 'preview', 'decisions', 'trace', 'rules'];
  await expect(page.locator('.nav-item')).toHaveCount(expectedPages.length);

  for (const pageName of expectedPages) {
    await page.locator(`[data-page="${pageName}"]`).click();
    await expect(page.locator(`.nav-item[data-page="${pageName}"]`)).toHaveClass(/active/);
    await expect(page.locator('#main-content')).not.toBeEmpty();
  }

  await page.locator('[data-page="home"]').click();
  await expect(page.locator('#main-content')).toContainText('Project object');
  await expect(page.locator('#main-content')).toContainText('Selected Context');

  await page.locator('[data-page="workbench"]').click();
  await expect(page.locator('#main-content')).toContainText('Context Node');
  await expect(page.locator('#main-content')).toContainText('Protected Exclusions');

  await page.locator('[data-page="spec-builder"]').click();
  await expect(page.locator('#main-content')).toContainText('Spec Builder');
  await expect(page.locator('#main-content')).toContainText('Governed spec readiness');

  await page.locator('[data-page="review-runs"]').click();
  await expect(page.locator('#main-content')).toContainText('Review Run object');
  await expect(page.locator('#main-content')).toContainText('Finding objects');

  await page.locator('[data-page="decisions"]').click();
  await expect(page.locator('#main-content')).toContainText('D-005 governance checkpoint');
  await expect(page.locator('#main-content')).toContainText('Needs Point lock');

  await page.locator('[data-page="trace"]').click();
  await expect(page.locator('#main-content')).toContainText('Evidence item detail');
  await expect(page.locator('#main-content')).toContainText('Artifact Reference');

  await page.locator('[data-page="preview"]').click();
  await expect(page.locator('#main-content')).toContainText('Work Packet summary');
  await expect(page.locator('#main-content')).toContainText('Derived static Handoff Packet Preview');
  await expect(page.locator('#main-content')).toContainText('Readiness status');
  await expect(page.locator('button[data-action="handoff"]')).toBeDisabled();
  await expect(page.getByRole('button', { name: /View gated preview/i })).toBeDisabled();

  await page.locator('[data-page="rules"]').click();
  await expect(page.locator('#main-content')).toContainText('Runtime mutation');
  await expect(page.locator('#main-content')).toContainText('Protected surfaces');

  const unsafeButtonPattern = /\b(run|execute|deploy|export|login|authenticate|connect account|start workflow|run workflow)\b/i;
  const buttonTexts = await page.locator('button').evaluateAll((buttons) => buttons.map((button) => button.textContent || ''));
  expect(buttonTexts.filter((text) => unsafeButtonPattern.test(text))).toEqual([]);

  expect(consoleErrors).toEqual([]);
  expect(remoteRequests).toEqual([]);
});

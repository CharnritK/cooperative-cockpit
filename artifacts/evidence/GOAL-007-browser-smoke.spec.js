const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');

test('GOAL-007 surfaces Work Packet and derived static Handoff Packet preview', async ({ page }) => {
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

  await page.locator('[data-page="preview"]').click();
  const main = page.locator('#main-content');

  await expect(main).toContainText('Work Packet summary');
  await expect(main).toContainText('Work Packet is the core object');
  await expect(main).toContainText('Agent Roles: embedded metadata only');
  await expect(main).toContainText('Derived static Handoff Packet Preview');
  await expect(main).toContainText('Derived from Work Packet, Decisions, Evidence, and Validation Results');
  await expect(main).toContainText('Readiness status');
  await expect(main).toContainText('Blocked-by reasons');
  await expect(main).toContainText('Allowed paths');
  await expect(main).toContainText('Forbidden actions');
  await expect(main).toContainText('Acceptance criteria');
  await expect(main).toContainText('Validation commands');
  await expect(main).toContainText('apps/static-mvp/src/app.js');
  await expect(main).toContainText('Do not create real export files');

  await expect(page.locator('button[data-action="handoff"]')).toBeDisabled();
  await expect(page.getByRole('button', { name: /View gated preview/i })).toBeDisabled();

  await page.evaluate(() => {
    window.appState.specFields.forEach((field) => {
      field.status = 'locked';
    });
    window.appState.decisions.forEach((decision) => {
      decision.status = 'locked';
      decision.chosenOption = decision.chosenOption || decision.options[0];
    });
    window.appState.evidenceItems.forEach((item) => {
      item.status = 'attached';
    });
    window.appState.specValidated = true;
    window.appState.evidenceReviewed = true;
    window.appState.reviewBlockersAcknowledged = true;
    window.renderPage('preview');
  });

  await expect(page.locator('button[data-action="handoff"]')).toBeEnabled();
  let handoffDialogMessage = '';
  page.once('dialog', async (dialog) => {
    handoffDialogMessage = dialog.message();
    await dialog.dismiss();
  });
  await page.locator('button[data-action="handoff"]').click();
  expect(handoffDialogMessage).toContain('Static handoff preview is available. No files are written.');

  for (const pageName of ['home', 'workbench', 'spec-builder', 'review-runs', 'preview', 'decisions', 'trace', 'rules']) {
    await page.locator(`[data-page="${pageName}"]`).click();
    await expect(page.locator(`.nav-item[data-page="${pageName}"]`)).toHaveClass(/active/);
    await expect(page.locator('#main-content')).not.toBeEmpty();
  }

  expect(consoleErrors).toEqual([]);
  expect(remoteRequests).toEqual([]);
});

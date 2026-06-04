import { expect, test } from "@playwright/test";
import path from "node:path";
import { pathToFileURL } from "node:url";

const staticMvpUrl = pathToFileURL(path.resolve(process.cwd(), "apps/static-mvp/index.html")).href;

const visualTargets = [
  {
    id: "screen-001-operator-home",
    pageKey: "home",
    navLabel: "Home",
    expectedText: "Next Safe Actions",
    state: "default"
  },
  {
    id: "screen-002-workbench",
    pageKey: "workbench",
    navLabel: "Workbench",
    expectedText: "Selected Context",
    state: "selected"
  },
  {
    id: "screen-003-spec-builder",
    pageKey: "spec-builder",
    navLabel: "Spec Builder",
    expectedText: "Controlled Build Specification",
    state: "default"
  },
  {
    id: "screen-004-review-runs",
    pageKey: "review-runs",
    navLabel: "Review Runs",
    expectedText: "Review Runs",
    state: "default"
  },
  {
    id: "screen-005-static-preview",
    pageKey: "preview",
    navLabel: "Preview",
    expectedText: "UI / HTML Viewer",
    state: "default"
  },
  {
    id: "screen-006-decision-log",
    pageKey: "decisions",
    navLabel: "Decisions",
    expectedText: "Operational lock list",
    state: "pending"
  },
  {
    id: "screen-007-trace-evidence",
    pageKey: "trace",
    navLabel: "Trace & Evidence",
    expectedText: "Trace & Evidence",
    state: "default"
  },
  {
    id: "screen-008-rules-scope",
    pageKey: "rules",
    navLabel: "Rules & Scope",
    expectedText: "Rules & Scope",
    state: "default"
  }
];

test.describe("static MVP visual scaffold", () => {
  for (const target of visualTargets) {
    test(`${target.id} ${target.state} approved baseline screenshot`, async ({ page }) => {
      await page.goto(staticMvpUrl);
      await page.waitForFunction(() => typeof window.navigate === "function");
      await page.evaluate((pageKey) => window.navigate(pageKey), target.pageKey);

      await expect(page.locator("#main-content")).toContainText(target.expectedText);

      await expect(page).toHaveScreenshot(`${target.id}-${target.state}.png`, {
        fullPage: true
      });
    });
  }

  test("screen-002-workbench spatial canvas zoom pan and context dock", async ({ page }) => {
    test.setTimeout(90000);
    const remoteRequests = [];
    page.on("request", (request) => {
      if (/^https?:\/\//.test(request.url())) remoteRequests.push(request.url());
    });

    await page.goto(staticMvpUrl);
    await page.waitForFunction(() => typeof window.navigate === "function");
    await page.evaluate(() => window.navigate("workbench"));

    await expect(page.locator("#app-shell")).toHaveClass(/workbench-focus-mode/);
    await expect(page.locator(".canvas-viewport")).toBeVisible();
    await expect(page.locator(".canvas-world")).toBeVisible();
    await expect(page.locator(".workbench-context-dock")).toBeVisible();
    await expect(page.locator("#toggle-view-spatial")).toHaveClass(/active/);

    const expectedNodeIds = await page.evaluate(() => window.mockData.nodes.map((node) => node.id).sort());
    const renderedNodeIds = await page.locator(".canvas-world .node-card").evaluateAll((cards) => cards.map((card) => card.dataset.nodeId).sort());
    expect(renderedNodeIds).toEqual(expectedNodeIds);

    const initialViewport = await page.evaluate(() => ({ ...window.appState.canvasViewport }));
    await page.locator("#zoom-in-workbench").click();
    await expect.poll(async () => page.evaluate(() => window.appState.canvasViewport.scale)).toBeGreaterThan(initialViewport.scale);
    await expect(page.locator("#workbench-zoom-level")).toContainText("%");

    await page.locator("#zoom-out-workbench").click();
    await page.locator("#fit-workbench-board").click();
    await expect.poll(async () => page.evaluate(() => window.appState.canvasViewport.scale)).not.toBe(initialViewport.scale);

    await page.locator("#reset-workbench-view").click();
    await expect.poll(async () => page.evaluate(() => window.appState.canvasViewport.scale)).toBe(initialViewport.scale);

    const beforePan = await page.evaluate(() => ({ ...window.appState.canvasViewport }));
    const viewportBox = await page.locator(".canvas-viewport").boundingBox();
    expect(viewportBox).not.toBeNull();
    await page.mouse.move(viewportBox.x + viewportBox.width / 2, viewportBox.y + viewportBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(viewportBox.x + viewportBox.width / 2 + 90, viewportBox.y + viewportBox.height / 2 + 45);
    await page.mouse.up();
    await expect.poll(async () => page.evaluate(() => window.appState.canvasViewport.x)).not.toBe(beforePan.x);

    await page.locator('[data-node-id="arch-1"]').click();
    await expect(page.locator('[data-node-id="arch-1"]')).toHaveClass(/selected/);
    await expect(page.locator(".workbench-context-dock")).toContainText("Governed UI Canvas Engine");
    await expect(page.locator(".workbench-context-dock")).toContainText("Selected Context");
    await expect(page.locator("#app-shell")).not.toHaveClass(/inspector-open/);

    expect(remoteRequests).toEqual([]);
  });

  test("screen-002-workbench secondary mixed map drilldown", async ({ page }) => {
    test.setTimeout(90000);
    await page.goto(staticMvpUrl);
    await page.waitForFunction(() => typeof window.navigate === "function");
    await page.evaluate(() => window.navigate("workbench"));

    await expect(page.locator("#rail-progress-value")).toContainText(/%/);
    await expect(page.locator("#app-shell")).not.toHaveClass(/inspector-open/);
    await expect(page.locator(".workbench-sidebar")).toHaveCount(0);

    await page.locator("#toggle-workbench-palette").click();
    await expect(page.locator(".workbench-popover-palette")).toBeVisible();
    await expect(page.locator(".workbench-popover-palette")).toContainText("Locked object palette");

    await page.locator("#toggle-workbench-context").click();
    await expect(page.locator(".workbench-popover-palette")).toHaveCount(0);
    await expect(page.locator(".workbench-popover-context")).toBeVisible();
    await expect(page.locator(".workbench-popover-context")).toContainText("Selected Context");
    await page.locator(".workbench-popover-context #close-workbench-popover").click();
    await expect(page.locator(".workbench-popover-context")).toHaveCount(0);

    await expect(page.locator("#toggle-view-spatial")).toHaveClass(/active/);
    const mixedToggle = page.locator("#toggle-view-mixed");
    await mixedToggle.click();
    await expect(mixedToggle).toHaveClass(/active/);
    await expect(page.locator('[data-node-id="req-1"]')).toBeVisible();
    await expect(page.locator('[data-node-id="req-2"]')).toBeVisible();

    await page.locator('[data-node-id="req-1"] .node-drill-down-action').click();
    await expect(page.locator('[data-compound-group-id="req-1"]')).toBeVisible();
    await expect(page.locator('[data-node-id="arch-1"]')).toBeVisible();
    await expect(page.locator('[data-node-id="arch-2"]')).toBeVisible();
    await expect(page.locator('[data-node-id="req-2"]')).toBeVisible();

    await page.locator('[data-node-id="arch-1"]').click();
    await expect(page.locator("#app-shell")).not.toHaveClass(/inspector-open/);
    await page.locator('[data-action="toggle-inspector"]').click();
    await expect(page.locator("#app-shell")).not.toHaveClass(/inspector-open/);
    await expect(page.locator("#right-inspector")).toBeHidden();
    await expect(page.locator(".object-editor-panel")).toContainText("Canvas Engine");

    await page.locator('[data-compound-group-id="req-1"] .compound-collapse-action').click();
    await expect(page.locator('[data-compound-group-id="req-1"]')).toHaveCount(0);
    await expect(page.locator('[data-node-id="arch-1"]')).toHaveCount(0);
    await expect(page.locator('[data-node-id="req-2"]')).toBeVisible();

    await page.locator("#toggle-view-flat").click();
    await expect(page.locator("#toggle-view-flat")).toHaveClass(/active/);
    const nodeIds = await page.locator(".node-flow-flat .node-card").evaluateAll((cards) => cards.map((card) => card.dataset.nodeId));
    expect(nodeIds).toEqual(["node-1", "node-2", "node-3", "node-4", "node-5", "node-6", "node-7", "node-8"]);
  });
});

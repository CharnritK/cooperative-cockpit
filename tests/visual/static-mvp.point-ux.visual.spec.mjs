import { expect, test } from "@playwright/test";
import path from "node:path";
import { pathToFileURL } from "node:url";

const staticMvpUrl = pathToFileURL(path.resolve(process.cwd(), "apps/static-mvp/index.html")).href;

test.describe("POINT UX simplification locks", () => {
  test("workbench defaults to three macro layers before deep inspection tools", async ({ page }) => {
    await page.goto(staticMvpUrl);
    await page.waitForFunction(() => typeof window.navigate === "function");
    await page.evaluate(() => window.navigate("workbench"));

    await expect(page.locator(".workbench-macro-layers")).toBeVisible();
    await expect(page.locator("[data-macro-layer]")).toHaveCount(3);
    await expect(page.locator('[data-macro-layer="context"]')).toContainText("Context");
    await expect(page.locator('[data-macro-layer="specgraph"]')).toContainText("SpecGraph");
    await expect(page.locator('[data-macro-layer="handoff-gates"]')).toContainText("Handoff Gates");
    await expect(page.locator(".object-outline")).toBeVisible();
    await expect(page.locator(".canvas-world")).toBeVisible();
  });

  test("project-open shell hides onboarding rail entries and exposes top project access", async ({ page }) => {
    await page.goto(staticMvpUrl);
    await page.waitForFunction(() => typeof window.navigate === "function");
    await page.evaluate(() => window.navigate("workbench"));

    await expect(page.locator('.nav-item[data-page="landing"]')).toBeHidden();
    await expect(page.locator('.nav-item[data-page="demo-entry"]')).toBeHidden();
    await expect(page.locator('.nav-item[data-page="project-hub"]')).toBeHidden();
    await expect(page.locator('.nav-item[data-page="project-init"]')).toBeHidden();
    await expect(page.getByRole("button", { name: "Switch project or onboarding" })).toBeVisible();

    await page.getByRole("button", { name: "Switch project or onboarding" }).click();
    await expect(page.locator("#main-content")).toContainText("Project Hub");
  });

  test("project initialize transcript reacts by template as static mock data only", async ({ page }) => {
    const remoteRequests = [];
    page.on("request", (request) => {
      if (/^https?:\/\//.test(request.url())) remoteRequests.push(request.url());
    });

    await page.goto(staticMvpUrl);
    await page.waitForFunction(() => typeof window.navigate === "function");
    await page.evaluate(() => window.navigate("project-init"));

    await expect(page.locator("#main-content")).toContainText("Static mock transcript");
    await expect(page.locator("#main-content")).toContainText("No AI execution");
    await expect(page.locator("#main-content")).toContainText("no backend calls");
    await expect(page.locator("#main-content")).toContainText("no persistence");
    await expect(page.locator("#main-content")).toContainText("Builder Enablement OS setup");

    await page.getByRole("button", { name: /Compliance Review Workflow/ }).click();
    await expect(page.locator("#main-content")).toContainText("Compliance Review Harness setup");
    await expect(page.locator("#main-content")).not.toContainText("Builder Enablement OS setup");
    expect(remoteRequests).toEqual([]);
  });

  test("review-blocked node uses amber card tone with red blocker chip", async ({ page }) => {
    await page.goto(staticMvpUrl);
    await page.waitForFunction(() => typeof window.navigate === "function");
    await page.evaluate(() => {
      const reviewNode = window.mockData.nodes.find((node) => node.id === "node-4");
      reviewNode.status = "review-blocked";
      reviewNode.readiness = "review-blocked";
      window.navigate("workbench");
    });

    const reviewNode = page.locator('[data-node-id="node-4"]');
    await expect(reviewNode).toHaveClass(/status-tone-warning/);
    await expect(reviewNode.locator(".status-chip")).toHaveClass(/status-review-blocked/);
    await expect(reviewNode.locator(".status-chip")).toContainText("Review items");
  });

  test("workbench node cards follow local readiness state after review acknowledgement", async ({ page }) => {
    await page.goto(staticMvpUrl);
    await page.waitForFunction(() => typeof window.navigate === "function");
    await page.evaluate(() => window.navigate("workbench"));

    const reviewNode = page.locator('[data-node-id="node-4"]');
    await expect(reviewNode.locator(".status-chip")).toContainText("Review items");
    await expect(reviewNode.locator(".node-metric-blocker")).toContainText("3 open");

    await page.locator("#ack-review-blockers").click();

    await expect(reviewNode.locator(".status-chip")).toContainText("Finding resolved");
    await expect(reviewNode.locator(".status-chip")).toHaveClass(/status-validated/);
    await expect(reviewNode.locator(".node-metric-blocker")).toContainText("0 open");
    await expect(page.locator(".readiness-queue-group").filter({ hasText: "Review blockers" })).toContainText("Clear");
  });

  test("workbench task cards derive blockers from mutable local gate state", async ({ page }) => {
    await page.goto(staticMvpUrl);
    await page.waitForFunction(() => typeof window.navigate === "function");
    await page.evaluate(() => {
      window.appState.specFields.forEach((field) => {
        field.status = "locked";
        if (!field.value) field.value = `Local ${field.name} value`;
        field.evidenceIds = ["source-context"];
      });
      window.appState.decisions.forEach((decision) => {
        decision.status = "locked";
        decision.chosenOption = decision.chosenOption || decision.selectedOption || decision.options[0];
      });
      window.appState.evidenceItems.forEach((item) => {
        if (item.requiredForHandoff) item.status = "attached";
      });
      window.appState.evidenceReviewed = true;
      window.appState.reviewBlockersAcknowledged = true;
      window.appState.specValidated = true;
      window.navigate("workbench");
    });

    await expect(page.locator('[data-node-id="node-3"] .status-chip')).toContainText("Validated");
    await expect(page.locator('[data-node-id="node-3"] .node-metric-blocker')).toContainText("0 open");
    await expect(page.locator('[data-node-id="node-6"] .status-chip')).toContainText("Decision locked");
    await expect(page.locator('[data-node-id="node-6"] .node-metric-blocker')).toContainText("0 open");
    await expect(page.locator('[data-node-id="node-8"] .status-chip')).toContainText("Ready");
    await expect(page.locator('[data-node-id="node-8"] .node-metric-blocker')).toContainText("0 open");
  });

  test("object outline preserves keyboard focus after node selection refresh", async ({ page }) => {
    await page.goto(staticMvpUrl);
    await page.waitForFunction(() => typeof window.navigate === "function");
    await page.evaluate(() => window.navigate("workbench"));

    const archSelect = page.locator('[data-outline-node-id="arch-1"] .outline-select');
    await archSelect.focus();
    await page.keyboard.press("Enter");

    await expect.poll(async () => page.evaluate(() => ({
      nodeId: document.activeElement?.closest("[data-outline-node-id]")?.dataset.outlineNodeId || null,
      isSelect: Boolean(document.activeElement?.classList.contains("outline-select"))
    }))).toEqual({ nodeId: "arch-1", isSelect: true });
  });

  test("spatial hierarchy edges use vertical routing while workflow edges stay horizontal", async ({ page }) => {
    await page.goto(staticMvpUrl);
    await page.waitForFunction(() => typeof window.navigate === "function");
    await page.evaluate(() => window.navigate("workbench"));

    await expect(page.locator('[data-edge-layout="hierarchy"]').first()).toHaveCount(1);
    await expect(page.locator('[data-edge-layout="workflow"]').first()).toHaveCount(1);

    const hierarchyPath = await page.locator('[data-edge-source="comp-1"][data-edge-target="phase-1"]').getAttribute("d");
    const workflowPath = await page.locator('[data-edge-source="node-1"][data-edge-target="node-2"]').getAttribute("d");

    const parsePath = (d) => d.match(/-?\d+(?:\.\d+)?/g).map(Number);
    const [hx1, hy1, hcx1, hcy1, hcx2, hcy2, hx2, hy2] = parsePath(hierarchyPath);
    const [wx1, wy1, wcx1, wcy1, wcx2, wcy2, wx2, wy2] = parsePath(workflowPath);

    expect(Math.abs(hcx1 - hx1)).toBeLessThanOrEqual(1);
    expect(Math.abs(hcx2 - hx2)).toBeLessThanOrEqual(1);
    expect(hy2).toBeGreaterThan(hy1);
    expect(Math.abs(wcy1 - wy1)).toBeLessThanOrEqual(1);
    expect(Math.abs(wcy2 - wy2)).toBeLessThanOrEqual(1);
    expect(wx2).toBeGreaterThan(wx1);
  });

  test("spatial board header keeps title controls and viewport separated", async ({ page }) => {
    await page.setViewportSize({ width: 2048, height: 1000 });
    await page.goto(staticMvpUrl);
    await page.waitForFunction(() => typeof window.navigate === "function");
    await page.evaluate(() => window.navigate("workbench"));

    const geometry = await page.evaluate(() => {
      const rectFor = (selector) => {
        const rect = document.querySelector(selector).getBoundingClientRect();
        return { top: rect.top, right: rect.right, bottom: rect.bottom, left: rect.left };
      };
      const title = rectFor(".spatial-canvas-title");
      const toolbar = rectFor(".spatial-canvas-toolbar");
      const head = rectFor(".spatial-canvas-head");
      const viewport = rectFor(".canvas-viewport");
      const titleToolbarOverlap = !(
        title.right <= toolbar.left
        || toolbar.right <= title.left
        || title.bottom <= toolbar.top
        || toolbar.bottom <= title.top
      );
      return {
        titleToolbarOverlap,
        viewportStartsBelowHeader: viewport.top >= head.bottom - 1,
      };
    });

    expect(geometry.titleToolbarOverlap).toBe(false);
    expect(geometry.viewportStartsBelowHeader).toBe(true);
  });

  test("workbench support popovers update without rerendering the canvas", async ({ page }) => {
    await page.goto(staticMvpUrl);
    await page.waitForFunction(() => typeof window.navigate === "function");
    await page.evaluate(() => window.navigate("workbench"));

    await page.evaluate(() => {
      const canvas = document.querySelector(".node-canvas");
      canvas.dataset.renderIdentity = "stable-canvas";
      window.__workbenchCanvasRef = canvas;
    });

    await page.locator("#toggle-workbench-palette").click();
    await expect(page.locator(".workbench-popover-palette")).toBeVisible();
    await expect.poll(async () => page.evaluate(() => ({
      activePopover: window.appState.activeWorkbenchPopover,
      marker: document.querySelector(".node-canvas")?.dataset.renderIdentity || null,
      sameCanvas: window.__workbenchCanvasRef === document.querySelector(".node-canvas"),
    }))).toEqual({
      activePopover: "palette",
      marker: "stable-canvas",
      sameCanvas: true,
    });

    await page.locator("#toggle-workbench-context").click();
    await expect(page.locator(".workbench-popover-context")).toBeVisible();
    await expect(page.locator(".workbench-popover-palette")).toHaveCount(0);
    await expect.poll(async () => page.evaluate(() => ({
      activePopover: window.appState.activeWorkbenchPopover,
      marker: document.querySelector(".node-canvas")?.dataset.renderIdentity || null,
      sameCanvas: window.__workbenchCanvasRef === document.querySelector(".node-canvas"),
    }))).toEqual({
      activePopover: "context",
      marker: "stable-canvas",
      sameCanvas: true,
    });

    await page.locator("#close-workbench-popover").click();
    await expect(page.locator(".workbench-popover")).toHaveCount(0);
    await expect.poll(async () => page.evaluate(() => ({
      activePopover: window.appState.activeWorkbenchPopover,
      marker: document.querySelector(".node-canvas")?.dataset.renderIdentity || null,
      sameCanvas: window.__workbenchCanvasRef === document.querySelector(".node-canvas"),
    }))).toEqual({
      activePopover: null,
      marker: "stable-canvas",
      sameCanvas: true,
    });
  });

  test("current workbench modes do not expose legacy clickable breadcrumbs", async ({ page }) => {
    await page.goto(staticMvpUrl);
    await page.waitForFunction(() => typeof window.navigate === "function");
    await page.evaluate(() => window.navigate("workbench"));

    await expect(page.locator("#breadcrumb-root")).toHaveCount(0);
    await expect(page.locator("[data-breadcrumb-node]")).toHaveCount(0);

    await page.locator("#toggle-view-mixed").click();
    await expect(page.locator("#breadcrumb-root")).toHaveCount(0);
    await expect(page.locator("[data-breadcrumb-node]")).toHaveCount(0);

    await page.locator("#toggle-view-flat").click();
    await expect(page.locator("#breadcrumb-root")).toHaveCount(0);
    await expect(page.locator("[data-breadcrumb-node]")).toHaveCount(0);
  });
});

import { expect, test } from "@playwright/test";
import path from "node:path";
import { pathToFileURL } from "node:url";

const staticMvpUrl = pathToFileURL(path.resolve(process.cwd(), "apps/static-mvp/index.html")).href;

test.describe("GOAL-021 static MVP UX upgrade", () => {
  test("pre-workspace journey routes from landing to workbench without real auth", async ({ page }) => {
    const remoteRequests = [];
    page.on("request", (request) => {
      if (/^https?:\/\//.test(request.url())) remoteRequests.push(request.url());
    });

    await page.goto(staticMvpUrl);
    await page.waitForFunction(() => typeof window.navigate === "function");

    await expect(page.locator("#main-content")).toContainText("Continue to local demo");
    await expect(page.locator("#main-content")).toContainText("governed builder-ready handoff packets");

    await page.getByRole("button", { name: "Continue to local demo" }).click();
    await expect(page.locator("#main-content")).toContainText("Static Demo Entry");
    await expect(page.locator("#main-content")).toContainText("No real login");

    await page.getByRole("button", { name: "Enter demo" }).click();
    await expect(page.locator("#main-content")).toContainText("Project Hub");
    await expect(page.locator("#main-content")).toContainText("OpenClaw Cooperative Cockpit");
    await expect(page.locator("#main-content")).toContainText("Listing Compliance & Seller Appeal Review Harness");
    await expect(page.locator("#main-content")).toContainText("Mock last edited");

    await page.getByRole("button", { name: "Create from template" }).first().click();
    await expect(page.locator("#main-content")).toContainText("Project Initialize");
    await expect(page.locator("#main-content")).toContainText("Builder Enablement OS");
    await expect(page.locator("#main-content")).toContainText("Agent Harness SpecGraph");
    await expect(page.locator("#main-content")).toContainText("Compliance Review Workflow");
    await expect(page.locator("#main-content")).toContainText("Mock guided chat");
    await expect(page.locator("#main-content")).toContainText("Selected context preview");

    await page.getByRole("button", { name: "Open Workbench" }).click();
    await expect(page.locator("#main-content")).toContainText("Workbench");
    await expect(page.locator(".workbench-editor-layout")).toBeVisible();

    expect(remoteRequests).toEqual([]);
  });

  test("workbench outline focus lenses right panel and helpers preserve local state", async ({ page }) => {
    await page.goto(staticMvpUrl);
    await page.waitForFunction(() => typeof window.navigate === "function");
    await page.evaluate(() => window.navigate("workbench"));

    await expect(page.locator(".object-outline")).toBeVisible();
    await expect(page.locator(".object-editor-panel")).toBeVisible();
    await expect(page.locator(".workbench-readiness-queue")).toBeVisible();
    await expect(page.locator("#toggle-view-spatial")).toHaveClass(/active/);
    await expect(page.locator("#focus-lens-select")).toBeVisible();

    await page.locator('[data-outline-node-id="arch-1"]').click();
    await expect(page.locator('[data-outline-node-id="arch-1"]')).toHaveClass(/selected/);
    await expect(page.locator('[data-node-id="arch-1"]')).toHaveClass(/selected/);
    await expect(page.locator(".object-editor-panel")).toContainText("Governed UI Canvas Engine");

    await page.locator("#focus-lens-select").selectOption("selected-trail");
    await expect(page.locator('[data-node-id="req-1"]')).toHaveClass(/trail-parent/);
    await expect(page.locator('[data-node-id="arch-1"]')).toHaveClass(/lens-match/);

    await page.locator("#focus-lens-select").selectOption("open-work");
    await expect(page.locator('[data-node-id="arch-2"]')).toHaveClass(/lens-match/);

    await page.getByRole("tab", { name: "Copilot" }).click();
    await expect(page.locator(".object-editor-panel")).toContainText("Mock local copilot");
    await page.getByRole("button", { name: "Apply to local draft" }).click();
    await expect.poll(async () => page.evaluate(() => window.appState.copilotDraftApplied)).toBe(true);
    await page.getByRole("button", { name: "Mark needs Point lock" }).click();
    await expect.poll(async () => page.evaluate(() => window.appState.copilotPointLockMarked)).toBe(true);

    const preservedBefore = await page.evaluate(() => ({
      selectedNodeId: window.appState.selectedNodeId,
      viewMode: window.appState.viewMode,
      focusLens: window.appState.focusLens,
      rightPanelTab: window.appState.rightPanelTab,
      outlineExpandedIds: [...window.appState.outlineExpandedIds],
      canvasViewport: { ...window.appState.canvasViewport }
    }));

    await page.locator("#toggle-workbench-palette").click();
    await expect(page.locator(".workbench-popover-palette")).toBeVisible();
    await page.locator(".workbench-popover-palette #close-workbench-popover").click();
    await page.locator("#toggle-workbench-context").click();
    await expect(page.locator(".workbench-popover-context")).toBeVisible();
    await page.locator(".workbench-popover-context #close-workbench-popover").click();

    const preservedAfter = await page.evaluate(() => ({
      selectedNodeId: window.appState.selectedNodeId,
      viewMode: window.appState.viewMode,
      focusLens: window.appState.focusLens,
      rightPanelTab: window.appState.rightPanelTab,
      outlineExpandedIds: [...window.appState.outlineExpandedIds],
      canvasViewport: { ...window.appState.canvasViewport }
    }));

    expect(preservedAfter).toEqual(preservedBefore);
  });
});

import { expect, test } from "@playwright/test";
import path from "node:path";
import { pathToFileURL } from "node:url";

const staticMvpUrl = pathToFileURL(path.resolve(process.cwd(), "apps/static-mvp/index.html")).href;

test.describe("static MVP V2 UX polish", () => {
  test("spec template selection changes template fields while global gates stay visible", async ({ page }) => {
    await page.goto(staticMvpUrl);
    await page.waitForFunction(() => typeof window.navigate === "function");
    await page.evaluate(() => window.navigate("spec-builder"));

    const templateFields = page.locator('[data-spec-field-section="template"]');
    const globalGates = page.locator('[data-spec-field-section="global-handoff"]');

    await expect(page.locator("#template-select")).toHaveValue("template-product-spec");
    await expect(page.locator(".template-note")).not.toContainText(/reference-only/i);
    await expect(templateFields).toContainText("Layout regions");
    await expect(globalGates).toContainText("Acceptance criteria");
    await expect(globalGates).toContainText("Validation method");
    await expect(page.locator("#main-content")).toContainText("D-005 gate");

    await page.locator("#template-select").selectOption("template-review-brief");

    await expect(templateFields).toContainText("Interaction states");
    await expect(templateFields).not.toContainText("Layout regions");
    await expect(globalGates).toContainText("Acceptance criteria");
    await expect(globalGates).toContainText("Validation method");
    await expect(page.locator("#main-content")).toContainText("D-005 gate");
    await expect.poll(async () => page.evaluate(() => window.appState.specDraft.templateId)).toBe("template-review-brief");

    const activeFieldIds = await page.evaluate(() => window.getActiveSpecFields().map((field) => field.id));
    expect(activeFieldIds).not.toContain("layout-regions");
    expect(activeFieldIds).toEqual(expect.arrayContaining(["acceptance-criteria", "validation-method"]));
  });

  test("top bar handoff navigates to preview when readiness clears locally", async ({ page }) => {
    await page.goto(staticMvpUrl);
    await page.waitForFunction(() => typeof window.navigate === "function");
    await page.evaluate(() => {
      window.appState.specFields.forEach((field) => {
        field.value = field.value || field.suggestion || "Local static answer";
        field.status = "locked";
      });
      window.appState.decisions.forEach((decision) => {
        decision.status = "locked";
      });
      window.appState.specValidated = true;
      window.appState.evidenceReviewed = true;
      window.appState.reviewBlockersAcknowledged = true;
      window.refreshDerivedEvidenceState();
      window.updateHandoffReadiness();
      window.navigate("workbench");
    });

    const handoffButton = page.locator('[data-action="handoff"]');
    await expect(handoffButton).toBeEnabled();
    await handoffButton.click();

    await expect(page.locator("#main-content")).toContainText("UI / HTML Viewer");
    await expect.poll(async () => page.evaluate(() => window.appState.currentPage)).toBe("preview");
  });

  test("workbench spatial canvas keeps a subtle grid matrix under readable nodes", async ({ page }) => {
    await page.goto(staticMvpUrl);
    await page.waitForFunction(() => typeof window.navigate === "function");
    await page.evaluate(() => window.navigate("workbench"));

    const gridStyles = await page.locator(".canvas-world").evaluate((element) => {
      const style = window.getComputedStyle(element);
      return {
        backgroundImage: style.backgroundImage,
        backgroundSize: style.backgroundSize
      };
    });

    expect(gridStyles.backgroundImage).toContain("radial-gradient");
    expect(gridStyles.backgroundImage).toContain("linear-gradient");
    expect(gridStyles.backgroundSize).toContain("96px 96px");
    await expect(page.locator(".canvas-world .node-card").first()).toBeVisible();
  });
});

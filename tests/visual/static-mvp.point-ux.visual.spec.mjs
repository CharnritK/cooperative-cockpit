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
});

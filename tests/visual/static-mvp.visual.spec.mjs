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
    test(`${target.id} ${target.state} candidate screenshot`, async ({ page }, testInfo) => {
      await page.goto(staticMvpUrl);
      await page.waitForFunction(() => typeof window.navigate === "function");
      await page.evaluate((pageKey) => window.navigate(pageKey), target.pageKey);

      await expect(page.locator("#main-content")).toContainText(target.expectedText);

      const screenshotPath = testInfo.outputPath(`${target.id}-${target.state}.png`);
      await page.screenshot({
        path: screenshotPath,
        fullPage: true
      });

      await testInfo.attach(`${target.id}-${target.state}`, {
        path: screenshotPath,
        contentType: "image/png"
      });
    });
  }
});

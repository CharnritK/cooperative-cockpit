import { defineConfig } from "@playwright/test";

const viewportMatrix = [
  { name: "vp-760", width: 760, height: 900 },
  { name: "vp-1080", width: 1080, height: 900 },
  { name: "vp-1180", width: 1180, height: 900 },
  { name: "vp-1280", width: 1280, height: 900 }
];

const chromiumChannel = process.env.PLAYWRIGHT_CHROMIUM_CHANNEL;

export default defineConfig({
  testDir: "./tests/visual",
  testMatch: /.*\.visual\.spec\.mjs/,
  outputDir: "./artifacts/evidence/design-system/visual/test-results",
  reporter: [
    ["list"],
    ["json", { outputFile: "./artifacts/evidence/design-system/visual/results.json" }],
    ["html", { outputFolder: "./artifacts/evidence/design-system/visual/html-report", open: "never" }]
  ],
  fullyParallel: false,
  forbidOnly: true,
  retries: 0,
  timeout: 30000,
  use: {
    browserName: "chromium",
    ...(chromiumChannel ? { channel: chromiumChannel } : {}),
    colorScheme: "light",
    trace: "retain-on-failure",
    screenshot: "only-on-failure"
  },
  projects: viewportMatrix.map((viewport) => ({
    name: viewport.name,
    use: {
      viewport: {
        width: viewport.width,
        height: viewport.height
      }
    },
    metadata: {
      viewportId: viewport.name,
      purpose:
        viewport.width === 760
          ? "narrow/mobile-adjacent stress"
          : viewport.width === 1080
            ? "medium workspace"
            : viewport.width === 1180
              ? "known cockpit breakpoint stress"
              : "standard desktop cockpit"
    }
  }))
});

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

An **agent-governance "operating system"** wrapped around a single product prototype. There are two layers:

1. **The product** — `apps/static-mvp/`: a plain HTML/CSS/vanilla-JS prototype of the OpenClaw Cooperative Cockpit (a "Governed Workflow Studio"). No framework, no build step, no server. Open `apps/static-mvp/index.html` directly in a browser.
2. **The governance shell** — everything else (`docs/`, `scripts/`, `schemas/`, `tests/`, `.codex/`, `quality/`, `artifacts/`): policies, validation scripts, task/goal cards, role-wrapper tooling, and provenance manifests that gate how the product may change.

Most "code" work happens in layer 1; most rules that will block you live in layer 2.

## Commands

There is **no build and no dev server**. To run the app, open `apps/static-mvp/index.html` in a browser (or serve the folder statically if `file://` is blocked — the Playwright tests load it via `file://`).

```sh
npm run validate          # Full gate chain — run this before considering any change done
npm run check:concept     # Behavioral/contract checks for the static MVP (see "Gotchas")
npm run check:structure   # Required files exist
npm run check:secrets     # Secret-pattern scan across the repo
npm run test:secrets      # Unit tests for the secret scanner
npm run test:wrappers     # Offline tests for the role-wrapper scripts
```

`npm run validate` chains, in order: `check:structure`, `check:json`, `check:encoding`, `check:schemas`, `check:screen-registry`, `check:secrets`, `test:secrets`, `check:tasks`, `check:gitignore`, `check:concept`, `check:specgraph-fixtures`, `check:builder-guardrails`, `test:wrappers`, `check:gates`. All are dependency-free Node scripts under `scripts/`. `check:gates` is warn-only (reports open governance gates, never fails the build); every other step fails the chain on error.

### Visual regression (Playwright)

```sh
npx playwright install chromium                                   # one-time: install the browser
npm run test:visual                                               # all viewports, all visual specs
npm run test:visual:list                                          # list tests without running
npx playwright test -c playwright.config.mjs -g "screen-003"      # single test by title substring
npx playwright test -c playwright.config.mjs --project=vp-1280    # single viewport (vp-760|1080|1180|1280)
npx playwright test -c playwright.config.mjs --update-snapshots   # regenerate baselines after an intended UI change
```

Specs live in `tests/visual/*.visual.spec.mjs`; committed baselines are in `tests/visual/static-mvp.visual.spec.mjs-snapshots/` (8 cockpit screens × 4 viewports). **Snapshots are platform-suffixed (`-win32.png`)** — updating them on a different OS creates parallel files rather than overwriting, so regenerate on the same platform the baselines were made on. Playwright is **dev/test only**, never shipped runtime.

Storybook (`npm run storybook`, `npm run storybook:smoke`) exists but is dev/test only and not part of the product runtime.

## Architecture of the static MVP

Everything is global-scope vanilla JS coordinated through `window`. `apps/static-mvp/index.html` loads four scripts **in a fixed order that matters**:

```
src/mockData.js → src/state.js → src/router.js → src/app.js
```

- **`mockData.js`** defines `window.mockData`: the canonical, immutable seed data and the de-facto object-model contract (entities: `workspace`, `project`, `contextNodes`, `selectedContext`, `specTemplates`, `specDraft`, `specFields`, `reviewRun`, `findings`, `decisions`, `evidenceItems`, `artifactRefs`, `workPacket`, `handoffPacket`, `validationResults`, plus Workbench `nodes`/`workflowEdges`/`workbenchBoard`). Treat shapes here as a contract — `state.js`, `app.js`, and the validation scripts all assume them.
- **`state.js`** builds `window.appState` by **deep-cloning** mockData (`JSON.parse(JSON.stringify(...))`) so the UI can mutate freely without touching the seed. It also holds UI flags (`currentPage`, `selectedNodeId`, `focusLens`, `viewMode`, `canvasViewport`, `handoffReady`, …). All "state" is in-memory only and resets on reload.
- **`router.js`** exposes `window.navigate(page)` and `window.updateNavHighlight(page)`. Navigation = set `appState.currentPage`, update nav highlight, call `renderPage`. There is **no URL/history routing** — page keys are internal strings.
- **`app.js`** (~3,800 lines, single file) is the whole view layer. `window.renderPage(page)` is a `switch` that clears `#main-content` and calls a per-page `render*` function (`renderHome`, `renderWorkbench`, `renderSpecBuilder`, …). Rendering is **full-innerHTML replacement** + event listener re-binding on each navigation; there is no virtual DOM or diffing. New UI = build DOM strings/nodes and re-bind handlers the same way.

### Routes (12)

Onboarding: `landing`, `demo-entry`, `project-hub`, `project-init`. Cockpit: `home`, `workbench`, `spec-builder`, `review-runs`, `preview`, `decisions`, `trace`, `rules`. The 8 cockpit pages are the historical core (and what visual baselines cover); the 4 onboarding routes were added in GOAL-021. **Do not add routes** without a Point-approved goal.

### The readiness/gating engine (core domain logic)

`getReadinessSummary()` in `app.js` is the heart of the product: it derives `handoffBlockers` from unresolved spec fields, pending decisions, missing/unreviewed evidence, missing validation, and high-severity review items. `appState.handoffReady` (and the disabled state of the top-bar **Handoff** button) is computed from it. `getReadinessProgress()` produces the rail percentage. **`check:concept` contract-tests this logic** by loading the three scripts in a sandboxed `vm` context and asserting, e.g., that readiness can never flip to "ready" while evidence/trace are missing, and that it reaches 100% only when all gates clear. If you touch readiness, preview-sync, spec-coverage, or the Workbench node/view logic, expect those contract tests to react.

### Workbench specifics

Three view modes share one node set: `spatial` (default, a zoom/pan board positioned from `mockData.workbenchBoard`), `mixed` (requirement→architecture drilldown with siblings kept visible), and `flat` (ordered `node-1`…`node-8` grid). `check:concept` pins the exact node ordering for each mode and asserts structural CSS (e.g. canvas world transform, popover overlays, context dock) — keep those selectors/classes intact when refactoring.

### Styles

`styles/` is split into `fonts.css`, `base.css`, `layout.css`, `components.css`, `status.css`. Fonts are **local only** (`assets/fonts/`, Rajdhani/Outfit/Fira Code with OFL licenses). Status-chip color semantics are canonized in `docs/design-system/13_STATUS_LANGUAGE_CANON.md` (green=ready, amber=waiting/needs-lock, red=missing/blocked, purple=governance/handoff, cyan=active/selected, gray=neutral) and referenced by QA — match them. Asset `<link>`/`<script>` tags carry `?v=...` cache-busting query strings; bump them when changing cached CSS/JS if you want a forced reload.

## Hard constraints (enforced by validation — violating these fails CI)

The static MVP must stay **air-gapped and mock-only**. `check:builder-guardrails` scans every `apps/static-mvp/**/*.{html,css,js,mjs}` and `check:concept` re-checks storage usage. Forbidden in app code:

- **Network**: `fetch(`, `XMLHttpRequest`, `WebSocket`, `EventSource`, `sendBeacon(` — no backend, API, or external service of any kind.
- **Browser storage**: `localStorage`, `sessionStorage`, `indexedDB`/`IndexedDB` — no persistence; state resets on reload by design.
- **External resource URLs**: no `<script>`/`<link>` pointing at `http(s)://` (no CDN scripts, styles, icons, or fonts).
- **Native dialogs**: no `alert()` / `confirm()` / `prompt()` — use the in-app `showToast(message, type)` instead.
- **New dependencies**: `package.json` must add no runtime deps; even devDeps matching `tree-sitter|lsp|scip|openai|anthropic|axios|prisma|…` are rejected.
- **Unsafe action labels**: button/CTA copy must avoid execution-style verbs implying real work (e.g. "Run", "Execute", "Deploy"). The page name "Review Runs" is the allowed exception.
- **Handoff gating**: the Handoff button and export-style controls must stay disabled until `appState.handoffReady` is true; "handoff/export" produces local toast feedback only, never a real file or repo write.

`apps/static-mvp/QA_CHECKLIST.md` is the manual QA contract for the app and is the right place to confirm expected behavior per page before declaring UI work done.

## Gotchas

- **Editing any file under `apps/static-mvp/` invalidates a checksum and fails `npm run validate`.** `check:concept` recomputes a SHA-256 tree hash of `apps/static-mvp/` and compares it to the `checksum` field in `artifacts/packages/openclaw-cooperative-cockpit-mvp.manifest.json`. When it fails it prints `checksum is stale: expected sha256:<hash>`. Fix = paste that exact `sha256:...` value into the manifest's `checksum` field, then re-run. Do this as the final step after app edits.
- **`vm`-sandboxed checks load the real `app.js`.** `check:concept` executes `mockData.js`, `state.js`, and `app.js` in a fake `window`/`document` context and calls functions like `getReadinessSummary`. Top-level code that assumes a real DOM, or renaming/removing those globally-reachable functions, can break validation even if the browser app still works.
- **Onboarding routes hide after a project opens** — `syncShellState` toggles `[data-onboarding-nav]` items; project switching is reached via the top "Projects" control, not the rail.

## Working norms (governance)

This repo treats most non-trivial changes as gated. Before editing, the established protocol is to declare: task/GOAL id, branch (`agent/<task-id>-<short-name>`), allowed paths, expected files, and validation commands; after editing, report changed files, validation output, and residual risks. **Point lock** (owner approval) is required for: product scope, architecture decisions, new dependencies, external services, secrets, deployment, route additions, and any write outside declared paths. Routine docs/scaffolding edits do not need review.

Authority hierarchy when docs disagree:
- **Product canon** — `docs/product/**` (object model, screen map, scope locks).
- **Agent-governance canon** — root `OPERATING_WORKFLOW.md` (+ `docs/ops/**` for approval/concurrency/folder policy).
- **Current-state canon** — `docs/ops/STATUS.md` (the single source for "what is done"; `docs/ROADMAP.md`/`docs/TASKS.md` summarize it and must not contradict it).
- Anything under `artifacts/` is provenance/history, **not** current-state authority unless explicitly marked current.

`.codex/goals/GOAL-*.md` are task cards; their presence is **not** execution approval — several are explicitly queued-and-blocked pending Point lock.

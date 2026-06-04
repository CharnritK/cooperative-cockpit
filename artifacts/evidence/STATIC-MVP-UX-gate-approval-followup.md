# Static MVP UX Gate Approval Follow-up

## Scope

- Task: Resolve Point-reviewed UX readiness gates after the Static MVP UX readiness closeout.
- Date: 2026-06-03
- Approval source: Point-provided gate decision brief.
- Approved: Gate 1 candidate screenshot baseline promotion with conditions; Gate 3 `review-blocked` split semantic model with conditions.
- Deferred: Gate 2 final token approval.

No features, routes, dependencies, backend/API/auth/database/deployment, real AI, external connectors, browser storage persistence, runtime workflow execution, source upload, or app-driven repo-write behavior were introduced.

## Gate Decisions

### Gate 1 - Candidate Screenshot Baselines

Decision: Approved with conditions.

Implementation:

- Converted the eight static MVP screen screenshot checks in `tests/visual/static-mvp.visual.spec.mjs` from passive screenshot attachments to Playwright `toHaveScreenshot` assertions.
- Generated 32 approved snapshot PNGs under `tests/visual/static-mvp.visual.spec.mjs-snapshots/`.
- Coverage: eight static MVP screen targets across `vp-760`, `vp-1080`, `vp-1180`, and `vp-1280`.

### Gate 2 - Final Token Approval

Decision: Deferred.

Reason:

- Token contrast and reconciliation gaps remain, including `text.dim` contrast, layout dimension mismatch, and legacy CSS variable usage.
- No token JSON or active CSS token refactor was performed.

### Gate 3 - `review-blocked` Semantics

Decision: Approved with conditions, using the split semantic model.

Implementation:

- `apps/static-mvp/src/app.js` now maps direct `review-blocked` node card tone inputs to the amber/warning container tone.
- `.status-review-blocked` remains red for the internal status chip.
- Regression test added in `tests/visual/static-mvp.point-ux.visual.spec.mjs` to assert amber card tone plus red blocker chip.

## Package Integrity

The static MVP package manifest was refreshed after the app source change:

- `artifacts/packages/openclaw-cooperative-cockpit-mvp.manifest.json`
- New checksum: `sha256:ed45bf2f2fbc1cac30ac5d3bebdb8782c2eb18600cafe9a6449b914fd1210421`

## Validation

Commands:

- `npx playwright test -c playwright.config.mjs tests/visual/static-mvp.point-ux.visual.spec.mjs -g "review-blocked node uses amber card tone" --project=vp-1280`
- `npx playwright test -c playwright.config.mjs tests/visual/static-mvp.visual.spec.mjs --update-snapshots`
- `npm run check:gates`
- `npm run validate`
- `npm run test:visual`
- `git diff --check`

Results:

- Targeted regression before app change: failed because direct `review-blocked` node status rendered `status-tone-neutral` instead of the approved amber/warning tone.
- Targeted regression after app change: passed for `review-blocked` amber card tone plus red blocker chip.
- Snapshot generation: `npx playwright test -c playwright.config.mjs tests/visual/static-mvp.visual.spec.mjs --update-snapshots` passed, 40 tests, and wrote 32 approved baseline PNGs.
- `npm run check:gates`: passed with 1 intentionally open gate, final token approval.
- `npm run validate`: passed; `check:gates` warned only on final token approval.
- `npm run test:visual`: passed, 76 tests in approximately 36.7 seconds.
- `git diff --check`: passed; PowerShell reported LF/CRLF normalization warnings only.

Browser rendered QA:

- The in-app Browser rejected direct `file://` navigation by URL policy. No workaround was attempted.
- Rendered behavior is covered by repo Playwright tests, including the targeted `review-blocked` split semantic regression and full visual suite.

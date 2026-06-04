# Static MVP Workbench UX Bugfix Closeout

## Scope

- Task: Workbench UX bugfix closeout after Point-approved Gate 1 and Gate 3 decisions.
- Date: 2026-06-04
- Approval source: Point-provided Workbench bug report and implementation plan.
- Runtime exception: scoped to `apps/static-mvp/src/app.js` and static MVP QA language only.

No routes, dependencies, backend/API/auth/database/deployment, real AI, external connectors, browser storage persistence, source upload, runtime workflow execution, or app-driven repo-write behavior were introduced.

## Fixed Bugs

- Workbench node cards now derive visible readiness, status chip text, blocker counts, tooltip text, Object Outline status, context dock status, object editor rows, mock copilot blocker text and inspector readiness from `window.appState` readiness gates instead of stale `window.mockData.nodes` fields.
- Object Outline selection preserves keyboard focus after the outline subtree refreshes.
- Spatial hierarchy edges are tagged as hierarchy edges and route through vertical top/bottom anchors; workflow edges remain left-to-right.
- Legacy clickable breadcrumb branch and event binding were removed from the current three-mode Workbench surface.
- The global top-bar inspector action no longer opens `#right-inspector` on Workbench; it focuses the embedded object editor panel and leaves the shell out of `inspector-open`.
- Spatial Board header controls now live in a normal-flow header band, so Object Types, Selected Context, view mode, Lens, zoom controls, title, breadcrumb and board label no longer collide or overlay the canvas viewport.
- Object Types and Selected Context support popovers now update in place; opening, switching or closing them no longer rerenders the Workbench canvas/page shell.

## Regression Coverage

Added or updated Playwright coverage for:

- review acknowledgement updating `node-4` from `Review items` / `3 open` to `Finding resolved` / `0 open`;
- ready local gate state updating task cards for Spec Builder, Decision and Handoff nodes;
- Object Outline focus retention after selection;
- hierarchy vs workflow SVG edge routing data and path shape;
- spatial board header geometry keeping title, controls and viewport separated;
- Workbench support popovers preserving the existing canvas DOM node while switching between Object Types and Selected Context;
- absence of legacy clickable breadcrumbs in spatial, mixed and flat modes;
- Workbench inspector toggle using the embedded object editor instead of the global right inspector.

## Validation Evidence

Commands run before final validation:

- `npx playwright test -c playwright.config.mjs tests/visual/static-mvp.point-ux.visual.spec.mjs --project=vp-1280`
- `npx playwright test -c playwright.config.mjs tests/visual/static-mvp.visual.spec.mjs --project=vp-1280 -g "secondary mixed map drilldown"`
- `node --check apps/static-mvp/src/app.js`
- `npx playwright test -c playwright.config.mjs tests/visual/static-mvp.visual.spec.mjs --update-snapshots`

Observed results:

- Initial focused regression run failed before app changes on stale card state, focus loss, and missing spatial edge metadata.
- Focused regression after app changes passed: 9 tests.
- Mixed-map inspector regression passed: 1 test.
- JS syntax check passed.
- Snapshot refresh passed: 40 tests; Workbench baselines regenerated where rendering intentionally changed.
- `npm run validate` initially failed on the static MVP package checksum, then passed after refreshing `artifacts/packages/openclaw-cooperative-cockpit-mvp.manifest.json` to the validator-expected checksum `sha256:d460e705a0ef7ca2f5a05e69e8331af494853ff999f032e6c990ce2db11ae15f`.
- Final `npm run validate` passed with the intentional `check:gates` warning: final token approval remains open.
- Final `npm run test:visual` passed: 96 tests.
- `git diff --check` passed; PowerShell reported LF/CRLF normalization warnings only.
- Follow-up visual check for the circled Spatial Board header captured `artifacts/evidence/workbench-header-fix-check.png`.
- Header regression test passed in `tests/visual/static-mvp.point-ux.visual.spec.mjs`: 10 tests on `vp-1280`.
- Snapshot refresh after the header correction passed: 40 tests; all four Workbench baselines regenerated.
- Static MVP manifest checksum refreshed again after `components.css` changed: `sha256:ea2e478a32c581a552ae3ee86684be7f88d6e9fe66f29233621db6b92c09cdcd`.
- Follow-up regression for Object Types / Selected Context page refresh reproduced the bug first: the canvas marker was lost and the DOM node changed after opening Object Types.
- Follow-up fix passed the focused regression: `workbench support popovers update without rerendering the canvas`.
- Static MVP manifest checksum refreshed again after `app.js` changed: `sha256:1b7133f03a5b485826f66cc906a8b21c9f6a155c79fa723e1a091ea7e27ed8af`.
- Final follow-up `npm run validate` passed with the intentional `check:gates` warning: final token approval remains open.
- Final follow-up `npm run test:visual` passed: 104 tests.

## Open Gates

- Final token approval remains deferred.
- Candidate screenshot baselines remain approved with the condition that future visual changes regenerate baselines deliberately.
- The `review-blocked` split semantic model remains approved: amber node-card container, red blocker chip.

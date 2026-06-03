# POINT-UX-SIMPLIFICATION Evidence

## Scope

- Task ID: `POINT-UX-SIMPLIFICATION`
- Branch: `agent/POINT-UX-simplification`
- Date: 2026-06-02
- Autonomy: Point-approved bounded static-MVP UX change

Point approved this UX simplification direction:

1. Default Workbench should visually prioritize three macro layers: Context, SpecGraph, and Handoff Gates.
2. Onboarding routes should not stay visible in the persistent left rail after a project is open; project switching/onboarding access should move to a top utility affordance.
3. Project Initialize guided setup chat may react to the selected template, but only as static mock data.

## Implemented

- Added a Workbench macro-layer band for Context, SpecGraph, and Handoff Gates before the detailed Object Outline, spatial board, inspector, trace, and drill-down tooling.
- Kept full hierarchy depth available in Object Outline, Inspector, Trace, focus lenses, Mixed Map, Flat Flow, and canvas drill-down views.
- Added a top-bar Projects utility that returns to Project Hub for project switching/onboarding access.
- Hid Landing, Demo Entry, Project Hub, and Initialize from the left rail once a project page is open.
- Kept Landing -> Static Demo Entry -> Project Hub -> Project Initialize -> Workbench available as the onboarding path.
- Changed Project Initialize copy from assistant-like chat to "Static mock transcript" and template-specific fixed transcript data.

## Guardrails

No backend, API, auth, database, deployment, external connector, browser storage persistence, real AI/model execution, source upload, private data, dependency, route, screenshot baseline, or repo-write behavior was introduced.

The guided setup transcript changes browser-local render state only through fixed `mockData.js` template arrays. It does not call a model, service, backend, storage API, connector, or repository writer.

## TDD Evidence

New failing spec before implementation:

- Command: `npx playwright test -c playwright.config.mjs static-mvp.point-ux.visual.spec.mjs --project=vp-1080`
- Result: failed as expected because `.workbench-macro-layers`, the top project utility, and static transcript language were absent.

Green after implementation:

- Command: `npx playwright test -c playwright.config.mjs static-mvp.point-ux.visual.spec.mjs --project=vp-1080`
- Result: 3 passed.
- Command: `npx playwright test -c playwright.config.mjs static-mvp.goal021.visual.spec.mjs --project=vp-1080`
- Result: 2 passed after updating the stale GOAL-021 assertion from "Mock guided chat" to "Static mock transcript".

## Changed Files

- `apps/static-mvp/index.html`
- `apps/static-mvp/src/app.js`
- `apps/static-mvp/src/mockData.js`
- `apps/static-mvp/styles/components.css`
- `apps/static-mvp/QA_CHECKLIST.md`
- `tests/visual/static-mvp.point-ux.visual.spec.mjs`
- `tests/visual/static-mvp.goal021.visual.spec.mjs`
- `artifacts/packages/openclaw-cooperative-cockpit-mvp.manifest.json`
- `artifacts/evidence/POINT-UX-simplification-direction.md`
- `docs/ops/STATUS.md`
- `docs/TASKS.md`
- `docs/ROADMAP.md`

## Final Validation

Commands run:

- `npm run validate`
- `npm run test:visual:list`
- `npm run test:visual`
- `rg -n "https?://|unpkg|cdn|script src|link href" apps\static-mvp\index.html apps\static-mvp\styles apps\static-mvp\src`
- `rg -n "localStorage|sessionStorage|indexedDB|IndexedDB|fetch\(|XMLHttpRequest|WebSocket|EventSource|navigator\.sendBeacon" apps\static-mvp\index.html apps\static-mvp\styles apps\static-mvp\src`
- `rg -n "alert\(|prompt\(|confirm\(" apps\static-mvp\src apps\static-mvp\index.html`
- Browser smoke through temporary localhost server at `http://127.0.0.1:4175/index.html`

Results:

- `npm run validate` passed. It still reports the expected open governance warnings for candidate screenshot baseline approval and final token approval.
- `npm run test:visual:list` listed 60 tests in 3 visual spec files.
- `npm run test:visual` passed 60 tests.
- Active-app remote-resource source grep found local script tags and SVG namespace constants only.
- Storage/network primitive grep returned no matches for browser storage, `fetch`, `XMLHttpRequest`, `WebSocket`, `EventSource`, or `sendBeacon`.
- Native dialog grep returned no matches for `alert`, `prompt`, or `confirm`.
- Browser direct `file://` navigation was blocked by Browser policy. A temporary localhost static server was used instead, then stopped.
- Browser localhost smoke passed: page title `OpenClaw Cooperative Cockpit`, nonblank Landing and Workbench DOM, 3 macro layers, onboarding Landing rail item hidden on Workbench, 1 top Projects utility, Project Hub reached through the utility, Static mock transcript visible on Project Initialize, no-AI/no-backend/no-persistence copy visible, and 0 console warnings/errors.
- Browser screenshot evidence was captured to `C:/Users/point/AppData/Local/Temp/point-ux-project-init.png`.

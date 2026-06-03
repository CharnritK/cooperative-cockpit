# Static MVP V2 UX Polish Evidence

Date: 2026-06-03

## Scope

- Static MVP only.
- No dependencies, backend/API/auth/database/deployment, browser storage persistence, real AI/model calls, external connectors, new routes, secrets, or repo-write behavior from app code.
- Active app updates stayed in `apps/static-mvp/src/app.js`, `apps/static-mvp/styles/components.css`, and visual tests.

## Changes

- Spec Builder now uses the selected static spec template to render a template-specific field group.
- Global handoff gate fields stay visible in a separate `Global handoff gates` group and remain active for readiness: `acceptance-criteria` and `validation-method`.
- Template changes mark local spec validation stale, so readiness cannot silently reuse an old validation result after field switching.
- Top-bar Handoff opens Preview only when `window.appState.handoffReady` is true; otherwise the existing gated warning remains.
- Workbench spatial canvas adds a low-contrast dot/grid matrix under readable nodes.
- Full visual-suite blockers from existing POINT-UX locks were restored: Workbench macro layers, hidden onboarding rail entries after project open, top Projects switching, and template-reactive static Project Initialize transcript copy.

## Validation

- Targeted V2 visual spec: `npx playwright test -c playwright.config.mjs tests/visual/static-mvp.v2-ux-polish.visual.spec.mjs` -> 12 passed.
- Focused recovery visual specs: `npx playwright test -c playwright.config.mjs tests/visual/static-mvp.point-ux.visual.spec.mjs tests/visual/static-mvp.goal021.visual.spec.mjs` -> 20 passed.
- Required full visual suite: `npm run test:visual` -> 72 passed.
- Required repository validation: `npm run validate` -> passed with the existing `check_open_gates` warning for candidate screenshot promotion and final token approval.

## Manifest

- `artifacts/packages/openclaw-cooperative-cockpit-mvp.manifest.json` checksum refreshed from the repo validator's sorted sha256 tree algorithm.
- Current checksum: `sha256:d3c8787323ca9704e163039a0e8a0b5f6601117bf0fec2021a72413ee46ea9d7`.

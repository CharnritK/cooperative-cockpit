# 01 — Decisions and Product Locks

## Approved by Point

- Storybook is approved for MVP dev/test integration only.
- Playwright is approved for MVP visual regression only.
- The old eight-page cap is superseded by the GOAL-021 twelve-route local journey and the governed screen registry; current app implementation remains evidence-bound.
- Design tokens must be finalized from the current static MVP implementation, current styling, Dify-inspired workflow-studio direction, and accessibility requirements.
- Component naming and organization must be semantic, scalable, and Codex-readable.
- Mock data must be canonical, realistic, schema-backed, and contain no real PII or secrets.

## Static MVP constraints still active

- No backend.
- No API calls.
- No authentication.
- No database.
- No deployment work.
- No runtime workflow execution.
- No real AI execution.
- No real agent orchestration.
- No persistent storage unless later explicitly approved.
- No external connectors.
- No repository-write behavior from the UI.
- No CDN scripts.
- No remote fonts.
- No real secrets, credentials, or PII in mock data.
- No public/demo language implying a working orchestrator.
- Avoid user-facing action labels that imply execution, such as “Run,” except existing locked page/title contexts.
- Storybook and Playwright are dev/test only, never production runtime.

## Superseded constraint

The previous eight-page-only cap is superseded by the GOAL-021 twelve-route local journey and Point's approval to use a governed screen registry. This does not mean every registry screen is implemented. It means screen growth is allowed only through screen contracts, registry status, and approval gates.

## Current product-canon reconciliation note

The current static MVP implements twelve local routes: four Start journey routes plus eight core cockpit routes. Registry rows beyond the implemented cockpit routes remain planning/proposed surfaces only and must not be treated as implemented app scope. Product-canon edits that add or remove routes, app runtime changes, and new screen implementation still require Point lock.

## Resolved tooling decisions

| decision_id | decision | resolution | evidence |
|---|---|---|---|
| D-DS-002 | Exact Storybook package manager command | npm with root `package-lock.json`; Storybook dev/test scaffold installed as dev dependencies | `artifacts/evidence/design-system/storybook/DS-002A-storybook-scaffold.md` |
| D-DS-003 | Exact Playwright package manager command | npm with root `package-lock.json`; Playwright dev/test scaffold installed as dev dependencies | `artifacts/evidence/design-system/visual/DS-002B-playwright-scaffold.md` |

## Still-open decisions

| decision_id | decision | owner | required before |
|---|---|---|---|
| D-DS-001 | Final audited token values | Point + design-system reviewer | Applying tokens to app runtime CSS/components |
| D-DS-004 | Whether app component folders may be refactored | Point | DS-004 runtime/source migration |
| D-DS-005 | Which registry screens enter implementation next | Point | Any new screen implementation |
| D-DS-006 | Future registry-to-product-canon expansion beyond the current twelve routes | Point | Treating additional registry screens as current product canon |

## Change control rule

Any change to product scope, architecture, dependencies, external services, auth/database/deployment, runtime mutation, secrets, or final milestone acceptance requires Point lock.

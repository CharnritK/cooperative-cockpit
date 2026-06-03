# GOAL-023 Status Language and Token Canon Consistency Evidence

## Scope

- Goal: `GOAL-023 Status Language and Token Canon Consistency Slice`
- Branch: `agent/GOAL-022-claude-design-review`
- Date: 2026-06-02
- Autonomy: A2 bounded documentation/QA slice

GOAL-022 adoption review exists and identifies status-language/token-canon consistency as the smallest safe follow-on slice.

## Decision Implemented

Added documentation/QA canon only:

- `docs/design-system/13_STATUS_LANGUAGE_CANON.md` defines fixed status hue semantics.
- `apps/static-mvp/QA_CHECKLIST.md` references the canon and adds status-language QA checks.
- `docs/design-system/00_CODEX_ABSORB_FIRST.md` points agents to the new canon.

No active app visual, CSS, JavaScript, route, dependency, runtime behavior, token-value, screenshot-baseline, provenance, backend/API/auth/database/deployment, external connector, browser storage, source-upload, or repo-write change was made.

## Active Mapping

Active `apps/static-mvp/styles/status.css` already maps:

- cyan to active, selected, spec-first, guided, needs-sync;
- green to allowed, validated, covered, applied, ready, complete;
- amber to needs-lock, needs-answer, needs-decision, needs-evidence, warning, pending, revise;
- red to missing, blocked, review-blocked, unsafe, risk;
- purple to handoff, inspect, advisory;
- gray to draft, passive, neutral, unavailable.

Active `apps/static-mvp/src/app.js` renders text-labeled status chips through `renderStatusChip(status, label)` and maps runtime values through `getStatusClass(status)`.

## Deferred App Visual Gate

One visual semantics issue is intentionally deferred:

- status chips map `review-blocked` to red;
- node-card tones group `review-blocked` with amber waiting states.

This is a small active app visual semantics cleanup candidate, but GOAL-023 does not include Point approval for CSS/runtime changes. No patch was made.

## Changed Files

- `docs/design-system/13_STATUS_LANGUAGE_CANON.md`
- `apps/static-mvp/QA_CHECKLIST.md`
- `docs/design-system/00_CODEX_ABSORB_FIRST.md`
- `docs/ops/STATUS.md`
- `docs/TASKS.md`
- `docs/ROADMAP.md`
- `artifacts/evidence/GOAL-022-claude-design-system-adoption-review.md`
- `artifacts/evidence/GOAL-023-status-language-token-canon-consistency.md`
- `artifacts/packages/openclaw-cooperative-cockpit-mvp.manifest.json`

## Validation

Commands run:

- `npm run validate`
- `npm run test:visual:list`
- `npm run test:visual`
- `git diff --check`

Results:

- `npm run validate` passed after the static-MVP package manifest checksum was refreshed to `sha256:dc35714051fedc7ed479a320c4530358bdde4a5dd10f2c9b69b123e4ae10fefc` for the allowed `apps/static-mvp/QA_CHECKLIST.md` documentation change.
- `npm run validate` still reports the expected `check:gates` warnings for unapproved candidate screenshot baselines and missing final token approval.
- `npm run test:visual:list` listed 48 visual tests across the static MVP visual specs.
- `npm run test:visual` passed 48 visual tests.
- `git diff --check` passed.
- No active app visual, CSS, JavaScript, route, dependency, runtime behavior, token-value, screenshot-baseline, provenance, backend/API/auth/database/deployment, external connector, browser storage, source-upload, or repo-write change was made.

## Open Gates

- Point approval for the deferred `review-blocked` visual semantics cleanup.
- Point/design approval for final token values.
- Point/design approval for screenshot baseline promotion.
- Point/product approval for product-canon route-count reconciliation.

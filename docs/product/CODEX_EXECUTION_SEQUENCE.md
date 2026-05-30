# Codex Execution Sequence — OpenClaw Static MVP Lock

Status: Draft
Autonomy default: A2 bounded unless Point approves otherwise.

## Universal constraints

Every Codex goal must preserve:

- no backend;
- no API;
- no authentication;
- no database;
- no deployment;
- no runtime workflow execution;
- no real agent orchestration;
- no external connectors;
- no MCP implementation;
- no new dependencies;
- no new pages unless Point approves;
- no app source changes in GOAL-004.

## GOAL-004 — Lock static MVP domain model and roadmap docs

Allowed paths:

- `docs/product/**`
- `docs/ops/STATUS.md`
- `quality/QA_CHECKLIST.md`
- `apps/static-mvp/QA_CHECKLIST.md`
- `artifacts/evidence/**`

Purpose:

- Add product lock documentation.
- Add QA guardrails.
- Record validation evidence.

## GOAL-005 — Normalize static mock data to locked schema

Allowed paths:

- `apps/static-mvp/src/mockData.js`
- `apps/static-mvp/src/state.js`
- `apps/static-mvp/QA_CHECKLIST.md`
- `artifacts/evidence/**`

Purpose:

- Align static mock data to locked object model.
- Preserve existing static behavior.

## GOAL-006 — Map existing UI panels to locked object model

Allowed paths:

- `apps/static-mvp/src/app.js`
- `apps/static-mvp/styles/**`
- `apps/static-mvp/QA_CHECKLIST.md`
- `artifacts/evidence/**`

Purpose:

- Update labels and panels to reflect locked object model.
- Do not add pages.

## GOAL-007 — Add Work Packet and Handoff preview

Allowed paths:

- `apps/static-mvp/src/mockData.js`
- `apps/static-mvp/src/state.js`
- `apps/static-mvp/src/app.js`
- `apps/static-mvp/styles/**`
- `apps/static-mvp/QA_CHECKLIST.md`
- `artifacts/evidence/**`

Purpose:

- Surface Work Packet and Handoff Packet as static readiness previews.
- Do not export, write, deploy, call APIs, or execute agents.

## GOAL-008 — QA hardening and validation evidence

Allowed paths:

- `quality/**`
- `apps/static-mvp/QA_CHECKLIST.md`
- `docs/ops/STATUS.md`
- `artifacts/evidence/**`

Purpose:

- Harden QA around locked object model and scope guardrails.
- Record validation evidence.

## Required validation

Run after each goal:

```sh
npm run validate
```

Manual checks when app files change:

- Open `apps/static-mvp/index.html`.
- Verify all eight pages remain reachable.
- Verify no external requests.
- Verify no unsafe action labels.
- Verify no backend/API/auth/database/deployment/runtime behavior.
- Verify no new dependencies.

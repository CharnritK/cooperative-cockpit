# 02 Repo Inspection

## Repo access method

GitHub connector, read-only.

## Latest inspected commit

- SHA: `3f610a66c52e938e42f004b9f53adccc4f78e9c3`
- Message: `Harden gitignore validation for setup checks`

This is the latest commit visible in connector search/fetch results for this package. Local working tree status was not available.

## Files/directories inspected

- `README.md`
- `package.json`
- `.gitignore`
- `docs/ops/STATUS.md`
- `quality/QA_CHECKLIST.md`
- `.codex/goals/GOAL-001-bootstrap-agent-ready-repo.md`
- `scripts/check_gitignore.js`
- `artifacts/evidence/GOAL-003A-validation.md`
- `apps/static-mvp/index.html`
- `apps/static-mvp/README.md`
- `apps/static-mvp/BUILD_SPEC.md`
- `apps/static-mvp/QA_CHECKLIST.md`
- `apps/static-mvp/src/mockData.js`
- `apps/static-mvp/src/state.js`
- `apps/static-mvp/src/router.js`
- `apps/static-mvp/src/app.js`
- `apps/static-mvp/handoff/manifest.json`
- `apps/static-mvp/handoff/handoff-placeholder.json`

## What exists

The static MVP exists under `apps/static-mvp/`.

It uses plain HTML, CSS, and vanilla JavaScript.

It includes eight pages:

- Home
- Workbench
- Spec Builder
- Review Runs
- Preview
- Decisions
- Trace & Evidence
- Rules & Scope

Mock data exists in `apps/static-mvp/src/mockData.js`.

Client-side demo state exists in `apps/static-mvp/src/state.js`.

Handoff placeholder data exists in `apps/static-mvp/handoff/handoff-placeholder.json`.

## What is missing or not inspected

Local working tree status was not available.

No current terminal output was available for `git status --short` or `git log --oneline -5`.

The Deep Research report was not supplied.

## Current static MVP architecture summary

The app is a local static prototype. `index.html` loads local CSS files and local JS files. Routing is client-side and state is held in browser globals.

## Current mock data/state summary

Current mock data includes:

- 8 workflow nodes
- visual workflow edges
- context basket items
- protected exclusions
- spec fields
- review results
- decisions
- trace links
- rules

Current state clones mock data and includes `handoffReady: false`.

## Relevant validation commands found

- `npm run validate`
- `npm run check:structure`
- `npm run check:json`
- `npm run check:secrets`
- `npm run check:tasks`
- `npm run check:gitignore`
- `git check-ignore -v scripts/check_no_secrets.js`
- `git check-ignore -v AGENTS.md`

## Validation note

Last recorded evidence says `npm run validate` passed on `2026-05-30T01:06:24+07:00`.

This package did not run validation locally.

## Current known risks

- Handoff readiness may be difficult to demo if all fields and decisions remain incomplete.
- Existing placeholder can show blocked handoff but may need clearer primary demo copy.
- Deep Research report is missing.
- Local working tree is unknown.

## Current known open questions

- Should D-005 remain unresolved for the default demo, or should the UI show both blocked and ready examples?
- Should primary demo readiness be shown on Preview, Trace & Evidence, or Decisions?
- Should object names be locked before Codex changes mock data?

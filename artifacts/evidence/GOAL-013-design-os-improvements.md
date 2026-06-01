# GOAL-013 Design OS Improvements Evidence

## Task declaration

- Branch: `agent/GOAL-013-design-os-improvements`
- Role: Orchestrator / Builder
- Scope: validation hardening, wrapper guardrails, documentation drift cleanup, and evidence updates.
- Disallowed: staging, commit, push, PR, deployment, backend/API/auth/db/runtime/live AI, external connector work.

## Implemented improvements

- Expanded `scripts/check_structure.js` to cover the active Design OS surface, schemas, stories, wrappers, tests, docs, and handoff fixtures.
- Added `scripts/check_schemas.js` and wired schema enforcement into `npm run validate`.
- Added `scripts/check_screen_registry.js` and wired screen-registry contract/evidence checks into `npm run validate`.
- Added `scripts/check_open_gates.js` as a non-failing open governance gate warning.
- Hardened `scripts/copilot-wrapper.js` deny tools for install, release, branch rewrite, network fetch, and common file-mutation commands.
- Hardened `scripts/codex-wrapper.js` so the coder role requires explicit allowed paths from `--allowed-paths` or `ROLE_WRAPPER_ALLOWED_PATHS`.
- Expanded wrapper tests and added focused secret-pattern tests for modern token families.
- Updated wrapper, workflow, manifest, status, task, folder-structure, and backlog documentation to reduce drift.

## Local validation

`npm run validate` passed after GOAL-013 changes.

Key output:

```text
Repository structure check passed.
check_json: PASS
check_encoding: PASS
check_schemas: PASS (15 documents checked)
check_screen_registry: PASS (12 contracts, 12 registry rows)
Secret scan passed.
PASS detects modern token families
PASS allows placeholder secret values
check_task_cards: PASS (0 task cards checked)
check_gitignore: PASS
check_concept_consistency: PASS
PASS copilot planner command uses Claude Opus 4.7 plan mode
PASS copilot reviewer command denies write, publish, install, network, and merge tools
PASS codex coder command uses GPT 5.3 Codex xhigh in workspace-write with allowed paths
check_open_gates: WARN (2 open) - open governance gates remain:
- Candidate screenshots promoted to approved baselines.
- Final token approval recorded.
```

## Claude Opus 4.7 reviewer

`npm run copilot:reviewer -- "<GOAL-013 final review prompt>"` completed with Claude Opus 4.7.

Initial high-severity findings:

- H1: PowerShell documentation update introduced UTF-8 BOM and mojibake in eight markdown files.
- H2: GOAL-013 evidence still showed validation and reviewer sections as pending.

Corrections applied:

- Repaired the eight markdown files by reversing the Windows-874 mojibake round trip and saving as UTF-8 without BOM.
- Added `scripts/check_encoding.js` and wired `check:encoding` into `npm run validate` so BOM/mojibake regressions fail locally.
- Filled this evidence file with validation and reviewer results.
- Addressed medium hardening items by adding open-gate counts, making screen-registry row parsing independent of column order, extending placeholder secret allowlist coverage, and enumerating more `gh` mutation deny tools.

Final Claude Opus 4.7 re-review verdict:

```text
No blocking/high findings. Previous H1 (BOM/mojibake) and H2 (pending evidence) are resolved.
```

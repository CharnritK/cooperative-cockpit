# Goal

GOAL-DS-001 — Assimilate Design OS v4 docs only

## Purpose

Install or update the Design Operating System documentation package only. This is the safe first absorption slice so Codex can align to the package before tooling or app changes.

## Read first

- `CODEX_START_HERE.md`
- `MANIFEST.md`
- `README.md`
- `docs/design-system/00_CODEX_ABSORB_FIRST.md`
- `docs/design-system/01_DECISIONS_AND_PRODUCT_LOCKS.md`
- `docs/design-system/12_GOVERNANCE_CHECKLIST.md`

## Allowed paths

Write paths only:
- `docs/design-system/**`
- `.codex/goals/**`
- `CODEX_START_HERE.md`
- `MANIFEST.md`
- `README.md`

## Forbidden actions

- Do not add backend/API/auth/database/deployment.
- Do not add runtime mutation, persistent storage, or external connectors.
- Do not touch secrets or include real PII.
- Do not claim validation passed unless the exact command was run and output is provided.
- Do not broaden product scope.
- Do not modify files outside allowed paths.
- Do not change app code.
- Do not add dependencies.
- Do not create or run Storybook config.
- Do not create or run Playwright config.
- Do not modify package manager files.
- Do not modify `apps/static-mvp/**`.

## Required work

1. Copy the v4 package files into the allowed paths.
2. Confirm every path referenced in `CODEX_START_HERE.md`, `MANIFEST.md`, `README.md`, and this goal exists.
3. Parse every JSON file under `docs/design-system/**`.
4. Check that DS-002A, DS-002B, DS-003, DS-004, DS-005, and DS-006 remain queued and not executed.
5. Run validation commands below.
6. Report exact validation output and blockers.

## Acceptance criteria

- `CODEX_START_HERE.md` exists at repo root.
- `MANIFEST.md` exists at repo root and lists the package read order.
- `docs/design-system/00_CODEX_ABSORB_FIRST.md` exists.
- All files referenced by the read order exist.
- All JSON files parse successfully.
- No files outside allowed paths are changed.
- No app code, dependencies, Storybook config, or Playwright config are changed.

## Validation commands

| Command | Expected pass result | Failure meaning | Stop/report behavior |
|---|---|---|---|
| `python -m json.tool docs/design-system/tokens/openclaw.tokens.json >/dev/null` | exits 0 | token JSON invalid | stop, report file and error |
| `python -m json.tool docs/design-system/mock-data/openclaw.mock-data.v1.json >/dev/null` | exits 0 | mock fixture JSON invalid | stop, report file and error |
| `python -m json.tool docs/design-system/schemas/openclaw-mock-data.schema.json >/dev/null` | exits 0 | schema JSON invalid | stop, report file and error |
| `python -m json.tool docs/design-system/schemas/component-contract.schema.json >/dev/null` | exits 0 | schema JSON invalid | stop, report file and error |
| `python -m json.tool docs/design-system/schemas/screen-contract.schema.json >/dev/null` | exits 0 | schema JSON invalid | stop, report file and error |
| `python -m json.tool docs/design-system/schemas/visual-baseline.schema.json >/dev/null` | exits 0 | schema JSON invalid | stop, report file and error |
| `npm run validate` or confirmed package-manager equivalent | exits 0 | repo validation failed or script unavailable | report exact output; do not claim pass |

## Stop conditions

Stop and report if:

- any required read-first file is missing;
- the work requires files outside allowed paths;
- validation fails and cannot be fixed within this goal;
- product scope, architecture, backend/API/auth/database/deployment, runtime mutation, persistence, or external connector decisions are required;
- secrets, real PII, or confidential data appear in inputs or generated artifacts.

- Stop if repo validation requires dependency or app-code changes.
- Stop if a pre-existing validation issue blocks completion and cannot be fixed in docs-only scope.

## Final response format

```text
Verdict: PASS / PASS_WITH_WARNINGS / REVISE / BLOCK
Stopped intentionally: yes/no
Files inspected:
- [path]
Files changed:
- [path]
Validation commands run:
- [command] => [exact result]
Unresolved blockers:
- [blocker or none]
Scope deviations:
- [deviation or none]
Risks:
- [risk or none]
Next recommended goal:
- [goal id]
```

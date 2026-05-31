# Goal

GOAL-DS-006 — Playwright baselines and evidence

## Purpose

Create or document local visual baseline workflow and evidence records for approved screens/states without false pass claims.

## Read first

- `docs/design-system/09_PLAYWRIGHT_VISUAL_QA_CONTRACT.md`
- `docs/design-system/schemas/visual-baseline.schema.json`
- `docs/design-system/evidence/visual-baselines/README.md`
- `.codex/goals/GOAL-DS-006-playwright-baselines-and-evidence.md`

## Allowed paths

Write paths only:
- `tests/visual/**`
- `artifacts/evidence/design-system/visual/**`
- `docs/design-system/evidence/visual-baselines/**`
- `docs/design-system/evidence/state-coverage-matrix.md`
- `docs/design-system/schemas/visual-baseline.schema.json`

## Forbidden actions

- Do not add backend/API/auth/database/deployment.
- Do not add runtime mutation, persistent storage, or external connectors.
- Do not touch secrets or include real PII.
- Do not claim validation passed unless the exact command was run and output is provided.
- Do not broaden product scope.
- Do not modify files outside allowed paths.
- Do not change app runtime code to make screenshots pass.
- Do not create deployment or remote browser requirements.
- Do not claim baseline approval unless reviewed.
- Do not claim screenshots passed without exact Playwright output.

## Required work

1. Confirm Playwright scaffold exists from DS-002B or stop.
2. Define baseline capture workflow by screen, state, and viewport.
3. Generate or update evidence records only if screenshots actually run.
4. If screenshots cannot run locally, record exact blocker and expected evidence structure.
5. Update state coverage matrix.
6. Run validation commands and report exact output.

## Acceptance criteria

- Baseline workflow is documented.
- Viewports include 760px, 1080px, 1180px, and 1280px+.
- Evidence files are stored only in approved evidence paths.
- Failed or blocked screenshots are reported honestly.
- No runtime app code is changed.

## Validation commands

| Command | Expected pass result | Failure meaning | Stop/report behavior |
|---|---|---|---|
| `[detected-pm] run test:visual` | exits 0 if screenshots pass | visual diff or blocker exists | report exact output and paths |
| `[detected-pm] run validate` | exits 0 | repo validation failed | report exact output |
| `python -m json.tool docs/design-system/schemas/visual-baseline.schema.json >/dev/null` | exits 0 | schema invalid JSON | stop and report |

## Stop conditions

Stop and report if:

- any required read-first file is missing;
- the work requires files outside allowed paths;
- validation fails and cannot be fixed within this goal;
- product scope, architecture, backend/API/auth/database/deployment, runtime mutation, persistence, or external connector decisions are required;
- secrets, real PII, or confidential data appear in inputs or generated artifacts.


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

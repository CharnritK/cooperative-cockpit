# Goal

GOAL-DS-005 — Mock data and governed screen registry

## Purpose

Standardize canonical mock data and governed screen registry so AI prototypes, Storybook, Playwright, and Codex use the same object vocabulary.

## Read first

- `docs/design-system/06_SCREEN_REGISTRY.md`
- `docs/design-system/07_MOCK_DATA_CONTRACT.md`
- `docs/design-system/mock-data/openclaw.mock-data.v1.json`
- `docs/design-system/schemas/openclaw-mock-data.schema.json`
- `docs/design-system/schemas/screen-contract.schema.json`
- `.codex/goals/GOAL-DS-005-mock-data-and-screen-registry.md`

## Allowed paths

Write paths only:
- `docs/design-system/mock-data/**`
- `docs/design-system/schemas/**`
- `docs/design-system/06_SCREEN_REGISTRY.md`
- `docs/design-system/07_MOCK_DATA_CONTRACT.md`
- `docs/design-system/evidence/state-coverage-matrix.md`
- `artifacts/evidence/design-system/mock-data/**`

## Forbidden actions

- Do not add backend/API/auth/database/deployment.
- Do not add runtime mutation, persistent storage, or external connectors.
- Do not touch secrets or include real PII.
- Do not claim validation passed unless the exact command was run and output is provided.
- Do not broaden product scope.
- Do not modify files outside allowed paths.
- Do not add real PII or secrets.
- Do not add backend/API/persistence.
- Do not modify app runtime data files unless a later goal explicitly permits it.
- Do not claim registry screens are implemented unless repo evidence confirms it.

## Required work

1. Verify mock fixture JSON parses.
2. Validate schema strictness manually or with available JSON Schema tooling.
3. Ensure fixture covers workspace, project, context nodes, specs, review runs, findings, decisions, evidence, artifact refs, work packets, handoff packets, agent roles, validation results, QA gates, and visual baselines.
4. Update governed screen registry without claiming implementation.
5. Update state coverage matrix with required states.
6. Run validation commands and report exact output.

## Acceptance criteria

- Mock fixture parses and contains required domains.
- No real PII/secrets are present.
- Screen registry uses approval status and implementation status.
- Registry does not claim all screens are implemented.
- Schema failure examples are documented.

## Validation commands

| Command | Expected pass result | Failure meaning | Stop/report behavior |
|---|---|---|---|
| `python -m json.tool docs/design-system/mock-data/openclaw.mock-data.v1.json >/dev/null` | exits 0 | mock fixture invalid JSON | stop and report |
| `python -m json.tool docs/design-system/schemas/openclaw-mock-data.schema.json >/dev/null` | exits 0 | schema invalid JSON | stop and report |
| `python -m json.tool docs/design-system/schemas/screen-contract.schema.json >/dev/null` | exits 0 | schema invalid JSON | stop and report |
| `[detected-pm] run validate` if package manager is known | exits 0 | repo validation failed | report exact output |

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

# Goal

GOAL-DS-004 — Component taxonomy and state stories

## Purpose

Apply or propose scalable semantic component organization and add state stories for approved components without broad runtime refactors.

## Read first

- `docs/design-system/04_COMPONENT_TAXONOMY.md`
- `docs/design-system/05_COMPONENT_CONTRACTS.md`
- `docs/design-system/08_STORYBOOK_CONTRACT.md`
- `.codex/goals/GOAL-DS-004-component-taxonomy-and-stories.md`

## Allowed paths

Write paths only:
- `docs/design-system/**`
- `.storybook/**`
- `docs/design-system/stories/**`
- approved adjacent story files: `apps/static-mvp/src/**/*.stories.*`
- `artifacts/evidence/design-system/storybook/**`
Read-only inspection paths:
- `apps/static-mvp/src/**`
- `apps/static-mvp/styles/**`

## Forbidden actions

- Do not add backend/API/auth/database/deployment.
- Do not add runtime mutation, persistent storage, or external connectors.
- Do not touch secrets or include real PII.
- Do not claim validation passed unless the exact command was run and output is provided.
- Do not broaden product scope.
- Do not modify files outside allowed paths.
- Do not broadly refactor components without Point approval.
- Do not rename app runtime files in this goal unless explicitly approved.
- Do not change user-facing labels or product scope.
- Do not create stories that imply live execution.

## Required work

1. Inspect existing component/source structure as read-only.
2. Compare existing structure to taxonomy in `04_COMPONENT_TAXONOMY.md`.
3. Create a migration note if names or folders should change.
4. Add Storybook stories for approved/documented components or docs-only examples.
5. Cover required states from component contracts.
6. Run validation commands and report exact output.

## Acceptance criteria

- Component taxonomy is documented and scalable.
- Story files are limited to allowed paths.
- Stories cover key states: default, dense, empty, loading, warning, error, disabled, selected.
- No broad app refactor occurs.
- No fake live orchestration is shown in stories.

## Validation commands

| Command | Expected pass result | Failure meaning | Stop/report behavior |
|---|---|---|---|
| `[detected-pm] run validate` | exits 0 | repo validation failed | report exact output |
| `[detected-pm] run storybook -- --help` or equivalent | exits 0 | Storybook config/script unavailable | report exact output |
| `[detected-pm] run storybook:smoke` if available | exits 0 | Storybook smoke failed | report exact output |

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

# CODEX START HERE

## Purpose

This package is the Codex-absorbable Design Operating System v4 for OpenClaw Cooperative Cockpit.

## Mandatory read order

1. `CODEX_START_HERE.md`
2. `MANIFEST.md`
3. `README.md`
4. `docs/design-system/00_CODEX_ABSORB_FIRST.md`
5. `.codex/goals/GOAL-DS-001-assimilate-design-os-docs.md`

## First action

Execute **only**:

```text
.codex/goals/GOAL-DS-001-assimilate-design-os-docs.md
```

## Hard rule

Do not inspect random files first. Do not continue to DS-002A, DS-002B, DS-003, DS-004, DS-005, or DS-006 until DS-001 is complete and reported.

## DS-001 scope

During DS-001:

- Do not modify app code.
- Do not add dependencies.
- Do not set up Storybook.
- Do not set up Playwright.
- Do not run visual baselines.
- Do not change production/runtime behavior.

## Stop conditions

Stop and report if:

- a required path is missing;
- package files conflict with existing repo docs;
- validation fails and cannot be fixed inside DS-001 scope;
- app code would need to change;
- dependency changes appear necessary;
- product or architecture decisions are required.

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

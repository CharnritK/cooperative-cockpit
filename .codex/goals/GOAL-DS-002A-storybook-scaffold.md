# Goal

GOAL-DS-002A — Storybook scaffold for component isolation

## Purpose

Add approved Storybook dev/test support for component isolation and state documentation without changing production runtime behavior.

## Read first

- `CODEX_START_HERE.md`
- `MANIFEST.md`
- `docs/design-system/08_STORYBOOK_CONTRACT.md`
- `docs/design-system/04_COMPONENT_TAXONOMY.md`
- `docs/design-system/05_COMPONENT_CONTRACTS.md`
- `.codex/goals/GOAL-DS-002A-storybook-scaffold.md`

## Allowed paths

Write paths only:
- `.storybook/**`
- `docs/design-system/**`
- `artifacts/evidence/design-system/storybook/**`
- `package.json`
- exactly one detected lockfile: `package-lock.json` OR `pnpm-lock.yaml` OR `yarn.lock`
- story files only, either `docs/design-system/stories/**` or approved adjacent `*.stories.*` files for existing components

## Forbidden actions

- Do not add backend/API/auth/database/deployment.
- Do not add runtime mutation, persistent storage, or external connectors.
- Do not touch secrets or include real PII.
- Do not claim validation passed unless the exact command was run and output is provided.
- Do not broaden product scope.
- Do not modify files outside allowed paths.
- Do not modify production runtime code.
- Do not add Storybook as runtime dependency.
- Do not create stories for unapproved new components.
- Do not modify app behavior to satisfy stories.
- Do not continue if package manager is ambiguous.

## Required work

1. Detect package manager before any dependency or script change.
1. Detect the package manager before installing or adding scripts:
   ```bash
   ls package-lock.json pnpm-lock.yaml yarn.lock 2>/dev/null
   cat package.json
   ```
2. If exactly one lockfile exists, use that package manager.
3. If multiple lockfiles exist, stop and report package-manager ambiguity.
4. If no lockfile exists, stop and ask Point which package manager to use.
5. Never assume npm, pnpm, or yarn without repo evidence.
2. Inspect current component/source organization.
3. Add Storybook config only as dev/test tooling.
4. Add scripts using the detected package manager conventions.
5. Add initial stories for approved components or docs-only examples.
6. Document any app-source paths inspected.
7. Run validation commands and report exact output.

## Acceptance criteria

- Package manager is detected or Codex stops with ambiguity.
- Storybook config is dev/test only.
- No production runtime files are changed unless explicitly approved and listed.
- At least one representative story exists for a documented component or docs-only component example.
- Story states cover default, empty, warning, error, loading, disabled, and dense where relevant.
- Validation output is reported exactly.

## Validation commands

| Command | Expected pass result | Failure meaning | Stop/report behavior |
|---|---|---|---|
| `ls package-lock.json pnpm-lock.yaml yarn.lock 2>/dev/null` | exactly one lockfile, or explicit stop if none/multiple | package manager ambiguous | stop before dependency edits |
| `cat package.json` | readable package metadata | package metadata unavailable | stop and report |
| `[detected-pm] run validate` | exits 0 | repo validation failed | report exact output; do not claim pass |
| `[detected-pm] run storybook -- --help` or equivalent non-mutating check | exits 0 after scaffold | Storybook script/config invalid | stop and report |
| `[detected-pm] run storybook:smoke` if added | exits 0 | smoke check failed | stop and report |

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

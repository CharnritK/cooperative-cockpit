# Goal

GOAL-DS-002B — Playwright visual regression scaffold

## Purpose

Add approved Playwright visual regression scaffolding for local screenshot QA without deployment, backend, API, or production behavior changes.

## Read first

- `CODEX_START_HERE.md`
- `MANIFEST.md`
- `docs/design-system/09_PLAYWRIGHT_VISUAL_QA_CONTRACT.md`
- `docs/design-system/evidence/visual-baselines/README.md`
- `.codex/goals/GOAL-DS-002B-playwright-scaffold.md`

## Allowed paths

Write paths only:
- `tests/visual/**`
- `artifacts/evidence/design-system/visual/**`
- `docs/design-system/evidence/visual-baselines/**`
- `playwright.config.*`
- `package.json`
- exactly one detected lockfile: `package-lock.json` OR `pnpm-lock.yaml` OR `yarn.lock`

## Forbidden actions

- Do not add backend/API/auth/database/deployment.
- Do not add runtime mutation, persistent storage, or external connectors.
- Do not touch secrets or include real PII.
- Do not claim validation passed unless the exact command was run and output is provided.
- Do not broaden product scope.
- Do not modify files outside allowed paths.
- Do not deploy.
- Do not add backend, API, auth, database, external connectors, or runtime execution.
- Do not change app code to make screenshots pass.
- Do not claim screenshots passed without exact Playwright output.
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
2. Add Playwright as dev/test visual regression tooling only.
3. Define viewport matrix: 760px, 1080px, 1180px, 1280px+.
4. Add visual test scaffolding for local static MVP pages only.
5. Write baseline/evidence storage policy.
6. Run validation commands and report exact output.

## Acceptance criteria

- Package manager is detected or Codex stops with ambiguity.
- Playwright is dev/test only.
- Viewport matrix is encoded in test configuration or test data.
- Evidence path is documented.
- No app runtime code is changed.
- No baselines are claimed as approved unless screenshots actually ran and were reviewed.

## Validation commands

| Command | Expected pass result | Failure meaning | Stop/report behavior |
|---|---|---|---|
| `ls package-lock.json pnpm-lock.yaml yarn.lock 2>/dev/null` | exactly one lockfile, or explicit stop if none/multiple | package manager ambiguous | stop before dependency edits |
| `cat package.json` | readable package metadata | package metadata unavailable | stop and report |
| `[detected-pm] run validate` | exits 0 | repo validation failed | report exact output |
| `[detected-pm] run test:visual -- --help` or equivalent non-mutating check | exits 0 after scaffold | visual test script/config invalid | stop and report |
| `[detected-pm] run test:visual` if requested by Point | exits 0 | visual regression failed | report exact output and diff paths |

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

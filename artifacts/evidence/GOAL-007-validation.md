# GOAL-007 validation evidence

Date: 2026-05-31
Branch: `agent/GOAL-007-work-packet-handoff-preview`
Scope: bounded static Work Packet and derived Handoff Packet preview implementation.

## Scope check

Changed files are limited to approved GOAL-007 paths:

- `apps/static-mvp/src/mockData.js`
- `apps/static-mvp/src/app.js`
- `apps/static-mvp/styles/components.css`
- `apps/static-mvp/QA_CHECKLIST.md`
- `artifacts/evidence/GOAL-007-browser-smoke.spec.js`
- `artifacts/evidence/GOAL-007-validation.md`

No dependencies, backend, API, auth, database, deployment, runtime workflow execution, real orchestration, external connectors, MCP, secrets, real export, filesystem API, new page, or app-driven repo write was introduced.

## Point approval

Point approved GOAL-007 with:

- Work Packet as core.
- Handoff Packet as derived static preview.
- Agent Roles as embedded metadata only.

## TDD red check

Initial GOAL-007 browser smoke was run before implementation. It failed on the first missing requirement:

```text
Expected substring: Work Packet summary
Received string: Preview ... Static Handoff Packet Preview ...
```

That confirmed the smoke test detected the missing Work Packet surface before production code changed.

## Browser smoke

Command:

```powershell
$candidate = Get-ChildItem -Path $env:LOCALAPPDATA\npm-cache\_npx -Recurse -File -Filter index.js -ErrorAction SilentlyContinue | Where-Object { $_.FullName -like '*node_modules\@playwright\test\index.js' } | Select-Object -First 1
if (-not $candidate) { throw 'Could not locate transient @playwright/test package in npm cache.' }
$env:NODE_PATH = (Split-Path (Split-Path (Split-Path $candidate.FullName -Parent) -Parent) -Parent)
npx --yes --package @playwright/test playwright test artifacts/evidence/GOAL-007-browser-smoke.spec.js --reporter=line --output=artifacts/evidence/GOAL-007-playwright-output
```

Output:

```text
Running 1 test using 1 worker

[1/1] artifacts\evidence\GOAL-007-browser-smoke.spec.js:5:1 - GOAL-007 surfaces Work Packet and derived static Handoff Packet preview
  1 passed (2.2s)
```

Observed coverage:

- Preview shows Work Packet summary.
- Preview states Work Packet is the core object.
- Preview states Agent Roles are embedded metadata only.
- Preview shows Derived static Handoff Packet Preview.
- Handoff preview states it is derived from Work Packet, Decisions, Evidence, and Validation Results.
- Preview includes readiness status, blocked-by reasons, allowed paths, forbidden actions, acceptance criteria, and validation commands.
- Handoff button is disabled while static gates are blocked.
- After mock static gates are cleared inside the browser test, the Handoff button enables and clicking it shows the static placeholder alert: `Static handoff preview is available. No files are written.`
- All eight existing pages remain reachable and non-empty.
- Browser console errors: none captured.
- Remote HTTP(S) requests: none captured.

## Validation commands

Command:

```powershell
npm run validate
```

Output:

```text
> cooperative-cockpit-repo-setup@1.0.0 validate
> npm run check:structure && npm run check:json && npm run check:secrets && npm run check:tasks && npm run check:gitignore

> cooperative-cockpit-repo-setup@1.0.0 check:structure
> node scripts/check_structure.js

check_structure: PASS

> cooperative-cockpit-repo-setup@1.0.0 check:json
> node scripts/check_json.js

check_json: PASS

> cooperative-cockpit-repo-setup@1.0.0 check:secrets
> node scripts/check_no_secrets.js

check_no_secrets: PASS

> cooperative-cockpit-repo-setup@1.0.0 check:tasks
> node scripts/check_task_cards.js

check_task_cards: PASS (0 task cards checked)

> cooperative-cockpit-repo-setup@1.0.0 check:gitignore
> node scripts/check_gitignore.js

check_gitignore: PASS
```

Command:

```powershell
git diff --check
```

Output:

```text
warning: in the working copy of 'apps/static-mvp/QA_CHECKLIST.md', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'apps/static-mvp/src/app.js', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'apps/static-mvp/src/mockData.js', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'apps/static-mvp/styles/components.css', LF will be replaced by CRLF the next time Git touches it
```

Exit code: `0`.

## Scope/unsafe text scan

Command:

```powershell
rg -n -i "real export|write to repo|filesystem API|runtime workflow|real agent orchestration|external connectors|MCP|backend|database|deployment|auth|API key|execute workflow|run workflow" apps/static-mvp/src/mockData.js apps/static-mvp/src/app.js apps/static-mvp/QA_CHECKLIST.md artifacts/evidence/GOAL-007-browser-smoke.spec.js artifacts/evidence/GOAL-007-validation.md
```

Assessment: matches are guardrails, protected-surface labels, static-safety disclaimers, QA checks, or evidence text. No new live export, repo write, filesystem API, backend/API/auth/database/deployment, runtime workflow execution, real orchestration, external connector, MCP, or secret-handling behavior was introduced.

## Manual QA notes

- Work Packet is visible on Preview as the core object.
- Handoff Packet is presented as a derived static preview.
- Readiness is derived from mock static state and remains blocked by current local gates until the browser test clears mock state.
- Handoff behavior remains static and does not export, write files, call APIs, deploy, or create a real handoff.

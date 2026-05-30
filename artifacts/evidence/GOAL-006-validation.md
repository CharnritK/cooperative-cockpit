# GOAL-006 validation evidence

Date: 2026-05-31
Branch: `agent/GOAL-006-map-ui-to-locked-model`
Scope: bounded static MVP UI mapping to the locked object model.

## Scope check

Changed files are limited to the approved GOAL-006 paths:

- `apps/static-mvp/src/app.js`
- `apps/static-mvp/QA_CHECKLIST.md`
- `artifacts/evidence/GOAL-006-browser-smoke.spec.js`
- `artifacts/evidence/GOAL-006-validation.md`

No dependencies, backend, API, auth, database, deployment, runtime workflow execution, real orchestration, external connectors, MCP, secrets, new pages, or router key changes were introduced.

## TDD red check

Initial GOAL-006 browser smoke was run before the UI mapping was implemented. It failed on the first required locked-model label:

```text
expected #main-content to contain text "Project Overview"
```

That failure confirmed the smoke test detected the missing GOAL-006 UI mapping before implementation.

## Browser smoke

Command:

```powershell
$candidate = Get-ChildItem -Path $env:LOCALAPPDATA\npm-cache\_npx -Recurse -File -Filter index.js -ErrorAction SilentlyContinue | Where-Object { $_.FullName -like '*node_modules\@playwright\test\index.js' } | Select-Object -First 1
if (-not $candidate) { throw 'Could not locate transient @playwright/test package in npm cache.' }
$env:NODE_PATH = (Split-Path (Split-Path (Split-Path $candidate.FullName -Parent) -Parent) -Parent)
npx --yes --package @playwright/test playwright test artifacts/evidence/GOAL-006-browser-smoke.spec.js --reporter=line --output=artifacts/evidence/GOAL-006-playwright-output
```

Output:

```text
Running 1 test using 1 worker

[1/1] artifacts\evidence\GOAL-006-browser-smoke.spec.js:5:1 - GOAL-006 UI maps existing pages to locked object model
  1 passed (2.7s)
```

Observed coverage:

- Home contains Project Overview, Project object, Artifact Reference, Work Packet, and Selected Context.
- Workbench contains Cockpit object map, locked object palette, and Selected Context.
- Review Runs identifies Review Run object and Finding objects; Inspect findings renders three Finding cards.
- Trace & Evidence contains Evidence item detail, Artifact Reference, Source object, and Target object.
- All eight existing pages remain reachable and non-empty.
- Top-bar Handoff control remains disabled.
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
```

Exit code: `0`.

## Unsafe-label scan

Command:

```powershell
rg -n -i "Start review checks|Run workflow|Execute|Deploy|Export|Generate|Launch|Trigger|Connect account|Login|Auth|API key|Database|Backend|MCP|Connector" apps/static-mvp/src/app.js apps/static-mvp/QA_CHECKLIST.md artifacts/evidence/GOAL-006-browser-smoke.spec.js
```

Output:

```text
apps/static-mvp/src/app.js:550:    <div class="static-notice">Ready means static/mock readiness only. The preview does not write files, call APIs, deploy, or trigger real Codex work.</div>`;
apps/static-mvp/src/app.js:720:      <div class="static-notice">Local only / Mock data / Inspect-only. This inspector updates browser mock state only. It does not call AI services, mutate runtime state, write repositories or deploy artifacts.</div>
apps/static-mvp/src/app.js:966:    <div class="static-notice">This is a static packet preview from mock data. It does not write files, scan a repository, call an API, deploy, or create a real handoff.</div>`;
apps/static-mvp/src/app.js:1348:    subtitle: 'Inspect-only Review Run and Finding objects. They never execute code, mutate runtime state, or touch repositories.',
apps/static-mvp/src/app.js:1525:      <div class="static-notice">This decision only gates the static handoff preview. It does not approve live Codex work, repository changes, deployment, connectors, or runtime workflow work.</div>`;
apps/static-mvp/QA_CHECKLIST.md:12:6. **Workbench interaction** - Selecting a Context Node highlights it and opens the right inspector. Visual connectors render between nodes from `mockData.workflowEdges`. The primary demo strip reads "rough context -> governed spec -> decision/evidence gate -> handoff preview". The locked object palette lists static cockpit object types, not executable workflow nodes. Clicking "Add selected context" adds the node to Selected Context. Selected Context lists included context and protected exclusions. Removing items and clearing Selected Context update the view.
apps/static-mvp/QA_CHECKLIST.md:37:- **Protected surfaces** - Runtime state, secrets and repo write authority are listed under protected exclusions and cannot be added to Selected Context.
apps/static-mvp/QA_CHECKLIST.md:47:- **Static-only object semantics** - Work Packet and Handoff Packet surfaces remain static previews and do not imply export, repo writes, live validation, runtime execution, connectors, auth, database persistence or deployment.
apps/static-mvp/QA_CHECKLIST.md:53:- **Operator node cards** - Nodes read as configurable workflow operators, not generic process cards. Each node shows a colored type icon, title, config/model/status rows, input/output connector handles and a subtle selected state.
```

Assessment: matches are protective disclaimers, documentation checks, or object-model descriptions. No unsafe button or action label was added.

Stale-label command:

```powershell
rg -n "Start review checks|OpenClaw Node Families|Context Basket|context basket|Context items|Pending locks" apps/static-mvp/src/app.js apps/static-mvp/QA_CHECKLIST.md; if ($LASTEXITCODE -eq 1) { 'No stale GOAL-006 labels found.'; exit 0 } elseif ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
```

Output:

```text
No stale GOAL-006 labels found.
```

## Manual QA notes

- Existing eight-page navigation is preserved: Home, Workbench, Spec Builder, Review Runs, Preview, Decisions, Trace & Evidence, Rules & Scope.
- All GOAL-006 actions remain static, inspect-only, local mock-state, or handoff-gated.
- No new page, router key, live execution control, backend/API/auth/database/deployment surface, connector, MCP, or dependency was introduced.

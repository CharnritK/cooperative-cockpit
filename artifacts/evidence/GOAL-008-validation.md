# GOAL-008 validation evidence

Date: 2026-05-31
Branch: `agent/GOAL-008-qa-hardening-evidence`
Scope: bounded QA/documentation closeout after GOAL-007.

## Scope check

Changed files are limited to approved GOAL-008 paths:

- `quality/QA_CHECKLIST.md`
- `quality/STATIC_MVP_OBJECT_MODEL_QA_ADDENDUM.md`
- `apps/static-mvp/QA_CHECKLIST.md`
- `docs/ops/STATUS.md`
- `artifacts/evidence/GOAL-008-browser-qa.spec.js`
- `artifacts/evidence/GOAL-008-validation.md`

No app source, product feature, dependency, backend, API, auth, database, deployment, runtime workflow execution, real orchestration, external connector, MCP, secret, or product scope change was introduced.

## Product docs reviewed

The GOAL-008 QA closeout reviewed the current product docs under `docs/product/`:

- `BUILD_DEFER_KILL_REGISTER.md`
- `CLAIM_REGISTER.md`
- `CODEX_EXECUTION_SEQUENCE.md`
- `GAP_BACKLOG.md`
- `POINT_LOCK_DECISIONS.md`
- `QA_OBJECT_MODEL_CHECKLIST.md`
- `SCOPE_GUARDRAILS_AND_POINT_LOCKS.md`
- `SOURCE_REGISTER.md`
- `STATIC_MVP_GOLDEN_SCENARIO.md`
- `STATIC_MVP_MOCK_DATA_SPEC.md`
- `STATIC_MVP_OBJECT_MODEL.md`
- `STATIC_MVP_ROADMAP.md`
- `STATIC_MVP_SCREEN_MAP.md`

Review outcome: QA closeout needs to preserve the locked object model, current eight-page boundary, no-network behavior, no unsafe labels, static-only handoff readiness and no backend/API/auth/database/deployment/runtime/orchestration/connector/MCP scope creep.

## QA hardening added

- `quality/QA_CHECKLIST.md` now includes a GOAL-008 static MVP QA closeout section for object visibility, scope-creep checks, handoff readiness, no-network evidence, unsafe-label evidence and closeout evidence.
- `quality/STATIC_MVP_OBJECT_MODEL_QA_ADDENDUM.md` now includes handoff-readiness and browser-evidence checks.
- `apps/static-mvp/QA_CHECKLIST.md` now includes a GOAL-008 closeout gate and explicit closeout evidence checklist.
- `docs/ops/STATUS.md` now reflects GOAL-005 through GOAL-008 evidence and the current static MVP closeout baseline.

## Browser/manual QA evidence

Command:

```powershell
$candidate = Get-ChildItem -Path $env:LOCALAPPDATA\npm-cache\_npx -Recurse -File -Filter index.js -ErrorAction SilentlyContinue | Where-Object { $_.FullName -like '*node_modules\@playwright\test\index.js' } | Select-Object -First 1
if (-not $candidate) { throw 'Could not locate transient @playwright/test package in npm cache.' }
$env:NODE_PATH = (Split-Path (Split-Path (Split-Path $candidate.FullName -Parent) -Parent) -Parent)
npx --yes --package @playwright/test playwright test artifacts/evidence/GOAL-008-browser-qa.spec.js --reporter=line --output=artifacts/evidence/GOAL-008-playwright-output
```

Output:

```text
Running 1 test using 1 worker

[1/1] artifacts\evidence\GOAL-008-browser-qa.spec.js:5:1 - GOAL-008 static MVP QA closeout covers pages, network, labels, and object-model surfaces
  1 passed (2.7s)
```

Observed coverage:

- All eight current pages are reachable and non-empty: Home, Workbench, Spec Builder, Review Runs, Preview, Decisions, Trace & Evidence, Rules & Scope.
- Navigation count remains eight; no ninth page appears.
- Object-model surfaces are visible: Project, Context Node, Selected Context, Spec Draft readiness, Review Run, Findings, Decisions, Evidence, Artifact Reference, Work Packet, derived Handoff Packet and Validation/Rules surfaces.
- Handoff and gated-preview controls remain disabled while static readiness is blocked.
- Browser console errors: none captured.
- Remote HTTP(S) requests: none captured.
- Button/CTA unsafe-label scan in the browser found no live-action labels matching run, execute, deploy, export, login, authenticate, connect account, start workflow or run workflow.

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

Initial output found one fixable documentation issue:

```text
quality/QA_CHECKLIST.md:47: trailing whitespace.
```

Fix: removed the trailing whitespace in `quality/QA_CHECKLIST.md`.

Final output:

```text
warning: in the working copy of 'apps/static-mvp/QA_CHECKLIST.md', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'docs/ops/STATUS.md', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'quality/QA_CHECKLIST.md', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'quality/STATIC_MVP_OBJECT_MODEL_QA_ADDENDUM.md', LF will be replaced by CRLF the next time Git touches it
```

Exit code: `0`.

## Scope/unsafe text scan

Command:

```powershell
rg -n -i "\b(run workflow|execute workflow|deploy|export|login|authenticate|connect account|real export|filesystem API|write to repo|backend|database|runtime workflow|real agent orchestration|external connector|MCP)\b" apps/static-mvp/QA_CHECKLIST.md quality docs/product artifacts/evidence/GOAL-008-browser-qa.spec.js
```

Assessment: matches are guardrails, deferred-scope notes, QA checks, product constraints or evidence/test terms. They do not introduce app behavior or user-facing live-action controls.

## Unresolved issues

- No source change was required.
- No product decision was required.
- No validation failure remains within GOAL-008 scope.

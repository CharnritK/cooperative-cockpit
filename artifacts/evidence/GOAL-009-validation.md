# GOAL-009 Validation Evidence

## Scope

- Task: canon reconciliation for authoritative sources, GOAL-004 through GOAL-008 status clarity, object terminology, handoff readiness semantics, manifests/checksums, and duplicate setup package cleanup.
- Branch: `agent/GOAL-009-canon-reconciliation`
- Baseline HEAD before edits: `5d9d9e4`
- Source-control publication: not staged, committed, pushed, merged, or PR-created.

## Changes Validated

- Declared source authority:
  - Product canon: `docs/product/**`
  - Agent governance canon: root `OPERATING_WORKFLOW.md` with `docs/ops/**` as supporting governance
  - Current-state canon: `docs/ops/STATUS.md`
- Reconciled active task/status docs so GOAL-004 through GOAL-008 are complete or explicitly package-local historical.
- Normalized current object terminology:
  - `Selected Context` replaces live `Context Basket` wording.
  - `Decision` with state replaces live `Decision Lock` wording.
  - `Artifact Reference` replaces generic current app labels where the canonical object is an artifact reference.
- Hardened static handoff readiness:
  - Handoff `ready` cannot be true while required evidence, trace, decision, validation, or review state is missing.
  - Preview `Up to date` and spec `Covered` labels now depend on full readiness, not field lock status alone.
- Added `scripts/check_concept_consistency.js` and wired it into `npm run validate`.
- Updated/marked manifests and checksums as current or historical.
- Removed stale duplicate active repo surface: `cooperative-cockpit-repo-setup-final/`.

## Independent Sub-Agent Audit

Read-only sub-agent `019e7a7a-571a-77a0-977a-ff86bb2c9bde` found one high-severity issue:

- Preview could show `Up to date` and field-level `Covered` when handoff readiness was still blocked.

Fix applied:

- Added `getPreviewSyncStatus()` and `getSpecCoverageRows()` in `apps/static-mvp/src/app.js`.
- Extended `scripts/check_concept_consistency.js` to fail if preview sync or coverage outruns readiness.

The same audit found medium terminology cleanup items in current app/handoff surfaces. Those were normalized; remaining old terms are historical research/evidence or explicit rename mapping tables.

## Validation Commands

### Concept Consistency

Command:

```powershell
npm run check:concept
```

Result:

```text
check_concept_consistency: PASS
```

### Full Repository Validation

Command:

```powershell
npm run validate
```

Result:

```text
check_structure: PASS
check_json: PASS
check_no_secrets: PASS
check_task_cards: PASS (0 task cards checked)
check_gitignore: PASS
check_concept_consistency: PASS
```

### Diff Whitespace Check

Command:

```powershell
git diff --check
```

Result:

```text
Exit code 0. Only Git LF-to-CRLF working-copy warnings were emitted.
```

### Browser Smoke

Initial direct `npx --yes -p @playwright/test playwright test ...` failed before running tests because repo test files could not resolve `@playwright/test` from the temporary npx cache.

Passing command, without adding dependencies to the repo:

```powershell
$npxRoot = Join-Path $env:LOCALAPPDATA 'npm-cache\_npx\420ff84f11983ee5\node_modules'
$env:NODE_PATH = $npxRoot
$out = Join-Path $env:TEMP 'cooperative-cockpit-goal009-playwright'
if (Test-Path $out) { Remove-Item -LiteralPath $out -Recurse -Force }
node "$npxRoot\@playwright\test\cli.js" test artifacts/evidence/GOAL-007-browser-smoke.spec.js artifacts/evidence/GOAL-008-browser-qa.spec.js --reporter=line --output=$out
```

Result:

```text
2 passed (3.2s)
Continuation rerun: 2 passed (2.6s)
```

## Residual Risk

- Historical research and older evidence files intentionally retain old terminology as provenance. Current app, product, governance, handoff, and schema surfaces use the reconciled canon or explicit rename mappings.
- The duplicate setup folder removal is a broad tracked deletion by design; the repo root already contains the active scaffold.

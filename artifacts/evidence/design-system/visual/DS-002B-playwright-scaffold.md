# DS-002B Playwright Scaffold Evidence

Status: PASS_WITH_WARNINGS
Date: 2026-06-01

## Scope

- Package manager: npm.
- Lockfile: `package-lock.json`.
- Playwright role: local visual regression scaffolding only.
- Runtime app changes: none.
- Baseline approval: not claimed.

## Files Added Or Updated

- `playwright.config.mjs`
- `tests/visual/static-mvp.visual.spec.mjs`
- `artifacts/evidence/design-system/visual/DS-002B-playwright-scaffold.md`
- `docs/design-system/evidence/visual-baselines/README.md`
- `package.json`
- `package-lock.json`

## Viewport Matrix

| viewport_id | width | height | purpose |
|---|---:|---:|---|
| vp-760 | 760 | 900 | narrow/mobile-adjacent stress |
| vp-1080 | 1080 | 900 | medium workspace |
| vp-1180 | 1180 | 900 | known cockpit breakpoint stress |
| vp-1280 | 1280 | 900 | standard desktop cockpit |

## Local Static MVP Targets

The scaffold targets the existing static MVP at `apps/static-mvp/index.html` by file URL.

Covered targets:
- `screen-001-operator-home`
- `screen-002-workbench`
- `screen-003-spec-builder`
- `screen-004-review-runs`
- `screen-005-static-preview`
- `screen-006-decision-log`
- `screen-007-trace-evidence`
- `screen-008-rules-scope`

## Validation

Command:

```powershell
@('package-lock.json','pnpm-lock.yaml','yarn.lock') | Where-Object { Test-Path -LiteralPath $_ }
```

Result:

```text
package-lock.json
PASS exactly one lockfile: package-lock.json
```

Command:

```powershell
npm run test:visual -- --help
```

Result: exit `0`; Playwright Test help rendered.

Command:

```powershell
npm run test:visual:list
```

Result:

```text
Total: 32 tests in 1 file
```

Command:

```powershell
python -m json.tool docs/design-system/schemas/visual-baseline.schema.json
```

Result: exit `0`.

Command:

```powershell
$env:PLAYWRIGHT_CHROMIUM_CHANNEL='msedge'; npm run test:visual
```

Result:

```text
32 passed (23.1s)
```

Output paths:
- `artifacts/evidence/design-system/visual/results.json`
- `artifacts/evidence/design-system/visual/test-results/`
- `artifacts/evidence/design-system/visual/html-report/`

## Browser Execution Note

The config supports an optional local Chromium channel via `PLAYWRIGHT_CHROMIUM_CHANNEL`, for example `msedge`, so local QA can use an already-installed browser without downloading Playwright-managed browser binaries.

## Remaining Gaps

- Candidate screenshots are not approved baselines until reviewed.
- The first attempted run exposed a scaffold issue at `vp-760`: nav buttons were not reachable by the same locator as desktop. The test was corrected to use the app's existing `window.navigate(pageKey)` route function without editing app runtime files.
- DS-006 reviewer inspection is recorded; approved baseline promotion remains a separate Point/design reviewer gate.

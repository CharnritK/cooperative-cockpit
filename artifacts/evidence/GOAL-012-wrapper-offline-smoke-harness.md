# GOAL-012 Wrapper Offline Smoke Harness

## Task Declaration
- Role: Builder (implementation coder)
- Goal: `GOAL-012-wrapper-offline-smoke-harness`
- Allowed paths used:
  - `scripts/copilot-wrapper.js`
  - `scripts/codex-wrapper.js`
  - `tests/wrappers/wrappers.test.js`
  - `package.json`
  - `artifacts/evidence/GOAL-012-wrapper-offline-smoke-harness.md`

## Assumptions
- "Keep CLI behavior unchanged" means preserving CLI contract (usage/help/error/exit behavior and command routing) while making module imports side-effect free.
- The requirement "explicit xhigh if needed to match intent" is applied to both Codex roles so reasoning effort is explicit and testable.

## Summary of Changes
- Refactored both wrapper scripts to avoid running live subprocesses when imported.
- Added exported pure helpers for:
  - CLI arg parsing
  - command argument vector building
  - timeout resolution
- Kept wrapper entrypoint behavior via `if (require.main === module) { process.exit(...) }`.
- Added Node built-in `node:test` coverage in `tests/wrappers/wrappers.test.js` with mocked `spawnSync` (no `gh`, `copilot`, or `codex` execution).
- Added npm script:
  - `test:wrappers`
- Updated `validate` to include `npm run test:wrappers`.

## Role Sequence Evidence

- Claude Opus 4.7 planner selected an offline wrapper test harness as the highest-value safe improvement after GOAL-011.
- Claude Opus 4.7 reviewer identified wrapper permission and validation gaps, plus stale design OS documentation risks.
- Codex manager (`gpt-5.5`, `xhigh`, read-only) selected `GOAL-012-wrapper-offline-smoke-harness` as the best implementable batch without Point approval.
- Codex coder (`gpt-5.3-codex`, `xhigh`, workspace-write) implemented GOAL-012 within the declared allowed paths.

## Validation Commands
Run from repo root:

```powershell
npm run test:wrappers
npm run validate
```

## Validation Results

### Wrapper offline tests

Command:

```powershell
npm run test:wrappers
```

Result:

```text
tests 10
pass 10
fail 0
duration_ms 33.3199
```

### Repository validation

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
test:wrappers: PASS (10 tests, 10 pass, 0 fail)
```

## Residual Risk

- The new wrapper tests verify local command construction and import safety only. They do not prove GitHub Copilot's live `--deny-tool` enforcement semantics.
- No live Copilot or Codex execution was added to `npm run validate`; this keeps validation offline and deterministic.

## Final Claude Reviewer Pass

Command:

```powershell
npm run copilot:reviewer -- "Read-only final review..."
```

Result:

```text
NO_BLOCKING_OR_HIGH_FINDINGS
```

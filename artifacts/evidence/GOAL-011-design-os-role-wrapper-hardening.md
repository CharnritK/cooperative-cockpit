# GOAL-011 Design OS Role Wrapper Hardening

## Task Declaration

- Branch: `agent/GOAL-011-design-os-role-wrapper-hardening`
- Task ID: `GOAL-011`
- Intended work: harden the Claude/Codex role wrappers used for design OS planning, review, manager, and coder passes.
- Allowed paths:
  - `scripts/copilot-wrapper.js`
  - `scripts/codex-wrapper.js`
  - `docs/copilot-role-wrapper.md`
  - `package.json`
  - `artifacts/evidence/GOAL-011-design-os-role-wrapper-hardening.md`
  - `artifacts/packages/openclaw-cooperative-cockpit-mvp.manifest.json`
  - `docs/ops/STATUS.md`

## Advisory Review Inputs

- Claude planner was invoked through `npm run copilot:planner`.
- Claude reviewer was invoked through `npm run copilot:reviewer`.
- Reviewer findings prioritized:
  - `codex:manager` and `codex:coder` were no-op prompt printers.
  - Copilot planner/reviewer wrapper used overly broad `--allow-all-tools` plus `--allow-all-paths`.
  - Work was on `main` instead of an agent task branch.
  - `npm run validate` failed because the static MVP package manifest checksum was stale.

## Changes Made

- `scripts/copilot-wrapper.js`
  - Keeps GitHub Copilot usage limited to Claude planner/reviewer roles.
  - Adds explicit `gh copilot -- ...` argument forwarding.
  - Normalizes composed prompt newlines before Windows PowerShell invocation to avoid multi-line prompt hangs.
  - Keeps repo-local path scope by removing `--allow-all-paths`.
  - Denies file write tool and common destructive/publishing shell commands. This is a bounded advisory wrapper, not a complete shell allowlist sandbox.

- `scripts/codex-wrapper.js`
  - Replaces the prompt-printing no-op with real `codex exec` invocations.
  - `manager` uses `gpt-5.5`, `read-only` sandbox, and `xhigh` reasoning config.
  - `coder` uses `gpt-5.3-codex` and `workspace-write` sandbox.
  - Uses installed Codex Node entrypoint candidates directly on Windows to avoid `.cmd` quoting and `EPERM` issues.
  - Adds a default 30-minute child-process timeout, overridable with `ROLE_WRAPPER_TIMEOUT_MS`.

- `docs/copilot-role-wrapper.md`
  - Documents the split: Claude through GitHub Copilot, GPT roles through Codex.
  - Documents the wrapper permission model.

- `artifacts/packages/openclaw-cooperative-cockpit-mvp.manifest.json`
  - Refreshed static MVP tree checksum required by `check_concept_consistency`.

## Validation Evidence

### Copilot planner wrapper smoke

Command:

```powershell
node scripts\copilot-wrapper.js planner "Reply with exactly COPILOT_WRAPPER_FINAL_SMOKE_OK. Do not inspect files and do not modify anything."
```

Result:

```text
COPILOT_WRAPPER_FINAL_SMOKE_OK
```

### Codex manager wrapper smoke

Command:

```powershell
node scripts\codex-wrapper.js manager "Reply with exactly CODEX_MANAGER_FINAL_SMOKE_OK. Do not inspect files and do not modify anything."
```

Observed Codex metadata:

```text
OpenAI Codex v0.130.0
model: gpt-5.5
approval: never
sandbox: read-only
reasoning effort: xhigh
```

Result:

```text
CODEX_MANAGER_FINAL_SMOKE_OK
```

### Codex coder wrapper smoke

Command:

```powershell
node scripts\codex-wrapper.js coder "Reply with exactly CODEX_CODER_FINAL_SMOKE_OK. Do not inspect files and do not modify anything. Allowed paths: none for this smoke test."
```

Observed Codex metadata:

```text
OpenAI Codex v0.130.0
model: gpt-5.3-codex
approval: never
sandbox: workspace-write
reasoning effort: xhigh
```

Result:

```text
CODEX_CODER_FINAL_SMOKE_OK
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
```

### Final Claude reviewer pass

Command:

```powershell
npm run copilot:reviewer -- "Read-only final review of current GOAL-011 state..."
```

Result:

```text
NO_BLOCKING_OR_HIGH_FINDINGS
```

## Remaining Approval Gates

- No source-control publication was performed.
- No backend, API, auth, database, deployment, runtime mutation, live AI product behavior, or external connector was introduced.
- Future wrapper permission expansion still requires a declared task and approval check under `docs/ops/APPROVAL_POLICY.md`.

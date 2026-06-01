# Copilot/Codex Role Wrapper

Use this repo-local wrapper set to run Claude roles through GitHub Copilot and GPT roles through Codex.

## Copilot Roles

- `planner` -> `claude-opus-4.7` through GitHub Copilot, plan mode, advisory intent.
- `reviewer` -> `claude-opus-4.7` through GitHub Copilot, advisory intent.

## Codex Roles

- `manager` -> `gpt-5.5` through `codex exec`, read-only sandbox, `xhigh` reasoning config.
- `coder` -> `gpt-5.3-codex` through `codex exec`, workspace-write sandbox.

## Invocation Patterns

Direct wrappers:

```bash
node scripts/copilot-wrapper.js <role> "<prompt>"
node scripts/codex-wrapper.js <role> "<prompt>"
```

NPM aliases:

```bash
npm run copilot:planner -- "Review the whole design and identify risky areas."
npm run copilot:reviewer -- "Do a review focused on correctness and safety."
npm run codex:manager -- "Coordinate the redesign plan into milestones."
npm run codex:coder -- "Implement one concrete system improvement."
```

Offline wrapper regression check:

```bash
npm run test:wrappers
```

## Permission Model

- Copilot planner/reviewer run non-interactively with repo-local path access, no temp-dir access, write tool denied, and common destructive or publishing shell commands denied. This is a bounded advisory wrapper, not a complete shell allowlist sandbox.
- Codex manager runs with `--sandbox read-only`.
- Codex coder runs with `--sandbox workspace-write`; callers must include the declared allowed paths in the prompt before asking it to edit.
- Source-control publication still requires explicit approval under `docs/ops/APPROVAL_POLICY.md`.
- `ROLE_WRAPPER_TIMEOUT_MS` can override the default 30-minute child-process timeout.
- `npm run test:wrappers` validates wrapper command construction without executing live Copilot or Codex sessions.

If a task needs broader permissions, declare the task ID, allowed paths, expected touched files, validation commands, and approval gate before changing the wrapper or running the role.

## GOAL-013 guardrails

Use these role boundaries for multi-agent work:

- `npm run copilot:planner -- "<prompt>"` dispatches Claude Opus 4.7 in planning mode.
- `npm run copilot:reviewer -- "<prompt>"` dispatches Claude Opus 4.7 in read-only review mode.
- `npm run codex:manager -- "<prompt>"` dispatches GPT 5.5 xhigh in read-only mode.
- `npm run codex:coder -- --allowed-paths "path-a,path-b" "<prompt>"` dispatches GPT 5.3 Codex xhigh in workspace-write mode.

The coder wrapper requires explicit allowed paths from `--allowed-paths` or `ROLE_WRAPPER_ALLOWED_PATHS`. Planner and reviewer wrapper calls deny write, publish, merge, branch rewrite, install, broad network fetch, and common PowerShell file mutation commands. Wrapper usage does not override `AGENTS.md`, `docs/ops/CONCURRENCY_POLICY.md`, or the task declaration requirement.


# 10 — Codex Handoff Contract

## Codex role

Codex implements bounded repo tasks. It does not choose product scope, add unapproved architecture, or act as product owner.

## Allowed actions

- Execute one approved `.codex/goals/GOAL-DS-*` packet at a time.
- Inspect listed read-first files.
- Modify only allowed paths.
- Run validation commands.
- Report exact results.

## Forbidden actions

- No backend.
- No API calls.
- No authentication.
- No database.
- No deployment work.
- No runtime workflow execution.
- No real AI execution.
- No real agent orchestration.
- No persistent storage unless later explicitly approved.
- No external connectors.
- No repository-write behavior from the UI.
- No CDN scripts.
- No remote fonts.
- No real secrets, credentials, or PII in mock data.
- No public/demo language implying a working orchestrator.
- Avoid user-facing action labels that imply execution, such as “Run,” except existing locked page/title contexts.
- Storybook and Playwright are dev/test only, never production runtime.

## Goal sequence

1. DS-001 docs assimilation.
2. DS-002A Storybook scaffold.
3. DS-002B Playwright scaffold.
4. DS-003 token audit.
5. DS-004 component taxonomy/stories.
6. DS-005 mock data/registry.
7. DS-006 baselines/evidence.

## Stop conditions

Stop if:

- package manager is ambiguous;
- files outside allowed paths are needed;
- validation fails and cannot be fixed in scope;
- app runtime changes are needed by docs/tooling goals;
- product/architecture decision is required;
- secrets or real PII appear.

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

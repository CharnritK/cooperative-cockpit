# Goal

GOAL-DS-003 — Token audit and finalization

## Purpose

Audit existing static MVP styles and map raw values to semantic design tokens informed by the workflow-studio style brief and accessibility constraints.

## Read first

- `docs/design-system/03_TOKEN_SYSTEM.md`
- `docs/design-system/tokens/openclaw.tokens.json`
- `docs/design-system/evidence/token-audit/raw-to-semantic-map.template.md`
- `docs/design-system/11_WORKFLOW_STUDIO_STYLE_BRIEF.md`
- `.codex/goals/GOAL-DS-003-token-audit-and-finalization.md`

## Allowed paths

Write paths only:
- `docs/design-system/tokens/**`
- `docs/design-system/evidence/token-audit/**`
- `artifacts/evidence/design-system/token-audit/**`
- `docs/design-system/03_TOKEN_SYSTEM.md`
Read-only inspection paths:
- `apps/static-mvp/styles/**`
- `apps/static-mvp/src/**`
- `apps/static-mvp/index.html`

## Forbidden actions

- Do not add backend/API/auth/database/deployment.
- Do not add runtime mutation, persistent storage, or external connectors.
- Do not touch secrets or include real PII.
- Do not claim validation passed unless the exact command was run and output is provided.
- Do not broaden product scope.
- Do not modify files outside allowed paths.
- Do not change app CSS or component code in this goal.
- Do not hardcode raw styles into components.
- Do not copy Dify branding, logos, assets, or exact surfaces.
- Do not mark candidate tokens final without audit evidence.

## Required work

1. Inspect current static MVP style sources as read-only.
2. Extract raw color, spacing, typography, radius, shadow, z-index, motion, and layout values.
3. Fill the raw-to-semantic token audit table.
4. Map raw values to semantic tokens in `openclaw.tokens.json`.
5. Mark each token as candidate, adopted, deprecated, or needs-review.
6. Record accessibility/contrast status where possible.
7. Run validation commands and report exact output.

## Acceptance criteria

- Token audit table exists and includes raw values, source files, usage, proposed token, keep/replace/deprecate, contrast status, and notes.
- Candidate token JSON parses.
- Token docs identify values still needing visual/accessibility review.
- No runtime CSS/component files are changed.
- Dify-inspired direction is translated into semantics, not copied.

## Validation commands

| Command | Expected pass result | Failure meaning | Stop/report behavior |
|---|---|---|---|
| `python -m json.tool docs/design-system/tokens/openclaw.tokens.json >/dev/null` | exits 0 | token JSON invalid | stop and report |
| `[detected-pm] run validate` if package manager is known | exits 0 | repo validation failed | report exact output |
| `grep -R "#\|rgba\|--" apps/static-mvp/styles docs/design-system/evidence/token-audit -n` | produces inspectable raw/style references | audit may be incomplete | report limitations, do not mark final |

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

# 06 Acceptance Criteria

## Product-level acceptance criteria

The static MVP succeeds if the viewer understands the core product story within 60 seconds:

OpenClaw turns rough context into governed artifacts and bounded handoff packets.

The MVP must remain static, local, mock-only, and safe.

## Scenario-level acceptance criteria

### Product spec creation

Spec draft visibly uses selected context and shows readiness gates.

### UI mockup review

Review findings are inspect-only and tied to acceptance criteria.

### Codex implementation handoff

Handoff packet is visible, bounded, and gated.

### QA closeout

Validation result and QA status are visible.

### Decision lock / scope control

Protected decisions require Point lock before handoff readiness.

## UI-level acceptance criteria

Workbench shows context and protected exclusions.

Spec Builder shows field statuses and acceptance criteria.

Decisions shows pending and locked decisions.

Trace & Evidence shows source-target links.

Preview shows static placeholder only.

## Codex slice acceptance criteria

- Primary demo path is visible across existing pages.
- No ninth page is added.
- No backend/runtime behavior is introduced.
- Handoff readiness is blocked when gates are incomplete.
- Handoff preview remains static/mock-only.
- Validation commands pass or failures are reported.

## Non-goals

No real export, repository write, AI call, connector, backend, deployment, or new framework.

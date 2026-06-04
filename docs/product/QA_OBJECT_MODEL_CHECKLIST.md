# Static MVP Object Model QA Checklist

Status: Current QA baseline

## Object coverage

- [ ] Project is visible or summarized.
- [ ] Context Nodes are visible and selectable.
- [ ] Selected Context is visible.
- [ ] Protected Exclusions are visible.
- [ ] Spec Draft is visible.
- [ ] Review Run is inspect-only.
- [ ] Findings are visible as advisory items.
- [ ] Decisions show needs-lock and locked states.
- [ ] Evidence is visible and trace-linked.
- [ ] Work Packet is visible as bounded build packet.
- [ ] Handoff Packet is visible only as derived static preview.
- [ ] Validation Results are visible without claiming live execution.
- [ ] Agent Roles remain metadata only.

## Scope guardrails

- [ ] No backend.
- [ ] No API.
- [ ] No auth.
- [ ] No database.
- [ ] No deployment.
- [ ] No runtime execution.
- [ ] No real agent orchestration.
- [ ] No connectors.
- [ ] No MCP implementation.
- [ ] No new dependencies.
- [ ] No pages/routes beyond the GOAL-021 twelve-route local journey without Point lock.
- [ ] No action label says “Run” or implies live execution.

## Handoff readiness

- [ ] Handoff is blocked if spec is incomplete.
- [ ] Handoff is blocked or warning-gated if decisions need lock.
- [ ] Handoff is blocked or warning-gated if required evidence is missing.
- [ ] Handoff does not write repo files.
- [ ] Handoff does not create real exports unless approved in a future phase.

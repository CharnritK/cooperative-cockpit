# Point-Lock Recommendations — Research Backlog Review

Created: 2026-05-30  
Status: Draft for Point review

## Required decisions before GOAL-005

| decision | recommended_default | risk_if_wrong | decide_before |
|---|---|---|---|
| Static MVP boundary | Static only | Runtime drift | Now |
| Object model lock | Accept with edits | Rework | GOAL-005 |
| Decision naming | Decision with lock state | Duplicate model | GOAL-005 |
| Work Packet vs Handoff Packet | Work Packet core; Handoff derived | Handoff object becomes vague | GOAL-007 |
| Artifact treatment | Artifact Reference only | Generic artifact manager | GOAL-006 |
| Agent Roles | Embedded metadata only | Admin/governance sprawl | GOAL-007 |
| New dependencies | None | Package complexity | Any goal |
| Runtime semantics | None | Dify/n8n/Flowise clone risk | Any goal |
| Public demo claims | Static prototype, not working orchestrator | Overclaim | Before public demo |

## Recommended lock statement

Point accepts the current static MVP boundary and authorizes GOAL-005 only as a bounded static mock-data normalization task. No backend, API, auth, database, deployment, runtime execution, real agent orchestration, external connector, MCP, new dependency, new page, or repo-write behavior is approved.

## Fallback if not accepted

Revise `docs/product/STATIC_MVP_OBJECT_MODEL.md`, `docs/product/POINT_LOCK_DECISIONS.md`, and `docs/product/STATIC_MVP_MOCK_DATA_SPEC.md` first. Do not run GOAL-005 until the object model is accepted.

# Build / Defer / Kill Register

Status: Current product canon

## Build now

| item | decision | rationale | next action |
|---|---|---|---|
| Static MVP object model docs | Build | Prevent object drift and Codex overreach. | GOAL-004 |
| Screen/object map | Build | Preserve eight-page scope. | GOAL-004 |
| Mock-data spec | Build | Prepare safe data normalization. | GOAL-004 |
| Work Packet | Build | Core handoff object. | GOAL-007 |
| Validation Result | Build | Required for readiness. | GOAL-005/007 |

## Defer

| item | decision | rationale |
|---|---|---|
| Backend/database/auth | Defer | Outside static MVP. |
| Runtime execution | Defer | Turns cockpit into workflow runner. |
| MCP implementation | Defer | Connector/runtime scope. |
| Real agent orchestration | Defer | Runtime product phase. |
| Rich trace graph | Defer to P2 | Not needed for first proof. |

## Kill / avoid

| item | decision | rationale |
|---|---|---|
| Dify-like drag/drop workflow builder | Avoid | Clone/runtime risk. |
| “Run” labels | Avoid | Unsafe execution implication. |
| Fake execution logs | Avoid | Misleading runtime implication. |
| Standalone generic Artifact page | Avoid | Dilutes artifact-first wedge. |
| Dedicated Agent Roles admin page | Avoid in MVP | Premature admin surface. |

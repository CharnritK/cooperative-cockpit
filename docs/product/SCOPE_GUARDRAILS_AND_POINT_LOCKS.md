# Scope Guardrails and Point-Lock Decisions

Status: Current product canon
Owner: Point

## Requires Point lock

- Architecture boundary changes
- New dependencies/frameworks
- Backend/API/database/auth/deployment
- Runtime workflow execution
- Real agent orchestration
- External connectors
- MCP implementation
- Product positioning changes
- Object model changes
- Public demo claims
- New pages/routes beyond the GOAL-021 twelve-route local journey
- Work Packet vs Handoff Packet semantics
- Decision naming changes
- Artifact object treatment
- New repo product-doc path if outside current folder conventions

## Recommended defaults

| decision | default |
|---|---|
| Static MVP boundary | Keep static/mock/offline only |
| Major UI metaphor | Cockpit / Workbench center |
| Work Packet vs Handoff Packet | Work Packet core; Handoff Packet derived |
| Decision naming | Decision object with lock state |
| Artifact treatment | Artifact Reference only; no standalone page |
| Agent Roles | Embedded metadata only |
| New pages/routes | Do not add beyond GOAL-021 without Point lock |

## Stop conditions for Codex

Stop if:

- a dependency is needed;
- backend/API/auth/database/deployment is suggested;
- a new page/route beyond GOAL-021 is required;
- live execution or connector behavior is implied;
- files outside allowed paths need edits;
- validation fails and cannot be fixed within scope;
- product semantics become ambiguous;
- secrets or credentials are needed.

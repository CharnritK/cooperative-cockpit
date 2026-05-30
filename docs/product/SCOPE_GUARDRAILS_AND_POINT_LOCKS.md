# Scope Guardrails and Point-Lock Decisions

Status: Draft
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
- Object model lock
- Public demo claims
- New pages beyond current eight
- Work Packet vs Handoff Packet semantics
- Decision vs Decision Lock naming
- Artifact object treatment
- New repo product-doc path if outside current folder conventions

## Recommended defaults

| decision | default |
|---|---|
| Static MVP boundary | Keep static/mock/offline only |
| Major UI metaphor | Cockpit / Workbench center |
| Work Packet vs Handoff Packet | Work Packet core; Handoff Packet derived |
| Decision Lock naming | Decision object with lock state |
| Artifact treatment | Artifact Reference only; no standalone page |
| Agent Roles | Embedded metadata only |
| New pages | Do not add |

## Stop conditions for Codex

Stop if:

- a dependency is needed;
- backend/API/auth/database/deployment is suggested;
- a new page is required;
- live execution or connector behavior is implied;
- files outside allowed paths need edits;
- validation fails and cannot be fixed within scope;
- product semantics become ambiguous;
- secrets or credentials are needed.

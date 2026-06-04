# Claim Register

Status: Current product canon

| claim_id | claim | claim_type | support_status | confidence | risk_if_wrong | follow_up_action |
|---|---|---|---|---:|---|---|
| C001 | Static MVP should remain mock-only/offline with no backend/runtime. | Fact / constraint | Supported by prior repo context | 5 | Scope explosion | Keep in every Codex goal. |
| C002 | Current MVP route surface is twelve local routes: four Start journey routes plus eight core cockpit pages. | Fact / constraint | Supported by GOAL-021 current-state evidence and QA route boundary | 5 | Route sprawl or stale QA language | Keep QA checks tied to the GOAL-021 twelve-route boundary. |
| C003 | Current mock data follows the locked static MVP object model. | Fact / constraint | Supported by GOAL-005 through GOAL-009 validation | 5 | Codex builds unstable schema | Keep validation current. |
| C004 | Workbench remains the center of gravity. | Product decision | Accepted | 5 | UI direction may drift | Point lock required to change. |
| C005 | Work Packet is core and Handoff Packet is derived. | Product decision | Accepted | 5 | Handoff model confusion | Point lock required to change. |
| C006 | Decision with lock state replaces Decision Lock as a separate object. | Product decision | Accepted | 5 | Duplicate object confusion | Point lock required to change. |
| C007 | Artifact is represented as Artifact Reference, not a standalone page. | Product decision | Accepted | 5 | Artifact-manager scope creep | Point lock required to change. |
| C008 | MCP/connectors/runtime orchestration are deferred. | Recommendation input | Supported by boundary | 5 | Runtime scope creep | Guardrail docs. |

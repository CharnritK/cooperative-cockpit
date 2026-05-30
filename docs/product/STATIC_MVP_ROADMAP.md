# Static MVP Roadmap — OpenClaw Cooperative Cockpit

Status: Current product canon
Scope: Static MVP only
Readiness: ACCEPTED_FOR_STATIC_MVP

## Product thesis

OpenClaw Cooperative Cockpit is a static, artifact-first AI work cockpit for turning selected context into a governed spec, review findings, decisions, evidence, a work packet, and a gated handoff preview.

## Architecture boundary

Static MVP only:

- mock data only;
- no backend;
- no API integration;
- no authentication;
- no database;
- no deployment;
- no runtime workflow execution;
- no real agent orchestration;
- no external connectors;
- no MCP implementation;
- no new dependencies without Point lock.

## Completed static MVP baseline — P0

| id | item | target area | acceptance criteria |
|---|---|---|---|
| P0-001 | Lock static MVP object model | `docs/product/STATIC_MVP_OBJECT_MODEL.md` | Complete in GOAL-004/005 lineage. |
| P0-002 | Lock screen/object map | `docs/product/STATIC_MVP_SCREEN_MAP.md` | Complete; all existing eight pages map to objects and mock states. |
| P0-003 | Lock mock-data requirements | `docs/product/STATIC_MVP_MOCK_DATA_SPEC.md` | Complete; required static entities and fields documented without persistence implications. |
| P0-004 | Normalize static mock data | `apps/static-mvp/src/mockData.js`, `apps/static-mvp/src/state.js` | Complete; explicit static entities exist and current UI behavior remains static. |
| P0-005 | Surface Work Packet / Handoff preview | Existing Home, Preview, Trace, Rules panels | Complete; Work Packet summary and static handoff readiness are visible. |
| P0-006 | Harden QA against scope creep | `apps/static-mvp/QA_CHECKLIST.md`, `quality/QA_CHECKLIST.md` | Complete; QA checks object coverage, no runtime semantics, no connectors, no new pages, no unsafe labels. |

## Polish — P1

| id | item | target area | acceptance criteria |
|---|---|---|---|
| P1-001 | Object label polish | Workbench/Inspector | UI labels align to locked object model. |
| P1-002 | Evidence detail cards | Trace & Evidence | At least two evidence items are visible and trace-linked. |
| P1-003 | Validation summary | Home, Rules, Handoff preview | Static validation summary appears without claiming live execution. |
| P1-004 | Relationship legend | Workbench or Trace | User can understand object relationships at a glance. |

## Later static enhancements — P2

| id | item | target area | acceptance criteria |
|---|---|---|---|
| P2-001 | Accessibility audit pass | All pages | Keyboard/focus/contrast checks documented and addressed. |
| P2-002 | Richer static trace graph | Trace & Evidence | Clearer graph without new dependency. |
| P2-003 | Golden scenario demo notes | Docs/Home | Demo notes explain primary golden scenario and review gate. |

## Deferred

- backend;
- database;
- API integration;
- authentication;
- deployment;
- real AI calls;
- real agent orchestration;
- external connectors;
- MCP implementation;
- live workflow execution;
- multi-user permissions;
- runtime logs or execution history.

## Kill / avoid

- Dify-like drag/drop workflow builder;
- buttons labeled “Run”;
- fake execution logs;
- standalone generic Artifact page;
- dedicated Agent Roles admin page;
- new pages beyond the current eight without Point lock.

## Next recommended Codex goal

Run only bounded post-closeout work. The immediate current task is `GOAL-009 — Canon reconciliation`; after it passes, feature iteration requires Point approval for new product scope.

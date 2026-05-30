# DR-002 — Static MVP Backlog, Screen Plan, and Codex Sequence

Readiness: READY_WITH_ASSUMPTIONS  
Scope: Static MVP only  
Audience: Point, Codex, Reviewer, QA

## Executive summary

The next build sequence should be docs-first, then mock-data normalization, then UI alignment, then QA hardening.

The current static MVP already has a useful eight-page shell. The highest-leverage next action is not a visual redesign; it is to lock the product semantics and make the mock data/UI express the artifact-first object model.

## Static MVP product thesis

OpenClaw Cooperative Cockpit is a static, artifact-first AI work cockpit for turning selected context into a governed spec, review findings, decisions, evidence, a bounded work packet, and a gated handoff preview.

## Locked screen plan

Use the current eight pages only:

| screen | role | visible objects |
|---|---|---|
| Home | Project overview and next safe action | Project, readiness, pending decisions, active artifact |
| Workbench | Center of gravity / context operations | Context Nodes, Selected Context, Protected Exclusions |
| Spec Builder | Controlled spec drafting | Spec Template, Spec Draft, fields |
| Review Runs | Inspect-only reviews | Review Run, Findings |
| Preview | Static artifact preview | Artifact Reference, Spec Draft coverage, findings |
| Decisions | Point-lock board | Decision |
| Trace & Evidence | Trace and support | Evidence, Artifact Reference, links |
| Rules & Scope | Guardrails | Rules, Validation Results, protected surfaces |

Do not add pages for:
- Project admin
- Workspace admin
- Agent roles admin
- Runtime logs
- Connector catalog
- MCP settings
- Generic artifact library

## P0 backlog

| item_id | backlog_item | priority | acceptance_criteria |
|---|---|---|---|
| P0-001 | Persist static MVP roadmap docs | P0 | Roadmap, object model, screen map, mock-data spec, and guardrails exist in repo. |
| P0-002 | Lock object model | P0 | Build/defer/kill object decisions are documented. |
| P0-003 | Normalize mock data | P0 | Mock data contains explicit workspace, project, context nodes, spec draft, review run, findings, decisions, evidence, work packet, handoff packet, validation results. |
| P0-004 | Surface Work Packet/Handoff preview | P0 | Existing pages show bounded handoff readiness without real export. |
| P0-005 | Harden QA | P0 | QA checks no runtime, no connectors, no new pages, no unsafe labels, object coverage. |

## P1 backlog

| item_id | backlog_item | priority | acceptance_criteria |
|---|---|---|---|
| P1-001 | Improve object labels | P1 | UI labels align with locked object model. |
| P1-002 | Evidence cards | P1 | At least two evidence items visible and trace-linked. |
| P1-003 | Validation summary | P1 | Static validation state appears without claiming live validation. |
| P1-004 | Relationship legend | P1 | Workbench or Trace explains object relationships. |

## Deferred

- backend/API/auth/database/deployment
- real AI calls
- real agent orchestration
- external connectors
- MCP implementation
- live workflow execution
- multi-user permissions
- runtime logs

## Kill / avoid

- Dify-like workflow execution canvas
- action labels that say “Run”
- fake run logs
- generic Artifact page
- dedicated Agent Roles admin page
- new pages without Point lock

## Codex implementation sequence

### GOAL-004 — Lock static MVP domain model and roadmap docs

Docs-only. No app source changes.

### GOAL-005 — Normalize static mock data

Add explicit domain entities to mock data/state while preserving current behavior.

### GOAL-006 — Map UI panels to locked object model

Update labels, panels, and read-only UI mapping. No new pages.

### GOAL-007 — Add Work Packet / Handoff preview

Expose work packet and derived handoff readiness as static panels.

### GOAL-008 — QA hardening and evidence closeout

Update QA checklists and validation evidence.

## Review gate

Reviewer: Point  
Scope: Object model defaults, page count, proposed repo destination, Work Packet/Handoff semantics  
Pass condition: Point approves or edits the lock decisions before Codex implementation  
Fallback: Update docs/goals before implementation

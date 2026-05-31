# 06 — Governed Screen Registry

The old eight-page cap is superseded as a design-system planning constraint, but the current static MVP still implements the existing eight-page shell. Screen growth is governed by this registry; registry inclusion is not implementation proof.

| screen_id | screen | route assumption | artifact object served | required components | data contract | states required | approval status | owner | implementation status |
|---|---|---|---|---|---|---|---|---|---|
| screen-001 | Operator Home | `home` / `/` | workspace/project overview | AppShell, TopBar, Sidebar, KpiCard, TaskQueueRow, DecisionCard | workspace, project, validationResults | default, dense, empty, loading, warning, error | approved-template | Point | implemented |
| screen-002 | Workbench | `workbench` | context nodes and selected context | WorkflowCanvas, OperatorNodeCard, NodePalette, InspectorPanel | contextNodes, selectedContext, artifactRefs | default, dense, empty, loading, warning, error, selected | approved-template | Point | implemented |
| screen-003 | Spec Builder | `spec-builder` | spec draft | Card, SectionHeader, WarningState, DecisionCard | specTemplates, specDraft, specFields, decisions | default, dense, empty, loading, warning, error, disabled, selected, locked, pending | approved-template | Point | implemented |
| screen-004 | Review Runs | `review-runs` | review runs and findings | DataTable, FilterBar, StatusBadge, ReviewFindingCard | reviewRuns, findings, evidenceItems | default, dense, empty, loading, warning, error, disabled | approved-template | Point | implemented |
| screen-005 | Static Preview | `preview` | work/handoff packet preview | HandoffPacketCard, GovernanceStrip, WarningState | workPackets, handoffPackets, validationResults | default, dense, empty, loading, warning, error, disabled, locked, pending | approved-template | Point | implemented |
| screen-006 | Decision Log | `decisions` | decisions | DecisionCard, DataTable, StatusBadge | decisions, evidenceItems | default, dense, empty, loading, warning, error, disabled, selected, locked, pending | approved-template | Point | implemented |
| screen-007 | Trace & Evidence | `trace` | evidence items and trace links | EvidenceCard, DataTable, FilterBar | evidenceItems, artifactRefs | default, dense, empty, loading, warning, error, disabled, selected | approved-template | Point | implemented |
| screen-008 | Rules & Scope | `rules` | rules and protected surfaces | GovernanceStrip, DataTable, WarningState | validationResults, decisions | default, dense, empty, loading, warning, error, disabled | approved-template | Point | implemented |
| screen-009 | Review Queue | `/review-queue` | review queue planning surface | DataTable, FilterBar, StatusBadge | reviewRuns, findings | default, dense, empty, loading, warning, error, disabled, selected, pending | proposed | Point | not_started |
| screen-010 | Review Detail | `/review/:id` | review run and findings | ReviewFindingCard, EvidenceCard, TraceTimeline | reviewRuns, findings, evidenceItems | default, dense, empty, loading, warning, error, selected | proposed | Point | not_started |
| screen-011 | QA Gate / Acceptance View | `/qa-gate` | QA gates | KpiCard, RiskBadge, DataTable, WarningState | qaGates, validationResults, visualBaselines | default, dense, empty, loading, warning, error, disabled, pending | proposed | Point | not_started |
| screen-012 | Workflow Canvas / Object Map | `/workflow-map` | object graph | WorkflowCanvas, OperatorNodeCard, NodePalette, InspectorPanel | contextNodes, artifactRefs, evidenceItems | default, dense, empty, loading, warning, error, selected | proposed | Point | not_started |


## Rules

- Do not claim a screen is implemented unless repo evidence confirms it.
- New screens require a screen contract and Point approval before implementation.
- Every screen needs default, empty, warning/error, and responsive coverage.
- Visual baselines are accepted only after Playwright output or documented blocker evidence.
- The Markdown table is the registry index; schema-validatable per-screen contract records live in `docs/design-system/schemas/screen-contracts/`.
- Proposed screens remain planning contracts only until Point approval and implementation evidence exist.

# State Coverage Matrix

| target | default | dense | empty | loading | warning | error | disabled | selected | evidence status |
|---|---|---|---|---|---|---|---|---|---|
| AppShell | required | required | required | required | required | required | n/a | n/a | partial: DS-006 reviewed candidate screenshots cover the shell across 4 viewports; isolated state coverage pending |
| TopBar | required | required | required | n/a | required | required | n/a | n/a | partial: DS-006 reviewed candidate screenshots cover the top bar across 4 viewports; isolated state coverage pending |
| Sidebar | required | required | required | required | required | required | required | n/a | partial: DS-006 reviewed candidate screenshots cover the sidebar across 4 viewports; isolated state coverage pending |
| CommandBar | required | required | required | required | required | required | required | selected | partial: DS-006 screenshots cover rendered navigation/actions; isolated command-state coverage pending |
| InspectorPanel | required | required | required | required | required | required | required | selected | partial: Workbench selected candidate screenshot evidence exists; isolated state coverage pending |
| WorkflowCanvas | required | required | required | required | required | required | n/a | required | partial: Workbench selected candidate screenshot evidence exists; workflow-map screen remains Point-locked |
| Operator Home | required | required | required | required | required | required | n/a | n/a | candidate-reviewed: `artifacts/evidence/design-system/visual/DS-006-reviewer-inspection.md` screen-001 default across 4 viewports; remaining states pending |
| Workbench | required | required | required | required | required | required | n/a | selected | candidate-reviewed: `artifacts/evidence/design-system/visual/DS-006-reviewer-inspection.md` screen-002 selected across 4 viewports; remaining states pending |
| Spec Builder | required | required | required | loading | warning | error | required | required | candidate-reviewed: `artifacts/evidence/design-system/visual/DS-006-reviewer-inspection.md` screen-003 default across 4 viewports; remaining states pending |
| Review Queue | required | required | required | loading | warning | error | required | required | blocked: screen-009 is registry-only; current Review Runs screen has candidate-reviewed evidence under DS-006 |
| Review Detail | required | required | required | required | required | required | n/a | required | blocked: screen-010 is registry-only and requires Point approval before implementation evidence |
| Evidence Ledger | required | required | required | loading | warning | error | required | required | partial: current Trace & Evidence screen has candidate-reviewed DS-006 evidence; dedicated ledger states pending |
| Decision Log | required | required | required | required | warning | error | required | required | candidate-reviewed: `artifacts/evidence/design-system/visual/DS-006-reviewer-inspection.md` screen-006 pending across 4 viewports; remaining states pending |
| Handoff Packet | required | required | required | loading | warning | error | required | required | partial: Static Preview candidate-reviewed DS-006 evidence covers rendered handoff preview; isolated packet states pending |
| QA Gate | required | required | required | loading | warning | error | required | required | blocked: screen-011 is registry-only and requires Point approval before implementation evidence |
| Static Preview | required | required | required | loading | warning | error | required | required | candidate-reviewed: `artifacts/evidence/design-system/visual/DS-006-reviewer-inspection.md` screen-005 default across 4 viewports; remaining states pending |
| Rules & Scope | required | required | required | required | warning | error | required | n/a | candidate-reviewed: `artifacts/evidence/design-system/visual/DS-006-reviewer-inspection.md` screen-008 default across 4 viewports; remaining states pending |
| Workflow Canvas / Object Map | required | required | required | loading | warning | error | n/a | selected | blocked: screen-012 is registry-only; Workbench canvas has partial candidate-reviewed DS-006 evidence |

Screen contract records for the governed screen registry are defined in `docs/design-system/schemas/screen-contracts/`.
Candidate Playwright screenshot evidence now exists for the eight implemented static MVP screens at `artifacts/evidence/design-system/visual/results.json`, with reviewer inspection recorded in `artifacts/evidence/design-system/visual/DS-006-reviewer-inspection.md`. DS-004 docs-only stories cover `EvidenceCard` and `DecisionCard` across the required state vocabulary. The row-level state matrix remains incomplete for broader components until additional stories and approved DS-006 baselines are recorded.

Update this matrix only with evidence paths or explicit blockers.

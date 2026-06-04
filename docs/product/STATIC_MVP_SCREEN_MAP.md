# Static MVP Screen Map — OpenClaw Cooperative Cockpit

Status: Current product canon
Rule: Preserve the current twelve local routes unless Point approves expansion.

## Current route surface

GOAL-021 supersedes the historical eight-page shell with a twelve-route local journey. The eight core cockpit pages remain the core workspace; the four added routes are local product-entry/onboarding surfaces only.

- Start journey: Landing, Static Demo Entry, Project Hub, Project Initialize.
- Core cockpit workflow: Home, Workbench, Spec Builder, Review Runs, Preview.
- Governance: Decisions, Trace & Evidence, Rules & Scope.

No additional route is approved by this map.

## Center of gravity

Workbench / Cockpit canvas is the center of gravity.

Home functions as Project Overview. Do not add a separate Project Overview page for the static MVP.

## Page map

| page | locked purpose | visible objects | required panels |
|---|---|---|---|
| Landing | Product concept and audience orientation | Project, Work Packet promise, handoff boundary | Product promise, audience, local demo CTA |
| Static Demo Entry | Static boundary and no-fake-auth entry | Project, Protected Exclusions, local-only boundary | No-login notice, local/static/mock-only guardrails, enter-demo CTA |
| Project Hub | Project selection and scenario overview | Project, Validation summary, readiness summary | Project cards, blockers, mock last edited state |
| Project Initialize | Local setup rehearsal | Project, Spec Template, Selected Context preview | Template selector, static mock transcript, Open Workbench CTA |
| Home | Project overview, readiness, safe next action | Project, Selected Context summary, pending Decisions, Validation summary, Artifact Reference | Project status, pipeline, next actions, validation summary |
| Workbench | Context operations map | Context Nodes, Selected Context, Protected Exclusions, object links | Canvas, context panel, node inspector |
| Spec Builder | Controlled spec draft | Spec Template, Spec Draft, spec fields, readiness | Template selector, fields, lock/validate controls |
| Review Runs | Inspect-only review | Review Run, Findings | Review scope, advisory findings, severity chips |
| Preview | Static artifact preview | Artifact Reference, Spec Draft coverage, Findings, Handoff readiness | Preview frame, coverage checklist, linked findings |
| Decisions | Point locks | Decisions | Needs-lock section, locked section, options |
| Trace & Evidence | Evidence and lineage | Evidence, Artifact Reference, trace links | Trace graph, evidence table, missing-evidence warning |
| Rules & Scope | Guardrails and allowed/blocked boundaries | Rules, Validation Results, Protected Exclusions | Rules matrix, review gates, protected surfaces |

## Explicit non-pages

Do not add these pages in static MVP:

- Project admin
- Workspace admin
- Agent roles admin
- Generic Artifact library
- Runtime logs
- Connector catalog
- MCP configuration
- Workflow execution history
- Execution runs
- Authentication/settings

## Required panel additions

Use existing routes/pages/panels only:

- Add Project summary to Home.
- Add Work Packet/Handoff preview to Home, Preview, or Trace.
- Add Validation Result summary to Home or Rules & Scope.
- Add Evidence item details to Trace & Evidence.
- Add object relationship legend to Workbench or Trace.

## Forbidden UI implications

- No real run/execution history.
- No connector catalog.
- No deployment controls.
- No API key entry.
- No login/auth controls.
- No real export/repo write claim.
- No MCP configuration.

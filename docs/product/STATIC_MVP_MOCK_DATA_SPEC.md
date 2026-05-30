# Static MVP Mock Data and UI State Spec

Status: Current product canon
Boundary: Static mock data only. No persistence.

## Required mock entities

| mock_entity | required_records | required_fields | UI used by |
|---|---:|---|---|
| workspace | 1 | `id`, `name`, `mode`, `constraints[]` | Shell/Home |
| project | 1 | `id`, `name`, `artifactId`, `summary`, `currentStage`, `status` | Home, top shell |
| contextNodes | 3–5 | `id`, `label`, `type`, `status`, `description`, `x`, `y`, `links` | Workbench |
| selectedContext | 1 | `includedIds[]`, `protectedExclusions[]` | Workbench |
| specTemplates | 3–10 | `id`, `name`, `description`, `fieldIds[]` | Spec Builder |
| specDraft | 1 | `id`, `templateId`, `status`, `fieldIds[]`, `readiness` | Spec Builder, Preview |
| specFields | 5–8 | `id`, `name`, `value`, `status`, `suggestion`, `evidenceIds[]` | Spec Builder |
| reviewRun | 1 | `id`, `name`, `status`, `scopeContextIds[]`, `findingIds[]`, `verdict` | Review Runs |
| findings | 2–4 | `id`, `reviewRunId`, `severity`, `status`, `summary`, `recommendation`, `evidenceIds[]` | Review Runs, Preview |
| decisions | 1–5 | `id`, `title`, `status`, `options[]`, `selectedOption`, `requiresPointLock` | Decisions, Home |
| evidenceItems | 2 | `id`, `type`, `sourceObjectId`, `targetObjectId`, `summary`, `status` | Trace & Evidence |
| artifactRefs | 1–2 | `id`, `type`, `status`, `label`, `linkedObjectIds[]` | Top shell, Preview |
| workPacket | 1 | `id`, `title`, `objective`, `allowedPaths[]`, `forbiddenActions[]`, `acceptanceCriteria[]`, `validationCommands[]`, `status` | Home, Handoff preview |
| handoffPacket | 1 | `id`, `workPacketId`, `readiness`, `blockedBy[]`, `includedEvidenceIds[]`, `includedDecisionIds[]` | Handoff preview |
| agentRoles | 2–3 | `id`, `name`, `purpose`, `mustNotDo[]` | Rules/Handoff metadata |
| validationResults | 2 | `id`, `scope`, `status`, `command`, `summary`, `evidenceRef` | Home, Rules, Handoff preview |

## Required status values

| state | applies_to | allowed display |
|---|---|---|
| draft | Project, Spec Draft, Work Packet | neutral/gray |
| ready_for_review | Spec Draft, Work Packet | green/ready |
| review_complete | Review Run | green/complete |
| finding_open | Finding | amber/red by severity |
| finding_resolved | Finding | green/resolved |
| decision_needs_lock | Decision | amber needs-lock |
| decision_locked | Decision | green locked |
| decision_deferred | Decision | gray/amber deferred |
| evidence_attached | Evidence | green attached |
| evidence_missing | Evidence/Handoff | red/blocked |
| handoff_ready | Handoff Packet | green ready |
| handoff_blocked | Handoff Packet | red blocked |
| validation_passed | Validation Result | green |
| validation_warning | Validation Result | amber |
| validation_blocked | Validation Result | red |
| needs_sync | Artifact Reference / Preview | amber |
| handoff_only | Repo-write surfaces | purple |

## Non-executable example shape

```json
{
  "workspace": {},
  "project": {},
  "contextNodes": [],
  "selectedContext": {},
  "specTemplates": [],
  "specDraft": {},
  "specFields": [],
  "reviewRun": {},
  "findings": [],
  "decisions": [],
  "evidenceItems": [],
  "artifactRefs": [],
  "workPacket": {},
  "handoffPacket": {},
  "agentRoles": [],
  "validationResults": []
}
```

## Forbidden implications

Mock data must not imply:

- database persistence;
- live validation;
- real agent execution;
- real API call;
- real connector;
- MCP implementation;
- repo write;
- deployment;
- authentication;
- multi-user permissions.

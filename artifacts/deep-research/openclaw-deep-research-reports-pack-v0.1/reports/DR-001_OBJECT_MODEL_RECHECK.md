# DR-001 — OpenClaw Static MVP Object Model Recheck

Readiness: READY_WITH_ASSUMPTIONS  
Scope: Static MVP only  
Audience: Point, Codex, Reviewer, QA

## Executive summary

The current OpenClaw object model is coherent if it is framed as an artifact-first cockpit model rather than a runtime workflow-builder model.

The static MVP should make these objects first-class and visible:

- Project
- Context Node
- Spec Draft
- Review Run
- Finding
- Decision
- Evidence
- Work Packet

Supporting visible objects:

- Workspace
- Selected Context / Context Basket
- Spec Template
- Artifact Reference
- Handoff Packet
- Validation Result

Internal mock only:

- Agent Role
- Protected Exclusion metadata

Avoid or merge:

- Merge Decision Lock into Decision state.
- Treat Context Basket as the visible Selected Context panel, not a durable object.
- Treat Artifact as Artifact Reference, not a standalone artifact-management product.

## Recommended framing

OpenClaw should be framed as a **governed AI work cockpit**, not as:

- a generic workflow builder
- a research desk only
- a prompt library only
- a review system only
- a runtime agent orchestrator

The static MVP should prove the sequence:

```text
context → spec → review → findings → decisions → evidence → work packet → handoff readiness
```

## Object decision matrix

| object | status | why | static MVP treatment |
|---|---|---|---|
| Workspace | Supporting visible | Gives shell context without admin scope | Single workspace metadata only |
| Project | Core visible | Anchors the current build artifact | Home/top badge/workbench context |
| Context Node | Core visible | Primary selectable context unit | Workbench canvas and inspector |
| Context Basket | Supporting visible | Shows selected context | Rename conceptually to Selected Context |
| Spec Template | Supporting visible | Prevents freeform prompt sprawl | Selector/config only |
| Spec Draft | Core visible | Main builder-ready artifact | Spec Builder and Preview coverage |
| Review Run | Core visible | Governed inspection pass | Inspect-only Review Runs page |
| Finding | Core visible | Actionable review output | Finding cards and linked evidence |
| Decision Lock | Kill / merge | Duplicate of Decision state | Use Decision.status |
| Decision | Core visible | Point-lock gate | Decisions page and readiness gate |
| Evidence | Core visible | Traceability and trust | Trace & Evidence page |
| Artifact | Supporting visible | Needed as references | Artifact Reference only, no generic page |
| Work Packet | Core visible | Bounded build handoff unit | Handoff preview, Home, Trace |
| Handoff Packet | Supporting visible | Derived static package preview | Derived from Work Packet |
| Agent Role | Internal mock only | Ownership metadata | Chips only; no admin page |
| Validation Result | Supporting visible | Readiness/gate signal | Home, Rules, Handoff preview |

## Core model

```json
{
  "workspace": { "hasMany": ["projects"] },
  "project": { "hasMany": ["contextNodes", "specDrafts", "reviewRuns", "decisions", "evidenceItems", "workPackets"] },
  "selectedContext": { "derivedFrom": ["contextNodes", "protectedExclusions"] },
  "specDraft": { "createdFrom": ["selectedContext", "specTemplate"] },
  "reviewRun": { "reviews": ["specDraft", "selectedContext"], "produces": ["findings"] },
  "finding": { "belongsTo": "reviewRun", "mayRequire": ["decision", "evidenceItem"] },
  "decision": { "status": ["needs_lock", "locked", "deferred"], "gates": ["handoffPacket"] },
  "evidenceItem": { "links": ["contextNode", "specDraft.field", "finding", "decision", "artifactRef"] },
  "workPacket": { "contains": ["objective", "allowedPaths", "forbiddenActions", "acceptanceCriteria", "validationCommands"] },
  "handoffPacket": { "derivedFrom": ["workPacket", "decision", "evidenceItem", "validationResult", "artifactRef"] }
}
```

## Deferred runtime objects

Do not make these first-class in static MVP:

- execution run
- tool call
- connector
- MCP server/client/resource/tool/prompt implementation
- runtime session
- authentication user
- database record
- deployment environment
- queue/job
- external action

## Scope traps

| trap | why it is dangerous |
|---|---|
| Drag/drop workflow builder | Moves OpenClaw toward Dify/n8n/Flowise clone territory. |
| Runtime logs | Implies execution. |
| Connector catalog | Implies integration platform. |
| Agent admin page | Implies runtime orchestration and permissions. |
| Generic Artifact page | Dilutes concrete artifact-first workflow. |

## Recommendation

Lock the object model before further app implementation. The next Codex goal should persist product docs and QA guardrails first, then normalize static mock data.

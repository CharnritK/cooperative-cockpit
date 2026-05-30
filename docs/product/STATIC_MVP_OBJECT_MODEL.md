# Static MVP Object Model — OpenClaw Cooperative Cockpit

Status: Current product canon
Scope: Static MVP only
Readiness: ACCEPTED_FOR_STATIC_MVP

## Core visible objects — P0

| object | definition | primary UI |
|---|---|---|
| Project | Active static MVP work container and artifact context. | Home, top shell |
| Context Node | Selectable context source shown on Workbench canvas. | Workbench, inspector |
| Spec Draft | Controlled build spec being prepared from selected context. | Spec Builder, Preview |
| Review Run | Inspect-only review pass over selected context and spec. | Review Runs |
| Finding | Actionable advisory result from a Review Run. | Review Runs, Preview |
| Decision | Point-lockable choice that can block handoff. | Decisions, Home |
| Evidence | Traceable support item linking sources to target objects. | Trace & Evidence |
| Work Packet | Bounded Codex/build packet: objective, paths, constraints, acceptance criteria, validation. | Home, Preview, Handoff panel |

## Supporting visible objects

| object | treatment | primary UI |
|---|---|---|
| Workspace | Shell/breadcrumb context only; no multi-user or auth semantics. | Top shell/Home |
| Selected Context | Derived view of included Context Nodes and protected exclusions. | Workbench |
| Spec Template | Controlled spec pattern used to structure Spec Draft. | Spec Builder |
| Artifact Reference | Concrete reference to active artifact or preview; not a standalone page. | Top badge, Preview |
| Handoff Packet | Derived static preview from Work Packet + decisions + evidence + validation state. | Handoff preview |
| Validation Result | Static readiness indicator unless tied to actual validation evidence. | Home, Rules, Handoff preview |

## Internal mock only

| object | treatment |
|---|---|
| Agent Role | Metadata for ownership/scoping; no admin page in MVP. |
| Protected Exclusion | Static safety metadata under Selected Context. |

## Merged / renamed

| old term | locked treatment |
|---|---|
| Decision Lock | Use Decision with `needs_lock`, `locked`, or `deferred` state. |
| Context Basket | Use Selected Context panel. |
| Artifact | Use concrete Artifact Reference; avoid generic standalone Artifact object/page. |

## Deferred objects

- Runtime Workflow
- Execution Run
- Connector
- MCP Server
- MCP Client
- MCP Tool
- Database Record
- Auth User
- Deployment Environment
- Agent Session
- Tool Call
- Real Trace Span

## Relationship map

```json
{
  "workspace": {
    "hasMany": ["projects"],
    "staticMvpCardinality": "1"
  },
  "project": {
    "hasMany": [
      "contextNodes",
      "specDrafts",
      "reviewRuns",
      "decisions",
      "evidenceItems",
      "workPackets"
    ],
    "hasOne": ["activeArtifactRef"]
  },
  "selectedContext": {
    "derivedFrom": ["contextNodes", "protectedExclusions"],
    "mustNotPersistAsRuntimeState": true
  },
  "specDraft": {
    "createdFrom": ["selectedContext", "specTemplate"],
    "reviewedBy": ["reviewRuns"],
    "linkedTo": ["decisions", "evidenceItems", "workPackets"]
  },
  "reviewRun": {
    "reviews": ["specDraft", "selectedContext"],
    "produces": ["findings"]
  },
  "finding": {
    "belongsTo": "reviewRun",
    "mayRequire": ["decision", "evidenceItem"],
    "mayBlock": ["handoffPacket"]
  },
  "decision": {
    "status": ["needs_lock", "locked", "deferred"],
    "gates": ["handoffPacket"]
  },
  "evidenceItem": {
    "links": [
      "contextNode",
      "specDraft.field",
      "finding",
      "decision",
      "artifactRef"
    ]
  },
  "workPacket": {
    "contains": [
      "objective",
      "allowedPaths",
      "forbiddenActions",
      "acceptanceCriteria",
      "validationCommands"
    ],
    "produces": ["handoffPacket"]
  },
  "handoffPacket": {
    "derivedFrom": [
      "workPacket",
      "decision",
      "evidenceItem",
      "validationResult",
      "artifactRef"
    ],
    "mustRemainStaticPreview": true
  },
  "validationResult": {
    "validates": ["specDraft", "workPacket", "handoffPacket", "repoGuardrails"]
  }
}
```

## Static-only rule

No object may imply persistence, backend storage, external calls, real execution, repo writes, auth, deployment, or live agent orchestration.

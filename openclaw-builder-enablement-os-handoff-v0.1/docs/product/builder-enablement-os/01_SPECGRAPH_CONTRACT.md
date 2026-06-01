# SpecGraph Contract v0.1

## Purpose

SpecGraph is the primary product artifact.

It is an editable, lockable, evidence-backed graph that progresses from raw intent to builder-ready work.

## Canonical flow

```text
Raw intent
→ Idea Nodes
→ Functional Spec Nodes
→ Research Needs
→ Evidence Resources
→ Decision Locks
→ Architecture Nodes
→ Build Units
→ Phases
→ QA Gates
→ Handoff Packets
→ Reusable Patterns
```

## Core objects

| object | role |
|---|---|
| Mission | Objective frame |
| Idea Node | Concept fragment |
| Functional Spec Node | Accepted requirement |
| Research Need | Evidence gap |
| Evidence Resource | Source or proof |
| Decision Node | Lockable choice |
| Architecture Node | Derived structure |
| Code Object Node | Technical lens object |
| Relation Edge | Node relationship |
| Risk | Failure mode |
| Build Unit | Implementable slice |
| Phase | Delivery grouping |
| QA Gate | Readiness check |
| Work Packet | Builder task packet |
| Handoff Packet | Handoff preview |
| Reusable Pattern | Validated blueprint |

## Lifecycle states

```text
raw
clarified
proposed
needs_research
spec_candidate
accepted
locked_core
architecture_ready
build_ready
in_progress
validated
reusable
archived
```

## Lock types

- Core Lock.
- Contract Lock.
- Domain Lock.
- Evidence Lock.
- Phase Lock.

## Node schema

```ts
interface SpecGraphNode {
  id: string;
  kind: string;
  title: string;
  summary: string;
  status: string;
  owner?: string;
  layer?: string;
  parent_id?: string;
  source_node_ids?: string[];
  evidence_ids?: string[];
  decision_ids?: string[];
  risk_ids?: string[];
  acceptance_criteria?: string[];
  non_goals?: string[];
  protected_surfaces?: string[];
  reuse_tags?: string[];
  lock?: SpecGraphLock;
}
```

## Edge schema

```ts
interface SpecGraphEdge {
  id: string;
  source_id: string;
  target_id: string;
  relation_type: string;
  evidence_ids?: string[];
  confidence?: "fixture" | "human_asserted" | "ai_suggested" | "verified";
  limitations?: string[];
}
```

## Handoff readiness

A SpecGraph is handoff-ready only when mission, core lock, functional spec, evidence, decisions, architecture, build units, QA gates, acceptance criteria, and validation commands are present.

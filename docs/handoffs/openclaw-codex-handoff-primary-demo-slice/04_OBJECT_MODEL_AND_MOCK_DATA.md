# 04 Object Model and Mock Data

## Working object model

Use the existing candidate set:

- Workspace
- Project
- Context Node
- Context Basket
- Spec Template
- Spec Draft
- Review Run
- Finding
- Decision Lock
- Artifact
- Evidence
- Handoff Packet
- Agent Role
- Validation Result
- Work Packet

## Object relationships

Workspace contains Project.

Project contains Context Nodes, Context Basket, Spec Draft, Review Runs, Decisions, Evidence, Artifacts, Work Packet, and Handoff Packet.

Context Basket selects Context Nodes.

Spec Draft references Context Basket.

Review Run produces Findings.

Findings reference Spec Draft or Artifact.

Decision Lock gates Handoff Packet.

Evidence links source context to spec, decision, validation, and handoff.

Validation Result contributes to handoff readiness.

## Existing repo mock data alignment

`mockData.js` already has nodes, edges, context items, protected items, spec fields, reviews, decisions, trace links, and rules.

`handoff-placeholder.json` already has selected context, decisions, review findings, trace links, governance state, and blocked reasons.

## Required mock-data refinements

Add or align:

- `primaryDemoPath`
- `evidenceItems`
- `validationResults`
- `handoffPacket`
- `scenarioSteps`
- clearer blocked/ready reasons

## JSON-like example

```json
{
  "primaryDemoPath": {
    "id": "GS-001",
    "name": "Rough context to governed spec handoff",
    "status": "handoff-blocked",
    "requiredLocks": ["D-005"],
    "requiredEvidence": ["EV-001", "EV-002", "EV-003"],
    "artifactCreated": "HP-001"
  }
}
```

## Fields Codex must not imply are persisted

- generated_at
- exported_at
- run_id
- execution_status
- external_connector_id
- repository_write_id

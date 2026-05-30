# 03 Primary Demo Path

Status: Historical handoff packet. Current product canon lives in `docs/product/**`.

## Opening state

The viewer opens the static MVP at Home.

The cockpit shows an active artifact, progress, protected exclusions, and pending locks.

## Click path

1. Home
2. Workbench
3. Spec Builder
4. Decisions
5. Trace & Evidence
6. Preview
7. Handoff control / static handoff placeholder

## User intent

A Business/Product Lead wants to turn rough OpenClaw context into a builder-ready Codex handoff without giving the agent unsafe authority.

## Starting rough context

- Rough product concept
- Architecture view
- Feedback packet
- Protected exclusions

## Selected context

- Architecture View
- GS-001 Rough Concept -> Builder Spec
- Feedback Packet

## Artifact created

- Spec Draft
- Decision
- Evidence Items
- Validation Result
- Handoff Packet

## Governance checkpoint

D-005 Codex handoff gating.

The demo should show that handoff is blocked until acceptance criteria, evidence, and Decision state are ready.

## Evidence shown

- Context-to-spec trace
- Spec-to-decision trace
- Validation readiness item
- Handoff placeholder item

## Readiness condition

Handoff is ready only when required spec fields are complete, decisions are locked, and evidence is attached.

## Success state

Viewer understands that OpenClaw does not “run an agent.” It prepares a bounded handoff packet.

## Stop/failure state

If evidence or acceptance criteria are missing, the handoff remains blocked.

## Demo narration

“We begin with rough context, select only the allowed context, build a spec, resolve the Point decision gate, inspect trace evidence, and then preview the bounded handoff packet. Nothing executes. The system makes readiness and risk visible.”

## What not to show

Do not show real Codex execution, exports to a repository, backend calls, external connectors, or live agent orchestration.

# Workbench UX Contract v0.1

## Purpose

Workbench is the interactive surface for editing and inspecting SpecGraph.

It is not the product center.

## Core rule

```text
SpecGraph first.
Workbench second.
Canvas third.
Chat last.
```

## Required behavior

The Workbench must support:

- vague intent clarification;
- editable idea nodes;
- AI proposals against selected node only;
- accept, edit, or reject flow;
- core locks;
- research-needed queue;
- functional spec drafting;
- architecture decomposition;
- build-unit decomposition;
- phase planning later;
- evidence, risks, decisions, and readiness inspection;
- Work Packet and Handoff Packet preview.

## Selected-node inspector

Every selected node should answer:

- What is this?
- Why does it matter?
- Is it editable or locked?
- What does it depend on?
- What is missing?
- What evidence supports it?
- What decision is needed?
- What can be built from it?
- Who owns it?

## Lens model

| complexity | default lens |
|---|---|
| Low | Guided Flow |
| Medium | Spec Map / Lineage |
| High | Control Plane |
| Technical | Code Review Lens |

## Confusion controls

| risk | mitigation |
|---|---|
| Mindmap drift | lifecycle + readiness |
| Workflow drift | no execution verbs |
| Graph overload | progressive disclosure |
| AI overwrite | proposal-only |
| Reuse pollution | reuse gate |
| Canvas dominance | SpecGraph copy |

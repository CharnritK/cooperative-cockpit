# 00 Executive Brief

Status: Historical handoff packet. Current product canon lives in `docs/product/**`; current project state lives in `docs/ops/STATUS.md`.

## Primary scenario

Product spec creation ending in a gated handoff preview

## Why this scenario first

This path best proves OpenClaw's core value: turning rough context into a builder-ready handoff with visible governance.

It also fits the current repo. The existing static MVP already includes Workbench, Spec Builder, Review Runs, Preview, Decisions, Trace & Evidence, and Rules & Scope. The first slice can align mock data and copy without adding a page or backend behavior.

## Product story

OpenClaw turns rough AI-work context into governed artifacts, visible evidence, and bounded handoff packets.

## Demo story

A product lead selects context, creates a governed spec, resolves a decision gate, verifies evidence, and opens a static handoff preview.

## Top required UI states

- Context selected
- Spec draft
- Decision pending
- Evidence attached
- Handoff blocked / ready

## Top mock data objects

- Context Node
- Spec Draft
- Decision
- Evidence Item
- Handoff Packet

## Top scope traps

- Adding backend/API behavior
- Adding new pages
- Creating real exports
- Using execution-style labels
- Expanding the object model

## First Codex `/goal`

See `codex/goal.md`.

## Confidence

High for the current static MVP baseline.

Reason: repo inspection and the now-persisted Deep Research report both support the static context-to-governed-spec-to-gated-handoff path. Treat this packet as historical where it conflicts with `docs/product/**`.

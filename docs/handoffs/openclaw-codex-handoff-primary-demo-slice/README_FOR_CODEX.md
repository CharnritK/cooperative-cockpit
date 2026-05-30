# README FOR CODEX

This package is a static-MVP handoff package for the OpenClaw Cooperative Cockpit repo.

It translates the available research prompt, project constraints, and read-only repo inspection into one bounded Codex implementation slice. It is not implementation evidence. It does not claim that the recommended slice has been executed.

## What Codex should do next

Use `codex/goal.md` as the standalone prompt.

The recommended slice is:

> Align the existing static MVP around “rough context -> governed spec -> gated handoff preview” using existing pages, unified mock data, decision lock visibility, evidence visibility, validation states, and handoff preview.

## What Codex must not do

Codex must not add backend/API/auth/database/deployment/runtime work, real agent orchestration, real connectors, MCP implementation, dependencies, secrets, ninth pages, or repo writes outside allowed paths.

## How to read this package

Start with these files:

1. `00_EXECUTIVE_BRIEF.md`
2. `02_REPO_INSPECTION.md`
3. `03_PRIMARY_DEMO_PATH.md`
4. `08_CODEX_GOAL.md`
5. `codex/goal.md`

## Review gate before Codex starts

Reviewer: Point

Scope: primary scenario, target files, forbidden changes, acceptance criteria, validation steps, stop conditions, static MVP boundaries.

Pass condition: Point confirms the handoff is safe for Codex local execution without backend/API/auth/database/deployment/runtime work or new dependencies.

Fallback: stop, revise, or split into a smaller Codex slice.

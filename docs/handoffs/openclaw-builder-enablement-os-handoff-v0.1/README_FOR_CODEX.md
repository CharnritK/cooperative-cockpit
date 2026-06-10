# README for Codex

## Purpose

This package is a repo-assimilation handoff for Builder Enablement OS / SpecGraph.

## Critical rule

Run GOAL-016 first.

Do not start app code changes before the product lock is accepted.

## Boundaries

- No backend.
- No API.
- No auth.
- No database.
- No deployment.
- No runtime mutation.
- No real AI execution.
- No external connectors.
- No MCP.
- No new dependency.
- No parser or LSP.
- No indexing.
- No repo ingestion.
- No repo writes from the app.
- No source-code upload.

## Execution gate

GOAL-017, GOAL-018, and GOAL-019 began as follow-on prompts. Point approved the GOAL-016 product lock on 2026-06-04, and those follow-on goals were later explicitly executed on branch `agent/GOAL-017-019-specgraph-lenses` as bounded static/mock-only work. Do not broaden that branch into backend/API/auth/database/deployment/runtime, real AI, external connector, MCP, parser/LSP/indexing, repo-ingestion, source-upload, new-dependency, or app-side repo-write work.

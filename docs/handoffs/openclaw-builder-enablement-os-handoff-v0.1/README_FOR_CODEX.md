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

GOAL-017, GOAL-018, and GOAL-019 are follow-on prompts only. Do not execute them until Point accepts or revises the GOAL-016 product lock.

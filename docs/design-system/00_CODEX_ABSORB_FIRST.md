# 00 — Codex Absorb First

## Purpose

This is the Design Operating System v4 absorber for Codex. It converts the package into a staged, bounded implementation sequence.

## What Codex must do first

1. Read `CODEX_START_HERE.md`.
2. Read `MANIFEST.md`.
3. Read this file.
4. Execute only `.codex/goals/GOAL-DS-001-assimilate-design-os-docs.md`.
5. Stop and report.

## Source of truth order

1. Point-approved product locks in `01_DECISIONS_AND_PRODUCT_LOCKS.md`.
2. Repo constraints and validation output from the current session.
3. This package's Codex goals.
4. Existing repo docs after refresh.
5. Assumptions marked as assumptions.

## Static constraints

- No backend.
- No API calls.
- No authentication.
- No database.
- No deployment work.
- No runtime workflow execution.
- No real AI execution.
- No real agent orchestration.
- No persistent storage unless later explicitly approved.
- No external connectors.
- No repository-write behavior from the UI.
- No CDN scripts.
- No remote fonts.
- No real secrets, credentials, or PII in mock data.
- No public/demo language implying a working orchestrator.
- Avoid user-facing action labels that imply execution, such as “Run,” except existing locked page/title contexts.
- Storybook and Playwright are dev/test only, never production runtime.

## Execution sequence

1. DS-001 — docs assimilation only.
2. DS-002A — Storybook scaffold.
3. DS-002B — Playwright scaffold.
4. DS-003 — token audit/finalization.
5. DS-004 — component taxonomy/stories.
6. DS-005 — mock data/screen registry.
7. DS-006 — visual baselines/evidence.

Do not skip goals. Do not combine goals unless Point approves.

## Evidence rule

Validation, screenshots, and baselines are not accepted unless exact command output or evidence paths are reported.

## Stop rule

If the work requires backend/API/auth/database/deployment/runtime mutation, stop and ask Point.

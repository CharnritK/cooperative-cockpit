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

## Current follow-on handoff

The final Claude Design handoff package has been assimilated as a staged adoption gate, not as active app implementation authority.

Read:

1. `docs/design-system/CLAUDE_DESIGN_FINAL_DECISION.md`
2. `docs/design-system/CLAUDE_DESIGN_SYSTEM_ADOPTION_REVIEW.md`
3. `.codex/goals/GOAL-022-claude-design-system-adoption-review.md`
4. `quality/CLAUDE_DESIGN_QA_AND_VALIDATION_PLAN.md`
5. `quality/CLAUDE_DESIGN_RISK_REGISTER.md`
6. `docs/design-system/13_STATUS_LANGUAGE_CANON.md`

GOAL-022 must run before any Claude Design adoption decision. GOAL-023 remains gated until GOAL-022 evidence is reviewed and Point approves any required active app visual, token, canon, baseline, or provenance change.

GOAL-023 documentation/QA work is complete when the status-language canon, QA checks, evidence, and validation outputs are present. Any active app CSS/runtime status semantics cleanup remains a separate Point-gated app change.

## Evidence rule

Validation, screenshots, and baselines are not accepted unless exact command output or evidence paths are reported.

## Stop rule

If the work requires backend/API/auth/database/deployment/runtime mutation, stop and ask Point.

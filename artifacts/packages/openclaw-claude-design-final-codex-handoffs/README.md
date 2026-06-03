# OpenClaw Claude Design — Final Codex Handoffs

## What this package is

This package is a final synthesis and decision handoff for the Claude-proposed design-system package in the `CharnritK/cooperative-cockpit` repo.

It converts the design review into bounded Codex work. It does not authorize a broad redesign, runtime changes, dependencies, backend/API/auth/database/deployment, real AI/model calls, external connectors, browser storage persistence, source-code upload, or app repo-write behavior.

## Who should use it

- Point: final product and approval authority.
- Codex: bounded implementation/review agent.
- QA/reviewer: validation and gate verification.
- ChatGPT Project/Ops Desk: reviewer and handoff coordinator.

## How Codex should consume it

Use the files in this order:

1. Read `FINAL_DECISION.md`.
2. Execute `CODEX_HANDOFF_GOAL_022.md` first.
3. Stop for Point review if GOAL-022 identifies any active app visual/token/canon change.
4. Execute `CODEX_HANDOFF_GOAL_023.md` only after the GOAL-022 evidence is reviewed and the required gate is satisfied.
5. Record validation and evidence exactly as required in `QA_AND_VALIDATION_PLAN.md`.

## Required order of execution

1. `CODEX_HANDOFF_GOAL_022.md` — design-system adoption review and canon mapping.
2. Point review gate — required before active app visual changes, screenshot baseline promotion, token canon edits, product-language changes, or provenance movement.
3. `CODEX_HANDOFF_GOAL_023.md` — smallest safe follow-on slice, scoped to status-language/token-canon alignment unless Point explicitly approves more.

## Approval gates

Point approval is required before:

- active app visual changes,
- screenshot baseline promotion,
- token canon changes,
- deleting or moving provenance assets,
- changing product language/canon,
- adding dependencies,
- changing validation scripts,
- modifying runtime behavior.

## What not to do

- Do not import Claude Design wholesale.
- Do not move the React/Babel wireframe gallery into active app runtime.
- Do not add external CDN dependencies to the active static MVP.
- Do not duplicate tokens already present in `apps/static-mvp/styles/base.css`.
- Do not add routes, pages, backend/API/auth/database/deployment, real AI/model execution, connectors, browser storage persistence, secrets, private data, repo-write behavior, or product-scope expansion.
- Do not claim validation passed unless Codex actually ran the commands and records output.

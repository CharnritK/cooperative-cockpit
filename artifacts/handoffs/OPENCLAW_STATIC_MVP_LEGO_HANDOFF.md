# OpenClaw Static MVP Lego Handoff

## Objective

Assimilate the static MVP product lock package into the repo and use it to guide Codex implementation.

## Audience

- Point
- Codex
- Reviewer
- QA agent
- Future ChatGPT web agent

## Recommended sequence

1. Review `REVIEW_GATE.md`.
2. Approve or redirect `docs/product/**`.
3. Run GOAL-004.
4. Review GOAL-004 output.
5. Run GOAL-005 only after object model is approved.
6. Continue GOAL-006 through GOAL-008 in order.

## Non-goals

- No backend
- No API
- No auth
- No database
- No deployment
- No runtime execution
- No real agent orchestration
- No connectors
- No MCP
- No new dependencies

## Review gate

Point must approve object model and product-doc path before app-source work.

## Stop conditions

Stop if a task requires:
- new dependency;
- app architecture change;
- backend/API/database/auth/deployment;
- runtime execution;
- connector or MCP implementation;
- repo write from app;
- secret or credential handling;
- files outside allowed paths.

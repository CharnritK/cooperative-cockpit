# Repo Assimilation Plan

## Objective

Assimilate Builder Enablement OS / SpecGraph product lock into the repo with minimal Codex work.

## Recommended order

1. GOAL-016 — product docs only.
2. GOAL-017 — static SpecGraph fixture docs/data.
3. GOAL-018 — Workbench copy and lens alignment.
4. GOAL-019 — static code-object lens fixture.

## First safe Codex task

GOAL-016 was the first safe Codex task and is now Point-approved as of 2026-06-04.

The next Builder Enablement lane task is GOAL-017 only if Point explicitly requests bounded follow-on execution. GOAL-017, GOAL-018, and GOAL-019 remain scoped to their own allowed paths, forbidden actions, and validation gates.

## Review gate

Reviewer: Point.  
Scope: product lock, terminology, MVP boundary, code-object lens scope.  
Pass condition: Passed on 2026-06-04; SpecGraph lock is accepted and does not expand implementation scope.
Fallback: revise docs, do not proceed to fixtures or UI.

# Repo Assimilation Plan

## Objective

Assimilate Builder Enablement OS / SpecGraph product lock into the repo with minimal Codex work.

## Recommended order

1. GOAL-016 — product docs only.
2. GOAL-017 — static SpecGraph fixture docs/data.
3. GOAL-018 — Workbench copy and lens alignment.
4. GOAL-019 — static code-object lens fixture.

## First safe Codex task

Run GOAL-016 only.

It is docs-only and should not modify app source.

## Review gate

Reviewer: Point.  
Scope: product lock, terminology, MVP boundary, code-object lens scope.  
Pass condition: SpecGraph lock is accepted and does not expand implementation scope.  
Fallback: revise docs, do not proceed to fixtures or UI.

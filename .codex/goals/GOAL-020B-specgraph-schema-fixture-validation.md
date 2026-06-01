/goal
Title: GOAL-020B QA schema — SpecGraph fixture validation plan

Objective:
Add schema and fixture validation docs/scripts for SpecGraph, with no dependencies.

Allowed paths:
- schemas/**
- scripts/**
- tests/specgraph/**
- package.json
- docs/product/builder-enablement-os/**
- artifacts/evidence/**
- .codex/goals/GOAL-020B-specgraph-schema-fixture-validation.md

Forbidden actions:
- No external schema packages.
- No app behavior changes.
- No dependencies.
- No backend/API/runtime.
- No source-control publication.

Required work:
1. Add or plan no-dependency fixture checker.
2. Detect schema/fixture mismatch.
3. Validate node kinds, statuses, and relation integrity. Do not require a relation enum until Point approves one.
4. Add negative cases if test harness exists.
5. Run validation.

Acceptance criteria:
1. Fixture mismatch is detected.
2. Scenario coverage is checked.
3. Static guardrails are checked.
4. No dependency added.

Validation commands:
- npm run validate
- node scripts/check_specgraph_fixtures.js
- git diff --check

Stop conditions:
- Stop if package dependency is needed.
- Stop if schema semantics need Point decision.

Final response format:
Verdict:
Changed files:
Validation output:
Risks:
Next recommended action:

/goal
Title: GOAL-020C QA scripts — Builder Enablement guardrail checks

Objective:
Add no-dependency scripts to check Builder Enablement OS guardrails.

Allowed paths:
- scripts/**
- tests/**
- package.json
- docs/product/builder-enablement-os/**
- artifacts/evidence/**
- .codex/goals/GOAL-020C-builder-enablement-guardrail-scripts.md

Forbidden actions:
- No new dependencies.
- No backend/API/runtime.
- No app feature work.
- No parser/LSP.
- No source-control publication.

Required work:
1. Add guardrail script.
2. Check forbidden terms/API/storage/dependency drift.
3. Check SpecGraph-first product text.
4. Wire into npm validate only if safe.
5. Run validation.

Acceptance criteria:
1. Guardrail script catches forbidden scope.
2. Existing validation still works.
3. No dependencies added.

Validation commands:
- npm run validate
- node scripts/check_builder_enablement_os_guardrails.js
- git diff --check

Stop conditions:
- Stop if validation wiring breaks unrelated checks.
- Stop if dependency is required.

Final response format:
Verdict:
Changed files:
Validation output:
Risks:
Next recommended action:

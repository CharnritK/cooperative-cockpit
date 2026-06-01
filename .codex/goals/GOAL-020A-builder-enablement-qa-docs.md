/goal
Title: GOAL-020A QA docs — Builder Enablement OS test strategy

Objective:
Persist a detailed QA strategy for Builder Enablement OS / SpecGraph without app code changes.

Allowed paths:
- docs/product/builder-enablement-os/**
- docs/ops/STATUS.md
- docs/TASKS.md
- docs/ROADMAP.md
- artifacts/evidence/**
- artifacts/packages/openclaw-builder-enablement-os-qa-planning-v0.1/**
- artifacts/handoffs/**
- .codex/goals/GOAL-020A-builder-enablement-qa-docs.md

Forbidden actions:
- No app source edits.
- No dependencies.
- No backend/API/auth/deployment.
- No runtime behavior.
- No product scope expansion.
- No source-control publication.

Required work:
1. Add QA test strategy doc.
2. Add product acceptance matrix.
3. Add review gates.
4. Run validation.
5. Record evidence.

Acceptance criteria:
1. SpecGraph-first tests exist.
2. Static guardrail tests exist.
3. Code lens boundary tests exist.
4. No app source changed.

Validation commands:
- npm run validate
- git diff --check

Stop conditions:
- Stop if app code must change.
- Stop if validation fails outside docs scope.
- Stop if Point-lock conflict appears.

Final response format:
Verdict:
Changed files:
Validation output:
Risks:
Next recommended action:

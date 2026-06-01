/goal
Title: GOAL-018 Workbench scenario lenses — SpecGraph-first UX

Objective:
Refine Workbench copy and scenario lens framing so product reads as SpecGraph-first Builder Enablement OS, not canvas-first workflow builder.

Autonomy level:
A2 bounded change unless Point approves otherwise.

Allowed paths:
- apps/static-mvp/index.html
- apps/static-mvp/src/app.js
- apps/static-mvp/src/mockData.js
- apps/static-mvp/styles/**
- apps/static-mvp/BUILD_SPEC.md
- apps/static-mvp/QA_CHECKLIST.md
- artifacts/evidence/**
- .codex/goals/GOAL-018-workbench-scenario-lenses.md

Forbidden actions:
- Do not add dependencies.
- Do not add backend/API/auth/database/deployment.
- Do not introduce runtime mutation, real AI execution, external connectors, MCP, or repo writes.
- Do not touch secrets.
- Do not modify files outside allowed paths.
- Do not claim validation passed unless commands actually pass.

Required work:
1. Reframe lens language.
2. Ensure Workbench copy communicates SpecGraph-first value.
3. Preserve existing mechanics if needed.
4. Update QA checklist.
5. Run validation.

Acceptance criteria:
1. Product copy centers SpecGraph.
2. No user-facing control implies live execution.
3. Static guardrails remain visible.

Validation commands:
- npm run validate
- npm run test:visual:list
- git diff --check

Stop conditions:
- Stop if visual redesign expands scope.
- Stop if dependency or new route is required.
- Stop if validation fails outside scope.

Final response format:
Verdict:
Changed files:
Validation output:
Risks:
Next recommended action:

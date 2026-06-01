/goal
Title: GOAL-016 Product lock — Builder Enablement OS and SpecGraph

Objective:
Create product canon docs that lock OpenClaw Cooperative Cockpit as a Builder Enablement OS centered on SpecGraph, with code-object explorer as a specialized evidence-linked technical lens.

Autonomy level:
A2 bounded change unless Point approves otherwise.

Allowed paths:
- docs/product/builder-enablement-os/**
- docs/ops/STATUS.md
- artifacts/evidence/**
- .codex/goals/GOAL-016-product-lock-builder-enablement-os.md

Forbidden actions:
- Do not add dependencies.
- Do not add backend/API/auth/database/deployment.
- Do not introduce runtime mutation, real AI execution, external connectors, MCP, or repo writes.
- Do not touch secrets.
- Do not modify files outside allowed paths.
- Do not claim validation passed unless commands actually pass.

Required work:
1. Create product-lock docs.
2. Define SpecGraph object model, lifecycle, lock model, evidence model, readiness model, and static MVP boundaries.
3. Define code-object explorer as specialist lens.
4. Run validation.
5. Record evidence.

Acceptance criteria:
1. Docs state SpecGraph > Workbench > Nodes > Handoff.
2. Static MVP guardrails remain unchanged.
3. No app source files are changed.
4. Validation is reported honestly.

Validation commands:
- npm run validate
- git diff --check

Stop conditions:
- Stop if app code must change.
- Stop if scope requires new page/dependency/backend/runtime behavior.
- Stop if validation fails outside docs-only scope.

Final response format:
Verdict:
Changed files:
Validation output:
Risks:
Next recommended action:

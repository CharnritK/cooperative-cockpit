/goal
Title: GOAL-019 Static code-object review lens fixture

Objective:
Add a static mock-only code-object review lens fixture that demonstrates evidence-linked selected-object review without parser, LSP, repo ingestion, or dependencies.

Autonomy level:
A2 bounded change unless Point approves otherwise.

Allowed paths:
- apps/static-mvp/src/mockData.js
- apps/static-mvp/src/app.js
- apps/static-mvp/styles/**
- docs/product/builder-enablement-os/06_CODE_OBJECT_EXPLORER_INTEGRATION.md
- apps/static-mvp/QA_CHECKLIST.md
- artifacts/evidence/**
- .codex/goals/GOAL-019-static-code-object-lens-fixture.md

Forbidden actions:
- Do not add dependencies.
- Do not add backend/API/auth/database/deployment.
- Do not introduce runtime mutation, real AI execution, external connectors, MCP, or repo writes.
- Do not touch secrets.
- Do not modify files outside allowed paths.
- Do not claim validation passed unless commands actually pass.

Required work:
1. Create static CodeObject, RelationEdge, EvidenceRef, ReviewFinding, and AgentAnnotation fixtures.
2. Show bounded selected-object relationships only.
3. Separate facts, findings, and AI annotations.
4. Update QA.
5. Run validation.

Acceptance criteria:
1. No whole-repo graph.
2. Every finding has evidence refs.
3. No new dependency or runtime behavior.

Validation commands:
- npm run validate
- git diff --check

Stop conditions:
- Stop if parser/LSP/dependency is needed.
- Stop if new page is required.
- Stop if real source code or secrets would be displayed.

Final response format:
Verdict:
Changed files:
Validation output:
Risks:
Next recommended action:

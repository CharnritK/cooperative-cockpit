/goal
Title: GOAL-019 Static code-object review lens fixture

Objective:
Add a static mock-only code-object review lens fixture that demonstrates evidence-linked selected-object review without parser, LSP, repo ingestion, or dependencies.

Autonomy level:
A2 bounded change unless Point approves otherwise.

Execution gate:
Do not run this goal until Point explicitly accepts or revises the GOAL-016 Builder Enablement OS / SpecGraph product lock.

Status: Executed by Codex on 2026-06-04 after Point's explicit scoped implementation request. The GOAL-016 product-lock gate above is satisfied; final token approval, visual-baseline promotion, commits, pushes, PRs, deployment, and publication remain out of scope.

Allowed paths:
- apps/static-mvp/src/mockData.js
- apps/static-mvp/src/app.js
- apps/static-mvp/styles/**
- docs/product/builder-enablement-os/06_CODE_OBJECT_EXPLORER_INTEGRATION.md
- apps/static-mvp/QA_CHECKLIST.md
- artifacts/evidence/**
- artifacts/packages/openclaw-cooperative-cockpit-mvp.manifest.json
- .codex/goals/GOAL-019-static-code-object-lens-fixture.md

Forbidden actions:
- Do not add dependencies.
- Do not add backend/API/auth/database/deployment.
- Do not introduce runtime mutation, real AI execution, external connectors, MCP, parser/LSP/indexing, source-code upload, repo ingestion, or repo writes from app code.
- Do not touch secrets.
- Do not modify files outside allowed paths.
- Do not commit, push, open PRs, deploy, or publish.
- Do not claim validation passed unless commands actually pass.

Required work:
1. Create static CodeObject, RelationEdge, EvidenceRef, ReviewFinding, and AgentAnnotation fixtures.
2. Show bounded selected-object relationships only.
3. Separate facts, findings, and AI annotations.
4. Update QA.
5. Run validation.

Implementation record:
- Added static `codeObjects`, `relationEdges`, `evidenceRefs`, `reviewFindings`, and `agentAnnotations` fixtures.
- Rendered `code_review_lens` inside the existing Workbench object editor panel with separate Facts, Relations, Findings, and AI annotations sections.
- Kept every review finding evidence-linked and kept the fixture bounded to one selected Workbench object neighborhood.
- Refreshed the static-MVP manifest checksum because app-source edits changed `apps/static-mvp/**`.

Acceptance criteria:
1. No whole-repo graph.
2. Every finding has evidence refs.
3. No new dependency or runtime behavior.

Validation commands:
- npm run validate
- git diff --check

Stop conditions:
- Stop if Point supersedes or narrows the 2026-06-04 GOAL-016 product-lock approval.
- Stop if parser/LSP/dependency is needed.
- Stop if new page is required.
- Stop if real source code or secrets would be displayed.

Final response format:
Verdict:
Changed files:
Validation output:
Risks:
Next recommended action:

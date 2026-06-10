/goal
Title: GOAL-018 Workbench scenario lenses — SpecGraph-first UX

Objective:
Refine Workbench copy and scenario lens framing so product reads as SpecGraph-first Builder Enablement OS, not canvas-first workflow builder.

Autonomy level:
A2 bounded change unless Point approves otherwise.

Execution gate:
Do not run this goal until Point explicitly accepts or revises the GOAL-016 Builder Enablement OS / SpecGraph product lock.

Status: Executed by Codex on 2026-06-04 after Point's explicit scoped implementation request. The GOAL-016 product-lock gate above is satisfied; final token approval, visual-baseline promotion, commits, pushes, PRs, deployment, and publication remain out of scope.

Allowed paths:
- apps/static-mvp/index.html
- apps/static-mvp/src/app.js
- apps/static-mvp/src/mockData.js
- apps/static-mvp/styles/**
- apps/static-mvp/BUILD_SPEC.md
- apps/static-mvp/QA_CHECKLIST.md
- artifacts/evidence/**
- artifacts/packages/openclaw-cooperative-cockpit-mvp.manifest.json
- .codex/goals/GOAL-018-workbench-scenario-lenses.md

Forbidden actions:
- Do not add dependencies.
- Do not add backend/API/auth/database/deployment.
- Do not introduce runtime mutation, real AI execution, external connectors, MCP, parser/LSP/indexing, source-code upload, repo ingestion, or repo writes from app code.
- Do not touch secrets.
- Do not modify files outside allowed paths.
- Do not commit, push, open PRs, deploy, or publish.
- Do not claim validation passed unless commands actually pass.

Required work:
1. Reframe lens language.
2. Ensure Workbench copy communicates SpecGraph-first value.
3. Preserve existing mechanics if needed.
4. Update QA checklist.
5. Run validation.

Implementation record:
- Reframed the Workbench header and scenario-lens controls around SpecGraph.
- Preserved the existing `spatial`, `mixed`, and `flat` mode keys, node order, board positions, popovers, object editor panel, and twelve-route boundary.
- Bumped cache-busting query strings for changed static assets only.
- Refreshed the static-MVP manifest checksum because app-source edits changed `apps/static-mvp/**`.

Acceptance criteria:
1. Product copy centers SpecGraph.
2. No user-facing control implies live execution.
3. Static guardrails remain visible.

Validation commands:
- npm run validate
- npm run test:visual:list
- git diff --check

Stop conditions:
- Stop if Point supersedes or narrows the 2026-06-04 GOAL-016 product-lock approval.
- Stop if visual redesign expands scope.
- Stop if dependency or new route is required.
- Stop if validation fails outside scope.

Final response format:
Verdict:
Changed files:
Validation output:
Risks:
Next recommended action:

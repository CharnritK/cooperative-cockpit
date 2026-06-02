/goal
Title: GOAL-021 Static MVP realistic product journey and object-aware Workbench

Objective:
Assimilate and implement the OpenClaw Static MVP UX Upgrade Handoff Package v0.1 as a bounded local-only static UI change.

Autonomy level:
A2 bounded change unless Point approves otherwise.

Allowed paths:
- apps/static-mvp/**
- tests/visual/**
- docs/handoffs/openclaw-static-mvp-ux-upgrade-handoff-v0.1/**
- docs/ops/STATUS.md
- docs/ROADMAP.md
- docs/TASKS.md
- artifacts/evidence/**
- artifacts/handoffs/**
- artifacts/packages/openclaw-cooperative-cockpit-mvp.manifest.json
- .codex/goals/GOAL-021-static-mvp-realistic-product-journey.md

Forbidden actions:
- Do not add dependencies.
- Do not add backend/API/auth/database/deployment.
- Do not introduce runtime mutation, real AI/model execution, external connectors, MCP, browser storage persistence, secrets, private data, or repo-write behavior from app code.
- Do not commit, push, open PRs, deploy, publish, or merge without explicit Point approval.
- Do not claim validation passed unless commands actually pass.

Required work:
1. Inspect the static MVP repo surface before editing.
2. Add Landing, Static Demo Entry, Project Hub, and Project Initialize routes.
3. Preserve existing Home, Workbench, Spec Builder, Review Runs, Preview, Decisions, Trace & Evidence, and Rules & Scope pages.
4. Reframe Workbench as an object-aware editor with Object Outline, Spatial Board, right object panel, focus lenses, readiness queue, and mock local copilot.
5. Preserve Spatial Board as default and keep Mixed Map and Flat Flow available.
6. Preserve selected object, viewport, view mode, focus lens, right panel tab, outline expansion, and helper state across Workbench helper open/close.
7. Add safe public/composite Listing Compliance & Seller Appeal Review Harness scenario copy.
8. Update QA/docs/status/evidence and refresh the static MVP package checksum.
9. Move the source handoff package into governed repo paths after tests pass.
10. Run validation and report exact results.

Acceptance criteria:
1. Landing explains OpenClaw, audience, and governed builder-ready handoff packets.
2. Static Demo Entry clearly avoids real login/auth implications.
3. Project Hub includes OpenClaw Cooperative Cockpit and Listing Compliance & Seller Appeal Review Harness project cards.
4. Project Initialize includes Builder Enablement OS, Agent Harness SpecGraph, and Compliance Review Workflow templates, mock guided chat, selected context preview, and Open Workbench CTA.
5. Workbench shows Object Outline, board, right object editor, focus lens selector, readiness queue, mock local copilot, and helper panels.
6. Outline and board selection stay synchronized.
7. Parent/child/trail, evidence, decision, open-work, and handoff-blocker focus lenses visibly update highlights without resetting state.
8. Mock local copilot actions update browser-local state only.
9. Existing workflow pages remain reachable.
10. No dependencies, backend/API/auth/database/deployment, real AI/model calls, browser storage persistence, secrets, private data, remote calls, or repo-write behavior are introduced.
11. Source handoff package no longer remains as an ungoverned repo-root folder after tests pass.
12. Validation evidence is recorded honestly.

Validation commands:
- npm run validate
- npm run test:visual:list
- npm run test:visual
- npx playwright test -c playwright.config.mjs tests/visual/static-mvp.goal021.visual.spec.mjs
- git diff --check

Stop conditions:
- Stop if implementation requires dependencies, backend/API/auth/database/deployment, real AI/model calls, external connectors, storage persistence, private data, or repo-write behavior from app code.
- Stop if the static MVP files are materially different from the package assumptions.
- Stop if validation cannot be defined or run.
- Stop if scope expands into a full app rewrite.

Recommended next step:
Point/design review of GOAL-021 UX after local validation, especially Workbench density and first-time evaluator clarity.

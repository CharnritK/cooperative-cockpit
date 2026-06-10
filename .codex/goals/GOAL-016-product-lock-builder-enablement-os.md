/goal
Title: GOAL-016 Product lock - Builder Enablement OS and SpecGraph

Objective:
Create product canon docs that lock OpenClaw Cooperative Cockpit as a Builder Enablement OS centered on SpecGraph, with code-object explorer as a specialized evidence-linked technical lens.

Autonomy level:
A2 bounded change unless Point approves otherwise.

Allowed paths:
- docs/product/builder-enablement-os/**
- docs/ops/STATUS.md
- artifacts/evidence/**
- .codex/goals/GOAL-016-product-lock-builder-enablement-os.md
- artifacts/packages/openclaw-code-object-explorer-research-pack-v0.2.zip
- artifacts/manifests/** if needed for provenance

Forbidden actions:
- Do not add dependencies.
- Do not add backend/API/auth/database/deployment.
- Do not introduce runtime mutation, real AI execution, external connectors, MCP, parser/LSP/indexing, source-code upload, or repo writes from app code.
- Do not touch secrets.
- Do not modify app source, CSS, routes, runtime fixtures, or files outside allowed paths.
- Do not execute GOAL-017, GOAL-018, or GOAL-019.
- Do not treat the code-object explorer research zip as implementation approval.
- Do not commit, push, open PRs, deploy, or publish.
- Do not claim validation passed unless commands actually pass.

Required work:
1. Create product-lock docs.
2. Define SpecGraph object model, lifecycle, lock model, evidence model, readiness model, and static MVP boundaries.
3. Define Workbench as a lens/editor for SpecGraph, not the product center.
4. Define code-object explorer as specialist evidence-linked technical lens only.
5. Preserve the hierarchy: SpecGraph > Workbench lenses > nodes/locks/evidence/QA > Work Packets/Handoff Packets > reusable patterns.
6. Preserve static MVP guardrails.
7. Record evidence.
8. Run validation.

Acceptance criteria:
1. Docs state Builder Enablement OS as the product category.
2. Docs state SpecGraph as the primary product artifact.
3. Workbench is defined as a lens/editor for SpecGraph, not the product center.
4. Code-object explorer is defined as specialized evidence-linked technical lens, not implementation approval.
5. Static MVP guardrails remain unchanged.
6. No app source files are changed.
7. No dependencies are added.
8. No backend/API/auth/database/deployment/runtime behavior is introduced.
9. The included research zip is treated as provenance only.
10. Validation is reported honestly.

Validation commands:
- npm run validate
- git diff --check

Stop conditions:
- Stop if app code must change.
- Stop if scope requires a new page, dependency, backend/API/auth/database/deployment, runtime behavior, parser/LSP/indexing, source-code upload, or external connector.
- Stop if validation fails for reasons outside docs-only scope.
- Stop if product semantics conflict with existing product canon.
- Stop if any task requires Point approval beyond GOAL-016 docs assimilation.

Recommended next step:
Point approved GOAL-016 on 2026-06-04. GOAL-017, GOAL-018, and GOAL-019 were later explicitly executed on branch `agent/GOAL-017-019-specgraph-lenses` as bounded static/mock-only follow-on work. Review or mainline that branch only after validation and explicit Point authorization for the source-control action.

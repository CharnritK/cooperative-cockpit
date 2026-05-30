/goal
Title: GOAL-004 — Lock static MVP domain model and roadmap docs

Objective:
Create repo documentation that locks the static MVP roadmap, object model, screen map, mock-data requirements, UI-state requirements, Codex execution sequence, and scope guardrails for OpenClaw Cooperative Cockpit.

This is a planning/specification slice only. Do not implement app behavior.

Autonomy level:
A2 bounded documentation and QA update. Point review is required before treating product/object decisions as final.

Allowed paths:
- docs/product/**
- docs/ops/STATUS.md
- quality/QA_CHECKLIST.md
- apps/static-mvp/QA_CHECKLIST.md
- artifacts/evidence/**

Forbidden actions:

Universal forbidden actions:
- Do not add dependencies.
- Do not add backend/API/auth/database/deployment.
- Do not add runtime workflow execution.
- Do not add real agent orchestration.
- Do not add external connectors.
- Do not implement MCP.
- Do not add secrets or credentials.
- Do not claim tests passed unless actually run.
- Do not modify files outside allowed paths.

- Do not modify application source files.
- Do not add new pages.

Required work:
1. Verify whether `docs/product/` exists.
2. If it does not exist, create it only as a documentation folder.
3. Add the product docs from this lego pack.
4. Update QA checklists only to add object-model and scope-guardrail review checks.
5. Update `docs/ops/STATUS.md` with a concise note only if documentation is created successfully.
6. Run validation.
7. Record validation evidence in `artifacts/evidence/GOAL-004-validation.md`.

Acceptance criteria:
1. Static MVP roadmap doc exists and includes P0/P1/P2/deferred/kill sections.
2. Object model doc exists and classifies objects as core, supporting, internal, deferred, or kill/avoid.
3. Screen map doc maps all current eight pages to objects and states.
4. Mock-data spec includes workspace, project, context nodes, spec draft, review run, findings, decision, evidence, work packet, handoff packet, agent roles, and validation results.
5. Scope guardrails doc lists Point-lock decisions.
6. QA checklists include no-backend/no-runtime/no-connectors/no-new-pages/no-unsafe-labels/object-coverage checks.
7. No application source files are modified.
8. `npm run validate` passes.

Validation commands:
- npm run validate

Stop conditions:
- Stop if `docs/product/` is rejected as a repo path convention and Point has not approved it.
- Stop if product semantics require a Point decision not covered by recommended defaults.
- Stop if any application source file appears necessary.
- Stop if validation fails and cannot be fixed within allowed paths.

Final response format:
Verdict:
Changed files:
Validation output:
Point-lock decisions:
Risks:
Next recommended action:

/goal
Title: GOAL-006 — Map existing UI panels to locked object model

Objective:
Update existing static UI panels and labels so the current eight-page app visibly reflects the locked object model.

Autonomy level:
A2 bounded implementation after GOAL-005.

Allowed paths:
- apps/static-mvp/src/app.js
- apps/static-mvp/styles/**
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

- Do not add pages.
- Do not change router keys.
- Do not add drag/drop workflow builder behavior.
- Do not add live execution controls.

Required work:
1. Use the locked object model and screen map as source of truth.
2. Improve Home as Project Overview without adding a page.
3. Improve Workbench labels so nodes read as Context Nodes / cockpit objects, not executable workflow nodes.
4. Show Review Run and Finding terminology clearly.
5. Show Evidence item detail on Trace & Evidence.
6. Keep every action static, inspect-only, or handoff-only.
7. Update QA checklist and evidence.

Acceptance criteria:
1. UI reads as artifact-first governed cockpit.
2. All eight current pages remain.
3. No unsafe action labels are added.
4. No runtime execution is implied.
5. `npm run validate` passes.

Validation commands:
- npm run validate

Manual validation:
- Smoke-test all eight pages.
- Search app files for unsafe execution labels.
- Inspect browser Network panel for no external requests.

Stop conditions:
- Stop if new page is required.
- Stop if dependency is needed.
- Stop if object naming requires Point decision.

Final response format:
Verdict:
Changed files:
Validation output:
Manual QA notes:
Risks:
Next recommended action:

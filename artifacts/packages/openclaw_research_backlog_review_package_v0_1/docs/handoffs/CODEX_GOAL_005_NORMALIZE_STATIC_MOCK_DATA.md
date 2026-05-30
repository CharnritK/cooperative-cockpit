# Codex /goal — GOAL-005 Normalize Static Mock Data

Status: Draft for Point review  
Gate: Run only after Point accepts or revises the static MVP object-model defaults.

```text
/goal
Title: GOAL-005 — Normalize static mock data to locked schema

Objective:
Refactor static mock data and app state into the locked static MVP object model while preserving existing static app behavior.

Autonomy level:
A2 bounded implementation after GOAL-004 and Point object-model review.

Allowed paths:
- apps/static-mvp/src/mockData.js
- apps/static-mvp/src/state.js
- apps/static-mvp/QA_CHECKLIST.md
- artifacts/evidence/**

Forbidden actions:
- Do not add dependencies.
- Do not add backend/API/auth/database/deployment.
- Do not add runtime workflow execution.
- Do not add real agent orchestration.
- Do not add external connectors.
- Do not implement MCP.
- Do not add secrets or credentials.
- Do not claim tests passed unless actually run.
- Do not modify files outside allowed paths.
- Do not modify routing.
- Do not add pages.
- Do not change visual design unless required to preserve current behavior.

Required work:
1. Review docs/product/STATIC_MVP_OBJECT_MODEL.md.
2. Review docs/product/STATIC_MVP_MOCK_DATA_SPEC.md.
3. Update mockData.js to expose explicit static entities:
   - workspace
   - project
   - contextNodes
   - selectedContext
   - specTemplates
   - specDraft
   - specFields
   - reviewRun
   - findings
   - decisions
   - evidenceItems
   - artifactRefs
   - workPacket
   - handoffPacket
   - agentRoles
   - validationResults
4. Update state.js to clone/hold the updated static entities.
5. Preserve existing app behavior as much as possible.
6. Update QA checklist for the new mock entity coverage.
7. Run validation and record evidence.

Acceptance criteria:
1. Existing eight pages still load.
2. Existing interaction flow remains static/local.
3. Mock data has explicit entities required by the mock-data spec.
4. No backend/API/auth/database/deployment/runtime behavior is introduced.
5. No new dependencies are added.
6. npm run validate passes.

Validation commands:
- npm run validate

Manual validation:
- Open apps/static-mvp/index.html.
- Verify all eight pages remain reachable.
- Verify no console errors.
- Verify handoff remains gated.

Stop conditions:
- Stop if app rendering requires broad rewrite.
- Stop if product semantics conflict with docs.
- Stop if files outside allowed paths are required.
- Stop if validation fails and cannot be fixed within allowed scope.
- Stop if product or architecture decision is required.

Final response format:
Verdict:
Changed files:
Validation output:
Manual QA notes:
Risks:
Next recommended action:
```

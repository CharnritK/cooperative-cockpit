/goal
Title: GOAL-008 — QA hardening and validation evidence closeout

Objective:
Harden QA around the locked static MVP object model, scope guardrails, no-network behavior, static handoff readiness, and no unsafe labels.

Autonomy level:
A2 bounded QA/documentation after GOAL-007.

Allowed paths:
- quality/**
- apps/static-mvp/QA_CHECKLIST.md
- docs/ops/STATUS.md
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

- Do not modify product features unless explicitly approved.
- Do not modify app source files unless a tiny QA-discovered typo fix is approved.
- Do not claim manual QA passed unless performed.

Required work:
1. Review all product docs.
2. Review current QA checklist.
3. Add object-model QA checks.
4. Add scope-creep QA checks.
5. Add handoff-readiness QA checks.
6. Run `npm run validate`.
7. Record validation evidence.
8. Update status doc with QA closeout note if successful.

Acceptance criteria:
1. QA docs cover object visibility.
2. QA docs cover static-only boundary.
3. QA docs cover no-network/no-unsafe-labels/no-new-pages.
4. Validation evidence is recorded.
5. `npm run validate` passes.

Validation commands:
- npm run validate

Manual validation:
- Verify all eight pages.
- Verify no network calls beyond local assets.
- Verify no app UI implies execution/export/deployment.

Stop conditions:
- Stop if source changes are required.
- Stop if product decision is needed.
- Stop if validation fails outside allowed paths.

Final response format:
Verdict:
Changed files:
Validation output:
Manual QA evidence:
Unresolved issues:
Next recommended action:

/goal
Title: GOAL-007 — Add Work Packet and static Handoff preview

Objective:
Surface Work Packet and derived Handoff Packet readiness in existing pages/panels using static mock data only.

Autonomy level:
A2 bounded implementation after GOAL-006 and Point approval of Work Packet/Handoff semantics.

Allowed paths:
- apps/static-mvp/src/mockData.js
- apps/static-mvp/src/state.js
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

- Do not create real export files.
- Do not write to repo from app.
- Do not call filesystem APIs.
- Do not add deployment or packaging behavior.
- Do not add new pages.

Required work:
1. Add visible Work Packet summary to an existing page or panel.
2. Add static Handoff Packet preview derived from Work Packet, Decisions, Evidence, and Validation Results.
3. Display:
   - objective
   - allowed paths
   - forbidden actions
   - acceptance criteria
   - validation commands
   - blocked-by reasons
   - readiness status
4. Keep Handoff button gated and static.
5. Update QA checklist and evidence.

Acceptance criteria:
1. Work Packet is visible.
2. Handoff Packet is clearly derived and static.
3. Handoff does not perform real export or repo write.
4. Readiness reflects mock static state.
5. All eight pages remain.
6. `npm run validate` passes.

Validation commands:
- npm run validate

Manual validation:
- Confirm handoff remains disabled until static gates pass.
- Confirm clicking handoff only displays static placeholder/preview behavior.
- Confirm no network or external calls.

Stop conditions:
- Stop if real export/write behavior is needed.
- Stop if Work Packet/Handoff semantics are disputed.
- Stop if files outside allowed paths are needed.

Final response format:
Verdict:
Changed files:
Validation output:
Manual QA notes:
Risks:
Next recommended action:

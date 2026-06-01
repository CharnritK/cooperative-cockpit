/goal
Title: GOAL-017 Static SpecGraph fixtures

Objective:
Add static mock-data fixtures representing SpecGraph scenarios without changing runtime behavior or adding dependencies.

Autonomy level:
A2 bounded change unless Point approves otherwise.

Allowed paths:
- apps/static-mvp/src/mockData.js
- docs/product/builder-enablement-os/**
- apps/static-mvp/QA_CHECKLIST.md
- artifacts/evidence/**
- .codex/goals/GOAL-017-static-specgraph-fixtures.md

Forbidden actions:
- Do not add dependencies.
- Do not add backend/API/auth/database/deployment.
- Do not introduce runtime mutation, real AI execution, external connectors, MCP, or repo writes.
- Do not touch secrets.
- Do not modify files outside allowed paths.
- Do not claim validation passed unless commands actually pass.

Required work:
1. Add static SpecGraph fixture data.
2. Preserve existing aliases.
3. Ensure fixture data does not imply execution.
4. Update QA checklist.
5. Run validation.

Acceptance criteria:
1. Mock data remains static/offline.
2. Existing eight-page boundary is preserved.
3. Validation is reported honestly.

Validation commands:
- npm run validate
- git diff --check

Stop conditions:
- Stop if dependency/parser/LSP/backend is needed.
- Stop if new app page is required.
- Stop if validation cannot pass within scope.

Final response format:
Verdict:
Changed files:
Validation output:
Risks:
Next recommended action:

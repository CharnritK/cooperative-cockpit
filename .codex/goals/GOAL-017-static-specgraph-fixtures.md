/goal
Title: GOAL-017 Static SpecGraph fixtures

Objective:
Add static mock-data fixtures representing SpecGraph scenarios without changing runtime behavior or adding dependencies.

Autonomy level:
A2 bounded change unless Point approves otherwise.

Execution gate:
Do not run this goal until Point explicitly accepts or revises the GOAL-016 Builder Enablement OS / SpecGraph product lock.

Status: Point approved the GOAL-016 Builder Enablement OS / SpecGraph product lock on 2026-06-04. The gate above is satisfied; do not run this goal without a separate explicit scoped execution request, and keep the work inside this goal card's allowed paths, forbidden actions, and validation gates.

Allowed paths:
- apps/static-mvp/src/mockData.js
- docs/product/builder-enablement-os/**
- docs/product/builder-enablement-os/fixtures/**
- schemas/specgraph.schema.json
- apps/static-mvp/QA_CHECKLIST.md
- quality/QA_CHECKLIST_BUILDER_ENABLEMENT_OS.md
- artifacts/evidence/**
- .codex/goals/GOAL-017-static-specgraph-fixtures.md

Forbidden actions:
- Do not add dependencies.
- Do not add backend/API/auth/database/deployment.
- Do not introduce runtime mutation, real AI execution, external connectors, MCP, parser/LSP/indexing, source-code upload, repo ingestion, or repo writes from app code.
- Do not touch secrets.
- Do not modify files outside allowed paths.
- Do not commit, push, open PRs, deploy, or publish.
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
- Stop if Point supersedes or narrows the 2026-06-04 GOAL-016 product-lock approval.
- Stop if dependency/parser/LSP/backend is needed.
- Stop if new app page is required.
- Stop if validation cannot pass within scope.

Final response format:
Verdict:
Changed files:
Validation output:
Risks:
Next recommended action:

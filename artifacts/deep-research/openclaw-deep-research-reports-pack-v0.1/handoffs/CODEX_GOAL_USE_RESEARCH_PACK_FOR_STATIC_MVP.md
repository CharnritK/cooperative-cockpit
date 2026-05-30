# Codex Goal — Use Research Pack for Static MVP Planning Docs

```text
/goal
Title: Promote deep research pack into static MVP product docs

Objective:
Use the persisted deep research reports package to create or update static MVP planning docs for object model, roadmap, screen map, mock-data spec, Codex sequence, and guardrails.

Autonomy level:
A2 bounded documentation update. Point review required before treating object model as locked.

Allowed paths:
- docs/product/**
- docs/research/**
- docs/handoffs/**
- docs/decisions/**
- quality/**
- apps/static-mvp/QA_CHECKLIST.md
- artifacts/evidence/**

Forbidden actions:
- Do not modify app source files.
- Do not add dependencies.
- Do not add backend/API/auth/database/deployment/runtime execution.
- Do not add connectors or MCP implementation.
- Do not add new static MVP pages.
- Do not change product scope without Point lock.

Required work:
1. Read the persisted research pack.
2. Create docs in the approved repo documentation path.
3. Preserve static MVP constraints.
4. Add QA checklist items for object-model coverage and scope creep prevention.
5. Run validation and record evidence.

Acceptance criteria:
1. Docs are traceable to the research pack.
2. Object model and roadmap are clear.
3. No implementation code is changed.
4. Validation passes.
5. Point-lock decisions are clearly listed.

Validation commands:
- npm run validate

Stop conditions:
- Stop if destination path is unclear.
- Stop if app source changes are needed.
- Stop if product semantics are ambiguous.
- Stop if validation fails outside scope.

Final response format:
Verdict:
Changed files:
Validation output:
Point-lock decisions:
Risks:
Next recommended action:
```

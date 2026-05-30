# Codex Goal — Persist Deep Research Reports Pack

```text
/goal
Title: Persist OpenClaw deep research reports pack

Objective:
Persist the provided OpenClaw deep research reports package into the repo as a traceable artifact, without changing application source code or product behavior.

Autonomy level:
A2 bounded documentation/artifact assimilation.

Allowed paths:
- artifacts/deep-research/**
- artifacts/evidence/**
- docs/ops/STATUS.md

Forbidden actions:
- Do not modify app source files.
- Do not add dependencies.
- Do not add backend/API/auth/database/deployment/runtime execution.
- Do not add connectors or MCP implementation.
- Do not change product scope.
- Do not touch secrets.
- Do not modify files outside allowed paths.

Input:
- `openclaw-deep-research-reports-pack-v0.1.zip`

Required work:
1. Unzip the package locally.
2. Review `README_ASSIMILATION.md` and `review/REVIEW_GATE.md`.
3. Copy package contents under `artifacts/deep-research/openclaw-static-mvp-research-pack-v0.1/`.
4. Copy or preserve the manifest under `artifacts/deep-research/`.
5. Update `docs/ops/STATUS.md` with a short note only if artifact persistence succeeds.
6. Run validation.
7. Record validation evidence under `artifacts/evidence/`.

Acceptance criteria:
1. Package is persisted under `artifacts/deep-research/`.
2. Manifest exists and points to the persisted package.
3. No app source files are changed.
4. No dependencies are added.
5. `npm run validate` passes.
6. Validation evidence is recorded.

Validation commands:
- npm run validate

Stop conditions:
- Stop if target path is not approved.
- Stop if files outside allowed paths must change.
- Stop if validation fails and cannot be fixed inside allowed paths.
- Stop if product or architecture decisions are required.

Final response format:
Verdict:
Changed files:
Validation output:
Risks:
Next recommended action:
```

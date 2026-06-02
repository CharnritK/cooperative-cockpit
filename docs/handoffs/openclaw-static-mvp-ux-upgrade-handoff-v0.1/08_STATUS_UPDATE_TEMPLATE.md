# 08 Status Update Template

Use this only after implementation and validation.

## docs/ops/STATUS.md update template

```markdown
- GOAL-021 static MVP realistic product journey is implemented in the current working tree. The static MVP now demonstrates Landing → Static Demo Entry → Project Hub → Project Initialize → Workbench, with Workbench reframed as an object-aware editor using Object Outline, Spatial Board, right object panel, focus lenses, mock local copilot, and readiness queue. No backend, API, real auth, database, deployment, external connector, real AI/model call, persistence, secrets, private data, or dependency addition was introduced. Validation evidence is recorded in `[ARTIFACT_PATH]`.
```

## Evidence file template

```markdown
# GOAL-021 Static MVP UX Upgrade Validation

## Scope
[Implementation summary]

## Changed files
[List changed files]

## Validation commands
```bash
npm run validate
```

## Validation result
[Exact output excerpt]

## Manual QA result
[Checklist summary]

## Safety check
- Backend/API/auth: [none found / issue]
- AI/model calls: [none found / issue]
- Storage: [none found / issue]
- Dependencies: [none added / issue]
- Secrets/private data: [none found / issue]

## Remaining risks
[List risks]

## Verdict
[PASS / PASS_WITH_NOTES / FAIL / BLOCKED]
```

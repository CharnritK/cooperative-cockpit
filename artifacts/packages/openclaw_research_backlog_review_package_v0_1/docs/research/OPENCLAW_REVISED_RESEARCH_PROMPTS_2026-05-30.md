# Revised P0/P1 Research and Synthesis Prompts

Created: 2026-05-30  
Status: Draft for Point review

## Prompt 1 — P0 Product-lock adversarial review

```text
You are GPT-5.5 Pro acting as a senior product architect and adversarial product-lock reviewer.

Objective:
Review the current OpenClaw static MVP product-lock docs and decide whether they are ready for Point lock.

Decision supported:
Approve, revise, or block the current static MVP object model and build sequence before GOAL-005 runs.

Scope in:
- docs/product/STATIC_MVP_OBJECT_MODEL.md
- docs/product/STATIC_MVP_SCREEN_MAP.md
- docs/product/STATIC_MVP_ROADMAP.md
- docs/product/STATIC_MVP_MOCK_DATA_SPEC.md
- docs/product/POINT_LOCK_DECISIONS.md
- docs/product/BUILD_DEFER_KILL_REGISTER.md
- docs/product/CODEX_EXECUTION_SEQUENCE.md

Scope out:
- No backend.
- No API.
- No auth.
- No database.
- No deployment.
- No runtime execution.
- No real agent orchestration.
- No MCP/connectors.
- No new dependencies.
- No new pages unless explicitly justified as Point-lock required.

Source policy:
Use only current repo docs and provided project context. Do not browse unless a specific term is ambiguous.

Evidence standard:
For every finding, cite the source file and section. Label unsupported assumptions.

Required output:
1. PASS / PASS_WITH_WARNINGS / REVISE / BLOCK.
2. Lock-readiness table.
3. Contradiction table.
4. Missing acceptance criteria.
5. Point-lock recommendation.
6. Exact edits needed before GOAL-005.
7. Final lock statement.

Stop condition:
Stop after producing a Point-ready lock/revise/block memo.
```

## Prompt 2 — P0 Five golden scenarios detail pass

```text
You are GPT-5.5 Pro acting as a product demo architect.

Objective:
Expand the current OpenClaw primary golden scenario into five static MVP scenario scripts without adding product scope.

Decision supported:
Confirm the primary demo path and define the four supporting scenarios enough for mock data, QA, and UI mapping.

Scope in:
- Product spec creation.
- UI mockup review.
- Codex implementation handoff.
- QA closeout.
- Decision lock / scope control.

Scope out:
- No backend/runtime execution.
- No live AI calls.
- No real Codex execution.
- No new pages.
- No connector/MCP behavior.
- No Dify-like drag/drop workflow engine.

Source policy:
Use current repo docs first:
- STATIC_MVP_GOLDEN_SCENARIO.md
- STATIC_MVP_OBJECT_MODEL.md
- STATIC_MVP_SCREEN_MAP.md
- STATIC_MVP_MOCK_DATA_SPEC.md
- STATIC_MVP_ROADMAP.md

Evidence standard:
Cite repo docs for object/page/guardrail claims. Mark scenario details as product assumptions unless already documented.

Required output:
1. Scenario table.
2. Detailed script for each scenario.
3. Mock data needed.
4. UI states needed.
5. Acceptance criteria.
6. Stop conditions.
7. Demo narration.
8. Build/defer/kill notes.

Stop condition:
Stop after five scripts are ready for mock-data and UI implementation.
```

## Prompt 3 — P1 Dify-like UX gap audit

```text
You are ChatGPT Deep Research acting as a workflow UX researcher.

Objective:
Identify Dify-like UX patterns that would make OpenClaw feel more serious while preserving OpenClaw’s artifact-first static MVP boundary.

Decision supported:
What UI improvements should inform GOAL-006 without turning OpenClaw into a Dify clone?

Scope in:
- Canvas seriousness.
- Node/card density.
- Inspector panel patterns.
- Status/readiness display.
- Empty/error/warning states.
- Handoff readiness affordances.
- Visual hierarchy.

Scope out:
- Do not recommend real workflow execution.
- Do not recommend connectors.
- Do not recommend backend/API/auth/database/deployment.
- Do not recommend drag/drop workflow engine implementation.
- Do not copy Dify feature scope.

Source policy:
Use official Dify docs/screenshots first. Use adjacent tools only for generic workflow-builder conventions.

Evidence standard:
Cite official sources. Separate facts from recommendations. Mark weak evidence.

Required output:
1. UX pattern summary.
2. OpenClaw-safe adaptations.
3. Clone/runtime risks.
4. GOAL-006 UI checklist.
5. Build/defer/kill table.

Stop condition:
Stop after a concise UI gap checklist for GOAL-006.
```

## Prompt 4 — P1 Work Packet / Handoff Packet contract polish

```text
You are GPT-5.5 Pro acting as a governed-agent handoff architect.

Objective:
Finalize the static MVP Work Packet and derived Handoff Packet contract.

Decision supported:
Define the exact fields and readiness gates GOAL-007 should surface.

Scope in:
- Work Packet fields.
- Handoff Packet derived fields.
- Acceptance criteria.
- Validation commands.
- Allowed paths.
- Forbidden actions.
- Decision/evidence dependencies.
- Readiness states.

Scope out:
- No real export.
- No repo writes from app.
- No API calls.
- No live Codex execution.
- No runtime workflow execution.

Source policy:
Use current object model, mock-data spec, Codex execution sequence, and Codex goal template.

Evidence standard:
Cite current repo docs. Label new fields as recommendations.

Required output:
1. Work Packet schema.
2. Handoff Packet schema.
3. Readiness gates.
4. UI placement.
5. GOAL-007 acceptance criteria.
6. Stop conditions.

Stop condition:
Stop after a GOAL-007-ready contract spec.
```

## Prompt 5 — P1 Evidence / artifact trace presentation spec

```text
You are GPT-5.5 Pro acting as a traceability and evidence UX architect.

Objective:
Define how Evidence and Artifact Reference should appear in the static MVP without creating a generic artifact manager.

Decision supported:
What evidence/trace fields, states, and UI placements should GOAL-007 or P1 polish implement?

Scope in:
- Evidence fields.
- Artifact Reference treatment.
- Missing evidence warnings.
- Links to context, spec, finding, decision, validation, and handoff.
- Trace & Evidence page.
- Handoff readiness impact.

Scope out:
- No standalone Artifact library.
- No real trace spans.
- No storage/database.
- No external sources/connectors.
- No MCP.
- No runtime logs.

Source policy:
Use current object model, screen map, mock-data spec, and build/defer/kill register.

Evidence standard:
Cite repo docs. Mark UI details as recommendations.

Required output:
1. Evidence schema.
2. Artifact Reference schema.
3. State model.
4. Trace UI requirements.
5. Handoff blocking rules.
6. Acceptance criteria.

Stop condition:
Stop after evidence UI requirements are GOAL-007-ready.
```

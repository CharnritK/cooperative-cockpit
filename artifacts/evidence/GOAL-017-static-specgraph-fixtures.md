# GOAL-017 Static SpecGraph Fixtures Evidence

Date: 2026-06-04
Executor: Codex
Scope: Static mock-data fixture addition only.

## Approval Basis

Point approved the GOAL-016 Builder Enablement OS / SpecGraph product lock on 2026-06-04 and then explicitly requested implementation of the GOAL-017/018/019 enablement plan.

## Changes Recorded

- Added `window.mockData.specGraph` in `apps/static-mvp/src/mockData.js`.
- The fixture includes `specgraph_id`, `title`, `mission`, `nodes`, `edges`, `readiness`, and a four-scenario catalog.
- Scenario ids and best-lens values mirror the frozen fixture contract:
  - `scenario-portfolio` / `guided_flow`
  - `scenario-powerbi-databricks` / `lineage_impact_map`
  - `scenario-openclaw-config` / `control_plane`
  - `scenario-code-object-lens` / `code_review_lens`
- `docs/product/builder-enablement-os/fixtures/specgraph-demo-fixtures.json` was not changed.

## Validation Evidence

Pre-change baseline:

```text
> npm run validate
check_concept_consistency: PASS
check_specgraph_fixtures: PASS
check_builder_enablement_os_guardrails: PASS (10 runtime files scanned)
check_open_gates: WARN (1 open) - open governance gates remain:
- Final token approval recorded.
```

Post-change validation:

```text
> npm run validate
check_concept_consistency: PASS
check_specgraph_fixtures: PASS
check_builder_enablement_os_guardrails: PASS (10 runtime files scanned)
check_open_gates: WARN (1 open) - open governance gates remain:
- Final token approval recorded.
```

The warning is the intentionally deferred final-token approval gate and is outside GOAL-017 scope.

## Boundary Notes

- No dependency, backend, API, auth, database, deployment, external connector, MCP, parser/LSP/indexing runtime, source upload, or app-side repository write behavior was added.
- The static-MVP manifest checksum was refreshed because files under `apps/static-mvp/**` changed.

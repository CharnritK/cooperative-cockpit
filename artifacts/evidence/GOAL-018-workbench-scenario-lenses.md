# GOAL-018 Workbench Scenario Lenses Evidence

Date: 2026-06-04
Executor: Codex
Scope: SpecGraph-first Workbench wording and scenario-lens UI framing.

## Changes Recorded

- Reframed the Workbench header as a SpecGraph lens editor.
- Preserved the existing route count, Workbench mode keys, object ordering, spatial board coordinates, popovers, and right-panel mechanics.
- Replaced user-facing view labels with scenario-lens labels:
  - `guided_flow`
  - `lineage_impact_map`
  - `control_plane`
- Replaced focus lens options with:
  - `guided_flow`
  - `lineage_impact_map`
  - `control_plane`
  - `code_review_lens`
- Bumped cache-busting query strings for changed static assets only.

## Validation Evidence

```text
> npm run validate
check_concept_consistency: PASS
check_specgraph_fixtures: PASS
check_builder_enablement_os_guardrails: PASS (10 runtime files scanned)
check_open_gates: WARN (1 open) - open governance gates remain:
- Final token approval recorded.
```

```text
> npm run test:visual:list
Total: 104 tests in 4 files
```

```text
> git diff --check
PASS (exit 0; Git reported LF-to-CRLF normalization warnings only)
```

## Browser Smoke Evidence

Static file loaded through Playwright at `file:///C:/Point/2026/projects/cooperative-cockpit/apps/static-mvp/index.html`.

```json
{
  "currentPage": "workbench",
  "focusOptions": ["guided_flow", "lineage_impact_map", "control_plane", "code_review_lens"],
  "viewModeLabels": ["guided_flow", "lineage_impact_map", "control_plane"],
  "consoleErrors": [],
  "pageErrors": [],
  "remoteRequests": [],
  "overflow": []
}
```

The warning in `npm run validate` is the intentionally deferred final-token approval gate and is outside GOAL-018 scope. Visual baseline regeneration and promotion were not run.

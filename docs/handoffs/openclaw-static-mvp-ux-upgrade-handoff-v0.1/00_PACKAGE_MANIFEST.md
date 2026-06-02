# 00 Package Manifest

## Package

| field | value |
|---|---|
| name | OpenClaw Static MVP UX Upgrade Handoff Package |
| version | v0.1 |
| generated_date | 2026-06-02 |
| target_repo | `CharnritK/cooperative-cockpit` |
| target_surface | `apps/static-mvp/` |
| artifact_mode | Build Handoff Package + Coding Handoff Package |
| readiness | READY_WITH_ASSUMPTIONS |
| implementation_status | Not implemented by this package |

## Source basis

This handoff is based on the provided product critique and desired UX direction:

- The current MVP starts too deep inside the cockpit.
- A realistic product journey is needed before Workbench.
- Workbench needs a hierarchy/object editor mental model.
- Focus mode needs explicit lenses.
- A mock object-aware copilot is needed inside Workbench.
- The package must preserve static/local/mock-only safety boundaries.

## File inventory

| file | type | owner | use |
|---|---|---|---|
| README.md | guide | Point / Codex | Start here |
| 00_PACKAGE_MANIFEST.md | manifest | Point | Inventory |
| 01_BUILD_HANDOFF_PACKAGE.md | build handoff | Codex/developer | Product + technical handoff |
| 02_CODEX_IMPLEMENTATION_PROMPT.md | prompt | Codex | Main implementation |
| 03_CODEX_QA_PROMPT.md | prompt | Codex/reviewer | QA pass |
| 04_ACCEPTANCE_CRITERIA_AND_MANUAL_QA.md | checklist | Point / reviewer | Acceptance |
| 05_REVIEW_GATES_RISK_REGISTER.md | controls | Point / reviewer | Risk management |
| 06_VALIDATION_AND_REPORTING_TEMPLATE.md | template | Codex | Required report |
| 07_OPTIONAL_AGENT_PATCH_PACKAGE_PROMPT.md | prompt | ChatGPT Agent | Optional patch generation |
| 08_STATUS_UPDATE_TEMPLATE.md | template | Codex / maintainer | Status docs |
| 09_DECISION_LOG.md | decision log | Point | Scope lock |
| 10_EXECUTION_SEQUENCE.md | plan | Point / Codex | Execution order |
| task_cards.json | data | Codex | Machine-readable tasks |
| review_gates.json | data | Point / reviewer | Machine-readable gates |
| risk_register.json | data | Point / reviewer | Machine-readable risks |

## Package boundaries

This package may be used to instruct Codex or a developer.

It must not be treated as proof that:
- repository files were changed;
- tests passed;
- browser QA passed;
- the MVP is ready to publish;
- real authentication or real AI exists.

## Required validation

Minimum:

```bash
npm run validate
```

Optional, if configured:

```bash
npm run test:visual:list
npm run test:visual
```

## Final acceptance owner

Point.

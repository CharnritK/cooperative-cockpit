# OpenClaw Static MVP UX Upgrade Handoff Package v0.1

## Package verdict

READY_WITH_ASSUMPTIONS

This package is execution-ready for a local Codex/developer workflow, but it does not claim that implementation has occurred or that validation has passed.

## Assimilation note

This imported package has been assimilated into governed repository paths for GOAL-021. The implementation lives under `apps/static-mvp/`, package support material is preserved in this `docs/handoffs/` folder, validation evidence is recorded under `artifacts/evidence/`, and the root source package folder has been removed from active repo scope.

## Purpose

Convert the current OpenClaw Cooperative Cockpit static MVP UX critique into a safe implementation handoff.

The goal is to make the MVP feel like a realistic product journey while preserving the existing static, local, mock-only boundary.

## Primary journey

```text
Landing / Product Concept
→ Static Demo Entry
→ Project Hub
→ Project Initialize
→ Workbench
→ Spec Builder / Review / Preview / Decisions / Trace / Rules
```

## Core Workbench direction

```text
Left: Object Outline / hierarchy explorer
Center: Spatial Board / Mixed Map / Flat Flow
Right: Inspector / Edit Fields / Mock Copilot / Evidence / Trace
Bottom or dock: Readiness queue
```

## Package contents

| file | purpose |
|---|---|
| `00_PACKAGE_MANIFEST.md` | File inventory and package metadata |
| `01_BUILD_HANDOFF_PACKAGE.md` | Product/build handoff for the UX upgrade |
| `02_CODEX_IMPLEMENTATION_PROMPT.md` | Copy-ready implementation prompt for local Codex |
| `03_CODEX_QA_PROMPT.md` | Copy-ready QA/reviewer prompt for local Codex |
| `04_ACCEPTANCE_CRITERIA_AND_MANUAL_QA.md` | Manual QA checklist and acceptance criteria |
| `05_REVIEW_GATES_RISK_REGISTER.md` | Required review gates, risks, and mitigations |
| `06_VALIDATION_AND_REPORTING_TEMPLATE.md` | Required validation and final report format |
| `07_OPTIONAL_AGENT_PATCH_PACKAGE_PROMPT.md` | Optional prompt for a ChatGPT Agent to produce a patch package |
| `08_STATUS_UPDATE_TEMPLATE.md` | Template for status/evidence updates after implementation |
| `09_DECISION_LOG.md` | Product and safety decisions locked into this package |
| `10_EXECUTION_SEQUENCE.md` | Recommended staged execution sequence |
| `task_cards.json` | Machine-readable task cards |
| `review_gates.json` | Machine-readable review gates |
| `risk_register.json` | Machine-readable risk register |

## How to use

1. Read `01_BUILD_HANDOFF_PACKAGE.md`.
2. Paste `02_CODEX_IMPLEMENTATION_PROMPT.md` into local Codex.
3. Require Codex to inspect the repo before editing.
4. Require Codex to run `npm run validate`.
5. Use `03_CODEX_QA_PROMPT.md` for a second validation pass.
6. Accept the build only after the manual QA checklist is satisfied.

## Non-negotiable constraints

- No backend.
- No API.
- No real authentication.
- No database.
- No deployment.
- No external connectors.
- No real AI/model execution.
- No repo-write behavior from the app.
- No secrets.
- No private marketplace/customer/seller data.
- No dependency additions unless explicitly approved.
- Static app must remain openable through `apps/static-mvp/index.html`.

## Implementation status

NOT IMPLEMENTED BY THIS PACKAGE

This package is a handoff artifact. The receiving coding agent or developer must implement, test, and report actual validation output.

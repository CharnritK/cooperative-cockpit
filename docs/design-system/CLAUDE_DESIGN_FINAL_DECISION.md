# FINAL_DECISION.md

## Executive verdict

**READY_WITH_ASSUMPTIONS — Option E: split into staged adoption goals, with selective adaptation as the adoption posture.**

Claude Design should be treated as a governed design reference and reviewed through a bounded assimilation goal before any active app visual changes. The correct path is not "accept as-is" and not "reject." The correct path is staged selective adoption:

1. GOAL-022: document, map, and gate the Claude package against active MVP tokens, product canon, runtime boundaries, and QA.
2. Point gate: approve or reject any active app visual/token/canon change.
3. GOAL-023: implement the smallest safe follow-on slice only after the review evidence is accepted.

## Decision option selected

**E. Split into staged adoption goals.**

Operational posture: **B. Adapt selectively.**

## Why this option wins

- The active app already has a working static MVP design system under `apps/static-mvp/styles/`.
- Claude Design largely matches the existing palette, typography, status semantics, shell, and governance language.
- Claude's wireframe gallery is valuable for design exploration, but the prototype format includes external React/Babel CDN usage and must not enter the active static MVP runtime.
- Direct adoption would duplicate tokens/components and create design-system drift.
- A staged path keeps Point approval burden low while preserving repo safety.

## What is explicitly approved

Approved now:

- Treat Claude Design as reference/provenance.
- Create a documented adoption review under `docs/design-system/`.
- Create a token/component mapping between Claude Design and active MVP styles.
- Identify safe future adoption slices.
- Add or improve QA/evidence docs for design-system assimilation.
- Run validation and record evidence.

Approved only after Point gate:

- Any active app CSS change.
- Any token canon change.
- Any future screenshot baseline promotion or approved baseline update.
- Any product-language/canon change.
- Any provenance movement.

## What is explicitly not approved

Not approved:

- Wholesale replacement of the active static MVP UI.
- Moving the Claude React/Babel wireframe prototype into active runtime.
- Adding runtime React/Babel/CDN usage.
- Adding dependencies.
- Adding backend/API/auth/database/deployment.
- Adding real AI/model execution, external connectors, browser storage persistence, private data, repo ingestion, source-code upload, or repo-write behavior from app code.
- Adding new pages/routes.
- Deleting design provenance assets.
- Changing product canon without Point approval.

## Trade-off scorecard

Scale: 1 = weak / high risk. 5 = strong / low risk.

| Option | Product-canon alignment | Static/offline safety | Implementation risk | UX benefit | Token/component compatibility | QA/testability | Reversibility | Scope discipline | Codex clarity | Total |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| A. Accept as-is | 2 | 1 | 1 | 4 | 3 | 2 | 2 | 1 | 2 | 18 |
| B. Adapt selectively | 4 | 4 | 4 | 4 | 5 | 4 | 4 | 4 | 4 | 37 |
| C. Reference/provenance only | 4 | 5 | 5 | 2 | 4 | 4 | 5 | 5 | 4 | 38 |
| D. Reject/defer | 3 | 5 | 5 | 1 | 3 | 5 | 5 | 5 | 4 | 36 |
| E. Staged adoption goals | 5 | 5 | 5 | 4 | 5 | 5 | 5 | 5 | 5 | 44 |

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| Design-system drift from duplicate CSS tokens | Map Claude tokens to active `--color-*` variables before app edits. |
| External CDN usage leaks into active runtime | Keep wireframe gallery docs-only; add no-network QA gate. |
| Broad redesign pressure | Split into GOAL-022 review and GOAL-023 smallest safe slice. |
| Product-canon conflict between old eight-page canon and GOAL-021 twelve-route current state | Reconciled as documentation-only: GOAL-021 twelve-route current state governs; the eight-page language is historical/core cockpit scope only. |
| Screenshot/token open gates remain unresolved | Screenshot baseline promotion is approved with conditions; final token approval remains deferred as a Point gate. |

## Human approval gates

Review gate:
- Reviewer: Point
- Scope: Any active app visual change, screenshot baseline promotion, token canon update, product language/canon change, provenance movement, dependency change, validation-script change, or runtime behavior change.
- Pass condition: The requested change is explicitly listed, bounded, reversible, and validation-ready.
- Fallback: Stop, revise the goal, or split the work into a documentation-only slice.

## Next Codex work sequence

1. Execute `CODEX_HANDOFF_GOAL_022.md`.
2. Record `artifacts/evidence/GOAL-022-claude-design-system-adoption-review.md`.
3. Update status/QA only if validation and scope allow.
4. Stop for Point review if any app visual/token/canon change is recommended.
5. Execute `CODEX_HANDOFF_GOAL_023.md` only after the GOAL-022 review gate clears.

# DR-005 — Research Inventory and Missing Inputs

Readiness: NEEDS_EVIDENCE_OR_CONTEXT for original Deep Research provenance  
Scope: Inventory of research materials available to this package.

## Available in this package

| item | status | treatment |
|---|---|---|
| Static MVP roadmap synthesis | Available as reconstructed report | Included as DR-002. |
| Object model recheck | Available as synthesized/reconstructed report | Included as DR-001. |
| Repo reality check | Available as synthesized report from prior repo-aware analysis | Included as DR-003. |
| Adjacent product boundary notes | Available as synthesized notes | Included as DR-004. |
| Claim/source/gap registers | Available as derived package registers | Included under `registers/`. |
| Codex handoff goals | Available | Included under `handoffs/`. |

## Missing or not available as standalone files

| missing_input | severity | impact | follow-up |
|---|---|---|---|
| Original object-model Deep Research final report | High | Cannot preserve exact wording/citations from original if it exists outside this session. | Attach or persist it under `artifacts/deep-research/`. |
| Original Dify UX anatomy Deep Research final report | Medium | UI comparator claims remain summarized rather than full-fidelity. | Attach or persist it if needed for UI work. |
| Original static MVP backlog Deep Research final report | Medium | Current package uses reconstructed synthesis. | Attach if exact provenance matters. |
| Screenshots / current visual mockups | Medium | UI layout claims are file/context based, not screenshot-verified. | Add screenshots or manual QA evidence. |
| Latest local git status and validation output | Medium | Package cannot claim current local tests passed. | Run `git status --short`, `git log --oneline -5`, `npm run validate`. |

## Assumptions used

| assumption_id | assumption | risk_if_wrong | validation |
|---|---|---|---|
| A-001 | Static MVP remains under `apps/static-mvp/`. | Wrong target paths. | Refresh repo context before implementation. |
| A-002 | Eight-page static shell remains current. | Page map may be stale. | Inspect current app README/index. |
| A-003 | `docs/product/**` is acceptable or can be approved. | Codex may write to nonstandard path. | Point lock before persistence. |
| A-004 | Work Packet should be core and Handoff Packet derived. | Object model may need adjustment. | Point review. |
| A-005 | Decision Lock should be Decision state. | Naming mismatch. | Point review. |

## Recommendation

Persist this package as a **derived research baseline**, not as a verbatim archive of every original Deep Research UI output. If exact original reports are later exported, add them as additional files and update the manifest.

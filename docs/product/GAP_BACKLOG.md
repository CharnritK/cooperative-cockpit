# Gap Backlog

Status: Current backlog

| gap_id | gap_type | severity | description | follow_up_action |
|---|---|---|---|---|
| G001 | Historical input | Low | Deep Research is now stored under `docs/research/` and `artifacts/deep-research/`; older handoff docs may still describe it as absent. | Treat older handoff packets as historical unless refreshed. |
| G002 | Missing input | Medium | Dify UX anatomy report is not stored as a dedicated current artifact. | Attach or archive only if UI comparison is needed. |
| G003 | Resolved repo path | Low | `docs/product/**` is now the product-canon path. | Preserve this in README and status docs. |
| G004 | Resolved object model | Low | Work Packet core / Handoff Packet derived is accepted for the static MVP. | Require Point lock to change. |
| G005 | Resolved object model | Low | Artifact Reference is accepted; generic Artifact page remains avoided. | Require Point lock to change. |
| G006 | Resolved UI scope | Low | Home acts as Project Overview. | Require Point lock for a new page. |
| G007 | Resolved QA gap | Low | QA now checks object-model coverage and scope creep. | Keep GOAL-008/009 checks current. |
| G008 | Runtime ambiguity | High | Review Run wording can imply execution. | Preserve inspect-only labels and avoid “Run” actions. |
| G009 | Codex handoff risk | Medium | Codex may skip current canon and modify app source. | Use root `OPERATING_WORKFLOW.md`, `docs/product/**`, and `npm run validate`. |

## GOAL-013 validation gaps

| ID | Status | Gap | Suggested action |
| --- | --- | --- | --- |
| G010 | Completed | Design OS schemas were present but not enforced in the validation chain. | Run `scripts/check_schemas.js` through `npm run validate` and keep schema fixtures aligned with source docs. |
| G011 | Completed | Screen registry could drift from screen-contract fixtures and evidence. | Run `scripts/check_screen_registry.js` through `npm run validate` before changing screen contracts or registry rows. |
| G012 | Completed | Role wrappers needed stricter write, install, network, and allowed-path boundaries. | Keep reviewer/planner read-only deny lists current and require coder allowed paths for implementation sessions. |


# 05 Review Gates and Risk Register

## Review gates

| gate_id | reviewer | review_scope | pass_condition | fallback |
|---|---|---|---|---|
| G-001 | Point | Product journey and demo clarity | First-time user journey is understandable | revise pre-workspace flow |
| G-002 | Local Codex | Static safety | no backend/API/auth/AI/storage/dependency introduced | revert unsafe edits |
| G-003 | Local Codex | Validation | `npm run validate` passes | fix or stop |
| G-004 | Point | Workbench usability | Workbench feels like product editor | create follow-up task |
| G-005 | Reviewer | Privacy/data | no private data or secrets included | redact/remove data |
| G-006 | Point | Scope control | no full app rewrite or production claims | split into follow-up goals |

## Risk register

| risk_id | risk | severity | likelihood | mitigation | owner |
|---|---|---|---|---|---|
| R-001 | Pre-workspace pages added but Workbench remains confusing | High | Medium | Make Workbench tri-pane P0 | Codex |
| R-002 | Static demo entry reads like real login | High | Medium | Use “local demo” language only | Codex |
| R-003 | Mock copilot implies real AI | High | Medium | Label mock/local/no AI calls | Codex |
| R-004 | Helper panel still resets board state | High | Medium | Preserve state explicitly | Codex |
| R-005 | Existing pages regress | High | Medium | Run workflow regression QA | Codex |
| R-006 | Dependency creep | Medium | Low | No dependencies without approval | Codex / Point |
| R-007 | App becomes too large for MVP | Medium | Medium | Stage implementation | Point |
| R-008 | Validation not run | High | Medium | Require exact output report | Codex |
| R-009 | Private data accidentally enters scenario | High | Low | Use mock/public/composite data only | Point / Codex |
| R-010 | Handoff gating is weakened | High | Low | Regression test readiness gates | Codex |

## Risk handling rules

- Do not use weak assumptions as rationale for acceptance.
- Downgrade verdict if validation evidence is missing.
- Stop if implementation requires real auth, real AI, backend, API, database, dependency addition, or private data.
- Do not publish or demo externally until Point accepts manual QA.

# Product Acceptance Test Matrix

| test_id | area | requirement | method | pass | fail | priority | owner |
|---|---|---|---|---|---|---:|---|
| PA-001 | Category | Builder Enablement OS | docs | explicit | AI checker | P0 | Point |
| PA-002 | Hierarchy | SpecGraph first | grep | hierarchy present | canvas-first | P0 | QA |
| PA-003 | Workbench | lens/editor | UI copy | lens wording | product=canvas | P0 | UX |
| PA-004 | Nodes | lifecycle | fixture | statuses | raw only | P0 | Codex |
| PA-005 | Locks | lock model | fixture | owner/rules | no owner | P0 | QA |
| PA-006 | Evidence | evidence model | fixture | evidence IDs | unsupported | P0 | QA |
| PA-007 | Decisions | gates | UI/docs | lock/defer | silent decision | P0 | Point |
| PA-008 | Work Packet | bounded packet | docs | criteria | vague handoff | P0 | Codex |
| PA-009 | Handoff | preview only | UI/docs | no execution | export/write | P0 | QA |
| PA-010 | Reuse | pattern gate | fixture | validated | raw reuse | P1 | Product |
| PA-011 | Code lens | specialist | docs/UI | bounded | repo graph | P0 | Security |
| PA-012 | Static MVP | guardrails | grep | absent forbidden | backend/API | P0 | QA |
| PA-013 | AI proposal | suggestion | UI copy | accept/edit/reject | auto mutation | P0 | UX |
| PA-014 | Scenarios | 4 scenarios | fixture | all present | missing | P1 | Product |

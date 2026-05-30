# OpenClaw Research-Backlog Review

Created: 2026-05-30  
Mode: Synthesis / audit / backlog review  
Owner: Point  
Status: Draft for Point review

## 1. Executive Summary

**Current best understanding of OpenClaw in one sentence:** OpenClaw Cooperative Cockpit is a static, artifact-first, governed AI-work cockpit for turning bounded context into specs, review findings, decisions, evidence, work packets, and gated handoff previews.

**Current build mode:** Static MVP. Current repo status says the static MVP is under `apps/static-mvp/`, remains offline/mock-only/directly openable, and already demonstrates a mock architecture-node -> Context Basket -> AI-assisted chat -> Handoff Packet golden path.

**Recommended research strategy:** Stop broad research. The repo now already contains draft product-lock docs for object model, golden scenario, screen map, roadmap, mock-data spec, build/defer/kill, Point-lock decisions, and Codex execution sequence. The next work is Point-lock review plus targeted gap research, not another round of general Deep Research.

**Top 5 research topics to do next:**

1. P0 — Product-lock adversarial review of current object model, screen map, roadmap, and Point-lock decisions.
2. P0 — Five golden scenarios detail pass, because the repo has the primary scenario, but the full five scenario scripts are still thin.
3. P1 — Dify-like UX anatomy gap audit, only to improve seriousness before UI mapping, not to clone Dify.
4. P1 — Work Packet / Handoff Packet contract polish, because Work Packet is core and Handoff Packet is derived.
5. P1 — Evidence / artifact trace presentation spec, because evidence is central but must not become a generic artifact manager.

**Top 5 topics to defer:**

1. Durable workflow architecture.
2. MCP / connector boundary.
3. Security threat model beyond static-MVP guardrails.
4. Work-log analytics loop.
5. Business/technical positioning papers.

**Top 5 topics to kill or stop researching:**

1. Dify-like drag/drop workflow builder.
2. Runtime workflow execution.
3. Generic Artifact library/page.
4. Dedicated Agent Roles admin page.
5. Fake execution logs or `Run` semantics.

**Biggest current concept risk:** Research drift. There is enough static-MVP product-lock material to move toward Point review and bounded Codex work. More broad research risks delaying implementation and reopening settled scope.

**Recommended next action:** Review and accept or revise `docs/product/STATIC_MVP_OBJECT_MODEL.md` and `docs/product/POINT_LOCK_DECISIONS.md`; repo status says to run GOAL-005 only after the object model is accepted.

---

## 2. Resource Inventory

| resource | type | relevance | freshness | used_for | confidence | notes |
|---|---|---|---|---|---|---|
| Current user prompt | Request | Core current | Current | Backlog criteria | High | Governs output |
| Repo `STATUS.md` | Repo status | Core current | Current fetch | Current state | High | GOAL-004 done |
| Repo `README.md` | Repo doc | Core current | Current fetch | Repo purpose | High | Static MVP |
| Uploaded boundaries | Project context | Core current | Recent | Guardrails | High | Static/local |
| Static object model | Product doc | Core current | Draft | Object lock | High | Point review |
| Point-lock decisions | Product doc | Core current | Draft | Decisions | High | Before GOALs |
| Golden scenario | Product doc | Core current | Draft | Demo path | High | Primary only |
| Screen map | Product doc | Core current | Draft | UI/page model | High | Eight pages |
| Roadmap | Product doc | Core current | Draft | Backlog | High | P0/P1/P2 |
| Mock data spec | Product doc | Core current | Draft | Data schema | High | GOAL-005 |
| Build/Defer/Kill | Product doc | Core current | Draft | Scope control | High | Avoid list |
| Codex sequence | Product doc | Core current | Draft | Build order | High | GOAL-004–008 |
| Handoff synthesis | Handoff doc | Useful | Current fetch | Gaps | Medium | Deep Research absent |
| QA checklist | QA doc | Useful | Current fetch | Acceptance | Medium | Test basis |
| File Library | External source | Unavailable | Unknown | Not used | Low | Not connected |

## 3. Current Concept Recheck

| question | answer | evidence_or_basis | confidence | implication |
|---|---|---|---|---|
| What is OpenClaw now? | Static governed cockpit | Repo status, roadmap | High | Stay static |
| What is OpenClaw not? | Runtime orchestrator | Guardrails | High | No execution |
| What proves MVP? | Context-to-handoff path | Golden scenario | High | Demo this |
| What stays deferred? | Backend/runtime/MCP | Roadmap | High | No research now |
| Strongest wedge? | Governed handoff | Object model | High | Build around gates |
| Too broad risk? | Object/page sprawl | Point locks | High | Trim |
| Dify clone risk? | Drag/drop builder | Kill register | High | Avoid canvas clone |
| Runtime-heavy risk? | Execution semantics | Guardrails | High | Mock only |
| Lock before build? | Object defaults | Status | High | Point lock first |
| Remain open? | UX polish | Screen map | Medium | P1 audit |

## 4. Existing Research Coverage Audit

| research_area | current_status | evidence_available | still_needed | decision_impact | recommendation |
|---|---|---|---|---|---|
| Dify UX anatomy | Needs targeted follow-up | Prompt only | Gap audit | UI polish | P1 research |
| Object model | Covered enough | Draft doc | Point lock | High | Decide now |
| Golden scenarios | Needs targeted follow-up | Primary path | 5 scripts | High | P0 targeted |
| Static backlog/screen map | Covered enough | Roadmap/map | Review | High | Decide now |
| Work Packet schema | Needs polish | Object model | Contract | Medium | P1 synthesis |
| Review gates | Covered enough | Point locks | UI copy | Medium | Convert |
| Evidence/artifact model | Needs polish | Mock spec | UI spec | Medium | P1 synthesis |
| Agent routing | Defer | Roles only | Later | Low | P2 |
| Codex handoff standards | Covered enough | Goal template | None | High | Use |
| Durable architecture | Defer | Not needed | None | Low | P3 |
| MCP boundary | Defer | Not needed | None | Low | P3 |
| Security threat model | Defer | Guardrails | Later | Low | P3 |
| Work-log analytics | Defer | Not MVP | None | Low | P3 |
| Business positioning | Defer | Thesis exists | Later | Medium | P2/P3 |
| Technical positioning | Defer | Docs exist | Later | Medium | P2/P3 |
| Demo narrative | Needs follow-up | Primary path | 5 scripts | High | P0 targeted |
| Visual design system | Defer | Screen map | Later | Low | P2 |
| Mock-data schema | Covered enough | Spec exists | Build | High | Codex |
| QA harness | Covered enough | Checklist | Update | Medium | Codex |
| Build/Defer/Kill | Covered enough | Register | Point review | High | Decide |

## 5. Revised Pending Research Backlog

| rank | research_topic | priority | why_it_matters | decision_supported | expected_output | owner_mode | stop_condition |
|---:|---|---|---|---|---|---|---|
| 1 | Product-lock adversarial review | P0 | Prevents drift | Accept/revise docs | Lock memo | GPT-5.5 Pro synthesis | Point decision ready |
| 2 | Five scenario detail pass | P0 | Demo coherence | Primary + secondary | Scenario scripts | GPT-5.5 Pro synthesis | 5 scripts done |
| 3 | Dify UX gap audit | P1 | Seriousness | UI metaphor | Gap checklist | ChatGPT Deep Research | No clone risk |
| 4 | Work Packet contract polish | P1 | Handoff quality | Packet schema | Contract spec | GPT-5.5 Pro synthesis | Schema accepted |
| 5 | Evidence trace UI polish | P1 | Traceability | Trace spec | Trace spec | GPT-5.5 Pro synthesis | UI fields locked |
| 6 | Review gate UI copy | P1 | Governance clarity | Gate language | Copy matrix | Lightweight prompt | Copy approved |
| 7 | Mock data implementation | Build | Already specified | GOAL-005 | Changed files | Codex handoff | Validation passes |
| 8 | UI map implementation | Build | Already sequenced | GOAL-006 | UI mapping | Codex handoff | Eight pages pass |
| 9 | Agent routing | P2 | Later clarity | Role matrix | Routing note | GPT synthesis | No admin page |
| 10 | Runtime architecture | P3 | Future only | Future boundary | ADR later | Defer | Static MVP accepted |
| 11 | MCP/connectors | P3 | Future only | Connector boundary | ADR later | Defer | Runtime phase opened |
| 12 | Generic competitor research | Kill | Too broad | None | None | No research | Removed |

## 6. Recommended Research Sequence

| step | research_or_action | mode | input_needed | output | why_now | dependency | stop_condition |
|---:|---|---|---|---|---|---|---|
| 1 | Product-lock review | GPT synthesis + Point | Product docs | Accept/revise memo | Blocks GOAL-005 | None | Point lock |
| 2 | Five scenario detail pass | GPT synthesis | Golden scenario | 5 scripts | Demo gaps | Step 1 | Scripts ready |
| 3 | Dify UX gap audit | Deep Research | Screen map | UX checklist | Before GOAL-006 | Step 1 | Gap list only |
| 4 | Work Packet polish | GPT synthesis | Object model | Contract spec | Before GOAL-007 | Step 1 | Schema ready |
| 5 | Evidence UI polish | GPT synthesis | Mock spec | Trace spec | Before GOAL-007 | Step 1 | Fields ready |
| 6 | GOAL-005 | Codex | Point lock | Mock data | Build step | Step 1 | Validate passes |
| 7 | GOAL-006 | Codex | UX audit | UI mapping | Build step | Steps 3/6 | Validate passes |
| 8 | GOAL-007 | Codex | Packet/evidence | Handoff preview | Build step | Steps 4/5/6 | Validate passes |

## 7. Build / Research / Decide / Defer / Kill

| item | category | rationale | risk_if_wrong | next_action |
|---|---|---|---|---|
| Object model defaults | Decide now | Already drafted | Rework | Point lock |
| Point-lock decisions | Decide now | Blocks GOAL-005 | Drift | Review |
| Five scenario scripts | Research next | Still thin | Weak demo | Synthesis |
| Dify UX gap audit | Research next | UI quality | Clone risk | Targeted Deep Research |
| Mock data normalization | Build now | Spec exists | App mismatch | GOAL-005 |
| UI panel mapping | Build now | Screen map exists | Confusion | GOAL-006 |
| Work Packet preview | Build now | Core wedge | Weak handoff | GOAL-007 |
| Evidence detail cards | Build now | Traceability | Thin proof | P1/GOAL-007 |
| Agent routing | Defer | Not urgent | Admin sprawl | P2 |
| Runtime architecture | Defer | Out of scope | Scope creep | Future ADR |
| MCP/connectors | Defer | Out of scope | Runtime drift | Future ADR |
| Generic competitor map | Kill | Too broad | Delay | Stop |

## 8. Codex Handoff Candidates

| candidate | why_not_more_research | implementation_goal | acceptance_criteria | point_lock_needed |
|---|---|---|---|---|
| GOAL-005 mock data | Spec exists | Normalize entities | Validate passes | Yes, object lock |
| GOAL-006 UI mapping | Screen map exists | Map panels | Eight pages OK | Yes, center lock |
| GOAL-007 handoff preview | Contract near-ready | Surface readiness | Gated preview | Yes, packet lock |
| GOAL-008 QA hardening | QA known | Guardrails | Validate/evidence | No |
| Evidence cards | Spec enough | Add detail cards | Trace visible | Maybe |
| Review gate copy | Policy exists | Add labels | No ambiguity | Maybe |

## 9. Point-lock Decisions

| decision | why_point_lock_required | recommended_default | risk_if_wrong | when_to_decide |
|---|---|---|---|---|
| Static MVP boundary | Product scope | Static only | Runtime drift | Now |
| Object model lock | Product semantics | Accept with edits | Rework | Before GOAL-005 |
| Primary scenario | Demo strategy | Context-to-handoff | Weak demo | Before GOAL-006 |
| Center of gravity | UI metaphor | Workbench canvas | Dashboard drift | Before GOAL-006 |
| Project overview | Page scope | Home only | Page sprawl | Before GOAL-006 |
| Work vs Handoff | Object clarity | Work core, Handoff derived | Vague export | Before GOAL-007 |
| Decision naming | Object clarity | Decision with lock state | Duplicate model | Before GOAL-005 |
| Artifact treatment | Scope control | Artifact Reference | Artifact manager | Before GOAL-006 |
| Agent Roles | Scope control | Metadata only | Admin sprawl | Before GOAL-007 |
| Dependencies | Architecture | None | Package sprawl | Any goal |
| Runtime semantics | Scope | None | Dify/n8n clone | Any goal |
| Public demo claims | Credibility | Static prototype | Overclaim | Before public demo |

## 10. Contradictions and Drift

| contradiction_id | conflicting_sources_or_threads | issue | severity | recommended_resolution | point_lock_needed |
|---|---|---|---|---|---|
| C01 | Old research backlog vs repo state | Research already converted to docs | High | Stop broad research | No |
| C02 | Runtime ideas vs static MVP | Durable/MCP drift | High | Defer | Yes |
| C03 | Dify-like UX vs no clone | Builder temptation | High | UX patterns only | Yes |
| C04 | Many objects vs minimal proof | Object sprawl | Medium | Use locked model | Yes |
| C05 | Artifact-first vs Artifact library | Generic manager risk | Medium | Artifact Reference only | Yes |
| C06 | Agent roles vs admin page | Admin sprawl | Medium | Metadata only | Yes |
| C07 | Handoff preview vs real export | Runtime claim risk | High | Static preview only | Yes |
| C08 | Research vs build | Analysis loop | High | Run GOAL-005 after lock | No |
| C09 | Security research vs static scope | Overbuild | Low | Defer threat model | No |
| C10 | New pages vs eight-page scope | UI sprawl | High | Preserve pages | Yes |

## 11. Gap Backlog

| gap_id | gap_type | severity | description | preferred_input | follow_up_action |
|---|---|---|---|---|---|
| G01 | Point-lock required | High | Object model draft | Point review | Accept/revise |
| G02 | Missing source | Medium | Full Deep Research absent | Report upload | Skip or rerun targeted |
| G03 | UX ambiguity | Medium | Dify-like seriousness | UX audit | P1 research |
| G04 | Scenario gap | Medium | Four scenarios thin | Scenario pass | P0 synthesis |
| G05 | Contract gap | Medium | Work Packet details | Contract spec | P1 synthesis |
| G06 | Evidence gap | Medium | Trace UI fields | Trace spec | P1 synthesis |
| G07 | Implementation ambiguity | Medium | GOAL-005 blocked | Point lock | Then Codex |
| G08 | Scope ambiguity | High | Runtime temptation | Point lock | Defer |
| G09 | QA gap | Low | Need post-build QA | QA output | GOAL-008 |
| G10 | File Library gap | Low | Not available | Connect/upload | Optional |

## 12. Claim Register

| claim_id | claim | claim_type | basis_or_source | support_status | confidence_1_to_5 | risk_if_wrong | follow_up_action |
|---|---|---|---|---|---:|---|---|
| C001 | Build mode is static MVP | Fact | STATUS, roadmap | Supported | 5 | High | Preserve |
| C002 | Object model is drafted | Fact | Object model doc | Supported | 5 | High | Point lock |
| C003 | Golden path is drafted | Fact | Golden scenario doc | Supported | 5 | Medium | Expand |
| C004 | Mock data spec exists | Fact | Mock spec | Supported | 5 | High | GOAL-005 |
| C005 | Roadmap exists | Fact | Roadmap | Supported | 5 | High | Review |
| C006 | Runtime work is deferred | Fact | Roadmap/BDK | Supported | 5 | High | Enforce |
| C007 | More broad research is wasteful | Interpretation | Coverage audit | Partial | 4 | Medium | Target only |
| C008 | Dify UX audit remains useful | Recommendation | UX gap | Partial | 3 | Medium | P1 only |
| C009 | Work Packet is core | Fact | Object model | Supported | 5 | High | Polish |
| C010 | Handoff Packet is derived | Fact | Object model/Point locks | Supported | 5 | Medium | Enforce |
| C011 | Artifact should not be standalone | Fact | Object/BDK | Supported | 5 | Medium | Enforce |
| C012 | GOAL-005 should wait | Fact | Status/goal | Supported | 5 | High | Point lock |

## 13. Final Recommendation

### Next 3 research tasks

1. Product-lock adversarial review.
2. Five golden scenarios detail pass.
3. Dify UX gap audit for GOAL-006.

### Next 1 Codex task

Run GOAL-005 — Normalize static mock data to locked schema, only after Point accepts or revises the object model defaults.

### Top 3 topics to stop researching

1. Durable runtime architecture.
2. MCP/connectors.
3. Generic competitor landscape.

### Top 3 Point-lock decisions

1. Accept/revise the static MVP object model.
2. Confirm Workbench/Cockpit canvas as center of gravity.
3. Confirm Work Packet core / Handoff Packet derived.

### Cleanest backlog for the next 7 days

| day_range | work | owner | output |
|---|---|---|---|
| Day 1 | Product-lock review | GPT + Point | Lock memo |
| Day 2 | Scenario detail pass | GPT | 5 scripts |
| Day 3 | Accept/revise docs | Point | Final lock |
| Day 4 | GOAL-005 | Codex | Mock data |
| Day 5 | Review GOAL-005 | GPT/QA | PASS/REVISE |
| Day 6 | Dify UX gap audit | Deep Research | UI checklist |
| Day 7 | Prep GOAL-006 | GPT | Codex goal |

### Cleanest backlog for the next 30 days

| phase | work | output |
|---|---|---|
| Week 1 | Lock product docs + GOAL-005 | Stable mock schema |
| Week 2 | GOAL-006 UI mapping | Panels match object model |
| Week 3 | GOAL-007 handoff preview | Gated Work/Handoff preview |
| Week 4 | GOAL-008 QA hardening | Evidence + validation |
| End | Demo review | Point milestone decision |

## Source Register

| source | source_type | basis |
|---|---|---|
| `docs/ops/STATUS.md` | Repo status | Static MVP status, completed tasks, next step |
| `README.md` | Repo doc | Repo purpose, static MVP, policies |
| `docs/product/STATIC_MVP_OBJECT_MODEL.md` | Product doc | Core objects, relationships, static-only rule |
| `docs/product/POINT_LOCK_DECISIONS.md` | Product doc | Decisions requiring Point lock |
| `docs/product/STATIC_MVP_GOLDEN_SCENARIO.md` | Product doc | Primary demo path |
| `docs/product/STATIC_MVP_SCREEN_MAP.md` | Product doc | Eight-page screen map |
| `docs/product/STATIC_MVP_ROADMAP.md` | Product doc | P0/P1/P2 roadmap |
| `docs/product/STATIC_MVP_MOCK_DATA_SPEC.md` | Product doc | Required mock entities and fields |
| `docs/product/BUILD_DEFER_KILL_REGISTER.md` | Product doc | Build/defer/kill decisions |
| `docs/product/CODEX_EXECUTION_SEQUENCE.md` | Product doc | GOAL-004 to GOAL-008 sequence |
| `.codex/goals/GOAL-005-normalize-static-mock-data.md` | Codex goal | Next implementation candidate |

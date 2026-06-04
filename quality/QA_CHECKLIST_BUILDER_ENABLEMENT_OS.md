# QA Checklist — Builder Enablement OS / SpecGraph

## Product alignment

- [x] Product reads as Builder Enablement OS.
- [x] SpecGraph is the primary artifact.
- [x] Workbench is a lens/editor.
- [ ] Canvas does not imply workflow execution.
- [ ] Handoff remains preview/packet.

## SpecGraph checks

- [x] Mission exists.
- [ ] Idea nodes are editable.
- [ ] Core nodes are lockable.
- [ ] Functional specs derive from accepted ideas.
- [ ] Architecture derives from accepted specs.
- [ ] Build units derive from architecture.
- [ ] Evidence gaps are visible.
- [ ] Decisions show lock state.
- [ ] Reuse requires quality gate.
- [x] Static scenario catalog mirrors the four frozen fixture ids and best-lens values.
- [x] Workbench exposes `guided_flow`, `lineage_impact_map`, `control_plane` and `code_review_lens` as scenario lenses.

## Static MVP checks

- [ ] No backend.
- [ ] No API.
- [ ] No auth.
- [ ] No database.
- [ ] No deployment.
- [ ] No runtime mutation.
- [ ] No real AI execution.
- [ ] No external connectors.
- [ ] No MCP.
- [ ] No parser/LSP/indexing.
- [ ] No repo ingestion.
- [ ] No source-code upload.
- [ ] No repo writes from app.
- [ ] No secrets.
- [ ] No new dependencies without Point lock.
- [x] GOAL-016 product lock accepted by Point before GOAL-017, GOAL-018, or GOAL-019 app-source work.
- [x] GOAL-017 static SpecGraph fixture data added without changing the frozen fixture JSON.
- [x] GOAL-018 SpecGraph-first Workbench scenario-lens copy added without changing route count or mode keys.
- [x] GOAL-019 static code-object lens fixture added with facts, findings and AI annotations separated.

## Review gate

Reviewer: Point.  
Scope: product semantics, static guardrails, code-object lens, reuse quality.  
Pass condition: high-risk boundaries remain intact.  
Fallback: revise product docs before app changes.

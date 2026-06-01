# QA Checklist — Builder Enablement OS / SpecGraph

## Product alignment

- [ ] Product reads as Builder Enablement OS.
- [ ] SpecGraph is the primary artifact.
- [ ] Workbench is a lens/editor.
- [ ] Canvas does not imply workflow execution.
- [ ] Handoff remains preview/packet.

## SpecGraph checks

- [ ] Mission exists.
- [ ] Idea nodes are editable.
- [ ] Core nodes are lockable.
- [ ] Functional specs derive from accepted ideas.
- [ ] Architecture derives from accepted specs.
- [ ] Build units derive from architecture.
- [ ] Evidence gaps are visible.
- [ ] Decisions show lock state.
- [ ] Reuse requires quality gate.

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
- [ ] No app source changes before Point accepts the GOAL-016 product lock.

## Review gate

Reviewer: Point.  
Scope: product semantics, static guardrails, code-object lens, reuse quality.  
Pass condition: high-risk boundaries remain intact.  
Fallback: revise product docs before app changes.

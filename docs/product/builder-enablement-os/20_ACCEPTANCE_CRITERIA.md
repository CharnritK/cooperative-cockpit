# Detailed Acceptance Criteria

## Product acceptance

- Product category is Builder Enablement OS.
- SpecGraph is primary.
- Workbench is not product center.
- Handoff is packet/preview only.
- Reuse requires quality gates.
- No runtime execution implied.

## SpecGraph acceptance

- Mission exists.
- Idea nodes are editable.
- Functional specs derive from accepted ideas.
- Research needs can block decisions.
- Evidence supports claims.
- Decisions have lock status.
- Architecture derives from spec.
- Build units derive from architecture.
- QA gates determine readiness.
- Patterns require validation.

## Workbench acceptance

- Copy is SpecGraph-first.
- Selected-node inspector is useful.
- Lock, evidence, decision states visible.
- Next safe action visible.
- AI suggestions are proposal-only.
- Lens matches scenario complexity.
- Canvas does not dominate meaning.

## Demo scenario acceptance

- Portfolio uses Guided Flow.
- BI uses Lineage / Impact Map.
- OpenClaw config uses Control Plane.
- Code object uses Code Review Lens.
- Each scenario has reusable pattern.
- Each scenario has QA gates.
- Each scenario has handoff output.

## Handoff acceptance

- Objective exists.
- Scope is bounded.
- Forbidden actions listed.
- Acceptance criteria exist.
- Validation commands listed.
- Stop conditions included.
- Handoff does not imply live export.

## Static MVP guardrail acceptance

- No backend/API/auth/database/deployment.
- No runtime mutation.
- No real AI execution.
- No connector/MCP.
- No source upload.
- No repo write.
- No new dependency without Point lock.
- Eight-page boundary preserved.

## Code-object lens acceptance

- Static fixture only.
- Selected object only.
- No whole-repo graph.
- No parser or LSP.
- Evidence refs exist.
- Facts/findings/annotations separated.
- Review packet static.
- Security-sensitive source not exposed.

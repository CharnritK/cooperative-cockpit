# QA Test Strategy — Builder Enablement OS / SpecGraph

## Verdict

READY_FOR_QA_PLANNING
NOT_READY_FOR_IMPLEMENTATION

## QA objective

Verify the product is built as Builder Enablement OS centered on SpecGraph while preserving static MVP constraints.

## Product model to protect

```text
SpecGraph > Workbench lenses > Nodes / locks / evidence / QA > Work/Handoff Packets > Reusable patterns
```

## Top QA risks

| risk_id | risk | priority |
|---|---|---:|
| QR-001 | SpecGraph becomes mindmap | P0 |
| QR-002 | Workbench remains canvas-first | P0 |
| QR-003 | Schema/fixture mismatch | P0 |
| QR-004 | Code lens implies parser | P0 |
| QR-005 | Reuse quality weak | P1 |
| QR-006 | Static guardrail regression | P0 |

## Before implementation

- Point accepts product lock.
- SpecGraph contract is stable.
- Static MVP scope lock is accepted.
- Fixture/schema mismatch is resolved or intentionally adaptered.
- Code-object explorer remains specialist lens.
- GOAL-016 docs assimilation is complete.

## After implementation

- No app source changes outside approved paths.
- No dependencies added without Point lock.
- Static guardrails remain intact.
- Handoff remains gated and preview-only.
- Code-object lens remains static/mock-only.

## Manual review required

| review | owner |
|---|---|
| Product lock | Point |
| Workbench comprehension | Reviewer |
| Code-object scope | Security/QA |
| Public demo claims | Point |
| Dependency requests | Point |

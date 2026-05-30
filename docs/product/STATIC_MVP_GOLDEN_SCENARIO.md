# Static MVP Golden Scenario

Status: Current product canon
Purpose: Demo narrative for proving OpenClaw without runtime execution.

## Primary scenario: context-to-handoff readiness

1. User opens Home.
2. Project is shown as draft with selected context, unresolved fields, pending decision, and blocked handoff readiness.
3. User opens Workbench.
4. User selects Context Nodes and confirms protected exclusions remain sealed.
5. User opens Spec Builder.
6. User accepts static suggestions, fills fields, and locks required fields.
7. User opens Review Runs.
8. Inspect-only review findings appear.
9. User opens Decisions.
10. User locks or defers Point-lock decisions.
11. User opens Trace & Evidence.
12. Evidence links and missing evidence warnings are visible.
13. Work Packet summary shows objective, allowed paths, forbidden actions, acceptance criteria, and validation commands.
14. Handoff Packet preview shows readiness or blocked-by reasons.
15. User sees that the package is ready for Codex only when static gates are clean.

## Why this proves OpenClaw

The demo proves artifact-first governance:

- context is bounded;
- specs are explicit;
- reviews are inspect-only;
- findings are actionable;
- decisions are locked;
- evidence is visible;
- work packets are constrained;
- handoff is gated;
- no runtime execution is required.

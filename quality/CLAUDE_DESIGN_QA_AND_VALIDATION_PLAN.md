# QA_AND_VALIDATION_PLAN.md

## Purpose

Define validation requirements for Claude Design assimilation and any follow-on status-language/token consistency slice.

## Validation commands

Codex must run and report exact results for:

```bash
npm run validate
npm run test:visual:list
npm run test:visual
```

If any command fails, Codex must report:

- exact failing command,
- exact failure summary,
- files implicated,
- whether failure is in scope,
- whether rollback or split follow-on is needed.

## Manual QA steps

1. Open the active app locally through `apps/static-mvp/index.html` or the repo's existing approved local static server workflow.
2. Visit all twelve current local routes through the intended journey, rail, CTA, and Projects utility access.
3. Confirm pages remain local/static/mock-only.
4. Confirm no new route/page appears unless already product-approved.
5. Confirm Workbench remains object-aware and local-only.
6. Confirm Preview/Handoff remains gated.
7. Confirm Decisions does not imply real Point approval changes.
8. Confirm Trace/Evidence does not produce files or external writes.
9. Confirm Rules & Scope preserves runtime mutation unavailable and repo writes handoff-only.
10. Confirm no user-facing label implies live execution, real export, deployment, authentication, external connection, or repo write.

## Visual test expectations

Visual tests should confirm:

- no layout regression in active app shell,
- status chips remain readable and text-labeled,
- Workbench remains usable at tested widths,
- governance strip remains visible only on intended high-risk pages,
- active app still reads as light neutral workflow studio,
- no Claude prototype styling is imported wholesale.

## No-network/offline checks

Active app must pass:

- no external `http://` or `https://` requests after local load,
- no CDN scripts/styles in active app HTML,
- local font references only,
- no real AI/model call,
- no backend/API/auth/database/deployment calls,
- no connector calls,
- no browser storage persistence introduced.

Known allowed exception:

- Claude Design docs/prototype may contain external references as provenance, but these must not be used by active app runtime.

## Accessibility checks

Verify:

- keyboard focus is visible,
- skip link works,
- readiness/toast live regions remain functional,
- color is not the only status signal,
- body text and status chips are readable,
- no status hue is used without text meaning,
- compact icon actions have accessible labels/titles where applicable.

## Screenshot baseline approval gate

Review gate:
- Reviewer: Point
- Scope: Any screenshot baseline promotion or use of Claude screenshots as approved baselines.
- Pass condition: Candidate screenshots are explicitly selected, named, compared, and approved.
- Fallback: Keep screenshots as provenance/reference only.
- Current decision: Approved with conditions for the eight static MVP screen targets across `vp-760`, `vp-1080`, `vp-1180`, and `vp-1280`. Approved snapshots live under `tests/visual/static-mvp.visual.spec.mjs-snapshots/` and must be regenerated only after explicit visual approval.

## Product-canon consistency checks

Check:

- `docs/product/**` product-canon language.
- `docs/ops/STATUS.md` current-state notes.
- `apps/static-mvp/QA_CHECKLIST.md` current route and guardrail expectations.
- Builder Enablement OS product lock.
- Static MVP route count and page naming.
- Workbench role: lens/editor for SpecGraph, not unchecked product-center expansion.
- No forbidden UI implications:
  - real run/execution history,
  - connector catalog,
  - deployment controls,
  - API key entry,
  - login/auth controls,
  - real export/repo write claim,
  - MCP configuration.

## First-time evaluator UX review

Use this checklist with a person who has not recently worked on the repo. Time-box the first pass to 2 minutes before giving hints.

- Product comprehension within 2 minutes: evaluator can state that OpenClaw turns selected context into a governed SpecGraph/Work Packet and gated handoff preview.
- Workbench macro-layer clarity: evaluator can identify Context, SpecGraph, and Handoff Gates as the three macro layers without needing the object-depth controls explained first.
- SpecGraph and handoff-gate understanding: evaluator can explain why D-005, evidence, validation, and review blockers keep Handoff unavailable.
- No fake-auth/fake-AI confusion: evaluator does not believe Demo Entry logs into a real workspace or Mock local copilot calls an AI model.
- Handoff readiness clarity: evaluator can name the page or control they would use next to clear the largest readiness blocker.

## Evidence Codex must record

For GOAL-022:

```text
artifacts/evidence/GOAL-022-claude-design-system-adoption-review.md
```

For GOAL-023:

```text
artifacts/evidence/GOAL-023-status-language-token-canon-consistency.md
```

Each evidence file must include:

- scope,
- files inspected,
- changed files,
- validation commands run,
- exact validation output summary,
- open gates,
- no-network/offline findings,
- stop conditions triggered,
- known limitations,
- next recommended action.

## Pass condition

A goal passes only if:

- it stays within allowed paths,
- no dependency is added,
- no active app runtime boundary is violated,
- validation is run or exact blocker is recorded,
- evidence is created,
- Point gates are respected,
- no product scope expands silently.

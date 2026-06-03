# 13 — Status Language Canon

## Purpose

This canon fixes the meaning of status hues across Claude Design reference files and the active static MVP. It is documentation and QA authority only. It does not approve active app CSS changes, token finalization, screenshot baseline promotion, route changes, runtime behavior, or product-canon changes.

## Canonical Status Hues

| Hue | Active token | Meaning | Active classes/statuses | Use | Do not use for |
|---|---|---|---|---|---|
| Accent / blue | `--color-accent` | Primary action, links, active navigation, route emphasis | `.action-primary`, route/stage/link affordances | Navigation, primary local action, active shell affordance | Readiness, warning, error, approval |
| Cyan | `--color-cyan` | Active, selected, needs sync, guided/spec-first state | `.status-active`, `.status-selected`, `.status-spec-first`, `.status-guided`, `.status-needs-sync` | Current focus, selected context, sync/update needed | Final success, blocked state |
| Green | `--color-green` | Ready, validated, allowed, complete | `.status-allowed`, `.status-validated`, `.status-covered`, `.status-applied`, `.status-ready`, `.status-complete` | Local readiness, validation pass, allowed static action, locked/attached evidence when truly clear | Pending, blocked, missing evidence |
| Amber | `--color-amber` | Waiting, needs lock, needs answer, needs decision/evidence, pending, warning, revise | `.status-needs-lock`, `.status-needs-answer`, `.status-needs-decision`, `.status-needs-evidence`, `.status-warning`, `.status-pending`, `.status-revise` | Work that can become ready after a known local or Point gate | Unsafe, missing, hard blocked |
| Red | `--color-red` | Missing, blocked, unsafe, risk | `.status-missing`, `.status-blocked`, `.status-review-blocked`, `.status-unsafe`, `.status-risk` | Hard blocker, missing required artifact/evidence, unsafe state, risk state | Pending/waiting, advisory, neutral draft |
| Purple | `--color-purple` | Handoff, governance, advisory, inspect | `.status-handoff`, `.status-inspect`, `.status-advisory`, governance accents | D-005, handoff-only, review/advisory surfaces, governance checkpoints | Validation success, ordinary navigation |
| Gray | `--color-gray` | Neutral, draft, passive, unavailable | `.status-draft`, `.status-passive`, `.status-neutral`, `.status-unavailable` | Draft state, unavailable/non-actionable metadata, passive labels | Error, warning, selected state |

## Runtime Mapping Evidence

The active status-chip classes in `apps/static-mvp/styles/status.css` already encode the Claude Design hue meanings for most chip states:

- cyan: active, selected, spec-first, guided, needs-sync;
- green: allowed, validated, covered, applied, ready, complete;
- amber: needs-lock, needs-answer, needs-decision, needs-evidence, warning, pending, revise;
- red: missing, blocked, review-blocked, unsafe, risk;
- purple: handoff, inspect, advisory;
- gray: draft, passive, neutral, unavailable.

`apps/static-mvp/src/app.js` routes most rendered status chips through `getStatusClass(status)`, which maps runtime values to those classes.

## Known Open Gate

`review-blocked` currently has a semantics tension:

- status chips map `review-blocked` to red through `.status-review-blocked`;
- node-card tones group `review-blocked` with amber waiting states through `.node-card.status-tone-review-blocked`.

Default decision: preserve the active app as-is until Point approves a precise CSS/runtime visual semantics cleanup. GOAL-023 records this as a deferred app visual change, not a silent patch.

## QA Rule

Every status chip or status-colored affordance must pair hue with readable text. Color alone is not accepted as status meaning. QA should check that:

- green never means pending, warning, missing, or blocked;
- amber means waiting, needs lock, pending, warning, revise, or known local work;
- red means missing, blocked, unsafe, or risk;
- purple means handoff, governance, advisory, or inspect;
- cyan means active, selected, sync, guided, or spec-first;
- gray means neutral, draft, passive, unavailable, or non-actionable metadata.

## Change Control

Changes to token values, app CSS, rendered status components, status labels that change product meaning, or final token approval require Point/design-system approval and fresh validation evidence.

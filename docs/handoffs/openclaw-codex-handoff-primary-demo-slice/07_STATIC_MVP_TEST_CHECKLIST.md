# 07 Static MVP Test Checklist

Status: Historical handoff packet. Current QA canon lives in `apps/static-mvp/QA_CHECKLIST.md` and `quality/QA_CHECKLIST.md`.

## Scenario completeness

- [ ] Primary demo path is visible.
- [ ] Five golden scenarios are represented in mock data or docs.
- [ ] Primary scenario has opening and success states.

## Object relationships

- [ ] Selected Context references selected Context Nodes.
- [ ] Spec Draft references selected context.
- [ ] Decision gates Handoff Packet.
- [ ] Evidence links to context, spec, decision, validation, and handoff.

## Governance

- [ ] Missing evidence blocks handoff.
- [ ] Missing acceptance criteria block handoff.
- [ ] D-005 blocks handoff until locked.
- [ ] Protected exclusions remain excluded.

## Static/mock labeling

- [ ] No backend/API/auth/database/deployment behavior.
- [ ] No external calls.
- [ ] No real Codex execution.
- [ ] Handoff preview is static/mock-only.

## Label checks

- [ ] No forbidden action labels.
- [ ] “Review Runs” remains the only allowed “Run” wording.

## Visual/demo readiness

- [ ] Pages remain visually consistent.
- [ ] Navigation still reaches all eight pages.
- [ ] Viewer can understand the path in under 60 seconds.

## Validation

- [ ] `npm run validate`
- [ ] `git check-ignore -v scripts/check_no_secrets.js`
- [ ] `git check-ignore -v AGENTS.md`

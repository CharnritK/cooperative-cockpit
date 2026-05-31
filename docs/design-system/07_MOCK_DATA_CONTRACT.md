# 07 — Mock Data Contract

## Purpose

Provide one canonical mock data vocabulary for static UI, Storybook stories, Playwright tests, v0 prompts, and Codex handoffs.

This fixture is a Design OS fixture, not the current static MVP runtime fixture. Runtime state remains in `apps/static-mvp/src/mockData.js` and `apps/static-mvp/src/state.js` until a later Point-approved app-data migration.

## Entity model

| entity | id prefix | relationships | status examples |
|---|---|---|---|
| workspace | `ws` | owns projects | active |
| project | `proj` | belongs to workspace | active |
| contextNodes | `ctx` | source for specs/evidence | included, excluded, protected |
| selectedContext | `ctx` refs | references context nodes | included |
| specTemplates | `tmpl` | used by spec drafts | available |
| specDraft | `spec` | has spec fields | draft, valid, invalid, locked |
| specFields | `field` | belongs to spec draft | unresolved, suggested, locked |
| reviewRuns | `rr` | reviews a spec | queued, inspected, closed |
| findings | `find` | belongs to review run | open, acknowledged, deferred, resolved |
| decisions | `dec` | gates packets/screens | pending_point_lock, locked, deferred |
| evidenceItems | `ev` | supports findings/decisions | complete, incomplete, warning |
| artifactRefs | `ar` | points to local artifacts | available, missing |
| workPackets | `wp` | source for handoff packets | draft, ready, blocked |
| handoffPackets | `hp` | bounded Codex handoff | draft, ready, locked |
| agentRoles | `role` | describes agent ownership | active, inactive |
| validationResults | `val` | records checks | pass, warn, fail, not_run |
| qaGates | `gate` | acceptance gate | pass, warn, fail, pending |
| visualBaselines | `vb` | screenshot baselines | candidate, approved, needs_review |

## Runtime compatibility notes

- Design OS `reviewRuns[]` maps to the current runtime `reviewRun` summary plus review/finding lists.
- Design OS `workPackets[]` and `handoffPackets[]` map to the current runtime `workPacket` and `handoffPacket` objects.
- Design OS `selectedContext[]` is an ID-reference list; current runtime uses `selectedContext.includedIds[]` plus protected exclusions.
- These mappings are documentation contracts only until app runtime data changes are separately approved.

## ID convention

Use lowercase prefix + 3-digit number:

```text
ctx-001
spec-001
find-001
```

## Fixture rules

- Use realistic but fictional names.
- No real names, emails, IDs, tokens, credentials, URLs with secrets, or customer data.
- Include happy path and blocked/warning path.
- Include links between findings, evidence, decisions, and packets.
- Include enough dense data to test cockpit layout.

## Test scenario matrix

| scenario | required coverage |
|---|---|
| normal operating state | active project, queued review, open findings |
| blocked handoff | missing evidence or pending Point lock |
| evidence warning | evidence item incomplete |
| decision lock | one locked decision, one pending decision |
| visual QA | candidate baseline entries across viewports |

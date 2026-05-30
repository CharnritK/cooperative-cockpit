/goal

Title: Static MVP primary demo alignment — governed spec to gated handoff preview

Objective:
Align the existing static MVP around the primary scenario “rough context -> governed spec -> gated handoff preview” using existing pages, unified mock data, decision lock visibility, evidence visibility, validation states, and a static handoff preview.

Autonomy level:
A2 bounded change unless Point approves otherwise.

Project context:
Repo: CharnritK/cooperative-cockpit

Product: OpenClaw Cooperative Cockpit.

Current inspected state:
- Static MVP is under `apps/static-mvp/`.
- Entrypoint is `apps/static-mvp/index.html`.
- Current stack is plain HTML, CSS, and vanilla JavaScript.
- Current static pages are Home, Workbench, Spec Builder, Review Runs, Preview, Decisions, Trace & Evidence, and Rules & Scope.
- Current mock data is in `apps/static-mvp/src/mockData.js`.
- Current app state is in `apps/static-mvp/src/state.js`.
- Current app rendering logic is in `apps/static-mvp/src/app.js`.
- Current handoff placeholder is in `apps/static-mvp/handoff/handoff-placeholder.json`.
- Current static MVP QA checklist is in `apps/static-mvp/QA_CHECKLIST.md`.
- Current repo QA checklist is in `quality/QA_CHECKLIST.md`.
- Last inspected commit: 3f610a66c52e938e42f004b9f53adccc4f78e9c3 (Harden gitignore validation for setup checks).

Static MVP boundary:
No backend, API, auth, database, deployment, runtime workflow execution, real agent orchestration, real external connectors, MCP implementation, or new dependencies.

Target files or areas:
- `apps/static-mvp/src/mockData.js`
- `apps/static-mvp/src/state.js`
- `apps/static-mvp/src/app.js`
- `apps/static-mvp/handoff/handoff-placeholder.json`
- `apps/static-mvp/QA_CHECKLIST.md`
- `quality/QA_CHECKLIST.md`
- `artifacts/evidence/**` only if recording validation evidence
- `docs/ops/STATUS.md` only if updating status after successful validation

Allowed changes:
- Static UI copy and panel alignment in existing MVP pages.
- Mock-data additions or refinements for the primary demo path.
- Handoff placeholder refinements.
- QA checklist updates.
- Validation evidence recording.

Forbidden changes:
- No backend.
- No API.
- No auth.
- No database.
- No deployment.
- No runtime workflow execution.
- No real agent orchestration.
- No real external connectors.
- No MCP implementation.
- No new dependencies unless Point explicitly approves.
- No secrets.
- No files outside allowed paths.
- No new pages beyond the approved static MVP page boundary.
- No user-facing labels that imply live execution.
- No product scope expansion.

Required UI/mock-data changes:
- Add or align a `primaryDemoPath` mock object that names the path: rough context -> governed spec -> decision/evidence gate -> handoff preview.
- Ensure selected context, spec draft fields, evidence items, decision lock, validation result, and handoff packet are visibly related.
- Make `D-005` Codex handoff gating explicit as the governance checkpoint.
- Add static evidence items for source context, locked decision, validation readiness, and handoff placeholder.
- Show a blocked state when evidence, acceptance criteria, or decision lock is missing.
- Show a ready state only as a static/mock readiness state. Do not produce a real export or repo write.
- Preserve all eight existing pages and route keys.
- Preserve the page title “Review Runs”; do not add “Run” as an action label.

Acceptance criteria:
- The primary demo path is understandable from existing pages without adding a ninth page.
- Workbench shows selected context and protected exclusions.
- Spec Builder shows spec field status and acceptance-criteria readiness.
- Decisions shows the handoff gating decision and its lock status.
- Trace & Evidence shows evidence links for context, spec, decision, validation, and handoff.
- Preview or existing handoff control shows a static handoff preview/placeholder.
- Missing acceptance criteria, missing evidence, or unresolved decision lock visibly blocks handoff readiness.
- Handoff/export behavior remains static and mock-only.
- No forbidden live-execution wording appears in action labels.
- `npm run validate` passes.
- Manual QA checklist is updated for the primary demo path.

Validation steps:
- `npm run validate`
- `git check-ignore -v scripts/check_no_secrets.js`
- `git check-ignore -v AGENTS.md`
- Manually open `apps/static-mvp/index.html`.
- Verify all eight pages are reachable.
- Verify no network/API calls occur beyond local static assets.
- Verify no new dependencies were added.
- Verify no ninth page was created.
- Verify no user-facing action label uses forbidden execution wording.

Stop conditions:
- Stop if a dependency is required.
- Stop if backend/API/auth/database/deployment/runtime work is required.
- Stop if files outside allowed paths must change.
- Stop if validation fails and cannot be fixed within scope.
- Stop if product/architecture decision is required.
- Stop if the page count must expand beyond the approved static MVP boundary.
- Stop if secrets or credential-like material are found.
- Stop if the UI would imply real Codex execution or real repository writes.

Final response format:
- Verdict
- Summary
- Files changed
- Mock data changes
- UI states changed
- Validation commands run and results
- What remains blocked or assumed
- Risks
- Recommended next bounded step

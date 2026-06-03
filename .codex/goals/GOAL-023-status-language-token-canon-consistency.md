# CODEX_HANDOFF_GOAL_023.md

```text
/goal
Title: GOAL-023 Status Language and Token Canon Consistency Slice

Objective:
Implement the smallest safe design-system follow-on slice after GOAL-022: align documented status-language/token semantics between Claude Design and the active static MVP, and harden QA/evidence around status-chip consistency without broad visual redesign.

Autonomy level:
A2 bounded documentation/QA slice. Active app CSS or visual changes require Point approval after GOAL-022 review evidence.

Project context:
- Repo: `CharnritK/cooperative-cockpit`
- Active app: `apps/static-mvp/`
- Claude reference package: `docs/design-system/claude-proposed-design-system/`
- GOAL-022 must be completed first.
- This goal must preserve local-only/static/mock-only boundaries.

Target files or areas:
- docs/design-system/**
- apps/static-mvp/QA_CHECKLIST.md
- quality/**
- artifacts/evidence/**
- docs/ops/STATUS.md
- apps/static-mvp/styles/status.css only if Point explicitly approves a specific minimal fix
- apps/static-mvp/styles/components.css only if Point explicitly approves a specific minimal fix
- apps/static-mvp/styles/base.css only if Point explicitly approves a specific token-neutral alias/comment change

Current behavior to verify:
- Active MVP has existing status tokens and status-chip patterns.
- Claude Design proposes fixed hue meanings:
  - accent/blue: primary, links, active nav
  - cyan: active, selected, needs sync
  - green: ready, validated, allowed
  - amber: waiting, needs lock, pending
  - red: missing, blocked, unsafe
  - purple: handoff, governance, advisory
  - gray: neutral, draft, unavailable
- Active app must remain offline and must not import Claude runtime files.

Expected behavior:
- Repo contains a clear canonical status-language mapping.
- QA checklist explicitly validates status-language consistency.
- Evidence records the mapping and any intentionally deferred visual changes.
- No broad visual redesign occurs.
- No runtime behavior changes occur.
- No dependencies are added.

Implementation constraints:
- No new dependencies.
- No backend/API/auth/database/deployment.
- No real AI/model execution.
- No external connectors.
- No browser storage persistence.
- No source-code upload.
- No repo-write behavior from app code.
- No new pages/routes.
- No external CDN/script/network calls in active app.
- No screenshot baseline promotion without Point approval.
- No active app CSS changes unless Point approval is recorded in the evidence.
- Preserve provenance assets.

Non-goals:
- Do not replace the active static MVP UI.
- Do not import `cockpit-ds.css` into active app runtime.
- Do not convert Claude JSX prototypes into app code.
- Do not refactor app architecture.
- Do not change product canon.
- Do not add theme/dark-mode behavior.
- Do not move or deduplicate font files.

Required work:
1. Confirm GOAL-022 adoption review exists and identifies this slice as safe.
2. Add or update a status-language canon doc under `docs/design-system/`.
3. Map active status tokens/classes to canonical semantics.
4. Update `apps/static-mvp/QA_CHECKLIST.md` or `quality/**` with status-language QA checks.
5. If a clear active app inconsistency is found:
   - Stop and request Point approval before CSS/app edits.
   - Do not patch silently.
6. Create evidence:
   - `artifacts/evidence/GOAL-023-status-language-token-canon-consistency.md`
7. Run validation and visual tests.
8. Report exact results.

Acceptance criteria:
- A status-language canon exists and is linked or referenced from QA/evidence.
- Each status hue has a fixed meaning.
- Active app QA includes checks for hue/text/status consistency.
- Claude Design remains reference/provenance.
- No app visual/runtime changes occur unless Point approval is recorded.
- Validation results are recorded.
- Open gates are listed.

Test plan:
- `npm run validate`
- `npm run test:visual:list`
- `npm run test:visual`
- Manual browser QA:
  - Visit all current local routes.
  - Confirm status chips pair hue with text label.
  - Confirm green does not indicate pending/warning.
  - Confirm amber indicates waiting/lock/pending.
  - Confirm red indicates blocked/missing/unsafe.
  - Confirm purple indicates governance/handoff/advisory.
  - Confirm no remote network requests occur after loading the active app locally.
  - Confirm no user-facing action label implies live execution or repo-write behavior.

Rollback notes:
- Documentation-only changes can be reverted by removing the new status-language canon doc and QA references.
- If Point-approved CSS edits are made, include before/after notes and exact files changed.
- If validation fails, revert changes or split a narrower patch.

Stop conditions:
- Stop if CSS/app changes are required but Point approval is absent.
- Stop if status semantics conflict with product canon.
- Stop if screenshot baseline promotion is required.
- Stop if validation scripts need modification.
- Stop if adding dependencies appears necessary.
- Stop if external resource loading is required.
- Stop if route/page expansion is required.

Final response format:
Verdict:
Changed files:
Decision implemented:
Validation commands run:
Exact validation output summary:
Evidence files created or updated:
Open gates:
Risks encountered:
Stop conditions triggered:
Next recommended action:
```

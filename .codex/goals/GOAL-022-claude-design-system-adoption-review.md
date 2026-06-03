# CODEX_HANDOFF_GOAL_022.md

```text
/goal
Title: GOAL-022 Claude Design System Adoption Review

Objective:
Review the Claude-proposed design-system package against the current OpenClaw static MVP and produce a governed adoption review, token/component map, runtime boundary assessment, and evidence record without changing active app visuals or product scope.

Autonomy level:
A2 bounded documentation and QA review. No active app visual changes unless Point explicitly approves in writing.

Allowed paths:
- docs/design-system/**
- docs/ops/STATUS.md
- artifacts/evidence/**
- quality/**
- apps/static-mvp/QA_CHECKLIST.md
- artifacts/packages/** only if manifest/evidence registration is required and scoped
- .codex/goals/** only if adding a follow-on bounded goal is necessary

Forbidden paths/actions:
- Do not modify active app runtime files under `apps/static-mvp/src/**`.
- Do not modify active app CSS under `apps/static-mvp/styles/**` unless Point explicitly approves a specific token-neutral documentation-linked change.
- Do not add dependencies.
- Do not add backend/API/auth/database/deployment.
- Do not add real AI/model execution.
- Do not add external connectors.
- Do not add browser storage persistence.
- Do not add private data, secrets, source-code upload, or repo-write behavior from app code.
- Do not move Claude React/Babel wireframe prototype into active app runtime.
- Do not add external CDN/script/network calls to active app.
- Do not delete, rename, or move provenance assets.
- Do not promote screenshots to baselines.
- Do not expand product scope or routes.
- Do not change validation scripts.
- Do not claim validation passed unless actually run.

Required work:
1. Inspect `docs/design-system/claude-proposed-design-system/`.
2. Inspect active app entry/style files under `apps/static-mvp/`, especially:
   - `index.html`
   - `styles/fonts.css`
   - `styles/base.css`
   - `styles/layout.css`
   - `styles/components.css`
   - `styles/status.css`
3. Inspect current status/product/QA docs:
   - `docs/ops/STATUS.md`
   - `docs/product/**`
   - `apps/static-mvp/QA_CHECKLIST.md`
   - `quality/**`
4. Create `docs/design-system/CLAUDE_DESIGN_SYSTEM_ADOPTION_REVIEW.md`.
5. Include:
   - Claude package inventory
   - active MVP design-token inventory
   - token map
   - component map
   - runtime boundary review
   - external resource/CDN review
   - font/license/provenance review
   - screenshot/reference asset review
   - product-canon conflicts
   - recommended smallest safe adoption slice
6. Create evidence file:
   - `artifacts/evidence/GOAL-022-claude-design-system-adoption-review.md`
7. Update `docs/ops/STATUS.md` only with a concise status/evidence reference if validation succeeds.
8. Update QA docs only if the review identifies missing design-system QA gates.
9. Run validation.
10. Report exact results.

Acceptance criteria:
- Claude package is classified as reference/provenance unless explicitly approved otherwise.
- External CDN usage is documented and prohibited from active app runtime.
- Active app token equivalents are mapped without duplicating token canon.
- Component adoption decisions are clear: keep/adapt/defer/reject.
- Product-canon conflicts are surfaced, not silently resolved.
- Screenshot baseline and final token approval remain Point gates.
- No active app runtime behavior is changed.
- No dependencies are added.
- Validation output is recorded honestly.

Validation commands:
- npm run validate
- npm run test:visual:list
- npm run test:visual

Additional manual QA/checks:
- Confirm active app `index.html` has no external script/style CDN references.
- Confirm Claude wireframe gallery remains docs/provenance only.
- Confirm no provenance assets were deleted or moved.
- Confirm no app route/page expansion occurred.

Evidence to record:
- `artifacts/evidence/GOAL-022-claude-design-system-adoption-review.md`
- Include command output summaries, open gates, and any blocked validation honestly.

Stop conditions:
- Stop if adoption requires a new dependency.
- Stop if external CDN usage would enter active app runtime.
- Stop if active app visual changes are needed before Point approval.
- Stop if product-canon changes are required.
- Stop if screenshot baseline promotion is requested.
- Stop if validation scripts need changes.
- Stop if files outside allowed paths must change.
- Stop if validation fails and cannot be fixed inside scope.

Final response format:
Verdict:
Changed files:
Adoption decision:
Validation commands run:
Exact validation output summary:
Evidence files created or updated:
Open gates:
Risks encountered:
Stop conditions triggered:
Next recommended action:
```

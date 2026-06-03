# GOAL-022 Claude Design System Adoption Review Evidence

## Scope

- Goal: `GOAL-022 Claude Design System Adoption Review`
- Branch: `agent/GOAL-022-claude-design-review`
- Date: 2026-06-02
- Autonomy: A2 bounded documentation and QA review

No active app runtime behavior, active app CSS, dependency, backend/API/auth/database/deployment, external connector, browser storage persistence, screenshot baseline, token canon, route, or product-scope change was made for GOAL-022.

## Files Inspected

- `docs/design-system/claude-proposed-design-system/**`
- `docs/design-system/CLAUDE_DESIGN_FINAL_DECISION.md`
- `docs/design-system/CLAUDE_DESIGN_SYSTEM_ADOPTION_REVIEW.md`
- `docs/design-system/01_DECISIONS_AND_PRODUCT_LOCKS.md`
- `docs/design-system/03_TOKEN_SYSTEM.md`
- `docs/design-system/12_GOVERNANCE_CHECKLIST.md`
- `apps/static-mvp/index.html`
- `apps/static-mvp/styles/fonts.css`
- `apps/static-mvp/styles/base.css`
- `apps/static-mvp/styles/layout.css`
- `apps/static-mvp/styles/components.css`
- `apps/static-mvp/styles/status.css`
- `apps/static-mvp/src/app.js`
- `apps/static-mvp/QA_CHECKLIST.md`
- `quality/QA_CHECKLIST.md`
- `quality/CLAUDE_DESIGN_QA_AND_VALIDATION_PLAN.md`
- `quality/CLAUDE_DESIGN_RISK_REGISTER.md`
- `docs/ops/STATUS.md`
- `docs/product/**`

## Findings

### Claude Package Inventory

The Claude package remains in `docs/design-system/claude-proposed-design-system/` as reference/provenance. It contains:

- two HTML reference/prototype files;
- one CSS design-system file;
- nine JSX prototype modules;
- six local font binaries;
- eight reference PNGs;
- fourteen screenshot PNGs.

The package should not be imported wholesale into active runtime.

### Token And Component Decision

The active MVP already has matching token names and values for the core Claude palette in `apps/static-mvp/styles/base.css`, including `--color-bg`, `--color-panel`, `--color-border`, `--color-accent`, `--color-cyan`, `--color-green`, `--color-amber`, `--color-red`, `--color-purple`, `--color-gray`, `--font-ui`, `--font-display`, and `--font-mono`.

Decision: keep active MVP tokens; map Claude tokens to active `--color-*`/`--text-*`/`--font-*` names. Do not add duplicate aliases or finalize tokens without Point/design-system approval.

Component decision: keep current static MVP shell, top bar, readiness rail, governance strip, status chips, spatial board, Preview, Decisions, Trace, and Rules surfaces. Treat Claude Workbench/editor/gallery ideas as reference only unless a later Point-approved app goal selects a narrow slice.

### Runtime Boundary

Active MVP boundary remains local/static/mock-only. No backend, API, auth, database, deployment, real AI/model call, external connector, browser storage persistence, secrets, private data, source upload, or app-driven repo write behavior is authorized.

### External Resource/CDN Review

`docs/design-system/claude-proposed-design-system/Cockpit Wireframes.html` loads React, ReactDOM, and Babel from `https://unpkg.com/`. That is acceptable only for docs/prototype provenance.

`apps/static-mvp/index.html` loads local scripts only:

- `src/mockData.js`
- `src/state.js`
- `src/router.js`
- `src/app.js`

No Claude CDN dependency was moved into active runtime.

### Font/License/Provenance Review

Claude reference fonts remain under `docs/design-system/claude-proposed-design-system/assets/fonts/`. Active app fonts remain under `apps/static-mvp/assets/fonts/` and are referenced by `apps/static-mvp/styles/fonts.css`.

No font movement, duplication, deletion, or consolidation occurred. Any future consolidation requires license/provenance review and Point approval.

### Screenshot/Reference Asset Review

Claude `refs/*.png` and `screenshots/*.png` remain reference/provenance. They were not renamed, moved, deleted, or promoted to approved baselines.

Candidate screenshot promotion remains a Point/design reviewer gate.

### Product-Canon Conflicts

The route-count conflict is real and must not be silently resolved:

- older product docs still reference the legacy eight-page boundary;
- current `docs/ops/STATUS.md`, `apps/static-mvp/QA_CHECKLIST.md`, and active app navigation reflect GOAL-021's twelve local routes;
- `docs/design-system/01_DECISIONS_AND_PRODUCT_LOCKS.md` still contains stale text that says the active static MVP implements the existing eight-page shell, while its own superseded-constraint section allows governed registry growth.

Default decision: GOAL-022 surfaces the conflict only. Product-canon reconciliation remains Point-gated.

### Recommended Smallest Safe Slice

GOAL-023 is safe as documentation/QA hardening only:

- add status-language canon under `docs/design-system/`;
- map active status classes/tokens to canonical hue meanings;
- add status-language QA checks;
- record any active app visual semantics issue as deferred unless Point approves a CSS/runtime patch.

## Changed Files

- `docs/design-system/13_STATUS_LANGUAGE_CANON.md`
- `artifacts/evidence/GOAL-022-claude-design-system-adoption-review.md`
- `artifacts/evidence/GOAL-023-status-language-token-canon-consistency.md`
- `apps/static-mvp/QA_CHECKLIST.md`
- `docs/design-system/00_CODEX_ABSORB_FIRST.md`
- `docs/ops/STATUS.md`
- `docs/TASKS.md`
- `docs/ROADMAP.md`
- `artifacts/packages/openclaw-cooperative-cockpit-mvp.manifest.json`

Status/task/roadmap and imported package placement files were already changed by the package assimilation step on this branch.

## Open Gates

- Point/design approval for final audited token values.
- Point/design approval for candidate screenshot baseline promotion.
- Point approval for any app CSS/runtime visual semantics change.
- Point/product approval for product-canon route-count reconciliation.
- Point approval for any provenance movement or font consolidation.

## Validation

Commands run:

- `npm run validate`
- `npm run test:visual:list`
- `npm run test:visual`
- `git diff --check`
- `rg -n "https?://|unpkg|cdn|script src|link href" apps\static-mvp\index.html apps\static-mvp\styles apps\static-mvp\src`

Results:

- `npm run validate` passed, with the expected `check:gates` warnings for unapproved candidate screenshot baselines and missing final token approval.
- `npm run test:visual:list` listed 48 visual tests across `static-mvp.goal021.visual.spec.mjs` and `static-mvp.visual.spec.mjs`.
- `npm run test:visual` passed 48 visual tests.
- `git diff --check` passed.
- Static active-app network grep found local script references and SVG namespace constants only; no remote script, stylesheet, CDN, or Claude prototype dependency was moved into active runtime.
- Playwright-generated visual report artifacts from the validation run were restored/cleaned so the closeout does not retain generated visual churn.

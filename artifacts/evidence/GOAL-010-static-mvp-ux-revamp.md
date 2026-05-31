# GOAL-010 Static MVP UX Revamp Evidence

Date: 2026-05-31

## Scope

- Branch: `agent/GOAL-010-static-mvp-ux-revamp`
- Default edit scope used: `apps/static-mvp/**`, `apps/static-mvp/QA_CHECKLIST.md`, `docs/ops/STATUS.md`, `artifacts/evidence/GOAL-010-static-mvp-ux-revamp.md`
- Package manifest touched only to refresh the static MVP checksum required by validation.
- No repo-tracked workflow instructions were added under `.github/`, `.claude/`, `AGENTS.md`, or `docs/` as persistent Claude/Codex policy.

## Claude Planning Boundary

Claude Opus 4.7 was invoked once through GitHub Copilot CLI as a read-only advisory planner for GOAL-010. The session denied write, shell, and URL tools, disabled builtin MCPs, disabled auto-update, and used the approved working directory. Claude's output was treated as advisory only; Codex verified it against repo policy before implementation.

Protected proposals were not implemented: no new pages, dependencies, backend/API/auth/deploy work, real AI, external services, object-model changes, commit, push, PR, deployment, or remote sharing.

## UX Changes Implemented

- Home now opens with a compact readiness banner, linked blocker chips, four operational status cards, packet preview, recent object-model state, and next safe actions.
- Workbench has a tighter object-map layout, compact local object palette, collapsible edge legend, reduced inspector tabs, and a Preview readiness link without duplicating the handoff preview.
- Spec Builder groups fields by status, keeps secondary field actions behind details controls, and retains sticky local-only actions.
- Review Runs renders compact finding cards by default.
- Preview adds a static wireframe and readiness rail while preserving gated local handoff behavior.
- Decisions adds a summary strip and filters while keeping the D-005 checkpoint visible.
- Trace & Evidence adds an SVG trace flow and moves raw trace links behind a details toggle.
- Rules & Scope adds allowed/protected overview cards and direct evidence links.

## Validation Evidence

- `node --check apps/static-mvp/src/app.js`: PASS
- Source audit: initially failed for missing GOAL-010 markers, then PASS after implementation.
- `npm run validate`: PASS after refreshing `artifacts/packages/openclaw-cooperative-cockpit-mvp.manifest.json` to the current `apps/static-mvp/` checksum.
- `git diff --check`: PASS
- `rg -n "alert\\(|confirm\\(|prompt\\(" apps/static-mvp/src/app.js`: no matches
- `rg -n "localStorage|sessionStorage|indexedDB|document\\.cookie|caches" apps/static-mvp`: no matches
- Static asset check confirmed `apps/static-mvp/index.html` references only local relative assets.

## Browser QA

Served the static app at `http://127.0.0.1:4175/` and ran local browser QA at 760, 1080, 1180, and 1280px widths across the existing eight pages:

- Home
- Workbench
- Spec Builder
- Review Runs
- Preview
- Decisions
- Trace & Evidence
- Rules & Scope

Browser checks confirmed:

- 8-page shell preserved; no new pages or routes.
- No console errors.
- No remote runtime requests.
- No horizontal overflow at tested widths.
- Handoff action remains gated.
- Workbench node cards do not overlap.
- Required GOAL-010 UI markers render on the expected pages.
- Home and Workbench screenshots were inspected after the final polish pass.

## Acceptance

GOAL-010 is implemented within the approved static/offline boundary. The app remains mock-only, uses in-memory state only, keeps local assets, preserves the eight-page surface, and keeps product canon under `docs/product/**`.

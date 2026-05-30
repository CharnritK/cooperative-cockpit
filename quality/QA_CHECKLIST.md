# QA Checklist

Use this checklist to verify that changes meet the repository’s quality standards.

## General

- [ ] Validation scripts (`npm run validate`) pass.
- [ ] The `.gitignore` does not ignore critical files.
- [ ] No new dependencies were added.
- [ ] Only declared paths were modified.
- [ ] Documentation is updated where relevant.

## Static MVP assimilation

- [ ] All eight pages exist and open without errors.  
- [ ] No user‑facing label says “Run”.  
- [ ] The handoff manifest is complete.  
- [ ] No network or API calls are made.  
- [ ] The MVP remains read‑only and static.
- [ ] The Workbench primary path clearly shows selected context, governed spec, D-005 gate and handoff preview.
- [ ] The primary demo path clearly shows rough context -> governed spec -> decision/evidence gate -> handoff preview without adding a ninth page.
- [ ] D-005 is visible as the static Codex handoff governance checkpoint.
- [ ] Missing acceptance criteria, missing/unreviewed evidence, or unresolved D-005 visibly blocks handoff readiness.
- [ ] The handoff packet preview includes objective, allowed paths, forbidden actions, required work, acceptance criteria, validation commands, stop conditions, and final response format.
- [ ] Architecture graph and handoff preview mock-data schemas remain valid JSON under `schemas/`.

## Static MVP object model lock

- [ ] `docs/product/STATIC_MVP_OBJECT_MODEL.md` classifies visible objects as core, supporting, internal mock-only, merged/renamed, deferred, or forbidden.
- [ ] `docs/product/STATIC_MVP_SCREEN_MAP.md` maps all eight current pages to the locked object model without adding pages.
- [ ] `docs/product/STATIC_MVP_MOCK_DATA_SPEC.md` covers workspace, project, context nodes, selected context, spec draft, review run, findings, decisions, evidence, work packet, handoff packet, agent roles, and validation results.
- [ ] `docs/product/SCOPE_GUARDRAILS_AND_POINT_LOCKS.md` preserves no backend, API, auth, database, deployment, runtime workflow execution, real agent orchestration, external connectors, MCP implementation, or new dependencies.
- [ ] Product-lock decisions in `docs/product/POINT_LOCK_DECISIONS.md` are reviewed before app-source goals GOAL-005 through GOAL-008 begin.

## QA Hardening

- [ ] QA tests cover all acceptance criteria.  
- [ ] All known issues are documented in `docs/STATUS.md`.  
- [ ] Artifacts added during QA have manifests.  
- [ ] The QA checklist is updated after each cycle.

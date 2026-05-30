# DR-003 — Repo Reality Check and Gap Audit

Readiness: READY_WITH_ASSUMPTIONS  
Scope: Repo-aware synthesis based on available prior repo inspection context

## Current repo reality summary

The repo is structured as an agent-ready workspace for OpenClaw Cooperative Cockpit. The static MVP is under `apps/static-mvp/`, with local HTML/CSS/JavaScript, mock data, app state, QA checklist, and build spec.

Validation is expected through:

```bash
npm run validate
```

Known validation components from prior repo inspection:

- structure check
- JSON syntax check
- no-secrets check
- task-card schema check
- gitignore safety check

## Current static MVP strengths

| strength | implication |
|---|---|
| Eight-page shell exists | Avoid page expansion; improve semantics inside existing shell. |
| Workbench canvas exists | Center-of-gravity screen is already present. |
| Spec Builder exists | Spec Draft can be formalized without new page. |
| Review Runs exists | Review Run/Finding objects can be normalized. |
| Decisions page exists | Decision object already has a natural home. |
| Trace & Evidence exists | Evidence object can be made concrete. |
| Rules & Scope exists | Guardrails can be strengthened. |
| Handoff button/gating exists | Work Packet/Handoff Packet can be surfaced without runtime export. |

## Main repo gaps

| gap_id | gap | severity | recommended action |
|---|---|---|---|
| RG-001 | No persisted final static MVP product roadmap in repo | High | Add roadmap doc. |
| RG-002 | No locked object model doc | High | Add object model doc. |
| RG-003 | Mock data has implicit objects only | High | Normalize after docs lock. |
| RG-004 | Work Packet not visible as core object | High | Add static panel after mock-data update. |
| RG-005 | Handoff Packet is mostly a button/state | Medium | Make it derived preview. |
| RG-006 | Validation Result not modeled as object | Medium | Add static validation results. |
| RG-007 | Agent Roles are repo docs but not static app metadata | Low | Keep internal mock only. |
| RG-008 | `docs/product/**` may be a new convention | Medium | Point lock or choose existing docs path. |

## Recommended repo-drop placement

Use:

```text
artifacts/deep-research/openclaw-static-mvp-research-pack-v0.1/
```

For product docs produced by Codex later, use either:

```text
docs/product/
```

or existing repo conventions:

```text
docs/decisions/
docs/handoffs/
docs/research/
```

Point should approve the destination path before Codex persists docs.

## Stop conditions for Codex

Stop if:
- a new dependency is needed
- app source changes are required for a docs-only goal
- files outside allowed paths must change
- validation fails outside scope
- backend/API/auth/database/deployment/runtime execution is requested
- real connectors/MCP/agent orchestration is implied
- product semantics are ambiguous

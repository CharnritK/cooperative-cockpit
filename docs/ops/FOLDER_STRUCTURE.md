# Folder Structure

This document explains the purpose of each top‑level folder in the repository. Maintaining a clear structure helps agents find what they need quickly and keeps work organised.

## `/apps`

Product implementations and prototypes. The initial target is `apps/static-mvp/` for the static HTML/CSS/JS MVP. Do not add frameworks, backends, or dependencies without Point approval.

## `/artifacts`

Storage for outputs and evidence. Subfolders include:

- `packages/`: Zip packages and downloadable bundles.  
- `deep-research/`: Long-form research reports and evidence syntheses.  
- `images/`: Product mockups, screenshots, and design boards.  
- `handoffs/`: Agent, Codex, reviewer, and downstream handoff packets.  
- `evidence/`: Supporting evidence files and trace packets.  
- `archive/`: Superseded packages and deprecated outputs.  
- `scratch/`: Temporary working files. Nothing critical should live here.  

Every artifact placed in `artifacts/` must have a manifest derived from `artifacts/MANIFEST_TEMPLATE.json`.

## `/docs`

Project documentation. Subfolders include:

- `ops/`: Operating workflow, approval policy, folder structure, and concurrency policy.  
- `research/`: Research briefs and scoped research prompts.  
- `handoffs/`: Human‑readable handoff documents.  
- `decisions/`: Decision records and Point locks.

## `/agents`

Role briefs for each agent type (planner, builder, reviewer, QA, researcher, orchestrator). These files describe responsibilities and interfaces.

## `/prompts`

Reusable prompts and handoff templates for ChatGPT and Codex.

## `/quality`

QA checklist and review rubrics used for acceptance testing.

## `/schemas`

JSON schemas for task cards, artifact manifests, and other structured data.

## `/scripts`

Local validation scripts. These are Node scripts with no external dependencies. Scripts include:

- `check_structure.js`: Ensures required files and directories exist.  
- `check_json.js`: Validates JSON syntax.  
- `check_no_secrets.js`: Ensures secrets are not present in the repository.  
- `check_task_cards.js`: Validates task cards against their schema.  
- `check_gitignore.js`: Ensures critical files are not ignored.  

## `/workspace`

Temporary working area. The inbox, outbox, and review subfolders are used by agents to exchange files during tasks.

## `/.codex`

Goal templates and individual goal files. These guide Codex agents through specific tasks.

## Active repository map

| Path | Purpose |
| --- | --- |
| `.codex/goals/` | Task card JSON files validated by local task-card checks. |
| `.storybook/` | Local Storybook configuration for Design OS component stories. |
| `apps/static-mvp/` | Browser-only OpenClaw Cooperative Cockpit MVP. |
| `apps/static-mvp/src/` | Static app source modules. |
| `apps/static-mvp/handoff/` | Handoff preview packet fixtures. |
| `artifacts/evidence/` | Goal evidence, validation notes, and review records. |
| `artifacts/evidence/design-system/` | Design-system visual QA and approval evidence. |
| `artifacts/packages/` | Package manifests for handoff artifacts. |
| `docs/design-system/` | Design OS source of truth, governance, schemas, mock data, and screen registry. |
| `docs/design-system/schemas/` | JSON schemas and screen-contract fixtures. |
| `docs/design-system/stories/` | Storybook stories for reusable Design OS components. |
| `docs/ops/` | Operational policy, concurrency policy, status, and structure docs. |
| `docs/product/` | Product requirements and backlog docs. |
| `schemas/` | Repository-level artifact, handoff, and task-card schemas. |
| `scripts/` | Local validation and role-wrapper scripts. |
| `tests/` | Offline wrapper and validator tests. |

Run `npm run validate` to execute structure, JSON parsing, schema checks, screen-registry checks, secret scanning, task cards, concept consistency, wrapper tests, and open-gate warnings.


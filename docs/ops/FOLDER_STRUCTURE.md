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
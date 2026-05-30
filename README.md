# Cooperative Cockpit Repository

This repository provides the operating system for the **OpenClaw Cooperative Cockpit** project. It defines how agents work together, how artifacts are stored, and how changes are validated before they are applied.

The static MVP has been assimilated under `apps/static-mvp/`. Its entrypoint is `apps/static-mvp/index.html`; it remains a plain HTML/CSS/JavaScript prototype with local assets only.

## Authoritative Sources

- **Product canon:** `docs/product/**` defines the static MVP object model, screen map, scope guardrails, roadmap, and product-lock decisions.
- **Agent governance canon:** root `OPERATING_WORKFLOW.md` defines the command-center workflow and source-control authority. `docs/ops/**` provides supporting approval, concurrency, folder, and status policies.
- **Current state canon:** `docs/ops/STATUS.md` is the single project status source. `docs/ROADMAP.md` and `docs/TASKS.md` summarize that status and should not contradict it.
- **Historical/provenance packages:** archived zips and extracted package folders under `artifacts/` preserve prior handoffs; they are not current-state authority unless explicitly marked current.

## Key Policies

- **Approval policy:** Product scope, architecture decisions, new dependencies, external services, secrets, deployment, runtime mutation, and writes outside declared paths require Point lock. Routine documentation and scaffolding changes can be performed without review.
- **Concurrency policy:** Only one agent owns a given path at a time. Branches must follow `agent/<task-id>-<short-name>`. Agents must declare branch, task ID, allowed paths, expected files, and validation commands before starting work. See `docs/ops/CONCURRENCY_POLICY.md`.
- **Artifact manifest:** Every artifact placed in `artifacts/` must have a manifest describing its ID, type, creation date, owner, source, status, and related task. Use `artifacts/MANIFEST_TEMPLATE.json`.

## Running Validation

Node.js is required for the local validation scripts. No package dependencies are required.

```sh
npm run validate
```

The `validate` script checks required structure, JSON syntax, obvious secret markers, task cards, `.gitignore` safety rules, and concept-consistency guardrails for the static MVP handoff surface.

## Repository Layout

- `apps/`: product implementations and prototypes. The current static MVP lives in `apps/static-mvp/`. Do not add frameworks, backends, APIs, auth, deployment scripts, or dependencies without Point lock.
- `artifacts/`: storage for packages, deep research, images, handoffs, evidence, archives, and scratch files. Each artifact must have a manifest.
- `docs/`: operating policies, folder structure, research, handoffs, decisions, status, roadmap, risks, and task logs.
- `agents/`: role briefs for planner, builder, reviewer, QA, researcher, and orchestrator agents.
- `prompts/`: reusable prompts and handoff templates.
- `quality/`: repository QA checklist and review rubric.
- `schemas/`: JSON schemas used by tasks and manifests.
- `scripts/`: dependency-free Node.js validation scripts.
- `workspace/`: inbox, outbox, and review folders for intermediate working files.
- `.codex/`: goal templates and per-task goal files.

Refer to `docs/ops/FOLDER_STRUCTURE.md` and `docs/ops/STATUS.md` for the current operating state.

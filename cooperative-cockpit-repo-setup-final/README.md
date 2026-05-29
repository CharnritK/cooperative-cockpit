# Cooperative Cockpit Repository

This repository provides the operating system for the **OpenClaw Cooperative Cockpit** project. It defines how agents work together, how artifacts are stored, and how to validate changes before they are applied. The goal is to enable 95 % autonomous work while reserving Point's attention for the 5 % of decisions that truly matter.

## Key Policies

* **Approval policy:** Only certain changes require Point's explicit lock, such as product scope, architecture decisions, new dependencies, external services, secrets, deployment, or runtime mutation. Routine documentation and scaffolding changes can be performed without review.
* **Concurrency policy:** Only one agent owns a given path at a time. Branches must follow the pattern `agent/<task‑id>-<short‑name>`. Agents must declare their branch, task ID, allowed paths, expected files, and validation commands before starting work. See `docs/ops/CONCURRENCY_POLICY.md` for details.
* **Artifact manifest:** Every artifact placed in the `artifacts/` folder must have a corresponding manifest describing its ID, type, creation date, owner, source, status, and related task. A JSON template is provided at `artifacts/MANIFEST_TEMPLATE.json`.

## Hardened `.gitignore`

The `.gitignore` has been updated to avoid accidentally ignoring important safety scripts. It only excludes specific secret patterns rather than any file containing the word "secret". It still ignores environment files (`.env`), keys (`*.pem`), credential files by explicit name, and common local configuration files.

## Running Validation

Install Node.js (LTS version) locally. Then run:

```sh
npm install      # no extra dependencies are installed; this is only needed if node modules are required for scripts
npm run validate
```

The `validate` script will run a series of checks including structure, JSON files, secrets, task cards, and the gitignore rules. If any check fails, it will exit with a non‑zero status and print an error message.

## Repository Layout

The repository is organised into clearly separated zones:

- `apps/`: product implementations and prototypes. The initial target for the static MVP is `apps/static-mvp/`. Do not add frameworks, backends, or dependencies without Point lock.
- `artifacts/`: storage for packages, deep research, images, handoffs, evidence, archives, and scratch files. Each artifact must have a manifest. See `artifacts/MANIFEST_TEMPLATE.json`.
- `docs/`: documentation including operating policies, folder structure, research, handoffs, and decision records. The `docs/ops` folder contains workflow and approval policies.
- `agents/`: role briefs for each agent type.
- `prompts/`: reusable prompts and handoff templates.
- `quality/`: QA checklist and review rubrics.
- `schemas/`: JSON schemas used by tasks and manifests.
- `scripts/`: local validation scripts. These use Node.js only and require no external dependencies.
- `workspace/`: inbox/outbox/review folders for intermediate working files.
- `.codex/`: goal templates and per-task goal files. These are used to coordinate with the Codex agent.

Refer to `docs/ops/FOLDER_STRUCTURE.md` for a full explanation.
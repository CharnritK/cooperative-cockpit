# Operating Workflow

This document describes the general workflow for agents working in the cooperative-cockpit repository.

1. **Understand the task** – Review the GOAL file in `.codex/goals/` that corresponds to your task. Understand the allowed paths, forbidden actions, and acceptance criteria.
2. **Declare intent** – Before starting work, declare your branch name, task ID, allowed paths, files you intend to touch, and validation commands according to the Concurrency Policy.
3. **Work within boundaries** – Edit only the files you declared. Follow the approval policy: do not add dependencies, frameworks, backend code, external services, or modify protected surfaces without a Point lock.
4. **Validate** – Run `npm run validate` to ensure structure, JSON, secrets, tasks, and gitignore rules are all compliant. Fix any issues before proceeding.
5. **Commit and push** – Commit your changes on your task branch. Do **not** merge or deploy without approval. Create a pull request if necessary and tag the Reviewer agent.
6. **Review and QA** – Another agent reviews your work against the acceptance criteria and QA checklist. Address feedback as needed.
7. **Handoff or merge** – Once approved, deliver the handoff package or merge changes into the main branch, subject to the approval policy.

### Package ingest guardrail

For any incoming package zip in this repository:

1. Extract into the canonical unpacked target first.
2. Verify extraction parity (zip entries vs extracted files).
3. Move the source `.zip` into `artifacts/archive/handoffs/` as immutable provenance.
4. Record an archived-source manifest in `artifacts/archive/handoffs/` (`artifact_type: archived_handoff_source_zip`, `status: archived_provenance`).

Refer to `docs/ops/APPROVAL_POLICY.md` and `docs/ops/CONCURRENCY_POLICY.md` for details on approvals and branching.

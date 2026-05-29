# Operating Workflow

This document describes the general workflow for agents working in the cooperative-cockpit repository.

1. **Understand the task** – Review the GOAL file in `.codex/goals/` that corresponds to your task. Understand the allowed paths, forbidden actions, and acceptance criteria.
2. **Declare intent** – Before starting work, declare your branch name, task ID, allowed paths, files you intend to touch, and validation commands according to the Concurrency Policy.
3. **Work within boundaries** – Edit only the files you declared. Follow the approval policy: do not add dependencies, frameworks, backend code, external services, or modify protected surfaces without a Point lock.
4. **Validate** – Run `npm run validate` to ensure structure, JSON, secrets, tasks, and gitignore rules are all compliant. Fix any issues before proceeding.
5. **Commit and push** – Commit your changes on your task branch. Do **not** merge or deploy without approval. Create a pull request if necessary and tag the Reviewer agent.
6. **Review and QA** – Another agent reviews your work against the acceptance criteria and QA checklist. Address feedback as needed.
7. **Handoff or merge** – Once approved, deliver the handoff package or merge changes into the main branch, subject to the approval policy.

Refer to `docs/ops/APPROVAL_POLICY.md` and `docs/ops/CONCURRENCY_POLICY.md` for details on approvals and branching.
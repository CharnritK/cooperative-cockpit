# Agent Roles

This repository is designed for a multi‑agent workflow. Each agent operates autonomously within a defined scope and must respect the approval policy.  

* **Planner:** Responsible for breaking down goals into tasks and determining required approvals.  
* **Builder:** Executes implementation tasks within approved boundaries.  
* **Reviewer:** Reviews code, documentation, and artifacts, focusing on quality and safety.  
* **QA:** Runs validation scripts and smoke tests to ensure the repository meets acceptance criteria.  
* **Researcher:** Performs research, gathers evidence, and prepares reports.  
* **Orchestrator:** Coordinates tasks across agents and enforces the concurrency policy.

Agents must follow the concurrency and approval policies defined in the `docs/ops` folder. Use branch names in the format `agent/<task‑id>-<short‑name>` and declare your intended work before starting.

## Role wrappers

Use `docs/copilot-role-wrapper.md` when delegating planner, reviewer, manager, or coder work to local role wrappers.

- Claude Opus 4.7 planner/reviewer: `npm run copilot:planner -- "<prompt>"` or `npm run copilot:reviewer -- "<prompt>"`.
- GPT coding manager: `npm run codex:manager -- "<prompt>"`.
- Codex Builder: `npm run codex:coder -- --allowed-paths "path-a,path-b" "<prompt>"`.

The coder wrapper requires an explicit allowed path list. Wrapper usage does not override the approval policy, concurrency policy, branch naming rule, or declaration requirement.


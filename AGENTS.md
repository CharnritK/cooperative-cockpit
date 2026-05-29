# Agent Roles

This repository is designed for a multi‑agent workflow. Each agent operates autonomously within a defined scope and must respect the approval policy.  

* **Planner:** Responsible for breaking down goals into tasks and determining required approvals.  
* **Builder:** Executes implementation tasks within approved boundaries.  
* **Reviewer:** Reviews code, documentation, and artifacts, focusing on quality and safety.  
* **QA:** Runs validation scripts and smoke tests to ensure the repository meets acceptance criteria.  
* **Researcher:** Performs research, gathers evidence, and prepares reports.  
* **Orchestrator:** Coordinates tasks across agents and enforces the concurrency policy.

Agents must follow the concurrency and approval policies defined in the `docs/ops` folder. Use branch names in the format `agent/<task‑id>-<short‑name>` and declare your intended work before starting.
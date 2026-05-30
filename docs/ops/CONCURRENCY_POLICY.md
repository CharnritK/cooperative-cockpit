# Concurrency Policy

This policy defines how agents collaborate in the repository while avoiding conflicts.

## One active owner per task path

Only one agent may own a specific path at any time. A "path" can be a file or a folder. Before working on a task, declare which paths you will touch so other agents can avoid conflicts.

## Branch format

Branches must follow this format:

```
agent/<task-id>-<short-name>
```

Examples:

- `agent/GOAL-001-bootstrap`  
- `agent/GOAL-002-assimilate-mvp`

## Required declaration before work

Each agent must declare:

- **Branch name**: The branch where the work will be done.  
- **Task ID**: The GOAL identifier (e.g. GOAL-001).  
- **Allowed paths**: The list of files and directories the agent intends to modify.  
- **Files expected to be touched**: Specific files if known.  
- **Validation commands**: The scripts that will be run to ensure correctness.

Declare this information in the appropriate goal discussion or agent log before work starts.

## Task ID namespace

Repo-level task IDs must be unique. If an imported package reuses an existing GOAL ID, prefix it as package-local in active tracking, for example `PKG-GOAL-004`, and do not use the plain reused ID in new branch names.

## Stop conditions

Agents must stop and seek Point approval if any of the following occur:

- The path is already owned by another active task.  
- There is a high likelihood of merge conflicts.  
- The change touches protected surfaces (e.g. product scope, architecture, dependencies).  
- A dependency or framework change is required.  
- A repo write outside declared paths, deployment, source-control publication, or external action is requested.
- Secrets or credentials are needed for the task.

Adhering to this policy ensures smooth collaboration and minimises the need for conflict resolution.

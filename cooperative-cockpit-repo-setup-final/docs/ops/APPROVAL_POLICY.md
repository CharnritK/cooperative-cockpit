# Approval Policy

This policy defines which actions require Point’s explicit approval and which are autonomously allowed by agents. The objective is to minimise the number of decisions Point must make (targeting 5 % review) while ensuring safety and alignment with project goals.

## Requires Point Lock

The following changes require an explicit **Point lock** before they can be merged:

- **Product scope changes** – altering or adding major features beyond approved goals.  
- **Architecture decisions** – introducing new patterns, frameworks, or system boundaries.  
- **New dependencies or frameworks** – adding packages or third‑party libraries.  
- **External services** – connecting to APIs, databases, or any external system.  
- **Authentication and secrets** – handling user credentials or sensitive information.  
- **Deployment** – actions that publish or release code to production or staging.  
- **Repo writes beyond approved paths** – modifying areas outside the declared allowed paths.  
- **Runtime mutation or database writes** – any code that executes or modifies runtime state.  
- **Final milestone acceptance** – closing major goals or delivering final packages.

## Autonomous by Default

Agents may perform the following without Point lock:

- Documentation edits, formatting changes, and typo fixes.  
- Folder hygiene and manifest updates.  
- Validation scripts and local QA improvements.  
- Adding new research or evidence files in the `artifacts/` folder (with manifests).  
- Updating prompts and handoff templates.  
- Moving files to archive.  
- Updating QA checklists and review rubrics.

## Relationship to Concurrency Policy

All autonomous work must still respect the Concurrency Policy (`docs/ops/CONCURRENCY_POLICY.md`), which governs branch ownership and stop conditions. Violating either policy requires halting the task and seeking Point approval.
# Approval Policy

This policy defines which actions require Point’s explicit approval and which are autonomously allowed by agents. The objective is to minimise the number of decisions Point must make (targeting 5 % review) while ensuring safety and alignment with project goals.

## Requires Point Lock

The following changes require an explicit **Point lock** before they can be treated as approved product/project state:

- **Product scope changes** – altering or adding major features beyond approved goals.  
- **Architecture decisions** – introducing new patterns, frameworks, or system boundaries.  
- **New dependencies or frameworks** – adding packages or third‑party libraries.  
- **External services** – connecting to APIs, databases, or any external system.  
- **Authentication and secrets** – handling user credentials or sensitive information.  
- **Deployment** – actions that publish or release code to production or staging.  
- **Repo writes beyond approved paths** – modifying repository files outside the declared allowed paths.
- **Source-control publication** – staging, committing, pushing, opening PRs, merging, or tagging releases unless explicitly authorized by the task packet or Point.
- **Runtime mutation or database writes** – backend, service, database, filesystem, repository, or external runtime mutation. Local browser mock state in `apps/static-mvp/` is allowed when it remains offline/static and within approved scope.
- **Final milestone acceptance** – closing major goals or delivering final packages.

## Autonomous by Default

Agents may perform the following without Point lock:

- Documentation edits, formatting changes, and typo fixes within declared paths.
- Folder hygiene and manifest updates within declared paths.
- Validation scripts and local QA improvements within declared paths.
- Adding new research or evidence files in the `artifacts/` folder (with manifests).  
- Updating prompts and handoff templates.  
- Moving files to archive or removing stale duplicate package surfaces when the task explicitly covers provenance cleanup.
- Updating QA checklists and review rubrics.

## Relationship to Concurrency Policy

All autonomous work must still respect the Concurrency Policy (`docs/ops/CONCURRENCY_POLICY.md`), which governs branch ownership and stop conditions. Violating either policy requires halting the task and seeking Point approval.

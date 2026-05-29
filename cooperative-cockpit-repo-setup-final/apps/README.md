# Apps Folder

This directory holds all product implementations and prototypes for the OpenClaw Cooperative Cockpit.

## Initial target

The first application in this repository is the static MVP located in:

```
apps/static-mvp/
```

This contains the read‑only HTML/CSS/JS prototype with eight pages (Home, Workbench, Spec Builder, Review Runs, Preview, Decisions, Trace & Evidence, Rules & Scope) and uses only local mock data. It does **not** include any backend, API calls, authentication, real AI calls, repo writes, runtime mutation, or deployment scripts.

## Restrictions

- Do **not** add frameworks (e.g. React, Vue), backend code, authentication, external APIs, or deployment scripts without Point approval.
- Do **not** modify the static MVP’s scope or add new pages unless a new goal has been approved.
- Do **not** add dependencies to `package.json` without Point approval.

Future applications may be added here under their own subfolders once approved.
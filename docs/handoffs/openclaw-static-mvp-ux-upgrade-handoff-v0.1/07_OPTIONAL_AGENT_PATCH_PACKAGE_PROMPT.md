# 07 Optional Agent Patch Package Prompt

Use this only if you want ChatGPT Agent or another code generator to produce a patch package first, then have local Codex apply and validate it.

```text
You are acting as a senior product engineer and frontend architect.

Task:
Generate a patch-ready implementation package for the OpenClaw Cooperative Cockpit static MVP UX upgrade.

Important:
Do not claim tests passed unless you actually ran them.
If you cannot inspect enough repository files, stop and request context.
Do not add dependencies, backend, API, auth, database, deployment, external connectors, real AI/model calls, persistence, secrets, or private data.

Repository context:
- Repo: CharnritK/cooperative-cockpit
- App surface: apps/static-mvp/
- Static entry: apps/static-mvp/index.html
- Existing validation command: npm run validate

Required UX:
Landing / Product Concept
→ Static Demo Entry
→ Project Hub
→ Project Initialize
→ Workbench
→ Spec Builder / Review / Preview / Decisions / Trace / Rules

Workbench must become:
- Left Object Outline
- Center Spatial Board / Mixed Map / Flat Flow
- Right Inspector / Edit Fields / Mock Copilot / Evidence / Trace
- Readiness queue

Required output:
1. Implementation summary
2. File change inventory
3. Single unified diff
4. Full contents for any new files
5. Local Codex test prompt
6. Manual QA checklist
7. Risk notes

Patch rules:
- Must be apply-ready.
- Do not omit hunks.
- Do not use pseudo-code.
- Do not say “similar changes omitted.”
- Do not summarize code instead of providing code.

Stop if:
- target files cannot be inspected;
- forbidden capability is required;
- implementation requires full app rewrite;
- private data is needed.
```

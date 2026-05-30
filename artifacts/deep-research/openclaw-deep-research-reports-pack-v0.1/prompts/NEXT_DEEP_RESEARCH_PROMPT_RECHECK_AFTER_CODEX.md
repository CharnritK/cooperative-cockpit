# Next Deep Research Prompt — Recheck After Codex Assimilation

```text
I want this to run as a ChatGPT Deep Research task, not as a normal chat answer.

Research objective:
Recheck the OpenClaw Cooperative Cockpit static MVP research pack after Codex has persisted it into the repo.

Decision supported:
Decide whether the persisted research pack is sufficient to guide the next static MVP implementation slice, or whether more evidence/research is needed.

Sources to use:
1. Current repo `CharnritK/cooperative-cockpit`.
2. Persisted package under `artifacts/deep-research/openclaw-static-mvp-research-pack-v0.1/`.
3. Current `docs/ops/STATUS.md`.
4. Current validation evidence under `artifacts/evidence/`.
5. Current static MVP files under `apps/static-mvp/`.

Research questions:
1. Was the package persisted correctly?
2. Are object model decisions clear enough for Codex?
3. Are Point-lock decisions explicit?
4. Are any unsupported claims being used as rationale?
5. Is the next Codex goal bounded and safe?
6. Does the package preserve static-only constraints?
7. What should Codex do next?

Required output:
1. Executive summary.
2. Repo persistence audit.
3. Readiness verdict.
4. Missing evidence/gap backlog.
5. Recommended next Codex /goal.
6. Stop conditions.

Do not implement code.
Do not recommend backend/runtime/API/auth/database/deployment/connectors/MCP.
```

# OpenClaw Research Backlog Review Package v0.1

Created: 2026-05-30  
Owner: Point  
Repo target: `CharnritK/cooperative-cockpit`  
Package purpose: persist the latest OpenClaw research-backlog review, revised research prompts, Point-lock recommendations, and next Codex handoff candidate.

## What this package contains

| file | purpose |
|---|---|
| `docs/research/OPENCLAW_RESEARCH_BACKLOG_REVIEW_2026-05-30.md` | Full research-backlog audit and recommendation report. |
| `docs/research/OPENCLAW_REVISED_RESEARCH_PROMPTS_2026-05-30.md` | Copy-ready P0/P1 follow-up research/synthesis prompts. |
| `docs/handoffs/CODEX_GOAL_005_NORMALIZE_STATIC_MOCK_DATA.md` | Copy-ready Codex `/goal` for GOAL-005, gated by Point object-model lock. |
| `docs/decisions/POINT_LOCK_RECOMMENDATIONS_2026-05-30.md` | Point-lock decisions extracted from the review. |
| `REPO_PERSISTENCE_PLAN.md` | Suggested destination paths and safe assimilation checklist. |
| `artifact_manifest.json` | Manifest using the project artifact manifest pattern. |
| `CHECKSUMS.txt` | SHA256 hashes for package files. |

## Intended repo placement

Recommended: keep the zip under:

```text
artifacts/packages/openclaw-research-backlog-review-package-v0.1.zip
```

Then unpack selected files into the suggested repo paths only after Point approves.

## Important boundary

This package is documentation and handoff material only. It does not authorize backend, API, auth, database, deployment, runtime workflow execution, real agent orchestration, external connectors, MCP implementation, new dependencies, or repo writes outside approved paths.

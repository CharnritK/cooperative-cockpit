# Repo Persistence Plan

Created: 2026-05-30  
Package: `openclaw-research-backlog-review-package-v0.1`

## Recommended zip placement

```text
artifacts/packages/openclaw-research-backlog-review-package-v0.1.zip
```

## Suggested unpacked repo paths

| package file | suggested repo path | action |
|---|---|---|
| `docs/research/OPENCLAW_RESEARCH_BACKLOG_REVIEW_2026-05-30.md` | `docs/research/OPENCLAW_RESEARCH_BACKLOG_REVIEW_2026-05-30.md` | Add |
| `docs/research/OPENCLAW_REVISED_RESEARCH_PROMPTS_2026-05-30.md` | `docs/research/OPENCLAW_REVISED_RESEARCH_PROMPTS_2026-05-30.md` | Add |
| `docs/handoffs/CODEX_GOAL_005_NORMALIZE_STATIC_MOCK_DATA.md` | `docs/handoffs/CODEX_GOAL_005_NORMALIZE_STATIC_MOCK_DATA.md` | Add or keep package-only if duplicate with `.codex/goals/GOAL-005...` |
| `docs/decisions/POINT_LOCK_RECOMMENDATIONS_2026-05-30.md` | `docs/decisions/POINT_LOCK_RECOMMENDATIONS_2026-05-30.md` | Add |
| `artifact_manifest.json` | `artifacts/packages/openclaw-research-backlog-review-package-v0.1.manifest.json` | Add |

## Safe assimilation checklist

1. Confirm working tree is clean.
2. Confirm current branch and latest commit.
3. Copy zip to `artifacts/packages/`.
4. Copy selected docs to `docs/research/`, `docs/handoffs/`, and `docs/decisions/`.
5. Run:

```bash
npm run validate
git check-ignore -v scripts/check_no_secrets.js
git check-ignore -v AGENTS.md
```

6. Do not run GOAL-005 until Point accepts or revises the object model defaults.

## Stop conditions

- Stop if files outside documented repo paths are required.
- Stop if validation fails.
- Stop if the package conflicts with existing product-lock docs.
- Stop if any step implies backend, API, auth, database, deployment, runtime execution, real orchestration, external connectors, MCP, new dependencies, or new pages.

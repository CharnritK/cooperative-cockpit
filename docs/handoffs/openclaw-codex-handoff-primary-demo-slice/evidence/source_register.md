# Source Register

Status: Historical handoff packet. Current product/source canon lives in `docs/product/**`.

| source_id | title | type | reference | used_for |
|---|---|---|---|---|
| S001 | OpenClaw GPT-5.5 Pro Final Handoff Package Prompt | user prompt | uploaded prompt in this chat | handoff scope, constraints, package structure |
| S002 | README.md | repo file | README.md | repo purpose, static MVP location, validation policy |
| S003 | package.json | repo file | package.json | validation scripts |
| S004 | docs/ops/STATUS.md | repo file | docs/ops/STATUS.md | current repo status and next step |
| S005 | apps/static-mvp/README.md | repo file | apps/static-mvp/README.md | static MVP pages, non-goals, local run mode |
| S006 | apps/static-mvp/BUILD_SPEC.md | repo file | apps/static-mvp/BUILD_SPEC.md | locked decisions, governance, acceptance criteria |
| S007 | apps/static-mvp/index.html | repo file | apps/static-mvp/index.html | app shell, navigation, scripts, top actions |
| S008 | apps/static-mvp/src/mockData.js | repo file | apps/static-mvp/src/mockData.js | current mock objects and statuses |
| S009 | apps/static-mvp/src/state.js | repo file | apps/static-mvp/src/state.js | current client-side state and handoff flag |
| S010 | apps/static-mvp/src/app.js | repo file | apps/static-mvp/src/app.js | readiness logic and render behavior |
| S011 | apps/static-mvp/QA_CHECKLIST.md | repo file | apps/static-mvp/QA_CHECKLIST.md | manual static MVP QA |
| S012 | apps/static-mvp/handoff/manifest.json | repo file | apps/static-mvp/handoff/manifest.json | static MVP handoff manifest and non-goals |
| S013 | apps/static-mvp/handoff/handoff-placeholder.json | repo file | apps/static-mvp/handoff/handoff-placeholder.json | current handoff placeholder data |
| S014 | .gitignore | repo file | .gitignore | secret/file ignore guardrails |
| S015 | artifacts/evidence/GOAL-008-validation.md | repo evidence | artifacts/evidence/GOAL-008-validation.md | current static MVP QA closeout baseline before GOAL-009 |
| S016 | quality/QA_CHECKLIST.md | repo file | quality/QA_CHECKLIST.md | repo-level QA checklist |
| S017 | .codex/goals/GOAL-001-bootstrap-agent-ready-repo.md | repo file | .codex/goals/GOAL-001-bootstrap-agent-ready-repo.md | goal format and boundary pattern |
| S018 | scripts/check_gitignore.js | repo file | scripts/check_gitignore.js | critical ignore validation behavior |
| S019 | docs/research/deep-research-report.md | repo research | docs/research/deep-research-report.md | persisted Deep Research scenario and scope evidence |
| S020 | Historical connector inspection | connector result | 3f610a66c52e938e42f004b9f53adccc4f78e9c3 | original package-inspected commit only |

Note: Sources are repo paths and uploaded prompt references. GitHub connector inspection was read-only.

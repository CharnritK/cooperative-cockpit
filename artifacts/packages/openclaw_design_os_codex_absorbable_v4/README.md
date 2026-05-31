# OpenClaw Design OS Codex Absorbable v4

## What this is

A repo-ready Design Operating System package for OpenClaw Cooperative Cockpit. It is designed so Codex can absorb the package in small, bounded goals without guessing.

## What improved from v3

- Added root `CODEX_START_HERE.md`.
- Added `MANIFEST.md` with exact read order and sequence.
- Fixed v3 path contradiction by using `.codex/goals/GOAL-DS-001-assimilate-design-os-docs.md` consistently.
- Split Storybook and Playwright into separate goals: DS-002A and DS-002B.
- Added package-manager detection gates.
- Strengthened JSON schemas with required fields, enums, ID patterns, and `additionalProperties: false` where safe.
- Added token audit evidence template.
- Added workflow-studio style brief for Dify-inspired-but-not-copying direction.
- Tightened allowed paths in every goal.
- Added exact validation success/fail criteria and final Codex report format.

## How to hand this to Codex

1. Unzip package into repo root.
2. Tell Codex to read `CODEX_START_HERE.md`.
3. Tell Codex to execute only DS-001 first.
4. Review DS-001 output and validation.
5. Proceed sequentially only after the previous goal is accepted.

## Do not do

- Do not run all goals at once.
- Do not skip DS-001.
- Do not add Storybook and Playwright in one combined step.
- Do not let Codex infer package manager.
- Do not modify app runtime files in DS-001.
- Do not claim repo validation passed unless Codex reports exact output.

## Expected sequence

1. DS-001 docs assimilation.
2. DS-002A Storybook scaffold.
3. DS-002B Playwright scaffold.
4. DS-003 token audit/finalization.
5. DS-004 component taxonomy/stories.
6. DS-005 mock data/registry.
7. DS-006 baselines/evidence.

## Readiness verdict

READY_WITH_ASSUMPTIONS.

Reason: Package structure, paths, schemas, and JSON were prepared for Codex absorption. In this assimilated repo snapshot, Codex validation evidence is recorded under `artifacts/evidence/design-system/`.

# MANIFEST — OpenClaw Design OS Codex Absorbable v4

## Package

- Name: `openclaw_design_os_codex_absorbable_v4`
- Owner: Point
- Version: v4
- Status: assimilated candidate; repo validation run during Codex closeout, with remaining Point/design-system gates recorded separately
- Created: 2026-05-31

## Purpose

Provide a compact, deterministic Design Operating System package that Codex can absorb through staged goals without guessing, broad refactors, or scope expansion.

## Repo Assimilation Model

The live assimilated files are installed at repo-root paths such as `CODEX_START_HERE.md`, `.codex/goals/**`, and `docs/design-system/**`.

The folder `artifacts/packages/openclaw_design_os_codex_absorbable_v4/` preserves package provenance metadata and the original package README. It is not expected to duplicate every live repo file after assimilation. Current repo validation and `artifacts/evidence/design-system/**` are authoritative for post-assimilation state.

## Product locks

- Storybook is approved for MVP dev/test integration only.
- Playwright is approved for MVP visual regression only.
- The old eight-page cap is superseded for design-system planning and replaced by a governed screen registry; current app implementation remains evidence-bound.
- Design tokens must be finalized from the current static MVP implementation, current styling, Dify-inspired workflow-studio direction, and accessibility requirements.
- Component naming and organization must be semantic, scalable, and Codex-readable.
- Mock data must be canonical, realistic, schema-backed, and contain no real PII or secrets.

## Non-goals

- No backend.
- No API calls.
- No authentication.
- No database.
- No deployment work.
- No runtime workflow execution.
- No real AI execution.
- No real agent orchestration.
- No persistent storage unless later explicitly approved.
- No external connectors.
- No repository-write behavior from the UI.
- No CDN scripts.
- No remote fonts.
- No real secrets, credentials, or PII in mock data.
- No public/demo language implying a working orchestrator.
- Avoid user-facing action labels that imply execution, such as “Run,” except existing locked page/title contexts.
- Storybook and Playwright are dev/test only, never production runtime.

## File tree

```text
openclaw_design_os_codex_absorbable_v4/
  CODEX_START_HERE.md
  MANIFEST.md
  README.md
  ARTIFACT_MANIFEST.json
  CHECKSUMS.json
  PACKAGE_AUDIT.md
  .codex/
    goals/
      GOAL-DS-001-assimilate-design-os-docs.md
      GOAL-DS-002A-storybook-scaffold.md
      GOAL-DS-002B-playwright-scaffold.md
      GOAL-DS-003-token-audit-and-finalization.md
      GOAL-DS-004-component-taxonomy-and-stories.md
      GOAL-DS-005-mock-data-and-screen-registry.md
      GOAL-DS-006-playwright-baselines-and-evidence.md
  docs/
    design-system/
      00_CODEX_ABSORB_FIRST.md
      01_DECISIONS_AND_PRODUCT_LOCKS.md
      02_DESIGN_OPERATING_MODEL.md
      03_TOKEN_SYSTEM.md
      04_COMPONENT_TAXONOMY.md
      05_COMPONENT_CONTRACTS.md
      06_SCREEN_REGISTRY.md
      07_MOCK_DATA_CONTRACT.md
      08_STORYBOOK_CONTRACT.md
      09_PLAYWRIGHT_VISUAL_QA_CONTRACT.md
      10_CODEX_HANDOFF_CONTRACT.md
      11_WORKFLOW_STUDIO_STYLE_BRIEF.md
      12_GOVERNANCE_CHECKLIST.md
      tokens/
        README.md
        openclaw.tokens.json
      schemas/
        openclaw-mock-data.schema.json
        component-contract.schema.json
        screen-contract.schema.json
        visual-baseline.schema.json
      mock-data/
        README.md
        openclaw.mock-data.v1.json
      evidence/
        state-coverage-matrix.md
        token-audit/
          raw-to-semantic-map.template.md
        visual-baselines/
          README.md
      prompts/
        v0_screen_prompts.md
        v0_component_prompts.md
        critique_prompts.md
        codex_goal_prompts.md
```

## Mandatory read order

1. `CODEX_START_HERE.md`
2. `MANIFEST.md`
3. `README.md`
4. `docs/design-system/00_CODEX_ABSORB_FIRST.md`
5. `.codex/goals/GOAL-DS-001-assimilate-design-os-docs.md`

## Implementation sequence

| order | goal | purpose |
|---:|---|---|
| 1 | DS-001 | docs assimilation only |
| 2 | DS-002A | Storybook dev/test scaffold |
| 3 | DS-002B | Playwright visual regression scaffold |
| 4 | DS-003 | token audit and finalization |
| 5 | DS-004 | component taxonomy and stories |
| 6 | DS-005 | mock data and screen registry |
| 7 | DS-006 | visual baselines and evidence |

## First Codex action

Execute only:

```text
.codex/goals/GOAL-DS-001-assimilate-design-os-docs.md
```

## Validation approach

- Package JSON must parse.
- Schemas must parse as JSON.
- Mock fixture should validate against schema where tooling exists.
- Repo validation must be run by Codex inside the repo.
- No validation pass may be claimed without exact output.

## Complete means

This package is complete when all files listed above exist, JSON parses, paths are consistent, and DS-001 can be handed to Codex without ambiguity.

It is not repo-complete until Codex applies goals and records validation evidence.

## Assumptions

- The repo still uses `CharnritK/cooperative-cockpit`.
- Storybook and Playwright remain approved dev/test dependencies.
- Package manager must be detected from the repo; this package does not assume one.
- Current repo validation status is unknown until refreshed.

## Known risks

| risk | mitigation |
|---|---|
| tooling sequence drift | Storybook, Playwright, and visual baseline review stay split by evidence gate |
| token values not final | DS-003 audit evidence exists, but Point/design-system approval is still required before runtime token adoption |
| screen registry over-claim | registry tracks approval and implementation separately |
| false visual pass | DS-006 requires exact Playwright output |
| app runtime scope creep | goals avoid broad `apps/static-mvp/**` write paths |

## Reviewer gates

| gate | reviewer | pass condition | fallback |
|---|---|---|---|
| DS-001 docs assimilation | Point / QA | paths copied, JSON parses, validation output reported | revise package paths |
| Storybook setup | Point | dev/test only, package manager confirmed | stop / split further |
| Playwright setup | Point / QA | visual-only, no deployment scope | stop / revise |
| token finalization | Point / design reviewer | audit evidence and contrast review complete | keep candidate tokens |
| new screen implementation | Point | approved screen contract exists | registry-only, no build |

## Current Status and Remaining Locks

- DS-002A Storybook scaffold is implemented with npm/package-lock and smoke validation evidence.
- DS-002B Playwright scaffold is implemented with npm/package-lock and validation evidence.
- DS-006 candidate visual screenshots exist and are reviewer-inspected as candidate evidence; approved baseline promotion remains pending Point/design reviewer approval.
- DS-004 docs-only component stories exist, but runtime component extraction remains Point-locked.
- Final token approval remains pending Point/design-system lock even though DS-003 technical audit evidence now exists.
- Product-canon reconciliation is still required before any new registry screen is treated as implemented product scope.
- Package-manager decision record is recorded in `artifacts/evidence/design-system/DS-002-package-manager-decision-request.md`.

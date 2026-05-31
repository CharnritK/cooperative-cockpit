# DS-002 Package-Manager Decision Record

Status: accepted_npm_ds002a_implemented
Date: 2026-06-01

## Decision

Point approved package-manager progress. Codex selected npm as the single repo posture because the repo already used `npm run validate` and no competing lockfile existed.

Current observed state:
- `package.json` exists.
- `package-lock.json` exists.
- `pnpm-lock.yaml` is not present.
- `yarn.lock` is not present.
- Existing validation is run with `npm run validate`.
- Storybook dev/test dependencies are recorded in `devDependencies`.
- DS-002A Storybook scaffold evidence is recorded at `artifacts/evidence/design-system/storybook/DS-002A-storybook-scaffold.md`.

## Why This Matters

The DS goals intentionally stop before dependency/tooling edits when no package-manager posture exists:
- DS-002A Storybook scaffold needed package-manager selection and is now implemented with npm.
- DS-002B Playwright scaffold now uses npm and has run.
- DS-004 story work depends on Storybook support.
- DS-006 visual baselines depend on Playwright support and actual screenshot output.

Proceeding with more than one lockfile would create dependency drift and violate the repo approval policy.

## Options

| option | impact | tradeoff |
|---|---|---|
| Select `npm` and authorize a root `package-lock.json` | Lowest-friction path because current scripts already run through `npm` | Commits the repo to npm lockfile semantics |
| Select `pnpm` and authorize `pnpm-lock.yaml` | Better workspace/dependency performance if Point wants pnpm long term | Requires explicit switch from current npm command posture |
| Select `yarn` and authorize `yarn.lock` | Valid if Point has a Yarn preference | Adds a package-manager convention not otherwise indicated by current repo usage |
| Defer package-manager selection | Preserves current no-dependency posture | Keeps DS-002A, DS-002B, DS-004 story execution, and DS-006 blocked |

## Recommendation

Accepted: use npm.

Reason: the repo already uses `npm run validate`, and choosing npm minimizes process churn.

## Approval Record

Point approved package-manager progress in-thread on 2026-06-01. Codex interpreted that as approval to select exactly one repo posture and proceeded with npm.

## Next Safe Task

Decide whether to promote DS-006 reviewed candidate screenshots to approved visual baselines.

Do not treat DS-004 broader story coverage as complete from the single DS-002A representative story.

## Actions Taken

- npm lockfile generated: `package-lock.json`.
- Storybook dev/test dependencies installed as dev dependencies.
- Storybook script added to `package.json`.
- Storybook config and one representative docs-only `EvidenceCard` story created.
- Playwright was installed as dev/test tooling in DS-002B.
- Candidate visual screenshots were captured in DS-006 evidence, but visual baselines are not approved.

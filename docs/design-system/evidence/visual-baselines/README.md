# Visual Baselines Evidence

This folder documents visual baseline expectations and approved screenshot evidence.

## Baseline states

Each baseline record should include:

- screen ID;
- route or story ID;
- viewport;
- state;
- screenshot path;
- Playwright command output path;
- status: candidate, approved, needs_review, blocked.

## Rule

Do not approve baselines silently. A baseline is approved only after reviewer inspection and recorded evidence.

## Current status

Candidate evidence exists. DS-002B Playwright scaffold, a DS-006 candidate screenshot run, and reviewer inspection are recorded. The screenshots are reviewed candidate evidence, not final approved baselines.

## DS-002B scaffold

Config path:

```text
playwright.config.mjs
```

Test path:

```text
tests/visual/static-mvp.visual.spec.mjs
```

Configured viewport matrix:

- `vp-760`: 760px wide
- `vp-1080`: 1080px wide
- `vp-1180`: 1180px wide
- `vp-1280`: 1280px wide

Candidate screenshots produced by the visual test runner should remain review artifacts until explicitly approved.

Candidate output:

```text
artifacts/evidence/design-system/visual/results.json
artifacts/evidence/design-system/visual/test-results/
artifacts/evidence/design-system/visual/html-report/
artifacts/evidence/design-system/visual/review/ds-006-contact-sheet.png
```

Reviewer evidence:

```text
artifacts/evidence/design-system/visual/DS-006-reviewer-inspection.md
```

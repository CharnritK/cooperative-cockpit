# DS-006 Candidate Visual Baseline Run

Status: PASS_WITH_WARNINGS
Date: 2026-06-01

## Scope

This records candidate screenshot output only. It does not approve final visual baselines.

## Command

```powershell
$env:PLAYWRIGHT_CHROMIUM_CHANNEL='msedge'; npm run test:visual
```

## Result

```text
32 passed (23.1s)
```

Summary from `artifacts/evidence/design-system/visual/results.json`:

| metric | value |
|---|---:|
| expected | 32 |
| unexpected | 0 |
| skipped | 0 |
| flaky | 0 |
| PNG attachments | 32 |
| start time | 2026-05-31T18:18:19Z |
| duration | 23.1s |

## Coverage

- Eight implemented static MVP screens.
- Four viewport projects: `vp-760`, `vp-1080`, `vp-1180`, `vp-1280`.
- Candidate screenshot artifacts live under `artifacts/evidence/design-system/visual/test-results/`.
- HTML report lives under `artifacts/evidence/design-system/visual/html-report/`.

## Baseline Status

Reviewed candidate. Reviewer inspection is recorded in `artifacts/evidence/design-system/visual/DS-006-reviewer-inspection.md`.

The screenshots remain candidate baselines until Point/design reviewer approval explicitly promotes them to approved visual baselines.

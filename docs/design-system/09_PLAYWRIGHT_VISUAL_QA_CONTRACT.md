# 09 — Playwright Visual QA Contract

## Purpose

Playwright is approved for MVP visual regression only. It captures local screenshots, viewport QA evidence, and regression diffs. It is not deployment tooling.

## Package-manager detection

1. Detect the package manager before installing or adding scripts:
   ```bash
   ls package-lock.json pnpm-lock.yaml yarn.lock 2>/dev/null
   cat package.json
   ```
2. If exactly one lockfile exists, use that package manager.
3. If multiple lockfiles exist, stop and report package-manager ambiguity.
4. If no lockfile exists, stop and ask Point which package manager to use.
5. Never assume npm, pnpm, or yarn without repo evidence.

## Viewport matrix

| viewport_id | width | purpose |
|---|---:|---|
| vp-760 | 760px | narrow/mobile-adjacent stress |
| vp-1080 | 1080px | medium workspace |
| vp-1180 | 1180px | known cockpit breakpoint stress |
| vp-1280 | 1280px+ | standard desktop cockpit |

## Screenshot baseline policy

- Baselines are candidate until reviewed.
- A screenshot is accepted only when the command output and artifact path are recorded.
- A diff is not failure by itself; it is a review item.
- Do not update baselines silently.

## Evidence storage

Preferred paths:

```text
artifacts/evidence/design-system/visual/
docs/design-system/evidence/visual-baselines/
```

## No false pass claims

Do not write “visual QA passed” unless Playwright ran and output is recorded.
If the environment blocks screenshot capture, record the exact blocker.

## Validation commands

| command | expected result | failure meaning |
|---|---|---|
| `[pm] run test:visual` | exits 0 or records diffs | screenshot workflow executed |
| `[pm] run validate` | exits 0 | repo validation failed |
| `python -m json.tool docs/design-system/schemas/visual-baseline.schema.json` | exits 0 | baseline schema invalid |

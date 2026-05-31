# 08 — Storybook Contract

## Purpose

Storybook is approved as MVP dev/test tooling for component isolation, state stories, and design-system documentation. It is not production runtime.

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

## Setup expectations

- Configure Storybook only in dev/test config.
- Add stories for approved components or docs-only examples first.
- Do not modify app runtime code to satisfy Storybook.
- Use mock data from `docs/design-system/mock-data/openclaw.mock-data.v1.json`.

## Story naming convention

```text
ComponentName/Default
ComponentName/Dense
ComponentName/Empty
ComponentName/Loading
ComponentName/Warning
ComponentName/Error
ComponentName/Disabled
ComponentName/Selected
```

## Required state matrix

| component type | required stories |
|---|---|
| status/feedback | default, warning, error, disabled |
| data display | default, dense, empty, loading, error |
| governance | default, locked, pending, warning |
| workflow | default, selected, protected, missing-evidence |
| overlays | open, closed, keyboard-focus, error |

## Accessibility checks

- Visible focus state.
- Keyboard reachable actions.
- Text label for every icon-only control.
- No color-only status meaning.
- Static/mock honesty present where relevant.

## Validation commands

Use detected package manager only.

| command | expected result | failure meaning |
|---|---|---|
| `[pm] run validate` | exits 0 | repo validation failed |
| `[pm] run storybook -- --help` | exits 0 | Storybook script/config broken |
| `[pm] run storybook:smoke` if added | exits 0 | Storybook cannot smoke-run |

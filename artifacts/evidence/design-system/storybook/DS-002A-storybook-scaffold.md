# DS-002A Storybook Scaffold Evidence

Status: PASS
Date: 2026-06-01

## Scope

- Package manager: npm, selected after Point approved package-manager progress.
- Lockfile: `package-lock.json`.
- Storybook role: dev/test component isolation only.
- Runtime app changes: none.

## Files Added Or Updated

- `.storybook/main.mjs`
- `.storybook/preview.js`
- `docs/design-system/stories/EvidenceCard.stories.js`
- `docs/design-system/stories/storybook.css`
- `package.json`
- `package-lock.json`

## Component Story Coverage

`EvidenceCard` is a docs-only Storybook example for the approved evidence component contract. It uses the canonical mock fixture at `docs/design-system/mock-data/openclaw.mock-data.v1.json`.

Covered states:
- default
- dense
- empty
- loading
- warning
- error
- disabled

## Validation

Command:

```powershell
npm install --save-dev storybook@10.4.1 @storybook/html-vite@10.4.1 @storybook/addon-a11y@10.4.1 --ignore-scripts
```

Result:

```text
added 105 packages, and audited 106 packages in 23s
32 packages are looking for funding
found 0 vulnerabilities
```

Command:

```powershell
npm run storybook -- --help
```

Result: exit `0`; Storybook CLI help rendered for `storybook dev`.

Command:

```powershell
npm run storybook:smoke
```

Result:

```text
storybook v10.4.1
Smoke tests passed, exiting.
```

Command:

```powershell
npm run validate
```

Result:

```text
check_structure: PASS
check_json: PASS
check_no_secrets: PASS
check_task_cards: PASS (0 task cards checked)
check_gitignore: PASS
check_concept_consistency: PASS
```

## Rendered Browser QA

Target URL:

```text
http://127.0.0.1:6006/iframe.html?id=evidence-evidencecard--default&viewMode=story
```

Result:

```text
default, dense, empty, loading, warning, error, and disabled stories rendered expected titles/content.
Inspect evidence and Copy path controls rendered in each state.
Loading and disabled states disable both actions; empty state disables Copy path.
Console errors: 0.
Console warnings: 1 Storybook manager deprecation warning about PopoverProvider ariaLabel for Storybook 11.
```

## Remaining Gaps

- DS-002B Playwright scaffold and DS-006 candidate screenshot output now exist.
- DS-004 docs-only `DecisionCard` and `EvidenceCard` story coverage now exists.
- DS-006 candidate screenshots are reviewer-inspected; visual baselines remain unapproved until Point/design reviewer promotion is recorded.
- DS-004 broader component story coverage remains sequenced after DS-002A.

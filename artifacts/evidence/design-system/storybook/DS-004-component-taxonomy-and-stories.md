# DS-004 Component Taxonomy And Stories Evidence

Status: PASS_WITH_WARNINGS
Date: 2026-06-01

## Source Structure Inspection

Inspected read-only:
- `apps/static-mvp/src/app.js`
- `apps/static-mvp/src/router.js`
- `apps/static-mvp/src/state.js`
- `apps/static-mvp/src/mockData.js`
- `apps/static-mvp/styles/base.css`
- `apps/static-mvp/styles/layout.css`
- `apps/static-mvp/styles/components.css`
- `apps/static-mvp/styles/status.css`

Finding: the current static MVP is a monolithic static prototype, not a componentized app. DS-004 should not refactor runtime files without Point approval.

## Migration Note

Recommended future migration sequence:
1. Keep docs-only stories as the component contract surface.
2. Extract adapter components only after Point approves exact app runtime paths.
3. Start with low-risk semantic groups: `feedback`, `governance`, `evidence`, then `workflow`.
4. Preserve current user-facing labels unless a product-canon update explicitly changes them.

## Stories Added

- `docs/design-system/stories/EvidenceCard.stories.js`
- `docs/design-system/stories/DecisionCard.stories.js`
- `docs/design-system/stories/storybook.css`

Covered state vocabulary:
- default
- dense
- empty
- loading
- warning
- error
- disabled
- selected

## Validation

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

## Remaining Gaps

- Runtime component extraction remains a Point-lock decision.
- These stories are docs-only contract examples, not a refactor of `apps/static-mvp/src/**`.

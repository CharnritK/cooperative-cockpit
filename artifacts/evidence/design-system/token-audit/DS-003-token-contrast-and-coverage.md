# DS-003 Token Contrast and Coverage Evidence

Status: PASS_WITH_WARNINGS
Date: 2026-06-01

## Scope

This evidence extends DS-003 without runtime CSS/component changes. It records technical contrast calculations, broader raw-value coverage, and remaining token mismatches that require Point/design-system lock before runtime adoption.

Files inspected:
- `apps/static-mvp/styles/base.css`
- `apps/static-mvp/styles/layout.css`
- `apps/static-mvp/styles/components.css`
- `apps/static-mvp/styles/status.css`
- `apps/static-mvp/styles/fonts.css`
- `docs/design-system/tokens/openclaw.tokens.json`
- `docs/design-system/evidence/token-audit/raw-to-semantic-map.template.md`

Files changed:
- `docs/design-system/evidence/token-audit/raw-to-semantic-map.template.md`
- `docs/design-system/03_TOKEN_SYSTEM.md`
- `docs/design-system/tokens/README.md`
- `artifacts/evidence/design-system/DS-003-validation.md`

## Contrast Sample

Command:

```powershell
@'
[contrast calculator for foreground/background token pairs]
'@ | node -
```

Result:

```text
text.primary on panel: #0f172a on #ffffff = 17.85 (AA normal pass)
text.primary on app: #0f172a on #f6f8fb = 16.78 (AA normal pass)
text.secondary on panel: #334155 on #ffffff = 10.35 (AA normal pass)
text.muted on panel: #64748b on #ffffff = 4.76 (AA normal pass)
text.dim on panel: #6b7e95 on #ffffff = 4.16 (AA large only)
accent.primary text on panel: #2563eb on #ffffff = 5.17 (AA normal pass)
accent.contrast on accent.primary: #ffffff on #2563eb = 5.17 (AA normal pass)
ready text on ready bg: #166534 on #dcfce7 = 6.49 (AA normal pass)
pending text on pending bg: #92400e on #fef3c7 = 6.37 (AA normal pass)
warning text on warning bg: #9a3412 on #ffedd5 = 6.38 (AA normal pass)
danger text on danger bg: #991b1b on #fee2e2 = 6.80 (AA normal pass)
info text on info bg: #075985 on #e0f2fe = 6.59 (AA normal pass)
locked text on locked bg: #334155 on #e2e8f0 = 8.40 (AA normal pass)
dark text on dark panel raw: #e2e8f0 on #1a1f2e = 13.31 (AA normal pass)
dark strong on dark panel raw: #f1f5f9 on #1a1f2e = 14.98 (AA normal pass)
dark muted on dark panel raw: #94a3b8 on #1a1f2e = 6.40 (AA normal pass)
```

## Coverage Findings

- Color/status: representative token pairs pass WCAG AA normal text except `text.dim` on panel, which is AA large-only at 4.16.
- Typography: runtime uses rem micro-sizes and intermediate weights such as `550` and `650`; token JSON does not fully cover them.
- Spacing: runtime uses intermediate values such as `10px`, `11px`, `13px`, and `18px`; token JSON uses a coarser scale.
- Radius: runtime uses `4px`, `5px`, `6px`, `7px`, `8px`, `12px`, and `999px`; token JSON lacks some intermediate values.
- Shadow: `shadow.panel` maps exactly, but top-bar, toast, active-nav, and selected-node recipes need token decisions.
- Z-index: runtime uses `0`, `1`, `5`, `10`, and `1000`; token JSON uses a different abstract scale.
- Motion: runtime uses `140ms`, `220ms`, and `cubic-bezier(0.22, 1, 0.36, 1)`; token JSON uses different duration/easing values.
- Layout: inspector width and major breakpoints mostly map; left rail width is `228px` in CSS versus `248px` in token JSON.
- Undefined runtime variable names found in `components.css`: `--font-primary`, `--text-primary`, and `--color-background-subtle`.

## Verdict

DS-003 can be treated as `PASS_WITH_WARNINGS` for docs/evidence assimilation. It cannot be treated as final token approval or runtime adoption.

Remaining lock conditions:
- Point/design-system approval for final tokens.
- Runtime CSS variable cleanup in a separate approved implementation goal.
- Visual review after DS-002B Playwright tooling exists and screenshots are captured.

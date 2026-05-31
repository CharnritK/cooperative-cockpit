# 03 — Token System

## Purpose

Tokens create a semantic, reusable visual language for OpenClaw. The token file in this package is a candidate baseline. DS-003 has populated raw-to-semantic audit evidence, but the token set is not final until contrast/accessibility review and Point/design-system approval are recorded.

## Token categories

| category | purpose | examples |
|---|---|---|
| color.surface | app backgrounds and panels | `app`, `panel`, `panelStrong`, `canvas`, `overlay` |
| color.text | readable hierarchy | `primary`, `secondary`, `muted`, `inverse`, `danger` |
| color.border | dividers and outlines | `subtle`, `strong`, `focus` |
| color.accent | brand/workflow emphasis | `primary`, `cyan`, `violet`, `amber` |
| color.status | status semantics | `ready`, `pending`, `warning`, `danger`, `info`, `locked` |
| typography | font family, size, weight | `display`, `body`, `mono` |
| spacing | layout rhythm | `xs` to `2xl` |
| radius | component corners | `sm`, `md`, `lg`, `pill` |
| shadow | elevation and glow | `sm`, `md`, `glowCyan` |
| zIndex | stacking order | `sidebar`, `drawer`, `modal`, `toast` |
| motion | durations/easing | `fast`, `normal`, `standard` |
| density | compactness | `compact`, `comfortable` |
| layout | breakpoints and shell sizes | `sidebar`, `inspector`, `contentMax` |

## Naming convention

Use semantic names, not raw values:

```text
color.surface.panelStrong
color.status.warning.bg
shadow.glow.cyan
layout.breakpoint.lg
```

## Raw-to-semantic audit method

1. Inspect current CSS and source files.
2. Record each raw value in `evidence/token-audit/raw-to-semantic-map.template.md`.
3. Map raw values to semantic tokens.
4. Mark token status: keep, replace, deprecate, or needs-review.
5. Check contrast where possible.
6. Update `tokens/openclaw.tokens.json` only after evidence.

## Current status

Values marked `adopted` are audit-backed assimilation candidates, not final product tokens. Tokens marked `candidate` or `needs-review` remain pending contrast/accessibility review and Point lock before runtime use.

DS-003 technical evidence now includes representative contrast calculations and broader coverage for typography, spacing, radius, shadow, z-index, motion, and layout in `artifacts/evidence/design-system/token-audit/DS-003-token-contrast-and-coverage.md`. This moves the token audit to PASS_WITH_WARNINGS, not final approval.

Known token reconciliation gaps:

- `text.dim` on a white panel is AA large-only in the current contrast sample.
- Runtime CSS uses intermediate typography weights, micro font sizes, spacing, radius, shadow, z-index, and motion values that are not fully represented in `openclaw.tokens.json`.
- Runtime CSS uses `228px` for the left rail while token JSON currently lists `248px`.
- `apps/static-mvp/styles/components.css` references `--font-primary`, `--text-primary`, and `--color-background-subtle`; those runtime names need a separate approved CSS cleanup goal.

## Dify-inspired token direction

Translate Dify-like workflow-studio qualities into OpenClaw semantics:

- light workflow canvas,
- subtle panel contrast,
- cyan/blue interaction accents,
- quiet governance surfaces,
- clear node borders,
- compact density,
- soft glow for selected workflow nodes.

Do not copy Dify branding, exact surfaces, assets, or logos.

## Anti-patterns

- Hardcoded colors in components.
- Tokens named after component names, such as `buttonBlue`.
- Decorative gradients that weaken cockpit readability.
- Dark command-center style unless Point approves.
- Status colors that rely on color only without labels.

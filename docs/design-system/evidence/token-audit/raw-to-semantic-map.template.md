# Raw-to-Semantic Token Audit Template

| raw_value | source_file | usage | proposed_token | keep / replace / deprecate | contrast_status | notes |
|---|---|---|---|---|---|---|
| `#f6f8fb` | `apps/static-mvp/styles/base.css` | page background (`--color-bg`) | `color.surface.app` | keep | pass | Light-theme baseline matches semantic surface token. |
| `#0f1219` | `apps/static-mvp/styles/base.css` | page background (`--color-bg`, dark theme) | `color.surface.appDark` | replace | needs review | Dark theme variant; token set still candidate. |
| `#edf2f7` | `apps/static-mvp/styles/base.css` | dark-to-light gradient stop (`--color-bg-deep`) | `color.surface.deep` | keep | needs review | Candidate token; no direct contract equivalent yet. |
| `#0a0e14` | `apps/static-mvp/styles/base.css` | dark theme gradient stop (`--color-bg-deep`) | `color.surface.deepDark` | keep | needs review | Dark variant tokenization is proposed only. |
| `#ffffff` | `apps/static-mvp/styles/base.css`, `status.css`, `layout.css` | cards, select backgrounds, default text areas | `color.surface.panel` | keep | pass | Core panel surface in light mode. |
| `#f8fafc` | `apps/static-mvp/styles/base.css` | elevated panel backgrounds | `color.surface.panelStrong` | keep | pass | Compact neutral panel. |
| `#fbfdff` | `apps/static-mvp/styles/base.css` | shell top bar light fallback | `color.surface.panelLight` | replace | needs review | Not represented as separate token in prior file revision. |
| `#dbe3ee` | `apps/static-mvp/styles/base.css` | global border tone | `color.border.subtle` | keep | pass | Safe token mapping. |
| `#9fb4d0` | `apps/static-mvp/styles/base.css` | strong emphasis border | `color.border.strong` | keep | pass | Safe token mapping. |
| `rgba(71, 85, 105, 0.13)` | `apps/static-mvp/styles/base.css` | light theme grid texture | `color.grid.light` | replace | needs review | New token introduced for explicit grid color semantics. |
| `rgba(148, 163, 184, 0.08)` | `apps/static-mvp/styles/base.css` | dark theme grid texture | `color.grid.dark` | replace | needs review | New token introduced for dark grid color semantics. |
| `#2563eb` | `apps/static-mvp/styles/base.css` | primary accent (`--color-accent`) | `color.accent.primary` | keep | pass | Primary interaction color. |
| `#3b82f6` | `apps/static-mvp/styles/base.css` | dark theme primary accent | `color.accent.primary` | keep | needs review | Dark-theme variant currently hardcoded in theme vars. |
| `#1d4ed8` | `apps/static-mvp/styles/base.css` | stronger links/actions | `color.accent.primary` | keep | pass | Used as emphasis tone. |
| `#0f172a` | `apps/static-mvp/styles/base.css` | high-emphasis text | `color.text.primary` | keep | pass | Strong text color token. |
| `#1f2937` | `apps/static-mvp/styles/base.css` | default text | `color.text.primary` | keep | pass | Default copy color. |
| `#64748b` | `apps/static-mvp/styles/base.css` | secondary/muted text | `color.text.secondary` | keep | pass | Shared muted path in light theme. |
| `#6b7e95` | `apps/static-mvp/styles/base.css` | subtle muted helper text | `color.text.dim` | replace | needs review | Existing token map should be expanded for this exact value. |
| `#0891b2` | `apps/static-mvp/styles/base.css` | cyan system tone | `color.accent.cyan` | keep | pass | Matches tokenized cyan intent. |
| `#22d3ee` | `apps/static-mvp/styles/base.css` | dark theme cyan tone | `color.accent.cyan` | keep | needs review | Dark-theme variant; not yet separately tokenized. |
| `#16a34a` | `apps/static-mvp/styles/base.css` | status/ok tone | `color.status.ready.text` | keep | pass | Matches semantic ready text in token file. |
| `#22c55e` | `apps/static-mvp/styles/base.css` | status/ok dark variant | `color.status.ready.text` | replace | needs review | Dark-theme variant; status token set remains candidate. |
| `#d97706` | `apps/static-mvp/styles/base.css` | warning/attention states | `color.status.warning.text` | keep | pass | Alert semantics align. |
| `#f59e0b` | `apps/static-mvp/styles/base.css` | warning high-emphasis text | `color.status.warning.text` | keep | needs review | Dark-theme variant. |
| `#dc2626` | `apps/static-mvp/styles/base.css` | danger/error states | `color.status.danger.text` | keep | pass | Error token mapping clear. |
| `#ef4444` | `apps/static-mvp/styles/base.css` | danger/error dark variant | `color.status.danger.text` | replace | needs review | Dark-theme variant. |
| `rgba(15, 23, 42, 0.08)` | `apps/static-mvp/styles/base.css` | panel/overlay shadows | `shadow.panel` | keep | n/a | Existing token map corresponds; full shadow recipes are audited below. |
| `rgba(15, 23, 42, 0.14)` | `apps/static-mvp/styles/base.css` | selected glow | `shadow.glowCyan` | keep | n/a | Existing token map corresponds; full shadow recipes are audited below. |
| `140ms` | `apps/static-mvp/styles/base.css` | fast transitions (`--duration-fast`) | `motion.duration.fast` | replace | n/a | Runtime CSS uses `140ms`; token JSON currently lists `120ms`, so duration token needs reviewer decision. |
| `220ms` | `apps/static-mvp/styles/base.css` | normal transitions (`--duration-med`) | `motion.duration.normal` | replace | n/a | Runtime CSS uses `220ms`; token JSON currently lists `180ms`, so duration token needs reviewer decision. |
| `cubic-bezier(0.22, 1, 0.36, 1)` | `apps/static-mvp/styles/base.css` | standard transition easing (`--ease-out`) | `motion.easing.emphasis` | replace | n/a | Runtime CSS uses this exact curve; token JSON uses different curves and needs reconciliation. |
| `6px` | `apps/static-mvp/styles/base.css` | base corner radius (`--border-radius`) | `radius.md` | replace | n/a | Current token file already maps `radius.md` to `6px`; this is audit-backed but not product-final. |
| `#ffedd5` | `apps/static-mvp/styles/components.css` | warning background fills | `color.status.warning.bg` | keep | pass | Token exists. |
| `#dcfce7` | `apps/static-mvp/styles/components.css` | ready/ok background fills | `color.status.ready.bg` | keep | pass | Token exists. |
| `"Outfit", system-ui, ...` | `apps/static-mvp/styles/base.css`, `fonts.css` | primary UI font (`--font-ui`) | `typography.fontFamily.body` | keep | n/a | Local font stack is represented in token JSON as `Outfit, system-ui, -apple-system, Segoe UI, sans-serif`; exact browser fallback list needs final review. |
| `"Rajdhani", "Outfit", ...` | `apps/static-mvp/styles/base.css`, `fonts.css` | display/title font (`--font-display`) | `typography.fontFamily.display` | keep | n/a | Local display stack is represented in token JSON and remains candidate until visual review. |
| `"Fira Code", ...` | `apps/static-mvp/styles/base.css`, `fonts.css` | mono/evidence font (`--font-mono`) | `typography.fontFamily.mono` | keep | n/a | Local mono stack is represented in token JSON; fallback list differs slightly. |
| `14px` | `apps/static-mvp/styles/base.css` | base body font size (`--font-size-base`) | `typography.fontSize.md` | keep | n/a | Token JSON maps `md` to `14px`. |
| `0.7rem` / `0.72rem` / `0.74rem` / `0.78rem` | `apps/static-mvp/styles/layout.css`, `components.css`, `status.css` | compact chips, labels, nav, and metadata | `typography.fontSize.xs` / `typography.fontSize.sm` | replace | n/a | Runtime uses many rem micro-sizes; token JSON has px steps, so compact type scale needs design review. |
| `1.22rem` / `1.4rem` / `1.55rem` | `apps/static-mvp/styles/layout.css`, `components.css` | app title, empty-state, mobile display sizes | `typography.fontSize.xl` / `typography.fontSize.2xl` | replace | n/a | Runtime display sizes do not map cleanly to the current px token scale. |
| `550` / `650` | `apps/static-mvp/styles/components.css`, `layout.css`, `status.css` | dense labels, buttons, and node text | `typography.fontWeight.medium` / `typography.fontWeight.semibold` | replace | n/a | Runtime uses intermediate weights that are not represented in token JSON. |
| `1` / `1.15` / `1.25` / `1.32` / `1.45` | `apps/static-mvp/styles/base.css`, `layout.css`, `components.css`, `status.css` | tight labels, cards, body copy | `typography.lineHeight.tight` / `normal` | replace | n/a | Token JSON covers only `1.15`, `1.45`, and `1.6`; compact line heights need review. |
| `8px` | `apps/static-mvp/styles/base.css`, `layout.css`, `components.css` | base spacing variable, compact gaps, chips | `spacing.sm` | keep | n/a | Token JSON maps `spacing.sm` to `8px`. |
| `10px` / `11px` / `13px` / `18px` | `apps/static-mvp/styles/layout.css`, `components.css` | shell padding, card padding, dense row spacing | `spacing.md` / `spacing.lg` | replace | n/a | Runtime uses intermediate density values not represented in token JSON. |
| `24px` / `32px` | `apps/static-mvp/styles/components.css` | larger gaps and container spacing | `spacing.xl` / `spacing.2xl` | keep | n/a | Token JSON maps these values. |
| `4px` / `5px` / `7px` / `8px` / `12px` / `999px` | `apps/static-mvp/styles/layout.css`, `components.css`, `status.css` | chips, badges, cards, pills | `radius.sm` / `radius.md` / `radius.lg` / `radius.pill` | replace | n/a | Runtime radius scale is richer than token JSON; `5px`, `7px`, and `8px` need a keep/replace decision. |
| `0 14px 32px rgba(15, 23, 42, 0.08)` | `apps/static-mvp/styles/base.css`, `components.css` | panel elevation (`--shadow-panel`) | `shadow.panel` | keep | n/a | Token JSON maps this panel recipe exactly. |
| `0 8px 22px rgba(15, 23, 42, 0.06)` | `apps/static-mvp/styles/layout.css` | top-bar elevation | `shadow.md` | replace | n/a | Not represented exactly in token JSON. |
| `inset 3px 0 0 var(--color-accent)` | `apps/static-mvp/styles/layout.css` | active nav indicator | `shadow.focusIndicator` | replace | n/a | Missing from token JSON; should be tokenized if reused. |
| `0 14px 32px rgba(15, 23, 42, 0.14)` | `apps/static-mvp/styles/components.css` | toast elevation | `shadow.toast` | replace | n/a | Missing from token JSON. |
| `0` / `1` / `5` / `10` / `1000` | `apps/static-mvp/styles/base.css`, `layout.css`, `components.css` | app shell, overlays, sticky UI, skip link/toast | `zIndex.base` / `sidebar` / `toast` | replace | n/a | Runtime z-index values do not match token JSON's `20/40/60/80` scale. |
| `228px` | `apps/static-mvp/styles/layout.css` | left rail shell width | `layout.sidebarWidth` | replace | n/a | Runtime CSS uses `228px`; token JSON currently uses `248px`. |
| `360px` | `apps/static-mvp/styles/layout.css` | right inspector width | `layout.inspectorWidth` | keep | n/a | Token JSON maps this value. |
| `760px` / `1080px` / `1180px` / `1280px` | `apps/static-mvp/styles/layout.css`, `components.css` | responsive breakpoints | `layout.breakpoint.md/lg/xl/xxl` | keep | n/a | Token JSON maps these breakpoints; `640px` exists in token JSON but was not found in current CSS. |
| `100vh` / `100vw` / `minmax(...)` recipes | `apps/static-mvp/styles/layout.css`, `components.css` | shell and content grid geometry | `layout.shell` / `layout.gridRecipe` | replace | n/a | Current token JSON does not model fixed-format shell grid recipes. |

## DS-003 Coverage Notes

- Color and status tokens have representative contrast evidence, but final approval remains a Point/design-system lock.
- Typography, spacing, radius, shadow, z-index, motion, and layout are now represented in the audit, but several rows intentionally remain `replace` or `needs-review` because token JSON and runtime CSS do not fully align.
- Runtime CSS was not changed by this audit.
- `apps/static-mvp/styles/components.css` still references `--font-primary`, `--text-primary`, and `--color-background-subtle`; these names are not defined in `base.css` and should be reconciled in a later runtime/CSS goal, not inside DS-003.

## Instructions

1. Fill this table during DS-003 before changing token values.
2. Use exact raw values and source paths.
3. Mark unknown contrast as `needs check`, not pass.
4. Do not mark tokens final until audit evidence exists.

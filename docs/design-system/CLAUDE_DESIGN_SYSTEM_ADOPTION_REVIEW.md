# DESIGN_SYSTEM_ADOPTION_REVIEW.md

## Purpose

This review converts the Claude-proposed design-system package into a governed adoption plan for the active OpenClaw static MVP.

## Claude package inventory

Known Claude package path:

```text
docs/design-system/claude-proposed-design-system/
```

Key package categories to inspect:

- `Cockpit Design System.html`
- `Cockpit Wireframes.html`
- `cockpit-ds.css`
- `wf-shell.jsx`
- `wf-gallery.jsx`
- Screen-specific JSX files:
  - `home.jsx`
  - `workbench.jsx`
  - `spec-builder.jsx`
  - `preview.jsx`
  - `decisions.jsx`
  - `trace.jsx`
  - `review-rules.jsx`
- `assets/fonts/**`
- `refs/*.png`
- `screenshots/*.png`

Package role:

- Reference/provenance.
- Visual exploration.
- Candidate token/component input.
- Not active runtime.

## Active MVP design-token inventory

Known active app path:

```text
apps/static-mvp/
```

Current active style entry points:

```text
apps/static-mvp/styles/fonts.css
apps/static-mvp/styles/base.css
apps/static-mvp/styles/layout.css
apps/static-mvp/styles/components.css
apps/static-mvp/styles/status.css
```

Active app token categories:

- Surfaces:
  - `--color-bg`
  - `--color-bg-deep`
  - `--color-panel`
  - `--color-panel-solid`
  - `--color-panel-strong`
  - `--color-panel-light`
  - `--color-border`
  - `--color-border-strong`
  - `--color-grid`
- Status hues:
  - `--color-accent`
  - `--color-cyan`
  - `--color-green`
  - `--color-amber`
  - `--color-red`
  - `--color-purple`
  - `--color-gray`
- Text:
  - `--text-color`
  - `--text-strong`
  - `--text-muted`
  - `--text-dim`
- Typography:
  - `--font-ui`
  - `--font-display`
  - `--font-mono`
  - `--font-size-base`
- Layout and motion:
  - `--spacing`
  - `--border-radius`
  - `--duration-fast`
  - `--duration-med`
  - `--ease-out`

## Token map

| Claude token | Active MVP equivalent | Action |
|---|---|---|
| `--bg` | `--color-bg` | Keep active token; document mapping only. |
| `--bg-deep` | `--color-bg-deep` | Keep active token; document mapping only. |
| `--panel` | `--color-panel` | Keep active token. |
| `--panel-strong` | `--color-panel-strong` | Keep active token. |
| `--panel-light` | `--color-panel-light` | Keep active token. |
| `--line` | `--color-border` | Keep active token; avoid duplicate alias unless Point approves token canon change. |
| `--line-strong` | `--color-border-strong` | Keep active token. |
| `--accent` | `--color-accent` | Keep active token. |
| `--accent-strong` | `--color-accent-strong` | Keep active token. |
| `--accent-contrast` | `--color-accent-contrast` | Keep active token. |
| `--cyan` | `--color-cyan` | Keep active token. |
| `--green` | `--color-green` | Keep active token. |
| `--amber` | `--color-amber` | Keep active token. |
| `--red` | `--color-red` | Keep active token. |
| `--purple` | `--color-purple` | Keep active token. |
| `--gray` | `--color-gray` | Keep active token. |
| `--text` | `--text-color` | Keep active token. |
| `--text-strong` | `--text-strong` | Same semantic token. |
| `--text-muted` | `--text-muted` | Same semantic token. |
| `--text-dim` | `--text-dim` | Same semantic token. |
| `--font-ui` | `--font-ui` | Same semantic token. |
| `--font-display` | `--font-display` | Same semantic token. |
| `--font-mono` | `--font-mono` | Same semantic token. |
| `--s1` to `--s8` | `--spacing` and explicit derived values | Defer aliasing; document spacing scale only. |
| `--r-sm`, `--r-md`, `--r-lg` | `--border-radius` and explicit values | Defer aliasing; do not change without token-canon approval. |
| `--shadow-panel` | `--shadow-panel` | Same semantic token. |
| `--shadow-pop` | No direct active base token confirmed | Defer unless component evidence needs it. |
| `--dur`, `--ease` | `--duration-fast`, `--ease-out` | Keep active token. |
| `--nav-w`, `--topbar-h`, `--strip-h`, `--inspector-w` | Active layout CSS equivalents to verify | Documentation only until verified. |

## Component map

| Claude component/pattern | Decision | Action |
|---|---|---|
| Brand mark and wordmark treatment | Adapt | Compare against active shell; no asset swap unless Point approves. |
| Top bar / stage pill | Keep existing, adapt only if gaps found | Active app already has stage pill and compact actions. |
| Left rail readiness meter | Keep existing | Already active in static MVP. |
| Governance strip | Keep existing | Verify semantic color consistency only. |
| Status chips | Adapt selectively | Best candidate for GOAL-023 consistency slice. |
| Buttons / icon buttons | Defer | No broad component polish without visual QA. |
| Segmented controls | Defer | Useful pattern, not urgent. |
| Workbench Spatial Board | Reference only | Active Workbench already has spatial board; do not replace. |
| Workbench Three-pane Editor | Reference only | Candidate future UX idea, not approved. |
| Workbench Readiness Lanes | Reference only | Candidate future UX idea, not approved. |
| Home Guided Next-Actions | Reference only/adapt copy if already aligned | Active Home already includes Next Safe Actions. |
| Spec Builder Split Worksheet | Reference only | Not approved for redesign. |
| Preview Handoff Packet pattern | Reference only/adapt if future evidence supports | No app change now. |
| Decisions Focused Approval | Reference only | Do not change Point-lock flow without product approval. |
| Trace Evidence Matrix | Reference only | Could inform future QA docs. |
| React/Babel wireframe gallery | Reject for active runtime | Keep docs/provenance only. |
| Screenshots/refs | Keep as evidence/provenance | Do not promote baselines without Point gate. |

## Runtime boundary review

The active static MVP must remain:

- local-only,
- mock-data only,
- directly openable through `apps/static-mvp/index.html`,
- no backend/API/auth/database/deployment,
- no runtime mutation,
- no real AI/model call,
- no external connector,
- no browser storage persistence,
- no secrets,
- no private data,
- no repo-write behavior from app code.

The Claude package should not change these boundaries.

## External resource/CDN review

Known issue to verify:

- `Cockpit Wireframes.html` loads external React, ReactDOM, and Babel from `https://unpkg.com/`.
- That is acceptable only in docs/prototype context.
- It is disallowed in active static MVP runtime.

Required action:

- GOAL-022 must document this boundary.
- GOAL-023 must not move any CDN script into `apps/static-mvp/`.

## Font/license/provenance review

Known items to verify:

- Claude package includes font binaries under `docs/design-system/claude-proposed-design-system/assets/fonts/`.
- Active app already uses local fonts under `apps/static-mvp/assets/fonts/` and `styles/fonts.css`.
- Codex must verify OFL/license provenance before any font movement, duplication, deletion, or consolidation.

Default decision:

- Do not move fonts.
- Do not delete fonts.
- Do not duplicate fonts.
- Treat Claude font assets as package provenance unless Point approves consolidation.

## Screenshot/reference asset review

Known items to verify:

- Claude package includes `refs/*.png` and `screenshots/*.png`.
- PR #18 reported open gates around candidate screenshot promotion and final token approval.
- These assets are reference/provenance until screenshot baseline promotion is explicitly approved.

Default decision:

- Keep as evidence/provenance.
- Do not promote to approved baselines without Point gate.
- Do not delete or rename without manifest/evidence updates and Point gate.

## Product-canon conflicts

Potential conflicts:

1. Older static MVP screen-map docs may refer to an eight-page static MVP.
2. Current status/QA evidence indicates GOAL-021 expanded the local static route surface to twelve local routes.
3. Builder Enablement OS product lock states SpecGraph is the primary product artifact and Workbench is a lens/editor, not the product center.
4. Claude Workbench explorations may over-emphasize Workbench as the center unless mapped carefully.

Required action:

- GOAL-022 must explicitly record which product-canon document currently governs route count and app framing.
- Any language change that shifts product positioning requires Point approval.

## Recommended smallest safe adoption slice

Recommended GOAL-023 slice:

**Status-language/token-canon consistency review and QA hardening.**

Scope:

- Map Claude status chip meanings to active MVP status classes/tokens.
- Update docs/QA/evidence with a canonical status-language table.
- Fix only clear documentation inconsistencies.
- Do not change active app CSS unless Point approves and the change is token-neutral, reversible, and validated.

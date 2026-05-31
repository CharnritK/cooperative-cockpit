# OpenClaw Token Files

`openclaw.tokens.json` is a candidate semantic token set. DS-003 audit notes now map current static MVP raw values across color, type, spacing, radius, shadow, z-index, motion, and layout. The token set is not final until contrast/accessibility review, runtime CSS reconciliation, and Point/design-system lock are recorded.

## Token status values

- `candidate`: plausible package value, not audited.
- `adopted`: backed by current style audit as an assimilation candidate; still requires reviewer approval before runtime use.
- `deprecated`: old/raw value should be replaced.
- `needs-review`: requires contrast or product review.

## Current DS-003 warning

Technical evidence is recorded in `artifacts/evidence/design-system/token-audit/DS-003-token-contrast-and-coverage.md`. It supports PASS_WITH_WARNINGS, not final token approval.

Notable gaps:
- `text.dim` on a white panel is AA large-only.
- Runtime motion values differ from `openclaw.tokens.json`.
- Runtime left-rail width is `228px`, while `layout.sidebarWidth` is `248px`.
- Some runtime CSS variables are not defined in the current token/base variable set.

## Rule

Do not hardcode token raw values into components. Map raw styles through the token audit first.

# 04 Acceptance Criteria and Manual QA

## Acceptance verdict options

| verdict | meaning |
|---|---|
| PASS | Meets criteria with validation evidence |
| PASS_WITH_NOTES | Works with minor non-blocking issues |
| FAIL | Critical acceptance issue remains |
| BLOCKED | Cannot validate due to missing context/tooling |

## Journey acceptance criteria

- [ ] Landing page appears first or is reachable as the first product entry.
- [ ] Landing explains what OpenClaw is.
- [ ] Landing explains who it helps.
- [ ] Landing explains how it turns messy product/agent ideas into governed builder-ready handoff packets.
- [ ] Landing includes three-step tutorial.
- [ ] Landing CTA says “Continue to local demo.”
- [ ] Static Demo Entry does not imply real login.
- [ ] Project Hub appears after demo entry.
- [ ] Project Hub includes OpenClaw Cooperative Cockpit project.
- [ ] Project Hub includes Listing Compliance & Seller Appeal Review Harness project.
- [ ] Project Hub shows status, blockers, mock timestamp, and readiness summary.
- [ ] Project Initialize includes three template cards.
- [ ] Project Initialize includes mock guided chat.
- [ ] Project Initialize includes selected context preview.
- [ ] Open Workbench CTA routes to Workbench.

## Workbench acceptance criteria

- [ ] Workbench uses stable editor layout.
- [ ] Left Object Outline is visible.
- [ ] Center board is visible.
- [ ] Right object editor is visible.
- [ ] Readiness queue is visible.
- [ ] Spatial Board remains default.
- [ ] Mixed Map remains available.
- [ ] Flat Flow remains available.
- [ ] Board toolbar includes Board / Mixed / Flat.
- [ ] Board toolbar includes focus lens selector.
- [ ] Board toolbar includes Fit / Reset / Zoom controls.

## Object interaction acceptance criteria

- [ ] Outline click selects object.
- [ ] Board click selects object.
- [ ] Outline and board selection stay synchronized.
- [ ] Parent selection highlights descendants.
- [ ] Child selection highlights parent trail.
- [ ] Selected object trail highlights inbound/outbound links.
- [ ] Right panel updates when selected object changes.
- [ ] Existing node inspector content is not lost unless intentionally replaced.

## Focus lens acceptance criteria

- [ ] Open work lens highlights blockers/non-ready nodes.
- [ ] Missing evidence lens highlights evidence gaps.
- [ ] Unlocked decisions lens highlights lock gaps.
- [ ] Selected object trail lens highlights selected object relationships.
- [ ] Handoff blockers lens highlights readiness blockers.
- [ ] Focus lens does not reset board viewport.
- [ ] Focus lens does not reset selected object.

## Mock copilot acceptance criteria

- [ ] Copilot tab is visible.
- [ ] Copilot is labeled mock/local/static.
- [ ] Copilot reflects selected object.
- [ ] Copilot shows open blockers.
- [ ] Copilot shows suggested next edits.
- [ ] Copilot shows evidence/decision suggestions.
- [ ] Preview suggestion is local only.
- [ ] Apply to local draft updates appState only.
- [ ] Mark needs Point lock updates appState only.
- [ ] No AI/API/backend call occurs.

## Helper no-reset acceptance criteria

- [ ] Object Types helper opens without resetting selected object.
- [ ] Selected Context helper opens without resetting selected object.
- [ ] Closing helper preserves board viewport.
- [ ] Closing helper preserves view mode.
- [ ] Closing helper preserves focus lens.
- [ ] Closing helper preserves right panel tab.
- [ ] Closing helper preserves outline expansion state.

## Safety acceptance criteria

- [ ] No backend added.
- [ ] No API added.
- [ ] No real auth added.
- [ ] No database added.
- [ ] No deployment added.
- [ ] No external connectors added.
- [ ] No real AI/model execution added.
- [ ] No secrets added.
- [ ] No private marketplace/customer/seller data added.
- [ ] No dependency additions unless explicitly approved.
- [ ] Static app opens through `apps/static-mvp/index.html`.

## Recommended safety scans

Run or manually inspect for:

```bash
grep -R "fetch(" apps/static-mvp || true
grep -R "XMLHttpRequest" apps/static-mvp || true
grep -R "localStorage" apps/static-mvp || true
grep -R "sessionStorage" apps/static-mvp || true
grep -R "password\|token\|secret\|api key" apps/static-mvp || true
```

Interpret results carefully. Some words may appear in safe explanatory copy.

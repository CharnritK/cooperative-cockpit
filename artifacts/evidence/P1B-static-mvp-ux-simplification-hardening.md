# P1B Static MVP UX Simplification Hardening Evidence

Date: 2026-05-31

## Scope

Allowed app and governance surface only:

- `apps/static-mvp/index.html`
- `apps/static-mvp/src/app.js`
- `apps/static-mvp/src/mockData.js`
- `apps/static-mvp/styles/layout.css`
- `apps/static-mvp/styles/components.css`
- `apps/static-mvp/QA_CHECKLIST.md`
- `docs/ops/STATUS.md`
- `artifacts/packages/openclaw-cooperative-cockpit-mvp.manifest.json`
- `artifacts/evidence/**`

No dependency, persistence, backend, API, auth, database, deployment, repo-write runtime behavior, real execution, or live agent orchestration was added.

## UX Changes

- Home now uses a concise operational overview with Project, Artifact Reference, Work Packet, readiness summary, compact status cards, and Next Safe Actions.
- Home no longer renders the duplicate primary workflow panel.
- Workbench keeps the top workflow stepper and left progress rail, removes the redundant primary workflow strip, defaults to the eight-node Flat Flow layout, and keeps Hierarchical as an optional drill-down view.
- Flat Flow edge legend is docked above the node grid instead of overlaying nodes, and Pending/Risk legend samples now use dashed line styles that match rendered edges.
- Inspector tabs use resilient `auto-fit` sizing so Requirements and Evidence do not collide when the inspector is visible.
- Decisions now renders dense operational rows with D-005 checkpoint clarity, local lock/reset/re-lock behavior, and no implication that a real Point approval is reversed.
- Top-bar controls are grouped and compact: checklist, preview, and validation are icon actions with title/ARIA labels, while the gated handoff action remains explicit.
- Passive repeated safety copy was reduced, while trigger-adjacent safety copy remains in toasts, gated actions, decisions, handoff, and validation feedback.
- Post-P1B copy cleanup removed rendered demo/development-block language and replaced developer-facing packet labels with `Workspace scope`, `Protected boundaries`, `Readiness checks`, and local-preview wording.

## Red/Green Source Audit

The P1B source audit was written and run before implementation. Baseline result:

```text
FAIL Home no longer renders a duplicate Primary workflow panel
FAIL Workbench removes the redundant primary workflow strip
FAIL Workbench node cards avoid overlap and clipped titles
FAIL Decisions render dense operational rows instead of only card lists
FAIL Inspector tabs use resilient auto-fit sizing
FAIL Top bar has grouped compact icon actions
```

After implementation:

```text
PASS Home no longer renders a duplicate Primary workflow panel
PASS Workbench removes the redundant primary workflow strip
PASS Workbench node cards avoid overlap and clipped titles
PASS Decisions render dense operational rows instead of only card lists
PASS Inspector tabs use resilient auto-fit sizing
PASS Top bar has grouped compact icon actions
PASS Medium/mobile Workbench orders canvas before support sidebar
```

## Rendered Browser QA

Browser path:

- Direct `file://` navigation was checked and blocked by Browser policy.
- Rendered QA used a local static server for the same `apps/static-mvp` files at `http://127.0.0.1:4173/`.
- A PR recheck fix was verified on `http://127.0.0.1:4174/` after the first recheck found the default Workbench still rendered the two-node hierarchical layer and the Flat Flow control could sit under the fixed top bar.
- Cache-busted asset URLs were added to local CSS/JS references after Browser showed stale cached `mockData.js` content despite source edits.
- Browser screenshot evidence was captured after the ordered Flat Flow layout rendered by default with eight nodes and an accessible Flat Flow control.
- Flat Flow edge legend recheck was captured at `http://127.0.0.1:4174/`: `canvas-mode-flat`, relative/flex legend layout, legend before grid, 8 edge paths, 8 nodes, 0 legend-node overlaps, no horizontal overflow, and console warnings/errors `[]`.
- Direct-open source check passed after stripping query strings: all `href`/`src` references in `index.html` resolve to relative local files, with no remote references and no missing referenced files.

Page identity and console:

```text
URL: http://127.0.0.1:4173/ and http://127.0.0.1:4174/ during PR recheck
Title: OpenClaw Cooperative Cockpit
Console warnings/errors: none
Framework overlay: false
Blank page check: false
```

Rendered copy audit:

```text
Home: 0 matches for old visible demo/dev/blocker/mock/placeholder/static-prototype terms.
Workbench: 0 matches; redundant primary workflow strip absent.
Preview: 0 matches; Workspace scope, Protected boundaries, and Readiness checks present.
Console warnings/errors after navigation and Workbench/Preview interactions: none.
```

Responsive layout checks:

| Width | Home | Workbench | Decisions |
| --- | --- | --- | --- |
| 1600 | PR recheck focused on Workbench default state | Flat Flow active by default, 2 columns with inspector open, 8 nodes ordered, 8 edge paths, 0 overlaps, 0 clipped titles, no horizontal overflow | Console warnings/errors: none |
| 1280 | PR recheck focused on Workbench default state | Flat Flow active by default, 1 inspector-constrained column, 8 nodes ordered, 8 edge paths, 0 overlaps, 0 clipped titles, no horizontal overflow | Console warnings/errors: none |
| 1180 | PR recheck focused on Workbench default state | Flat Flow active by default, 2 columns, 8 nodes ordered, 8 edge paths, 0 overlaps, 0 clipped titles, no horizontal overflow | Console warnings/errors: none |
| 1080 | PR recheck focused on Workbench default state | Flat Flow active by default, 1 column, 8 nodes ordered, 8 edge paths, 0 overlaps, 0 clipped titles, no horizontal overflow | Console warnings/errors: none |
| 760 | PR recheck focused on Workbench default state | Flat Flow active by default, 1 compact column, 8 nodes ordered, 8 edge paths, 0 overlaps, 0 clipped titles, no horizontal overflow | Console warnings/errors: none |

Workbench default-state regression proof:

```text
check_concept_consistency now fails if the Workbench does not default to Flat Flow or if Flat Flow does not expose node-1 through node-8 in order.
check_concept_consistency now fails if Flat Flow cannot scope/dock the edge legend in normal layout or if Pending/Risk legend samples stop matching dashed edge styling.
Rendered PR recheck: activeToggle=Flat Flow, nodeCount=8, nodeIds=node-1..node-8, edgePathCount=8, overlapCount=0, clippedTitles=[], horizontalOverflow=false, console warnings/errors=[].
Toolbar hit target proof: element at the Flat Flow button center is #toggle-view-flat, not the top bar.
Flat Flow legend proof: canvasClass=`node-canvas canvas-mode-flat`, legendPosition=relative, legendDisplay=flex, legendBeforeFlow=true, legend-node overlaps=[], edgePathCount=8, pending/risk legend backgrounds use `repeating-linear-gradient`.
```

Decision cycle proof:

```text
D-005 lock: decision-row status-locked, readiness count 8
D-005 reset: decision-row status-needs-lock, readiness count 10
D-005 re-lock: decision-row status-locked, readiness count 8
Console warnings/errors: none
```

Direct file policy result:

```text
Browser Use rejected direct file navigation to file:///C:/Point/2026/projects/cooperative-cockpit/apps/static-mvp/index.html because the URL is blocked by Browser policy.
```

Direct-open source check:

```text
refs: assets/favicon.svg, styles/fonts.css, styles/base.css, styles/layout.css?v=p1b-flatflow-legend-20260531-1, styles/components.css?v=p1b-flatflow-legend-20260531-1, styles/status.css?v=p1b-flatflow-legend-20260531-1, src/mockData.js?v=p1b-flatflow-legend-20260531-1, src/state.js?v=p1b-flatflow-legend-20260531-1, src/router.js?v=p1b-flatflow-legend-20260531-1, src/app.js?v=p1b-flatflow-legend-20260531-1
remote: []
missing: []
```

## Validation

### `npm run validate`

Result: PASS.

```text
check_structure: PASS
check_json: PASS
check_no_secrets: PASS
check_task_cards: PASS (0 task cards checked)
check_gitignore: PASS
check_concept_consistency: PASS
```

### Grep gates

```text
grep -R "alert(" apps/static-mvp/src/app.js || true
```

Output: no matches.

```text
grep -R "localStorage\|sessionStorage" apps/static-mvp || true
```

Output: no matches.

```text
rg -n "allowed paths|Allowed paths|forbidden actions|Validation commands|primary demo|demo path|mock|placeholder|static prototype|static handoff|development block|development-block" apps/static-mvp/src/mockData.js apps/static-mvp/src/app.js apps/static-mvp/index.html
```

Output: only internal `mockData`/`mock-preview` keys and the cache-busted script filename matched; no rendered strings matched.

Notes:

- `Review Runs` / `Review Run object` are existing object/page labels.
- Rendered UI copy cleanup now keeps demo/development-block terms out of user-facing labels while internal source keys such as `mockData` remain unchanged.

### Package checksum

`artifacts/packages/openclaw-cooperative-cockpit-mvp.manifest.json` was updated to:

```text
sha256:f2ac4234f374f54f8dd4a62a778a273fde8d358c750b716917aca46b00e9e04c
```

The checksum was computed with the same sorted file-hash algorithm used by `scripts/check_concept_consistency.js`.

### `git diff --check`

Result: PASS for the tracked P1B diff.

The command only reported line-ending normalization warnings for edited tracked files.

`workspace/inbox/uxui_implementation_plan.md` was removed from the staged PR candidate because it is temporary inbox material outside the accepted P1A/P1B evidence scope.

## Acceptance Status

P1B source, responsive Browser layout, decision-cycle, grep, and repository validation gates pass. Direct `file://` Browser QA remains blocked by Browser policy, so direct normal-browser opening is not claimed from Codex tooling.

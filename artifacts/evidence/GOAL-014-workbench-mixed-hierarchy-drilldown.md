# GOAL-014 Workbench Mixed Map Drilldown Evidence

## Scope

GOAL-014 integrates the Workbench Mixed Map from the ZIP package requirements without applying the package stub directly. The live repo stores hierarchy data in `window.mockData.nodes` with `level` and `parentId`, so the implementation was wired against that model instead of the stubbed `requirements` / `architectureNodes` arrays.

## Implementation Summary

- Workbench state now defaults to `viewMode: 'mixed'`, `currentLevel: 'requirements'`, `currentParentId: null`, and `expandedNodeId: null`.
- Mixed Map renders requirement nodes by default.
- Expanding a requirement shows its architecture children inside a bordered compound group while sibling requirements remain visible.
- Only one requirement group expands at a time.
- Flat Flow remains available and still renders `node-1` through `node-8` in order.
- Visual connector rendering now filters Mixed Map edges to currently visible nodes.
- QA checklist, status notes, user manual, Playwright coverage, and concept consistency validation were updated for Mixed Map.

## TDD Notes

Initial RED check after adding the concept-consistency assertions:

```text
npm run check:concept
check_concept_consistency: FAIL
- static MVP Workbench must default to Mixed Map for GOAL-014; current default is flat
- static MVP Workbench Mixed Map root must render requirement nodes req-1,req-2; saw node-1,node-2,node-3,node-4,node-5,node-6,node-7,node-8
- static MVP Workbench Mixed Map expanding req-1 must keep sibling requirements visible and insert architecture children req-1,arch-1,arch-2,req-2; saw node-1,node-2,node-3,node-4,node-5,node-6,node-7,node-8
```

Post-implementation concept check:

```text
npm run check:concept
check_concept_consistency: PASS
```

## Validation

```text
npm run validate
PASS through check:gates.
check_gates: WARN (2 open) - open governance gates remain:
- Candidate screenshots promoted to approved baselines.
- Final token approval recorded.
```

```text
npm install
added 108 packages, audited 109 packages, found 0 vulnerabilities.
package.json and package-lock.json were unchanged.
```

```text
npm run test:visual:list
PASS: listed 36 tests, including screen-002-workbench mixed map drilldown across vp-760, vp-1080, vp-1180, and vp-1280.
```

First visual run was environment-blocked because the Playwright browser binary was missing:

```text
npm run test:visual
FAIL: browserType.launch executable does not exist under C:\Users\extchkho\AppData\Local\ms-playwright\...
```

Browser runtime recovery:

```text
npx playwright install chromium
PASS: required Playwright runtime assets installed.
```

Final visual run:

```text
npm run test:visual
36 passed
```

Browser-backed interaction smoke:

```json
{
  "initial": {
    "mode": "mixed",
    "roots": ["req-1", "req-2"],
    "mixedActive": true
  },
  "expanded": {
    "expandedNodeId": "req-1",
    "groupVisible": true,
    "visibleIds": ["req-1", "arch-1", "arch-2", "req-2"],
    "edgeCount": 3
  },
  "inspectorHasCanvasEngine": true,
  "collapsed": {
    "expandedNodeId": null,
    "hasGroup": false,
    "visibleIds": ["req-1", "req-2"]
  },
  "flat": {
    "mode": "flat",
    "nodeIds": ["node-1", "node-2", "node-3", "node-4", "node-5", "node-6", "node-7", "node-8"]
  },
  "remoteRequests": []
}
```

Whitespace check:

```text
git diff --check
PASS. Git reported LF-to-CRLF normalization warnings only; no whitespace errors.
```

## Known Limitations

- The run refreshed local Playwright browser/runtime files outside the repository cache.
- Playwright produced report artifacts during the visual run; those generated report outputs were removed from the worktree because they are outside GOAL-014 scope.
- The repo still has the existing two open governance gate warnings reported by `check_open_gates.js`.

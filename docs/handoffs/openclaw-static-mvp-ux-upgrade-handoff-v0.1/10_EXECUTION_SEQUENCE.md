# 10 Execution Sequence

## Recommended sequence

### Stage 0 — Repo reconnaissance

Owner: local Codex

Output:
- actual file map;
- existing routes/state/rendering patterns;
- validation script confirmation.

Stop if target files are missing or materially different.

### Stage 1 — Pre-workspace journey

Owner: local Codex

Implement:
- Landing;
- Static Demo Entry;
- Project Hub;
- Project Initialize.

Acceptance:
- route flow works;
- no fake auth;
- existing workflow pages still reachable.

### Stage 2 — Workbench editor shell

Owner: local Codex

Implement:
- left Object Outline;
- center board wrapper;
- right tabbed object panel;
- readiness queue placement.

Acceptance:
- layout renders without breaking board modes.

### Stage 3 — Object selection and trail

Owner: local Codex

Implement:
- outline selection;
- board selection synchronization;
- parent/child/trail highlighting.

Acceptance:
- parent and child relationships are visible.

### Stage 4 — Focus lenses

Owner: local Codex

Implement:
- focus lens selector;
- five lens behaviours;
- CSS highlight states.

Acceptance:
- each lens visibly changes highlights without resetting state.

### Stage 5 — Mock copilot

Owner: local Codex

Implement:
- static/local copilot tab;
- suggestions based on selected object;
- local-only buttons.

Acceptance:
- no AI/API/model calls.

### Stage 6 — Helper no-reset hardening

Owner: local Codex

Implement:
- preserve selected node;
- preserve viewport;
- preserve mode;
- preserve lens;
- preserve right tab;
- preserve outline state.

Acceptance:
- helper open/close does not visually reset Workbench.

### Stage 7 — Validation and QA

Owner: local Codex + Point

Run:
- `npm run validate`;
- optional visual tests;
- manual QA checklist.

Acceptance:
- PASS or PASS_WITH_NOTES with explicit risks.

## Recommended branch name

```text
goal-021-static-mvp-realistic-product-journey
```

## Recommended commit title

```text
GOAL-021 static MVP realistic product journey
```

## Next action

Paste `02_CODEX_IMPLEMENTATION_PROMPT.md` into local Codex.

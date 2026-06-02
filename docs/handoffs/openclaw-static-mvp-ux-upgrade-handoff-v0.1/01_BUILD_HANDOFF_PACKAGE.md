# 01 Build Handoff Package

## Project

OpenClaw Cooperative Cockpit — Static MVP UX Upgrade

## Goal

Make the static MVP feel like a realistic user product journey while preserving all static, local, mock-only boundaries.

## Target users

| user | need |
|---|---|
| First-time evaluator | Understand what OpenClaw does quickly |
| Builder / product operator | Initialize a project and shape SpecGraph |
| Reviewer / approver | See blockers, decisions, evidence, and handoff readiness |
| Point | Validate product direction before deeper build |

## Final synthesis summary

The current MVP is too cockpit-first. Users need to understand the product concept, select or initialize a project, then enter a Workbench that behaves like an object-aware editor.

The Workbench must show hierarchy, board context, editable object details, mock copilot guidance, and readiness blockers in one stable workspace.

## MVP user flow

1. User opens static MVP.
2. Landing page explains OpenClaw and the three-step workflow.
3. User clicks “Continue to local demo.”
4. Static Demo Entry clarifies there is no real login/auth.
5. Project Hub shows existing and scenario projects.
6. Project Initialize offers templates and mock guided intake.
7. User opens Workbench.
8. User selects object from outline or board.
9. Workbench updates selected object, trail, focus lens, and right panel.
10. User reviews blockers and mock copilot suggestions.
11. User proceeds to Spec Builder / Review / Preview / Decisions / Trace / Rules.
12. Handoff remains gated until readiness clears.

## Requirements

| requirement_id | requirement | priority | acceptance_criteria |
|---|---|---|---|
| R-001 | Add Landing page | P0 | Product concept and tutorial are visible |
| R-002 | Add Static Demo Entry | P0 | No real login/auth implied |
| R-003 | Add Project Hub | P0 | Existing and scenario project cards render |
| R-004 | Add Project Initialize | P0 | Templates and mock guided chat render |
| R-005 | Preserve current workflow pages | P0 | Existing pages remain reachable |
| R-006 | Redesign Workbench as tri-pane editor | P0 | Outline, board, right editor panel visible |
| R-007 | Add Object Outline | P0 | Hierarchy can select objects |
| R-008 | Add object relationship highlighting | P0 | Parent/child/trail highlight works |
| R-009 | Add visible focus lenses | P0 | Five lenses update node highlighting |
| R-010 | Add mock local copilot | P0 | Object-aware suggestions render without AI calls |
| R-011 | Add readiness queue | P1 | Blockers grouped and visible |
| R-012 | Fix helper no-reset behavior | P0 | Helper open/close preserves board state |
| R-013 | Add concrete demo scenario copy | P1 | Scenario demonstrates context, evidence, review, decisions, handoff |
| R-014 | Maintain static safety boundaries | P0 | No backend/API/auth/AI/dependency/storage introduced |
| R-015 | Add/refresh QA checklist | P1 | Manual QA covers journey and Workbench interactions |

## Functional specification

### Pre-workspace routes

| route | purpose | CTA |
|---|---|---|
| `landing` | Explain product concept | Continue to local demo |
| `demo-entry` | Clarify static demo boundary | Enter demo |
| `project-hub` | Select or create project | Open / Create from template |
| `project-init` | Choose template or mock guided setup | Open Workbench |

### Workspace routes

Keep current app routes:

- Home
- Workbench
- Spec Builder
- Review Runs
- Preview
- Decisions
- Trace & Evidence
- Rules & Scope

## Workbench specification

### Left panel: Object Outline

Show hierarchy:

```text
Project
  Requirements
    Architecture
      Component
        Phase
          Task
```

Expected behavior:

- Click parent: select parent and highlight descendants.
- Click child: select child and highlight parent trail.
- Outline and board selection remain synchronized.

### Center panel: Board

Keep:

- Spatial Board as default.
- Mixed Map.
- Flat Flow.
- Zoom / fit / reset.

Add:

- Focus lens selector.
- Clear board mode toggle.
- Stable helper panels.

### Right panel: Object Editor

Tabs:

- Inspector
- Edit Fields
- Copilot
- Evidence
- Trace

### Bottom/dock: Readiness Queue

Show:

- missing evidence;
- unlocked decisions;
- review blockers;
- validation blockers;
- handoff blockers.

## Focus lenses

| lens | expected highlight |
|---|---|
| Open work | blockerCount > 0 or non-ready readiness |
| Missing evidence | evidence gaps |
| Unlocked decisions | decision or lock gaps |
| Selected object trail | selected object, ancestors, descendants, inbound, outbound |
| Handoff blockers | objects tied to readiness blockers |

## Mock copilot specification

Copilot must be clearly labeled:

```text
Mock local copilot
No AI calls. No backend. No files written.
```

It must use local mock/app state only:

- selected object;
- selected context;
- blockers;
- evidence;
- trace;
- decisions.

Buttons:

- Preview suggestion
- Apply to local draft
- Mark needs Point lock

Allowed behavior:

- update browser-local `appState`;
- show toast;
- mark field/status locally.

Forbidden behavior:

- call AI/model;
- call API;
- write files;
- persist to localStorage/sessionStorage unless already approved;
- send data externally.

## Technical specification

### Architecture

Preserve static SPA architecture.

### Recommended state additions

```js
onboardingStage: 'landing',
selectedProjectId: 'project-cooperative-cockpit-static-mvp',
selectedTemplateId: null,
rightPanelTab: 'inspector',
focusLens: 'open-work',
outlineExpandedIds: ['project', 'requirements'],
copilotDraftApplied: false,
copilotPointLockMarked: false
```

### Recommended mock data additions

```js
productJourney
projectCards
projectTemplates
demoScenario
copilotSuggestions
focusLensDefinitions
```

### No-reset state to preserve

```js
selectedNodeId
canvasViewport
viewMode
focusLens
rightPanelTab
outlineExpandedIds
activeWorkbenchPopover
```

## Implementation task cards

| task_id | task | target_files_or_areas | acceptance_criteria | dependencies |
|---|---|---|---|---|
| T-000 | Inspect repo | `apps/static-mvp/**` | Actual file structure reported | none |
| T-001 | Add pre-workspace routes/state | router/state/app | Landing flow routes work | T-000 |
| T-002 | Implement Landing | app/css | Product concept clear | T-001 |
| T-003 | Implement Static Demo Entry | app/css | No auth implied | T-001 |
| T-004 | Implement Project Hub | app/mockData/css | Project cards render | T-001 |
| T-005 | Implement Project Initialize | app/mockData/css | Templates and guided mock render | T-001 |
| T-006 | Build Workbench editor shell | app/css | Outline/board/right panel visible | T-000 |
| T-007 | Implement Object Outline | app/mockData/css | Tree selection updates selected object | T-006 |
| T-008 | Implement relationship highlighting | app/css | Parent/child/trail highlight works | T-007 |
| T-009 | Implement focus lenses | app/state/css | Five lenses work | T-008 |
| T-010 | Implement mock copilot tab | app/state/css | Local-only suggestions and actions | T-006 |
| T-011 | Implement readiness queue | app/state/css | Blockers grouped and visible | T-006 |
| T-012 | Fix helper no-reset behavior | app/state | Board/selection state preserved | T-006 |
| T-013 | Add scenario copy | mockData/app | Scenario is concrete and safe | T-004 |
| T-014 | Update QA checklist | QA docs | Manual QA included | T-001 to T-013 |
| T-015 | Run validation | npm scripts | Results reported exactly | T-014 |

## Test plan

- [ ] `npm run validate`
- [ ] `npm run test:visual:list` if available
- [ ] `npm run test:visual` if available
- [ ] Manual static browser check
- [ ] No network/backend/API/auth/AI/storage/dependency check
- [ ] Workbench interaction regression check

## Non-goals

- Real authentication.
- Real AI/model execution.
- External connector integration.
- Backend/API/database.
- Persistent storage.
- Deployment.
- Production claims.
- Dependency additions unless explicitly approved.
- Full app rewrite.

## Open questions

| question_id | question | owner | decision_needed_by |
|---|---|---|---|
| Q-001 | Should Landing be first route permanently or only first-run route? | Point | Before implementation |
| Q-002 | Should right panel replace existing inspector or coexist with it? | Point / Codex | During Workbench implementation |
| Q-003 | Which Workbench visual density is preferred for demo? | Point | Manual QA |
| Q-004 | Should Project Hub preserve selected project in appState only? | Codex | During implementation |

## Review gates

| gate | reviewer | review_scope | pass_condition | fallback |
|---|---|---|---|---|
| G-001 | Point | Product flow | Journey matches intent | revise UX route scope |
| G-002 | Codex | Static safety | no backend/API/auth/AI/storage/dependency | revert unsafe edits |
| G-003 | Codex | Validation | `npm run validate` passes | fix or stop |
| G-004 | Point | Manual UX | Workbench feels like product editor | create follow-up |
| G-005 | Reviewer | Data/privacy | no private data/secrets | remove/redact data |

## Stop conditions

Stop if:

- target files are unknown and risky;
- production systems are involved;
- data writes are needed;
- credentials are needed;
- tests cannot be defined;
- acceptance criteria cannot be met;
- dependency addition is required;
- implementation requires backend/API/auth/database/deployment;
- implementation requires real AI/model calls;
- scope expands into full architecture rewrite.

# OpenClaw Cooperative Cockpit - User Manual

**Audience:** product owners, spec authors, reviewers, and engineers who use OpenClaw to turn early product or agent ideas into a governed, builder-ready handoff packet.

**What this manual covers:** the current static UX/UI under [apps/static-mvp](../../apps/static-mvp/index.html), including the local product-entry journey, cockpit workspace, Workbench board, governance pages, and day-to-day user moves.

**What it does not cover:** backend services, real authentication, real AI/model calls, external connectors, repo writes, deployment, database writes, or persistence. The static MVP is a local browser preview. It uses mock data, local files, in-memory state, and toast feedback only.

---

## 1. Mental Model

OpenClaw is a governed workbench for shaping one Work Packet until it is ready for a downstream Builder agent. The current local route surface has twelve pages:

- **Start:** Landing, Demo Entry, Project Hub, Initialize.
- **Workflow:** Home, Workbench, Spec Builder, Review Runs, Preview.
- **Governance:** Decisions, Trace & Evidence, Rules & Scope.

The operating flow is:

> Product idea -> project context -> Workbench objects -> Spec Draft -> Point-lock decisions -> review findings -> trace evidence -> Handoff Packet preview

Three rules are visible throughout the workspace:

1. **Runtime mutation is unavailable.** The app never runs real jobs, connectors, code, or external services.
2. **Repo writes happen outside this local preview.** Handoff controls are gated and local-only.
3. **Dynamic UI is spec-first.** Preview and handoff surfaces derive from the governed spec, decisions, and evidence.

---

## 2. Shell Controls

Every cockpit page uses the same shell once you enter the workspace.

### Top Bar

| Element | Meaning | Use it for |
| --- | --- | --- |
| OpenClaw brand | Confirms you are in the governed workflow studio. | Orientation. |
| Stage pill | Shows the current stage, such as Concept, Workbench, Spec, Review, Preview, or Handoff. | Confirm where you are in the flow. |
| Artifact badge | Shows the active packet ID, for example `COCKPIT-MVP-015`. | Quote it when discussing the packet. |
| Local preview chip | Reminds you state is browser-local. | Treat reloads as resets. |
| Readiness checklist | Shows the open readiness count. | Open it to find blockers and target pages. |
| Toggle inspector | Shows or hides the shell inspector. | Use it when you need more canvas room or detail. |
| Preview snapshot | Jumps to Preview. | Check the gated handoff preview. |
| Validate | Runs local validation feedback in the UI. | Check readiness before handoff. |
| Handoff | Stays disabled until readiness clears. | When enabled, it gives local-only handoff feedback. |

### Left Rail

The left rail is grouped by intent:

- **Start:** Landing, Demo Entry, Project Hub, Initialize.
- **Workflow:** Home, Workbench, Spec Builder, Review Runs, Preview.
- **Governance:** Decisions, Trace & Evidence, Rules & Scope.

The rail also shows a readiness percentage and a local workspace status chip. Use the rail as the primary way to move between pages.

### Inspector And Panels

The shell inspector gives route-level context. The Workbench also has its own object editor panel for the selected object, with tabs for Inspector, Edit Fields, Copilot, Evidence, and Trace. These panels inspect and update local browser state only.

### Governance Strip

The compact governance strip appears on high-risk workspace pages, including Workbench, Spec Builder, Review Runs, Preview, Decisions, Trace & Evidence, and Rules & Scope. It reinforces:

- Runtime mutation: unavailable.
- Repo writes: handoff only.
- Artifact drafting: allowed.
- Dynamic UI: spec first.

---

## 3. Start Pages

### 3.1 Landing

Landing explains what OpenClaw is and who it helps. Use it to understand the product promise before entering the local demo.

**Primary move:** click **Continue to local demo**.

### 3.2 Demo Entry

Demo Entry makes the static boundary explicit. It tells you there is no real login, authentication, backend, connector, or private workspace.

**Primary move:** click **Enter demo**.

### 3.3 Project Hub

Project Hub shows the OpenClaw Cooperative Cockpit project and the Listing Compliance & Seller Appeal Review Harness composite scenario. It includes mock status, blockers, last-edited timing, and readiness summary.

**Primary moves:**

1. Open the existing workspace if you want to inspect the current packet.
2. Initialize the scenario if you want to rehearse the setup path.

### 3.4 Initialize

Initialize shows three local templates, a mock guided chat, selected context preview, and one clear **Open Workbench** action.

Use this page to rehearse project setup. Template and chat content are static/mock-only and do not call AI or create files.

---

## 4. Workflow Pages

### 4.1 Home

Home is the operational overview for the current Work Packet.

**What you see:**

- Readiness banner with page-linked blockers.
- Status cards for project context, protected exclusions, pending locks, and pipeline progress.
- Next Safe Actions.
- Work Packet and Handoff Packet preview snippets.

**How to use it:**

1. Read the readiness banner.
2. Pick the first Next Safe Action.
3. Return here between stages to see what still blocks handoff.

### 4.2 Workbench

Workbench is the center of gravity. It is where you inspect the object hierarchy, select Context Nodes, review relationships, and prepare the selected context for the spec.

The default Workbench mode is **Spatial Board**. **Mixed Map** and **Flat Flow** remain available as secondary review modes.

**Main areas:**

- **Object Outline:** hierarchy explorer on the left. Selecting a parent highlights descendants; selecting a child highlights the parent trail.
- **Spatial Board:** zoomable, pannable whole-board canvas with fixed mock object positions and visual zones.
- **Right Object Editor:** selected-object panel with Inspector, Edit Fields, Copilot, Evidence, and Trace tabs.
- **Readiness Queue:** grouped blockers for missing evidence, unlocked decisions, review blockers, validation blockers, and handoff blockers.
- **Context Dock:** selected-object summary plus Selected Context and protected exclusions.
- **Support popovers:** Object Types and Selected Context.

**How to use Spatial Board:**

1. Select an object from the Object Outline or from the board.
2. Use mouse wheel to zoom and drag the board to pan.
3. Use zoom in, zoom out, fit, and reset controls when the board gets crowded.
4. Use focus lenses to highlight Open work, Missing evidence, Unlocked decisions, Selected object trail, or Handoff blockers.
5. Open the right Object Editor tabs to review object fields, evidence, trace, and local draft actions.
6. Use **Mock local copilot** only as local feedback. Preview suggestion, Apply to local draft, and Mark needs Point lock update browser-local state or toast feedback only.

**How to use Selected Context:**

1. Select the object that belongs in the packet.
2. Open **Selected Context**.
3. Add, remove, or clear context items as needed.
4. Confirm protected exclusions stay out of scope: secrets, runtime state, and repo write authority cannot be added.

**How to use secondary modes:**

- **Mixed Map:** shows requirement-level nodes. Expanding one requirement inserts its architecture children inside a bordered group while sibling requirements remain visible. Only one group expands at a time.
- **Flat Flow:** shows the ordered `01` to `08` task sequence for review when the hierarchy is less important than task order.

### 4.3 Spec Builder

Spec Builder turns selected context into a governed Spec Draft.

**What you see:**

- Controlled template selector.
- Spec fields grouped by status.
- Field actions for local suggestions, lock, unlock, reset, and validation.
- Spec readiness panel covering acceptance criteria, validation, and the D-005 gate.

**How to use it:**

1. Pick the closest template.
2. Fill or revise required fields.
3. Lock fields only when they are final enough for review.
4. Validate locally.
5. Resolve missing fields, evidence, and decisions before expecting handoff readiness.

### 4.4 Review Runs

Review Runs is inspect-only. It displays advisory review checks and Finding cards.

**How to use it:**

1. Inspect each review run.
2. Read severity, recommendation, evidence IDs, and status.
3. Acknowledge findings that are known and acceptable.
4. Defer findings that must be fixed before handoff.

Reviews do not modify the real spec or external systems.

### 4.5 Preview

Preview is the UI / HTML Viewer and handoff preview surface.

**What you see:**

- Artifact type selector with local explanatory feedback.
- Static inline wireframe.
- Handoff preview with primary workflow, D-005 gate, open readiness items, and linked evidence.
- Spec coverage checklist.
- Sync status that waits on readiness.

Use Preview as the final visual and readiness check before trying Handoff. It does not generate files.

---

## 5. Governance Pages

### 5.1 Decisions

Decisions records local Point-lock readiness.

**What you see:**

- Needs Point lock and Locked decision groups.
- D-005 as the Codex handoff governance checkpoint.
- Actions for choosing options, locking, deferring, resetting local locks, and opening trace.

Locking or resetting a decision changes only local browser state. It does not reverse or create real Point approval.

### 5.2 Trace & Evidence

Trace & Evidence shows how source context supports spec fields, decisions, and handoff preview content.

**What you see:**

- Static trace chain using Context Node, Spec Draft, Decision, and Handoff Packet terms.
- Artifact Reference details.
- Evidence table with source object, target object, summary, and status.
- Warning banner when evidence is missing.
- Raw trace links behind a disclosure.

Treat warnings here as hard handoff blockers.

### 5.3 Rules & Scope

Rules & Scope is the safety contract.

**What you see:**

- Allowed / Blocked overview.
- Rules matrix with review gates and enforced-at links.
- Protected surfaces.
- Review gate summary.

Use this page when a control is disabled and you need to know which guardrail is responsible.

---

## 6. End-To-End Journey

A typical local review session looks like this:

1. **Landing:** understand the product promise.
2. **Demo Entry:** confirm the local/static/mock-only boundary.
3. **Project Hub:** open the current project or initialize the scenario.
4. **Initialize:** choose a local template and open Workbench.
5. **Workbench:** inspect objects, select context, use Board/Mixed/Flat views, and review readiness blockers.
6. **Spec Builder:** fill and lock required spec fields.
7. **Decisions:** clear Point-lock decisions, especially D-005.
8. **Review Runs:** inspect findings and decide whether to acknowledge or defer them.
9. **Trace & Evidence:** clear missing-evidence warnings.
10. **Preview:** review the static artifact preview and handoff readiness rail.
11. **Validate:** confirm readiness through local feedback.
12. **Handoff:** when enabled, click for local-only handoff confirmation.

If Handoff remains disabled, use the readiness checklist and Home banner to find the blocker.

---

## 7. Status Colors

| Color | Meaning |
| --- | --- |
| Cyan / blue | Active, selected, guided, or spec-first. |
| Green | Allowed, validated, complete, or ready. |
| Amber | Needs Point lock, needs an answer, pending, or revise. |
| Red | Missing, blocked, unsafe, or unavailable. |
| Purple | Handoff-only, inspect-only, or advisory governance. |
| Gray | Neutral, draft, inactive, or unavailable. |

Amber and red states usually explain why handoff is blocked.

---

## 8. Frequently Asked

**Q: I reloaded the tab and my work disappeared. Why?**
A: The static MVP keeps state in memory only. Reloading resets the local rehearsal.

**Q: Does Mock local copilot call an AI model?**
A: No. It previews and applies mock local suggestions only. No backend, model call, connector, or file write occurs.

**Q: Can I use this to log in or connect a real workspace?**
A: No. Demo Entry exists to make that boundary clear. There is no real login, auth, or connector surface.

**Q: Why is Handoff disabled?**
A: Readiness still has blockers. Open the readiness checklist, Home banner, Decisions, Trace & Evidence, or Preview readiness rail.

**Q: Can I add secrets or repo write authority to Selected Context?**
A: No. Secrets, runtime state, and repo write authority are protected exclusions.

**Q: Does Preview generate real HTML files?**
A: No. It is a static local preview. Change the spec if the preview is wrong.

---

## 9. Reference

- App entry point: [apps/static-mvp/index.html](../../apps/static-mvp/index.html)
- App README: [apps/static-mvp/README.md](../../apps/static-mvp/README.md)
- QA checklist: [apps/static-mvp/QA_CHECKLIST.md](../../apps/static-mvp/QA_CHECKLIST.md)
- Build spec: [apps/static-mvp/BUILD_SPEC.md](../../apps/static-mvp/BUILD_SPEC.md)
- Object model: [STATIC_MVP_OBJECT_MODEL.md](STATIC_MVP_OBJECT_MODEL.md)
- Screen map: [STATIC_MVP_SCREEN_MAP.md](STATIC_MVP_SCREEN_MAP.md)
- Point-lock decisions: [POINT_LOCK_DECISIONS.md](POINT_LOCK_DECISIONS.md)
- Current repo status: [docs/ops/STATUS.md](../ops/STATUS.md)
- Governance roles: [AGENTS.md](../../AGENTS.md)

# OpenClaw Cooperative Cockpit MVP Build Specification

This build specification outlines the decisions, scope and acceptance criteria used to create the **static frontend MVP** for the OpenClaw Cooperative Cockpit.

## Locked decisions

- **Selected Context placement** – Docked on the Workbench and collapsible elsewhere.
- **Spec Builder access** – Available both as a tab in the Workbench inspector and as a focused page.
- **Review action language** – Use “Validate” or “Start review checks”; avoid unsafe execution-style verbs on buttons and actions.
- **Preview naming** – The left nav and inspector tab are labelled “Preview”. The page header reads “UI / HTML Viewer”.
- **Templates** – A set of 10 controlled templates is provided in the Spec Builder.
- **Top bar** – Brand is shortened to OpenClaw, the governed workflow studio label is secondary, workflow state is shown as Concept → Workbench → Spec → Review → Preview → Handoff, and the active artifact ID sits in a compact right-side badge.
- **Left rail** – Includes compact progress, workflow grouping and governance grouping while preserving the twelve approved page labels and route keys.
- **Governance strip** – Compact single-row status strip shown on all high-risk pages except Home, preserving the meanings Runtime mutation blocked, repo writes handoff only, artifact drafting allowed and dynamic UI spec first.
- **Home page** – Shows operational status cards, a full-width pipeline banner, recent activity and next safe actions instead of a generic dashboard.
- **Deferred pages** – Architecture Map, Golden Scenarios and Feedback & Revisions are deferred to Phase 1.5 and are not part of this MVP.
- **Codex handoff** – Visible but gated. Handoff actions remain disabled until `appState.handoffReady` is true.
- **Workbench scenario lenses** – The Workbench is a lens/editor over SpecGraph. The default `guided_flow` lens is backed by the whole-board spatial canvas with fixed mock positions, zoom, pan, fit, reset and a context dock. `lineage_impact_map`, `control_plane` and `code_review_lens` remain secondary scenario lenses.
- **Technology stack** – Plain HTML, CSS and vanilla JavaScript. No frameworks, no packages, no backend, no API calls and no authentication.
- **Typography assets** – Local bundled fonts only: Rajdhani, Outfit and Fira Code under `assets/fonts`, each with its OFL license file. No CDN font loading is permitted at runtime.
- **Viewport** – Desktop 16:9 only. Mobile responsiveness is not required.
- **AI behaviour** – Stubbed only. Suggestions and actions display static text instead of calling real AI services.
- **Handoff/export** – Generates a static placeholder bundle. Real code generation or repository writes are not permitted.

## MVP pages

The MVP includes twelve local pages:

1. **Landing** – Product entry for the local demo journey.
2. **Static Demo Entry** – Static/mock boundary entry page.
3. **Project Hub** – Project selection and readiness cards.
4. **Project Initialize** – Template-guided local project setup.
5. **Home** – Operational page with context, protected exclusion and pending lock cards, readiness, recent activity and quick actions.
6. **Workbench** – SpecGraph scenario-lens editor for selecting governed objects, reviewing safe node types, managing Selected Context through a canvas popover and context dock, opening object configuration/debug details, and viewing the bounded `code_review_lens` in the existing object editor panel. Shows the governance strip as a secondary safety overlay.
7. **Spec Builder** – Template-driven spec editing. Includes field status chips and gating for handoff.
8. **Review Runs** – Inspect-only review orchestration. Shows review types and mock findings.
9. **Preview** – Static mockup viewer and spec coverage checklist.
10. **Decisions** – Approval board for decisions requiring Point lock.
11. **Trace & Evidence** – Displays trace links and warns when evidence is missing.
12. **Rules & Scope** – Summarises safety rules and review gates.

## Deferred Phase 1.5 items

- **Architecture Map** – Mode for visualising system architecture; not built in MVP.
- **Golden Scenarios** – Scenario library with acceptance criteria; not built in MVP.
- **Feedback & Revisions** – Revision history and feedback management; not built in MVP.

## Governance model

The following rules govern all interactions in the MVP:

- **Runtime mutation:** Blocked. No code execution or runtime state changes are possible.
- **Repo writes:** Handoff only. Export actions produce static bundles; nothing is written to a repository.
- **Artifact drafting:** Allowed. Users can create and edit specs via the Spec Builder.
- **Dynamic UI:** Spec first. The UI/HTML preview is static and available only after a spec is in progress.
- **Secrets:** Excluded. Protected items (runtime state, secrets, repo write authority) are excluded from the AI context.
- **External actions:** Blocked. There are no external API calls or service integrations.
- **Review agents:** Inspect only. Review checks produce suggestions but cannot modify state.
- **Codex handoff:** Gated. Users cannot export a handoff until all fields are completed and decisions resolved.

## Status ontology

Status chips reflect the following colour semantics:

- **Cyan/blue** – Active, selected, spec-first, guided action.
- **Green** – Allowed, validated, complete.
- **Amber** – Needs Point lock, needs answer, warning, pending, revise.
- **Red** – Missing, blocked, unsafe, risk.
- **Purple** – Handoff only, inspect only, advisory output.
- **Gray** – Neutral, passive, draft, unavailable.

## Visual system

- **Aesthetic:** Dify-inspired workflow studio with OpenClaw governance overlays. The Workbench should read as a clean SaaS workflow builder, not a command center, while remaining clearly differentiated through decisions, trace, evidence and handoff concepts.
- **Surfaces:** Light neutral shell, white studio panels, light dotted Workbench canvas, restrained borders and compact control bars. Avoid heavy glass, scanlines, cockpit cues and neon glow.
- **Interaction finish:** Hover/focus/selected states use subtle blue, green and orange accents, clear outlines, compact status chips and minimal page-enter motion with `prefers-reduced-motion` support.
- **Icons:** Inline SVG and CSS icons are used for navigation, top actions, nodes, governance and status cues. There is no external icon package.
- **Workbench board:** `window.mockData.workbenchBoard` supplies the fixed board size, visual zones and node positions for the default `guided_flow` scenario lens. `window.mockData.workflowEdges` and hierarchy relationships supply visual-only source/target/tone data for drawing canvas links. Node cards are configurable workflow operators with type icons, config/model/status rows, input/output handles and local-only selection state.
- **SpecGraph fixture data:** `window.mockData.specGraph` exposes schema-shaped static mission, node, edge, readiness and scenario-lens data for `guided_flow`, `lineage_impact_map`, `control_plane` and `code_review_lens`.
- **Code-object lens data:** `window.mockData.codeObjects`, `relationEdges`, `evidenceRefs`, `reviewFindings` and `agentAnnotations` model a bounded selected-object technical review. Facts, findings and AI annotations remain separate, and every review finding has evidence refs.

Supported status labels:
`Active`, `Selected`, `Allowed`, `Validated`, `Covered`, `Applied`, `Needs Point lock`, `Needs answer`, `Needs sync`, `Missing`, `Blocked`, `Revise`, `Handoff only`, `Inspect only`, `Draft`, `Ready for handoff`.

## Acceptance criteria

Refer to the `QA_CHECKLIST.md` file for detailed acceptance criteria. At a high level:

1. All twelve approved local pages are reachable via the left navigation or approved project-entry controls.
2. The prototype reads as a SpecGraph-first Builder Enablement OS rather than a dashboard, chatbot or dark command center.
3. The shell is visually consistent across pages, with a light neutral SaaS palette, local typography, inline icons and clear status chips.
4. The Workbench is SpecGraph-first with a default `guided_flow` spatial board, zoom/pan controls, node selection, context dock, object-type and Selected Context popovers, visual connectors, workflow-operator cards, scenario-lens controls, and a manually opened node configuration/debug inspector.
5. The Spec Builder clearly shows templates, fields, statuses and gating for handoff.
6. Review runs are labelled inspect‑only and provide mock findings.
7. The preview is static and labelled “UI / HTML Viewer”.
8. Decisions page displays locked and unresolved decisions with options to lock or defer.
9. Trace and evidence show source–target links and missing-trace warnings.
10. Rules and scope make safety rules explicit.
11. No action label uses unsafe execution-style wording.
12. There are no backend calls, API integrations, secrets or credentials.
13. Handoff and export actions remain gated until ready.

This specification is included for reference only; the functionality has been implemented directly in the static files.

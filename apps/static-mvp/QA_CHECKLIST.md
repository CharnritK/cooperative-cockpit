# OpenClaw Cooperative Cockpit MVP – QA Checklist

This checklist guides manual verification of the local cockpit preview. It ensures that key acceptance criteria are satisfied before review or delivery.

## Smoke tests

1. **File structure exists** – The folder `apps/static-mvp` contains `index.html`, `README.md`, `QA_CHECKLIST.md`, `BUILD_SPEC.md`, the `src`, `styles`, `assets` and `handoff` directories.
2. **Local font assets exist** – The folder `assets/fonts` contains Rajdhani, Outfit and Fira Code font files plus OFL license files. `styles/fonts.css` references only local font paths.
3. **Page navigation** – Opening `index.html` shows the application shell. All eight pages (Home, Workbench, Spec Builder, Review Runs, Preview, Decisions, Trace & Evidence, Rules & Scope) are reachable via the grouped left navigation. The active nav item is highlighted.
4. **No forbidden labels** – No buttons, CTAs or menu items use unsafe execution-style verbs. The review page name remains “Review Runs”.
5. **Workflow studio visual system** – The shell uses a light neutral SaaS studio theme: compact workflow stepper, progress rail, restrained status chips, local typography, display-weight app/page titles, icons, white panels, subtle borders, visible focus states and consistent hierarchy across pages. It should not read as a dark command center.
6. **Workbench interaction** - Selecting a Context Node highlights it and opens the right inspector. The Workbench defaults to Flat Flow and renders nodes `01` to `08` as an ordered responsive grid, left-to-right on wide canvases and top-down on narrow canvases; Hierarchical remains an optional drill-down view. Visual connectors render between node cards from their actual card centers, not stale percentage coordinates. The Workbench does not render the redundant primary workflow strip; orientation comes from the progress rail and object canvas. The locked object palette lists cockpit object types, not executable workflow nodes. Clicking “Add selected context” adds the node to Selected Context. Selected Context lists included context and protected exclusions. Removing items and clearing Selected Context update the view.
7. **Spec Builder interaction** - Changing the template displays local explanatory feedback and has no effect on field data or artifacts. Fields show names, values or suggestions, status chips and actions. The governed spec readiness panel shows acceptance-criteria readiness, validation state and D-005 gate state. Locking, unlocking, and resetting fields update browser state only. Validating with unresolved fields displays toast feedback. Completing all fields and validating only enables local handoff readiness when evidence and decisions are also clear.
8. **Review Runs interaction** - The page identifies the Review Run object and linked Finding objects. The “Inspect findings” button populates Finding cards with review run, summary, recommendation, evidence IDs, severity/status chips and local-only action buttons. Acknowledging or deferring a finding updates in-memory finding state only. The page displays an inspect-only disclaimer.
9. **Preview interaction** - The header reads “UI / HTML Viewer”. The artifact type selector exists and displays local explanatory feedback without producing files or mutating artifact records. The preview frame contains preview text. The handoff preview shows the primary workflow, D-005 gate, open readiness items and evidence items. Sync status shows “Waiting on readiness” until all required checks are clear. The spec coverage checklist lists each field as covered or incomplete. Preview controls display toast feedback and do not produce files.
10. **Decisions interaction** - Decisions are separated into “Needs Point lock” and “Locked decisions”. D-005 appears as the Codex handoff governance checkpoint and states that it gates only the handoff preview. Locking a decision or choosing an option updates its status to locked in local browser state only. “Reset local lock” reopens the local decision without implying any change to real Point approval. “Open trace” navigates to the Trace page.
11. **Trace & Evidence interaction** - The page displays a trace graph using Context Node, Spec Draft, Decision and Handoff Packet terms. Artifact Reference details appear above an evidence item detail table that includes Source object, Target object, summary and status. A warning appears if required evidence or spec fields lack trace evidence. No file-producing handoff control is active because the trace is incomplete.
12. **Rules & Scope clarity** – The Decisions, Trace & Evidence and Rules & Scope pages use the governance header accent. The rules matrix lists each safety rule, whether it is allowed, and its review gate. Protected surfaces and review gate summary appear below the table.
13. **Governance strip** – The compact governance strip appears on the Workbench, Spec Builder, Review Runs, Preview, Decisions, Trace & Evidence and Rules & Scope pages. It preserves these meanings: runtime mutation unavailable, repo writes handoff only, artifact drafting allowed and dynamic UI spec first. The strip is hidden on the Home page.
14. **No external calls** – Inspect the browser’s network panel (Developer Tools) while interacting with the prototype. There should be no network requests beyond loading the local static files, including local fonts.
15. **No secrets or credentials** – No sensitive information appears in the HTML, JavaScript or console. Protected exclusions are listed but not populated with real data.
16. **Handoff gating** – The top-bar “Handoff” button and handoff-style controls remain disabled until `appState.handoffReady` is true. Missing acceptance criteria, missing/unreviewed evidence, or unresolved D-005 visibly keep readiness unavailable. When enabled and clicked, controls display local-only toast feedback instead of producing a real handoff.
17. **Package assimilation** – The app is stored under `apps/static-mvp/` and has a corresponding repository artifact manifest.

## Accessibility checks

- **Font sizes** – Ensure text is readable on a 16:9 desktop screen. The base font size is 14 px.
- **Contrast** – Verify that text and status chips meet WCAG AA contrast ratios on the light neutral palette.
- **Focus states** – Navigate through the interface using the keyboard (Tab). Focus rings or visual indicators should appear on interactive elements like buttons and nav items.
- **Keyboard navigation** – You can reach and activate all primary controls (navigation items, buttons, actions) via keyboard only.
- **ARIA labels** – The right inspector uses an `aria-label` for its role. Other elements rely on visible labels.
- **Skip and live regions** – The shell exposes a skip navigation link to `#main-content`, the readiness count uses `aria-live="polite"`, and toast feedback is announced through the local toast container.

## Governance checks

- **Safety model** – The governance strip accurately reflects runtime mutation being unavailable and repo writes being handoff-only.
- **Inspect-only reviews** – Review results do not attempt to modify any state beyond local in-memory finding status and toast feedback.
- **Protected surfaces** – Runtime state, secrets and repo write authority are listed under protected exclusions and cannot be added to Selected Context.
- **Handoff gating** – Handoff-style actions (Prepare handoff, View gated preview) remain disabled until all gating conditions are satisfied.
- **Primary workflow gating** – The relationship from context to governed spec, D-005 gate, evidence items and handoff preview remains available through the canvas, Preview, Decisions, and Trace surfaces without a separate Workbench explainer strip.
- **GOAL-008 closeout gate** – Before closeout, verify object visibility, no-new-pages, no-network behavior, unsafe-label absence, local handoff readiness, and no export/repo-write/runtime/deployment implications in one browser QA pass.

## Object-model lock checks

- **Product docs source of truth** – `docs/product/STATIC_MVP_OBJECT_MODEL.md`, `STATIC_MVP_SCREEN_MAP.md` and `STATIC_MVP_MOCK_DATA_SPEC.md` are reviewed before changing mock data or UI labels.
- **Mock entity coverage** – `src/mockData.js` exposes the GOAL-005 static entities: workspace, project, contextNodes, selectedContext, specTemplates, specDraft, specFields, reviewRun, findings, decisions, evidenceItems, artifactRefs, workPacket, handoffPacket, agentRoles and validationResults. `src/state.js` clones and holds those entities while keeping the existing static UI aliases available.
- **Eight-page boundary** – Object-model alignment must map onto the existing Home, Workbench, Spec Builder, Review Runs, Preview, Decisions, Trace & Evidence and Rules & Scope pages without adding a page.
- **GOAL-006 UI mapping** – Home reads as Project Overview; Workbench labels Context Nodes, Selected Context and locked object palette; Review Runs labels Review Run and Finding objects; Trace & Evidence shows Artifact Reference and Evidence item detail with source/target object columns.
- **GOAL-007 packet preview** – Preview shows Work Packet summary as the core object and a derived Handoff Packet preview sourced from Work Packet, Decisions, Evidence and Validation Results. The preview includes objective, workspace scope, protected boundaries, acceptance criteria, readiness checks, open readiness items and readiness status.
- **Local-only object semantics** – Work Packet and Handoff Packet surfaces remain local previews and do not imply export, repo writes, live validation, runtime execution, connectors, auth, database persistence or deployment.
- **Point-lock gates** – Product decisions listed in `docs/product/POINT_LOCK_DECISIONS.md` are accepted for the static MVP baseline; any change before new app-source goals requires Point lock.

## Dify-inspired workflow studio visual check

- **Canvas-first read** – On Workbench, the light dotted workflow canvas is the visual center of gravity, with palette and inspector surfaces supporting it rather than dominating it.
- **Operator node cards** – Nodes read as configurable workflow operators, not generic process cards. Cards are ordered, titles never collide with id/status metadata, and low-space states hide secondary detail while preserving tooltip/inspector access.
- **Palette and inspector** – The node palette lists safe node types. The inspector reads as configuration/debug, with node config summary, inputs, outputs, guardrails, trace links and a local-only notice.
- **Governance secondary** – Governance remains visible but quiet. The strip preserves runtime mutation unavailable, repo writes handoff only, artifact drafting allowed and dynamic UI spec first without becoming the main visual focus.
- **Not a clone** – The mockup may borrow workflow-studio patterns, but it must not copy Dify branding, logos, assets or exact product surfaces.

## No-network check

This prototype must remain fully offline. After loading `index.html`, no remote requests should appear in the Network tab. If remote calls are observed, treat them as failures and investigate. Only local static assets such as CSS, JavaScript, favicon and fonts may be requested.

## Label check

Search within the HTML and JavaScript files for unsafe execution-style verbs. The review page name is allowed.

If any button or action label contains those verbs, the prototype fails this check.

## GOAL-008 closeout check

The static MVP closeout passes only if fresh evidence confirms:

- All eight current pages are reachable and non-empty.
- No ninth page or new route appears in navigation.
- Object-model surfaces remain visible: Project, Context Nodes, Selected Context, Spec Draft, Review Run, Findings, Decisions, Evidence, Artifact Reference, Work Packet, Handoff Packet and Validation Results.
- Handoff controls remain gated while local readiness has open items.
- No remote HTTP/HTTPS requests occur during local browser smoke.
- No button or CTA implies live execution, real export, deployment, authentication or external connection.
- `npm run validate` passes and command output is recorded under `artifacts/evidence/`.

## P1A interaction hardening check

The P1A interaction hardening slice is accepted only when fresh evidence confirms:

- `apps/static-mvp/src/app.js` has zero native alert-call matches.
- `apps/static-mvp/` has zero matches for browser storage persistence APIs.
- Template and artifact selectors display local explanatory feedback without mutating artifacts.
- Review finding acknowledge/defer, spec reset/unlock, and decision reset/re-lock mutate only in-memory browser state.
- Toast copy remains local-only where relevant.
- Safe visual/token hardening from the Claude audit is present: display font use for app/page titles, `--color-panel-strong` replacing the stale `#f8fafc` literals in edited stylesheets, node hover using `--shadow-glow-cyan`, governance page header accents, and readiness count pulse feedback.
- Dark mode toggle and browser-storage theme persistence remain deferred; the app must still have zero matches for browser storage persistence API names.
- Direct visual browser QA is recorded honestly. If the in-app browser blocks direct `file://` navigation, evidence must say so and must not claim a rendered pass.
- `npm run validate` passes, or the evidence records the exact blocker and the out-of-scope file needed to clear it.

## P1B UX simplification hardening check

The P1B simplification slice is accepted only when fresh evidence confirms:

- Home presents Project, Artifact Reference, readiness summary, and Next Safe Actions without the duplicate Primary workflow panel.
- Workbench keeps the top workflow stepper and left progress rail while removing the redundant primary workflow strip and rendering an ordered responsive node layout with zero card overlaps or clipped titles at desktop, medium, and mobile test widths.
- Workbench inspector tabs use resilient sizing so Requirements and Evidence remain readable when the inspector is visible.
- Decisions renders as dense operational rows with D-005 checkpoint clarity, local lock/reset/re-lock behavior, and no implied reversal of real Point approval.
- The top bar groups compact icon actions for checklist, preview, and validation while preserving the gated handoff action and local safety semantics.
- User-facing UI copy does not use demo, development-block, blocker, blocked, mock, placeholder, or static-prototype language; internal field names may still carry legacy keys where they are not rendered.
- Passive safety copy is reduced where it only repeats background constraints, while trigger-adjacent safety copy remains in toasts, gated actions, decisions, handoff, and validation feedback.
- Browser or source/render QA covers widths around 760px, 1080px, 1180px, and 1280px+ and records any screenshot or direct-file policy blocker honestly.
- Native alert-call and browser-storage API-name searches remain clean; `npm run validate` and `git diff --check` pass.

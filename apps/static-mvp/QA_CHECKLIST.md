# OpenClaw Cooperative Cockpit MVP – QA Checklist

This checklist guides the manual verification of the static MVP prototype. It ensures that key acceptance criteria are satisfied before demonstration or delivery.

## Smoke tests

1. **File structure exists** – The folder `apps/static-mvp` contains `index.html`, `README.md`, `QA_CHECKLIST.md`, `BUILD_SPEC.md`, the `src`, `styles`, `assets` and `handoff` directories.
2. **Local font assets exist** – The folder `assets/fonts` contains Rajdhani, Outfit and Fira Code font files plus OFL license files. `styles/fonts.css` references only local font paths.
3. **Page navigation** – Opening `index.html` shows the application shell. All eight pages (Home, Workbench, Spec Builder, Review Runs, Preview, Decisions, Trace & Evidence, Rules & Scope) are reachable via the grouped left navigation. The active nav item is highlighted.
4. **No forbidden labels** – No buttons, CTAs or menu items use unsafe execution-style verbs. The review page name remains “Review Runs”.
5. **Workflow studio visual system** – The shell uses a light neutral SaaS studio theme: compact workflow stepper, progress rail, restrained status chips, local typography, icons, white panels, subtle borders, visible focus states and consistent hierarchy across pages. It should not read as a dark command center.
6. **Workbench interaction** – Selecting a node highlights it and opens the right inspector. Visual connectors render between nodes from `mockData.workflowEdges`. The node palette lists OpenClaw-safe workflow node types. Clicking “Add selected” adds the node to the context basket. The context basket lists included context and protected exclusions. Removing items and clearing the basket update the view.
7. **Spec Builder interaction** – Changing the template has no effect on data (as this is static). Fields show names, values or suggestions, status chips and actions. Locking a field updates its status chip. Validating with unresolved fields displays a warning. Completing all fields and validating sets the spec to ready for handoff and enables the handoff button.
8. **Review Runs interaction** – The “Start review checks” button populates the review results list. Each card shows the verdict, findings count, severity chip and action buttons (Accept/Defer). The page displays an inspect‑only disclaimer.
9. **Preview interaction** – The header reads “UI / HTML Viewer”. The artifact type selector exists. The preview frame contains placeholder text. Sync status shows “Needs sync” until all spec fields are locked. The spec coverage checklist lists each field as covered or incomplete. Buttons such as “Generate static mockup” display alerts.
10. **Decisions interaction** – Decisions are separated into “Needs Point lock” and “Locked decisions”. Locking a decision or choosing an option updates its status to locked. Deferring sets the status back to needs lock. “Open trace” navigates to the Trace page.
11. **Trace & Evidence interaction** – The page displays a placeholder graph and a table of trace links. A warning appears if any spec fields lack trace evidence. No export button is active because the trace is incomplete.
12. **Rules & Scope clarity** – The rules matrix lists each safety rule, whether it is allowed, and its review gate. Protected surfaces and review gate summary appear below the table.
13. **Governance strip** – The compact governance strip appears on the Workbench, Spec Builder, Review Runs, Preview, Decisions, Trace & Evidence and Rules & Scope pages. It preserves these meanings: runtime mutation blocked, repo writes handoff only, artifact drafting allowed and dynamic UI spec first. The strip is hidden on the Home page.
14. **No external calls** – Inspect the browser’s network panel (Developer Tools) while interacting with the prototype. There should be no network requests beyond loading the local static files, including local fonts.
15. **No secrets or credentials** – No sensitive information appears in the HTML, JavaScript or console. Protected exclusions are listed but not populated with real data.
16. **Handoff gating** – The top-bar “Handoff” button and handoff/export-style controls remain disabled until `appState.handoffReady` is true. When enabled and clicked, they display simple alerts instead of producing a real handoff.
17. **Package assimilation** – The app is stored under `apps/static-mvp/` and has a corresponding repository artifact manifest.

## Accessibility checks

- **Font sizes** – Ensure text is readable on a 16:9 desktop screen. The base font size is 14 px.
- **Contrast** – Verify that text and status chips meet WCAG AA contrast ratios on the light neutral palette.
- **Focus states** – Navigate through the interface using the keyboard (Tab). Focus rings or visual indicators should appear on interactive elements like buttons and nav items.
- **Keyboard navigation** – You can reach and activate all primary controls (navigation items, buttons, actions) via keyboard only.
- **ARIA labels** – The right inspector uses an `aria-label` for its role. Other elements rely on visible labels.

## Governance checks

- **Safety model** – The governance strip accurately reflects runtime mutation being blocked and repo writes being handoff‑only.
- **Inspect‑only reviews** – Review results do not attempt to modify any state beyond visual updates and alerts.
- **Protected surfaces** – Runtime state, secrets and repo write authority are listed under protected exclusions and cannot be added to the context basket.
- **Handoff gating** – Export actions (Prepare handoff, Prepare preview packet) remain disabled until all gating conditions are satisfied.

## Object-model lock checks

- **Product docs source of truth** – `docs/product/STATIC_MVP_OBJECT_MODEL.md`, `STATIC_MVP_SCREEN_MAP.md` and `STATIC_MVP_MOCK_DATA_SPEC.md` are reviewed before changing mock data or UI labels.
- **Eight-page boundary** – Object-model alignment must map onto the existing Home, Workbench, Spec Builder, Review Runs, Preview, Decisions, Trace & Evidence and Rules & Scope pages without adding a page.
- **Static-only object semantics** – Work Packet and Handoff Packet surfaces remain static previews and do not imply export, repo writes, live validation, runtime execution, connectors, auth, database persistence or deployment.
- **Point-lock gates** – Product decisions listed in `docs/product/POINT_LOCK_DECISIONS.md` must be accepted or redirected before app-source goals GOAL-005 through GOAL-008 begin.

## Dify-inspired workflow studio visual check

- **Canvas-first read** – On Workbench, the light dotted workflow canvas is the visual center of gravity, with palette and inspector surfaces supporting it rather than dominating it.
- **Operator node cards** – Nodes read as configurable workflow operators, not generic process cards. Each node shows a colored type icon, title, config/model/status rows, input/output connector handles and a subtle selected state.
- **Palette and inspector** – The node palette lists safe static node types. The inspector reads as configuration/debug, with node config summary, inputs, outputs, guardrails, trace links and a static-only notice.
- **Governance secondary** – Governance remains visible but quiet. The strip preserves runtime mutation blocked, repo writes handoff only, artifact drafting allowed and dynamic UI spec first without becoming the main visual focus.
- **Not a clone** – The mockup may borrow workflow-studio patterns, but it must not copy Dify branding, logos, assets or exact product surfaces.

## No-network check

This prototype must remain fully offline. After loading `index.html`, no remote requests should appear in the Network tab. If remote calls are observed, treat them as failures and investigate. Only local static assets such as CSS, JavaScript, favicon and fonts may be requested.

## Label check

Search within the HTML and JavaScript files for unsafe execution-style verbs. The review page name is allowed.

If any button or action label contains those verbs, the prototype fails this check.

# OpenClaw Cooperative Cockpit MVP (Static Prototype)

This directory contains a **static frontend prototype** for the OpenClaw Cooperative Cockpit MVP. The goal of this prototype is to demonstrate the interaction model and visual direction of the product without any backend, API calls or execution of external code. The prototype includes eight focus pages connected through a persistent shell.

The current visual direction is **Dify-inspired workflow studio with OpenClaw governance overlays**: a clean light SaaS shell, canvas-first Workbench, dotted workflow canvas, configurable operator nodes, compact top controls, node palette/config/debug surfaces, a static golden path from architecture node selection to handoff packet preview, local typography assets, and secondary governance cues across the higher-risk pages.

## Running locally

1. Ensure you have a modern web browser installed (Chromium, Firefox, Safari or Edge).
2. From the repository root, open `apps/static-mvp/index.html` in your browser.
3. There is no build step or server required.
4. Navigate through the pages using the left navigation or the top bar buttons.

## Local assets and offline use

The prototype bundles its font files locally under `assets/fonts`:

- **Rajdhani** for selected headings and compact labels.
- **Outfit** for body and UI text.
- **Fira Code** for IDs and technical labels where precision matters.

The font license files are included in the same folder. The app does not load fonts, icons, scripts or styles from a CDN at runtime.

## Included pages

The MVP comprises the following pages:

1. **Home** – Provides operational status cards for context, protected exclusions and pending locks, plus pipeline progress, recent activity and local-only next safe actions.
2. **Workbench** – Displays a light workflow-builder studio with a safe node palette, dotted canvas, configurable operator nodes, local selection state, a docked context basket, chat-style mock assistant panel, generated handoff packet preview, and a configuration/debug inspector. You can select nodes, add them to the context, and see protected exclusions. The governance strip is visible here as a secondary safety overlay.
3. **Spec Builder** – Allows you to choose a template, view and fill specification fields, apply simple AI suggestions (stubbed), lock fields and validate the spec. Handoff controls stay disabled until `appState.handoffReady` is true.
4. **Review Runs** – Lists review types and allows you to simulate running review checks. Results are displayed with severity chips and simple action buttons. Reviews are inspect‑only.
5. **Preview** – Shows a placeholder preview of the UI/HTML artifact and a spec coverage checklist. You can generate a static mockup, compare it against the spec or start a UX check (all stubbed).
6. **Decisions** – Lists decisions that require Point approval. You can lock or defer decisions and choose between options for each decision.
7. **Trace & Evidence** – Shows a placeholder trace graph and a table of source‑to‑target links. It warns if any spec fields lack trace evidence.
8. **Rules & Scope** – Presents the safety rules and governance model, summarising what is allowed or blocked and which review gates are active.

## Static and mock‑only

All data in this prototype is mock data defined in `src/mockData.js`. The pages simulate state transitions on the client side only. There are **no external API calls**, no back‑end, no authentication and no real AI assistance. Actions such as “Generate static mockup” or “Handoff” display simple alerts instead of performing real work.

## Explicitly not implemented

- Dedicated Architecture Map, Golden Scenarios and Feedback & Revisions pages (deferred to Phase 1.5). The Workbench now includes a static architecture graph golden-path demonstration only.
- Any backend, database or API integration.
- Real AI calls or dynamic code execution.
- Full mobile layout design. The prototype remains optimized for a desktop (16:9) viewport.
- Real network requests or repository writes.

## Known limitations

- The canvas on the Workbench is static; nodes do not move. Connectors are visual-only and based on `mockData.workflowEdges`.
- Review actions are purely illustrative; they do not modify the state beyond showing simple messages.
- The preview page does not render real HTML or UI components.
- The trace graph is a placeholder text area rather than a real graph.
- Accessibility has been addressed at a basic level (e.g., focus order and contrast), but no formal audit has been completed.

## Validation steps

Refer to `QA_CHECKLIST.md` for a detailed list of smoke tests and acceptance criteria used to validate this prototype.

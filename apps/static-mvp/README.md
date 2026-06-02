# OpenClaw Cooperative Cockpit MVP (Static Prototype)

This directory contains a **static frontend prototype** for the OpenClaw Cooperative Cockpit MVP. The goal of this prototype is to demonstrate the interaction model and visual direction of the product without any backend, API calls or execution of external code. The prototype now includes a four-step local product-entry journey before the existing cockpit workspace pages.

The current visual direction is **Dify-inspired workflow studio with OpenClaw governance overlays**: a clean light SaaS shell, realistic local product journey, canvas-first Workbench, large spatial board, object hierarchy outline, configurable operator nodes, compact top controls, popover-based object/context support surfaces, a local object editor panel, a context dock for selected objects, local typography assets, and secondary governance cues across the higher-risk pages.

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

The handoff package inventory in `handoff/manifest.json` includes `styles/fonts.css`, all local `.ttf` files referenced by that stylesheet, and the corresponding `OFL-*.txt` license files so copied handoff packages remain self-contained for local/offline review.

## Included pages

The MVP comprises the following pages:

1. **Landing** – Explains what OpenClaw is, who it helps, and how it turns messy product and agent ideas into governed builder-ready handoff packets.
2. **Static Demo Entry** – Clarifies that the experience is local/static/mock-only and does not imply real login or authentication.
3. **Project Hub** – Shows the OpenClaw Cooperative Cockpit project and the Listing Compliance & Seller Appeal Review Harness composite scenario, including status, blockers, mock timestamp, and readiness summary.
4. **Project Initialize** – Shows three local templates, mock guided chat, selected context preview, and the Open Workbench CTA.
5. **Home** – Provides operational status cards for context, protected exclusions and pending locks, plus pipeline progress, recent activity and local-only next safe actions.
6. **Workbench** – Displays a light workflow-builder studio with Object Outline, large zoomable spatial board, right object editor panel, focus lenses, readiness queue, fixed mock object positions, local selection state, object-type and Selected Context popovers, and a selected-object context dock. You can zoom, pan, fit, reset, select nodes from the outline or board, inspect relationships, use mock local copilot suggestions, and see protected exclusions without external calls. Mixed Map and Flat Flow remain secondary modes. The governance strip is visible here as a secondary safety overlay.
7. **Spec Builder** – Allows you to choose a template, view and fill specification fields, apply simple local suggestions, lock fields and validate the spec. Handoff controls stay disabled until `appState.handoffReady` is true.
8. **Review Runs** – Lists review types and allows you to simulate running review checks. Results are displayed with severity chips and simple action buttons. Reviews are inspect-only.
9. **Preview** – Shows a placeholder preview of the UI/HTML artifact and a spec coverage checklist. Preview controls are local-only and do not produce files.
10. **Decisions** – Lists decisions that require Point approval. You can lock or defer decisions and choose between options for each decision.
11. **Trace & Evidence** – Shows a placeholder trace graph and a table of source-to-target links. It warns if any spec fields lack trace evidence.
12. **Rules & Scope** – Presents the safety rules and governance model, summarising what is allowed or blocked and which review gates are active.

## Static and mock‑only

All data in this prototype is mock data defined in `src/mockData.js`. The pages simulate state transitions on the client side only. There are **no external API calls**, no back-end, no authentication and no real AI assistance. Actions such as previewing a suggestion, applying a mock local draft, marking a Point-lock need, validating, or opening handoff feedback update browser-local state or toast feedback only.

## Explicitly not implemented

- Dedicated Architecture Map, Golden Scenarios and Feedback & Revisions pages (deferred to Phase 1.5). The Workbench now includes a static architecture graph golden-path demonstration only.
- Any backend, database or API integration.
- Real AI calls or dynamic code execution.
- Full production mobile design. The prototype includes responsive stress handling for local review widths but remains optimized for desktop/laptop evaluation.
- Real network requests or repository writes.

## Known limitations

- The spatial board on the Workbench is static; node positions come from `mockData.workbenchBoard` and reset on reload. Connectors, focus lenses, relationship highlights, and object editor content are visual/local only and based on static mock relationships.
- Review actions are purely illustrative; they do not modify the state beyond showing simple messages.
- The preview page does not render real HTML or UI components.
- The trace graph is a placeholder text area rather than a real graph.
- Accessibility has been addressed at a basic level (e.g., focus order and contrast), but no formal audit has been completed.

## Validation steps

Refer to `QA_CHECKLIST.md` for a detailed list of smoke tests and acceptance criteria used to validate this prototype.

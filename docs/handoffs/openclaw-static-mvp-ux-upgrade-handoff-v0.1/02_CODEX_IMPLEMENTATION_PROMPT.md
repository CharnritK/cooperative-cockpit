# 02 Codex Implementation Prompt

Copy everything below into local Codex.

```text
You are local Codex acting as senior frontend engineer and implementation validator.

Objective:
Implement the OpenClaw Cooperative Cockpit static MVP UX upgrade as a bounded local-only static UI change.

Primary goal:
Make the MVP feel like a realistic user product journey:

Landing / Product Concept
→ Static Demo Entry
→ Project Hub
→ Project Initialize
→ Workbench
→ Spec Builder / Review / Preview / Decisions / Trace / Rules

Repository context:
- Repo: CharnritK/cooperative-cockpit
- App surface: apps/static-mvp/
- Static entry: apps/static-mvp/index.html
- Current stack is static vanilla HTML/CSS/JS.
- Existing validation command: npm run validate
- Optional visual commands:
  - npm run test:visual:list
  - npm run test:visual

Hard constraints:
- No backend.
- No API.
- No real auth.
- No database.
- No deployment.
- No external connectors.
- No real AI call.
- No model execution.
- No repository-write behavior from the app.
- No localStorage/sessionStorage unless already approved by repo convention.
- No dependency additions unless explicitly approved.
- No secrets.
- No private seller/customer/user data.
- No production claims.
- App must remain openable through apps/static-mvp/index.html.

Required implementation:

1. Repo reconnaissance
- Inspect apps/static-mvp/index.html.
- Inspect apps/static-mvp/src/state.js.
- Inspect apps/static-mvp/src/router.js.
- Inspect apps/static-mvp/src/mockData.js.
- Inspect apps/static-mvp/src/app.js.
- Inspect apps/static-mvp/styles/*.css.
- Inspect QA docs if present.
- Report actual file structure before editing.
- Do not invent files or APIs.

2. Add pre-workspace journey
Add routes/pages for:
- Landing
- Static Demo Entry
- Project Hub
- Project Initialize

Landing must explain:
- What OpenClaw is.
- Who it helps.
- How it turns messy product/agent ideas into governed builder-ready handoff packets.
- Three-step tutorial:
  1. Initialize project.
  2. Shape SpecGraph in Workbench.
  3. Resolve blockers and preview handoff.
- CTA: “Continue to local demo”.

Static Demo Entry:
- Must not imply real login.
- Must say local/static/mock-only.
- CTA to Project Hub.

Project Hub:
- Show card for “OpenClaw Cooperative Cockpit”.
- Show card for “Listing Compliance & Seller Appeal Review Harness”.
- Show status, open blockers, mock last edited timestamp, readiness summary.
- Include “Create from template” CTA.

Project Initialize:
- Show template cards:
  - Builder Enablement OS
  - Agent Harness SpecGraph
  - Compliance Review Workflow
- Show mock guided chat panel.
- Show selected context preview.
- CTA: “Open Workbench”.
- All state local/mock only.

3. Redesign Workbench as product editor
Create a stable Workbench layout:

Left:
- Object Outline / hierarchy explorer.
- Show Project → Requirements → Architecture → Component / Phase / Task.
- Use existing mockData nodes where possible.
- Click object to select it.
- Preserve selection.

Center:
- Spatial Board remains default.
- Mixed Map and Flat Flow remain secondary.
- Toolbar includes:
  - Board / Mixed / Flat
  - Focus lens selector
  - Fit / Reset / Zoom controls

Right:
- Object editor panel with tabs:
  - Inspector
  - Edit Fields
  - Copilot
  - Evidence
  - Trace

Bottom or dock:
- Readiness queue:
  - missing evidence
  - unlocked decisions
  - review blockers
  - validation blockers
  - handoff blockers

4. Implement object relationship highlighting
Expected behavior:
- Parent selection highlights descendants/subtree.
- Child selection highlights parent trail.
- Selected object trail highlights:
  - selected node
  - ancestors
  - descendants
  - inbound links
  - outbound links
- Board and outline selection stay synchronized.

5. Implement focus lenses
Visible lenses:
- Open work
- Missing evidence
- Unlocked decisions
- Selected object trail
- Handoff blockers

Behavior:
- Open work: highlight nodes with blockerCount > 0 or non-ready readiness.
- Missing evidence: highlight nodes with evidence gaps.
- Unlocked decisions: highlight decision/lock gaps.
- Selected object trail: highlight selected object and relationships.
- Handoff blockers: highlight readiness blockers.

6. Implement mock copilot
Copilot tab must:
- Be clearly labeled “Mock local copilot”.
- Not call AI services.
- Use selected object, selected context, blockers, evidence, and trace data.
- Show selected object summary.
- Show open blockers.
- Show suggested next edits.
- Show suggested evidence/decision actions.

Buttons:
- Preview suggestion.
- Apply to local draft.
- Mark needs Point lock.

Button behavior:
- May update appState only.
- Must not call backend/API/model.
- Must not persist to storage.
- Must not write files.

7. Fix helper no-reset behavior
Object Types and Selected Context helpers must not reset:
- selected object
- board viewport
- view mode
- focus lens
- active right panel tab
- outline expansion state

Avoid full Workbench re-render for helper open/close where practical.
If re-render is necessary, preserve state explicitly.

8. Demo scenario
Add copy and mock data for:
“Listing Compliance & Seller Appeal Review Harness”

Use mock/public/composite scenario language only.
Do not mention private marketplace systems, real seller data, credentials, or confidential sources.

Scenario must demonstrate:
- context intake
- SpecGraph shaping
- evidence linking
- review checks
- decisions/locks
- handoff packet preview

9. QA and docs
Update QA checklist if present.
Document manual checks for:
- Journey flow
- Workbench object outline
- Focus lenses
- Selected object trail
- Helper no-reset behavior
- Mock copilot local-only behavior
- Handoff gating
- No real auth/backend/API/AI/persistence

Validation:
Run:
npm run validate

If available:
npm run test:visual:list
npm run test:visual

Final response format:
Verdict:
- PASS / PASS_WITH_NOTES / FAIL

Repo reconnaissance:
- actual files inspected
- actual structure notes

Changed files:
- path
- purpose

Implementation summary:
- journey changes
- Workbench changes
- mock copilot changes
- safety boundaries preserved

Validation output:
- exact command
- exact result
- relevant output excerpt

Manual QA:
- checklist item
- PASS/FAIL
- notes

Safety checks:
- backend/API/auth/AI/storage/dependency findings

Risks:
- remaining risk
- mitigation or follow-up

Stop immediately and report if:
- dependency addition is required
- backend/API/auth/database/deployment is required
- real AI/model execution is required
- external connector is required
- private data is required
- target files are missing or materially different
- validation cannot be defined
- implementation would require full app rewrite
```

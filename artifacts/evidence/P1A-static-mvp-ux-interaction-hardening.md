# P1A Static MVP UX Interaction Hardening Evidence

Date: 2026-05-31

## Scope

Allowed app surface only:

- `apps/static-mvp/index.html`
- `apps/static-mvp/src/app.js`
- `apps/static-mvp/styles/layout.css`
- `apps/static-mvp/styles/components.css`
- pre-existing token/status edits in `apps/static-mvp/styles/base.css` and `apps/static-mvp/styles/status.css`
- `apps/static-mvp/QA_CHECKLIST.md`
- `docs/ops/STATUS.md`
- `artifacts/packages/openclaw-cooperative-cockpit-mvp.manifest.json` after Point explicitly authorized this one-file expansion
- `artifacts/evidence/**`

No dependency, persistence, backend, API, auth, database, deployment, repo-write runtime behavior, or real agent orchestration was added.

## Claude Plan Reconciliation

Already present before this slice:

- `--color-cyan` was corrected to actual cyan.
- `--text-dim` contrast was improved.
- `.skip-link` CSS existed.
- `status-pulse` was wired to `.status-active::before` and `.status-selected::before`.
- A dormant `:root[data-theme="dark"]` token block existed, but no toggle or persistence was added in this slice.

Implemented in this slice:

- Skip navigation link in the HTML shell.
- Toast container in the HTML shell.
- `aria-live="polite"` on `#readiness-count`.
- Local-only toast feedback replacing all `alert()` calls in `app.js`.
- Template and artifact selector feedback that does not mutate artifacts.
- Review finding acknowledge/defer as in-memory mock state updates only.
- Spec field reset/unlock behavior in local browser mock state only.
- Decision mock lock reset/re-lock behavior with copy that does not imply changing real Point approval.
- Canvas relationship legend mapped to existing static edge tone classes.
- Toast and legend CSS plus small active/medium-width interaction CSS.
- Safe pasted-audit follow-up items: display font usage for app/page titles, `--shadow-glow-cyan` on node hover, `--color-panel-strong` replacing stale `#f8fafc` literals in edited stylesheets, governance page header accent classes, and readiness count pulse feedback.

Deferred:

- Dark mode toggle, theme storage, and dark-mode visual override expansion. The suggested `localStorage` implementation was rejected for this P1A slice.
- Broader visual redesign, new pages, richer graph behavior, real generation, real validation, runtime orchestration, or persistence.
- Rendered/manual browser QA remains unverified because direct `file://` navigation is blocked by the in-app browser policy.

## Validation

### `npm run validate`

Result: PASS after the authorized package manifest checksum refresh.

Relevant output:

```text
check_structure: PASS
check_json: PASS
check_no_secrets: PASS
check_task_cards: PASS (0 task cards checked)
check_gitignore: PASS
check_concept_consistency: PASS
```

### Package checksum

`artifacts/packages/openclaw-cooperative-cockpit-mvp.manifest.json` was updated to:

```text
sha256:ca6864991f69d32c62352ff42e00cf35388210af622ac7c78ccb1b9dc6543d1a
```

The checksum was computed with the same sorted file-hash algorithm used by `scripts/check_concept_consistency.js`.

### Grep gates

Run via WSL Bash from repo root because `grep` is not available in PowerShell on this machine.

```text
grep -R "alert(" apps/static-mvp/src/app.js || true
```

Output: no matches.

```text
grep -R "localStorage\|sessionStorage" apps/static-mvp || true
```

Output: no matches.

```text
grep -R "Run " apps/static-mvp || true
```

Output:

```text
apps/static-mvp/QA_CHECKLIST.md:8. **Review Runs interaction** ...
apps/static-mvp/QA_CHECKLIST.md:- **GOAL-006 UI mapping** ... Review Runs labels Review Run and Finding objects ...
apps/static-mvp/src/app.js:  const reviewRun = window.appState.reviewRun || {};
apps/static-mvp/src/app.js:    kicker: 'Review Run object',
apps/static-mvp/src/app.js:    subtitle: 'Inspect-only Review Run and Finding objects. They never execute code, mutate runtime state, or touch repositories.',
apps/static-mvp/src/app.js:  scope.innerHTML = `<h3>Review Run object</h3>
apps/static-mvp/src/mockData.js:      purpose: 'Run local validation and smoke checks against the static MVP boundary.',
```

Notes:

- `Review Runs` / `Review Run object` are existing static object/page labels.
- `apps/static-mvp/src/mockData.js` is outside the allowed paths, so the existing `Run local validation...` mock-data sentence was not changed.

### Browser QA

Codex Browser Use direct `file://` QA did not run. The in-app browser rejected direct navigation to:

```text
file:///C:/Point/2026/projects/cooperative-cockpit/apps/static-mvp/index.html
```

The browser runtime also instructed the agent not to route around the policy block through alternate browser surfaces, so no rendered pass is claimed.

Fresh final attempt result:

```text
Browser Use rejected this action due to browser security policy. Reason: Browser Use cannot visit the requested page because its URL is blocked by the Browser Use URL policy. The agent must not attempt to achieve the same outcome via workaround, indirect execution, raw CDP or browser commands, alternate browser surfaces, or policy circumvention.
```

Point reported the direct normal-browser manual QA as good on 2026-05-31. This is recorded as external manual QA evidence for:

- Direct opening of `apps/static-mvp/index.html`.
- Home -> Workbench -> Spec Builder -> Review Runs -> Preview -> Decisions -> Trace -> Rules walkthrough.
- Toast feedback replacing browser alerts.
- Keyboard/focus path.
- Local mock decision lock/reset/re-lock readiness behavior.
- Width checks around 760px, 1080px, 1180px, and 1280px+.

### Readiness cycle smoke

Executed a local Node VM smoke against the static app scripts. The smoke set all local mock gates ready, reset D-005 to `needs-lock`, then re-locked it.

Output:

```text
readiness cycle PASS: before=true reset=false relock=true
```

### Source/VM route and interaction audit

Executed a stricter non-rendered audit against the current worktree. The audit verifies:

- Shell contains the skip link, `#main-content`, toast container, and readiness live region.
- The eight navigation targets remain Home, Workbench, Spec Builder, Review Runs, Preview, Decisions, Trace, and Rules.
- `app.js` has no native `alert(` calls.
- The app surface has no browser storage persistence APIs.
- `app.js` has no `fetch`, `XMLHttpRequest`, `WebSocket`, `indexedDB`, or `sendBeacon` runtime/external-call primitives.
- Template and artifact selectors contain static explanatory feedback.
- Review findings update in-memory mock state only.
- Spec reset/unlock helpers exist.
- Decision reset copy avoids real Point approval reversal semantics.
- Token/status/legend CSS and markup are present, including display-title font usage, tokenized panel backgrounds, cyan hover glow, governance header accents, and readiness count pulse feedback.
- No package dependency block was added.
- The D-005 lock/reset/re-lock readiness cycle still gates correctly.

Output:

```text
P1A source/VM audit: PASS
routes: home -> workbench -> spec-builder -> review-runs -> preview -> decisions -> trace -> rules
readiness cycle: before=true reset=false relock=true
```

## Acceptance Status

Automated validation and grep gates pass. Codex-rendered Browser Use QA remains blocked by direct `file://` policy, but Point-reported normal-browser manual QA is now recorded as passing.

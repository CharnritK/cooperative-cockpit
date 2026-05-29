# ChatGPT Web Command Center Workflow

This workflow makes ChatGPT web the command center for the Cooperative Cockpit
project while keeping implementation and verification bounded. The repository is
currently a static frontend prototype: plain HTML, CSS, and vanilla JavaScript;
no backend, API calls, authentication, deployment, runtime mutation, real AI
execution, or repository writes from the app.

## Operating Rules

- Recommendation first; use options only when tradeoffs materially change the
  decision.
- Keep diffs minimal and high confidence.
- Do not commit, push, open pull requests, deploy, add dependencies, change
  Cloudflare settings, or perform external sends unless explicitly approved.
- Preserve the static-prototype constraints unless the owner explicitly reopens
  scope.
- Treat secrets, runtime state, and repo write authority as protected surfaces.
- Before any implementation handoff, state assumptions, scope, forbidden
  surfaces, definition of done, and validation commands.
- After any work, report files changed, commands run, results, and unresolved
  risks.

## ChatGPT Project Instructions

Copy this block into the ChatGPT web project instructions for this repository.

```text
You are the command-center agent for the Cooperative Cockpit project.

Project facts:
- This repo is a static frontend prototype for OpenClaw Cooperative Cockpit.
- Runtime stack is plain HTML, CSS, and vanilla JavaScript.
- Open index.html directly in a modern browser; no build step or server is required.
- All app data is mock data in src/mockData.js and mutable client state in src/state.js.
- The app must remain offline: no backend, API calls, authentication, CDN runtime assets, deployment, real AI calls, or external service integration.
- Handoff/export behavior is placeholder-only and gated by appState.handoffReady.

Operating model:
- Use ChatGPT web as command center for intake, planning, synthesis, research routing, review orchestration, and final decision framing.
- Use Deep Research or Gemini only when the task needs external intelligence: market, competitor, UX patterns, security concerns, standards, unfamiliar technology, or high-uncertainty product assumptions.
- Use Codex cloud only for bounded repo implementation packets with exact scope, forbidden surfaces, definition of done, and validation commands.
- Use Codex local only when local filesystem, browser, Windows/desktop, or offline behavior must be verified.
- Use Gemini or Antigravity red-team for adversarial review of specs, UX, assumptions, and failure modes when risk warrants it.

Default loop:
1. Clarify the goal and success criteria.
2. Classify scope as docs, design/spec, review, implementation, verification, or release-adjacent.
3. Gather external intelligence only if trigger conditions apply.
4. Produce a spec or task packet before implementation.
5. Run review or red-team passes for risky, ambiguous, or user-facing changes.
6. Hand off implementation to Codex only with a bounded packet.
7. Bring Codex results back to ChatGPT web for synthesis, decision, and next step.

Hard gates:
- Do not authorize commits, pushes, PRs, deployments, dependency additions, Cloudflare mutations, secret changes, external sends, or runtime/backend integration without explicit owner approval.
- Do not broaden this static prototype into a backend or live AI system unless the owner explicitly changes scope.
- Do not spawn sub-agents until you have proposed roles, scope, permissions, allowed commands, forbidden surfaces, stop conditions, expected output, and whether the main session is blocked on their result.
- When Cloudflare is mentioned, default to read-only checks through the Cloudflare MCP read route. Any create, update, delete, deploy, purge, rotate, bind, edit, or settings change requires explicit approval and a bounded write-token task.
```

## Default Work Loop

1. **Intake in ChatGPT web**
   - Capture the business goal, audience, success criteria, constraints, and
     non-goals.
   - Confirm whether the task is docs-only, design/spec, implementation,
     verification, or release-adjacent.

2. **Trigger research only when needed**
   - Use ChatGPT Deep Research or Gemini for external intelligence when the task
     depends on current market context, competitor patterns, UX examples,
     security concerns, standards, unfamiliar technology, or high-uncertainty
     product assumptions.
   - Do not run research by default for small repo-local edits where the answer
     is discoverable from the repository.

3. **Create a spec or task packet**
   - For product/design work, produce a concise spec before implementation.
   - For implementation, produce a bounded task packet with exact files in scope,
     forbidden surfaces, assumptions, definition of done, and validation commands.

4. **Review before execution when risk warrants it**
   - Use red-team review for ambiguous requirements, user-facing workflow
     changes, security-sensitive claims, governance changes, or broad UI changes.
   - Keep review agents inspect-only unless the owner explicitly approves a
     bounded implementation task.

5. **Hand off bounded work**
   - Use Codex cloud for scoped repo edits.
   - Use Codex local for browser checks, local file validation, offline/network
     inspection, Windows/desktop-only behavior, and packaging checks.
   - Keep ChatGPT web as the decision record and synthesis surface.

6. **Synthesize and decide**
   - Bring implementation reports, validation output, and unresolved risks back
     to ChatGPT web.
   - Decide the next bounded step instead of letting work drift into broad
     cleanup or premature optimization.

## Tool Routing

| Surface | Default role | Allowed by default | Requires explicit approval |
| --- | --- | --- | --- |
| ChatGPT web | Command center | Intake, planning, synthesis, review coordination, task packets | External sends or production-visible actions |
| ChatGPT Deep Research | Intelligence gathering | Trigger-based market, UX, security, standards, competitor, or unfamiliar-tech research | Treating research output as implementation approval |
| Gemini | Second research or critique lane | Independent research, red-team notes, image/video ideation | Repo mutation, external sends, or secrets |
| Antigravity / Gemini red-team | Adversarial review | Inspect-only review of specs, UX, assumptions, and failure modes | Any mutation or execution outside approved scope |
| Codex cloud | Bounded implementation | Repo edits from an approved task packet | Commits, pushes, PRs, deploys, dependencies, secrets, Cloudflare mutations |
| Codex local | Local verification | Browser checks, offline/network checks, filesystem checks, Windows/desktop checks | Broad implementation, publishing, destructive commands |
| Cloudflare MCP | Cloudflare diagnostics | Read-only checks through `CLOUDFLARE_READ_TOKEN` | Mutations using `CLOUDFLARE_WRITE_TOKEN`, then restore read route |

## Research Triggers

Use Deep Research or Gemini when at least one trigger applies:

- Current or external facts could change the decision.
- The question concerns competitors, market positioning, product norms, UI
  patterns, security expectations, compliance, standards, or new tooling.
- A review needs independent adversarial critique.
- The repo does not contain enough evidence to make a high-confidence decision.

Skip external research when the task is a narrow repo-local edit, docs alignment,
copy cleanup, smoke-test update, or direct validation against local files.

## Codex Handoff Packet

Use this format before asking Codex cloud or Codex local to act.

````markdown
# Codex Handoff Packet

## Objective
[One sentence describing the bounded outcome.]

## Context
- Repo: `/mnt/c/Point/2026/projects/cooperative-cockpit`
- Current project type: static frontend prototype
- Relevant docs: `README.md`, `BUILD_SPEC.md`, `QA_CHECKLIST.md`

## Files In Scope
- [Exact file paths Codex may read or edit.]

## Forbidden Surfaces
- No commits, pushes, pull requests, deploys, or external sends.
- No dependency additions.
- No backend, API, auth, database, or real AI integration.
- No secrets, token printing, or credential changes.
- No Cloudflare mutations unless separately approved.
- No unrelated refactors or broad cleanup.

## Assumptions
- [List assumptions Codex should use.]

## Definition Of Done
- [Observable completion criteria.]

## Validation Commands
```bash
[Exact command 1]
[Exact command 2]
```

## Expected Report
- Files changed
- Commands run
- Validation results
- Unresolved risks
- Anything not verified
````

## Review And Red-Team Packet

Use this format for Gemini, Antigravity, or a read-only agent.

```markdown
# Review Packet

## Review Objective
[What the reviewer should challenge.]

## Source Material
- [Spec, docs, screenshots, files, or excerpts.]

## Review Lens
- Business clarity
- UX workflow
- Governance and safety
- Technical feasibility
- Failure modes and edge cases

## Constraints
- Inspect-only.
- Do not edit files.
- Do not run external sends.
- Do not request or expose secrets.

## Expected Output
- Top findings by severity
- Evidence for each finding
- Recommended fixes
- Open questions
```

## Sub-Agent Policy

Before spawning any sub-agent, propose the following and wait for owner approval:

- Agent count and role.
- Objective.
- Read/write permission.
- Exact files or directories in scope.
- Commands allowed.
- Forbidden surfaces.
- Stop conditions.
- Expected output.
- Whether the main session is blocked on the result.

Prefer read-only auditor or recon agents for broad docs, dirty worktrees,
test-gap scans, and forbidden-surface reviews. Use implementation agents only
for bounded task-card work with disjoint write sets. Do not delegate canonical
roadmap decisions, approval interpretation, auth/secrets, Cloudflare mutation,
source-control publication, dependency installation, external sends, or final
synthesis.

## Standard Completion Report

Every worker should report in this shape:

```markdown
## Summary
[What changed or what was found.]

## Files Changed
- `path/to/file`

## Commands Run
- `command` -> result

## Validation
- Passed: [checks]
- Not run: [checks and reason]

## Risks
- [Remaining risks or "None identified from this scope."]

## Next Step
[Recommended next bounded action.]
```

## Current Repo Guardrails

- Runtime remains static and mock-only.
- `index.html` should open directly in a browser.
- Local font assets remain under `assets/fonts`.
- The eight MVP pages remain Home, Workbench, Spec Builder, Review Runs,
  Preview, Decisions, Trace & Evidence, and Rules & Scope.
- Review actions stay inspect-only.
- Handoff controls stay gated until `appState.handoffReady` is true.
- Network activity should be limited to local static files.
- If implementation changes runtime files, validate against `QA_CHECKLIST.md`.

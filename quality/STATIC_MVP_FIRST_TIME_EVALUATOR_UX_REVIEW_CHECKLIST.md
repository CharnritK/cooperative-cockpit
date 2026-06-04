# Static MVP First-Time Evaluator UX Review Checklist

Status: Current QA aid
Scope: Static MVP UX readiness only

Use this checklist with a person who has not recently worked on the repo. Time-box the first pass to 2 minutes before explaining terms or intent.

## Setup

- [ ] Open `apps/static-mvp/index.html`.
- [ ] Start from Landing.
- [ ] Do not explain the product before the evaluator speaks.
- [ ] Record viewport, browser, date, evaluator role, and whether any hints were given.

## Two-Minute Product Comprehension

- [ ] Evaluator can state that OpenClaw helps turn rough context into a governed builder-ready handoff.
- [ ] Evaluator can identify the local journey from Landing to Workbench.
- [ ] Evaluator understands this is a static/local preview, not a connected service.

Fail if the evaluator thinks the app is mainly a generic dashboard, task runner, login portal, or visual design gallery.

## Workbench Macro-Layer Clarity

- [ ] Evaluator can identify Context, SpecGraph, and Handoff Gates as the primary Workbench macro layers.
- [ ] Evaluator understands Object Outline, Spatial Board, Inspector, Trace, focus lenses, Mixed Map, and Flat Flow are drill-down depth, not separate product promises.
- [ ] Evaluator can select an object and describe why the right panel changed.

Fail if Workbench reads as a decorative graph or if the macro layers are hidden by canvas/detail density.

## SpecGraph And Handoff-Gate Understanding

- [ ] Evaluator can explain that selected context feeds the governed SpecGraph/spec draft.
- [ ] Evaluator can explain that D-005, evidence, validation, and review blockers keep Handoff unavailable.
- [ ] Evaluator can find at least one route or control that explains a blocker.

Fail if the evaluator thinks Handoff should produce a real file, commit, deployment, or external action from the local UI.

## No Fake-Auth Or Fake-AI Confusion

- [ ] Demo Entry makes clear there is no real login, auth, backend, connector, or private workspace.
- [ ] Mock local copilot makes clear there are no AI calls, backend calls, or files written.
- [ ] Project Initialize transcript reads as static mock guidance, not a live assistant session.

Fail if the evaluator asks where credentials go, expects a real workspace connection, or believes the copilot generated live output.

## Handoff Readiness Clarity

- [ ] Evaluator can identify whether Handoff is ready or blocked.
- [ ] Evaluator can name the next page or control they would use to clear the largest blocker.
- [ ] Evaluator can distinguish local readiness from real Point approval.

Fail if the evaluator cannot tell why Handoff is disabled or mistakes local browser state for real approval.

## Evidence To Record

- [ ] Product comprehension summary in evaluator words.
- [ ] Most confusing route or control.
- [ ] First blocker the evaluator noticed.
- [ ] Any fake-auth, fake-AI, or fake-handoff confusion.
- [ ] Recommendation: pass, pass with follow-up, or fail.

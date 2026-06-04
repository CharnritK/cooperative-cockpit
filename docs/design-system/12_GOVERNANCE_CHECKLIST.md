# 12 — Governance Checklist

## Design system readiness

- [x] `CODEX_START_HERE.md` exists at package root.
- [x] `MANIFEST.md` lists read order and file tree.
- [x] Path references are reconciled against current evidence paths.
- [x] Validation claims are backed by evidence records and exact command output.
- [x] No backend/API/auth/database/deployment/live-agent scope introduced.

## Storybook readiness

- [x] DS-002A executed after DS-001 only.
- [x] Package manager detected before dependency/script changes.
- [x] Storybook is dev/test only.
- [x] Required component states are documented for the representative DS-002A story.
- [x] No app runtime behavior changed for stories.

## Playwright readiness

- [x] DS-002B executed separately from DS-002A.
- [x] Package manager detected before dependency/script changes.
- [x] Viewport matrix includes 760, 1080, 1180, and 1280+.
- [x] Evidence storage path is approved.
- [x] No visual pass claimed without output.
- [x] Candidate screenshots reviewed as candidate evidence.
- [x] Candidate screenshots promoted to approved baselines.

## Token readiness

- [x] Raw-to-semantic token audit completed.
- [x] Candidate tokens parse as JSON.
- [x] Contrast status recorded where possible.
- [x] Dify-inspired direction translated, not copied.
- [ ] Final token approval recorded.

## Mock data readiness

- [x] Mock data JSON parses.
- [x] Schema parses.
- [x] No real PII/secrets.
- [x] Required entities and relationships represented.

## Screen registry readiness

- [x] Old eight-page cap replaced with governed registry.
- [x] Current product-canon route count reconciled to GOAL-021 twelve local routes.
- [x] Registry does not claim implementation without evidence.
- [x] New screens require Point approval.

## Status semantics readiness

- [x] Status-language canon documented.
- [x] App QA references status-language canon.
- [x] `review-blocked` visual semantics cleanup approved.

## Codex handoff readiness

- [x] Every goal has allowed paths.
- [x] Every goal has forbidden actions.
- [x] Every goal has validation commands.
- [x] Every goal has stop conditions.
- [x] Every goal has final response format.

## Point approval gates

| gate | reviewer | pass condition | fallback |
|---|---|---|---|
| dependency/tooling | Point | Storybook/Playwright dev-only scope confirmed | split or stop |
| token finalization | Point/design reviewer | token audit and contrast acceptable | keep candidate status |
| visual baseline promotion | Point/design reviewer | reviewed candidate screenshots accepted as approved baselines | keep candidate status |
| app runtime changes | Point | exact file/scope approved | stop |
| new screen implementation | Point | screen contract approved | leave registry-only |
| milestone acceptance | Point/QA | validation and evidence complete | revise or split |

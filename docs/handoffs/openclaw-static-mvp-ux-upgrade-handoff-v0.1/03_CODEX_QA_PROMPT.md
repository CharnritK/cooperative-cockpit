# 03 Codex QA Prompt

Copy everything below into local Codex after implementation.

```text
You are local Codex acting as QA reviewer.

Task:
Review the static MVP UX upgrade implementation. Do not add new features unless required to fix validation or critical acceptance failures.

Scope:
- apps/static-mvp/
- QA docs if present
- docs/ops/STATUS.md only if already changed by implementation

Validate:
1. Landing → Demo Entry → Project Hub → Project Initialize → Workbench.
2. No real login/auth wording.
3. Project cards and templates render.
4. Workbench has:
   - Object Outline
   - Spatial Board
   - Right tabbed panel
   - Readiness queue
5. Board / Mixed / Flat still work.
6. Object selection syncs outline, board, and right panel.
7. Parent/child trail highlighting works.
8. Focus lenses work.
9. Helpers do not reset board/selection state.
10. Mock copilot is local/static only.
11. Existing pages remain reachable.
12. Handoff gating remains safe.
13. No backend/API/auth/database/AI/external connector/storage/dependency added.

Run:
npm run validate

Run if available:
npm run test:visual:list
npm run test:visual

Report:
- PASS / PASS_WITH_NOTES / FAIL
- exact commands run
- exact output excerpts
- changed files if fixes were made
- remaining risks
- required follow-up
```

# Codex Goal Prompt Template

```text
/goal
Title: [GOAL-ID] — [short title]

Objective:
[bounded objective]

Allowed paths:
- [exact write path]

Forbidden actions:
- No backend/API/auth/database/deployment.
- No runtime mutation or external connectors.
- No secrets or real PII.
- No files outside allowed paths.

Required work:
1. Read listed files.
2. Inspect only needed repo areas.
3. Make bounded changes.
4. Run validation.
5. Report exact output.

Acceptance criteria:
- [testable criterion]

Validation commands:
- [command] => expected result / failure meaning

Stop conditions:
- Stop if dependency, architecture, product, or path scope changes are needed.

Final response format:
Verdict:
Files inspected:
Files changed:
Validation output:
Blockers:
Scope deviations:
Next recommended goal:
```

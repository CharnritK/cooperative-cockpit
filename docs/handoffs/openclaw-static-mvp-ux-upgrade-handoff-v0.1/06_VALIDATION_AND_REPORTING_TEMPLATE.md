# 06 Validation and Reporting Template

## Required commands

Minimum:

```bash
npm run validate
```

Optional, if configured:

```bash
npm run test:visual:list
npm run test:visual
```

## Required final report from Codex

```text
Verdict:
- PASS / PASS_WITH_NOTES / FAIL / BLOCKED

Repo reconnaissance:
- Files inspected:
- File structure notes:
- Any unexpected paths:

Changed files:
- path:
  purpose:
  risk:

Implementation summary:
- Journey changes:
- Workbench changes:
- Mock copilot changes:
- Static safety boundaries preserved:

Validation output:
- command:
- result:
- relevant output excerpt:

Manual QA:
- Landing flow:
- Static demo entry:
- Project Hub:
- Project Initialize:
- Workbench outline:
- Focus lenses:
- Selected object trail:
- Helper no-reset:
- Mock copilot local-only:
- Existing pages:
- Handoff gating:

Safety checks:
- backend/API/auth:
- real AI/model calls:
- storage:
- dependency changes:
- secrets/private data:

Fixes made:
- issue:
- fix:
- file:

Remaining risks:
- risk:
- mitigation:

Next recommended action:
- action:
```

## Acceptance rule

Do not mark PASS unless:

- `npm run validate` ran and passed;
- critical manual QA items pass;
- no hard constraint was violated;
- changed files are listed;
- remaining risks are explicit.

## BLOCKED conditions

Use BLOCKED if:

- repo structure cannot be inspected;
- validation command is unavailable or cannot run;
- implementation requires forbidden capability;
- target files are materially different;
- app cannot be opened locally;
- private data or secrets are required.

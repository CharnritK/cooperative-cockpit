# 05 UI State and Screen Mapping

## Existing pages/screens found

- Home
- Workbench
- Spec Builder
- Review Runs
- Preview
- Decisions
- Trace & Evidence
- Rules & Scope

## Required page/panel mapping

Home should orient the primary artifact and pending gates.

Workbench should show context selection and protected exclusions.

Spec Builder should show spec readiness, acceptance criteria, and field status.

Review Runs should show inspect-only checks and findings.

Decisions should show D-005 as the handoff gate.

Trace & Evidence should show evidence completeness.

Preview should show static handoff preview information without real export.

Rules & Scope should show non-runtime guardrails.

## Required UI states

- Draft
- Context selected
- Ready for review
- Review complete
- Finding open
- Decision pending
- Decision locked
- Evidence attached
- Validation passed
- Validation warning
- Validation blocked
- Handoff blocked
- Handoff ready

## Static display behavior

States may change through local browser interactions only.

Any handoff preview should be static or alert-based.

## Forbidden runtime implications

Avoid “Run,” “Execute,” “Deploy,” “Publish,” “Launch,” “Trigger,” and “Start Agent.”

Allowed page title: “Review Runs.”

## Page-count risk

Do not add a new page for Golden Scenarios. Use current pages and panels.

# Review Gates

| gate_id | reviewer | review_scope | pass_condition | fallback |
|---|---|---|---|---|
| RG-001 | Point | product lock | SpecGraph approved | revise docs |
| RG-002 | QA | static guardrails | no scope creep | block app work |
| RG-003 | Security/QA | code lens | no parser/source risk | defer lens |
| RG-004 | Point | dependencies | explicit approval | no dependency |
| RG-005 | Security | privacy | no secrets/PII | redact/revise |
| RG-006 | Point | public demo | claims accurate | downgrade claims |
| RG-007 | Reviewer | Codex output | validation evidenced | patch/revise |
| RG-008 | Product | reuse patterns | quality gate passed | keep draft |
| RG-009 | Data/BI | dashboard scenario | KPI/source clear | block handoff |
| RG-010 | Engineering | architecture | spec-derived only | revise nodes |

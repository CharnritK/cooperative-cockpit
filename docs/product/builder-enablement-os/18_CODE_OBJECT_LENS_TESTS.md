# Code-Object Explorer Lens Tests

| test_id | requirement | method | pass |
|---|---|---|---|
| CO-001 | static fixture | source review | mock only |
| CO-002 | selected object | UI review | one focus |
| CO-003 | no repo graph | UI review | bounded |
| CO-004 | no parser/LSP runtime | implementation scan | absent |
| CO-005 | no source upload affordance | implementation scan | absent |
| CO-006 | evidence refs | fixture | present |
| CO-007 | facts/findings | UI | separated |
| CO-008 | AI annotation | UI | labeled |
| CO-009 | review packet | UI | static |
| CO-010 | no secrets | source | absent |
| CO-011 | dependency gate | package | no parser deps |
| CO-012 | Point-lock | docs | required |

Docs must mention parser/LSP/source-upload prohibitions. Those terms are only failures when they appear as runtime behavior, dependencies, or UI affordances.

# Unit Test Checklist

## Concept consistency

| test_id | target | behavior | expected | priority |
|---|---|---|---|---:|
| UT-CON-001 | concept script | hierarchy | SpecGraph first | P0 |
| UT-CON-002 | concept script | forbidden terms | no runner | P0 |
| UT-CON-003 | concept script | code lens | specialist | P0 |
| UT-CON-004 | concept script | static scope | no backend/API | P0 |

## Mock data and fixtures

| test_id | target | behavior | expected | priority |
|---|---|---|---|---:|
| UT-MOCK-001 | mockData | core entities | present | P0 |
| UT-MOCK-002 | mockData | protected exclusions | sealed | P0 |
| UT-SG-001 | SpecGraph fixture | scenarios | 4 | P0 |
| UT-SG-002 | SpecGraph schema | parse | valid | P0 |
| UT-SG-003 | fixture validation | schema mismatch | detected | P0 |
| UT-SG-004 | guardrails | forbidden absent | true | P0 |

## Readiness and handoff

| test_id | target | behavior | expected | priority |
|---|---|---|---|---:|
| UT-READY-001 | readiness | unresolved specs | blocked | P0 |
| UT-READY-002 | readiness | missing evidence | blocked | P0 |
| UT-READY-003 | readiness | decision open | blocked | P0 |
| UT-HAND-001 | handoff | blocked state | disabled | P0 |
| UT-HAND-002 | handoff | packet preview | derived | P0 |
| UT-HAND-003 | handoff click | ready/blocked | local only | P0 |

## Evidence / decisions / exclusions

| test_id | target | behavior | expected | priority |
|---|---|---|---|---:|
| UT-EV-001 | evidence | refs | valid | P0 |
| UT-EV-002 | decision | refs | valid | P0 |
| UT-PROT-001 | protected | list | shown sealed | P0 |
| UT-PROT-002 | context add | protected item | blocked | P0 |

## Routes, labels, static checks

| test_id | target | behavior | expected | priority |
|---|---|---|---|---:|
| UT-ROUTE-001 | nav | page count | 8 | P0 |
| UT-LABEL-001 | source | unsafe verbs | absent | P0 |
| UT-STATIC-001 | source | network APIs | absent | P0 |
| UT-STATIC-002 | source | storage APIs | absent | P0 |
| UT-STATIC-003 | package | dependency drift | none | P0 |

## Code-object lens

| test_id | target | behavior | expected | priority |
|---|---|---|---|---:|
| UT-CODE-001 | fixture | CodeObject | evidence | P0 |
| UT-CODE-002 | fixture | relation edge | bounded | P0 |
| UT-CODE-003 | fixture | EvidenceRef | range/hash | P0 |
| UT-CODE-004 | UI | annotation | suggestion | P0 |
| UT-CODE-005 | docs | parser | Point-lock | P0 |

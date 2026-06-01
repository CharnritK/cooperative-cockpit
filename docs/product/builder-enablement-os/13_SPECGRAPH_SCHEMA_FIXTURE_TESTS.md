# SpecGraph Schema and Fixture Tests

## Known QA issue

`fixtures/specgraph-demo-fixtures.json` is a scenario package. It should not be assumed to validate directly against `schemas/specgraph.schema.json`.

## JSON / schema tests

| test_id | target | assertion | expected |
|---|---|---|---|
| SG-J-001 | schema | valid JSON | parse ok |
| SG-J-002 | fixture | valid JSON | parse ok |
| SG-J-003 | schema | required root fields | present |
| SG-J-004 | fixture | root shape | adapter required |
| SG-J-005 | fixture | scenario count | 4 |
| SG-J-006 | schema | node kind enum | expected values |
| SG-J-007 | schema | lifecycle enum | expected values |
| SG-J-008 | schema | relation type | non-empty string until Point approves a relation enum |
| SG-J-009 | schema | lock fields | required |
| SG-J-010 | fixture | static guardrails | present |

## Semantic tests

| test_id | assertion | expected |
|---|---|---|
| SG-S-001 | each scenario has lens | exists |
| SG-S-002 | portfolio complexity | low |
| SG-S-003 | BI complexity | medium |
| SG-S-004 | config complexity | high |
| SG-S-005 | code lens complexity | technical |
| SG-S-006 | SpecGraph hierarchy | present |
| SG-S-007 | code lens boundary | specialist lens |
| SG-S-008 | static scope | guardrails present |

## Negative tests

| test_id | mutation | expected |
|---|---|---|
| SG-N-001 | invalid node kind | reject |
| SG-N-002 | invalid status | reject |
| SG-N-003 | missing mission | reject |
| SG-N-004 | missing backend guardrail | reject |
| SG-N-005 | parser flag | reject |
| SG-N-006 | raw reusable pattern | reject |
| SG-N-007 | handoff no criteria | reject |

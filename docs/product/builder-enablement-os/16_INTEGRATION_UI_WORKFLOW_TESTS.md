# Integration / UI / Workflow Tests

## Scenario A — Portfolio Website

| field | expected |
|---|---|
| setup | `scenario-portfolio` |
| lens | Guided Flow |
| workflow | mission → idea → lock → spec → handoff |
| UI | cards, not canvas-first |
| readiness | content warning |
| handoff | Portfolio Build Packet |
| failure | no CTA, no pattern, canvas dominance |

## Scenario B — Power BI + Databricks

| field | expected |
|---|---|
| setup | `scenario-powerbi-databricks` |
| lens | Lineage / Impact Map |
| workflow | KPI → source → model → QA → handoff |
| UI | lineage lanes |
| readiness | source evidence blocked |
| handoff | BI Dashboard Change Packet |
| failure | vague KPI, no source, no reconciliation |

## Scenario C — OpenClaw Config

| field | expected |
|---|---|
| setup | `scenario-openclaw-config` |
| lens | Control Plane |
| workflow | channel → policy → secrets → rollback |
| UI | control plane with gates |
| readiness | research warning |
| handoff | Config Change Packet |
| failure | token shown, live execution, rollback missing |

## Scenario D — Code-Object Lens

| field | expected |
|---|---|
| setup | `scenario-code-object-lens` |
| lens | Code Review Lens |
| workflow | object → edges → evidence → findings |
| UI | bounded object graph |
| readiness | static fixture |
| handoff | Technical Review Packet |
| failure | repo graph, parser implied, AI as fact |

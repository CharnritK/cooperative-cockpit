# Spec CI and Readiness Gates

## Purpose

Spec CI checks whether a SpecGraph is ready for handoff.

It does not execute code, deploy, or call external services.

## Required checks

| check | pass condition |
|---|---|
| Intent | mission complete |
| Non-goals | protected surfaces clear |
| Ideas | raw nodes resolved |
| Functional spec | accepted specs exist |
| Evidence | risky claims supported |
| Decisions | locks resolved |
| Architecture | specs covered |
| Build units | architecture covered |
| Phases | after build units |
| Ownership | owner assigned |
| Handoff | criteria included |
| Static guardrail | no forbidden scope |
| Reuse | quality gate passed |

## Static MVP guardrail checks

- No backend.
- No API.
- No auth.
- No database.
- No deployment.
- No runtime mutation.
- No real AI execution.
- No external connector.
- No MCP.
- No repo write from app.
- No secrets.
- No new dependency without Point lock.

## Code-object lens checks

- No whole-repo graph.
- No parser or LSP in static MVP.
- No source-code upload.
- Every finding has evidence.
- AI annotations are marked as suggestions.
- Facts, findings, and annotations are separated.

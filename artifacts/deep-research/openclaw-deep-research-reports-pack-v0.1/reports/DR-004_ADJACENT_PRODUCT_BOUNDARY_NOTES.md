# DR-004 — Adjacent Product Boundary Notes

Readiness: READY_WITH_ASSUMPTIONS  
Purpose: Define what OpenClaw static MVP should not become.

## Boundary thesis

Adjacent products are useful for UX and terminology comparison, but OpenClaw static MVP should not compete as a runtime workflow builder or agent execution platform.

## Product boundary table

| product/category | useful pattern | avoid copying for static MVP |
|---|---|---|
| Dify | Visual workflow studio, clear node/status surfaces, app-building framing | Runtime workflow execution, tool/data-source integration, deployment semantics |
| n8n | Node/action/trigger workflow clarity | Automation execution, credentials, integrations, API workflows |
| Flowise | Agentflow/chatflow visual concepts, node clarity | Agent orchestration, flow state, tool execution, prediction/API endpoints |
| LangGraph | State graph mental model | Actual graph runtime, checkpointers, execution semantics |
| LangSmith | Trace/eval visibility | Production observability platform semantics |
| OpenAI Agents SDK | Handoffs/tools/sessions vocabulary | Real agent runner, tools, sessions, tracing runtime |
| Microsoft Copilot Studio | Governance around agents/topics/flows | Enterprise agent runtime and workflow integration scope |
| MCP | Resources/tools/prompts split | Client/server protocol implementation, connectors, tool invocation |

## OpenClaw adaptation rule

Use adjacent products only to improve static UI language and governance clarity.

Do not import:

- runtime nodes
- triggers
- credentials
- connectors
- tool calls
- deployment
- execution histories
- live traces
- sessions
- queues
- event streams

## Dify-clone risk checklist

OpenClaw is drifting if it adds:

- draggable executable nodes
- node configuration drawers for tools/APIs
- trigger/action catalog
- workflow publish/deploy controls
- execution logs
- credential setup
- connector marketplace
- real run/test buttons

## Safe static equivalents

| unsafe/runtime concept | safe static equivalent |
|---|---|
| Run workflow | Validate static readiness |
| Execute agent | Inspect advisory review |
| Tool connector | Evidence/source reference |
| Runtime node | Context Node |
| Export to repo | Handoff preview |
| Execution log | Validation evidence note |
| Credential | Protected exclusion |

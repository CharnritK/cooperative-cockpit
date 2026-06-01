# Decision Memo — Builder Enablement OS Product Lock

## Decision required

Whether to lock OpenClaw Cooperative Cockpit as Builder Enablement OS centered on SpecGraph.

## Recommendation

Approve the lock.

## Recommended lock statement

OpenClaw Cooperative Cockpit is a Builder Enablement OS centered on SpecGraph.

SpecGraph is the primary product artifact. Workbench is a lens/editor for SpecGraph, not the product center. Nodes are reusable spec, architecture, build, evidence, and decision objects, not workflow execution blocks. Handoff Packets are bounded builder/team/agent briefs, not runtime actions.

The code-object explorer research is accepted as review-stage research and may inform a specialized evidence-linked technical lens. It does not authorize parser, LSP, indexing, backend, dependency, connector, MCP, repo ingestion, source-code upload, deployment, or runtime work.

## Options

- Keep canvas-first product: not recommended.
- Lock Builder Enablement OS: recommended.
- Pivot to code-object explorer: too narrow.
- Pivot to AI output reviewer: too small.

## Risks

- “OS” may imply runtime execution.
- SpecGraph may sound abstract.
- Current Workbench copy may conflict.
- Code-object explorer may cause scope creep.

## Mitigation

Define OS as pre-execution spec/governance/handoff layer. Anchor the product with demo scenarios. Keep static MVP guardrails.

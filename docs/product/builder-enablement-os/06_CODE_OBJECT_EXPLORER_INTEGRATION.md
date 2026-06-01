# Code-Object Explorer Integration

## Status

Research-informed specialist lens. Not implementation approval.

## Research package

Source package: `openclaw-code-object-explorer-research-pack-v0.2.zip`  
Repo provenance copy: `artifacts/packages/openclaw-code-object-explorer-research-pack-v0.2.zip`  
SHA-256: `9c3fca4ef7df6a733e801a4f81bfee6010ce97ab0432f69c4ff11f26e8005669`  
Readiness: READY_FOR_REVIEW / NOT_READY_FOR_IMPLEMENTATION

## Product role

The code-object explorer is a technical lens inside Builder Enablement OS.

It is not the product center.

## Approved wedge

Evidence-linked code-object review:

1. Select a code object.
2. See bounded relationships.
3. Inspect exact evidence.
4. Attach finding or annotation.
5. Produce review/handoff packet.

## Mapping to SpecGraph

| research concept | SpecGraph concept |
|---|---|
| CodeObject | Code Object Node |
| RelationEdge | Relation Edge |
| EvidenceRef | Evidence Resource |
| ReviewFinding | Risk / QA Finding |
| AgentAnnotation | AI proposal |
| Review packet | Handoff Packet |

## Static MVP allowed

- Static mock CodeObject fixtures.
- Static relation edges.
- Static evidence references.
- Static findings.
- Static annotations.
- Bounded selected-object graph.
- Evidence inspector.

## Requires Point lock

- Parser.
- LSP.
- Tree-sitter.
- SCIP.
- Kythe.
- CodeQL.
- Joern.
- Backend.
- Persistent index.
- Real repo ingestion.
- Source-code upload.
- New dependency.
- External connector.
- MCP.

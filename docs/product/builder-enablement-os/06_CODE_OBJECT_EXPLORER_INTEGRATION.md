# Code-Object Explorer Integration

## Status

Research-informed specialist lens. Not implementation approval.

Static MVP specialist lens fixture implemented on 2026-06-04. This is not approval for parser/LSP/indexing, backend, external connectors, source upload, or repository write behavior.

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
- Bounded selected-object review neighborhood.
- Evidence inspector.

## Static MVP implementation

GOAL-019 adds the following local-only fixture and UI surfaces:

- `window.mockData.codeObjectLens` defines one selected Workbench object anchor: `comp-2` / `Inspector & Sidebar Rails`.
- `window.mockData.codeObjects` lists the selected function-sized object plus immediate neighbor functions by id, name, kind, role and summary only. No source body is embedded.
- `window.mockData.relationEdges` describes bounded selected-object relations with evidence ids.
- `window.mockData.evidenceRefs` provides human-readable evidence labels for review chips.
- `window.mockData.reviewFindings` keeps every finding evidence-linked through a non-empty `evidence_ids` array.
- `window.mockData.agentAnnotations` separates AI commentary from static facts and review findings.
- `apps/static-mvp/src/app.js` renders the lens inside the existing Workbench object editor panel when `code_review_lens` is active or the anchor Workbench object is selected.

This is an inert fixture and right-panel rendering slice only. It does not create a route, dependency, backend service, source intake, persistent index, live analyzer, generated-code claim, or app-side write behavior.

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

# Source Register

Status: Current source register

| source_id | source_title | source_reference | source_type | credibility | relevance | used_for |
|---|---|---|---|---:|---:|---|
| S001 | Prior OpenClaw repo inspection summary | Conversation context | Repo-derived summary | 4 | 5 | Static MVP state, file paths, constraints |
| S002 | Current user request | Conversation context | User instruction | 5 | 5 | Package objective and zip requirement |
| S003 | FSBP instructions uploaded to current conversation | Uploaded files | Project instructions | 5 | 4 | Packaging rules, handoff boundaries, review gates |
| S004 | Existing OpenClaw static MVP synthesis in conversation | Conversation context | Prior analysis | 4 | 5 | Roadmap, object model, Codex sequence |
| S005 | Official adjacent-product docs | External comparator from prior synthesis | Official docs | 4 | 3 | Dify/n8n/Flowise/MCP boundary framing |
| S006 | Deep Research report | `docs/research/deep-research-report.md` | Repo document | 4 | 4 | Scenario framing and scope traps |
| S007 | Deep research report pack | `artifacts/deep-research/openclaw-deep-research-reports-pack-v0.1/` | Archived/extracted package | 4 | 4 | Historical research evidence |

## Caveat

Historical package registers may still describe Deep Research as absent. This register is the current product source index.

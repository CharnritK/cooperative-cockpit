# 09 Decision Log

## Locked decisions

| decision_id | decision | rationale | status |
|---|---|---|---|
| D-001 | Use static demo entry, not real login | Avoid false auth promise | Locked |
| D-002 | Preserve static/offline/mock-only boundary | Current MVP scope | Locked |
| D-003 | Keep Spatial Board as default Workbench view | Existing product direction | Locked |
| D-004 | Add hierarchy outside board | Board alone is hard to understand | Locked |
| D-005 | Add mock local copilot | Shows AI value without real AI calls | Locked |
| D-006 | Use concrete scenario copy | Current demo too abstract | Locked |
| D-007 | Keep Handoff gated | Safety/governance requirement | Locked |
| D-008 | Let local Codex validate | Tests must be run in local repo | Locked |

## Deferred decisions

| decision_id | decision | reason_deferred |
|---|---|---|
| DD-001 | Real authentication | Requires backend/auth scope |
| DD-002 | Real AI copilot | Requires model/API/privacy scope |
| DD-003 | Persistent projects | Requires storage/database scope |
| DD-004 | External connectors | Requires connector/security review |
| DD-005 | Production deployment | Out of static MVP scope |

## Decision boundary

This package authorizes only a static UX implementation handoff.

It does not authorize production infrastructure, external actions, real data processing, or public claims.

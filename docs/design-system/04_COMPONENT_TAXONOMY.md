# 04 — Component Taxonomy

## Goal

Create semantic component organization that scales beyond the current static MVP without broad refactors.

## Recommended folders

```text
components/
  primitives/
  shell/
  navigation/
  layout/
  data-display/
  feedback/
  governance/
  evidence/
  workflow/
  forms/
  overlays/
```

## Category definitions

| category | purpose | examples |
|---|---|---|
| primitives | small reusable UI atoms | Button, Badge, Icon, Separator |
| shell | app frame | AppShell, TopBar, Sidebar |
| navigation | movement and commands | CommandBar, Tabs, Breadcrumbs |
| layout | structural wrappers | Card, SectionHeader, SplitPane |
| data-display | tables and metrics | DataTable, KpiCard, TraceTimeline |
| feedback | UI states and alerts | Toast, EmptyState, WarningState |
| governance | approvals and constraints | GovernanceStrip, StaticMockDisclaimer |
| evidence | evidence surfaces | EvidenceCard, ArtifactReferenceCard |
| workflow | canvas/operator visuals | WorkflowCanvas, OperatorNodeCard, NodePalette |
| forms | inputs and filters | FilterBar, FieldRow |
| overlays | layered surfaces | Drawer, Modal, InspectorPanel |

## Naming rules

- Use PascalCase for components.
- Use domain nouns when the concept is OpenClaw-specific: `EvidenceCard`, `HandoffPacketCard`.
- Use generic names only for generic primitives: `Card`, `Tabs`, `Drawer`.
- Avoid abbreviations unless domain-standard.
- File name should match component export name.
- Story file should match component: `EvidenceCard.stories.tsx`.

## Migration guidance

1. Inventory existing files before renaming.
2. Create stories first; do not refactor blindly.
3. Prefer adapter wrappers over broad rewrites.
4. Rename only when the old name causes real ambiguity.
5. Record migration notes in evidence before app runtime changes.

## Anti-patterns

- `GenericCard1`, `DashboardThing`, `NewComponent`.
- Folder names based on temporary pages rather than reusable purposes.
- Mixing evidence, governance, and workflow components in a single catch-all folder.
- Refactoring runtime code just to satisfy taxonomy without Point approval.

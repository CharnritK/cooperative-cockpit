const fs = require('fs');

const requiredPaths = [
  'AGENTS.md',
  'README.md',
  'MANIFEST.md',
  'OPERATING_WORKFLOW.md',
  'package.json',
  '.gitignore',
  '.env.example',
  'apps/README.md',
  'apps/static-mvp/index.html',
  'apps/static-mvp/README.md',
  'apps/static-mvp/BUILD_SPEC.md',
  'apps/static-mvp/QA_CHECKLIST.md',
  'apps/static-mvp/src/app.js',
  'apps/static-mvp/src/mockData.js',
  'apps/static-mvp/src/state.js',
  'apps/static-mvp/styles/base.css',
  'apps/static-mvp/assets/favicon.svg',
  'apps/static-mvp/handoff/handoff-placeholder.json',
  'apps/static-mvp/handoff/manifest.json',
  'artifacts/MANIFEST_TEMPLATE.json',
  'artifacts/packages/openclaw-cooperative-cockpit-mvp.manifest.json',
  'docs/copilot-role-wrapper.md',
  'docs/design-system/00_CODEX_ABSORB_FIRST.md',
  'docs/design-system/01_DECISIONS_AND_PRODUCT_LOCKS.md',
  'docs/design-system/02_DESIGN_OPERATING_MODEL.md',
  'docs/design-system/03_TOKEN_SYSTEM.md',
  'docs/design-system/04_COMPONENT_TAXONOMY.md',
  'docs/design-system/05_COMPONENT_CONTRACTS.md',
  'docs/design-system/06_SCREEN_REGISTRY.md',
  'docs/design-system/07_MOCK_DATA_CONTRACT.md',
  'docs/design-system/08_STORYBOOK_CONTRACT.md',
  'docs/design-system/09_PLAYWRIGHT_VISUAL_QA_CONTRACT.md',
  'docs/design-system/10_CODEX_HANDOFF_CONTRACT.md',
  'docs/design-system/11_WORKFLOW_STUDIO_STYLE_BRIEF.md',
  'docs/design-system/12_GOVERNANCE_CHECKLIST.md',
  'docs/design-system/prompts',
  'docs/design-system/tokens',
  'docs/design-system/mock-data/openclaw.mock-data.v1.json',
  'docs/design-system/schemas/screen-contract.schema.json',
  'docs/design-system/schemas/screen-contracts',
  'docs/design-system/schemas/openclaw-mock-data.schema.json',
  'docs/design-system/schemas/component-contract.schema.json',
  'docs/design-system/schemas/visual-baseline.schema.json',
  'docs/design-system/stories/DecisionCard.stories.js',
  'docs/design-system/stories/EvidenceCard.stories.js',
  'docs/design-system/stories/storybook.css',
  'docs/ops/CONCURRENCY_POLICY.md',
  'docs/ops/FOLDER_STRUCTURE.md',
  'docs/ops/STATUS.md',
  'docs/product/GAP_BACKLOG.md',
  'docs/TASKS.md',
  'schemas/artifact_manifest.schema.json',
  'schemas/handoff_packet_preview.schema.json',
  'schemas/task_card.schema.json',
  'scripts/check_gitignore.js',
  'scripts/check_json.js',
  'scripts/check_encoding.js',
  'scripts/check_no_secrets.js',
  'scripts/check_open_gates.js',
  'scripts/check_schemas.js',
  'scripts/check_screen_registry.js',
  'scripts/check_task_cards.js',
  'scripts/codex-wrapper.js',
  'scripts/copilot-wrapper.js',
  'tests/secrets/check_no_secrets.test.js',
  'tests/wrappers/wrappers.test.js',
];

const missing = requiredPaths.filter((requiredPath) => !fs.existsSync(requiredPath));

if (missing.length > 0) {
  console.error('Missing required paths:');
  for (const missingPath of missing) {
    console.error(`- ${missingPath}`);
  }
  process.exit(1);
}

console.log('Repository structure check passed.');

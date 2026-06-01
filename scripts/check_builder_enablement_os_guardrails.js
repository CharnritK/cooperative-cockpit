const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const failures = [];

function fail(message) {
  failures.push(message);
}

function readText(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function readJson(relativePath) {
  return JSON.parse(readText(relativePath));
}

function assertIncludes(relativePath, expectedText) {
  const text = readText(relativePath);
  if (!text.includes(expectedText)) {
    fail(`${relativePath} must include ${JSON.stringify(expectedText)}`);
  }
}

function assertMatches(relativePath, pattern, description) {
  const text = readText(relativePath);
  if (!pattern.test(text)) {
    fail(`${relativePath} must match ${description}`);
  }
}

function listFiles(dir, predicate = () => true) {
  const absoluteDir = path.join(root, dir);
  const files = [];
  if (!fs.existsSync(absoluteDir)) {
    fail(`${dir} is missing`);
    return files;
  }

  for (const entry of fs.readdirSync(absoluteDir, { withFileTypes: true })) {
    const absolutePath = path.join(absoluteDir, entry.name);
    const relativePath = path.relative(root, absolutePath).replace(/\\/g, '/');
    if (entry.isDirectory()) {
      files.push(...listFiles(relativePath, predicate));
    } else if (entry.isFile() && predicate(relativePath)) {
      files.push(relativePath);
    }
  }
  return files;
}

function scanFiles(files, checks) {
  for (const file of files) {
    const text = readText(file);
    for (const check of checks) {
      if (check.pattern.test(text)) {
        fail(`${file} contains forbidden ${check.name}`);
      }
    }
  }
}

const productDocs = [
  'docs/product/builder-enablement-os/00_PRODUCT_LOCK.md',
  'docs/product/builder-enablement-os/01_SPECGRAPH_CONTRACT.md',
  'docs/product/builder-enablement-os/02_WORKBENCH_UX_CONTRACT.md',
  'docs/product/builder-enablement-os/04_SPEC_CI_READINESS_GATES.md',
  'docs/product/builder-enablement-os/06_CODE_OBJECT_EXPLORER_INTEGRATION.md',
  'docs/product/builder-enablement-os/07_STATIC_MVP_SCOPE_LOCK.md',
  'docs/product/builder-enablement-os/20_ACCEPTANCE_CRITERIA.md',
];

for (const doc of productDocs) {
  if (!fs.existsSync(path.join(root, doc))) {
    fail(`${doc} is missing`);
  }
}

assertMatches('docs/product/builder-enablement-os/00_PRODUCT_LOCK.md', /## Product category\s+Builder Enablement OS\./, 'Builder Enablement OS product category');
assertMatches('docs/product/builder-enablement-os/00_PRODUCT_LOCK.md', /## Core hierarchy[\s\S]*SpecGraph[\s\S]*Workbench lenses[\s\S]*Work Packets \/ Handoff Packets/, 'SpecGraph-first product hierarchy');
assertIncludes('docs/product/builder-enablement-os/01_SPECGRAPH_CONTRACT.md', 'SpecGraph is the primary product artifact.');
assertMatches('docs/product/builder-enablement-os/02_WORKBENCH_UX_CONTRACT.md', /Workbench is the interactive surface for editing and inspecting SpecGraph\.[\s\S]*It is not the product center\./, 'Workbench as editor/lens rather than product center');
assertIncludes('docs/product/builder-enablement-os/04_SPEC_CI_READINESS_GATES.md', 'It does not execute code, deploy, or call external services.');
assertIncludes('docs/product/builder-enablement-os/06_CODE_OBJECT_EXPLORER_INTEGRATION.md', 'Research-informed specialist lens. Not implementation approval.');
assertIncludes('docs/product/builder-enablement-os/07_STATIC_MVP_SCOPE_LOCK.md', 'Backend.');
assertIncludes('docs/product/builder-enablement-os/20_ACCEPTANCE_CRITERIA.md', 'No parser or LSP.');

assertMatches(
  'docs/product/builder-enablement-os/09_POINT_DECISION_MEMO.md',
  /does not authorize parser, LSP, indexing, backend, dependency, connector, MCP, repo ingestion, source-code upload, deployment, or runtime work\./,
  'code-object lens non-authorization language'
);

for (const goal of [
  '.codex/goals/GOAL-017-static-specgraph-fixtures.md',
  '.codex/goals/GOAL-018-workbench-scenario-lenses.md',
  '.codex/goals/GOAL-019-static-code-object-lens-fixture.md',
]) {
  assertIncludes(goal, 'Do not run this goal until Point explicitly accepts or revises the GOAL-016 Builder Enablement OS / SpecGraph product lock.');
  assertMatches(goal, /Do not commit, push, open PRs, deploy, or publish\./, 'source-control publication prohibition');
}

for (const goal of [
  '.codex/goals/GOAL-020A-builder-enablement-qa-docs.md',
  '.codex/goals/GOAL-020B-specgraph-schema-fixture-validation.md',
  '.codex/goals/GOAL-020C-builder-enablement-guardrail-scripts.md',
]) {
  assertMatches(goal, /No (?:new )?dependencies/, 'dependency prohibition');
  assertMatches(goal, /No backend\/API|No backend\/API\/auth|No backend\/API\/runtime/, 'backend/API prohibition');
}

const runtimeFiles = listFiles('apps/static-mvp', (file) => /\.(?:html|css|js|mjs)$/i.test(file));
scanFiles(runtimeFiles, [
  { name: 'network API', pattern: /\b(?:fetch|XMLHttpRequest|WebSocket|EventSource|sendBeacon)\s*\(/ },
  { name: 'browser storage API', pattern: /\b(?:localStorage|sessionStorage|indexedDB|IndexedDB)\b/ },
  { name: 'external script or stylesheet URL', pattern: /<(?:script|link)[^>]+https?:\/\//i },
  { name: 'parser or LSP runtime dependency', pattern: /\b(?:tree-sitter|LanguageServer|scip|kythe|codeql|joern)\b/i },
  { name: 'source upload affordance', pattern: /\b(?:source-code upload|source upload|repo ingestion|whole-repo graph)\b/i },
]);

const packageJson = readJson('package.json');
if (packageJson.dependencies && Object.keys(packageJson.dependencies).length > 0) {
  fail('package.json must not add runtime dependencies for Builder Enablement OS QA goals');
}

const forbiddenDependencyPattern = /(?:tree-sitter|language-server|lsp|scip|kythe|codeql|joern|axios|openai|anthropic|gemini|supabase|prisma)/i;
for (const section of ['dependencies', 'devDependencies', 'optionalDependencies']) {
  const deps = packageJson[section] || {};
  for (const depName of Object.keys(deps)) {
    if (forbiddenDependencyPattern.test(depName)) {
      fail(`package.json ${section}.${depName} is forbidden without Point lock`);
    }
  }
}

const qaDocs = [
  'docs/product/builder-enablement-os/11_QA_TEST_STRATEGY.md',
  'docs/product/builder-enablement-os/12_PRODUCT_ACCEPTANCE_TEST_MATRIX.md',
  'docs/product/builder-enablement-os/13_SPECGRAPH_SCHEMA_FIXTURE_TESTS.md',
  'docs/product/builder-enablement-os/14_STATIC_MVP_GUARDRAIL_TESTS.md',
  'docs/product/builder-enablement-os/15_UNIT_TEST_CHECKLIST.md',
  'docs/product/builder-enablement-os/16_INTEGRATION_UI_WORKFLOW_TESTS.md',
  'docs/product/builder-enablement-os/17_WORKBENCH_UX_TESTS.md',
  'docs/product/builder-enablement-os/18_CODE_OBJECT_LENS_TESTS.md',
  'docs/product/builder-enablement-os/19_REVIEW_GATES.md',
  'docs/product/builder-enablement-os/20_ACCEPTANCE_CRITERIA.md',
  'docs/product/builder-enablement-os/21_RED_TEAM_FAILURE_MODES.md',
];

for (const doc of qaDocs) {
  if (!fs.existsSync(path.join(root, doc))) {
    fail(`${doc} is missing`);
  }
}

if (failures.length) {
  console.error('check_builder_enablement_os_guardrails: FAIL');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`check_builder_enablement_os_guardrails: PASS (${runtimeFiles.length} runtime files scanned)`);

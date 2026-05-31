const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const vm = require('vm');

const root = process.cwd();
const failures = [];

function rel(file) {
  return path.relative(root, file).replace(/\\/g, '/');
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function fail(message) {
  failures.push(message);
}

function checkRequiredKeys(object, keys, file) {
  const missing = keys.filter((key) => !(key in object));
  if (missing.length) {
    fail(`${rel(file)} missing required keys: ${missing.join(', ')}`);
  }
}

function checkHandoffPlaceholderSchema() {
  const schemaFile = path.join(root, 'schemas', 'handoff_packet_preview.schema.json');
  const handoffFile = path.join(root, 'apps', 'static-mvp', 'handoff', 'handoff-placeholder.json');
  const schema = readJson(schemaFile);
  const handoff = readJson(handoffFile);

  checkRequiredKeys(handoff, schema.required || [], handoffFile);
}

function checkStaticHandoffManifestSelfLists() {
  const manifestFile = path.join(root, 'apps', 'static-mvp', 'handoff', 'manifest.json');
  const manifest = readJson(manifestFile);

  if (!manifest.files.includes('handoff/manifest.json')) {
    fail(`${rel(manifestFile)} must list itself as part of the static MVP handoff inventory`);
  }
}

function createAppContext() {
  const context = {
    console,
    alert() {},
    window: {},
    document: {
      addEventListener() {},
      querySelectorAll() {
        return [];
      },
      getElementById() {
        return null;
      },
      createElement() {
        return {
          appendChild() {},
          addEventListener() {},
          classList: { toggle() {} },
          setAttribute() {},
          style: {},
        };
      },
    },
  };

  context.window.window = context.window;
  context.window.document = context.document;

  for (const script of [
    path.join(root, 'apps', 'static-mvp', 'src', 'mockData.js'),
    path.join(root, 'apps', 'static-mvp', 'src', 'state.js'),
    path.join(root, 'apps', 'static-mvp', 'src', 'app.js'),
  ]) {
    vm.runInNewContext(fs.readFileSync(script, 'utf8'), context, { filename: script });
  }

  return context;
}

function checkReadinessCannotOverrideEvidenceState() {
  const context = createAppContext();
  const state = context.window.appState;

  state.specFields.forEach((field) => {
    field.status = 'locked';
  });
  state.decisions.forEach((decision) => {
    decision.status = 'locked';
  });
  state.specValidated = true;
  state.reviewBlockersAcknowledged = true;
  state.evidenceReviewed = true;

  const readiness = context.getReadinessSummary();
  if (readiness.ready) {
    fail('handoff readiness became ready while required evidence or trace links are still missing');
  }

  const sync = context.getPreviewSyncStatus(readiness);
  if (sync.label === 'Up to date') {
    fail('preview sync status became Up to date while handoff readiness blockers remain');
  }

  const coveredRows = context.getSpecCoverageRows(readiness).filter((row) => row.label === 'Covered');
  if (coveredRows.length) {
    fail(`preview spec coverage marked fields Covered while handoff readiness blockers remain: ${coveredRows.map((row) => row.field.id).join(', ')}`);
  }
}

function checkPreviewSyncRequiresCompleteReadiness() {
  const context = createAppContext();
  const state = context.window.appState;

  state.specFields.forEach((field) => {
    field.status = 'locked';
  });
  state.decisions.forEach((decision) => {
    decision.status = 'locked';
  });
  state.specValidated = true;
  state.evidenceReviewed = true;
  state.reviewBlockersAcknowledged = true;
  context.refreshDerivedEvidenceState();

  const readiness = context.getReadinessSummary();
  const sync = context.getPreviewSyncStatus(readiness);
  const coverageRows = context.getSpecCoverageRows(readiness);

  if (!readiness.ready) {
    fail(`handoff readiness stayed blocked after required evidence, decisions, validation, trace, and review state were satisfied: ${readiness.handoffBlockers.join('; ')}`);
  }
  if (sync.label !== 'Up to date') {
    fail(`preview sync status did not become Up to date after full readiness was satisfied: ${sync.label}`);
  }
  const incompleteRows = coverageRows.filter((row) => row.label !== 'Covered');
  if (incompleteRows.length) {
    fail(`preview spec coverage did not mark all fields Covered after full readiness was satisfied: ${incompleteRows.map((row) => `${row.field.id}:${row.label}`).join(', ')}`);
  }
}

function checkWorkbenchDefaultFlatFlowContract() {
  const context = createAppContext();
  const state = context.window.appState;

  if (state.viewMode !== 'flat') {
    fail(`static MVP Workbench must default to flat flow before PR evidence; current default is ${state.viewMode}`);
    return;
  }

  const orderedNodes = context.getOrderedWorkbenchNodes();
  const nodeIds = orderedNodes.map((node) => node.id);
  const expectedNodeIds = Array.from({ length: 8 }, (_, index) => `node-${index + 1}`);

  if (nodeIds.join(',') !== expectedNodeIds.join(',')) {
    fail(`static MVP Workbench flat flow must render ordered task nodes ${expectedNodeIds.join(',')}; saw ${nodeIds.join(',')}`);
  }
}

function checkWorkbenchFlatFlowLegendContract() {
  const appFile = path.join(root, 'apps', 'static-mvp', 'src', 'app.js');
  const stylesFile = path.join(root, 'apps', 'static-mvp', 'styles', 'components.css');
  const appSource = fs.readFileSync(appFile, 'utf8');
  const stylesSource = fs.readFileSync(stylesFile, 'utf8');

  if (!appSource.includes('`node-canvas canvas-mode-${window.appState.viewMode}`')) {
    fail(`${rel(appFile)} must mark the canvas with the active view mode so flat-flow legend layout can be scoped safely`);
  }

  const legendAppendIndex = appSource.indexOf('canvas.appendChild(legend);');
  const flowAppendIndex = appSource.indexOf('canvas.appendChild(flow);');
  if (legendAppendIndex === -1 || flowAppendIndex === -1 || legendAppendIndex > flowAppendIndex) {
    fail(`${rel(appFile)} must append the edge legend before the flat-flow node grid so it participates in layout instead of covering nodes`);
  }

  if (!/\.canvas-mode-flat\s+\.canvas-legend\s*{[\s\S]*?position:\s*relative;/.test(stylesSource)) {
    fail(`${rel(stylesFile)} must dock the edge legend in normal flow for Flat Flow instead of using the absolute map overlay position`);
  }

  if (!/\.canvas-mode-flat\s+\.canvas-legend-items\s*{[\s\S]*?display:\s*flex;/.test(stylesSource)) {
    fail(`${rel(stylesFile)} must allow flat-flow edge legend items to wrap inline without overlapping the node grid`);
  }

  if (!/\.canvas-legend-line\.edge-pending\s*{[\s\S]*?repeating-linear-gradient/.test(stylesSource)) {
    fail(`${rel(stylesFile)} must render the Pending legend sample as dashed to match pending edge styling`);
  }

  if (!/\.canvas-legend-line\.edge-risk\s*{[\s\S]*?repeating-linear-gradient/.test(stylesSource)) {
    fail(`${rel(stylesFile)} must render the Risk legend sample as dashed to match risk edge styling`);
  }
}

function checkStaleDuplicateRepoSurface() {
  const duplicate = path.join(root, 'cooperative-cockpit-repo-setup-final');
  if (fs.existsSync(duplicate)) {
    fail(`${rel(duplicate)} is a stale duplicate repo surface and must be removed or quarantined outside validation scope`);
  }
}

function listFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listFiles(file));
    } else if (entry.isFile()) {
      files.push(file);
    }
  }
  return files;
}

function sha256(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

function computeTreeChecksum(dir) {
  const lines = listFiles(dir)
    .map((file) => {
      const relative = path.relative(dir, file).replace(/\\/g, '/');
      return `${sha256(fs.readFileSync(file))}  ${relative}`;
    })
    .sort();
  return `sha256:${sha256(Buffer.from(`${lines.join('\n')}\n`, 'utf8'))}`;
}

function checkStaticMvpManifestChecksum() {
  const manifestFile = path.join(root, 'artifacts', 'packages', 'openclaw-cooperative-cockpit-mvp.manifest.json');
  const manifest = readJson(manifestFile);
  const storagePath = path.join(root, manifest.storage_path || '');
  const expected = computeTreeChecksum(storagePath);

  if (manifest.checksum !== expected) {
    fail(`${rel(manifestFile)} checksum is stale: expected ${expected}`);
  }
}

checkHandoffPlaceholderSchema();
checkStaticHandoffManifestSelfLists();
checkReadinessCannotOverrideEvidenceState();
checkPreviewSyncRequiresCompleteReadiness();
checkWorkbenchDefaultFlatFlowContract();
checkWorkbenchFlatFlowLegendContract();
checkStaleDuplicateRepoSurface();
checkStaticMvpManifestChecksum();

if (failures.length) {
  console.error('check_concept_consistency: FAIL');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('check_concept_consistency: PASS');

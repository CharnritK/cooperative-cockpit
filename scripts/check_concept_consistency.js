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

function checkReadinessProgressContract() {
  const context = createAppContext();
  const state = context.window.appState;
  const initialProgress = context.getReadinessProgress(context.getReadinessSummary());

  if (!Number.isInteger(initialProgress.percent) || initialProgress.percent < 0 || initialProgress.percent > 100) {
    fail(`readiness progress percent must be an integer from 0 to 100; saw ${initialProgress.percent}`);
  }
  if (initialProgress.total <= 0 || initialProgress.complete > initialProgress.total) {
    fail(`readiness progress must expose sane complete/total gates; saw ${initialProgress.complete}/${initialProgress.total}`);
  }

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

  const completeProgress = context.getReadinessProgress(context.getReadinessSummary());
  if (completeProgress.percent !== 100) {
    fail(`readiness progress must reach 100% after all local readiness gates are satisfied; saw ${completeProgress.percent}%`);
  }
}

function checkWorkbenchMixedMapContract() {
  const context = createAppContext();
  const state = context.window.appState;
  state.viewMode = 'mixed';
  state.currentParentId = null;
  state.currentLevel = 'requirements';
  state.expandedNodeId = null;

  const rootNodes = context.getOrderedWorkbenchNodes();
  const rootNodeIds = rootNodes.map((node) => node.id);
  const expectedRootIds = ['req-1', 'req-2'];

  if (rootNodeIds.join(',') !== expectedRootIds.join(',')) {
    fail(`static MVP Workbench Mixed Map root must render requirement nodes ${expectedRootIds.join(',')}; saw ${rootNodeIds.join(',')}`);
  }

  state.expandedNodeId = 'req-1';
  const expandedNodes = context.getOrderedWorkbenchNodes();
  const expandedNodeIds = expandedNodes.map((node) => node.id);
  const expectedExpandedIds = ['req-1', 'arch-1', 'arch-2', 'req-2'];

  if (expandedNodeIds.join(',') !== expectedExpandedIds.join(',')) {
    fail(`static MVP Workbench Mixed Map expanding req-1 must keep sibling requirements visible and insert architecture children ${expectedExpandedIds.join(',')}; saw ${expandedNodeIds.join(',')}`);
  }

  state.viewMode = 'flat';
  state.currentParentId = null;
  state.currentLevel = 'task';
  state.expandedNodeId = null;
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

function checkWorkbenchCanvasFocusContract() {
  const appFile = path.join(root, 'apps', 'static-mvp', 'src', 'app.js');
  const stylesFile = path.join(root, 'apps', 'static-mvp', 'styles', 'components.css');
  const appSource = fs.readFileSync(appFile, 'utf8');
  const stylesSource = fs.readFileSync(stylesFile, 'utf8');

  if (appSource.includes("createElement('aside', 'workbench-sidebar')")) {
    fail(`${rel(appFile)} must not render a persistent Workbench sidebar; palette/context belong in popovers`);
  }
  if (!appSource.includes('activeWorkbenchPopover') || !appSource.includes('toggle-workbench-palette') || !appSource.includes('toggle-workbench-context')) {
    fail(`${rel(appFile)} must expose object-type and Selected Context popovers from the Workbench canvas toolbar`);
  }

  const inspectorStart = appSource.indexOf('function renderNodeInspector');
  const inspectorEnd = appSource.indexOf('function renderInspectorTabContent');
  const inspectorSource = appSource.slice(inspectorStart, inspectorEnd);
  if (/setInspectorOpen\(true\)/.test(inspectorSource)) {
    fail(`${rel(appFile)} renderNodeInspector must not force the right inspector open on node selection`);
  }

  if (!/\.workbench-layout\s*{[\s\S]*?grid-template-columns:\s*minmax\(0,\s*1fr\);/.test(stylesSource)) {
    fail(`${rel(stylesFile)} must let the Workbench canvas take the full default content width`);
  }
  if (!/\.workbench-popover\s*{[\s\S]*?position:\s*absolute;/.test(stylesSource)) {
    fail(`${rel(stylesFile)} must render Workbench support details as non-resizing overlay popovers`);
  }
}

function checkWorkbenchSpatialCanvasContract() {
  const context = createAppContext();
  const state = context.window.appState;
  const mockData = context.window.mockData;
  const appFile = path.join(root, 'apps', 'static-mvp', 'src', 'app.js');
  const stylesFile = path.join(root, 'apps', 'static-mvp', 'styles', 'components.css');
  const appSource = fs.readFileSync(appFile, 'utf8');
  const stylesSource = fs.readFileSync(stylesFile, 'utf8');
  const staticMvpFiles = listFiles(path.join(root, 'apps', 'static-mvp'));
  const forbiddenStorageTerms = ['localStorage', 'sessionStorage', 'indexedDB', 'IndexedDB'];

  if (state.viewMode !== 'spatial') {
    fail(`GOAL-015 Workbench must default to the spatial whole-board canvas; current default is ${state.viewMode}`);
  }
  if (!state.workbenchFocusMode) {
    fail('GOAL-015 Workbench focus mode must be enabled by default');
  }
  if (!state.canvasViewport || typeof state.canvasViewport.scale !== 'number' || typeof state.canvasViewport.x !== 'number' || typeof state.canvasViewport.y !== 'number') {
    fail('GOAL-015 canvasViewport must expose numeric scale, x and y values');
  }
  if (!mockData.workbenchBoard || mockData.workbenchBoard.width < 2000 || mockData.workbenchBoard.height < 1200) {
    fail('GOAL-015 mockData.workbenchBoard must define a large fixed board surface');
  }

  const boardPositions = (mockData.workbenchBoard && mockData.workbenchBoard.nodePositions) || {};
  const missingBoardNodes = (mockData.nodes || [])
    .filter((node) => !boardPositions[node.id] || typeof boardPositions[node.id].x !== 'number' || typeof boardPositions[node.id].y !== 'number')
    .map((node) => node.id);
  if (missingBoardNodes.length) {
    fail(`GOAL-015 spatial board must provide fixed positions for every Workbench node; missing ${missingBoardNodes.join(',')}`);
  }

  if (!Array.isArray(mockData.workbenchBoard && mockData.workbenchBoard.zones) || mockData.workbenchBoard.zones.length < 3) {
    fail('GOAL-015 spatial board must include visual zones for the whole-board architecture read');
  }
  if (typeof context.getSpatialWorkbenchNodes !== 'function') {
    fail(`${rel(appFile)} must expose getSpatialWorkbenchNodes for the whole-board node contract`);
  } else {
    const spatialNodeIds = context.getSpatialWorkbenchNodes().map((node) => node.id);
    const expectedNodeIds = (mockData.nodes || []).map((node) => node.id);
    const missingSpatialNodes = expectedNodeIds.filter((nodeId) => !spatialNodeIds.includes(nodeId));
    if (missingSpatialNodes.length) {
      fail(`GOAL-015 spatial board must render all Workbench hierarchy objects by default; missing ${missingSpatialNodes.join(',')}`);
    }
  }

  if (!appSource.includes('canvas-world') || !appSource.includes('workbench-context-dock')) {
    fail(`${rel(appFile)} must render a transformed canvas world and context dock for GOAL-015`);
  }
  if (!appSource.includes('zoom-in-workbench') || !appSource.includes('zoom-out-workbench') || !appSource.includes('fit-workbench-board') || !appSource.includes('reset-workbench-view')) {
    fail(`${rel(appFile)} must expose zoom in, zoom out, fit board, and reset view controls`);
  }
  if (!/\.canvas-world\s*{[\s\S]*?transform-origin:\s*0 0;/.test(stylesSource)) {
    fail(`${rel(stylesFile)} must style .canvas-world as a transformed spatial surface`);
  }
  if (!/\.workbench-context-dock\s*{[\s\S]*?position:\s*absolute;/.test(stylesSource)) {
    fail(`${rel(stylesFile)} must render the context dock as a canvas overlay`);
  }

  const storageMatches = [];
  for (const file of staticMvpFiles) {
    const source = fs.readFileSync(file, 'utf8');
    for (const term of forbiddenStorageTerms) {
      if (source.includes(term)) storageMatches.push(`${rel(file)}:${term}`);
    }
  }
  if (storageMatches.length) {
    fail(`GOAL-015 must not introduce browser storage persistence APIs: ${storageMatches.join(', ')}`);
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
checkReadinessProgressContract();
checkWorkbenchMixedMapContract();
checkWorkbenchFlatFlowLegendContract();
checkWorkbenchCanvasFocusContract();
checkWorkbenchSpatialCanvasContract();
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

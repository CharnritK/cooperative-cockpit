/*
  Main application logic for the OpenClaw Cooperative Cockpit static MVP.
  It keeps all behavior local and mock-only while rendering the
  workflow-studio prototype.
*/

const ICONS = {
  add: '<path d="M12 5v14M5 12h14" />',
  archive: '<path d="M4 7h16v13H4z" /><path d="M3 4h18v3H3z" /><path d="M9 12h6" />',
  arrow: '<path d="M5 12h14" /><path d="m13 6 6 6-6 6" />',
  branch: '<path d="M6 4v6a4 4 0 0 0 4 4h8" /><circle cx="6" cy="4" r="2" /><circle cx="18" cy="14" r="2" /><circle cx="6" cy="20" r="2" /><path d="M6 18v2" />',
  check: '<path d="m5 12 4 4L19 6" />',
  close: '<path d="M6 6l12 12M18 6 6 18" />',
  code: '<path d="m8 9-4 3 4 3" /><path d="m16 9 4 3-4 3" /><path d="m14 5-4 14" />',
  decision: '<path d="M10 13 3 20" /><path d="m14 6 4 4" /><path d="m13 7-3 3 4 4 3-3Z" /><path d="M16 16h5" />',
  document: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" /><path d="M14 3v5h5" /><path d="M8 13h8M8 17h6" />',
  eye: '<path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.5" />',
  graph: '<path d="M6 6h4v4H6zM14 14h4v4h-4zM14 6h4v4h-4z" /><path d="M10 8h4M16 10v4M8 10v6h6" />',
  handoff: '<path d="M12 3v12" /><path d="m7 8 5-5 5 5" /><path d="M5 14v5h14v-5" />',
  home: '<path d="m3 10 9-7 9 7" /><path d="M5 10v10h14V10" /><path d="M9 20v-6h6v6" />',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" />',
  note: '<path d="M4 4h16v16H4z" /><path d="M8 8h8M8 12h8M8 16h5" />',
  preview: '<path d="M4 5h16v14H4z" /><path d="M8 9h8M8 13h5" />',
  review: '<path d="M12 3 5 6v5c0 4.4 2.8 7.9 7 10 4.2-2.1 7-5.6 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-5" />',
  rules: '<path d="M12 3v18" /><path d="M5 7h14" /><path d="m6 7-3 6h6Z" /><path d="m18 7-3 6h6Z" />',
  spark: '<path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6Z" />',
  trace: '<path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1" /><path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" />',
  warning: '<path d="m12 3 10 18H2Z" /><path d="M12 9v4M12 17h.01" />',
};

const NODE_ICON_BY_TYPE = {
  intake: 'spark',
  context: 'branch',
  spec: 'document',
  review: 'review',
  preview: 'eye',
  decision: 'lock',
  trace: 'trace',
  handoff: 'archive',
};

const WORKFLOW_STEPS = [
  { key: 'concept', label: 'Concept', pages: ['home'], caption: 'Concept intake' },
  { key: 'workbench', label: 'Workbench', pages: ['workbench'], caption: 'Context selected' },
  { key: 'spec', label: 'Spec', pages: ['spec-builder'], caption: 'Spec gates open' },
  { key: 'review', label: 'Review', pages: ['review-runs'], caption: 'Review evidence' },
  { key: 'preview', label: 'Preview', pages: ['preview'], caption: 'Preview sync' },
  { key: 'handoff', label: 'Handoff', pages: ['decisions', 'trace', 'rules'], caption: 'Locks and evidence' },
];

const INSPECTOR_TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'requirements', label: 'Requirements' },
  { id: 'evidence', label: 'Evidence' },
  { id: 'review', label: 'Review' },
  { id: 'handoff', label: 'Handoff' },
];

document.addEventListener('DOMContentLoaded', () => {
  window.appState.specValidated = Boolean(window.appState.specValidated);

  document.querySelectorAll('.nav-item').forEach((item) => {
    item.addEventListener('click', () => navigateFromItem(item));
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        navigateFromItem(item);
      }
    });
  });

  document.querySelectorAll('.action-btn[data-action]').forEach((btn) => {
    btn.addEventListener('click', () => handleTopBarAction(btn.dataset.action));
  });

  syncShellState(window.appState.currentPage);
  window.renderPage(window.appState.currentPage);
});

function navigateFromItem(item) {
  const page = item.dataset.page;
  if (page) window.navigate(page);
}

function icon(name, extraClass = '') {
  return `<svg class="ui-icon ${extraClass}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ICONS.spark}</svg>`;
}

function createElement(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function setInspectorOpen(open) {
  const shell = document.getElementById('app-shell');
  const inspector = document.getElementById('right-inspector');
  if (shell) shell.classList.toggle('inspector-open', open);
  if (inspector) inspector.classList.toggle('hidden', !open);
}

function showGovernance(show) {
  const governance = document.getElementById('governance-strip');
  if (governance) governance.classList.toggle('hidden', !show);
}

function getWorkflowStep(page) {
  return WORKFLOW_STEPS.find((step) => step.pages.includes(page)) || WORKFLOW_STEPS[0];
}

function getMissingEvidenceFields() {
  return window.appState.specFields.filter((field) => !window.appState.traceLinks.some((link) => link.target === field.id));
}

function getReviewBlockers() {
  if (window.appState.reviewBlockersAcknowledged) return [];
  return window.appState.reviewResults.filter((review) => review.severity === 'high');
}

function getReadinessSummary() {
  const unresolvedSpecFields = window.appState.specFields.filter((field) => ['ai-suggested', 'missing', 'needs-answer', 'needs-lock'].includes(field.status));
  const pendingDecisions = window.appState.decisions.filter((decision) => decision.status === 'needs-lock');
  const missingEvidence = window.appState.evidenceReviewed ? [] : getMissingEvidenceFields();
  const reviewBlockers = getReviewBlockers();
  const handoffBlockers = [
    ...unresolvedSpecFields.map((field) => `Spec field missing: ${field.name}`),
    ...pendingDecisions.map((decision) => `Decision Lock open: ${decision.id}`),
    ...missingEvidence.map((field) => `Evidence link missing: ${field.name}`),
    ...reviewBlockers.map((review) => `Review blocker: ${review.name}`),
  ];

  return {
    unresolvedSpecFields,
    missingEvidence,
    pendingDecisions,
    reviewBlockers,
    handoffBlockers,
    ready: Boolean(window.appState.specValidated) && handoffBlockers.length === 0,
  };
}

function updateHandoffReadiness() {
  window.appState.handoffReady = getReadinessSummary().ready;
}

function syncShellState(page) {
  updateHandoffReadiness();
  const readiness = getReadinessSummary();
  const activeStep = getWorkflowStep(page);
  const activeIndex = WORKFLOW_STEPS.findIndex((step) => step.key === activeStep.key);
  const progressIndex = window.appState.handoffReady ? WORKFLOW_STEPS.length : Math.min(activeIndex + 1, WORKFLOW_STEPS.length - 1);

  document.querySelectorAll('.workflow-step').forEach((stepNode, index) => {
    const stepKey = stepNode.dataset.step;
    stepNode.classList.toggle('is-active', stepKey === activeStep.key);
    stepNode.classList.toggle('is-complete', index < activeIndex || (stepKey === 'handoff' && window.appState.handoffReady));
    stepNode.classList.toggle('is-blocked', stepKey === 'handoff' && !window.appState.handoffReady);
  });

  const progressValue = document.getElementById('rail-progress-value');
  const progressFill = document.getElementById('rail-progress-fill');
  const progressCaption = document.getElementById('rail-progress-caption');
  if (progressValue) progressValue.textContent = `${progressIndex}/6`;
  if (progressFill) progressFill.style.width = `${(progressIndex / WORKFLOW_STEPS.length) * 100}%`;
  if (progressCaption) progressCaption.textContent = window.appState.handoffReady ? 'Ready for handoff' : activeStep.caption;

  const handoffButton = document.querySelector('.top-right .action-btn[data-action="handoff"]');
  if (handoffButton) {
    handoffButton.disabled = !window.appState.handoffReady;
    handoffButton.setAttribute('aria-disabled', String(!window.appState.handoffReady));
    handoffButton.title = window.appState.handoffReady ? 'Prepare static handoff placeholder' : 'Static handoff gated by local readiness checklist';
  }

  const readinessCount = document.getElementById('readiness-count');
  if (readinessCount) readinessCount.textContent = String(readiness.handoffBlockers.length);
  const readinessButton = document.querySelector('.top-right .action-btn[data-action="checklist"]');
  if (readinessButton) {
    readinessButton.classList.toggle('is-ready', readiness.ready);
    readinessButton.title = readiness.ready ? 'Local readiness checklist is clear' : `${readiness.handoffBlockers.length} local readiness blockers`;
  }
}

function animatePageEnter(main) {
  main.classList.remove('page-enter');
  void main.offsetWidth;
  main.classList.add('page-enter');
  main.scrollTop = 0;
}

function renderPageHeader(container, { kicker, title, subtitle, actions = [], className = '' }) {
  const header = createElement('section', `page-header${className ? ` ${className}` : ''}`);
  const copy = createElement('div');
  copy.innerHTML = `<div class="page-kicker">${kicker}</div><h2 class="page-title">${title}</h2><p class="page-subtitle">${subtitle}</p>`;
  header.appendChild(copy);

  if (actions.length) {
    const actionRow = createElement('div', 'page-actions');
    actions.forEach((action) => {
      const btn = createElement('button', 'action-btn');
      btn.type = 'button';
      btn.innerHTML = `${icon(action.icon || 'arrow')}${action.label}`;
      btn.addEventListener('click', action.onClick);
      actionRow.appendChild(btn);
    });
    header.appendChild(actionRow);
  }

  container.appendChild(header);
}

function renderStatusChip(status, label) {
  return `<span class="status-chip ${getStatusClass(status)}">${label || statusLabel(status)}</span>`;
}

function handleTopBarAction(action) {
  switch (action) {
    case 'checklist':
      window.appState.utilityTrayCollapsed = false;
      if (window.appState.currentPage !== 'workbench') {
        window.navigate('workbench');
      } else {
        window.renderPage('workbench');
      }
      break;
    case 'preview':
      window.navigate('preview');
      break;
    case 'validate':
      window.navigate('review-runs');
      break;
    case 'handoff':
      if (window.appState.handoffReady) {
        alert('Preparing static handoff packet... (placeholder)');
      } else {
        alert('Cannot prepare handoff yet. Clear the local readiness checklist first.');
      }
      break;
    default:
      break;
  }
}

window.renderPage = function renderPage(page) {
  const main = document.getElementById('main-content');
  if (!main) return;

  main.innerHTML = '';
  setInspectorOpen(false);
  showGovernance(false);
  syncShellState(page);

  switch (page) {
    case 'home':
      renderHome(main);
      break;
    case 'workbench':
      renderWorkbench(main);
      break;
    case 'spec-builder':
      renderSpecBuilder(main);
      break;
    case 'review-runs':
      renderReviewRuns(main);
      break;
    case 'preview':
      renderPreview(main);
      break;
    case 'decisions':
      renderDecisions(main);
      break;
    case 'trace':
      renderTrace(main);
      break;
    case 'rules':
      renderRules(main);
      break;
    default:
      renderHome(main);
  }

  animatePageEnter(main);
};

function renderHome(container) {
  const pendingLocks = window.appState.decisions.filter((decision) => decision.status === 'needs-lock');
  const protectedLabels = window.appState.protected.map((item) => item.label);
  const currentStep = getWorkflowStep(window.appState.currentPage);

  const statusGrid = createElement('section', 'home-status-grid');
  statusGrid.appendChild(renderHomeStatusCard({
    iconName: 'branch',
    label: 'Context items',
    value: String(window.appState.context.length),
    tone: 'active',
    detail: window.appState.context.map((item) => item.label).join(', ') || 'No context selected',
  }));
  statusGrid.appendChild(renderHomeStatusCard({
    iconName: 'lock',
    label: 'Protected exclusions',
    value: String(window.appState.protected.length),
    tone: 'blocked',
    detail: protectedLabels.join(', '),
  }));
  statusGrid.appendChild(renderHomeStatusCard({
    iconName: pendingLocks.length ? 'warning' : 'check',
    label: 'Pending locks',
    value: String(pendingLocks.length),
    tone: pendingLocks.length ? 'warning' : 'validated',
    detail: pendingLocks.length ? pendingLocks.map((decision) => decision.id).join(', ') : 'No pending locks',
  }));
  container.appendChild(statusGrid);

  const banner = createElement('section', 'pipeline-banner');
  banner.innerHTML = `<div>
      <div class="page-kicker">Active artifact</div>
      <h2 class="page-title">COCKPIT-MVP-014</h2>
      <p class="page-subtitle">Governed static workflow studio from concept intake to gated handoff. Current stage: <strong>${currentStep.label}</strong>.</p>
    </div>
    <div class="pipeline-steps" aria-label="Pipeline progress">
      ${WORKFLOW_STEPS.map((step) => `<span class="${step.key === currentStep.key ? 'is-active' : ''} ${step.key === 'handoff' && !window.appState.handoffReady ? 'is-blocked' : ''}">${step.label}</span>`).join('')}
    </div>`;
  container.appendChild(banner);

  const lowerGrid = createElement('section', 'home-ops-grid');
  const recent = createElement('article', 'panel activity-panel');
  recent.innerHTML = `<h3>Recent Activity</h3>
    <ol class="activity-feed">
      <li><span>Context basket seeded</span><strong>${window.appState.context.length} included</strong></li>
      <li><span>Protected surfaces sealed</span><strong>${window.appState.protected.length} excluded</strong></li>
      <li><span>Handoff gate checked</span><strong>${window.appState.handoffReady ? 'Ready' : 'Blocked'}</strong></li>
      <li><span>Spec coverage refreshed</span><strong>${hasUnresolvedSpecFields() ? 'Needs answers' : 'Complete'}</strong></li>
    </ol>`;
  lowerGrid.appendChild(recent);

  const next = createElement('article', 'panel next-actions-panel');
  next.innerHTML = `<h3>Next Safe Actions</h3>
    <p>All actions stay local to this static prototype and only update mock UI state.</p>
    <div class="safe-action-list"></div>`;
  const actionList = next.querySelector('.safe-action-list');
  [
    ['Open Workbench', 'graph', 'Review context nodes', () => window.navigate('workbench')],
    ['Continue Spec', 'document', 'Resolve required fields', () => window.navigate('spec-builder')],
    ['Validate', 'review', 'Inspect advisory checks', () => window.navigate('review-runs')],
    ['Resolve Locks', 'decision', pendingLocks.length ? `${pendingLocks.length} pending` : 'No pending locks', () => window.navigate('decisions')],
  ].forEach(([label, iconName, description, handler]) => {
    const btn = createElement('button', 'safe-action');
    btn.type = 'button';
    btn.innerHTML = `<span>${icon(iconName)}<strong>${label}</strong></span><small>${description}</small>`;
    btn.addEventListener('click', handler);
    actionList.appendChild(btn);
  });
  lowerGrid.appendChild(next);
  container.appendChild(lowerGrid);
}

function renderHomeStatusCard({ iconName, label, value, tone, detail }) {
  const card = createElement('article', `home-status-card status-tone-${tone}`);
  card.innerHTML = `<div class="home-status-icon">${icon(iconName)}</div>
    <div>
      <div class="metric-label">${label}</div>
      <div class="metric-value">${value}</div>
      <p>${detail}</p>
    </div>`;
  return card;
}

function getSelectedNode() {
  return window.mockData.nodes.find((node) => node.id === window.appState.selectedNodeId) || null;
}

function renderWorkbench(container) {
  showGovernance(true);
  const selectedNode = getSelectedNode() || window.mockData.nodes[0];
  if (selectedNode) window.appState.selectedNodeId = selectedNode.id;
  renderPageHeader(container, {
    kicker: 'Artifact-first Builder',
    title: 'Workbench',
    subtitle: 'Canvas-first cockpit for Context Nodes, Work Packets, Review Gates, Evidence, Decision Locks, and Handoff Packets. All actions are static and local-only.',
    className: 'workbench-header',
  });

  const layout = createElement('section', 'workbench-layout');
  const sidebar = createElement('aside', 'workbench-sidebar');
  sidebar.appendChild(renderNodePalette());
  sidebar.appendChild(renderContextBasket());
  layout.appendChild(sidebar);
  const workbenchMain = createElement('div', 'workbench-main');
  workbenchMain.appendChild(renderNodeCanvas());
  workbenchMain.appendChild(renderUtilityTray(selectedNode));
  layout.appendChild(workbenchMain);
  container.appendChild(layout);
  renderNodeInspector(selectedNode ? selectedNode.id : null);
}

function renderNodePalette() {
  const palette = createElement('section', 'panel node-palette');
  palette.innerHTML = `<div class="node-palette-header">
      <div class="palette-title-row"><h3>OpenClaw Node Families</h3>${renderStatusChip('inspect', 'Mock data')}</div>
      <p>Static node families only. Selecting or adding a node changes local browser state, never runtime behavior.</p>
    </div>`;

  const list = createElement('ul', 'palette-list');
  window.mockData.nodePalette.forEach((item) => {
    const li = createElement('li', `palette-item node-type-${item.type}`);
    li.innerHTML = `<span class="palette-type-icon">${icon(item.icon || NODE_ICON_BY_TYPE[item.type] || 'spark')}</span>
      <span><strong>${item.label}</strong><span>${item.description}</span></span>`;
    list.appendChild(li);
  });
  palette.appendChild(list);
  return palette;
}

function renderContextBasket() {
  const basket = createElement('aside', 'context-basket');
  const included = createElement('div', 'basket-section');
  included.innerHTML = `<div class="basket-section-header"><h3>Context Basket</h3>${renderStatusChip('allowed', `${window.appState.context.length} included`)}</div>`;

  const list = createElement('ul', 'context-items');
  window.appState.context.forEach((item, idx) => {
    const li = createElement('li', 'context-item');
    const label = createElement('span', '', item.label);
    const remove = createElement('button', 'icon-btn remove-btn');
    remove.type = 'button';
    remove.setAttribute('aria-label', `Remove ${item.label}`);
    remove.innerHTML = icon('close');
    remove.addEventListener('click', () => removeContextItem(idx));
    li.append(label, remove);
    list.appendChild(li);
  });
  included.appendChild(list);
  basket.appendChild(included);

  const protectedSection = createElement('div', 'basket-section');
  protectedSection.innerHTML = `<div class="basket-section-header"><h3>Protected Exclusions</h3>${renderStatusChip('blocked', `${window.appState.protected.length} excluded`)}</div>`;
  const protectedList = createElement('ul', 'protected-items');
  window.appState.protected.forEach((item) => {
    const li = createElement('li', 'protected-item');
    li.innerHTML = `<span>${item.label}</span><span class="mono">sealed</span>`;
    protectedList.appendChild(li);
  });
  protectedSection.appendChild(protectedList);
  basket.appendChild(protectedSection);

  const actions = createElement('div', 'basket-section');
  const row = createElement('div', 'basket-actions');
  [
    ['Add selected', 'add', addSelectedToContext],
    ['Mark upstream local', 'branch', () => alert('Upstream marker is local-only in this static MVP.')],
    ['Mark downstream local', 'arrow', () => alert('Downstream marker is local-only in this static MVP.')],
    ['Clear basket', 'close', () => {
      window.appState.context = [];
      window.renderPage('workbench');
    }],
    ['Static context preview', 'eye', () => alert('Static context preview only. No external calls are made.')],
  ].forEach(([label, iconName, handler]) => {
    const btn = createElement('button', 'action-btn');
    btn.type = 'button';
    btn.innerHTML = `${icon(iconName)}${label}`;
    btn.addEventListener('click', handler);
    row.appendChild(btn);
  });
  actions.appendChild(row);
  basket.appendChild(actions);
  return basket;
}

function renderNodeCanvas() {
  const canvas = createElement('div', 'node-canvas');
  canvas.innerHTML = `<div class="canvas-label">Static Workbench canvas / COCKPIT-MVP-014</div>
    <div class="canvas-toolbar">
      <span class="canvas-mode-chip" title="Inspect-only static canvas">Inspect-only</span>
      <button class="icon-btn" type="button" aria-label="Grid view" title="Static grid view">${icon('graph')}</button>
      <span class="mono" style="color: var(--text-muted); font-size: .72rem; padding: 0 6px;">100%</span>
      <button class="icon-btn" type="button" aria-label="Lock view" title="Local view lock only">${icon('lock')}</button>
    </div>`;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'workflow-lines');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('preserveAspectRatio', 'none');
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  defs.innerHTML = `<marker id="edge-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(141,162,191,.72)"></path></marker>`;
  svg.appendChild(defs);
  window.mockData.workflowEdges.forEach((edge) => {
    const source = window.mockData.nodes.find((node) => node.id === edge.source);
    const target = window.mockData.nodes.find((node) => node.id === edge.target);
    if (!source || !target) return;
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', String(source.x));
    line.setAttribute('y1', String(source.y));
    line.setAttribute('x2', String(target.x));
    line.setAttribute('y2', String(target.y));
    line.setAttribute('class', `edge-${edge.tone || 'neutral'}`);
    line.setAttribute('marker-end', 'url(#edge-arrow)');
    svg.appendChild(line);
  });
  canvas.appendChild(svg);

  window.mockData.nodes.forEach((node) => {
    const card = createElement('button', `node-card node-type-${node.type} status-tone-${statusTone(node.status)}`);
    card.type = 'button';
    card.style.left = `${node.x}%`;
    card.style.top = `${node.y}%`;
    card.dataset.nodeId = node.id;
    card.setAttribute('aria-label', `Select ${node.familyLabel || node.typeLabel || node.type} ${node.title || node.label}`);
    if (window.appState.selectedNodeId === node.id) card.classList.add('selected');
    card.innerHTML = `<span class="node-handle node-handle-input" aria-hidden="true"></span>
      <span class="node-handle node-handle-output" aria-hidden="true"></span>
      <div class="node-topline">
        <span class="node-type-icon">${icon(NODE_ICON_BY_TYPE[node.type] || 'spark')}</span>
        <div class="node-copy">
          <div class="node-type-label">${node.familyLabel || node.typeLabel || node.type}</div>
          <div class="node-label">${node.title || node.label}</div>
        </div>
        <span class="node-index mono">${node.id}</span>
      </div>
      <p class="node-subtitle">${node.subtitle || node.description}</p>
      <div class="node-readiness-row">
        ${renderStatusChip(node.readiness || node.status, readinessLabel(node.readiness || node.status))}
        <span class="node-metric node-metric-blocker" title="Local blocker count">${node.blockerCount || 0} blockers</span>
        <span class="node-metric node-metric-evidence" title="Linked mock evidence count">${node.evidenceCount || 0} evidence</span>
      </div>
      <div class="node-card-footer"><span>${node.config || 'Static config'}</span><strong>${node.model || 'Mock only'}</strong></div>`;
    card.addEventListener('click', (event) => {
      event.stopPropagation();
      selectNode(node.id);
    });
    canvas.appendChild(card);
  });

  const addNode = createElement('button', 'canvas-add-node');
  addNode.type = 'button';
  addNode.title = 'Mock add-node affordance. This records local UI state only.';
  addNode.innerHTML = `${icon('add')}Mock add node<span>Local placeholder only</span>`;
  addNode.addEventListener('click', (event) => {
    event.stopPropagation();
    window.appState.mockAddNodeRequested = true;
    window.appState.lastLocalValidation = 'Mock add-node request captured locally. No node changed runtime state or persisted.';
    window.renderPage('workbench');
  });
  canvas.appendChild(addNode);

  if (window.appState.mockAddNodeRequested) {
    const notice = createElement('div', 'canvas-local-note');
    notice.innerHTML = `${icon('check')}Mock add-node request recorded in local state only. Reloading the page clears it.`;
    canvas.appendChild(notice);
  }

  canvas.appendChild(createElement('div', 'canvas-minimap'));
  return canvas;
}

function selectNode(nodeId) {
  window.appState.selectedNodeId = nodeId;
  if (window.appState.currentPage === 'workbench') {
    window.renderPage('workbench');
  }
  renderNodeInspector(nodeId);
}

function renderNodeInspector(nodeId) {
  const inspector = document.getElementById('right-inspector');
  if (!inspector) return;
  const node = window.mockData.nodes.find((n) => n.id === nodeId);
  setInspectorOpen(true);
  if (!node) {
    inspector.innerHTML = `<div class="inspector-header">
        <div>
          <span class="chip chip-secondary">Workbench</span>
          <div class="inspector-title">No node selected</div>
          <div class="inspector-id">Inspect-only static MVP</div>
        </div>
        <button class="icon-btn" type="button" aria-label="Close inspector" id="close-inspector">${icon('close')}</button>
      </div>
      <div class="inspector-empty">
        <h4>Select a node to inspect artifact readiness</h4>
        <p>Use the canvas cards to inspect requirements, evidence, review context, and handoff blockers without leaving the Workbench.</p>
      </div>`;
    inspector.querySelector('#close-inspector').addEventListener('click', () => setInspectorOpen(false));
    return;
  }

  const inboundEdges = window.mockData.workflowEdges.filter((edge) => edge.target === node.id);
  const outboundEdges = window.mockData.workflowEdges.filter((edge) => edge.source === node.id);
  const edgeLabel = (edge, direction) => {
    const otherId = direction === 'input' ? edge.source : edge.target;
    const other = window.mockData.nodes.find((n) => n.id === otherId);
    return other ? other.label : otherId;
  };
  const activeTab = window.appState.inspectorTab || 'overview';
  inspector.innerHTML = `<div class="inspector-header">
      <div>
        <span class="chip chip-secondary">${node.familyLabel || node.typeLabel || node.type}</span>
        <div class="inspector-title">${node.title || node.label}</div>
        <div class="inspector-id">${node.id} / ${node.label}</div>
      </div>
      <button class="icon-btn" type="button" aria-label="Close inspector" id="close-inspector">${icon('close')}</button>
    </div>
    <div class="inspector-tablist" role="tablist" aria-label="Node inspector tabs">
      ${INSPECTOR_TABS.map((tab) => `<button class="inspector-tab${tab.id === activeTab ? ' active' : ''}" type="button" role="tab" aria-selected="${tab.id === activeTab}" data-tab="${tab.id}">${tab.label}</button>`).join('')}
    </div>
    <div class="inspector-tab-panel">
      ${renderInspectorTabContent(node, activeTab, inboundEdges, outboundEdges, edgeLabel)}
    </div>
    <div class="inspector-section">
      <h4>Static-only notice</h4>
      <div class="static-notice">Local only / Mock data / Inspect-only. This inspector updates browser mock state only. It does not call AI services, mutate runtime state, write repositories or deploy artifacts.</div>
    </div>`;

  inspector.querySelectorAll('[data-tab]').forEach((tab) => {
    tab.addEventListener('click', () => {
      window.appState.inspectorTab = tab.dataset.tab;
      renderNodeInspector(node.id);
    });
  });

  const handoffAction = inspector.querySelector('#inspector-handoff-action');
  if (handoffAction) {
    handoffAction.addEventListener('click', () => {
      if (window.appState.handoffReady) {
        alert('Preparing static handoff packet... (placeholder)');
      } else {
        alert('Prepare handoff is gated by local readiness blockers.');
      }
    });
  }

  inspector.querySelector('#close-inspector').addEventListener('click', () => setInspectorOpen(false));
}

function renderInspectorTabContent(node, activeTab, inboundEdges, outboundEdges, edgeLabel) {
  const readiness = getReadinessSummary();
  switch (activeTab) {
    case 'requirements':
      return `<div class="inspector-section">
          <h4>Requirements</h4>
          ${renderInspectorList(node.requirements || ['No requirements recorded for this mock node'])}
        </div>
        <div class="inspector-section">
          <h4>Inputs</h4>
          ${renderInspectorList([...(node.inputs || []), ...inboundEdges.map((edge) => `From ${edgeLabel(edge, 'input')}`)])}
        </div>
        <div class="inspector-section">
          <h4>Outputs</h4>
          ${renderInspectorList([...(node.outputs || []), ...outboundEdges.map((edge) => `To ${edgeLabel(edge, 'output')}`)])}
        </div>`;
    case 'evidence':
      return `<div class="inspector-section">
          <h4>Evidence</h4>
          <div class="inspector-count-row">
            <span>${node.evidenceCount || 0} linked evidence items</span>
            ${renderStatusChip(readiness.missingEvidence.length ? 'needs-evidence' : 'ready', readiness.missingEvidence.length ? `${readiness.missingEvidence.length} missing` : 'Evidence reviewed')}
          </div>
          ${renderInspectorList(node.evidence || node.trace || ['No evidence configured'])}
        </div>
        <div class="inspector-section">
          <h4>Trace links</h4>
          ${renderInspectorList(node.trace || ['No trace links configured'])}
        </div>`;
    case 'review':
      return `<div class="inspector-section">
          <h4>Review Gate</h4>
          <div class="inspector-count-row">
            <span>${node.blockerCount || 0} local blockers on this node</span>
            ${renderStatusChip(readiness.reviewBlockers.length ? 'review-blocked' : 'ready', readiness.reviewBlockers.length ? `${readiness.reviewBlockers.length} review blockers` : 'Review acknowledged')}
          </div>
          ${renderInspectorList(node.review || ['No review notes configured'])}
        </div>
        <div class="inspector-section">
          <h4>Guardrails</h4>
          ${renderInspectorList(node.guardrails || ['Static-only behavior'])}
        </div>`;
    case 'handoff':
      return `<div class="inspector-section">
          <h4>Handoff Packet</h4>
          <div class="handoff-gate-card">
            ${renderStatusChip(readiness.ready ? 'ready' : 'blocked', readiness.ready ? 'Ready locally' : 'Gated locally')}
            <p>${readiness.ready ? 'The local checklist is clear. Preparing a handoff still creates only a static placeholder.' : 'Prepare handoff stays disabled until the local readiness checklist is clear.'}</p>
            ${renderInspectorList(readiness.handoffBlockers.length ? readiness.handoffBlockers : ['No local handoff blockers'])}
            <button class="action-btn action-primary" id="inspector-handoff-action" type="button" ${readiness.ready ? '' : 'disabled'}>${icon('handoff')}Prepare handoff</button>
          </div>
        </div>
        <div class="inspector-section">
          <h4>Selected node handoff context</h4>
          ${renderInspectorList(node.handoff || ['No handoff context configured'])}
        </div>`;
    case 'overview':
    default:
      return `<div class="inspector-section">
          <h4>Overview</h4>
          <div class="inspector-grid">
            <div class="inspector-row"><span>Purpose</span><strong>${node.description}</strong></div>
            <div class="inspector-row"><span>Family</span><strong>${node.familyLabel || node.typeLabel || node.type}</strong></div>
            <div class="inspector-row"><span>Config</span><strong>${node.config || 'Static config'}</strong></div>
            <div class="inspector-row"><span>Mode</span><strong>${node.model || 'Mock only'}</strong></div>
            <div class="inspector-row"><span>Readiness</span><strong>${readinessLabel(node.readiness || node.status)}</strong></div>
          </div>
        </div>`;
  }
}

function renderInspectorList(items) {
  const safeItems = items && items.length ? items : ['None'];
  return `<ul class="inspector-list">${safeItems.map((item) => `<li>${item}</li>`).join('')}</ul>`;
}

function renderUtilityTray(selectedNode) {
  const readiness = getReadinessSummary();
  const tray = createElement('section', `utility-tray${window.appState.utilityTrayCollapsed ? ' is-collapsed' : ''}`);
  tray.setAttribute('aria-label', 'Evidence and validation utility tray');
  tray.innerHTML = `<div class="utility-tray-header">
      <div>
        <h3>Evidence & Validation</h3>
        <p>${selectedNode ? `${selectedNode.id} / ${selectedNode.title || selectedNode.label}` : 'Select a node to inspect local artifact evidence.'}</p>
      </div>
      <div class="utility-tray-actions">
        ${renderStatusChip(readiness.ready ? 'ready' : 'blocked', readiness.ready ? 'Ready locally' : `${readiness.handoffBlockers.length} blockers`)}
        <button class="action-btn" type="button" id="toggle-utility-tray">${window.appState.utilityTrayCollapsed ? 'Expand tray' : 'Collapse tray'}</button>
      </div>
    </div>`;

  if (!window.appState.utilityTrayCollapsed) {
    const body = createElement('div', 'utility-tray-body');
    body.innerHTML = `<section class="readiness-panel">
        <div class="readiness-panel-head">
          <h4>Global readiness checklist</h4>
          <span class="mode-chip">Static / Local only</span>
        </div>
        <div class="readiness-grid">
          ${renderReadinessTile('Missing evidence', readiness.missingEvidence.length, readiness.missingEvidence.map((field) => field.name), window.appState.evidenceReviewed)}
          ${renderReadinessTile('Missing decisions', readiness.pendingDecisions.length, readiness.pendingDecisions.map((decision) => decision.id), false)}
          ${renderReadinessTile('Review blockers', readiness.reviewBlockers.length, readiness.reviewBlockers.map((review) => review.name), window.appState.reviewBlockersAcknowledged)}
          ${renderReadinessTile('Handoff blockers', readiness.handoffBlockers.length, readiness.handoffBlockers, readiness.ready)}
        </div>
        <div class="readiness-actions">
          <button class="action-btn" type="button" id="mark-evidence-reviewed">${icon('check')}Mark evidence reviewed locally</button>
          <button class="action-btn" type="button" id="ack-review-blockers">${icon('review')}Acknowledge review blockers locally</button>
        </div>
      </section>
      <section class="selected-evidence-panel">
        <h4>Selected node evidence surface</h4>
        ${selectedNode ? renderInspectorList(selectedNode.evidence || selectedNode.trace || ['No evidence attached to this mock node']) : '<div class="empty-state compact">Select a node to see its Evidence, Review, and Handoff context here.</div>'}
      </section>
      <section class="selected-evidence-panel">
        <h4>Local validation note</h4>
        <p>${window.appState.lastLocalValidation || 'No local validation action has been recorded in this browser session.'}</p>
        <button class="action-btn" type="button" id="validate-selected-node" ${selectedNode ? '' : 'disabled'}>${icon('review')}Validate selected artifact locally</button>
      </section>`;
    tray.appendChild(body);
  }

  tray.querySelector('#toggle-utility-tray').addEventListener('click', () => {
    window.appState.utilityTrayCollapsed = !window.appState.utilityTrayCollapsed;
    window.renderPage('workbench');
  });

  const markEvidence = tray.querySelector('#mark-evidence-reviewed');
  if (markEvidence) {
    markEvidence.addEventListener('click', () => {
      window.appState.evidenceReviewed = true;
      window.appState.lastLocalValidation = 'Evidence gaps were marked reviewed in local mock state only.';
      syncShellState(window.appState.currentPage);
      window.renderPage('workbench');
    });
  }

  const ackReview = tray.querySelector('#ack-review-blockers');
  if (ackReview) {
    ackReview.addEventListener('click', () => {
      window.appState.reviewBlockersAcknowledged = true;
      window.appState.lastLocalValidation = 'Review blockers were acknowledged in local mock state only.';
      syncShellState(window.appState.currentPage);
      window.renderPage('workbench');
    });
  }

  const validateSelected = tray.querySelector('#validate-selected-node');
  if (validateSelected) {
    validateSelected.addEventListener('click', () => {
      const node = getSelectedNode();
      window.appState.lastLocalValidation = node
        ? `${node.id} ${node.title || node.label} checked locally. No runtime, external service, or repository action occurred.`
        : 'No node selected for local validation.';
      window.renderPage('workbench');
    });
  }

  return tray;
}

function renderReadinessTile(label, count, details, resolved) {
  const status = count === 0 || resolved ? 'ready' : 'blocked';
  const summary = count === 0 || resolved ? 'Clear' : `${count} open`;
  const items = details && details.length ? details.slice(0, 3) : ['No open items'];
  return `<article class="readiness-tile ${status === 'ready' ? 'is-clear' : 'is-blocked'}">
      <div class="readiness-tile-head">
        <span>${label}</span>
        ${renderStatusChip(status, summary)}
      </div>
      ${renderInspectorList(items)}
    </article>`;
}

function addSelectedToContext() {
  if (!window.appState.selectedNodeId) {
    alert('Select a node to add to context.');
    return;
  }
  const node = window.mockData.nodes.find((n) => n.id === window.appState.selectedNodeId);
  if (!node) return;
  const exists = window.appState.context.some((item) => item.label === node.label);
  if (exists) {
    alert('This node is already in the context.');
    return;
  }
  window.appState.context.push({ id: node.id, label: node.label });
  window.renderPage('workbench');
  renderNodeInspector(node.id);
}

function removeContextItem(idx) {
  window.appState.context.splice(idx, 1);
  window.renderPage('workbench');
}

function getStatusClass(status) {
  switch (status) {
    case 'validated':
    case 'allowed':
    case 'complete':
      return 'status-validated';
    case 'needs-lock':
      return 'status-needs-lock';
    case 'needs-answer':
      return 'status-needs-answer';
    case 'missing':
      return 'status-missing';
    case 'blocked':
      return 'status-blocked';
    case 'draft':
      return 'status-draft';
    case 'needs-sync':
      return 'status-needs-sync';
    case 'ready':
    case 'needs-evidence':
    case 'review-blocked':
    case 'needs-decision':
      return `status-${status}`;
    case 'inspect':
      return 'status-inspect';
    case 'locked':
      return 'status-validated';
    default:
      return 'status-neutral';
  }
}

function statusTone(status) {
  switch (status) {
    case 'validated':
    case 'allowed':
    case 'complete':
    case 'locked':
      return 'validated';
    case 'needs-lock':
    case 'needs-answer':
    case 'needs-sync':
      return 'warning';
    case 'missing':
    case 'blocked':
      return status;
    case 'draft':
      return 'draft';
    default:
      return 'neutral';
  }
}

function statusLabel(status) {
  switch (status) {
    case 'validated':
      return 'Validated';
    case 'allowed':
      return 'Allowed';
    case 'complete':
      return 'Complete';
    case 'locked':
      return 'Locked';
    case 'needs-lock':
      return 'Needs lock';
    case 'needs-answer':
      return 'Needs answer';
    case 'missing':
      return 'Missing';
    case 'blocked':
      return 'Blocked';
    case 'draft':
      return 'Draft';
    case 'needs-sync':
      return 'Needs sync';
    case 'ready':
      return 'Ready';
    case 'needs-evidence':
      return 'Needs evidence';
    case 'review-blocked':
      return 'Review blockers';
    case 'needs-decision':
      return 'Needs decision';
    default:
      return status;
  }
}

function readinessLabel(status) {
  return statusLabel(status).replace('Needs lock', 'Needs decision');
}

function renderSpecBuilder(container) {
  showGovernance(true);
  renderPageHeader(container, {
    kicker: 'Spec Builder',
    title: 'Controlled Build Specification',
    subtitle: 'Choose a template, resolve fields, lock answers, and validate only when the required gates are clean.',
  });

  const templateSelectorDiv = createElement('div', 'template-selector');
  const label = createElement('label', '', 'Select template');
  label.setAttribute('for', 'template-select');
  const select = createElement('select');
  select.id = 'template-select';
  [
    'UI / UX Spec',
    'Workflow Automation Spec',
    'Data / Read Model Spec',
    'Decision / Governance Spec',
    'Feedback Packet Spec',
    'Integration / Handoff Spec',
    'Validation / QA Spec',
    'Agent / Subagent Spec',
    'Research Promotion Spec',
    'Runtime-Protected Review Spec',
  ].forEach((template) => {
    const option = createElement('option');
    option.value = template;
    option.textContent = template;
    select.appendChild(option);
  });
  templateSelectorDiv.append(label, select);
  container.appendChild(templateSelectorDiv);

  const table = createElement('table', 'field-table');
  table.innerHTML = '<thead><tr><th>Field</th><th>Value</th><th>Status</th><th>Actions</th></tr></thead>';
  const tbody = createElement('tbody');
  window.appState.specFields.forEach((field) => {
    const tr = createElement('tr');
    tr.appendChild(createElement('td', '', field.name));
    const tdValue = createElement('td');
    tdValue.textContent = field.value || field.suggestion || '';
    if (!field.value && field.suggestion) tdValue.style.fontStyle = 'normal';
    tr.appendChild(tdValue);

    const tdStatus = createElement('td');
    tdStatus.innerHTML = renderFieldStatus(field);
    tr.appendChild(tdStatus);

    const tdActions = createElement('td', 'field-actions');
    [
      ['Explain', () => alert('Explain: ' + field.name)],
      ['Suggest', () => {
        field.value = field.suggestion;
        field.status = 'draft';
        window.appState.specValidated = false;
        window.renderPage('spec-builder');
      }],
      ['Ask one', () => alert('Ask a question for ' + field.name)],
      ['Lock', () => {
        field.status = 'locked';
        window.appState.specValidated = false;
        window.renderPage('spec-builder');
      }],
      ['Trace', () => window.navigate('trace')],
    ].forEach(([text, handler]) => {
      const btn = createElement('button', '', text);
      btn.type = 'button';
      btn.addEventListener('click', handler);
      tdActions.appendChild(btn);
    });
    tr.appendChild(tdActions);
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  container.appendChild(table);

  const missing = hasUnresolvedSpecFields();
  const banner = createElement('div', missing ? 'warning-banner' : 'success-banner');
  banner.style.marginTop = '12px';
  banner.innerHTML = `${icon(missing ? 'warning' : 'check')}${missing ? 'Some required fields are missing or unresolved. Complete all fields before handoff.' : 'All required fields have been completed.'}`;
  container.appendChild(banner);

  const actions = createElement('div', 'button-row');
  actions.style.marginTop = '12px';
  const btnValidate = createElement('button', 'action-btn');
  btnValidate.type = 'button';
  btnValidate.innerHTML = `${icon('review')}Validate artifacts`;
  btnValidate.addEventListener('click', () => {
    if (hasUnresolvedSpecFields()) {
      alert('Cannot validate: some fields are unresolved.');
    } else {
      window.appState.specValidated = true;
      updateHandoffReadiness();
      const readiness = getReadinessSummary();
      if (readiness.handoffBlockers.length) {
        alert(`Specification validated locally. Handoff remains gated by ${readiness.handoffBlockers.length} local checklist item(s).`);
      } else {
        alert('Specification validated locally. Static handoff placeholder is ready.');
      }
      window.renderPage('spec-builder');
    }
  });
  actions.appendChild(btnValidate);

  const btnHandoff = createElement('button', 'action-btn action-primary');
  btnHandoff.type = 'button';
  btnHandoff.disabled = !window.appState.handoffReady;
  btnHandoff.innerHTML = `${icon('handoff')}Prepare handoff`;
  btnHandoff.addEventListener('click', () => {
    if (window.appState.handoffReady) {
      alert('Preparing static handoff placeholder...');
    } else {
      alert('Prepare handoff is gated by local readiness blockers.');
    }
  });
  actions.appendChild(btnHandoff);
  container.appendChild(actions);
}

function renderFieldStatus(field) {
  switch (field.status) {
    case 'ai-suggested':
      return renderStatusChip('needs-answer', 'AI suggested');
    case 'locked':
      return renderStatusChip('locked', 'Locked');
    default:
      return renderStatusChip(field.status);
  }
}

function hasUnresolvedSpecFields() {
  return window.appState.specFields.some((field) => ['ai-suggested', 'missing', 'needs-answer', 'needs-lock'].includes(field.status));
}

function hasPendingDecisions() {
  return window.appState.decisions.some((decision) => decision.status === 'needs-lock');
}

function renderReviewRuns(container) {
  showGovernance(true);
  renderPageHeader(container, {
    kicker: 'Inspect-only',
    title: 'Review Runs',
    subtitle: 'Review checks are advisory and inspect-only. They never execute code, mutate runtime state, or touch repositories.',
  });

  const scope = createElement('section', 'panel');
  scope.innerHTML = `<h3>Scope</h3><p>${window.appState.context.map((c) => c.label).join(', ') || 'No context selected.'}</p>`;
  container.appendChild(scope);

  const btnStart = createElement('button', 'action-btn');
  btnStart.type = 'button';
  btnStart.style.marginTop = '12px';
  btnStart.innerHTML = `${icon('review')}Start review checks`;
  btnStart.addEventListener('click', () => showReviewResults(resultsDiv));
  container.appendChild(btnStart);

  const resultsDiv = createElement('div', 'review-list');
  resultsDiv.id = 'review-results';
  resultsDiv.style.marginTop = '12px';
  container.appendChild(resultsDiv);
}

function showReviewResults(resultsDiv) {
  resultsDiv.innerHTML = '';
  window.appState.reviewResults.forEach((rev) => {
    const card = createElement('article', 'review-result-card');
    card.innerHTML = `<h4>${rev.name}</h4>
      <p><strong>Verdict:</strong> ${rev.verdict}</p>
      <p><strong>Findings:</strong> ${rev.findings}</p>
      ${renderSeverityChip(rev.severity)}`;
    const detailList = createElement('ul');
    rev.details.forEach((detail) => detailList.appendChild(createElement('li', '', detail)));
    card.appendChild(detailList);

    const actionRow = createElement('div', 'finding-actions');
    [
      ['Accept', () => alert('Accepted finding for ' + rev.name)],
      ['Defer', () => alert('Deferred finding for ' + rev.name)],
    ].forEach(([text, handler]) => {
      const btn = createElement('button', '', text);
      btn.type = 'button';
      btn.addEventListener('click', handler);
      actionRow.appendChild(btn);
    });
    card.appendChild(actionRow);
    resultsDiv.appendChild(card);
  });
}

function renderSeverityChip(severity) {
  if (severity === 'high') return renderStatusChip('blocked', 'High severity');
  if (severity === 'medium') return renderStatusChip('needs-lock', 'Medium severity');
  return renderStatusChip('validated', 'Low severity');
}

function renderPreview(container) {
  showGovernance(true);
  renderPageHeader(container, {
    kicker: 'Preview',
    title: 'UI / HTML Viewer',
    subtitle: 'Inspect the static artifact shell and compare visible coverage against the current specification state.',
  });

  const selectorDiv = createElement('div', 'control-row');
  const label = createElement('label', '', 'Artifact type');
  label.setAttribute('for', 'artifact-type');
  const select = createElement('select');
  select.id = 'artifact-type';
  ['UI Mockup', 'HTML Mockup', 'Component Shell'].forEach((type) => {
    const opt = createElement('option');
    opt.value = type;
    opt.textContent = type;
    select.appendChild(opt);
  });
  selectorDiv.append(label, select);
  container.appendChild(selectorDiv);

  const frame = createElement('div', 'preview-frame');
  frame.innerHTML = `<div class="preview-frame-content">
      <div class="preview-frame-title">Static preview of selected artifact</div>
      <div class="preview-frame-caption">COCKPIT-MVP-014 | offline shell</div>
    </div>`;
  container.appendChild(frame);

  const viewportControls = createElement('div', 'button-row');
  [
    ['+', () => alert('Zoom in (stub)')],
    ['-', () => alert('Zoom out (stub)')],
  ].forEach(([text, handler]) => {
    const btn = createElement('button', 'action-btn', text);
    btn.type = 'button';
    btn.addEventListener('click', handler);
    viewportControls.appendChild(btn);
  });
  container.appendChild(viewportControls);

  const needsSync = window.appState.specFields.some((f) => f.status !== 'locked' && f.status !== 'draft');
  const syncStatus = createElement('section', 'panel');
  syncStatus.style.marginTop = '12px';
  syncStatus.innerHTML = `<h3>Sync status</h3>${renderStatusChip(needsSync ? 'needs-sync' : 'validated', needsSync ? 'Needs sync' : 'Up to date')}`;
  container.appendChild(syncStatus);

  const checklist = createElement('section', 'panel');
  checklist.style.marginTop = '12px';
  checklist.innerHTML = '<h3>Spec coverage</h3>';
  const ul = createElement('ul');
  window.appState.specFields.forEach((field) => {
    ul.appendChild(createElement('li', '', `${field.name}: ${field.status === 'locked' || field.status === 'draft' ? 'Covered' : 'Incomplete'}`));
  });
  checklist.appendChild(ul);
  container.appendChild(checklist);

  const linked = createElement('section', 'panel');
  linked.style.marginTop = '12px';
  linked.innerHTML = '<h3>Linked review findings</h3>';
  const linkedList = createElement('ul');
  window.appState.reviewResults.forEach((rev) => {
    linkedList.appendChild(createElement('li', '', `${rev.name}: ${rev.verdict}`));
  });
  linked.appendChild(linkedList);
  container.appendChild(linked);

  const actions = createElement('div', 'button-row');
  actions.style.marginTop = '12px';
  [
    ['View static mockup', 'spark', () => alert('Opening static mockup placeholder. No generation occurs.')],
    ['Compare static spec', 'check', () => alert('Comparing preview with spec in local mock state only.')],
    ['Inspect UX notes', 'eye', () => alert('UX notes are inspect-only placeholders.')],
    ['Prepare preview packet', 'handoff', () => alert('Preparing preview packet placeholder only.'), !window.appState.handoffReady],
  ].forEach(([text, iconName, handler, disabled]) => {
    const btn = createElement('button', 'action-btn');
    btn.type = 'button';
    btn.disabled = Boolean(disabled);
    btn.innerHTML = `${icon(iconName)}${text}`;
    btn.addEventListener('click', handler);
    actions.appendChild(btn);
  });
  container.appendChild(actions);
}

function renderDecisions(container) {
  showGovernance(true);
  renderPageHeader(container, {
    kicker: 'Point locks',
    title: 'Decisions',
    subtitle: 'Lock or defer approval points before handoff becomes available.',
  });

  const needsLock = window.appState.decisions.filter((d) => d.status === 'needs-lock');
  const locked = window.appState.decisions.filter((d) => d.status === 'locked');

  const section1 = createElement('section');
  section1.innerHTML = '<h3 class="section-title">Needs Point lock</h3>';
  const list1 = createElement('div', 'decision-list');
  if (needsLock.length === 0) {
    list1.appendChild(createElement('div', 'panel', 'No decisions require locking.'));
  } else {
    needsLock.forEach((decision) => list1.appendChild(createDecisionCard(decision)));
  }
  section1.appendChild(list1);
  container.appendChild(section1);

  const section2 = createElement('section');
  section2.style.marginTop = '16px';
  section2.innerHTML = '<h3 class="section-title">Locked decisions</h3>';
  const list2 = createElement('div', 'decision-list');
  if (locked.length === 0) {
    list2.appendChild(createElement('div', 'panel', 'No locked decisions.'));
  } else {
    locked.forEach((decision) => list2.appendChild(createDecisionCard(decision)));
  }
  section2.appendChild(list2);
  container.appendChild(section2);
}

function createDecisionCard(dec) {
  const card = createElement('article', 'decision-card');
  card.innerHTML = `<h4><span class="mono">${dec.id}</span>: ${dec.title}</h4>
    <p>${dec.description}</p>
    ${renderStatusChip(dec.status === 'locked' ? 'locked' : 'needs-lock', dec.status === 'locked' ? 'Locked' : 'Needs lock')}`;

  const comparator = createElement('div', 'decision-options');
  dec.options.forEach((opt) => {
    const optBtn = createElement('button', `action-btn${dec.chosenOption === opt ? ' selected' : ''}`, opt);
    optBtn.type = 'button';
    optBtn.addEventListener('click', () => {
      dec.chosenOption = opt;
      dec.status = 'locked';
      updateHandoffReadiness();
      window.renderPage('decisions');
    });
    comparator.appendChild(optBtn);
  });
  card.appendChild(comparator);

  const actions = createElement('div', 'decision-actions');
  [
    ['Lock decision', 'lock', () => {
      dec.status = 'locked';
      if (!dec.chosenOption) dec.chosenOption = dec.options[0];
      updateHandoffReadiness();
      window.renderPage('decisions');
    }],
    ['Defer', 'warning', () => {
      dec.status = 'needs-lock';
      dec.chosenOption = null;
      updateHandoffReadiness();
      window.renderPage('decisions');
    }],
    ['Open trace', 'trace', () => window.navigate('trace')],
  ].forEach(([text, iconName, handler]) => {
    const btn = createElement('button', 'action-btn');
    btn.type = 'button';
    btn.innerHTML = `${icon(iconName)}${text}`;
    btn.addEventListener('click', handler);
    actions.appendChild(btn);
  });
  card.appendChild(actions);
  return card;
}

function renderTrace(container) {
  showGovernance(true);
  renderPageHeader(container, {
    kicker: 'Traceability',
    title: 'Trace & Evidence',
    subtitle: 'Follow source-to-target links across context, spec fields, decisions, and artifact readiness.',
  });

  const graph = createElement('div', 'trace-graph');
  graph.innerHTML = `<div class="trace-graph-inner">
      <div class="trace-node">Sources</div>
      <div class="trace-node">Spec Fields</div>
      <div class="trace-node">Decisions</div>
      <div class="trace-node">Artifacts</div>
    </div>`;
  container.appendChild(graph);

  const table = createElement('table', 'evidence-table');
  table.innerHTML = '<thead><tr><th>Source</th><th>Target</th><th>Description</th></tr></thead>';
  const tbody = createElement('tbody');
  window.appState.traceLinks.forEach((link) => {
    const tr = createElement('tr');
    tr.appendChild(createElement('td', 'mono', link.source));
    tr.appendChild(createElement('td', 'mono', link.target));
    tr.appendChild(createElement('td', '', `Link from ${link.source} to ${link.target}`));
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  container.appendChild(table);

  const missingFields = window.appState.specFields.filter((f) => !window.appState.traceLinks.some((l) => l.target === f.id));
  if (missingFields.length > 0) {
    const warn = createElement('div', 'warning-banner');
    warn.style.marginTop = '12px';
    warn.innerHTML = `${icon('warning')}Warning: Some spec fields do not have trace evidence. Export will be blocked until all fields are traced.`;
    container.appendChild(warn);
  }
}

function renderRules(container) {
  showGovernance(true);
  renderPageHeader(container, {
    kicker: 'Governance',
    title: 'Rules & Scope',
    subtitle: 'The safety model keeps runtime mutation, secrets, external actions, and repository writes outside this static shell.',
  });

  const table = createElement('table', 'rules-matrix');
  table.innerHTML = '<thead><tr><th>Rule</th><th>Allowed?</th><th>Review Gate</th></tr></thead>';
  const tbody = createElement('tbody');
  window.appState.rules.forEach((rule) => {
    const tr = createElement('tr');
    tr.appendChild(createElement('td', '', rule.name));
    const tdAllowed = createElement('td');
    tdAllowed.innerHTML = renderStatusChip(rule.allowed ? 'allowed' : 'blocked', rule.allowed ? 'Yes' : 'No');
    tr.appendChild(tdAllowed);
    tr.appendChild(createElement('td', '', rule.reviewGate));
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  container.appendChild(table);

  const summaries = createElement('div', 'rules-summary-grid rules-note');
  const ps = createElement('section', 'panel');
  ps.innerHTML = `<h3>Protected surfaces</h3><p>${window.appState.protected.map((p) => p.label).join(', ')}</p>`;
  summaries.appendChild(ps);
  const gateSummary = createElement('section', 'panel');
  gateSummary.innerHTML = '<h3>Review Gate Summary</h3><p>Runtime mutation is blocked; repo writes are only allowed at handoff; secret and external actions are excluded; agents can inspect only; Codex handoff is gated until ready.</p>';
  summaries.appendChild(gateSummary);
  container.appendChild(summaries);
}

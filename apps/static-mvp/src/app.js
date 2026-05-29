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

function updateHandoffReadiness() {
  window.appState.handoffReady = Boolean(window.appState.specValidated) && !hasUnresolvedSpecFields() && !hasPendingDecisions();
}

function syncShellState(page) {
  updateHandoffReadiness();
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
    handoffButton.title = window.appState.handoffReady ? 'Open static handoff placeholder' : 'Complete spec, decisions and reviews before handoff';
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
        alert('Cannot prepare handoff yet. Complete the spec, resolve decisions and reviews first.');
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

function renderWorkbench(container) {
  showGovernance(true);
  renderPageHeader(container, {
    kicker: 'Workflow Studio',
    title: 'Workbench',
    subtitle: 'Select static workflow operators, review safe node types, and inspect governed configuration without runtime mutation.',
    className: 'workbench-header',
  });

  const layout = createElement('section', 'workbench-layout');
  const sidebar = createElement('aside', 'workbench-sidebar');
  sidebar.appendChild(renderNodePalette());
  sidebar.appendChild(renderContextBasket());
  layout.appendChild(sidebar);
  layout.appendChild(renderNodeCanvas());
  container.appendChild(layout);
}

function renderNodePalette() {
  const palette = createElement('section', 'panel node-palette');
  palette.innerHTML = `<div class="node-palette-header">
      <h3>Node Palette</h3>
      <p>OpenClaw-safe static node types. Selection stays local to this mockup.</p>
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
    ['Include upstream', 'branch', () => alert('Include upstream nodes (not implemented)')],
    ['Include downstream', 'arrow', () => alert('Include downstream nodes (not implemented)')],
    ['Clear basket', 'close', () => {
      window.appState.context = [];
      window.renderPage('workbench');
    }],
    ['Preview context', 'eye', () => alert('Context preview not implemented.')],
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
  canvas.innerHTML = `<div class="canvas-label">Static workflow canvas / COCKPIT-MVP-014</div>
    <div class="canvas-toolbar">
      <button class="icon-btn" type="button" aria-label="Grid view">${icon('graph')}</button>
      <span class="mono" style="color: var(--text-muted); font-size: .72rem; padding: 0 6px;">100%</span>
      <button class="icon-btn" type="button" aria-label="Lock view">${icon('lock')}</button>
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
    if (window.appState.selectedNodeId === node.id) card.classList.add('selected');
    card.innerHTML = `<span class="node-handle node-handle-input" aria-hidden="true"></span>
      <span class="node-handle node-handle-output" aria-hidden="true"></span>
      <div class="node-topline">
        <span class="node-type-icon">${icon(NODE_ICON_BY_TYPE[node.type] || 'spark')}</span>
        <div class="node-copy">
          <div class="node-type-label">${node.typeLabel || node.type}</div>
          <div class="node-label">${node.label}</div>
        </div>
        <span class="node-index">${node.index || node.id}</span>
      </div>
      <div class="node-config-rows">
        <div class="node-config-row"><span>Config</span><strong>${node.config || 'Static config'}</strong></div>
        <div class="node-config-row"><span>Model</span><strong>${node.model || 'Mock only'}</strong></div>
        <div class="node-config-row"><span>Status</span><strong>${statusLabel(node.status)}</strong></div>
      </div>
      <div class="node-card-footer">${renderStatusChip(node.status)}</div>`;
    card.addEventListener('click', (event) => {
      event.stopPropagation();
      selectNode(node.id);
    });
    canvas.appendChild(card);
  });

  canvas.addEventListener('click', () => setInspectorOpen(false));
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
  if (!node) return;

  setInspectorOpen(true);
  const inboundEdges = window.mockData.workflowEdges.filter((edge) => edge.target === node.id);
  const outboundEdges = window.mockData.workflowEdges.filter((edge) => edge.source === node.id);
  const edgeLabel = (edge, direction) => {
    const otherId = direction === 'input' ? edge.source : edge.target;
    const other = window.mockData.nodes.find((n) => n.id === otherId);
    return other ? other.label : otherId;
  };
  inspector.innerHTML = `<div class="inspector-header">
      <div>
        <span class="chip chip-secondary">${node.typeLabel || node.type}</span>
        <div class="inspector-title">${node.label}</div>
        <div class="inspector-id">ID: ${node.id}</div>
      </div>
      <button class="icon-btn" type="button" aria-label="Close inspector" id="close-inspector">${icon('close')}</button>
    </div>
    <div class="inspector-section">
      <h4>Node config summary</h4>
      <div class="inspector-grid">
        <div class="inspector-row"><span>Purpose</span><strong>${node.description}</strong></div>
        <div class="inspector-row"><span>Config</span><strong>${node.config || 'Static config'}</strong></div>
        <div class="inspector-row"><span>Model</span><strong>${node.model || 'Mock only'}</strong></div>
        <div class="inspector-row"><span>Status</span><strong>${statusLabel(node.status)}</strong></div>
      </div>
    </div>
    <div class="inspector-section">
      <h4>Inputs</h4>
      ${renderInspectorList([...(node.inputs || []), ...inboundEdges.map((edge) => `From ${edgeLabel(edge, 'input')}`)])}
    </div>
    <div class="inspector-section">
      <h4>Outputs</h4>
      ${renderInspectorList([...(node.outputs || []), ...outboundEdges.map((edge) => `To ${edgeLabel(edge, 'output')}`)])}
    </div>
    <div class="inspector-section">
      <h4>Guardrails</h4>
      ${renderInspectorList(node.guardrails || ['Static-only behavior'])}
    </div>
    <div class="inspector-section">
      <h4>Trace links</h4>
      ${renderInspectorList(node.trace || ['No trace links configured'])}
    </div>
    <div class="inspector-section">
      <h4>Static-only notice</h4>
      <div class="static-notice">This inspector updates local mock UI state only. It does not call AI services, mutate runtime state, write repositories or deploy artifacts.</div>
    </div>`;

  const tabs = createElement('div', 'inspector-tabs');
  [
    ['Spec Builder', 'document', 'spec-builder'],
    ['Review Runs', 'review', 'review-runs'],
    ['Preview', 'eye', 'preview'],
    ['Trace', 'trace', 'trace'],
    ['Decisions', 'decision', 'decisions'],
  ].forEach(([label, iconName, page]) => {
    const btn = createElement('button', 'action-btn');
    btn.type = 'button';
    btn.innerHTML = `${icon(iconName)}${label}`;
    btn.addEventListener('click', () => window.navigate(page));
    tabs.appendChild(btn);
  });
  inspector.appendChild(tabs);
  inspector.querySelector('#close-inspector').addEventListener('click', () => setInspectorOpen(false));
}

function renderInspectorList(items) {
  const safeItems = items && items.length ? items : ['None'];
  return `<ul class="inspector-list">${safeItems.map((item) => `<li>${item}</li>`).join('')}</ul>`;
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
    default:
      return status;
  }
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
  btnValidate.innerHTML = `${icon('review')}Validate`;
  btnValidate.addEventListener('click', () => {
    if (hasUnresolvedSpecFields()) {
      alert('Cannot validate: some fields are unresolved.');
    } else {
      window.appState.specValidated = true;
      if (hasPendingDecisions()) {
        alert('Specification validated. Handoff remains blocked until decisions are locked.');
      } else {
        alert('Specification validated!');
      }
      window.renderPage('spec-builder');
    }
  });
  actions.appendChild(btnValidate);

  const btnHandoff = createElement('button', 'action-btn action-primary');
  btnHandoff.type = 'button';
  btnHandoff.disabled = !window.appState.handoffReady;
  btnHandoff.innerHTML = `${icon('handoff')}Handoff`;
  btnHandoff.addEventListener('click', () => {
    if (window.appState.handoffReady) {
      alert('Preparing static handoff...');
    } else {
      alert('Handoff not ready. Complete all tasks first.');
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
    ['Generate static mockup', 'spark', () => alert('Generating static mockup (placeholder)')],
    ['Compare against spec', 'check', () => alert('Comparing preview with spec (placeholder)')],
    ['Start UX check', 'eye', () => alert('Starting UX check (placeholder)')],
    ['Prepare preview packet', 'handoff', () => alert('Preparing preview packet (placeholder)'), !window.appState.handoffReady],
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

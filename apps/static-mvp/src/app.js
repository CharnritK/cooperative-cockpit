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

function getPrimaryDemoPath() {
  return window.appState.primaryDemoPath || window.mockData.primaryDemoPath;
}

function getMissingEvidenceFields() {
  return window.appState.specFields.filter((field) => {
    const hasTraceLink = window.appState.traceLinks.some((link) => link.target === field.id);
    const hasAttachedEvidence = (field.evidenceIds || []).some((evidenceId) => {
      const evidence = window.appState.evidenceItems.find((item) => item.id === evidenceId);
      return evidence && evidence.status === 'attached';
    });
    return !hasTraceLink && !hasAttachedEvidence;
  });
}

function getMissingEvidenceItems() {
  return (window.appState.evidenceItems || []).filter((item) => item.requiredForHandoff && item.status !== 'attached');
}

function getReviewBlockers() {
  if (window.appState.reviewBlockersAcknowledged) return [];
  return window.appState.reviewResults.filter((review) => review.severity === 'high');
}

function getReadinessSummary() {
  const unresolvedSpecFields = window.appState.specFields.filter((field) => ['ai-suggested', 'missing', 'needs-answer', 'needs-lock'].includes(field.status));
  const pendingDecisions = window.appState.decisions.filter((decision) => decision.status === 'needs-lock');
  const validationBlocked = !Boolean(window.appState.specValidated);
  const missingEvidenceFields = getMissingEvidenceFields().map((field) => ({
    id: `field-${field.id}`,
    label: `Spec evidence missing: ${field.name}`,
    summary: field.suggestion || field.name,
  }));
  const missingEvidenceItems = getMissingEvidenceItems();
  const missingEvidence = [...missingEvidenceFields, ...missingEvidenceItems];
  const evidenceReviewPending = !Boolean(window.appState.evidenceReviewed);
  const reviewBlockers = getReviewBlockers();
  const handoffBlockers = [
    ...unresolvedSpecFields.map((field) => `Spec field missing: ${field.name}`),
    ...pendingDecisions.map((decision) => `Decision open: ${decision.id}`),
    ...missingEvidence.map((item) => `Evidence missing: ${item.label || item.name || item.id}`),
    ...(evidenceReviewPending ? ['Evidence review pending: required evidence has not been reviewed locally'] : []),
    ...(validationBlocked ? ['Validation result missing: static spec validation not confirmed'] : []),
    ...reviewBlockers.map((review) => `Review blocker: ${review.name}`),
  ];

  return {
    unresolvedSpecFields,
    missingEvidence,
    missingEvidenceFields,
    missingEvidenceItems,
    evidenceReviewPending,
    pendingDecisions,
    validationBlocked,
    reviewBlockers,
    handoffBlockers,
    ready: handoffBlockers.length === 0,
  };
}

function updateHandoffReadiness() {
  window.appState.handoffReady = getReadinessSummary().ready;
}

function getPreviewSyncStatus(readiness = getReadinessSummary()) {
  const hasUnlockedFields = window.appState.specFields.some((field) => field.status !== 'locked');
  if (readiness.ready) {
    return { status: 'validated', label: 'Up to date' };
  }
  if (hasUnlockedFields) {
    return { status: 'needs-sync', label: 'Needs sync' };
  }
  return { status: 'blocked', label: 'Blocked by readiness' };
}

function getSpecCoverageRows(readiness = getReadinessSummary()) {
  const fieldsMissingEvidence = new Set(readiness.missingEvidenceFields.map((item) => item.id.replace(/^field-/, '')));
  return window.appState.specFields.map((field) => {
    if (field.status !== 'locked') {
      return { field, label: 'Incomplete' };
    }
    if (fieldsMissingEvidence.has(field.id)) {
      return { field, label: 'Missing evidence' };
    }
    return { field, label: readiness.ready ? 'Covered' : 'Gated by readiness' };
  });
}

function refreshDerivedEvidenceState() {
  const lockedDecisionIds = new Set(window.appState.decisions.filter((decision) => decision.status === 'locked').map((decision) => decision.id));

  window.appState.evidenceItems.forEach((item) => {
    if (!item.requiredForHandoff) return;
    if (item.id === 'locked-decision' && lockedDecisionIds.has('D-005')) {
      item.status = 'attached';
      item.summary = 'D-005 is locked in local mock state for the static handoff preview.';
    }
    if (item.id === 'validation-readiness' && window.appState.specValidated) {
      item.status = 'attached';
      item.summary = 'Static spec validation has been confirmed in local mock state.';
    }
  });

  const existingTargets = new Set(window.appState.traceLinks.map((link) => link.target));
  window.appState.specFields.forEach((field) => {
    if (existingTargets.has(field.id)) return;
    const source = (field.evidenceIds || [])[0] || 'source-context';
    window.appState.traceLinks.push({ source, target: field.id });
    existingTargets.add(field.id);
  });
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
    handoffButton.title = window.appState.handoffReady ? 'Open the static handoff preview placeholder' : 'Static handoff gated by local readiness checklist';
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

function normalizeObjectStatus(status) {
  return String(status || '').replace(/_/g, '-');
}

function renderStatusChip(status, label) {
  const normalizedStatus = normalizeObjectStatus(status);
  return `<span class="status-chip ${getStatusClass(normalizedStatus)}">${label || statusLabel(normalizedStatus)}</span>`;
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
        alert('Static handoff preview is available. No files are written.');
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
  const project = window.appState.project || {};
  const workspace = window.appState.workspace || {};
  const artifactRef = (window.appState.artifactRefs || [])[0] || {};
  const workPacket = window.appState.workPacket || {};
  const validationResults = window.appState.validationResults || [];
  const pendingLocks = window.appState.decisions.filter((decision) => decision.status === 'needs-lock');
  const protectedLabels = window.appState.protected.map((item) => item.label);
  const currentStep = getWorkflowStep(window.appState.currentPage);

  const projectOverview = createElement('section', 'panel project-overview-panel');
  projectOverview.innerHTML = `<div class="handoff-preview-head">
      <div>
        <div class="page-kicker">Project Overview</div>
        <h2 class="page-title">${project.name || 'OpenClaw Cooperative Cockpit Static MVP'}</h2>
        <p class="page-subtitle">${project.summary || 'Static local prototype for governed cockpit work.'}</p>
      </div>
      ${renderStatusChip(project.status || 'draft', `Project object: ${statusLabel(project.status || 'draft')}`)}
    </div>
    <div class="rules-summary-grid rules-note">
      <section class="panel">
        <h3>Project object</h3>
        <p><strong>Stage:</strong> ${project.currentStage || 'Static MVP alignment'}</p>
        <p><strong>Workspace:</strong> ${workspace.name || 'Static workspace'} / ${workspace.mode || 'static_local_only'}</p>
      </section>
      <section class="panel">
        <h3>Artifact Reference</h3>
        <p><strong>${artifactRef.label || project.artifactId || 'COCKPIT-MVP-014'}</strong></p>
        <p>Status: ${statusLabel(normalizeObjectStatus(artifactRef.status || 'needs-sync'))}</p>
      </section>
      <section class="panel">
        <h3>Work Packet</h3>
        <p><strong>${workPacket.title || 'Static MVP work packet'}</strong></p>
        <p>${workPacket.objective || 'Bounded static work only.'}</p>
      </section>
      <section class="panel">
        <h3>Validation summary</h3>
        <p>${validationResults.map((result) => `${result.scope}: ${statusLabel(normalizeObjectStatus(result.status))}`).join(' / ') || 'No validation results loaded.'}</p>
      </section>
    </div>`;
  container.appendChild(projectOverview);

  const statusGrid = createElement('section', 'home-status-grid');
  statusGrid.appendChild(renderHomeStatusCard({
    iconName: 'branch',
    label: 'Selected Context',
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
    label: 'Pending Decisions',
    value: String(pendingLocks.length),
    tone: pendingLocks.length ? 'warning' : 'validated',
    detail: pendingLocks.length ? pendingLocks.map((decision) => decision.id).join(', ') : 'No pending locks',
  }));
  container.appendChild(statusGrid);

  const banner = createElement('section', 'pipeline-banner');
  banner.innerHTML = `<div>
      <div class="page-kicker">Artifact Reference</div>
      <h2 class="page-title">${project.artifactId || 'COCKPIT-MVP-014'}</h2>
      <p class="page-subtitle">Artifact-first governed cockpit from selected context to gated handoff. Current page group: <strong>${currentStep.label}</strong>.</p>
    </div>
    <div class="pipeline-steps" aria-label="Object-model page flow">
      ${WORKFLOW_STEPS.map((step) => `<span class="${step.key === currentStep.key ? 'is-active' : ''} ${step.key === 'handoff' && !window.appState.handoffReady ? 'is-blocked' : ''}">${step.label}</span>`).join('')}
    </div>`;
  container.appendChild(banner);
  container.appendChild(renderPrimaryDemoPathPanel('home'));

  const lowerGrid = createElement('section', 'home-ops-grid');
  const recent = createElement('article', 'panel activity-panel');
  recent.innerHTML = `<h3>Object-model state</h3>
    <ol class="activity-feed">
      <li><span>Selected Context seeded</span><strong>${window.appState.context.length} included</strong></li>
      <li><span>Protected surfaces sealed</span><strong>${window.appState.protected.length} excluded</strong></li>
      <li><span>Decision gate checked</span><strong>${window.appState.handoffReady ? 'Ready' : 'Blocked'}</strong></li>
      <li><span>Spec Draft coverage refreshed</span><strong>${hasUnresolvedSpecFields() ? 'Needs answers' : 'Complete'}</strong></li>
    </ol>`;
  lowerGrid.appendChild(recent);

  const next = createElement('article', 'panel next-actions-panel');
  next.innerHTML = `<h3>Next Safe Actions</h3>
    <p>All actions stay local to this static prototype and only update mock UI state.</p>
    <div class="safe-action-list"></div>`;
  const actionList = next.querySelector('.safe-action-list');
  [
    ['Inspect Workbench', 'graph', 'Review Context Nodes', () => window.navigate('workbench')],
    ['Review Spec Draft', 'document', 'Resolve required fields', () => window.navigate('spec-builder')],
    ['Inspect Review Runs', 'review', 'Read advisory Findings', () => window.navigate('review-runs')],
    ['Open Decisions', 'decision', pendingLocks.length ? `${pendingLocks.length} pending` : 'No pending locks', () => window.navigate('decisions')],
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
    kicker: 'Cockpit object map',
    title: 'Workbench',
    subtitle: 'Canvas-first map for Context Nodes, Selected Context, Evidence, Decisions, Work Packets, and the static Handoff Packet. All actions are inspect-only or local mock updates.',
    className: 'workbench-header',
  });

  container.appendChild(renderGoldenPathStrip(selectedNode));

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
      <div class="palette-title-row"><h3>Locked object palette</h3>${renderStatusChip('inspect', 'Mock data')}</div>
      <p>Static cockpit object types only. Selecting or adding a Context Node changes local browser state, never runtime behavior.</p>
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
  included.innerHTML = `<div class="basket-section-header"><h3>Selected Context</h3>${renderStatusChip('allowed', `${window.appState.context.length} included`)}</div>
    <p class="page-subtitle">Derived from Context Nodes and protected exclusions. This remains local mock state.</p>`;

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
    ['Add selected context', 'add', addSelectedToContext],
    ['Mark source link local', 'branch', () => alert('Source link marker is local-only in this static MVP.')],
    ['Mark target link local', 'arrow', () => alert('Target link marker is local-only in this static MVP.')],
    ['Clear Selected Context', 'close', () => {
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

function renderPrimaryDemoPathPanel(surface) {
  const path = getPrimaryDemoPath();
  const readiness = getReadinessSummary();
  const panel = createElement('section', 'panel');
  panel.innerHTML = `<div class="handoff-preview-head">
      <div>
        <h3>Primary demo path</h3>
        <p>${path.name}</p>
      </div>
      ${renderStatusChip(readiness.ready ? 'ready' : 'blocked', readiness.ready ? 'Mock ready' : `${readiness.handoffBlockers.length} blockers`)}
    </div>
    <div class="pipeline-steps" aria-label="${surface} primary demo path">
      ${path.stages.map((stage) => `<span class="${stage.status === 'blocked' || stage.status === 'needs-criteria' ? 'is-blocked' : ''}">
        <strong>${stage.label}</strong><small>${stage.page}</small>
      </span>`).join('')}
    </div>
    <p class="page-subtitle">${path.summary}</p>
    <div class="static-notice">Ready means static/mock readiness only. The preview does not write files, call APIs, deploy, or trigger real Codex work.</div>`;
  return panel;
}

function renderGoldenPathStrip(selectedNode) {
  const strip = createElement('section', 'golden-path-strip');
  const path = getPrimaryDemoPath();
  strip.innerHTML = `<div class="golden-path-copy">
      <div class="page-kicker">Primary demo path</div>
      <h3>${path.name}</h3>
      <p>D-005 keeps the handoff preview gated until local evidence, acceptance criteria, and Point lock are clear.</p>
    </div>
    <div class="golden-path-steps">
      ${path.stages.map((stage, index) => {
        const isActive = selectedNode && stage.linkedNodeId === selectedNode.id;
        const edge = path.stages[index + 1];
        return `<article class="golden-path-step${isActive ? ' is-active' : ''}">
            <div class="golden-path-step-head">
              <span class="mono">${String(index + 1).padStart(2, '0')}</span>
              <strong>${stage.label}</strong>
            </div>
            <p>${stage.summary}</p>
            <small>${stage.page}</small>
            ${edge ? `<div class="golden-path-edge">${icon('arrow')}${edge.label}</div>` : ''}
          </article>`;
      }).join('')}
    </div>`;
  return strip;
}

function renderNodeCanvas() {
  const canvas = createElement('div', 'node-canvas');
  canvas.innerHTML = `<div class="canvas-label">Static Cockpit object map / COCKPIT-MVP-014</div>
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
        alert('Static handoff preview is available. No files are written.');
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
            <p>${readiness.ready ? 'The local checklist is clear. The preview remains a static placeholder and writes no files.' : 'Prepare handoff stays disabled until the local readiness checklist is clear.'}</p>
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
          ${renderReadinessTile('Missing evidence', readiness.missingEvidence.length, readiness.missingEvidence.map((item) => item.label || item.name || item.id), window.appState.evidenceReviewed)}
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
        ${renderAssistantPanel(selectedNode)}
      </section>
      <section class="handoff-preview-panel">
        ${renderHandoffPreviewPanel()}
      </section>
      <section class="selected-evidence-panel local-validation-panel">
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
      refreshDerivedEvidenceState();
      window.appState.evidenceReviewed = true;
      window.appState.lastLocalValidation = 'Evidence and trace links were reviewed in local mock state only.';
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

function renderAssistantPanel(selectedNode) {
  const transcript = window.mockData.assistantTranscript || [];
  const basketLabels = window.appState.context.map((item) => item.label);
  return `<h4>AI-assisted Chat (Mock)</h4>
    <div class="assistant-context-line">
      ${renderStatusChip('inspect', 'Mock chat')}
      <span>${selectedNode ? `Selected: ${selectedNode.title || selectedNode.label}` : 'No node selected'}</span>
    </div>
    <div class="chat-transcript" aria-label="Mock assistant transcript">
      ${transcript.map((message) => `<div class="chat-message chat-message-${message.speaker}">
          <span>${message.speaker === 'user' ? 'User' : 'Assistant'}</span>
          <p>${message.text}</p>
        </div>`).join('')}
    </div>
    <div class="assistant-context-line">
      <span>Basket context</span>
      <strong>${basketLabels.length ? basketLabels.join(' | ') : 'Empty basket'}</strong>
    </div>`;
}

function renderHandoffPreviewPanel() {
  const legacyPacket = window.appState.handoffPacketPreview || window.mockData.handoffPacketPreview || {};
  const workPacket = window.appState.workPacket || {};
  const handoffPacket = window.appState.handoffPacket || {};
  const evidenceItems = window.appState.evidenceItems || [];
  const decisions = window.appState.decisions || [];
  const validationResults = window.appState.validationResults || [];
  const readiness = getReadinessSummary();
  const readinessStatus = readiness.ready ? 'handoff-ready' : normalizeObjectStatus(handoffPacket.readiness || legacyPacket.readiness || 'handoff-blocked');
  const blockedBy = readiness.handoffBlockers.length
    ? readiness.handoffBlockers
    : handoffPacket.blockedBy || legacyPacket.blocked_by || ['No blockers'];
  const includedEvidenceIds = handoffPacket.includedEvidenceIds || legacyPacket.included_evidence_ids || [];
  const includedDecisionIds = handoffPacket.includedDecisionIds || legacyPacket.included_decision_ids || [];
  const includedEvidence = evidenceItems.filter((item) => includedEvidenceIds.includes(item.id));
  const includedDecisions = decisions.filter((decision) => includedDecisionIds.includes(decision.id));
  const sections = [
    ['objective', [workPacket.objective || legacyPacket.objective || 'No objective loaded.']],
    ['allowed_paths', workPacket.allowedPaths || legacyPacket.allowed_paths || []],
    ['forbidden_actions', workPacket.forbiddenActions || legacyPacket.forbidden_actions || []],
    ['acceptance_criteria', workPacket.acceptanceCriteria || legacyPacket.acceptance_criteria || []],
    ['validation_commands', workPacket.validationCommands || legacyPacket.validation_commands || []],
    ['derived_inputs', [
      `Work Packet: ${workPacket.id || handoffPacket.workPacketId || 'work-packet-primary-demo'}`,
      `Decisions: ${includedDecisions.map((decision) => `${decision.id} ${statusLabel(decision.status)}`).join(', ') || 'No decisions linked'}`,
      `Evidence: ${includedEvidence.map((item) => `${item.id} ${statusLabel(item.status)}`).join(', ') || 'No evidence linked'}`,
      `Validation Results: ${validationResults.map((result) => `${result.id} ${statusLabel(result.status)}`).join(', ') || 'No validation results linked'}`,
    ]],
    ['readiness_status', [statusLabel(readinessStatus), readiness.ready ? 'Static gates are clear in mock state.' : 'Static gates remain blocked in mock state.']],
    ['blocked_by', blockedBy],
  ];

  return `<div class="handoff-preview-head">
      <div>
        <h4>Derived static Handoff Packet Preview</h4>
        <p>${handoffPacket.id || legacyPacket.packet_id} / Derived from Work Packet, Decisions, Evidence, and Validation Results</p>
      </div>
      ${renderStatusChip(readiness.ready ? 'ready' : 'blocked', readiness.ready ? 'Readiness status: Mock ready' : 'Readiness status: Gated locally')}
    </div>
    <div class="static-notice">Work Packet is the core object. Handoff Packet is a derived static preview. Agent Roles: embedded metadata only.</div>
    <div class="handoff-preview-grid">
      ${sections.map(([key, values]) => {
        return `<article class="handoff-preview-section${key === 'objective' ? ' is-wide' : ''}">
            <h5>${formatHandoffSectionLabel(key)}</h5>
            ${renderInspectorList(values)}
          </article>`;
      }).join('')}
      <article class="handoff-preview-section">
        <h5>Evidence included</h5>
        ${renderInspectorList(includedEvidence.map((item) => `${item.label}: ${statusLabel(item.status)}`))}
      </article>
    </div>
    <div class="static-notice">This is a static packet preview from mock data. It does not write files, scan a repository, call an API, deploy, or create a real handoff.</div>`;
}

function renderWorkPacketSummaryPanel() {
  const workPacket = window.appState.workPacket || {};
  const handoffPacket = window.appState.handoffPacket || {};
  return `<div class="handoff-preview-head">
      <div>
        <div class="page-kicker">Work Packet summary</div>
        <h3>${workPacket.title || 'Static MVP Work Packet'}</h3>
        <p>${workPacket.id || handoffPacket.workPacketId || 'work-packet-primary-demo'} / Work Packet is the core object</p>
      </div>
      ${renderStatusChip(workPacket.status || 'draft')}
    </div>
    <div class="static-notice">Work Packet is the core object. Handoff Packet is derived from this packet plus Decisions, Evidence, and Validation Results. Agent Roles: embedded metadata only.</div>
    <div class="handoff-preview-grid">
      <article class="handoff-preview-section is-wide">
        <h5>Objective</h5>
        ${renderInspectorList([workPacket.objective || 'No objective loaded.'])}
      </article>
      <article class="handoff-preview-section">
        <h5>Allowed paths</h5>
        ${renderInspectorList(workPacket.allowedPaths || [])}
      </article>
      <article class="handoff-preview-section">
        <h5>Forbidden actions</h5>
        ${renderInspectorList(workPacket.forbiddenActions || [])}
      </article>
      <article class="handoff-preview-section">
        <h5>Acceptance criteria</h5>
        ${renderInspectorList(workPacket.acceptanceCriteria || [])}
      </article>
      <article class="handoff-preview-section">
        <h5>Validation commands</h5>
        ${renderInspectorList(workPacket.validationCommands || [])}
      </article>
    </div>`;
}

function formatHandoffSectionLabel(key) {
  const labels = {
    primary_demo_path: 'Primary demo path',
    objective: 'Objective',
    allowed_paths: 'Allowed paths',
    forbidden_actions: 'Forbidden actions',
    required_work: 'Required work',
    acceptance_criteria: 'Acceptance criteria',
    validation_commands: 'Validation commands',
    derived_inputs: 'Derived inputs',
    readiness_status: 'Readiness status',
    blocked_by: 'Blocked-by reasons',
    stop_conditions: 'Stop conditions',
    final_response_format: 'Final response format',
  };
  return labels[key] || key;
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
  switch (normalizeObjectStatus(status)) {
    case 'validated':
    case 'allowed':
    case 'complete':
    case 'attached':
    case 'review-complete':
      return 'status-validated';
    case 'needs-lock':
    case 'decision-needs-lock':
    case 'deferred':
    case 'decision-deferred':
    case 'validation-warning':
    case 'warning':
      return 'status-needs-lock';
    case 'needs-answer':
    case 'needs-criteria':
      return 'status-needs-answer';
    case 'missing':
    case 'evidence-missing':
      return 'status-missing';
    case 'blocked':
    case 'handoff-blocked':
    case 'validation-blocked':
    case 'finding-open':
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
    case 'decision-locked':
      return 'status-validated';
    default:
      return 'status-neutral';
  }
}

function statusTone(status) {
  const normalizedStatus = normalizeObjectStatus(status);
  switch (normalizedStatus) {
    case 'validated':
    case 'allowed':
    case 'complete':
    case 'locked':
    case 'attached':
    case 'review-complete':
      return 'validated';
    case 'needs-lock':
    case 'needs-answer':
    case 'needs-sync':
    case 'needs-criteria':
    case 'deferred':
    case 'decision-deferred':
    case 'validation-warning':
    case 'warning':
      return 'warning';
    case 'missing':
    case 'blocked':
    case 'handoff-blocked':
    case 'validation-blocked':
    case 'finding-open':
      return normalizedStatus;
    case 'draft':
      return 'draft';
    default:
      return 'neutral';
  }
}

function statusLabel(status) {
  const normalizedStatus = normalizeObjectStatus(status);
  switch (normalizedStatus) {
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
    case 'deferred':
      return 'Deferred';
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
    case 'review-complete':
      return 'Review complete';
    case 'finding-open':
      return 'Finding open';
    case 'finding-resolved':
      return 'Finding resolved';
    case 'validation-blocked':
      return 'Validation blocked';
    case 'validation-warning':
      return 'Validation warning';
    case 'validation-passed':
      return 'Validation passed';
    case 'attached':
    case 'evidence-attached':
      return 'Evidence attached';
    case 'evidence-missing':
      return 'Evidence missing';
    case 'handoff-ready':
      return 'Handoff ready';
    case 'handoff-blocked':
      return 'Handoff blocked';
    case 'handoff-only':
      return 'Handoff only';
    case 'mock-preview':
      return 'Mock preview';
    case 'selected':
      return 'Selected';
    case 'open':
      return 'Open';
    case 'excluded':
      return 'Excluded';
    case 'needs-criteria':
      return 'Needs criteria';
    case 'decision-locked':
      return 'Decision locked';
    case 'decision-deferred':
      return 'Decision deferred';
    case 'decision-needs-lock':
      return 'Decision needs lock';
    case 'warning':
      return 'Warning';
    default:
      return normalizedStatus;
  }
}

function readinessLabel(status) {
  return statusLabel(status).replace('Needs lock', 'Needs decision');
}

function renderSpecReadinessPanel() {
  const readiness = getReadinessSummary();
  const acceptance = window.appState.specFields.find((field) => field.id === 'acceptance-criteria');
  const validation = window.appState.validationResults.find((result) => result.id === 'validation-static-local');
  const panel = createElement('section', 'panel');
  panel.style.marginTop = '12px';
  panel.innerHTML = `<div class="handoff-preview-head">
      <div>
        <h3>Governed spec readiness</h3>
        <p>Spec fields feed D-005 and the static handoff preview. Missing acceptance criteria keeps readiness blocked.</p>
      </div>
      ${renderStatusChip(readiness.unresolvedSpecFields.length ? 'blocked' : 'ready', readiness.unresolvedSpecFields.length ? `${readiness.unresolvedSpecFields.length} unresolved` : 'Fields clear')}
    </div>
    <div class="readiness-grid">
      ${renderReadinessTile('Acceptance criteria', acceptance && acceptance.status === 'missing' ? 1 : 0, acceptance && acceptance.status === 'missing' ? [acceptance.suggestion] : ['Acceptance criteria present'], acceptance && acceptance.status !== 'missing')}
      ${renderReadinessTile('Validation state', readiness.validationBlocked ? 1 : 0, [readiness.validationBlocked ? (validation ? validation.summary : 'No validation result recorded') : 'Static spec validation confirmed locally'], !readiness.validationBlocked)}
      ${renderReadinessTile('D-005 gate', readiness.pendingDecisions.filter((decision) => decision.id === 'D-005').length, ['Codex handoff gating checkpoint'], false)}
    </div>`;
  return panel;
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
  container.appendChild(renderSpecReadinessPanel());

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
      window.appState.lastLocalValidation = 'Static spec validation is blocked until all required fields are resolved.';
      window.renderPage('spec-builder');
    } else {
      window.appState.specValidated = true;
      refreshDerivedEvidenceState();
      updateHandoffReadiness();
      const readiness = getReadinessSummary();
      if (readiness.handoffBlockers.length) {
        window.appState.lastLocalValidation = `Specification validated locally. Handoff remains gated by ${readiness.handoffBlockers.length} local checklist item(s).`;
      } else {
        window.appState.lastLocalValidation = 'Specification validated locally. Static handoff preview is ready in mock state only.';
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
        alert('Static handoff preview is available. No files are written.');
      } else {
        alert('Prepare handoff is gated by local readiness blockers.');
      }
  });
  actions.appendChild(btnHandoff);
  container.appendChild(actions);

  if (window.appState.lastLocalValidation) {
    const validationNote = createElement('div', window.appState.specValidated ? 'success-banner' : 'warning-banner');
    validationNote.style.marginTop = '12px';
    validationNote.innerHTML = `${icon(window.appState.specValidated ? 'check' : 'warning')}${window.appState.lastLocalValidation}`;
    container.appendChild(validationNote);
  }
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
  const reviewRun = window.appState.reviewRun || {};
  const findings = window.appState.findings || [];
  renderPageHeader(container, {
    kicker: 'Review Run object',
    title: 'Review Runs',
    subtitle: 'Inspect-only Review Run and Finding objects. They never execute code, mutate runtime state, or touch repositories.',
  });

  const scope = createElement('section', 'panel');
  scope.innerHTML = `<h3>Review Run object</h3>
    <p><strong>${reviewRun.name || 'Static review run'}</strong></p>
    <p>Verdict: ${reviewRun.verdict || 'Inspect-only advisory review'}</p>
    <p>Scope Context Nodes: ${(reviewRun.scopeContextIds || []).join(', ') || window.appState.context.map((c) => c.label).join(', ') || 'No context selected.'}</p>
    ${renderStatusChip(normalizeObjectStatus(reviewRun.status || 'review_complete'), statusLabel(normalizeObjectStatus(reviewRun.status || 'review_complete')))}`;
  container.appendChild(scope);

  const findingSummary = createElement('section', 'panel');
  findingSummary.style.marginTop = '12px';
  findingSummary.innerHTML = `<h3>Finding objects</h3>
    <p>${findings.length} advisory Findings are linked to this Review Run. Findings are static records only; actions acknowledge or defer them in local mock state.</p>
    ${renderInspectorList(findings.map((finding) => `${finding.id}: ${finding.summary}`))}`;
  container.appendChild(findingSummary);

  const btnStart = createElement('button', 'action-btn');
  btnStart.type = 'button';
  btnStart.style.marginTop = '12px';
  btnStart.innerHTML = `${icon('review')}Inspect findings`;
  btnStart.addEventListener('click', () => showReviewResults(resultsDiv));
  container.appendChild(btnStart);

  const resultsDiv = createElement('div', 'review-list');
  resultsDiv.id = 'review-results';
  resultsDiv.style.marginTop = '12px';
  container.appendChild(resultsDiv);
}

function showReviewResults(resultsDiv) {
  resultsDiv.innerHTML = '';
  (window.appState.findings || []).forEach((finding) => {
    const card = createElement('article', 'review-result-card');
    card.innerHTML = `<h4>Finding ${finding.id}</h4>
      <p><strong>Review Run:</strong> ${finding.reviewRunId}</p>
      <p><strong>Summary:</strong> ${finding.summary}</p>
      <p><strong>Recommendation:</strong> ${finding.recommendation}</p>
      <p><strong>Evidence IDs:</strong> ${finding.evidenceIds.join(', ')}</p>
      ${renderSeverityChip(finding.severity)}
      ${renderStatusChip(normalizeObjectStatus(finding.status), statusLabel(normalizeObjectStatus(finding.status)))}`;
    const detailList = createElement('ul');
    ['Advisory only', 'Inspect-only', 'No runtime or repository mutation'].forEach((detail) => detailList.appendChild(createElement('li', '', detail)));
    card.appendChild(detailList);

    const actionRow = createElement('div', 'finding-actions');
    [
      ['Acknowledge locally', () => alert('Acknowledged finding ' + finding.id + ' in local mock state only.')],
      ['Defer locally', () => alert('Deferred finding ' + finding.id + ' in local mock state only.')],
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
  const label = createElement('label', '', 'Artifact Reference type');
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

  const workPacketSummary = createElement('section', 'panel');
  workPacketSummary.style.marginTop = '12px';
  workPacketSummary.innerHTML = renderWorkPacketSummaryPanel();
  container.appendChild(workPacketSummary);

  const handoffPreview = createElement('section', 'panel');
  handoffPreview.style.marginTop = '12px';
  handoffPreview.innerHTML = renderHandoffPreviewPanel();
  container.appendChild(handoffPreview);

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

  const readiness = getReadinessSummary();
  const sync = getPreviewSyncStatus(readiness);
  const syncStatus = createElement('section', 'panel');
  syncStatus.style.marginTop = '12px';
  syncStatus.innerHTML = `<h3>Sync status</h3>${renderStatusChip(sync.status, sync.label)}`;
  container.appendChild(syncStatus);

  const checklist = createElement('section', 'panel');
  checklist.style.marginTop = '12px';
  checklist.innerHTML = '<h3>Spec coverage</h3>';
  const ul = createElement('ul');
  getSpecCoverageRows(readiness).forEach((row) => {
    ul.appendChild(createElement('li', '', `${row.field.name}: ${row.label}`));
  });
  checklist.appendChild(ul);
  container.appendChild(checklist);

  const linked = createElement('section', 'panel');
  linked.style.marginTop = '12px';
  linked.innerHTML = '<h3>Linked review findings</h3>';
  const linkedList = createElement('ul');
  (window.appState.findings || []).forEach((finding) => {
    linkedList.appendChild(createElement('li', '', `${finding.id}: ${finding.summary}`));
  });
  linked.appendChild(linkedList);
  container.appendChild(linked);

  const actions = createElement('div', 'button-row');
  actions.style.marginTop = '12px';
  [
    ['View static mockup', 'spark', () => alert('Opening static mockup placeholder. No generation occurs.')],
    ['Compare static spec', 'check', () => alert('Comparing preview with spec in local mock state only.')],
    ['Inspect UX notes', 'eye', () => alert('UX notes are inspect-only placeholders.')],
    ['View gated preview', 'handoff', () => alert('Static preview only. No file output or repository change occurs.'), !window.appState.handoffReady],
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
  const d005 = window.appState.decisions.find((d) => d.id === 'D-005');
  if (d005) {
    const checkpoint = createElement('section', 'panel');
    checkpoint.innerHTML = `<div class="handoff-preview-head">
        <div>
          <h3>D-005 governance checkpoint</h3>
          <p>${d005.description}</p>
        </div>
        ${renderStatusChip(d005.status === 'locked' ? 'locked' : 'needs-lock', d005.status === 'locked' ? 'Locked' : 'Needs Point lock')}
      </div>
      <div class="static-notice">This decision only gates the static handoff preview. It does not approve live Codex work, repository changes, deployment, connectors, or runtime workflow work.</div>`;
    container.appendChild(checkpoint);
  }

  const section1 = createElement('section');
  section1.style.marginTop = '16px';
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
    ${renderStatusChip(dec.status === 'locked' ? 'locked' : 'needs-lock', dec.status === 'locked' ? 'Locked' : 'Needs lock')}
    ${dec.gates ? `<p><strong>Gates:</strong> ${dec.gates.join(', ')}</p>` : ''}
    ${dec.requiresPointLock ? '<p><strong>Point lock required before mock readiness.</strong></p>' : ''}`;

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
      refreshDerivedEvidenceState();
      updateHandoffReadiness();
      window.renderPage('decisions');
    }],
    ['Defer', 'warning', () => {
      dec.status = 'deferred';
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
      <div class="trace-node">Context Node</div>
      <div class="trace-node">Spec Draft</div>
      <div class="trace-node">Decision</div>
      <div class="trace-node">Handoff Packet</div>
    </div>`;
  container.appendChild(graph);

  const artifactRefs = createElement('section', 'panel');
  artifactRefs.innerHTML = `<h3>Artifact Reference</h3>
    <p>Concrete static references linked to Project, Spec Draft, Work Packet, and Handoff Packet objects.</p>
    ${renderInspectorList((window.appState.artifactRefs || []).map((artifact) => `${artifact.label}: ${statusLabel(normalizeObjectStatus(artifact.status))}`))}`;
  container.appendChild(artifactRefs);

  const evidenceTable = createElement('table', 'evidence-table');
  evidenceTable.innerHTML = '<thead><tr><th>Evidence item detail</th><th>Source object</th><th>Target object</th><th>Summary</th><th>Status</th></tr></thead>';
  const evidenceBody = createElement('tbody');
  (window.appState.evidenceItems || []).forEach((item) => {
    const tr = createElement('tr');
    tr.appendChild(createElement('td', '', item.label));
    tr.appendChild(createElement('td', 'mono', item.sourceObjectId));
    tr.appendChild(createElement('td', 'mono', item.targetObjectId));
    tr.appendChild(createElement('td', '', item.summary));
    const statusTd = createElement('td');
    statusTd.innerHTML = renderStatusChip(item.status === 'attached' ? 'validated' : item.status === 'missing' ? 'blocked' : 'needs-sync', item.status);
    tr.appendChild(statusTd);
    evidenceBody.appendChild(tr);
  });
  evidenceTable.appendChild(evidenceBody);
  container.appendChild(evidenceTable);

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
    warn.innerHTML = `${icon('warning')}Warning: Some spec fields do not have trace evidence. Static handoff readiness stays blocked until all fields are traced.`;
    container.appendChild(warn);
  }

  const missingEvidence = getMissingEvidenceItems();
  if (missingEvidence.length > 0) {
    const warn = createElement('div', 'warning-banner');
    warn.style.marginTop = '12px';
    warn.innerHTML = `${icon('warning')}Required evidence still blocks the handoff preview: ${missingEvidence.map((item) => item.label).join(', ')}.`;
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
  gateSummary.innerHTML = '<h3>Review Gate Summary</h3><p>Runtime mutation is blocked; repository changes stay outside this static shell; secret and external actions are excluded; agents can inspect only; Codex handoff is gated until ready.</p>';
  summaries.appendChild(gateSummary);
  container.appendChild(summaries);
}

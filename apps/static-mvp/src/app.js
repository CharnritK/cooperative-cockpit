/*
  Main application logic for the OpenClaw Cooperative Cockpit local preview.
  It keeps all behavior local and sample-only while rendering the
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

const TOAST_DURATION = 3500;

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

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = createElement('div', `toast toast-${type}`);
  toast.setAttribute('role', type === 'warning' || type === 'error' ? 'alert' : 'status');

  const iconName = type === 'success' ? 'check' : type === 'warning' || type === 'error' ? 'warning' : 'spark';
  const iconWrap = createElement('span', 'toast-icon');
  iconWrap.innerHTML = icon(iconName);
  const messageNode = createElement('span', 'toast-message', message);
  const closeButton = createElement('button', 'toast-close');
  closeButton.type = 'button';
  closeButton.setAttribute('aria-label', 'Dismiss notification');
  closeButton.innerHTML = icon('close');
  closeButton.addEventListener('click', () => dismissToast(toast));

  toast.append(iconWrap, messageNode, closeButton);
  container.appendChild(toast);
  window.setTimeout(() => dismissToast(toast), TOAST_DURATION);
}

function dismissToast(toast) {
  if (!toast || !toast.parentNode || toast.classList.contains('toast-exit')) return;
  toast.classList.add('toast-exit');
  toast.addEventListener('animationend', () => toast.remove(), { once: true });
}

function setInspectorOpen(open) {
  const shell = document.getElementById('app-shell');
  const inspector = document.getElementById('right-inspector');
  if (shell) shell.classList.toggle('inspector-open', open);
  if (inspector) inspector.classList.toggle('hidden', !open);
  window.requestAnimationFrame(updateAllWorkflowLines);
}

function showGovernance(show) {
  const governance = document.getElementById('governance-strip');
  if (governance) governance.classList.toggle('hidden', !show);
}

function getWorkflowStep(page) {
  return WORKFLOW_STEPS.find((step) => step.pages.includes(page)) || WORKFLOW_STEPS[0];
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
    ...(validationBlocked ? ['Validation result missing: spec validation not confirmed locally'] : []),
    ...reviewBlockers.map((review) => `Review item: ${review.name}`),
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
  return { status: 'blocked', label: 'Waiting on readiness' };
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
      item.summary = 'D-005 is locked locally for the handoff preview.';
    }
    if (item.id === 'validation-readiness' && window.appState.specValidated) {
      item.status = 'attached';
      item.summary = 'Spec validation has been confirmed locally.';
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

function markSpecValidationStale(summary = 'Spec validation needs a local refresh before handoff can be ready.') {
  window.appState.specValidated = false;
  const validationEvidence = window.appState.evidenceItems.find((item) => item.id === 'validation-readiness');
  if (validationEvidence) {
    validationEvidence.status = 'warning';
    validationEvidence.summary = summary;
  }
  updateHandoffReadiness();
}

function markDecisionEvidenceStale(decisionId) {
  if (decisionId !== 'D-005') {
    updateHandoffReadiness();
    return;
  }
  const decisionEvidence = window.appState.evidenceItems.find((item) => item.id === 'locked-decision');
  if (decisionEvidence) {
    decisionEvidence.status = 'missing';
    decisionEvidence.summary = 'D-005 local lock is open. This does not change any real Point approval.';
  }
  updateHandoffReadiness();
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
    handoffButton.title = window.appState.handoffReady ? 'Open handoff preview' : 'Handoff unavailable until readiness clears';
  }

  const readinessCount = document.getElementById('readiness-count');
  if (readinessCount) {
    const nextCount = String(readiness.handoffBlockers.length);
    const countChanged = readinessCount.textContent !== nextCount;
    readinessCount.textContent = nextCount;
    if (countChanged) {
      readinessCount.classList.remove('pulse');
      void readinessCount.offsetWidth;
      readinessCount.classList.add('pulse');
    }
  }
  const readinessButton = document.querySelector('.top-right .action-btn[data-action="checklist"]');
  if (readinessButton) {
    readinessButton.classList.toggle('is-ready', readiness.ready);
    readinessButton.title = readiness.ready ? 'Local readiness checklist is clear' : `${readiness.handoffBlockers.length} open readiness item(s)`;
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
        showToast('Handoff preview is available locally. No files are written.', 'success');
      } else {
        showToast('Cannot prepare handoff yet. Clear the local readiness checklist first.', 'warning');
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
  const readiness = getReadinessSummary();
  const blockerPreview = readiness.handoffBlockers.slice(0, 3);
  const blockerOverflow = Math.max(readiness.handoffBlockers.length - blockerPreview.length, 0);

  const projectOverview = createElement('section', 'panel home-command-panel');
  projectOverview.innerHTML = `<div class="handoff-preview-head">
      <div>
        <div class="page-kicker">Project Overview</div>
        <h2 class="page-title">${project.name || 'OpenClaw Cooperative Cockpit'}</h2>
        <p class="page-subtitle">${project.summary || 'Governed cockpit workspace.'}</p>
      </div>
      ${renderStatusChip(project.status || 'draft', `Project object: ${statusLabel(project.status || 'draft')}`)}
    </div>
    <div class="home-command-grid">
      <section class="home-command-item">
        <span>Stage</span>
        <strong>${project.currentStage || 'Cockpit alignment'}</strong>
        <small>${workspace.name || 'Local workspace'} / ${workspace.mode || 'local_preview'}</small>
      </section>
      <section class="home-command-item">
        <span>Artifact Reference</span>
        <strong>${artifactRef.label || project.artifactId || 'COCKPIT-MVP-014'}</strong>
        <small>${statusLabel(normalizeObjectStatus(artifactRef.status || 'needs-sync'))}</small>
      </section>
      <section class="home-command-item">
        <span>Work Packet</span>
        <strong>${workPacket.title || 'Cockpit work packet'}</strong>
        <small>${workPacket.objective || 'Bounded local work only.'}</small>
      </section>
      <section class="home-command-item home-readiness-item">
        <span>Handoff Readiness</span>
        <strong>${readiness.ready ? 'Ready locally' : `${readiness.handoffBlockers.length} open item${readiness.handoffBlockers.length === 1 ? '' : 's'}`}</strong>
        <small>${blockerPreview.length ? `${blockerPreview.join(' / ')}${blockerOverflow ? ` / +${blockerOverflow} more` : ''}` : 'No open items'}</small>
      </section>
    </div>`;
  container.appendChild(projectOverview);

  const statusGrid = createElement('section', 'home-status-grid is-compact');
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

  const lowerGrid = createElement('section', 'home-ops-grid is-lean');
  const recent = createElement('article', 'panel activity-panel');
  recent.innerHTML = `<h3>Object-model state</h3>
    <ol class="activity-feed">
      <li><span>Selected Context seeded</span><strong>${window.appState.context.length} included</strong></li>
      <li><span>Protected surfaces sealed</span><strong>${window.appState.protected.length} excluded</strong></li>
      <li><span>Decision gate checked</span><strong>${window.appState.handoffReady ? 'Ready' : 'Waiting'}</strong></li>
      <li><span>Validation summary</span><strong>${validationResults.map((result) => `${result.scope}: ${statusLabel(normalizeObjectStatus(result.status))}`).join(' / ') || 'Not loaded'}</strong></li>
    </ol>`;
  lowerGrid.appendChild(recent);

  const next = createElement('article', 'panel next-actions-panel');
  next.innerHTML = `<h3>Next Safe Actions</h3>
    <p>Local actions only.</p>
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
  const selectedNode = getSelectedNode() || getOrderedWorkbenchNodes()[0] || window.mockData.nodes[0];
  if (selectedNode) window.appState.selectedNodeId = selectedNode.id;
  renderPageHeader(container, {
    kicker: 'Cockpit object map',
    title: 'Workbench',
    subtitle: 'Canvas-first map for Context Nodes, evidence, decisions, Work Packets, and the Handoff Packet preview.',
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
      <div class="palette-title-row"><h3>Locked object palette</h3>${renderStatusChip('inspect', 'Reference data')}</div>
      <p>Cockpit object types only. Selecting or adding a Context Node changes local browser state, never runtime behavior.</p>
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
    <p class="page-subtitle">Derived from Context Nodes and protected exclusions. This remains local state.</p>`;

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
    ['Mark source link local', 'branch', () => showToast('Source link marker is local-only. No artifact or repository is changed.', 'info')],
    ['Mark target link local', 'arrow', () => showToast('Target link marker is local-only. No artifact or repository is changed.', 'info')],
    ['Clear Selected Context', 'close', () => {
      window.appState.context = [];
      showToast('Selected Context was cleared in local browser state only.', 'warning');
      window.renderPage('workbench');
    }],
    ['Context preview', 'eye', () => showToast('Preview only. No external calls, artifact writes, or generation occur.', 'info')],
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

function getOrderedWorkbenchNodes() {
  if (window.appState.viewMode === 'flat') {
    return [...window.mockData.nodes]
      .filter((n) => n.level === 'task')
      .sort((a, b) => Number(a.index || 0) - Number(b.index || 0));
  }
  if (window.appState.currentParentId === null) {
    return [...window.mockData.nodes]
      .filter((n) => n.level === 'requirements')
      .sort((a, b) => Number(a.index || 0) - Number(b.index || 0));
  }
  return [...window.mockData.nodes]
    .filter((n) => n.parentId === window.appState.currentParentId)
    .sort((a, b) => Number(a.index || 0) - Number(b.index || 0));
}

function buildNodeTooltip(node) {
  return [
    `${node.index}. ${node.title || node.label}`,
    node.subtitle || node.description,
    `Readiness: ${readinessLabel(node.readiness || node.status)}`,
    `Open items: ${node.blockerCount || 0}`,
    `Evidence: ${node.evidenceCount || 0}`,
    node.config ? `Config: ${node.config}` : null,
    node.model ? `Mode: ${node.model}` : null,
    node.handoff && node.handoff.length ? `Handoff: ${node.handoff.join('; ')}` : null,
  ].filter(Boolean).join('\n');
}

function workflowLineDefs() {
  return `<defs><marker id="edge-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 1 L 10 5 L 0 9 z" fill="rgba(100,116,139,.6)"></path></marker></defs>`;
}

function updateWorkflowLines(canvas) {
  if (!canvas || !canvas.isConnected) return;
  const svg = canvas.querySelector('.workflow-lines');
  if (!svg) return;
  const canvasRect = canvas.getBoundingClientRect();
  svg.setAttribute('viewBox', `0 0 ${Math.max(1, canvasRect.width)} ${Math.max(1, canvasRect.height)}`);
  svg.innerHTML = workflowLineDefs();

  const activeEdges = window.appState.viewMode === 'flat'
    ? window.mockData.workflowEdges
    : window.mockData.hierarchicalEdges.filter((edge) => {
        const src = window.mockData.nodes.find((n) => n.id === edge.source);
        const tgt = window.mockData.nodes.find((n) => n.id === edge.target);
        return src && tgt && src.parentId === window.appState.currentParentId;
      });

  activeEdges.forEach((edge) => {
    const source = canvas.querySelector(`[data-node-id="${edge.source}"]`);
    const target = canvas.querySelector(`[data-node-id="${edge.target}"]`);
    if (!source || !target) return;
    const sourceRect = source.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    // Connect from output handle (right side) to input handle (left side)
    const x1 = sourceRect.right - canvasRect.left;
    const y1 = sourceRect.top + sourceRect.height / 2 - canvasRect.top;
    const x2 = targetRect.left - canvasRect.left;
    const y2 = targetRect.top + targetRect.height / 2 - canvasRect.top;
    // Cubic bezier curve
    const dx = Math.max(Math.abs(x2 - x1) * 0.45, 40);
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`);
    path.setAttribute('class', `edge-${edge.tone || 'neutral'}`);
    path.setAttribute('marker-end', 'url(#edge-arrow)');
    svg.appendChild(path);
  });
}

function updateAllWorkflowLines() {
  document.querySelectorAll('.node-canvas').forEach((canvas) => updateWorkflowLines(canvas));
}

function scheduleWorkflowLines(canvas) {
  window.requestAnimationFrame(() => {
    updateWorkflowLines(canvas);
    window.requestAnimationFrame(() => updateWorkflowLines(canvas));
  });
}

function ensureWorkflowLineListeners() {
  if (window.workflowLineListenersBound) return;
  window.workflowLineListenersBound = true;
  window.addEventListener('resize', () => {
    window.requestAnimationFrame(updateAllWorkflowLines);
  });
}

function getBreadcrumbsHTML() {
  if (window.appState.viewMode === 'flat') {
    return `<div class="canvas-breadcrumbs"><span class="breadcrumb-item active">Flat Workflow view</span></div>`;
  }
  let html = `<div class="canvas-breadcrumbs"><span class="breadcrumb-item clickable" id="breadcrumb-root">All Requirements</span>`;
  if (window.appState.currentParentId) {
    const ancestors = [];
    let cur = window.mockData.nodes.find((n) => n.id === window.appState.currentParentId);
    while (cur) {
      ancestors.unshift(cur);
      cur = window.mockData.nodes.find((n) => n.id === cur.parentId);
    }
    ancestors.forEach((node) => {
      html += ` <span class="breadcrumb-separator">➔</span> <span class="breadcrumb-item clickable" data-breadcrumb-node="${node.id}">${node.title || node.label}</span>`;
    });
  }
  html += `</div>`;
  return html;
}

function drillDownToNode(node) {
  const childLevelMap = {
    'requirements': 'architecture',
    'architecture': 'component',
    'component': 'phase',
    'phase': 'task'
  };
  const targetLevel = childLevelMap[node.level];
  if (targetLevel) {
    window.appState.currentParentId = node.id;
    window.appState.currentLevel = targetLevel;
    window.appState.selectedNodeId = null;
    window.renderPage('workbench');
  }
}

function renderNodeCanvas() {
  ensureWorkflowLineListeners();
  const canvas = createElement('div', `node-canvas canvas-mode-${window.appState.viewMode}`);

  canvas.innerHTML = `
    ${getBreadcrumbsHTML()}
    <div class="canvas-label">Cockpit object map / COCKPIT-MVP-014</div>
    <div class="canvas-toolbar">
      <span class="canvas-mode-chip" title="Inspect-only local canvas">Inspect-only</span>
      <div class="canvas-view-mode-toggle">
        <button class="view-mode-btn ${window.appState.viewMode === 'hierarchical' ? 'active' : ''}" type="button" id="toggle-view-hierarchical" title="Hierarchical Explorer">Hierarchical</button>
        <button class="view-mode-btn ${window.appState.viewMode === 'flat' ? 'active' : ''}" type="button" id="toggle-view-flat" title="Flat Sequential Flow">Flat Flow</button>
      </div>
      <span class="mono" style="color: var(--text-muted); font-size: .72rem; padding: 0 6px;">100%</span>
      <button class="icon-btn" type="button" aria-label="Lock view" title="Local view lock only">${icon('lock')}</button>
    </div>`;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'workflow-lines');
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.innerHTML = workflowLineDefs();
  canvas.appendChild(svg);

  const legend = createElement('div', 'canvas-legend');
  legend.innerHTML = `<h4>Edge legend</h4>
    <div class="canvas-legend-items">
      <div class="canvas-legend-item"><span class="canvas-legend-line edge-validated"></span>Validated</div>
      <div class="canvas-legend-item"><span class="canvas-legend-line edge-pending"></span>Pending</div>
      <div class="canvas-legend-item"><span class="canvas-legend-line edge-risk"></span>Risk</div>
      <div class="canvas-legend-item"><span class="canvas-legend-line edge-neutral"></span>Neutral</div>
    </div>`;
  canvas.appendChild(legend);

  const flowClass = window.appState.viewMode === 'flat' ? 'node-flow node-flow-flat' : 'node-flow node-flow-map';
  const flow = createElement('div', flowClass);
  getOrderedWorkbenchNodes().forEach((node) => {
    const card = createElement('button', `node-card node-type-${node.type} status-tone-${statusTone(node.status)}`);
    card.type = 'button';
    card.dataset.nodeId = node.id;
    card.setAttribute('aria-label', `Select ${node.index} ${node.familyLabel || node.typeLabel || node.type} ${node.title || node.label}. Readiness: ${readinessLabel(node.readiness || node.status)}`);
    card.title = buildNodeTooltip(node);
    if (window.appState.selectedNodeId === node.id) card.classList.add('selected');

    if (window.appState.viewMode !== 'flat') {
      card.style.left = `${node.x}%`;
      card.style.top = `${node.y}%`;
    }

    const hasChildren = window.appState.viewMode === 'hierarchical' && window.mockData.nodes.some((n) => n.parentId === node.id);
    const exploreActionHTML = hasChildren
      ? `<span class="node-drill-down-action" title="Double click card or click here to explore children">${icon('arrow')} Explore</span>`
      : '';

    card.innerHTML = `<span class="node-handle node-handle-input" aria-hidden="true"></span>
      <span class="node-handle node-handle-output" aria-hidden="true"></span>
      <div class="node-topline">
        <span class="node-type-icon">${icon(NODE_ICON_BY_TYPE[node.type] || 'spark')}</span>
        <div class="node-label">${node.title || node.label}</div>
      </div>
      <div class="node-readiness-row">
        ${renderStatusChip(node.readiness || node.status, readinessLabel(node.readiness || node.status))}
        <span class="node-metric node-metric-blocker" title="Open readiness item count">${node.blockerCount || 0} open</span>
        <span class="node-metric node-metric-evidence" title="Linked evidence count">${node.evidenceCount || 0} ev</span>
      </div>
      ${exploreActionHTML}`;

    card.addEventListener('click', (event) => {
      event.stopPropagation();
      selectNode(node.id);
    });

    if (hasChildren) {
      card.addEventListener('dblclick', (event) => {
        event.stopPropagation();
        drillDownToNode(node);
      });
      const exploreBtn = card.querySelector('.node-drill-down-action');
      if (exploreBtn) {
        exploreBtn.addEventListener('click', (event) => {
          event.stopPropagation();
          drillDownToNode(node);
        });
      }
    }

    flow.appendChild(card);
  });
  canvas.appendChild(flow);

  // Bind toolbar view toggle listeners
  const toggleHierarchical = canvas.querySelector('#toggle-view-hierarchical');
  const toggleFlat = canvas.querySelector('#toggle-view-flat');
  if (toggleHierarchical) {
    toggleHierarchical.addEventListener('click', (event) => {
      event.stopPropagation();
      window.appState.viewMode = 'hierarchical';
      window.appState.currentParentId = null;
      window.appState.currentLevel = 'requirements';
      window.appState.selectedNodeId = null;
      window.renderPage('workbench');
    });
  }
  if (toggleFlat) {
    toggleFlat.addEventListener('click', (event) => {
      event.stopPropagation();
      window.appState.viewMode = 'flat';
      window.appState.currentParentId = null;
      window.appState.currentLevel = 'task';
      window.appState.selectedNodeId = 'node-1';
      window.renderPage('workbench');
    });
  }

  // Bind breadcrumb click listeners
  const bcRoot = canvas.querySelector('#breadcrumb-root');
  if (bcRoot) {
    bcRoot.addEventListener('click', (event) => {
      event.stopPropagation();
      window.appState.currentParentId = null;
      window.appState.currentLevel = 'requirements';
      window.appState.selectedNodeId = null;
      window.renderPage('workbench');
    });
  }
  canvas.querySelectorAll('[data-breadcrumb-node]').forEach((bcNode) => {
    bcNode.addEventListener('click', (event) => {
      event.stopPropagation();
      const nodeId = bcNode.dataset.breadcrumbNode;
      const node = window.mockData.nodes.find((n) => n.id === nodeId);
      if (node) {
        window.appState.currentParentId = node.id;
        window.appState.currentLevel = node.level;
        window.appState.selectedNodeId = null;
        window.renderPage('workbench');
      }
    });
  });

  const addNode = createElement('button', 'canvas-add-node');
  addNode.type = 'button';
  addNode.title = 'Add-node draft. This records local UI state only.';
  addNode.innerHTML = `${icon('add')}Add node<span>Local draft</span>`;
  addNode.addEventListener('click', (event) => {
    event.stopPropagation();
    window.appState.mockAddNodeRequested = true;
    window.appState.lastLocalValidation = 'Add-node request captured locally. No node changed runtime state or persisted.';
    window.renderPage('workbench');
  });
  canvas.appendChild(addNode);

  if (window.appState.mockAddNodeRequested) {
    const notice = createElement('div', 'canvas-local-note');
    notice.innerHTML = `${icon('check')}Add-node request recorded in local state only. Reloading the page clears it.`;
    canvas.appendChild(notice);
  }

  canvas.appendChild(createElement('div', 'canvas-minimap'));
  scheduleWorkflowLines(canvas);
  return canvas;
}

function selectNode(nodeId) {
  const prevId = window.appState.selectedNodeId;
  window.appState.selectedNodeId = nodeId;
  if (window.appState.currentPage === 'workbench') {
    // Selective update instead of full re-render
    if (prevId) {
      const prevCard = document.querySelector(`[data-node-id="${prevId}"]`);
      if (prevCard) prevCard.classList.remove('selected');
    }
    const nextCard = document.querySelector(`[data-node-id="${nodeId}"]`);
    if (nextCard) nextCard.classList.add('selected');
    // Update utility tray header text
    const traySubtitle = document.querySelector('.utility-tray-header p');
    const node = window.mockData.nodes.find((n) => n.id === nodeId);
    if (traySubtitle && node) {
      traySubtitle.textContent = `${node.id} / ${node.title || node.label}`;
    }
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
          <div class="inspector-id">Inspector</div>
        </div>
        <button class="icon-btn" type="button" aria-label="Close inspector" id="close-inspector">${icon('close')}</button>
      </div>
      <div class="inspector-empty">
        <h4>Select a node to inspect artifact readiness</h4>
        <p>Use the canvas cards to inspect requirements, evidence, review context, and handoff readiness without leaving the Workbench.</p>
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
      <h4>Local safety notice</h4>
      <div class="static-notice">Local only / Inspect-only. This inspector updates browser state only. It does not call AI services, mutate runtime state, write repositories or deploy artifacts.</div>
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
        showToast('Handoff preview is available locally. No files are written.', 'success');
      } else {
        showToast('Prepare handoff is gated by local readiness items.', 'warning');
      }
    });
  }

  const exploreAction = inspector.querySelector('#inspector-explore-action');
  if (exploreAction) {
    exploreAction.addEventListener('click', () => {
      drillDownToNode(node);
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
          ${renderInspectorList(node.requirements || ['No requirements recorded for this node'])}
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
            <span>${node.blockerCount || 0} open item${node.blockerCount === 1 ? '' : 's'} on this node</span>
            ${renderStatusChip(readiness.reviewBlockers.length ? 'review-blocked' : 'ready', readiness.reviewBlockers.length ? `${readiness.reviewBlockers.length} review item${readiness.reviewBlockers.length === 1 ? '' : 's'}` : 'Review acknowledged')}
          </div>
          ${renderInspectorList(node.review || ['No review notes configured'])}
        </div>
        <div class="inspector-section">
          <h4>Guardrails</h4>
          ${renderInspectorList(node.guardrails || ['Inspect-only behavior'])}
        </div>`;
    case 'handoff':
      return `<div class="inspector-section">
          <h4>Handoff Packet</h4>
          <div class="handoff-gate-card">
            ${renderStatusChip(readiness.ready ? 'ready' : 'blocked', readiness.ready ? 'Ready locally' : 'Gated locally')}
            <p>${readiness.ready ? 'The local checklist is clear. The preview writes no files.' : 'Prepare handoff stays disabled until the local readiness checklist is clear.'}</p>
            ${renderInspectorList(readiness.handoffBlockers.length ? readiness.handoffBlockers : ['No open readiness items'])}
            <button class="action-btn action-primary" id="inspector-handoff-action" type="button" ${readiness.ready ? '' : 'disabled'}>${icon('handoff')}Prepare handoff</button>
          </div>
        </div>
        <div class="inspector-section">
          <h4>Selected node handoff context</h4>
          ${renderInspectorList(node.handoff || ['No handoff context configured'])}
        </div>`;
    case 'overview':
    default:
      const hasChildren = window.appState.viewMode === 'hierarchical' && window.mockData.nodes.some((n) => n.parentId === node.id);
      return `<div class="inspector-section">
          <h4>Overview</h4>
          <div class="inspector-grid">
            <div class="inspector-row"><span>Purpose</span><strong>${node.description}</strong></div>
            <div class="inspector-row"><span>Family</span><strong>${node.familyLabel || node.typeLabel || node.type}</strong></div>
            <div class="inspector-row"><span>Config</span><strong>${node.config || 'Configured'}</strong></div>
            <div class="inspector-row"><span>Mode</span><strong>${node.model || 'Local only'}</strong></div>
            <div class="inspector-row"><span>Readiness</span><strong>${readinessLabel(node.readiness || node.status)}</strong></div>
          </div>
          ${hasChildren ? `
          <div class="inspector-drill-row" style="margin-top: 16px;">
            <button class="action-btn action-primary" id="inspector-explore-action" type="button" style="width: 100%; justify-content: center;">
              ${icon('arrow')} Drill Down / Explore
            </button>
          </div>` : ''}
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
        ${renderStatusChip(readiness.ready ? 'ready' : 'blocked', readiness.ready ? 'Ready locally' : `${readiness.handoffBlockers.length} open item${readiness.handoffBlockers.length === 1 ? '' : 's'}`)}
        <button class="action-btn" type="button" id="toggle-utility-tray">${window.appState.utilityTrayCollapsed ? 'Expand tray' : 'Collapse tray'}</button>
      </div>
    </div>`;

  if (!window.appState.utilityTrayCollapsed) {
    const body = createElement('div', 'utility-tray-body');
    body.innerHTML = `<section class="readiness-panel">
        <div class="readiness-panel-head">
          <h4>Global readiness checklist</h4>
          <span class="mode-chip">Local preview</span>
        </div>
        <div class="readiness-grid">
          ${renderReadinessTile('Missing evidence', readiness.missingEvidence.length, readiness.missingEvidence.map((item) => item.label || item.name || item.id), window.appState.evidenceReviewed)}
          ${renderReadinessTile('Missing decisions', readiness.pendingDecisions.length, readiness.pendingDecisions.map((decision) => decision.id), false)}
          ${renderReadinessTile('Review items', readiness.reviewBlockers.length, readiness.reviewBlockers.map((review) => review.name), window.appState.reviewBlockersAcknowledged)}
          ${renderReadinessTile('Readiness items', readiness.handoffBlockers.length, readiness.handoffBlockers, readiness.ready)}
        </div>
        <div class="readiness-actions">
          <button class="action-btn" type="button" id="mark-evidence-reviewed">${icon('check')}Mark evidence reviewed locally</button>
          <button class="action-btn" type="button" id="ack-review-blockers">${icon('review')}Acknowledge review items locally</button>
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
      window.appState.lastLocalValidation = 'Evidence and trace links were reviewed locally.';
      syncShellState(window.appState.currentPage);
      window.renderPage('workbench');
    });
  }

  const ackReview = tray.querySelector('#ack-review-blockers');
  if (ackReview) {
    ackReview.addEventListener('click', () => {
      window.appState.reviewBlockersAcknowledged = true;
      window.appState.lastLocalValidation = 'Review items were acknowledged locally.';
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
  return `<h4>Assistant notes</h4>
    <div class="assistant-context-line">
      ${renderStatusChip('inspect', 'Local notes')}
      <span>${selectedNode ? `Selected: ${selectedNode.title || selectedNode.label}` : 'No node selected'}</span>
    </div>
    <div class="chat-transcript" aria-label="Assistant transcript">
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
    : handoffPacket.blockedBy || legacyPacket.blocked_by || ['No open items'];
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
      `Work Packet: ${workPacket.id || handoffPacket.workPacketId || 'work-packet-primary-workflow'}`,
      `Decisions: ${includedDecisions.map((decision) => `${decision.id} ${statusLabel(decision.status)}`).join(', ') || 'No decisions linked'}`,
      `Evidence: ${includedEvidence.map((item) => `${item.id} ${statusLabel(item.status)}`).join(', ') || 'No evidence linked'}`,
      `Validation Results: ${validationResults.map((result) => `${result.id} ${statusLabel(result.status)}`).join(', ') || 'No validation results linked'}`,
    ]],
    ['readiness_status', [statusLabel(readinessStatus), readiness.ready ? 'Readiness checks are clear locally.' : 'Readiness checks still have open items.']],
    ['blocked_by', blockedBy],
  ];

  return `<div class="handoff-preview-head">
      <div>
        <h4>Derived Handoff Packet Preview</h4>
        <p>${handoffPacket.id || legacyPacket.packet_id} / Derived from Work Packet, Decisions, Evidence, and Validation Results</p>
      </div>
      ${renderStatusChip(readiness.ready ? 'ready' : 'blocked', readiness.ready ? 'Readiness status: Ready locally' : 'Readiness status: Gated locally')}
    </div>
    <div class="static-notice">Work Packet is the core object. Handoff Packet is a derived preview. Agent Roles: embedded metadata only.</div>
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
    <div class="static-notice">This packet preview uses local data. It does not write files, scan a repository, call an API, deploy, or create a real handoff.</div>`;
}

function renderWorkPacketSummaryPanel() {
  const workPacket = window.appState.workPacket || {};
  const handoffPacket = window.appState.handoffPacket || {};
  return `<div class="handoff-preview-head">
      <div>
        <div class="page-kicker">Work Packet summary</div>
        <h3>${workPacket.title || 'Cockpit Work Packet'}</h3>
        <p>${workPacket.id || handoffPacket.workPacketId || 'work-packet-primary-workflow'} / Work Packet is the core object</p>
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
        <h5>Workspace scope</h5>
        ${renderInspectorList(workPacket.allowedPaths || [])}
      </article>
      <article class="handoff-preview-section">
        <h5>Protected boundaries</h5>
        ${renderInspectorList(workPacket.forbiddenActions || [])}
      </article>
      <article class="handoff-preview-section">
        <h5>Acceptance criteria</h5>
        ${renderInspectorList(workPacket.acceptanceCriteria || [])}
      </article>
      <article class="handoff-preview-section">
        <h5>Readiness checks</h5>
        ${renderInspectorList(workPacket.validationCommands || [])}
      </article>
    </div>`;
}

function formatHandoffSectionLabel(key) {
  const labels = {
    primary_demo_path: 'Primary workflow',
    objective: 'Objective',
    allowed_paths: 'Workspace scope',
    forbidden_actions: 'Protected boundaries',
    required_work: 'Required work',
    acceptance_criteria: 'Acceptance criteria',
    validation_commands: 'Readiness checks',
    derived_inputs: 'Derived inputs',
    readiness_status: 'Readiness status',
    blocked_by: 'Open readiness items',
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
    showToast('Select a node before adding local Selected Context.', 'warning');
    return;
  }
  const node = window.mockData.nodes.find((n) => n.id === window.appState.selectedNodeId);
  if (!node) return;
  const exists = window.appState.context.some((item) => item.label === node.label);
  if (exists) {
    showToast('This node is already in local Selected Context. No artifact changed.', 'info');
    return;
  }
  window.appState.context.push({ id: node.id, label: node.label });
  showToast(`${node.label} was added to local Selected Context only.`, 'success');
  window.renderPage('workbench');
  renderNodeInspector(node.id);
}

function removeContextItem(idx) {
  const [removed] = window.appState.context.splice(idx, 1);
  showToast(`${removed ? removed.label : 'Context item'} was removed from local browser state only.`, 'warning');
  window.renderPage('workbench');
}

function getStatusClass(status) {
  switch (normalizeObjectStatus(status)) {
    case 'validated':
    case 'allowed':
    case 'complete':
    case 'attached':
    case 'review-complete':
    case 'finding-resolved':
      return 'status-validated';
    case 'needs-lock':
    case 'decision-needs-lock':
    case 'deferred':
    case 'decision-deferred':
    case 'finding-deferred':
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
    case 'finding-resolved':
      return 'validated';
    case 'needs-lock':
    case 'needs-answer':
    case 'needs-sync':
    case 'needs-criteria':
    case 'deferred':
    case 'decision-deferred':
    case 'finding-deferred':
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
      return 'Unavailable';
    case 'draft':
      return 'Draft';
    case 'needs-sync':
      return 'Needs sync';
    case 'ready':
      return 'Ready';
    case 'needs-evidence':
      return 'Needs evidence';
    case 'review-blocked':
      return 'Review items';
    case 'needs-decision':
      return 'Needs decision';
    case 'review-complete':
      return 'Review complete';
    case 'finding-open':
      return 'Finding open';
    case 'finding-resolved':
      return 'Finding resolved';
    case 'finding-deferred':
      return 'Finding deferred';
    case 'validation-blocked':
      return 'Validation waiting';
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
      return 'Handoff waiting';
    case 'handoff-only':
      return 'Handoff only';
    case 'mock-preview':
      return 'Preview';
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
  const validation = window.appState.validationResults.find((result) => result.id === 'validation-local-readiness');
  const panel = createElement('section', 'panel');
  panel.style.marginTop = '12px';
  panel.innerHTML = `<div class="handoff-preview-head">
      <div>
        <h3>Governed spec readiness</h3>
        <p>Spec fields feed D-005 and the handoff preview. Missing acceptance criteria keeps readiness waiting.</p>
      </div>
      ${renderStatusChip(readiness.unresolvedSpecFields.length ? 'blocked' : 'ready', readiness.unresolvedSpecFields.length ? `${readiness.unresolvedSpecFields.length} unresolved` : 'Fields clear')}
    </div>
    <div class="readiness-grid">
      ${renderReadinessTile('Acceptance criteria', acceptance && acceptance.status === 'missing' ? 1 : 0, acceptance && acceptance.status === 'missing' ? [acceptance.suggestion] : ['Acceptance criteria present'], acceptance && acceptance.status !== 'missing')}
      ${renderReadinessTile('Validation state', readiness.validationBlocked ? 1 : 0, [readiness.validationBlocked ? (validation ? validation.summary : 'No validation result recorded') : 'Spec validation confirmed locally'], !readiness.validationBlocked)}
      ${renderReadinessTile('D-005 gate', readiness.pendingDecisions.filter((decision) => decision.id === 'D-005').length, ['Codex handoff gating checkpoint'], false)}
    </div>`;
  return panel;
}

function resetLocalSpecField(field) {
  field.value = '';
  field.status = field.suggestion ? 'ai-suggested' : 'missing';
  markSpecValidationStale(`Field "${field.name}" was reset locally. Spec validation must be refreshed.`);
  showToast(`Reset "${field.name}" locally. No artifact was generated or changed.`, 'warning');
  window.renderPage('spec-builder');
}

function unlockLocalSpecField(field) {
  field.status = 'needs-lock';
  markSpecValidationStale(`Field "${field.name}" was unlocked locally. Re-lock and revalidate before handoff.`);
  showToast(`Unlocked "${field.name}" locally. Re-locking does not change real artifacts.`, 'warning');
  window.renderPage('spec-builder');
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
  select.addEventListener('change', () => {
    showToast(`Template selector changed to "${select.value}" for local explanation only. Field contents and artifacts are unchanged.`, 'info');
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
    const fieldActions = [
      ['Explain', () => showToast(`Local explanation for "${field.name}" only. No AI call or artifact generation occurs.`, 'info')],
      ['Suggest', () => {
        field.value = field.suggestion;
        field.status = 'draft';
        markSpecValidationStale(`Field "${field.name}" changed locally. Spec validation must be refreshed.`);
        showToast(`Applied the suggestion to "${field.name}" locally.`, 'success');
        window.renderPage('spec-builder');
      }],
      ['Ask one', () => showToast(`Question prompt for "${field.name}" is local feedback only. No AI service is called.`, 'info')],
      ['Lock', () => {
        field.status = 'locked';
        markSpecValidationStale(`Field "${field.name}" was locked locally. Spec validation must be refreshed.`);
        showToast(`Locked "${field.name}" locally.`, 'success');
        window.renderPage('spec-builder');
      }],
      ['Trace', () => window.navigate('trace')],
    ];
    if (field.status === 'locked') {
      fieldActions.push(['Unlock local field', () => unlockLocalSpecField(field)]);
    } else if (field.value) {
      fieldActions.push(['Reset local field', () => resetLocalSpecField(field)]);
    }
    fieldActions.forEach(([text, handler]) => {
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
      window.appState.lastLocalValidation = 'Spec validation is waiting until all required fields are resolved.';
      showToast('Validation is waiting on unresolved local fields. No artifacts were generated.', 'warning');
      window.renderPage('spec-builder');
    } else {
      window.appState.specValidated = true;
      refreshDerivedEvidenceState();
      updateHandoffReadiness();
      const readiness = getReadinessSummary();
      if (readiness.handoffBlockers.length) {
        window.appState.lastLocalValidation = `Specification validated locally. Handoff remains gated by ${readiness.handoffBlockers.length} readiness item(s).`;
      } else {
        window.appState.lastLocalValidation = 'Specification validated locally. Handoff preview is ready.';
      }
      showToast(window.appState.lastLocalValidation, readiness.handoffBlockers.length ? 'warning' : 'success');
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
        showToast('Handoff preview is available locally. No files are written.', 'success');
      } else {
        showToast('Prepare handoff is gated by local readiness items.', 'warning');
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
    <p><strong>${reviewRun.name || 'Review run'}</strong></p>
    <p>Verdict: ${reviewRun.verdict || 'Inspect-only advisory review'}</p>
    <p>Scope Context Nodes: ${(reviewRun.scopeContextIds || []).join(', ') || window.appState.context.map((c) => c.label).join(', ') || 'No context selected.'}</p>
    ${renderStatusChip(normalizeObjectStatus(reviewRun.status || 'review_complete'), statusLabel(normalizeObjectStatus(reviewRun.status || 'review_complete')))}`;
  container.appendChild(scope);

  const findingSummary = createElement('section', 'panel');
  findingSummary.style.marginTop = '12px';
  findingSummary.innerHTML = `<h3>Finding objects</h3>
    <p>${findings.length} advisory Findings are linked to this Review Run. Actions acknowledge or defer them locally.</p>
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
      ['Acknowledge locally', () => {
        finding.status = 'finding_resolved';
        showToast(`Acknowledged ${finding.id} locally. No review result or artifact was changed.`, 'success');
        showReviewResults(resultsDiv);
      }],
      ['Defer locally', () => {
        finding.status = 'finding_deferred';
        showToast(`Deferred ${finding.id} locally. No real review workflow was changed.`, 'warning');
        showReviewResults(resultsDiv);
      }],
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
    subtitle: 'Inspect the artifact shell and compare visible coverage against the current specification state.',
  });

  const selectorDiv = createElement('div', 'control-row');
  const label = createElement('label', '', 'Artifact Reference type');
  label.setAttribute('for', 'artifact-type');
  const select = createElement('select');
  select.id = 'artifact-type';
  ['UI Preview', 'HTML Preview', 'Component Shell'].forEach((type) => {
    const opt = createElement('option');
    opt.value = type;
    opt.textContent = type;
    select.appendChild(opt);
  });
  select.addEventListener('change', () => {
    showToast(`Artifact type selector changed to "${select.value}" locally. No file is produced and no artifact record is mutated.`, 'info');
  });
  selectorDiv.append(label, select);
  container.appendChild(selectorDiv);

  const frame = createElement('div', 'preview-frame');
  frame.innerHTML = `<div class="preview-frame-content">
      <div class="preview-frame-title">Preview of selected artifact</div>
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
    ['+', () => showToast('Preview zoom is local only. No rendered artifact or file output changes.', 'info')],
    ['-', () => showToast('Preview zoom is local only. No rendered artifact or file output changes.', 'info')],
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
    ['View preview', 'spark', () => showToast('Opening the preview only. No generation occurs.', 'info')],
    ['Compare spec', 'check', () => showToast('Comparing preview with spec locally. No artifact record is mutated.', 'info')],
    ['Inspect UX notes', 'eye', () => showToast('UX notes are inspect-only. No external calls occur.', 'info')],
    ['View gated preview', 'handoff', () => showToast('Preview only. No file output, repository change, or runtime action occurs.', 'success'), !window.appState.handoffReady],
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
    subtitle: 'Operational lock list for D-005 and related cockpit approval points.',
    className: 'governance-header',
  });

  const needsLock = window.appState.decisions.filter((d) => d.status === 'needs-lock');
  const locked = window.appState.decisions.filter((d) => d.status === 'locked');
  const d005 = window.appState.decisions.find((d) => d.id === 'D-005');
  if (d005) {
    const checkpoint = createElement('section', 'panel decision-checkpoint');
    checkpoint.innerHTML = `<div class="handoff-preview-head">
        <div>
          <h3>D-005 governance checkpoint</h3>
          <p>${d005.description}</p>
        </div>
        ${renderStatusChip(d005.status === 'locked' ? 'locked' : 'needs-lock', d005.status === 'locked' ? 'Locked' : 'Needs Point lock')}
      </div>
      <div class="static-notice">This decision only gates the handoff preview. It does not approve live Codex work, repository changes, deployment, connectors, or runtime workflow work.</div>`;
    container.appendChild(checkpoint);
  }

  container.appendChild(renderDecisionGroup('Needs Point lock', needsLock, 'No decisions require locking.'));
  container.appendChild(renderDecisionGroup('Locked decisions', locked, 'No locked decisions.'));
}

function renderDecisionGroup(title, decisions, emptyText) {
  const section = createElement('section', 'decision-section');
  section.innerHTML = `<div class="decision-section-head">
      <h3 class="section-title">${title}</h3>
      <span class="metric-label">${decisions.length} item${decisions.length === 1 ? '' : 's'}</span>
    </div>`;
  const board = createElement('div', 'decision-board');
  if (decisions.length === 0) {
    board.appendChild(createElement('div', 'panel decision-empty', emptyText));
  } else {
    decisions.forEach((decision) => board.appendChild(createDecisionRow(decision)));
  }
  section.appendChild(board);
  return section;
}

function createDecisionRow(dec) {
  const row = createElement('article', `decision-row status-${dec.status === 'locked' ? 'locked' : 'needs-lock'}`);
  row.innerHTML = `<div class="decision-row-status">
      <span class="mono">${dec.id}</span>
      ${renderStatusChip(dec.status === 'locked' ? 'locked' : 'needs-lock', dec.status === 'locked' ? 'Locked' : 'Needs lock')}
    </div>
    <div class="decision-row-copy">
      <h4>${dec.title}</h4>
      <p>${dec.description}</p>
      <small>${dec.gates ? `Gates: ${dec.gates.join(', ')}` : 'No gate mapping'}${dec.requiresPointLock ? ' / Point lock required before readiness' : ''}</small>
    </div>`;

  const comparator = createElement('div', 'decision-options decision-options-inline');
  dec.options.forEach((opt) => {
    const optBtn = createElement('button', `action-btn${dec.chosenOption === opt ? ' selected' : ''}`, opt);
    optBtn.type = 'button';
    optBtn.addEventListener('click', () => {
      dec.chosenOption = opt;
      dec.status = 'locked';
      refreshDerivedEvidenceState();
      updateHandoffReadiness();
      showToast(`${dec.id} was locked locally. This does not create or change any real Point approval.`, 'success');
      window.renderPage('decisions');
    });
    comparator.appendChild(optBtn);
  });
  row.appendChild(comparator);

  const actions = createElement('div', 'decision-actions decision-actions-compact');
  const decisionActions = [
    ['Lock local decision', 'lock', () => {
      dec.status = 'locked';
      if (!dec.chosenOption) dec.chosenOption = dec.options[0];
      refreshDerivedEvidenceState();
      updateHandoffReadiness();
      showToast(`${dec.id} was locked locally. This does not approve live Codex work or repository changes.`, 'success');
      window.renderPage('decisions');
    }],
    ['Open trace', 'trace', () => window.navigate('trace')],
  ];
  if (dec.status === 'locked' || dec.chosenOption) {
    decisionActions.splice(1, 0, ['Reset local lock', 'warning', () => {
      dec.status = 'needs-lock';
      dec.chosenOption = null;
      markDecisionEvidenceStale(dec.id);
      showToast(`${dec.id} local lock was reset in browser state only. This does not change any real Point approval.`, 'warning');
      window.renderPage('decisions');
    }]);
  }
  decisionActions.forEach(([text, iconName, handler]) => {
    const btn = createElement('button', 'action-btn');
    btn.type = 'button';
    btn.innerHTML = `${icon(iconName)}${text}`;
    btn.addEventListener('click', handler);
    actions.appendChild(btn);
  });
  row.appendChild(actions);
  return row;
}

function renderTrace(container) {
  showGovernance(true);
  renderPageHeader(container, {
    kicker: 'Traceability',
    title: 'Trace & Evidence',
    subtitle: 'Follow source-to-target links across context, spec fields, decisions, and artifact readiness.',
    className: 'governance-header',
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
    <p>Concrete references linked to Project, Spec Draft, Work Packet, and Handoff Packet objects.</p>
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
    warn.innerHTML = `${icon('warning')}Warning: Some spec fields do not have trace evidence. Handoff readiness waits until all fields are traced.`;
    container.appendChild(warn);
  }

  const missingEvidence = getMissingEvidenceItems();
  if (missingEvidence.length > 0) {
    const warn = createElement('div', 'warning-banner');
    warn.style.marginTop = '12px';
    warn.innerHTML = `${icon('warning')}Required evidence still keeps the handoff preview unavailable: ${missingEvidence.map((item) => item.label).join(', ')}.`;
    container.appendChild(warn);
  }
}

function renderRules(container) {
  showGovernance(true);
  renderPageHeader(container, {
    kicker: 'Governance',
    title: 'Rules & Scope',
    subtitle: 'The safety model keeps runtime mutation, secrets, external actions, and repository writes outside this workspace.',
    className: 'governance-header',
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
  gateSummary.innerHTML = '<h3>Review Gate Summary</h3><p>Runtime mutation is unavailable; repository changes stay outside this workspace; secret and external actions are excluded; agents can inspect only; Codex handoff is gated until ready.</p>';
  summaries.appendChild(gateSummary);
  container.appendChild(summaries);
}

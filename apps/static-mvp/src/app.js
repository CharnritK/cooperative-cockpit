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
  fit: '<path d="M8 3H3v5" /><path d="M16 3h5v5" /><path d="M8 21H3v-5" /><path d="M16 21h5v-5" /><path d="M3 3l6 6M21 3l-6 6M3 21l6-6M21 21l-6-6" />',
  graph: '<path d="M6 6h4v4H6zM14 14h4v4h-4zM14 6h4v4h-4z" /><path d="M10 8h4M16 10v4M8 10v6h6" />',
  handoff: '<path d="M12 3v12" /><path d="m7 8 5-5 5 5" /><path d="M5 14v5h14v-5" />',
  home: '<path d="m3 10 9-7 9 7" /><path d="M5 10v10h14V10" /><path d="M9 20v-6h6v6" />',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" />',
  minus: '<path d="M5 12h14" />',
  note: '<path d="M4 4h16v16H4z" /><path d="M8 8h8M8 12h8M8 16h5" />',
  preview: '<path d="M4 5h16v14H4z" /><path d="M8 9h8M8 13h5" />',
  reset: '<path d="M4 4v6h6" /><path d="M20 20v-6h-6" /><path d="M5.5 15a7 7 0 0 0 11 2" /><path d="M18.5 9a7 7 0 0 0-11-2" />',
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
  { key: 'concept', label: 'Journey', pages: ['landing', 'demo-entry', 'project-hub', 'project-init', 'home'], caption: 'Local product entry' },
  { key: 'workbench', label: 'Workbench', pages: ['workbench'], caption: 'Context selected' },
  { key: 'spec', label: 'Spec', pages: ['spec-builder'], caption: 'Spec gates open' },
  { key: 'review', label: 'Review', pages: ['review-runs'], caption: 'Review evidence' },
  { key: 'preview', label: 'Preview', pages: ['preview'], caption: 'Preview sync' },
  { key: 'handoff', label: 'Handoff', pages: ['decisions', 'trace', 'rules'], caption: 'Locks and evidence' },
];

const WORKFLOW_STAGE_FOR_PAGE = WORKFLOW_STEPS.reduce((acc, step) => {
  step.pages.forEach((page) => {
    acc[page] = step;
  });
  return acc;
}, {});

const INSPECTOR_TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'requirements', label: 'Requirements' },
  { id: 'evidence', label: 'Evidence' },
];

const RIGHT_PANEL_TABS = [
  { id: 'inspector', label: 'Inspector' },
  { id: 'edit-fields', label: 'Edit Fields' },
  { id: 'copilot', label: 'Copilot' },
  { id: 'evidence', label: 'Evidence' },
  { id: 'trace', label: 'Trace' },
];

const TOAST_DURATION = 3500;
const DEFAULT_SPEC_TEMPLATE_ID = 'template-product-spec';
const DEFAULT_SPEC_FIELD_IDS = ['objective', 'layout-regions', 'interaction-states', 'protected-surfaces', 'acceptance-criteria', 'validation-method'];
const GLOBAL_HANDOFF_GATE_FIELD_IDS = ['acceptance-criteria', 'validation-method'];

document.addEventListener('DOMContentLoaded', () => {
  window.appState.specValidated = Boolean(window.appState.specValidated);
  const selectedSpecTemplateId = getSelectedSpecTemplateId();
  window.appState.selectedSpecTemplateId = selectedSpecTemplateId;
  window.appState.specDraft.templateId = selectedSpecTemplateId;

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
  if (typeof window.updateNavHighlight === 'function') window.updateNavHighlight(window.appState.currentPage);
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
  window.appState.inspectorVisible = Boolean(open);
  if (shell) shell.classList.toggle('inspector-open', open);
  if (inspector) inspector.classList.toggle('hidden', !open);
  const toggle = document.querySelector('[data-action="toggle-inspector"]');
  if (toggle) {
    toggle.classList.toggle('is-active', Boolean(open));
    toggle.setAttribute('aria-pressed', String(Boolean(open)));
  }
  window.requestAnimationFrame(updateAllWorkflowLines);
}

function renderInspectorEmpty(page = window.appState.currentPage) {
  const inspector = document.getElementById('right-inspector');
  if (!inspector) return;
  const activeStep = getWorkflowStep(page);
  inspector.innerHTML = `<div class="inspector-header">
      <div>
        <span class="chip chip-secondary">${activeStep.label}</span>
        <div class="inspector-title">Inspector</div>
        <div class="inspector-id">Route: ${page}</div>
      </div>
      <button class="icon-btn" type="button" aria-label="Close inspector" id="close-inspector">${icon('close')}</button>
    </div>
    <div class="inspector-empty">
      <h4>${page === 'workbench' ? 'Select a node to inspect details' : 'Workbench nodes have detailed inspector data'}</h4>
      <p>${page === 'workbench' ? 'Choose a canvas card to review requirements, evidence, and related pages.' : 'Use this panel to confirm the current stage without opening a new route. Detailed object inspection stays on the Workbench.'}</p>
    </div>`;
  inspector.querySelector('#close-inspector').addEventListener('click', () => setInspectorOpen(false));
}

function toggleInspector() {
  if (window.appState.currentPage === 'workbench') {
    setInspectorOpen(false);
    const panel = document.querySelector('.object-editor-panel');
    if (panel && typeof panel.focus === 'function') panel.focus({ preventScroll: true });
    return;
  }
  if (window.appState.inspectorVisible) {
    setInspectorOpen(false);
    return;
  }
  setInspectorOpen(true);
  renderInspectorEmpty(window.appState.currentPage);
}

function showGovernance(show) {
  const governance = document.getElementById('governance-strip');
  if (governance) governance.classList.toggle('hidden', !show);
}

function getWorkflowStep(page) {
  return WORKFLOW_STAGE_FOR_PAGE[page] || WORKFLOW_STEPS[0];
}

function getSelectedSpecTemplateId() {
  const templates = (window.appState && window.appState.specTemplates) || [];
  const draftTemplateId = window.appState && window.appState.specDraft && window.appState.specDraft.templateId;
  const selectedId = (window.appState && window.appState.selectedSpecTemplateId) || draftTemplateId || DEFAULT_SPEC_TEMPLATE_ID;
  if (templates.some((template) => template.id === selectedId)) return selectedId;
  return templates[0] ? templates[0].id : DEFAULT_SPEC_TEMPLATE_ID;
}

function getSelectedSpecTemplate() {
  const templateId = getSelectedSpecTemplateId();
  return ((window.appState && window.appState.specTemplates) || []).find((template) => template.id === templateId) || null;
}

function setSelectedSpecTemplate(templateId) {
  const templates = (window.appState && window.appState.specTemplates) || [];
  const selectedTemplate = templates.find((template) => template.id === templateId) || templates[0] || null;
  const selectedId = selectedTemplate ? selectedTemplate.id : DEFAULT_SPEC_TEMPLATE_ID;
  window.appState.selectedSpecTemplateId = selectedId;
  if (window.appState.specDraft) {
    window.appState.specDraft.templateId = selectedId;
    window.appState.specDraft.fieldIds = [...((selectedTemplate && selectedTemplate.fieldIds) || DEFAULT_SPEC_FIELD_IDS)];
  }
  return selectedTemplate;
}

function getSpecFieldsByIds(fieldIds) {
  const fields = (window.appState && window.appState.specFields) || [];
  return (fieldIds && fieldIds.length ? fieldIds : DEFAULT_SPEC_FIELD_IDS)
    .map((fieldId) => fields.find((field) => field.id === fieldId))
    .filter(Boolean);
}

function getTemplateSpecFields(template = getSelectedSpecTemplate()) {
  return getSpecFieldsByIds((template && template.fieldIds) || DEFAULT_SPEC_FIELD_IDS);
}

function getGlobalHandoffGateFields() {
  return getSpecFieldsByIds(GLOBAL_HANDOFF_GATE_FIELD_IDS);
}

function isGlobalHandoffGateField(field) {
  return field && GLOBAL_HANDOFF_GATE_FIELD_IDS.includes(field.id);
}

function getTemplateOnlySpecFields(template = getSelectedSpecTemplate()) {
  return getTemplateSpecFields(template).filter((field) => !isGlobalHandoffGateField(field));
}

function uniqueSpecFields(fields) {
  const seen = new Set();
  return fields.filter((field) => {
    if (!field || seen.has(field.id)) return false;
    seen.add(field.id);
    return true;
  });
}

function getActiveSpecFields() {
  return uniqueSpecFields([
    ...getTemplateSpecFields(),
    ...getGlobalHandoffGateFields(),
  ]);
}

function getMissingEvidenceFields() {
  return getActiveSpecFields().filter((field) => {
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
  const unresolvedSpecFields = getActiveSpecFields().filter((field) => ['ai-suggested', 'missing', 'needs-answer', 'needs-lock'].includes(field.status));
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

function getReadinessProgress(readiness = getReadinessSummary()) {
  const specFields = getActiveSpecFields() || [];
  const decisions = window.appState.decisions || [];
  const requiredEvidence = (window.appState.evidenceItems || []).filter((item) => item.requiredForHandoff);
  const missingFieldIds = new Set(readiness.missingEvidenceFields.map((item) => item.id.replace(/^field-/, '')));
  const highSeverityReviews = (window.appState.reviewResults || []).filter((review) => review.severity === 'high');
  const gates = [
    ...specFields.map((field) => field.status === 'locked'),
    ...decisions.map((decision) => decision.status !== 'needs-lock'),
    ...requiredEvidence.map((item) => item.status === 'attached'),
    ...specFields.map((field) => !missingFieldIds.has(field.id)),
    Boolean(window.appState.evidenceReviewed),
    Boolean(window.appState.specValidated),
    ...highSeverityReviews.map(() => Boolean(window.appState.reviewBlockersAcknowledged)),
  ];
  const total = gates.length || 1;
  const complete = gates.filter(Boolean).length;
  return {
    complete,
    total,
    percent: Math.round((complete / total) * 100),
  };
}

function updateHandoffReadiness() {
  window.appState.handoffReady = getReadinessSummary().ready;
}

function getPreviewSyncStatus(readiness = getReadinessSummary()) {
  const hasUnlockedFields = getActiveSpecFields().some((field) => field.status !== 'locked');
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
  return getActiveSpecFields().map((field) => {
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
  const readinessProgress = getReadinessProgress(readiness);
  const activeStep = getWorkflowStep(page);
  const shell = document.getElementById('app-shell');
  if (shell) {
    shell.classList.toggle('workbench-focus-mode', page === 'workbench' && Boolean(window.appState.workbenchFocusMode));
  }

  const projectOpen = !['landing', 'demo-entry', 'project-hub', 'project-init'].includes(page);
  document.querySelectorAll('[data-onboarding-nav]').forEach((item) => {
    item.hidden = projectOpen;
    item.setAttribute('aria-hidden', String(projectOpen));
  });

  const stagePill = document.getElementById('workflow-stage-pill');
  const stageLabel = document.getElementById('workflow-stage-label');
  const stageCaption = document.getElementById('workflow-stage-caption');
  if (stagePill) {
    stagePill.dataset.stage = activeStep.key;
    stagePill.classList.toggle('is-blocked', activeStep.key === 'handoff' && !window.appState.handoffReady);
  }
  if (stageLabel) stageLabel.textContent = activeStep.label;
  if (stageCaption) stageCaption.textContent = window.appState.handoffReady && activeStep.key === 'handoff' ? 'Ready for handoff' : activeStep.caption;

  const progressValue = document.getElementById('rail-progress-value');
  const progressFill = document.getElementById('rail-progress-fill');
  const progressCaption = document.getElementById('rail-progress-caption');
  if (progressValue) progressValue.textContent = `${readinessProgress.percent}%`;
  if (progressFill) progressFill.style.width = `${readinessProgress.percent}%`;
  if (progressCaption) {
    progressCaption.textContent = readiness.ready
      ? 'Ready for handoff'
      : `${readinessProgress.complete}/${readinessProgress.total} gates clear`;
  }

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
    case 'project-switcher':
      window.navigate('project-hub');
      break;
    case 'toggle-inspector':
      toggleInspector();
      break;
    case 'handoff':
      if (window.appState.handoffReady) {
        window.navigate('preview');
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

  const keepInspectorOpen = page !== 'workbench' && window.appState.inspectorVisible;
  main.innerHTML = '';
  if (!keepInspectorOpen) setInspectorOpen(false);
  if (page !== 'workbench') window.appState.activeWorkbenchPopover = null;
  showGovernance(false);
  syncShellState(page);

  switch (page) {
    case 'landing':
      renderLanding(main);
      break;
    case 'demo-entry':
      renderDemoEntry(main);
      break;
    case 'project-hub':
      renderProjectHub(main);
      break;
    case 'project-init':
      renderProjectInitialize(main);
      break;
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
      renderLanding(main);
  }

  animatePageEnter(main);
};

function renderLanding(container) {
  const journey = window.mockData.productJourney || {};
  const steps = journey.tutorialSteps || [];
  const hero = createElement('section', 'journey-hero landing-hero');
  hero.innerHTML = `<div class="journey-hero-copy">
      <div class="page-kicker">Landing / Product Concept</div>
      <h2 class="page-title">OpenClaw Cooperative Cockpit</h2>
      <p class="page-subtitle">${journey.promise || 'OpenClaw turns messy product and agent ideas into governed builder-ready handoff packets.'}</p>
      <p class="journey-audience">${journey.audience || 'For builders and reviewers who need a governed route from idea to handoff.'}</p>
      <div class="quick-actions">
        <button class="action-btn action-primary" type="button" id="continue-local-demo">${icon('arrow')}Continue to local demo</button>
        <button class="action-btn" type="button" id="open-existing-home">${icon('home')}Open current cockpit home</button>
      </div>
    </div>
    <div class="journey-hero-panel" aria-label="Three step local tutorial">
      <h3>Three-step local tutorial</h3>
      <ol class="journey-step-list">
        ${steps.map((step, index) => `<li>
          <span>${index + 1}</span>
          <div><strong>${step.title}</strong><p>${step.detail}</p></div>
        </li>`).join('')}
      </ol>
    </div>`;
  container.appendChild(hero);

  const proof = createElement('section', 'journey-card-grid');
  proof.innerHTML = `<article class="journey-card">
      <h3>What it is</h3>
      <p>A local governed workflow studio for context intake, SpecGraph shaping, review evidence, decisions, and handoff readiness.</p>
    </article>
    <article class="journey-card">
      <h3>Who it helps</h3>
      <p>First-time evaluators, builder/product operators, reviewers, and Point-level approvers who need scope clarity before execution.</p>
    </article>
    <article class="journey-card">
      <h3>What stays blocked</h3>
      <p>No backend, API, real auth, database, deployment, external connector, real AI/model call, storage persistence, secrets, or private data.</p>
    </article>`;
  container.appendChild(proof);

  hero.querySelector('#continue-local-demo').addEventListener('click', () => {
    window.appState.onboardingStage = 'demo-entry';
    window.navigate('demo-entry');
  });
  hero.querySelector('#open-existing-home').addEventListener('click', () => window.navigate('home'));
}

function renderDemoEntry(container) {
  renderPageHeader(container, {
    kicker: 'Static Demo Entry',
    title: 'Static Demo Entry',
    subtitle: 'No real login. This is a local/static/mock-only demo entry for evaluating the product journey safely.',
    actions: [
      { label: 'Enter demo', icon: 'arrow', onClick: () => window.navigate('project-hub') },
    ],
  });

  const grid = createElement('section', 'journey-card-grid demo-entry-grid');
  grid.innerHTML = `<article class="journey-card is-strong">
      <h3>Local/static/mock-only</h3>
      <p>This entry does not authenticate, connect accounts, call APIs, run models, write files, or persist browser storage.</p>
    </article>
    <article class="journey-card">
      <h3>Safe evaluation mode</h3>
      <p>All project cards, templates, guided chat, copilot suggestions, evidence, and decisions are fixed local mock data.</p>
    </article>
    <article class="journey-card">
      <h3>What comes next</h3>
      <p>Choose an existing project or initialize a composite scenario, then open Workbench to inspect the object hierarchy.</p>
    </article>`;
  container.appendChild(grid);
}

function renderProjectHub(container) {
  const projects = window.mockData.projectCards || [];
  renderPageHeader(container, {
    kicker: 'Project Hub',
    title: 'Project Hub',
    subtitle: 'Select an existing local project or initialize a safe public/composite scenario. No real customer, seller, or marketplace data is used.',
  });

  const grid = createElement('section', 'project-card-grid');
  projects.forEach((project) => {
    const card = createElement('article', 'project-card');
    card.innerHTML = `<div class="project-card-head">
        <div>
          <h3>${project.name}</h3>
          <p>${project.summary}</p>
        </div>
        ${renderStatusChip(project.status, statusLabel(project.status))}
      </div>
      <dl class="project-meta-grid">
        <div><dt>Status</dt><dd>${statusLabel(project.status)}</dd></div>
        <div><dt>Open blockers</dt><dd>${project.blockers}</dd></div>
        <div><dt>Mock last edited</dt><dd>${project.lastEdited}</dd></div>
        <div><dt>Readiness summary</dt><dd>${project.readiness}</dd></div>
      </dl>
      <div class="button-row">
        <button class="action-btn action-primary" type="button" data-open-project="${project.id}">${icon('graph')}Open project</button>
        <button class="action-btn" type="button" data-create-template="${project.id}">${icon('document')}Create from template</button>
      </div>`;
    grid.appendChild(card);
  });
  container.appendChild(grid);

  grid.querySelectorAll('[data-open-project]').forEach((button) => {
    button.addEventListener('click', () => {
      window.appState.selectedProjectId = button.dataset.openProject;
      window.navigate('workbench');
    });
  });
  grid.querySelectorAll('[data-create-template]').forEach((button) => {
    button.addEventListener('click', () => {
      window.appState.selectedProjectId = button.dataset.createTemplate;
      window.navigate('project-init');
    });
  });
}

function renderProjectInitialize(container) {
  const templates = window.mockData.projectTemplates || [];
  const scenario = window.mockData.demoScenario || {};
  if (!window.appState.selectedTemplateId && templates[0]) {
    window.appState.selectedTemplateId = templates[0].id;
  }
  const selectedTemplate = templates.find((template) => template.id === window.appState.selectedTemplateId) || templates[0] || {};

  renderPageHeader(container, {
    kicker: 'Project Initialize',
    title: 'Project Initialize',
    subtitle: `${scenario.name || 'Composite scenario'} uses mock/public/composite language only. The guided setup changes browser-local state only.`,
  });

  const layout = createElement('section', 'project-init-layout');
  const templateGrid = createElement('div', 'template-card-grid');
  templates.forEach((template) => {
    const card = createElement('button', `template-card${template.id === window.appState.selectedTemplateId ? ' selected' : ''}`);
    card.type = 'button';
    card.dataset.templateId = template.id;
    card.innerHTML = `<strong>${template.name}</strong><p>${template.summary}</p>`;
    card.addEventListener('click', () => {
      window.appState.selectedTemplateId = template.id;
      window.renderPage('project-init');
    });
    templateGrid.appendChild(card);
  });

  const guided = createElement('article', 'guided-chat-card');
  guided.innerHTML = `<div class="handoff-preview-head">
      <div>
        <h3>Static mock transcript</h3>
        <p>No AI execution, no backend calls, no persistence; transcript is static mock data selected by template.</p>
      </div>
      ${renderStatusChip('inspect', 'Local only')}
    </div>
    <div class="chat-transcript">
      ${((selectedTemplate.guidedChat || scenario.guidedChat || [])).map((message, index) => `<div class="chat-message ${index % 2 === 0 ? 'chat-message-assistant' : 'chat-message-user'}">
        <span>${index % 2 === 0 ? 'Assistant' : 'Operator'}</span>
        <p>${message}</p>
      </div>`).join('')}
    </div>`;

  const preview = createElement('article', 'selected-context-preview');
  preview.innerHTML = `<div class="handoff-preview-head">
      <div>
        <h3>Selected context preview</h3>
        <p>${selectedTemplate.name || 'Template'} / browser-local template context</p>
      </div>
      ${renderStatusChip('draft', 'Draft')}
    </div>
    ${renderInspectorList([...(selectedTemplate.contextPreview || []), ...(scenario.selectedContextPreview || [])])}
    <button class="action-btn action-primary" type="button" id="open-workbench-from-init">${icon('graph')}Open Workbench</button>`;

  layout.append(templateGrid, guided, preview);
  container.appendChild(layout);

  preview.querySelector('#open-workbench-from-init').addEventListener('click', () => window.navigate('workbench'));
}

function renderHome(container) {
  const project = window.appState.project || {};
  const workspace = window.appState.workspace || {};
  const artifactRef = (window.appState.artifactRefs || [])[0] || {};
  const validationResults = window.appState.validationResults || [];
  const pendingLocks = window.appState.decisions.filter((decision) => decision.status === 'needs-lock');
  const protectedLabels = window.appState.protected.map((item) => item.label);
  const readiness = getReadinessSummary();
  const validationSummaryText = validationResults.length
    ? `${validationResults.filter((result) => normalizeObjectStatus(result.status) !== 'blocked').length}/${validationResults.length} clear`
    : 'Not loaded';
  const validationCardDetail = validationResults.length
    ? `Local checks ${validationSummaryText}; ${readiness.handoffBlockers.length} readiness items remain`
    : 'No validation loaded';

  const projectOverview = createElement('section', 'panel home-command-panel');
  projectOverview.innerHTML = `<div class="handoff-preview-head">
      <div>
        <div class="page-kicker">Project Overview</div>
        <h2 class="page-title">${project.name || 'OpenClaw Cooperative Cockpit'}</h2>
        <p class="page-subtitle">${project.summary || 'Governed cockpit workspace.'}</p>
      </div>
      ${renderStatusChip(project.status || 'draft', `Project object: ${statusLabel(project.status || 'draft')}`)}
    </div>`;
  container.appendChild(projectOverview);
  container.appendChild(renderHomeReadinessBanner(readiness));

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
  statusGrid.appendChild(renderHomeStatusCard({
    iconName: readiness.validationBlocked ? 'warning' : 'check',
    label: 'Validation summary',
    value: readiness.validationBlocked ? 'Waiting' : 'Ready',
    tone: readiness.validationBlocked ? 'warning' : 'validated',
    detail: validationCardDetail,
  }));
  container.appendChild(statusGrid);

  const lowerGrid = createElement('section', 'home-ops-grid is-lean');
  const packets = createElement('article', 'panel home-packet-card');
  const handoffPacket = window.appState.handoffPacket || {};
  const workPacket = window.appState.workPacket || {};
  packets.innerHTML = `<h3>Packet preview</h3>
    <div class="packet-summary-row">
      <span>${icon('document')}Work Packet</span>
      <strong>${workPacket.id || handoffPacket.workPacketId || 'work-packet-primary-workflow'}</strong>
    </div>
    <p>${workPacket.objective || 'Bounded local work only.'}</p>
    <div class="packet-summary-row">
      <span>${icon('handoff')}Handoff Packet</span>
      <strong>${readiness.ready ? 'Ready locally' : `${readiness.handoffBlockers.length} open readiness item${readiness.handoffBlockers.length === 1 ? '' : 's'}`}</strong>
    </div>
    <button class="action-btn" type="button" id="home-preview-link">${icon('eye')}Open Preview readiness</button>`;
  lowerGrid.appendChild(packets);

  const recent = createElement('article', 'panel activity-panel');
  recent.innerHTML = `<h3>Recent object-model state</h3>
    <ol class="activity-feed">
      <li><span>Selected Context seeded</span><strong>${window.appState.context.length} included</strong></li>
      <li><span>Protected surfaces sealed</span><strong>${window.appState.protected.length} excluded</strong></li>
      <li><span>Decision gate checked</span><strong>${window.appState.handoffReady ? 'Ready' : 'Waiting'}</strong></li>
      <li><span>Validation summary</span><strong>${validationSummaryText}</strong></li>
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

  const previewLink = container.querySelector('#home-preview-link');
  if (previewLink) previewLink.addEventListener('click', () => window.navigate('preview'));
}

function getReadinessTargetPage(blocker) {
  if (blocker.startsWith('Spec field')) return 'spec-builder';
  if (blocker.startsWith('Decision')) return 'decisions';
  if (blocker.startsWith('Evidence')) return 'trace';
  if (blocker.startsWith('Validation')) return 'spec-builder';
  if (blocker.startsWith('Review')) return 'review-runs';
  return 'workbench';
}

function renderHomeReadinessBanner(readiness) {
  const banner = createElement('section', `home-readiness-banner ${readiness.ready ? 'is-ready' : 'is-gated'}`);
  const blockers = readiness.handoffBlockers.slice(0, 3);
  banner.innerHTML = `<div>
      <span class="metric-label">Handoff readiness</span>
      <h3>${readiness.ready ? 'Ready locally' : `${readiness.handoffBlockers.length} open readiness item${readiness.handoffBlockers.length === 1 ? '' : 's'}`}</h3>
      <p>${readiness.ready ? 'The local preview is clear. No files are written from the app.' : 'Resolve the top readiness items before the local handoff preview can open.'}</p>
    </div>
    <div class="readiness-chip-row"></div>`;
  const row = banner.querySelector('.readiness-chip-row');
  if (readiness.ready) {
    row.innerHTML = renderStatusChip('ready', 'No open items');
  } else {
    blockers.forEach((blocker) => {
      const chip = createElement('button', 'readiness-link-chip');
      chip.type = 'button';
      chip.textContent = blocker;
      chip.addEventListener('click', () => window.navigate(getReadinessTargetPage(blocker)));
      row.appendChild(chip);
    });
    const overflow = readiness.handoffBlockers.length - blockers.length;
    if (overflow > 0) row.appendChild(createElement('span', 'readiness-more-chip', `+${overflow} more`));
  }
  return banner;
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

function getNodeById(nodeId) {
  return window.mockData.nodes.find((node) => node.id === nodeId) || null;
}

function getSelectedNode() {
  return getNodeById(window.appState.selectedNodeId);
}

function getWorkbenchNodeViewState(node, readiness = getReadinessSummary()) {
  if (!node) {
    return {
      status: 'draft',
      toneStatus: 'draft',
      label: 'Select',
      blockerCount: 0,
      evidenceCount: 0,
    };
  }

  const baseStatus = normalizeObjectStatus(node.readiness || node.status || 'draft');
  const view = {
    status: baseStatus,
    toneStatus: normalizeObjectStatus(node.status || baseStatus),
    label: readinessLabel(baseStatus),
    blockerCount: node.blockerCount || 0,
    evidenceCount: node.evidenceCount || 0,
  };
  const setView = (status, blockerCount, label = readinessLabel(status), toneStatus = status) => ({
    ...view,
    status,
    toneStatus,
    label,
    blockerCount,
  });

  switch (node.id) {
    case 'node-3': {
      const blockerCount = readiness.unresolvedSpecFields.length + (readiness.validationBlocked ? 1 : 0);
      if (!blockerCount) return setView('validated', 0);
      return setView(readiness.unresolvedSpecFields.length ? 'needs-lock' : 'validation-blocked', blockerCount);
    }
    case 'node-4': {
      const blockerCount = readiness.reviewBlockers.length;
      return blockerCount
        ? setView('review-blocked', blockerCount)
        : setView('finding-resolved', 0, statusLabel('finding-resolved'), 'finding-resolved');
    }
    case 'node-5': {
      const blockerCount = readiness.missingEvidence.length + (readiness.evidenceReviewPending ? 1 : 0);
      const previewStatus = getPreviewSyncStatus(readiness);
      return setView(previewStatus.status, blockerCount, previewStatus.label, previewStatus.status);
    }
    case 'node-6': {
      const blockerCount = readiness.pendingDecisions.length;
      return blockerCount
        ? setView('decision-needs-lock', blockerCount, statusLabel('decision-needs-lock'), 'needs-lock')
        : setView('decision-locked', 0, statusLabel('decision-locked'), 'validated');
    }
    case 'node-7': {
      const blockerCount = readiness.missingEvidence.length + (readiness.evidenceReviewPending ? 1 : 0);
      if (!blockerCount) return setView('validated', 0);
      return setView(readiness.missingEvidence.length ? 'needs-evidence' : 'needs-sync', blockerCount, undefined, 'needs-sync');
    }
    case 'node-8': {
      const blockerCount = readiness.handoffBlockers.length;
      return readiness.ready
        ? setView('ready', 0, statusLabel('ready'), 'ready')
        : setView('handoff-blocked', blockerCount, statusLabel('handoff-blocked'), 'blocked');
    }
    default:
      return view;
  }
}

function getNodeAncestors(nodeId) {
  const ancestors = [];
  let current = getNodeById(nodeId);
  while (current && current.parentId) {
    const parent = getNodeById(current.parentId);
    if (!parent) break;
    ancestors.push(parent);
    current = parent;
  }
  return ancestors;
}

function getNodeDescendants(nodeId) {
  const descendants = [];
  const visit = (parentId) => {
    getChildNodes(parentId).forEach((child) => {
      descendants.push(child);
      visit(child.id);
    });
  };
  visit(nodeId);
  return descendants;
}

function getSelectedRelationshipSets() {
  const selectedId = window.appState.selectedNodeId;
  const ancestors = new Set(getNodeAncestors(selectedId).map((node) => node.id));
  const descendants = new Set(getNodeDescendants(selectedId).map((node) => node.id));
  const inbound = new Set();
  const outbound = new Set();
  [...(window.mockData.workflowEdges || []), ...(window.mockData.hierarchicalEdges || [])].forEach((edge) => {
    if (edge.target === selectedId) inbound.add(edge.source);
    if (edge.source === selectedId) outbound.add(edge.target);
  });
  return { selectedId, ancestors, descendants, inbound, outbound };
}

function getNodeRelationshipClasses(node) {
  const relationships = getSelectedRelationshipSets();
  const classes = [];
  if (relationships.selectedId === node.id) classes.push('selected');
  if (relationships.ancestors.has(node.id)) classes.push('trail-parent');
  if (relationships.descendants.has(node.id)) classes.push('trail-child');
  if (relationships.inbound.has(node.id)) classes.push('trail-inbound');
  if (relationships.outbound.has(node.id)) classes.push('trail-outbound');
  if (nodeMatchesFocusLens(node, relationships)) classes.push('lens-match');
  return classes;
}

function nodeHasEvidenceGap(node) {
  const view = getWorkbenchNodeViewState(node);
  return (view.evidenceCount || 0) < 2 || normalizeObjectStatus(view.status).includes('evidence');
}

function nodeHasDecisionGap(node) {
  const view = getWorkbenchNodeViewState(node);
  const text = `${node.id} ${node.type || ''} ${node.typeLabel || ''} ${node.label || ''} ${node.title || ''} ${(node.guardrails || []).join(' ')}`.toLowerCase();
  return text.includes('decision') || text.includes('lock') || normalizeObjectStatus(view.status).includes('lock');
}

function nodeMatchesFocusLens(node, relationships = getSelectedRelationshipSets()) {
  const view = getWorkbenchNodeViewState(node);
  const readiness = normalizeObjectStatus(view.status);
  switch (window.appState.focusLens) {
    case 'missing-evidence':
      return nodeHasEvidenceGap(node);
    case 'unlocked-decisions':
      return nodeHasDecisionGap(node);
    case 'selected-trail':
      return node.id === relationships.selectedId
        || relationships.ancestors.has(node.id)
        || relationships.descendants.has(node.id)
        || relationships.inbound.has(node.id)
        || relationships.outbound.has(node.id);
    case 'handoff-blockers':
      return view.blockerCount > 0 || ['blocked', 'needs-lock', 'needs-evidence', 'review-blocked'].includes(readiness);
    case 'open-work':
    default:
      return view.blockerCount > 0 || !['ready', 'validated', 'applied'].includes(readiness);
  }
}

function applyWorkbenchSelectionClasses() {
  document.querySelectorAll('[data-node-id]').forEach((element) => {
    const node = getNodeById(element.dataset.nodeId);
    if (!node) return;
    element.classList.remove('selected', 'trail-parent', 'trail-child', 'trail-inbound', 'trail-outbound', 'lens-match');
    const classes = getNodeRelationshipClasses(node);
    if (classes.length) element.classList.add(...classes);
  });
  document.querySelectorAll('[data-outline-node-id]').forEach((element) => {
    const node = getNodeById(element.dataset.outlineNodeId);
    if (!node) return;
    element.classList.remove('selected', 'trail-parent', 'trail-child', 'trail-inbound', 'trail-outbound', 'lens-match');
    const classes = getNodeRelationshipClasses(node);
    if (classes.length) element.classList.add(...classes);
  });
}

function getFocusLensOptionsHTML() {
  const definitions = window.mockData.focusLensDefinitions || [];
  return definitions.map((lens) => `<option value="${lens.id}" ${window.appState.focusLens === lens.id ? 'selected' : ''}>${lens.label}</option>`).join('');
}

function bindFocusLensSelect(container) {
  const lensSelect = container.querySelector('#focus-lens-select');
  if (!lensSelect) return;
  lensSelect.addEventListener('change', () => {
    window.appState.focusLens = lensSelect.value;
    applyWorkbenchSelectionClasses();
    refreshObjectOutline();
    refreshObjectEditorPanel();
  });
}

function renderWorkbenchMacroLayers() {
  const readiness = getReadinessSummary();
  const layers = [
    {
      id: 'context',
      title: 'Context',
      detail: `${window.appState.context.length} included, ${window.appState.protected.length} protected`,
      status: 'selected',
    },
    {
      id: 'specgraph',
      title: 'SpecGraph',
      detail: `${getActiveSpecFields().length} active fields in the current template`,
      status: readiness.unresolvedSpecFields.length ? 'blocked' : 'ready',
    },
    {
      id: 'handoff-gates',
      title: 'Handoff Gates',
      detail: readiness.ready ? 'Preview clear locally' : `${readiness.handoffBlockers.length} readiness items`,
      status: readiness.ready ? 'ready' : 'blocked',
    },
  ];
  const section = createElement('section', 'workbench-macro-layers');
  section.setAttribute('aria-label', 'Workbench macro layers');
  section.innerHTML = layers.map((layer) => `<article class="workbench-macro-layer" data-macro-layer="${layer.id}">
      <div><span>${layer.title}</span><strong>${layer.detail}</strong></div>
      ${renderStatusChip(layer.status, statusLabel(layer.status))}
    </article>`).join('');
  return section;
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
  const editorLayout = createElement('div', 'workbench-editor-layout');
  const workbenchMain = createElement('div', 'workbench-main');
  workbenchMain.appendChild(renderWorkbenchMacroLayers());
  workbenchMain.appendChild(renderObjectOutline(selectedNode));
  workbenchMain.appendChild(renderNodeCanvas());
  const workbenchDock = createElement('div', 'workbench-dock');
  workbenchDock.appendChild(renderReadinessQueue());
  workbenchDock.appendChild(renderUtilityTray(selectedNode));
  workbenchMain.appendChild(workbenchDock);
  editorLayout.appendChild(workbenchMain);
  editorLayout.appendChild(renderObjectEditorPanel(selectedNode));
  layout.appendChild(editorLayout);
  container.appendChild(layout);
  renderInspectorEmpty('workbench');
  applyWorkbenchSelectionClasses();
}

function getOutlineRootGroups() {
  return [
    {
      id: 'project',
      label: 'Project',
      children: [
        {
          id: 'requirements',
          label: 'Requirements',
          children: getRequirementNodes().map((node) => buildOutlineNode(node)),
        },
      ],
    },
  ];
}

function buildOutlineNode(node) {
  return {
    id: node.id,
    label: node.title || node.label,
    node,
    children: getChildNodes(node.id).map((child) => buildOutlineNode(child)),
  };
}

function isOutlineExpanded(id) {
  return (window.appState.outlineExpandedIds || []).includes(id);
}

function toggleOutlineExpanded(id) {
  const expanded = new Set(window.appState.outlineExpandedIds || []);
  if (expanded.has(id)) expanded.delete(id);
  else expanded.add(id);
  window.appState.outlineExpandedIds = [...expanded];
  refreshObjectOutline();
}

function renderObjectOutline(selectedNode) {
  const outline = createElement('aside', 'object-outline');
  const view = getWorkbenchNodeViewState(selectedNode);
  outline.setAttribute('aria-label', 'Object Outline hierarchy explorer');
  outline.innerHTML = `<div class="pane-header">
      <div>
        <span class="page-kicker">Object Outline</span>
        <h3>Hierarchy explorer</h3>
      </div>
      ${renderStatusChip(view.status, selectedNode ? view.label : 'Select')}
    </div>
    <p class="pane-help">Project -> Requirements -> Architecture -> Component -> Phase -> Task</p>`;

  const tree = createElement('div', 'object-outline-tree');
  getOutlineRootGroups().forEach((group) => tree.appendChild(renderOutlineGroup(group, 0)));
  outline.appendChild(tree);
  return outline;
}

function renderOutlineGroup(group, depth) {
  const wrapper = createElement('div', `outline-group outline-depth-${depth}`);
  const hasChildren = group.children && group.children.length;
  const expanded = isOutlineExpanded(group.id);
  const row = createElement('div', `outline-row${group.node ? ' outline-node-row' : ' outline-group-row'}`);
  row.style.setProperty('--outline-depth', depth);
  row.dataset.outlineGroupId = group.id;
  if (group.node) {
    row.dataset.outlineNodeId = group.node.id;
    const relationshipClasses = getNodeRelationshipClasses(group.node);
    if (relationshipClasses.length) row.classList.add(...relationshipClasses);
  }

  const toggle = createElement('button', 'outline-toggle');
  toggle.type = 'button';
  toggle.setAttribute('aria-label', `${expanded ? 'Collapse' : 'Expand'} ${group.label}`);
  toggle.innerHTML = hasChildren ? (expanded ? icon('minus') : icon('add')) : '';
  toggle.disabled = !hasChildren;
  toggle.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleOutlineExpanded(group.id);
  });

  const select = createElement('button', 'outline-select');
  select.type = 'button';
  select.innerHTML = `<span>${group.node ? renderSpatialNodeLevelLabel(group.node) : group.label}</span><strong>${group.label}</strong>`;
  select.addEventListener('click', () => {
    if (group.node) selectNode(group.node.id);
    else if (hasChildren) toggleOutlineExpanded(group.id);
  });

  row.append(toggle, select);
  wrapper.appendChild(row);

  if (hasChildren && expanded) {
    const children = createElement('div', 'outline-children');
    group.children.forEach((child) => children.appendChild(renderOutlineGroup(child, depth + 1)));
    wrapper.appendChild(children);
  }
  return wrapper;
}

function getFocusedOutlineControl() {
  const active = document.activeElement;
  if (!active || !active.closest || !active.closest('.object-outline')) return null;
  const row = active.closest('[data-outline-group-id]');
  if (!row) return null;
  return {
    groupId: row.dataset.outlineGroupId,
    nodeId: row.dataset.outlineNodeId || null,
    control: active.classList.contains('outline-toggle') ? 'toggle' : active.classList.contains('outline-select') ? 'select' : null,
  };
}

function restoreOutlineFocus(focused) {
  if (!focused || !focused.control) return;
  const rowSelector = focused.nodeId
    ? `[data-outline-node-id="${focused.nodeId}"]`
    : `[data-outline-group-id="${focused.groupId}"]`;
  const controlSelector = focused.control === 'toggle' ? '.outline-toggle' : '.outline-select';
  const target = document.querySelector(`.object-outline ${rowSelector} ${controlSelector}`);
  if (target && typeof target.focus === 'function') target.focus({ preventScroll: true });
}

function refreshObjectOutline() {
  const outline = document.querySelector('.object-outline');
  if (!outline) return;
  const focused = getFocusedOutlineControl();
  outline.replaceWith(renderObjectOutline(getSelectedNode()));
  applyWorkbenchSelectionClasses();
  restoreOutlineFocus(focused);
}

function renderReadinessQueue() {
  const readiness = getReadinessSummary();
  const queue = createElement('section', 'workbench-readiness-queue');
  queue.setAttribute('aria-label', 'Readiness queue');
  queue.innerHTML = `<div class="pane-header">
      <div>
        <span class="page-kicker">Readiness queue</span>
        <h3>${readiness.handoffBlockers.length} local blockers</h3>
      </div>
      ${renderStatusChip(readiness.ready ? 'ready' : 'blocked', readiness.ready ? 'Clear' : 'Gated')}
    </div>
    <div class="readiness-queue-grid">
      ${renderReadinessQueueGroup('Missing evidence', readiness.missingEvidence.map((item) => item.label || item.name || item.id))}
      ${renderReadinessQueueGroup('Unlocked decisions', readiness.pendingDecisions.map((decision) => decision.id))}
      ${renderReadinessQueueGroup('Review blockers', readiness.reviewBlockers.map((review) => review.name))}
      ${renderReadinessQueueGroup('Validation blockers', readiness.validationBlocked ? ['Spec validation missing locally'] : [])}
      ${renderReadinessQueueGroup('Handoff blockers', readiness.handoffBlockers)}
    </div>`;
  return queue;
}

function renderReadinessQueueGroup(label, items) {
  const safeItems = items && items.length ? items.slice(0, 3) : ['Clear'];
  return `<article class="readiness-queue-group${items && items.length ? ' is-blocked' : ' is-clear'}">
      <h4>${label}</h4>
      ${renderInspectorList(safeItems)}
    </article>`;
}

function renderObjectEditorPanel(selectedNode) {
  const node = selectedNode || getSelectedNode();
  const panel = createElement('aside', 'object-editor-panel');
  panel.setAttribute('aria-label', 'Object editor panel');
  panel.tabIndex = -1;
  const view = getWorkbenchNodeViewState(node);
  const activeTab = RIGHT_PANEL_TABS.some((tab) => tab.id === window.appState.rightPanelTab)
    ? window.appState.rightPanelTab
    : 'inspector';
  window.appState.rightPanelTab = activeTab;

  panel.innerHTML = `<div class="pane-header">
      <div>
        <span class="page-kicker">Object editor</span>
        <h3>${node ? node.title || node.label : 'No object selected'}</h3>
      </div>
      ${renderStatusChip(view.status, node ? view.label : 'Select')}
    </div>
    <div class="object-editor-tabs" role="tablist" aria-label="Object editor tabs">
      ${RIGHT_PANEL_TABS.map((tab) => `<button class="object-editor-tab${activeTab === tab.id ? ' active' : ''}" type="button" role="tab" aria-selected="${activeTab === tab.id}" data-right-panel-tab="${tab.id}">${tab.label}</button>`).join('')}
    </div>
    <div class="object-editor-body">
      ${renderObjectEditorTabContent(node, activeTab)}
    </div>`;

  panel.querySelectorAll('[data-right-panel-tab]').forEach((tab) => {
    tab.addEventListener('click', () => {
      window.appState.rightPanelTab = tab.dataset.rightPanelTab;
      refreshObjectEditorPanel();
    });
  });

  bindObjectEditorActions(panel, node);
  return panel;
}

function refreshObjectEditorPanel() {
  const panel = document.querySelector('.object-editor-panel');
  if (!panel) return;
  panel.replaceWith(renderObjectEditorPanel(getSelectedNode()));
}

function renderObjectEditorTabContent(node, activeTab) {
  if (!node) {
    return `<div class="inspector-empty"><h4>Select an object</h4><p>Use the outline or board to scope the local object editor.</p></div>`;
  }
  const readiness = getReadinessSummary();
  const view = getWorkbenchNodeViewState(node, readiness);
  const inboundEdges = (window.mockData.workflowEdges || []).filter((edge) => edge.target === node.id);
  const outboundEdges = (window.mockData.workflowEdges || []).filter((edge) => edge.source === node.id);
  switch (activeTab) {
    case 'edit-fields':
      return `<div class="inspector-section">
          <h4>Edit Fields</h4>
          <div class="inspector-grid">
            <div class="inspector-row"><span>Title</span><strong>${node.title || node.label}</strong></div>
            <div class="inspector-row"><span>Config</span><strong>${node.config || 'Configured locally'}</strong></div>
            <div class="inspector-row"><span>Mode</span><strong>${node.model || 'Local only'}</strong></div>
            <div class="inspector-row"><span>Readiness</span><strong>${view.label}</strong></div>
          </div>
          <div class="static-notice">Field edits are represented as local draft state only. No files, APIs, storage, or external systems are touched.</div>
        </div>`;
    case 'copilot':
      return renderMockCopilotPanel(node, readiness);
    case 'evidence':
      return `<div class="inspector-section">
          <h4>Evidence</h4>
          ${renderInspectorList(node.evidence || node.trace || ['No evidence configured for this object'])}
        </div>
        <div class="inspector-section">
          <h4>Evidence gaps</h4>
          ${renderInspectorList(readiness.missingEvidence.map((item) => item.label || item.name || item.id))}
        </div>`;
    case 'trace':
      return `<div class="inspector-section">
          <h4>Trace</h4>
          ${renderInspectorList(node.trace || ['No trace links configured'])}
        </div>
        <div class="inspector-section">
          <h4>Selected object links</h4>
          ${renderInspectorList([
            ...inboundEdges.map((edge) => `Inbound from ${edge.source}`),
            ...outboundEdges.map((edge) => `Outbound to ${edge.target}`),
            ...getNodeAncestors(node.id).map((parent) => `Parent trail: ${parent.title || parent.label}`),
            ...getNodeDescendants(node.id).map((child) => `Descendant: ${child.title || child.label}`),
          ])}
        </div>`;
    case 'inspector':
    default:
      return `<div class="inspector-section">
          <h4>Inspector</h4>
          <div class="inspector-grid">
            <div class="inspector-row"><span>Purpose</span><strong>${node.description}</strong></div>
            <div class="inspector-row"><span>Layer</span><strong>${renderSpatialNodeLevelLabel(node)}</strong></div>
            <div class="inspector-row"><span>Open blockers</span><strong>${view.blockerCount || 0}</strong></div>
            <div class="inspector-row"><span>Linked evidence</span><strong>${view.evidenceCount || 0}</strong></div>
          </div>
        </div>
        <div class="inspector-section">
          <h4>Requirements</h4>
          ${renderInspectorList(node.requirements || ['No requirements recorded'])}
        </div>`;
  }
}

function renderMockCopilotPanel(node, readiness) {
  const view = getWorkbenchNodeViewState(node, readiness);
  const suggestions = [
    `${node.title || node.label}: tighten objective, allowed scope, and evidence link before handoff.`,
    view.blockerCount > 0 ? `Resolve ${view.blockerCount} object-level blocker(s) or mark them deferred.` : 'No object blockers; keep evidence and decision trace current.',
    readiness.pendingDecisions.length ? `Decision ${readiness.pendingDecisions[0].id} needs Point lock before handoff readiness clears.` : 'Decision locks are clear in local state.',
  ];
  return `<div class="inspector-section mock-copilot-panel">
      <div class="handoff-preview-head">
        <div>
          <h4>Mock local copilot</h4>
          <p>No AI calls. No backend. No files written.</p>
        </div>
        ${renderStatusChip('inspect', 'Static')}
      </div>
      <div class="assistant-context-line">
        <span>Selected object</span>
        <strong>${node.title || node.label}</strong>
      </div>
      <div class="assistant-context-line">
        <span>Open blockers</span>
        <strong>${view.blockerCount || 0} object / ${readiness.handoffBlockers.length} handoff</strong>
      </div>
      <h4>Suggested next edits</h4>
      ${renderInspectorList(suggestions)}
      <h4>Evidence / decision suggestions</h4>
      ${renderInspectorList([
        'Attach public/composite evidence before treating review findings as ready.',
        'Keep Point-lock decisions explicit and visible.',
        'Preview handoff only after validation, evidence, review, and decision blockers clear.',
      ])}
      <div class="button-row">
        <button class="action-btn" type="button" id="preview-copilot-suggestion">${icon('eye')}Preview suggestion</button>
        <button class="action-btn" type="button" id="apply-copilot-draft">${icon('check')}Apply to local draft</button>
        <button class="action-btn" type="button" id="mark-point-lock">${icon('lock')}Mark needs Point lock</button>
      </div>
    </div>`;
}

function bindObjectEditorActions(panel, node) {
  const preview = panel.querySelector('#preview-copilot-suggestion');
  if (preview) {
    preview.addEventListener('click', () => {
      window.appState.lastLocalValidation = `Previewed mock local copilot suggestion for ${node.title || node.label}.`;
      showToast('Mock suggestion previewed locally. No AI/API call occurred.', 'info');
    });
  }

  const applyDraft = panel.querySelector('#apply-copilot-draft');
  if (applyDraft) {
    applyDraft.addEventListener('click', () => {
      window.appState.copilotDraftApplied = true;
      window.appState.lastLocalValidation = `Mock local copilot draft applied to browser state for ${node.title || node.label}.`;
      showToast('Applied to local draft state only.', 'success');
    });
  }

  const pointLock = panel.querySelector('#mark-point-lock');
  if (pointLock) {
    pointLock.addEventListener('click', () => {
      window.appState.copilotPointLockMarked = true;
      window.appState.lastLocalValidation = `Point-lock marker set locally for ${node.title || node.label}.`;
      showToast('Point-lock marker set in local state only.', 'warning');
    });
  }
}

function renderNodePalette({ embedded = false } = {}) {
  const palette = createElement('section', `${embedded ? '' : 'panel '}node-palette`);
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

function renderContextBasket({ embedded = false } = {}) {
  const basket = createElement('aside', `context-basket${embedded ? ' context-basket-embedded' : ''}`);
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
  if (window.appState.viewMode === 'spatial') {
    return getSpatialWorkbenchNodes();
  }
  if (window.appState.viewMode === 'flat') {
    return [...window.mockData.nodes]
      .filter((n) => n.level === 'task')
      .sort((a, b) => Number(a.index || 0) - Number(b.index || 0));
  }
  if (window.appState.viewMode === 'mixed') {
    return getRequirementNodes().flatMap((node) => {
      if (node.id !== window.appState.expandedNodeId) return [node];
      return [node, ...getChildNodes(node.id)];
    });
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

function getSpatialWorkbenchNodes() {
  return [...window.mockData.nodes]
    .sort((a, b) => Number(a.index || 0) - Number(b.index || 0));
}

function getWorkbenchBoard() {
  return window.mockData.workbenchBoard || { width: 2600, height: 1400, zones: [], nodePositions: {} };
}

function getBoardNodePosition(nodeId) {
  const board = getWorkbenchBoard();
  return board.nodePositions[nodeId] || { x: board.width / 2, y: board.height / 2 };
}

function getRequirementNodes() {
  return [...window.mockData.nodes]
    .filter((n) => n.level === 'requirements')
    .sort((a, b) => Number(a.index || 0) - Number(b.index || 0));
}

function getChildNodes(parentId) {
  return [...window.mockData.nodes]
    .filter((n) => n.parentId === parentId)
    .sort((a, b) => Number(a.index || 0) - Number(b.index || 0));
}

function buildNodeTooltip(node) {
  const view = getWorkbenchNodeViewState(node);
  return [
    `${node.index}. ${node.title || node.label}`,
    node.subtitle || node.description,
    `Readiness: ${view.label}`,
    `Open items: ${view.blockerCount || 0}`,
    `Evidence: ${view.evidenceCount || 0}`,
    node.config ? `Config: ${node.config}` : null,
    node.model ? `Mode: ${node.model}` : null,
    node.handoff && node.handoff.length ? `Handoff: ${node.handoff.join('; ')}` : null,
  ].filter(Boolean).join('\n');
}

function workflowLineDefs() {
  return `<defs><marker id="edge-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 1 L 10 5 L 0 9 z" fill="rgba(100,116,139,.6)"></path></marker></defs>`;
}

function getActiveWorkbenchEdges() {
  if (window.appState.viewMode === 'spatial') {
    return getSpatialWorkbenchEdges();
  }

  if (window.appState.viewMode === 'flat') {
    return window.mockData.workflowEdges;
  }

  if (window.appState.viewMode === 'mixed') {
    const visibleNodeIds = new Set(getOrderedWorkbenchNodes().map((node) => node.id));
    return window.mockData.hierarchicalEdges.filter((edge) => (
      visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target)
    ));
  }

  return window.mockData.hierarchicalEdges.filter((edge) => {
    const src = window.mockData.nodes.find((n) => n.id === edge.source);
    const tgt = window.mockData.nodes.find((n) => n.id === edge.target);
    return src && tgt && src.parentId === window.appState.currentParentId;
  });
}

function getSpatialWorkbenchEdges() {
  const hierarchyEdges = window.mockData.nodes
    .filter((node) => node.parentId)
    .map((node) => ({
      source: node.parentId,
      target: node.id,
      tone: getWorkbenchNodeViewState(node).status === 'ready' ? 'validated' : getWorkbenchNodeViewState(node).status === 'blocked' ? 'risk' : 'pending',
      layout: 'hierarchy',
    }));
  const workflowEdges = window.mockData.workflowEdges.map((edge) => ({ ...edge, layout: 'workflow' }));
  return [...hierarchyEdges, ...workflowEdges];
}

function getSpatialNodeCardSize(nodeId) {
  const node = getNodeById(nodeId);
  const widthByLevel = {
    requirements: 250,
    architecture: 230,
    phase: 190,
    task: 190,
  };
  return {
    width: widthByLevel[node && node.level] || 206,
    height: 112,
  };
}

function updateWorkflowLines(canvas) {
  if (!canvas || !canvas.isConnected) return;
  if (window.appState.viewMode === 'spatial') {
    updateSpatialWorkflowLines(canvas);
    return;
  }
  const svg = canvas.querySelector('.workflow-lines');
  if (!svg) return;
  const canvasRect = canvas.getBoundingClientRect();
  svg.setAttribute('viewBox', `0 0 ${Math.max(1, canvasRect.width)} ${Math.max(1, canvasRect.height)}`);
  svg.innerHTML = workflowLineDefs();

  getActiveWorkbenchEdges().forEach((edge) => {
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
  if (window.appState.viewMode === 'spatial') {
    return `<div class="canvas-breadcrumbs canvas-breadcrumbs-spatial"><span class="breadcrumb-item active">Spatial Board</span><span class="breadcrumb-separator">/</span><span class="breadcrumb-item active">Whole architecture</span></div>`;
  }
  if (window.appState.viewMode === 'flat') {
    return `<div class="canvas-breadcrumbs"><span class="breadcrumb-item active">Flat Workflow view</span></div>`;
  }
  if (window.appState.viewMode === 'mixed') {
    const expandedNode = window.mockData.nodes.find((node) => node.id === window.appState.expandedNodeId);
    return `<div class="canvas-breadcrumbs"><span class="breadcrumb-item active">Mixed Map</span>${expandedNode ? ` <span class="breadcrumb-separator">➔</span> <span class="breadcrumb-item active">${expandedNode.title || expandedNode.label}</span>` : ''}</div>`;
  }
  return `<div class="canvas-breadcrumbs"><span class="breadcrumb-item active">Workbench Map</span></div>`;
}

function drillDownToNode(node) {
  if (window.appState.viewMode === 'spatial') {
    selectNode(node.id);
    return;
  }
  if (window.appState.viewMode === 'mixed') {
    toggleExpandNode(node);
    return;
  }
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

function toggleExpandNode(node) {
  if (window.appState.viewMode !== 'mixed') return;
  window.appState.expandedNodeId = window.appState.expandedNodeId === node.id ? null : node.id;
  window.appState.currentParentId = null;
  window.appState.currentLevel = 'requirements';
  window.appState.selectedNodeId = node.id;
  window.renderPage('workbench');
}

function hasWorkbenchChildren(node) {
  return window.mockData.nodes.some((n) => n.parentId === node.id);
}

function createWorkbenchNodeCard(node, options = {}) {
  const { showExplore = false, expanded = false } = options;
  const view = getWorkbenchNodeViewState(node);
  const card = createElement('button', `node-card node-type-${node.type} status-tone-${statusTone(view.toneStatus || view.status)}`);
  const canExplore = showExplore && hasWorkbenchChildren(node);
  const exploreActionHTML = canExplore
    ? `<span class="node-drill-down-action" title="Double click card or click here to ${expanded ? 'collapse children' : 'explore children'}">${icon('arrow')} ${expanded ? 'Collapse' : 'Explore'}</span>`
    : '';

  card.type = 'button';
  card.dataset.nodeId = node.id;
  card.setAttribute('aria-label', `Select ${node.index} ${node.familyLabel || node.typeLabel || node.type} ${node.title || node.label}. Readiness: ${view.label}`);
  card.title = buildNodeTooltip(node);
  const relationshipClasses = getNodeRelationshipClasses(node);
  if (relationshipClasses.length) card.classList.add(...relationshipClasses);

  card.dataset.level = node.level || 'object';

  if (window.appState.viewMode === 'spatial') {
    const position = getBoardNodePosition(node.id);
    card.style.left = `${position.x}px`;
    card.style.top = `${position.y}px`;
  } else if (window.appState.viewMode !== 'flat' && window.appState.viewMode !== 'mixed') {
    card.style.left = `${node.x}%`;
    card.style.top = `${node.y}%`;
  }

  card.innerHTML = `<span class="node-handle node-handle-input" aria-hidden="true"></span>
    <span class="node-handle node-handle-output" aria-hidden="true"></span>
    <div class="node-topline">
      <span class="node-type-icon">${icon(NODE_ICON_BY_TYPE[node.type] || 'spark')}</span>
      <div class="node-label">${node.title || node.label}</div>
    </div>
    <div class="node-readiness-row">
      ${renderStatusChip(view.status, view.label)}
      <span class="node-metric node-metric-blocker" title="Open readiness item count">${view.blockerCount || 0} open</span>
      <span class="node-metric node-metric-evidence" title="Linked evidence count">${view.evidenceCount || 0} ev</span>
    </div>
    ${exploreActionHTML}`;

  card.addEventListener('click', (event) => {
    event.stopPropagation();
    selectNode(node.id);
  });

  if (canExplore) {
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

  return card;
}

function renderMixedMapNodes(flow) {
  getRequirementNodes().forEach((node) => {
    const isExpanded = window.appState.expandedNodeId === node.id;
    if (!isExpanded) {
      flow.appendChild(createWorkbenchNodeCard(node, { showExplore: true }));
      return;
    }

    const group = createElement('section', 'compound-group');
    group.dataset.compoundGroupId = node.id;
    group.innerHTML = `<div class="compound-group-header">
        <div>
          <span class="compound-eyebrow">${node.index} / Expanded requirement</span>
          <strong>${node.title || node.label}</strong>
        </div>
        <button class="compound-collapse-action" type="button">${icon('close')}Collapse</button>
      </div>`;

    const body = createElement('div', 'compound-group-body');
    const rootCard = createWorkbenchNodeCard(node, { showExplore: true, expanded: true });
    rootCard.classList.add('compound-root-card');
    body.appendChild(rootCard);
    getChildNodes(node.id).forEach((child) => {
      body.appendChild(createWorkbenchNodeCard(child));
    });
    group.appendChild(body);

    const collapse = group.querySelector('.compound-collapse-action');
    collapse.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleExpandNode(node);
    });

    flow.appendChild(group);
  });
}

function updateSpatialWorkflowLines(canvas) {
  const svg = canvas.querySelector('.canvas-world .workflow-lines');
  if (!svg) return;
  const board = getWorkbenchBoard();
  svg.setAttribute('viewBox', `0 0 ${board.width} ${board.height}`);
  svg.innerHTML = workflowLineDefs();

  getSpatialWorkbenchEdges().forEach((edge) => {
    const source = getBoardNodePosition(edge.source);
    const target = getBoardNodePosition(edge.target);
    if (!source || !target) return;
    const sourceSize = getSpatialNodeCardSize(edge.source);
    const targetSize = getSpatialNodeCardSize(edge.target);
    const verticalHierarchy = edge.layout === 'hierarchy' && Math.abs(target.y - source.y) > Math.abs(target.x - source.x);
    const x1 = verticalHierarchy ? source.x : source.x + sourceSize.width / 2;
    const y1 = verticalHierarchy
      ? source.y + (target.y >= source.y ? sourceSize.height / 2 : -sourceSize.height / 2)
      : source.y;
    const x2 = verticalHierarchy ? target.x : target.x - targetSize.width / 2;
    const y2 = verticalHierarchy
      ? target.y + (target.y >= source.y ? -targetSize.height / 2 : targetSize.height / 2)
      : target.y;
    const curve = verticalHierarchy
      ? `C ${x1} ${y1 + (y2 - y1) * 0.42}, ${x2} ${y2 - (y2 - y1) * 0.42}, ${x2} ${y2}`
      : `C ${x1 + Math.max(Math.abs(x2 - x1) * 0.42, 70)} ${y1}, ${x2 - Math.max(Math.abs(x2 - x1) * 0.42, 70)} ${y2}, ${x2} ${y2}`;
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M ${x1} ${y1} ${curve}`);
    path.setAttribute('class', `edge-${edge.tone || 'neutral'}`);
    path.dataset.edgeSource = edge.source;
    path.dataset.edgeTarget = edge.target;
    path.dataset.edgeLayout = edge.layout || 'workflow';
    path.setAttribute('marker-end', 'url(#edge-arrow)');
    svg.appendChild(path);
  });
}

function renderOrderedWorkbenchNodes(flow) {
  getOrderedWorkbenchNodes().forEach((node) => {
    flow.appendChild(createWorkbenchNodeCard(node, {
      showExplore: window.appState.viewMode !== 'flat',
    }));
  });
}

function refreshWorkbenchPopover(canvas = document.querySelector('.node-canvas')) {
  if (!canvas) return;
  canvas.querySelector('.workbench-popover')?.remove();

  const paletteToggle = canvas.querySelector('#toggle-workbench-palette');
  const contextToggle = canvas.querySelector('#toggle-workbench-context');
  const activePopover = window.appState.activeWorkbenchPopover;

  if (paletteToggle) {
    paletteToggle.classList.toggle('active', activePopover === 'palette');
    paletteToggle.setAttribute('aria-expanded', String(activePopover === 'palette'));
  }
  if (contextToggle) {
    contextToggle.classList.toggle('active', activePopover === 'context');
    contextToggle.setAttribute('aria-expanded', String(activePopover === 'context'));
  }

  if (activePopover) {
    canvas.appendChild(renderWorkbenchPopover(activePopover));
  }
}

function closeWorkbenchPopover(canvas = document.querySelector('.node-canvas')) {
  if (!window.appState.activeWorkbenchPopover) return;
  window.appState.activeWorkbenchPopover = null;
  refreshWorkbenchPopover(canvas);
}

function toggleWorkbenchPopover(popoverId, canvas = document.querySelector('.node-canvas')) {
  window.appState.activeWorkbenchPopover = window.appState.activeWorkbenchPopover === popoverId ? null : popoverId;
  refreshWorkbenchPopover(canvas);
}

function renderWorkbenchPopover(popoverId) {
  const title = popoverId === 'palette' ? 'Object types' : 'Selected Context';
  const popover = createElement('div', `workbench-popover workbench-popover-${popoverId}`);
  popover.setAttribute('role', 'dialog');
  popover.setAttribute('aria-label', title);
  popover.innerHTML = `<div class="workbench-popover-header">
      <strong>${title}</strong>
      <button class="icon-btn" type="button" id="close-workbench-popover" aria-label="Close ${title} popover">${icon('close')}</button>
    </div>`;
  const content = popoverId === 'palette'
    ? renderNodePalette({ embedded: true })
    : renderContextBasket({ embedded: true });
  popover.appendChild(content);
  popover.addEventListener('click', (event) => event.stopPropagation());
  popover.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeWorkbenchPopover();
    }
  });
  popover.querySelector('#close-workbench-popover').addEventListener('click', () => {
    closeWorkbenchPopover();
  });
  return popover;
}

function clampCanvasScale(scale) {
  return Math.min(1.35, Math.max(0.32, Number(scale.toFixed(2))));
}

function setCanvasViewport(nextViewport) {
  window.appState.canvasViewport = {
    scale: clampCanvasScale(nextViewport.scale),
    x: Math.round(nextViewport.x),
    y: Math.round(nextViewport.y),
  };
  applyCanvasViewport();
}

function applyCanvasViewport() {
  const viewport = window.appState.canvasViewport || { scale: 0.58, x: 70, y: 38 };
  const world = document.querySelector('.canvas-world');
  const zoomLabel = document.getElementById('workbench-zoom-level');
  if (world) {
    world.style.transform = `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.scale})`;
  }
  if (zoomLabel) {
    zoomLabel.textContent = `${Math.round(viewport.scale * 100)}%`;
  }
}

function resetWorkbenchViewport() {
  setCanvasViewport({ scale: 0.58, x: 70, y: 38 });
}

function fitWorkbenchBoard(canvas) {
  const viewport = canvas.querySelector('.canvas-viewport');
  if (!viewport) return;
  const rect = viewport.getBoundingClientRect();
  const board = getWorkbenchBoard();
  const scale = clampCanvasScale(Math.min((rect.width - 72) / board.width, (rect.height - 72) / board.height));
  setCanvasViewport({
    scale,
    x: (rect.width - board.width * scale) / 2,
    y: (rect.height - board.height * scale) / 2,
  });
}

function zoomWorkbenchCanvas(canvas, direction, anchor) {
  const viewport = window.appState.canvasViewport || { scale: 0.58, x: 70, y: 38 };
  const nextScale = clampCanvasScale(viewport.scale + direction * 0.08);
  const viewportEl = canvas.querySelector('.canvas-viewport');
  const rect = viewportEl ? viewportEl.getBoundingClientRect() : null;
  const anchorX = anchor && rect ? anchor.clientX - rect.left : 0;
  const anchorY = anchor && rect ? anchor.clientY - rect.top : 0;
  const worldX = rect ? (anchorX - viewport.x) / viewport.scale : 0;
  const worldY = rect ? (anchorY - viewport.y) / viewport.scale : 0;
  setCanvasViewport({
    scale: nextScale,
    x: rect ? anchorX - worldX * nextScale : viewport.x,
    y: rect ? anchorY - worldY * nextScale : viewport.y,
  });
}

function bindSpatialCanvasViewport(canvas) {
  const viewport = canvas.querySelector('.canvas-viewport');
  if (!viewport) return;
  let dragStart = null;

  viewport.addEventListener('wheel', (event) => {
    event.preventDefault();
    zoomWorkbenchCanvas(canvas, event.deltaY < 0 ? 1 : -1, event);
  }, { passive: false });

  viewport.addEventListener('pointerdown', (event) => {
    if (event.target.closest('button, .workbench-context-dock, .canvas-toolbar, .workbench-popover')) return;
    dragStart = {
      pointerId: event.pointerId,
      clientX: event.clientX,
      clientY: event.clientY,
      x: window.appState.canvasViewport.x,
      y: window.appState.canvasViewport.y,
    };
    viewport.classList.add('is-panning');
    viewport.setPointerCapture(event.pointerId);
  });

  viewport.addEventListener('pointermove', (event) => {
    if (!dragStart || dragStart.pointerId !== event.pointerId) return;
    setCanvasViewport({
      scale: window.appState.canvasViewport.scale,
      x: dragStart.x + event.clientX - dragStart.clientX,
      y: dragStart.y + event.clientY - dragStart.clientY,
    });
  });

  const endPan = (event) => {
    if (!dragStart || dragStart.pointerId !== event.pointerId) return;
    dragStart = null;
    viewport.classList.remove('is-panning');
  };
  viewport.addEventListener('pointerup', endPan);
  viewport.addEventListener('pointercancel', endPan);
}

function renderSpatialBoardZones(world) {
  const board = getWorkbenchBoard();
  board.zones.forEach((zone) => {
    const zoneNode = createElement('section', 'canvas-zone');
    zoneNode.style.left = `${zone.x}px`;
    zoneNode.style.top = `${zone.y}px`;
    zoneNode.style.width = `${zone.width}px`;
    zoneNode.style.height = `${zone.height}px`;
    zoneNode.innerHTML = `<span>${zone.label}</span>`;
    world.appendChild(zoneNode);
  });
}

function renderSpatialNodeLevelLabel(node) {
  const labels = {
    requirements: 'Requirement',
    architecture: 'Architecture',
    component: 'Component',
    phase: 'Phase',
    task: 'Task',
  };
  return labels[node.level] || node.typeLabel || 'Object';
}

function renderWorkbenchContextDock(selectedNode) {
  const dock = createElement('aside', 'workbench-context-dock');
  dock.setAttribute('aria-label', 'Workbench context dock');
  const view = getWorkbenchNodeViewState(selectedNode);
  const basketLabels = window.appState.context.map((item) => item.label);
  const protectedLabels = window.appState.protected.map((item) => item.label);
  const selectedTitle = selectedNode ? selectedNode.title || selectedNode.label : 'No object selected';
  const selectedSummary = selectedNode ? selectedNode.subtitle || selectedNode.description : 'Select an object on the board to scope the local copilot context.';
  dock.innerHTML = `<div class="context-dock-header">
      <div>
        <span class="context-dock-eyebrow">Context Dock</span>
        <h3>${selectedTitle}</h3>
      </div>
      ${renderStatusChip(view.status, selectedNode ? view.label : 'Select')}
    </div>
    <p class="context-dock-summary">${selectedSummary}</p>
    <dl class="context-dock-meta">
      <div><dt>Layer</dt><dd>${selectedNode ? renderSpatialNodeLevelLabel(selectedNode) : 'None'}</dd></div>
      <div><dt>Open</dt><dd>${selectedNode ? view.blockerCount || 0 : 0}</dd></div>
      <div><dt>Evidence</dt><dd>${selectedNode ? view.evidenceCount || 0 : 0}</dd></div>
    </dl>
    <div class="context-dock-section">
      <h4>Selected Context</h4>
      <p>${basketLabels.length ? basketLabels.join(' | ') : 'No included context in this browser session.'}</p>
    </div>
    <div class="context-dock-section">
      <h4>Protected Exclusions</h4>
      <p>${protectedLabels.join(' | ')}</p>
    </div>
    <div class="context-dock-section context-dock-guidance">
      <h4>Static copilot guidance</h4>
      <p>Use the selected object plus Selected Context to discuss architecture scope. This dock is local guidance only and does not send prompts or call AI services.</p>
    </div>`;
  return dock;
}

function refreshWorkbenchContextDock() {
  const dock = document.querySelector('.workbench-context-dock');
  if (!dock) return;
  dock.replaceWith(renderWorkbenchContextDock(getSelectedNode()));
}

function renderSpatialWorkbenchCanvas(canvas) {
  const board = getWorkbenchBoard();
  canvas.innerHTML = `
    <div class="spatial-canvas-head">
      <div class="spatial-canvas-title">
        ${getBreadcrumbsHTML()}
        <span class="canvas-label">COCKPIT-MVP-015 / Spatial Board</span>
      </div>
      <div class="canvas-toolbar spatial-canvas-toolbar">
        <div class="canvas-support-actions" aria-label="Workbench support panels">
          <button class="canvas-support-btn ${window.appState.activeWorkbenchPopover === 'palette' ? 'active' : ''}" type="button" id="toggle-workbench-palette" aria-expanded="${window.appState.activeWorkbenchPopover === 'palette'}" title="Show object types">
            ${icon('spark')}<span>Object types</span>
          </button>
          <button class="canvas-support-btn ${window.appState.activeWorkbenchPopover === 'context' ? 'active' : ''}" type="button" id="toggle-workbench-context" aria-expanded="${window.appState.activeWorkbenchPopover === 'context'}" title="Show Selected Context">
            ${icon('branch')}<span>Selected Context</span><strong>${window.appState.context.length}</strong>
          </button>
        </div>
        <div class="canvas-view-mode-toggle">
          <button class="view-mode-btn ${window.appState.viewMode === 'spatial' ? 'active' : ''}" type="button" id="toggle-view-spatial" title="Spatial Board">Board</button>
          <button class="view-mode-btn ${window.appState.viewMode === 'mixed' ? 'active' : ''}" type="button" id="toggle-view-mixed" title="Mixed Map">Mixed</button>
          <button class="view-mode-btn ${window.appState.viewMode === 'flat' ? 'active' : ''}" type="button" id="toggle-view-flat" title="Flat Sequential Flow">Flat</button>
        </div>
        <label class="focus-lens-control" for="focus-lens-select">
          <span>Lens</span>
          <select id="focus-lens-select">${getFocusLensOptionsHTML()}</select>
        </label>
        <div class="canvas-zoom-controls" aria-label="Spatial board zoom controls">
          <button class="icon-btn" type="button" id="zoom-out-workbench" title="Zoom out" aria-label="Zoom out">${icon('minus')}</button>
          <span id="workbench-zoom-level" class="canvas-zoom-level">${Math.round(window.appState.canvasViewport.scale * 100)}%</span>
          <button class="icon-btn" type="button" id="zoom-in-workbench" title="Zoom in" aria-label="Zoom in">${icon('add')}</button>
          <button class="icon-btn" type="button" id="fit-workbench-board" title="Fit board" aria-label="Fit board">${icon('fit')}</button>
          <button class="icon-btn" type="button" id="reset-workbench-view" title="Reset view" aria-label="Reset view">${icon('reset')}</button>
        </div>
      </div>
    </div>`;

  const viewport = createElement('div', 'canvas-viewport');
  const world = createElement('div', 'canvas-world');
  world.style.width = `${board.width}px`;
  world.style.height = `${board.height}px`;
  renderSpatialBoardZones(world);

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'workflow-lines');
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.setAttribute('viewBox', `0 0 ${board.width} ${board.height}`);
  svg.innerHTML = workflowLineDefs();
  world.appendChild(svg);

  getSpatialWorkbenchNodes().forEach((node) => {
    world.appendChild(createWorkbenchNodeCard(node));
  });
  viewport.appendChild(world);
  canvas.appendChild(viewport);

  if (window.appState.activeWorkbenchPopover) {
    canvas.appendChild(renderWorkbenchPopover(window.appState.activeWorkbenchPopover));
  }
  canvas.appendChild(renderWorkbenchContextDock(getSelectedNode()));
  canvas.appendChild(createElement('div', 'canvas-minimap canvas-minimap-spatial'));

  const paletteToggle = canvas.querySelector('#toggle-workbench-palette');
  const contextToggle = canvas.querySelector('#toggle-workbench-context');
  if (paletteToggle) {
    paletteToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleWorkbenchPopover('palette', canvas);
    });
  }
  if (contextToggle) {
    contextToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleWorkbenchPopover('context', canvas);
    });
  }
  bindFocusLensSelect(canvas);
  canvas.querySelector('#toggle-view-spatial').addEventListener('click', (event) => {
    event.stopPropagation();
    window.appState.viewMode = 'spatial';
    window.appState.currentParentId = null;
    window.appState.currentLevel = 'requirements';
    window.appState.expandedNodeId = null;
    window.renderPage('workbench');
  });
  canvas.querySelector('#toggle-view-mixed').addEventListener('click', (event) => {
    event.stopPropagation();
    window.appState.viewMode = 'mixed';
    window.appState.currentParentId = null;
    window.appState.currentLevel = 'requirements';
    window.appState.expandedNodeId = null;
    window.appState.selectedNodeId = null;
    window.renderPage('workbench');
  });
  canvas.querySelector('#toggle-view-flat').addEventListener('click', (event) => {
    event.stopPropagation();
    window.appState.viewMode = 'flat';
    window.appState.currentParentId = null;
    window.appState.currentLevel = 'task';
    window.appState.expandedNodeId = null;
    window.appState.selectedNodeId = 'node-1';
    window.renderPage('workbench');
  });
  canvas.querySelector('#zoom-out-workbench').addEventListener('click', (event) => {
    event.stopPropagation();
    zoomWorkbenchCanvas(canvas, -1);
  });
  canvas.querySelector('#zoom-in-workbench').addEventListener('click', (event) => {
    event.stopPropagation();
    zoomWorkbenchCanvas(canvas, 1);
  });
  canvas.querySelector('#fit-workbench-board').addEventListener('click', (event) => {
    event.stopPropagation();
    fitWorkbenchBoard(canvas);
  });
  canvas.querySelector('#reset-workbench-view').addEventListener('click', (event) => {
    event.stopPropagation();
    resetWorkbenchViewport();
  });
  canvas.addEventListener('click', () => {
    closeWorkbenchPopover(canvas);
  });

  bindSpatialCanvasViewport(canvas);
  applyCanvasViewport();
  scheduleWorkflowLines(canvas);
  return canvas;
}

function renderNodeCanvas() {
  ensureWorkflowLineListeners();
  const canvas = createElement('div', `node-canvas canvas-mode-${window.appState.viewMode}`);
  if (window.appState.viewMode === 'spatial') {
    return renderSpatialWorkbenchCanvas(canvas);
  }

  canvas.innerHTML = `
    ${getBreadcrumbsHTML()}
    <div class="canvas-toolbar">
      <div class="canvas-support-actions" aria-label="Workbench support panels">
        <button class="canvas-support-btn ${window.appState.activeWorkbenchPopover === 'palette' ? 'active' : ''}" type="button" id="toggle-workbench-palette" aria-expanded="${window.appState.activeWorkbenchPopover === 'palette'}" title="Show object types">
          ${icon('spark')}<span>Object types</span>
        </button>
        <button class="canvas-support-btn ${window.appState.activeWorkbenchPopover === 'context' ? 'active' : ''}" type="button" id="toggle-workbench-context" aria-expanded="${window.appState.activeWorkbenchPopover === 'context'}" title="Show Selected Context">
          ${icon('branch')}<span>Selected Context</span><strong>${window.appState.context.length}</strong>
        </button>
      </div>
      <div class="canvas-view-mode-toggle">
        <button class="view-mode-btn ${window.appState.viewMode === 'spatial' ? 'active' : ''}" type="button" id="toggle-view-spatial" title="Spatial Board">Board</button>
        <button class="view-mode-btn ${window.appState.viewMode === 'mixed' ? 'active' : ''}" type="button" id="toggle-view-mixed" title="Mixed Map">Mixed Map</button>
        <button class="view-mode-btn ${window.appState.viewMode === 'flat' ? 'active' : ''}" type="button" id="toggle-view-flat" title="Flat Sequential Flow">Flat Flow</button>
      </div>
      <label class="focus-lens-control" for="focus-lens-select">
        <span>Lens</span>
        <select id="focus-lens-select">${getFocusLensOptionsHTML()}</select>
      </label>
    </div>
    <span class="canvas-label">COCKPIT-MVP-014</span>`;

  const paletteToggle = canvas.querySelector('#toggle-workbench-palette');
  const contextToggle = canvas.querySelector('#toggle-workbench-context');
  if (paletteToggle) {
    paletteToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleWorkbenchPopover('palette', canvas);
    });
  }
  if (contextToggle) {
    contextToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleWorkbenchPopover('context', canvas);
    });
  }
  bindFocusLensSelect(canvas);
  if (window.appState.activeWorkbenchPopover) {
    canvas.appendChild(renderWorkbenchPopover(window.appState.activeWorkbenchPopover));
  }
  canvas.addEventListener('click', () => {
    closeWorkbenchPopover(canvas);
  });

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'workflow-lines');
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.innerHTML = workflowLineDefs();
  canvas.appendChild(svg);

  const legend = createElement('details', 'canvas-legend');
  legend.open = true;
  legend.innerHTML = `<summary>Edge legend</summary>
    <div class="canvas-legend-items">
      <div class="canvas-legend-item"><span class="canvas-legend-line edge-validated"></span>Validated</div>
      <div class="canvas-legend-item"><span class="canvas-legend-line edge-pending"></span>Pending</div>
      <div class="canvas-legend-item"><span class="canvas-legend-line edge-risk"></span>Risk</div>
      <div class="canvas-legend-item"><span class="canvas-legend-line edge-neutral"></span>Neutral</div>
    </div>`;
  canvas.appendChild(legend);

  const flowClass = window.appState.viewMode === 'flat'
    ? 'node-flow node-flow-flat'
    : window.appState.viewMode === 'mixed'
      ? 'node-flow node-flow-mixed'
      : 'node-flow node-flow-map';
  const flow = createElement('div', flowClass);
  if (window.appState.viewMode === 'mixed') {
    renderMixedMapNodes(flow);
  } else {
    renderOrderedWorkbenchNodes(flow);
  }
  canvas.appendChild(flow);

  // Bind toolbar view toggle listeners
  const toggleSpatial = canvas.querySelector('#toggle-view-spatial');
  const toggleMixed = canvas.querySelector('#toggle-view-mixed');
  const toggleFlat = canvas.querySelector('#toggle-view-flat');
  if (toggleSpatial) {
    toggleSpatial.addEventListener('click', (event) => {
      event.stopPropagation();
      window.appState.viewMode = 'spatial';
      window.appState.currentParentId = null;
      window.appState.currentLevel = 'requirements';
      window.appState.expandedNodeId = null;
      window.renderPage('workbench');
    });
  }
  if (toggleMixed) {
    toggleMixed.addEventListener('click', (event) => {
      event.stopPropagation();
      window.appState.viewMode = 'mixed';
      window.appState.currentParentId = null;
      window.appState.currentLevel = 'requirements';
      window.appState.expandedNodeId = null;
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
      window.appState.expandedNodeId = null;
      window.appState.selectedNodeId = 'node-1';
      window.renderPage('workbench');
    });
  }

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
  window.appState.selectedNodeId = nodeId;
  if (window.appState.currentPage === 'workbench') {
    applyWorkbenchSelectionClasses();
    const traySubtitle = document.querySelector('.utility-tray-header p');
    const node = getNodeById(nodeId);
    if (traySubtitle && node) {
      traySubtitle.textContent = `${node.id} / ${node.title || node.label}`;
    }
    refreshWorkbenchContextDock();
    refreshObjectOutline();
    refreshObjectEditorPanel();
  }
  if (window.appState.inspectorVisible) renderNodeInspector(nodeId);
}

function renderNodeInspector(nodeId) {
  const inspector = document.getElementById('right-inspector');
  if (!inspector) return;
  const node = window.mockData.nodes.find((n) => n.id === nodeId);
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
  const activeTab = INSPECTOR_TABS.some((tab) => tab.id === window.appState.inspectorTab) ? window.appState.inspectorTab : 'overview';
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

  const exploreAction = inspector.querySelector('#inspector-explore-action');
  if (exploreAction) {
    exploreAction.addEventListener('click', () => {
      drillDownToNode(node);
    });
  }

  inspector.querySelectorAll('[data-inspector-link]').forEach((link) => {
    link.addEventListener('click', () => window.navigate(link.dataset.inspectorLink));
  });

  inspector.querySelector('#close-inspector').addEventListener('click', () => setInspectorOpen(false));
}

function renderInspectorTabContent(node, activeTab, inboundEdges, outboundEdges, edgeLabel) {
  const readiness = getReadinessSummary();
  const view = getWorkbenchNodeViewState(node, readiness);
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
    case 'overview':
    default:
      const hasChildren = window.appState.viewMode !== 'flat' && window.mockData.nodes.some((n) => n.parentId === node.id);
      const exploreLabel = window.appState.viewMode === 'mixed' && window.appState.expandedNodeId === node.id ? 'Collapse Group' : 'Explore';
      return `<div class="inspector-section">
          <h4>Overview</h4>
          <div class="inspector-grid">
            <div class="inspector-row"><span>Purpose</span><strong>${node.description}</strong></div>
            <div class="inspector-row"><span>Family</span><strong>${node.familyLabel || node.typeLabel || node.type}</strong></div>
            <div class="inspector-row"><span>Config</span><strong>${node.config || 'Configured'}</strong></div>
            <div class="inspector-row"><span>Mode</span><strong>${node.model || 'Local only'}</strong></div>
            <div class="inspector-row"><span>Readiness</span><strong>${view.label}</strong></div>
          </div>
          ${hasChildren ? `
          <div class="inspector-drill-row">
            <button class="action-btn action-primary" id="inspector-explore-action" type="button">
              ${icon('arrow')} ${exploreLabel}
            </button>
          </div>` : ''}
          <div class="inspector-link-row">
            <button class="action-btn" type="button" data-inspector-link="review-runs">${icon('review')}Review Runs</button>
            <button class="action-btn" type="button" data-inspector-link="preview">${icon('handoff')}Preview readiness</button>
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
      <section class="selected-evidence-panel handoff-preview-link-panel">
        <h4>Preview readiness</h4>
        <p>Derived Handoff Packet details now live on the Preview page to avoid duplicate readiness surfaces.</p>
        <button class="action-btn" type="button" id="open-preview-readiness">${icon('eye')}Open Preview readiness</button>
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

  const previewReadiness = tray.querySelector('#open-preview-readiness');
  if (previewReadiness) {
    previewReadiness.addEventListener('click', () => window.navigate('preview'));
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
  if (window.appState.inspectorVisible) renderNodeInspector(node.id);
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
    case 'review-blocked':
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
    case 'scenario':
      return 'Scenario';
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

function groupFieldsByStatus(fields = getActiveSpecFields()) {
  const activeFields = fields;
  return [
    {
      key: 'needs-answer',
      title: 'Needs answer',
      fields: activeFields.filter((field) => ['ai-suggested', 'missing', 'needs-answer', 'needs-lock'].includes(field.status)),
    },
    {
      key: 'draft',
      title: 'Draft',
      fields: activeFields.filter((field) => field.status === 'draft'),
    },
    {
      key: 'locked',
      title: 'Locked',
      fields: activeFields.filter((field) => field.status === 'locked'),
    },
  ];
}

function appendSpecFieldRow(tbody, field) {
  const tr = createElement('tr');
  tr.appendChild(createElement('td', '', field.name));
  const tdValue = createElement('td');
  tdValue.textContent = field.value || field.suggestion || '';
  tr.appendChild(tdValue);

  const tdStatus = createElement('td');
  tdStatus.innerHTML = renderFieldStatus(field);
  tr.appendChild(tdStatus);

  const tdActions = createElement('td', 'field-actions field-actions-compact');
  const suggestBtn = createElement('button', '', 'Suggest');
  suggestBtn.type = 'button';
  suggestBtn.disabled = field.status === 'locked';
  suggestBtn.addEventListener('click', () => {
    field.value = field.suggestion;
    field.status = 'draft';
    markSpecValidationStale(`Field "${field.name}" changed locally. Spec validation must be refreshed.`);
    showToast(`Applied the suggestion to "${field.name}" locally.`, 'success');
    window.renderPage('spec-builder');
  });

  const lockBtn = createElement('button', '', field.status === 'locked' ? 'Unlock' : 'Lock');
  lockBtn.type = 'button';
  lockBtn.addEventListener('click', () => {
    if (field.status === 'locked') {
      unlockLocalSpecField(field);
      return;
    }
    field.status = 'locked';
    markSpecValidationStale(`Field "${field.name}" was locked locally. Spec validation must be refreshed.`);
    showToast(`Locked "${field.name}" locally.`, 'success');
    window.renderPage('spec-builder');
  });

  const overflow = createElement('details', 'field-overflow');
  overflow.innerHTML = '<summary>More</summary>';
  [
    ['Explain', () => showToast(`Local explanation for "${field.name}" only. No AI call or artifact generation occurs.`, 'info')],
    ['Ask one', () => showToast(`Question prompt for "${field.name}" is local feedback only. No AI service is called.`, 'info')],
    ['Trace', () => window.navigate('trace')],
    ['Reset', () => resetLocalSpecField(field)],
  ].forEach(([text, handler]) => {
    const btn = createElement('button', '', text);
    btn.type = 'button';
    btn.disabled = text === 'Reset' && !field.value;
    btn.addEventListener('click', handler);
    overflow.appendChild(btn);
  });
  tdActions.append(suggestBtn, lockBtn, overflow);
  tr.appendChild(tdActions);
  tbody.appendChild(tr);
}

function appendSpecFieldSection(table, { key, title, description, fields }) {
  const tbody = createElement('tbody', `spec-field-section spec-field-section-${key}`);
  tbody.setAttribute('data-spec-field-section', key);
  const sectionRow = createElement('tr', 'spec-field-section-row');
  sectionRow.innerHTML = `<th colspan="4">${title}<span>${description}</span></th>`;
  tbody.appendChild(sectionRow);

  groupFieldsByStatus(fields).forEach((group) => {
    if (!group.fields.length) return;
    const groupRow = createElement('tr', 'spec-field-group-row');
    groupRow.innerHTML = `<th colspan="4">${group.title}<span>${group.fields.length} field${group.fields.length === 1 ? '' : 's'}</span></th>`;
    tbody.appendChild(groupRow);
    group.fields.forEach((field) => appendSpecFieldRow(tbody, field));
  });

  if (!fields.length) {
    const emptyRow = createElement('tr');
    emptyRow.innerHTML = '<td colspan="4"><em>No fields for this section.</em></td>';
    tbody.appendChild(emptyRow);
  }

  table.appendChild(tbody);
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
  const selectedTemplate = getSelectedSpecTemplate();
  (window.appState.specTemplates || []).forEach((tpl) => {
    const option = createElement('option');
    option.value = tpl.id;
    option.textContent = tpl.name;
    if (getSelectedSpecTemplateId() === tpl.id) {
      option.selected = true;
    }
    select.appendChild(option);
  });
  select.addEventListener('change', () => {
    setSelectedSpecTemplate(select.value);
    markSpecValidationStale(`Template changed to "${select.options[select.selectedIndex].text}". Spec validation must be refreshed.`);
    showToast(`Template changed to "${select.options[select.selectedIndex].text}". Spec fields updated.`, 'success');
    window.renderPage('spec-builder');
  });
  const templateNote = createElement('span', 'template-note', 'Changes fields rendered in the table.');
  templateSelectorDiv.append(label, select, templateNote);
  container.appendChild(templateSelectorDiv);
  container.appendChild(renderSpecReadinessPanel());

  const missing = hasUnresolvedSpecFields();
  const validationBlock = createElement('section', missing ? 'warning-banner spec-validation-block' : 'success-banner spec-validation-block');
  validationBlock.innerHTML = `${icon(missing ? 'warning' : 'check')}${missing ? 'Required fields still need answers before local validation can clear.' : 'Required fields are resolved. Run local validation before preparing handoff.'}${window.appState.lastLocalValidation ? `<span>${window.appState.lastLocalValidation}</span>` : ''}`;
  container.appendChild(validationBlock);

  const table = createElement('table', 'field-table');
  table.innerHTML = '<thead><tr><th>Field</th><th>Value</th><th>Status</th><th>Actions</th></tr></thead>';
  appendSpecFieldSection(table, {
    key: 'template',
    title: selectedTemplate ? `${selectedTemplate.name} fields` : 'Template fields',
    description: selectedTemplate ? selectedTemplate.description : 'Template-specific static mock fields.',
    fields: getTemplateOnlySpecFields(selectedTemplate),
  });
  appendSpecFieldSection(table, {
    key: 'global-handoff',
    title: 'Global handoff gates',
    description: 'Always visible readiness gates for D-005 and Preview.',
    fields: getGlobalHandoffGateFields(),
  });
  container.appendChild(table);

  const actions = createElement('div', 'button-row spec-sticky-actions');
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
  return getActiveSpecFields().some((field) => ['ai-suggested', 'missing', 'needs-answer', 'needs-lock'].includes(field.status));
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
  scope.innerHTML = `<div class="handoff-preview-head">
      <div>
        <h3>${reviewRun.name || 'Review run'}</h3>
        <p>${reviewRun.verdict || 'Inspect-only advisory review'} / Scope: ${(reviewRun.scopeContextIds || []).join(', ') || window.appState.context.map((c) => c.label).join(', ') || 'No context selected.'}</p>
      </div>
      ${renderStatusChip(normalizeObjectStatus(reviewRun.status || 'review_complete'), statusLabel(normalizeObjectStatus(reviewRun.status || 'review_complete')))}
    </div>
    <div class="static-notice">Review Runs are advisory and inspect-only. Local acknowledge/defer controls update browser state only.</div>`;
  container.appendChild(scope);

  const resultsDiv = createElement('div', 'review-list');
  resultsDiv.id = 'review-results';
  resultsDiv.innerHTML = renderFindingsList(findings);
  container.appendChild(resultsDiv);
  bindFindingActions(resultsDiv);
}

function renderFindingsList(findings) {
  return findings.map((finding) => `<article class="review-result-card review-finding-card-compact" data-finding-id="${finding.id}">
      <div class="review-finding-head">
        <h4>${finding.id}</h4>
        <div>${renderSeverityChip(finding.severity)}${renderStatusChip(normalizeObjectStatus(finding.status), statusLabel(normalizeObjectStatus(finding.status)))}</div>
      </div>
      <p>${finding.summary}</p>
      <small>${finding.recommendation}</small>
      <div class="evidence-chip-list">${finding.evidenceIds.map((id) => `<span class="chip chip-secondary">${id}</span>`).join('')}</div>
      <div class="finding-actions">
        <button type="button" data-finding-action="ack">Acknowledge locally</button>
        <button type="button" data-finding-action="defer">Defer locally</button>
      </div>
    </article>`).join('');
}

function bindFindingActions(resultsDiv) {
  resultsDiv.querySelectorAll('[data-finding-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('[data-finding-id]');
      const finding = window.appState.findings.find((item) => item.id === card.dataset.findingId);
      if (!finding) return;
      if (button.dataset.findingAction === 'ack') {
        finding.status = 'finding_resolved';
        showToast(`Acknowledged ${finding.id} locally. No review result or artifact was changed.`, 'success');
      } else {
        finding.status = 'finding_deferred';
        showToast(`Deferred ${finding.id} locally. No real review workflow was changed.`, 'warning');
      }
      window.renderPage('review-runs');
    });
  });
}

function renderSeverityChip(severity) {
  if (severity === 'high') return renderStatusChip('blocked', 'High severity');
  if (severity === 'medium') return renderStatusChip('needs-lock', 'Medium severity');
  return renderStatusChip('validated', 'Low severity');
}

function renderPreviewWireframe(type) {
  return `<div class="preview-wireframe" aria-label="${type} static wireframe">
      <svg viewBox="0 0 720 420" role="img" aria-labelledby="preview-wireframe-title">
        <title id="preview-wireframe-title">${type} local wireframe</title>
        <rect x="24" y="24" width="672" height="372" rx="14" class="wireframe-shell" />
        <rect x="48" y="52" width="132" height="316" rx="10" class="wireframe-rail" />
        <rect x="204" y="52" width="308" height="182" rx="12" class="wireframe-canvas" />
        <rect x="532" y="52" width="140" height="316" rx="10" class="wireframe-panel" />
        <rect x="228" y="82" width="92" height="42" rx="8" class="wireframe-node" />
        <rect x="348" y="128" width="92" height="42" rx="8" class="wireframe-node is-warn" />
        <rect x="256" y="178" width="112" height="34" rx="8" class="wireframe-node is-ok" />
        <path d="M320 103 C350 106 350 137 348 149" class="wireframe-edge" />
        <path d="M394 170 C376 184 354 190 312 195" class="wireframe-edge is-warn" />
        <rect x="228" y="266" width="244" height="16" rx="8" class="wireframe-line" />
        <rect x="228" y="296" width="198" height="12" rx="6" class="wireframe-line muted" />
        <rect x="228" y="322" width="224" height="12" rx="6" class="wireframe-line muted" />
        <rect x="556" y="82" width="88" height="16" rx="8" class="wireframe-line" />
        <rect x="556" y="124" width="88" height="52" rx="8" class="wireframe-card" />
        <rect x="556" y="198" width="88" height="52" rx="8" class="wireframe-card is-warn" />
        <rect x="556" y="272" width="88" height="52" rx="8" class="wireframe-card is-ok" />
      </svg>
      <div class="preview-wireframe-caption">
        <strong>${type}</strong>
        <span>Static local preview / COCKPIT-MVP-014</span>
      </div>
    </div>`;
}

function renderPreviewReadinessRail(readiness) {
  const sync = getPreviewSyncStatus(readiness);
  return `<section class="panel preview-readiness-rail">
      <h3>Readiness rail</h3>
      <div class="preview-rail-status">${renderStatusChip(sync.status, sync.label)}${renderStatusChip(readiness.ready ? 'ready' : 'blocked', readiness.ready ? 'Ready locally' : 'Gated locally')}</div>
      <div class="preview-rail-section">
        <h4>Work Packet</h4>
        ${renderInspectorList([window.appState.workPacket.objective || 'No objective loaded.'])}
      </div>
      <div class="preview-rail-section">
        <h4>Open readiness items</h4>
        ${renderInspectorList(readiness.handoffBlockers.length ? readiness.handoffBlockers.slice(0, 6) : ['No open readiness items'])}
      </div>
      <button class="action-btn" type="button" id="preview-review-link">${icon('review')}Open Review Runs</button>
    </section>`;
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
    window.renderPage('preview');
  });
  selectorDiv.append(label, select);

  const readiness = getReadinessSummary();
  const layout = createElement('section', 'preview-layout');
  const main = createElement('div', 'preview-main');
  main.appendChild(selectorDiv);
  const frame = createElement('div', `preview-frame${window.appState.previewWide ? ' is-wide' : ''}`);
  frame.innerHTML = renderPreviewWireframe(select.value);
  main.appendChild(frame);
  const viewportToggle = createElement('button', 'action-btn');
  viewportToggle.type = 'button';
  viewportToggle.innerHTML = `${icon('preview')}${window.appState.previewWide ? 'Return to fit' : 'Open in viewport'}`;
  viewportToggle.addEventListener('click', () => {
    window.appState.previewWide = !window.appState.previewWide;
    showToast('Preview viewport changed locally. No file output or artifact record changed.', 'info');
    window.renderPage('preview');
  });
  main.appendChild(viewportToggle);
  const checklist = createElement('section', 'panel');
  checklist.innerHTML = '<h3>Spec coverage</h3>';
  const ul = createElement('ul');
  getSpecCoverageRows(readiness).forEach((row) => {
    ul.appendChild(createElement('li', '', `${row.field.name}: ${row.label}`));
  });
  checklist.appendChild(ul);
  main.appendChild(checklist);
  layout.appendChild(main);
  const rail = createElement('div');
  rail.innerHTML = renderPreviewReadinessRail(readiness);
  layout.appendChild(rail.firstElementChild);
  container.appendChild(layout);
  const reviewLink = container.querySelector('#preview-review-link');
  if (reviewLink) reviewLink.addEventListener('click', () => window.navigate('review-runs'));

  const actions = createElement('div', 'button-row');
  [
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
  const filter = window.appState.decisionFilter || 'all';
  container.appendChild(renderDecisionSummary(needsLock.length, locked.length, filter));
  bindDecisionFilter(container);
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

  if (filter !== 'locked') container.appendChild(renderDecisionGroup('Needs Point lock', needsLock, 'No decisions require locking.'));
  if (filter !== 'needs-lock') container.appendChild(renderDecisionGroup('Locked decisions', locked, 'No locked decisions.'));
}

function renderDecisionSummary(needsLockCount, lockedCount, activeFilter) {
  const summary = createElement('section', 'decisions-summary');
  summary.innerHTML = `<article>
      <span class="metric-label">Needs Point lock</span>
      <strong>${needsLockCount}</strong>
    </article>
    <article>
      <span class="metric-label">Locked locally</span>
      <strong>${lockedCount}</strong>
    </article>
    <div class="decision-filter" aria-label="Decision filter">
      ${['all', 'needs-lock', 'locked'].map((filter) => `<button class="action-btn${activeFilter === filter ? ' selected' : ''}" type="button" data-decision-filter="${filter}">${filter === 'all' ? 'All' : filter === 'needs-lock' ? 'Needs lock' : 'Locked'}</button>`).join('')}
    </div>`;
  return summary;
}

function bindDecisionFilter(container) {
  container.querySelectorAll('[data-decision-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      window.appState.decisionFilter = button.dataset.decisionFilter;
      window.renderPage('decisions');
    });
  });
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

function renderTraceFlowSvg() {
  const readiness = getReadinessSummary();
  const nodeStatuses = [
    ['Context Node', 'validated'],
    ['Spec Draft', readiness.unresolvedSpecFields.length ? 'needs-lock' : 'validated'],
    ['Decision', readiness.pendingDecisions.length ? 'needs-lock' : 'locked'],
    ['Evidence', readiness.missingEvidence.length ? 'blocked' : 'validated'],
    ['Artifact Reference', 'needs-sync'],
    ['Work Packet', 'draft'],
    ['Handoff Packet', readiness.ready ? 'ready' : 'blocked'],
  ];
  const nodeWidth = 112;
  const gap = 18;
  const nodes = nodeStatuses.map(([label, status], index) => {
    const x = 24 + index * (nodeWidth + gap);
    return `<g class="trace-flow-node status-tone-${statusTone(status)}">
        <rect x="${x}" y="40" width="${nodeWidth}" height="70" rx="10" />
        <text x="${x + nodeWidth / 2}" y="73" text-anchor="middle">${label}</text>
        <text x="${x + nodeWidth / 2}" y="92" text-anchor="middle" class="trace-flow-small">${statusLabel(status)}</text>
      </g>`;
  }).join('');
  const edges = nodeStatuses.slice(0, -1).map((_, index) => {
    const start = 24 + index * (nodeWidth + gap) + nodeWidth;
    const end = start + gap;
    return `<path d="M${start} 75 H${end}" class="trace-flow-edge" /><path d="m${end - 6} 69 6 6-6 6" class="trace-flow-edge" />`;
  }).join('');
  return `<svg class="trace-flow-svg" viewBox="0 0 930 150" role="img" aria-label="Trace flow from Context Node to Handoff Packet">
      ${edges}
      ${nodes}
    </svg>`;
}

function renderTrace(container) {
  showGovernance(true);
  renderPageHeader(container, {
    kicker: 'Traceability',
    title: 'Trace & Evidence',
    subtitle: 'Follow source-to-target links across context, spec fields, decisions, and artifact readiness.',
    className: 'governance-header',
  });

  const missingFields = window.appState.specFields.filter((f) => !window.appState.traceLinks.some((l) => l.target === f.id));
  const missingEvidence = getMissingEvidenceItems();
  if (missingFields.length > 0 || missingEvidence.length > 0) {
    const warn = createElement('div', 'warning-banner trace-warning-top');
    const parts = [];
    if (missingFields.length > 0) parts.push(`${missingFields.length} spec field${missingFields.length === 1 ? '' : 's'} need trace evidence`);
    if (missingEvidence.length > 0) parts.push(`${missingEvidence.length} required evidence item${missingEvidence.length === 1 ? '' : 's'} still unavailable`);
    warn.innerHTML = `${icon('warning')}${parts.join(' / ')}. Handoff readiness waits until these local checks clear.`;
    container.appendChild(warn);
  }

  const graph = createElement('div', 'trace-graph');
  graph.innerHTML = renderTraceFlowSvg();
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

  const rawLinks = createElement('details', 'raw-trace-links');
  rawLinks.innerHTML = '<summary>Show raw trace links</summary>';
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
  rawLinks.appendChild(table);
  container.appendChild(rawLinks);
}

function getRuleEnforcement(ruleName) {
  const map = {
    'Runtime mutation': ['rules', 'Rules matrix'],
    'Repo writes': ['preview', 'Handoff gating'],
    'Artifact drafting': ['spec-builder', 'Spec Builder'],
    'Dynamic UI': ['spec-builder', 'Spec-first flow'],
    Secrets: ['workbench', 'Protected exclusions'],
    'External actions': ['rules', 'Scope rules'],
    'Review agents': ['review-runs', 'Review Runs'],
    'Codex handoff': ['decisions', 'D-005'],
  };
  return map[ruleName] || ['rules', 'Rules'];
}

function renderRulesOverview() {
  const allowed = window.appState.rules.filter((rule) => rule.allowed);
  const blocked = window.appState.rules.filter((rule) => !rule.allowed);
  return `<section class="rules-allowed-grid">
      <article>
        <h3>Allowed locally</h3>
        ${renderInspectorList(allowed.map((rule) => `${rule.name}: ${rule.reviewGate}`))}
      </article>
      <article>
        <h3>Blocked surfaces</h3>
        ${renderInspectorList(blocked.map((rule) => `${rule.name}: ${rule.reviewGate}`))}
      </article>
    </section>`;
}

function renderRules(container) {
  showGovernance(true);
  renderPageHeader(container, {
    kicker: 'Governance',
    title: 'Rules & Scope',
    subtitle: 'The safety model keeps runtime mutation, secrets, external actions, and repository writes outside this workspace.',
    className: 'governance-header',
  });

  const overview = createElement('div');
  overview.innerHTML = renderRulesOverview();
  container.appendChild(overview.firstElementChild);

  const table = createElement('table', 'rules-matrix');
  table.innerHTML = '<thead><tr><th>Rule</th><th>Allowed?</th><th>Review Gate</th><th>Enforced at</th></tr></thead>';
  const tbody = createElement('tbody');
  window.appState.rules.forEach((rule) => {
    const [page, label] = getRuleEnforcement(rule.name);
    const tr = createElement('tr');
    tr.appendChild(createElement('td', '', rule.name));
    const tdAllowed = createElement('td');
    tdAllowed.innerHTML = renderStatusChip(rule.allowed ? 'allowed' : 'blocked', rule.allowed ? 'Yes' : 'No');
    tr.appendChild(tdAllowed);
    tr.appendChild(createElement('td', '', rule.reviewGate));
    const enforced = createElement('td');
    const link = createElement('button', 'link-button', label);
    link.type = 'button';
    link.dataset.ruleLink = page;
    enforced.appendChild(link);
    tr.appendChild(enforced);
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  container.appendChild(table);
  container.querySelectorAll('[data-rule-link]').forEach((button) => {
    button.addEventListener('click', () => window.navigate(button.dataset.ruleLink));
  });

  const summaries = createElement('div', 'rules-summary-grid rules-note');
  const ps = createElement('section', 'panel');
  ps.innerHTML = `<h3>Protected surfaces</h3><p>${window.appState.protected.map((p) => p.label).join(', ')}</p>`;
  summaries.appendChild(ps);
  const gateSummary = createElement('section', 'panel');
  gateSummary.innerHTML = '<h3>Review Gate Summary</h3><p>Runtime mutation is unavailable; repository changes stay outside this workspace; secret and external actions are excluded; agents can inspect only; Codex handoff is gated until ready.</p>';
  summaries.appendChild(gateSummary);
  container.appendChild(summaries);
}

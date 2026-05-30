// Application state for the OpenClaw Cooperative Cockpit MVP.
// This state is deliberately simple and lives in the global scope for
// demonstration purposes. It mirrors some values defined in mockData.js but
// is mutable so the UI can respond to interactions.

(function () {
  const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

  window.appState = {
    currentPage: 'home',
    selectedNodeId: null,
    // Clone arrays from mockData so we can mutate them without
    // altering the originals. In a real application we would use a
    // proper state management library or framework.
    workspace: deepCopy(window.mockData.workspace),
    project: deepCopy(window.mockData.project),
    contextNodes: deepCopy(window.mockData.contextNodes),
    selectedContext: deepCopy(window.mockData.selectedContext),
    specTemplates: deepCopy(window.mockData.specTemplates),
    specDraft: deepCopy(window.mockData.specDraft),
    context: deepCopy(window.mockData.contextItems),
    protected: deepCopy(window.mockData.protectedItems),
    primaryDemoPath: deepCopy(window.mockData.primaryDemoPath),
    reviewRun: deepCopy(window.mockData.reviewRun),
    findings: deepCopy(window.mockData.findings),
    evidenceItems: deepCopy(window.mockData.evidenceItems),
    artifactRefs: deepCopy(window.mockData.artifactRefs),
    workPacket: deepCopy(window.mockData.workPacket),
    handoffPacket: deepCopy(window.mockData.handoffPacket),
    agentRoles: deepCopy(window.mockData.agentRoles),
    validationResults: deepCopy(window.mockData.validationResults),
    handoffPacketPreview: deepCopy(window.mockData.handoffPacketPreview),
    specFields: deepCopy(window.mockData.specFields),
    reviewResults: deepCopy(window.mockData.reviewResults),
    decisions: deepCopy(window.mockData.decisions),
    traceLinks: deepCopy(window.mockData.traceLinks),
    rules: deepCopy(window.mockData.rules),
    // Flags for gating actions
    inspectorTab: 'overview',
    utilityTrayCollapsed: false,
    mockAddNodeRequested: false,
    evidenceReviewed: false,
    reviewBlockersAcknowledged: false,
    lastLocalValidation: null,
    handoffReady: false,
  };
})();

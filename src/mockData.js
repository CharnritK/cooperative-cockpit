// Static mock data for the OpenClaw Cooperative Cockpit MVP.

/*
  This file defines the data used by the front‑end prototype. All values
  are fixed and do not come from any external service. You can adjust
  coordinates or labels here to reposition nodes on the Workbench.
*/

window.mockData = {
  // Nodes displayed on the Workbench canvas. Coordinates are percentages
  // relative to the canvas container for quick placement.
  nodes: [
    {
      id: 'node-1',
      index: '01',
      label: 'Rough Concept',
      type: 'concept',
      x: 22,
      y: 26,
      status: 'validated',
      description: 'Initial high‑level concept',
    },
    {
      id: 'node-2',
      index: '02',
      label: 'Architecture View',
      type: 'context',
      x: 50,
      y: 20,
      status: 'validated',
      description: 'High‑level architecture diagram',
    },
    {
      id: 'node-3',
      index: '03',
      label: 'Spec Builder',
      type: 'spec',
      x: 77,
      y: 34,
      status: 'draft',
      description: 'Create a build specification',
    },
    {
      id: 'node-4',
      index: '04',
      label: 'Review Checks',
      type: 'review',
      x: 35,
      y: 55,
      status: 'needs-lock',
      description: 'Inspect-only review runs',
    },
    {
      id: 'node-5',
      index: '05',
      label: 'UI / HTML Preview',
      type: 'preview',
      x: 66,
      y: 61,
      status: 'needs-sync',
      description: 'Static mockup preview',
    },
    {
      id: 'node-6',
      index: '06',
      label: 'Decision Lock',
      type: 'decision',
      x: 22,
      y: 79,
      status: 'needs-lock',
      description: 'Point approval required',
    },
    {
      id: 'node-7',
      index: '07',
      label: 'Trace Evidence',
      type: 'trace',
      x: 50,
      y: 82,
      status: 'draft',
      description: 'Evidence and lineage',
    },
    {
      id: 'node-8',
      index: '08',
      label: 'Handoff Packet',
      type: 'handoff',
      x: 76,
      y: 82,
      status: 'blocked',
      description: 'Static package for handoff',
    },
  ],

  // Visual-only links drawn on the Workbench canvas.
  workflowEdges: [
    { source: 'node-1', target: 'node-2', tone: 'validated' },
    { source: 'node-2', target: 'node-3', tone: 'validated' },
    { source: 'node-3', target: 'node-4', tone: 'pending' },
    { source: 'node-4', target: 'node-5', tone: 'pending' },
    { source: 'node-5', target: 'node-6', tone: 'pending' },
    { source: 'node-6', target: 'node-7', tone: 'risk' },
    { source: 'node-7', target: 'node-8', tone: 'neutral' },
    { source: 'node-3', target: 'node-5', tone: 'neutral' },
  ],

  // Initial context items included in the basket.
  contextItems: [
    {
      id: 'node-2',
      label: 'Architecture View',
    },
    {
      id: 'spec-link',
      label: 'GS-001 Rough Concept → Builder Spec',
    },
    {
      id: 'feedback-packet',
      label: 'Feedback Packet',
    },
  ],

  // Protected exclusions that cannot be added to AI context.
  protectedItems: [
    { id: 'runtime-state', label: 'Runtime state', status: 'excluded' },
    { id: 'secrets', label: 'Secrets', status: 'excluded' },
    { id: 'repo-write', label: 'Repo write authority', status: 'excluded' },
  ],

  // Specification fields and their statuses.
  specFields: [
    {
      id: 'objective',
      name: 'Objective',
      value: '',
      status: 'ai-suggested',
      suggestion: 'Define the key purpose and desired outcomes of this build.',
    },
    {
      id: 'layout-regions',
      name: 'Layout regions',
      value: '',
      status: 'needs-answer',
      suggestion: 'List the primary UI regions (header, sidebar, canvas, inspector, footer).',
    },
    {
      id: 'interaction-states',
      name: 'Interaction states',
      value: '',
      status: 'ai-suggested',
      suggestion: 'Describe key user interactions and state transitions.',
    },
    {
      id: 'protected-surfaces',
      name: 'Protected surfaces',
      value: 'Runtime state, Secrets, Repo write authority',
      status: 'locked',
      suggestion: '',
    },
    {
      id: 'acceptance-criteria',
      name: 'Acceptance criteria',
      value: '',
      status: 'missing',
      suggestion: 'Define success criteria for this build.',
    },
    {
      id: 'validation-method',
      name: 'Validation method',
      value: '',
      status: 'needs-lock',
      suggestion: 'Describe how the solution will be validated (tests, reviews).',
    },
  ],

  // Review results definitions.
  reviewResults: [
    {
      id: 'review-architecture',
      name: 'Architecture Review',
      verdict: 'Revise',
      severity: 'high',
      findings: 8,
      details: [
        'Clarify separation of concerns',
        'Define layers for context, spec, review and handoff',
        'Ensure traceability across nodes',
      ],
    },
    {
      id: 'review-security',
      name: 'Security Review',
      verdict: 'Pass with notes',
      severity: 'medium',
      findings: 3,
      details: ['No secrets in context', 'Ensure governance strip visible', 'Review agent scopes'],
    },
    {
      id: 'review-redteam',
      name: 'Red Team Review',
      verdict: '2 high‑risk ambiguities',
      severity: 'high',
      findings: 2,
      details: ['Ambiguous spec field definitions', 'Potential misuse of review actions'],
    },
    {
      id: 'review-ux',
      name: 'UX Review',
      verdict: 'Preview required',
      severity: 'low',
      findings: 1,
      details: ['UX mockup missing acceptance criteria'],
    },
    {
      id: 'review-trace',
      name: 'Trace Review',
      verdict: 'Missing evidence links',
      severity: 'medium',
      findings: 2,
      details: ['Some spec fields lack traceability to source context', 'Missing link between node and preview'],
    },
    {
      id: 'review-codex',
      name: 'Codex Handoff Review',
      verdict: 'Not ready',
      severity: 'high',
      findings: 3,
      details: ['Spec incomplete', 'Decisions unresolved', 'Preview out of sync'],
    },
  ],

  // Decision definitions.
  decisions: [
    {
      id: 'D-001',
      title: 'Context Basket placement',
      description: 'Should the Context Basket be docked or floating?',
      status: 'locked',
      options: ['Floating', 'Docked', 'Collapsible'],
      chosenOption: 'Docked',
    },
    {
      id: 'D-002',
      title: 'Spec Builder access',
      description: 'Tab only or dedicated page?',
      status: 'locked',
      options: ['Tab', 'Page', 'Both'],
      chosenOption: 'Both',
    },
    {
      id: 'D-003',
      title: 'Review action language',
      description: 'What wording should be used for review actions?',
      status: 'locked',
      // Avoid unsafe execution-style wording on action labels. Offer only compliant options.
      options: ['Validate', 'Start review checks'],
      chosenOption: 'Validate',
    },
    {
      id: 'D-004',
      title: 'Preview naming',
      description: 'Name of the preview tab/page',
      status: 'locked',
      options: ['Preview', 'UI / HTML Viewer'],
      chosenOption: 'Preview',
    },
    {
      id: 'D-005',
      title: 'Codex handoff gating',
      description: 'When can the Codex handoff be exported?',
      status: 'needs-lock',
      options: ['Always available', 'Gated until ready'],
      chosenOption: null,
    },
  ],

  // Simple trace links demonstration. Each link points from a source to a target by id.
  traceLinks: [
    { source: 'node-1', target: 'objective' },
    { source: 'node-2', target: 'layout-regions' },
    { source: 'node-2', target: 'interaction-states' },
    { source: 'spec-field', target: 'D-005' },
  ],

  // Safety rules definitions for Rules & Scope page.
  rules: [
    {
      name: 'Runtime mutation',
      allowed: false,
      reviewGate: 'Blocked by default',
      notes: '',
    },
    {
      name: 'Repo writes',
      allowed: false,
      reviewGate: 'Handoff only',
      notes: '',
    },
    {
      name: 'Artifact drafting',
      allowed: true,
      reviewGate: 'Spec builder allowed',
      notes: '',
    },
    {
      name: 'Dynamic UI',
      allowed: true,
      reviewGate: 'Spec first',
      notes: '',
    },
    {
      name: 'Secrets',
      allowed: false,
      reviewGate: 'Excluded',
      notes: '',
    },
    {
      name: 'External actions',
      allowed: false,
      reviewGate: 'Blocked',
      notes: '',
    },
    {
      name: 'Review agents',
      allowed: true,
      reviewGate: 'Inspect only',
      notes: '',
    },
    {
      name: 'Codex handoff',
      allowed: true,
      reviewGate: 'Gated until ready',
      notes: '',
    },
  ],
};

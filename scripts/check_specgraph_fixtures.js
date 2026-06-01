const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const schemaPath = path.join(root, 'schemas', 'specgraph.schema.json');
const fixturePath = path.join(root, 'docs', 'product', 'builder-enablement-os', 'fixtures', 'specgraph-demo-fixtures.json');

const failures = [];

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function fail(message) {
  failures.push(message);
}

function arrayIncludesAll(actual, expected, label) {
  const missing = expected.filter((item) => !actual.includes(item));
  if (missing.length) {
    fail(`${label} missing: ${missing.join(', ')}`);
  }
}

function assert(condition, message) {
  if (!condition) {
    fail(message);
  }
}

function getPath(object, parts) {
  return parts.reduce((current, part) => (current && current[part] !== undefined ? current[part] : undefined), object);
}

function validateNode(node, allowedKinds, allowedStatuses, label, errors) {
  for (const key of ['id', 'kind', 'title', 'summary', 'status']) {
    if (!Object.prototype.hasOwnProperty.call(node, key)) {
      errors.push(`${label}.${key}: required property missing`);
    }
  }

  if (node.kind && !allowedKinds.includes(node.kind)) {
    errors.push(`${label}.kind: unsupported kind ${node.kind}`);
  }
  if (node.status && !allowedStatuses.includes(node.status)) {
    errors.push(`${label}.status: unsupported status ${node.status}`);
  }
  if (node.evidence_ids && !Array.isArray(node.evidence_ids)) {
    errors.push(`${label}.evidence_ids: must be an array`);
  }
  if (node.acceptance_criteria && !Array.isArray(node.acceptance_criteria)) {
    errors.push(`${label}.acceptance_criteria: must be an array`);
  }
  if (node.kind === 'reusable_pattern' && !['validated', 'reusable'].includes(node.status)) {
    errors.push(`${label}: reusable_pattern must be validated before reuse`);
  }
  if (node.kind === 'handoff_packet' && (!Array.isArray(node.acceptance_criteria) || node.acceptance_criteria.length === 0)) {
    errors.push(`${label}: handoff_packet must include acceptance criteria`);
  }
}

function validateSpecGraphDocument(document, schema) {
  const errors = [];
  const allowedKinds = getPath(schema, ['$defs', 'node', 'properties', 'kind', 'enum']) || [];
  const allowedStatuses = getPath(schema, ['$defs', 'node', 'properties', 'status', 'enum']) || [];
  const readinessStatuses = getPath(schema, ['$defs', 'readiness_check', 'properties', 'status', 'enum']) || [];

  for (const key of schema.required || []) {
    if (!Object.prototype.hasOwnProperty.call(document, key)) {
      errors.push(`root.${key}: required property missing`);
    }
  }

  if (!document.mission || typeof document.mission !== 'object' || Array.isArray(document.mission)) {
    errors.push('root.mission: must be an object');
  }
  if (!Array.isArray(document.nodes)) {
    errors.push('root.nodes: must be an array');
  }
  if (!Array.isArray(document.edges)) {
    errors.push('root.edges: must be an array');
  }
  if (!Array.isArray(document.readiness)) {
    errors.push('root.readiness: must be an array');
  }

  if (errors.length) {
    return errors;
  }

  const allNodes = [document.mission, ...document.nodes];
  const nodeIds = new Set();

  allNodes.forEach((node, index) => {
    validateNode(node, allowedKinds, allowedStatuses, index === 0 ? 'mission' : `nodes[${index - 1}]`, errors);
    if (node.id) {
      if (nodeIds.has(node.id)) {
        errors.push(`node id duplicated: ${node.id}`);
      }
      nodeIds.add(node.id);
    }
  });

  document.edges.forEach((edge, index) => {
    for (const key of ['id', 'source_id', 'target_id', 'relation_type']) {
      if (!Object.prototype.hasOwnProperty.call(edge, key)) {
        errors.push(`edges[${index}].${key}: required property missing`);
      }
    }
    if (edge.source_id && !nodeIds.has(edge.source_id)) {
      errors.push(`edges[${index}].source_id references unknown node ${edge.source_id}`);
    }
    if (edge.target_id && !nodeIds.has(edge.target_id)) {
      errors.push(`edges[${index}].target_id references unknown node ${edge.target_id}`);
    }
    if (typeof edge.relation_type !== 'string' || edge.relation_type.trim() === '') {
      errors.push(`edges[${index}].relation_type must be a non-empty string`);
    }
    if (edge.evidence_ids && !Array.isArray(edge.evidence_ids)) {
      errors.push(`edges[${index}].evidence_ids must be an array`);
    }
  });

  document.readiness.forEach((check, index) => {
    for (const key of ['id', 'scope', 'status', 'summary']) {
      if (!Object.prototype.hasOwnProperty.call(check, key)) {
        errors.push(`readiness[${index}].${key}: required property missing`);
      }
    }
    if (check.status && !readinessStatuses.includes(check.status)) {
      errors.push(`readiness[${index}].status: unsupported status ${check.status}`);
    }
  });

  return errors;
}

function expectInvalid(label, document, schema, expectedPattern) {
  const errors = validateSpecGraphDocument(document, schema);
  if (errors.length === 0) {
    fail(`${label}: expected invalid fixture but validation passed`);
    return;
  }
  if (expectedPattern && !errors.some((error) => expectedPattern.test(error))) {
    fail(`${label}: expected error matching ${expectedPattern}, saw ${errors.join('; ')}`);
  }
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

const schema = readJson(schemaPath);
const fixture = readJson(fixturePath);

arrayIncludesAll(schema.required || [], ['specgraph_id', 'mission', 'nodes', 'edges', 'readiness'], 'SpecGraph root required fields');

const nodeKinds = getPath(schema, ['$defs', 'node', 'properties', 'kind', 'enum']) || [];
arrayIncludesAll(nodeKinds, [
  'mission',
  'idea',
  'functional_spec',
  'research_need',
  'evidence',
  'decision',
  'architecture',
  'code_object',
  'risk',
  'build_unit',
  'phase',
  'qa_gate',
  'work_packet',
  'handoff_packet',
  'reusable_pattern',
], 'SpecGraph node kind enum');

const statuses = getPath(schema, ['$defs', 'node', 'properties', 'status', 'enum']) || [];
arrayIncludesAll(statuses, [
  'raw',
  'clarified',
  'proposed',
  'needs_research',
  'spec_candidate',
  'accepted',
  'locked_core',
  'architecture_ready',
  'build_ready',
  'in_progress',
  'validated',
  'reusable',
  'archived',
], 'SpecGraph node status enum');

const relationType = getPath(schema, ['$defs', 'edge', 'properties', 'relation_type']);
assert(relationType && relationType.type === 'string', 'SpecGraph edge relation_type must be a string until a Point-approved relation enum exists');

const readinessStatuses = getPath(schema, ['$defs', 'readiness_check', 'properties', 'status', 'enum']) || [];
arrayIncludesAll(readinessStatuses, ['passed', 'warning', 'blocked', 'not_applicable'], 'SpecGraph readiness status enum');

const scenarioPackageSpecGraphErrors = validateSpecGraphDocument(fixture, schema);
assert(scenarioPackageSpecGraphErrors.length > 0, 'SpecGraph scenario package must be detected as not directly matching schemas/specgraph.schema.json');

assert(fixture.status === 'static_mock_only', 'SpecGraph demo fixture must remain static_mock_only');
assert(Array.isArray(fixture.guardrails), 'SpecGraph demo fixture must include guardrails');
arrayIncludesAll(fixture.guardrails, [
  'No backend',
  'No API',
  'No auth',
  'No database',
  'No deployment',
  'No runtime mutation',
  'No real AI execution',
  'No external connectors',
  'No MCP',
  'No parser/LSP/indexing',
  'No repo ingestion',
  'No repo writes',
  'No source-code upload',
  'No new dependencies without Point lock',
], 'SpecGraph demo fixture guardrails');

const expectedScenarios = [
  ['scenario-portfolio', 'low', 'guided_flow'],
  ['scenario-powerbi-databricks', 'medium', 'lineage_impact_map'],
  ['scenario-openclaw-config', 'high', 'control_plane'],
  ['scenario-code-object-lens', 'technical', 'code_review_lens'],
];

assert(Array.isArray(fixture.scenarios), 'SpecGraph demo fixture must include scenarios array');
assert(fixture.scenarios && fixture.scenarios.length === expectedScenarios.length, `SpecGraph demo fixture must include ${expectedScenarios.length} scenarios`);

const scenarioIds = new Set();
for (const [id, complexity, lens] of expectedScenarios) {
  const scenario = (fixture.scenarios || []).find((item) => item.id === id);
  assert(Boolean(scenario), `SpecGraph demo fixture missing scenario ${id}`);
  if (scenario) {
    assert(scenario.complexity === complexity, `${id} complexity must be ${complexity}`);
    assert(scenario.best_lens === lens, `${id} best_lens must be ${lens}`);
    assert(typeof scenario.pattern === 'string' && scenario.pattern.trim() !== '', `${id} must include reusable pattern`);
    assert(!scenarioIds.has(scenario.id), `Scenario id duplicated: ${scenario.id}`);
    scenarioIds.add(scenario.id);
  }
}

const validSpecGraph = {
  specgraph_id: 'specgraph-demo-valid',
  title: 'Valid SpecGraph QA fixture',
  mission: {
    id: 'mission-1',
    kind: 'mission',
    title: 'Builder Enablement OS',
    summary: 'SpecGraph-first mission.',
    status: 'locked_core',
  },
  nodes: [
    {
      id: 'spec-1',
      kind: 'functional_spec',
      title: 'SpecGraph primary artifact',
      summary: 'Functional spec derives from accepted ideas.',
      status: 'accepted',
      evidence_ids: ['ev-1'],
    },
    {
      id: 'handoff-1',
      kind: 'handoff_packet',
      title: 'Builder handoff packet',
      summary: 'Bounded handoff preview.',
      status: 'build_ready',
      acceptance_criteria: ['Validation commands are listed.'],
    },
    {
      id: 'pattern-1',
      kind: 'reusable_pattern',
      title: 'Validated reusable pattern',
      summary: 'Pattern requires a quality gate before reuse.',
      status: 'validated',
    },
  ],
  edges: [
    {
      id: 'edge-1',
      source_id: 'mission-1',
      target_id: 'spec-1',
      relation_type: 'frames',
    },
    {
      id: 'edge-2',
      source_id: 'spec-1',
      target_id: 'handoff-1',
      relation_type: 'derives_handoff',
      evidence_ids: ['ev-1'],
    },
  ],
  readiness: [
    {
      id: 'ready-1',
      scope: 'handoff',
      status: 'passed',
      summary: 'Mission, spec, handoff, and quality gates are present.',
    },
  ],
};

const validErrors = validateSpecGraphDocument(validSpecGraph, schema);
if (validErrors.length) {
  fail(`valid SpecGraph QA fixture failed validation: ${validErrors.join('; ')}`);
}

const invalidKind = clone(validSpecGraph);
invalidKind.nodes[0].kind = 'canvas_block';
expectInvalid('negative invalid node kind', invalidKind, schema, /unsupported kind/);

const invalidStatus = clone(validSpecGraph);
invalidStatus.nodes[0].status = 'auto_executed';
expectInvalid('negative invalid node status', invalidStatus, schema, /unsupported status/);

const missingMission = clone(validSpecGraph);
delete missingMission.mission;
expectInvalid('negative missing mission', missingMission, schema, /mission/);

const unknownEdgeTarget = clone(validSpecGraph);
unknownEdgeTarget.edges[0].target_id = 'missing-node';
expectInvalid('negative unknown edge target', unknownEdgeTarget, schema, /unknown node/);

const rawPattern = clone(validSpecGraph);
rawPattern.nodes[2].status = 'raw';
expectInvalid('negative raw reusable pattern', rawPattern, schema, /reusable_pattern/);

const handoffNoCriteria = clone(validSpecGraph);
handoffNoCriteria.nodes[1].acceptance_criteria = [];
expectInvalid('negative handoff without acceptance criteria', handoffNoCriteria, schema, /handoff_packet/);

const backendFixture = clone(fixture);
backendFixture.guardrails = backendFixture.guardrails.filter((item) => item !== 'No backend');
assert(!backendFixture.guardrails.includes('No backend'), 'negative backend guardrail mutation must remove No backend so the checker can detect the missing guardrail');

if (failures.length) {
  console.error('check_specgraph_fixtures: FAIL');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('check_specgraph_fixtures: PASS');

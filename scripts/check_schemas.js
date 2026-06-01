const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

function toPosix(relativePath) {
  return relativePath.split(path.sep).join('/');
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function listJsonFiles(relativeDir) {
  const absoluteDir = path.join(root, relativeDir);
  if (!fs.existsSync(absoluteDir)) {
    return [];
  }

  return fs
    .readdirSync(absoluteDir)
    .filter((file) => file.endsWith('.json'))
    .map((file) => toPosix(path.join(relativeDir, file)));
}

function typeMatches(value, expectedType) {
  switch (expectedType) {
    case 'array':
      return Array.isArray(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'integer':
      return Number.isInteger(value);
    case 'null':
      return value === null;
    case 'number':
      return typeof value === 'number' && Number.isFinite(value);
    case 'object':
      return value !== null && typeof value === 'object' && !Array.isArray(value);
    case 'string':
      return typeof value === 'string';
    default:
      return true;
  }
}

function valueType(value) {
  if (Array.isArray(value)) return 'array';
  if (value === null) return 'null';
  return typeof value;
}

function resolveLocalRef(schemaRoot, ref) {
  if (!ref.startsWith('#/')) {
    throw new Error(`Only local JSON schema refs are supported: ${ref}`);
  }

  return ref
    .slice(2)
    .split('/')
    .reduce((current, part) => {
      const key = part.replace(/~1/g, '/').replace(/~0/g, '~');
      return current[key];
    }, schemaRoot);
}

function validateValue(value, schema, schemaRoot, label, failures) {
  if (!schema || typeof schema !== 'object') {
    return;
  }

  if (schema.$ref) {
    validateValue(value, resolveLocalRef(schemaRoot, schema.$ref), schemaRoot, label, failures);
    return;
  }

  if (schema.allOf) {
    for (const childSchema of schema.allOf) {
      validateValue(value, childSchema, schemaRoot, label, failures);
    }
  }

  if (schema.anyOf) {
    const anyFailures = schema.anyOf.map((childSchema) => {
      const childFailures = [];
      validateValue(value, childSchema, schemaRoot, label, childFailures);
      return childFailures;
    });
    if (!anyFailures.some((childFailures) => childFailures.length === 0)) {
      failures.push(`${label}: did not match any allowed schema`);
    }
  }

  if (schema.oneOf) {
    const matchCount = schema.oneOf.filter((childSchema) => {
      const childFailures = [];
      validateValue(value, childSchema, schemaRoot, label, childFailures);
      return childFailures.length === 0;
    }).length;
    if (matchCount !== 1) {
      failures.push(`${label}: matched ${matchCount} oneOf schemas`);
    }
  }

  if (Object.prototype.hasOwnProperty.call(schema, 'const') && value !== schema.const) {
    failures.push(`${label}: expected constant ${JSON.stringify(schema.const)}`);
  }

  if (schema.enum && !schema.enum.some((allowed) => allowed === value)) {
    failures.push(`${label}: expected one of ${schema.enum.map((item) => JSON.stringify(item)).join(', ')}`);
  }

  if (schema.type) {
    const expectedTypes = Array.isArray(schema.type) ? schema.type : [schema.type];
    if (!expectedTypes.some((expectedType) => typeMatches(value, expectedType))) {
      failures.push(`${label}: expected ${expectedTypes.join(' or ')}, got ${valueType(value)}`);
      return;
    }
  }

  if (typeof value === 'string') {
    if (schema.minLength !== undefined && value.length < schema.minLength) {
      failures.push(`${label}: expected minLength ${schema.minLength}`);
    }
    if (schema.maxLength !== undefined && value.length > schema.maxLength) {
      failures.push(`${label}: expected maxLength ${schema.maxLength}`);
    }
    if (schema.pattern && !(new RegExp(schema.pattern).test(value))) {
      failures.push(`${label}: did not match pattern ${schema.pattern}`);
    }
    if (schema.format === 'date-time' && Number.isNaN(Date.parse(value))) {
      failures.push(`${label}: expected date-time`);
    }
    if (schema.format === 'date' && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      failures.push(`${label}: expected date`);
    }
    if (schema.format === 'uri') {
      try {
        new URL(value);
      } catch (_error) {
        failures.push(`${label}: expected URI`);
      }
    }
  }

  if (typeof value === 'number') {
    if (schema.minimum !== undefined && value < schema.minimum) {
      failures.push(`${label}: expected minimum ${schema.minimum}`);
    }
    if (schema.maximum !== undefined && value > schema.maximum) {
      failures.push(`${label}: expected maximum ${schema.maximum}`);
    }
  }

  if (Array.isArray(value)) {
    if (schema.minItems !== undefined && value.length < schema.minItems) {
      failures.push(`${label}: expected at least ${schema.minItems} items`);
    }
    if (schema.maxItems !== undefined && value.length > schema.maxItems) {
      failures.push(`${label}: expected at most ${schema.maxItems} items`);
    }
    if (schema.items) {
      value.forEach((item, index) => {
        validateValue(item, schema.items, schemaRoot, `${label}[${index}]`, failures);
      });
    }
  }

  if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
    const properties = schema.properties || {};
    const required = schema.required || [];

    for (const propertyName of required) {
      if (!Object.prototype.hasOwnProperty.call(value, propertyName)) {
        failures.push(`${label}.${propertyName}: required property missing`);
      }
    }

    for (const [propertyName, propertyValue] of Object.entries(value)) {
      if (properties[propertyName]) {
        validateValue(propertyValue, properties[propertyName], schemaRoot, `${label}.${propertyName}`, failures);
        continue;
      }

      if (schema.additionalProperties === false) {
        failures.push(`${label}.${propertyName}: additional property is not allowed`);
      } else if (schema.additionalProperties && typeof schema.additionalProperties === 'object') {
        validateValue(propertyValue, schema.additionalProperties, schemaRoot, `${label}.${propertyName}`, failures);
      }
    }
  }
}

function validateDocument(schemaPath, documentPath) {
  const schema = readJson(schemaPath);
  const document = readJson(documentPath);
  const failures = [];
  validateValue(document, schema, schema, documentPath, failures);
  return failures;
}

const validationTargets = [
  {
    schema: 'docs/design-system/schemas/openclaw-mock-data.schema.json',
    documents: ['docs/design-system/mock-data/openclaw.mock-data.v1.json'],
  },
  {
    schema: 'docs/design-system/schemas/screen-contract.schema.json',
    documents: listJsonFiles('docs/design-system/schemas/screen-contracts'),
  },
  {
    schema: 'schemas/artifact_manifest.schema.json',
    documents: listJsonFiles('artifacts/packages').filter((file) => file.endsWith('.manifest.json')),
  },
  {
    schema: 'schemas/handoff_packet_preview.schema.json',
    documents: ['apps/static-mvp/handoff/handoff-placeholder.json'].filter(exists),
  },
  {
    schema: 'schemas/task_card.schema.json',
    documents: listJsonFiles('.codex/goals'),
  },
];

const failures = [];
let checkedCount = 0;

for (const target of validationTargets) {
  if (!exists(target.schema)) {
    failures.push(`${target.schema}: schema file missing`);
    continue;
  }

  for (const documentPath of target.documents) {
    checkedCount += 1;
    failures.push(...validateDocument(target.schema, documentPath));
  }
}

if (failures.length > 0) {
  console.error('Schema validation failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`check_schemas: PASS (${checkedCount} documents checked)`);

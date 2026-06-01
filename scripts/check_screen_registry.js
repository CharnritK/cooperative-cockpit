const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const registryPath = path.join(root, 'docs/design-system/06_SCREEN_REGISTRY.md');
const contractsDir = path.join(root, 'docs/design-system/schemas/screen-contracts');
const evidenceDirs = [
  path.join(root, 'artifacts/evidence/design-system'),
  path.join(root, 'docs/design-system/evidence'),
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function normalizeScalar(value) {
  return String(value || '')
    .replace(/`/g, '')
    .replace(/\s*\/\s*/g, '/')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function normalizeList(value) {
  if (Array.isArray(value)) {
    return value.map(normalizeScalar).filter(Boolean).sort();
  }
  return String(value || '')
    .split(',')
    .map(normalizeScalar)
    .filter(Boolean)
    .sort();
}

function normalizeHeader(value) {
  return normalizeScalar(value).replace(/[^a-z0-9]/g, '');
}

function parseRegistryRows(markdown) {
  const lines = markdown.split(/\r?\n/).filter((line) => line.trim().startsWith('|'));
  const headerLine = lines.find((line) => normalizeScalar(line).includes('screen'));
  if (!headerLine) {
    return [];
  }

  const headers = headerLine
    .split('|')
    .slice(1, -1)
    .map((cell) => normalizeHeader(cell));
  const screenIdIndex = headers.findIndex((header) => header === 'screenid' || header === 'screen');
  if (screenIdIndex === -1) {
    return [];
  }

  return lines
    .map((line) => {
      const cells = line
        .split('|')
        .slice(1, -1)
        .map((cell) => cell.trim());
      return cells;
    })
    .filter((cells) => /^screen-\d+/i.test(cells[screenIdIndex] || ''))
    .map((cells) => {
      const row = {};
      headers.forEach((header, index) => {
        row[header] = cells[index] || '';
      });
      return row;
    });
}

function findCell(row, candidates) {
  for (const candidate of candidates) {
    const normalized = normalizeHeader(candidate);
    if (Object.prototype.hasOwnProperty.call(row, normalized)) {
      return row[normalized];
    }
  }
  return '';
}

function getContractValue(contract, candidates) {
  for (const candidate of candidates) {
    if (Object.prototype.hasOwnProperty.call(contract, candidate)) {
      return contract[candidate];
    }
  }
  return undefined;
}

function collectEvidenceText() {
  let text = '';
  for (const evidenceDir of evidenceDirs) {
    if (!fs.existsSync(evidenceDir)) {
      continue;
    }

    for (const fileName of fs.readdirSync(evidenceDir)) {
      if (fileName.endsWith('.md')) {
        text += `\n${fs.readFileSync(path.join(evidenceDir, fileName), 'utf8')}`;
      }
    }
  }
  return text;
}

const registryMarkdown = fs.readFileSync(registryPath, 'utf8');
const registryRows = parseRegistryRows(registryMarkdown);
const contractFiles = fs.existsSync(contractsDir)
  ? fs.readdirSync(contractsDir).filter((file) => file.endsWith('.json'))
  : [];
const contractsById = new Map();
const failures = [];

for (const fileName of contractFiles) {
  const contract = readJson(path.join(contractsDir, fileName));
  const screenId = contract.screenId || path.basename(fileName, '.json');
  contractsById.set(screenId, contract);
}

const registryById = new Map();
for (const row of registryRows) {
  const screenId = findCell(row, ['screenId', 'screen id', 'screen']);
  if (screenId) {
    registryById.set(screenId, row);
  }
}

for (const screenId of contractsById.keys()) {
  if (!registryById.has(screenId)) {
    failures.push(`${screenId}: contract exists without a registry row`);
  }
}

const evidenceText = collectEvidenceText();

for (const [screenId, row] of registryById.entries()) {
  const status = normalizeScalar(findCell(row, ['implementationStatus', 'implementation status', 'status']));
  const contract = contractsById.get(screenId);

  if (!contract) {
    if (status === 'implemented') {
      failures.push(`${screenId}: implemented registry row is missing a screen contract`);
    }
    continue;
  }

  const scalarComparisons = [
    [['screenName', 'name'], ['screenName', 'screen name', 'name']],
    [['route'], ['route']],
    [['artifactObjectServed', 'artifact'], ['artifactObjectServed', 'artifact object served', 'artifact']],
    [['approvalStatus'], ['approvalStatus', 'approval status']],
    [['owner'], ['owner']],
    [['implementationStatus'], ['implementationStatus', 'implementation status', 'status']],
  ];

  for (const [contractFields, registryFields] of scalarComparisons) {
    const contractValue = getContractValue(contract, contractFields);
    const registryValue = findCell(row, registryFields);
    if (
      contractValue !== undefined &&
      registryValue !== '' &&
      normalizeScalar(contractValue) !== normalizeScalar(registryValue)
    ) {
      failures.push(`${screenId}: ${contractFields[0]} differs between registry and contract`);
    }
  }

  const listComparisons = [
    [['requiredComponents'], ['requiredComponents', 'required components']],
    [['dataContract'], ['dataContract', 'data contract']],
    [['statesRequired'], ['statesRequired', 'states required']],
  ];

  for (const [contractFields, registryFields] of listComparisons) {
    const contractValue = getContractValue(contract, contractFields);
    const registryValue = findCell(row, registryFields);
    if (contractValue !== undefined && registryValue !== '') {
      const contractList = normalizeList(contractValue);
      const registryList = normalizeList(registryValue);
      if (contractList.join('|') !== registryList.join('|')) {
        failures.push(`${screenId}: ${contractFields[0]} differs between registry and contract`);
      }
    }
  }

  if (status === 'implemented' && !evidenceText.includes(screenId)) {
    failures.push(`${screenId}: implemented screen has no evidence reference`);
  }
}

if (failures.length > 0) {
  console.error('Screen registry validation failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`check_screen_registry: PASS (${contractsById.size} contracts, ${registryById.size} registry rows)`);

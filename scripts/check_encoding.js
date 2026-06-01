const fs = require('fs');
const path = require('path');

const ignoredDirs = new Set([
  '.git',
  'node_modules',
  'cooperative-cockpit-repo-setup-final',
]);

const textExtensions = new Set([
  '.css',
  '.html',
  '.js',
  '.json',
  '.md',
  '.mjs',
  '.svg',
  '.ts',
  '.txt',
  '.yaml',
  '.yml',
]);

const suspiciousMojibake = [
  ['เน', 'โฌ'].join(''),
  ['โ', '€'].join(''),
  ['ย', 'Run'].join(''),
  ['ย', '"Run'].join(''),
];

function shouldScan(filePath) {
  return textExtensions.has(path.extname(filePath).toLowerCase());
}

function walk(dir, findings) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(process.cwd(), fullPath);

    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) {
        walk(fullPath, findings);
      }
      continue;
    }

    if (!entry.isFile() || !shouldScan(fullPath)) {
      continue;
    }

    const bytes = fs.readFileSync(fullPath);
    if (bytes.length >= 3 && bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf) {
      findings.push(`${relativePath}: UTF-8 BOM detected`);
    }

    const text = bytes.toString('utf8');
    for (const marker of suspiciousMojibake) {
      if (text.includes(marker)) {
        findings.push(`${relativePath}: suspicious mojibake marker "${marker}" detected`);
        break;
      }
    }
  }
}

const findings = [];
walk(process.cwd(), findings);

if (findings.length > 0) {
  console.error('Encoding check failed:');
  for (const finding of findings) {
    console.error(`- ${finding}`);
  }
  process.exit(1);
}

console.log('check_encoding: PASS');

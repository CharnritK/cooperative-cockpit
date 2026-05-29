const fs = require('fs');
const path = require('path');

const root = process.cwd();
const skipDirs = new Set(['.git', 'node_modules', 'cooperative-cockpit-repo-setup-final']);
const textExtensions = new Set([
  '.css',
  '.html',
  '.js',
  '.json',
  '.md',
  '.svg',
  '.txt',
  '.yml',
  '.yaml'
]);

const secretPatterns = [
  /-----BEGIN (?:RSA |DSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /\b(?:api[_-]?key|secret|token|password)\b\s*[:=]\s*["']?(?!your-|example|placeholder|changeme|<|$)[A-Za-z0-9_./+=-]{16,}/i
];

const findings = [];

function scanFile(file) {
  const relative = path.relative(root, file);
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);

  lines.forEach((line, index) => {
    if (secretPatterns.some((pattern) => pattern.test(line))) {
      findings.push(`${relative}:${index + 1}`);
    }
  });
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!skipDirs.has(entry.name)) {
        walk(path.join(dir, entry.name));
      }
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (textExtensions.has(ext) || entry.name === '.env.example' || entry.name === '.gitignore') {
      scanFile(path.join(dir, entry.name));
    }
  }
}

walk(root);

if (findings.length > 0) {
  console.error('check_no_secrets: FAIL - possible secrets found at:');
  for (const finding of findings) {
    console.error(`- ${finding}`);
  }
  process.exit(1);
}

console.log('check_no_secrets: PASS');

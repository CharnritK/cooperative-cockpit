const fs = require('fs');
const path = require('path');

const ignoredDirs = new Set([
  '.git',
  'node_modules',
  'cooperative-cockpit-repo-setup-final',
]);

const textExtensions = new Set([
  '.css',
  '.env',
  '.example',
  '.html',
  '.js',
  '.json',
  '.md',
  '.mjs',
  '.svg',
  '.toml',
  '.ts',
  '.txt',
  '.yaml',
  '.yml',
]);

const secretPatterns = [
  {
    name: 'private_key_block',
    pattern: /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/i,
  },
  {
    name: 'github_token',
    pattern: /\b(?:gh[pousr]_[A-Za-z0-9_]{36,255}|github_pat_[A-Za-z0-9_]{20,255})\b/,
  },
  {
    name: 'aws_access_key_id',
    pattern: /\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/,
  },
  {
    name: 'slack_token',
    pattern: /\bxox[abprs]-[A-Za-z0-9-]{10,}\b/,
  },
  {
    name: 'google_api_key',
    pattern: /\bAIza[0-9A-Za-z_-]{35}\b/,
  },
  {
    name: 'jwt',
    pattern: /\beyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/,
  },
  {
    name: 'sensitive_assignment',
    pattern: /\b(?:api[_-]?key|secret|token|password)\b\s*[:=]\s*['"]?(?!REPLACE|PLACEHOLDER|example|sample|changeme|dummy|fake|fixture|test|<|YOUR_|your-|xxx)[A-Za-z0-9_./+=-]{16,}/i,
  },
];

function shouldScan(filePath) {
  const parsed = path.parse(filePath);
  if (parsed.base === '.env.example') {
    return true;
  }
  if (textExtensions.has(parsed.ext.toLowerCase())) {
    return true;
  }
  return parsed.ext === '' && parsed.base.includes('.');
}

function detectSecretsInText(text) {
  const findings = [];

  for (const { name, pattern } of secretPatterns) {
    const matches = text.match(pattern);
    if (matches) {
      findings.push({
        name,
        sample: matches[0].slice(0, 24),
      });
    }
  }

  return findings;
}

function walk(dir, findings) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(process.cwd(), fullPath);

    if (entry.isDirectory()) {
      if (ignoredDirs.has(entry.name)) {
        continue;
      }
      walk(fullPath, findings);
      continue;
    }

    if (!entry.isFile() || !shouldScan(fullPath)) {
      continue;
    }

    const text = fs.readFileSync(fullPath, 'utf8');
    const matches = detectSecretsInText(text);

    for (const match of matches) {
      findings.push({
        path: relativePath,
        ...match,
      });
    }
  }
}

function runSecretScan(rootDir = process.cwd()) {
  const findings = [];
  walk(rootDir, findings);
  return findings;
}

if (require.main === module) {
  const findings = runSecretScan(process.cwd());

  if (findings.length > 0) {
    console.error('Potential secrets detected:');
    for (const finding of findings) {
      console.error(`- ${finding.path}: ${finding.name}`);
    }
    process.exit(1);
  }

  console.log('Secret scan passed.');
}

module.exports = {
  detectSecretsInText,
  runSecretScan,
  secretPatterns,
};

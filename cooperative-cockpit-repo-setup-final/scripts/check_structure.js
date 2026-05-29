const fs = require('fs');

// Define required files and directories for the repository setup
const requiredPaths = [
  'AGENTS.md',
  'README.md',
  'package.json',
  '.gitignore',
  '.env.example',
  'apps/README.md',
  'artifacts/MANIFEST_TEMPLATE.json',
  'docs/ops/CONCURRENCY_POLICY.md',
  'scripts/check_gitignore.js'
];

let missing = [];
for (const p of requiredPaths) {
  if (!fs.existsSync(p)) {
    missing.push(p);
  }
}

if (missing.length > 0) {
  console.error('check_structure: FAIL – missing files or directories:', missing.join(', '));
  process.exit(1);
} else {
  console.log('check_structure: PASS');
}
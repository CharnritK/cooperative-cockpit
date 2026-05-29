const fs = require('fs');

// Define required files and directories for the repository setup
const requiredPaths = [
  'AGENTS.md',
  'README.md',
  'package.json',
  '.gitignore',
  '.env.example',
  'apps/README.md',
  'apps/static-mvp/index.html',
  'apps/static-mvp/README.md',
  'apps/static-mvp/BUILD_SPEC.md',
  'apps/static-mvp/QA_CHECKLIST.md',
  'apps/static-mvp/src/app.js',
  'apps/static-mvp/styles/base.css',
  'apps/static-mvp/assets/favicon.svg',
  'artifacts/MANIFEST_TEMPLATE.json',
  'artifacts/packages/openclaw-cooperative-cockpit-mvp.manifest.json',
  'docs/ops/CONCURRENCY_POLICY.md',
  'docs/ops/STATUS.md',
  'scripts/check_gitignore.js',
  'scripts/check_json.js',
  'scripts/check_no_secrets.js',
  'scripts/check_task_cards.js'
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

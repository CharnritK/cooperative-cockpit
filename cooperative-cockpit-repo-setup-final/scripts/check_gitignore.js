const { execSync } = require('child_process');

// Critical files that must never be ignored by .gitignore
const criticalFiles = [
  'AGENTS.md',
  'package.json',
  'scripts/check_no_secrets.js',
  'scripts/check_structure.js',
  '.codex/GOAL_TEMPLATE.md',
  'docs/ops/APPROVAL_POLICY.md'
];

function isIgnored(file) {
  try {
    const output = execSync(`git check-ignore -v ${file}`, { stdio: 'pipe' }).toString().trim();
    return output !== '';
  } catch (err) {
    // git may not be available in the environment; assume not ignored
    return false;
  }
}

const ignored = criticalFiles.filter(isIgnored);

if (ignored.length > 0) {
  console.error('check_gitignore: FAIL – critical files are ignored by .gitignore:', ignored.join(', '));
  process.exit(1);
} else {
  console.log('check_gitignore: PASS');
}
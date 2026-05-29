const { spawnSync } = require('child_process');

// Critical files that must never be ignored by .gitignore
const criticalFiles = [
  'AGENTS.md',
  'package.json',
  'scripts/check_no_secrets.js',
  'scripts/check_structure.js',
  '.codex/GOAL_TEMPLATE.md',
  'docs/ops/APPROVAL_POLICY.md'
];

function runGit(args) {
  const result = spawnSync('git', args, { encoding: 'utf8' });
  return {
    status: result.status,
    stdout: (result.stdout || '').trim(),
    stderr: (result.stderr || '').trim(),
    error: result.error
  };
}

function describeGitFailure(result) {
  if (result.error) {
    return result.error.code === 'ENOENT'
      ? 'git executable was not found'
      : result.error.message;
  }

  return result.stderr || result.stdout || `git exited with status ${result.status}`;
}

function ensureGitWorkTree() {
  const result = runGit(['rev-parse', '--is-inside-work-tree']);

  if (result.error) {
    return {
      ok: false,
      message: `git unavailable: ${describeGitFailure(result)}`
    };
  }

  if (result.status !== 0) {
    return {
      ok: false,
      message: `not inside a git work tree: ${describeGitFailure(result)}`
    };
  }

  if (result.stdout !== 'true') {
    return {
      ok: false,
      message: `not inside a git work tree: git rev-parse returned ${result.stdout || '(empty output)'}`
    };
  }

  return { ok: true };
}

function checkIgnore(file) {
  const result = runGit(['check-ignore', '-v', '--', file]);

  if (result.error) {
    return {
      file,
      state: 'error',
      detail: describeGitFailure(result)
    };
  }

  if (result.status === 0) {
    return {
      file,
      state: 'ignored',
      detail: result.stdout || '(ignored, but git did not report a matching rule)'
    };
  }

  if (result.status === 1) {
    return {
      file,
      state: 'not_ignored'
    };
  }

  return {
    file,
    state: 'error',
    detail: describeGitFailure(result)
  };
}

const workTree = ensureGitWorkTree();
if (!workTree.ok) {
  console.error(`check_gitignore: FAIL - ${workTree.message}`);
  process.exit(1);
}

const results = criticalFiles.map(checkIgnore);
const ignored = results.filter((result) => result.state === 'ignored');
const errors = results.filter((result) => result.state === 'error');

if (errors.length > 0) {
  console.error('check_gitignore: FAIL - unexpected git command error');
  errors.forEach((result) => {
    console.error(`- ${result.file}: ${result.detail}`);
  });
  process.exit(1);
}

if (ignored.length > 0) {
  console.error('check_gitignore: FAIL - critical files are ignored by .gitignore');
  ignored.forEach((result) => {
    console.error(`- ${result.file}: ${result.detail}`);
  });
  process.exit(1);
}

console.log('check_gitignore: PASS');

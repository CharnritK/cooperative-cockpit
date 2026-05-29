const fs = require('fs');
const path = require('path');

const root = process.cwd();
const skipDirs = new Set(['.git', 'node_modules', 'cooperative-cockpit-repo-setup-final']);
const failures = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!skipDirs.has(entry.name)) {
        walk(path.join(dir, entry.name));
      }
      continue;
    }

    if (!entry.isFile() || !entry.name.endsWith('.json')) {
      continue;
    }

    const file = path.join(dir, entry.name);
    const relative = path.relative(root, file);

    try {
      JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (error) {
      failures.push(`${relative}: ${error.message}`);
    }
  }
}

walk(root);

if (failures.length > 0) {
  console.error('check_json: FAIL');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('check_json: PASS');

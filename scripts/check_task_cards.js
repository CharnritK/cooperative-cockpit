const fs = require('fs');
const path = require('path');

const root = process.cwd();
const taskDirs = ['workspace/inbox', 'workspace/outbox', 'workspace/review'];
const requiredFields = ['task_id', 'description', 'assigned_agent', 'start_date', 'status'];
const failures = [];
let checked = 0;

function validateTaskCard(file) {
  const relative = path.relative(root, file);
  let data;

  try {
    data = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    failures.push(`${relative}: invalid JSON (${error.message})`);
    return;
  }

  for (const field of requiredFields) {
    if (!(field in data)) {
      failures.push(`${relative}: missing required field ${field}`);
    }
  }
}

for (const dir of taskDirs) {
  const absolute = path.join(root, dir);
  if (!fs.existsSync(absolute)) {
    continue;
  }

  for (const entry of fs.readdirSync(absolute, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith('.json')) {
      checked += 1;
      validateTaskCard(path.join(absolute, entry.name));
    }
  }
}

if (failures.length > 0) {
  console.error('check_task_cards: FAIL');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`check_task_cards: PASS (${checked} task cards checked)`);

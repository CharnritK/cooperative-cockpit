const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const checklistPath = path.join(root, 'docs/design-system/12_GOVERNANCE_CHECKLIST.md');

if (!fs.existsSync(checklistPath)) {
  console.log('check_open_gates: WARN - governance checklist not found');
  process.exit(0);
}

const checklist = fs.readFileSync(checklistPath, 'utf8');
const openGates = checklist
  .split(/\r?\n/)
  .filter((line) => /^\s*-\s*\[\s\]\s+/.test(line))
  .map((line) => line.replace(/^\s*-\s*\[\s\]\s+/, '').trim());

if (openGates.length === 0) {
  console.log('check_open_gates: PASS - no open governance gates');
  process.exit(0);
}

console.log(`check_open_gates: WARN (${openGates.length} open) - open governance gates remain:`);
for (const gate of openGates) {
  console.log(`- ${gate}`);
}

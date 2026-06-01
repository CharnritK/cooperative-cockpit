const assert = require('node:assert/strict');

const { detectSecretsInText } = require('../../scripts/check_no_secrets');

function test(name, fn) {
  try {
    fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    console.error(error);
    process.exitCode = 1;
  }
}

test('detects modern token families', () => {
  const github = 'ghp_' + 'a'.repeat(36);
  const aws = 'AKIA' + 'A'.repeat(16);
  const slack = 'xoxb-' + 'a'.repeat(20);
  const google = 'AIza' + 'a'.repeat(35);
  const jwt = 'eyJ' + 'a'.repeat(12) + '.eyJ' + 'b'.repeat(12) + '.' + 'c'.repeat(12);

  const findings = detectSecretsInText([
    github,
    aws,
    slack,
    google,
    jwt,
  ].join('\n')).map((finding) => finding.name);

  assert(findings.includes('github_token'));
  assert(findings.includes('aws_access_key_id'));
  assert(findings.includes('slack_token'));
  assert(findings.includes('google_api_key'));
  assert(findings.includes('jwt'));
});

test('allows placeholder secret values', () => {
  const findings = detectSecretsInText([
    'API_KEY=REPLACE_ME',
    'token=<YOUR_TOKEN>',
    'password=changeme',
    'API_KEY=your-api-key-here',
    'token=dummy0123456789abcd',
    'password=fakefakefakefakefake',
  ].join('\n'));

  assert.equal(findings.length, 0);
});

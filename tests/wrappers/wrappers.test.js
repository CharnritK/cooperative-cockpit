const assert = require("node:assert/strict");

const copilot = require("../../scripts/copilot-wrapper");
const codex = require("../../scripts/codex-wrapper");

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

test("copilot planner command uses Claude Opus 4.7 plan mode", () => {
  const args = copilot.buildCopilotCommandArgs("planner", "Plan this.");
  assert.equal(args[args.indexOf("--model") + 1], "claude-opus-4.7");
  assert.equal(args[args.indexOf("--mode") + 1], "plan");
  assert(args.includes("--deny-tool"));
  assert(args[args.indexOf("-p") + 1].includes("Planner agent"));
});

test("copilot reviewer command denies write, publish, install, network, and merge tools", () => {
  const args = copilot.buildCopilotCommandArgs("reviewer", "Review this.");
  assert.equal(args[args.indexOf("--model") + 1], "claude-opus-4.7");
  const denyTools = args
    .map((value, index) => (value === "--deny-tool" ? args[index + 1] : null))
    .filter(Boolean);
  assert(denyTools.includes("write"));
  assert(denyTools.includes("shell(git push)"));
  assert(denyTools.includes("shell(git rebase)"));
  assert(denyTools.includes("shell(gh pr merge)"));
  assert(denyTools.includes("shell(gh repo create)"));
  assert(denyTools.includes("shell(gh release create)"));
  assert(denyTools.includes("shell(npm install)"));
  assert(denyTools.includes("shell(curl:*)"));
  assert(denyTools.includes("shell(Set-Content:*)"));
});

test("copilot parser rejects manager and coder roles", () => {
  assert.equal(copilot.parseCopilotCliArgs(["manager", "Plan"]).kind, "role-rejected");
  assert.equal(copilot.parseCopilotCliArgs(["coder", "Build"]).kind, "role-rejected");
});

test("runCopilotCli invokes injected spawn for valid args", () => {
  const calls = [];
  const exitCode = copilot.runCopilotCli(["reviewer", "Review"], {
    platform: "linux",
    customSpawnSync(command, args) {
      calls.push({ command, args });
      return { status: 0 };
    },
  });
  assert.equal(exitCode, 0);
  assert.equal(calls[0].command, "gh");
  assert.equal(calls[0].args[0], "--version");
  assert.equal(calls[1].command, "gh");
});

test("codex manager command uses GPT 5.5 xhigh in read-only mode", () => {
  const args = codex.buildCodexCommandArgs("manager", "Plan.", "/repo");
  assert.equal(args[args.indexOf("--model") + 1], "gpt-5.5");
  assert.equal(args[args.indexOf("--sandbox") + 1], "read-only");
  assert(args.includes('model_reasoning_effort="xhigh"'));
});

test("codex coder command uses GPT 5.3 Codex xhigh in workspace-write with allowed paths", () => {
  const args = codex.buildCodexCommandArgs("coder", "Implement fix.", "/repo", [
    "scripts/a.js",
    "tests/a.test.js",
  ]);
  assert.equal(args[args.indexOf("--model") + 1], "gpt-5.3-codex");
  assert.equal(args[args.indexOf("--sandbox") + 1], "workspace-write");
  assert(args.includes('model_reasoning_effort="xhigh"'));
  assert(args[args.length - 1].includes("Allowed paths: scripts/a.js, tests/a.test.js"));
});

test("codex parser rejects unknown roles", () => {
  const parsed = codex.parseCodexCliArgs(["architect", "Plan"]);
  assert.equal(parsed.kind, "error");
});

test("codex parser requires allowed paths for coder", () => {
  const parsed = codex.parseCodexCliArgs(["coder", "Implement fix."], {});
  assert.equal(parsed.kind, "error");
  assert(parsed.message.includes("Coder role requires --allowed-paths"));
});

test("codex parser accepts coder allowed paths from flag", () => {
  const parsed = codex.parseCodexCliArgs([
    "coder",
    "--allowed-paths",
    "scripts/a.js,tests/a.test.js",
    "Implement fix.",
  ], {});
  assert.equal(parsed.kind, "run");
  assert.deepEqual(parsed.allowedPaths, ["scripts/a.js", "tests/a.test.js"]);
  assert.equal(parsed.prompt, "Implement fix.");
});

test("codex parser accepts coder allowed paths from environment", () => {
  const parsed = codex.parseCodexCliArgs(["coder", "Implement fix."], {
    ROLE_WRAPPER_ALLOWED_PATHS: "scripts/a.js, tests/a.test.js",
  });
  assert.equal(parsed.kind, "run");
  assert.deepEqual(parsed.allowedPaths, ["scripts/a.js", "tests/a.test.js"]);
});

test("run helpers do not spawn when imported", () => {
  assert.equal(typeof copilot.runCopilotCli, "function");
  assert.equal(typeof codex.runCodexCli, "function");
});

test("runCodexCli invokes injected spawn for valid args", () => {
  let captured = null;
  const exitCode = codex.runCodexCli(
    ["coder", "--allowed-paths", "scripts/a.js", "Implement"],
    {
      cwd: "/repo",
      env: {},
      platform: "linux",
      customSpawnSync(command, args, options) {
        captured = { command, args, options };
        return { status: 0 };
      },
    }
  );
  assert.equal(exitCode, 0);
  assert.equal(captured.command, "codex");
  assert(captured.args.includes("--model"));
  assert(captured.args[captured.args.length - 1].includes("Allowed paths: scripts/a.js"));
});

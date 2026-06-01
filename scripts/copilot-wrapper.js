#!/usr/bin/env node

const { spawnSync } = require("node:child_process");

const DEFAULT_TIMEOUT_MS = 30 * 60 * 1000;

const ROLE_PROFILES = {
  planner: {
    model: "claude-opus-4.7",
    mode: "plan",
    preface:
      "You are acting as the Planner agent in advisory mode. Inspect the current repository only, do not edit files, do not stage, do not commit, do not push, and provide a practical sequenced implementation plan with explicit assumptions and risks.",
  },
  reviewer: {
    model: "claude-opus-4.7",
    preface:
      "You are acting as the Reviewer agent in advisory mode. Inspect the current repository only, do not edit files, do not stage, do not commit, do not push, and identify concrete bugs, risks, and missing validation points.",
  },
};

const COPILOT_DENY_TOOLS = [
  "write",
  "shell(git add)",
  "shell(git commit)",
  "shell(git push)",
  "shell(git reset)",
  "shell(git checkout)",
  "shell(git switch)",
  "shell(git clean)",
  "shell(git tag)",
  "shell(git rebase)",
  "shell(git revert)",
  "shell(git restore)",
  "shell(git stash)",
  "shell(git worktree)",
  "shell(git rm)",
  "shell(gh pr create)",
  "shell(gh pr edit)",
  "shell(gh pr close)",
  "shell(gh pr merge)",
  "shell(gh issue create)",
  "shell(gh issue edit)",
  "shell(gh repo create)",
  "shell(gh repo delete)",
  "shell(gh repo edit)",
  "shell(gh release:*)",
  "shell(gh release create)",
  "shell(gh release upload)",
  "shell(gh release delete)",
  "shell(gh workflow run)",
  "shell(gh workflow enable)",
  "shell(gh workflow disable)",
  "shell(gh api)",
  "shell(npm install)",
  "shell(npm i)",
  "shell(npm publish)",
  "shell(npx:*)",
  "shell(pip install)",
  "shell(curl:*)",
  "shell(Invoke-WebRequest:*)",
  "shell(Invoke-RestMethod:*)",
  "shell(Set-Content:*)",
  "shell(Out-File:*)",
  "shell(New-Item:*)",
  "shell(Move-Item:*)",
  "shell(Rename-Item:*)",
  "shell(Copy-Item:*)",
  "shell(Remove-Item:*)",
  "shell(rm:*)",
  "shell(del:*)",
];

function usage() {
  return [
    "Usage:",
    "  node scripts/copilot-wrapper.js <role> \"<prompt>\"",
    "",
    "Roles:",
    "  planner   -> claude-opus-4.7 (plan mode)",
    "  reviewer  -> claude-opus-4.7",
    "",
    "Manager/coder roles are intentionally kept outside Copilot (use Codex directly).",
    "",
    "Examples:",
    "  node scripts/copilot-wrapper.js planner \"Review overall architecture and propose improvements.\"",
    "  node scripts/copilot-wrapper.js reviewer \"Run a design review across docs and tests; list critical risks.\"",
    "  node scripts/copilot-wrapper.js planner \"Create 5-step execution plan for the redesign.\"",
  ].join("\n");
}

function isHelpFlag(value) {
  if (typeof value !== "string") {
    return false;
  }
  const lower = value.toLowerCase();
  return lower === "--help" || lower === "-h";
}

function parseCopilotCliArgs(args) {
  if (args.length === 1 && isHelpFlag(args[0])) {
    return { kind: "help" };
  }

  if (args.length < 2) {
    return { kind: "error", message: "Expected role and prompt." };
  }

  const role = args[0];
  if (role === "manager" || role === "coder") {
    return {
      kind: "role-rejected",
      role,
      prompt: args.slice(1).join(" ").trim(),
    };
  }

  if (!ROLE_PROFILES[role]) {
    return { kind: "error", message: `Unknown role "${role}".` };
  }

  if (isHelpFlag(args[1])) {
    return { kind: "help" };
  }

  const prompt = args.slice(1).join(" ").trim();
  if (!prompt) {
    return { kind: "error", message: "Prompt cannot be empty." };
  }

  return { kind: "run", role, prompt };
}

function buildCopilotCommandArgs(role, prompt) {
  const profile = ROLE_PROFILES[role];
  if (!profile) {
    throw new Error(`Unknown role "${role}".`);
  }

  const composedPrompt = `${profile.preface} ${prompt}`.replace(/\r?\n/g, " ").trim();
  const commandArgs = ["copilot", "--", "--silent", "--allow-all-tools", "--disallow-temp-dir"];
  for (const tool of COPILOT_DENY_TOOLS) {
    commandArgs.push("--deny-tool", tool);
  }
  commandArgs.push("-p", composedPrompt, "--model", profile.model);

  if (profile.mode) {
    commandArgs.push("--mode", profile.mode);
  }
  if (profile.effort) {
    commandArgs.push("--reasoning-effort", profile.effort);
  }

  return commandArgs;
}

function getTimeoutMs(env = process.env) {
  const value = Number.parseInt(env.ROLE_WRAPPER_TIMEOUT_MS || "", 10);
  return Number.isFinite(value) && value > 0 ? value : DEFAULT_TIMEOUT_MS;
}

function assertGhAvailable(customSpawnSync = spawnSync) {
  const result = customSpawnSync("gh", ["--version"], {
    stdio: "ignore",
    shell: false,
    timeout: 10_000,
  });
  return !(result.error || result.status !== 0);
}

function quotePowerShell(value) {
  return `'${String(value).replace(/'/g, "''")}'`;
}

function runGhCopilot(
  args,
  {
    customSpawnSync = spawnSync,
    platform = process.platform,
    timeoutMs = getTimeoutMs(),
  } = {}
) {
  if (platform !== "win32") {
    return customSpawnSync("gh", args, {
      stdio: ["ignore", "inherit", "inherit"],
      shell: false,
      timeout: timeoutMs,
    });
  }

  const commandLine = ["&", quotePowerShell("gh"), ...args.map(quotePowerShell)].join(" ");
  return customSpawnSync("powershell.exe", ["-NoProfile", "-NoLogo", "-Command", commandLine], {
    stdio: ["ignore", "inherit", "inherit"],
    shell: false,
    timeout: timeoutMs,
  });
}

function emitUsageError(message, io = console) {
  if (message) {
    io.error(`Error: ${message}`);
  }
  io.error("\n" + usage());
  return 1;
}

function runCopilotCli(
  cliArgs = process.argv.slice(2),
  {
    customSpawnSync = spawnSync,
    platform = process.platform,
    env = process.env,
    io = console,
  } = {}
) {
  const parsed = parseCopilotCliArgs(cliArgs);

  if (parsed.kind === "help") {
    io.log(usage());
    return 0;
  }

  if (parsed.kind === "error") {
    return emitUsageError(parsed.message, io);
  }

  if (parsed.kind === "role-rejected") {
    io.error(
      `Role "${parsed.role}" is now handled by Codex directly. This wrapper only dispatches Claude through GitHub Copilot.\n\n` +
        `Use this prompt in a Codex session instead:\n${parsed.prompt}`
    );
    return 1;
  }

  if (!assertGhAvailable(customSpawnSync)) {
    return emitUsageError(
      "GitHub CLI is not available. Install gh, ensure it is on PATH, and authenticate before running Claude roles.",
      io
    );
  }

  const timeoutMs = getTimeoutMs(env);
  const commandArgs = buildCopilotCommandArgs(parsed.role, parsed.prompt);
  const result = runGhCopilot(commandArgs, { customSpawnSync, platform, timeoutMs });

  if (result.error) {
    io.error(`Failed to execute gh copilot: ${result.error.message}`);
    return 1;
  }

  if (typeof result.status === "number" && result.status !== 0) {
    return result.status;
  }

  return 0;
}

if (require.main === module) {
  process.exit(runCopilotCli());
}

module.exports = {
  COPILOT_DENY_TOOLS,
  DEFAULT_TIMEOUT_MS,
  ROLE_PROFILES,
  assertGhAvailable,
  buildCopilotCommandArgs,
  getTimeoutMs,
  parseCopilotCliArgs,
  quotePowerShell,
  runCopilotCli,
  runGhCopilot,
  usage,
};

#!/usr/bin/env node

const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const DEFAULT_TIMEOUT_MS = 30 * 60 * 1000;

const ROLE_PROFILES = {
  manager: {
    model: "gpt-5.5",
    sandbox: "read-only",
    reasoningEffort: "xhigh",
    preface:
      "You are acting as the Coding Manager. Coordinate execution, set priorities, and unblock implementation blockers. Work in read-only mode unless the user explicitly asks for implementation.",
  },
  coder: {
    model: "gpt-5.3-codex",
    sandbox: "workspace-write",
    reasoningEffort: "xhigh",
    preface:
      "You are acting as the implementation coder. Make minimal, safe changes within the declared allowed paths and explain assumptions clearly.",
  },
};

function usage() {
  return [
    "Usage:",
    "  node scripts/codex-wrapper.js manager \"<prompt>\"",
    "  node scripts/codex-wrapper.js coder --allowed-paths \"<path[,path...]>\" \"<prompt>\"",
    "  ROLE_WRAPPER_ALLOWED_PATHS=\"<path[,path...]>\" node scripts/codex-wrapper.js coder \"<prompt>\"",
    "",
    "Roles:",
    "  manager -> codex exec --model gpt-5.5 --sandbox read-only",
    "  coder   -> codex exec --model gpt-5.3-codex --sandbox workspace-write inside declared paths",
    "",
    "Example:",
    "  node scripts/codex-wrapper.js manager \"Create a 5-step execution plan for the redesign.\"",
    "  node scripts/codex-wrapper.js coder --allowed-paths \"scripts/check_schemas.js,tests/wrappers/wrappers.test.js\" \"Implement the approved validation improvement.\"",
  ].join("\n");
}

function isHelpFlag(value) {
  if (typeof value !== "string") {
    return false;
  }
  const lower = value.toLowerCase();
  return lower === "--help" || lower === "-h";
}

function parseAllowedPaths(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseCodexCliArgs(args, env = process.env) {
  if (args.length === 1 && isHelpFlag(args[0])) {
    return { kind: "help" };
  }

  if (args.length < 2) {
    return { kind: "error", message: "Expected role and prompt." };
  }

  const role = args[0];
  if (!ROLE_PROFILES[role]) {
    return { kind: "error", message: `Unknown role "${role}".` };
  }

  if (isHelpFlag(args[1])) {
    return { kind: "help" };
  }

  const excludedIndexes = new Set([0]);
  const allowedPathsIndex = args.indexOf("--allowed-paths");
  let allowedPaths = parseAllowedPaths(env.ROLE_WRAPPER_ALLOWED_PATHS);

  if (allowedPathsIndex !== -1) {
    if (allowedPathsIndex === args.length - 1) {
      return { kind: "error", message: "Missing value for --allowed-paths." };
    }
    allowedPaths = parseAllowedPaths(args[allowedPathsIndex + 1]);
    excludedIndexes.add(allowedPathsIndex);
    excludedIndexes.add(allowedPathsIndex + 1);
  }

  if (role === "coder" && allowedPaths.length === 0) {
    return {
      kind: "error",
      message: "Coder role requires --allowed-paths <comma-separated paths> or ROLE_WRAPPER_ALLOWED_PATHS.",
    };
  }

  const prompt = args
    .filter((_, index) => !excludedIndexes.has(index))
    .join(" ")
    .trim();
  if (!prompt) {
    return { kind: "error", message: "Prompt cannot be empty." };
  }

  return { kind: "run", role, prompt, allowedPaths };
}

function buildCodexCommandArgs(role, prompt, cwd = process.cwd(), allowedPaths = []) {
  const profile = ROLE_PROFILES[role];
  if (!profile) {
    throw new Error(`Unknown role "${role}".`);
  }

  const promptParts = [
    profile.preface,
    `Repository: ${cwd}`,
  ];
  if (allowedPaths.length > 0) {
    promptParts.push(`Allowed paths: ${allowedPaths.join(", ")}`);
  }
  promptParts.push("", prompt);

  const composedPrompt = promptParts.join("\n");
  const commandArgs = [
    "exec",
    "-C",
    cwd,
    "--model",
    profile.model,
    "--sandbox",
    profile.sandbox,
    "--color",
    "never",
    "--ephemeral",
  ];

  if (profile.reasoningEffort) {
    commandArgs.push("-c", `model_reasoning_effort="${profile.reasoningEffort}"`);
  }

  commandArgs.push(composedPrompt);
  return commandArgs;
}

function getTimeoutMs(env = process.env) {
  const value = Number.parseInt(env.ROLE_WRAPPER_TIMEOUT_MS || "", 10);
  return Number.isFinite(value) && value > 0 ? value : DEFAULT_TIMEOUT_MS;
}

function candidateCodexEntrypoints({
  execPath = process.execPath,
  env = process.env,
} = {}) {
  const candidates = [
    path.join(
      path.dirname(execPath),
      "node_modules",
      "@openai",
      "codex",
      "bin",
      "codex.js"
    ),
  ];

  if (env.APPDATA) {
    candidates.push(
      path.join(env.APPDATA, "npm", "node_modules", "@openai", "codex", "bin", "codex.js")
    );
  }

  if (env.LOCALAPPDATA) {
    candidates.push(
      path.join(
        env.LOCALAPPDATA,
        "Programs",
        "nodejs",
        "node_modules",
        "@openai",
        "codex",
        "bin",
        "codex.js"
      )
    );
  }

  for (const pathDir of (env.PATH || "").split(path.delimiter)) {
    if (!pathDir) {
      continue;
    }
    candidates.push(path.join(pathDir, "node_modules", "@openai", "codex", "bin", "codex.js"));
  }

  return [...new Set(candidates)];
}

function resolveCodexInvocation(
  commandArgs,
  {
    platform = process.platform,
    env = process.env,
    execPath = process.execPath,
    existsSync = fs.existsSync,
  } = {}
) {
  if (platform !== "win32") {
    return { command: "codex", args: commandArgs };
  }

  for (const codexEntrypoint of candidateCodexEntrypoints({ execPath, env })) {
    if (existsSync(codexEntrypoint)) {
      return { command: execPath, args: [codexEntrypoint, ...commandArgs] };
    }
  }

  return { command: "codex", args: commandArgs };
}

function emitUsageError(message, io = console) {
  if (message) {
    io.error(`Error: ${message}`);
  }
  io.error("\n" + usage());
  return 1;
}

function runCodexCli(
  cliArgs = process.argv.slice(2),
  {
    customSpawnSync = spawnSync,
    platform = process.platform,
    env = process.env,
    cwd = process.cwd(),
    execPath = process.execPath,
    existsSync = fs.existsSync,
    io = console,
  } = {}
) {
  const parsed = parseCodexCliArgs(cliArgs, env);

  if (parsed.kind === "help") {
    io.log(usage());
    return 0;
  }

  if (parsed.kind === "error") {
    return emitUsageError(parsed.message, io);
  }

  const commandArgs = buildCodexCommandArgs(parsed.role, parsed.prompt, cwd, parsed.allowedPaths);
  const codexInvocation = resolveCodexInvocation(commandArgs, {
    platform,
    env,
    execPath,
    existsSync,
  });

  const result = customSpawnSync(codexInvocation.command, codexInvocation.args, {
    stdio: ["ignore", "inherit", "inherit"],
    shell: false,
    timeout: getTimeoutMs(env),
  });

  if (result.error) {
    io.error(
      `Failed to execute codex: ${result.error.message}\n` +
        "Ensure Codex CLI is installed and available on PATH, or install @openai/codex with npm."
    );
    return 1;
  }

  if (typeof result.status === "number" && result.status !== 0) {
    return result.status;
  }

  return 0;
}

if (require.main === module) {
  process.exit(runCodexCli());
}

module.exports = {
  DEFAULT_TIMEOUT_MS,
  ROLE_PROFILES,
  buildCodexCommandArgs,
  candidateCodexEntrypoints,
  getTimeoutMs,
  parseAllowedPaths,
  parseCodexCliArgs,
  resolveCodexInvocation,
  runCodexCli,
  usage,
};

# Codex Static MVP Scope Guardrail Prompt

Use this at the top of any Codex task touching OpenClaw static MVP.

```text
You are working in the OpenClaw Cooperative Cockpit repo.

Hard boundary:
- Static MVP only.
- Mock data only.
- No backend.
- No API.
- No authentication.
- No database.
- No deployment.
- No runtime workflow execution.
- No real agent orchestration.
- No external connectors.
- No MCP implementation.
- No new dependencies unless Point explicitly approves.
- No new pages unless Point explicitly approves.
- Do not claim tests passed unless you run them and show output.
- Work only in allowed paths.
- Stop if scope expands.

Before editing:
1. Declare branch name.
2. Declare task ID.
3. Declare allowed paths.
4. Declare files expected to be touched.
5. Declare validation commands.

After editing:
1. Run validation commands.
2. Report changed files.
3. Report validation output.
4. Report risks and unresolved issues.
```

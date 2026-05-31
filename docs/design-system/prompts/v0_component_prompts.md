# v0 Component Prompts

## Generate design-system component

```text
Role: You are an AI UI generator creating one OpenClaw design-system component.

Component contract:
[PASTE COMPONENT CONTRACT]

Constraints:
- Static/mock only.
- No backend, API, auth, persistence, or external connectors.
- Use semantic token names.
- Include accessible labels, keyboard states, and visible focus.
- Include required states: default, dense, empty, loading, warning, error, disabled, selected where applicable.
- Do not invent a new component category if the taxonomy already covers it.

Output:
1. Component proposal.
2. Props contract.
3. Required Storybook stories.
4. Visual QA states.
5. Anti-patterns to avoid.
```

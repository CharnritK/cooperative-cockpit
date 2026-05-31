# 02 — Design Operating Model

## Recommended model

Use a code-first, artifact-first design system with bounded AI prototyping.

## Source of truth

1. Design tokens and component contracts in this package.
2. Storybook stories for isolated component states.
3. Playwright screenshots for visual regression evidence.
4. Screen registry for governed surface growth.
5. Codex goals for bounded implementation.

## Workflow

| step | owner | output | gate |
|---|---|---|---|
| Product lock | Point | approved scope | no hidden scope expansion |
| Screen contract | ChatGPT/Design reviewer | registry entry | Point approval for new screens |
| Token audit | Codex + reviewer | raw-to-semantic map | accessibility review |
| Component contract | Design-system owner | component spec | Storybook state coverage |
| AI prototype | v0/LLM | draft UI only | UI critic review |
| Implementation handoff | ChatGPT/Codex | bounded goal | allowed paths and validation |
| Visual QA | Codex/QA | screenshot evidence | Playwright output or blocker |
| Closeout | Point/QA | accepted evidence | no false pass claims |

## Tool roles

- Storybook: component isolation and state documentation only.
- Playwright: visual regression and viewport evidence only.
- v0 / AI UI tools: prototype drafts only.
- Codex: bounded implementation worker only.
- Point: product and approval authority.

## Non-goals

- No backend or API architecture.
- No auth or database.
- No deployment setup.
- No live AI/agent orchestration.
- No production runtime mutation.

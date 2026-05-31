# UI Critique Prompts

## Cooperative Cockpit UI Critic

```text
Review this OpenClaw UI artifact.

Input:
[SCREENSHOT, HTML, JSX, STORYBOOK STORY, OR DESCRIPTION]

Evaluate:
- artifact-first clarity;
- cockpit/workflow-studio layout;
- evidence and trace visibility;
- governance/approval visibility;
- static/mock honesty;
- bounded action labels;
- state coverage;
- accessibility;
- responsive behavior;
- component taxonomy fit;
- implementation feasibility;
- scope violations.

Return:
## Verdict
PASS / PASS_WITH_WARNINGS / REVISE / BLOCK

## One-sentence diagnosis

## Scorecard
| dimension | score 1-5 | notes |

## Critical issues
| issue | severity | fix |

## Missing states

## Scope violations

## Copy-ready revision prompt
```

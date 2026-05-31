# Mock Data Fixture

`openclaw.mock-data.v1.json` is the canonical package fixture for Design OS documentation, Storybook stories, Playwright visual tests, and AI UI prompts.

It is not a drop-in replacement for the current static MVP runtime data. Runtime fixtures remain under `apps/static-mvp/src/**` until a separate app-data migration is approved.

## Rules

- No real PII, secrets, credentials, customer data, or private URLs.
- IDs must follow the prefix convention in `07_MOCK_DATA_CONTRACT.md`.
- Relationships should use ID references.
- Fixture should include happy, warning, blocked, and locked states.

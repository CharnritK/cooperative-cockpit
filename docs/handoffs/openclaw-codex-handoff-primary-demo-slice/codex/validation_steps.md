# Validation Steps

## Commands

Run from repository root:

```bash
npm run validate
git check-ignore -v scripts/check_no_secrets.js
git check-ignore -v AGENTS.md
```

## Manual checks

- Open `apps/static-mvp/index.html`.
- Verify all eight pages are reachable.
- Verify no network/API calls beyond local static assets.
- Verify no new dependencies.
- Verify no ninth page.
- Verify no forbidden action labels.
- Verify handoff remains static/mock-only.

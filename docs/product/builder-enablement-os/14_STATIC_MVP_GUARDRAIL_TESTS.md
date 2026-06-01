# Static MVP Guardrail Tests

## Recommended commands

Do not claim these passed until actually run.

```bash
npm run validate
npm run check:specgraph-fixtures
npm run check:builder-guardrails
git diff --check
npm run check:secrets
npm run test:visual:list
```

## Source checks

```bash
node scripts/check_builder_enablement_os_guardrails.js
node scripts/check_specgraph_fixtures.js
rg -n "fetch\(|XMLHttpRequest|WebSocket|EventSource|sendBeacon" apps/static-mvp --glob "*.{html,css,js,mjs}"
rg -n "localStorage|sessionStorage|indexedDB" apps/static-mvp --glob "*.{html,css,js,mjs}"
rg -n "tree-sitter|LanguageServer|scip|kythe|codeql|joern" apps/static-mvp package.json
```

Docs are expected to mention forbidden terms as guardrails. Runtime scans must therefore target implementation files, not the product/QA docs that record the prohibitions.

## Manual browser checks

| test_id | check | pass |
|---|---|---|
| GM-001 | network tab | local files only |
| GM-002 | page count | eight pages |
| GM-003 | no login | no auth surface |
| GM-004 | handoff | gated preview only |
| GM-005 | Workbench copy | SpecGraph-first |
| GM-006 | code lens | static fixture only |
| GM-007 | protected exclusions | visible |
| GM-008 | decisions | lock state visible |
| GM-009 | CTA wording | no execution |
| GM-010 | secrets | no credentials |

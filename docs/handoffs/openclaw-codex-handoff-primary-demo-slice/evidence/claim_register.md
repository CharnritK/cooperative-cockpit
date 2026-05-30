# Claim Register

Status: Historical handoff packet. Current product/source canon lives in `docs/product/**`.

| claim_id | claim | type | source_id | support | confidence | risk |
|---|---|---|---|---|---:|---|
| C001 | Static MVP is under apps/static-mvp/ and is directly openable via index.html. | Fact | S002,S005 | Supported | 5 | Low |
| C002 | The prototype is static, mock-only, and has no backend, API, auth, database, deployment, real AI, runtime mutation, or repo writes. | Fact | S005,S006,S012 | Supported | 5 | High if wrong |
| C003 | The MVP currently uses eight pages: Home, Workbench, Spec Builder, Review Runs, Preview, Decisions, Trace & Evidence, Rules & Scope. | Fact | S005,S006,S007 | Supported | 5 | Medium |
| C004 | Current mock data contains context nodes, selected context items, protected exclusions, spec fields, review results, decisions, trace links, rules, and a handoff placeholder. | Fact | S008,S013 | Supported | 5 | Medium |
| C005 | The primary scenario should be product spec creation ending in a gated handoff preview. | Recommendation input | S001,S005,S006,S008,S013 | Partial | 4 | Medium |
| C006 | The next safest Codex slice is static primary-demo alignment rather than broad scenario buildout. | Recommendation input | S001,S004,S005,S006,S011,S016 | Partial | 4 | Medium |
| C007 | Deep Research report was not provided to the original package generation run, but is now persisted in repo. | Historical note | S001,S019 | Superseded | 5 | Low |
| C008 | Original package-inspected commit was 3f610a66c52e938e42f004b9f53adccc4f78e9c3; current status must use local git and `docs/ops/STATUS.md`. | Historical fact | S020 | Supported | 5 | Low |

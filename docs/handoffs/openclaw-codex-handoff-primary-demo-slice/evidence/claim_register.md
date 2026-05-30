# Claim Register

| claim_id | claim | type | source_id | support | confidence | risk |
|---|---|---|---|---|---:|---|
| C001 | Static MVP is under apps/static-mvp/ and is directly openable via index.html. | Fact | S002,S005 | Supported | 5 | Low |
| C002 | The prototype is static, mock-only, and has no backend, API, auth, database, deployment, real AI, runtime mutation, or repo writes. | Fact | S005,S006,S012 | Supported | 5 | High if wrong |
| C003 | The MVP currently uses eight pages: Home, Workbench, Spec Builder, Review Runs, Preview, Decisions, Trace & Evidence, Rules & Scope. | Fact | S005,S006,S007 | Supported | 5 | Medium |
| C004 | Current mock data already contains context nodes, context basket items, protected exclusions, spec fields, review results, decisions, trace links, rules, and a handoff placeholder. | Fact | S008,S013 | Supported | 5 | Medium |
| C005 | The primary scenario should be product spec creation ending in a gated handoff preview. | Recommendation input | S001,S005,S006,S008,S013 | Partial | 4 | Medium |
| C006 | The next safest Codex slice is static primary-demo alignment rather than broad scenario buildout. | Recommendation input | S001,S004,S005,S006,S011,S016 | Partial | 4 | Medium |
| C007 | Deep Research report was not provided to this package generation run. | Assumption | S001 | Needs Verification | 3 | Medium |
| C008 | Latest inspected commit is 3f610a66c52e938e42f004b9f53adccc4f78e9c3. | Fact | S019 | Partial | 4 | Medium |
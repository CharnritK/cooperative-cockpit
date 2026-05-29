# Risks

This file catalogues known risks to the project. Each risk should have:

- **Description** – what could go wrong.  
- **Impact** – how severe the consequence would be.  
- **Likelihood** – how probable the risk is.  
- **Mitigation** – steps taken to reduce or manage the risk.

Example:

| Risk | Impact | Likelihood | Mitigation |
|-----|-------|-----------|-----------|
| `.gitignore` ignores safety scripts | High | Low | Use explicit patterns instead of wildcard secret globs |  
| Multiple agents working on the same file | Medium | Medium | Concurrency policy and branch ownership declarations |
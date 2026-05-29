# QA Checklist

Use this checklist to verify that changes meet the repository’s quality standards.

## General

- [ ] Validation scripts (`npm run validate`) pass.
- [ ] The `.gitignore` does not ignore critical files.
- [ ] No new dependencies were added.
- [ ] Only declared paths were modified.
- [ ] Documentation is updated where relevant.

## Static MVP assimilation

- [ ] All eight pages exist and open without errors.  
- [ ] No user‑facing label says “Run”.  
- [ ] The handoff manifest is complete.  
- [ ] No network or API calls are made.  
- [ ] The MVP remains read‑only and static.

## QA Hardening

- [ ] QA tests cover all acceptance criteria.  
- [ ] All known issues are documented in `docs/STATUS.md`.  
- [ ] Artifacts added during QA have manifests.  
- [ ] The QA checklist is updated after each cycle.
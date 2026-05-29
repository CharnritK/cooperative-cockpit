Title: Bootstrap agent-ready repository setup

Objective:
Set up the cooperative-cockpit repository with the correct structure, policies, and validation scripts so that future tasks can be performed safely and autonomously. Apply the provided setup package, ensure critical files are tracked, and run validation.

Autonomy level:
A2 – scaffold and scripts only. Do not modify product code or add dependencies.

Allowed paths:
```
docs/**
agents/**
prompts/**
quality/**
schemas/**
scripts/**
artifacts/**
workspace/**
.codex/**
package.json
.env.example
.gitignore
AGENTS.md
README.md
```

Forbidden actions:
- Do not add runtime product code.
- Do not add dependencies or frameworks.
- Do not call external APIs or services.
- Do not write to production or push to remote.
- Do not modify the static MVP.

Input:
The setup package contents (files and folders) already exist in your working copy.

Required work:
1. Copy or create the files and folders as specified in the setup package.  
2. Replace `.gitignore` patterns with explicit rules.  
3. Add `apps/README.md`, `docs/ops/CONCURRENCY_POLICY.md`, `artifacts/MANIFEST_TEMPLATE.json`, and `scripts/check_gitignore.js`.  
4. Update `scripts/check_structure.js` and `package.json` as described.  
5. Update `docs/ops/FOLDER_STRUCTURE.md` and `README.md`.  
6. Run `npm run validate`.  
7. Run `git check-ignore -v scripts/check_no_secrets.js` to ensure the file is not ignored.  
8. Report validation output and any missing files.

Acceptance criteria:
- `npm run validate` passes.  
- Critical files are not ignored by `.gitignore`.  
- New files exist with correct content.  
- No dependencies added.  
- No modifications to product code.  

Validation commands:
```
npm run validate
git check-ignore -v scripts/check_no_secrets.js
git check-ignore -v AGENTS.md
```

Stop conditions:
- Existing files conflict with new ones.  
- Validation fails after corrections.  
- A dependency or external service is required.  
- Protected surfaces are touched.

Final response format:
```
Verdict: PASS / PASS_WITH_WARNINGS / REVISE / BLOCK
Changed files:
Validation output:
Remaining risks or warnings:
Next recommended action:
```
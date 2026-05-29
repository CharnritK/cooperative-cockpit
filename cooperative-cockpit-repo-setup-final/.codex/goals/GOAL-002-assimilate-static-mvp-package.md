Title: Assimilate static MVP package

Objective:
After the repository setup is validated, import the static HTML/CSS/JS MVP (openclaw-cooperative-cockpit-mvp.zip) into `apps/static-mvp/` and create a corresponding package manifest. Ensure no scope change and maintain read‑only behaviour.

Autonomy level:
A2 – assimilation only, no feature additions.

Allowed paths:
```
apps/static-mvp/**
artifacts/packages/**
artifacts/images/**
artifacts/handoffs/**
docs/handoffs/**
docs/decisions/**
docs/ops/STATUS.md
```

Forbidden actions:
- Do not add dependencies, frameworks, backends, or APIs.  
- Do not modify the static MVP’s user‑facing labels or scope.  
- Do not push to remote or deploy.  
- Do not override existing policies.

Input:
openclaw-cooperative-cockpit-mvp.zip

Required work:
1. Extract the contents of the static MVP zip into `apps/static-mvp/`.  
2. Ensure all eight MVP pages are present and unaltered.  
3. Create a manifest file in `artifacts/packages/` describing the package. Use `artifacts/MANIFEST_TEMPLATE.json` as a template and fill in details (artifact_id, created_at, etc.).  
4. Add a note to `docs/ops/STATUS.md` describing the assimilation.  
5. Run `npm run validate` to verify the structure remains correct.  
6. Ensure no user‑facing action label says “Run”.  
7. Report validation output and confirm assimilation.

Acceptance criteria:
- Static app opens locally via `index.html`.  
- All eight pages are present.  
- Manifest file exists and is correctly filled.  
- `npm run validate` passes.  
- No dependencies added.  
- No external calls or secrets.  
- No scope changes.  

Validation commands:
```
npm run validate
```

Stop conditions:
- Extraction fails or package is incomplete.  
- Validation fails after assimilation.  
- A dependency or external call is required.  
- Attempting to change scope or add features.

Final response format:
```
Verdict: PASS / PASS_WITH_WARNINGS / REVISE / BLOCK
Package manifest created: yes/no
Validation output:
Remaining risks or warnings:
Next recommended action:
```
# VALIDATION-REFRESH-PR3 Evidence

## Scope

- Timestamp: 2026-05-30T23:50:41.6972592+07:00
- Branch: agent/VALIDATION-REFRESH-PR3-validation-refresh
- Base main commit: 3a43e2be54d3fc6cc60683b3ce0de45fd3c8c96f
- Commit summary: Merge pull request #3 from CharnritK/agent/GOAL-primary-demo-slice
- Allowed write paths:
  - artifacts/evidence/**
  - docs/ops/STATUS.md

## PR #3 Diff Inspection

Command:

```text
git diff --stat HEAD^1 HEAD
```

Output:

```text
 apps/static-mvp/README.md             |  2 ++
 apps/static-mvp/handoff/manifest.json | 12 +++++++++++-
 2 files changed, 13 insertions(+), 1 deletion(-)
```

Command:

```text
git diff --name-status HEAD^1 HEAD
```

Output:

```text
M	apps/static-mvp/README.md
M	apps/static-mvp/handoff/manifest.json
```

Finding: PR #3 changed only the static MVP README and handoff manifest package inventory. The README adds a note that the handoff inventory is self-contained for local/offline review. The manifest adds `styles/fonts.css`, local font files referenced by that stylesheet, and the corresponding OFL license files.

## Validation Commands

Command:

```text
npm run validate
```

Output:

```text
> cooperative-cockpit-repo-setup@1.0.0 validate
> npm run check:structure && npm run check:json && npm run check:secrets && npm run check:tasks && npm run check:gitignore


> cooperative-cockpit-repo-setup@1.0.0 check:structure
> node scripts/check_structure.js

check_structure: PASS

> cooperative-cockpit-repo-setup@1.0.0 check:json
> node scripts/check_json.js

check_json: PASS

> cooperative-cockpit-repo-setup@1.0.0 check:secrets
> node scripts/check_no_secrets.js

check_no_secrets: PASS

> cooperative-cockpit-repo-setup@1.0.0 check:tasks
> node scripts/check_task_cards.js

check_tasks: PASS (0 task cards checked)

> cooperative-cockpit-repo-setup@1.0.0 check:gitignore
> node scripts/check_gitignore.js

check_gitignore: PASS
```

Command:

```text
git diff --check
```

Output:

```text
```

Result: PASS, no whitespace errors reported.

## Manifest QA

Command:

```text
node -e 'const fs=require("fs"); const path=require("path"); const root=process.cwd(); const manifestPath=path.join(root,"apps/static-mvp/handoff/manifest.json"); const cssPath=path.join(root,"apps/static-mvp/styles/fonts.css"); const manifest=JSON.parse(fs.readFileSync(manifestPath,"utf8")); const css=fs.readFileSync(cssPath,"utf8"); const refs=[...css.matchAll(/url\("\.\.\/(assets\/fonts\/[^"]+)"\)/g)].map((m)=>m[1]).sort(); const required=["styles/fonts.css",...refs,"assets/fonts/OFL-FiraCode.txt","assets/fonts/OFL-Outfit.txt","assets/fonts/OFL-Rajdhani.txt"]; const missing=required.filter((f)=>!manifest.files.includes(f)); const missingOnDisk=required.filter((f)=>!fs.existsSync(path.join(root,"apps/static-mvp",f))); console.log("manifest valid JSON: yes"); console.log("referenced font files: "+refs.join(", ")); console.log("required manifest entries present: "+(missing.length?"no: "+missing.join(", "):"yes")); console.log("required files exist on disk: "+(missingOnDisk.length?"no: "+missingOnDisk.join(", "):"yes")); if(missing.length||missingOnDisk.length) process.exit(1);'
```

Output:

```text
manifest valid JSON: yes
referenced font files: assets/fonts/FiraCode-Variable.ttf, assets/fonts/Outfit-Variable.ttf, assets/fonts/Rajdhani-Bold.ttf, assets/fonts/Rajdhani-Medium.ttf, assets/fonts/Rajdhani-Regular.ttf, assets/fonts/Rajdhani-SemiBold.ttf
required manifest entries present: yes
required files exist on disk: yes
```

Notes:

- `apps/static-mvp/handoff/manifest.json` is valid JSON.
- `styles/fonts.css` is included in the manifest.
- All local font files referenced by `styles/fonts.css` are included in the manifest and exist on disk.
- Corresponding OFL license files for Fira Code, Outfit, and Rajdhani are included in the manifest and exist on disk.
- A first auxiliary manifest QA command attempt failed before Node execution because of PowerShell quoting. The successful rerun above is the manifest QA evidence used for this refresh.

## Guardrail Confirmation

- No dependencies added.
- No app source modified.
- No product scope modified.
- No backend, API, authentication, database, deployment, external connector, runtime workflow execution, or real agent orchestration added.

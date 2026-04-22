# Fork Policy

> **AI Agent Notice**: This document is the source of truth for how patches are managed in this fork. ALL agents working on this submodule MUST read this file before making changes. The parent repository (`link-like-blooming-network`) consumes this fork as a git submodule at `deps/linkura-ui`.

This repository is a fork of [`AkaakuHub/link-like-ui`](https://github.com/AkaakuHub/link-like-ui), maintained for use as a git submodule by [`kakeru-ikeda/link-like-blooming-network`](https://github.com/kakeru-ikeda/link-like-blooming-network) (the **parent**).

## TL;DR for AI Agents

```yaml
operating_model: fork-as-patch-set
upstream_repo: AkaakuHub/link-like-ui
upstream_ref:  main
fork_repo:     kakeru-ikeda/linkura-ui
parent_repo:   kakeru-ikeda/link-like-blooming-network
parent_submodule_path: deps/linkura-ui
push_to_upstream: NEVER
sync_workflow: .github/workflows/upstream-sync.yml (cron: Mon 00:00 UTC)
branch_naming:
  app_specific_fix:    fix/blooming-<topic>
  app_specific_feat:   feat/blooming-<topic>
  build_or_chore:      chore/blooming-<topic>
  upstream_auto_merge: merge/upstream-<short_sha>-<yyyymmdd>
```

## Operating Model: Fork-as-patch-set

All bug fixes and app-specific extensions live as **topic branches** on this fork. We do **not** upstream patches back to `AkaakuHub/link-like-ui`. The fork's `main` is the source of truth consumed by the parent.

### Why this model

- Upstream's release cadence and direction are independent of the parent app's needs.
- The parent app (`link-like-blooming-network`) needs deterministic behavior; waiting on upstream review is not viable.
- Patches that are app-specific (not generic bug fixes) wouldn't be accepted upstream anyway.

## Branch Naming

| Prefix                          | Purpose                                       | Example                            |
| ------------------------------- | --------------------------------------------- | ---------------------------------- |
| `fix/blooming-*`                | Bug fixes specific to parent app integration  | `fix/blooming-home-layout-props`   |
| `feat/blooming-*`               | New features required by parent app           | `feat/blooming-now-playing-slot`   |
| `chore/blooming-*`              | Build, asset, tooling changes                 | `chore/blooming-font-extralight`   |
| `merge/upstream-<sha>-<date>`   | Auto-generated upstream sync branches (CI)    | `merge/upstream-fc99b0e-20260421`  |

The `blooming-` infix distinguishes our patches from upstream-derived branches and makes audits easy:

```bash
git branch -r | grep blooming-   # all our patches
git branch -r | grep upstream-   # all auto-sync branches
```

## Workflow for AI Agents

### When the user asks to add a fix or feature to this submodule

```
PRECONDITION: cwd is deps/linkura-ui (the submodule), not the parent
```

1. **Classify the change** using the table in [Change Classification](#change-classification) below.
2. **Pick a branch prefix** from the [Branch Naming](#branch-naming) table.
3. **Branch from latest `main`**:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b <prefix>/blooming-<topic>
   ```
4. **Implement, commit, push**:
   ```bash
   git push -u origin <prefix>/blooming-<topic>
   ```
5. **Open a PR** against `main` with `gh pr create`.
6. **After merge** (in the **parent** repo, not here):
   ```bash
   cd <parent>/deps/linkura-ui && git checkout main && git pull
   cd <parent> && git add deps/linkura-ui
   git commit -m "chore: bump linkura-ui submodule to <short_sha> (<reason>)"
   git push
   ```
   THEN run `npm run build` in the affected parent package and verify with playwright.
7. **Update [Active Patches](#active-patches)** in this file in the same PR if the patch is permanent.

### Change Classification

| Change type                                   | Where to put it                       |
| --------------------------------------------- | ------------------------------------- |
| App-specific behavior the parent needs        | This fork (topic branch)              |
| Build/asset fix this fork's `dist/` requires  | This fork (`chore/blooming-*`)        |
| Theme / color / font override                 | **Parent** (CSS / props), not here    |
| Wrapping an existing component for the parent | **Parent** (wrapper component), not here |
| Truly upstream-able generic bug               | This fork. We do **not** PR upstream. |

**Rule of thumb**: if the change can be done by props or CSS in the parent without touching this fork, do it there. Only modify this fork when the parent has no other lever.

### Upstream Sync (Automated)

`.github/workflows/upstream-sync.yml` runs **every Monday 09:00 JST** and on manual `workflow_dispatch`:

1. Fetches `AkaakuHub/link-like-ui` main
2. Creates `merge/upstream-<sha>-<date>` branch
3. Attempts merge:
   - **Clean** → opens PR with `upstream-sync` label
   - **Conflict** → opens issue with `upstream-sync,conflict` label
4. Maintainer reviews PR, validates parent build, then merges

### Maintainer Review Checklist (for upstream-sync PRs)

- [ ] CI passes (lint, typecheck, build)
- [ ] All `*/blooming-*` patches still apply cleanly (check `git log --oneline main` after merge)
- [ ] Parent `link-like-blooming-network` `npm run build` succeeds with new pointer
- [ ] Parent playwright smoke test passes (home + menu sheet render)

If a `blooming-*` patch breaks due to upstream changes, fix it in a separate `fix/blooming-rebase-<sha>` PR before merging the upstream-sync PR.

## Active Patches

> **AI Agent Notice**: When you merge a permanent patch, you MUST add a row here in the same PR (or a follow-up PR before the next upstream-sync). When upstream merges an equivalent fix and the patch becomes a no-op, mark `Status: Obsolete` and the row will be pruned by the next maintainer pass.

| Merged commit | Branch                              | Purpose                                                          | Status    |
| ------------- | ----------------------------------- | ---------------------------------------------------------------- | --------- |
| `ecee0cc`     | `fix/home-layout-props-restore`     | Restore `children` / `sheetBottomContent` on `HomeLayout`        | Permanent |
| `00b6725`     | `fix/font-assets-extralight`        | Copy `Poppins-ExtraLight.ttf` to `dist/assets/fonts/`            | Permanent |
| _pending_     | `feat/blooming-menu-auto-close-and-back-override` | Auto-close menu on tile select; add `onBack` prop on `Layout` for parent-controlled back (browser back, etc.) | Permanent |

## Non-goals

- **Pushing PRs to upstream**: not done. If upstream independently lands an equivalent fix, our patch becomes a no-op after the next upstream-sync merge — that's fine.
- **Tracking upstream tags/releases**: we track `upstream/main` only.

## See Also

- `.github/workflows/upstream-sync.yml` — automated sync workflow source
- `.github/CODEOWNERS` — review requirements
- Parent repo `AGENTS.md` — parent-side submodule handling

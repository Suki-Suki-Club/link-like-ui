# GitHub Packages 再配布可能化 実装計画

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** link-like-ui を `@suki-suki-club/link-like-ui` として GitHub Packages に公開し、親アプリ link-like-blooming-network をレジストリ消費へ移行する。

**Architecture:** 既存の wildcard exports + tsdown per-component エントリ構造は維持し、CSS 自動注入を明示 import 方式（`./styles.css` エントリ）へ変更。公開は GitHub Actions（タグ駆動）で `GITHUB_TOKEN` により行う。親アプリは `file:` submodule 依存・webpack alias・tsconfig paths の 3 経路参照をレジストリ依存 1 本に置き換え、submodule を除去する。

**Tech Stack:** pnpm / tsdown / Tailwind CSS v4 / GitHub Actions / GitHub Packages (npm) / Next.js 16 (webpack)

**Spec:** `docs/superpowers/specs/2026-07-06-github-packages-redistribution-design.md`

## Global Constraints

- パッケージ名: `@suki-suki-club/link-like-ui`、初回公開バージョン: `0.1.0`
- レジストリ: `https://npm.pkg.github.com`（install には `read:packages` トークン必須）
- 本体リポの作業ブランチ: `chore/blooming-github-packages`（作成済み、FORK_POLICY 準拠）
- 本体リポのコミットは lefthook pre-commit（tailwind-canonical / biome / knip）を通過すること
- 親リポ: `/home/server/github/link-like-blooming-network`。`packages/api/.dev.vars` のローカル変更には触れない・コミットしない
- 認証トークンはリポジトリにコミットしない（`~/.npmrc` のみ）
- ドキュメントは通常日本語（会話のみ原始人モード）
- コミットメッセージ末尾: `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`

---

### Task 1: 本体 package.json のスコープ化と exports 追加

**Files:**
- Modify: `/home/server/github/link-like-ui/package.json`

**Interfaces:**
- Produces: パッケージ名 `@suki-suki-club/link-like-ui`、subpath `./styles.css`（後続タスクの README・親アプリ移行が参照）

- [ ] **Step 1: package.json を編集**

先頭ブロック（name〜publishConfig）を以下に変更。`scripts` 以下は変更しない。

```json
{
	"name": "@suki-suki-club/link-like-ui",
	"type": "module",
	"version": "0.1.0",
	"description": "A certain UI library that looks like Link-Like-OS.",
	"license": "MIT",
	"repository": {
		"type": "git",
		"url": "git+https://github.com/Suki-Suki-Club/link-like-ui.git"
	},
	"exports": {
		"./styles.css": "./dist/styles/index.css",
		"./*": {
			"types": "./dist/*/index.d.ts",
			"import": "./dist/*/index.js"
		},
		"./package.json": "./package.json"
	},
	"files": [
		"dist"
	],
	"publishConfig": {
		"registry": "https://npm.pkg.github.com"
	},
```

注意: 旧 `publishConfig.access: "public"` は削除（GitHub Packages では可視性はリポジトリに従う）。`"./styles.css"` は wildcard より先に置く（exports は具体的キーが優先されるが、可読性のため明示順とする）。

- [ ] **Step 2: JSON 妥当性と exports 解決を確認**

Run: `cd /home/server/github/link-like-ui && node -e "const p=require('./package.json'); console.log(p.name, p.version, p.exports['./styles.css'])"`
Expected: `@suki-suki-club/link-like-ui 0.1.0 ./dist/styles/index.css`

- [ ] **Step 3: Commit**

```bash
git add package.json
git commit -m "feat: scope package as @suki-suki-club/link-like-ui for GitHub Packages"
```

---

### Task 2: CSS 自動注入の廃止（build-style.mjs）

**Files:**
- Modify: `/home/server/github/link-like-ui/scripts/build-style.mjs`

**Interfaces:**
- Consumes: Task 1 の package.json（`pnpm build` 実行時）
- Produces: CSS import が注入されない `dist/`。フォントコピーは維持

補足: 現行の注入ループは `dist` 直下の `<dir>/index.js` のみ走査するが、tsdown の出力は `dist/<Family>/<Component>/index.js` の 2 階層下のため実質 no-op。除去による実害はない。

- [ ] **Step 1: build-style.mjs をフォントコピーのみに書き換え**

ファイル全体を以下に置換:

```js
import { cpSync, mkdirSync } from "node:fs";

mkdirSync("dist/assets/fonts", { recursive: true });
cpSync(
	"src/assets/fonts/Poppins-Regular.ttf",
	"dist/assets/fonts/Poppins-Regular.ttf",
);
cpSync(
	"src/assets/fonts/Poppins-ExtraLight.ttf",
	"dist/assets/fonts/Poppins-ExtraLight.ttf",
);
```

- [ ] **Step 2: ビルド実行**

Run: `cd /home/server/github/link-like-ui && pnpm install && pnpm build`
Expected: 終了コード 0。`dist/` 生成

- [ ] **Step 3: dist 検証**

Run: `grep -rl 'styles/index.css' dist --include='index.js' | wc -l`
Expected: `0`（CSS import 注入なし）

Run: `ls dist/styles/index.css dist/assets/fonts/Poppins-Regular.ttf dist/assets/fonts/Poppins-ExtraLight.ttf dist/Home/Layout/index.js dist/System/Button/index.js`
Expected: 全ファイル存在

- [ ] **Step 4: pack 内容検証**

Run: `npm pack --dry-run 2>&1 | grep -E 'styles/index.css|Poppins|name:|version:'`
Expected: `@suki-suki-club/link-like-ui`、`0.1.0`、`dist/styles/index.css`、フォント 2 種が含まれる

- [ ] **Step 5: Commit**

```bash
git add scripts/build-style.mjs
git commit -m "feat: drop CSS auto-injection in favor of explicit styles.css import"
```

---

### Task 3: リリースワークフロー追加

**Files:**
- Create: `/home/server/github/link-like-ui/.github/workflows/release.yml`

**Interfaces:**
- Consumes: Task 1 の `publishConfig.registry`
- Produces: `v*` タグ push で GitHub Packages へ publish する CI（Task 5 が使用）

- [ ] **Step 1: release.yml を作成**

```yaml
name: Release

on:
  push:
    tags:
      - "v*"
  workflow_dispatch:

permissions:
  contents: read
  packages: write

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 10

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          registry-url: "https://npm.pkg.github.com"

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Publish to GitHub Packages
        run: pnpm publish --no-git-checks
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

補足: `pnpm publish` は `prepublishOnly`（= `pnpm run build`）を自動実行するため、明示的な build ステップは不要。

- [ ] **Step 2: YAML 構文検証**

Run: `python3 -c "import yaml; yaml.safe_load(open('/home/server/github/link-like-ui/.github/workflows/release.yml')); print('OK')"`
Expected: `OK`

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/release.yml
git commit -m "ci: add release workflow publishing to GitHub Packages"
```

---

### Task 4: README / FORK_POLICY 更新

**Files:**
- Modify: `/home/server/github/link-like-ui/README.md`
- Modify: `/home/server/github/link-like-ui/FORK_POLICY.md`

**Interfaces:**
- Consumes: Task 1 のパッケージ名・`./styles.css` エントリ

- [ ] **Step 1: README.md の Usage 節を置換**

`## Usage` 節（既存の import 例）を以下に置換。Development 節は変更しない（存在しない `pnpm run test` の記述は削除する）:

```markdown
## Installation

This package is published to GitHub Packages. Configure the scope registry first:

```bash
# .npmrc (project)
@suki-suki-club:registry=https://npm.pkg.github.com
```

GitHub Packages requires authentication even for public packages. Put a token
with `read:packages` scope in your user `~/.npmrc` (do not commit it):

```bash
//npm.pkg.github.com/:_authToken=<YOUR_GITHUB_TOKEN>
```

Then install:

```bash
pnpm add @suki-suki-club/link-like-ui
```

## Usage

Import the stylesheet once (theme tokens + fonts), then import components
per module:

```tsx
import "@suki-suki-club/link-like-ui/styles.css";

import { LoadingOverlay } from "@suki-suki-club/link-like-ui/System/Loading";
import { TabRoot } from "@suki-suki-club/link-like-ui/System/Tab";
import { Button } from "@suki-suki-club/link-like-ui/System/Button";
import { Layout } from "@suki-suki-club/link-like-ui/Home/Layout";
```
```

- [ ] **Step 2: FORK_POLICY.md を更新**

以下 3 点を変更:

1. 冒頭の AI Agent Notice（3 行目）の「The parent repository consumes this fork as a git submodule at `deps/linkura-ui`」を「The parent repository consumes this fork as `@suki-suki-club/link-like-ui` via GitHub Packages.」に変更。5 行目の「maintained for use as a git submodule by」も「maintained for use as an npm package (GitHub Packages) by」に変更。
2. TL;DR YAML ブロックの `parent_submodule_path: deps/linkura-ui` を `distribution: GitHub Packages (@suki-suki-club/link-like-ui)` に変更し、`release_workflow: .github/workflows/release.yml (tag v*)` を追加。
3. `## Non-goals` の直前に新節を追加:

```markdown
## Permanent Fork Divergences (Packaging)

The following files intentionally diverge from upstream to support GitHub
Packages distribution. When resolving upstream-sync conflicts in these
files, **always keep the fork side** for the fields listed:

| File | Divergence |
| --- | --- |
| `package.json` | `name` (scoped), `version`, `repository`, `publishConfig.registry`, `exports["./styles.css"]` |
| `scripts/build-style.mjs` | CSS auto-injection removed (fonts copy only) |
| `.github/workflows/release.yml` | Fork-only release workflow (does not exist upstream) |

Release procedure: merge to `main`, then push a `v<version>` tag (matching
`package.json` version). CI publishes to GitHub Packages automatically.
```

6 の手順（parent での submodule bump 手順）の直後に注記を追加:

```markdown
> **Note (2026-07-06)**: The parent no longer consumes this fork as a
> submodule. After merging, publish a new version (tag `v<version>`) and
> bump the dependency version in the parent's `packages/web/package.json`.
```

- [ ] **Step 3: 表記検証**

Run: `grep -c "@suki-suki-club/link-like-ui" /home/server/github/link-like-ui/README.md`
Expected: 6 以上

Run: `grep -c "Permanent Fork Divergences" /home/server/github/link-like-ui/FORK_POLICY.md`
Expected: `1`

- [ ] **Step 4: Commit**

```bash
git add README.md FORK_POLICY.md
git commit -m "docs: update README and FORK_POLICY for GitHub Packages distribution"
```

---

### Task 5: PR・マージ・v0.1.0 公開

**Files:**
- なし（git / gh 操作のみ）

**Interfaces:**
- Consumes: Task 1〜4 の全コミット（ブランチ `chore/blooming-github-packages`）
- Produces: GitHub Packages 上の `@suki-suki-club/link-like-ui@0.1.0`（Task 6 以降が依存）

- [ ] **Step 1: push と PR 作成**

```bash
cd /home/server/github/link-like-ui
git push -u origin chore/blooming-github-packages
gh pr create --title "chore: publish as @suki-suki-club/link-like-ui via GitHub Packages" --body "$(cat <<'EOF'
## Summary
- Scope package name to @suki-suki-club/link-like-ui (GitHub Packages requirement)
- Replace CSS auto-injection with explicit `styles.css` export
- Add tag-driven release workflow (GITHUB_TOKEN, packages:write)
- Update README / FORK_POLICY for the new distribution model

Spec: docs/superpowers/specs/2026-07-06-github-packages-redistribution-design.md

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

- [ ] **Step 2: CI（既存 check があれば）確認後マージ**

```bash
gh pr checks --watch || true
gh pr merge --squash --delete-branch
```

Expected: main へマージ完了

- [ ] **Step 3: タグ push で公開**

```bash
git checkout main && git pull origin main
git tag v0.1.0
git push origin v0.1.0
gh run watch --exit-status $(gh run list --workflow=release.yml --limit 1 --json databaseId --jq '.[0].databaseId')
```

Expected: release ワークフロー成功（exit 0）

- [ ] **Step 4: パッケージ掲載確認**

Run: `gh api "/orgs/Suki-Suki-Club/packages/npm/link-like-ui/versions" --jq '.[].name'`
Expected: `0.1.0`

（org でなく user 所有の場合は `/users/Suki-Suki-Club/...` を試す）

---

### Task 6: 親アプリ レジストリ設定と依存切替

**Files:**
- Modify: `/home/server/github/link-like-blooming-network/.npmrc`
- Modify: `/home/server/github/link-like-blooming-network/packages/web/package.json:23`
- Modify: `/home/server/github/link-like-blooming-network/packages/web/next.config.ts`
- Modify: `/home/server/github/link-like-blooming-network/packages/web/tsconfig.json:21-27`
- Modify: `/home/server/github/link-like-blooming-network/packages/web/app/globals.css:3`
- Modify: `/home/server/github/link-like-blooming-network/packages/web/app/layout.tsx`

**Interfaces:**
- Consumes: Task 5 で公開した `@suki-suki-club/link-like-ui@0.1.0`
- Produces: レジストリ解決可能な依存構成（Task 7 のビルドが依存）

- [ ] **Step 1: 作業ブランチ作成**

```bash
cd /home/server/github/link-like-blooming-network
git checkout -b chore/migrate-linkura-ui-to-github-packages
```

- [ ] **Step 2: 認証設定（コミットしない）**

`gh auth token` のトークンで GitHub Packages read を試す。`~/.npmrc` に追記:

```bash
grep -q "npm.pkg.github.com" ~/.npmrc 2>/dev/null || echo "//npm.pkg.github.com/:_authToken=$(gh auth token)" >> ~/.npmrc
```

後続の `pnpm install` が 401/403 になる場合は `gh auth token` に `read:packages` がない。**ここで停止しユーザーに PAT（read:packages）発行を依頼する。**

- [ ] **Step 3: リポジトリ .npmrc にスコープレジストリ追加**

`/home/server/github/link-like-blooming-network/.npmrc` を以下に:

```ini
package-manager-strict=true
@suki-suki-club:registry=https://npm.pkg.github.com
```

- [ ] **Step 4: packages/web/package.json の依存差し替え**

```diff
-    "link-like-ui": "file:../../deps/linkura-ui",
+    "@suki-suki-club/link-like-ui": "^0.1.0",
```

（dependencies のアルファベット順維持: `@suki-suki-club/...` は `@supabase/ssr` の直前に置く）

- [ ] **Step 5: next.config.ts から alias 除去**

ファイル全体を以下に置換:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@suki-suki-club/link-like-ui"],
  allowedDevOrigins: ["192.168.40.99"],
};

export default nextConfig;
```

- [ ] **Step 6: tsconfig.json の paths 掃除**

`paths` を以下のみに:

```json
    "paths": {
      "@/*": ["./*"]
    }
```

- [ ] **Step 7: CSS import の切替**

`app/globals.css` 3 行目 `@import "../../../deps/linkura-ui/dist/styles/index.css";` を削除。

`app/layout.tsx` の `import "./globals.css";` の**直前**に追加（元の cascade 順序維持のため lib CSS が先）:

```ts
import "@suki-suki-club/link-like-ui/styles.css";
```

- [ ] **Step 8: install 実行**

Run: `cd /home/server/github/link-like-blooming-network && pnpm install`
Expected: 終了コード 0。`pnpm-lock.yaml` に `@suki-suki-club/link-like-ui@0.1.0`（`https://npm.pkg.github.com` 解決)が記録される

Run: `grep -c "@suki-suki-club/link-like-ui" pnpm-lock.yaml`
Expected: 1 以上

- [ ] **Step 9: Commit**

```bash
git add .npmrc packages/web/package.json packages/web/next.config.ts packages/web/tsconfig.json packages/web/app/globals.css packages/web/app/layout.tsx pnpm-lock.yaml
git commit -m "chore(web): consume link-like-ui from GitHub Packages"
```

---

### Task 7: 親アプリ import 指定子の一括置換とビルド検証

**Files:**
- Modify: `packages/web` 配下の `.ts` / `.tsx`（`"link-like-ui/` を含む 5 ファイル、約 45 箇所）

**Interfaces:**
- Consumes: Task 6 の依存構成
- Produces: ビルド可能な web パッケージ（Task 8 のコミット前提）

- [ ] **Step 1: 置換実行**

```bash
cd /home/server/github/link-like-blooming-network
grep -rl '"link-like-ui/' packages/web --include='*.ts' --include='*.tsx' \
  | xargs sed -i 's|"link-like-ui/|"@suki-suki-club/link-like-ui/|g'
```

- [ ] **Step 2: 残存参照ゼロ確認**

Run: `grep -rn '"link-like-ui/\|deps/linkura-ui' packages/web --include='*.ts' --include='*.tsx' --include='*.css' --include='*.json' | grep -v node_modules | grep -v '.next/'`
Expected: 出力なし

- [ ] **Step 3: ビルドとテスト**

Run: `pnpm --filter web build`
Expected: `next build --webpack` 成功（exit 0）

Run: `pnpm --filter web test`
Expected: vitest 成功（既存テストが元々失敗している場合はその旨を記録し、新規失敗がないことを確認）

- [ ] **Step 4: Commit**

```bash
git add packages/web
git commit -m "refactor(web): update imports to @suki-suki-club/link-like-ui"
```

---

### Task 8: submodule 除去と親アプリ PR

**Files:**
- Delete: `deps/linkura-ui`（submodule）
- Modify: `/home/server/github/link-like-blooming-network/.gitmodules`
- Modify: 親リポ内ドキュメントの `deps/linkura-ui` 言及（AGENTS.md 等、grep で特定）

**Interfaces:**
- Consumes: Task 7 まで完了した状態（もう submodule 参照なし）

- [ ] **Step 1: submodule 除去**

```bash
cd /home/server/github/link-like-blooming-network
git submodule deinit -f deps/linkura-ui
git rm -f deps/linkura-ui
rm -rf .git/modules/deps/linkura-ui
```

- [ ] **Step 2: .gitmodules 確認**

Run: `cat .gitmodules`
Expected: `linkura-ui` エントリが消え、他 3 submodule（link-like-diff / linkura-cli / inspix-hailstorm）は残存

- [ ] **Step 3: ドキュメント言及の更新**

Run: `grep -rn "linkura-ui\|link-like-ui" --include='*.md' . | grep -v node_modules | grep -v deps/`

ヒットした記述（AGENTS.md の submodule 説明等）を「`@suki-suki-club/link-like-ui`（GitHub Packages）から取得。要 `read:packages` トークン」の説明に書き換える。トークン設定手順（`~/.npmrc`）も 1 行添える。

- [ ] **Step 4: 最終ビルド確認**

Run: `pnpm --filter web build`
Expected: exit 0（submodule 不在でもビルド成功）

- [ ] **Step 5: Commit と PR**

```bash
# git rm が .gitmodules とgitlink削除を staging 済み。ドキュメント編集分のみ追加
git add <Step 3 で編集した .md ファイル>
git status --short   # packages/api/.dev.vars が staged に含まれていないこと確認
git commit -m "chore: remove deps/linkura-ui submodule (migrated to GitHub Packages)"
git push -u origin chore/migrate-linkura-ui-to-github-packages
gh pr create --title "chore: migrate link-like-ui consumption to GitHub Packages" --body "$(cat <<'EOF'
## Summary
- Replace file:deps/linkura-ui dependency with @suki-suki-club/link-like-ui@^0.1.0 (GitHub Packages)
- Remove webpack alias / tsconfig paths / relative CSS import
- Import styles via `@suki-suki-club/link-like-ui/styles.css` in app/layout.tsx
- Remove deps/linkura-ui submodule

## Setup required
`~/.npmrc` に `//npm.pkg.github.com/:_authToken=<token with read:packages>` が必要。

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

Expected: PR 作成完了。マージ判断はユーザーへ報告

---

## 検証まとめ（受け入れ基準）

1. `dist/**/index.js` に CSS import 注入なし・`npm pack` に styles.css とフォント同梱
2. GitHub Packages に `@suki-suki-club/link-like-ui@0.1.0` 掲載、release.yml 成功
3. 親アプリ: `pnpm install` / `pnpm --filter web build` 成功、`deps/linkura-ui` 参照ゼロ、submodule 除去済み
4. `packages/api/.dev.vars` の変更が親リポのコミットに含まれていない

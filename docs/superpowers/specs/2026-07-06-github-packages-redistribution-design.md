# link-like-ui 再配布可能化 + GitHub Packages 公開 設計書

日付: 2026-07-06
対象リポジトリ: `Suki-Suki-Club/link-like-ui`（本体）、`kakeru-ikeda/link-like-blooming-network`（親アプリ）

## 背景と目的

link-like-ui は tsdown によるコンポーネント単位エントリと wildcard exports（`"./*"`）を既に備えており、`link-like-ui/Home/Layout` のようなモジュール単体 import は構造上可能である。一方で以下の課題がある。

1. `scripts/build-style.mjs` が全エントリにテーマ CSS 全体の import を自動注入しており、1 コンポーネント利用でも全 CSS + Poppins フォントが同梱される。
2. パッケージはレジストリ未公開。親アプリ link-like-blooming-network は git submodule（`deps/linkura-ui`）経由で `dist/` を `file:` 依存 + webpack alias + tsconfig paths の 3 経路で参照しており、再配布可能な消費モデルになっていない。

本作業で、パッケージを GitHub Packages で公開できる形に整え、初回公開（v0.1.0）を行い、親アプリをレジストリ消費へ移行する。

## 決定事項（ユーザー確認済み）

- 構成: 単一スコープパッケージ強化。モノレポ分割はしない（upstream fork 追従を壊さないため）
- CSS: 自動注入を廃止し、明示 import 方式（`./styles.css` エントリ公開）
- 公開: GitHub Actions ワークフローで CI publish（タグ push / 手動 dispatch）
- 親アプリ: 本セッションで同時移行し、submodule `deps/linkura-ui` は除去する
- ドキュメント文体: 通常日本語

## 設計 §1: link-like-ui 本体

### package.json

- `name`: `link-like-ui` → `@suki-suki-club/link-like-ui`（GitHub Packages はスコープ必須。スコープはリポジトリオーナー `Suki-Suki-Club` の小文字形）
- `version`: `0.0.1` → `0.1.0`
- `repository` フィールド追加: `https://github.com/Suki-Suki-Club/link-like-ui.git`（GitHub Packages のリポジトリ紐付けに必要）
- `publishConfig`: `{ "registry": "https://npm.pkg.github.com" }` に変更（`access: public` は GitHub Packages では不要のため削除。パッケージ可視性はリポジトリに従う）
- `exports` に `"./styles.css": "./dist/styles/index.css"` を追加。既存の `"./*"` と `"./package.json"` は維持

### CSS ビルド（scripts/build-style.mjs）

- 全エントリへの CSS import 注入ループを削除
- Poppins フォントの `dist/assets/fonts/` へのコピーは維持（コンパイル済み CSS が相対パスで参照するため）
- ファイル名・存在は維持（CODEOWNERS 指定があり、upstream 差分を最小化するため）

### リリースワークフロー（.github/workflows/release.yml 新規）

- トリガー: `push: tags: ["v*"]` および `workflow_dispatch`
- `permissions: { contents: read, packages: write }`
- 手順: checkout → pnpm セットアップ → `actions/setup-node`（`registry-url: https://npm.pkg.github.com`）→ `pnpm install --frozen-lockfile` → `pnpm publish --no-git-checks`（`prepublishOnly` でビルドが走る）
- 認証: `NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}`。PAT 不要

### ドキュメント

- README: パッケージ名・インストール手順（GitHub Packages のスコープレジストリ設定）・`styles.css` の明示 import 作法に更新
- FORK_POLICY.md: 消費モデルの変更（submodule → GitHub Packages）を反映。`package.json` の `name` が upstream と恒久差分になり upstream-sync でコンフリクト候補となる点を明記

## 設計 §2: 親アプリ（link-like-blooming-network）移行

対象は唯一の消費者である `packages/web`（Next.js 16 / webpack / OpenNext Cloudflare）。

### 依存とレジストリ

- `packages/web/package.json`: `"link-like-ui": "file:../../deps/linkura-ui"` → `"@suki-suki-club/link-like-ui": "^0.1.0"`
- ルート `.npmrc` に `@suki-suki-club:registry=https://npm.pkg.github.com` を追加（コミット対象）
- 認証トークンはリポジトリにコミットしない。`~/.npmrc` の `//npm.pkg.github.com/:_authToken=<token>` に設定する（GitHub Packages は public パッケージでも `read:packages` トークン必須）。ローカル・デプロイ実行環境の双方で必要

### コード変更

- import 指定子の一括置換: `link-like-ui/...` → `@suki-suki-club/link-like-ui/...`（11 subpath / 約 45 箇所）
- `app/globals.css` の `@import "../../../deps/linkura-ui/dist/styles/index.css"` を削除し、`app/layout.tsx` に `import "@suki-suki-club/link-like-ui/styles.css"` を追加
- `next.config.ts`: `link-like-ui/System` の webpack alias を削除。`transpilePackages` を `["@suki-suki-club/link-like-ui"]` に更新
- `packages/web/tsconfig.json`: `link-like-ui/System/*` の paths を削除（パッケージの exports/types 解決に委ねる）

### submodule 除去

- `git rm deps/linkura-ui` + `.gitmodules` から該当エントリ削除 + `git submodule deinit`
- 他の submodule（link-like-diff / linkura-cli / inspix-hailstorm）には触れない

## 実施順序

1. link-like-ui 本体改修（package.json / build-style.mjs / exports / README / FORK_POLICY / release.yml）
2. ローカル検証: `pnpm build` → dist エントリに CSS import が注入されていないこと、`npm pack` の内容物（dist のみ + styles.css 解決）を確認
3. commit → push → `v0.1.0` タグ push → CI publish 成功と GitHub Packages 掲載を確認
4. 親アプリ改修（依存・import 置換・CSS import・config 掃除・submodule 除去）
5. 検証: 認証設定 → `pnpm install` → `pnpm --filter web build` 成功確認
6. 親アプリ commit

## 検証基準

- link-like-ui: `pnpm build` 成功。`dist/**/index.js` 先頭に CSS import が存在しない。`npm pack --dry-run` に `dist/styles/index.css` と `dist/assets/fonts/*.ttf` が含まれる
- CI: release.yml の実行成功。`https://github.com/orgs/Suki-Suki-Club/packages` にパッケージ掲載
- 親アプリ: `pnpm --filter web build`（`next build --webpack`）成功。`deps/linkura-ui` への参照が package.json / next.config.ts / tsconfig.json / globals.css から消えている

## リスクと注意

- **upstream-sync コンフリクト**: `package.json` の `name` / `publishConfig` と `build-style.mjs` の差分は upstream と恒久的に食い違う。FORK_POLICY.md に記載し、sync 時の解決方針（fork 側を優先）を明示する
- **認証必須**: GitHub Packages は install に必ずトークンが要る。トークン未設定環境（新規開発者・デプロイ環境）では `pnpm install` が失敗する。親リポの README / ドキュメントに設定手順を記載する
- **デプロイ経路**: 親アプリのデプロイは手動（`pnpm deploy:web` → wrangler）。CI 化されていないため、デプロイ実行マシンにトークン設定があれば十分
- **ロールバック**: 親アプリ移行が失敗した場合、submodule 除去コミットを revert すれば `file:` 消費に戻せる

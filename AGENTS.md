# ルール

> **Fork Policy (MUST READ FIRST)**: This repository is a fork consumed as a git submodule by `kakeru-ikeda/link-like-blooming-network`. Before adding ANY patch, read [`FORK_POLICY.md`](./FORK_POLICY.md) — it defines branch naming, change classification (when to patch this fork vs the parent), and the upstream-sync workflow. Do NOT push PRs to upstream `AkaakuHub/link-like-ui`.

- 指示通り、元の画像をベースにして、ピクセルパーフェクトなUI再現を行うこと
- そのためにvision toolを使用し、もし他のAIツールが必要ならば私に訪ねて
- 自分で勝手に判断せず、不明点はすぐに私に聞いて下さい
- コンポーネントは再利用可能な形で実装すること

- フォールバックは絶対に禁止

# UI

- ユーザーから指示された、todoリスト通りに進めること
- 完了済みのものはマークすること
- 色は絶対に、ハードコードせず、global.cssのテーマで使用する
- コンポーネントを使用する側では、極力大きさは指定しない。MUIのような、使う側のシンプルさが目標。
- playgroundテストように、実際にUIコンポーネントを使用してみるが、テキストは、画像のものではなくて、無害な固有名詞も含まない、当たり障りのないものにすること。
- playwright mcpを使用して、見た目を確かめること。保存一時画像はcc-docs/screenshotsに保存すること。アドレスは`127.0.0.1`ではなくて`localhost`を使用すること。
- tailwindは、重複するクラス文字列があれば基本的にはtailwind-variantsなどのライブラリを使用して、スタイルの重複を減らすこと。もし、どうしても、複数ファイルで重複するクラス文字列がある場合は、tailwindの@applyを使用して、グローバルクラスとして定義すること。

# 実装

- 必ず、コンポーネントごとに分けること
- 命名は基本的にキャメルケース
- 作成したUIは、かならずユーザーが確認できるよう、テスト環境に追加すること。現在は/componentsのURLで確認できるようにしている。
- 各コンポーネントはディレクトリ名で分割構成（`primitives.tsx` / `structure.tsx` / `content.tsx` / `index.tsx`）を維持し、１ファイルの責務を減らして正しく分割する。t-wadaさんが見ても怒らないようにすること。
- playground側では、コンポーネントを呼ぶだけで、classnameで細かいスタイル指定をしてはならない。代わりにライブラリ側で調整すること。

# リリース

- リリースはChangesetsで自動化済み。手動での`bumpp`実行・タグpushは廃止。
- 挙動が変わるPRには`pnpm changeset`でchangesetファイルを追加してコミットすること。
- `.github/workflows/release.yml`がmainへのpushで起動し、`changesets/action`が以下を行う。
  - 未消化のchangesetがあれば「chore: version packages」PRを自動生成/更新（`package.json`バージョンと`CHANGELOG.md`を更新）。
  - そのPRがマージされると同ワークフローが再実行され、`pnpm run release`（`changeset publish`）でGitHub Packagesへpublishし、`v<version>`タグを作成。
- この自動PR作成には、リポジトリの Settings > Actions > General > Workflow permissions を「Read and write permissions」＋「Allow GitHub Actions to create and approve pull requests」有効化が必要（Suki-Suki-Club org側のActionsポリシーでも許可されている必要あり）。
- リリース手順の詳細・fork固有の差分は`FORK_POLICY.md`の「Release procedure (Changesets, automated)」を参照。
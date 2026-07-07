# link-like-ui 共通定数（メンバー・ユニット・期）実装計画

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `link-like-ui` に、蓮ノ空のメンバー・ユニット・期（generation）の共通定数を新設ファミリー `src/Data/` として追加し、`@suki-suki-club/link-like-ui/Data/{Generations,Members,Units}` から参照可能にする。

**Architecture:** 既存の `src/{Family}/{Component}/index.tsx` 構造（tsdownが自動収集するエントリ規約）に従い、`Data/Generations` → `Data/Members` → `Data/Units` の順に依存関係を上流から積む（Units は Members・Generations の型を参照、Members は Generations の型を参照）。データはすべて `as const satisfies readonly {...}[]` で宣言し、TypeScript の型システムでID参照整合性を強制する。テストフレームワークは導入しない（リポジトリに既存の基盤がないため）。

**Tech Stack:** TypeScript 5.9 (`@tsconfig/strictest` 継承) / tsdown / Biome / Changesets

**Spec:** `docs/superpowers/specs/2026-07-07-shared-constants-design.md`

## Global Constraints

- パッケージ名: `@suki-suki-club/link-like-ui`（変更なし、破壊的変更なし = Changesetは`minor`）
- アイコンURLは `https://sukisuki.club/icons/{id}.png`（メンバー）/ `https://sukisuki.club/units/{slug}.png`（コアユニット）を文字列定数として埋め込む。画像ファイル自体は同梱しない
- 期(GENERATIONS)は `102, 103, 104, 105` の4件のみ。`101`期・`105期BGP`等の特殊行はGENERATIONSマスタに含めない
- メンバー(MEMBERS)は11件。`＆`複合キャラ行と`大賀美沙知`(id 1011)は含めない
- ユニット(UNITS)は10件（whole 1 / core 4 / shuffle 5）。ユニット構成員は `UNIT_ROSTERS`（unitId × period × memberIds）で期別に表現する。`period` は `GenerationId | "105-bgp"`
- コードスタイル: タブインデント・ダブルクォート（`biome check --fix` で自動整形されるため厳密一致は不要だが、既存ファイルに合わせて書く）
- 各タスクのファイル作成後、必ず `pnpm typecheck` を実行して確認する
- コミットメッセージ末尾: `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>`

---

### Task 1: `Data/Generations` モジュール

**Files:**
- Create: `/home/server/github/link-like-ui/src/Data/Generations/index.tsx`

**Interfaces:**
- Produces: `GENERATIONS`（readonly配列）, 型 `Generation`, 型 `GenerationId`（Task 2・Task 3が参照する）

- [ ] **Step 1: `src/Data/Generations/index.tsx` を作成**

```tsx
export const GENERATIONS = [
	{ id: 102, label: "102期" },
	{ id: 103, label: "103期" },
	{ id: 104, label: "104期" },
	{ id: 105, label: "105期" },
] as const satisfies readonly { id: number; label: string }[];

export type Generation = (typeof GENERATIONS)[number];
export type GenerationId = Generation["id"];
```

- [ ] **Step 2: 型チェックで確認**

Run: `cd /home/server/github/link-like-ui && pnpm typecheck`
Expected: エラーなしで終了（exit code 0）。`Data/Generations` に関するエラーが出ないこと。

- [ ] **Step 3: Commit**

```bash
git add src/Data/Generations/index.tsx
git commit -m "feat(data): add Generations constants (102-105期)"
```

---

### Task 2: `Data/Members` モジュール

**Files:**
- Create: `/home/server/github/link-like-ui/src/Data/Members/index.tsx`

**Interfaces:**
- Consumes: `GenerationId`（`../Generations` からの型import）
- Produces: `MEMBERS`（readonly配列）, 型 `Member`, 型 `MemberId`（Task 3が参照する）

- [ ] **Step 1: `src/Data/Members/index.tsx` を作成**

```tsx
import type { GenerationId } from "../Generations";

export const MEMBERS = [
	{
		id: 1021,
		name: "乙宗梢",
		generationId: 102,
		themeColor: "#68be8d",
		iconUrl: "https://sukisuki.club/icons/1021.png",
	},
	{
		id: 1022,
		name: "夕霧綴理",
		generationId: 102,
		themeColor: "#ba2636",
		iconUrl: "https://sukisuki.club/icons/1022.png",
	},
	{
		id: 1023,
		name: "藤島慈",
		generationId: 102,
		themeColor: "#c8c2c6",
		iconUrl: "https://sukisuki.club/icons/1023.png",
	},
	{
		id: 1031,
		name: "日野下花帆",
		generationId: 103,
		themeColor: "#f8b500",
		iconUrl: "https://sukisuki.club/icons/1031.png",
	},
	{
		id: 1032,
		name: "村野さやか",
		generationId: 103,
		themeColor: "#5383c3",
		iconUrl: "https://sukisuki.club/icons/1032.png",
	},
	{
		id: 1033,
		name: "大沢瑠璃乃",
		generationId: 103,
		themeColor: "#e7609e",
		iconUrl: "https://sukisuki.club/icons/1033.png",
	},
	{
		id: 1041,
		name: "百生吟子",
		generationId: 104,
		themeColor: "#a2d7dd",
		iconUrl: "https://sukisuki.club/icons/1041.png",
	},
	{
		id: 1042,
		name: "徒町小鈴",
		generationId: 104,
		themeColor: "#fad764",
		iconUrl: "https://sukisuki.club/icons/1042.png",
	},
	{
		id: 1043,
		name: "安養寺姫芽",
		generationId: 104,
		themeColor: "#9d8de2",
		iconUrl: "https://sukisuki.club/icons/1043.png",
	},
	{
		id: 1051,
		name: "桂城泉",
		generationId: 105,
		themeColor: "#1ebecd",
		iconUrl: "https://sukisuki.club/icons/1051.png",
	},
	{
		id: 1052,
		name: "セラス柳田リリエンフェルト",
		generationId: 105,
		themeColor: "#f56455",
		iconUrl: "https://sukisuki.club/icons/1052.png",
	},
] as const satisfies readonly {
	id: number;
	name: string;
	generationId: GenerationId;
	themeColor: string;
	iconUrl: string;
}[];

export type Member = (typeof MEMBERS)[number];
export type MemberId = Member["id"];
```

- [ ] **Step 2: 型チェックで確認**

Run: `cd /home/server/github/link-like-ui && pnpm typecheck`
Expected: エラーなしで終了。

- [ ] **Step 3: 参照整合性チェックが機能することを確認（意図的に壊して確認）**

`generationId: 102,` の行を1つ選び、一時的に `generationId: 101,`（GENERATIONSに存在しないID）に書き換える。

Run: `cd /home/server/github/link-like-ui && pnpm typecheck`
Expected: FAIL。`Type '101' is not assignable to type 'GenerationId'` 相当のエラーが出ること。

書き換えを元の値（`102`）に戻す。

Run: `cd /home/server/github/link-like-ui && pnpm typecheck`
Expected: エラーなしで終了（元に戻ったことを確認）。

- [ ] **Step 4: Commit**

```bash
git add src/Data/Members/index.tsx
git commit -m "feat(data): add Members constants (11 members)"
```

---

### Task 3: `Data/Units` モジュール（ユニット辞書 + 期別ロスター）

**Files:**
- Create: `/home/server/github/link-like-ui/src/Data/Units/index.tsx`

**Interfaces:**
- Consumes: `GenerationId`（`../Generations`）, `MemberId`（`../Members`）
- Produces: `UNITS`, 型 `Unit`/`UnitId`/`UnitCategory`, `UNIT_ROSTERS`, 型 `UnitRoster`/`UnitPeriodKey`

- [ ] **Step 1: `src/Data/Units/index.tsx` を作成**

```tsx
import type { GenerationId } from "../Generations";
import type { MemberId } from "../Members";

export type UnitCategory = "whole" | "core" | "shuffle";

export const UNITS = [
	{
		id: "hasunosora",
		name: "蓮ノ空女学院スクールアイドルクラブ",
		category: "whole",
		iconUrl: null,
	},
	{
		id: "cerise-bouquet",
		name: "スリーズブーケ",
		category: "core",
		iconUrl: "https://sukisuki.club/units/cerise-bouquet.png",
	},
	{
		id: "dollchestra",
		name: "DOLLCHESTRA",
		category: "core",
		iconUrl: "https://sukisuki.club/units/dollchestra.png",
	},
	{
		id: "mira-cra-park",
		name: "みらくらぱーく！",
		category: "core",
		iconUrl: "https://sukisuki.club/units/mira-cra-park.png",
	},
	{
		id: "edel-note",
		name: "Edel Note",
		category: "core",
		iconUrl: "https://sukisuki.club/units/edel-note.png",
	},
	{
		id: "kahomegu-gelato",
		name: "かほめぐ♡じぇらーと",
		category: "shuffle",
		iconUrl: null,
	},
	{
		id: "hasu-no-kyujitsu",
		name: "蓮ノ休日",
		category: "shuffle",
		iconUrl: null,
	},
	{
		id: "ruri-tsuzu",
		name: "るりのとゆかいなつづりたち",
		category: "shuffle",
		iconUrl: null,
	},
	{
		id: "ruri-to",
		name: "Ruri＆To",
		category: "shuffle",
		iconUrl: null,
	},
	{
		id: "princess",
		name: "PRINCEε>ε>",
		category: "shuffle",
		iconUrl: null,
	},
] as const satisfies readonly {
	id: string;
	name: string;
	category: UnitCategory;
	iconUrl: string | null;
}[];

export type Unit = (typeof UNITS)[number];
export type UnitId = Unit["id"];

export type UnitPeriodKey = GenerationId | "105-bgp";

export const UNIT_ROSTERS = [
	{ unitId: "hasunosora", period: 103, memberIds: [1031, 1032, 1021, 1022, 1033, 1023] },
	{
		unitId: "hasunosora",
		period: 104,
		memberIds: [1031, 1032, 1021, 1022, 1033, 1023, 1041, 1042, 1043],
	},
	{
		unitId: "hasunosora",
		period: 105,
		memberIds: [1031, 1032, 1033, 1041, 1042, 1043, 1051, 1052],
	},
	{
		unitId: "hasunosora",
		period: "105-bgp",
		memberIds: [1021, 1022, 1023, 1031, 1032, 1033, 1041, 1042, 1043, 1051, 1052],
	},
	{ unitId: "cerise-bouquet", period: 103, memberIds: [1031, 1021] },
	{ unitId: "cerise-bouquet", period: 104, memberIds: [1031, 1021, 1041] },
	{ unitId: "cerise-bouquet", period: 105, memberIds: [1031, 1041] },
	{ unitId: "dollchestra", period: 103, memberIds: [1032, 1022] },
	{ unitId: "dollchestra", period: 104, memberIds: [1032, 1022, 1042] },
	{ unitId: "dollchestra", period: 105, memberIds: [1032, 1042] },
	{ unitId: "mira-cra-park", period: 103, memberIds: [1033, 1023] },
	{ unitId: "mira-cra-park", period: 104, memberIds: [1033, 1023, 1043] },
	{ unitId: "mira-cra-park", period: 105, memberIds: [1033, 1043] },
	{ unitId: "edel-note", period: 105, memberIds: [1051, 1052] },
	{ unitId: "kahomegu-gelato", period: 103, memberIds: [1031, 1023] },
	{ unitId: "hasu-no-kyujitsu", period: 103, memberIds: [1032, 1021] },
	{ unitId: "ruri-tsuzu", period: 103, memberIds: [1033, 1022] },
	{ unitId: "ruri-to", period: 105, memberIds: [1033, 1032, 1042, 1052] },
	{ unitId: "princess", period: 105, memberIds: [1043, 1031, 1041, 1051] },
] as const satisfies readonly {
	unitId: UnitId;
	period: UnitPeriodKey;
	memberIds: readonly MemberId[];
}[];

export type UnitRoster = (typeof UNIT_ROSTERS)[number];
```

- [ ] **Step 2: 型チェックで確認**

Run: `cd /home/server/github/link-like-ui && pnpm typecheck`
Expected: エラーなしで終了。

- [ ] **Step 3: 参照整合性チェックが機能することを確認（意図的に壊して確認）**

`UNIT_ROSTERS` の最後の行 `{ unitId: "princess", period: 105, memberIds: [1043, 1031, 1041, 1051] },` を一時的に `{ unitId: "princess", period: 105, memberIds: [9999, 1031, 1041, 1051] },`（存在しないmemberId）に書き換える。

Run: `cd /home/server/github/link-like-ui && pnpm typecheck`
Expected: FAIL。`9999` が `MemberId` に割り当てできない旨のエラーが出ること。

書き換えを元の値（`[1043, 1031, 1041, 1051]`）に戻す。

Run: `cd /home/server/github/link-like-ui && pnpm typecheck`
Expected: エラーなしで終了。

- [ ] **Step 4: Commit**

```bash
git add src/Data/Units/index.tsx
git commit -m "feat(data): add Units constants and generation-scoped rosters"
```

---

### Task 4: ビルド検証・README更新・Changeset

**Files:**
- Modify: `/home/server/github/link-like-ui/README.md`
- Create: `/home/server/github/link-like-ui/.changeset/<auto-generated-name>.md`

**Interfaces:**
- Consumes: Task 1-3で作成した `GENERATIONS` / `MEMBERS` / `UNITS` / `UNIT_ROSTERS`

- [ ] **Step 1: 全体チェックを実行**

Run: `cd /home/server/github/link-like-ui && pnpm check`
Expected: `Checked N files` のみでエラーなし（`biome:check --fix` がタブ/ダブルクォート等を自動整形する。差分が出た場合は次のCommitステップで一緒にコミットする）。

- [ ] **Step 2: ビルドを実行し新エントリの出力を確認**

Run: `cd /home/server/github/link-like-ui && pnpm build`
Expected: ビルド成功。以下のファイルが生成されていること:

```bash
ls dist/Data/Generations/index.js dist/Data/Members/index.js dist/Data/Units/index.js dist/Data/Generations/index.d.ts dist/Data/Members/index.d.ts dist/Data/Units/index.d.ts
```

Expected: 6ファイルすべて存在（エラーなし）。

- [ ] **Step 3: knipで未使用エクスポートの新規false positiveがないことを確認**

Run: `cd /home/server/github/link-like-ui && pnpm knip`
Expected: 既存の結果と比較して `Data/Generations` `Data/Members` `Data/Units` に関する新規エラー・警告が増えていないこと（knipの`entry`パターンが`src/**/index.tsx`のため、新規エントリは自動的にエントリポイント扱いされ、未使用エクスポート警告の対象にはならない想定）。

- [ ] **Step 4: README.md に使用例を追記**

`README.md` の既存のimport例（`@suki-suki-club/link-like-ui/System/Loading` 等が並ぶ箇所）の直後に以下を追記する。

```md
import { MEMBERS } from "@suki-suki-club/link-like-ui/Data/Members";
import { GENERATIONS } from "@suki-suki-club/link-like-ui/Data/Generations";
import { UNITS, UNIT_ROSTERS } from "@suki-suki-club/link-like-ui/Data/Units";
```

- [ ] **Step 5: Changesetを追加**

`.changeset/` に新規ファイル（ファイル名は任意の kebab-case、例: `shared-constants-data.md`）を作成する。

```md
---
"@suki-suki-club/link-like-ui": minor
---

Add `Data/Generations`, `Data/Members`, `Data/Units` constants (102〜105期、メンバー11名、ユニット10件と期別ロスター) sourced from link-like-blooming-network / link-like-essentials / sukisuki-club-portal.
```

- [ ] **Step 6: Commit**

```bash
git add README.md .changeset/*.md
git commit -m "docs: document Data constants usage and add changeset"
```

---

## 検証基準

- `pnpm typecheck` が全タスク完了後にエラーなしで終了する
- `pnpm check` (biome + tailwind-canonical) がエラーなしで終了する
- `pnpm build` が成功し、`dist/Data/{Generations,Members,Units}/index.{js,d.ts}` が生成される
- `pnpm knip` に `Data/*` 関連の新規warningが出ない
- Task 2 Step 3、Task 3 Step 3の「意図的に壊して確認」で型エラーが実際に発生することを確認済み（参照整合性がコンパイル時に保証される証明）

## リスクと注意

- データは調査時点のスナップショット。メンバー追加・ユニット新設・期の進行は本パッケージ側の手動更新が必要（自動同期はスコープ外）
- アイコンURLは`sukisuki-club-portal`のデプロイ内容に依存する。ファイル名・パスが変わった場合は追従が必要
- 既存エクスポートへの変更はなく後方互換性への影響はない

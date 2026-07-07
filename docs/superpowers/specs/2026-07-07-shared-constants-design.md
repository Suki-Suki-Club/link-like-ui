# link-like-ui 共通定数（メンバー・ユニット・期）提供 設計書

日付: 2026-07-07
対象リポジトリ: `Suki-Suki-Club/link-like-ui`（本体。データの実体はここに新設する）
調査対象（データ出所、コード変更なし）: `link-like-blooming-network`（Supabase migrations）、`link-like-essentials`（`ParticipationResolver.ts`）、`sukisuki-club-portal`（アイコン画像の配信元）

## 背景と目的

`link-like-blooming-network` と `link-like-essentials` はそれぞれ独自にメンバー名・ユニット構成・期（generation）のデータを持っており、形式もスキーマも異なる（DBマスタ vs TypeScript定数）。両者の消費者（`link-like-ui`を使う各アプリ）が同じデータを再定義しなくて済むよう、`link-like-ui`から読み取り専用の定数として提供する。

調査の結果、実データは以下の場所にあった。

- キャラクター/色/期/ユニット組分けマスタ: `link-like-blooming-network/supabase/migrations/002_master_data.sql`
- 期ごとのユニット編成（シャッフルユニット含む）: `link-like-essentials/link-like-scraper/src/domain/services/ParticipationResolver.ts`
- メンバーアイコン11枚・ユニットロゴ4枚の実ファイルと配信URL: `sukisuki-club-portal`（Cloudflare Workers、`https://sukisuki.club/` にデプロイ）

## 決定事項（ユーザー確認済み）

1. **アイコン参照方式**: 画像は`link-like-ui`に同梱せず、`https://sukisuki.club/...`のURLを定数として持つ。sukisuki-club-portal側の画像が更新されればURLは不変のまま新しい画像に追従する。
2. **メンバー(MEMBERS)**: 11件。以下を除外する。
   - `＆`区切りの複合キャラ行（id 1020, 1030, 1044 — DB上の合成写真的な行で実在の1メンバーではない）
   - `大賀美沙知`（id 1011, 101期）— `＆`は含まないが`style_type=2`/`is_exist_fan_lv=false`という非アイドル扱いの属性を持ち、`sukisuki-club-portal`にもアイコンが存在しない（ポータルの実装コメント「メンバーアイコン11枚」と一致）
   - 名前とエントリーは1:1（重複なし）
3. **期(GENERATIONS)**: 102〜105期の4件。101期は登録対象メンバーが0件になるため定義から除外する。DB上の特殊行（`105期ft.梢`等のID 1051-1053、`102期`重複のID 1021、`105期BGP`のID 1059）は含めない。
4. **ユニット(UNITS)**: 10件、3カテゴリ。
   - 全体ユニット（`whole`、1件）: 蓮ノ空女学院スクールアイドルクラブ。アイコンなし。
   - コアユニット（`core`、4件）: スリーズブーケ/DOLLCHESTRA/みらくらぱーく！/Edel Note。`sukisuki-club-portal/public/units/`のロゴを持つ。
   - シャッフルユニット（`shuffle`、5件）: かほめぐ♡じぇらーと/蓮ノ休日/るりのとゆかいなつづりたち（103期限定）、Ruri＆To/PRINCEε>ε>（105期限定）。アイコンなし。
5. **ユニット構成はユニット単体では表現しない**: 全体ユニット・コアユニットは期ごとに構成員が変わるため、`UNIT_ROSTERS`（unitId × period × memberIds）として期別に定義する。シャッフルユニットも同じ構造の上で単一期のみのロスターを持つ。
6. **「105期BGP」の扱い**: `GENERATIONS`マスタには追加しない（正式な期一覧は102〜105期のまま）が、`UNIT_ROSTERS`の`period`フィールドにのみ特別なリテラル`"105-bgp"`として許可し、全体ユニットの11名構成を表現する。
7. **スコープ外**: `link-like-essentials`側の103〜105期・105期BGPの「歌唱ユニット編成」以外の粒度（例: 楽曲ごとの参加者）はモデル化しない。将来のデータ追従は自動同期せず、本パッケージを手動更新する運用とする。

## データモデル

### Generation

```ts
interface Generation {
  id: number; // 102 | 103 | 104 | 105
  label: string; // 例: "102期"
}
```

### Member

```ts
interface Member {
  id: number;
  name: string;
  generationId: GenerationId; // Generation.id のいずれか
  themeColor: string; // "#rrggbb"
  iconUrl: string; // https://sukisuki.club/icons/{id}.png
}
```

### Unit / UnitRoster

```ts
type UnitCategory = "whole" | "core" | "shuffle";

interface Unit {
  id: string; // 内部識別子(slug)。例: "cerise-bouquet"
  name: string;
  category: UnitCategory;
  iconUrl: string | null; // shuffle/wholeはnull
}

type UnitPeriodKey = GenerationId | "105-bgp";

interface UnitRoster {
  unitId: UnitId;
  period: UnitPeriodKey;
  memberIds: readonly MemberId[];
}
```

## 確定データ

### GENERATIONS（4件）

| id | label |
|---|---|
| 102 | 102期 |
| 103 | 103期 |
| 104 | 104期 |
| 105 | 105期 |

### MEMBERS（11件）

| id | name | generationId | themeColor | iconUrl |
|---|---|---|---|---|
| 1021 | 乙宗梢 | 102 | #68be8d | https://sukisuki.club/icons/1021.png |
| 1022 | 夕霧綴理 | 102 | #ba2636 | https://sukisuki.club/icons/1022.png |
| 1023 | 藤島慈 | 102 | #c8c2c6 | https://sukisuki.club/icons/1023.png |
| 1031 | 日野下花帆 | 103 | #f8b500 | https://sukisuki.club/icons/1031.png |
| 1032 | 村野さやか | 103 | #5383c3 | https://sukisuki.club/icons/1032.png |
| 1033 | 大沢瑠璃乃 | 103 | #e7609e | https://sukisuki.club/icons/1033.png |
| 1041 | 百生吟子 | 104 | #a2d7dd | https://sukisuki.club/icons/1041.png |
| 1042 | 徒町小鈴 | 104 | #fad764 | https://sukisuki.club/icons/1042.png |
| 1043 | 安養寺姫芽 | 104 | #9d8de2 | https://sukisuki.club/icons/1043.png |
| 1051 | 桂城泉 | 105 | #1ebecd | https://sukisuki.club/icons/1051.png |
| 1052 | セラス柳田リリエンフェルト | 105 | #f56455 | https://sukisuki.club/icons/1052.png |

### UNITS（10件）

| id | name | category | iconUrl |
|---|---|---|---|
| hasunosora | 蓮ノ空女学院スクールアイドルクラブ | whole | null |
| cerise-bouquet | スリーズブーケ | core | https://sukisuki.club/units/cerise-bouquet.png |
| dollchestra | DOLLCHESTRA | core | https://sukisuki.club/units/dollchestra.png |
| mira-cra-park | みらくらぱーく！ | core | https://sukisuki.club/units/mira-cra-park.png |
| edel-note | Edel Note | core | https://sukisuki.club/units/edel-note.png |
| kahomegu-gelato | かほめぐ♡じぇらーと | shuffle | null |
| hasu-no-kyujitsu | 蓮ノ休日 | shuffle | null |
| ruri-tsuzu | るりのとゆかいなつづりたち | shuffle | null |
| ruri-to | Ruri＆To | shuffle | null |
| princess | PRINCEε>ε> | shuffle | null |

### UNIT_ROSTERS（19行）

| unitId | period | memberIds |
|---|---|---|
| hasunosora | 103 | 1031,1032,1021,1022,1033,1023 |
| hasunosora | 104 | 1031,1032,1021,1022,1033,1023,1041,1042,1043 |
| hasunosora | 105 | 1031,1032,1033,1041,1042,1043,1051,1052 |
| hasunosora | "105-bgp" | 1021,1022,1023,1031,1032,1033,1041,1042,1043,1051,1052 |
| cerise-bouquet | 103 | 1031,1021 |
| cerise-bouquet | 104 | 1031,1021,1041 |
| cerise-bouquet | 105 | 1031,1041 |
| dollchestra | 103 | 1032,1022 |
| dollchestra | 104 | 1032,1022,1042 |
| dollchestra | 105 | 1032,1042 |
| mira-cra-park | 103 | 1033,1023 |
| mira-cra-park | 104 | 1033,1023,1043 |
| mira-cra-park | 105 | 1033,1043 |
| edel-note | 105 | 1051,1052 |
| kahomegu-gelato | 103 | 1031,1023 |
| hasu-no-kyujitsu | 103 | 1032,1021 |
| ruri-tsuzu | 103 | 1033,1022 |
| ruri-to | 105 | 1033,1032,1042,1052 |
| princess | 105 | 1043,1031,1041,1051 |

## 配置

新設ファミリー `src/Data/`（既存の`Home`/`System`と並ぶトップレベル。tsdownのエントリ収集は`src/{Family}/{Component}/index.tsx`を走査するため、この構造に従う）。

- `src/Data/Generations/index.tsx` — `GENERATIONS`, `Generation`, `GenerationId`
- `src/Data/Members/index.tsx` — `MEMBERS`, `Member`, `MemberId`（`Generations`の型を参照）
- `src/Data/Units/index.tsx` — `UNITS`, `Unit`, `UnitId`, `UnitCategory`, `UNIT_ROSTERS`, `UnitRoster`, `UnitPeriodKey`（`Generations`・`Members`の型を参照）

エクスポート例: `@suki-suki-club/link-like-ui/Data/Members`

## 検証方針

このリポジトリにはテストフレームワークが存在しないため、新規導入はしない。代わりに**型システムで参照整合性を保証する**。

- 各データ配列は `as const satisfies readonly {...}[]` で宣言する。`MEMBERS`の`generationId`は`GenerationId`型で拘束され、`UNIT_ROSTERS`の`unitId`/`memberIds`は`UnitId`/`MemberId`型で拘束される。存在しないIDを書くと`tsc`がコンパイルエラーにする。
- 検証コマンド: `pnpm typecheck`（`tsc --noEmit`）、`pnpm check`（biome + tailwind-canonical）、`pnpm build`（tsdownで新エントリがビルドされること）、`pnpm knip --exports`（未使用エクスポート検知に新規false positiveが出ないこと）。

## リスクと注意

- **データの陳腐化**: メンバー追加・ユニット新設・期の進行は本パッケージ側で手動更新が必要。自動同期の仕組みは今回のスコープ外。
- **`sukisuki-club-portal`のURL安定性**: アイコンURLは`sukisuki-club-portal`のデプロイ内容に依存する。ファイル名・パスが変わった場合はこのパッケージ側の定数も追従が必要。
- **後方互換性**: 新規追加のみで既存エクスポートの変更はない。Changesetは`minor`。

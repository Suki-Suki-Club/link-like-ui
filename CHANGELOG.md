# @suki-suki-club/link-like-ui

## 0.5.0

### Minor Changes

- [`58e26ac`](https://github.com/Suki-Suki-Club/link-like-ui/commit/58e26ac6c5dac7e25cdc9ca472485b7029cc0542) Thanks [@kakeru-ikeda](https://github.com/kakeru-ikeda)! - Add `Home/Dock` as an independently importable entry (`@suki-suki-club/link-like-ui/Home/Dock`, exporting `HomeLayoutDock` and its layout-dock primitives), moved out of `Home/Layout`. Remove the unused `System/FooterPanel` component and its exports.

## 0.4.0

### Minor Changes

- [#9](https://github.com/Suki-Suki-Club/link-like-ui/pull/9) [`5ecb1a8`](https://github.com/Suki-Suki-Club/link-like-ui/commit/5ecb1a8a0e53379ef8d8bb04ed3e59b1c12e9cc5) Thanks [@kakeru-ikeda](https://github.com/kakeru-ikeda)! - Add split member names, kana and English spellings, and voice actor metadata to `MEMBERS`.

## 0.3.0

### Minor Changes

- [#6](https://github.com/Suki-Suki-Club/link-like-ui/pull/6) [`eea3e74`](https://github.com/Suki-Suki-Club/link-like-ui/commit/eea3e740bb1cc8ca135ba35365b2f4d4537ee131) Thanks [@kakeru-ikeda](https://github.com/kakeru-ikeda)! - Add `Data/Generations`, `Data/Members`, `Data/Units` constants (102〜105 期、メンバー 11 名、ユニット 10 件と期別ロスター) sourced from link-like-blooming-network / link-like-essentials / sukisuki-club-portal.

## 0.2.0

### Minor Changes

- [`8d549d7`](https://github.com/Suki-Suki-Club/link-like-ui/commit/8d549d72de883b3ae05db87de3567020f877c6a4) Thanks [@kakeru-ikeda](https://github.com/kakeru-ikeda)! - Add `CasualButton` and `CasualModal` for the scalloped-corner in-game dialog style (yellow/blue 3D buttons, dashed dividers).

  **Breaking:** `Button`'s `primary` variant is renamed to `gradient`, since it's no longer the only primary-style button — `CasualButton`'s `primary` (blue) now fills that role, alongside its `secondary` (yellow) counterpart. Update any `variant="primary"` usage on `Button` to `variant="gradient"`.

  Also resizes `LoadingOverlay`'s spinner and text to 2/3 of their previous size.

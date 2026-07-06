# @suki-suki-club/link-like-ui

## 0.2.0

### Minor Changes

- [`8d549d7`](https://github.com/Suki-Suki-Club/link-like-ui/commit/8d549d72de883b3ae05db87de3567020f877c6a4) Thanks [@kakeru-ikeda](https://github.com/kakeru-ikeda)! - Add `CasualButton` and `CasualModal` for the scalloped-corner in-game dialog style (yellow/blue 3D buttons, dashed dividers).

  **Breaking:** `Button`'s `primary` variant is renamed to `gradient`, since it's no longer the only primary-style button — `CasualButton`'s `primary` (blue) now fills that role, alongside its `secondary` (yellow) counterpart. Update any `variant="primary"` usage on `Button` to `variant="gradient"`.

  Also resizes `LoadingOverlay`'s spinner and text to 2/3 of their previous size.

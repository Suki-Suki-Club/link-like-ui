# Link-Like UI

A certain UI library that looks like Link-Like-OS.

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

## Development

- Install dependencies:

```bash
pnpm install
```

- Run the playground:

```bash
pnpm run play
```

- Build the library:

```bash
pnpm run build
```

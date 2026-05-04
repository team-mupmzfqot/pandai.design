# Pandai Design System — Claude Code Guide

## Project Overview

This is the **Pandai Design System**, a shared React component library used across Pandai applications. It provides reusable UI components, design tokens, and utility functions.

- **Repo:** https://github.com/team-mupmzfqot/pandai.design
- **Stack:** React 17, TypeScript, styled-components, Vite, Vitest

## Project Structure

```
src/
  components/       # UI components (Button, Card, etc.)
  tokens/           # Design tokens — colors, typography, spacing
  utils/            # Shared utility functions
  index.ts          # Public exports
docs/               # Design principles and usage guides
.github/workflows/  # CI pipeline
```

## Commands

```bash
npm install       # Install dependencies
npm run build     # TypeScript compile
npm test          # Run tests with Vitest
npm run lint      # ESLint
npm start         # Vite dev server
```

## Component Conventions

- Each component lives in `src/components/<ComponentName>/`
- Files per component: `Component.tsx`, `Component.styles.ts`, `Component.test.tsx`
- Styles use **styled-components** — keep style logic in `.styles.ts`, not inline in the component
- Export all components from `src/components/index.ts`

## Design Tokens

Tokens live in `src/tokens/` and are the source of truth for all visual values:
- `colors.ts` — brand and semantic colors
- `typography.ts` — font sizes, weights, families
- `spacing.ts` — spacing scale

Always reference tokens instead of hardcoding values in components.

## Testing

Tests use **Vitest** + jsdom. Run with `npm test`. Test files live alongside components (`*.test.tsx`).

Coverage is configured for all `src/**/*.{ts,tsx}` files, excluding test files.

## Git Workflow

- Branch from `main` for new features or fixes
- Push to `origin` (https://github.com/team-mupmzfqot/pandai.design)
- Keep commits focused; reference the component or token area in the message

# Pandai Design System 1.5

A comprehensive design system for modern web applications built with React and TypeScript.

## Features

- Reusable React components
- TypeScript support
- Customizable themes and styles
- Accessible components
- Comprehensive documentation

## Installation

```bash
npm install pandai-design-system
```

## Usage

```tsx
import { Button } from 'pandai-design-system'

function App() {
  return <Button variant="primary">Click me</Button>
}
```

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Testing

```bash
npm test
```

### Storybook

```bash
npm run storybook
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT

---

## Repo maintenance log

- **2026-06-09 — unused asset cleanup** (commit `8ad9d6b`, branch `cleanup/remove-unused-assets`): removed **161 files referenced nowhere** in the repo (151 orphaned image assets + 10 redundant `.gitkeep`), identified via a repo-wide basename reference sweep against all HTML/CSS/JS/TS/JSON/MD. Tracked images: 635 → 484. No code, HTML, config, or docs were touched. Per-designer breakdowns are logged at the foot of `zul.design.md`, `syakila.design.md`, `nadia.design.md`, and `azrai.git.md`. Everything is recoverable from git history (`git checkout staging -- <path>`).
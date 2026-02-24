# UC Remote 3 — API Reference App

## What this is

A single-page developer reference for the Unfolded Circle Remote 3 local REST + WebSocket API. Built with React 18, TypeScript, Vite, and an iOS Liquid Glass design system.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build & verify

```bash
npm run build      # TypeScript check + Vite production build → dist/
npm run preview    # Preview production build locally
npx tsc -b         # Type check only (no emit)
```

There are no tests yet. Verify changes by running `npm run build` (must pass with zero errors) and visually checking the dev server.

## Project structure

```
src/
├── main.tsx                  # Entry point — imports global CSS + Prism theme
├── App.tsx                   # Root layout: Sidebar + scrollable content sections
├── index.css                 # Global styles, Liquid Glass CSS custom properties
├── prism-theme.css           # Syntax highlighting theme for code blocks
├── types/index.ts            # All TypeScript interfaces
├── components/               # Reusable UI components
│   ├── GlassCard.tsx         # Core glass panel (backdrop-filter blur)
│   ├── CodeBlock.tsx         # Syntax-highlighted code + copy button (Prism.js)
│   ├── MethodBadge.tsx       # GET/PUT/POST/etc colored pill badges
│   ├── CollapsibleSection.tsx
│   ├── EndpointTable.tsx     # Filterable/sortable endpoint reference table
│   ├── ButtonMap.tsx         # Interactive SVG diagram of the Remote 3
│   └── Sidebar.tsx           # Glass nav sidebar with scroll-spy
├── sections/                 # One component per documentation section
│   ├── Overview.tsx
│   ├── Authentication.tsx
│   ├── Discovery.tsx
│   ├── EndpointReference.tsx
│   ├── SendingCommands.tsx
│   ├── WebSocketAPI.tsx
│   ├── ButtonLayout.tsx
│   ├── CorsProxy.tsx
│   ├── Simulator.tsx
│   └── CommunityProjects.tsx
└── data/                     # Static typed data (no runtime fetching)
    ├── endpoints.ts          # 60+ REST API endpoint definitions
    ├── buttons.ts            # All 21 physical button IDs
    ├── commands.ts           # Code examples (curl, JSON, JS, YAML)
    └── sections.ts           # Sidebar navigation definitions
```

## Key conventions

- **Styling**: All via CSS custom properties in `index.css` — no CSS framework. Glass effects use `backdrop-filter: blur()` and `rgba()` backgrounds. Modify `--glass-*` and `--accent-*` variables to change the design system.
- **No routing library**: Single-page scroll navigation. Sections use `id` attributes and `scrollIntoView()`. Active section tracked by `IntersectionObserver` in `App.tsx`.
- **Data-driven**: API endpoints, buttons, and code examples live in `src/data/`. Add new endpoints there, not inline in components.
- **Inline styles**: Components use React inline styles (not CSS modules). This is intentional for the glass effects where dynamic values are needed.
- **Code blocks**: Use the `<CodeBlock>` component with `language` and `code` props. Prism.js handles highlighting. Supported languages: `bash`, `json`, `javascript`, `typescript`, `yaml`.

## Adding a new API endpoint

Edit `src/data/endpoints.ts` and add to the array:

```ts
{ id: 'unique-id', method: 'GET', path: '/api/...', description: '...', category: 'entities', authRequired: true },
```

It will automatically appear in the filterable endpoint table.

## Adding a new code example

Edit `src/data/commands.ts` and add to the array:

```ts
{ id: 'unique-id', title: '...', description: '...', language: 'json', category: 'button-press', code: `...` },
```

Then reference it in the appropriate section component.

## CORS proxy

The Remote 3 has **no CORS headers**. The Vite dev proxy in `vite.config.ts` forwards `/api/*` and `/ws` to the remote. Change the `target` IP to match your device or use `http://localhost:8080` for the Docker simulator.

## Docker simulator (no hardware needed)

```bash
docker run -d -p 8080:8080 -p 8443:8443 -e UC_MODEL=UCR3 unfoldedcircle/core-simulator:latest
```

Credentials: `web-configurator` / `1234`. Then set proxy target to `http://localhost:8080`.

# UC Remote 3 — Virtual Remote

## What this is

An interactive digital remote control app for the Unfolded Circle Remote 3. Control your device from a browser — press physical buttons, interact with entities (lights, media players, switches), and view device pages. Built with React 18, TypeScript, Vite, and an iOS Liquid Glass design system.

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
├── main.tsx                      # Entry point — imports global CSS
├── App.tsx                       # Root: ConnectionProvider + tab switching
├── api.ts                        # API service layer (fetch-based)
├── ConnectionContext.tsx          # React context: auth, state, localStorage
├── index.css                     # Global styles, Liquid Glass design system
├── types/index.ts                # All TypeScript interfaces
├── components/
│   ├── GlassCard.tsx             # Core glass panel (backdrop-filter blur)
│   ├── ButtonMap.tsx             # Interactive SVG remote with 21 buttons
│   ├── RemoteControl.tsx         # Physical button remote view (Tab 1)
│   ├── DevicesView.tsx           # Entity/page grid view (Tab 2)
│   ├── EntityCard.tsx            # Per-entity control card (media, light, switch, etc.)
│   ├── ConnectionScreen.tsx      # Login form (username + PIN)
│   ├── StatusBar.tsx             # Connection status + settings
│   └── TabBar.tsx                # Bottom tab navigation (Remote / Devices)
└── data/
    └── buttons.ts                # All 21 physical button IDs and zones
```

## Key conventions

- **Styling**: All via CSS custom properties in `index.css` — no CSS framework. Glass effects use `backdrop-filter: blur()` and `rgba()` backgrounds.
- **Inline styles**: Components use React inline styles (intentional for glass effects with dynamic values).
- **API calls**: All in `src/api.ts` using native `fetch()`. No HTTP client library.
- **State**: `ConnectionContext.tsx` manages auth, device info, entities, and pages. Credentials persist in localStorage.
- **Two tabs**: "Remote" (physical button SVG) and "Devices" (entity controls fetched from the device).
- **Data-driven**: Button definitions live in `src/data/buttons.ts`.

## CORS proxy

The Remote 3 has **no CORS headers**. The Vite dev proxy in `vite.config.ts` forwards `/api/*` and `/ws` to the remote. Change the `target` IP to match your device or use `http://localhost:8080` for the Docker simulator.

## Docker simulator (no hardware needed)

```bash
docker run -d -p 8080:8080 -p 8443:8443 -e UC_MODEL=UCR3 unfoldedcircle/core-simulator:latest
```

Credentials: `web-configurator` / `1234`. Then set proxy target to `http://localhost:8080` in `vite.config.ts`.

# Repo-specific Copilot instructions

This file gives concise, actionable guidance for an AI coding agent working in this repository.
Refer to specific files below when making changes.

- **Big picture**: This repo contains three cooperating apps:
  - `Main Portal` (React + Vite) — root app served by `vite` (dev port 3000). See `vite.config.ts`.
  - `Admin Dashboard` (React + Vite) — separate app in `Admin Dashboard with Tabs/` (dev port ~5173).
  - `Backend API` (Express) — single `server.js` API & file server (dev port 3001).

- **Primary commands** (root):
  - `npm run dev` — starts all three processes concurrently (`vite --host`, `node server.js`, and admin dev). See `package.json` `dev` script.
  - `npm run frontend` — portal only (`vite --host`).
  - `npm run server` — backend only (`node server.js`).
  - `npm run admin` — admin app dev (runs `npm run dev` in `Admin Dashboard with Tabs/`).

- **Dev proxy & ports**: The root `vite.config.ts` proxies `/api` and `/assets` to `http://127.0.0.1:3001`. Expect portal dev on 3000 and backend on 3001. Admin runs independently (5173) and also talks to the backend API.

- **Important files to read before changing behavior**:
  - `server.js` — REST endpoints, auth/session logic, file upload handling, WebSocket broadcasting, production static-serving expectations.
  - `vite.config.ts` — dev server proxy and path aliases.
  - `ARCHITECTURE.md` — rationale for the multi-app split (admin vs portal vs backend).
  - `src/data/portalContent.json` — single source-of-truth content file written by the backend.
  - `public/assets/` — user-uploaded files; server serves these first.

- **Auth/session conventions (critical)**:
  - Login: `POST /api/login` with JSON `{ password }` returns `{ sessionId }`.
  - Auth header: the backend expects the session token in the `x-session-id` header on protected endpoints (e.g. `POST /api/upload`, `POST /api/save-content`, `POST /api/logout`).
  - Sessions are stored in-memory in `server.js` (Map). Don't assume persistence across server restarts.

- **File uploads & storage**:
  - Upload endpoint: `POST /api/upload` with form field name `file` and query param `folder` (e.g. `/api/upload?folder=banners`).
  - Uploaded files are saved under `public/assets/<folder>` and the Express app serves `public/assets` before any built portal assets.

- **Content persistence**:
  - `POST /api/save-content` writes JSON to `src/data/portalContent.json`. This endpoint requires `x-session-id` auth.
  - `GET /api/content` reads that file and returns default skeleton if missing.
  - After saving, the server broadcasts a WebSocket message (`{ type: 'content-updated', senderSessionId, timestamp }`) to connected clients **excluding** the sender.

- **WebSocket integration**:
  - The backend creates a `WebSocketServer` on the same HTTP server (see `server.js`).
  - Clients should open a WS to the same host and send an auth message: `JSON.stringify({ type: 'auth', sessionId })` so the server can tag the socket.

- **Environment variables of note**:
  - `ADMIN_PASSWORD` — default fallback is `admin123` in code; override in production.
  - `EXCHANGE_RATE_API_KEY` — optional key used by `/api/utility/rates` (fallbacks exist).
  - `NODE_ENV=production` — server changes behavior to serve built files from `public/portal` and `public/admin`.

- **Build / production notes**:
  - The root `vite` build writes to `build` by default (`vite.config.ts` outDir). `server.js` expects production files at `public/portal` and `public/admin`.
  - When preparing production, build both apps and ensure the built assets are placed under `public/portal` (portal build) and `public/admin` (admin build). The repo does not include an automated copy step — perform or script this in CI/CD.

- **Patterns & conventions to follow when coding**:
  - Prefer the existing REST endpoints and in-memory session approach for feature parity; avoid introducing a stateful DB without explicit migration steps.
  - Use `public/assets` for user content and keep file paths stable (server returns `/assets/<folder>/<filename>`).
  - For live UI updates, reuse the WebSocket `content-updated` broadcast rather than polling.
  - Respect dev proxy rules — modify `vite.config.ts` if you add new API routes that must be proxied to the backend.

- **Quick examples**:
  - Login (fetch):
    ```js
    const r = await fetch('/api/login', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({password}) });
    const { sessionId } = await r.json();
    // use sessionId in `x-session-id` for protected calls
    ```
  - Upload (curl):
    ```bash
    curl -H "x-session-id: $SID" -F "file=@banner.jpg" "http://localhost:3001/api/upload?folder=banners"
    ```

- **When you are uncertain**:
  - Inspect `server.js` for the canonical behavior (auth, file layout, endpoints).
  - Read `ARCHITECTURE.md` for rationale and run `npm run dev` to reproduce the standard local environment.

If anything in these instructions is unclear or you want more examples (e.g., CI copy scripts for production builds, recommended test commands), tell me which part to expand. 

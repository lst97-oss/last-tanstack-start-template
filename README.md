# last-tanstack-start-template

Blank TanStack Start starter (no CMS). Boots standalone: placeholder `/`, REST health at `/api/*`. Owns the canonical business-backend kernel in `src/server/` — the same DDD design `payload-tanstack-start-template` mirrors with its CMS extras.

## Quickstart

```bash
bun install
cp .env.example .env   # fill DATABASE_URL
bun run db:up          # local Postgres via compose.yaml (demo/demo-secret-pw@127.0.0.1:5434/template_demo)
bun run generate-routes  # regenerate src/routeTree.gen.ts
bun run dev            # http://localhost:3000
```

## Scripts

| Script | Purpose |
|---|---|
| `dev` | Vite dev server on :3000 |
| `build` | `vite build` (Dockerfile calls this; never repeat it elsewhere) |
| `start` | Run Nitro output for the active preset (`scripts/start.ts`: `node-server` → `.output/server/index.mjs`, default `vercel` → `.vercel/output/functions/__server.func`) |
| `generate-routes` | Regenerate `src/routeTree.gen.ts` after adding/removing route files |
| `db:up` | Start local Postgres (`compose.yaml`) matching `.env` |
| `typecheck` | `bun check` (Bun 1.4.3+ native checker) |
| `smoke` | Boot-contract check against a running server (`bun run smoke [baseUrl]`): `/` 200, `/api/live` 200 live, `/api/ready` 200\|503 with report |
| `format` | Apply Biome formatting |

## Structure

```
src/server/                  env.ts (2 keys), config/business-env.ts (lazy connection string),
                             db/business-sql.ts (Bun-native Postgres + Drizzle seam),
                             http/ (envelope + errors + withContext + zod validation),
                             observability/logger.ts, modules/health (live + ready reference slice)
src/routes/                  __root (ThemeProvider + Base-UI Toaster), index placeholder,
                             api.live (liveness), api.ready (readiness)
src/plugins/                 business-shutdown.ts (Nitro close hook + SIGINT/SIGTERM drain)
src/lib/                     site-not-found.tsx, site-error.tsx, utils.ts (cn)
src/components/ui/           shadcn baseline actually exercised (button + toast)
compose.yaml                 local Postgres matching .env (bun run db:up)
scripts/                     smoke.ts (boot contract), start.ts (preset-resolving entry)
```

## Adding a frontend feature

Same conventions as the Payload sibling: TanStack Query (`useSuspenseQuery`, provider auto-supplied by `setupRouterSsrQueryIntegration` in `src/router.tsx` — never add an explicit `QueryClientProvider`), TanStack Form (`useForm` + `form.Field` colocated per route), TanStack Store (`createStore` at feature module scope). Styling follows `DESIGN.md` rules in the Payload repo (semantic tokens, Tailwind-first) — `src/styles/app.css` carries the same token system.

## Relationship to payload-tanstack-start-template

This repo owns the kernel. That repo mirrors `src/server/` file-for-file except:
- `src/server/env.ts` — extended with `PAYLOAD_SECRET` + `PAYLOAD_PUBLIC_SERVER_URL`.
- `src/server/security/payload-server-url.ts` — CMS-only extra (loopback guard for `payload.config.ts`).
- `src/plugins/payload-shutdown.ts` — also drains cached Payload instances.

Sync procedure lives in `AGENTS.md`. Never fix drift by editing one side only — change the kernel here first, then mirror.

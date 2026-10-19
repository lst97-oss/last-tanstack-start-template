# Template Guidelines

Blank TanStack Start (RSC, Nitro), no CMS. Keep it minimal: every file here must justify itself for boot (`/`, `/api/*`). App content (site pages, extra business modules, email/storage/seeds) belongs in the consuming project, not here.

## Load-bearing wiring — do not "simplify"

- `vite.config.ts` plugin order is the boot contract: `tailwindcss → viteRsc({ serverHandler: false }) → reactStartRscVitePlugin() → tanStackStart({ rsc }) → viteReact({ compiler }) → nitro()`. `serverHandler: false` is required — the default RSC handler 500s every request.
- `src/router.tsx` uses TanStack's default search serializer. (The Payload sibling overrides it with `payloadParseSearch`/`payloadStringifySearch` because Payload admin pagination breaks under JSON-quoted values — not needed here.)
- `src/router.tsx` carries a load-bearing `import type {} from '@tanstack/react-start'` (no runtime cost). The `server` key on file-route options comes from Start's `router-core` augmentation, which is only in the program when something imports the package — without it, `server.handlers` API routes fail typecheck with "'server' does not exist in type 'ParamsOptions<…>'". Do not remove.
- `vite.config.ts` keeps `resolve.alias` (`@/` → `src/`) + `tsconfigPaths: true`: the Nitro dev runner resolves the `src/plugins/business-shutdown.ts` plugin (and its `@/server/*` imports) outside the Start/RSC transform pipeline, where the tsconfig alias alone is not applied. Dropping the alias breaks boot with "Cannot find module '@/server/…'".
- `src/plugins/business-shutdown.ts` drains the business Postgres pool on Nitro `close` + SIGINT/SIGTERM. Without it the pool holds the process open until the platform force-kills it.
- `src/server/http/with-context.ts` MUST return handler-built `Response`s as-is (ready's 200|503) and only wrap plain data in the `ok()` envelope.

## Kernel sharing with last-payload-tanstack-start-template

- This repo is canonical for `src/server/` code. The Payload repo pulls it automatically via its kernel-sync workflow (weekly schedule + manual dispatch + push-through from here); per-repo exclusions there are `env.ts` (that repo extends the base env with `PAYLOAD_*` keys), `security/payload-server-url.ts`, and the tailored `AGENTS.md`/`README.md` docs.
- Change procedure: change the kernel here first, with tests (`tests/` mirror module basenames, fakes as deps params, never `mock.module`), run this repo's verification checklist, then merge. The Payload repo syncs on its own — never mirror changes there by hand. The optional push-through (`notify-kernel` workflow below) needs a `KERNEL_DISPATCH_TOKEN` secret, otherwise the Payload schedule still picks the change up.
- Never add CMS imports to this kernel. CMS-owned guards live in the consuming template.

## Conventions

- Runtime is Bun (`Bun.env`, Web APIs). Alias `@/*` → `src/*`. Single version source: `.bun-version` (Dockerfile `ARG` + CI `bun-version-file` read it — bump both lines together).
- Data layer: TanStack Query (`useSuspenseQuery`, provider auto-supplied by `setupRouterSsrQueryIntegration` in `src/router.tsx` — never add an explicit `QueryClientProvider`), TanStack Form (`useForm` + `form.Field` colocated per route; `formOptions` + `createServerValidate` from `@tanstack/react-form-start` only for server-validated forms), TanStack Store (`createStore` at feature module scope + `useStore`/`useSelector`; seed per-request via loader, never mutate module-scope state on the server). Reach for Query for server state, Form for user input, Store for client UI state — in that order.
- Styling: Tailwind v4 (`src/styles/app.css` imported by the root shell). Semantic tokens over hardcoded colours, neutral-by-default, status colours with purpose, Tailwind-first/CSS-when-clearer (same rules as the Payload sibling's DESIGN.md). shadcn registry components live in `src/components/ui/` (`base-nova`, neutral, lucide) — use them before hand-rolling primitives, add via `bunx shadcn add <name>`, mount shared providers (e.g. `<Toaster />`) once in the root shell.
- Shell providers are fixed: `ThemeProvider` (`next-themes`, class mode) + Base-UI `Toaster` in `__root.tsx`; site toast is `toast.add()` from `@/components/ui/toast` — never `sonner`. Unused `bunx shadcn add` drops get deleted with their deps, never kept "for later".
- Style (Biome): 2-space, 120 cols, single quotes, JSX double, semicolons as-needed, trailing commas. Linter covers `src/server/**` only; formatter skips `src/styles`, `routeTree.gen.ts`, `*.json`.
- Tests (when added): mirror module basename under `tests/`, never co-located. Fakes are injected ports (`fetcher = fetch`), never `mock.module`.
- Changes to generated files are forbidden: `src/routeTree.gen.ts` — regenerate via `bun run generate-routes`.

## Verification before declaring done

- `bun run typecheck` clean (`bun check`, Bun 1.4.3+ native).
- `bunx @biomejs/biome check .` clean; `biome lint src/server` clean; imports organized.
- `bun run format` applied (formatter covers everything except `*.json`, `src/styles`, `routeTree.gen.ts`).
- After route changes: `bun run generate-routes`, then `bun run dev` + `bun run smoke` — `/` 200, `/api/live` 200 live, `/api/ready` 200|503 with report.
- After kernel changes: no manual mirroring — the Payload repo's kernel-sync pulls them automatically (weekly + dispatch). Just verify here.
- Never read exit codes off pipelines (`cmd | tail; echo $?` reports `tail`). Capture first, read second.

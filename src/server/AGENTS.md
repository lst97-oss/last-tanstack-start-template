# src/server — business backend kernel

## Role / pipeline position

Business logic lives here, DDD-style, behind thin TanStack Start route adapters in `src/routes/api.*.ts` (routes extract data fns, wrap with `withContext`, never contain logic). This tree is the canonical kernel: `payload-tanstack-start-template` consumes the same design (its `src/server/` mirrors these files; CMS-only extras like the Payload origin guard live in that repo, not here).

Module map — `http/`: `errors.ts` (`HttpError`, `toHttpError`), `response.ts` (`ok`/`fail` envelope), `with-context.ts` (requestId, logging, `withAuth` stub; passes through handler-built `Response`s), `validation.ts` (`parseWith` zod → 400 `VALIDATION_ERROR`); `observability/logger.ts` (structured console, sink-injectable); `db/business-sql.ts` (lazy Bun SQL + Drizzle seam); `config/business-env.ts` (lazy connection string); `env.ts` (required boot env, dual-runtime); `modules/<name>/{domain,application,infrastructure,http}` (one bounded context per dir; `health` is the reference slice: live liveness + ready readiness).

## Invariants

- Layer direction: `http → application → domain`; ports (e.g. `DbProbe`) are declared in `application`, implemented in `infrastructure`. Domain stays pure.
- Envelope is fixed: `ok()` → `{ data }`, `fail()` → `{ error: { code, message } }`, `cache-control: no-store` default. Never hand-roll `Response.json` in modules.
- `HttpError.expose` defaults to `status < 500`: 5xx wire messages are generic; the real message goes to logs only.
- `withContext` never throws and always echoes `x-request-id` (inbound header or `crypto.randomUUID()`); live/ready probes stay outside `withAuth`. Handler-built `Response`s pass through (ready's 200|503 preserved); plain data gets the `ok()` envelope.
- Input validation uses `parseWith(schema, input)` only (`validation.ts` also holds `parseJsonBody`, `parseSearchParams`, `parsePaginationParams`) — zod failures throw `HttpError(400, 'VALIDATION_ERROR', '<path>: <message>; …')` (`expose: true`). Malformed JSON bodies are 400 `MALFORMED_JSON`. Pagination: limit 1–100 default 20, offset ≥ 0 default 0, enforced not clamped. No per-module 400 mapping.
- Liveness vs readiness: `/api/live` never touches I/O (always 200 when the process is alive); `/api/ready` is the DB-backed probe (503 when degraded). Liveness checks must never probe the DB — a DB outage must not kill-loop the container.
- Probes/adapters never reject: failures resolve to `{ ok: false, ... }` so use cases need no try/catch of their own.
- Dual-runtime: `env.ts` + `config/business-env.ts` stay Bun/Node-safe (`typeof Bun` guards); `db/business-sql.ts` is Bun-only — never import it from a Node-only CLI graph.
- `getServerEnv()` gains no new required keys; business config resolves lazily via `getBusinessEnv()` (`BUSINESS_DATABASE_URL`, else `DATABASE_URL`).
- One shared client: new modules reuse `getBusinessSql()` / `getBusinessDb()`; no per-module pools, env parsing, or migration runners.
- Tests mirror the basename under `tests/`, inject fakes via deps params, never `mock.module`. TDD red → green per slice.
- Do-not-"fix" seams: `getBusinessDb()` is callerless until the first table-backed module — keep it; `withAuth` is a 501 stub marking the Better Auth seam — don't call it; `health` is unauthenticated by design.
- No Hono, no CMS imports: this kernel never imports Payload (or any CMS). CMS-owned guards live in the consuming template.
- Kernel parity: keep these files byte-identical with `payload-tanstack-start-template/src/server/` except for `env.ts` (which that repo extends with CMS keys) and CMS-only extras that repo adds. See root `AGENTS.md` for the sync procedure.

## Conventions

- New-module recipe: `domain/` types + pure fns → `application/` use case with deps param → `infrastructure/` adapters → `http/` split of `getXData` (data) + `handleXGet` (`ok`-wrapped) → route `GET: (ctx) => withContext(async () => getXData())(ctx)`, keeping the literal `server:` key.
- Log events: `request.start { requestId, method, path }`, `request.complete { requestId, status, latencyMs }`, `request.error { requestId, code, status }`; scope via `logger.child({ requestId })`.
- Units: `latencyMs` numbers, `uptimeSeconds` integers; probe timeout 2000 ms (`DB_PROBE_TIMEOUT_MS`).
- Style: 2-space, 120 cols, single quotes, semicolons as-needed (Biome); lazy singletons, no import-time side effects.

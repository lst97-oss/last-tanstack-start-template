# `src/server/` — business backend

This is where the app's own backend lives: HTTP plumbing, database access, and one folder per business area (`modules/`). No CMS here — this template is Payload-free.

```
src/server/
├── http/               Response envelope + errors + request wrapper + zod validation
├── observability/      Structured logger
├── db/                 Business Postgres client (Bun-native)
├── config/             Business env (connection string resolution)
├── env.ts              Required boot env (database + NODE_ENV)
└── modules/
    └── health/         Reference slice: live (no I/O) + ready (DB probe) → application → infrastructure → http
```

## How a request flows

```
route (src/routes/api.*.ts)  thin adapter, no logic
  └─ withContext()            request-id, logs, error mapping
       └─ getXData()          module's data function
            └─ use case       application/ — orchestrates, takes deps as params
                 ├─ domain/   pure types + functions, no I/O
                 └─ infrastructure/  database, external services
```

Health is the worked example: `domain/health.ts` builds the report (`buildLiveReport` for liveness, `buildHealthReport` for readiness), `application/get-health.ts` runs the probe, `infrastructure/db-probe.ts` pings Postgres, `http/health-handler.ts` wraps it in the envelope. `/api/live` never touches the DB (liveness); `/api/ready` is the DB-backed probe (readiness, 503 when degraded).

## Rules of thumb

- **One shared client.** Need Postgres? Call `getBusinessSql()` (raw SQL) or `getBusinessDb()` (Drizzle). Never open your own pool.
- **One shared envelope.** Return data with `ok()`, failures with `fail()` / `HttpError`. Clients always see `{ data }` or `{ error: { code, message } }`. Handlers that already build a `Response` (ready: 200|503) pass through `withContext` untouched.
- **Errors stay typed.** `HttpError(status, code, message)`; 5xx messages are hidden from the wire automatically (`expose` defaults to `status < 500`).
- **Validation is shared.** Parse untrusted input with `parseWith(schema, input)` (`http/validation.ts`) — zod failures throw `HttpError(400, 'VALIDATION_ERROR', '<path>: <message>; …')`. Bodies go through `parseJsonBody(request, schema)` (malformed JSON → 400 `MALFORMED_JSON`); query strings through `parseSearchParams(url, schema)` with coercible fields; pagination through `parsePaginationParams(url)` (limit 1–100 default 20, offset ≥ 0 default 0). Never hand-roll 400 mapping per module.

## Adding a new business area

Copy the health slice layer by layer (`modules/health/` → `modules/<name>/`): domain types first, then the use case, then infrastructure, then the `getXData` / `handleXGet` split, finally the route file. The per-directory `AGENTS.md` next to this file has the exact recipe and the invariants reviewers will check.

## Deliberately not here (yet)

- **No auth wrapper.** `withAuth` is a stub returning 501 — Better Auth session verification plugs in there when it lands.
- **No CMS.** Payload (or any CMS) integration lives in `payload-tanstack-start-template`, which mirrors this kernel. CMS-only guards must not be added here.
- **No Hono.** TanStack Start route handlers plus this kernel are the only HTTP layer.

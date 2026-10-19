import { z } from 'zod'

import { HttpError } from '@/server/http/errors'

// Shared zod → 400 mapper so every module reports validation failures the
// same way: HttpError(400, 'VALIDATION_ERROR', '<path>: <message>; …').
// Throwing (not returning) keeps use cases free of result-union plumbing —
// withContext maps it to { error: { code, message } } with status 400.
export function parseWith<T>(schema: z.ZodType<T>, input: unknown): T {
  try {
    return schema.parse(input)
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new HttpError(400, 'VALIDATION_ERROR', fromZodIssues(error.issues))
    }
    throw error
  }
}

// Parse a JSON request body against a schema: malformed JSON is 400
// MALFORMED_JSON; schema failures go through parseWith (400
// VALIDATION_ERROR). Use in POST/PATCH/PUT handlers.
export async function parseJsonBody<T>(request: Request, schema: z.ZodType<T>): Promise<T> {
  let json: unknown
  try {
    json = await request.json()
  } catch {
    throw new HttpError(400, 'MALFORMED_JSON', 'request body is not valid JSON')
  }
  return parseWith(schema, json)
}

// Parse URL query params against a schema: pass request.url and get a typed
// object. Expects a z.object of coercible fields (z.coerce.number() etc.)
// since every value arrives as a string. Use in GET list/filter handlers.
export function parseSearchParams<T>(url: string, schema: z.ZodType<T>): T {
  let params: URLSearchParams
  try {
    params = new URL(url).searchParams
  } catch {
    throw new HttpError(400, 'VALIDATION_ERROR', 'url: request URL is not valid')
  }
  return parseWith(schema, Object.fromEntries(params))
}

// Shared pagination query: every list endpoint takes the same ?limit=&offset=.
// Defaults limit 20, caps at 100 so a missing param can never trigger an
// unbounded read. Out-of-range values are 400 VALIDATION_ERROR (client
// bug), not silent clamping.
export const paginationQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
})

export type Pagination = z.infer<typeof paginationQuerySchema>

export function parsePaginationParams(url: string): Pagination {
  return parseSearchParams(url, paginationQuerySchema)
}

function fromZodIssues(issues: z.ZodError['issues']): string {
  if (issues.length === 0) return 'invalid input'
  return issues
    .map((issue) => {
      const path = issue.path.length > 0 ? issue.path.join('.') : 'value'
      return `${path}: ${issue.message}`
    })
    .join('; ')
}

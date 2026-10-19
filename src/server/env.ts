import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
})

export type ServerEnv = z.infer<typeof envSchema>

let cached: ServerEnv | null = null

export function getServerEnv(): ServerEnv {
  if (cached) return cached
  // Bun/Node-safe: keep this module free of Bun-only imports so future CLI
  // graphs running under Node can share it. Prefer Bun.env when present.
  const source = typeof Bun !== 'undefined' ? Bun.env : process.env
  cached = envSchema.parse(source)
  return cached
}

import type { NitroAppPlugin } from 'nitro/types'

import { closeBusinessSql } from '@/server/db/business-sql'

let shutdownArmed = false

function armProcessHandlers(): void {
  // Bun's serve() does not translate SIGTERM/SIGINT into Nitro's `close`,
  // so trap the signals here, drain, then exit. Idempotent with the hook.
  if (shutdownArmed || typeof process === 'undefined') return
  shutdownArmed = true
  for (const signal of ['SIGINT', 'SIGTERM'] as const) {
    process.once(signal, () => {
      void closeBusinessSql().finally(() => process.exit(0))
    })
  }
}

// Drains the business Postgres pool so the process exits cleanly instead of
// hanging until the platform force-kills it, dropping in-flight work.
const businessShutdownPlugin: NitroAppPlugin = (nitroApp) => {
  armProcessHandlers()
  nitroApp.hooks.hook('close', () => closeBusinessSql())
}

export default businessShutdownPlugin

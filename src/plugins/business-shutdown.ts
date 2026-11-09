import type { NitroAppPlugin } from 'nitro/types'

import { closeBusinessSql } from '@/server/db/business-sql'
import { getRequestLogger } from '@/server/observability/logger'

const logger = getRequestLogger().child({ component: 'shutdown', role: 'app' })

// srvx handles SIGINT/SIGTERM (unless CI or TEST is set): it stops accepting, lets in-flight requests finish,
// then runs Nitro's `close` hook. Drain the business Postgres pool there and exit, so an idle pool cannot hold
// the process until the platform force-kills it.
const businessShutdownPlugin: NitroAppPlugin = (nitroApp) => {
  nitroApp.hooks.hook('close', async () => {
    const startedAt = performance.now()
    // srvx's "Stopping server gracefully" progress line has no newline; end it so the JSON log starts clean.
    process.stderr.write('\n')
    logger.info('shutdown.started')
    const failed = await closeBusinessSql().then(
      () => 0,
      () => 1,
    )
    logger.info('shutdown.drained', { durationMs: Math.round(performance.now() - startedAt), failed })
    logger.info('shutdown.exit', { code: 0 })
    process.exit(0)
  })
}

export default businessShutdownPlugin

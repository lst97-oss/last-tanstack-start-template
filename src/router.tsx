import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
// Load-bearing type import (no runtime cost): @tanstack/react-start's
// router-core augmentation is what adds the `server` key to file-route
// options. Without any Start import in the program, API routes fail with
// "'server' does not exist in type 'ParamsOptions<…>'". Do not remove.
import type {} from '@tanstack/react-start'
import { getContext } from '@/integrations/tanstack-query/root-provider'
import { SiteError } from '@/lib/site-error'
import { SiteNotFound } from '@/lib/site-not-found'
import { routeTree } from '@/routeTree.gen'

export function getRouter() {
  const context = getContext()
  const router = createTanStackRouter({
    routeTree,
    context,
    defaultNotFoundComponent: SiteNotFound,
    defaultErrorComponent: SiteError,
  })

  setupRouterSsrQueryIntegration({ router, queryClient: context.queryClient })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}

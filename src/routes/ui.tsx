import { createFileRoute, lazyRouteComponent, notFound } from '@tanstack/react-router'
import { SiteNotFound } from '@/lib/site-not-found'

export const Route = createFileRoute('/ui')({
  beforeLoad: () => {
    if (!import.meta.env.DEV) throw notFound()
  },
  component: import.meta.env.DEV
    ? lazyRouteComponent(() => import('@/features/ui-showcase/page'), 'UiShowcase')
    : () => null,
  notFoundComponent: SiteNotFound,
  head: () => ({ meta: [{ title: 'UI showcase' }, { name: 'robots', content: 'noindex, nofollow' }] }),
})

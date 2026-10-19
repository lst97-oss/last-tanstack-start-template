import { describe, expect, test } from 'bun:test'
import { createMemoryHistory, createRootRoute, createRouter, RouterProvider } from '@tanstack/react-router'
import { renderToStaticMarkup } from 'react-dom/server'

const feature = 'src/features/ui-showcase'

describe('UI showcase', () => {
  test('renders every section on the server without duplicate IDs', async () => {
    const { UiShowcase } = await import('@/features/ui-showcase/page')
    const router = createRouter({
      routeTree: createRootRoute({ component: UiShowcase }),
      history: createMemoryHistory({ initialEntries: ['/'] }),
    })
    await router.load()
    const html = renderToStaticMarkup(<RouterProvider router={router} />)
    expect(html).toContain('data-slot="sidebar-container"')
    expect(html).toContain('data-slot="sidebar-trigger"')
    expect(html).toContain('aria-label="Showcase sections"')
    expect(html.includes('aria-label="Switch workspace"')).toBe(true)
    expect(html.includes('aria-label="Open account menu"')).toBe(true)
    expect(html.includes('Acme Inc')).toBe(true)
    expect(html.includes('Platform')).toBe(true)
    for (const section of [
      'foundations',
      'actions',
      'forms',
      'navigation',
      'display',
      'feedback',
      'overlays',
      'conversation',
    ]) {
      expect(html).toContain(`id="${section}"`)
    }
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1])
    expect(new Set(ids).size).toBe(ids.length)
    expect(html).not.toContain('src="http')
  })

  test('exercises each installed UI module', async () => {
    const files = await Array.fromAsync(new Bun.Glob('*.tsx').scan('src/components/ui'))
    const examples = await Array.fromAsync(new Bun.Glob('*.tsx').scan(feature))
    const source = (await Promise.all(examples.map((path) => Bun.file(`${feature}/${path}`).text()))).join('\n')
    for (const file of files) {
      expect(source).toContain(`@/components/ui/${file.slice(0, -4)}'`)
    }
  })
})

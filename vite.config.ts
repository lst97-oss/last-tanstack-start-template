import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { reactStartRscVitePlugin } from '@tanstack/react-start-rsc/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteRsc from '@vitejs/plugin-rsc'
import { nitro } from 'nitro/vite'
import { defineConfig } from 'vite'

// Vite bundles this config to node_modules/.vite-temp and imports the bundle,
// so import.meta.dir/dirname point at the temp dir — not the project root.
// Resolve aliases from the dev server working directory (project root) instead.
const projectDirectory = process.cwd()
const projectPath = (relativePath: string) => `${projectDirectory}/${relativePath.replace(/^\.\//, '')}`

const PRIVATE_NO_STORE = { 'cache-control': 'private, no-store' }

// Minimal hardening headers for API surfaces. No CSP: keep this file as the
// single place security headers are decided so apps add theirs deliberately.
const PRIVATE_SECURITY_HEADERS: Record<string, string> = {
  'referrer-policy': 'same-origin',
  'x-content-type-options': 'nosniff',
  ...(Bun.env.NODE_ENV === 'production' ? { 'strict-transport-security': 'max-age=31536000; includeSubDomains' } : {}),
}

export default defineConfig({
  resolve: {
    // Bare '@' would prefix-match npm scopes (@tanstack/…); anchor to '@/…'.
    alias: [{ find: /^@\//, replacement: `${projectPath('./src')}/` }],
    tsconfigPaths: true,
  },
  plugins: [
    tailwindcss(),
    // serverHandler:false — Start owns dev server entry; default 500s otherwise
    viteRsc({ serverHandler: false }),
    reactStartRscVitePlugin(),
    tanstackStart({ rsc: { enabled: true } }),
    // React Compiler (OXC, client-only): annotation mode compiles only 'use memo' files.
    viteReact({ compiler: { target: '19', compilationMode: 'annotation' } }),
    nitro({
      plugins: ['./src/plugins/business-shutdown.ts'],
      preset: Bun.env.NITRO_PRESET ?? 'vercel',
      routeRules: {
        '/api/**': { headers: { ...PRIVATE_NO_STORE, ...PRIVATE_SECURITY_HEADERS } },
      },
    }),
  ],
})

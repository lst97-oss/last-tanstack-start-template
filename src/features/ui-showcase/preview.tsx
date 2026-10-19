import type { ReactNode } from 'react'

export function Example({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section aria-label={title} className="flex min-w-0 flex-col gap-4 rounded-xl border p-4 sm:p-6">
      <h3 className="text-sm font-medium">{title}</h3>
      {children}
    </section>
  )
}

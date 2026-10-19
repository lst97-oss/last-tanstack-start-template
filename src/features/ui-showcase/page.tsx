'use client'

import { Link } from '@tanstack/react-router'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Actions } from '@/features/ui-showcase/actions'
import { Conversation } from '@/features/ui-showcase/conversation'
import { Display } from '@/features/ui-showcase/display'
import { Feedback } from '@/features/ui-showcase/feedback'
import { Forms } from '@/features/ui-showcase/forms'
import { Navigation } from '@/features/ui-showcase/navigation'
import { Overlays } from '@/features/ui-showcase/overlays'
import { ShowcaseSidebar } from '@/features/ui-showcase/sidebar'

const sections = [
  { id: 'actions', title: 'Actions', component: Actions },
  { id: 'forms', title: 'Forms', component: Forms },
  { id: 'navigation', title: 'Navigation', component: Navigation },
  { id: 'display', title: 'Data display', component: Display },
  { id: 'feedback', title: 'Feedback', component: Feedback },
  { id: 'overlays', title: 'Overlays', component: Overlays },
  { id: 'conversation', title: 'Conversation', component: Conversation },
]

export function UiShowcase() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return (
    <TooltipProvider>
      <SidebarProvider>
        <ShowcaseSidebar />
        <SidebarInset className="min-w-0">
          <header className="flex h-14 shrink-0 items-center gap-3 border-b px-4">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-4" />
            <span className="text-sm text-muted-foreground">Component library</span>
          </header>
          <div
            id="showcase-top"
            className="@container mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-8 sm:px-8 sm:py-12"
          >
            <header className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">Development only</Badge>
                <Badge variant="secondary">Base Nova · Neutral</Badge>
              </div>
              <h1 className="text-3xl font-semibold tracking-tight">UI showcase</h1>
              <p className="max-w-2xl text-muted-foreground">
                The installed component library, using the template's shared styles. Explore variants, edit fields, and
                open overlays to check appearance and behaviour.
              </p>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <ToggleGroup
                  aria-label="Preview theme"
                  value={[mounted ? (theme ?? 'system') : 'system']}
                  onValueChange={(value) => {
                    if (value[0]) setTheme(value[0])
                  }}
                  variant="outline"
                  spacing={0}
                >
                  <ToggleGroupItem value="light">Light</ToggleGroupItem>
                  <ToggleGroupItem value="dark">Dark</ToggleGroupItem>
                  <ToggleGroupItem value="system">System</ToggleGroupItem>
                </ToggleGroup>
                <div className="flex gap-4 text-sm">
                  <Link to="/" className="underline underline-offset-4">
                    Home
                  </Link>
                </div>
              </div>
            </header>
            <Separator />
            <section id="foundations" aria-labelledby="foundations-title" className="flex scroll-mt-6 flex-col gap-5">
              <h2 id="foundations-title" className="text-2xl font-semibold tracking-tight">
                Foundations
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border bg-background p-4 text-foreground">Background / foreground</div>
                <div className="rounded-lg border bg-card p-4 text-card-foreground">Card / foreground</div>
                <div className="rounded-lg bg-primary p-4 text-primary-foreground">Primary / foreground</div>
                <div className="rounded-lg bg-secondary p-4 text-secondary-foreground">Secondary / foreground</div>
                <div className="rounded-lg bg-muted p-4 text-muted-foreground">Muted / foreground</div>
                <div className="rounded-lg bg-accent p-4 text-accent-foreground">Accent / foreground</div>
                <div className="rounded-lg border bg-popover p-4 text-popover-foreground">Popover / foreground</div>
                <div className="rounded-lg border p-4 text-destructive">Destructive text</div>
              </div>
              <p className="text-sm text-muted-foreground">
                Geist Variable · shared semantic tokens · existing component variants
              </p>
            </section>
            {sections.map(({ id, title, component: Component }) => (
              <section key={id} id={id} aria-labelledby={`${id}-title`} className="flex scroll-mt-6 flex-col gap-5">
                <h2 id={`${id}-title`} className="text-2xl font-semibold tracking-tight">
                  {title}
                </h2>
                <div className="grid items-start gap-4 @3xl:grid-cols-2">
                  <Component />
                </div>
              </section>
            ))}
            <footer className="text-sm text-muted-foreground">
              All examples are local. See this feature's README for removal and verification instructions.
            </footer>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}

import { useState } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from '@/components/ui/toast'
import { Example } from '@/features/ui-showcase/preview'

const pages = ['Drafts', 'Published', 'Archived']

export function Navigation() {
  const [page, setPage] = useState(1)
  return (
    <>
      <Example title="Breadcrumb">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#navigation">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Navigation</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Example>
      <Example title="Tabs">
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="disabled" disabled>
              Disabled
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <p className="text-sm text-muted-foreground">Manage your profile and contact information.</p>
          </TabsContent>
          <TabsContent value="security">
            <p className="text-sm text-muted-foreground">Manage passwords and active sessions.</p>
          </TabsContent>
        </Tabs>
      </Example>
      <Example title="Navigation Menu">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-56 gap-1">
                  <NavigationMenuLink href="#forms">Form controls</NavigationMenuLink>
                  <NavigationMenuLink href="#overlays">Overlays</NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#display">Display</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </Example>
      <Example title="Menubar">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarGroup>
                <MenubarItem onClick={() => toast.add({ title: 'New draft created' })}>
                  New draft<MenubarShortcut>⌘N</MenubarShortcut>
                </MenubarItem>
                <MenubarItem disabled>Open recent</MenubarItem>
              </MenubarGroup>
              <MenubarSeparator />
              <MenubarGroup>
                <MenubarItem onClick={() => toast.add({ title: 'Draft exported' })}>Export</MenubarItem>
              </MenubarGroup>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarGroup>
                <MenubarItem onClick={() => toast.add({ title: 'Undo selected' })}>Undo</MenubarItem>
                <MenubarItem disabled>Redo</MenubarItem>
              </MenubarGroup>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </Example>
      <Example title="Pagination">
        <p className="text-sm" aria-live="polite">
          Page {page}: {pages[page - 1]}
        </p>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#navigation"
                aria-disabled={page === 1}
                onClick={(event) => {
                  event.preventDefault()
                  setPage(Math.max(1, page - 1))
                }}
              />
            </PaginationItem>
            {pages.map((label, index) => (
              <PaginationItem key={label}>
                <PaginationLink
                  href="#navigation"
                  isActive={page === index + 1}
                  onClick={(event) => {
                    event.preventDefault()
                    setPage(index + 1)
                  }}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#navigation"
                aria-disabled={page === pages.length}
                onClick={(event) => {
                  event.preventDefault()
                  setPage(Math.min(pages.length, page + 1))
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Example>
      <Example title="Sidebar">
        <p className="text-sm text-muted-foreground">
          The page uses the sidebar with icon collapse on desktop and a drawer on mobile. Toggle it here, from the
          header, or with Ctrl/Cmd+B.
        </p>
        <SidebarTrigger />
      </Example>
    </>
  )
}

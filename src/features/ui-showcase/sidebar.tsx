import {
  AudioWaveformIcon,
  BadgeCheckIcon,
  BellIcon,
  BookOpenIcon,
  BotIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
  CommandIcon,
  CreditCardIcon,
  GalleryVerticalEndIcon,
  LogOutIcon,
  Settings2Icon,
  SparklesIcon,
  SquareTerminalIcon,
} from 'lucide-react'
import { useState } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar'
import { toast } from '@/components/ui/toast'

const workspaces = [
  { name: 'Acme Inc', plan: 'Enterprise', icon: GalleryVerticalEndIcon },
  { name: 'Acme Corp', plan: 'Startup', icon: AudioWaveformIcon },
  { name: 'Evil Corp', plan: 'Free', icon: CommandIcon },
]

const navigation = [
  {
    title: 'Playground',
    icon: SquareTerminalIcon,
    items: [
      { id: 'foundations', title: 'Foundations' },
      { id: 'actions', title: 'Actions' },
      { id: 'forms', title: 'Forms' },
    ],
  },
  {
    title: 'Models',
    icon: BotIcon,
    items: [
      { id: 'display', title: 'Data display' },
      { id: 'conversation', title: 'Conversation' },
    ],
  },
  {
    title: 'Documentation',
    icon: BookOpenIcon,
    items: [
      { id: 'navigation', title: 'Navigation' },
      { id: 'overlays', title: 'Overlays' },
    ],
  },
  { title: 'Settings', icon: Settings2Icon, items: [{ id: 'feedback', title: 'Feedback' }] },
]

export function ShowcaseSidebar() {
  const { isMobile, setOpenMobile } = useSidebar()
  const [workspace, setWorkspace] = useState(workspaces[0])
  const [activeSection, setActiveSection] = useState('foundations')
  const WorkspaceIcon = workspace.icon
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger aria-label="Switch workspace" render={<SidebarMenuButton size="lg" />}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <WorkspaceIcon />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{workspace.name}</span>
                  <span className="truncate text-xs">{workspace.plan}</span>
                </div>
                <ChevronsUpDownIcon className="ml-auto" />
              </DropdownMenuTrigger>
              <DropdownMenuContent side={isMobile ? 'bottom' : 'right'} align="start" className="min-w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
                  {workspaces.map((item) => (
                    <DropdownMenuItem key={item.name} onClick={() => setWorkspace(item)}>
                      <item.icon />
                      <span>{item.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <nav aria-label="Showcase sections">
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
              {navigation.map((group, index) => (
                <Collapsible
                  key={group.title}
                  defaultOpen={index === 0}
                  className="group/collapsible"
                  render={<SidebarMenuItem />}
                >
                  <CollapsibleTrigger render={<SidebarMenuButton tooltip={group.title} />}>
                    <group.icon />
                    <span>{group.title}</span>
                    <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {group.items.map((item) => (
                        <SidebarMenuSubItem key={item.id}>
                          <SidebarMenuSubButton
                            render={<a href={`#${item.id}`} />}
                            isActive={activeSection === item.id}
                            onClick={() => {
                              setActiveSection(item.id)
                              setOpenMobile(false)
                            }}
                          >
                            <span>{item.title}</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </nav>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger aria-label="Open account menu" render={<SidebarMenuButton size="lg" />}>
                <UserSummary />
                <ChevronsUpDownIcon className="ml-auto" />
              </DropdownMenuTrigger>
              <DropdownMenuContent side={isMobile ? 'bottom' : 'right'} align="end" className="min-w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <div className="flex items-center gap-2">
                      <UserSummary />
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => toast.add({ title: 'Upgrade to Pro preview' })}>
                    <SparklesIcon />
                    Upgrade to Pro
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => toast.add({ title: 'Account preview' })}>
                    <BadgeCheckIcon />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast.add({ title: 'Billing preview' })}>
                    <CreditCardIcon />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast.add({ title: 'Notifications preview' })}>
                    <BellIcon />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => toast.add({ title: 'Log out preview' })}>
                    <LogOutIcon />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

function UserSummary() {
  return (
    <>
      <Avatar>
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">shadcn</span>
        <span className="truncate text-xs">m@example.com</span>
      </div>
    </>
  )
}

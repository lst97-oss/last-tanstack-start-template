import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { toast } from '@/components/ui/toast'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Example } from '@/features/ui-showcase/preview'

export function Overlays() {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [showArchived, setShowArchived] = useState(false)
  return (
    <>
      <Example title="Dialog / Alert Dialog">
        <div className="flex flex-wrap gap-2">
          <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>Open dialog</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Document details</DialogTitle>
                <DialogDescription>This modal demonstrates the default dialog layout.</DialogDescription>
              </DialogHeader>
              <p className="text-sm">Press Escape or use the close button to return to the trigger.</p>
              <DialogFooter>
                <DialogClose render={<Button />}>Done</DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
            <AlertDialogTrigger render={<Button variant="destructive" />}>Open confirmation</AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Archive this example?</AlertDialogTitle>
                <AlertDialogDescription>This is a preview. No document will be changed.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  onClick={() => {
                    setConfirmOpen(false)
                    toast.add({ title: 'Example archived' })
                  }}
                >
                  Archive example
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </Example>
      <Example title="Sheet / Drawer">
        <div className="flex flex-wrap gap-2">
          <Sheet>
            <SheetTrigger render={<Button variant="outline" />}>Open sheet</SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Workspace settings</SheetTitle>
                <SheetDescription>A panel that enters from the side.</SheetDescription>
              </SheetHeader>
              <p className="px-4 text-sm">Review the panel spacing, close button, and backdrop.</p>
              <SheetFooter>
                <SheetClose render={<Button />}>Done</SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <Drawer showSwipeHandle>
            <DrawerTrigger render={<Button variant="outline" />}>Open drawer</DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Activity details</DrawerTitle>
                <DrawerDescription>A drawer with a swipe handle.</DrawerDescription>
              </DrawerHeader>
              <p className="p-4 text-sm">Swipe down, press Escape, or select Done.</p>
              <DrawerFooter>
                <DrawerClose render={<Button />}>Done</DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </Example>
      <Example title="Popover / Hover Card / Tooltip">
        <div className="flex flex-wrap items-center gap-2">
          <Popover>
            <PopoverTrigger render={<Button variant="outline" />}>Open popover</PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle>Display settings</PopoverTitle>
                <PopoverDescription>Popover content uses the shared theme tokens.</PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
          <HoverCard>
            <HoverCardTrigger render={<a href="#foundations" className="text-sm underline underline-offset-4" />}>
              Hover for profile
            </HoverCardTrigger>
            <HoverCardContent>
              <p className="text-sm font-medium">Template maintainer</p>
              <p className="text-sm text-muted-foreground">Building reusable interfaces with Base UI.</p>
            </HoverCardContent>
          </HoverCard>
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" />}>Hover for tooltip</TooltipTrigger>
            <TooltipContent>Also appears on keyboard focus.</TooltipContent>
          </Tooltip>
        </div>
      </Example>
      <Example title="Dropdown Menu / Context Menu">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>Document menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Document</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => toast.add({ title: 'Edit selected' })}>Edit</DropdownMenuItem>
              <DropdownMenuItem disabled>Share</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuCheckboxItem checked={showArchived} onCheckedChange={setShowArchived}>
                Show archived
              </DropdownMenuCheckboxItem>
              <DropdownMenuItem variant="destructive" onClick={() => toast.add({ title: 'Delete preview selected' })}>
                Delete example
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <p className="text-sm text-muted-foreground" aria-live="polite">
          Archived items are {showArchived ? 'visible' : 'hidden'}.
        </p>
        <ContextMenu>
          <ContextMenuTrigger
            className="flex min-h-28 items-center justify-center rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground"
            tabIndex={0}
          >
            Right-click here, or focus and press Shift+F10
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuGroup>
              <ContextMenuItem onClick={() => toast.add({ title: 'Copy selected' })}>Copy</ContextMenuItem>
              <ContextMenuItem onClick={() => toast.add({ title: 'Duplicate selected' })}>Duplicate</ContextMenuItem>
              <ContextMenuItem disabled>Paste</ContextMenuItem>
            </ContextMenuGroup>
          </ContextMenuContent>
        </ContextMenu>
      </Example>
    </>
  )
}

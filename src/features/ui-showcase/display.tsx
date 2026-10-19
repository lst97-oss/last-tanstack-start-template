import { ChevronDownIcon, FileIcon } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { toast } from '@/components/ui/toast'
import { Example } from '@/features/ui-showcase/preview'

export function Display() {
  return (
    <>
      <Example title="Card">
        <Card>
          <CardHeader>
            <CardTitle>Project settings</CardTitle>
            <CardDescription>Manage your workspace preferences.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Changes apply to this local preview only.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => toast.add({ title: 'Preferences saved', type: 'success' })}>Save changes</Button>
          </CardFooter>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle>Small card</CardTitle>
            <CardDescription>The compact card size.</CardDescription>
          </CardHeader>
          <CardContent>Ready to publish.</CardContent>
        </Card>
      </Example>
      <Example title="Avatar">
        <div className="flex flex-wrap items-center gap-4">
          <Avatar size="sm">
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Crect width='64' height='64' fill='%23999'/%3E%3Ccircle cx='32' cy='24' r='12' fill='%23eee'/%3E%3Cpath d='M8 64a24 24 0 0 1 48 0' fill='%23eee'/%3E%3C/svg%3E"
              alt="Sample profile"
            />
            <AvatarFallback>AL</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback>LG</AvatarFallback>
          </Avatar>
          <AvatarGroup>
            <Avatar>
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>BK</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+3</AvatarGroupCount>
          </AvatarGroup>
        </div>
        <p className="text-sm text-muted-foreground">Initials remain visible when an image is missing.</p>
      </Example>
      <Example title="Accordion / Collapsible">
        <Accordion defaultValue={['styles']}>
          <AccordionItem value="styles">
            <AccordionTrigger>Which style is this?</AccordionTrigger>
            <AccordionContent>Base Nova with the existing neutral theme.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="remove">
            <AccordionTrigger>Can I remove the showcase?</AccordionTrigger>
            <AccordionContent>
              Delete the showcase feature folder and its route, then regenerate routes.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="disabled" disabled>
            <AccordionTrigger>Disabled item</AccordionTrigger>
            <AccordionContent>Unavailable</AccordionContent>
          </AccordionItem>
        </Accordion>
        <Collapsible>
          <CollapsibleTrigger render={<Button variant="outline" />}>
            Show details
            <ChevronDownIcon data-icon="inline-end" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <p className="pt-3 text-sm text-muted-foreground">
              This content expands without changing the component's default appearance.
            </p>
          </CollapsibleContent>
        </Collapsible>
      </Example>
      <Example title="Item / Separator">
        <Item variant="outline">
          <ItemMedia variant="icon">
            <FileIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Project brief.pdf</ItemTitle>
            <ItemDescription>A long document title stays readable alongside supporting details.</ItemDescription>
          </ItemContent>
          <Badge variant="secondary">Draft</Badge>
        </Item>
        <Separator />
        <div className="flex h-5 items-center gap-3 text-sm">
          <span>Overview</span>
          <Separator orientation="vertical" />
          <span>Activity</span>
        </div>
      </Example>
      <Example title="Table">
        <Table>
          <TableCaption>Local example documents.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Document</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Version</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              'Project brief',
              'Accessibility review',
              'A deliberately long document name to check wrapping and scrolling',
            ].map((name, index) => (
              <TableRow key={name}>
                <TableCell>{name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{index === 1 ? 'Published' : 'Draft'}</Badge>
                </TableCell>
                <TableCell className="text-right">{index + 1}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Example>
      <Example title="Scroll Area / Aspect Ratio">
        <ScrollArea className="h-40 rounded-lg border">
          <div className="flex flex-col gap-3 p-4">
            {Array.from({ length: 12 }, (_, index) => (
              <p className="text-sm" key={index}>
                Activity entry {index + 1}
              </p>
            ))}
          </div>
        </ScrollArea>
        <AspectRatio ratio={16 / 9}>
          <div className="flex size-full items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground">
            16:9 preview
          </div>
        </AspectRatio>
      </Example>
    </>
  )
}

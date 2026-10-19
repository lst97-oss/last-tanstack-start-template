import { BoldIcon, ItalicIcon, PlusIcon, UnderlineIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { Kbd, KbdGroup } from '@/components/ui/kbd'
import { Spinner } from '@/components/ui/spinner'
import { toast } from '@/components/ui/toast'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Example } from '@/features/ui-showcase/preview'

export function Actions() {
  return (
    <>
      <Example title="Button">
        <div className="flex flex-wrap items-center gap-2">
          {(['default', 'secondary', 'outline', 'ghost', 'destructive', 'link'] as const).map((variant) => (
            <Button key={variant} variant={variant} onClick={() => toast.add({ title: `${variant} button clicked` })}>
              {variant}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {(['xs', 'sm', 'default', 'lg'] as const).map((size) => (
            <Button key={size} size={size}>
              {size}
            </Button>
          ))}
          {(['icon-xs', 'icon-sm', 'icon', 'icon-lg'] as const).map((size) => (
            <Button key={size} size={size} aria-label={`Add item (${size})`}>
              <PlusIcon />
            </Button>
          ))}
          <Button variant="outline">
            <PlusIcon data-icon="inline-start" />
            Create draft
          </Button>
          <Button disabled>Disabled</Button>
          <Button disabled>
            <Spinner data-icon="inline-start" />
            Saving
          </Button>
        </div>
      </Example>
      <Example title="Button Group">
        <ButtonGroup aria-label="Document actions">
          <Button variant="outline" onClick={() => toast.add({ title: 'Draft saved', type: 'success' })}>
            Save
          </Button>
          <Button variant="outline" onClick={() => toast.add({ title: 'Draft copied' })}>
            Duplicate
          </Button>
          <Button variant="outline" disabled>
            Archive
          </Button>
        </ButtonGroup>
      </Example>
      <Example title="Badge / Kbd">
        <div className="flex flex-wrap items-center gap-2">
          {(['default', 'secondary', 'outline', 'destructive', 'ghost', 'link'] as const).map((variant) => (
            <Badge key={variant} variant={variant}>
              {variant}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          Keyboard shortcuts:{' '}
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </p>
      </Example>
      <Example title="Toggle / Toggle Group">
        <div className="flex flex-wrap items-center gap-4">
          {(['sm', 'default', 'lg'] as const).map((size) => (
            <Toggle key={size} size={size} aria-label={`Toggle bold (${size})`} variant="outline">
              <BoldIcon />
            </Toggle>
          ))}
          <Toggle disabled aria-label="Disabled italic">
            <ItalicIcon />
          </Toggle>
          <ToggleGroup multiple defaultValue={['bold']} aria-label="Text formatting" variant="outline" spacing={0}>
            <ToggleGroupItem value="bold" aria-label="Bold">
              <BoldIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Italic">
              <ItalicIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Underline">
              <UnderlineIcon />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </Example>
    </>
  )
}

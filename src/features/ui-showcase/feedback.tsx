import { CircleCheckIcon, InfoIcon, TriangleAlertIcon } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { Progress, ProgressLabel, ProgressValue } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { Spinner } from '@/components/ui/spinner'
import { toast } from '@/components/ui/toast'
import { Example } from '@/features/ui-showcase/preview'

export function Feedback() {
  return (
    <>
      <Example title="Alert">
        <Alert>
          <InfoIcon />
          <AlertTitle>Preview environment</AlertTitle>
          <AlertDescription>Examples use local fixture content.</AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <TriangleAlertIcon />
          <AlertTitle>Unable to save</AlertTitle>
          <AlertDescription>Check the highlighted fields and try again.</AlertDescription>
        </Alert>
      </Example>
      <Example title="Toast">
        <div className="flex flex-wrap gap-2">
          {(['success', 'info', 'warning', 'error'] as const).map((type) => (
            <Button
              key={type}
              variant="outline"
              onClick={() =>
                toast.add({ title: `${type} notification`, description: 'A local preview notification.', type })
              }
            >
              {type}
            </Button>
          ))}
        </div>
        <Button
          variant="outline"
          onClick={() =>
            toast.add({
              title: 'Draft archived',
              description: 'You can undo this example action.',
              actionProps: { children: 'Undo', onClick: () => toast.add({ title: 'Archive undone', type: 'success' }) },
            })
          }
        >
          Toast with action
        </Button>
      </Example>
      <Example title="Progress / Spinner">
        <Progress value={65}>
          <ProgressLabel>Preparing preview</ProgressLabel>
          <ProgressValue />
        </Progress>
        <Progress value={null} aria-label="Loading preview" />
        <div className="flex items-center gap-2 text-sm" role="status">
          <Spinner />
          Loading components…
        </div>
      </Example>
      <Example title="Skeleton">
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-full" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
        <Skeleton className="h-24 w-full" />
      </Example>
      <Example title="Empty">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CircleCheckIcon />
            </EmptyMedia>
            <EmptyTitle>No pending reviews</EmptyTitle>
            <EmptyDescription>New review requests will appear here.</EmptyDescription>
          </EmptyHeader>
          <Button variant="outline" onClick={() => toast.add({ title: 'Example review created' })}>
            Create example review
          </Button>
        </Empty>
      </Example>
    </>
  )
}

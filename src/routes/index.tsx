import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/toast'
import { SiteNotFound } from '@/lib/site-not-found'

export const Route = createFileRoute('/')({
  component: Index,
  notFoundComponent: SiteNotFound,
})

function Index() {
  return (
    <div className="bg-background p-8 font-sans text-foreground">
      <h1>TanStack Start</h1>
      <p>
        <Button
          variant="outline"
          onClick={() => toast.add({ title: 'Event created', description: 'Sunday, December 3 at 9:00 AM' })}
        >
          Show Toast
        </Button>
      </p>
    </div>
  )
}

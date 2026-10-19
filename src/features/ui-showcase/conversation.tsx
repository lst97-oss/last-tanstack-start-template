import { CircleAlertIcon, CircleCheckIcon, CircleIcon, FileIcon, TerminalIcon } from 'lucide-react'
import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from '@/components/ui/attachment'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Bubble, BubbleContent, BubbleGroup } from '@/components/ui/bubble'
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFooter,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from '@/components/ui/code-block'
import { Marker, MarkerContent } from '@/components/ui/marker'
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from '@/components/ui/message'
import { Spinner } from '@/components/ui/spinner'
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from '@/components/ui/trace'
import { Example } from '@/features/ui-showcase/preview'
import { useHighlightedCode } from '@/hooks/use-highlighted-code'

const code = `export const preview = {
  theme: 'neutral',
  ready: true,
}`

export function Conversation() {
  const lines = useHighlightedCode(code, 'typescript')
  return (
    <>
      <Example title="Message / Bubble / Marker">
        <MessageGroup>
          <Marker variant="separator">
            <MarkerContent>Today</MarkerContent>
          </Marker>
          <Message>
            <MessageAvatar>
              <Avatar>
                <AvatarFallback>AL</AvatarFallback>
              </Avatar>
            </MessageAvatar>
            <MessageContent>
              <MessageHeader>Alex</MessageHeader>
              <Bubble variant="secondary">
                <BubbleContent>Is the component preview ready?</BubbleContent>
              </Bubble>
              <MessageFooter>09:41</MessageFooter>
            </MessageContent>
          </Message>
          <Message align="end">
            <MessageAvatar>
              <Avatar>
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
            </MessageAvatar>
            <MessageContent>
              <MessageHeader>You</MessageHeader>
              <BubbleGroup>
                <Bubble align="end">
                  <BubbleContent>Yes. You can review each component in light and dark mode.</BubbleContent>
                </Bubble>
                <Bubble align="end" variant="outline">
                  <BubbleContent>Try the menus and keyboard controls too.</BubbleContent>
                </Bubble>
              </BubbleGroup>
              <MessageFooter>09:42 · Delivered</MessageFooter>
            </MessageContent>
          </Message>
          <Marker>
            <MarkerContent>Alex joined the preview</MarkerContent>
          </Marker>
        </MessageGroup>
        <BubbleGroup>
          {(['default', 'secondary', 'muted', 'tinted', 'outline', 'ghost', 'destructive'] as const).map((variant) => (
            <Bubble key={variant} variant={variant}>
              <BubbleContent>
                {variant === 'destructive' ? 'Message could not be sent.' : `${variant} message`}
              </BubbleContent>
            </Bubble>
          ))}
        </BubbleGroup>
      </Example>
      <Example title="Attachment">
        <div className="flex flex-wrap gap-3">
          {(['done', 'uploading', 'error'] as const).map((state) => (
            <Attachment key={state} state={state}>
              <AttachmentMedia variant="icon">{state === 'uploading' ? <Spinner /> : <FileIcon />}</AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>Project brief.pdf</AttachmentTitle>
                <AttachmentDescription>
                  {state === 'done'
                    ? 'Ready · 128 KB'
                    : state === 'uploading'
                      ? 'Uploading · 45%'
                      : 'Upload failed · Try again'}
                </AttachmentDescription>
              </AttachmentContent>
            </Attachment>
          ))}
        </div>
      </Example>
      <Example title="Code Block">
        <CodeBlock>
          <CodeBlockHeader>
            <CodeBlockTitle>preview.ts</CodeBlockTitle>
            <CodeBlockActions>
              <CodeBlockCopyButton value={code} />
            </CodeBlockActions>
          </CodeBlockHeader>
          <CodeBlockContent lineNumbers>
            {lines.map((line, index) => (
              <CodeBlockLine key={index} variant={index === 2 ? 'highlighted' : 'default'}>
                {line}
              </CodeBlockLine>
            ))}
          </CodeBlockContent>
          <CodeBlockFooter>TypeScript · highlighted lines and copy action</CodeBlockFooter>
        </CodeBlock>
        <CodeBlock size="sm">
          <CodeBlockContent lineNumbers>
            <CodeBlockLine variant="removed">const ready = false</CodeBlockLine>
            <CodeBlockLine variant="added">const ready = true</CodeBlockLine>
          </CodeBlockContent>
        </CodeBlock>
      </Example>
      <Example title="Trace">
        <Trace>
          <TraceCollapsible defaultOpen>
            <TraceCollapsibleTrigger>
              <TraceLine>
                <TraceIcon>
                  <TerminalIcon />
                </TraceIcon>
                <TraceTitle>Ran the preview command</TraceTitle>
                <TraceDescription>0.2s</TraceDescription>
              </TraceLine>
            </TraceCollapsibleTrigger>
            <TraceCollapsibleContent>
              <CodeBlock size="sm">
                <CodeBlockContent>{'$ bun --version\n1.4.3'}</CodeBlockContent>
              </CodeBlock>
            </TraceCollapsibleContent>
          </TraceCollapsible>
          <TraceLine>
            <TraceIcon>
              <CircleCheckIcon />
            </TraceIcon>
            <TraceTitle>Loaded local fixtures</TraceTitle>
          </TraceLine>
          <TraceLine status="running">
            <TraceIcon>
              <Spinner />
            </TraceIcon>
            <TraceTitle>Running a preview task</TraceTitle>
          </TraceLine>
          <TraceLine status="pending">
            <TraceIcon>
              <CircleIcon />
            </TraceIcon>
            <TraceTitle>Review the preview</TraceTitle>
          </TraceLine>
          <TraceCollapsible>
            <TraceCollapsibleTrigger>
              <TraceLine status="error">
                <TraceIcon>
                  <CircleAlertIcon />
                </TraceIcon>
                <TraceTitle>Failed to load an example file</TraceTitle>
              </TraceLine>
            </TraceCollapsibleTrigger>
            <TraceCollapsibleContent>
              <CodeBlock size="sm" variant="destructive">
                <CodeBlockContent wrap>Example error: file not found. This is a local fixture.</CodeBlockContent>
              </CodeBlock>
            </TraceCollapsibleContent>
          </TraceCollapsible>
        </Trace>
      </Example>
    </>
  )
}

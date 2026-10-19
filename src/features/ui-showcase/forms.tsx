import { SearchIcon } from 'lucide-react'
import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox'
import { DirectionProvider } from '@/components/ui/direction'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Example } from '@/features/ui-showcase/preview'

const frameworks = ['TanStack Start', 'Next.js', 'React Router', 'Astro']

export function Forms() {
  const [volume, setVolume] = useState([40])
  return (
    <>
      <Example title="Field / Input / Textarea">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="example-email">Email</FieldLabel>
            <Input id="example-email" type="email" placeholder="you@example.com" />
            <FieldDescription>Use your work email address.</FieldDescription>
          </Field>
          <Field data-invalid>
            <FieldLabel htmlFor="example-invalid">Invalid email</FieldLabel>
            <Input id="example-invalid" aria-invalid aria-describedby="example-error" defaultValue="not-an-email" />
            <FieldError id="example-error">Enter a valid email address.</FieldError>
          </Field>
          <Field data-disabled>
            <FieldLabel htmlFor="example-disabled">Disabled</FieldLabel>
            <Input id="example-disabled" disabled defaultValue="Read only while saving" />
          </Field>
          <Field>
            <FieldLabel htmlFor="example-notes">Notes</FieldLabel>
            <Textarea id="example-notes" placeholder="Describe your project" />
          </Field>
        </FieldGroup>
      </Example>
      <Example title="Input Group / Label">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="example-search">Search</FieldLabel>
            <InputGroup>
              <InputGroupInput id="example-search" placeholder="Search components…" />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="example-url">Website</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>https://</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput id="example-url" placeholder="example.com" />
            </InputGroup>
          </Field>
          <div className="flex flex-col gap-2">
            <Label htmlFor="standalone-label">Standalone label</Label>
            <Input id="standalone-label" placeholder="Label primitive" />
          </div>
        </FieldGroup>
      </Example>
      <Example title="Select / Native Select / Combobox">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="example-select">Visibility</FieldLabel>
            <Select defaultValue="private" items={{ private: 'Private', public: 'Public' }}>
              <SelectTrigger id="example-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="archived" disabled>
                    Archived
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel htmlFor="example-native">Native select</FieldLabel>
            <NativeSelect id="example-native" defaultValue="draft">
              <NativeSelectOption value="draft">Draft</NativeSelectOption>
              <NativeSelectOption value="published">Published</NativeSelectOption>
            </NativeSelect>
          </Field>
          <Field>
            <FieldLabel htmlFor="example-combobox">Framework</FieldLabel>
            <Combobox items={frameworks}>
              <ComboboxInput id="example-combobox" placeholder="Choose a framework" showClear />
              <ComboboxContent>
                <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
                <ComboboxList>
                  {(item: string) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
            <FieldDescription>Type to filter; try an unmatched name.</FieldDescription>
          </Field>
        </FieldGroup>
      </Example>
      <Example title="Checkbox / Radio Group / Switch">
        <FieldGroup>
          <Field orientation="horizontal">
            <Checkbox id="example-checkbox" defaultChecked />
            <FieldLabel htmlFor="example-checkbox">Send release updates</FieldLabel>
          </Field>
          <Field orientation="horizontal" data-disabled>
            <Checkbox id="example-checkbox-disabled" disabled />
            <FieldLabel htmlFor="example-checkbox-disabled">Unavailable option</FieldLabel>
          </Field>
          <FieldSet>
            <FieldLegend>Delivery</FieldLegend>
            <RadioGroup defaultValue="email" aria-label="Delivery method">
              {['email', 'in-app'].map((value) => (
                <Field orientation="horizontal" key={value}>
                  <RadioGroupItem id={`delivery-${value}`} value={value} />
                  <FieldLabel htmlFor={`delivery-${value}`}>{value}</FieldLabel>
                </Field>
              ))}
            </RadioGroup>
          </FieldSet>
          <Field orientation="horizontal">
            <Switch id="example-switch" defaultChecked />
            <FieldLabel htmlFor="example-switch">Automatic updates</FieldLabel>
          </Field>
          <Field orientation="horizontal" data-disabled>
            <Switch id="example-switch-disabled" disabled />
            <FieldLabel htmlFor="example-switch-disabled">Disabled switch</FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Switch id="example-switch-small" size="sm" defaultChecked />
            <FieldLabel htmlFor="example-switch-small">Small enabled switch</FieldLabel>
          </Field>
          <Field orientation="horizontal" data-disabled>
            <Switch id="example-switch-checked-disabled" defaultChecked disabled />
            <FieldLabel htmlFor="example-switch-checked-disabled">Enabled and disabled</FieldLabel>
          </Field>
        </FieldGroup>
      </Example>
      <Example title="Slider">
        <FieldGroup>
          <Field>
            <FieldLabel>Volume: {volume[0]}%</FieldLabel>
            <Slider
              aria-label="Volume"
              value={volume}
              onValueChange={(value) => setVolume(Array.isArray(value) ? value : [value])}
            />
          </Field>
          <Field>
            <FieldLabel>Range</FieldLabel>
            <Slider aria-label="Range" defaultValue={[25, 75]} />
          </Field>
          <Field data-disabled>
            <FieldLabel>Disabled slider</FieldLabel>
            <Slider aria-label="Disabled slider" defaultValue={[50]} disabled />
          </Field>
        </FieldGroup>
      </Example>
      <Example title="Direction (RTL)">
        <DirectionProvider direction="rtl">
          <div dir="rtl">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="example-rtl">البريد الإلكتروني</FieldLabel>
                <Input id="example-rtl" placeholder="name@example.com" />
              </Field>
              <Field orientation="horizontal">
                <Checkbox id="example-rtl-check" />
                <FieldLabel htmlFor="example-rtl-check">تفعيل الإشعارات</FieldLabel>
              </Field>
            </FieldGroup>
          </div>
        </DirectionProvider>
      </Example>
    </>
  )
}

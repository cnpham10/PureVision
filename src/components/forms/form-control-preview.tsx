"use client"

import { Field } from "@/components/forms/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const placeholderOptions = [
  { label: "Placeholder option", value: "placeholder" },
  { label: "Another placeholder option", value: "placeholder-2" },
]

export function FormControlPreview() {
  return (
    <form
      className="mt-14 flex max-w-xl flex-col gap-6"
      aria-describedby="form-preview-note"
      onSubmit={(event) => event.preventDefault()}
    >
      <p id="form-preview-note" className="text-sm leading-relaxed text-muted-foreground">
        These controls show the form foundation. This form does not send a lead.
      </p>

      <Field label="Name" htmlFor="name">
        <Input id="name" name="name" autoComplete="name" />
      </Field>

      <Field label="Email" htmlFor="email">
        <Input id="email" name="email" type="email" autoComplete="email" />
      </Field>

      <Field label="Phone" htmlFor="phone">
        <Input id="phone" name="phone" type="tel" autoComplete="tel" />
      </Field>

      <Field label="Service of interest" htmlFor="service" hint="Placeholder choices only.">
        <Select items={placeholderOptions}>
          <SelectTrigger id="service" aria-describedby="service-hint">
            <SelectValue placeholder="Choose an option" />
          </SelectTrigger>
          <SelectContent>
            {placeholderOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field label="Project description" htmlFor="description">
        <Textarea id="description" name="description" />
      </Field>

      <Button type="submit" disabled>
        Submission is not connected yet
      </Button>
    </form>
  )
}

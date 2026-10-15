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

const serviceOptions = [
  { label: "Bathroom Remodeling", value: "bathroom-remodeling" },
  { label: "Kitchen Remodeling", value: "kitchen-remodeling" },
  { label: "Flooring Installation & Replacement", value: "flooring-installation-replacement" },
  { label: "Shower & Bathtub Remodeling", value: "shower-bathtub-remodeling" },
  { label: "Vanity & Countertop Installation", value: "vanity-countertop-installation" },
  { label: "Tile Installation", value: "tile-installation" },
  {
    label: "Bathroom Conversion (Tub-to-Shower or Shower-to-Tub)",
    value: "bathroom-conversion",
  },
  { label: "Other", value: "other" },
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

      <Field label="Service of interest" htmlFor="service">
        <Select items={serviceOptions} name="service">
          <SelectTrigger id="service">
            <SelectValue placeholder="Choose an option" />
          </SelectTrigger>
          <SelectContent>
            {serviceOptions.map((option) => (
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

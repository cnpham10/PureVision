"use client"

import { useEffect, useRef, useState } from "react"
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

const MAX_IMAGES = 4
const MAX_FORM_BYTES = 8 * 1024 * 1024

type ProjectImage = {
  id: string
  file: File
  previewUrl: string
}

export function FormControlPreview() {
  const [images, setImages] = useState<ProjectImage[]>([])
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const imagesRef = useRef(images)
  imagesRef.current = images

  useEffect(() => {
    return () => {
      imagesRef.current.forEach((image) => URL.revokeObjectURL(image.previewUrl))
    }
  }, [])

  function addImages(fileList: FileList | null) {
    if (!fileList) return

    const incoming = Array.from(fileList).filter((file) => file.type.startsWith("image/"))
    if (incoming.length === 0) {
      setStatus("error")
      setErrorMessage("Choose an image file.")
      return
    }

    const room = MAX_IMAGES - images.length
    let total = images.reduce((sum, image) => sum + image.file.size, 0)
    const accepted: ProjectImage[] = []
    let tooLarge = false

    for (const file of incoming) {
      if (accepted.length >= room) break
      if (total + file.size > MAX_FORM_BYTES) {
        tooLarge = true
        break
      }
      total += file.size
      accepted.push({
        id: crypto.randomUUID(),
        file,
        previewUrl: URL.createObjectURL(file),
      })
    }

    if (accepted.length === 0) {
      setStatus("error")
      setErrorMessage(
        tooLarge
          ? "Photos must be 8 MB or smaller in total."
          : "You can add up to 4 photos.",
      )
      return
    }

    setImages((current) => [...current, ...accepted])
    if (tooLarge || incoming.length > accepted.length) {
      setStatus("error")
      setErrorMessage(
        tooLarge
          ? "Some photos were left out so the total stays under 8 MB."
          : "You can add up to 4 photos.",
      )
      return
    }

    setErrorMessage("")
    setStatus("idle")
  }

  function removeImage(id: string) {
    setImages((current) => {
      const image = current.find((item) => item.id === id)
      if (image) URL.revokeObjectURL(image.previewUrl)
      return current.filter((item) => item.id !== id)
    })
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const service = new FormData(form).get("service")

    if (typeof service !== "string" || service.length === 0) {
      setStatus("error")
      setErrorMessage("Choose a service.")
      return
    }

    const formData = new FormData(form)
    images.forEach((image, index) => {
      formData.set(`project-image-${index + 1}`, image.file, image.file.name)
    })

    setStatus("submitting")
    setErrorMessage("")

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(response.status === 405 ? "local" : "failed")
      }

      images.forEach((image) => URL.revokeObjectURL(image.previewUrl))
      setImages([])
      form.reset()
      setStatus("success")
    } catch (error) {
      setStatus("error")
      setErrorMessage(
        error instanceof Error && error.message === "local"
          ? "This preview cannot store the request. Deploy the site to Netlify, then submit it there."
          : "The request could not be sent. Try again in a moment.",
      )
    }
  }

  if (status === "success") {
    return (
      <div className="mt-14 flex max-w-xl flex-col gap-6" role="status">
        <p className="text-lg leading-relaxed">
          Your estimate request was sent. We will follow up using the contact details you
          provided.
        </p>
        <Button type="button" variant="outline" onClick={() => setStatus("idle")}>
          Send another request
        </Button>
      </div>
    )
  }

  return (
    <form
      className="mt-14 flex max-w-xl flex-col gap-6"
      name="estimate"
      method="POST"
      action="/__forms.html"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <p className="text-sm leading-relaxed text-muted-foreground">
        Tell us about the project. Photos you add are stored with the request.
      </p>

      <input type="hidden" name="form-name" value="estimate" />
      <p hidden>
        <label>
          Don’t fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <fieldset
        disabled={status === "submitting"}
        className="flex min-w-0 flex-col gap-6 border-0 p-0"
      >
        <Field label="Name" htmlFor="name">
          <Input id="name" name="name" autoComplete="name" required />
        </Field>

        <Field label="Email" htmlFor="email">
          <Input id="email" name="email" type="email" autoComplete="email" required />
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

        <Field
          label="Project photos"
          htmlFor="project-photos"
          hint="Add up to 4 images. The total must be 8 MB or smaller."
        >
          <Input
            id="project-photos"
            type="file"
            accept="image/*"
            multiple
            disabled={images.length >= MAX_IMAGES || status === "submitting"}
            aria-describedby="project-photos-hint"
            className="py-2 file:mr-3 file:border-0 file:bg-transparent file:text-base file:text-foreground"
            onChange={(event) => {
              addImages(event.currentTarget.files)
              event.currentTarget.value = ""
            }}
          />
          {images.length > 0 ? (
            <ul className="mt-3 grid grid-cols-2 gap-3">
              {images.map((image) => (
                <li key={image.id} className="flex flex-col gap-2">
                  <img
                    src={image.previewUrl}
                    alt=""
                    className="aspect-square w-full rounded-sm object-cover"
                  />
                  <p className="truncate text-sm text-muted-foreground">{image.file.name}</p>
                  <Button
                    type="button"
                    variant="outline"
                    aria-label={`Remove ${image.file.name}`}
                    onClick={() => removeImage(image.id)}
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          ) : null}
        </Field>

        {errorMessage ? (
          <p role="alert" className="text-sm leading-relaxed text-destructive">
            {errorMessage}
          </p>
        ) : null}

        <Button type="submit">
          {status === "submitting" ? "Sending…" : "Request a detailed estimate"}
        </Button>
      </fieldset>
    </form>
  )
}

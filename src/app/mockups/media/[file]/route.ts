import { readFile } from "node:fs/promises"
import path from "node:path"
import { notFound } from "next/navigation"
import { photoFiles } from "../../projects/data"

/**
 * Serves the company photos to the mockups on a local machine only.
 * The photos are read from assets/photos when asked for, never imported, so a
 * production build neither serves them nor copies them into its output.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ file: string }> },
) {
  const { file } = await params

  if (process.env.NODE_ENV === "production" || !photoFiles.includes(file)) {
    notFound()
  }

  const data = await readFile(path.join(process.cwd(), "assets", "photos", file))
  return new Response(data, {
    headers: { "Content-Type": "image/jpeg", "Cache-Control": "no-store" },
  })
}

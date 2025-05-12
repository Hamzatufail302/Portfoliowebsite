"use server"

import { put } from "@vercel/blob"
import { revalidatePath } from "next/cache"

export async function uploadImage(formData: FormData) {
  const file = formData.get("file") as File
  const section = formData.get("section") as string

  if (!file || file.size === 0) {
    return { error: "No file selected" }
  }

  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error("BLOB_READ_WRITE_TOKEN is not defined")
      return {
        error: "Storage configuration is missing. Please check your environment variables."
      }
    }

    const filename = `${section}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`

    try {
      const blob = await put(filename, file, {
        access: "public",
      })

      revalidatePath("/")

      return {
        success: true,
        url: blob.url,
        section,
      }
    } catch (blobError) {
      console.error("Blob upload error:", blobError)
      return {
        error: `Upload error: ${blobError instanceof Error ? blobError.message : "Unknown error"}`
      }
    }
  } catch (error) {
    console.error("Error in upload action:", error)
    return {
      error: `Failed to upload image: ${error instanceof Error ? error.message : "Unknown error"}`
    }
  }
}


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
    // Check if we have the token
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error("BLOB_READ_WRITE_TOKEN is not defined")
      return {
        error:
          "Storage configuration is missing. Please check your environment variables or use the local storage option instead.",
      }
    }

    // Create a unique path for the image based on section and timestamp
    const filename = `${section}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`

    console.log(`Attempting to upload ${filename} to Vercel Blob...`)

    try {
      const blob = await put(filename, file, {
        access: "public",
      })

      console.log(`Upload successful: ${blob.url}`)

      // Revalidate the path to update the UI
      revalidatePath("/")
      revalidatePath("/admin")

      return {
        success: true,
        url: blob.url,
        section,
      }
    } catch (blobError) {
      console.error("Blob upload error:", blobError)
      return {
        error: `Vercel Blob error: ${blobError instanceof Error ? blobError.message : "Unknown error"}. Please use the local storage option instead.`,
      }
    }
  } catch (error) {
    console.error("Error in upload action:", error)
    return {
      error: `Failed to upload image: ${error instanceof Error ? error.message : "Unknown error"}. Try using the local storage option.`,
    }
  }
}


"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ImageUploaderProps {
  section: string
  uploadAction: (formData: FormData) => Promise<any>
  onUploadComplete?: (result: any) => void
  onUploadError?: (error: string) => void
}

export default function ImageUploader({ section, uploadAction, onUploadComplete, onUploadError }: ImageUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)
    setError(null)

    if (selectedFile) {
      // Check file size (limit to 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB limit")
        return
      }

      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    } else {
      setPreview(null)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload")
      return
    }

    setUploading(true)
    setProgress(10)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("section", section)

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90))
      }, 300)

      const result = await uploadAction(formData)

      clearInterval(progressInterval)
      setProgress(100)

      if (result.error) {
        setError(result.error)
        console.error("Upload error:", result.error)

        // Report the error up to the parent component
        if (onUploadError) {
          onUploadError(result.error)
        }
      } else {
        // Reset form
        setFile(null)
        setPreview(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }

        // Call the completion handler
        if (onUploadComplete) {
          onUploadComplete(result)
        }
      }
    } catch (err) {
      console.error("Upload exception:", err)
      const errorMessage = `An error occurred during upload: ${err instanceof Error ? err.message : "Unknown error"}`
      setError(errorMessage)

      // Report the error up to the parent component
      if (onUploadError) {
        onUploadError(errorMessage)
      }
    } finally {
      setUploading(false)
      // Reset progress after a delay
      setTimeout(() => setProgress(0), 1000)
    }
  }

  const handleClearSelection = () => {
    setFile(null)
    setPreview(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        {!preview ? (
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <Upload className="h-6 w-6 text-gray-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Drag and drop your image here, or click to browse</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              id={`file-upload-${section}`}
              className="sr-only"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
            />
            <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
              Select Image
            </Button>
          </div>
        ) : (
          <div className="relative">
            <img src={preview || "/placeholder.svg"} alt="Preview" className="max-h-64 mx-auto rounded-md" />
            <Button
              variant="outline"
              size="icon"
              className="absolute top-2 right-2 bg-white rounded-full"
              onClick={handleClearSelection}
              disabled={uploading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {progress > 0 && <Progress value={progress} className="h-2" />}

      <div className="flex justify-end">
        <Button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="bg-gradient-to-r from-[#FF4444] to-[#FF5E42] shadow-md shadow-[#FF4444]/20"
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </Button>
      </div>
    </div>
  )
}


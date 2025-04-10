"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, AlertCircle, Check } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface LocalImageUploaderProps {
  section: string
  onUploadComplete?: (result: any) => void
}

export default function LocalImageUploader({ section, onUploadComplete }: LocalImageUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)
    setError(null)
    setSuccess(false)

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
    if (!file || !preview) {
      setError("Please select a file to upload")
      return
    }

    setUploading(true)
    setError(null)
    setSuccess(false)

    try {
      // Store in localStorage instead of server
      const savedImages = localStorage.getItem("portfolioImages")
      const imagesObj = savedImages ? JSON.parse(savedImages) : {}

      if (!imagesObj[section]) {
        imagesObj[section] = []
      }

      // Store the data URL directly
      imagesObj[section].push(preview)

      // Save back to localStorage
      localStorage.setItem("portfolioImages", JSON.stringify(imagesObj))

      // Show success message
      setSuccess(true)

      // Reset form after a delay
      setTimeout(() => {
        setFile(null)
        setPreview(null)
        setSuccess(false)
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
      }, 2000)

      // Call the completion handler
      if (onUploadComplete) {
        onUploadComplete({
          success: true,
          url: preview,
          section,
        })
      }
    } catch (err) {
      console.error("Upload exception:", err)
      setError(`An error occurred: ${err instanceof Error ? err.message : "Unknown error"}`)
    } finally {
      setUploading(false)
    }
  }

  const handleClearSelection = () => {
    setFile(null)
    setPreview(null)
    setError(null)
    setSuccess(false)
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

      {success && (
        <Alert className="bg-green-50 border-green-200">
          <Check className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-700">Image saved successfully!</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-end">
        <Button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="bg-gradient-to-r from-[#FF4444] to-[#FF5E42] shadow-md shadow-[#FF4444]/20"
        >
          {uploading ? "Saving..." : "Save Image"}
        </Button>
      </div>
    </div>
  )
}


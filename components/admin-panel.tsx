"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ImageUploader from "@/components/image-uploader"
import LocalImageUploader from "@/components/local-image-uploader"
import { uploadImage } from "@/app/actions/upload"
import { Separator } from "@/components/ui/separator"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

// Define the sections where images can be uploaded
const sections = [
  { id: "logo", name: "Logo" },
  { id: "hero", name: "Hero Section" },
  { id: "about", name: "About Section" },
  { id: "projects", name: "Projects" },
  { id: "testimonials", name: "Testimonials" },
  { id: "services", name: "Services" },
]

export default function AdminPanel() {
  const [uploadedImages, setUploadedImages] = useState<Record<string, string[]>>({})
  const [uploadMethod, setUploadMethod] = useState<"blob" | "local">("local")
  const [blobError, setBlobError] = useState<string | null>(null)

  // Load saved images from localStorage on component mount
  useEffect(() => {
    const savedImages = localStorage.getItem("portfolioImages")
    if (savedImages) {
      setUploadedImages(JSON.parse(savedImages))
    }
  }, [])

  // Save images to localStorage when they change
  useEffect(() => {
    if (Object.keys(uploadedImages).length > 0) {
      localStorage.setItem("portfolioImages", JSON.stringify(uploadedImages))
    }
  }, [uploadedImages])

  const handleUploadComplete = (result: { success: boolean; url: string; section: string }) => {
    if (result.success && result.url) {
      setUploadedImages((prev) => {
        const sectionImages = prev[result.section] || []
        return {
          ...prev,
          [result.section]: [...sectionImages, result.url],
        }
      })
    }
  }

  const handleBlobUploadError = (error: string) => {
    setBlobError(error)
    // Automatically switch to local storage if there's a blob error
    setUploadMethod("local")
  }

  const handleRemoveImage = (section: string, index: number) => {
    setUploadedImages((prev) => {
      const newImages = { ...prev }
      newImages[section] = newImages[section].filter((_, i) => i !== index)
      return newImages
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Method</CardTitle>
          <CardDescription>Choose how you want to store your images</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => setUploadMethod("local")}
              variant={uploadMethod === "local" ? "default" : "outline"}
              className={
                uploadMethod === "local"
                  ? "bg-gradient-to-r from-[#FF4444] to-[#FF5E42] shadow-md shadow-[#FF4444]/20"
                  : ""
              }
              size="lg"
            >
              Browser Storage (Recommended)
            </Button>
            <Button
              onClick={() => {
                setUploadMethod("blob")
                setBlobError(null)
              }}
              variant={uploadMethod === "blob" ? "default" : "outline"}
              className={
                uploadMethod === "blob"
                  ? "bg-gradient-to-r from-[#FF4444] to-[#FF5E42] shadow-md shadow-[#FF4444]/20"
                  : ""
              }
              size="lg"
            >
              Vercel Blob Storage (Advanced)
            </Button>
          </div>

          <p className="text-sm text-gray-500 mt-2">
            {uploadMethod === "blob"
              ? "Images will be uploaded to Vercel Blob storage and persist across sessions. Requires proper configuration."
              : "Images will be stored in your browser and work immediately. They may be lost if you clear your browser data."}
          </p>

          {blobError && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{blobError}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="logo">
        <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8">
          {sections.map((section) => (
            <TabsTrigger key={section.id} value={section.id}>
              {section.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {sections.map((section) => (
          <TabsContent key={section.id} value={section.id}>
            <Card>
              <CardHeader>
                <CardTitle>{section.name} Images</CardTitle>
                <CardDescription>
                  Upload images for the {section.name.toLowerCase()}. These will be displayed on your portfolio website.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {uploadMethod === "blob" ? (
                  <ImageUploader
                    section={section.id}
                    uploadAction={uploadImage}
                    onUploadComplete={handleUploadComplete}
                    onUploadError={handleBlobUploadError}
                    className="bg-gradient-to-r from-[#FF4444] to-[#FF5E42] shadow-md shadow-[#FF4444]/20"
                  />
                ) : (
                  <LocalImageUploader section={section.id} onUploadComplete={handleUploadComplete} />
                )}

                <Separator className="my-8" />

                {/* Display uploaded images */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Uploaded Images</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {uploadedImages[section.id]?.map((url, index) => (
                      <div key={index} className="relative aspect-square rounded-md overflow-hidden border group">
                        <img
                          src={url || "/placeholder.svg"}
                          alt={`${section.name} image ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleRemoveImage(section.id, index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    {(!uploadedImages[section.id] || uploadedImages[section.id]?.length === 0) && (
                      <p className="text-gray-500 col-span-full">No images uploaded yet.</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}


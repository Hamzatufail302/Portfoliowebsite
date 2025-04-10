"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { saveImageToStorage, getImageFromStorage, getAllImagesForCategory } from "@/utils/media-storage"
import { toast } from "sonner"

export default function TestMediaPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [projectImages, setProjectImages] = useState<Record<string, string>>({})
  const [serviceImages, setServiceImages] = useState<Record<string, string>>({})
  const [heroImage, setHeroImage] = useState<string | null>(null)
  const [logoImage, setLogoImage] = useState<string | null>(null)
  const [aboutMeImage, setAboutMeImage] = useState<string | null>(null)

  // Load saved images on component mount
  useEffect(() => {
    // Load project images
    const savedProjectImages = getAllImagesForCategory('projects')
    setProjectImages(savedProjectImages)
    
    // Load service images
    const savedServiceImages = getAllImagesForCategory('services')
    setServiceImages(savedServiceImages)
    
    // Load hero image
    const savedHeroImage = getImageFromStorage('hero', 'main')
    if (savedHeroImage) setHeroImage(savedHeroImage)
    
    // Load logo image
    const savedLogoImage = getImageFromStorage('logo', 'main')
    if (savedLogoImage) setLogoImage(savedLogoImage)
    
    // Load about me image
    const savedAboutMeImage = getImageFromStorage('about', 'main')
    if (savedAboutMeImage) setAboutMeImage(savedAboutMeImage)
  }, [])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, section: string, id?: string) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      
      if (section === 'project' && id) {
        setProjectImages(prev => ({ ...prev, [id]: imageUrl }))
        saveImageToStorage('projects', id, imageUrl)
        toast.success(`Project image ${id} saved successfully!`)
      } else if (section === 'service' && id) {
        setServiceImages(prev => ({ ...prev, [id]: imageUrl }))
        saveImageToStorage('services', id, imageUrl)
        toast.success(`Service image ${id} saved successfully!`)
      } else if (section === 'hero') {
        setHeroImage(imageUrl)
        saveImageToStorage('hero', 'main', imageUrl)
        toast.success('Hero image saved successfully!')
      } else if (section === 'logo') {
        setLogoImage(imageUrl)
        saveImageToStorage('logo', 'main', imageUrl)
        toast.success('Logo saved successfully!')
      } else if (section === 'about') {
        setAboutMeImage(imageUrl)
        saveImageToStorage('about', 'main', imageUrl)
        toast.success('About Me image saved successfully!')
      } else {
        setSelectedImage(imageUrl)
      }
    }
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const videoUrl = URL.createObjectURL(file)
      setSelectedVideo(videoUrl)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 p-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Website Media Test Page</h1>
      
      <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h2 className="text-xl font-semibold mb-2 dark:text-white">Important Note</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Images uploaded here are saved to your browser's localStorage. They will be visible on your main website after refreshing the page.
          However, they will only be available on this device. For a permanent solution, you should upload these images to your project's public folder.
        </p>
      </div>
      
      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="about">About Me</TabsTrigger>
          <TabsTrigger value="general">General Media</TabsTrigger>
        </TabsList>
        
        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-8">
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">Project Images</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['ui-ux-1', 'ui-ux-2', 'ui-ux-3', 'branding-1', 'branding-2', 'branding-3'].map((id) => (
              <div key={id} className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium dark:text-white">Project {id}</h3>
                  <Button asChild size="sm">
                    <label className="cursor-pointer">
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'project', id)}
                        className="hidden"
                      />
                    </label>
                  </Button>
                </div>
                
                <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                  {projectImages[id] ? (
                    <Image
                      src={projectImages[id]}
                      alt={`Project ${id}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No image uploaded
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        {/* Services Tab */}
        <TabsContent value="services" className="space-y-8">
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">Service Images</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['web-design', 'graphic-design', 'multimedia', 'branding'].map((id) => (
              <div key={id} className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium dark:text-white capitalize">{id.replace('-', ' ')}</h3>
                  <Button asChild size="sm">
                    <label className="cursor-pointer">
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'service', id)}
                        className="hidden"
                      />
                    </label>
                  </Button>
                </div>
                
                <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                  {serviceImages[id] ? (
                    <Image
                      src={serviceImages[id]}
                      alt={`Service ${id}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No image uploaded
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        {/* Hero Tab */}
        <TabsContent value="hero" className="space-y-8">
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">Hero Section</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium dark:text-white">Hero Image</h3>
              <Button asChild>
                <label className="cursor-pointer">
                  Upload Hero Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'hero')}
                    className="hidden"
                  />
                </label>
              </Button>
            </div>
            
            <div className="relative aspect-[21/9] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              {heroImage ? (
                <Image
                  src={heroImage}
                  alt="Hero image"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No hero image uploaded
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-center mt-8">
              <h3 className="font-medium dark:text-white">Logo</h3>
              <Button asChild>
                <label className="cursor-pointer">
                  Upload Logo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'logo')}
                    className="hidden"
                  />
                </label>
              </Button>
            </div>
            
            <div className="relative h-24 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              {logoImage ? (
                <Image
                  src={logoImage}
                  alt="Logo"
                  fill
                  className="object-contain p-4"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No logo uploaded
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        {/* About Me Tab */}
        <TabsContent value="about" className="space-y-8">
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">About Me Section</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium dark:text-white">About Me Image</h3>
              <Button asChild>
                <label className="cursor-pointer">
                  Upload About Me Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'about')}
                    className="hidden"
                  />
                </label>
              </Button>
            </div>
            
            <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              {aboutMeImage ? (
                <Image
                  src={aboutMeImage}
                  alt="About Me image"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No About Me image uploaded
                </div>
              )}
            </div>
            
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <h4 className="font-medium mb-2 dark:text-white">About Me Image Guidelines</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Recommended size: 600x600 pixels (square image)
                <br />
                This image will appear in the About Me section of your website.
              </p>
            </div>
          </div>
        </TabsContent>
        
        {/* General Media Tab */}
        <TabsContent value="general" className="space-y-8">
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">General Media</h2>
          
          {/* Image Test Section */}
          <section className="mb-12">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">Image Test</h3>
            <div className="space-y-4">
              <div>
                <Button asChild>
                  <label className="cursor-pointer">
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'general')}
                      className="hidden"
                    />
                  </label>
                </Button>
              </div>
              
              {selectedImage && (
                <div className="relative w-full max-w-2xl aspect-video">
                  <Image
                    src={selectedImage}
                    alt="Test image"
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
              )}
            </div>
          </section>

          {/* Video Test Section */}
          <section className="mb-12">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">Video Test</h3>
            <div className="space-y-4">
              <div>
                <Button asChild>
                  <label className="cursor-pointer">
                    Upload Video
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                  </label>
                </Button>
              </div>
              
              {selectedVideo && (
                <div className="w-full max-w-2xl">
                  <video
                    src={selectedVideo}
                    controls
                    className="w-full rounded-lg"
                  />
                </div>
              )}
            </div>
          </section>
        </TabsContent>
      </Tabs>

      {/* Image Size Guidelines */}
      <section className="mt-12 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 dark:text-white">Image Size Guidelines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-2 dark:text-white">Project Thumbnails</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Recommended size: 400x300 pixels</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-2 dark:text-white">Service Images</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Recommended size: 800x600 pixels</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-2 dark:text-white">Hero Images</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Recommended size: 1920x1080 pixels</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-2 dark:text-white">About Me Image</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Recommended size: 600x600 pixels</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-2 dark:text-white">Video Guidelines</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Recommended: 720p or 1080p, max 10MB</p>
          </div>
        </div>
      </section>
    </div>
  )
} 
"use client"

import React, { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ImageDisplay from "@/components/image-display"
import { motion } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import VideoPlayer from "@/components/video-player"
import Image from "next/image"
import { fadeInUp } from "@/components/animations"

type ProjectContentProps = {
  project: {
    title: string
    category: string
    description: string
    imageSection: string
    imageIndex: number
    images: number[]
    isMultimedia?: boolean
    videoUrl?: string
    projectName?: string
    projectType?: string
    slug: string
  }
}

// Type guard to check if project has required image properties
function hasImageProperties(project: ProjectContentProps['project']): project is ProjectContentProps['project'] & { projectType: string; projectName: string } {
  return !!project.projectType && !!project.projectName;
}

// Separate the content that uses useSearchParams
function ProjectContentInner({ project }: ProjectContentProps) {
  const searchParams = useSearchParams()
  const fromService = searchParams.get("from") === "service"
  const section = searchParams.get("section") || ""

  // Get video path and poster image path
  const hasVideo = project.videoUrl || (project.isMultimedia && project.projectName)
  const videoPath = project.videoUrl ?? 
    (project.projectType && project.projectName 
      ? `/images/projects/${project.projectType}/${project.projectName}/video.mp4` 
      : "/videos/projects/placeholder.mp4")
  
  // Use Cloudinary thumbnails for Lottie animations
  const getPosterPath = () => {
    if (project.category?.includes("Lottie Animation")) {
      const thumbnailMap: { [key: string]: string } = {
        'voice-changer-animation': 'https://res.cloudinary.com/di3u607lk/image/upload/v1747151732/voice-changer.png',
        'upward-animation': 'https://res.cloudinary.com/di3u607lk/image/upload/v1747151714/upward.png',
        'shadow-nexus-animation': 'https://res.cloudinary.com/di3u607lk/image/upload/v1747151701/Shadow-Nexus.png',
        'mobile-animation': 'https://res.cloudinary.com/di3u607lk/image/upload/v1747151682/Connect.png',
        'fitness-app-animation': 'https://res.cloudinary.com/di3u607lk/image/upload/v1747151656/ActivePulse.png',
        'marwen-animation': 'https://res.cloudinary.com/di3u607lk/image/upload/v1747151667/Marwen.png',
        'cartease-animation': 'https://res.cloudinary.com/di3u607lk/image/upload/v1747151631/CartEase.png',
        'brand-bridge-animation': 'https://res.cloudinary.com/di3u607lk/image/upload/v1747151620/BrandBridge.png',
        'bloom-animation': 'https://res.cloudinary.com/di3u607lk/image/upload/v1747151607/bloom.png'
      }
      return thumbnailMap[project.slug] || ''
    }
    return project.projectType && project.projectName
      ? `/images/projects/${project.projectType}/${project.projectName}/image-1.png`
      : `/images/projects/placeholder-video.png`
  }
  
  const posterPath = getPosterPath()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />

      {/* Project Header */}
      <section className="pt-40 pb-10 bg-gray-100 dark:bg-gray-950">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 text-center"
        >
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="text-center pt-8 pb-11">
              <div className="text-[#FF5D3A] font-medium mb-3">{project.category.toUpperCase()}</div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 dark:text-white">{project.title}</h1>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                {project.description}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Project Content */}
      <section className="pt-6 pb-6 md:pt-10 md:pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4"
        >
          <div className="max-w-[905px] mx-auto">
            {hasVideo ? (
              // Video display for multimedia projects
              <div className="rounded-lg p-4 md:p-8 w-[110%] -ml-[5%]">
                <div className="h-[105%]">
                  <VideoPlayer src={videoPath} poster={posterPath} />
                </div>
              </div>
            ) : hasImageProperties(project) ? (
              // Image display for non-multimedia projects
              <div className="grid grid-cols-1 gap-8">
                {project.images.map((imageIndex, idx) => (
                  <div key={idx} className="w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                    <ImageDisplay
                      section={project.imageSection}
                      projectType={project.projectType}
                      projectName={project.projectName}
                      index={imageIndex}
                      fallbackSrc={`/placeholder.svg?height=1000&width=1500&text=${project.title}`}
                      alt={`${project.title} - Image ${idx + 1}`}
                      width={1500}
                      height={1000}
                      className="w-full h-auto"
                      sizes="(max-width: 905px) 100vw, 905px"
                      priority={idx === 0}
                    />
                  </div>
                ))}
              </div>
            ) : (
              // Fallback for missing project type/name
              <div className="w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                <img 
                  src={`/placeholder.svg?height=800&width=1200&text=${project.title}`}
                  alt={project.title}
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                />
              </div>
            )}
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}

// Main component wrapped in Suspense
export default function ProjectContent(props: ProjectContentProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Header />
        <div className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-[905px] mx-auto">
              <div className="w-full h-[600px] bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    }>
      <ProjectContentInner {...props} />
    </Suspense>
  )
} 
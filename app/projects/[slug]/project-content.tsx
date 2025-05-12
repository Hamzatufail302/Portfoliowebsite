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
  const hasVideo = project.isMultimedia && (project.videoUrl || project.projectName)
  const videoPath = project.videoUrl ?? 
    (project.projectName ? `/videos/projects/${project.projectName}/video.mp4` : "/videos/projects/placeholder.mp4")
  const posterPath = project.projectType && project.projectName
    ? `/images/projects/${project.projectType}/${project.projectName}/image-1.png`
    : `/images/projects/placeholder-video.png`

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />

      {/* Project Content */}
      <section className="py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4"
        >
          <div className="max-w-[1400px] mx-auto">
            {hasVideo ? (
              // Video display for multimedia projects
              <VideoPlayer src={videoPath} poster={posterPath} />
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
                      fallbackSrc={`/placeholder.svg?height=800&width=1200&text=${project.title}`}
                      alt={`${project.title} - Image ${idx + 1}`}
                      width={1200}
                      height={800}
                      className="w-full h-auto"
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
            <div className="max-w-[1400px] mx-auto">
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
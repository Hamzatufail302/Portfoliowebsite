"use client"

import React from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ImageDisplay from "@/components/image-display"
import { motion } from "framer-motion"
import ContactForm from "@/components/contact-form"
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

export default function ProjectContent({ project }: ProjectContentProps) {
  const searchParams = useSearchParams()
  const fromService = searchParams.get("from") === "service"
  const section = searchParams.get("section") || ""

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Get video path and poster image path
  const hasVideo = project.isMultimedia && (project.videoUrl || project.projectName)
  const videoPath = hasVideo 
    ? (project.videoUrl || `/videos/projects/${project.projectName}/video.mp4`)
    : ""
  const posterPath = hasVideo && project.projectType && project.projectName 
    ? `/images/projects/${project.projectType}/${project.projectName}/image-1.png`
    : `/images/projects/placeholder-video.png` // Fallback poster image

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />

      {/* Project Header */}
      <section className="container mx-auto px-4 py-8 md:py-20">
        <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } }}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-[#FF5D3A] font-medium mb-3">{project.category}</div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 dark:text-white">{project.title}</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 md:mb-16">{project.description}</p>
          </div>
        </motion.div>

        {/* Main Project Content */}
        <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}>
          <div className="max-w-[1400px] mx-auto">
            {hasVideo ? (
              // Video display for multimedia projects
              <VideoPlayer src={videoPath} poster={posterPath} />
            ) : (
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
            )}
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}>
            <div className="max-w-4xl mx-auto">
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 
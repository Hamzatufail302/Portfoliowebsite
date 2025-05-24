"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import ImageDisplay from "@/components/image-display"
import { PlayCircle } from "lucide-react"

interface ProjectCardProps {
  title: string
  category: string
  imageSection: string
  imageIndex: number
  slug: string
  isMultimedia?: boolean
  projectType?: string
  projectName?: string
  videoUrl?: string
}

export default function ProjectCard({
  title,
  category,
  imageSection,
  imageIndex,
  slug,
  isMultimedia = false,
  projectType = "web-mobile/web-ui",
  projectName = "",
  videoUrl
}: ProjectCardProps) {
  // Use the slug as the project name if none is provided
  const actualProjectName = projectName || slug

  return (
    <Link href={`/projects/${slug}`} className="group block h-full">
      <motion.div
        whileHover={{ y: -10 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden h-full flex flex-col shadow-md border border-gray-200 dark:border-gray-700"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          {videoUrl ? (
            <>
              <div className="w-[110%] h-[105%] -ml-[5%] -mt-[2.5%]">
                <video
                  src={videoUrl}
                  className="w-full h-full object-cover object-top"
                  muted
                  loop
                  playsInline
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause()
                    e.currentTarget.currentTime = 0
                  }}
                >
                  <source src={videoUrl} type="video/mp4" />
                </video>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <PlayCircle className="w-12 h-12 text-white" />
              </div>
            </>
          ) : (
            <>
              <ImageDisplay
                section={imageSection}
                projectType={projectType}
                projectName={actualProjectName}
                index={imageIndex}
                fallbackSrc="/images/placeholder.png"
                alt={title}
                width={800}
                height={600}
                className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {isMultimedia && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <PlayCircle className="w-12 h-12 text-white" />
                </div>
              )}
            </>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{category}</p>
        </div>
      </motion.div>
    </Link>
  )
}


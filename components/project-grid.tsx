"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { fadeInUp } from "@/components/animations"
import { PlayCircle } from "lucide-react"

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

interface Project {
  title: string
  category: string
  image?: string
  slug: string
  isMultimedia?: boolean
  videoUrl?: string
}

interface ProjectGridProps {
  projects: Project[]
  fromService?: boolean
}

export default function ProjectGrid({ projects, fromService = false }: ProjectGridProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {projects.map((project, index) => (
        <motion.div
          key={index}
          variants={fadeInUp}
        >
          <Link href={`/projects/${project.slug}${fromService ? "?from=service" : ""}`} className="group block h-full">
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden h-full flex flex-col shadow-md border border-gray-200 dark:border-gray-700"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {project.videoUrl ? (
                  <>
                    {project.category?.includes("Lottie Animation") ? (
                      <Image
                        src={thumbnailMap[project.slug] || `https://res.cloudinary.com/di3u607lk/image/upload/v1747140785/${project.slug}-thumb.png.png`}
                        alt={project.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        priority={index < 3}
                      />
                    ) : (
                      <video
                        src={project.videoUrl}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                        onMouseEnter={(e) => e.currentTarget.play()}
                        onMouseLeave={(e) => {
                          e.currentTarget.pause()
                          e.currentTarget.currentTime = 0
                        }}
                      >
                        <source src={project.videoUrl} type="video/mp4" />
                      </video>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <PlayCircle className="w-12 h-12 text-white" />
                    </div>
                  </>
                ) : (
                  <>
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      priority={index < 3}
                    />
                    {project.isMultimedia && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <PlayCircle className="w-12 h-12 text-white" />
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{project.title}</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{project.category}</p>
              </div>
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}


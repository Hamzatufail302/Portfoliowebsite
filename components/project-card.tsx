"use client"

import Link from "next/link"
import ImageDisplay from "@/components/image-display"
import { motion } from "framer-motion"

interface ProjectCardProps {
  title: string
  category: string
  slug: string
  imageSection?: string
  imageIndex?: number
  image?: string
}

export default function ProjectCard({ title, category, slug, imageSection, imageIndex = 0, image }: ProjectCardProps) {
  // Determine the image source
  const imageSrc = image || `/placeholder.svg?height=300&width=400&text=${imageIndex || 0}`

  return (
    <Link href={`/projects/${slug}?from=service`} scroll={false}>
      <motion.div
        whileHover={{ y: -10 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="group overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 h-full"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <ImageDisplay
            section={imageSection || "projects"}
            index={imageIndex}
            fallbackSrc={imageSrc}
            alt={title}
            width={400}
            height={300}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-4 flex flex-col bg-white dark:bg-gray-800">
          <h3 className="font-medium text-lg text-gray-900 dark:text-gray-200">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{category}</p>
        </div>
      </motion.div>
    </Link>
  )
}


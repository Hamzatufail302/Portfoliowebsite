"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { StaggerContainer, StaggerItem } from "@/components/animations"

interface Project {
  title: string
  category: string
  image: string
  slug: string
}

interface ProjectGridProps {
  projects: Project[]
  fromService?: boolean
}

export default function ProjectGrid({ projects, fromService = false }: ProjectGridProps) {
  return (
    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <StaggerItem key={index}>
          <Link href={`/projects/${project.slug}${fromService ? "?from=service" : ""}`} className="group block h-full">
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden h-full flex flex-col shadow-md border border-gray-200 dark:border-gray-700"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={index < 3}
                />
              </div>
              <div className="p-4 flex flex-col bg-white dark:bg-gray-800">
                <h3 className="font-medium text-lg text-gray-900 dark:text-gray-100 mb-1">{project.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{project.category}</p>
              </div>
            </motion.div>
          </Link>
        </StaggerItem>
      ))}
    </StaggerContainer>
  )
}


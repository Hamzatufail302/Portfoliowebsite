"use client"

import { useState } from "react"
import ProjectCard from "@/components/project-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

// Define the project categories
const categories = [
  { id: "ui-ux", name: "UI/UX", service: "/services/web-and-mobile" },
  { id: "branding", name: "Branding", service: "/services/graphic-design" },
  { id: "multimedia", name: "Multimedia", service: "/services/multimedia" },
]

// Sample project data
const projectsData = {
  "ui-ux": [
    {
      title: "Mobile App Design",
      category: "UI/UX Design",
      imageSection: "projects",
      imageIndex: 0,
      slug: "mobile-app-design",
    },
    {
      title: "Fashion E-commerce Landing Page",
      category: "Web Design",
      imageSection: "projects",
      imageIndex: 1,
      slug: "e-commerce-landing-page",
    },
    {
      title: "Dashboard UI",
      category: "UI/UX Design",
      imageSection: "projects",
      imageIndex: 2,
      slug: "dashboard-ui",
    },
  ],
  branding: [
    {
      title: "Restaurant Branding",
      category: "Branding",
      imageSection: "projects",
      imageIndex: 3,
      slug: "restaurant-branding",
    },
    {
      title: "Tech Startup Branding",
      category: "Branding",
      imageSection: "projects",
      imageIndex: 4,
      slug: "tech-startup-branding",
    },
    {
      title: "Fashion Brand Identity",
      category: "Branding",
      imageSection: "projects",
      imageIndex: 5,
      slug: "fashion-brand-identity",
    },
  ],
  multimedia: [
    {
      title: "Motion Graphics",
      category: "Multimedia",
      imageSection: "projects",
      imageIndex: 6,
      slug: "motion-graphics",
    },
    {
      title: "Video Editing",
      category: "Multimedia",
      imageSection: "projects",
      imageIndex: 7,
      slug: "video-editing",
    },
    {
      title: "3D Animation",
      category: "Multimedia",
      imageSection: "projects",
      imageIndex: 8,
      slug: "3d-animation",
    },
  ],
}

export default function RecentProjects() {
  // Set the default active category to "ui-ux"
  const [activeCategory, setActiveCategory] = useState("ui-ux")

  // Get the projects for the active category
  const activeProjects = projectsData[activeCategory as keyof typeof projectsData] || []

  // Get the service URL for the active category
  const serviceUrl = categories.find((cat) => cat.id === activeCategory)?.service || "#"

  return (
    <div className="space-y-8">
      {/* Category Navigation */}
      <motion.div
        className="flex flex-wrap gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category.id
                ? "bg-gradient-to-r from-[#FF4444] to-[#FF5E42] text-white shadow-md shadow-[#FF4444]/20"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </motion.button>
        ))}
      </motion.div>

      {/* Project Grid - Single Row with equal heights */}
      <div className="grid md:grid-cols-3 gap-6">
        {activeProjects.map((project, index) => (
          <motion.div
            key={index}
            className="h-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
          >
            <ProjectCard
              imageSection={project.imageSection}
              imageIndex={project.imageIndex}
              title={project.title}
              category={project.category}
              slug={project.slug}
            />
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <motion.div
        className="flex justify-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Link href={serviceUrl} scroll={false}>
          <Button className="rounded-full px-6 h-[42px] text-sm font-medium">
            View All {categories.find((c) => c.id === activeCategory)?.name} Projects
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}


"use client"

import { useState } from "react"
import ProjectGrid from "@/components/project-grid"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Define the project categories
const categories = [
  { id: "ui-ux", name: "UI/UX" },
  { id: "branding", name: "Branding" },
  { id: "multimedia", name: "Multimedia" },
]

// Sample project data
const projectsData = {
  "ui-ux": [
    {
      title: "E-commerce Website",
      category: "UI/UX Design",
      image: "/placeholder.svg?height=300&width=400",
      slug: "e-commerce-website",
    },
    {
      title: "Portfolio Website",
      category: "UI/UX Design",
      image: "/placeholder.svg?height=300&width=400",
      slug: "portfolio-website",
    },
    {
      title: "Dashboard UI",
      category: "UI/UX Design",
      image: "/placeholder.svg?height=300&width=400",
      slug: "dashboard-ui",
    },
  ],
  branding: [
    {
      title: "Restaurant Branding",
      category: "Branding",
      image: "/placeholder.svg?height=300&width=400",
      slug: "restaurant-branding",
    },
    {
      title: "Tech Startup Branding",
      category: "Branding",
      image: "/placeholder.svg?height=300&width=400",
      slug: "tech-startup-branding",
    },
    {
      title: "Fashion Brand Identity",
      category: "Branding",
      image: "/placeholder.svg?height=300&width=400",
      slug: "fashion-brand-identity",
    },
  ],
  multimedia: [
    {
      title: "Brand Bridge",
      category: "Lottie Animation/Motion Graphics",
      image: "/images/projects/multimedia/lottie-motion-graphic/brand-bridge/image-1.png",
      slug: "brand-bridge-animation",
      isMultimedia: true,
      projectType: "multimedia/lottie-motion-graphic",
      projectName: "brand-bridge",
      videoUrl: "/videos/projects/brand-bridge/video.mp4"
    },
    {
      title: "CartEase Animation",
      category: "Lottie Animation/Motion Graphics",
      image: "/images/projects/multimedia/lottie-motion-graphic/cartease/image-1.png",
      slug: "cartease-animation",
      isMultimedia: true,
      projectType: "multimedia/lottie-motion-graphic",
      projectName: "cartease",
      videoUrl: "/videos/projects/cartease/video.mp4"
    },
    {
      title: "Shadow Nexus Animation",
      category: "Lottie Animation/Motion Graphics",
      image: "/images/projects/multimedia/lottie-motion-graphic/shadow-nexus/image-1.png",
      slug: "shadow-nexus-animation",
      isMultimedia: true,
      projectType: "multimedia/lottie-motion-graphic",
      projectName: "shadow-nexus",
      videoUrl: "/videos/projects/shadow-nexus/video.mp4"
    }
  ],
}

// Map categories to service pages
const categoryToService = {
  "ui-ux": "/services/web-and-mobile",
  branding: "/services/graphic-design",
  multimedia: "/services/multimedia",
}

export default function ProjectFilter() {
  // Set the default active category to "ui-ux"
  const [activeCategory, setActiveCategory] = useState("ui-ux")

  // Get the projects for the active category
  const activeProjects = projectsData[activeCategory as keyof typeof projectsData] || []

  return (
    <div className="space-y-8">
      {/* Category Navigation */}
      <div className="flex flex-wrap gap-4 justify-center">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category.id
                ? "bg-gradient-to-r from-[#FF4444] to-[#FF5E42] text-white shadow-md shadow-[#FF4444]/20"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <ProjectGrid projects={activeProjects} />

      {/* View All Button */}
      <div className="flex justify-center mt-8">
        <Link href={categoryToService[activeCategory as keyof typeof categoryToService] || "#"}>
          <Button className="rounded-full px-8">
            View All {categories.find((c) => c.id === activeCategory)?.name} Projects
          </Button>
        </Link>
      </div>
    </div>
  )
}


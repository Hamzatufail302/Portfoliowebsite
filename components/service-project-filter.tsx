"use client"

import { useState, useEffect } from "react"
import ProjectGrid from "@/components/project-grid"
import { motion } from "framer-motion"
import { StaggerContainer } from "@/components/animations"

interface Category {
  id: string
  name: string
}

interface Project {
  title: string
  category: string
  image: string
  slug: string
}

interface ServiceProjectFilterProps {
  categories: Category[]
}

// Sample project data for all categories
const projectsData: Record<string, Project[]> = {
  // Web UI projects
  "web-ui": [
    {
      title: "E-commerce Website",
      category: "Web UI Design",
      image: "/placeholder.svg?height=300&width=400",
      slug: "e-commerce-website",
    },
    {
      title: "Portfolio Website",
      category: "Web UI Design",
      image: "/placeholder.svg?height=300&width=400",
      slug: "portfolio-website",
    },
    {
      title: "Dashboard UI",
      category: "Web UI Design",
      image: "/placeholder.svg?height=300&width=400",
      slug: "dashboard-ui",
    },
    {
      title: "Landing Page",
      category: "Web UI Design",
      image: "/placeholder.svg?height=300&width=400",
      slug: "landing-page",
    },
    {
      title: "Blog Platform",
      category: "Web UI Design",
      image: "/placeholder.svg?height=300&width=400",
      slug: "blog-platform",
    },
    {
      title: "Admin Panel",
      category: "Web UI Design",
      image: "/placeholder.svg?height=300&width=400",
      slug: "admin-panel",
    },
  ],

  // Mobile App UI projects
  "mobile-app-ui": [
    {
      title: "Fitness App",
      category: "Mobile UI Design",
      image: "/placeholder.svg?height=300&width=400",
      slug: "fitness-app",
    },
    {
      title: "Food Delivery App",
      category: "Mobile UI Design",
      image: "/placeholder.svg?height=300&width=400",
      slug: "food-delivery-app",
    },
    {
      title: "Social Media App",
      category: "Mobile UI Design",
      image: "/placeholder.svg?height=300&width=400",
      slug: "social-media-app",
    },
    {
      title: "Travel App",
      category: "Mobile UI Design",
      image: "/placeholder.svg?height=300&width=400",
      slug: "travel-app",
    },
    {
      title: "E-commerce App",
      category: "Mobile UI Design",
      image: "/placeholder.svg?height=300&width=400",
      slug: "e-commerce-app",
    },
    {
      title: "Music Player App",
      category: "Mobile UI Design",
      image: "/placeholder.svg?height=300&width=400",
      slug: "music-player-app",
    },
  ],

  // Branding projects
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

  // Other categories
  animations: [
    {
      title: "Product Animation",
      category: "Animation",
      image: "/placeholder.svg?height=300&width=400",
      slug: "product-animation",
    },
    {
      title: "Logo Animation",
      category: "Animation",
      image: "/placeholder.svg?height=300&width=400",
      slug: "logo-animation",
    },
    {
      title: "Character Animation",
      category: "Animation",
      image: "/placeholder.svg?height=300&width=400",
      slug: "character-animation",
    },
  ],
  "video-editing": [
    {
      title: "Corporate Video",
      category: "Video Editing",
      image: "/placeholder.svg?height=300&width=400",
      slug: "corporate-video",
    },
    {
      title: "Product Showcase",
      category: "Video Editing",
      image: "/placeholder.svg?height=300&width=400",
      slug: "product-showcase",
    },
    {
      title: "Event Highlights",
      category: "Video Editing",
      image: "/placeholder.svg?height=300&width=400",
      slug: "event-highlights",
    },
  ],
  "motion-graphics": [
    {
      title: "Explainer Video",
      category: "Motion Graphics",
      image: "/placeholder.svg?height=300&width=400",
      slug: "explainer-video",
    },
    {
      title: "Infographic Animation",
      category: "Motion Graphics",
      image: "/placeholder.svg?height=300&width=400",
      slug: "infographic-animation",
    },
    {
      title: "UI Motion",
      category: "Motion Graphics",
      image: "/placeholder.svg?height=300&width=400",
      slug: "ui-motion",
    },
  ],
  "social-media": [
    {
      title: "Instagram Posts",
      category: "Social Media",
      image: "/placeholder.svg?height=300&width=400",
      slug: "instagram-posts",
    },
    {
      title: "Facebook Ads",
      category: "Social Media",
      image: "/placeholder.svg?height=300&width=400",
      slug: "facebook-ads",
    },
    {
      title: "Twitter Graphics",
      category: "Social Media",
      image: "/placeholder.svg?height=300&width=400",
      slug: "twitter-graphics",
    },
  ],
  print: [
    {
      title: "Business Cards",
      category: "Print Design",
      image: "/placeholder.svg?height=300&width=400",
      slug: "business-cards",
    },
    {
      title: "Brochures",
      category: "Print Design",
      image: "/placeholder.svg?height=300&width=400",
      slug: "brochures",
    },
    {
      title: "Posters",
      category: "Print Design",
      image: "/placeholder.svg?height=300&width=400",
      slug: "posters",
    },
  ],
}

export default function ServiceProjectFilter({ categories }: ServiceProjectFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]?.id || "")
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Initialize projects on mount and when categories change
  useEffect(() => {
    if (categories && categories.length > 0) {
      setIsLoading(true)
      const initialCategory = categories[0].id
      setSelectedCategory(initialCategory)
      setFilteredProjects(projectsData[initialCategory] || [])
      // Add a small delay to ensure smooth loading transition
      setTimeout(() => setIsLoading(false), 100)
    }
  }, [categories])

  // Update filtered projects when category changes
  useEffect(() => {
    if (selectedCategory) {
      setIsLoading(true)
      setFilteredProjects(projectsData[selectedCategory] || [])
      // Add a small delay to ensure smooth loading transition
      setTimeout(() => setIsLoading(false), 100)
    }
  }, [selectedCategory])

  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  // Loading state
  if (!categories || categories.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Category Navigation */}
      <motion.div
        className="flex flex-wrap gap-4 justify-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? "bg-gradient-to-r from-[#FF4444] to-[#FF5E42] text-white shadow-md shadow-[#FF4444]/20"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.name}
          </motion.button>
        ))}
      </motion.div>

      {/* Section Title */}
      <motion.h2
        className="text-2xl font-bold mb-6 flex items-center dark:text-white"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <span className="h-5 w-5 bg-[#FF5D3A] mr-2 rounded"></span>
        {categories.find((cat) => cat.id === selectedCategory)?.name || ""} Designs
      </motion.h2>

      {/* Project Grid with Loading State */}
      <div className="w-full">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden aspect-[4/3] animate-pulse border border-gray-200 dark:border-gray-700"
              >
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700"></div>
              </div>
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <ProjectGrid projects={filteredProjects} fromService={true} />
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400">
            No projects found for this category.
          </div>
        )}
      </div>
    </div>
  )
}


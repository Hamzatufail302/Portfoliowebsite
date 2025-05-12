"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import ProjectGrid from "@/components/project-grid"
import { motion } from "framer-motion"
import { StaggerContainer, fadeInUp } from "@/components/animations"
import Link from "next/link"
import { useRouter } from "next/navigation"
import ImageDisplay from "@/components/image-display"

interface Category {
  id: string
  name: string
}

interface Project {
  title: string
  category: string
  image: string
  slug: string
  isMultimedia?: boolean
  projectType: string
  projectName: string
  videoUrl?: string
  images?: number[]
}

interface ServiceProjectFilterProps {
  categories: Category[]
}

// Sample project data for all categories
const projectData: Record<string, Project[]> = {
  // Web UI projects
  "web-ui": [
    {
      title: "Academic Stars Website",
      category: "Web UI Design",
      image: "/images/projects/web-mobile/web-ui/academic-stars/image-1.png",
      slug: "academic-stars",
      isMultimedia: false,
      projectType: "web-mobile/web-ui",
      projectName: "academic-stars",
      images: [1, 2, 3, 4, 5, 6, 7, 8]
    },
    {
      title: "Bloom Website",
      category: "Web UI Design",
      image: "/images/projects/web-mobile/web-ui/bloom/image-1.png",
      slug: "bloom",
      isMultimedia: false,
      projectType: "web-mobile/web-ui",
      projectName: "bloom",
      images: [1, 2, 3, 4, 5, 6]
    },
    {
      title: "BrandBridge Website",
      category: "Web UI Design",
      image: "/images/projects/web-mobile/web-ui/brandbridge/image-1.png",
      slug: "brandbridge",
      isMultimedia: false,
      projectType: "web-mobile/web-ui",
      projectName: "brandbridge",
      images: [1, 2, 3]
    },
    {
      title: "Comfort Corner Website",
      category: "Web UI Design",
      image: "/images/projects/web-mobile/web-ui/comfort-corner/image-1.png",
      slug: "comfort-corner",
      isMultimedia: false,
      projectType: "web-mobile/web-ui",
      projectName: "comfort-corner",
      images: [1, 2, 3]
    },
    {
      title: "E-commerce Tech Nest",
      category: "Web UI Design",
      image: "/images/projects/web-mobile/web-ui/e-commerce-tech-nest/image-1.png",
      slug: "e-commerce-tech-nest",
      isMultimedia: false,
      projectType: "web-mobile/web-ui",
      projectName: "e-commerce-tech-nest",
      images: [1, 2, 3]
    },
    {
      title: "Learn Sphere Website",
      category: "Web UI Design",
      image: "/images/projects/web-mobile/web-ui/learn-sphere/image-1.png",
      slug: "learn-sphere",
      isMultimedia: false,
      projectType: "web-mobile/web-ui",
      projectName: "learn-sphere",
      images: [1, 2, 3]
    },
    {
      title: "MarketIT Website",
      category: "Web UI Design",
      image: "/images/projects/web-mobile/web-ui/marketit/image-1.png",
      slug: "marketit",
      isMultimedia: false,
      projectType: "web-mobile/web-ui",
      projectName: "marketit",
      images: [1, 2, 3]
    },
    {
      title: "Shadow Nexus Gaming",
      category: "Web UI Design",
      image: "/images/projects/web-mobile/web-ui/shadow-nexus-gaming/image-1.png",
      slug: "shadow-nexus-gaming",
      isMultimedia: false,
      projectType: "web-mobile/web-ui",
      projectName: "shadow-nexus-gaming",
      images: [1, 2, 3, 4, 5, 6, 7, 8]
    },
    {
      title: "Upward Website",
      category: "Web UI Design",
      image: "/images/projects/web-mobile/web-ui/upward/image-1.png",
      slug: "upward",
      isMultimedia: false,
      projectType: "web-mobile/web-ui",
      projectName: "upward",
      images: [1, 2, 3, 4, 5, 6, 7]
    }
  ],

  // Mobile App UI projects
  "mobile-app-ui": [
    {
      title: "Blocksite App",
      category: "Mobile UI Design",
      image: "/images/projects/web-mobile/mobile-ui/blocksite/image-1.png",
      slug: "blocksite",
      isMultimedia: false,
      projectType: "web-mobile/mobile-ui",
      projectName: "blocksite"
    },
    {
      title: "Call Announcer",
      category: "Mobile UI Design",
      image: "/images/projects/web-mobile/mobile-ui/call-announcer/image-1.png",
      slug: "call-announcer",
      isMultimedia: false,
      projectType: "web-mobile/mobile-ui",
      projectName: "call-announcer"
    },
    {
      title: "Call Recorder",
      category: "Mobile UI Design",
      image: "/images/projects/web-mobile/mobile-ui/call-recorder/image-1.png",
      slug: "call-recorder",
      isMultimedia: false,
      projectType: "web-mobile/mobile-ui",
      projectName: "call-recorder"
    },
    {
      title: "CartEase",
      category: "Mobile UI Design",
      image: "/images/projects/web-mobile/mobile-ui/carteasy/image-1.png",
      slug: "carteasy",
      isMultimedia: false,
      projectType: "web-mobile/mobile-ui",
      projectName: "carteasy"
    },
    {
      title: "Meal Mate",
      category: "Mobile UI Design",
      image: "/images/projects/web-mobile/mobile-ui/meal-mate/image-1.png",
      slug: "meal-mate",
      isMultimedia: false,
      projectType: "web-mobile/mobile-ui",
      projectName: "meal-mate"
    },
    {
      title: "Voice Changer",
      category: "Mobile UI Design",
      image: "/images/projects/web-mobile/mobile-ui/voice-changer/image-1.png",
      slug: "voice-changer",
      isMultimedia: false,
      projectType: "web-mobile/mobile-ui",
      projectName: "voice-changer"
    }
  ],

  // Branding projects
  branding: [
    {
      title: "Crunch Brand Identity",
      category: "Branding",
      image: "/images/projects/graphic-design/branding/crunch-brand/image-1.png",
      slug: "crunch-brand",
      isMultimedia: false,
      projectType: "graphic-design/branding",
      projectName: "crunch-brand",
      images: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    {
      title: "Energizer Sustainable Solutions",
      category: "Branding",
      image: "/images/projects/graphic-design/branding/energizer-sustainable/image-1.png",
      slug: "energizer-sustainable",
      isMultimedia: false,
      projectType: "graphic-design/branding",
      projectName: "energizer-sustainable",
      images: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    },
    {
      title: "Zenith Architecture & Interiors",
      category: "Branding",
      image: "/images/projects/graphic-design/branding/zenith-architecture/image-1.png",
      slug: "zenith-architecture",
      isMultimedia: false,
      projectType: "graphic-design/branding",
      projectName: "zenith-architecture",
      images: [1, 2, 3, 4, 5, 6, 7]
    }
  ],

  // Print Design projects
  "print-design": [
    {
      title: "Crunch Brand Print Design",
      category: "Print Design",
      image: "/images/projects/graphic-design/print/crunch-brand/image-1.png",
      slug: "crunch-brand-print",
      isMultimedia: false,
      projectType: "graphic-design/print",
      projectName: "crunch-brand",
      images: [1, 2]
    },
    {
      title: "Energizer Sustainable Print Design",
      category: "Print Design",
      image: "/images/projects/graphic-design/print/energizer-sustainable/image-1.png",
      slug: "energizer-sustainable-print",
      isMultimedia: false,
      projectType: "graphic-design/print",
      projectName: "energizer-sustainable",
      images: [1, 2]
    },
    {
      title: "Zenith Architecture Print Design",
      category: "Print Design",
      image: "/images/projects/graphic-design/print/zenith-architecture/image-1.png",
      slug: "zenith-architecture-print",
      isMultimedia: false,
      projectType: "graphic-design/print",
      projectName: "zenith-architecture",
      images: [1, 6]
    }
  ],

  // Social Media projects
  "social-media": [
    {
      title: "Energizer Ads Campaign",
      category: "Social Media Design",
      image: "/images/projects/graphic-design/social-media/energizer-ads/image-1.png",
      slug: "energizer-ads",
      isMultimedia: false,
      projectType: "graphic-design/social-media",
      projectName: "energizer-ads",
      images: [1, 2, 3, 4, 5, 6, 7, 8]
    },
    {
      title: "Face Swap App SS Design",
      category: "Social Media Design",
      image: "/images/projects/graphic-design/social-media/face-swap/image-1.png",
      slug: "face-swap",
      isMultimedia: false,
      projectType: "graphic-design/social-media",
      projectName: "face-swap",
      images: [1, 2, 3, 4, 5, 6]
    },
    {
      title: "Zenith Brand Social Media",
      category: "Social Media Design",
      image: "/images/projects/graphic-design/social-media/zenith-social/image-1.png",
      slug: "zenith-social",
      isMultimedia: false,
      projectType: "graphic-design/social-media",
      projectName: "zenith-social",
      images: [1, 2, 3, 4, 5, 6, 7]
    },
    {
      title: "Jewelry Brand Social Media Post",
      category: "Social Media Design",
      image: "/images/projects/graphic-design/social-media/jewelry-social/image-1.png",
      slug: "jewelry-social",
      isMultimedia: false,
      projectType: "graphic-design/social-media",
      projectName: "jewelry-social",
      images: [1, 2, 3, 4, 5, 6]
    }
  ],

  // Other categories
  animations: [
    {
      title: "Bloom Animation",
      category: "Lottie Animation/Motion Graphics",
      image: "/images/projects/multimedia/lottie-motion-graphic/bloom-animation/image-1.png",
      slug: "bloom-animation",
      isMultimedia: true,
      projectType: "multimedia/lottie-motion-graphic",
      projectName: "bloom-animation",
      videoUrl: "/videos/projects/bloom-animation/video.mp4"
    },
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
      title: "Active Pulse",
      category: "Lottie Animation/Motion Graphics",
      image: "/images/projects/multimedia/lottie-motion-graphic/fitness-app-animation/image-1.png",
      slug: "fitness-app-animation",
      isMultimedia: true,
      projectType: "multimedia/lottie-motion-graphic",
      projectName: "fitness-app-animation",
      videoUrl: "/videos/projects/fitness-app/video.mp4"
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
      title: "Marwen Animation",
      category: "Lottie Animation/Motion Graphics",
      image: "/images/projects/multimedia/lottie-motion-graphic/marwen-animation/image-1.png",
      slug: "marwen-animation",
      isMultimedia: true,
      projectType: "multimedia/lottie-motion-graphic",
      projectName: "marwen-animation",
      videoUrl: "/videos/projects/Marwen/video.mp4"
    },
    {
      title: "ConnectNow",
      category: "Lottie Animation/Motion Graphics",
      image: "/images/projects/multimedia/lottie-motion-graphic/mobile-animation/image-1.png",
      slug: "mobile-animation",
      isMultimedia: true,
      projectType: "multimedia/lottie-motion-graphic",
      projectName: "mobile-animation",
      videoUrl: "/videos/projects/mobile-animation/video.mp4"
    },
    {
      title: "Upward Animation",
      category: "Lottie Animation/Motion Graphics",
      image: "/images/projects/multimedia/lottie-motion-graphic/upward-animation/image-1.png",
      slug: "upward-animation",
      isMultimedia: true,
      projectType: "multimedia/lottie-motion-graphic",
      projectName: "upward-animation",
      videoUrl: "/videos/projects/upward/video.mp4"
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
    },
    {
      title: "Voice Changer Animation",
      category: "Lottie Animation/Motion Graphics",
      image: "/images/projects/multimedia/lottie-motion-graphic/voice-changer-animation/image-1.png",
      slug: "voice-changer-animation",
      isMultimedia: true,
      projectType: "multimedia/lottie-motion-graphic",
      projectName: "voice-changer-animation",
      videoUrl: "/videos/projects/voice-changer/video.mp4"
    }
  ],
  "video-editing": [
    {
      title: "Corporate Overview Video",
      category: "Video Editing",
      image: "/images/projects/multimedia/video-editing/corporate-video/image-1.png",
      slug: "corporate-video",
      isMultimedia: true,
      projectType: "multimedia/video-editing",
      projectName: "corporate-video"
    },
    {
      title: "Product Launch Video",
      category: "Video Editing",
      image: "/images/projects/multimedia/video-editing/product-video/image-1.png",
      slug: "product-video",
      isMultimedia: true,
      projectType: "multimedia/video-editing",
      projectName: "product-video"
    }
  ],
}

const ProjectCard = ({ project, currentSection }: { project: Project, currentSection: string }) => {
  return (
    <motion.div
      variants={fadeInUp}
      className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
    >
      <Link href={`/projects/${project.slug}?from=service&section=${currentSection}`}>
        <div className={`relative overflow-hidden ${
          project.slug === "energizer-sustainable" ? "aspect-[3/2]" : "aspect-[4/3]"
        }`}>
          <ImageDisplay
            section="projects"
            projectType={project.projectType}
            projectName={project.projectName}
            index={0}
            fallbackSrc="/images/placeholder.png"
            alt={project.title}
            width={800}
            height={600}
            className={`w-full h-full transition-transform duration-300 group-hover:scale-110 ${
              project.slug === "energizer-sustainable" 
                ? "object-contain object-left pl-4" 
                : "object-cover"
            }`}
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="text-white text-lg font-medium">View Project</span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{project.title}</h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{project.category}</p>
        </div>
      </Link>
    </motion.div>
  )
}

export default function ServiceProjectFilter({ categories }: ServiceProjectFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]?.id || "")
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Initialize projects on mount and when categories change
  useEffect(() => {
    // Get section from URL query parameter
    const urlParams = new URLSearchParams(window.location.search)
    const section = urlParams.get("section")
    if (section && categories.some(cat => cat.id === section)) {
      setSelectedCategory(section)
      setFilteredProjects(projectData[section] || [])
    } else {
      const initialCategory = categories[0].id
      setSelectedCategory(initialCategory)
      setFilteredProjects(projectData[initialCategory] || [])
    }
    setIsLoading(false)

    // Add popstate event listener for back button
    const handlePopState = () => {
      router.push("/")
    }
    window.addEventListener("popstate", handlePopState)

    // Cleanup
    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [categories, router])

  // Handle category change
  const handleCategoryChange = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId)
    setFilteredProjects(projectData[categoryId] || [])
    // Update URL with new section
    const url = new URL(window.location.href)
    url.searchParams.set("section", categoryId)
    window.history.pushState({}, "", url.toString())
  }, [])

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
        transition={{ duration: 0.3 }}
      >
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-transform hover:scale-105 ${
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
        transition={{ duration: 0.3 }}
      >
        <span className="h-5 w-5 bg-[#FF5D3A] mr-2 rounded"></span>
        {categories.find((cat) => cat.id === selectedCategory)?.name || ""} Designs
      </motion.h2>

      {/* Project Grid */}
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


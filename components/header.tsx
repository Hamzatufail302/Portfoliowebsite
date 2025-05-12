"use client"

import type React from "react"
import { Suspense } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

// Map categories to service pages
const categoryToServicePage = {
  "UI/UX Design": "/services/web-and-mobile",
  "Web Design": "/services/web-and-mobile",
  "Web UI Design": "/services/web-and-mobile",
  "Mobile UI Design": "/services/web-and-mobile",
  Branding: "/services/graphic-design",
  Multimedia: "/services/multimedia",
  Animation: "/services/multimedia",
  "Video Editing": "/services/multimedia",
  "Motion Graphics": "/services/multimedia",
  "Social Media": "/services/graphic-design",
  "Print Design": "/services/graphic-design",
}

// Project data mapping for determining the category
const projectCategories = {
  // Web UI Projects
  "academic-stars": "Web UI Design",
  "bloom": "Web UI Design",
  "brandbridge": "Web UI Design",
  "comfort-corner": "Web UI Design",
  "e-commerce-tech-nest": "Web UI Design",
  "learn-sphere": "Web UI Design",
  "marketit": "Web UI Design",
  "shadow-nexus-gaming": "Web UI Design",
  "upward": "Web UI Design",

  // Mobile UI Projects
  "blocksite": "Mobile UI Design",
  "call-announcer": "Mobile UI Design",
  "call-recorder": "Mobile UI Design",
  "carteasy": "Mobile UI Design",
  "meal-mate": "Mobile UI Design",
  "voice-changer": "Mobile UI Design",

  // Branding Projects
  "crunch-brand": "Branding",
  "energizer-sustainable": "Branding",
  "zenith-architecture": "Branding",

  // Print Design Projects
  "crunch-brand-print": "Print Design",
  "energizer-sustainable-print": "Print Design",
  "zenith-architecture-print": "Print Design",

  // Social Media Projects
  "fashion-social": "Social Media Design",
  "food-social": "Social Media Design",

  // Animation Projects
  "bloom-animation": "Lottie Animation/Motion Graphics",
  "brand-bridge-animation": "Lottie Animation/Motion Graphics",
  "fitness-app-animation": "Lottie Animation/Motion Graphics",
  "cartease-animation": "Lottie Animation/Motion Graphics",
  "marwen-animation": "Lottie Animation/Motion Graphics",
  "mobile-animation": "Lottie Animation/Motion Graphics",
  "upward-animation": "Lottie Animation/Motion Graphics",
  "shadow-nexus-animation": "Lottie Animation/Motion Graphics",
  "voice-changer-animation": "Lottie Animation/Motion Graphics",

  // Video Editing Projects
  "corporate-video": "Video Editing",
  "product-video": "Video Editing"
}

// Separate the content that uses useSearchParams
function HeaderInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const fromService = searchParams.get("from") === "service"
  const section = searchParams.get("section") || ""
  const { theme, setTheme } = useTheme()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md dark:bg-gray-950/80">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <Logo />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-6"
          >
            {pathname.startsWith("/projects/") && fromService ? (
              <Link
                href={`/#${section}`}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                ← Back to Services
              </Link>
            ) : null}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full border-[#FF5D3A] text-[#FF5D3A] hover:bg-[#FF5D3A]/5 hover:text-[#FF5D3A] hover:border-[#FF5D3A] dark:text-[#FF5D3A] dark:border-[#FF5D3A]"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </motion.div>
        </div>
      </nav>
    </header>
  )
}

// Main component wrapped in Suspense
export default function Header() {
  return (
    <Suspense fallback={
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md dark:bg-gray-950/80">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="w-32 h-8 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          </div>
        </nav>
      </header>
    }>
      <HeaderInner />
    </Suspense>
  )
}


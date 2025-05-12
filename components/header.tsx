"use client"

import type React from "react"
import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import Logo from "@/components/logo"
import { Menu, Moon, Sun, X } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

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
function HeaderContent() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Check page types
  const isHomePage = pathname === "/"
  const isProjectPage = pathname.startsWith("/projects/")
  const isServicePage = pathname.startsWith("/services/")
  const fromService = searchParams.get("from") === "service"

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileMenuOpen])

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark")
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

  const scrollToSection = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault()
    const section = document.getElementById(sectionId)
    if (section) section.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-sm shadow-sm dark:bg-gray-900/90" : "bg-white/80 backdrop-blur-md dark:bg-gray-950/80"
      }`}>
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {isHomePage ? (
                <button onClick={scrollToTop} className="flex items-center gap-2">
                  <Logo />
                </button>
              ) : (
                <Link href="/">
                  <Logo />
                </Link>
              )}
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <Link
                href={isHomePage ? "#" : "/"}
                onClick={isHomePage ? scrollToTop : undefined}
                className="text-sm font-medium hover:text-[#FF5D3A] transition-colors dark:text-gray-200 dark:hover:text-[#FF5D3A]"
              >
                Home
              </Link>
              <Link
                href="/#about"
                onClick={isHomePage ? (e) => scrollToSection("about", e) : undefined}
                className="text-sm font-medium hover:text-[#FF5D3A] transition-colors dark:text-gray-200 dark:hover:text-[#FF5D3A]"
              >
                About
              </Link>
              <Link
                href="/#services"
                onClick={isHomePage ? (e) => scrollToSection("services", e) : undefined}
                className="text-sm font-medium hover:text-[#FF5D3A] transition-colors dark:text-gray-200 dark:hover:text-[#FF5D3A]"
              >
                Services
              </Link>
              <Link
                href="/#featured-projects"
                onClick={isHomePage ? (e) => scrollToSection("featured-projects", e) : undefined}
                className="text-sm font-medium hover:text-[#FF5D3A] transition-colors dark:text-gray-200 dark:hover:text-[#FF5D3A]"
              >
                Projects
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              {mounted && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleTheme}
                  className="rounded-full border-[#FF5D3A] text-[#FF5D3A] hover:bg-[#FF5D3A]/5 hover:text-[#FF5D3A] hover:border-[#FF5D3A] dark:text-[#FF5D3A] dark:border-[#FF5D3A]"
                >
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                className="md:hidden text-gray-700 dark:text-gray-200"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-white dark:bg-gray-900">
          <div className="p-4 flex justify-between items-center">
            <Logo />
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="p-4 flex flex-col gap-4">
            <Link
              href={isHomePage ? "#" : "/"}
              onClick={(e) => { toggleMobileMenu(); isHomePage && scrollToTop(e); }}
              className="text-lg font-medium"
            >
              Home
            </Link>
            <Link
              href="/#about"
              onClick={(e) => { toggleMobileMenu(); isHomePage && scrollToSection("about", e); }}
              className="text-lg font-medium"
            >
              About
            </Link>
            <Link
              href="/#services"
              onClick={(e) => { toggleMobileMenu(); isHomePage && scrollToSection("services", e); }}
              className="text-lg font-medium"
            >
              Services
            </Link>
            <Link
              href="/#featured-projects"
              onClick={(e) => { toggleMobileMenu(); isHomePage && scrollToSection("featured-projects", e); }}
              className="text-lg font-medium"
            >
              Projects
            </Link>
          </nav>
        </div>
      )}
    </>
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
      <HeaderContent />
    </Suspense>
  )
}


"use client"

import type React from "react"

import Link from "next/link"
import Logo from "@/components/logo"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { usePathname, useSearchParams } from "next/navigation"
import { Menu, Moon, Sun, X } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

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
  "mobile-app-design": "UI/UX Design",
  "e-commerce-landing-page": "Web Design",
  "dashboard-ui": "UI/UX Design",
  "restaurant-branding": "Branding",
  "tech-startup-branding": "Branding",
  "fashion-brand-identity": "Branding",
  "motion-graphics": "Multimedia",
  "video-editing": "Video Editing",
  "3d-animation": "Animation",
  "e-commerce-website": "Web UI Design",
  "portfolio-website": "Web UI Design",
  "landing-page": "Web UI Design",
  "blog-platform": "Web UI Design",
  "admin-panel": "Web UI Design",
  "fitness-app": "Mobile UI Design",
  "food-delivery-app": "Mobile UI Design",
  "social-media-app": "Mobile UI Design",
  "travel-app": "Mobile UI Design",
  "e-commerce-app": "Mobile UI Design",
  "music-player-app": "Mobile UI Design",
  "product-animation": "Animation",
  "logo-animation": "Animation",
  "character-animation": "Animation",
  "corporate-video": "Video Editing",
  "product-showcase": "Video Editing",
  "event-highlights": "Video Editing",
  "explainer-video": "Motion Graphics",
  "infographic-animation": "Motion Graphics",
  "ui-motion": "Motion Graphics",
  "instagram-posts": "Social Media",
  "facebook-ads": "Social Media",
  "twitter-graphics": "Social Media",
  "business-cards": "Print Design",
  brochures: "Print Design",
  posters: "Print Design",
}

export default function Header() {
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

  // Get the project slug from the pathname
  const projectSlug = isProjectPage ? pathname.split("/").pop() : ""

  // After mounting, we can access the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle smooth scrolling for anchor links
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // Function to scroll to a section by ID
  const scrollToSection = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault()
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Scroll to top of page
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Determine the appropriate projects link
  let projectsLink = "/#projects"

  if (isServicePage) {
    // If we're on a service page, we'll handle the scrolling with JavaScript
    projectsLink = "#projects"
  } else if (isProjectPage && fromService && projectSlug) {
    // If we're on a project page that was opened from a service page, link back to that service page
    const category = projectCategories[projectSlug as keyof typeof projectCategories]
    if (category) {
      const servicePage = categoryToServicePage[category as keyof typeof categoryToServicePage]
      if (servicePage) {
        projectsLink = servicePage
      }
    }
  }

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-sm shadow-sm dark:bg-gray-900/90" : "dark:bg-transparent"
        }`}
      >
        <div className="container mx-auto py-6 px-4 flex items-center justify-between">
          <motion.div variants={itemVariants}>
            {isHomePage ? (
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 bg-transparent border-none p-0 cursor-pointer"
              >
                <Logo />
              </button>
            ) : (
              <Link href="/">
                <Logo />
              </Link>
            )}
          </motion.div>

          <nav className="hidden md:flex items-center gap-8">
            <motion.div variants={itemVariants}>
              {isHomePage ? (
                <button
                  onClick={scrollToTop}
                  className="text-sm font-medium hover:text-[#FF5D3A] transition-colors dark:text-gray-200 dark:hover:text-[#FF5D3A] bg-transparent border-none p-0 cursor-pointer"
                >
                  Home
                </button>
              ) : (
                <Link
                  href="/"
                  className="text-sm font-medium hover:text-[#FF5D3A] transition-colors dark:text-gray-200 dark:hover:text-[#FF5D3A]"
                >
                  Home
                </Link>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              {isHomePage ? (
                <button
                  onClick={(e) => scrollToSection("about", e)}
                  className="text-sm font-medium hover:text-[#FF5D3A] transition-colors dark:text-gray-200 dark:hover:text-[#FF5D3A] bg-transparent border-none p-0 cursor-pointer"
                >
                  About
                </button>
              ) : (
                <Link
                  href="/#about"
                  className="text-sm font-medium hover:text-[#FF5D3A] transition-colors dark:text-gray-200 dark:hover:text-[#FF5D3A]"
                >
                  About
                </Link>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              {isHomePage ? (
                <button
                  onClick={(e) => scrollToSection("services", e)}
                  className="text-sm font-medium hover:text-[#FF5D3A] transition-colors dark:text-gray-200 dark:hover:text-[#FF5D3A] bg-transparent border-none p-0 cursor-pointer"
                >
                  Services
                </button>
              ) : (
                <Link
                  href="/#services"
                  className="text-sm font-medium hover:text-[#FF5D3A] transition-colors dark:text-gray-200 dark:hover:text-[#FF5D3A]"
                >
                  Services
                </Link>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              {isHomePage ? (
                <button
                  onClick={(e) => scrollToSection("projects", e)}
                  className="text-sm font-medium hover:text-[#FF5D3A] transition-colors dark:text-gray-200 dark:hover:text-[#FF5D3A] bg-transparent border-none p-0 cursor-pointer"
                >
                  Projects
                </button>
              ) : isServicePage ? (
                <button
                  onClick={(e) => scrollToSection("projects", e)}
                  className="text-sm font-medium hover:text-[#FF5D3A] transition-colors dark:text-gray-200 dark:hover:text-[#FF5D3A] bg-transparent border-none p-0 cursor-pointer"
                >
                  Projects
                </button>
              ) : (
                <Link
                  href={projectsLink}
                  className="text-sm font-medium hover:text-[#FF5D3A] transition-colors dark:text-gray-200 dark:hover:text-[#FF5D3A]"
                >
                  Projects
                </Link>
              )}
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
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
              className="text-gray-700 dark:text-gray-200"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>

          <motion.div variants={itemVariants} className="hidden md:block">
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
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay - Moved outside the header to ensure full coverage */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-white dark:bg-gray-900"
          style={{ top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <div className="sticky top-0 left-0 right-0 bg-white dark:bg-gray-900 z-10 py-6 px-4 flex justify-between items-center shadow-sm">
            {isHomePage ? (
              <button
                onClick={(e) => {
                  setMobileMenuOpen(false)
                  scrollToTop(e)
                }}
                className="flex items-center gap-2 bg-transparent border-none p-0 cursor-pointer"
              >
                <Logo />
              </button>
            ) : (
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <Logo />
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="text-gray-700 dark:text-gray-200"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="h-[calc(100vh-80px)] overflow-y-auto">
            <nav className="container mx-auto px-4 py-8 flex flex-col items-center gap-8">
              {isHomePage ? (
                <button
                  onClick={(e) => {
                    setMobileMenuOpen(false)
                    scrollToTop(e)
                  }}
                  className="text-xl font-medium hover:text-[#FF5D3A] transition-colors dark:text-gray-200 dark:hover:text-[#FF5D3A] bg-transparent border-none p-0 cursor-pointer"
                >
                  Home
                </button>
              ) : (
                <Link
                  href="/"
                  className="text-xl font-medium hover:text-[#FF5D3A] transition-colors dark:text-gray-200 dark:hover:text-[#FF5D3A]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
              )}

              {isHomePage ? (
                <button
                  onClick={(e) => {
                    setMobileMenuOpen(false)
                    scrollToSection("about", e)
                  }}
                  className="text-xl font-medium hover:text-[#FF5D3A] transition-colors dark:text-gray-200 dark:hover:text-[#FF5D3A] bg-transparent border-none p-0 cursor-pointer"
                >
                  About
                </button>
              ) : (
                <Link
                  href="/#about"
                  className="text-xl font-medium hover:text-[#FF5D3A] transition-colors dark:text-gray-200 dark:hover:text-[#FF5D3A]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
              )}

              {isHomePage ? (
                <button
                  onClick={(e) => {
                    setMobileMenuOpen(false)
                    scrollToSection("services", e)
                  }}
                  className="text-xl font-medium hover:text-[#FF5D3A] transition-colors dark:text-gray-200 dark:hover:text-[#FF5D3A] bg-transparent border-none p-0 cursor-pointer"
                >
                  Services
                </button>
              ) : (
                <Link
                  href="/#services"
                  className="text-xl font-medium hover:text-[#FF5D3A] transition-colors dark:text-gray-200 dark:hover:text-[#FF5D3A]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Services
                </Link>
              )}

              {isHomePage ? (
                <button
                  onClick={(e) => {
                    setMobileMenuOpen(false)
                    scrollToSection("projects", e)
                  }}
                  className="text-xl font-medium hover:text-[#FF5D3A] transition-colors dark:text-gray-200 dark:hover:text-[#FF5D3A] bg-transparent border-none p-0 cursor-pointer"
                >
                  Projects
                </button>
              ) : isServicePage ? (
                <button
                  onClick={(e) => {
                    setMobileMenuOpen(false)
                    scrollToSection("projects", e)
                  }}
                  className="text-xl font-medium hover:text-[#FF5D3A] transition-colors dark:text-gray-200 dark:hover:text-[#FF5D3A] bg-transparent border-none p-0 cursor-pointer"
                >
                  Projects
                </button>
              ) : (
                <Link
                  href={projectsLink}
                  className="text-xl font-medium hover:text-[#FF5D3A] transition-colors dark:text-gray-200 dark:hover:text-[#FF5D3A]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Projects
                </Link>
              )}

              <div className="mt-8">
                {mounted && (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={toggleTheme}
                    className="rounded-full border-[#FF5D3A] text-[#FF5D3A] hover:bg-[#FF5D3A]/5 hover:text-[#FF5D3A] hover:border-[#FF5D3A] dark:text-[#FF5D3A] dark:border-[#FF5D3A]"
                  >
                    {theme === "dark" ? (
                      <div className="flex items-center gap-2">
                        <Sun className="h-5 w-5" /> Light Mode
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Moon className="h-5 w-5" /> Dark Mode
                      </div>
                    )}
                  </Button>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}


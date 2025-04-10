"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronUp } from "lucide-react"
import SocialLinks from "@/components/social-links"
import Logo from "@/components/logo"
import { motion } from "framer-motion"
import { AnimateInView, StaggerContainer, StaggerItem } from "@/components/animations"
// Update the imports to include usePathname
import { usePathname } from "next/navigation"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Add the scrollToSection function after the scrollToTop function
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  const scrollToSection = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault()
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-[#F9F9F9] dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <AnimateInView>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
            <StaggerContainer className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-8 md:space-y-0">
              <StaggerItem>
                <div className="mb-8 md:mb-0">
                  <Logo />
                </div>
              </StaggerItem>

              {/* Replace the navigation links with conditional rendering */}
              <StaggerItem>
                <nav className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-8 md:mb-0">
                  {isHomePage ? (
                    <button
                      onClick={scrollToTop}
                      className="text-sm font-medium hover:text-[#FF5D3A] transition-colors text-gray-800 dark:text-gray-200 bg-transparent border-none p-0 cursor-pointer"
                    >
                      Home
                    </button>
                  ) : (
                    <Link
                      href="/"
                      className="text-sm font-medium hover:text-[#FF5D3A] transition-colors text-gray-800 dark:text-gray-200"
                    >
                      Home
                    </Link>
                  )}

                  {isHomePage ? (
                    <button
                      onClick={(e) => scrollToSection("about", e)}
                      className="text-sm font-medium hover:text-[#FF5D3A] transition-colors text-gray-800 dark:text-gray-200 bg-transparent border-none p-0 cursor-pointer"
                    >
                      About
                    </button>
                  ) : (
                    <Link
                      href="/#about"
                      className="text-sm font-medium hover:text-[#FF5D3A] transition-colors text-gray-800 dark:text-gray-200"
                    >
                      About
                    </Link>
                  )}

                  {isHomePage ? (
                    <button
                      onClick={(e) => scrollToSection("projects", e)}
                      className="text-sm font-medium hover:text-[#FF5D3A] transition-colors text-gray-800 dark:text-gray-200 bg-transparent border-none p-0 cursor-pointer"
                    >
                      Projects
                    </button>
                  ) : (
                    <Link
                      href="/#projects"
                      className="text-sm font-medium hover:text-[#FF5D3A] transition-colors text-gray-800 dark:text-gray-200"
                    >
                      Projects
                    </Link>
                  )}

                  {isHomePage ? (
                    <button
                      onClick={(e) => scrollToSection("services", e)}
                      className="text-sm font-medium hover:text-[#FF5D3A] transition-colors text-gray-800 dark:text-gray-200 bg-transparent border-none p-0 cursor-pointer"
                    >
                      Services
                    </button>
                  ) : (
                    <Link
                      href="/#services"
                      className="text-sm font-medium hover:text-[#FF5D3A] transition-colors text-gray-800 dark:text-gray-200"
                    >
                      Services
                    </Link>
                  )}
                </nav>
              </StaggerItem>

              <StaggerItem>
                <SocialLinks />
              </StaggerItem>
            </StaggerContainer>

            <AnimateInView>
              <div className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  ©2023 Portfolio Website - All Rights Reserved
                </p>
                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full dark:border-gray-700 dark:text-gray-300"
                    onClick={scrollToTop}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </AnimateInView>
          </div>
        </AnimateInView>
      </div>
    </footer>
  )
}


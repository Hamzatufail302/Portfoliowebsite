"use client"

import { useEffect } from "react"
import ServiceHeader from "@/components/service-header"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ServiceProjectFilter from "@/components/service-project-filter"
import { AnimateInView, fadeIn, fadeInUp } from "@/components/animations"
import { motion } from "framer-motion"

export default function WebAndMobilePage() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Filter categories for Web and Mobile
  const filterCategories = [
    { id: "web-ui", name: "Web UI" },
    { id: "mobile-app-ui", name: "Mobile App UI" },
  ]

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn} className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <Header />

      {/* Service Header */}
      <AnimateInView>
        <ServiceHeader
          title="Web and Mobile Design"
          description="UX/UI designs, pixel-perfect designs and unique user experiences that enhance user satisfaction. I create intuitive interfaces that are both visually appealing and functional across all devices."
          icon={
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="8" fill="#FFECE8" className="dark:fill-gray-800" />
              <path
                d="M34 14H24C22.9 14 22 14.9 22 16V32C22 33.1 22.9 34 24 34H34C35.1 34 36 33.1 36 32V16C36 14.9 35.1 14 34 14ZM34 32H24V16H34V32ZM18 18H14V30H18V34H12V14H18V18ZM29 29C27.9 29 27 28.1 27 27C27 25.9 27.9 25 29 25C30.1 25 31 25.9 31 27C31 28.1 30.1 29 29 29Z"
                fill="#FF5D3A"
              />
            </svg>
          }
        />
      </AnimateInView>

      {/* Project Filter */}
      <AnimateInView variants={fadeInUp} delay={0.2}>
        <section id="projects" className="container mx-auto px-4 py-16 pb-32">
          <ServiceProjectFilter categories={filterCategories} />
        </section>
      </AnimateInView>

      {/* Footer */}
      <Footer />
    </motion.div>
  )
}


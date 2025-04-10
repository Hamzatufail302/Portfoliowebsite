"use client"

import { useEffect } from "react"
import ServiceHeader from "@/components/service-header"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ServiceProjectFilter from "@/components/service-project-filter"
import { AnimateInView, fadeIn, fadeInUp } from "@/components/animations"
import { motion } from "framer-motion"

export default function MultimediaPage() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Filter categories for Multimedia
  const filterCategories = [
    { id: "animations", name: "Animations" },
    { id: "video-editing", name: "Video Editing" },
    { id: "motion-graphics", name: "Motion Graphics" },
  ]

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn} className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <Header />

      {/* Service Header */}
      <AnimateInView>
        <ServiceHeader
          title="Multimedia Content"
          description="Motion graphics of different categories, Lottie animations and premium video editing Services. I create engaging and dynamic visual content that captures attention and effectively communicates your message."
          icon={
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="8" fill="#FFECE8" className="dark:fill-gray-800" />
              <path
                d="M34 14H14C12.9 14 12 14.9 12 16V32C12 33.1 12.9 34 14 34H34C35.1 34 36 33.1 36 32V16C36 14.9 35.1 14 34 14ZM34 32H14V16H34V32ZM24 25C25.66 25 27 23.66 27 22C27 20.34 25.66 19 24 19C22.34 19 21 20.34 21 22C21 23.66 22.34 25 24 25ZM24 21C24.55 21 25 21.45 25 22C25 22.55 24.55 23 24 23C23.45 23 23 22.55 23 22C23 21.45 23.45 21 24 21Z"
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


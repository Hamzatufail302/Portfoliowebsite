"use client"

import { useEffect } from "react"
import ServiceHeader from "@/components/service-header"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ServiceProjectFilter from "@/components/service-project-filter"
import { AnimateInView, fadeIn, fadeInUp } from "@/components/animations"
import { motion } from "framer-motion"

export default function GraphicDesignPage() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Filter categories for Graphic Design
  const filterCategories = [
    { id: "social-media", name: "Social Media" },
    { id: "branding", name: "Branding" },
    { id: "print", name: "Print" },
  ]

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn} className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <Header />

      {/* Service Header */}
      <AnimateInView>
        <ServiceHeader
          title="Graphic Design"
          description="Visual content to communicate messages effectively. It combines designs for print, digital media, branding, and marketing. I create cohesive visual identities that strengthen brand recognition."
          icon={
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="8" fill="#FFECE8" className="dark:fill-gray-800" />
              <path
                d="M56 24H24C22 24 20 26 20 28V52C20 54 22 56 24 56H56C58 56 60 54 60 52V28C60 26 58 24 56 24ZM56 52H24V28H56V52ZM38.02 48.8C38.82 49.6 40.14 49.6 40.94 48.8L45.18 44.56L49.42 48.8C50.22 49.6 51.54 49.6 52.34 48.8C53.16 48 53.16 46.66 52.34 45.86L48.1 41.62L52.34 37.38C53.16 36.58 53.16 35.24 52.34 34.44C51.54 33.64 50.22 33.64 49.42 34.44L45.18 38.68L40.94 34.44C40.14 33.64 38.82 33.64 38.02 34.44C37.2 35.24 37.2 36.58 38.02 37.38L42.26 41.62L38.02 45.86C37.2 46.66 37.2 48 38.02 48.8Z"
                fill="#FF5D3A"
                className="dark:fill-[#F2BBA8]"
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


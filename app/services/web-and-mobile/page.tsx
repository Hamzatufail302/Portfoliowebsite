"use client"

import { useEffect } from "react"
import ServiceHeader from "@/components/service-header"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ServiceProjectFilter from "@/components/service-project-filter"
import { AnimateInView, fadeIn, fadeInUp } from "@/components/animations"
import { motion } from "framer-motion"
import { LayoutIcon } from "lucide-react"

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
            <LayoutIcon className="w-8 h-8 text-[#FF5D3A]" />
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


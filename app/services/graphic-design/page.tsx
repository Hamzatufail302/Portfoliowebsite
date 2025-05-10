"use client"

import { useEffect } from "react"
import ServiceHeader from "@/components/service-header"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ServiceProjectFilter from "@/components/service-project-filter"
import { AnimateInView, fadeIn, fadeInUp } from "@/components/animations"
import { motion } from "framer-motion"
import { PenToolIcon } from "lucide-react"

export default function GraphicDesignPage() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Filter categories for Graphic Design
  const filterCategories = [
    { id: "branding", name: "Branding" },
    { id: "social-media", name: "Social Media and Graphics" },
    { id: "print-design", name: "Print Design" },
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
            <PenToolIcon className="w-8 h-8 text-[#FF5D3A]" />
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


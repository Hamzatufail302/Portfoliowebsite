"use client"

import { useEffect } from "react"
import ServiceHeader from "@/components/service-header"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ServiceProjectFilter from "@/components/service-project-filter"
import { AnimateInView, fadeIn, fadeInUp } from "@/components/animations"
import { motion } from "framer-motion"
import { VideoIcon } from "lucide-react"

export default function MultimediaPage() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Filter categories for Multimedia
  const filterCategories = [
    { id: "animations", name: "Lottie Animation/Motion Graphic" },
    { id: "motion-graphics", name: "Motion Graphics" },
    { id: "video-editing", name: "Video Editing" },
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
            <VideoIcon className="w-8 h-8 text-[#FF5D3A]" />
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


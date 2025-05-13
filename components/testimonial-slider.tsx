"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import ImageDisplay from "@/components/image-display"
import { motion, AnimatePresence } from "framer-motion"

// Testimonial data
const testimonials = [
  {
    quote:
      "Hamza's UI/UX and multimedia design skills have significantly elevated our marketing campaigns. His attention to detail and modern design approach perfectly aligns with our brand vision.",
    author: "99 Marketing Studio",
    imageSection: "testimonials",
    projectType: "testimonials",
    projectName: "marketing-studio",
    imageIndex: 0,
    rating: 5,
  },
  {
    quote:
      "Working with Hamza on our app interfaces has been exceptional. His understanding of user experience and ability to create engaging animations has made our applications stand out in the market.",
    author: "Crew App Studio",
    imageSection: "testimonials",
    projectType: "testimonials",
    projectName: "app-studio",
    imageIndex: 1,
    rating: 5,
  }
]

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
    >
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-2xl font-serif text-[#FF5D3A]">&ldquo;</div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">{currentTestimonial.quote}</p>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-[40px] h-[40px] rounded-full overflow-hidden flex items-center justify-center" style={{
                backgroundColor: currentTestimonial.author === "99 Marketing Studio" ? "#FF5D3A" : "#3B82F6"
              }}>
                <span className="text-white font-bold text-lg">
                  {currentTestimonial.author === "99 Marketing Studio" ? "99" : "C"}
                </span>
              </div>
              <span className="font-medium text-sm dark:text-white">{currentTestimonial.author}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between mt-6">
        <div className="flex space-x-1">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-[#FF5D3A]" : "bg-gray-300 dark:bg-gray-600"}`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <motion.div whileHover={{ x: -3 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-8 w-8 dark:border-gray-700 dark:text-gray-300"
              onClick={goToPrevious}
            >
              <ArrowLeft className="h-3 w-3" />
            </Button>
          </motion.div>
          <motion.div whileHover={{ x: 3 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-8 w-8 bg-gradient-to-r from-[#FF4444] to-[#FF5E42] text-white shadow-md shadow-[#FF4444]/20"
              onClick={goToNext}
            >
              <ArrowRight className="h-3 w-3" />
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}


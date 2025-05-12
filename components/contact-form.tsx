"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { StaggerContainer, StaggerItem } from "@/components/animations"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    try {
      // This is a simple way to send an email using a mailto link
      // In a production environment, you would use a server-side solution
      const mailtoLink = `mailto:hamzatufail215@gmail.com?subject=Contact from CreativeHamza&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0AMessage: ${formData.message}`

      window.open(mailtoLink, "_blank")

      // Reset form
      setFormData({ name: "", email: "", message: "" })
      setSubmitSuccess(true)

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    } catch (error) {
      setSubmitError("Failed to send message. Please try again.")
      console.error("Error sending message:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 md:p-12"
    >
      <StaggerContainer>
        <form onSubmit={handleSubmit} className="space-y-6">
          <StaggerItem>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name*"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5D3A]/50"
              />
            </div>
          </StaggerItem>

          <StaggerItem>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email*"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5D3A]/50"
              />
            </div>
          </StaggerItem>

          <StaggerItem>
            <div>
              <textarea
                name="message"
                placeholder="Message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5D3A]/50"
              ></textarea>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="flex justify-center mt-8">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button type="submit" disabled={isSubmitting} className="rounded-full px-8 py-2">
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </motion.div>
            </div>
          </StaggerItem>
        </form>

        {submitSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-600 dark:text-green-400 text-center mt-4"
          >
            Thank you for your message! We'll get back to you soon.
          </motion.div>
        )}

        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-600 dark:text-red-400 text-center mt-4"
          >
            {submitError}
          </motion.div>
        )}
      </StaggerContainer>
    </motion.div>
  )
}


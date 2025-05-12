"use client"

import type React from "react"
import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface ServiceHeaderProps {
  title: string
  description: string
  icon: ReactNode
}

export default function ServiceHeader({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <section className="bg-[#F9F9F9] dark:bg-gray-900 py-24 md:py-40">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col items-center text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {icon}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-[#FF5D3A] font-medium mb-2 mt-4"
          >
            SERVICES
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold mb-5 dark:text-white"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-gray-600 dark:text-gray-300 mb-0 max-w-2xl"
          >
            {description}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}


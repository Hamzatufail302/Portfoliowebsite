"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}

export default function ServiceCard({ icon, title, description, href = "#" }: ServiceCardProps) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300 h-full min-h-[420px] flex flex-col justify-between border border-gray-100 dark:border-gray-700"
      >
        {/* Service Header */}
        <div className="flex flex-col items-center text-center flex-1 justify-center">
          <div className="bg-[#FFECE8] dark:bg-gray-700 p-4 rounded-xl mb-6">
            {icon}
          </div>
          <h3 className="text-xl md:text-2xl font-bold mb-3 dark:text-white">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-8">{description}</p>
        </div>

        {/* View Service Link */}
        <div className="flex items-center justify-center">
          <div className="group flex items-center gap-2 text-[#FF5D3A] font-medium">
            <span>View Service</span>
            <svg
              className="w-4 h-4 transform transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}


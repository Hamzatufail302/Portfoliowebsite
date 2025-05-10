"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"

interface ServiceCardProps {
  icon?: React.ReactNode
  title: string
  description: string
  href: string
  buttonText?: string
}

export default function ServiceCard({ icon, title, description, href = "#", buttonText = "View Service" }: ServiceCardProps) {
  return (
    <Link href={href} className="w-[95%] mx-auto block">
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-white hover:bg-[#FF5D3A] dark:bg-gray-800 dark:hover:bg-[#FF5D3A] rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300 h-[500px] flex flex-col items-center justify-center text-center border-2 border-gray-200 dark:border-gray-600 group"
      >
        <div className="flex flex-col items-center justify-center flex-1">
          {icon && (
            <div className="bg-[#FFECE8] dark:bg-gray-700 p-4 rounded-xl mb-8 group-hover:bg-white">
              {icon}
            </div>
          )}
          <h3 className="text-xl md:text-2xl font-bold mb-4 dark:text-white group-hover:text-white">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm max-w-sm group-hover:text-white">{description}</p>
        </div>
        
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2 font-medium">
            <span className="text-[#FF5D3A] group-hover:text-white transition-colors duration-200">{buttonText}</span>
            <svg
              className="w-4 h-4 transform transition-transform group-hover:translate-x-1 text-[#FF5D3A] group-hover:text-white"
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


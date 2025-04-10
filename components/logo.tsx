"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { getImageFromStorage } from "@/utils/media-storage"

export default function Logo() {
  const [logoSrc, setLogoSrc] = useState<string | null>(null)

  useEffect(() => {
    // Load logo from localStorage if available
    const savedLogo = getImageFromStorage('logo', 'main')
    if (savedLogo) {
      setLogoSrc(savedLogo)
    }
  }, [])

  return (
    <div className="flex items-center gap-2">
      {logoSrc ? (
        <Image
          src={logoSrc}
          alt="Portfolio Logo"
          width={32}
          height={32}
          className="h-8 w-8 object-contain"
        />
      ) : (
        <div className="h-8 w-8 bg-black dark:bg-white rounded-md flex items-center justify-center">
          <span className="text-white dark:text-black font-bold text-lg">P</span>
        </div>
      )}
      <span className="font-semibold text-lg dark:text-white">Portfolio</span>
    </div>
  )
}


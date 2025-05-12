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
          width={40}
          height={40}
          className="rounded-lg"
          alt="CreativeHamza Logo"
        />
      ) : (
        <div className="h-8 w-8 bg-black dark:bg-white rounded-md flex items-center justify-center">
          <span className="text-white dark:text-black font-bold text-lg">C</span>
        </div>
      )}
      <span className="font-semibold text-lg dark:text-white">CreativeHamza</span>
    </div>
  )
}


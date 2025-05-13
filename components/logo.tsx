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
    <div className="flex items-center gap-3">
      <div className="w-7 h-7 rounded bg-black flex items-center justify-center">
        <span className="text-white font-bold text-lg">C</span>
      </div>
      <span className="font-bold text-xl dark:text-white">CreativeHamza</span>
    </div>
  )
}


"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import { getImageFromStorage, getAllImagesForCategory } from "@/utils/media-storage"

interface ImageDisplayProps {
  section: string
  index?: number
  fallbackSrc: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
}

export default function ImageDisplay({
  section,
  index = 0,
  fallbackSrc,
  alt,
  width,
  height,
  className = "",
  priority = false,
}: ImageDisplayProps) {
  const [imageSrc, setImageSrc] = useState<string>(fallbackSrc)

  useEffect(() => {
    // Try to get the image from localStorage
    let savedImage = null
    
    if (section === 'hero') {
      savedImage = getImageFromStorage('hero', 'main')
    } else if (section === 'about') {
      savedImage = getImageFromStorage('about', 'main')
    } else if (section === 'projects') {
      const projectImages = getAllImagesForCategory('projects')
      const projectIds = Object.keys(projectImages)
      if (projectIds.length > index) {
        savedImage = projectImages[projectIds[index]]
      }
    } else if (section === 'services') {
      const serviceImages = getAllImagesForCategory('services')
      const serviceIds = Object.keys(serviceImages)
      if (serviceIds.length > index) {
        savedImage = serviceImages[serviceIds[index]]
      }
    }
    
    if (savedImage) {
      setImageSrc(savedImage)
    }
  }, [section, index, fallbackSrc])

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  )
}


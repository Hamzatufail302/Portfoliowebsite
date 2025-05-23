"use client"
import Image from "next/image"
import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import { getCloudinaryVideoUrl, getCloudinaryUrl } from "@/utils/cloudinary"

interface ImageDisplayProps {
  section: string
  projectType: string
  projectName: string
  index: number
  fallbackSrc: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  videoUrl?: string
  loading?: "lazy" | "eager"
  sizes?: string
}

export default function ImageDisplay({
  section,
  projectType,
  projectName,
  index,
  fallbackSrc,
  alt,
  width,
  height,
  className,
  priority = false,
  videoUrl,
  loading,
  sizes
}: ImageDisplayProps) {
  // Memoize image path calculation
  const imagePath = useMemo(() => {
    if (projectName === "upward") {
      return `image-${index}`;
    }
    if (projectType === "hero" || projectType === "about" || projectType === "testimonials") {
      return `/images/${projectType === "testimonials" ? "projects/testimonials" : projectType}/image-${index + 1}.png`;
    }
    return `/images/projects/${projectType}/${projectName}/image-${index}.png`;
  }, [projectName, projectType, index]);

  const [imageSrc, setImageSrc] = useState(() => {
    const finalSrc = projectName === 'upward' ? getCloudinaryUrl(imagePath) : imagePath;
    return finalSrc;
  });
  
  const [error, setError] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleError = useCallback(() => {
    setError(true);
    setImageSrc(fallbackSrc);
  }, [fallbackSrc]);

  const handlePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }, [])

  // Handle video play/pause state
  const handleVideoStateChange = useCallback(() => {
    if (videoRef.current) {
      setIsPlaying(!videoRef.current.paused)
    }
  }, [])

  // Memoize video component to prevent unnecessary re-renders
  const VideoComponent = useMemo(() => {
    if (videoUrl && index === 0) {
      // Always use Cloudinary URL for videos
      const videoSrc = getCloudinaryVideoUrl(videoUrl);

      return (
        <div className="relative group">
          <video
            ref={videoRef}
            className={className}
            controls
            preload="metadata"
            playsInline
            poster={imageSrc}
            onPlay={handleVideoStateChange}
            onPause={handleVideoStateChange}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Play button overlay - only show when video is not playing */}
          {!isPlaying && (
            <div 
              className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors cursor-pointer"
              onClick={handlePlayPause}
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/90 group-hover:bg-white transition-colors">
                <svg 
                  className="w-8 h-8 text-[#FF5D3A] translate-x-0.5" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      )
    }
    return null
  }, [videoUrl, index, className, imageSrc, isPlaying, handlePlayPause, handleVideoStateChange])

  // Memoize image props for better performance
  const imageProps = useMemo(() => ({
    src: imageSrc,
    alt,
    width,
    height,
    className,
    onError: handleError,
    sizes: sizes || "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
    quality: 100,
    loading: priority ? undefined : (loading || "lazy"),
    priority,
    placeholder: "blur" as const,
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSAyUC08LSw1Njo6MzU+RkpLPj46TT5FVlpaVkdKSk5PS0tLS0tLS0v/2wBDAR",
  }), [imageSrc, alt, width, height, className, handleError, sizes, priority, loading]);

  if (VideoComponent) {
    return VideoComponent
  }

  return <Image {...imageProps} />
}
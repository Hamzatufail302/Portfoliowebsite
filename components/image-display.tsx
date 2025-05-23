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
  // Construct the image path based on the project type and index
  const getImagePath = () => {
    // For Upward project, use specific path
    if (projectName === "upward") {
      return `image-${index}`; // Use index directly since we're using one-based indices
    }
    // For hero and about sections, use direct path
    if (projectType === "hero" || projectType === "about" || projectType === "testimonials") {
      return `/images/${projectType === "testimonials" ? "projects/testimonials" : projectType}/image-${index + 1}.png`
    }
    // For all other project types (including print design)
    return `/images/projects/${projectType}/${projectName}/image-${index}.png`
  }

  const [imageSrc, setImageSrc] = useState(() => {
    const path = getImagePath();
    console.log('Project type:', projectType);
    console.log('Project name:', projectName);
    console.log('Generated path:', path);
    const finalSrc = projectName === 'upward' ? getCloudinaryUrl(path) : path;
    console.log('Final image src:', finalSrc);
    return finalSrc;
  })
  
  const [error, setError] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleError = useCallback(() => {
    console.error('Image loading error for:', imageSrc);
    console.log('Falling back to:', fallbackSrc);
    setError(true)
    setImageSrc(fallbackSrc)
  }, [fallbackSrc, imageSrc])

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
      console.log('Video URL:', videoUrl);
      console.log('Transformed video URL:', videoSrc);

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

  // Memoize image props to prevent unnecessary re-renders
  const imageProps = useMemo(() => ({
    src: imageSrc,
    alt,
    width,
    height,
    className,
    onError: handleError,
    sizes,
    quality: 85,
    ...(priority ? { priority: true } : { loading: loading || "lazy" })
  }), [
    imageSrc,
    alt,
    width,
    height,
    className,
    handleError,
    sizes,
    priority,
    loading
  ])

  if (VideoComponent) {
    return VideoComponent
  }

  return <Image {...imageProps} />
}
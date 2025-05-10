import React, { useState, useRef } from "react"
import { Play, Pause } from "lucide-react"

interface VideoPlayerProps {
  src: string
  poster?: string
}

export default function VideoPlayer({ src, poster }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVideoStateChange = () => {
    if (videoRef.current) {
      setIsPlaying(!videoRef.current.paused)
    }
  }

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 group">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        controls
        loop
        playsInline
        preload="auto"
        poster={poster}
        onPlay={handleVideoStateChange}
        onPause={handleVideoStateChange}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Play/Pause Button Overlay - only show when controls are not visible */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 opacity-100 hover:opacity-80"
        >
          <Play className="w-16 h-16 text-white" />
        </button>
      )}
    </div>
  )
} 
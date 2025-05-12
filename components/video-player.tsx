import { useRef, useState } from "react"
import { getCloudinaryVideoUrl } from "@/utils/cloudinary"

interface VideoPlayerProps {
  src: string
  poster?: string
}

export default function VideoPlayer({ src, poster }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }

  const handleVideoStateChange = () => {
    if (videoRef.current) {
      setIsPlaying(!videoRef.current.paused)
    }
  }

  // Transform video URL if it's from the Upward project
  const videoUrl = src.includes('/upward/') ? getCloudinaryVideoUrl(src) : src;

  return (
    <div className="relative group">
      <video
        ref={videoRef}
        className="w-full rounded-lg"
        controls
        preload="metadata"
        playsInline
        poster={poster}
        onPlay={handleVideoStateChange}
        onPause={handleVideoStateChange}
      >
        <source src={videoUrl} type="video/mp4" />
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
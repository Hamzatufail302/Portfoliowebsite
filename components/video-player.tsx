import { useRef, useState, useEffect } from "react"
import { getCloudinaryVideoUrl } from "@/utils/cloudinary"

interface VideoPlayerProps {
  src: string
  poster?: string
}

export default function VideoPlayer({ src, poster }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Reset states when src changes
    setIsLoaded(false)
    setHasError(false)
    setIsPlaying(false)

    // Pre-load the video
    if (videoRef.current) {
      videoRef.current.load()
    }
  }, [src])

  const handlePlayPause = async () => {
    if (videoRef.current) {
      try {
      if (videoRef.current.paused) {
          // Force reload before playing if it's the first play
          if (!isLoaded) {
            videoRef.current.load()
          }
          await videoRef.current.play()
      } else {
        videoRef.current.pause()
        }
      } catch (error) {
        console.error('Video playback error:', error)
        setHasError(true)
      }
    }
  }

  const handleVideoStateChange = () => {
    if (videoRef.current) {
      setIsPlaying(!videoRef.current.paused)
    }
  }

  const handleLoadedData = () => {
    setIsLoaded(true)
    setHasError(false)
  }

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const target = e.currentTarget
    console.error('Video error:', target.error)
    setHasError(true)
    setIsLoaded(true) // Stop showing loading spinner
  }

  // Transform video URL if it's from the Upward project
  const videoUrl = src.includes('/upward/') ? getCloudinaryVideoUrl(src) : src;

  return (
    <div className="relative group max-w-4xl mx-auto">
      <div className="relative w-full aspect-video bg-black rounded-lg">
      <video
        ref={videoRef}
          className="absolute inset-0 w-full h-full rounded-lg object-contain"
        controls
        preload="metadata"
        playsInline
        poster={poster}
        onPlay={handleVideoStateChange}
        onPause={handleVideoStateChange}
          onLoadedData={handleLoadedData}
          onError={handleError}
          onLoadStart={() => setIsLoaded(false)}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
        {/* Play button overlay - only show when video is not playing, is loaded, and has no errors */}
        {!isPlaying && isLoaded && !hasError && (
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
        {/* Loading indicator */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-[#FF5D3A] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {/* Error message */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
            <div className="text-center">
              <p className="mb-2">Failed to load video</p>
              <button 
                onClick={() => {
                  setHasError(false)
                  setIsLoaded(false)
                  if (videoRef.current) {
                    videoRef.current.load()
                  }
                }}
                className="px-4 py-2 bg-[#FF5D3A] rounded-lg hover:bg-[#FF4444] transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 
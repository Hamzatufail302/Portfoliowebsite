import { useRef, useState, useEffect, useMemo, useCallback } from "react"
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

  // Memoize video URL transformation
  const videoUrl = useMemo(() => 
    src.includes('/upward/') ? getCloudinaryVideoUrl(src) : src,
    [src]
  );

  useEffect(() => {
    let mounted = true;

    const loadVideo = async () => {
      if (!videoRef.current) return;
      
      try {
        videoRef.current.load();
        if (mounted) {
          setIsLoaded(false);
          setHasError(false);
          setIsPlaying(false);
        }
      } catch (error) {
        if (mounted) {
          setHasError(true);
        }
      }
    };

    loadVideo();

    return () => {
      mounted = false;
    if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = '';
        videoRef.current.load();
      }
    };
  }, [videoUrl]);

  const handlePlayPause = useCallback(async () => {
    if (!videoRef.current) return;

    try {
      if (videoRef.current.paused) {
        if (!isLoaded) {
          videoRef.current.load();
        }
        await videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    } catch (error) {
      setHasError(true);
    }
  }, [isLoaded]);

  const handleVideoStateChange = useCallback(() => {
    if (videoRef.current) {
      setIsPlaying(!videoRef.current.paused);
    }
  }, []);

  const handleLoadedData = useCallback(() => {
    setIsLoaded(true);
    setHasError(false);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative aspect-video w-[110%] -ml-[5%] transform">
      <video
        ref={videoRef}
        className="w-full h-[105%] rounded-lg"
        controls
        preload="metadata"
        playsInline
        poster={poster}
        onPlay={handleVideoStateChange}
        onPause={handleVideoStateChange}
        onLoadedData={handleLoadedData}
        onError={handleError}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-red-500">Error loading video</p>
        </div>
      )}
    </div>
  );
} 
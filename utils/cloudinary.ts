const CLOUDINARY_CLOUD_NAME = 'di3u607lk';

export function getCloudinaryVideoUrl(path: string): string {
  // For multimedia/lottie-motion-graphic videos
  if (!path.startsWith('http')) {
    // Extract the video name from the path
    const matches = path.match(/\/videos\/projects\/([^/]+)\/video\.mp4$/);
    if (matches) {
      const videoName = matches[1];
      // Use the correct URL structure for cartease video
      const finalUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/v1747042726/video.mp4`;
      console.log('Original video path:', path);
      console.log('Video name:', videoName);
      console.log('Final Cloudinary video URL:', finalUrl);
      return finalUrl;
    }
  }
  
  // Return original path if it's already a full URL or doesn't match our pattern
  return path;
}
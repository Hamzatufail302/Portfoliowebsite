const CLOUDINARY_CLOUD_NAME = 'di3u607lk';

export function getCloudinaryUrl(path: string): string {
  // For all project images
  if (!path.startsWith('http')) {
    // Extract the project type and name from the path
    const matches = path.match(/projects\/(.*?)\/(.*?)\/image-(\d+)/);
    if (matches) {
      const projectType = matches[1];
      const projectName = matches[2];
      const imageNumber = matches[3];
      
      // Construct the Cloudinary URL based on project type
      let finalUrl = '';
      if (projectType === 'graphic-design') {
        finalUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/v1747042726/${projectName}/${imageNumber}.png`;
      } else {
        finalUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/v1747032909/image-${imageNumber}.png`;
      }
      
      console.log('Original image path:', path);
      console.log('Project type:', projectType);
      console.log('Project name:', projectName);
      console.log('Image number:', imageNumber);
      console.log('Final Cloudinary URL:', finalUrl);
      return finalUrl;
    }
  }
  
  // Return original path if it's already a full URL or doesn't match our pattern
  return path;
}

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
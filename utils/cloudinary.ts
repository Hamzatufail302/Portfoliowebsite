const CLOUDINARY_CLOUD_NAME = 'di3u607lk';

export function getCloudinaryUrl(path: string): string {
  // Only transform Upward project images for now
  if (path.includes('/upward/')) {
    // The path is already in the correct format, just add version
    const transformedPath = `v1747032909${path}`;
    
    const finalUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformedPath}`;
    console.log('Original path:', path);
    console.log('Transformed path:', transformedPath);
    console.log('Final Cloudinary URL:', finalUrl);
    return finalUrl;
  }
  
  // Return original path for all other images
  return path;
}

export function getCloudinaryVideoUrl(path: string): string {
  // Only transform Upward project videos for now
  if (path.includes('/upward/')) {
    // The path is already in the correct format, just add version
    const transformedPath = `v1747032909${path}`;
    
    const finalUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/${transformedPath}`;
    console.log('Original video path:', path);
    console.log('Transformed video path:', transformedPath);
    console.log('Final Cloudinary video URL:', finalUrl);
    return finalUrl;
  }
  
  // Return original path for all other videos
  return path;
} 
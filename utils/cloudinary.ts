const CLOUDINARY_CLOUD_NAME = 'di3u607lk';

export function getCloudinaryUrl(path: string): string {
  // For Upward project images, construct the full Cloudinary URL
  if (!path.startsWith('http')) {
    // Add .png extension if not present
    const filename = path.endsWith('.png') ? path : `${path}.png`;
    const finalUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/v1747032909/${filename}`;
    console.log('Original path:', path);
    console.log('Final Cloudinary URL:', finalUrl);
    return finalUrl;
  }
  
  // Return original path if it's already a full URL
  return path;
}

export function getCloudinaryVideoUrl(path: string): string {
  // For Upward project videos
  if (!path.startsWith('http')) {
    // Add .mp4 extension if not present
    const filename = path.endsWith('.mp4') ? path : `${path}.mp4`;
    const finalUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/v1747032909/${filename}`;
    console.log('Original video path:', path);
    console.log('Final Cloudinary video URL:', finalUrl);
    return finalUrl;
  }
  
  // Return original path if it's already a full URL
  return path;
} 
const CLOUDINARY_CLOUD_NAME = 'di3u607lk';

export const getCloudinaryUrl = (path: string) => {
  // Remove the leading slash if it exists
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // If the path includes 'images/projects', modify it to match Cloudinary structure
  if (cleanPath.includes('images/projects')) {
    const parts = cleanPath.split('images/projects/');
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/v1/${parts[1]}`;
  }
  
  // Return the original path if it doesn't match our criteria
  return path;
};

// Function to get optimized image URL with transformations
export const getOptimizedImageUrl = (path: string, options?: {
  width?: number;
  height?: number;
  quality?: number;
}) => {
  const baseUrl = getCloudinaryUrl(path);
  
  // If it's not a Cloudinary URL, return as is
  if (!baseUrl.includes('cloudinary')) {
    return path;
  }
  
  // Build transformation string
  const transformations = [];
  
  if (options?.width) transformations.push(`w_${options.width}`);
  if (options?.height) transformations.push(`h_${options.height}`);
  if (options?.quality) transformations.push(`q_${options.quality}`);
  
  // Add format optimization
  transformations.push('f_auto');
  
  // If we have transformations, insert them into the URL
  if (transformations.length > 0) {
    const [base, ...rest] = baseUrl.split('/upload/');
    return `${base}/upload/${transformations.join(',')}/${rest.join('/')}`;
  }
  
  return baseUrl;
}; 